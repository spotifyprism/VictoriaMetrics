package remotewrite

import (
	"flag"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"sync"
	"sync/atomic"
	"time"

	"github.com/cespare/xxhash/v2"

	"github.com/VictoriaMetrics/VictoriaMetrics/lib/auth"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/bloomfilter"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/bytesutil"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/cgroup"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/fasttime"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/flagutil"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/fs"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/logger"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/memory"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/persistentqueue"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/procutil"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/prompbmarshal"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/promrelabel"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/streamaggr"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/tenantmetrics"
	"github.com/VictoriaMetrics/metrics"
)

var (
	remoteWriteURLs = flagutil.NewArrayString("remoteWrite.url", "Remote storage URL to write data to. It must support either VictoriaMetrics remote write protocol "+
		"or Prometheus remote_write protocol. Example url: http://<victoriametrics-host>:8428/api/v1/write . "+
		"Pass multiple -remoteWrite.url options in order to replicate the collected data to multiple remote storage systems. See also -remoteWrite.multitenantURL")
	remoteWriteMultitenantURLs = flagutil.NewArrayString("remoteWrite.multitenantURL", "Base path for multitenant remote storage URL to write data to. "+
		"See https://docs.victoriametrics.com/vmagent.html#multitenancy for details. Example url: http://<vminsert>:8480 . "+
		"Pass multiple -remoteWrite.multitenantURL flags in order to replicate data to multiple remote storage systems. See also -remoteWrite.url")
	tmpDataPath = flag.String("remoteWrite.tmpDataPath", "vmagent-remotewrite-data", "Path to directory where temporary data for remote write component is stored. "+
		"See also -remoteWrite.maxDiskUsagePerURL")
	keepDanglingQueues = flag.Bool("remoteWrite.keepDanglingQueues", false, "Keep persistent queues contents at -remoteWrite.tmpDataPath in case there are no matching -remoteWrite.url. "+
		"Useful when -remoteWrite.url is changed temporarily and persistent queue files will be needed later on.")
	queues = flag.Int("remoteWrite.queues", cgroup.AvailableCPUs()*2, "The number of concurrent queues to each -remoteWrite.url. Set more queues if default number of queues "+
		"isn't enough for sending high volume of collected data to remote storage. Default value is 2 * numberOfAvailableCPUs")
	showRemoteWriteURL = flag.Bool("remoteWrite.showURL", false, "Whether to show -remoteWrite.url in the exported metrics. "+
		"It is hidden by default, since it can contain sensitive info such as auth key")
	maxPendingBytesPerURL = flagutil.NewArrayBytes("remoteWrite.maxDiskUsagePerURL", "The maximum file-based buffer size in bytes at -remoteWrite.tmpDataPath "+
		"for each -remoteWrite.url. When buffer size reaches the configured maximum, then old data is dropped when adding new data to the buffer. "+
		"Buffered data is stored in ~500MB chunks, so the minimum practical value for this flag is 500MB. "+
		"Disk usage is unlimited if the value is set to 0")
	significantFigures = flagutil.NewArrayInt("remoteWrite.significantFigures", "The number of significant figures to leave in metric values before writing them "+
		"to remote storage. See https://en.wikipedia.org/wiki/Significant_figures . Zero value saves all the significant figures. "+
		"This option may be used for improving data compression for the stored metrics. See also -remoteWrite.roundDigits")
	roundDigits = flagutil.NewArrayInt("remoteWrite.roundDigits", "Round metric values to this number of decimal digits after the point before writing them to remote storage. "+
		"Examples: -remoteWrite.roundDigits=2 would round 1.236 to 1.24, while -remoteWrite.roundDigits=-1 would round 126.78 to 130. "+
		"By default digits rounding is disabled. Set it to 100 for disabling it for a particular remote storage. "+
		"This option may be used for improving data compression for the stored metrics")
	sortLabels = flag.Bool("sortLabels", false, `Whether to sort labels for incoming samples before writing them to all the configured remote storage systems. `+
		`This may be needed for reducing memory usage at remote storage when the order of labels in incoming samples is random. `+
		`For example, if m{k1="v1",k2="v2"} may be sent as m{k2="v2",k1="v1"}`+
		`Enabled sorting for labels can slow down ingestion performance a bit`)
	maxHourlySeries = flag.Int("remoteWrite.maxHourlySeries", 0, "The maximum number of unique series vmagent can send to remote storage systems during the last hour. "+
		"Excess series are logged and dropped. This can be useful for limiting series cardinality. See https://docs.victoriametrics.com/vmagent.html#cardinality-limiter")
	maxDailySeries = flag.Int("remoteWrite.maxDailySeries", 0, "The maximum number of unique series vmagent can send to remote storage systems during the last 24 hours. "+
		"Excess series are logged and dropped. This can be useful for limiting series churn rate. See https://docs.victoriametrics.com/vmagent.html#cardinality-limiter")
)

var (
	// rwctxsDefault contains statically populated entries when -remoteWrite.url is specified.
	rwctxsDefault []*remoteWriteCtx

	// rwctxsMap contains dynamically populated entries when -remoteWrite.multitenantURL is specified.
	rwctxsMap     = make(map[tenantmetrics.TenantID][]*remoteWriteCtx)
	rwctxsMapLock sync.Mutex

	// Data without tenant id is written to defaultAuthToken if -remoteWrite.multitenantURL is specified.
	defaultAuthToken = &auth.Token{}
)

// MultitenancyEnabled returns true if -remoteWrite.multitenantURL is specified.
func MultitenancyEnabled() bool {
	return len(*remoteWriteMultitenantURLs) > 0
}

// Contains the current relabelConfigs.
var allRelabelConfigs atomic.Value

// Contains the loader for stream aggregation configs.
var saCfgLoader *saConfigsLoader

// maxQueues limits the maximum value for `-remoteWrite.queues`. There is no sense in setting too high value,
// since it may lead to high memory usage due to big number of buffers.
var maxQueues = cgroup.AvailableCPUs() * 16

const persistentQueueDirname = "persistent-queue"

// InitSecretFlags must be called after flag.Parse and before any logging.
func InitSecretFlags() {
	if !*showRemoteWriteURL {
		// remoteWrite.url can contain authentication codes, so hide it at `/metrics` output.
		flagutil.RegisterSecretFlag("remoteWrite.url")
	}
}

// Init initializes remotewrite.
//
// It must be called after flag.Parse().
//
// Stop must be called for graceful shutdown.
func Init() {
	if len(*remoteWriteURLs) == 0 && len(*remoteWriteMultitenantURLs) == 0 {
		logger.Fatalf("at least one `-remoteWrite.url` or `-remoteWrite.multitenantURL` command-line flag must be set")
	}
	if len(*remoteWriteURLs) > 0 && len(*remoteWriteMultitenantURLs) > 0 {
		logger.Fatalf("cannot set both `-remoteWrite.url` and `-remoteWrite.multitenantURL` command-line flags")
	}
	if *maxHourlySeries > 0 {
		hourlySeriesLimiter = bloomfilter.NewLimiter(*maxHourlySeries, time.Hour)
		_ = metrics.NewGauge(`vmagent_hourly_series_limit_max_series`, func() float64 {
			return float64(hourlySeriesLimiter.MaxItems())
		})
		_ = metrics.NewGauge(`vmagent_hourly_series_limit_current_series`, func() float64 {
			return float64(hourlySeriesLimiter.CurrentItems())
		})
	}
	if *maxDailySeries > 0 {
		dailySeriesLimiter = bloomfilter.NewLimiter(*maxDailySeries, 24*time.Hour)
		_ = metrics.NewGauge(`vmagent_daily_series_limit_max_series`, func() float64 {
			return float64(dailySeriesLimiter.MaxItems())
		})
		_ = metrics.NewGauge(`vmagent_daily_series_limit_current_series`, func() float64 {
			return float64(dailySeriesLimiter.CurrentItems())
		})
	}
	if *queues > maxQueues {
		*queues = maxQueues
	}
	if *queues <= 0 {
		*queues = 1
	}
	initLabelsGlobal()

	// Register SIGHUP handler for config reload before loadRelabelConfigs.
	// This guarantees that the config will be re-read if the signal arrives just after loadRelabelConfig.
	// See https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1240
	sighupCh := procutil.NewSighupChan()

	rcs, err := loadRelabelConfigs()
	if err != nil {
		logger.Fatalf("cannot load relabel configs: %s", err)
	}
	allRelabelConfigs.Store(rcs)

	relabelConfigSuccess.Set(1)
	relabelConfigTimestamp.Set(fasttime.UnixTimestamp())

	saCfgLoader, err = newSaConfigsLoader(*streamAggrConfig)
	if err != nil {
		logger.Fatalf("cannot load stream aggregation config: %s", err)
	}

	if len(*remoteWriteURLs) > 0 {
		rwctxsDefault = newRemoteWriteCtxs(nil, *remoteWriteURLs)
	}

	// Start config reloader.
	configReloaderWG.Add(1)
	go func() {
		defer configReloaderWG.Done()
		for {
			select {
			case <-sighupCh:
			case <-stopCh:
				return
			}
			relabelConfigReloads.Inc()
			logger.Infof("SIGHUP received; reloading relabel configs pointed by -remoteWrite.relabelConfig and -remoteWrite.urlRelabelConfig")
			rcs, err := loadRelabelConfigs()
			if err != nil {
				relabelConfigReloadErrors.Inc()
				relabelConfigSuccess.Set(0)
				logger.Errorf("cannot reload relabel configs; preserving the previous configs; error: %s", err)
				continue
			}
			allRelabelConfigs.Store(rcs)
			relabelConfigSuccess.Set(1)
			relabelConfigTimestamp.Set(fasttime.UnixTimestamp())
			logger.Infof("Successfully reloaded relabel configs")

			logger.Infof("reloading stream agg configs pointed by -remoteWrite.streamAggr.config")
			err = saCfgLoader.reloadConfigs()
			if err != nil {
				logger.Errorf("Cannot reload stream aggregation configs: %s", err)
			}
			if len(*remoteWriteMultitenantURLs) > 0 {
				rwctxsMapLock.Lock()
				for _, rwctxs := range rwctxsMap {
					for _, rwctx := range rwctxs {
						rwctx.reinitStreamAggr()
					}
				}
				rwctxsMapLock.Unlock()
			} else {
				for _, rwctx := range rwctxsDefault {
					rwctx.reinitStreamAggr()
				}
			}
			logger.Infof("Successfully reloaded stream aggregation configs")
		}
	}()
}

var (
	relabelConfigReloads      = metrics.NewCounter(`vmagent_relabel_config_reloads_total`)
	relabelConfigReloadErrors = metrics.NewCounter(`vmagent_relabel_config_reloads_errors_total`)
	relabelConfigSuccess      = metrics.NewCounter(`vmagent_relabel_config_last_reload_successful`)
	relabelConfigTimestamp    = metrics.NewCounter(`vmagent_relabel_config_last_reload_success_timestamp_seconds`)
)

func newRemoteWriteCtxs(at *auth.Token, urls []string) []*remoteWriteCtx {
	if len(urls) == 0 {
		logger.Panicf("BUG: urls must be non-empty")
	}

	maxInmemoryBlocks := memory.Allowed() / len(urls) / *maxRowsPerBlock / 100
	if maxInmemoryBlocks / *queues > 100 {
		// There is no much sense in keeping higher number of blocks in memory,
		// since this means that the producer outperforms consumer and the queue
		// will continue growing. It is better storing the queue to file.
		maxInmemoryBlocks = 100 * *queues
	}
	if maxInmemoryBlocks < 2 {
		maxInmemoryBlocks = 2
	}
	rwctxs := make([]*remoteWriteCtx, len(urls))
	for i, remoteWriteURLRaw := range urls {
		remoteWriteURL, err := url.Parse(remoteWriteURLRaw)
		if err != nil {
			logger.Fatalf("invalid -remoteWrite.url=%q: %s", remoteWriteURL, err)
		}
		sanitizedURL := fmt.Sprintf("%d:secret-url", i+1)
		if at != nil {
			// Construct full remote_write url for the given tenant according to https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#url-format
			remoteWriteURL.Path = fmt.Sprintf("%s/insert/%d:%d/prometheus/api/v1/write", remoteWriteURL.Path, at.AccountID, at.ProjectID)
			sanitizedURL = fmt.Sprintf("%s:%d:%d", sanitizedURL, at.AccountID, at.ProjectID)
		}
		if *showRemoteWriteURL {
			sanitizedURL = fmt.Sprintf("%d:%s", i+1, remoteWriteURL)
		}
		rwctxs[i] = newRemoteWriteCtx(i, at, remoteWriteURL, maxInmemoryBlocks, sanitizedURL)
	}

	if !*keepDanglingQueues {
		// Remove dangling queues, if any.
		// This is required for the case when the number of queues has been changed or URL have been changed.
		// See: https://github.com/VictoriaMetrics/VictoriaMetrics/issues/4014
		existingQueues := make(map[string]struct{}, len(rwctxs))
		for _, rwctx := range rwctxs {
			existingQueues[rwctx.fq.Dirname()] = struct{}{}
		}

		queuesDir := filepath.Join(*tmpDataPath, persistentQueueDirname)
		files, err := os.ReadDir(queuesDir)
		if err != nil {
			logger.Fatalf("cannot read queues dir %q: %s", queuesDir, err)
		}
		removed := 0
		for _, f := range files {
			dirname := f.Name()
			if _, ok := existingQueues[dirname]; !ok {
				logger.Infof("removing dangling queue %q", dirname)
				fullPath := filepath.Join(queuesDir, dirname)
				fs.MustRemoveAll(fullPath)
				removed++
			}
		}
		if removed > 0 {
			logger.Infof("removed %d dangling queues from %q, active queues: %d", removed, *tmpDataPath, len(rwctxs))
		}
	}

	return rwctxs
}

var stopCh = make(chan struct{})
var configReloaderWG sync.WaitGroup

// Stop stops remotewrite.
//
// It is expected that nobody calls Push during and after the call to this func.
func Stop() {
	close(stopCh)
	configReloaderWG.Wait()

	for _, rwctx := range rwctxsDefault {
		rwctx.MustStop()
	}
	rwctxsDefault = nil

	// There is no need in locking rwctxsMapLock here, since nobody should call Push during the Stop call.
	for _, rwctxs := range rwctxsMap {
		for _, rwctx := range rwctxs {
			rwctx.MustStop()
		}
	}
	rwctxsMap = nil

	if sl := hourlySeriesLimiter; sl != nil {
		sl.MustStop()
	}
	if sl := dailySeriesLimiter; sl != nil {
		sl.MustStop()
	}
}

// Push sends wr to remote storage systems set via `-remoteWrite.url`.
//
// If at is nil, then the data is pushed to the configured `-remoteWrite.url`.
// If at isn't nil, the data is pushed to the configured `-remoteWrite.multitenantURL`.
//
// Note that wr may be modified by Push due to relabeling and rounding.
func Push(at *auth.Token, wr *prompbmarshal.WriteRequest) {
	if at == nil && len(*remoteWriteMultitenantURLs) > 0 {
		// Write data to default tenant if at isn't set while -remoteWrite.multitenantURL is set.
		at = defaultAuthToken
	}
	var rwctxs []*remoteWriteCtx
	if at == nil {
		rwctxs = rwctxsDefault
	} else {
		if len(*remoteWriteMultitenantURLs) == 0 {
			logger.Panicf("BUG: -remoteWrite.multitenantURL command-line flag must be set when __tenant_id__=%q label is set", at)
		}
		rwctxsMapLock.Lock()
		tenantID := tenantmetrics.TenantID{
			AccountID: at.AccountID,
			ProjectID: at.ProjectID,
		}
		rwctxs = rwctxsMap[tenantID]
		if rwctxs == nil {
			rwctxs = newRemoteWriteCtxs(at, *remoteWriteMultitenantURLs)
			rwctxsMap[tenantID] = rwctxs
		}
		rwctxsMapLock.Unlock()
	}

	var rctx *relabelCtx
	rcs := allRelabelConfigs.Load().(*relabelConfigs)
	pcsGlobal := rcs.global
	if pcsGlobal.Len() > 0 || len(labelsGlobal) > 0 {
		rctx = getRelabelCtx()
	}
	tss := wr.Timeseries
	rowsCount := getRowsCount(tss)
	globalRowsPushedBeforeRelabel.Add(rowsCount)
	maxSamplesPerBlock := *maxRowsPerBlock
	// Allow up to 10x of labels per each block on average.
	maxLabelsPerBlock := 10 * maxSamplesPerBlock
	for len(tss) > 0 {
		// Process big tss in smaller blocks in order to reduce the maximum memory usage
		samplesCount := 0
		labelsCount := 0
		i := 0
		for i < len(tss) {
			samplesCount += len(tss[i].Samples)
			labelsCount += len(tss[i].Labels)
			i++
			if samplesCount >= maxSamplesPerBlock || labelsCount >= maxLabelsPerBlock {
				break
			}
		}
		tssBlock := tss
		if i < len(tss) {
			tssBlock = tss[:i]
			tss = tss[i:]
		} else {
			tss = nil
		}
		if rctx != nil {
			rowsCountBeforeRelabel := getRowsCount(tssBlock)
			tssBlock = rctx.applyRelabeling(tssBlock, labelsGlobal, pcsGlobal)
			rowsCountAfterRelabel := getRowsCount(tssBlock)
			rowsDroppedByGlobalRelabel.Add(rowsCountBeforeRelabel - rowsCountAfterRelabel)
		}
		sortLabelsIfNeeded(tssBlock)
		tssBlock = limitSeriesCardinality(tssBlock)
		pushBlockToRemoteStorages(rwctxs, tssBlock)
		if rctx != nil {
			rctx.reset()
		}
	}
	if rctx != nil {
		putRelabelCtx(rctx)
	}
}

func pushBlockToRemoteStorages(rwctxs []*remoteWriteCtx, tssBlock []prompbmarshal.TimeSeries) {
	if len(tssBlock) == 0 {
		// Nothing to push
		return
	}
	// Push block to remote storages in parallel in order to reduce the time needed for sending the data to multiple remote storage systems.
	var wg sync.WaitGroup
	for _, rwctx := range rwctxs {
		wg.Add(1)
		go func(rwctx *remoteWriteCtx) {
			defer wg.Done()
			rwctx.Push(tssBlock)
		}(rwctx)
	}
	wg.Wait()
}

// sortLabelsIfNeeded sorts labels if -sortLabels command-line flag is set.
func sortLabelsIfNeeded(tss []prompbmarshal.TimeSeries) {
	if !*sortLabels {
		return
	}
	for i := range tss {
		promrelabel.SortLabels(tss[i].Labels)
	}
}

func limitSeriesCardinality(tss []prompbmarshal.TimeSeries) []prompbmarshal.TimeSeries {
	if hourlySeriesLimiter == nil && dailySeriesLimiter == nil {
		return tss
	}
	dst := make([]prompbmarshal.TimeSeries, 0, len(tss))
	for i := range tss {
		labels := tss[i].Labels
		h := getLabelsHash(labels)
		if hourlySeriesLimiter != nil && !hourlySeriesLimiter.Add(h) {
			hourlySeriesLimitRowsDropped.Add(len(tss[i].Samples))
			logSkippedSeries(labels, "-remoteWrite.maxHourlySeries", hourlySeriesLimiter.MaxItems())
			continue
		}
		if dailySeriesLimiter != nil && !dailySeriesLimiter.Add(h) {
			dailySeriesLimitRowsDropped.Add(len(tss[i].Samples))
			logSkippedSeries(labels, "-remoteWrite.maxDailySeries", dailySeriesLimiter.MaxItems())
			continue
		}
		dst = append(dst, tss[i])
	}
	return dst
}

var (
	hourlySeriesLimiter *bloomfilter.Limiter
	dailySeriesLimiter  *bloomfilter.Limiter

	hourlySeriesLimitRowsDropped = metrics.NewCounter(`vmagent_hourly_series_limit_rows_dropped_total`)
	dailySeriesLimitRowsDropped  = metrics.NewCounter(`vmagent_daily_series_limit_rows_dropped_total`)
)

func getLabelsHash(labels []prompbmarshal.Label) uint64 {
	bb := labelsHashBufPool.Get()
	b := bb.B[:0]
	for _, label := range labels {
		b = append(b, label.Name...)
		b = append(b, label.Value...)
	}
	h := xxhash.Sum64(b)
	bb.B = b
	labelsHashBufPool.Put(bb)
	return h
}

var labelsHashBufPool bytesutil.ByteBufferPool

func logSkippedSeries(labels []prompbmarshal.Label, flagName string, flagValue int) {
	select {
	case <-logSkippedSeriesTicker.C:
		// Do not use logger.WithThrottler() here, since this will increase CPU usage
		// because every call to logSkippedSeries will result to a call to labelsToString.
		logger.Warnf("skip series %s because %s=%d reached", labelsToString(labels), flagName, flagValue)
	default:
	}
}

var logSkippedSeriesTicker = time.NewTicker(5 * time.Second)

func labelsToString(labels []prompbmarshal.Label) string {
	var b []byte
	b = append(b, '{')
	for i, label := range labels {
		b = append(b, label.Name...)
		b = append(b, '=')
		b = strconv.AppendQuote(b, label.Value)
		if i+1 < len(labels) {
			b = append(b, ',')
		}
	}
	b = append(b, '}')
	return string(b)
}

var (
	globalRowsPushedBeforeRelabel = metrics.NewCounter("vmagent_remotewrite_global_rows_pushed_before_relabel_total")
	rowsDroppedByGlobalRelabel    = metrics.NewCounter("vmagent_remotewrite_global_relabel_metrics_dropped_total")
)

type remoteWriteCtx struct {
	idx int
	fq  *persistentqueue.FastQueue
	c   *client

	sas                 *streamaggr.Aggregators
	saHash              uint64
	streamAggrKeepInput bool

	pss        []*pendingSeries
	pssNextIdx uint64

	rowsPushedAfterRelabel *metrics.Counter
	rowsDroppedByRelabel   *metrics.Counter
}

func newRemoteWriteCtx(argIdx int, at *auth.Token, remoteWriteURL *url.URL, maxInmemoryBlocks int, sanitizedURL string) *remoteWriteCtx {
	// strip query params, otherwise changing params resets pq
	pqURL := *remoteWriteURL
	pqURL.RawQuery = ""
	pqURL.Fragment = ""
	h := xxhash.Sum64([]byte(pqURL.String()))
	queuePath := filepath.Join(*tmpDataPath, persistentQueueDirname, fmt.Sprintf("%d_%016X", argIdx+1, h))
	maxPendingBytes := maxPendingBytesPerURL.GetOptionalArgOrDefault(argIdx, 0)
	fq := persistentqueue.MustOpenFastQueue(queuePath, sanitizedURL, maxInmemoryBlocks, maxPendingBytes)
	_ = metrics.GetOrCreateGauge(fmt.Sprintf(`vmagent_remotewrite_pending_data_bytes{path=%q, url=%q}`, queuePath, sanitizedURL), func() float64 {
		return float64(fq.GetPendingBytes())
	})
	_ = metrics.GetOrCreateGauge(fmt.Sprintf(`vmagent_remotewrite_pending_inmemory_blocks{path=%q, url=%q}`, queuePath, sanitizedURL), func() float64 {
		return float64(fq.GetInmemoryQueueLen())
	})

	var c *client
	switch remoteWriteURL.Scheme {
	case "http", "https":
		c = newHTTPClient(argIdx, remoteWriteURL.String(), sanitizedURL, fq, *queues)
	default:
		logger.Fatalf("unsupported scheme: %s for remoteWriteURL: %s, want `http`, `https`", remoteWriteURL.Scheme, sanitizedURL)
	}
	c.init(argIdx, *queues, sanitizedURL)

	// Initialize pss
	sf := significantFigures.GetOptionalArgOrDefault(argIdx, 0)
	rd := roundDigits.GetOptionalArgOrDefault(argIdx, 100)
	pssLen := *queues
	if n := cgroup.AvailableCPUs(); pssLen > n {
		// There is no sense in running more than availableCPUs concurrent pendingSeries,
		// since every pendingSeries can saturate up to a single CPU.
		pssLen = n
	}
	pss := make([]*pendingSeries, pssLen)
	for i := range pss {
		pss[i] = newPendingSeries(fq.MustWriteBlock, c.useVMProto, sf, rd)
	}

	rwctx := &remoteWriteCtx{
		idx: argIdx,
		fq:  fq,
		c:   c,
		pss: pss,

		rowsPushedAfterRelabel: metrics.GetOrCreateCounter(fmt.Sprintf(`vmagent_remotewrite_rows_pushed_after_relabel_total{path=%q, url=%q}`, queuePath, sanitizedURL)),
		rowsDroppedByRelabel:   metrics.GetOrCreateCounter(fmt.Sprintf(`vmagent_remotewrite_relabel_metrics_dropped_total{path=%q, url=%q}`, queuePath, sanitizedURL)),
	}

	// Initialize sas
	saCfg, saHash := saCfgLoader.getCurrentConfig(argIdx)
	if len(saCfg) > 0 {
		sasFile := streamAggrConfig.GetOptionalArg(argIdx)
		dedupInterval := streamAggrDedupInterval.GetOptionalArgOrDefault(argIdx, 0)
		sas, err := streamaggr.NewAggregators(saCfg, rwctx.pushInternal, dedupInterval)
		if err != nil {
			logger.Fatalf("cannot initialize stream aggregators from -remoteWrite.streamAggrFile=%q: %s", sasFile, err)
		}
		rwctx.sas = sas
		rwctx.saHash = saHash
		rwctx.streamAggrKeepInput = streamAggrKeepInput.GetOptionalArg(argIdx)
	}

	return rwctx
}

func (rwctx *remoteWriteCtx) MustStop() {
	for _, ps := range rwctx.pss {
		ps.MustStop()
	}
	rwctx.idx = 0
	rwctx.pss = nil
	rwctx.fq.UnblockAllReaders()
	rwctx.c.MustStop()
	rwctx.c = nil
	rwctx.sas.MustStop()
	rwctx.sas = nil
	rwctx.fq.MustClose()
	rwctx.fq = nil

	rwctx.rowsPushedAfterRelabel = nil
	rwctx.rowsDroppedByRelabel = nil
}

func (rwctx *remoteWriteCtx) Push(tss []prompbmarshal.TimeSeries) {
	// Apply relabeling
	var rctx *relabelCtx
	var v *[]prompbmarshal.TimeSeries
	rcs := allRelabelConfigs.Load().(*relabelConfigs)
	pcs := rcs.perURL[rwctx.idx]
	if pcs.Len() > 0 {
		rctx = getRelabelCtx()
		// Make a copy of tss before applying relabeling in order to prevent
		// from affecting time series for other remoteWrite.url configs.
		// See https://github.com/VictoriaMetrics/VictoriaMetrics/issues/467
		// and https://github.com/VictoriaMetrics/VictoriaMetrics/issues/599
		v = tssRelabelPool.Get().(*[]prompbmarshal.TimeSeries)
		tss = append(*v, tss...)
		rowsCountBeforeRelabel := getRowsCount(tss)
		tss = rctx.applyRelabeling(tss, nil, pcs)
		rowsCountAfterRelabel := getRowsCount(tss)
		rwctx.rowsDroppedByRelabel.Add(rowsCountBeforeRelabel - rowsCountAfterRelabel)
	}
	rowsCount := getRowsCount(tss)
	rwctx.rowsPushedAfterRelabel.Add(rowsCount)

	// Apply stream aggregation if any
	rwctx.sas.Push(tss)
	if rwctx.sas == nil || rwctx.streamAggrKeepInput {
		// Push samples to the remote storage
		rwctx.pushInternal(tss)
	}

	// Return back relabeling contexts to the pool
	if rctx != nil {
		*v = prompbmarshal.ResetTimeSeries(tss)
		tssRelabelPool.Put(v)
		putRelabelCtx(rctx)
	}
}

func (rwctx *remoteWriteCtx) pushInternal(tss []prompbmarshal.TimeSeries) {
	pss := rwctx.pss
	idx := atomic.AddUint64(&rwctx.pssNextIdx, 1) % uint64(len(pss))
	pss[idx].Push(tss)
}

func (rwctx *remoteWriteCtx) reinitStreamAggr() {
	if rwctx.sas == nil {
		return
	}
	saCfg, saHash := saCfgLoader.getCurrentConfig(rwctx.idx)
	if rwctx.saHash == saHash {
		return
	}
	if err := rwctx.sas.ReInitConfigs(saCfg); err != nil {
		logger.Errorf("Cannot apply stream aggregation configs %d: %s", rwctx.idx, err)
	}
	rwctx.saHash = saHash
}

var tssRelabelPool = &sync.Pool{
	New: func() interface{} {
		a := []prompbmarshal.TimeSeries{}
		return &a
	},
}

func getRowsCount(tss []prompbmarshal.TimeSeries) int {
	rowsCount := 0
	for _, ts := range tss {
		rowsCount += len(ts.Samples)
	}
	return rowsCount
}
