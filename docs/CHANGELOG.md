---
sort: 16
---

# CHANGELOG

The following tip changes can be tested by building VictoriaMetrics components from the latest commits according to the following docs:

* [How to build single-node VictoriaMetrics](https://docs.victoriametrics.com/#how-to-build-from-sources)
* [How to build cluster version of VictoriaMetrics](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#building-from-sources)
* [How to build vmagent](https://docs.victoriametrics.com/vmagent.html#how-to-build-from-sources)
* [How to build vmalert](https://docs.victoriametrics.com/vmalert.html#how-to-build-from-sources)
* [How to build vmauth](https://docs.victoriametrics.com/vmauth.html#how-to-build-from-sources)
* [How to build vmctl](https://docs.victoriametrics.com/vmctl.html#how-to-build)

## tip

**Update note: this release contains backwards-incompatible change in storage data format,
so the previous versions of VictoriaMetrics will exit with the `unexpected number of substrings in the part name` error when trying to run them on the data
created by v1.90.0 or newer versions. The solution is to upgrade to v1.90.0 or newer releases**

* FEATURE: release Windows binaries for [single-node VictoriaMetrics](https://docs.victoriametrics.com/), [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html), [vmbackup](https://docs.victoriametrics.com/vmbackup.html) and [vmrestore](https://docs.victoriametrics.com/vmrestore.html). See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3236), [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3821) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/70) issues.
* FEATURE: log metrics with truncated labels if the length of label value in the ingested metric exceeds `-maxLabelValueLen`. This should simplify debugging for this case.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): show target URL when debugging [target relabeling](https://docs.victoriametrics.com/vmagent.html#relabel-debug). This should simplify target relabel debugging a bit. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3882).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for [VictoriaMetrics remote write protocol](https://docs.victoriametrics.com/vmagent.html#victoriametrics-remote-write-protocol) when [sending / receiving data to / from Kafka](https://docs.victoriametrics.com/vmagent.html#kafka-integration). This protocol allows saving egress network bandwidth costs when sending data from `vmagent` to `Kafka` located in another datacenter or availability zone. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1225).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `-kafka.consumer.topic.concurrency` command-line flag. It controls the number of Kafka consumer workers to use by `vmagent`. It should eliminate the need to start multiple `vmagent` instances to improve data transfer rate. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1957).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for [Kafka producer and consumer](https://docs.victoriametrics.com/vmagent.html#kafka-integration) on `arm64` machines. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2271).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): delete unused buffered data at `-remoteWrite.tmpDataPath` directory when there is no matching `-remoteWrite.url` to send this data to. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/4014).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for hot reload of stream aggregation configs. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3639).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): automatically draw a heatmap graph when the query selects a single [histogram](https://docs.victoriametrics.com/keyConcepts.html#histogram). This simplifies analyzing histograms. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3384).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add support for drag'n'drop and paste from clipboard in the "Trace analyzer" page. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3971).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): hide messages longer than 3 lines in the trace. You can view the full message by clicking on the `show more` button. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3971).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add the ability to manually input date and time when selecting a time range. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3968).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): updated usability and the search process in cardinality explorer. Made this process straightforward for user. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3986).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): automatically disable progress bar when TTY isn't available. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3823).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): add `-configCheckInterval` command-line flag, which can be used for automatic re-reading the `-auth.config` file. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3990).

* BUGFIX: prevent from slow [snapshot creating](https://docs.victoriametrics.com/#how-to-work-with-snapshots) under high data ingestion rate. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3551).
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html):  suppress [proxy protocol](https://www.haproxy.org/download/2.3/doc/proxy-protocol.txt) parsing errors in case of `EOF`. Usually, the error is caused by health checks and is not a sign of an actual error.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix displaying errors for each query. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3987).
* BUGFIX: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): fix snapshot not being deleted in case of error during backup. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2055).
* BUGFIX: allow using dashes and dots in environment variables names referred in config files via `%{ENV-VAR.SYNTAX}`. See [these docs](https://docs.victoriametrics.com/#environment-variables) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3999).
* BUGFIX: return back query performance scalability on hosts with big number of CPU cores. The scalability has been reduced in [v1.86.0](https://docs.victoriametrics.com/CHANGELOG.html#v1860). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3966).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly convert [VictoriaMetrics historgram buckets](https://valyala.medium.com/improving-histogram-usability-for-prometheus-and-grafana-bc7e5df0e350) to Prometheus histogram buckets when VictoriaMetrics histogram contain zero buckets. Previously these buckets were ignored, and this could lead to missing Prometheus histogram buckets after the conversion. Thanks to @zklapow for [the fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/4021).
* BUGFIX: properly support comma-separated filters inside [retention filters](https://docs.victoriametrics.com/#retention-filters). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3915).
* BUGFIX: verify response code when fetching configuration files via HTTP. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/4034).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): replace empty labels with "" instead of "<no value>" during templating, as Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/4012).


## [v1.89.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.89.1)

Released at 2023-03-12

* BUGFIX: prevent from possible `cannot unmarshal timeseries from rollupResultCache` panic after the upgrade to [v1.89.0](https://docs.victoriametrics.com/CHANGELOG.html#v1890).

## [v1.89.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.89.0)

Released at 2023-03-12

**Update note: this release can crash with `cannot unmarshal timeseries from rollupResultCache` panic after the upgrade from the previous releases.
This issue can be fixed by removing caches stored on disk according to [these docs](https://docs.victoriametrics.com/#cache-removal).
Another option is to upgrade to [v1.89.1](https://docs.victoriametrics.com/CHANGELOG.html#v1891).**

* SECURITY: upgrade Go builder from Go1.20.1 to Go1.20.2. See [the list of issues addressed in Go1.20.2](https://github.com/golang/go/issues?q=milestone%3AGo1.20.2+label%3ACherryPickApproved).

* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): increase the default value for `--remote-read-http-timeout` command-line option from 30s (30 seconds) to 5m (5 minutes). This reduces the probability of timeout errors when migrating big number of time series. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3879).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): migrate series one-by-one in [vm-native mode](https://docs.victoriametrics.com/vmctl.html#native-protocol). This allows better tracking the migration progress and resuming the migration process from the last migrated time series. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3859) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3600).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add `--vm-native-src-headers` and `--vm-native-dst-headers` command-line flags, which can be used for setting custom HTTP headers during [vm-native migration mode](https://docs.victoriametrics.com/vmctl.html#native-protocol). Thanks to @baconmania for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3906).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add `--vm-native-src-bearer-token` and `--vm-native-dst-bearer-token` command-line flags, which can be used for setting Bearer token headers for the source and the destination storage during [vm-native migration mode](https://docs.victoriametrics.com/vmctl.html#native-protocol). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3835).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add `--vm-native-disable-http-keep-alive` command-line flag to allow `vmctl` to use non-persistent HTTP connections in [vm-native migration mode](https://docs.victoriametrics.com/vmctl.html#native-protocol). Thanks to @baconmania for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3909).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): log number of configration files found for each specified `-rule` command-line flag.
* FEATURE: [vmalert enterprise](https://docs.victoriametrics.com/vmalert.html): concurrently [read config files from S3, GCS or S3-compatible object storage](https://docs.victoriametrics.com/vmalert.html#reading-rules-from-object-storage). This significantly improves config load speed for cases when there are thousands of files to read from the object storage.

* BUGFIX: vmstorage: fix a bug, which could lead to incomplete or empty results for heavy queries selecting tens of thousands of time series. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3946).
* BUGFIX: vmselect: reduce memory usage and CPU usage when performing heavy queries. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3692).
* BUGFIX: prevent from possible `invalid memory address or nil pointer dereference` panic during [background merge](https://docs.victoriametrics.com/#storage). The issue has been introduced at [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3897).
* BUGFIX: prevent from possible `SIGBUS` crash on ARM architectures (Raspberry Pi), which deny unaligned access to 8-byte words. Thanks to @oliverpool for narrowing down the issue and for [the initial attempt to fix it](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3927).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): always return `is_partial: true` in partial responses. Previously partial responses could be returned as non-partial in some cases.
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): properly take into account `-rpc.disableCompression` command-line flag at `vmstorage`. It was ignored since [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3932).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix panic when [writing data to Kafka](https://docs.victoriametrics.com/vmagent.html#writing-metrics-to-kafka). The panic has been introduced in [v1.88.0](https://docs.victoriametrics.com/CHANGELOG.html#v1880).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): stop showing `Please enter a valid Query and execute it` error message on the first load of vmui.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly process `Run in VMUI` button click in [VictoriaMetrics datasource plugin for Grafana](https://github.com/VictoriaMetrics/grafana-datasource).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix the display of the selected value for dropdowns on `Explore` page.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): do not send `step` param for instant queries. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3896).
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html): fix `cannot serve http` panic when plain HTTP request is sent to `vmauth` configured to accept requests over [proxy protocol](https://www.haproxy.org/download/2.3/doc/proxy-protocol.txt)-encoded request (e.g. when `vmauth` runs with `-httpListenAddr.useProxyProtocol` command-line flag). The issue has been introduced at [v1.87.0](https://docs.victoriametrics.com/CHANGELOG.html#v1870) when implementing [this feature](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3335).
* BUGFIX: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): properly parse RSA public key discovered via JWK endpoint.

## [v1.88.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.88.1)

Released at 2023-02-27

* FEATURE: add `-snapshotCreateTimeout` flag to allow configuring timeout for [snapshot process](https://docs.victoriametrics.com/#how-to-work-with-snapshots). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3551).
* FEATURE: expose `vm_http_requests_total` and `vm_http_request_errors_total` metrics for `snapshot/*` [paths](https://docs.victoriametrics.com/#how-to-work-with-snapshots) at [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html) `vmstorage` and [VictoriaMetrics Single](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3551).
* FEATURE: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): add the ability to discover keys for JWT verification via [OpenID discovery endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html). See [these docs](https://docs.victoriametrics.com/vmgateway.html#using-openid-discovery-endpoint-for-jwt-signature-verification).
* FEATURE: add `-internStringDisableCache` command-line flag for disabling the cache for [interned strings](https://en.wikipedia.org/wiki/String_interning). This flag may be useful in [some cases](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3863) for reducing memory usage at the cost of higher CPU usage.
* FEATURE: add `-internStringCacheExpireDuration` command-line flag for controlling the lifetime of cached [interned strings](https://en.wikipedia.org/wiki/String_interning).

* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): fix panic when executing the query `aggr_func(rollup*(some_value))`. The panic has been introduced in [v1.88.0](https://docs.victoriametrics.com/CHANGELOG.html#v1880).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): use the provided `-remoteWrite.*` auth options when determining whether the remote storage supports [VictoriaMetrics remote write protocol](https://docs.victoriametrics.com/vmagent.html#victoriametrics-remote-write-protocol). Previously the auth options were ignored. This was preventing from automatic switch to VictoriaMetrics remote write protocol.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not register `vm_promscrape_config_*` metrics if `-promscrape.config` flag is not used. Previously those metrics were registered and never updated, which was confusing and could trigger false-positive alerts.
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): skip measurements with no fields when migrating data from influxdb. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3837).
* BUGFIX: delete failed snapshot contents from disk on failed attempt to [create snapshot](https://docs.victoriametrics.com/#how-to-work-with-snapshots). Previously failed snapshot contents could remain on disk in incomplete state. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3858)

## [v1.88.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.88.0)

Released at 2023-02-24

* SECURITY: upgrade base docker image (alpine) from 3.17.1 to 3.17.2. See [alpine 3.17.2 release notes](https://alpinelinux.org/posts/Alpine-3.17.2-released.html).
* SECURITY: upgrade Go builder from Go1.20.0 to Go1.20.1. See [the list of issues addressed in Go1.20.1](https://github.com/golang/go/issues?q=milestone%3AGo1.20.1+label%3ACherryPickApproved).

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for [VictoriaMetrics remote write protocol](https://docs.victoriametrics.com/vmagent.html#victoriametrics-remote-write-protocol). This protocol allows saving egress network bandwidth costs when sending data from `vmagent` to VictoriaMetrics located in another datacenter or availability zone. This also allows reducing disk IO under high load when `vmagent` starts queuing the collected data to disk when the remote storage is temporarily unavailable or cannot keep up with the data ingestion rate. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1225).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for [Kuma](http://kuma.io/) Control Plane targets discovery aka [kuma_sd_configs](https://docs.victoriametrics.com/sd_configs.html#kuma_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3389).
* FEATURE: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): add the ability to verify JWT signature via [JWKS endpoint](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets). See [these docs](https://docs.victoriametrics.com/vmgateway.html#using-jwks-endpoint-for-jwt-signature-verification).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): add the ability to limit the number of concurrent requests on a per-user basis via `-maxConcurrentPerUserRequests` command-line flag and via `max_concurrent_requests` config option. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3346) and [these docs](https://docs.victoriametrics.com/vmauth.html#concurrency-limiting).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): automatically retry failing `GET` requests on all [the configured backends](https://docs.victoriametrics.com/vmauth.html#load-balancing). Previously the backend error has been immediately returned to the client without retrying the request on the remaining backends.
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): choose the backend with the minimum number of concurrently executed requests [among the configured backends](https://docs.victoriametrics.com/vmauth.html#load-balancing) in a round-robin manner for serving the incoming requests. This allows spreading the load among backends more evenly, while improving the response time.
* FEATURE: [vmalert enterprise](https://docs.victoriametrics.com/vmalert.html): add ability to read alerting and recording rules from S3, GCS or S3-compatible object storage. See [these docs](https://docs.victoriametrics.com/vmalert.html#reading-rules-from-object-storage).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): automatically retry requests to remote storage if up to 5 errors occur during the data migration process. This should help continuing the data migration process on temporary errors. Previously `vmctl` was stopping after the first error. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3600).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): support optional 2nd argument `min`, `max` or `avg` for [rollup](https://docs.victoriametrics.com/MetricsQL.html#rollup), [rollup_delta](https://docs.victoriametrics.com/MetricsQL.html#rollup_delta), [rollup_deriv](https://docs.victoriametrics.com/MetricsQL.html#rollup_deriv), [rollup_increase](https://docs.victoriametrics.com/MetricsQL.html#rollup_increase), [rollup_rate](https://docs.victoriametrics.com/MetricsQL.html#rollup_rate) and [rollup_scrape_interval](https://docs.victoriametrics.com/MetricsQL.html#rollup_scrape_interval) function. If the second argument is passed, then the function returns only the selected aggregation type. This change can be useful for situations where only one type of rollup calculation is needed. For example, `rollup_rate(requests_total[1i], "max")` would return only the max increase rates for `requests_total` metric per each interval between adjacent points on the graph. See [this article](https://valyala.medium.com/why-irate-from-prometheus-doesnt-capture-spikes-45f9896d7832) for details.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): support optional 2nd argument `open`, `low`, `high`, `close` for [rollup_candlestick](https://docs.victoriametrics.com/MetricsQL.html#rollup_candlestick) function. If the second argument is passed, then the function returns only the selected aggregation type.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add [share(q)](https://docs.victoriametrics.com/MetricsQL.html#share) aggregate function.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `mad_over_time(m[d])` function for calculating the [median absolute deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) over raw samples on the lookbehind window `d`. See [this feature request](https://github.com/prometheus/prometheus/issues/5514).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `range_mad(q)` function for calculating the [median absolute deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) over points per each time series returned by `q`.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `range_zscore(q)` function for calculating [z-score](https://en.wikipedia.org/wiki/Standard_score) over points per each time series returned from `q`.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `range_trim_outliers(k, q)` function for dropping outliers located farther than `k*range_mad(q)` from the `range_median(q)`. This should help removing outliers during query time at [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3759).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `range_trim_zscore(z, q)` function for dropping outliers located farther than `z*range_stddev(q)` from `range_avg(q)`. This should help removing outliers during query time at [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3759).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): show `median` instead of `avg` in graph tooltip and line legend, since `median` is more tolerant against spikes. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3706).
* FEATURE: add `-search.maxSeriesPerAggrFunc` command-line flag, which can be used for limiting the number of time series [MetricsQL aggregate functions](https://docs.victoriametrics.com/MetricsQL.html#aggregate-functions) can return in a single query. This flag can be useful for preventing OOMs when [count_values](https://docs.victoriametrics.com/MetricsQL.html#count_values) function is improperly used.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): small UX improvements for mobile view. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3707) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3848).
* FEATURE: add `-search.logQueryMemoryUsage` command-line flag for logging queries, which need more memory than specified by this command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3553). Thanks to @michal-kralik for the idea and the intial implementation.
* FEATURE: allow setting zero value for `-search.latencyOffset` command-line flag. This may be needed in [some cases](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2061#issuecomment-1299109836). Previously the minimum supported value for `-search.latencyOffset` command-line flag was `1s`.

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): immediately cancel in-flight scrape requests during configuration reload when [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode) is disabled. Previously `vmagent` could wait for long time until all the in-flight requests are completed before reloading the configuration. This could significantly slow down configuration reload. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3747).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not wait for 2 seconds after the first unsuccessful attempt to scrape the target before performing the next attempt. This should improve scrape speed when the target closes [http keep-alive connection](https://en.wikipedia.org/wiki/HTTP_persistent_connection) between scrapes. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3293) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3747) issues.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix [Azure service discovery](https://docs.victoriametrics.com/sd_configs.html#azure_sd_configs) inside [Azure Container App](https://learn.microsoft.com/en-us/azure/container-apps/overview). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3830). Thanks to @MattiasAng for the fix!
* BUGFIX: do not put auxiliary directories scheduled for removal into snapshots. This should prevent from `cannot create hard links from ...must-remove...` errors when making snapshots / backups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3858).
* BUGFIX: prevent from possible data ingestion slowdown and query performance slowdown during [background merges of big parts](https://docs.victoriametrics.com/#storage) on systems with small number of CPU cores (1 or 2 CPU cores). The issue has been introduced in [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850) when implementing [this feature](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3337). See also [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3790).
* BUGFIX: properly parse timestamps in milliseconds when [ingesting data via OpenTSDB telnet put protocol](https://docs.victoriametrics.com/#sending-data-via-telnet-put-protocol). Previously timestamps in milliseconds were mistakenly multiplied by 1000. Thanks to @Droxenator for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3810).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): do not add extrapolated points outside the real points when using [interpolate()](https://docs.victoriametrics.com/MetricsQL.html#interpolate) function. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3816).

## [v1.87.3](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.87.3)

Released at 2023-03-12

**v1.87.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.87.x line will be supported for at least 12 months since [v1.87.0](https://docs.victoriametrics.com/CHANGELOG.html#v1870) release**

* SECURITY: upgrade Go builder from Go1.20.1 to Go1.20.2. See [the list of issues addressed in Go1.20.2](https://github.com/golang/go/issues?q=milestone%3AGo1.20.2+label%3ACherryPickApproved).

* BUGFIX: vmstorage: fix a bug, which could lead to incomplete or empty results for heavy queries selecting tens of thousands of time series. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3946).
* BUGFIX: vmselect: reduce memory usage and CPU usage when performing heavy queries. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3692).
* BUGFIX: prevent from possible `invalid memory address or nil pointer dereference` panic during [background merge](https://docs.victoriametrics.com/#storage). The issue has been introduced at [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3897).
* BUGFIX: prevent from possible `SIGBUS` crash on ARM architectures (Raspberry Pi), which deny unaligned access to 8-byte words. Thanks to @oliverpool for narrowing down the issue and for [the initial attempt to fix it](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3927).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): always return `is_partial: true` in partial responses. Previously partial responses could be returned as non-partial in some cases.
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): properly take into account `-rpc.disableCompression` command-line flag at `vmstorage`. It was ignored since [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3932).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not register `vm_promscrape_config_*` metrics if `-promscrape.config` flag is not used. Previously those metrics were registered and never updated, which was confusing and could trigger false-positive alerts.
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): skip measurements with no fields when migrating data from influxdb. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3837).
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html): fix `cannot serve http` panic when plain HTTP request is sent to `vmauth` configured to accept requests over [proxy protocol](https://www.haproxy.org/download/2.3/doc/proxy-protocol.txt)-encoded request (e.g. when `vmauth` runs with `-httpListenAddr.useProxyProtocol` command-line flag). The issue has been introduced at [v1.87.0](https://docs.victoriametrics.com/CHANGELOG.html#v1870) when implementing [this feature](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3335).

## [v1.87.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.87.2)

Released at 2023-02-24

**v1.87.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.87.x line will be supported for at least 12 months since [v1.87.0](https://docs.victoriametrics.com/CHANGELOG.html#v1870) release**

* SECURITY: upgrade base docker image (alpine) from 3.17.1 to 3.17.2. See [alpine 3.17.2 release notes](https://alpinelinux.org/posts/Alpine-3.17.2-released.html).
* SECURITY: upgrade Go builder from Go1.20.0 to Go1.20.1. See [the list of issues addressed in Go1.20.1](https://github.com/golang/go/issues?q=milestone%3AGo1.20.1+label%3ACherryPickApproved).

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): immediately cancel in-flight scrape requests during configuration reload when [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode) is disabled. Previously `vmagent` could wait for long time until all the in-flight requests are completed before reloading the configuration. This could significantly slow down configuration reload. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3747).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not wait for 2 seconds after the first unsuccessful attempt to scrape the target before performing the next attempt. This should improve scrape speed when the target closes [http keep-alive connection](https://en.wikipedia.org/wiki/HTTP_persistent_connection) between scrapes. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3293) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3747) issues.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix [Azure service discovery](https://docs.victoriametrics.com/sd_configs.html#azure_sd_configs) inside [Azure Container App](https://learn.microsoft.com/en-us/azure/container-apps/overview). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3830). Thanks to @MattiasAng for the fix!
* BUGFIX: do not put auxiliary directories scheduled for removal into snapshots. This should prevent from `cannot create hard links from ...must-remove...` errors when making snapshots / backups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3858).
* BUGFIX: prevent from possible data ingestion slowdown and query performance slowdown during [background merges of big parts](https://docs.victoriametrics.com/#storage) on systems with small number of CPU cores (1 or 2 CPU cores). The issue has been introduced in [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850) when implementing [this feature](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3337). See also [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3790).
* BUGFIX: properly parse timestamps in milliseconds when [ingesting data via OpenTSDB telnet put protocol](https://docs.victoriametrics.com/#sending-data-via-telnet-put-protocol). Previously timestamps in milliseconds were mistakenly multiplied by 1000. Thanks to @Droxenator for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3810).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): do not add extrapolated points outside the real points when using [interpolate()](https://docs.victoriametrics.com/MetricsQL.html#interpolate) function. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3816).

## [v1.87.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.87.1)

Released at 2023-02-09

**v1.87.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.87.x line will be supported for at least 12 months since [v1.87.0](https://docs.victoriametrics.com/CHANGELOG.html#v1870) release**

* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): alerts state restore procedure was changed to become asynchronous. It doesn't block groups start anymore which significantly improves vmalert's startup time.
  This also means that `-remoteRead.ignoreRestoreErrors` command-line flag becomes deprecated now and will have no effect if configured.
  While previously state restore attempt was made for all the loaded alerting rules, now it is called only for alerts which became active after the first evaluation. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2608).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): optimize VMUI for use from smartphones and tablets. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3707).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add ability to search tenants in the drop-down list for the tenant selector. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3792).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add avg/min/max/last values to line legends and tooltips for graphs. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3706).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): hide the default `per-job resource usage` dashboard if there is a custom dashboard exists at the directory specified via `-vmui.customDashboardsPath` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3740).

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix panic in [HashiCorp Nomad service discovery](https://docs.victoriametrics.com/sd_configs.html#nomad_sd_configs). Thanks to @mr-karan for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3784).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): fix display of rules number per-group for groups with identical names in UI.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): prevent disabling state updates tracking per rule via setting values < 1. The minimum number of update states to track is now set to 1.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly update `debug` and `update_entries_limit` rule's params on config's hot-reload.
* BUGFIX: properly initialize the `vm_concurrent_insert_current` metric before exposing it. Previously this metric could be left uninitialized in some cases, e.g. its value was zero. This could lead to false alerts for the query `avg_over_time(vm_concurrent_insert_current[1m]) >= vm_concurrent_insert_capacity`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3761).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): immediately cancel in-flight scrape requests during configuration reload when using [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). Previously `vmagent` could wait for long time until all the in-flight requests are completed before reloading the configuration. This could significantly slow down configuration reload. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3747).
* BUGFIX: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): do not validate JWT signature if no public keys are provided. Previously this could result in the `error setting up jwt verification` error.

## [v1.87.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.87.0)

Released at 2023-02-01

**v1.87.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.87.x line will be supported for at least 12 months since [v1.87.0](https://docs.victoriametrics.com/CHANGELOG.html#v1870) release**

* FEATURE: [stream aggregation](https://docs.victoriametrics.com/stream-aggregation.html): add the ability to [de-duplicate](https://docs.victoriametrics.com/#deduplication) input samples before aggregation via `-streamAggr.dedupInterval` and `-remoteWrite.streamAggr.dedupInterval` command-line options.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add dark mode - it can be selected via `settings` menu in the top right corner. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3704).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): improve visual appearance of the top menu. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3678).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): embed fonts into binary instead of loading them from external sources. This allows using `vmui` in full from isolated networks without access to Internet. Thanks to @ScottKevill for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3696).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add ability to switch between tenants by selecting the needed tenant in the drop-down list at the top right corner of the UI. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3673).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): reduce memory usage when sending stale markers for targets, which expose big number of metrics. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3668) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3675) issues.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `__meta_kubernetes_pod_container_id` meta-label to the targets discovered via [kubernetes_sd_configs](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs). This label has been added in Prometheus starting from `v2.42.0`. See [this feature request](https://github.com/prometheus/prometheus/issues/11843).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `__meta_azure_machine_size` meta-label to the targets discovered via [azure_sd_configs](https://docs.victoriametrics.com/sd_configs.html#azure_sd_configs). This label has been added in Prometheus starting from `v2.42.0`. See [this pull request](https://github.com/prometheus/prometheus/pull/11650).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): allow limiting the number of concurrent requests sent to `vmauth` via `-maxConcurrentRequests` command-line flag. This allows controlling memory usage of `vmauth` and the resource usage of backends behind `vmauth`. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3346). Thanks to @dmitryk-dk for [the initial implementation](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3486).
* FEATURE: allow using VictoriaMetrics components behind proxies, which communicate with the backend via [proxy protocol](https://www.haproxy.org/download/2.3/doc/proxy-protocol.txt). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3335). For example, [vmauth](https://docs.victoriametrics.com/vmauth.html) accepts proxy protocol connections when it starts with `-httpListenAddr.useProxyProtocol` command-line flag.
* FEATURE: add `-internStringMaxLen` command-line flag, which can be used for fine-tuning RAM vs CPU usage in certain workloads. For example, if the stored time series contain long labels, then it may be useful reducing the `-internStringMaxLen` in order to reduce memory usage at the cost of increased CPU usage. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3692).
* FEATURE: provide GOARCH=386 binaries for single-node VictoriaMetrics, vmagent, vmalert, vmauth, vmbackup and vmrestore components at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3661). Thanks to @denisgolius for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3725).

* BUGFIX: fix a bug, which could prevent background merges for the previous partitions until restart if the storage didn't have enough disk space for final deduplication and down-sampling.
* BUGFIX: fix a bug, which could lead to increased CPU usage and disk IO usage when adding data to previous months and when the [deduplication](https://docs.victoriametrics.com/#deduplication) or [downsampling](https://docs.victoriametrics.com/#downsampling) is enabled. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3737).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): propagate all the timeout-related errors from `vmstorage` to `vmselect`. Previously some timeout errors weren't returned from `vmselect` to `vmstorage`. Instead, `vmstorage` could log the error and close the connection to `vmselect`, so `vmselect` was logging cryptic errors such as `cannot execute funcName="..." on vmstorage "...": EOF`.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): add support for time zone selection for older versions of browsers. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3680).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): update API version for [ec2_sd_configs](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs) to fix [the issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3700) with missing `__meta_ec2_availability_zone_id` attribute.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly return `200 OK` HTTP status code when importing data via [Pushgateway protocol](https://docs.victoriametrics.com/#how-to-import-data-in-prometheus-exposition-format). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3636).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not add `exported_` prefix to scraped metric names, which clash with the [automatically generated metric names](https://docs.victoriametrics.com/vmagent.html#automatically-generated-metrics) if `honor_labels: true` option is set in the [scrape_config](https://docs.victoriametrics.com/sd_configs.html#scrape_configs). See the [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3557) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3406) issues.
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html): allow re-entering authorization info in the web browser if the entered info was incorrect. Previously it was non-trivial to do via the web browser, since `vmauth` was returning `400 Bad Request` instead of `401 Unauthorized` http response code.
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html): always log the client address and the requested URL on proxying errors. Previously some errors could miss this information.
* BUGFIX: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): fix snapshot not being deleted after backup completion. This issue could result in unnecessary snapshots being stored, it is required to delete unnecessary snapshots manually. See the [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3735).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): fix panic on top-level vmselect nodes of [multi-level setup](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup) when the `-replicationFactor` flag is set and request contains `trace` query parameter. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3734).

## [v1.86.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.86.2)

Released at 2023-01-18

* SECURITY: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): do not expose basic auth passwords from `-snapshot.createURL` and `-snapshot.deleteURL` command-line flags in logs. Thanks to @toanju for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3672).

* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add ability to show custom dashboards at vmui by specifying a path to a directory with dashboard config files via `-vmui.customDashboardsPath` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3322) and [these docs](https://github.com/VictoriaMetrics/VictoriaMetrics/tree/master/app/vmui/packages/vmui/public/dashboards).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): apply the `step` globally to all the displayed graphs. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3574).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): improve the appearance of graph lines by using more visually distinct colors. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3571).

* BUGFIX: do not slow down concurrently executed queries during assisted merges, since assisted merges already prioritize data ingestion over queries. The probability of assisted merges has been increased starting from [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850) because of internal refactoring. This could result in slowed down queries when there is a plenty of free CPU resources. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3647) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3641) issues.
* BUGFIX: reduce the increased CPU usage at `vmselect` to v1.85.3 level when processing heavy queries. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3641).
* BUGFIX: [retention filters](https://docs.victoriametrics.com/#retention-filters): fix `FATAL: cannot locate metric name for metricID=...: EOF` panic, which could occur when retention filters are enabled.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly cancel in-flight service discovery requests for [consul_sd_configs](https://docs.victoriametrics.com/sd_configs.html#consul_sd_configs) and [nomad_sd_configs](https://docs.victoriametrics.com/sd_configs.html#nomad_sd_configs) when the service list changes. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3468).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): [dockerswarm_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs): apply `filters` only to objects of the specified `role`. Previously filters were applied to all the objects, which could cause errors when different types of objects were used with filters that were not compatible with them. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3579).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): suppress all the scrape errors when `-promscrape.suppressScrapeErrors` is enabled. Previously some scrape errors were logged even if `-promscrape.suppressScrapeErrors` flag was set.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): consistently put the scrape url with scrape target labels to all error logs for failed scrapes. Previously some failed scrapes were logged without this information.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not send stale markers to remote storage for series exceeding the configured [series limit](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3660).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly apply [series limit](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter) when [staleness tracking](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) is disabled.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): reduce memory usage spikes when big number of scrape targets disappear at once. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3668). Thanks to @lzfhust for [the initial fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3669).
* BUGFIX: [Pushgateway import](https://docs.victoriametrics.com/#how-to-import-data-in-prometheus-exposition-format): properly return `200 OK` HTTP response code. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3636).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly parse `M` and `Mi` suffixes as `1e6` multipliers in `1M` and `1Mi` numeric constants. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3664). The issue has been introduced in [v1.86.0](https://docs.victoriametrics.com/CHANGELOG.html#v1860).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly display range query results at `Table` view. For example, `up[5m]` query now shows all the raw samples for the last 5 minutes for the `up` metric at the `Table` view. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3516).

## [v1.86.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.86.1)

Released at 2023-01-10

* BUGFIX: return correct query results over time series with gaps. The issue has been introduced in [v1.86.0](https://docs.victoriametrics.com/CHANGELOG.html#v1860).
* BUGFIX: properly take into account the timeout passed by `vmselect` to `vmstorage` during query execution. This issue could result in the following error logs at `vmstorage` under load: `cannot process vmselect request: cannot execute "search_v7": couldn't start executing the request in 0.000 seconds, since -search.maxConcurrentRequests=... concurrent requests are already executed`. The issue has been introduced in [v1.86.0](https://docs.victoriametrics.com/CHANGELOG.html#v1860).


## [v1.86.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.86.0)

Released at 2023-01-10

**It is recommended upgrading to [VictoriaMetrics v1.86.1](https://docs.victoriametrics.com/CHANGELOG.html#v1861) because v1.86.0 contains a bug, which could lead to incorrect query results over time series with gaps.**

**Update note 1:** This release changes the logic behind `-maxConcurrentInserts` command-line flag. Previously this flag was limiting the number of concurrent connections established from clients, which send data to VictoriaMetrics. Some of these connections could be temporarily idle. Such connections do not take significant CPU and memory resources, so there is no need in limiting their count. The new logic takes into account only those connections, which **actively** ingest new data to VictoriaMetrics and to [vmagent](https://docs.victoriametrics.com/vmagent.html). This means that the default `-maxConcurrentInserts` value should handle cases, which could require increasing the value in the previous releases. So it is recommended trying to remove the explicitly set `-maxConcurrentInserts` command-line flag after upgrading to this release and verifying whether this reduces CPU and memory usage.

**Update note 2:** The `vm_concurrent_addrows_current` and `vm_concurrent_addrows_capacity` metrics [exported](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#monitoring) by `vmstorage` are replaced with `vm_concurrent_insert_current` and `vm_concurrent_insert_capacity` metrics in order to be consistent with the corresponding metrics exported by `vminsert`. Please update queries in dahsboards and alerting rules with new metric names if old metric names are used there.

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for aggregation of incoming [samples](https://docs.victoriametrics.com/keyConcepts.html#raw-samples) by time and by labels. See [these docs](https://docs.victoriametrics.com/stream-aggregation.html) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3460).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): reduce memory usage when scraping big number of targets without the need to enable [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for Prometheus-compatible target discovery for [HashiCorp Nomad](https://www.nomadproject.io/) services via [nomad_sd_configs](https://docs.victoriametrics.com/sd_configs.html#nomad_sd_configs). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3367). Thanks to @mr-karan for [the implementation](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3549).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): automatically pre-fetch `metric_relabel_configs` and the target labels when clicking on the `debug metrics relabeling` link at the `http://vmagent:8429/targets` page at the particular target. See [these docs](https://docs.victoriametrics.com/vmagent.html#relabel-debug).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add ability to explore metrics exported by a particular `job` / `instance`. See [these docs](https://docs.victoriametrics.com/#metrics-explorer) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3386).
* FEATURE: allow passing partial `RFC3339` date/time to `time`, `start` and `end` query args at [querying APIs](https://docs.victoriametrics.com/#prometheus-querying-api-usage) and [export APIs](https://docs.victoriametrics.com/#how-to-export-time-series). For example, `2022` is equivalent to `2022-01-01T00:00:00Z`, while `2022-01-30T14` is equivalent to `2022-01-30T14:00:00Z`. See [these docs](https://docs.victoriametrics.com/#timestamp-formats).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): allow using unicode letters in identifiers. For example, `температура{город="Киев"}` is a valid MetricsQL expression now. Previously every non-ascii letters should be escaped with `\` char when used inside MetricsQL expression: `\т\е\м\п\е\р\а\т\у\р\а{\г\о\р\о\д="Киев"}`. Now both expressions are equivalent. Thanks to @hzwwww for the [pull request](https://github.com/VictoriaMetrics/metricsql/pull/7).
* FEATURE: [relabeling](https://docs.victoriametrics.com/vmagent.html#relabeling): add support for `keepequal` and `dropequal` relabeling actions, which are supported by Prometheus starting from [v2.41.0](https://github.com/prometheus/prometheus/releases/tag/v2.41.0). These relabeling actions are almost identical to `keep_if_equal` and `drop_if_equal` relabeling actions supported by VictoriaMetrics since `v1.38.0` - see [these docs](https://docs.victoriametrics.com/vmagent.html#relabeling-enhancements) - so it is recommended sticking to `keep_if_equal` and `drop_if_equal` actions instead of switching to `keepequal` and `dropequal`.
* FEATURE: [csvimport](https://docs.victoriametrics.com/#how-to-import-csv-data): support empty values for imported metrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3540).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): allow configuring the default number of stored rule's update states in memory via global `-rule.updateEntriesLimit` command-line flag or per-rule via rule's `update_entries_limit` configuration param. See [these docs](https://docs.victoriametrics.com/vmalert.html#rules) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3556).
* FEATURE: improve the logic benhind `-maxConcurrentInserts` command-line flag. Previously this flag was limiting the number of concurrent connections from clients, which write data to VictoriaMetrics or [vmagent](https://docs.victoriametrics.com/vmagent.html). Some of these connections could be idle for some time. These connections do not need significant amounts of CPU and memory, so there is no sense in limiting their count. The updated logic behind `-maxConcurrentInserts` limits the number of **active** insert requests, not counting idle connections.
* FEATURE: protect all the http endpoints with `-httpAuth.*` command-line flag. Previously endpoints protected by `-*AuthKey` command-line flags weren't protected by `-httpAuth.*`. This could complicate the proper security setup. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3060).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add `-maxConcurrentInserts` and `-insert.maxQueueDuration` command-line flags to `vmstorage`, so they could be tuned if needed in the same way as at `vminsert` nodes.
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): limit the number of concurrently executed requests at `vmstorage` proportionally to the number of available CPU cores, since every request can saturate a single CPU core at `vmstorage`. Previously a single `vmstorage` could accept and start processing arbitrary number of concurrent requests received from big number of `vmselect` nodes. This could result in increased RAM, CPU and disk IO usage or event to out of memory crash at `vmstorage` side under high load. The limit can be fine-tuned if needed via `-search.maxConcurrentRequests` command-line flag at `vmstorage` according to [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#resource-usage-limits). `vmstorage` now [exposes](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#monitoring) the following additional metrics at `http://vmstorage:8482/metrics` page:
  - `vm_vmselect_concurrent_requests_capacity` - the maximum number of requests allowed to execute concurrently
  - `vm_vmselect_concurrent_requests_current` - the current number of concurrently executed requests
  - `vm_vmselect_concurrent_requests_limit_reached_total` - the total number of requests, which were put in the wait queue when `-search.maxConcurrentRequests` concurrent requests are being executed
  - `vm_vmselect_concurrent_requests_limit_timeout_total` - the total number of canceled requests because they were sitting in the wait queue for more than `-search.maxQueueDuration`

* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly update the `step` value in url after the `step` input field has been manually changed. This allows preserving the proper `step` when copy-n-pasting the url to another instance of web browser. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3513).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly update tooltip when quickly hovering multiple lines on the graph. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3530).
* BUGFIX: properly parse floating-point numbers without integer or fractional parts such as `.123` and `20.` during [data import](https://docs.victoriametrics.com/#how-to-import-time-series-data). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3544).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly parse durations with uppercase suffixes such as `10S`, `5MS`, `1W`, etc. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3589).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix a panic during target discovery when `vmagent` runs with `-promscrape.dropOriginalLabels` command-line flag. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3580). The bug has been introduced in [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): [dockerswarm_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs): properly encode `filters` field. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3579).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix possible resource leak after hot reload of the updated [consul_sd_configs](https://docs.victoriametrics.com/sd_configs.html#consul_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3468).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix a panic in [gce_sd_configs](https://docs.victoriametrics.com/sd_configs.html#gce_sd_configs) when the discovered instance has zero labels. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3624). The issue has been introduced in [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850).
* BUGFIX: properly return label names starting from uppercase such as `CamelCaseLabel` from [/api/v1/labels](https://docs.victoriametrics.com/url-examples.html#apiv1labels). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3566).
* BUGFIX: fix `opentsdb` HTTP endpoint not respecting `-httpAuth.*` flags. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3060)
* BUGFIX: consistently select the sample with the biggest value out of samples with identical timestamps during querying when the [deduplication](https://docs.victoriametrics.com/#deduplication) is enabled according to [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3333). Previously random samples could be selected during querying.


## [v1.85.3](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.85.3)

Released at 2022-12-20

**Update note 1:** This and newer releases of VictoriaMetrics may return gaps for `rate(m[d])` queries on short time ranges if `[d]` lookbehind window is set expliticly. For example, `rate(http_requests_total[$__interval])`. This reduces confusion level when the user expects the needed results from the query with explicitly set lookbehind window. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3483). The previous gap filling behaviour can be restored by removing explicit lookbehind window `[d]` from the query, e.g. by substituting the `rate(m[d])` with `rate(m)`. See [these docs](https://docs.victoriametrics.com/MetricsQL.html#implicit-query-conversions) for details.

* BUGFIX: fix `error when searching for TSIDs by metricIDs in the previous indexdb: EOF` error, which can occur during queries after unclean shutdown of VictoriaMetrics (e.g. via hardware reset, out of memory crash or `kill -9`). The error has been introduced in [v1.85.2](https://docs.victoriametrics.com/CHANGELOG.html#v1852). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3515).
* BUGFIX: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): expose proper values for `vm_downsampling_partitions_scheduled` and `vm_downsampling_partitions_scheduled_size_bytes` metrics, which were added at [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2612).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): never extend explicitly set lookbehind window for [rate()](https://docs.victoriametrics.com/MetricsQL.html#rate) function. This reduces the level of confusion when the user expects the needed results after explicitly seting the lookbehind window `[d]` in the query `rate(m[d])`. Previously VictoriaMetrics could silently extend the lookbehind window, so it covers at least two raw samples. Now this behavior works only if the lookbehind window in square brackets isn't set explicitly, e.g. in the case of `rate(m)`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3483) for details.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): respect `-usePromCompatibleNaming` flag if no relabeling or extra labels were set. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3511) for details.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix the wrong legend when queries are hidden. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3512).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix incorrect time selection after the timezone change. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3519).


## [v1.85.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.85.2)

Released at 2022-12-19

* FEATURE: support overriding of `-search.latencyOffset` value via URL param `latency_offset` when performing requests to [/api/v1/query](https://docs.victoriametrics.com/keyConcepts.html#instant-query) and [/api/v1/query_range](https://docs.victoriametrics.com/keyConcepts.html#range-query). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3481).
* FEATURE: allow changing field names in JSON logs if VictoriaMetrics components are started with `-loggerFormat=json` command-line flags. The field names can be changed with the `-loggerJSONFields` command-line flag. For example `-loggerJSONFields=ts:timestamp,msg:message` would rename `ts` and `msg` fields on the output JSON to `timestamp` and `message` fields. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2348). Thanks to @michal-kralik for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3488).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `__meta_consul_tag_<tagname>` and `__meta_consul_tagpresent_<tagname>` labels for targets discovered via [consul_sd_configs](https://docs.victoriametrics.com/sd_configs.html#consul_sd_configs). This simplifies converting [Consul service tags](https://developer.hashicorp.com/consul/docs/discovery/services#service-definition) to target labels with a simple [relabeling rule](https://docs.victoriametrics.com/vmagent.html#relabeling):

  ```yml
  - action: labelmap
    regex: __meta_consul_tag_(.+)
  ```

  This resolves [this StackOverflow question](https://stackoverflow.com/questions/44339461/relabeling-in-prometheus).

* BUGFIX: properly return query results for time series, which stop receiving new samples after the rotation of `indexdb`. Previously such time series could be missing in query results. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3502). The issue has been introduced in [v1.83.0](https://docs.victoriametrics.com/CHANGELOG.html#v1830).
* BUGFIX: allow specifying values bigger than 2GiB to the following command-line flag values on 32-bit architectures (`386` and `arm`): `-storage.minFreeDiskSpaceBytes` and `-remoteWrite.maxDiskUsagePerURL`. Previously values bigger than 2GiB were incorrectly truncated on these architectures.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): stop dropping metric name by a mistake on the [/metric-relabel-debug](https://docs.victoriametrics.com/vmagent.html#relabel-debug) page.


## [v1.85.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.85.1)

Released at 2022-12-14

**It is recommended upgrading to [VictoriaMetrics v1.85.2](https://docs.victoriametrics.com/CHANGELOG.html#v1852) because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3502), which may result in incomplete query results for historical time series.**

* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): support `$for` or `.For` template variables in alert's annotations. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3246).

* BUGFIX: [DataDog protocol parser](https://docs.victoriametrics.com/#how-to-send-data-from-datadog-agent): do not re-use `host` and `device` fields from the previously parsed messages if these fields are missing in the currently parsed message. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3432).
* BUGFIX: reduce CPU usage when the regex-based relabeling rules are applied to more than 100K unique Graphite metrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3466). The issue was introduced in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820).
* BUGFIX: do not block [merges](https://docs.victoriametrics.com/#storage) of small parts by merges of big parts on hosts with small number of CPU cores. This issue could result in the increasing number of `storage/small` parts while big merge is in progress. This, in turn, could result in increased CPU usage and memory usage during querying, since queries need to inspect bigger number of small parts. The issue has been introduced in [v1.85.0](https://docs.victoriametrics.com/CHANGELOG.html#v1850).
* BUGFIX: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): fix the `The source request body for synchronous copy is too large and exceeds the maximum permissible limit (256MB)` error when performing backups to Azure blob storage. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3477).


## [v1.85.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.85.0)

Released at 2022-12-11

**It is recommended upgrading to [VictoriaMetrics v1.85.2](https://docs.victoriametrics.com/CHANGELOG.html#v1852) because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3502), which may result in incomplete query results for historical time series.**

**Update note 1:** this release drops support for direct upgrade from VictoriaMetrics versions prior [v1.28.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.28.0). Please upgrade to `v1.84.0`, wait until `finished round 2 of background conversion` line is emitted to log by single-node VictoriaMetrics or by `vmstorage`, and then upgrade to newer releases.

**Update note 2:** this release splits `type="indexdb"` metrics into `type="indexdb/inmemory"` and `type="indexdb/file"` metrics. This may break old dashboards and alerting rules, which contain [label filter](https://docs.victoriametrics.com/keyConcepts.html#filtering) on `{type="indexdb"}`. Such label filter must be substituted with `{type=~"indexdb.*"}`, so it matches `indexdb` from the previous releases and `indexdb/inmemory` + `indexdb/file` from new releases. It is recommended upgrading to the latest available dashboards and alerting rules mentioned in [these docs](https://docs.victoriametrics.com/#monitoring), since they already contain fixed label filters.

**Update note 3:** this release deprecates `relabel_debug` and `metric_relabel_debug` config options in [scrape_configs](https://docs.victoriametrics.com/sd_configs.html#scrape_configs). The `-relabelDebug`, `-remoteWrite.relabelDebug` and `-remoteWrite.urlRelabelDebug` command-line options are also deprecated. Use more powerful target-level relabel debugging and metric-level relabel debugging instead as documented [here](https://docs.victoriametrics.com/vmagent.html#relabel-debug).

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): provide enhanced target-level and metric-level relabel debugging. See [these docs](https://docs.victoriametrics.com/vmagent.html#relabel-debug) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3407).
* FEATURE: leave a sample with the biggest value for identical timestamps per each `-dedup.minScrapeInterval` discrete interval when the [deduplication](https://docs.victoriametrics.com/#deduplication) is enabled. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3333).
* FEATURE: add `-inmemoryDataFlushInterval` command-line flag, which can be used for controlling the frequency of in-memory data flush to disk. The data flush frequency can be reduced when VictoriaMetrics stores data to low-end flash device with limited number of write cycles (for example, on Raspberry PI). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3337).
* FEATURE: expose additional metrics for `indexdb` and `storage` parts stored in memory and for `indexdb` parts stored in files (see [storage docs](https://docs.victoriametrics.com/#storage) for technical details):
  * `vm_active_merges{type="storage/inmemory"}` - active merges for in-memory `storage` parts
  * `vm_active_merges{type="indexdb/inmemory"}` - active merges for in-memory `indexdb` parts
  * `vm_active_merges{type="indexdb/file"}` - active merges for file-based `indexdb` parts
  * `vm_merges_total{type="storage/inmemory"}` - the total merges for in-memory `storage` parts
  * `vm_merges_total{type="indexdb/inmemory"}` - the total merges for in-memory `indexdb` parts
  * `vm_merges_total{type="indexdb/file"}` - the total merges for file-based `indexdb` parts
  * `vm_rows_merged_total{type="storage/inmemory"}` - the total rows merged for in-memory `storage` parts
  * `vm_rows_merged_total{type="indexdb/inmemory"}` - the total rows merged for in-memory `indexdb` parts
  * `vm_rows_merged_total{type="indexdb/file"}` - the total rows merged for file-based `indexdb` parts
  * `vm_rows_deleted_total{type="storage/inmemory"}` - the total rows deleted for in-memory `storage` parts
  * `vm_assisted_merges_total{type="storage/inmemory"}` - the total number of assisted merges for in-memory `storage` parts
  * `vm_assisted_merges_total{type="indexdb/inmemory"}` - the total number of assisted merges for in-memory `indexdb` parts
  * `vm_parts{type="storage/inmemory"}` - the total number of in-memory `storage` parts
  * `vm_parts{type="indexdb/inmemory"}` - the total number of in-memory `indexdb` parts
  * `vm_parts{type="indexdb/file"}` - the total number of file-based `indexdb` parts
  * `vm_blocks{type="storage/inmemory"}` - the total number of in-memory `storage` blocks
  * `vm_blocks{type="indexdb/inmemory"}` - the total number of in-memory `indexdb` blocks
  * `vm_blocks{type="indexdb/file"}` - the total number of file-based `indexdb` blocks
  * `vm_data_size_bytes{type="storage/inmemory"}` - the total size of in-memory `storage` blocks
  * `vm_data_size_bytes{type="indexdb/inmemory"}` - the total size of in-memory `indexdb` blocks
  * `vm_data_size_bytes{type="indexdb/file"}` - the total size of file-based `indexdb` blocks
  * `vm_rows{type="storage/inmemory"}` - the total number of in-memory `storage` rows
  * `vm_rows{type="indexdb/inmemory"}` - the total number of in-memory `indexdb` rows
  * `vm_rows{type="indexdb/file"}` - the total number of file-based `indexdb` rows
* FEATURE: [DataDog parser](https://docs.victoriametrics.com/#how-to-send-data-from-datadog-agent): add `device` tag when it is passed in the `device` field is present in the `series` object of the input request. Thanks to @PerGon for the provided [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3431).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): improve [service discovery](https://docs.victoriametrics.com/sd_configs.html) performance when discovering big number of targets (10K and more).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow using `series_limit` option for [limiting the number of series a single scrape target generates](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter) in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3458).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow using `sample_limit` option for limiting the number of metrics a single scrape target can expose in every response sent over [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `exported_` prefix to metric names exported by scrape targets if these metric names clash with [automatically generated metrics](https://docs.victoriametrics.com/vmagent.html#automatically-generated-metrics) such as `up`, `scrape_samples_scraped`, etc. This prevents from corruption of automatically generated metrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3406).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): make the `host` label optional in [DataDog data ingestion protocol](https://docs.victoriametrics.com/#how-to-send-data-from-datadog-agent). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3432).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): improve error message when the requested path cannot be properly parsed, so users could identify the issue and properly fix the path. Now the error message links to [url format docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#url-format). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3402).
* FEATURE: [VictoriaMetrics enterprise cluster](https://docs.victoriametrics.com/enterprise.html): add `-storageNode.discoveryInterval` command-line flag to `vmselect` and `vminsert` to control load on DNS servers when [automatic discovery of vmstorage nodes](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#automatic-vmstorage-discovery) is enabled. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3417).
* FEATURE: [VictoriaMetrics enterprise cluster](https://docs.victoriametrics.com/enterprise.html): allow reading and updating the list of `vmstorage` nodes at `vmselect` and `vminsert` nodes via file. See [automatic discovery of vmstorage](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#automatic-vmstorage-discovery) for details.
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): reduce memory and CPU usage by up to 50% on setups with thousands of recording/alerting groups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3464).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `-remoteWrite.sendTimeout` command-line flag, which allows configuring timeout for sending data to `-remoteWrite.url`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3408).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add ability to migrate data between VictoriaMetrics clusters with automatic tenants discovery. See [these docs](https://docs.victoriametrics.com/vmctl.html#cluster-to-cluster-migration-mode) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2930).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add ability to copy data from sources via Prometheus `remote_read` protocol. See [these docs](https://docs.victoriametrics.com/vmctl.html#migrating-data-by-remote-read-protocol). The related issues: [one](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3132) and [two](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1101).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): allow changing timezones for the requested data. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3075).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): provide fast path for hiding results for all the queries except the given one by clicking `eye` icon with `ctrl` key pressed. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3446).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `range_trim_spikes(phi, q)` function for trimming `phi` percent of the largest spikes per each time series returned by `q`. See [these docs](https://docs.victoriametrics.com/MetricsQL.html#range_trim_spikes).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): allow passing `inf` arg into [limitk](https://docs.victoriametrics.com/MetricsQL.html#limitk), [topk](https://docs.victoriametrics.com/MetricsQL.html#topk), [bottomk](https://docs.victoriametrics.com/MetricsQL.html) and other functions, which accept numeric arg, which limits the number of output time series. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3461).
* FEATURE: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): add support for JWT token signature verification. See [these docs](https://docs.victoriametrics.com/vmgateway.html#jwt-signature-verification) for details.
* FEATURE: put the version of VictoriaMetrics in the first message of [query trace](https://docs.victoriametrics.com/#query-tracing). This should simplify debugging.

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix the `The request did not have a subscription or a valid tenant level resource provider` error when discovering Azure targets with [azure_sd_configs](https://docs.victoriametrics.com/sd_configs.html#azure_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3247).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly pass HTTP headers during the alert state restore procedure. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3418).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly specify rule evaluation step during the [replay mode](https://docs.victoriametrics.com/vmalert.html#rules-backfilling). The `step` value was previously overriden by `-datasource.queryStep` command-line flag.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly return the error message from remote-write failures. Before, error was ignored and only `vmalert_remotewrite_errors_total` was incremented.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix sticky tooltip sizing, which could prevent from closing the tooltip. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3427).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly put multi-line queries in the url, so it could be copy-n-pasted and opened without issues in a new browser tab. Previously the url for multi-line query couldn't be opened. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3444).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): correctly handle `up` and `down` keypresses when editing multi-line queries. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3445).

## [v1.84.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.84.0)

Released at 2022-11-25

**It is recommended upgrading to [VictoriaMetrics v1.85.2](https://docs.victoriametrics.com/CHANGELOG.html#v1852) because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3502), which may result in incomplete query results for historical time series.**

* FEATURE: add support for [Pushgateway data import format](https://github.com/prometheus/pushgateway#url) via `/api/v1/import/prometheus` url. See [these docs](https://docs.victoriametrics.com/#how-to-import-data-in-prometheus-exposition-format) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1415). Thanks to @PerGon for [the intial implementation](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3360).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add `http://<vmselect>:8481/admin/tenants` API endpoint for returning a list of registered tenants. See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#url-format) for details.
* FEATURE: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): add `-storageNode.filter` command-line flag for filtering the [discovered vmstorage nodes](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#automatic-vmstorage-discovery) with arbitrary regular expressions. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3353).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): allow using numeric values with `K`, `Ki`, `M`, `Mi`, `G`, `Gi`, `T` and `Ti` suffixes inside MetricsQL queries. For example `8Ki` equals to `8*1024`, while `8.2M` equals to `8.2*1000*1000`.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add [range_normalize](https://docs.victoriametrics.com/MetricsQL.html#range_normalize) function for normalizing multiple time series into `[0...1]` value range. This function is useful for correlation analysis of time series with distinct value ranges. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3167).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add [range_linear_regression](https://docs.victoriametrics.com/MetricsQL.html#range_linear_regression) function for calculating [simple linear regression](https://en.wikipedia.org/wiki/Simple_linear_regression) over the input time series on the selected time range. This function is useful for predictions and capacity planning. For example, `range_linear_regression(process_resident_memory_bytes)` can predict future memory usage based on the past memory usage.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add [range_stddev](https://docs.victoriametrics.com/MetricsQL.html#range_stddev) and [range_stdvar](https://docs.victoriametrics.com/MetricsQL.html#range_stdvar) functions.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): optimize `expr1 op expr2` query when `expr1` returns an empty result. In this case there is no sense in executing `expr2` for `op` not equal to `or`, since the end result will be empty according to [PromQL series matching rules](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3349). Thanks to @jianglinjian for pointing to this case.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add the ability to upload/paste JSON to investigate the trace. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3308) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3310).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): reduce JS bundle size from 200Kb to 100Kb. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3298).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add the ability to hide results of a particular query by clicking the `eye` icon. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3359).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add copy button to row on Table view. The button copies row in MetricQL format. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2815).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add compact table view. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3241).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add the ability to "stick" a tooltip on the chart by clicking on a data point. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3321) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3376)
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add the ability to set up series custom limits. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3297).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add default alert list for vmalert's metrics. See [alerts-vmalert.yml](https://github.com/VictoriaMetrics/VictoriaMetrics/blob/master/deployment/docker/alerts-vmalert.yml).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `vmagent_relabel_config_*`, `vm_relabel_config_*` and `vm_promscrape_config_*` metrics for tracking relabel and scrape configuration hot-reloads. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3345).

* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly return an empty result from [limit_offset](https://docs.victoriametrics.com/MetricsQL.html#limit_offset) if the `offset` arg exceeds the number of inner time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3312).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly discover GCE zones when `filter` option is set at [gce_sd_configs](https://docs.victoriametrics.com/sd_configs.html#gce_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3202).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly display the requested graph on the requested time range when navigating from Prometheus URL in Grafana.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly display wide tables. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3153).
* BUGFIX: reduce CPU usage spikes and memory usage spikes under high data ingestion rate introduced in [v1.83.0](https://docs.victoriametrics.com/CHANGELOG.html#v1830). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3343).

## [v1.83.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.83.1)

Released at 2022-11-10

**It is recommended upgrading to [VictoriaMetrics v1.85.2](https://docs.victoriametrics.com/CHANGELOG.html#v1852) because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3502), which may result in incomplete query results for historical time series.**

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `__meta_consul_partition` label for targets discovered via [consul_sd_configs](https://docs.victoriametrics.com/sd_configs.html#consul_sd_configs) in the same way as [Prometheus 2.40 does](https://github.com/prometheus/prometheus/pull/11482).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): show the [query trace](https://docs.victoriametrics.com/#query-tracing) in JSON view. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2814). Thanks to @michal-kralik for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3316).

* BUGFIX: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): fix a panic at `vminsert` when the discovered list of `vmstorage` nodes is changed during [automatic vmstorage discovery](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#automatic-vmstorage-discovery). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3329).
* BUGFIX: properly register new time series in per-day inverted index if they were ingested during the last 10 seconds of the day. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3309). Thanks to @lmarszal for the bugreport and for the [initial fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3320).
* BUGFIX: reduce the increased memory usage spikes for some workloads. The issue was introduced in [v1.83.0](https://docs.victoriametrics.com/CHANGELOG.html#v1830).
* BUGFIX: properly accept [OpenTSDB telnet put lines](https://docs.victoriametrics.com/#sending-data-via-telnet-put-protocol) without tags without the need to specify the trailing whitespace. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3290).


## [v1.83.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.83.0)

Released at 2022-10-29

**It is recommended upgrading to [VictoriaMetrics v1.85.2](https://docs.victoriametrics.com/CHANGELOG.html#v1852) because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3502), which may result in incomplete query results for historical time series.**

**Update note 1:** the `indexdb/tagFilters` cache type at [/metrics](https://docs.victoriametrics.com/#monitoring) has been renamed to `indexdb/tagFiltersToMetricIDs` in order to make its puropose more clear.

**Update note 2:** [vmalert](https://docs.victoriametrics.com/vmalert.html): the `crlfEscape` [template function](https://docs.victoriametrics.com/vmalert.html#template-functions) becames obsolete starting from this release. It can be safely removed from alerting templates, since `\n` chars are properly escaped with other `*Escape` functions now. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3139) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/890) issue for details.


* FEATURE: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): add support for automatic `vmstorage` nodes discovering and updating at `vmselect` and `vminsert`. See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#automatic-vmstorage-discovery).
* FEATURE: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): allow configuring multiple retentions for distinct sets of time series. See [these docs](https://docs.victoriametrics.com/#retention-filters), [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/143) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/289) feature request.
* FEATURE: [VictoriaMetric cluster enterprise](https://docs.victoriametrics.com/enterprise.html): add support for multiple retentions for distinct tenants - see [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#retention-filters) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/143) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/289) feature request.
* FEATURE: allow limiting memory usage on a per-query basis with `-search.maxMemoryPerQuery` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3203).
* FEATURE: allow referring environment variables inside command-line flags via `%{ENV_VAR}` syntax. For example, if `AUTH_KEY=top-secret` environment variable is set, then `-metricsAuthKey=%{AUTH_KEY}` command-line flag is automatically expanded to `-storageDataPath=top-secret` at VictoriaMetrics startup. See [these docs](https://docs.victoriametrics.com/#environment-variables) for details.
* FEATURE: allow referring environment variables inside other environment variables via `%{ENV_VAR}` syntax. For example, if `A=a-%{B}`, `B=b-%{C}` and `C=c` env vars are set, then VictoriaMetrics components automatically expand them to `A=a-b-c`, `B=b-c` and `C=c` on startup.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): drop all the labels with `__` prefix from discovered targets in the same way as Prometheus does according to [this article](https://www.robustperception.io/life-of-a-label/). Previously the following labels were available during [metric-level relabeling](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#metric_relabel_configs): `__address__`, `__scheme__`, `__metrics_path__`, `__scrape_interval__`, `__scrape_timeout__`, `__param_*`. Now these labels are available only during [target-level relabeling](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config). This should reduce CPU usage and memory usage for `vmagent` setups, which scrape big number of targets.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): improve the performance for metric-level [relabeling](https://docs.victoriametrics.com/vmagent.html#relabeling), which can be applied via `metric_relabel_configs` section at [scrape_configs](https://docs.victoriametrics.com/sd_configs.html#scrape_configs), via `-remoteWrite.relabelConfig` or via `-remoteWrite.urlRelabelConfig` command-line options.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow specifying full url in scrape target addresses (aka `__address__` label). This makes valid the following `-promscrape.config`:

  ```yml
  scrape_configs:
  - job_name: abc
    metrics_path: /foo/bar
    scheme: https
    static_configs:
    - targets:
      # the following targets are scraped by the provided full urls
      - 'http://host1/metric/path1'
      - 'https://host2/metric/path2'
      - 'http://host3:1234/metric/path3?arg1=value1'
      # the following target is scraped by <scheme>://host4:1234<metrics_path>
      - host4:1234
  ```

  See [the corresponding issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3208).

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow controlling [staleness tracking](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) on a per-[scrape_config](https://docs.victoriametrics.com/sd_configs.html#scrape_configs) basis by specifying `no_stale_markers: true` or `no_stale_markers: false` option in the corresponding [scrape_config](https://docs.victoriametrics.com/sd_configs.html#scrape_configs).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `strvalue` and `stripDomain` [template functions](https://docs.victoriametrics.com/vmalert.html#template-functions) in order to improve compatibility with Prometheus.
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `jsonEscape` and `htmlEscape` [template functions](https://docs.victoriametrics.com/vmalert.html#template-functions).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): limit the number of plotted series. This should prevent from browser crashes or hangs when the query returns big number of time series. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3155).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): reduce memory usage when querying big number of time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3240).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add responsive styles for small screens. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3239) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3256).
* FEATURE: log error if some environment variables referred at `-promscrape.config` via `%{ENV_VAR}` aren't found. This should prevent from silent using incorrect config files.
* FEATURE: immediately shut down VictoriaMetrics apps on the second SIGINT or SIGTERM signal if they couldn't be finished gracefully for some reason after receiving the first signal.
* FEATURE: improve the performance of [/api/v1/series](https://docs.victoriametrics.com/url-examples.html#apiv1series) endpoint by eliminating loading of unused `TSID` data during the API call.
* FEATURE: [vmbackupmanager](https://docs.victoriametrics.com/vmbackupmanager.html): add functionality for automated restore from backup. See [these docs](https://docs.victoriametrics.com/vmbackupmanager.html#how-to-restore-backup-via-cli).

* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly merge buckets with identical `le` values, but with different string representation of these values when calculating [histogram_quantile](https://docs.victoriametrics.com/MetricsQL.html#histogram_quantile) and [histogram_share](https://docs.victoriametrics.com/MetricsQL.html#histogram_share). For example, `http_request_duration_seconds_bucket{le="5"}` and `http_requests_duration_seconds_bucket{le="5.0"}`. Such buckets may be returned from distinct targets. Thanks to @647-coder for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3225).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): change severity level for log messages about failed attempts for sending data to remote storage from `error` to `warn`. The message for about all failed send attempts remains at `error` severity level.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): fix panic if `vmalert` runs with `-clusterMode` command-line flag in [multitenant mode](https://docs.victoriametrics.com/vmalert.html#multitenancy). The issue has been introduced in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly escape string passed to `quotesEscape` [template function](https://docs.victoriametrics.com/vmalert.html#template-functions), so it can be safely embedded into JSON string. This makes obsolete the `crlfEscape` function. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3139) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/890) issue.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not show invalid error message in Kubernetes service discovery: `cannot parse WatchEvent json response: EOF`. The invalid error message has been appeared in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly add `exported_` prefix to metric labels, which clashing with scrape target labels if `honor_labels: true` option isn't set in [scrape_config](https://docs.victoriametrics.com/sd_configs.html#scrape_configs). Previously some `exported_` prefixes were missing in the resulting metric labels. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3278). The issue has been introduced in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820).
* BUGFIX: `vmselect`: expose missing metric `vm_cache_size_max_bytes{type="promql/rollupResult"}` . This metric is used for monitoring rollup cache usage with the query `vm_cache_size_bytes{type="promql/rollupResult"} / vm_cache_size_max_bytes{type="promql/rollupResult"}` in the same way as this is done for other cache types.

## [v1.82.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.82.1)

Released at 2022-10-14

* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): automatically update graph, legend and url after the removal of query field. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3169) and [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3196#issuecomment-1269765205).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): remove duplicate `alertname` JSON entry from generated alerts. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3053). Thanks to @Howie59 for [the fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3182)!
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): fix integration with Grafana via `-vmalert.proxyURL`, which has been broken in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820). See [this issue](https://github.com/VictoriaMetrics/helm-charts/issues/391).
* BUGFIX: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): set default region to `us-east-1` if `AWS_REGION` environment variable isn't set. The issue was introduced in [vmbackup v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3224).
* BUGFIX: [vmbackupmanager](https://docs.victoriametrics.com/vmbackupmanager.html): fix deletion of old backups at [Azure blob storage](https://azure.microsoft.com/en-us/products/storage/blobs/).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly apply regex filters when searching for time series. Previously unexpected time series could be returned from regex filter. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3227). The issue was introduced in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly apply `if` section with regex filters. Previously unexpected metrics could be returned from `if` section. The issue was introduced in [v1.82.0](https://docs.victoriametrics.com/CHANGELOG.html#v1820).

## [v1.82.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.82.0)

Released at 2022-10-07

**It isn't recommended to use VictoriaMetrics and vmagent v1.82.0 because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3227), which may result in incorrect query results and [relabeling](https://docs.victoriametrics.com/vmagent.html#relabeling) results. Upgrade to [v1.82.1](https://docs.victoriametrics.com/CHANGELOG.html#v1821) instead.**

**Update note 1:** this release changes data format for [/api/v1/export/native](https://docs.victoriametrics.com/#how-to-export-data-in-native-format) in incompatible way, so it cannot be imported into older version of VictoriaMetrics via [/api/v1/import/native](https://docs.victoriametrics.com/#how-to-import-data-in-native-format).

**Update note 2:** [vmalert](https://docs.victoriametrics.com/vmalert.html) changes default value for command-line flag `-datasource.queryStep` from `0s` to `5m`. The change supposed to improve reliability of the rules evaluation when evaluation interval is lower than scraping interval.

**Update note 3:** `vm_account_id` and `vm_project_id` labels must be passed to tcp-based `Graphite`, `InfluxDB` and `OpenTSDB` endpoints
at [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html) instead of undocumented
`VictoriaMetrics_AccountID` and `VictoriaMetrics_ProjectID` labels when writing samples to the needed tenant.
See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multitenancy-via-labels) for details.

* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): support specifying tenant ids via `vm_account_id` and `vm_project_id` labels. See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multitenancy-via-labels) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2970).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): improve [relabeling](https://docs.victoriametrics.com/vmagent.html#relabeling) performance by up to 3x for non-trivial `regex` values such as `([^:]+):.+`, which can be used for extracting a `host` part from `host:port` label value.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): improve performance by up to 4x for queries containing non-trivial `regex` filters such as `{path=~"/foo/.+|/bar"}`.
* FEATURE: improve performance scalability on systems with many CPU cores for [/federate](https://docs.victoriametrics.com/#federation) and [/api/v1/export/...](https://docs.victoriametrics.com/#how-to-export-time-series) endpoints.
* FEATURE: sanitize metric names for data ingested via [DataDog protocol](https://docs.victoriametrics.com/#how-to-send-data-from-datadog-agent) according to [DataDog metric naming](https://docs.datadoghq.com/metrics/custom_metrics/#naming-custom-metrics). The behaviour can be disabled by passing `-datadog.sanitizeMetricName=false` command-line flag. Thanks to @PerGon for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3105).
* FEATURE: add `-usePromCompatibleNaming` command-line flag to [vmagent](https://docs.victoriametrics.com/vmagent.html), to single-node VictoriaMetrics and to `vminsert` component of VictoriaMetrics cluster. This flag can be used for normalizing the ingested metric names and label names to [Prometheus-compatible form](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). If this flag is set, then all the chars unsupported by Prometheus are replaced with `_` chars in metric names and labels of the ingested samples. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3113).
* FEATURE: accept whitespace in metric names and tags ingested via [Graphite plaintext protocol](https://docs.victoriametrics.com/#how-to-send-data-from-graphite-compatible-agents-such-as-statsd) according to [the specs](https://graphite.readthedocs.io/en/latest/tags.html). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3102).
* FEATURE: check the correctess of raw sample timestamps stored on disk when reading them. This reduces the probability of possible silent corruption of the data stored on disk. This should help [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2998) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3011).
* FEATURE: atomically delete directories with snapshots, parts and partitions at [storage level](https://docs.victoriametrics.com/#storage). Previously such directories can be left in partially deleted state when the deletion operation was interrupted by unclean shutdown. This may result in `cannot open file ...: no such file or directory` error on the next start. The probability of this error was quite high when NFS or EFS was used as persistent storage for VictoriaMetrics data. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3038).
* FEATURE: set the `start` arg to `end - 5 minutes` if isn't passed explicitly to [/api/v1/labels](https://docs.victoriametrics.com/url-examples.html#apiv1labels) and [/api/v1/label/.../values](https://docs.victoriametrics.com/url-examples.html#apiv1labelvalues). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3052).
* FEATURE: allow to define the minimum TLS version to use when accepting https requests to VictoriaMetrics components if `-tls` command-line flag is set. The minimum TLS version can be set via `-tlsMinVersion` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3090).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add `vm-native-step-interval` command line flag for `vm-native` mode. New option allows splitting the import process into chunks by time interval. This helps migrating data sets with high churn rate and provides better control over the process. See [feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2733).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add `top queries` tab, which shows various stats for recently executed queries. See [these docs](https://docs.victoriametrics.com/#top-queries) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2707).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): move the "Execute Query" and "Add Query" buttons below the query fields, change icon for remove query. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3101).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): set the maximum number of queries to 4, remove multi Y-axes, left one for all queries and dotted lines to indicate queries in the graph. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3169).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `debug` mode to the alerting rule settings for printing additional information into logs during evaluation. See `debug` param in [alerting rule config](https://docs.victoriametrics.com/vmalert.html#alerting-rules).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add experimental feature for displaying last 10 states of the rule (recording or alerting) evaluation. The state is available on the Rule page, which can be opened by clicking on `Details` link next to Rule's name on the `/groups` page.
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): allow using extra labels in annotiations. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3013).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): allow configuring authorization params per list of targets in vmalert's notifier config for `static_configs`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2690).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): allow using {% raw %}`{{$labels}}`{% endraw %} for templating in command-line flag `-external.alert.source`. The change supposed to provide additional flexibility for generating alert's source link based on labels values.
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `vm_account_id` and `vm_project_id` labels to results of alerting and recording rules if `-clusterMode` is enabled. This improves [multitenant support in vmalert](https://docs.victoriametrics.com/vmalert.html#multitenancy).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): minimize the time needed for reading large responses from scrape targets in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). This should reduce scrape durations for such targets as [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) running in a big Kubernetes cluster.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add [sort_by_label_numeric](https://docs.victoriametrics.com/MetricsQL.html#sort_by_label_numeric) and [sort_by_label_numeric_desc](https://docs.victoriametrics.com/MetricsQL.html#sort_by_label_numeric_desc) functions for [numeric sort](https://www.gnu.org/software/coreutils/manual/html_node/Version-sort-is-not-the-same-as-numeric-sort.html) of input time series by the specified labels. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2938).
* FEATURE: [vmbackup](https://docs.victoriametrics.com/vmbackup.html) and [vmrestore](https://docs.victoriametrics.com/vmrestore.html): retry GCS operations for up to 3 minutes on temporary failures. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3147).
* FEATURE: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): add support for saving / restoring backups to / from [Azure blob storage](https://azure.microsoft.com/en-us/products/storage/blobs/). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1029).
* FEATURE: [vmbackupmanager](https://docs.victoriametrics.com/vmbackupmanager.html): expose `vm_backup_in_flight` metric, which can be used for determining which backup types - latest, hourly, daily, weekly or monthly - are currently executed.
* FEATURE: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): add ability to extract JWT authorization token from non-standard HTTP header by passing it via `-auth.httpHeader` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3054).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `__meta_ec2_region` label for [ec2_sd_config](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs) in the same way as [Prometheus 2.39 does](https://github.com/prometheus/prometheus/pull/11326).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): accept data ingestion requests via paths starting from `/prometheus` prefix in the same way as [VictoriaMetrics does](https://docs.victoriametrics.com/#how-to-import-time-series-data). For example, `vmagent` now accepts Prometheus `remote_write` data via both `/api/v1/write` and `/prometheus/api/v1/write`. This simplifies switching between single-node VictoriaMetrics and `vmagent`.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `external_labels` from `global` section at `-promscrape.config` after the [relabeling](https://docs.victoriametrics.com/vmagent.html#relabeling) is applied to scraped metrics. This aligns with Prometheus behaviour. Previously the `external_labels` were added to scrape targets, so they could be modified during relabeling. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3137).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow specifying per-`-remoteWrite.url` limits for on-disk size for pending data via `-remoteWrite.maxDiskUsagePerURL` command-line flag. Thanks to @rbizos for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3071).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): log clear error when multiple identical `-storageNode` command-line flags are passed to `vmselect` or to `vminsert`. Previously these components were crashed with cryptic panic `metric ... is already registered` in this case. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3076).

* BUGFIX: do not export stale metrics via [/federate api](https://docs.victoriametrics.com/#federation) after the staleness markers. Previously such metrics were exported with `NaN` values. this could break some setups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3185).
* BUGFIX: export ininity numbers as `"Infinity"` strings at [/api/v1/export](https://docs.victoriametrics.com/#how-to-export-data-in-json-line-format), so they can be parsed by standard JSON parsers. Previously infinity numbers were exported as `Inf` values, which couldn't be parsed by standard JSON parsers. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3161).
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html): properly handle request paths ending with `/` such as `/vmui/`. Previously `vmui` was dropping the traling `/`, which could prevent from using `vmui` via `vmauth`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1752).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly encode query params for aws signed requests, use `%20` instead of `+` as api requires. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3171).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly parse relabel config when regex ending with escaped `$`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3131).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate `rate_over_sum(m[d])` as `sum_over_time(m[d])/d`. Previously the `sum_over_time(m[d])` could be improperly divided by smaller than `d` time range. See [rate_over_sum() docs](https://docs.victoriametrics.com/MetricsQL.html#rate_over_sum) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3045).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate `increase(m[d])` over slow-changing counters with values smaller than 100. Previously [increase](https://docs.victoriametrics.com/MetricsQL.html#increase) could return unexpectedly big results in this case. See [the related issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/962) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3163).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): ignore empty series when applying [limit_offset](https://docs.victoriametrics.com/MetricsQL.html#limit_offset). It should improve queries with additional filters by value in expressions like `limit_offset(1,1, foo > 1)`.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate [quantiles_over_time](https://docs.victoriametrics.com/MetricsQL.html#quantiles_over_time) when the lookbehind window contains only a single sample. Previously an empty result was incorrectly returned in this case.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix `RangeError: Maximum call stack size exceeded` error when the query returns too many data points at `Table` view. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3092/files).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix workaround for adding more queries via URL. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3169).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): re-evaluate annotations per each alert evaluation. Previously, annotations were evaluated only on alert's value change. This could result in stale annotations in some cases described in [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3119).
* BUGFIX: prevent from excessive CPU usage when the storage enters [read-only mode](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#readonly-mode). The previous fix in [v1.81.0](https://docs.victoriametrics.com/CHANGELOG.html#v1810) wasn't complete.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): change default value for command-line flag `-datasource.queryStep` from `0s` to `5m`. Param `step` is added by vmalert to every rule evaluation request sent to datasource. Before this change, `step` was equal to group's evaluation interval by default. Param `step` for instant queries defines how far VM can look back for the last written data point. The change supposed to improve reliability of the rules evaluation when evaluation interval is lower than scraping interval.
* BUGFIX: properly calculate `vm_rows_scanned_per_query` histogram exported at `/metrics` page of `vmselect` and single-node VictoriaMetrics. Previously it could return misleadingly high numbers for [rollup functions](https://docs.victoriametrics.com/MetricsQL.html#rollup-functions), which scan only a few samples on the provided lookbehind window in square brackets. For example, `increase(m[1d])` always scans only 2 rows (aka `raw samples`) per each returned time series.

## [v1.81.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.81.2)

Released at 2022-09-08

* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): properly calculate query results at `vmselect`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3067). The issue has been introduced in [v1.81.0](https://docs.victoriametrics.com/CHANGELOG.html#v1810).

## [v1.81.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.81.1)

Released at 2022-09-02

**It isn't recommended to use VictoriaMetrics cluster v1.81.1 because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3067), which may result in incorrect query results. Upgrade to [v1.81.2](https://docs.victoriametrics.com/CHANGELOG.html#v1812) instead.**

* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): evaluate `q1`, ..., `qN` in parallel when calculating `union(q1, .., qN)`. Previously [union](https://docs.victoriametrics.com/MetricsQL.html#union) args were evaluated sequentially. This could result in lower than expected performance.

* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): fix potential panic at `vmselect` under high load, which has been introduced in [v1.81.0](https://docs.victoriametrics.com/CHANGELOG.html#v1810). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3058).


## [v1.81.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.81.0)

**It isn't recommended to use VictoriaMetrics cluster v1.81.0 because of [the bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3058), which may result in `vmselect` crashes under high load. Upgrade to [v1.81.2](https://docs.victoriametrics.com/CHANGELOG.html#v1812) instead.**

Released at 2022-08-31

**Update note 1:** [vmalert](https://docs.victoriametrics.com/vmalert.html) by default hides values of `-remoteWrite.url`, `-remoteRead.url` and `-datasource.url` in logs and at `http://vmalert:8880/flags` for security reasons. See the corresponding SECURITY change in the Chagelog below for additional info.

**Update note 2:** [vmalert](https://docs.victoriametrics.com/vmalert.html) by default points alert source url to `/vmalert/alert?...` aka [web UI](https://docs.victoriametrics.com/vmalert.html#web) instead of `/vmalert/api/v1/alert?...` aka JSON handler. The old behavior can be achieved by setting {% raw %}`-external.alert.source=vmalert/api/v1/alert?group_id={{.GroupID}}&alert_id={{.AlertID}}`{% endraw %} command-line flag.

* SECURITY: [vmalert](https://docs.victoriametrics.com/vmalert.html): do not expose `-remoteWrite.url`, `-remoteRead.url` and `-datasource.url` command-line flag values in logs and at `http://vmalert:8880/flags` page by default, since they may contain sensitive data such as auth keys. This aligns `vmalert` behaviour with [vmagent](https://docs.victoriametrics.com/vmagent.html), which doesn't expose `-remoteWrite.url` command-line flag value in logs and at `http://vmagent:8429/flags` page by default. Specify `-remoteWrite.showURL`, `-remoteRead.showURL` and `-datasource.showURL` command-line flags for showing values for the corresponding `-*.url` flags in logs. Thanks to @mble for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2965).
* SECURITY: upgrade base docker image (alpine) from 3.16.1 to 3.16.2. See [alpine 3.16.2 release notes](https://alpinelinux.org/posts/Alpine-3.13.12-3.14.8-3.15.6-3.16.2-released.html).

* FEATURE: return shorter error messages to Grafana and to other clients requesting [/api/v1/query](https://docs.victoriametrics.com/keyConcepts.html#instant-query) and [/api/v1/query_range](https://docs.victoriametrics.com/keyConcepts.html#range-query) endpoints. This should simplify reading these errors by humans. The long error message with full context is still written to logs.
* FEATURE: add the ability to fine-tune the number of points, which can be generated per each matching time series during [subquery](https://docs.victoriametrics.com/MetricsQL.html#subqueries) evaluation. This can be done with the `-search.maxPointsSubqueryPerTimeseries` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2922).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): improve the performance for relabeling rules with commonly used regular expressions in `regex` and `if` fields such as `some_string`, `prefix.*`, `prefix.+`, `foo|bar|baz`, `.*foo.*` and `.+foo.+`.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): reduce CPU usage when discovering big number of [Kubernetes targets](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) with big number of labels and annotations.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to accept [multitenant](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multitenancy) data via OpenTSDB `/api/put` protocol at `/insert/<tenantID>/opentsdb/api/put` http endpoint if [multitenant support](https://docs.victoriametrics.com/vmagent.html#multitenancy) is enabled at `vmagent`. Thanks to @chengjianyun for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3015).
* FEATURE: [monitoring](https://docs.victoriametrics.com/#monitoring): expose `vm_hourly_series_limit_max_series`, `vm_hourly_series_limit_current_series`, `vm_daily_series_limit_max_series` and `vm_daily_series_limit_current_series` metrics when `-search.maxHourlySeries` or `-search.maxDailySeries` limits are set. This allows alerting when the number of unique series reaches the configured limits. See [these docs](https://docs.victoriametrics.com/#cardinality-limiter) for details.
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): reduce the amounts of logging at `vmstorage` when `vmselect` connects/disconnects to `vmstorage`.
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): improve performance for heavy queries on systems with many CPU cores.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to use {% raw %}`{{label_name}}`{% endraw %} placeholders in the `replacement` option of relabeling rules. This simplifies constructing label values from multiple existing label values. See [these docs](https://docs.victoriametrics.com/vmagent.html#relabeling-enhancements) for details.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): generate additional per-target metrics - `scrape_series_limit`, `scrape_series_current` and `scrape_series_limit_samples_dropped` if series limit is set according to [these docs](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter). This simplifies alerting on targets with the exceeded series limit. See [these docs](https://docs.victoriametrics.com/vmagent.html#automatically-generated-metrics) for details on these metrics.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for MX record types in [dns_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dns_sd_configs) in the same way as Prometheus 2.38 [does](https://github.com/prometheus/prometheus/pull/10099).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `__meta_kubernetes_service_port_number` meta-label for `role: service` in [kubernetes_sd_configs](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) in the same way as Prometheus 2.38 [does](https://github.com/prometheus/prometheus/pull/11002).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `__meta_kubernetes_pod_container_image` meta-label for `role: pod` in [kubernetes_sd_configs](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) in the same way as Prometheus 2.38 [does](https://github.com/prometheus/prometheus/pull/11034).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): retry HTTP requests after some wait time during service discovery and during target scrapes if the server returns 429 HTTP status code (aka `Too many requests`). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2940).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add a legend in the top right corner for shortcut keys. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2813).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `toTime()` template function in the same way as Prometheus 2.38 [does](https://github.com/prometheus/prometheus/pull/10993). See [these docs](https://prometheus.io/docs/prometheus/latest/configuration/template_reference/#numbers).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `$alertID` and `$groupID` template variables. These variables may be used for templating annotations or `-external.alert.source` command-line flag. See the full list of supported variables [here](https://docs.victoriametrics.com/vmalert.html#templating).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `$activeAt` template variable. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2999). See the full list of supported variables [here](https://docs.victoriametrics.com/vmalert.html#templating). Thanks to @laixintao for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3000).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): point alert source to [vmalert's UI](https://docs.victoriametrics.com/vmalert.html#web) at `/vmalert/alert?...` instead of JSON handler at `/vmalert/api/v1/alert?...`. This improves user experience. The old behavior can be achieved by setting {% raw %}`-external.alert.source=vmalert/api/v1/alert?group_id={{.GroupID}}&alert_id={{.AlertID}}`{% endraw %} command-line flag.

* BUGFIX: prevent from excess CPU usage when the storage enters [read-only mode](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#readonly-mode).
* BUGFIX: improve performance for requests to [/api/v1/labels](https://docs.victoriametrics.com/url-examples.html#apiv1labels) and [/api/v1/label/.../values](https://docs.victoriametrics.com/url-examples.html#apiv1labelvalues) when the filter in the `match[]` query arg matches small number of time series. The performance for this case has been reduced in [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2978) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1533) issues.
* BUGFIX: increase the default limit on the number of concurrent merges for small parts from 8 to 16. This should help resolving potential issues with heavy data ingestion. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2673#issuecomment-1218185978) from @lukepalmer .
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): fix panic when incorrect arg is passed as `phi` into [histogram_quantiles](https://docs.victoriametrics.com/MetricsQL.html#histogram_quantiles) function. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3026).

## [v1.80.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.80.0)

Released at 2022-08-08

* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): allow configuring additional HTTP request headers for `-datasource.url`, `-remoteWrite.url` and `-remoteRead.url` via `-datasource.headers`, `-remoteWrite.headers` and `-remoteRead.headers` command-line flags. Additional HTTP request headers also can be set on group level via `headers` param - see [these docs](https://docs.victoriametrics.com/vmalert.html#groups) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2860).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): execute left and right sides of certain operations in parallel. For example, `q1 or q2`, `aggr_func(q1) <op> q2`, `q1 <op> aggr_func(q1)`. This may improve query performance if VictoriaMetrics has enough free resources for parallel processing of both sides of the operation. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2886).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmagent.html): allow multiple sections with duplicate `username` but with different `password` values at `-auth.config` file.
* FEATURE: add ability to push internal metrics (e.g. metrics exposed at `/metrics` page) to the configured remote storage from all the VictoriaMetrics components. See [these docs](https://docs.victoriametrics.com/#push-metrics).
* FEATURE: improve performance for heavy queries over big number of time series on systems with big number of CPU cores. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2896). Thanks to @zqyzyq for [the idea](https://github.com/VictoriaMetrics/VictoriaMetrics/commit/b596ac3745314fcc170a14e3ded062971cf7ced2).
* FEATURE: improve performance for registering new time series in `indexdb` by up to 50%. Thanks to @ahfuzhang for [the issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2249).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to specify tenantID in target labels. In this case metrics from the given target are routed to the given `__tenant_id__`. See [these docs](https://docs.victoriametrics.com/vmagent.html#multitenancy) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2943).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add service discovery for [Yandex Cloud](https://cloud.yandex.com/en/). See [these docs](https://docs.victoriametrics.com/sd_configs.html#yandexcloud_sd_configs) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1386).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui). Zoom in the graph by selecting the needed time range in the same way Grafana does. Hold `ctrl` (or `cmd` on MacOS) in order to move the graph to the left/right. Hold `ctrl` (or `cmd` on MacOS) and scroll up/down in order to zoom in/out the area under the cursor. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2812).

* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): fix potential panic in [multi-level cluster setup](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup) when top-level `vmselect` is configured with `-replicationFactor` bigger than 1. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2961).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly handle custom `endpoint` value in [ec2_sd_configs](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs). It was ignored since [v1.77.0](https://docs.victoriametrics.com/CHANGELOG.html#v1770) because of a bug in the implementation of [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1287). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2917).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): add missing `__meta_kubernetes_ingress_class_name` meta-label for `role: ingress` service discovery in Kubernetes. See [this commit from Prometheus](https://github.com/prometheus/prometheus/commit/7e65ad3e432bd2837c17e3e63e85dcbcc30f4a8a).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow stale responses from Consul service discovery (aka [consul_sd_configs](https://docs.victoriametrics.com/sd_configs.html#consul_sd_configs)) by default in the same way as Prometheus does. This should reduce load on Consul when discovering big number of targets. Stale responses can be disabled by specifying `allow_stale: false` option in `consul_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2940).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): [dockerswarm_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs): properly set `__meta_dockerswarm_container_label_*` labels instead of `__meta_dockerswarm_task_label_*` labels as Prometheus does. See [this issue](https://github.com/prometheus/prometheus/issues/9187).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): set `up` metric to `0` for partial scrapes in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). Previously the `up` metric was set to `1` when at least a single metric has been scraped before the error. This aligns the behaviour of `vmselect` with Prometheus.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): restart all the scrape jobs during [config reload](https://docs.victoriametrics.com/vmagent.html#configuration-update) after `global` section is changed inside `-promscrape.config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2884).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly assume role with AWS ECS credentials. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2875). Thanks to @transacid for [the fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2876).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not split regex in [relabeling rules](https://docs.victoriametrics.com/vmagent.html#relabeling) into multiple lines if it contains groups. This fixes [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2928).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): return series from `q1` if `q2` doesn't return matching time series in the query `q1 ifnot q2`. Previously series from `q1` weren't returned in this case.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly show date picker at `Table` tab. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2874).
* BUGFIX: properly generate http redirects if `-http.pathPrefix` command-line flag is set. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2918).

## [v1.79.11](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.11)

Released at 2023-03-12

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* SECURITY: upgrade Go builder from Go1.20.1 to Go1.20.2. See [the list of issues addressed in Go1.20.2](https://github.com/golang/go/issues?q=milestone%3AGo1.20.2+label%3ACherryPickApproved).

* BUGFIX: fix a bug, which could lead to incomplete or empty results for heavy queries selecting tens of thousands of time series. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3946).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): properly take into account `-rpc.disableCompression` command-line flag at `vmstorage`. It was ignored since [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3932).
* BUGFIX: prevent from possible `SIGBUS` crash on ARM architectures (Raspberry Pi), which deny unaligned access to 8-byte words. Thanks to @oliverpool for narrowing down the issue and for [the initial attempt to fix it](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3927).

## [v1.79.10](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.10)

Released at 2023-02-27

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* BUGFIX: prevent from high CPU usage on the first UTC hour of the data. The issue has been introduced in [v1.79.5](https://docs.victoriametrics.com/CHANGELOG.html#v1795) when fixing [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3309).

## [v1.79.9](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.9)

Released at 2023-02-24

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* SECURITY: upgrade base docker image (alpine) from 3.17.1 to 3.17.2. See [alpine 3.17.2 release notes](https://alpinelinux.org/posts/Alpine-3.17.2-released.html).
* SECURITY: upgrade Go builder from Go1.20.0 to Go1.20.1. See [the list of issues addressed in Go1.20.1](https://github.com/golang/go/issues?q=milestone%3AGo1.20.1+label%3ACherryPickApproved).

* BUGFIX: properly parse timestamps in milliseconds when [ingesting data via OpenTSDB telnet put protocol](https://docs.victoriametrics.com/#sending-data-via-telnet-put-protocol). Previously timestamps in milliseconds were mistakenly multiplied by 1000. Thanks to @Droxenator for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3810).

## [v1.79.8](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.8)

Released at 2023-02-03

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* BUGFIX: fix a bug, which could prevent background merges for the previous partitions until restart if the storage didn't have enough disk space for final deduplication and down-sampling.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): update API version for [ec2_sd_configs](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs) to fix [the issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3700) with missing `__meta_ec2_availability_zone_id` attribute.
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): fix panic on top-level vmselect nodes of [multi-level setup](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup) when the `-replicationFactor` flag is set and request contains `trace` query parameter. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3734).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): [dockerswarm_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs): apply `filters` only to objects of the specified `role`. Previously filters were applied to all the objects, which could cause errors when different types of objects were used with filters that were not compatible with them. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3579).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): suppress all the scrape errors when `-promscrape.suppressScrapeErrors` is enabled. Previously some scrape errors were logged even if `-promscrape.suppressScrapeErrors` flag was set.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): consistently put the scrape url with scrape target labels to all error logs for failed scrapes. Previously some failed scrapes were logged without this information.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly parse `M` and `Mi` suffixes as `1e6` multipliers in `1M` and `1Mi` numeric constants. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3664). The issue has been introduced in [v1.79.7](https://docs.victoriametrics.com/CHANGELOG.html#v1797).

## [v1.79.7](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.7)

Released at 2023-01-10

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* BUGFIX: properly parse floating-point numbers without integer or fractional parts such as `.123` and `20.` during [data import](https://docs.victoriametrics.com/#how-to-import-time-series-data). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3544).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly parse durations with uppercase suffixes such as `10S`, `5MS`, `1W`, etc. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3589).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): [dockerswarm_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs): properly encode `filters` field. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3579)
* BUGFIX: allow specifying values bigger than 2GiB to the following command-line flag values on 32-bit architectures (`386` and `arm`): `-storage.minFreeDiskSpaceBytes` and `-remoteWrite.maxDiskUsagePerURL`. Previously values bigger than 2GiB were incorrectly truncated on these architectures.
* BUGFIX: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): expose proper values for `vm_downsampling_partitions_scheduled` and `vm_downsampling_partitions_scheduled_size_bytes` metrics, which were added at [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2612).
* BUGFIX: [DataDog protocol parser](https://docs.victoriametrics.com/#how-to-send-data-from-datadog-agent): do not re-use `host` and `device` fields from the previously parsed messages if these fields are missing in the currently parsed message. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3432).

## [v1.79.6](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.6)

Released at 2022-12-11

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* SECURITY: update Go builder from v1.19.3 to v1.19.4. See [the changelog](https://github.com/golang/go/issues?q=milestone%3AGo1.19.4+label%3ACherryPickApproved).
* SECURITY: update base Docker image for VictoriaMetrics components from Alpine 3.16.2 to Alpine v3.17.0. See [the changelog](https://alpinelinux.org/releases/).

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix the `The request did not have a subscription or a valid tenant level resource provider` error when discovering Azure targets with [azure_sd_configs](https://docs.victoriametrics.com/sd_configs.html#azure_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3247).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly discover GCE zones when `filter` option is set at [gce_sd_configs](https://docs.victoriametrics.com/sd_configs.html#gce_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3202).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly specify rule evaluation step during the [replay mode](https://docs.victoriametrics.com/vmalert.html#rules-backfilling). The `step` value was previously overriden by `-datasource.queryStep` command-line flag.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly return the error message from remote-write failures. Before, error was ignored and only `vmalert_remotewrite_errors_total` was incremented.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly return an empty result from [limit_offset](https://docs.victoriametrics.com/MetricsQL.html#limit_offset) if the `offset` arg exceeds the number of inner time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3312).

## [v1.79.5](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.5)

Released at 2022-11-10

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

**Update note 1:** [vmalert](https://docs.victoriametrics.com/vmalert.html): the `crlfEscape` [template function](https://docs.victoriametrics.com/vmalert.html#template-functions) becames obsolete starting from this release. It can be safely removed from alerting templates, since `\n` chars are properly escaped with other `*Escape` functions now. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3139) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/890) issue for details.

* SECURITY: update Go builder to v1.19.3. This fixes [CVE-2022 security issue](https://github.com/golang/go/issues/56328). See [the changelog](https://github.com/golang/go/issues?q=milestone%3AGo1.19.3+label%3ACherryPickApproved).

* BUGFIX: properly register new time series in per-day inverted index if they were ingested during the last 10 seconds of the day. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3309). Thanks to @lmarszal for the bugreport and for the [initial fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3320).
* BUGFIX: properly accept [OpenTSDB telnet put lines](https://docs.victoriametrics.com/#sending-data-via-telnet-put-protocol) without tags without the need to specify the trailing whitespace. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3290).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly merge buckets with identical `le` values, but with different string representation of these values when calculating [histogram_quantile](https://docs.victoriametrics.com/MetricsQL.html#histogram_quantile) and [histogram_share](https://docs.victoriametrics.com/MetricsQL.html#histogram_share). For example, `http_request_duration_seconds_bucket{le="5"}` and `http_requests_duration_seconds_bucket{le="5.0"}`. Such buckets may be returned from distinct targets. Thanks to @647-coder for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3225).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): change severity level for log messages about failed attempts for sending data to remote storage from `error` to `warn`. The message for about all failed send attempts remains at `error` severity level.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly escape string passed to `quotesEscape` [template function](https://docs.victoriametrics.com/vmalert.html#template-functions), so it can be safely embedded into JSON string. This makes obsolete the `crlfEscape` function. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3139) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/890) issue.
* BUGFIX: `vmselect`: expose missing metric `vm_cache_size_max_bytes{type="promql/rollupResult"}` . This metric is used for monitoring rollup cache usage with the query `vm_cache_size_bytes{type="promql/rollupResult"} / vm_cache_size_max_bytes{type="promql/rollupResult"}` in the same way as this is done for other cache types.

## [v1.79.4](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.4)

Released at 2022-10-07

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

**Update note 1:** [vmalert](https://docs.victoriametrics.com/vmalert.html) changes default value for command-line flag `-datasource.queryStep` from `0s` to `5m`. The change supposed to improve reliability of the rules evaluation when evaluation interval is lower than scraping interval.

* FEATURE: expose `vmagent_remotewrite_queues` metric and use it in alerting rules in order to improve the detection of remote storage connection saturation. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2871).

* BUGFIX: do not export stale metrics via [/federate api](https://docs.victoriametrics.com/#federation) after the staleness markers. Previously such metrics were exported with `NaN` values. this could break some setups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3185).
* BUGFIX: [vmauth](https://docs.victoriametrics.com/vmauth.html): properly handle request paths ending with `/` such as `/vmui/`. Previously `vmui` was dropping the traling `/`, which could prevent from using `vmui` via `vmauth`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1752).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly encode query params for aws signed requests, use `%20` instead of `+` as api requires. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3171).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate `rate_over_sum(m[d])` as `sum_over_time(m[d])/d`. Previously the `sum_over_time(m[d])` could be improperly divided by smaller than `d` time range. See [rate_over_sum() docs](https://docs.victoriametrics.com/MetricsQL.html#rate_over_sum) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3045).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate `increase(m[d])` over slow-changing counters with values smaller than 100. Previously [increase](https://docs.victoriametrics.com/MetricsQL.html#increase) could return unexpectedly big results in this case. See [the related issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/962) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3163).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): ignore empty series when applying [limit_offset](https://docs.victoriametrics.com/MetricsQL.html#limit_offset). It should improve queries with additional filters by value in expressions like `limit_offset(1,1, foo > 1)`.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate [quantiles_over_time](https://docs.victoriametrics.com/MetricsQL.html#quantiles_over_time) when the lookbehind window contains only a single sample. Previously an empty result was incorrectly returned in this case.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix `RangeError: Maximum call stack size exceeded` error when the query returns too many data points at `Table` view. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3092/files).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): re-evaluate annotations per each alert evaluation. Previously, annotations were evaluated only on alert's value change. This could result in stale annotations in some cases described in [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/3119).
* BUGFIX: prevent from excessive CPU usage when the storage enters [read-only mode](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#readonly-mode). The previous fix in [v1.79.3](https://docs.victoriametrics.com/CHANGELOG.html#v1793) wasn't complete.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): change default value for command-line flag `-datasource.queryStep` from `0s` to `5m`. Param `step` is added by vmalert to every rule evaluation request sent to datasource. Before this change, `step` was equal to group's evaluation interval by default. Param `step` for instant queries defines how far VM can look back for the last written data point. The change supposed to improve reliability of the rules evaluation when evaluation interval is lower than scraping interval.
* BUGFIX: properly calculate `vm_rows_scanned_per_query` histogram exported at `/metrics` page of `vmselect` and single-node VictoriaMetrics. Previously it could return misleadingly high numbers for [rollup functions](https://docs.victoriametrics.com/MetricsQL.html#rollup-functions), which scan only a few samples on the provided lookbehind window in square brackets. For example, `increase(m[1d])` always scans only 2 rows (aka `raw samples`) per each returned time series.

## [v1.79.3](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.3)

Released at 2022-08-30

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* SECURITY: [vmalert](https://docs.victoriametrics.com/vmalert.html): do not expose `-remoteWrite.url`, `-remoteRead.url` and `-datasource.url` command-line flag values in logs and at `http://vmalert:8880/flags` page by default, since they may contain sensitive data such as auth keys. This aligns `vmalert` behaviour with [vmagent](https://docs.victoriametrics.com/vmagent.html), which doesn't expose `-remoteWrite.url` command-line flag value in logs and at `http://vmagent:8429/flags` page by default. Specify `-remoteWrite.showURL`, `-remoteRead.showURL` and `-datasource.showURL` command-line flags for showing values for the corresponding `-*.url` flags in logs. Thanks to @mble for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2965).
* SECURITY: upgrade base docker image (alpine) from 3.16.1 to 3.16.2. See [alpine 3.16.2 release notes](https://alpinelinux.org/posts/Alpine-3.13.12-3.14.8-3.15.6-3.16.2-released.html).

* BUGFIX: prevent from excess CPU usage when the storage enters [read-only mode](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#readonly-mode).
* BUGFIX: improve performance for requests to [/api/v1/labels](https://docs.victoriametrics.com/url-examples.html#apiv1labels) and [/api/v1/label/.../values](https://docs.victoriametrics.com/url-examples.html#apiv1labelvalues) when the filter in the `match[]` query arg matches small number of time series. The performance for this case has been reduced in [v1.78.0](https://docs.victoriametrics.com/CHANGELOG.html#v1780). See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2978) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1533) issues.
* BUGFIX: increase the default limit on the number of concurrent merges for small parts from 8 to 16. This should help resolving potential issues with heavy data ingestion. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2673#issuecomment-1218185978) from @lukepalmer .
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): fix panic when incorrect arg is passed as `phi` into [histogram_quantiles](https://docs.victoriametrics.com/MetricsQL.html#histogram_quantiles) function. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/3026).

## [v1.79.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.2)

Released at 2022-08-08

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): fix potential panic in [multi-level cluster setup](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup) when top-level `vmselect` is configured with `-replicationFactor` bigger than 1. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2961).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly handle custom `endpoint` value in [ec2_sd_configs](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs). It was ignored since [v1.77.0](https://docs.victoriametrics.com/CHANGELOG.html#v1770) because of a bug in the implementation of [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1287).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): add missing `__meta_kubernetes_ingress_class_name` meta-label for `role: ingress` service discovery in Kubernetes. See [this commit from Prometheus](https://github.com/prometheus/prometheus/commit/7e65ad3e432bd2837c17e3e63e85dcbcc30f4a8a).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow stale responses from Consul service discovery (aka [consul_sd_configs](https://docs.victoriametrics.com/sd_configs.html#consul_sd_configs)) by default in the same way as Prometheus does. This should reduce load on Consul when discovering big number of targets. Stale responses can be disabled by specifying `allow_stale: false` option in `consul_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2940).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): [dockerswarm_sd_configs](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs): properly set `__meta_dockerswarm_container_label_*` labels instead of `__meta_dockerswarm_task_label_*` labels as Prometheus does. See [this issue](https://github.com/prometheus/prometheus/issues/9187).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): set `up` metric to `0` for partial scrapes in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). Previously the `up` metric was set to `1` when at least a single metric has been scraped before the error. This aligns the behaviour of `vmselect` with Prometheus.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): restart all the scrape jobs during [config reload](https://docs.victoriametrics.com/vmagent.html#configuration-update) after `global` section is changed inside `-promscrape.config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2884).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly assume role with AWS ECS credentials. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2875). Thanks to @transacid for [the fix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2876).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not split regex in [relabeling rules](https://docs.victoriametrics.com/vmagent.html#relabeling) into multiple lines if it contains groups. This fixes [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2928).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): return series from `q1` if `q2` doesn't return matching time series in the query `q1 ifnot q2`. Previously series from `q1` weren't returned in this case.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly show date picker at `Table` tab. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2874).
* BUGFIX: properly generate http redirects if `-http.pathPrefix` command-line flag is set. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2918).


## [v1.79.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.1)

Released at 2022-08-02

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

* SECURITY: upgrade base docker image (alpine) from 3.16.0 to 3.16.1 . See [alpine 3.16.1 release notes](https://alpinelinux.org/posts/Alpine-3.16.1-released.html).


## [v1.79.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.79.0)

Released at 2022-07-14

**v1.79.x is a line of LTS releases (e.g. long-time support). It contains important up-to-date bugfixes.
The v1.79.x line will be supported for at least 12 months since [v1.79.0](https://docs.victoriametrics.com/CHANGELOG.html#v1790) release**

**Update note 1:** this release introduces backwards-incompatible changes to `vm_partial_results_total` metric by changing its labels to be consistent with `vm_requests_total` metric. If you use alerting rules or Grafana dashboards, which rely on this metric, then they must be updated. The official dashboards for VictoriaMetrics don't use this metric.

**Update note 2:** [vmalert](https://docs.victoriametrics.com/vmalert.html) adds `/vmalert/` prefix to [web urls](https://docs.victoriametrics.com/vmalert.html#web) according to [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2825). This may affect `vmalert` instances with non-empty `-http.pathPrefix` command-line flag. After the update, configuring this flag is no longer needed. Here's [why](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2799#issuecomment-1171392005).

**Update note 3:** this release introduces backwards-incompatible changes to communication protocol between `vmselect` and `vmstorage` nodes in cluster version of VictoriaMetrics because of added ability to query `vmselect` data from other `vmselect` nodes - see [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup), so read requests to `vmselect` will fail until the upgrade is complete. These errors will stop after all the `vmselect` and `vmstorage` nodes are updated to the new release. It is safe to downgrade to previous releases at any time.

**Update note 4:** this release removes support of deprecated in [1.70.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.70.0) param `extra_filter_labels` from [vmalert's](https://docs.victoriametrics.com/vmalert.html) groups definition. This deprecated param was replaced with [params](https://docs.victoriametrics.com/vmalert.html#url-params).

**Update note 5:** this release changes naming for published linux binaries at [releases](https://github.com/VictoriaMetrics/VictoriaMetrics/releases). Now names for binaries for all the supported platforms match the following template - `$(APP_NAME)-$(GOOS)-$(GOARCH)-$(VERSION).tar.gz`. For example, `victoria-metrics-linux-amd64-v1.79.0.tar.gz`. Previously linux binaries didn't have `$(GOOS)` part, e.g. they had the name `victoria-metrics-amd64-v1.79.0.tar.gz`. Please update automation scripts for upgrading VictoriaMetrics releases according to this change.

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add [azure_sd_configs](https://docs.victoriametrics.com/sd_configs.html#azure_sd_configs) service discovery mechanism. It allows discovering Virtual Machines at [Azure Cloud](https://azure.microsoft.com/en-us/). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1364).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): deprecate alert's status link `/api/v1/<groupID>/<alertID>/status` in favour of `api/v1/alert?group_id=<group_id>&alert_id=<alert_id>"`. The old alert's status link is still supported, but will be removed in future releases. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2825).
* FEATURE: [cluster version of VictoriaMetrics](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add support for querying lower-level `vmselect` nodes from upper-level `vmselect` nodes. This makes possible to build multi-level cluster setups for global querying view and HA purposes without the need to use [Promxy](https://github.com/jacksontj/promxy). See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2778).
* FEATURE: add `-search.setLookbackToStep` command-line flag, which enables InfluxDB-like gap filling during querying. See [these docs](https://docs.victoriametrics.com/guides/migrate-from-influx.html) for details.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add an UI for [query tracing](https://docs.victoriametrics.com/#query-tracing). It can be enabled by clicking `trace query` checkbox and re-running the query. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2703).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `-remoteWrite.headers` command-line option for specifying optional HTTP headers to send to the configured `-remoteWrite.url`. For example, `-remoteWrite.headers='Foo:Bar^^Baz:x'` would send `Foo: Bar` and `Baz: x` HTTP headers with every request to `-remoteWrite.url`. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2805).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): push per-target `scrape_samples_limit` metric to the configured `-remoteWrite.url` if `sample_limit` option is set for this target in [scrape_configs](https://docs.victoriametrics.com/sd_configs.html#scrape_configs). See [this feature request](https://github.com/VictoriaMetrics/operator/issues/497).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): attach node-level labels to [kubernetes_sd_config](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) targets if `attach_metadata: {"node": true}` is set for `role: endpoints` and `role: endpointslice`. This is a feature backport from Prometheus 2.37 - see [this pull request](https://github.com/prometheus/prometheus/pull/10759).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to specify additional HTTP headers to send to scrape targets via `headers` section in `scrape_configs`. This can be used when the scrape target requires custom authorization and authentication like in [this stackoverflow question](https://stackoverflow.com/questions/66032498/prometheus-scrape-metric-with-custom-header). For example, the following config instructs sending `My-Auth: top-secret` and `TenantID: FooBar` headers with each request to `http://host123:8080/metrics`:

```yaml
scrape_configs:
- job_name: foo
  headers:
  - "My-Auth: top-secret"
  - "TenantID: FooBar"
  static_configs:
  - targets: ["host123:8080"]
```

* FEATURE: add ability to pass `limit` query arg to `api/v1/series` endpoint. This can be used if only a sample of up to `limit` series must be returned from the endpoint. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2841) and [these docs](https://docs.victoriametrics.com/#prometheus-querying-api-enhancements).
* FEATURE: [query tracing](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#query-tracing): show timestamps in query traces in human-readable format (aka `RFC3339` in UTC timezone) instead of milliseconds since Unix epoch. For example, `2022-06-27T10:32:54.506Z` instead of `1656325974506`. This improves traces' readability.
* FEATURE: improve performance of [/api/v1/series](https://prometheus.io/docs/prometheus/latest/querying/api/#finding-series-by-label-matchers) requests, which return big number of time series.
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): improve query performance when [replication is enabled](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#replication-and-data-safety).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly handle partial counter resets in [remove_resets](https://docs.victoriametrics.com/MetricsQL.html#remove_resets) function. Now `remove_resets(sum(m))` should returns the expected increasing line when some time series matching `m` disappear on the selected time range. Previously such a query would return horizontal line after the disappeared series.
* FEATURE: expose `vm_next_retention_seconds` metric at `http://victoriametrics:8428/metrics`, which shows the number of seconds left until the next `indexdb` rotation. Thanks to @guidao for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2863).
* FEATURE: expose additional histogram metrics at `http://victoriametrics:8428/metrics`, which may help understanding query workload:

  * `vm_rows_read_per_query` - the number of raw samples read per query.
  * `vm_rows_scanned_per_query` - the number of raw samples scanned per query. This number can exceed `vm_rows_read_per_query` if `step` query arg passed to [/api/v1/query_range](https://docs.victoriametrics.com/keyConcepts.html#range-query) is smaller than the lookbehind window set in square brackets of [rollup function](https://docs.victoriametrics.com/MetricsQL.html#rollup-functions). For example, if `increase(some_metric[1h])` is executed with the `step=5m`, then the same raw samples on a hour time range are scanned `1h/5m=12` times. See [this article](https://valyala.medium.com/how-to-optimize-promql-and-metricsql-queries-85a1b75bf986) for details.
  * `vm_rows_read_per_series` - the number of raw samples read per queried series.
  * `vm_series_read_per_query` - the number of series read per query.

* FEATURE: publish binaries for FreeBSD and OpenBSD at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): allow selecting the needed columns at table view. This functionaly may help when the selected time series contain many different labels. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2817) and [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2867).

* BUGFIX: consistently name binaries at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases) in the form `$(APP_NAME)-$(GOOS)-$(GOARCH)-$(VERSION).tar.gz`. For example, `victoria-metrics-linux-amd64-v1.79.0.tar.gz`. Previously the `$(GOOS)` part was missing in binaries for Linux.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): allow using `__name__` label (aka [metric name](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors)) in alerting annotations. For example:

{% raw %}
```console
{{ $labels.__name__ }}: Too high connection number for "{{ $labels.instance }}
```
{% endraw %}

* BUGFIX: limit max memory occupied by the cache, which stores parsed regular expressions. Previously too long regular expressions passed in [MetricsQL queries](https://docs.victoriametrics.com/MetricsQL.html) could result in big amounts of used memory (e.g. multiple of gigabytes). Now the max cache size for parsed regexps is limited to a a few megabytes.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly handle partial counter resets when calculating [rate](https://docs.victoriametrics.com/MetricsQL.html#rate), [irate](https://docs.victoriametrics.com/MetricsQL.html#irate) and [increase](https://docs.victoriametrics.com/MetricsQL.html#increase) functions. Previously these functions could return zero values after partial counter resets until the counter increases to the last value before partial counter reset. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2787).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly calculate [histogram_quantile](https://docs.victoriametrics.com/MetricsQL.html#histogram_quantile) over Prometheus buckets with unexpected values. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2819).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly evaluate [timezone_offset](https://docs.victoriametrics.com/MetricsQL.html#timezone_offset) function over time range covering time zone offset switches. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2771).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly add service-level labels (`__meta_kubernetes_service_*`) to discovered targets for `role: endpointslice` in [kubernetes_sd_config](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs). Previously these labels were missing. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2823).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): make sure that [stale markers](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) are generated with the actual timestamp when unsuccessful scrape occurs. This should prevent from possible time series overlap on scrape target restart in dynmaic envirnoments such as Kubernetes.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly reload changed `-promscrape.config` file when `-promscrape.configCheckInterval` option is set. The changed config file wasn't reloaded in this case since [v1.69.0](#v1690). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2786). Thanks to @ttyv for the fix.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly set `Host` header during target scraping when `proxy_url` is set to http proxy. Previously the `Host` header was set to the proxy hostname instead of the target hostname. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2794).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): assume that the response is complete if `-search.denyPartialResponse` is enabled and up to `-replicationFactor - 1` `vmstorage` nodes are unavailable. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1767).
* BUGFIX: [vmselect](https://docs.victoriametrics.com/#vmselect): update `vm_partial_results_total` metric labels to be consistent with `vm_requests_total` labels.
* BUGFIX: accept tags without values when reading data in [DataDog format](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#how-to-send-data-from-datadog-agent). Thanks to @PerGon for the [pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2839).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly pass the end of the selected time range to `time` query arg to [/api/v1/query](https://docs.victoriametrics.com/keyConcepts.html#instant-query) when displaying the requested data in JSON and table views. Previously the `time` query arg wasn't set, so `/api/v1/query` was always returning query results for the current time regardless of the selected time range. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2781).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): allow clicking on the suggestion from autocomplete list. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2804).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): apply the selected time range in date picker only after clicking the `Apply` button. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2811).

## [v1.78.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.78.1)

Released at 2022-07-08

**Update notes:** it is recommended [clearing caches](https://docs.victoriametrics.com/#cache-removal) after the upgrade from [v1.78.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.78.0) in order to immediately fix the issue for newly ingested data. Otherwise the issue may exist for newly ingested data for up to a day after the upgrade.

* BUGFIX: properly register time series in per-day inverted index. Previously some series could miss registration in the per-day inverted index. This could result in missing time series during querying. The issue has been introduced in [v1.78.0](#v1780). See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2798) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2793) issues.

## [v1.78.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.78.0)

Released at 2022-06-20

**Warning (2022-07-03):** VictoriaMetrics v1.78.0 contains a bug, which may result in missing time series during queries. It is recommended upgrading to [v1.78.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.78.1), which fixes the bug.

**Update notes:** this release introduces backwards-incompatible changes to communication protocol between `vmselect` and `vmstorage` nodes in cluster version of VictoriaMetrics because of added [query tracing](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#query-tracing), so read requests to `vmselect` will fail until the upgrade is complete. These errors will stop after all the `vmselect` and `vmstorage` nodes are updated to the new release. It is safe to downgrade to previous releases.

* SECURITY: add `-flagsAuthKey` command-line flag for protecting `/flags` endpoint from unauthorized access. Though this endpoint already hides values for command-line flags with `key` and `password` substrings in their names, other sensitive information could be exposed there. See [This issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2753).

* FEATURE: support query tracing, which allows determining bottlenecks during query processing. See [these docs](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#query-tracing) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1403).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add `cardinality` tab, which can help identifying the source of [high cardinality](https://docs.victoriametrics.com/FAQ.html#what-is-high-cardinality) and [high churn rate](https://docs.victoriametrics.com/FAQ.html#what-is-high-churn-rate) issues. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2233) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2730) feature requests and [these docs](https://docs.victoriametrics.com/#cardinality-explorer).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): small UX enhancements according to [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2638).
* FEATURE: allow overriding default limits for in-memory cache `indexdb/tagFilters` via flag `-storage.cacheSizeIndexDBTagFilters`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2663).
* FEATURE: add support of `lowercase` and `uppercase` relabeling actions in the same way as [Prometheus 2.36.0 does](https://github.com/prometheus/prometheus/releases/tag/v2.36.0). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2664).
* FEATURE: add ability to change the `indexdb` rotation timezone offset via `-retentionTimezoneOffset` command-line flag. Previously it was performed at 4am UTC time. This could lead to performance degradation in the middle of the day when VictoriaMetrics runs in time zones located too far from UTC. Thanks to @cnych for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2574).
* FEATURE: limit the number of background merge threads on systems with big number of CPU cores by default. This increases the max size of parts, which can be created during background merge when `-storageDataPath` directory has limited free disk space. This may improve on-disk data compression efficiency and query performance. The limits can be tuned if needed with `-smallMergeConcurrency` and `-bigMergeConcurrency` command-line flags. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2673).
* FEATURE: accept optional `limit` query arg at [/api/v1/labels](https://prometheus.io/docs/prometheus/latest/querying/api/#getting-label-names) and [/api/v1/label/.../values](https://prometheus.io/docs/prometheus/latest/querying/api/#querying-label-values) for limiting the numbef of sample entries returned from these endpoints. See [these docs](https://docs.victoriametrics.com/#prometheus-querying-api-enhancements).
* FEATURE: optimize performance for [/api/v1/labels](https://prometheus.io/docs/prometheus/latest/querying/api/#getting-label-names) and [/api/v1/label/.../values](https://prometheus.io/docs/prometheus/latest/querying/api/#querying-label-values) endpoints when `match[]`, `extra_label` or `extra_filters[]` query args are passed to these endpoints. This should help with [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1533).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): support `limit` param per-group for limiting number of produced samples per each rule. Thanks to @Howie59 for [implementation](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2676).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): remove dependency on Internet access at [web API pages](https://docs.victoriametrics.com/vmalert.html#web). Previously the functionality and the layout of these pages was broken without Internet access. See [shis issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2594).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): send alerts to the configured notifiers in parallel. Previously alerts were sent to notifiers sequentially. This could delay sending pending alerts when notifier blocks on the currently sent alert.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): implement the `http://vmagent:8429/service-discovery` page in the same way as Prometheus does. This page shows the original labels for all the discovered targets alongside the resulting labels after the relabeling. This simplifies service discovery debugging.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): remove dependency on Internet access at `http://vmagent:8429/targets` page. Previously the page layout was broken without Internet access. See [shis issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2594).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for `kubeconfig_file` option at [kubernetes_sd_configs](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs). It may be useful for Kubernetes monitoring by `vmagent` outside Kubernetes cluster. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1464).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `/api/v1/status/config` endpoint in the same way as Prometheus does. See [these docs](https://prometheus.io/docs/prometheus/latest/querying/api/#config).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `-promscrape.suppressScrapeErrorsDelay` command-line flag, which can be used for delaying and aggregating the logging of per-target scrape errors. This may reduce the amounts of logs when `vmagent` scrapes many unreliable targets. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2575). Thanks to @jelmd for [the initial implementation](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2576).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `-promscrape.cluster.name` command-line flag, which allows proper data de-duplication when the same target is scraped from multiple [vmagent clusters](https://docs.victoriametrics.com/vmagent.html#scraping-big-number-of-targets). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2679).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `action: graphite` relabeling rules optimized for extracting labels from Graphite-style metric names. See [these docs](https://docs.victoriametrics.com/vmagent.html#graphite-relabeling) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2737).
* FEATURE: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): expose `vm_downsampling_partitions_scheduled` and `vm_downsampling_partitions_scheduled_size_bytes` metrics, which can be used for tracking the progress of initial [downsampling](https://docs.victoriametrics.com/#downsampling) for historical data. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2612).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): do not spend up to 5 seconds when trying to connect to unavailable `vmstorage` nodes. This should improve query latency when some of `vmstorage` nodes aren't available. Expose `vm_tcpdialer_addr_available{addr="..."}` metric at `http://vmselect:8481/metrics` for determining whether the given `addr` is available for establishing new connections. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/711#issuecomment-1160363187).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add `-vmstorageDialTimeout` command-line flags to `vmselect` and `vminsert` for tuning the maximum duration for connection estabilishing to `vmstorage` nodes. This should help resolving [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/711).

* BUGFIX: support for data ingestion in [DataDog format](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#how-to-send-data-from-datadog-agent) from legacy clients / agents. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2670). Thanks to @elProxy for the fix.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not expose `vm_promscrape_service_discovery_duration_seconds_bucket` metric for unused service discovery types. This reduces the number of metrics exported at `http://vmagent:8429/metrics`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2671).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly apply `alert_relabel_configs` relabeling rules to `-notifier.config` according to [these docs](https://docs.victoriametrics.com/vmalert.html#notifier-configuration-file). Thanks to @spectvtor for [the bugfix](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2633).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly add `Content-Encoding: snappy`, `Content-Type: application/x-protobuf` and `X-Prometheus-Remote-Write-Version: 0.1.0` request headers when `vmalert` sends [evaluated recording rules' data](https://docs.victoriametrics.com/vmalert.html#recording-rules) to `-remoteWrite.url`. These headers are needed by some remote storage systems in order to properly decode snappy-encoded request body. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2685) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2701) pull requests. Thanks to @manji-0 for th fix.
* BUGFIX: deny [background merge](https://valyala.medium.com/how-victoriametrics-makes-instant-snapshots-for-multi-terabyte-time-series-data-e1f3fb0e0282) when the storage enters read-only mode, e.g. when free disk space becomes lower than `-storage.minFreeDiskSpaceBytes`. Background merge needs additional disk space, so it could result in `no space left on device` errors. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2603).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly apply the selected time range when auto-refresh is enabled. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2693).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly update the url with vmui state when new query is entered. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2692).
* BUGFIX: [Graphite render API](https://docs.victoriametrics.com/#graphite-render-api-usage): properly calculate sample timestamps when `moving*()` functions such as [movingAverage()](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingAverage) are applied over [summarize()](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.summarize).
* BUGFIX: limit the `end` query arg value to `+2 days` in the future at `/api/v1/*` endpoints, because VictoriaMetrics doesn't allow storing samples with timestamps bigger than +2 days in the future. This should help resolving [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2669).
* BUGFIX: properly register time series in per-day inverted index during the first hour after `indexdb` rotation. Previously this could lead to missing time series during querying if these time series stopped receiving new samples during the first hour after `indexdb` rotation. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2698).
* BUGFIX: do not register new series when `-storage.maxHourlySeries` or `-storage.maxDailySeries` limits were reached. Previously samples for new series weren't added to the database when the [cardinality limit](https://docs.victoriametrics.com/#cardinality-limiter) was reached, but series were still registered in the inverted index (aka `indexdb`). This could lead to unbound `indexdb` growth during [high churn rate](https://docs.victoriametrics.com/FAQ.html#what-is-high-churn-rate).

## [v1.77.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.77.2)

Released at 2022-05-21

* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): support [reusable templates](https://prometheus.io/docs/prometheus/latest/configuration/template_examples/#defining-reusable-templates) for rules annotations. The path to the template files can be specified via `-rule.templates` flag. See more about this feature [here](https://docs.victoriametrics.com/vmalert.html#reusable-templates). Thanks to @AndrewChubatiuk for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2532). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2510).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): expose `vmalert_iteration_interval_seconds` metric at `http://vmalert:8880/metrics`. This metric shows the configured per-group evaluation interval. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2618).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add `influx-prometheus-mode` command-line flag, which allows to restore the original time series written from Prometheus into InfluxDB during data migration from InfluxDB to VictoriaMetrics. See [this feature request](https://github.com/VictoriaMetrics/vmctl/issues/8). Thanks to @mback2k for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2545).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to specify AWS service name when issuing requests to AWS api. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2605). Thanks to @transacid for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2604).

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): fix a bug, which could lead to incomplete discovery of scrape targets in Kubernetes (aka `kubernetes_sd_config`). the bug has been introduced in [v1.77.0](https://docs.victoriametrics.com/CHANGELOG.html#v1770).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): support `scalar` result type in response. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2607).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): support strings in `humanize.*` template function in the same way as Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2569).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): proxy `/rules` requests to vmalert from Grafana's alerting UI. This removes errors in Grafana's UI for Grafana versions older than `8.5.*`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2583)
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): do not add `/api/v1/query` suffix to `-datasource.url` if `-remoteRead.disablePathAppend` command-line flag is set. Previously this flag was applied only to `-remoteRead.url`, which could confuse users.
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): prevent from possible resource leak on config update, which could lead to the slowdown of `vmalert` over time. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2577).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): do not return values from [label_value()](https://docs.victoriametrics.com/MetricsQL.html#label_value) function if the original time series has no values at the selected timestamps.
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): limit the number of concurrently established connections from vmselect to vmstorage. This should prevent from potentially high spikes in the number of established connections after temporary slowdown in connection handshake procedure between vmselect and vmstorage because of spikes in workload. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2552).
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): fix build for Solaris / SmartOS. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1322#issuecomment-1120276146).

## [v1.77.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.77.1)

Released at 2022-05-07

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to specify filters for Availability Zones in [ec2_sd_config](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs) via `az_filters` section. This section can contain AZ-specific set of filters in the same way as the existing `filters` section, which is used for filtering EC2 instances. The list of supported AZ-specific filters is available [here](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeAvailabilityZones.html).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `vmagent_remotewrite_global_rows_pushed_before_relabel_total` and `vmagent_remotewrite_rows_pushed_after_relabel_total` metrics at `http://vmagent:8429/metrics`, which can be used for monitoring the rate of rows (aka samples) pushed to remote storage before and after the relabeling via `-remoteWrite.relabelConfig` and `-remoteWrite.urlRelabelConfig`. See [relabeling docs](https://docs.victoriametrics.com/vmagent.html#relabeling) for details.
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add ability to skip `db` label during InfluxDB data import when `influx-skip-database-label` option is used. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2544). Thanks to @mback2k .

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly process passwords and secrets specified in the file pointed by `-promscrape.config` command-line flag. All the passwords and secrets were mistakenly replaced with `<secret>` string in `v1.77.0`. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2551) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2550).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): rename `vmagent_remote_write_rate_limit_reached_total` metric to `vmagent_remotewrite_rate_limit_reached_total`, so its name is consistent with the rest of `vmagent_remotewrite_` metrics.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): rename `promscrape_stale_samples_created_total` metric to `vm_promscrape_stale_samples_created_total`, so its name is consistent with the rest of `vm_promscrape_` metrics.
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): properly import InfluxDB measurements if they contain `db` tag. Previously this could result in incomplete import of measurmenet tags. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2536). Thanks to @mback2k for the bugfix.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): do not reset the selected relative time range when entering new query. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2402#issuecomment-1115817302).
* BUGFIX: [vmbackup](https://docs.victoriametrics.com/vmbackup.html): disallow writing backups to `-storageDataPath` directory, since this directory is managed solely by VictoriaMetrics or `vmstorage`. Other apps shouldn't write into this directory. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2503).
* BUGFIX: do not allow setting `-retentionPeriod` smaller than one day, since VictoriaMetrics doesn't support properly such small retention periods. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2496).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): do not drop samples routed to readonly `vmstorage` nodes if `-dropSamplesOnOverload` command-line flag is set. Try re-routing them to healthy `vmstorage` nodes instead. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2478).


## [v1.77.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.77.0)

Released at 2022-05-05

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for sending data to remote storage with AWS sigv4 authorization. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1287).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow filtering targets by target url and by target labels with [time series selector](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors) on `http://vmagent:8429/targets` page. This may be useful when `vmagent` scrapes big number of targets. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1796).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): reduce `-promscrape.config` reload duration when the config contains big number of jobs (aka [scrape_configs](https://docs.victoriametrics.com/sd_configs.html#scrape_configs) sections) and only a few of them are changed. Previously all the jobs were restarted. Now only the jobs with changed configs are restarted. This should reduce the probability of data miss because of slow config reload. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2270).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): improve service discovery speed for big number of scrape targets. This should help when `vmagent` discovers big number of targets (e.g. thousands) in Kubernetes cluster. The service discovery speed now should scale with the number of CPU cores available to `vmagent`.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add ability to attach node-level labels and annotations to discovered Kubernetes pod targets in the same way as Prometheus 2.35 does. See [this feature request](https://github.com/prometheus/prometheus/issues/9510) and [this pull request](https://github.com/prometheus/prometheus/pull/10080).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for `tls_config` and `proxy_url` options at `oauth2` section in the same way as Prometheus does. See [oauth2 docs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#oauth2).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for `min_version` option at `tls_config` section in the same way as Prometheus does. See [tls_config docs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#tls_config).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `vmagent_remotewrite_rate_limit` metric at `http://vmagent:8429/metrics`, which can be used for alerting rules such as `rate(vmagent_remotewrite_conn_bytes_written_total) / vmagent_remotewrite_rate_limit > 0.8` when `-remoteWrite.rateLimit` command-line flag is set. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2521).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add support for DNS-based discovery for notifiers in the same way as Prometheus does (aka `dns_sd_configs`). See [these docs](https://docs.victoriametrics.com/vmalert.html#notifier-configuration-file) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2460).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `-replay.disableProgressBar` command-line flag, which allows disabling progressbar in [rules' backfilling mode](https://docs.victoriametrics.com/vmalert.html#rules-backfilling). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1761).
* FEATURE: allow specifying TLS cipher suites for incoming https requests via `-tlsCipherSuites` command-line flag. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2404).
* FEATURE: allow specifying TLS cipher suites for mTLS connections between cluster components via `-cluster.tlsCipherSuites` command-line flag. See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#mtls-protection).
* FEATURE: vmstorage: add `-snapshotsMaxAge` command-line flag for automatic removal of snapshots older than the given age.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): show an empty graph on the selected time range when there is no data on it. Previously `No data to show` placeholder was shown instead of the graph in this case. This prevented from zooming and scrolling of such a graph.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): show the selected `last N minutes/hours/days` in the top right corner. Previously the `start - end` duration was shown instead, which could be hard to interpret. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2402).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): execute the query when `enter` button is pressed in the same way as Prometheus does. Multi-line query can be entered by pressing `shift-enter` in the query input field.
* FEATURE: expose `vm_indexdb_items_added_total` and `vm_indexdb_items_added_size_bytes_total` counters at `/metrics` page, which can be used for monitoring the rate for addition of new entries in `indexdb` (aka `inverted index`) alongside the total size in bytes for the added entries. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2471).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): show data pocessing speed during data migration.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `drop_common_labels()` function, which drops common `label="name"` pairs from the passed time series. See [these docs](https://docs.victoriametrics.com/MetricsQL.html#drop_common_labels).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `tlast_change_over_time(m[d])` function, which returns the timestamp of the last change of `m` on the given lookbehind window `d`. See [these docs](https://docs.victoriametrics.com/MetricsQL.html#tlast_change_over_time).
* FEATURE: leave the last raw sample per each `-dedup.minScrapeInterval` discrete interval when the [deduplication](https://docs.victoriametrics.com/#deduplication) is enabled. This aligns better with the [staleness rules in Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/#staleness) comparing to the previous behaviour when the first sample per each `-dedup.minScrapeInterval` was left.
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add ability to disable peer TLS certificate verification with `-cluster.tlsInsecureSkipVerify` command-line flag. See [mTLS docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#mtls-protection) for details. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2490).
* FEATURE: add a handler for `/api/v1/status/buildinfo` endpoint, which is used by Grafana starting from v8.5.0 . See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2515).
* FEATURE: add ability to proxy alerting API requests from Grafana to vmalert by passing `-vmalert.proxyURL` command-line flag to single-node VictoriaMetrics or to `vmselect` at cluster version of VictoriaMetrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1739).

* BUGFIX: export staleness markers as `null` values from [JSON export API](https://docs.victoriametrics.com/#how-to-export-data-in-json-line-format). Previously they were exported as `NaN` values. This could break the exported JSON parsing, since `NaN` values aren't supported by [JSON specification](https://www.json.org/).
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): close `vmselect->vmstorage` connections if they were idle for more than 30 seconds. Expose `vm_tcpdialer_conns_idle` metric at `http://vmselect:8481/metrics` with the number of idle connections to `vmstorage`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2508).
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): return non-zero exit code on error. This allows handling `vmctl` errors in shell scripts. Previously `vmctl` was returning 0 exit code on error. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2322).
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): prevent from indefinite hang on `Ctrl+C`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2491).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly show `scrape_timeout` and `scrape_interval` options at `http://vmagent:8429/config` page. Previously these options weren't displayed even if they were set in `-promscrape.config`.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): handle non-standard http redirect status codes, which may be returned by scrape targets, in the same way as Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2482).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): skip template execution during rules' validation. This should prevent from `error evaluating annotation template` errors when some template functions expect non-empty args. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2514).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): fixed truncating alerts expression in table, updated table cell layout. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2484).
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly handle joins on time series filtered by values. For example, `kube_pod_container_resource_requests{resource="cpu"} * on (namespace,pod) group_left() (kube_pod_status_phase{phase=~"Pending|Running"}==1)`. This query could result in `duplicate time series on the right side` error even if `==1` filter leaves only a single time series per `(namespace,pod)` labels. Now such query is properly executed.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): properly handle `scalar default vector`, `scalar if vector` and `scalar ifnot vector` queries. Previously such queries could return unexpected results from the `vector` part.
* BUGFIX: [Official Grafana dashboards for VictoriaMetrics](https://grafana.com/orgs/victoriametrics): take into account `indexdb` when calculating disk space usage. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2368).


## [v1.76.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.76.1)

Released at 2022-04-12

**Update notes:** this release introduces backwards-incompatible changes to communication protocol between `vmselect` and `vmstorage` nodes in cluster version of VictoriaMetrics, so read requests to `vmselect` will fail until the upgrade is complete. These errors will stop after all the `vmselect` and `vmstorage` nodes are updated to the new release. It is safe to downgrade to previous releases.

* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add support for `alert_relabel_configs` option at `-notifier.config`. This option allows configuring relabeling rules for alerts before sending them to configured notifiers. See [these docs](https://docs.victoriametrics.com/vmalert.html#notifier-configuration-file) for details.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmalert.html): allow passing StatefulSet pod names to `-promscrape.cluster.memberNum` command-line flag. In this case the member number is automatically extracted from the pod name, which must end with the number in the range `0 ... promscrape.cluster.membersCount-1`. For example, `vmagent-0`, `vmagent-1`, etc. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2359) and [these docs](https://docs.victoriametrics.com/vmagent.html#scraping-big-number-of-targets).

* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): properly propagate limits at `-search.max*` command-line flags from `vminsert` to `vmstorage`. The limits are `-search.maxUniqueTimeseries`, `-search.maxSeries`, `-search.maxFederateSeries`, `-search.maxExportSeries`, `-search.maxGraphiteSeries` and `-search.maxTSDBStatusSeries`. They weren't propagated to `vmstorage` because of the bug. These limits were introduced in [v1.76.0](https://docs.victoriametrics.com/CHANGELOG.html#v1760). See [this bug](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2450).
* BUGFIX: fix goroutine leak and possible deadlock when importing invalid data via [native binary format](https://docs.victoriametrics.com/#how-to-import-data-in-native-format). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2423).
* BUGFIX: [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage): properly calculate [hitCount](https://graphite.readthedocs.io/en/latest/functions.html#graphite.render.functions.hitcount) function. Previously it could return empty results if there were no original samples in some parts of the selected time range.
* BUGFIX: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): allow overriding built-in function names inside [WITH templates](https://play.victoriametrics.com/select/accounting/1/6a716b0f-38bc-4856-90ce-448fd713e3fe/expand-with-exprs). For example, `WITH (sum(a,b) = a + b + 1) sum(x,y)` now expands into `x + y + 1`. Previously such a query would fail with `cannot use reserved name` error. See [this bugreport](https://github.com/VictoriaMetrics/metricsql/issues/5).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): properly display values greater than 1000 on Y axis. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2409).


## [v1.76.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.76.0)

Released at 2022-04-07

**Update notes:** this release introduces backwards-incompatible changes to communication protocol between `vmselect` and `vmstorage` nodes in cluster version of VictoriaMetrics, so read requests to `vmselect` will fail until the upgrade is complete. These errors will stop after all the `vmselect` and `vmstorage` nodes are updated to the new release. It is safe to downgrade to previous releases.

* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): add ability to verify files obtained via [native export](https://docs.victoriametrics.com/#how-to-export-data-in-native-format). See [these docs](https://docs.victoriametrics.com/vmctl.html#verifying-exported-blocks-from-victoriametrics) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2362).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add pre-defined dashboards for per-job CPU usage, memory usage and disk IO usage. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2243) for details.
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): improve compatibility with [Prometheus Alert Generator specification](https://github.com/prometheus/compliance/blob/main/alert_generator/specification.md). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2340).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `-datasource.disableKeepAlive` command-line flag, which can be used for disabling [HTTP keep-alive connections](https://en.wikipedia.org/wiki/HTTP_persistent_connection) to datasources. This option can be useful for distributing load among multiple datasources behind TCP proxy such as [HAProxy](http://www.haproxy.org/).
* FEATURE: [Cluster version of VictoriaMetrics](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): reduce memory usage by up to 50% for `vminsert` and `vmstorage` under high ingestion rate.
* FEATURE: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): Allow to read `-ratelimit.config` file from URL. Also add `-ratelimit.configCheckInterval` command-line option. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2241).
* FEATURE: add the following command-line flags, which can be used for fine-grained limiting of CPU and memory usage during various API calls:

  * `-search.maxFederateSeries` for limiting the number of time series, which can be returned from [/federate](https://docs.victoriametrics.com/#federation).
  * `-search.maxExportSeries` for limiting the number of time series, which can be returned from [/api/v1/export](https://docs.victoriametrics.com/#how-to-export-time-series).
  * `-search.maxSeries` for limiting the number of time series, which can be returned from [/api/v1/series](https://docs.victoriametrics.com/url-examples.html#apiv1series).
  * `-search.maxTSDBStatusSeries` for limiting the number of time series, which can be scanned during the request to [/api/v1/status/tsdb](https://docs.victoriametrics.com/#tsdb-stats).
  * `-search.maxGraphiteSeries` for limiting the number of time series, which can be scanned during the request to [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage).

Previously the `-search.maxUniqueTimeseries` command-line flag was used as a global limit for all these APIs. Now the `-search.maxUniqueTimeseries` is used only for limiting the number of time series, which can be scanned during requests to [/api/v1/query](https://docs.victoriametrics.com/url-examples.html#apiv1query) and [/api/v1/query_range](https://docs.victoriametrics.com/url-examples.html#apiv1query_range).

When using [cluster version of VictoriaMetrics](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html), these command-line flags (including `-search.maxUniqueTimeseries`) must be passed to `vmselect` instead of `vmstorage`.

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html) and [vmauth](https://docs.victoriametrics.com/vmauth.html): reduce the probability of `TLS handshake error from XX.XX.XX.XX: EOF` errors when `-remoteWrite.url` points to HTTPS url at `vmauth`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1699).
* BUGFIX: return `Content-Type: text/html` response header when requesting `/` HTTP path at VictoriaMetrics components. Previously `text/plain` response header was returned, which could lead to broken page formatting. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2323).
* BUGFIX: [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage): accept floating-point values for [maxDataPoints](https://graphite.readthedocs.io/en/stable/render_api.html#maxdatapoints) query arg, since some clients send floating-point values instead of integer values for this arg.

## [v1.75.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.75.1)

Released at 2022-03-28

* BUGFIX: update base image for VictoriaMetrics from `alpine-3.15.0` to `alpine-3.15.2`. This fixes [CVE-2022-0778](https://nvd.nist.gov/vuln/detail/CVE-2022-0778). See [alpine 3.15.2 release docs](https://alpinelinux.org/posts/Alpine-3.15.2-released.html).

## [v1.75.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.75.0)

Released at 2022-03-18

**Update notes:** release contains breaking change to vmalert's API introduced in [ee396b5](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2320/commits/ee396b5750d0bcb98233d624f88fa6cf92a8253b).
It replaces the `api/v1/groups` API handler with `api/v1/rules` handler in order to become compatible
with [alerts generator specification](https://github.com/prometheus/compliance/blob/main/alert_generator/specification.md).
See other changes introduced to vmalert [here](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2320).

* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add support for mTLS communications between cluster components. See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#mtls-protection) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/550).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add ability to use OAuth2 for `-datasource.url`, `-notifier.url` and `-remoteRead.url`. See the corresponding command-line flags containing `oauth2` in their names [here](https://docs.victoriametrics.com/vmalert.html#flags).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add ability to use Bearer Token for `-notifier.url` via `-notifier.bearerToken` and `-notifier.bearerTokenFile` command-line flags. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1824).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `sortByLabel` template function in order to be consistent with Prometheus. See [these docs](https://prometheus.io/docs/prometheus/latest/configuration/template_reference/#functions) for more details.
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): improve compliance with [Prometheus Alert Generator Specification](https://github.com/prometheus/compliance/blob/main/alert_generator/specification.md).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `-rule.resendDelay` command-line flag, which specifies the minumum amount of time to wait before resending an alert to Alertmanager (e.g. this is equivalent to `-rules.alert.resend-delay` option from Prometheus. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1665).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): transparently treat `Authorization: Token ...` request headers as `Authorization: Bearer ...` request headers. This allows sending requests to `vmauth` from InfluxDB clients. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1897). Thanks to @dcircelli for the pull request.
* FEATURE: do not log trivial network errors such as `broken pipe` and `connection reset by peer`. This error could occur when writing data to the client, which closes the connection to VictoriaMetrics due to request timeout or similar reason. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2334).

* BUGFIX: [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage): return an additional point after `until` timestamp in the same way as Graphite does. Previously VictoriaMetrics didn't return this point, which could result in missing last point on the graph.
* BUGFIX: properly locate series with the given `name` and without the given `label` when using the `name{label=~"foo|"}` series selector. Previously such series could be skipped. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2255). Thanks to @jduncan0000 for discovering and fixing the issue.
* BUGFIX: properly free up memory occupied by deleted cache entries for the following caches: `indexdb/dataBlocks`, `indexdb/indexBlocks`, `storage/indexBlocks`. This should reduce the increased memory usage starting from v1.73.0. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2242) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2007) issue.
* BUGFIX: reduce the interval for checking for free disk space from 30 seconds to 1 second. This should reduce the probability of `no space left on device` panics when `-storage.minFreeDiskSpaceBytes` is set to too low values. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2305).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): prevent from panic at vmagent when importing a time series with big number of samples. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2335). Thanks to @bleedfish for discovering and fixing the issue.

## [v1.74.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.74.0)

Released at 2022-03-03

**Update notes:** In this release VictoriaMetrics may use some extra memory due to issues [#2242](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2242) and [#2007](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2007). These issues were addressed in [v1.75.0](#v1750), so we recommend updating straight to it.

* FEATURE: add support for conditional relabeling via `if` filter. The `if` filter can contain arbitrary [series selector](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors). For example, the following rule drops targets matching `foo{bar="baz"}` series selector:

```yml
- action: drop
  if: 'foo{bar="baz"}'
```

This rule is equivalent to less clear traditional one:

```yml
- action: drop
  source_labels: [__name__, bar]
  regex: 'foo;baz'
```

  See [relabeling docs](https://docs.victoriametrics.com/vmagent.html#relabeling) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1998) for more details.

* FEATURE: reduce memory usage for various caches under [high churn rate](https://docs.victoriametrics.com/FAQ.html#what-is-high-churn-rate).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): re-use Kafka client when pushing data from [many tenants](https://docs.victoriametrics.com/vmagent.html#multitenancy) to Kafka. Previously a separate Kafka client was created per each tenant. This could lead to increased load on Kafka. See [how to push data from vmagent to Kafka](https://docs.victoriametrics.com/vmagent.html#writing-metrics-to-kafka).
* FEATURE: improve performance when registering new time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2247). Thanks to @ahfuzhang .

* BUGFIX: return the proper number of datapoints from `moving*()` functions such as `movingAverage()` in [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage). Previously these functions could return too big number of samples if [maxDataPoints query arg](https://graphite.readthedocs.io/en/stable/render_api.html#maxdatapoints) is explicitly passed to `/render` API.
* BUGFIX: properly handle [series selector](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors) containing a filter for multiple metric names plus a negative filter. For example, `{__name__=~"foo|bar",job!="baz"}` . Previously VictoriaMetrics could return series with `foo` or `bar` names and with `job="baz"`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2238).
* BUGFIX: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): properly parse JWT tokens if they are encoded with [URL-safe base64 encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

## [v1.73.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.73.1)

Released at 2022-02-22

**Update notes:** In this release VictoriaMetrics may use some extra memory due to issues [#2242](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2242) and [#2007](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2007). These issues were addressed in [v1.75.0](#v1750), so we recommend updating straight to it.

* FEATURE: allow overriding default limits for the following in-memory caches, which usually occupy the most memory:
  * `storage/tsid` - the cache speeds up lookups of internal metric ids by `metric_name{labels...}` during data ingestion. The size for this cache can be tuned with `-storage.cacheSizeStorageTSID` command-line flag.
  * `indexdb/dataBlocks` - the cache speeds up data lookups in `<-storageDataPath>/indexdb` files. The size for this cache can be tuned with `-storage.cacheSizeIndexDBDataBlocks` command-line flag.
  * `indexdb/indexBlocks` - the cache speeds up index lookups in `<-storageDataPath>/indexdb` files. The size for this cache can be tuned with `-storage.cacheSizeIndexDBIndexBlocks` command-line flag.
  See also [cache tuning docs](https://docs.victoriametrics.com/#cache-tuning). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1940).
* FEATURE: add `-influxDBLabel` command-line flag for overriding `db` label name for the data [imported into VictoriaMetrics via InfluxDB line protocol](https://docs.victoriametrics.com/#how-to-send-data-from-influxdb-compatible-agents-such-as-telegraf). Thanks to @johnatannvmd for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2203).
* FEATURE: return `X-Influxdb-Version` HTTP header in responses to [InfluxDB write requests](https://docs.victoriametrics.com/#how-to-send-data-from-influxdb-compatible-agents-such-as-telegraf). This is needed for some InfluxDB clients. See [this comment](https://github.com/ntop/ntopng/issues/5449#issuecomment-1005347597) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2209).

* BUGFIX: reduce memory usage during the first three hours after the upgrade from versions older than v1.73.0. The memory usage spike was related to the need of in-memory caches' re-population after the upgrade because of the fix for [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1401). Now cache size limits are reduced in order to occupy less memory during the upgrade.
* BUGFIX: fix a bug, which could significantly slow down requests to `/api/v1/labels` and `/api/v1/label/<label_name>/values`. These APIs are used by Grafana for auto-completion of label names and label values. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2200).
* BUGFIX: vmalert: add support for `$externalLabels` and `$externalURL` template vars in the same way as Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2193).
* BUGFIX: vmalert: make sure notifiers are discovered during initialization if they are configured via `consul_sd_configs`. Previously they could be discovered in 30 seconds (the default value for `-promscrape.consulSDCheckInterval` command-line flag) after the initialization. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2202).
* BUGFIX: update default value for `-promscrape.fileSDCheckInterval`, so it matches default duration used by Prometheus for checking for updates in `file_sd_configs`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2187). Thanks to @corporate-gadfly for the fix.
* BUGFIX: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): do not return partial responses from `vmselect` if at least a single `vmstorage` node was reachable and returned an app-level error. Such errors are usually related to cluster mis-configuration, so they must be returned to the caller instead of being masked by [partial responses](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#cluster-availability). Partial responses can be returned only if some of `vmstorage` nodes are unreachable during the query. This may help the following issues: [one](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1941), [two](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/678).

## [v1.73.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.73.0)

Released at 2022-02-14

**Update notes:** In this release VictoriaMetrics may use some extra memory described in issues [#2242](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2242) and [#2007](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2007). These issues were addressed in [v1.75.0](#v1750), so we recommend updating straight to it.

* FEATURE: publish VictoriaMetrics binaries for MacOS amd64 and MacOS arm64 (aka MacBook M1) at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1896) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1851).
* FEATURE: reduce CPU and disk IO usage during `indexdb` rotation once per `-retentionPeriod`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1401).
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): add `-dropSamplesOnOverload` command-line flag for `vminsert`. If this flag is set, then `vminsert` drops incoming data if the destination `vmstorage` is temporarily unavailable or cannot keep up with the ingestion rate. The number of dropped rows can be [monitored](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#monitoring) via `vm_rpc_rows_dropped_on_overload_total` metric at `vminsert`.
* FEATURE: [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html): improve re-routing logic, so it re-routes incoming data more evenly if some of `vmstorage` nodes are temporarily unavailable and/or accept data at slower rate than other `vmstorage` nodes. Also significantly reduce possible re-routing storm when `vminsert` runs with `-disableRerouting=false` command-line flag. This should help the following issues: [one](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1337), [two](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1165), [three](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1054), [four](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/791), [five](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1544).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): cover more cases with the [label filters' propagation optimization](https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusLabelNonOptimization). This should improve the average performance for practical queries. The following cases are additionally covered:
  * Multi-level [transform functions](https://docs.victoriametrics.com/MetricsQL.html#transform-functions). For example, `abs(round(foo{a="b"})) + bar{x="y"}` is now optimized to `abs(round(foo{a="b",x="y"})) + bar{a="b",x="y"}`
  * Binary operations with `on()`, `without()`, `group_left()` and `group_right()` modifiers. For example, `foo{a="b"} on (a) + bar` is now optimized to `foo{a="b"} on (a) + bar{a="b"}`
  * Multi-level binary operations. For example, `foo{a="b"} + bar{x="y"} + baz{z="q"}` is now optimized to `foo{a="b",x="y",z="q"} + bar{a="b",x="y",z="q"} + baz{a="b",x="y",z="q"}`
  * Aggregate functions. For example, `sum(foo{a="b"}) by (c) + bar{c="d"}` is now optimized to `sum(foo{a="b",c="d"}) by (c) + bar{c="d"}`
* FEATURE [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): optimize joining with `*_info` labels. For example: `kube_pod_created{namespace="prod"} * on (uid) group_left(node) kube_pod_info` now automatically adds the needed filters on `uid` label to `kube_pod_info` before selecting series for the right side of `*` operation. This may save CPU, RAM and disk IO resources. See [this article](https://www.robustperception.io/exposing-the-software-version-to-prometheus) for details on `*_info` labels. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1827).
* FEATURE: all: improve performance for arm64 builds of VictoriaMetrics components by up to 15%. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2102).
* FEATURE: all: expose `process_cpu_cores_available` metric, which shows the number of CPU cores available to the app. The number can be fractional if the corresponding cgroup limit is set to a fractional value. This metric is useful for alerting on CPU saturation. For example, the following query alerts when the app uses more than 90% of CPU during the last 5 minutes: `rate(process_cpu_seconds_total[5m]) / process_cpu_cores_available > 0.9` . See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2107).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add ability to configure notifiers (e.g. alertmanager) via a file in the way similar to Prometheus. See [these docs](https://docs.victoriametrics.com/vmalert.html#notifier-configuration-file), [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2127).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add support for Consul service discovery for notifiers. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1947).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add support for specifying Basic Auth password for notifiers via a file. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1567).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): provide the ability to fetch target responses on behalf of `vmagent` by clicking the `response` link for the needed target at `/targets` page. This feature may be useful for debugging responses from targets located in isolated environments.
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): show the total number of scrapes and the total number of scrape errors per target at `/targets` page. This information may be useful when debugging unreliable scrape targets.
* FEATURE: vmagent and single-node VictoriaMetrics: disallow unknown fields at `-promscrape.config` file. Previously unknown fields were allowed. This could lead to long-living silent config errors. The previous behaviour can be returned by passing `-promscrape.config.strictParse=false` command-line flag.
* FEATURE: vmagent: add `__meta_kubernetes_endpointslice_label*` and `__meta_kubernetes_endpointslice_annotation*` labels for `role: endpointslice` targets in [kubernetes_sd_config](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) to be consistent with other `role` values. See [this issue](https://github.com/prometheus/prometheus/issues/10284).
* FEATURE: vmagent: add `collapse all` and `expand all` buttons to `http://vmagent:8429/targets` page. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2021).
* FEATURE: vmagent: support Prometheus-like durations in `-promscrape.config`. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/817#issuecomment-1033384766).
* FEATURE: automatically re-read `-tlsCertFile` and `-tlsKeyFile` files, so their contents can be updated without the need to restart VictoriaMetrics apps. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2171).

* BUGFIX: calculate [absent_over_time()](https://docs.victoriametrics.com/MetricsQL.html#absent_over_time) in the same way as Prometheus does. Previously it could return multiple time series instead of at most one time series like Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2130).
* BUGFIX: return proper results from `highestMax()` function at [Graphite render API](https://docs.victoriametrics.com/#graphite-render-api-usage). Previously it was incorrectly returning timeseries with min peaks instead of max peaks.
* BUGFIX: properly limit indexdb cache sizes. Previously they could exceed values set via `-memory.allowedPercent` and/or `-memory.allowedBytes` when `indexdb` contained many data parts. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2007).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix a bug, which could break time range picker when editing `From` or `To` input fields. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2080).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix a bug, which could break switching between `graph`, `json` and `table` views. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2084).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix possible UI freeze after querying `node_uname_info` time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2115).
* BUGFIX: show the original location of the warning or error message when logging throttled messages. Previously the location inside `lib/logger/throttler.go` was shown. This could increase the complexity of debugging.
* BUGFIX: vmalert: fix links at web UI. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2167).
* BUGFIX: vmagent: properly discover pods without exposed ports for the given service for `role: endpoints` and `role: endpointslice` in [kubernetes_sd_config](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2134).
* BUGFIX: vmagent: properly display `zone` contents for `gce_sd_configs` section at `http://vmagent:8429/config` page. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2179). Thanks to @artifactori for the bugfix.
* BUGFIX: vmagent: properly handle `all_tenants: true` config option at `openstack_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2182).

## [v1.72.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.72.0)

Released at 2022-01-18

* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add support for `@` modifier, which is enabled by default in Prometheus starting from [Prometheus v2.33.0](https://github.com/prometheus/prometheus/pull/10121). See [these docs](https://prometheus.io/docs/prometheus/latest/querying/basics/#modifier) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1348). VictoriaMetrics extends `@` modifier with the following additional features:
  * It can contain arbitrary expression. For example, `foo @ (end() - 1h)` would return `foo` value at `end - 1 hour` timestamp on the selected time range `[start ... end]`. Another example: `foo @ (now() - 10m)` would return `foo` value 10 minutes ago from the current time.
  * It can be put everywhere in the query. For example, `sum(foo) @ start()` would calculate `sum(foo)` at `start` timestamp on the selected time range `[start ... end]`.
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add support for optional `keep_metric_names` modifier, which can be applied to all the [rollup functions](https://docs.victoriametrics.com/MetricsQL.html#rollup-functions) and [transform functions](https://docs.victoriametrics.com/MetricsQL.html#transform-functions). This modifier prevents from deleting metric names from function results. For example, `rate({__name__=~"foo|bar"}[5m]) keep_metric_names` leaves `foo` and `bar` metric names in `rate()` results. This feature provides an additional workaround for [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/949).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add support for Kubernetes service discovery in the current namespace in the same way as [Prometheus does](https://github.com/prometheus/prometheus/pull/9881). For example, the following config limits pod discovery to the namespace where vmagent runs:

```yaml
  scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
      namespaces:
        own_namespace: true
```

* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): add `__meta_kubernetes_node_provider_id` label for discovered Kubernetes nodes in the same way as [Prometheus does](https://github.com/prometheus/prometheus/pull/9603).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): log error message when remote storage returns 400 or 409 http errors. This should simplify detection and debugging of this case. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1911).
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): expose `promscrape_stale_samples_created_total` metric for monitoring the total number of created stale samples when scraping Prometheus targets. See [these docs](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) for the information on when stale samples (aka staleness markers) can be created.
* FEATURE: [vmrestore](https://docs.victoriametrics.com/vmrestore.html): store `restore-in-progress` file in `-dst` directory while `vmrestore` is running. This file is automatically deleted when `vmrestore` is successfully finished. This helps detecting incompletely restored data on VictoriaMetrics start. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1958).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): print the last sample timestamp when the data migration is interrupted either by user or by error. This helps continuing the data migration from the interruption moment. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1236).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): expose `vmalert_remotewrite_total` metric at `/metrics` page. This makes possible calculating SLOs for error rate during writing recording rules and alert state to `-remoteWrite.url` with the query `vmalert_remotewrite_errors_total / vmalert_remotewrite_total`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2040). Thanks to @afoninsky .
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `stripPort` template function in the same way as [Prometheus does](https://github.com/prometheus/prometheus/pull/10002).
* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add `parseDuration` template function in the same way as [Prometheus does](https://github.com/prometheus/prometheus/pull/8817).
* FEATURE: [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html): add `stale_samples_over_time(m[d])` function for calculating the number of [staleness marks](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) for time series `m` over the duration `d`. This function may be useful for detecting flapping metrics at scrape targets, which periodically disappear and then appear again.
* FEATURE: [vmgateway](https://docs.victoriametrics.com/vmgateway.html): add support for `extra_filters` option. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1863).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): improve UX according to [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1960). Thanks to @Loori-R .
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): limit the number of requests sent to VictoriaMetrics during zooming / scrolling. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2064).

* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): make sure that `vmagent` replicas scrape the same targets at different time offsets when [replication is enabled in vmagent clustering mode](https://docs.victoriametrics.com/vmagent.html#scraping-big-number-of-targets). This guarantees that the [deduplication](https://docs.victoriametrics.com/#deduplication) consistently leaves samples from the same `vmagent` replica.
* BUGFIX: return the proper response stub from `/api/v1/query_exemplars` handler, which is needed for Grafana v8+. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1999).
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): fix a few edge cases and improve migration speed for OpenTSDB importer. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2019).
* BUGFIX: fix possible data race when searching for time series matching `{key=~"value|"}` filter over time range covering multipe days. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/2032). Thanks to @waldoweng for the provided fix.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): do not send staleness markers on graceful shutdown. This follows Prometheus behavior. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2013#issuecomment-1006994079).
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): properly set `__address__` label in `dockerswarm_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2038). Thanks to @ashtuchkin for the fix.
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix incorrect calculations for graph limits on y axis. This could result in incorrect graph rendering in some cases. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2037).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix handling for multi-line queries. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/2039).

## [v1.71.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.71.0)

Released at 2021-12-20

**Update notes:** deduplication logic was slightly changed on the release, which may cause extra
[background merges](https://medium.com/@valyala/how-victoriametrics-makes-instant-snapshots-for-multi-terabyte-time-series-data-e1f3fb0e0282)
for already existing data parts for installations with `-dedup.minScrapeInterval` flag value greater than 0. This process is intentionally limited by one CPU core, but still can result
into increase of CPU usage until merges are finished.

We recommend updating in "off-peak" time when load on the VictoriaMetrics is on its minimum.

* FEATURE: [VictoriaMetrics enterprise](https://docs.victoriametrics.com/enterprise.html): add multi-level downsampling support. See [these docs](https://docs.victoriametrics.com/#downsampling) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/36).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add ability to analyze the correlation between two queries on a single graph. Just click `+Query` button, enter the second query in the newly appeared input field and press `Ctrl+Enter`. Results for both queries should be displayed simultaneously on the same graph. Every query has its own vertical scale, which is displayed on the left and the right side of the graph. Lines for the second query are dashed. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1916).
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): add ability to override the interval between returned datapoints. By default it is automatically calculated depending on the selected time range and horizontal resolution of the graph. Now it is possible to override it with custom values. This may be useful during data exploration and debugging.
* FEATURE: accept optional `extra_filters[]=series_selector` query args at Prometheus query APIs additionally to `extra_label` query args. This allows enforcing additional filters for all the Prometheus query APIs by using [vmgateway](https://docs.victoriametrics.com/vmgateway.html) or [vmauth](https://docs.victoriametrics.com/vmauth.html). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1863).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): allow specifying `http` and `https` urls in `-auth.config` command-line flag. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1898). Thanks for @TFM93 .
* FEATURE: [vmagent](https://docs.victoriametrics.com/vmagent.html): allow specifying `http` and `https` urls in the following command-line flags: `-promscrape.config`, `-remoteWrite.relabelConfig` and `-remoteWrite.urlRelabelConfig`.
* FEATURE: vminsert: allow specifying `http` and `https` urls in `-relabelConfig` command-line flag.
* FEATURE: vminsert: add `-maxLabelValueLen` command-line flag for the ability to configure the maximum length of label value. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1908).
* FEATURE: preserve the order of time series passed to [limit_offset](https://docs.victoriametrics.com/MetricsQL.html#limit_offset) function. This allows implementing series paging via `limit_offset(limit, offset, sort_by_label(...))`. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1920) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/951) issues.
* FEATURE: automaticall convert `(value1|...|valueN)` into `{value1,...,valueN}` inside `__graphite__` pseudo-label. This allows using [Grafana multi-value template variables](https://grafana.com/docs/grafana/latest/variables/formatting-multi-value-variables/) inside `__graphite__` pseudo-label. For example, `{__graphite__=~"foo.($bar)"}` is expanded to `{__graphite__=~"foo.{x,y}"}` if both `x` and `y` are selected for `$bar` template variable. See [these docs](https://docs.victoriametrics.com/#selecting-graphite-metrics) for details.
* FEATURE: add [timestamp_with_name](https://docs.victoriametrics.com/MetricsQL.html#timestamp_with_name) function. It works the same as [timestamp](https://docs.victoriametrics.com/MetricsQL.html#timestamp), but leaves the original time series names, so it can be used in queries, which match multiple time series names: `timestamp_with_name({foo="bar"}[1h])`. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/949#issuecomment-995222388) for more context.
* FEATURE: add [changes_prometheus](https://docs.victoriametrics.com/MetricsQL.html#changes_prometheus), [increase_prometheus](https://docs.victoriametrics.com/MetricsQL.html#increase_prometheus) and [delta_prometheus](https://docs.victoriametrics.com/MetricsQL.html#delta_prometheus) functions, which don't take into account the previous sample before the given lookbehind window specified in square brackets. These functions may be used when the Prometheus behaviour for `changes()`, `increase()` and `delta()` functions is needed to be preserved. VictoriaMetrics uses slightly different behaviour for `changes()`, `increase()` and `delta()` functions by default - see [this article](https://medium.com/@romanhavronenko/victoriametrics-promql-compliance-d4318203f51e) for details. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1962).

* BUGFIX: fix `unaligned 64-bit atomic operation` panic on 32-bit architectures, which has been introduced in v1.70.0. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1944).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): restore the ability to use `$labels.alertname` in labels templating. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1921).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): add missing `query` caption to the input field for the query. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1900).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix navigation over query history with `Ctrl+up/down` and fix zoom relatively to the cursor position. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1936).
* BUGFIX: deduplicate samples more thoroughly if [deduplication](https://docs.victoriametrics.com/#deduplication) is enabled. Previously some duplicate samples may be left on disk for time series with high churn rate. This may result in bigger storage space requirements.
* BUGFIX: [vmagent](https://docs.victoriametrics.com/vmagent.html): follow up to 5 redirects when `follow_redirects: true` is set for a particular scrape config. Previously only a single redirect was performed in this case. It is expected these redirects are performed to the original hostname. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1945).
* BUGFIX: de-duplicate data exported via [/api/v1/export/csv](https://docs.victoriametrics.com/#how-to-export-csv-data) by default if [deduplication](https://docs.victoriametrics.com/#deduplication) is enabled. The de-duplication can be disabled by passing `reduce_mem_usage=1` query arg to `/api/v1/export/csv`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1837).
* BUGFIX: [vmalert](https://docs.victoriametrics.com/vmalert.html): properly store [historical data](https://docs.victoriametrics.com/vmalert.html#rules-backfilling) to old Prometheus versions. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1943).

## [v1.70.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.70.0)

Released at 2021-12-02

* FEATURE: [vmalert](https://docs.victoriametrics.com/vmalert.html): add ability to pass arbitrary query args to `-datasource.url` on a per-group basis via `params` option. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1892).
* FEATURE: add `now()` function to MetricsQL. This function returns the current timestamp in seconds. See [these docs](https://docs.victoriametrics.com/MetricsQL.html#now).
* FEATURE: vmauth: allow using optional `name` field in configs. This field is then used as `username` label value for `vmauth_user_requests_total` metric. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1805).
* FEATURE: vmagent: export `vm_persistentqueue_read_duration_seconds_total` and `vm_persistentqueue_write_duration_seconds_total` metrics, which can be used for detecting persistent queue saturation with `rate(vm_persistentqueue_write_duration_seconds_total) > 0.9` alerting rule.
* FEATURE: export `vm_filestream_read_duration_seconds_total` and `vm_filestream_write_duration_seconds_total` metrics, which can be used for detecting persistent disk saturation with `rate(vm_filestream_read_duration_seconds_total) > 0.9` alerting rule.
* FEATURE: export `vm_cache_size_max_bytes` metrics, which show capacity for various caches. These metrics can be used for determining caches with reach its capacity with `vm_cache_size_bytes / vm_cache_size_max_bytes > 0.9` query.
* FEATURE: [vmbackup](https://docs.victoriametrics.com/vmbackup.html), [vmrestore](https://docs.victoriametrics.com/vmrestore.html): add `-s3ForcePathStyle` command-line flag, which can be used for making backups to [Aliyun OSS](https://www.aliyun.com/product/oss). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1802).
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): improve data migration from OpenTSDB. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1809). Thanks to @johnseekins .
* FEATURE: suppress `connection reset by peer` errors when remote client resets TCP connection to VictoriaMetrics / vmagent while ingesting the data via InfluxDB line protocol, Graphite protocol or OpenTSDB protocol. This error is expected, so there is no need in logging it.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): store the display type in URL, so it isn't lost when copy-pasting the URL. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1804).
* FEATURE: vmalert: make `-notifier.url` command-line flag optional. This flag can be omitted if `vmalert` is used solely for recording rules and doesn't evaluate alerting rules. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1870).
* FEATURE: [vmbackup](https://docs.victoriametrics.com/vmbackup.html), [vmrestore](https://docs.victoriametrics.com/vmrestore.html): export internal metrics at `http://vmbackup:8420/metrics` and `http://vmrestore:8421/metrics` for better visibility of the backup/restore process.
* FEATURE: allow trailing whitespace after the timestamp when [parsing Graphite plaintext lines](https://docs.victoriametrics.com/#how-to-send-data-from-graphite-compatible-agents-such-as-statsd). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1865).
* FEATURE: expose `/-/healthy` and `/-/ready` endpoints as Prometheus does. This is needed for improving integration with third-party solutions, which rely on these endpoints. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1833).

* BUGFIX: vmagent: prevent from scraping duplicate targets if `-promscrape.dropOriginalLabels` command-line flag is set. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1830). Thanks to @guidao for the fix.
* BUGFIX: vmstorage [enterprise](https://docs.victoriametrics.com/enterprise.html): added missing `vm_tenant_used_tenant_bytes` metric, which shows the approximate per-tenant disk usage. See [these docs](https://docs.victoriametrics.com/PerTenantStatistic.html) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1605).
* BUGFIX: vmauth: properly take into account the value passed to `-maxIdleConnsPerBackend` command-line flag. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1300).
* BUGFIX: vmagent: fix [reading data from Kafka](https://docs.victoriametrics.com/vmagent.html#reading-metrics-from-kafka).
* BUGFIX: vmalert: fix [replay mode](https://docs.victoriametrics.com/vmalert.html#rules-backfilling) in enterprise version.
* BUGFIX: consistently return zero from [deriv()](https://docs.victoriametrics.com/MetricsQL.html#deriv) function applied to a constant time series. Previously it could return small non-zero values in this case.
* BUGFIX: [vmrestore](https://docs.victoriametrics.com/vmrestore.html): properly resume downloading for partially downloaded big files. Previously such files were re-downloaded from the beginning after the interrupt. Now only the remaining parts of the file are downloaded. This allows saving network bandwidth. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/487).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): do not store the last query across vmui page reloads. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1694).
* BUGFIX: [vmui](https://docs.victoriametrics.com/#vmui): fix `Cannot read properties of undefined` error at table view. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1797).

## [v1.69.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.69.0)

Released at 2021-11-08

* FEATURE: vmalert: allow groups with empty rules list like Prometheus does. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1742).
* FEATURE: vmalert: allow groups with default `tenant` in `-clusterMode`. Default `tenant` values can be specified via `-defaultTenant.prometheus` and `-defaultTenant.graphite`. See [these docs](https://docs.victoriametrics.com/vmalert.html#multitenancy).
* FEATURE: vmagent: add `collapse` and `expand` buttons per each group of targets with the same `job_name` at `http://vmagent:8429/targets` page.
* FEATURE: automatically detect timestamp precision (ns, us, ms or s) for the data ingested into VictoriaMetrics via [InfluxDB line protocol](https://docs.victoriametrics.com/#how-to-send-data-from-influxdb-compatible-agents-such-as-telegraf).
* FEATURE: vmagent: add ability to protect `/config` page with auth key via `-configAuthKey` command-line flag. This page may contain sensitive config information, so it may be good to restrict access to this page. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1764).
* FEATURE: vmagent: hide passwords and auth tokens at `/config` page like Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1764).
* FEATURE: vmagent: add `-promscrape.maxResponseHeadersSize` command-line flag for tuning the maximum HTTP response headers size for Prometheus scrape targets.
* FEATURE: vmagent: send data to multiple configured remote storage systems in parallel (e.g. when multiple `-remoteWrite.url` flag values are specified). This should improve data ingestion speed.
* FEATURE: vmagent: add `-remoteWrite.maxRowsPerBlock` command-line flag for tuning the number of samples to send to remote storage per each block. Bigger values may improve data ingestion performance at the cost of higher memory usage.
* FEATURE: vmagent: distribute Kafka messages among all the partitions when [writing data to Kafka](https://docs.victoriametrics.com/vmagent.html#writing-metrics-to-kafka).
* FEATURE: add [label_graphite_group](https://docs.victoriametrics.com/MetricsQL.html#label_graphite_group) function for extracting the given groups from Graphite metric names.
* FEATURE: add [duration_over_time](https://docs.victoriametrics.com/MetricsQL.html#duration_over_time) function for calculating the actual lifetime of the time series with possible gaps. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1780).
* FEATURE: add [limit_offset](https://docs.victoriametrics.com/MetricsQL.html#limit_offset) function, which can be used for implementing simple paging over big number of time series. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1778).

* BUGFIX: vmagent: reduce the increased memory usage when scraping targets with big number of metrics which periodically change. The memory usage has been increased in v1.68.0 after vmagent started generating staleness markers in [stream parse mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1745).
* BUGFIX: vmagent: properly display `proxy_url` config option at `http://vmagent:8429/config` page. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1755).
* BUGFIX: fix tests for Apple M1. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1653).

## [v1.68.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.68.0)

Released at 2021-10-22

* FEATURE: vmagent: expose `-promscrape.config` contents at `/config` page as Prometheus does. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1695).
* FEATURE: vmagent: add `show original labels` button per each scrape target displayed at `http://vmagent:8429/targets` page. This should improve debuggability for service discovery and relabeling issues similar to [this one](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1664). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1698).
* FEATURE: vmagent: shard targets among cluster nodes after the relabeling is applied. This should guarantee that targets with the same set of labels go to the same `vmagent` node in the cluster. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1687).
* FEATURE: vmagent: atomatically switch to [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode) if the response from the given target exceeds the command-line flag value `-promscrape.minResponseSizeForStreamParse`. This should reduce memory usage when `vmagent` scrapes targets with non-uniform response sizes (this is the case in Kubernetes monitoring).
* FEATURE: vmagent: send Prometheus-like staleness marks in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). Previously staleness marks wern't sent in stream parsing mode. See [these docs](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) for details.
* FEATURE: vmagent: properly calculate `scrape_series_added` metric for targets in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). Previously it was set to 0 in stream parsing mode. See [more details about this metric](https://prometheus.io/docs/concepts/jobs_instances/#automatically-generated-labels-and-time-series).
* FEATURE: vmagent: expose `promscrape_series_limit_max_series` and `promscrape_series_limit_current_series` metrics at `http://vmagent:8429/metrics` for scrape targets with the [enabled series limiter](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter).
* FEATURE: vmagent: return error if `sample_limit` or `series_limit` options are set when [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode) is enabled, since these limits cannot be applied in stream parsing mode.
* FEATURE: vmalert: add `-remoteRead.disablePathAppend` command-line flag, which allows specifying the full `-remoteRead.url`. If `-remoteRead.disablePathAppend` is set, then `vmalert` doesn't add `/api/v1/query` suffix to `-remoteRead.url`.
* FEATURE: add trigonometric functions, which are going to be added in [Prometheus 2.31](https://github.com/prometheus/prometheus/pull/9239): [acosh](https://docs.victoriametrics.com/MetricsQL.html#acosh), [asinh](https://docs.victoriametrics.com/MetricsQL.html#asinh), [atan](https://docs.victoriametrics.com/MetricsQL.html#atan), [atanh](https://docs.victoriametrics.com/MetricsQL.html#atanh), [cosh](https://docs.victoriametrics.com/MetricsQL.html#cosh), [deg](https://docs.victoriametrics.com/MetricsQL.html#deg), [rad](https://docs.victoriametrics.com/MetricsQL.html#rad), [sinh](https://docs.victoriametrics.com/MetricsQL.html#sinh), [tan](https://docs.victoriametrics.com/MetricsQL.html#tan), [tanh](https://docs.victoriametrics.com/MetricsQL.html#tanh). Also add `atan2` binary operator. See [this pull request](https://github.com/prometheus/prometheus/pull/9248).
* FEATURE: consistently return the same set of time series from [limitk](https://docs.victoriametrics.com/MetricsQL.html#limitk) function. This improves the usability of periodically refreshed graphs.
* FEATURE: [vmui](https://docs.victoriametrics.com/#vmui): varios UX improvements. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1711) and [these docs](https://docs.victoriametrics.com/#vmui).
* FEATURE: [vmauth](https://docs.victoriametrics.com/vmauth.html): add ability to specify HTTP headers, which will be sent in requests to backends. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1736).
* FEATURE: add `/flags` page to all the VictoriaMetrics components. This page contains command-line flags passed to the component.
* FEATURE: allow using tab separators additionally to whitespace separators when [ingesting data in Graphite plaintext protocol](https://docs.victoriametrics.com/#how-to-send-data-from-graphite-compatible-agents-such-as-statsd). Such separators are [supported by Carbon-c-relay](https://github.com/grobian/carbon-c-relay/commit/f3ffe6cc2b52b07d14acbda649ad3fd6babdd528).

* BUGFIX: vmstorage: fix `unaligned 64-bit atomic operation` panic on 32-bit architectures (arm and 386). The panic has been introduced in v1.67.0.
* BUGFIX: vmalert, vmauth: prevent from frequent closing of TCP connections established to backends under high load. This should reduce the number of TCP sockets in `TIME_WAIT` state at `vmalert` and `vmauth` under high load. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1704).
* BUGFIX: vmalert: correctly calculate alert ID including extra labels. Previously, ID for alert entity was generated without alertname or groupname. This led to collision, when multiple alerting rules within the same group producing same labelsets. E.g. expr: `sum(metric1) by (job) > 0` and expr: `sum(metric2) by (job) > 0` could result into same labelset `job: "job"`. The bugfix adds all extra labels right after receiving response from the datasource. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1734).
* BUGFIX: vmalert: fix links in [Web UI](https://docs.victoriametrics.com/vmalert.html#web). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1717).
* BUGFIX: vmagent: set `honor_timestamps: true` by default in [scrape configs](https://docs.victoriametrics.com/sd_configs.html#scrape_configs) if this options isn't set explicitly. This aligns the behaviour with Prometheus.
* BUGFIX: vmagent: group scrape targets by the original job names at `http://vmagent:8429/targets` page like Prometheus does. Previously they were grouped by the job name after relabeling, which may result in unexpected empty target groups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1707).
* BUGFIX: [vmctl](https://docs.victoriametrics.com/vmctl.html): fix importing boolean fields from InfluxDB line protocol. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1709).

## [v1.67.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.67.0)

Released at 2021-10-08

* FEATURE: add ability to accept metrics from [DataDog agent](https://docs.datadoghq.com/agent/) and [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/). See [these docs](https://docs.victoriametrics.com/Single-server-VictoriaMetrics.html#how-to-send-data-from-datadog-agent). This option simplifies the migration path from DataDog to VictoriaMetrics. See also [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/206).
* FEATURE: vmagent [enterprise](https://docs.victoriametrics.com/enterprise.html): add support for data reading and writing from/to [Apache Kafka](https://kafka.apache.org/). See [these docs](https://docs.victoriametrics.com/vmagent.html#kafka-integration).
* FEATURE: vmui: switch to [μPlot](https://github.com/leeoniya/uPlot) and add ability to naturally scroll and zoom graphs. See [these docs](https://docs.victoriametrics.com/#vmui). Thanks to @Loori-R.
* FEATURE: vmstorage: stop accepting new data if `-storageDataPath` directory contains less than `-storage.minFreeDiskSpaceBytes` of free space. This should prevent from `out of disk space` crashes. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/269).
* FEATURE: calculate quantiles in the same way as Prometheus does in such functions as [quantile_over_time](https://docs.victoriametrics.com/MetricsQL.html#quantile_over_time) and [quantile](https://docs.victoriametrics.com/MetricsQL.html#quantile). Previously results from VictoriaMetrics could be slightly different than results from Prometheus. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1625) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1612) issues.
* FEATURE: add `rollup_scrape_interval(m[d])` function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html), which returns `min`, `max` and `avg` values for the interval between samples for `m` on the given lookbehind window `d`.
* FEATURE: add `topk_last(k, q)` and `bottomk_last(k, q)` functions to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html), which return up to `k` time series from `q` with the maximum / minimum last value on the graph.

* BUGFIX: align behavior of the queries `a or on (labels) b`, `a and on (labels) b` and `a unless on (labels) b` where `b` has multiple time series with the given `labels` to Prometheus behavior. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1643).
* BUGFIX: vmagent: fix `openstack_sd_config` service discovery when both `domain_name` and `project_id` config options are set. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1655).
* BUGFIX: return proper values (zeroes) from [stddev_over_time](https://docs.victoriametrics.com/MetricsQL.html#stddev_over_time) and [stdvar_over_time](https://docs.victoriametrics.com/MetricsQL.html#stdvar_over_time) functions when the lookbehind window in square brackets contains only a single sample. Previously the sample value was incorrectly returned in this case.
* BUGFIX: vminsert: fix uneven distribution of time series among storage nodes in [multi-level cluster setup](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1672).

## [v1.66.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.66.2)

Released at 2021-09-23

* FEATURE: vmagent: add `vm_promscrape_max_scrape_size_exceeded_errors_total` metric for counting of the failed scrapes due to the exceeded response size (the response size limit can be configured via `-promscrape.maxScrapeSize` command-line flag). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1639).

* BUGFIX: vmalert: properly reload rule groups if only the `interval` config option is changed. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1641).
* BUGFIX: properly handle `{__name__=~"prefix(suffix1|suffix2)",other_label="..."}` queries. They may return unexpected empty responses since v1.66.0. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1644).

## [v1.66.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.66.1)

Released at 2021-09-22

* FEATURE: add `-cluster` and/or `-enterprise` suffixes to `short_version` label at `vm_app_version` metric exposed at `/metrics` page of every VictoriaMetrics component. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1635).

* BUGFIX: vmselect: fix accessing [Graphite APIs](https://docs.victoriametrics.com/#graphite-api-usage). The access has been broken in v1.66.0, because `/graphite/*` path prefix accidentally clashed with `/graph*` path prefix used for VictoriaMetrics UI (aka `vmui`).
* BUGFIX: fix parsing `regex: <bool_or_number>` in relabeling rules (for example, `regex: true` or `regex: 123`). The bug has been introduced in v1.66.0.

## [v1.66.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.66.0)

Released at 2021-09-20

* FEATURE: vmalert: add web UI with the list of alerting groups, alerts and alert statuses. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1602).
* FEATURE: vmalert: add `-rule.maxResolveDuration` command-line flag, which could be used for limiting the auto-resolve duration for the alerting rule. By default it is limited to 3x evaluation interval. This could be too high for big evaluation intervals. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1586).
* FEATURE: vmalert: add support for Bearer token authorization for `-datasource.url`, `-remoteRead.url` and `-remoteWrite.url`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1608).
* FEATURE: vmagent: send stale markers for disappeared metrics like Prometheus does. Previously stale markers were sent only when the scrape target disappears or when it becomes temporarily unavailable. See [these docs](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) for details.
* FEATURE: vmagent: add ability to set `series_limit` option for a particular scrape target via `__series_limit__` label. This allows setting the limit on the number of time series on a per-target basis. See [these docs](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter) for details.
* FEATURE: vmagent: add ability to set `stream_parse` option for a particular scrape target via `__stream_parse__` label. This allows managing the stream parsing mode on a per-target basis. See [these docs](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode) for details.
* FEATURE: vmagent: add ability to set `scrape_interval` and `scrape_timeout` options for a particular target via `__scrape_interval__` and `__scrape_timeout__` labels in the same way as Prometheus 2.30 does. See [this pull request](https://github.com/prometheus/prometheus/pull/8911).
* FEATURE: vmagent: generate `scrape_timeout_seconds` metric per each scrape target, so the target saturation could be calculated with `scrape_duration_seconds / scrape_timeout_seconds`. See the corresponding [pull request from Prometheus 2.30](https://github.com/prometheus/prometheus/pull/9247).
* FEATURE: vmagent: reduce CPU usage when calculating the number of newly added series per scrape (this number is sent to remote storage in `scrape_series_added` metric).
* FEATURE: vmagent: reduce CPU usage when applying `series_limit` to scrape targets with constant set of metrics. See more information about `series_limit` [here](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter).
* FEATURE: vminsert: disable rerouting by default when a few of `vmstorage` nodes start accepting data at lower speed than the rest of `vmstorage` nodes. This should improve VictoriaMetrics cluster stability during rolling restarts and during spikes in [time series churn rate](https://docs.victoriametrics.com/FAQ.html#what-is-high-churn-rate). The rerouting can be enabled by passing `-disableRerouting=false` command-line flag to `vminsert`.
* FEATURE: vmauth: do not put invalid auth tokens into log by default due to security reasons. The logging can be returned back by passing `-logInvalidAuthTokens` command-line flag to `vmauth`. Requests with invalid auth tokens are counted at `vmagent_http_request_errors_total{reason="invalid_auth_token"}` metric exposed by `vmauth` at `/metrics` page.
* FEATURE: add new relabeling actions: `keep_metrics` and `drop_metrics`. This simplifies metrics filtering by metric names. See [these docs](https://docs.victoriametrics.com/vmagent.html#relabeling) for more details.
* FEATURE: allow splitting long `regex` in relabeling filters into an array of shorter regexps, which can be put into multiple lines for better readability and maintainability. See [these docs](https://docs.victoriametrics.com/vmagent.html#relabeling) for more details.
* FEATURE: optimize performance for queries with regexp filters on metric name like `{__name__=~"metric1|...|metricN"}`. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1610) from @faceair.
* FEATURE: vmui: use Prometheus-compatible query args, so `vmui` could be accessed from graph editor in Grafana. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1619). Thanks to @Loori-R.
* FEATURE: vmselect: automatically add missing port to `-storageNode` hostnames. For example, `-storageNode=vmstorage1,vmstorage2` is automatically translated to `-storageNode=vmstorage1:8401,vmstorage2:8401`. This simplifies [manual setup of VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#cluster-setup).
* FEATURE: vminsert: automatically add missing port to `-storageNode` hostnames. For example, `-storageNode=vmstorage1,vmstorage2` is automatically translated to `-storageNode=vmstorage1:8400,vmstorage2:8400`. This simplifies [manual setup of VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#cluster-setup).
* FEATURE: add [mad(q)](https://docs.victoriametrics.com/MetricsQL.html#mad) function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). It calculates [Median absolute deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) for groups of points with identical timestamps across multiple time series.
* FEATURE: add [outliers_mad(tolerance, q)](https://docs.victoriametrics.com/MetricsQL.html#outliers_mad) function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). It returns time series with peaks outside the [Median absolute deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) multiplied by `tolerance`.
* FEATURE: add `histogram_quantiles("phiLabel", phi1, ..., phiN, buckets)` function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). It calculates the given `phi*`-quantiles over the given `buckets` and returns time series per each quantile with the corresponding `{phiLabel="phi*"}` label.
* FEATURE: add `quantiles_over_time("phiLabel", phi1, ..., phiN, series_selector[d])` function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). It calculates the given `phi*`-quantiles over raw samples selected by `series_selector` on the given lookbehind window `d`. It returns time series per each quantile with the corresponding `{phiLabel="phi*"}` label.
* FEATURE: [enterprise](https://docs.victoriametrics.com/enterprise.html): do not ask for `-eula` flag if `-version` flag is passed to enteprise app. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1621).

* BUGFIX: properly handle queries with multiple filters matching empty labels such as `metric{label1=~"foo|",label2="bar|"}`. This filter must match the following series: `metric`, `metric{label1="foo"}`, `metric{label2="bar"}` and `metric{label1="foo",label2="bar"}`. Previously it was matching only `metric{label1="foo",label2="bar"}`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1601).
* BUGFIX: vmselect: reset connection timeouts after each request to `vmstorage`. This should prevent from `cannot read data in 0.000 seconds: unexpected EOF` warning in logs. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1562). Thanks to @mxlxm .
* BUGFIX: keep metric name for time series returned from [rollup_candlestick](https://docs.victoriametrics.com/MetricsQL.html#rollup_candlestick) function, since the returned series don't change the meaning of the original series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1600).
* BUGFIX: use Prometheus-compatible label value formatting for [count_values](https://docs.victoriametrics.com/MetricsQL.html#count_values) function. Previously big values could be improperly formatted, which could break query results, which rely on label value such as `... on(label) count_values("label", ...)`.
* BUGFIX: vmagent: properly use `https` scheme for wildcard TLS certificates for `role: ingress` targets in Kubernetes service discovery. See [this issue](https://github.com/prometheus/prometheus/issues/8902).
* BUGFIX: vmagent: support host networking mode for `docker_sd_config`. See [this issue](https://github.com/prometheus/prometheus/issues/9116).
* BUGFIX: fix non-repeatable results from `quantile_over_time()` function when the number of input samples exceeds 1000. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1612).
* BUGFIX: vmagent: fix EC2 zone discovery when `filters` are specified in [ec2_sc_config](https://docs.victoriametrics.com/sd_configs.html#ec2_sd_configs). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1626).

## [v1.65.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.65.0)

Released at 2021-09-01

* FEATURE: vmagent: add ability to read scrape configs from multiple files specified in `scrape_config_files` section. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1559).
* FEATURE: vmagent: reduce memory usage and CPU usage when [Prometheus staleness tracking](https://docs.victoriametrics.com/vmagent.html#prometheus-staleness-markers) is enabled for metrics exported from the deleted or disappeared scrape targets.
* FEATURE: vmagent: add the ability to limit the number of unique time series scraped per each target. This can be done either globally via `-promscrape.seriesLimitPerTarget` command-line option or on per-target basis via `series_limit` option at `scrape_config` section. See [the updated docs on cardinality limiter](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1561).
* FEATURE: vmagent: discover `role: ingress` and `role: endpointslice` in [kubernetes_sd_config](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) via v1 API instead of v1beta1 API if Kubernetes supports it. This fixes service discovery in Kubernetes v1.22 and newer versions. See [these docs](https://kubernetes.io/docs/reference/using-api/deprecation-guide/#ingress-v122).
* FEATURE: take into account failed queries in `vm_request_duration_seconds` summary at `/metrics`. Previously only successful queries were taken into account. This could result in skewed summary. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1537).
* FEATURE: vmalert: add an official dashboard for vmalert. See [these docs](https://docs.victoriametrics.com/vmalert.html#monitoring).
* FEATURE: vmalert: add ability to set additional labels per group via `labels` config section. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1471).
* FEATURE: vmalert: add `-disableAlertgroupLabel` command-line flag for disabling the label with alert group name. This may be needed for proper deduplication in Alertmanager. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1532).
* FEATURE: update Go builder from v1.16.7 to v1.17.0. This improves data ingestion and query performance by up to 5% according to benchmarks. See [the release post for Go1.17](https://go.dev/blog/go1.17).
* FEATURE: vmagent: expose `promscrape_discovery_http_errors_total` metric, which can be used for monitoring the number of failed discovery attempts per each `http_sd` config.
* FEATURE: do not reset response cache when a sample with old timestamp is ingested into VictoriaMetrics if `-search.disableAutoCacheReset` command-line option is set. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1570).
* FEATURE: add `quantiles("phiLabel", phi1, ..., phiN, q)` aggregate function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html), which calculates the given `phi*` quantiles over time series returned by `q`. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1573).

* BUGFIX: rename `sign` function to `sgn` in order to be consistent with PromQL. See [this pull request from Prometheus](https://github.com/prometheus/prometheus/pull/8457).
* BUGFIX: vmagent: add `role: endpointslice` in [kubernetes_sd_config](https://docs.victoriametrics.com/sd_configs.html#kubernetes_sd_configs) in order to be consistent with Prometheus. Previously this role was supported with incorrect name: `role: endpointslices`. Now both `endpointslice` and `endpointslices` are supported. See [the corresponding code in Prometheus](https://github.com/prometheus/prometheus/blob/2ec6c7dbb82b72834021e01f1773eb90a67a371f/discovery/kubernetes/kubernetes.go#L99).
* BUGFIX: improve the detection of the needed free space for background merge operation. This should prevent from possible out of disk space crashes during big merges. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1560).
* BUGFIX: vmauth: remove trailing slash from the full url before requesting it from the backend. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1554).
* BUGFIX: [vmbackupmanager](https://docs.victoriametrics.com/vmbackupmanager.html): fix timeout error when snapshot takes longer than 10 seconds. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1571).
* BUGFIX: properly parse OpenTSDB `put` messages with multiple spaces between message elements. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1574). Thanks to @envzhu for the fix.

## [v1.64.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.64.1)

Released at 2021-08-19

* FEATURE: add `bitmap_and(q, mask)`, `bitmap_or(q, mask)` and `bitmak_xor(q, mask)` functions to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). These functions allow performing bitwise operations over data points in time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1541).
* FEATURE: vmalert: add `-remoteWrite.disablePathAppend` command-line flag, which can be used when custom `-remoteWrite.url` must be specified. For example, `./vmalert -disablePathAppend -remoteWrite.url='http://foo.bar/a/b/c?d=e'` would write data to `http://foo.bar/a/b/c?d=e` instead of `http://foo.bar/a/b/c?d=e/api/v1/write`. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1536).
* FEATURE: vmagent: add `-promscrape.noStaleMarkers` command-line flag for disabling sending Prometheus stale markers for metrics from disappeared scrape targets. This option may be used for reducing memory usage when scraping big number of metrics with big number of labels and when stale markers aren't needed.
* FEATURE: vmselect: add `-search.noStaleMarkers` command-line flag for disabling stale markers handling in queries. This may save some CPU time when the queried data doesn't contain stale markers.

* BUGFIX: vmagent: stop scrapers for deleted targets before starting scrapers for added targets. This should prevent from possible time series overlap when old targets are substituted by new targets (for example, during new deployment in Kubernetes). The overlap could lead to incorrect query results. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1509).
* BUGFIX: vmagent: send Prometheus stale markers for the previously scraped metrics on failed scrapes like Prometheus does. See [this article](https://www.robustperception.io/staleness-and-promql).
* BUGFIX: upgrade base Docker image from Alpine 3.14.0 to Alpine 3.14.1 . This fixes potential security issues - see [Alpine 3.14.1 release notes](https://www.alpinelinux.org/posts/Alpine-3.14.1-released.html).
* BUGFIX: disable overriding the lookbehind window `[d]` at `last_over_time(m[d])` if `d` is smaller than the interval between samples, since users don't expect implicit overriding of explicitly set `[d]` in `last_over_time(m[d])`.

## [v1.64.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.64.0)

Released at 2021-08-15

* FEATURE: add support for Prometheus staleness markers. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1526).
* FEATURE: vmagent: automatically generate Prometheus staleness markers for the scraped metrics when scrape targets disappear in the same way as Prometheus does. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1526).
* FEATURE: add `present_over_time(m[d])` function, which returns 1 if `m` has a least a single sample over the previous duration `d`. This function has been added also to [Prometheus 2.29](https://github.com/prometheus/prometheus/releases/tag/v2.29.0).
* FEATURE: vmagent: support multitenant writes according to [these docs](https://docs.victoriametrics.com/vmagent.html#multitenancy). This allows using a single `vmagent` instance in front of VictoriaMetrics cluster for all the tenants. Thanks to @omarghader for [the pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1505). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1491).
* FEATURE: vmagent: add `__meta_ec2_availability_zone_id` label to discovered Amazon EC2 targets. This label is available in Prometheus [starting from v2.29](https://github.com/prometheus/prometheus/releases/tag/v2.29.0).
* FAETURE: vmagent: add `__meta_gce_interface_ipv4_<name>` labels to discovered GCE targets. These labels are available in Prometheus [starting from v2.29](https://github.com/prometheus/prometheus/releases/tag/v2.29.0).
* FEATURE: add `-search.maxSamplesPerSeries` command-line flag for limiting the number of raw samples a single query can process per each time series. This option can protect from out of memory errors when a query processes tens of millions of raw samples per series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1067).
* FEATURE: add `-search.maxSamplesPerQuery` command-line flag for limiting the number of raw samples a single query can process across all the time series. This option can protect from heavy queries, which select too big number of raw samples. Thanks to @jiangxinlingdu for [the initial pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1478).
* FEATURE: improve performance for queries that process big number of time series and/or samples on systems with big number of CPU cores.
* FEATURE: vmalert: expose `vmalert_alerting_rules_last_evaluation_samples` and `vmalert_recording_rules_last_evaluation_samples` metrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1494).
* FEATURE: vminsert: expose `vm_rpc_send_duration_seconds_total` counter, which can be used for determining high saturation of every `vminsert -> vmstorage` link with an alerting query `rate(vm_rpc_send_duration_seconds_total) > 0.9s`. This query triggers when the link is saturated by more than 90%. This usually means that more `vminsert` or `vmstorage` nodes must be added to the cluster in order to increase the total number of `vminsert -> vmstorage` links.
* FEATURE: vmagent: expose `vmagent_remotewrite_send_duration_seconds_total` counter, which can be used for determining high saturation of every connection to remote storage with an alerting query `rate(vmagent_remotewrite_send_duration_seconds_total) > 0.9s`. This query triggers when a connection is saturated by more than 90%. This usually means that `-remoteWrite.queues` command-line flag must be increased in order to increase the number of connections per each remote storage.
* FEATURE: vmui: automatically fill Server URL field. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1506).

* BUGFIX: fix corner cases for queries on time ranges exceeding 40 days. Previously some series can be missing in query results. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1486).
* BUGFIX: vmselect: return dummy response at `/rules` page in the same way as for `/api/v1/rules` page. The `/rules` page is requested by Grafana 8. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1493) for details.
* BUGFIX: vmbackup: automatically set default `us-east-1` S3 region if it is missing. This should simplify using S3-compatible services such as MinIO for backups. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1449).
* BUGFIX: vmselect: prevent from possible deadlock when multiple `target` query args are passed to [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage).
* BUGFIX: return series with `a op b` labels and `N` values for `(a op b) default N` if `(a op b)` returns series with all NaN values. Previously such series were removed.
* BUGFIX: vmui: fix layout when the query selects more than 27 time series. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1497).
* BUGFIX: vmagent: restore highlighting in red for DOWN targets at `/targets` page. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1461).

## [v1.63.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.63.0)

Released at 2021-07-15

* FEATURE: reduce memory usage by up to 30% on production workloads.
* FEATURE: vmselect: embed [vmui](https://github.com/VictoriaMetrics/vmui) into a single-node VictoriaMetrics and into `vmselect` component of cluster version. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1413). The web interface is available at the following paths:
  * `/vmui/` for a single-node VictoriaMetrics
  * `/select/<accountID>/vmui/` for `vmselect` at cluster version of VictoriaMetrics
* FEATURE: support durations anywhere in [MetricsQL queries](https://docs.victoriametrics.com/MetricsQL.html). For example, `sum_over_time(m[1h]) / 1h` is a valid query, which is equivalent to `sum_over_time(m[1h]) / 3600`.
* FEATURE: support durations without suffixes in [MetricsQL queries](https://docs.victoriametrics.com/MetricsQL.html). For example, `rate(m[3600])` is a valid query, which is equivalent to `rate(m[1h])`.
* FEATURE: export `vmselect_request_duration_seconds` and `vminsert_request_duration_seconds` [VictoriaMetrics histograms](https://valyala.medium.com/improving-histogram-usability-for-prometheus-and-grafana-bc7e5df0e350) at `/metrics` page. These histograms can be used for determining latency distribution and SLI/SLO for the served requests. For example, the following query would return the percent of queries that took less than 500ms during the last hour: `histogram_share(500ms, sum(rate(vmselect_request_duration_seconds_bucket[1h])) by (vmrange))`.
* FEATURE: vmagent: dynamically reload client TLS certificates from disk on every [mTLS connection](https://developers.cloudflare.com/cloudflare-one/identity/devices/mutual-tls-authentication). This should allow using `vmagent` with [Istio service mesh](https://istio.io/latest/about/service-mesh/). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1420).
* FEATURE: log http request path plus all the query args on errors during request processing. Previously only http request path was logged without query args, so it could be hard debugging such errors.
* FEATURE: add `is_set` label to `flag` metrics. This allows determining explicitly set command-line flags with the query `flag{is_set="true"}`.
* FEATURE: add ability to remove caches stored inside `<-storageDataPath>/cache` on startup if `reset_cache_on_startup` file is present there. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1447).

* BUGFIX: vmagent: remove `{ %space %}` typo in `/targets` output. The typo has been introduced in v1.62.0. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1408).
* BUGFIX: vmagent: fix CSS styles on `/targets` page. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1422).
* BUGFIX: vmalert: accept Prometheus-like durations in `interval` config option inside `group` section. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1444).
* BUGFIX: properly update `vm_merge_need_free_disk_space` metric at `/metrics` page when there is no enough free disk space for performing optimal merges. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1373).

## [v1.62.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.62.0)

Released at 2021-06-25

* FEATURE: vmagent: add service discovery for Docker (aka [docker_sd_config](https://docs.victoriametrics.com/sd_configs.html#docker_sd_configs)). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1402).
* FEATURE: vmagent: add service discovery for DigitalOcean (aka [digitalocean_sd_config](https://docs.victoriametrics.com/sd_configs.html#digitalocean_sd_configs)). See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1367).
* FEATURE: vmagent: change the default value for `-remoteWrite.queues` from 4 to `2 * numCPUs`. This should reduce scrape duration for highly loaded vmagent, which scrapes tens of thousands of targets. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1385).
* FEATURE: vmagent: show the number of samples the target returns during the last scrape on `/targets` and `/api/v1/targets` pages. This should simplify debugging targets, which may return too big or too low number of samples. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1377).
* FEATURE: vmagent: show jobs with zero discovered targets on `/targets` page. This should help debugging improperly configured scrape configs.
* FEATURE: vmagent: support for http-based service discovery (aka [http_sd_config](https://docs.victoriametrics.com/sd_configs.html#http_sd_configs)), which has been added since Prometheus 2.28. See [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1392).
* FEATURE: vmagent: support namespace in Consul serive discovery in the same way as Prometheus 2.28 does. See [this issue](https://github.com/prometheus/prometheus/issues/8894) for details.
* FEATURE: vmagent: support generic auth configs in `consul_sd_configs` in the same way as Prometheus 2.28 does. See [this issue](https://github.com/prometheus/prometheus/issues/8924) for details.
* FEATURE: [vmctl](https://docs.victoriametrics.com/vmctl.html): limit the number of samples per each imported JSON line. This should limit the memory usage at VictoriaMetrics side when importing time series with big number of samples.
* FEATURE: vmselect: log slow queries across all the `/api/v1/*` handlers (aka [Prometheus query API](https://prometheus.io/docs/prometheus/latest/querying/api)) if their execution duration exceeds `-search.logSlowQueryDuration`. This should simplify debugging slow requests to such handlers as `/api/v1/labels` or `/api/v1/series` additionally to `/api/v1/query` and `/api/v1/query_range`, which were logged in the previous releases.
* FEATURE: vminsert: sort the `-storageNode` list in order to guarantee the identical `series -> vmstorage` mapping across all the `vminsert` nodes. This should reduce resource usage (RAM, CPU and disk IO) at `vmstorage` nodes if `vmstorage` addresses are passed in random order to `vminsert` nodes.
* FEATURE: vmstorage: reduce memory usage on a system with many CPU cores under high ingestion rate.

* BUGFIX: prevent from adding new samples to deleted time series after the rotation of the inverted index (the rotation is performed once per `-retentionPeriod`). See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1347#issuecomment-861232136) for details.
* BUGFIX: vmstorage: reduce high disk write IO usage on systems with big number of CPU cores. The issue has been introduced in the release [v1.59.0](#v1590). See [this commit](https://github.com/VictoriaMetrics/VictoriaMetrics/commit/aa9b56a046b6ae8083fa659df35dd5e994bf9115) and [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1338#issuecomment-863046999) for details.
* BUGFIX: vmstorage: prevent from incorrect stats collection when multiple concurrent queries execute the same tag filter. This may help reducing CPU usage under certain workloads. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1338).
* BUGFIX: vmselect: return the last timestamp for the max / min value from `tmax_over_time(m[d])` and `tmin_over_time(m[d])` [MetricsQL functions](https://docs.victoriametrics.com/MetricsQL.html) as most users expect. See also [this issue](https://github.com/prometheus/prometheus/issues/8966).
* BUGFIX: vmselect: return the expected value for `increase_pure()` [MetricsQL function](https://docs.victoriametrics.com/MetricsQL.html) after a gap in a time series. Previously incorrect too big value could be returned after the gap from `increase_pure()`.

## [v1.61.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.61.1)

Released at 2021-06-11

* BUGFIX: vmalert: fix recording rules, which were broken in v1.61.0. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1369).
* BUGFIX: reset the on-disk cache for mapping from the full metric name to an internal metric id (e.g. `metric_name{labels} -> internal_metric_id`) after deleting metrics via [delete API](https://docs.victoriametrics.com/#how-to-delete-time-series). This should prevent from possible inconsistent state after unclean shutdown. This [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1347).

## [v1.61.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.61.0)

Released at 2021-06-09

* FEATURE: vmalert: add support for backfilling (aka replay) of recording and alerting rules. See [these docs](https://docs.victoriametrics.com/vmalert.html#rules-backfilling) and [this feature request](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/836).
* FEATURE: vmalert: add a command-line flag `-rule.configCheckInterval` for automatic re-reading of `-rule` files without the need to send SIGHUP signal. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/512).
* FEATURE: vmagent: respect the `sample_limit` and `-promscrape.maxScrapeSize` values when scraping targets in [stream parsing mode](https://docs.victoriametrics.com/vmagent.html#stream-parsing-mode). See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1331).
* FEATURE: vmauth: add ability to specify mutliple `url_prefix` entries for balancing the load among multiple `vmselect` and/or `vminsert` nodes in a cluster. See [these docs](https://docs.victoriametrics.com/vmauth.html#load-balancing).
* FEATURE: vminsert: add `-disableRerouting` command-line flag for forcibly disabling the rerouting. This should help resolving [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/791) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1054) issues.
* FEATURE: vminsert: reduce the probability of global re-routing storm if all the vmstorage nodes cannot keep up with the given ingestion rate for some time. This should improve cluster stability in such cases. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/791) and [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1054) issues.
* FEATURE: allow building VictoriaMetrics components for Solaris / SmartOS. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1322).
* FEATURE: vmagent: add ability to debug relabeling rules. See [these docs](https://docs.victoriametrics.com/vmagent.html#relabeling) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1343).

* BUGFIX: reduce CPU usage by up to 2x during querying a database with big number of active daily time series. The issue has been introduced in `v1.59.0`.
* BUGFIX: vmagent: properly apply auth and tls configs in `eureka_sd_configs`. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1350).
* BUGFIX: vmauth: do not panic on aborted http requests. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1353).
* BUGFIX: properly generate `target` property for `*Series(foo.*.bar)` responses returned from [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage). Previously the `target` contained the expanded list of series for `foo.*.bar`, e.g. `sumSeries(foo.a.bar,foo.b.bar,...foo.z.bar)`. Now VictoriaMetrics returns `sumSeries(foo.*.bar)` as a target in the same way as Graphite does.

## [v1.60.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.60.0)

Released at 2021-05-24

* FEATURE: add ability to limit the number of unique time series, which can be added to storage per hour and per day. This can help dealing with high cardinality and high churn rate issues. See [these docs](https://docs.victoriametrics.com/#cardinality-limiter).
* FEATURE: vmagent: add ability to limit the number of unique time series, which can be sent to remote storage systems per hour and per day. This can help dealing with high cardinality and high churn rate issues. See [these docs](https://docs.victoriametrics.com/vmagent.html#cardinality-limiter).
* FEATURE: vmalert: add ability to run alerting and recording rules for multiple tenants. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/740) and [these docs](https://docs.victoriametrics.com/vmalert.html#multitenancy).
* FEATURE: vminsert: add support for data ingestion via other `vminsert` nodes. This allows building multi-level data ingestion paths in VictoriaMetrics cluster by writing data from one level of `vminsert` nodes to another level of `vminsert` nodes. See [these docs](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#multi-level-cluster-setup) and [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/541#issuecomment-835487858) for details.
* FEATURE: vmagent: reload `bearer_token_file`, `credentials_file` and `password_file` contents every second. This allows dynamically changing the contents of these files during target scraping and service discovery without the need to restart `vmagent`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1297).
* FEATURE: vmalert: add a flag to control behaviour on startup for state restore errors. Such errors were returned and logged before as well. Now user can specify whether to just log these errors (`-remoteRead.ignoreRestoreErrors=true`) or to stop the process (`-remoteRead.ignoreRestoreErrors=false`). The latter is important when VM isn't ready yet to serve queries from vmalert and it needs to wait. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1252).
* FEATURE: vmalert: add ability to pass `round_digits` query arg to datasource via `-datasource.roundDigits` command-line flag. This can be used for limiting the number of decimal digits after the point in recording rule results. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/525).
* FEATURE: return `X-Server-Hostname` header in http responses of all the VictoriaMetrics components. This should simplify tracing the origin server behind a load balancer or behind auth proxy during troubleshooting.
* FEATURE: vmselect: allow to use 2x more memory for query processing at `vmselect` nodes in [VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html). This should allow processing heavy queries without the need to increase RAM size at `vmselect` nodes.
* FEATURE: add ability to filter `/api/v1/status/tsdb` output with arbitrary [time series selectors](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors) passed via `match[]` query args. See [these docs](https://docs.victoriametrics.com/#tsdb-stats) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1168) for details.
* FEATURE: automatically detect memory and cpu limits for VictoriaMetrics components running under [cgroup v2](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html) environments such as [HashiCorp Nomad](https://www.nomadproject.io/). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1269).
* FEATURE: vmauth: allow `-auth.config` reloading via `/-/reload` http endpoint. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1194).
* FEATURE: add `timezone_offset(tz)` function. It returns offset in seconds for the given timezone `tz` relative to UTC. This can be useful when combining with datetime-related functions. For example, `day_of_week(time()+timezone_offset("America/Los_Angeles"))` would return weekdays for `America/Los_Angeles` time zone. Special `Local` time zone can be used for returning an offset for the time zone set on the host where VictoriaMetrics runs. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1306) and [MetricsQL docs](https://docs.victoriametrics.com/MetricsQL.html) for more details.
* FEATURE: vmagent: add support for OAuth2 authorization for scrape targets and service discovery in the same way as Prometheus does. See [these docs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#oauth2).
* FEATURE: vmagent: add support for OAuth2 authorization when writing data to `-remoteWrite.url`. See `-remoteWrite.oauth2.*` config params in `/path/to/vmagent -help` output.
* FEATURE: vmalert: add ability to set `extra_filter_labels` at alerting and recording group configs. See [these docs](https://docs.victoriametrics.com/vmalert.html#groups).
* FEATURE: vmstorage: reduce memory usage by up to 30% when ingesting big number of active time series.

* BUGFIX: vmagent: do not retry scraping targets, which don't support HTTP. This should reduce CPU load and network usage at `vmagent` and at scrape target. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1289).
* BUGFIX: vmagent: fix possible race when refreshing `role: endpoints` and `role: endpointslices` scrape targets in `kubernetes_sd_config`. Prevoiusly `pod` objects could be updated after the related `endpoints` object update. This could lead to missing scrape targets. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1240).
* BUGFIX: vmagent: properly spread scrape targets among `vmagent` replicas if `-promscrape.cluster.replicationFactor` exceeds 1. See [this pull request](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1292).
* BUGFIX: vmagent: limit `scrape_timeout` by `scrape_interval`. This guarantees that only a single sample is lost during the configured `scrape_interval` when scrape target responds slowly. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1281#issuecomment-840538907) for details.
* BUGFIX: properly remove stale parts outside the configured retention if `-retentionPeriod` is smaller than one month. Previously stale parts could remain active for up to a month after they go outside the retention.
* BUGFIX: stop the process on panic errors, since such errors may leave the process in inconsistent state. Previously panics could be recovered, which could result in unexpected hard-to-debug further behavior of running process.
* BUGFIX: vminsert, vmagent: make sure data ingestion connections are closed before completing graceful shutdown. Previously the connection may remain open, which could result in trailing samples loss.
* BUGFIX: vmauth, vmalert: properly re-use HTTP keep-alive connections to backends and datasources. Previously only 2 keep-alive connections per backend could be re-used. Other connections were closed after the first request. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1300) for details.
* BUGFIX: vmalert: fix false positive error `result contains metrics with the same labelset after applying rule labels`, which could be triggered when recording rules generate unique metrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1293).
* BUGFIX: vmctl: properly import InfluxDB rows if they have a field and a tag with identical names. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1299).
* BUGFIX: properly reload configs if `SIGHUP` signal arrives during service initialization. Previously such `SIGHUP` signal could be ingonred and configs weren't reloaded.
* BUGFIX: vmalert: properly import default rules from OpenShift. See [this issue](https://github.com/VictoriaMetrics/operator/issues/243).
* BUGFIX: reduce the probability of `the removal queue is full` panic when highly loaded VictoriaMetrics stores data on NFS. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1313).

## [v1.59.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.59.0)

Released at 2021-05-01

* FEATURE: improved new time series registration speed on systems with many CPU cores. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1244). Thanks to @waldoweng for the idea and [draft implementation](https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1243).
* FEATURE: vmalert: use the same technique as Grafana for determining evaluation timestamps for recording rules. This should make consistent graphs for series generated by recording rules compared to graphs generated for queries from recording rules in Grafana. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1232).
* FEATURE: vmauth: add ability to set madatory query args in `url_prefix`. For example, `url_prefix: http://vm:8428/?extra_label=team=dev` would add `extra_label=team=dev` query arg to all the incoming requests. See [the example](https://docs.victoriametrics.com/vmauth.html#auth-config) for more details.
* FEATURE: vmctl: add OpenTSDB migration option. See more details [here](https://docs.victoriametrics.com/vmctl#migrating-data-from-opentsdb).
Thanks to @johnseekins!
* FEATURE: log metrics with dropped labels if the number of labels in the ingested metric exceeds `-maxLabelsPerTimeseries`. This should simplify debugging for this case.
* FEATURE: vmagent: list user-visible endpoints at `http://vmagent:8429/`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1251).

* BUGFIX: vmagent: properly update `role: endpoints` and `role: endpointslices` scrape targets if the underlying service objects are updated in `kubernetes_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1240).
* BUGFIX: vmagent: apply `scrape_timeout` on receiving the first response byte from `stream_parse: true` scrape targets. Previously it was applied to receiving and *processing* the full response stream. This could result in false timeout errors when scrape target exposes millions of metrics as described [here](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1017#issuecomment-767235047).
* BUGFIX: vmagent: eliminate possible data race when obtaining value for the metric `vm_persistentqueue_bytes_pending`. The data race could result in incorrect value for this metric.
* BUGFIX: vmstorage: remove empty directories on startup. Such directories can be left after unclean shutdown on NFS storage. Previously such directories could lead to crashloop until manually removed. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1142).

## [v1.58.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.58.0)

Released at 2021-04-08

* FEATURE: vminsert and vmagent: add `-sortLabels` command-line flag for sorting metric labels before pushing them to `vmstorage`. This should reduce the size of `MetricName -> internal_series_id` cache (aka `vm_cache_size_bytes{type="storage/tsid"}`) when ingesting samples for the same time series with distinct order of labels. For example, `foo{k1="v1",k2="v2"}` and `foo{k2="v2",k1="v1"}` represent a single time series. Labels sorting is disabled by default, since the majority of established exporters preserve the order of labels for the exported metrics.
* FEATURE: allow specifying label value alongside label name for the `others sum` time series returned from `topk_*` and `bottomk_*` functions from [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html). For example, `topk_avg(3, max(process_resident_memory_bytes) by (instance), "instance=other_sum")` would return top 3 series from `max(process_resident_memory_bytes) by (instance)` plus a series containing the sum of other series. The `others sum` series will have `{instance="other_sum"}` label.
* FEATURE: do not delete `dst_label` when applying `label_copy(q, "src_label", "dst_label")` and `label_move(q, "src_label", "dst_label")` to series without `src_label` and with non-empty `dst_label`. See more details at [MetricsQL docs](https://docs.victoriametrics.com/MetricsQL.html).
* FEATURE: update Go builder from `v1.16.2` to `v1.16.3`. This should fix [these issues](https://github.com/golang/go/issues?q=milestone%3AGo1.16.3+label%3ACherryPickApproved).
* FEATURE: vmagent: add support for `follow_redirects` option to `scrape_configs` section in the same way as [Prometheus 2.26 does](https://github.com/prometheus/prometheus/pull/8546).
* FEATURE: vmagent: add support for `authorization` section in `-promscrape.config` in the same way as [Prometheus 2.26 does](https://github.com/prometheus/prometheus/pull/8512).
* FEATURE: vmagent: add support for socks5 proxy in `proxy_url` config option. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1177).
* FEATURE: vmagent: add support for `socks5 over tls` proxy in `proxy_url` config option. It can be set up with the following config: `proxy_url: "tls+socks5://proxy-addr:port"`.
* FEATURE: vmagent: reduce memory usage when `-remoteWrite.queues` is set to a big value. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1167).
* FEATURE: vmagent: add AWS IAM roles for tasks support for EC2 service discovery according to [these docs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).
* FEATURE: vmagent: add support for `proxy_tls_config`, `proxy_authorization`, `proxy_basic_auth`, `proxy_bearer_token` and `proxy_bearer_token_file` options in `consul_sd_config`, `dockerswarm_sd_config` and `eureka_sd_config` sections.
* FEATURE: vmagent: pass `X-Prometheus-Scrape-Timeout-Seconds` header to scrape targets as Prometheus does. In this case scrape targets can limit the time needed for performing the scrape. See [this comment](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1179#issuecomment-813118733) for details.
* FEATURE: vmagent: drop corrupted persistent queue files at `-remoteWrite.tmpDataPath` instead of throwing a fatal error. Corrupted files can appear after unclean shutdown of `vmagent` such as OOM kill or hardware reset. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1030).
* FEATURE: vmauth: add support for authorization via [bearer token](https://swagger.io/docs/specification/authentication/bearer-authentication/). See [the docs](https://docs.victoriametrics.com/vmauth.html#auth-config) for details.
* FEATURE: publish `arm64` and `amd64` binaries for cluster version of VictoriaMetrics at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases).

* BUGFIX: properly handle `/api/v1/labels` and `/api/v1/label/<label_name>/values` queries on big `start ... end` time range. This should fix big resource usage when VictoriaMetrics is queried with [Promxy](https://github.com/jacksontj/promxy) v0.0.62 or newer versions.
* BUGFIX: do not break sort order for series returned from `topk*`, `bottomk*` and `outliersk` [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html) functions. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1189).
* BUGFIX: vmagent: properly work with simple HTTP proxies which don't support `CONNECT` method. For example, [PushProx](https://github.com/prometheus-community/PushProx). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1179).
* BUGFIX: vmagent: properly discover targets if multiple namespace selectors are put inside `kubernetes_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1170).
* BUGFIX: vmagent: properly discover `role: endpoints` and `role: endpointslices` targets in `kubernetes_sd_config`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1182).
* BUGFIX: properly generate filename for `*.tar.gz` archive inside `_checksums.txt` file posted at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1171).

## [v1.57.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.57.1)

Released at 2021-03-30

* FEATURE: publish vmutils for `GOOS=arm` on [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases).

* BUGFIX: prevent from possible incomplete query results after timed out query.
* BUGFIX: vmselect: remove `-search.storageTimeout` command-line flag, since it has the same meaning as `-search.maxQueryDuration`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/711#issuecomment-808884995).
* BUGFIX: vminsert: return back `type` label to per-tenant metric `vm_tenant_inserted_rows_total`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/932).

## [v1.57.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.57.0)

Released at 2021-03-29

* FEATURE: optimize query performance by up to 10x on systems with many CPU cores. See [this tweet](https://twitter.com/MetricsVictoria/status/1375064484860067840).
* FEATURE: add the following metrics at `/metrics` page for every VictoraMetrics app:
  * `process_resident_memory_anon_bytes` - RSS share for memory allocated by the process itself.  This share cannot be freed by the OS, so it must be taken into account by OOM killer.
  * `process_resident_memory_file_bytes` - RSS share for page cache memory (aka memory-mapped files). This share can be freed by the OS at any time, so it must be ignored by OOM killer.
  * `process_resident_memory_shared_bytes` - RSS share for memory shared with other processes (aka shared memory). This share can be freed by the OS at any time, so it must be ignored by OOM killer.
  * `process_resident_memory_peak_bytes` - peak RSS usage for the process.
  * `process_virtual_memory_peak_bytes` - peak virtual memory usage for the process.
* FEATURE: accept and enforce `extra_label=<label_name>=<label_value>` query arg at [Graphite APIs](https://docs.victoriametrics.com/#graphite-api-usage).
* FEATURE: use InfluxDB field as metric name if measurement is empty and `-influxSkipSingleField` command-line is set. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1139).
* FEATURE: vmagent: add `-promscrape.consul.waitTime` command-line flag for tuning the maximum wait time for Consul service discovery. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1144).
* FEATURE: vmagent: add `vm_promscrape_discovery_kubernetes_stale_resource_versions_total` metric for monitoring the frequency of `too old resource version` errors during Kubernetes service discovery.
* FEATURE: single-node VictoriaMetrics: log metrics with timestamps older than `-search.cacheTimestampOffset` compared to the current time. See [these docs](https://docs.victoriametrics.com/#backfilling) for details.

* BUGFIX: prevent from infinite loop on `{__graphite__="..."}` filters when a metric name contains `*`, `{` or `[` chars.
* BUGFIX: prevent from infinite loop in `/metrics/find` and `/metrics/expand` [Graphite Metrics API handlers](https://docs.victoriametrics.com/#graphite-metrics-api-usage) when they match metric names or labels with `*`, `{` or `[` chars.
* BUGFIX: do not merge duplicate time series during requests to `/api/v1/query`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1141>
* BUGFIX: vmagent: properly handle `too old resource version` error messages from Kubernetes watch API. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1150>
* BUGFIX: vmagent: do not retry sending data blocks if remote storage returns `400 Bad Request` error. The number of dropped blocks due to such errors can be monitored with `vmagent_remotewrite_packets_dropped_total` metrics. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1149>
* BUGFIX: properly calculate `summarize` and `*Series` functions in [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage).

## [v1.56.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.56.0)

Released at 2021-03-17

* FEATURE: add the following functions to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html):
  * `histogram_avg(buckets)` - returns the average value for the given buckets.
  * `histogram_stdvar(buckets)` - returns standard variance for the given buckets.
  * `histogram_stddev(buckets)` - returns standard deviation for the given buckets.
* FEATURE: export `vm_available_memory_bytes` and `vm_available_cpu_cores` metrics, which show the number of available RAM and available CPU cores for VictoriaMetrics apps.
* FEATURE: export `vm_index_search_duration_seconds` histogram, which can be used for troubleshooting time series search performance.
* FEATURE: vmagent: add ability to replicate scrape targets among `vmagent` instances in the cluster with `-promscrape.cluster.replicationFactor` command-line flag. See [these docs](https://docs.victoriametrics.com/vmagent.html#scraping-big-number-of-targets).
* FEATURE: vmagent: accept `scrape_offset` option at `scrape_config`. This option may be useful when scrapes must start at the specified offset of every scrape interval. See [these docs](https://docs.victoriametrics.com/vmagent.html#troubleshooting) for details.
* FEATURE: vmagent: support `proxy_tls_config`, `proxy_basic_auth`, `proxy_bearer_token` and `proxy_bearer_token_file` options at `scrape_config` section for configuring proxies specified via `proxy_url`. See [these docs](https://docs.victoriametrics.com/vmagent.html#scraping-targets-via-a-proxy).
* FEATURE: vmauth: allow using regexp paths in `url_map`. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1112) for details.
* FEATURE: accept `round_digits` query arg at `/api/v1/query` and `/api/v1/query_range` handlers. This option can be set at Prometheus datasource in Grafana for limiting the number of digits after the decimal point in response values.
* FEATURE: add `-influx.databaseNames` command-line flag, which can be used for accepting data from some Telegraf plugins such as [fluentd plugin](https://github.com/fangli/fluent-plugin-influxdb). See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1124).
* FEATURE: add `-logNewSeries` command-line flag, which can be used for debugging the source of time series churn rate.
* FEATURE: publish Windows builds for [vmagent](https://docs.victoriametrics.com/vmagent.html), [vmalert](https://docs.victoriametrics.com/vmalert.html), [vmauth](https://docs.victoriametrics.com/vmauth.html) and [vmctl](https://docs.victoriametrics.com/vmctl.html) at `vmutils-windows-*.zip` archives at [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases).
* FEATURE: listen for IPv6 UDP if `-enableTCP6` command-line flag is passed to VictoriaMetrics. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1131).

* BUGFIX: vmagent: prevent from high CPU usage bug during failing scrapes with small `scrape_timeout` (less than a few seconds).
* BUGFIX: vmagent: reduce memory usage when Kubernetes service discovery is used in big number of distinct scrape config jobs by sharing Kubernetes object cache. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1113>
* BUGFIX: vmagent: apply `sample_limit` only after `metric_relabel_configs` are applied as Prometheus does. Previously the `sample_limit` was applied before metrics relabeling.
* BUGFIX: vmagent: properly apply `tls_config`, `basic_auth` and `bearer_token` to proxy connections if `proxy_url` option is set. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1116>
* BUGFIX: vmagent: properly scrape targets via https proxy specified in `proxy_url` if `insecure_skip_verify` flag isn't set in `tls_config` section. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1116>
* BUGFUX: avoid `duplicate time series` error if `prometheus_buckets()` covers a time range with distinct set of buckets.
* BUGFIX: prevent exponent overflow when processing extremely small values close to zero such as `2.964393875E-314`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1114>
* BUGFIX: do not include datapoints with a timestamp `t-d` when returning results from `/api/v1/query?query=m[d]&time=t` as Prometheus does.
* BUGFIX: do not crash if a query contains `histogram_over_time()` function name with uppercase chars. For example, `Histogram_Over_Time(m[5m])`.

## [v1.55.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.55.1)

Released at 2021-03-03

* BUGFIX: vmagent: fix a panic in Kubernetes service discovery when a target is filtered out with relabeling. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1107>
* BUGFIX: vmagent: fix Kubernetes service discovery for `role: ingress`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1110>

## [v1.55.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.55.0)

Released at 2021-03-02

* FEATURE: add `sign(q)` and `clamp(q, min, max)` functions, which are planned to be added in [the upcoming Prometheus release](https://twitter.com/roidelapluie/status/1363428376162295811) . The `last_over_time(m[d])` function is already supported in [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html).
* FEATURE: vmagent: add `scrape_align_interval` config option, which can be used for aligning scrapes to the beginning of the configured interval. See [these docs](https://docs.victoriametrics.com/vmagent.html#troubleshooting) for details.
* FEATURE: expose io-related metrics at `/metrics` page for every VictoriaMetrics component:
  * `process_io_read_bytes_total` - the number of bytes read via io syscalls such as read and pread
  * `process_io_written_bytes_total` - the number of bytes written via io syscalls such as write and pwrite
  * `process_io_read_syscalls_total` - the number of read syscalls such as read and pread
  * `process_io_write_syscalls_total` - the number of write syscalls such as write and pwrite
  * `process_io_storage_read_bytes_total` - the number of bytes read from storage layer
  * `process_io_storage_written_bytes_total` - the number of bytes written to storage layer
* FEATURE: vmagent: add ability to spread scrape targets among multiple `vmagent` instances. See [these docs](https://docs.victoriametrics.com/vmagent.html#scraping-big-number-of-targets) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1084) for details.
* FEATURE: vmagent: use watch API for Kubernetes service discovery. This should reduce load on Kubernetes API server when it tracks big number of objects (for example, 10K pods). This should also reduce the time needed for k8s targets discovery. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1057) for details.
* FEATURE: vmagent: export `vm_promscrape_target_relabel_duration_seconds` metric, which can be used for monitoring the time spend on relabeling for discovered targets.
* FEATURE: vmagent: optimize [relabeling](https://docs.victoriametrics.com/vmagent.html#relabeling) performance for common cases.
* FEATURE: add `increase_pure(m[d])` function to MetricsQL. It works the same as `increase(m[d])` except of various edge cases. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/962) for details.
* FEATURE: increase accuracy for `buckets_limit(limit, buckets)` results for small `limit` values. See [MetricsQL docs](https://docs.victoriametrics.com/MetricsQL.html) for details.
* FEATURE: vmagent: initial support for Windows build with `CGO_ENABLED=0 GOOS=windows go build ./app/vmagent`. See [this](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/70) and [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1036).
* FEATURE: vmagent: support WebIdentityToken auth in EC2 service discovery. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1080) for details.
* FEATURE: vmalert: properly process query params in `-datasource.url` and `-remoteRead.url` command-line flags. See [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1087) for details.

* BUGFIX: vmagent: properly apply `-remoteWrite.rateLimit` when `-remoteWrite.queues` is greater than 1. Previously there was a data race, which could prevent from proper rate limiting.
* BUGFIX: vmagent: properly perform graceful shutdown on `SIGINT` and `SIGTERM` signals. The graceful shutdown has been broken in `v1.54.0`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1065>
* BUGFIX: reduce the probability of `duplicate time series` errors when querying Kubernetes metrics.
* BUGFIX: properly calculate `histogram_quantile()` over time series with only a single non-zero bucket with `{le="+Inf"}`. Previously `NaN` was returned, now the value for the last bucket before `{le="+Inf"}` is returned like Prometheus does.
* BUGFIX: vmselect: do not cache partial query results on timeout when receiving data from `vmstorage` nodes. See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1085>
* BUGFIX: properly handle `stale NFS file handle` error.
* BUGFIX: properly cache query results when `extra_label` query arg is used. Previously the cached results could clash for different `extra_label` values. See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1095>
* BUGFIX: fix `http: superfluous response.WriteHeader call` issue. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1078>
* BUGFIX: fix arm64 builds due to the issue in `github.com/golang/snappy`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1074>
* BUGFIX: fix `index out of range [1024819115206086200] with length 27` panic, which could occur when `1e-9` value is passed to VictoriaMetrics histogram. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1096>
* BUGFIX: fix parsing for Graphite line with empty tags such as `foo; 123 456`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1100>
* BUGFIX: unescape only `\\`, `\n` and `\"` in label names when parsing Prometheus text exposition format as Prometheus does. Previously other escape sequences could be improperly unescaped.

## [v1.54.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.54.1)

Released at 2021-08-18

* BUGFIX: properly handle queries containing a filter on metric name plus any number of negative filters and zero non-negative filters. For example, `node_cpu_seconds_total{mode!="idle"}`. The bug was introduced in [v1.54.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.54.0).

## [v1.54.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.54.0)

Released at 2021-02-18

* FEATURE: optimize searching for matching metrics for `metric{<label_filters>}` queries if `<label_filters>` contains at least a single filter. For example, the query `up{job="foobar"}` should find the matching time series much faster than previously.
* FEATURE: reduce execution times for `q1 <binary_op> q2` queries by executing `q1` and `q2` in parallel.
* FEATURE: switch from Go1.15 to [Go1.16](https://golang.org/doc/go1.16) for building prod binaries.
* FEATURE: single-node VictoriaMetrics now accepts requests to handlers with `/prometheus` and `/graphite` prefixes such as `/prometheus/api/v1/query`. This improves compatibility with [handlers from VictoriaMetrics cluster](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#url-format).
* FEATURE: expose `process_open_fds` and `process_max_fds` metrics. These metrics can be used for alerting when `process_open_fds` reaches `process_max_fds`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/402> and <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1037>
* FEATURE: vmalert: add `-datasource.appendTypePrefix` command-line option for querying both Prometheus and Graphite datasource in cluster version of VictoriaMetrics. See [these docs](https://docs.victoriametrics.com/vmalert.html#graphite) for details.
* FEATURE: vmauth: add ability to route requests from a single user to multiple destinations depending on the requested paths. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1064>
* FEATURE: remove dependency on external programs such as `cat`, `grep` and `cut` when detecting cpu and memory limits inside Docker or LXC container.
* FEATURE: vmagent: add `__meta_kubernetes_endpoints_label_*`, `__meta_kubernetes_endpoints_labelpresent_*`, `__meta_kubernetes_endpoints_annotation_*` and `__meta_kubernetes_endpoints_annotationpresent_*` labels for `role: endpoints` in Kubernetes service discovery. These labels where added in Prometheus 2.25.
* FEATURE: reduce the minimum supported retention period for inverted index (aka `indexdb`) from one month to one day. This should reduce disk space usage for `<-storageDataPath>/indexdb` folder if `-retentionPeriod` is set to values smaller than one month.
* FEATURE: vmselect: export per-tenant metrics `vm_vmselect_http_requests_total` and `vm_vmselect_http_requests_duration_ms_total` . Other per-tenant metrics are available as a part of [enterprise package](https://docs.victoriametrics.com/enterprise.html). See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/932> for details.

* BUGFIX: properly convert regexp tag filters containing escaped dots to non-regexp tag filters. For example, `{foo=~"bar\.baz"}` should be converted to `{foo="bar.baz"}`. Previously it was incorrectly converted to `{foo="bar\.baz"}`, which could result in missing time series for this tag filter.
* BUGFIX: do not spam error logs when discovering Docker Swarm targets without dedicated IP. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1028> .
* BUGFIX: properly embed timezone data into VictoriaMetrics apps. This should fix `-loggerTimezone` usage inside Docker containers.
* BUGFIX: properly build Docker images for non-amd64 architectures (arm, arm64, ppc64le, 386) on [Docker hub](https://hub.docker.com/u/victoriametrics/). Previously these images were incorrectly based on amd64 base image, so they didn't work.
* BUGFIX: vmagent: return back unsent block to the queue during graceful shutdown. Previously this block could be dropped if remote storage is unavailable during vmagent shutdown. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1065> .

## [v1.53.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.53.1)

Released at 2021-02-03

* BUGFIX: vmselect: fix the bug peventing from proper searching by Graphite filter with wildcards such as `{__graphite__="foo.*.bar"}`.

## [v1.53.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.53.0)

Released at 2021-02-03

* FEATURE: added [vmctl tool](https://docs.victoriametrics.com/vmctl.html) to VictoriaMetrics release process. Now it is packaged in `vmutils-*.tar.gz` archive on [the releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases). Source code for `vmctl` tool has been moved from [github.com/VictoriaMetrics/vmctl](https://github.com/VictoriaMetrics/vmctl) to [github.com/VictoriaMetrics/VictoriaMetrics/app/vmctl](https://github.com/VictoriaMetrics/VictoriaMetrics/tree/master/app/vmctl).
* FEATURE: added `-loggerTimezone` command-line flag for adjusting time zone for timestamps in log messages. By default UTC is used.
* FEATURE: added `-search.maxStepForPointsAdjustment` command-line flag, which can be used for disabling adjustment for points returned by `/api/v1/query_range` handler if such points have timestamps closer than `-search.latencyOffset` to the current time. Such points may contain incomplete data, so they are substituted by the previous values for `step` query args smaller than one minute by default.
* FEATURE: vmselect: added ability to use Graphite-compatible filters in MetricsQL via `{__graphite__="foo.*.bar"}` syntax. This expression is equivalent to `{__name__=~"foo[.][^.]*[.]bar"}`, but it works faster and it is easier to use when migrating from Graphite to VictoriaMetrics. This feature deprecates the usage of `-search.treatDotsAsIsInRegexps` command-line flag.
* FEATURE: vmselect: added ability to set additional label filters, which must be applied during queries. Such label filters can be set via optional `extra_label` query arg, which is accepted by [querying API](https://docs.victoriametrics.com/#prometheus-querying-api-usage) handlers. For example, the request to `/api/v1/query_range?extra_label=tenant_id=123&query=<query>` adds `{tenant_id="123"}` label filter to the given `<query>`. It is expected that the `extra_label` query arg is automatically set by auth proxy sitting
in front of VictoriaMetrics. [Contact us](mailto:sales@victoriametrics.com) if you need assistance with such a proxy. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1021> .
* FEATURE: vmalert: added `-datasource.queryStep` command-line flag for passing optional `step` query arg to `/api/v1/query` endpoint. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1025>
* FEATURE: vmalert: added ability to query Graphite datasource when evaluating alerting and recording rules. See [these docs](https://docs.victoriametrics.com/vmalert.html#graphite) for details.
* FEATURE: vmagent: added `-remoteWrite.roundDigits` command-line option for rounding metric values to the given number of decimal digits after the point before sending the metric to the corresponding `-remoteWrite.url`. This option can be used for improving data compression on the remote storage, because values with lower number of decimal digits can be compressed better than values with bigger number of decimal digits.
* FEATURE: vmagent: added `-remoteWrite.rateLimit` command-line flag for limiting data transfer rate to `-remoteWrite.url`. This may be useful when big amounts of buffered data is sent after temporarily unavailability of the remote storage. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1035>
* FEATURE: vmagent: export the following additional metrics, which may be useful during troubleshooting:
  * `vm_promscrape_scrapes_failed_per_url_total`
  * `vm_promscrape_scrapes_skipped_by_sample_limit_per_url_total`
  * `vm_promscrape_discovery_requests_total`
  * `vm_promscrape_discovery_retries_total`
  * `vm_promscrape_scrape_retries_total`
  * `vm_promscrape_service_discovery_duration_seconds`
* FEATURE: vmselect: initial implementation for [Graphite Render API](https://docs.victoriametrics.com/#graphite-render-api-usage).

* BUGFIX: vmagent: reduce HTTP reconnection rate for scrape targets. Previously vmagent could errorneusly close HTTP keep-alive connections more frequently than needed.
* BUGFIX: vmagent: retry scrape and service discovery requests when the remote server closes HTTP keep-alive connection. Previously `disable_keepalive: true` option could be used under `scrape_configs` section when working with such servers.

## [v1.52.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.52.0)

Released at 2021-01-13

* FEATURE: provide a sample list of alerting rules for VictoriaMetrics components. It is available [here](https://github.com/VictoriaMetrics/VictoriaMetrics/blob/master/deployment/docker/alerts.yml).
* FEATURE: disable final merge for data for the previous month at the beginning of new month, since it may result in high disk IO and CPU usage. Final merge can be enabled by setting `-finalMergeDelay` command-line flag to positive duration.
* FEATURE: add `tfirst_over_time(m[d])` and `tlast_over_time(m[d])` functions to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html) for returning timestamps for the first and the last data point in `m` over `d` duration.
* FEATURE: add ability to pass multiple labels to `sort_by_label()` and `sort_by_label_desc()` functions. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/992> .
* FEATURE: enforce at least TLS v1.2 when accepting HTTPS requests if `-tls`, `-tlsCertFile` and `-tlsKeyFile` command-line flags are set, because older TLS protocols such as v1.0 and v1.1 have been deprecated due to security vulnerabilities.
* FEATURE: support `extra_label` query arg for all HTTP-based [data ingestion protocols](https://docs.victoriametrics.com/#how-to-import-time-series-data). This query arg can be used for specifying extra labels which should be added for the ingested data.
* FEATURE: vmbackup: increase backup chunk size from 128MB to 1GB. This should reduce the number of Object storage API calls during backups by 8x. This may also reduce costs, since object storage API calls usually have non-zero costs. See <https://aws.amazon.com/s3/pricing/> and <https://cloud.google.com/storage/pricing#operations-pricing> .

* BUGFIX: properly parse escaped unicode chars in MetricsQL metric names, label names and function names. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/990>
* BUGFIX: override user-provided labels with labels set in `extra_label` query args during data ingestion over HTTP-based protocols.
* BUGFIX: vmagent: prevent from `dialing to the given TCP address time out` error when scraping big number of unavailable targets. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/987>
* BUGFIX: vmagent: properly show scrape duration on `/targets` page. Previously it was incorrectly shown as 0.000s.
* BUGFIX: vmagent: properly log errors when `-promscrape.streamParse` command-line flag is set. See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1009>
* BUGFIX: vmagent: properly suppress errors when both `-promscrape.suppressScrapeErrors` and `-promscrape.streamParse` command-line flags are set. See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/1009> .
* BUGFIX: vmalert: return non-empty result in template func `query` stub to pass validation. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/989> .
* BUGFIX: upgrade base image for Docker packages from Alpine 3.12.1 to Alpine 3.12.3 in order to fix potential security issues. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1010>

## [v1.51.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.51.0)

Released at 2020-12-27

* FEATURE: add `/api/v1/status/top_queries` handler, which returns the most frequently executed queries and queries that took the most time for execution. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/907>
* FEATURE: vmagent: add support for `proxy_url` config option in Prometheus scrape configs. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/503>
* FEATURE: remove parts with stale data as soon as they go outside the configured `-retentionPeriod`. Previously such parts may remain active for long periods of time. This should help reducing disk usage for `-retentionPeriod` smaller than one month.
* FEATURE: vmalert: allow setting multiple values for `-notifier.tlsInsecureSkipVerify` command-line flag per each `-notifier.url`.

* BUGFIX: vmalert: properly escape multiline queries when passing them to Grafana. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/890>
* BUGFIX: vmagent: set missing `__meta_kubernetes_service_*` labels in `kubernetes_sd_config` for `endpoints` and `endpointslices` roles. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/982>
* BUGFIX: do not adjust `offset` value provided in MetricsQL query. Previously it could be modified in order to improve response cache hit ratio. This is unneeded, since cache hit ratio should remain good because the query time range should be already aligned to multiple of `step` values. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/976>

## [v1.50.2](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.50.2)

Released at 2020-12-19

* FEATURE: do not publish duplicate Docker images with `-cluster` tag suffix for [vmagent](https://docs.victoriametrics.com/vmagent.html), [vmalert](https://docs.victoriametrics.com/vmalert.html), [vmauth](https://docs.victoriametrics.com/vmauth.html), [vmbackup](https://docs.victoriametrics.com/vmbackup.html) and [vmrestore](https://docs.victoriametrics.com/vmrestore.html), since they are identical to images without `-cluster` tag suffix.

* BUGFIX: vmalert: properly populate template variables. This has been broken in v1.50.0. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/974>
* BUGFIX: properly parse negative combined duration in MetricsQL such as `-1h3m4s`. It must be parsed as `-(1h + 3m + 4s)`. Prevsiously it was parsed as `-1h + 3m + 4s`.
* BUGFIX: properly parse lines in [Prometheus exposition format](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) and in [OpenMetrics format](https://github.com/OpenObservability/OpenMetrics/blob/master/specification/OpenMetrics.md) with whitespace after the timestamp. For example, `foo 123 456 ## some comment here`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/970>

## [v1.50.1](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.50.1)

Released at 2020-12-15

* FEATURE: vmagent: export `vmagent_remotewrite_blocks_sent_total` and `vmagent_remotewrite_blocks_sent_total` metrics for each `-remoteWrite.url`.

* BUGFIX: vmagent: properly delete unregistered scrape targets from `/targets` and `/api/v1/targets` pages. They weren't deleted due to the bug in `v1.50.0`.

## [v1.50.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.50.0)

Released at 2020-12-15

* FEATURE: automatically reset response cache when samples with timestamps older than `now - search.cacheTimestampOffset` are ingested to VictoriaMetrics. This makes unnecessary disabling response cache during data backfilling or resetting it after backfilling is complete as described [in these docs](https://docs.victoriametrics.com/#backfilling). This feature applies only to single-node VictoriaMetrics. It doesn't apply to cluster version of VictoriaMetrics because `vminsert` nodes don't know about `vmselect` nodes where the response cache must be reset.
* FEATURE: vmalert: add `query`, `first` and `value` functions to alert templates. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/539>
* FEATURE: vmagent: return user-friendly HTML page when requesting `/targets` page from web browser. The page is returned in the old plaintext format when requesting via curl or similar tool.
* FEATURE: allow multiple whitespace chars between measurements, fields and timestamp when parsing InfluxDB line protocol.
  Though [InfluxDB line protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) denies multiple whitespace chars between these entities,
  some apps improperly put multiple whitespace chars. This workaround allows accepting data from such apps.
* FEATURE: export `vm_promscrape_active_scrapers{type="<sd_type>"}` metric for tracking the number of active scrapers per each service discovery type.
* FEATURE: export `vm_promscrape_scrapers_started_total{type="<sd_type>"}` and `vm_promscrape_scrapers_stopped_total{type="<sd_type>"}` metrics for tracking churn rate for scrapers
  per each service discovery type.
* FEATURE: vmagent: allow setting per-`-remoteWrite.url` command-line flags for `-remoteWrite.sendTimeout` and `-remoteWrite.tlsInsecureSkipVerify`.

* BUGFIX: properly handle `*` and `[...]` inside curly braces in query passed to Graphite Metrics API. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/952>
* BUGFIX: vmagent: fix memory leak when big number of targets is discovered via service discovery.
* BUGFIX: vmagent: properly pass `datacenter` filter to Consul API server. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/574#issuecomment-740454170>
* BUGFIX: properly handle CPU limits set on the host system or host container. The bugfix may result in lower memory usage on systems with CPU limits. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/946>
* BUGFIX: prevent from duplicate `name` tag returned from `/tags/autoComplete/tags` handler. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/942>
* BUGFIX: do not enable strict parsing for `-promscrape.config` if `-promscrape.config.dryRun` comand-line flag is set. Strict parsing can be enabled with `-promscrape.config.strictParse` command-line flag. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/944>
* BUGFIX: vminsert: properly update `vm_rpc_rerouted_rows_processed_total` metric. Previously it wasn't updated. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/955>
* BUGFIX: vmagent: properly recover when opening incorrectly stored persistent queue. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/964>
* BUGFIX: vmagent: properly handle scrape errors when stream parsing is enabled with `-promscrape.streamParse` command-line flag or with `stream_parse: true` per-target config option. Previously such errors weren't reported at `/targets` page. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/967>
* BUGFIX: assume the previous value is 0 when calculating `increase()` for the first point on the graph if its value doesn't exceed 100 and the delta between two first points equals to 0. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/962>

## [v1.49.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.49.0)

Released at 2020-12-05

* FEATURE: optimize Consul service discovery speed when discovering big number of services. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/574>
* FEATURE: add `label_uppercase(q, label1, ... labelN)` and `label_lowercase(q, label1, ... labelN)` function to [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html)
  for uppercasing and lowercasing values for the given labels. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/936>
* FEATURE: add `count_eq_over_time(m[d], N)` and `count_ne_over_time(m[d], N)` for counting the number of samples for `m` over `d` that (equal / not equal) to `N`.
* FEATURE: do not print usage info for all the command-line flags when incorrect command-line flag is passed. Previously it could be hard reading the error message
  about incorrect command-line flag because of too big usage info for all the flags.
* FEATURE: upgrade Go builder from v1.15.5 to v1.15.6 . This fixes [issues found in Go since v1.15.5](https://github.com/golang/go/issues?q=milestone%3AGo1.15.6+label%3ACherryPickApproved).

* BUGFIX: properly parse timestamps in OpenMetrics format - they are exposed as floating-point number in seconds instead of integer milliseconds
  unlike in Prometheus exposition format. See [the docs](https://github.com/OpenObservability/OpenMetrics/blob/master/specification/OpenMetrics.md#timestamps).
* BUGFIX: return `nan` for `a >bool b` query when `a` equals to `nan` like Prometheus does. Previously `0` was returned in this case. This applies to any comparison operation
  with `bool` modifier. See [these docs](https://prometheus.io/docs/prometheus/latest/querying/operators/#comparison-binary-operators) for details.
* BUGFIX: properly parse hex numbers in MetricsQL. Previously hex numbers with non-decimal digits such as `0x3b` couldn't be parsed.
* BUGFIX: handle `time() cmp_op metric` like Prometheus does - i.e. return `metric` value if `cmp_op` comparison is true. Previously `time()` value was returned.
* BUGFIX: return `nan` for `minute(m)` query when `m` equals to `nan` like Prometheus does. This applies to all the time-related functions such as `day_of_month`, `day_of_week`,
  `days_in_month`, `hour`, `month` and `year`.

## [v1.48.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.48.0)

Released at 2020-11-26

* FEATURE: added [Snap package for single-node VictoriaMetrics](https://snapcraft.io/victoriametrics). This simplifies installation under Ubuntu to a single command:

  ```console
  snap install victoriametrics
  ```

* FEATURE: vmselect: add `-replicationFactor` command-line flag for reducing query duration when replication is enabled and a part of vmstorage nodes
  are temporarily slow and/or temporarily unavailable. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/711>
* FEATURE: vminsert: export `vm_rpc_vmstorage_is_reachable` metric, which can be used for monitoring reachability of vmstorage nodes from vminsert nodes.
* FEATURE: vmagent: add [Netflix Eureka](https://github.com/Netflix/eureka) service discovery (aka [eureka_sd_config](https://docs.victoriametrics.com/sd_configs.html#eureka_sd_configs)). See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/851>
* FEATURE: add `filters` option to `dockerswarm_sd_config` like Prometheus did in v2.23.0 - see <https://github.com/prometheus/prometheus/pull/8074>
* FEATURE: expose `__meta_ec2_ipv6_addresses` label for `ec2_sd_config` like Prometheus will do in the next release.
* FEATURE: add `-loggerWarnsPerSecondLimit` command-line flag for rate limiting of WARN messages in logs. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/905>
* FEATURE: apply `loggerErrorsPerSecondLimit` and `-loggerWarnsPerSecondLimit` rate limit per caller. I.e. log messages are suppressed if the same caller logs the same message
  at the rate exceeding the given limit. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/905#issuecomment-729395855>
* FEATURE: add remoteAddr to slow query log in order to simplify identifying the client that sends slow queries to VictoriaMetrics.
  Slow query logging is controlled with `-search.logSlowQueryDuration` command-line flag.
* FEATURE: add `/tags/delSeries` handler from Graphite Tags API. See <https://docs.victoriametrics.com/#graphite-tags-api-usage>
* FEATURE: log metric name plus all its labels when the metric timestamp is out of the configured retention. This should simplify detecting the source of metrics with unexpected timestamps.
* FEATURE: add `-dryRun` command-line flag to single-node VictoriaMetrics in order to check config file pointed by `-promscrape.config`.

* BUGFIX: properly parse Prometheus metrics with [exemplars](https://github.com/OpenObservability/OpenMetrics/blob/master/OpenMetrics.md#exemplars-1) such as `foo 123 ## {bar="baz"} 1`.
* BUGFIX: properly parse "infinity" values in [OpenMetrics format](https://github.com/OpenObservability/OpenMetrics/blob/master/OpenMetrics.md#abnf).
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/924>

## [v1.47.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.47.0)

Released at 2020-11-16

* FEATURE: vmselect: return the original error from `vmstorage` node in query response if `-search.denyPartialResponse` is set.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/891>
* FEATURE: vmselect: add `"isPartial":{true|false}` field in JSON output for `/api/v1/*` functions
  from [Prometheus querying API](https://prometheus.io/docs/prometheus/latest/querying/api/). `"isPartial":true` is set if the response contains partial data
  because of a part of `vmstorage` nodes were unavailable during query processing.
* FEATURE: improve performance for `/api/v1/series`, `/api/v1/labels` and `/api/v1/label/<labelName>/values` on time ranges exceeding one day.
* FEATURE: vmagent: reduce memory usage when service discovery detects big number of scrape targets and the set of discovered targets changes over time.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/825>
* FEATURE: vmagent: add `-promscrape.dropOriginalLabels` command-line option, which can be used for reducing memory usage when scraping big number of targets.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/825#issuecomment-724308361> for details.
* FEATURE: vmalert: explicitly set extra labels to alert entities. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/870>
* FEATURE: add `-search.treatDotsAsIsInRegexps` command-line flag, which can be used for automatic escaping of dots in regexp label filters used in queries.
  For example, if `-search.treatDotsAsIsInRegexps` is set, then the query `foo{bar=~"aaa.bb.cc|dd.eee"}` is automatically converted to `foo{bar=~"aaa\\.bb\\.cc|dd\\.eee"}`.
  This may be useful for querying Graphite data.
* FEATURE: consistently return text-based HTTP responses such as `plain/text` and `application/json` with `charset=utf-8`.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/897>
* FEATURE: update Go builder from v1.15.4 to v1.15.5. This should fix [these issues in Go](https://github.com/golang/go/issues?q=milestone%3AGo1.15.5+label%3ACherryPickApproved).
* FEATURE: added `/internal/force_flush` http handler for flushing recently ingested data from in-memory buffers to persistent storage.
  See [troubleshooting docs](https://docs.victoriametrics.com/#troubleshooting) for more details.
* FEATURE: added [Graphite Tags API](https://graphite.readthedocs.io/en/stable/tags.html) support.
  See [these docs](https://docs.victoriametrics.com/#graphite-tags-api-usage) for details.

* BUGFIX: do not return data points in the end of the selected time range for time series ending in the middle of the selected time range.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/887> and <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/845>
* BUGFIX: remove spikes at the end of time series gaps for `increase()` or `delta()` functions. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/894>
* BUGFIX: vminsert: properly return HTTP 503 status code when all the vmstorage nodes are unavailable. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/896>

## [v1.46.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.46.0)

Released at 2020-11-07

* FEATURE: optimize requests to `/api/v1/labels` and `/api/v1/label/<name>/values` when `start` and `end` args are set.
* FEATURE: reduce memory usage when query touches big number of time series.
* FEATURE: vmagent: reduce memory usage when `kubernetes_sd_config` discovers big number of scrape targets (e.g. hundreds of thousands) and the majority of these targets (99%)
  are dropped during relabeling. Previously labels for all the dropped targets were displayed at `/api/v1/targets` page. Now only up to `-promscrape.maxDroppedTargets` such
  targets are displayed. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/878> for details.
* FEATURE: vmagent: reduce memory usage when scraping big number of targets with big number of temporary labels starting with `__`.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/825>
* FEATURE: vmagent: add `/ready` HTTP endpoint, which returns 200 OK status code when all the service discovery has been initialized.
  This may be useful during rolling upgrades. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/875>

* BUGFIX: vmagent: eliminate data race when `-promscrape.streamParse` command-line is set. Previously this mode could result in scraped metrics with garbage labels.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/825#issuecomment-723198247> for details.
* BUGFIX: properly calculate `topk_*` and `bottomk_*` functions from [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html) for time series with gaps.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/pull/883>

## [v1.45.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.45.0)

Released at 2020-11-02

* FEATURE: allow setting `-retentionPeriod` smaller than one month. I.e. `-retentionPeriod=3d`, `-retentionPeriod=2w`, etc. is supported now.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/173>
* FEATURE: optimize more cases according to <https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusLabelNonOptimization> . Now the following cases are optimized too:
  * `rollup_func(foo{filters}[d]) op bar` -> `rollup_func(foo{filters}[d]) op bar{filters}`
  * `transform_func(foo{filters}) op bar` -> `transform_func(foo{filters}) op bar{filters}`
  * `num_or_scalar op foo{filters} op bar` -> `num_or_scalar op foo{filters} op bar{filters}`
* FEATURE: improve time series search for queries with multiple label filters. I.e. `foo{label1="value", label2=~"regexp"}`.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/781>
* FEATURE: vmagent: add `stream parse` mode. This mode allows reducing memory usage when individual scrape targets expose tens of millions of metrics.
  For example, during scraping Prometheus in [federation](https://prometheus.io/docs/prometheus/latest/federation/) mode.
  See `-promscrape.streamParse` command-line option and `stream_parse: true` config option for `scrape_config` section in `-promscrape.config`.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/825> and [troubleshooting docs for vmagent](https://docs.victoriametrics.com/vmagent.html#troubleshooting).
* FEATURE: vmalert: add `-dryRun` command-line option for validating the provided config files without the need to start `vmalert` service.
* FEATURE: accept optional third argument of string type at `topk_*` and `bottomk_*` functions. This is label name for additional time series to return with the sum of time series outside top/bottom K. See [MetricsQL docs](https://docs.victoriametrics.com/MetricsQL.html) for more details.
* FEATURE: vmagent: expose `/api/v1/targets` page according to [the corresponding Prometheus API](https://prometheus.io/docs/prometheus/latest/querying/api/#targets).
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/643>

* BUGFIX: vmagent: properly handle OpenStack endpoint ending with `v3.0` such as `https://ostack.example.com:5000/v3.0`
  in the same way as Prometheus does. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/728#issuecomment-709914803>
* BUGFIX: drop trailing data points for time series with a single raw sample. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/748>
* BUGFIX: do not drop trailing data points for instant queries to `/api/v1/query`. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/845>
* BUGFIX: vmbackup: fix panic when `-origin` isn't specified. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/856>
* BUGFIX: vmalert: skip automatically added labels on alerts restore. Label `alertgroup` was introduced in [this issue](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/611)
  and automatically added to generated time series. By mistake, this new label wasn't correctly purged on restore event and affected alert's ID uniqueness.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/870>
* BUGFIX: vmagent: fix panic at scrape error body formating. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/864>
* BUGFIX: vmagent: add leading missing slash to metrics path like Prometheus does. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/835>
* BUGFIX: vmagent: drop packet if remote storage returns 4xx status code. This make the behaviour consistent with Prometheus.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/873>
* BUGFIX: vmagent: properly handle 301 redirects. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/869>

## [v1.44.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.44.0)

Released at 2020-10-13

* FEATURE: automatically add missing label filters to binary operands as described at <https://utcc.utoronto.ca/~cks/space/blog/sysadmin/PrometheusLabelNonOptimization> .
  This should improve performance for queries with missing label filters in binary operands. For example, the following query should work faster now, because it shouldn't
  fetch and discard time series for `node_filesystem_files_free` metric without matching labels for the left side of the expression:

  ```
     node_filesystem_files{ host="$host", mountpoint="/" } - node_filesystem_files_free
  ```

* FEATURE: vmagent: add Docker Swarm service discovery (aka [dockerswarm_sd_config](https://docs.victoriametrics.com/sd_configs.html#dockerswarm_sd_configs)).
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/656>
* FEATURE: add ability to export data in CSV format. See [these docs](https://docs.victoriametrics.com/#how-to-export-csv-data) for details.
* FEATURE: vmagent: add `-promscrape.suppressDuplicateScrapeTargetErrors` command-line flag for suppressing `duplicate scrape target` errors.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/651> and <https://docs.victoriametrics.com/vmagent.html#troubleshooting> .
* FEATURE: vmagent: show original labels before relabeling is applied on `duplicate scrape target` errors. This should simplify debugging for incorrect relabeling.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/651>
* FEATURE: vmagent: `/targets` page now accepts optional `show_original_labels=1` query arg for displaying original labels for each target before relabeling is applied.
  This should simplify debugging for target relabeling configs. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/651>
* FEATURE: add `-finalMergeDelay` command-line flag for configuring the delay before final merge for per-month partitions.
  The final merge is started after no new data is ingested into per-month partition during `-finalMergeDelay`.
* FEATURE: add `vm_rows_added_to_storage_total` metric, which shows the total number of rows added to storage since app start.
  The `sum(rate(vm_rows_added_to_storage_total))` can be smaller than `sum(rate(vm_rows_inserted_total))` if certain metrics are dropped
  due to [relabeling](https://docs.victoriametrics.com/#relabeling). The `sum(rate(vm_rows_added_to_storage_total))` can be bigger
  than `sum(rate(vm_rows_inserted_total))` if [replication](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html#replication-and-data-safety) is enabled.
* FEATURE: keep metric name after applying [MetricsQL](https://docs.victoriametrics.com/MetricsQL.html) functions, which don't change time series meaning.
  The list of such functions:
  * `keep_last_value`
  * `keep_next_value`
  * `interpolate`
  * `running_min`
  * `running_max`
  * `running_avg`
  * `range_min`
  * `range_max`
  * `range_avg`
  * `range_first`
  * `range_last`
  * `range_quantile`
  * `smooth_exponential`
  * `ceil`
  * `floor`
  * `round`
  * `clamp_min`
  * `clamp_max`
  * `max_over_time`
  * `min_over_time`
  * `avg_over_time`
  * `quantile_over_time`
  * `mode_over_time`
  * `geomean_over_time`
  * `holt_winters`
  * `predict_linear`
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/674>

* BUGFIX: properly handle stale time series after K8S deployment. Previously such time series could be double-counted.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/748>
* BUGFIX: return a single time series at max from `absent()` function like Prometheus does.
* BUGFIX: vmalert: accept days, weeks and years in `for:` part of config like Prometheus does. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/817>
* BUGFIX: fix `mode_over_time(m[d])` calculations. Previously the function could return incorrect results.

## [v1.43.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.43.0)

Released at 2020-10-06

* FEATURE: reduce CPU usage for repeated queries over sliding time window when no new time series are added to the database.
  Typical use cases: repeated evaluation of alerting rules in [vmalert](https://docs.victoriametrics.com/vmalert.html) or dashboard auto-refresh in Grafana.
* FEATURE: vmagent: add OpenStack service discovery aka [openstack_sd_config](https://docs.victoriametrics.com/sd_configs.html#openstack_sd_configs).
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/728> .
* FEATURE: vmalert: make `-maxIdleConnections` configurable for datasource HTTP client. This option can be used for minimizing connection churn.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/795> .
* FEATURE: add `-influx.maxLineSize` command-line flag for configuring the maximum size for a single InfluxDB line during parsing.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/807>

* BUGFIX: properly handle `inf` values during [background merge of LSM parts](https://medium.com/@valyala/how-victoriametrics-makes-instant-snapshots-for-multi-terabyte-time-series-data-e1f3fb0e0282).
  Previously `Inf` values could result in `NaN` values for adjacent samples in time series. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/805> .
* BUGFIX: fill gaps on graphs for `range_*` and `running_*` functions. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/806> .
* BUGFIX: make a copy of label with new name during relabeling with `action: labelmap` in the same way as Prometheus does.
  Previously the original label name has been replaced. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/812> .
* BUGFIX: support parsing floating-point timestamp like Graphite Carbon does. Such timestmaps are truncated to seconds.

## [v1.42.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.42.0)

Released at 2020-09-30

* FEATURE: use all the available CPU cores when accepting data via a single TCP connection
  for [all the supported protocols](https://docs.victoriametrics.com/#how-to-import-time-series-data).
  Previously data ingested via a single TCP connection could use only a single CPU core. This could limit data ingestion performance.
  The main benefit of this feature is that data can be imported at max speed via a single connection - there is no need to open multiple concurrent
  connections to VictoriaMetrics or [vmagent](https://docs.victoriametrics.com/vmagent.html) in order to achieve the maximum data ingestion speed.
* FEATURE: cluster: improve performance for data ingestion path from `vminsert` to `vmstorage` nodes. The maximum data ingestion performance
  for a single connection between `vminsert` and `vmstorage` node scales with the number of available CPU cores on `vmstorage` side.
  This should help with <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/791> .
* FEATURE: add ability to export / import data in native format via `/api/v1/export/native` and `/api/v1/import/native`.
  This is the most optimized approach for data migration between VictoriaMetrics instances. Both single-node and cluster instances are supported.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/787#issuecomment-700632551> .
* FEATURE: add `reduce_mem_usage` query option to `/api/v1/export` in order to reduce memory usage during data export / import.
  See [these docs](https://docs.victoriametrics.com/#how-to-export-data-in-json-line-format) for details.
* FEATURE: improve performance for `/api/v1/series` handler when it returns big number of time series.
* FEATURE: add `vm_merge_need_free_disk_space` metric, which can be used for estimating the number of deferred background data merges due to the lack of free disk space.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/686> .
* FEATURE: add OpenBSD support. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/785> .

* BUGFIX: properly apply `-search.maxStalenessInterval` command-line flag value. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/784> .
* BUGFIX: fix displaying data in Grafana tables. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/720> .
* BUGFIX: do not adjust the number of detected CPU cores found at `/sys/devices/system/cpu/online`.
  The adjustment was increasing the resulting GOMAXPROC by 1, which looked confusing to users.
  See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/685#issuecomment-698595309> .
* BUGFIX: vmagent: do not show `-remoteWrite.url` in initial logs if `-remoteWrite.showURL` isn't set. See <https://github.com/VictoriaMetrics/VictoriaMetrics/issues/773> .
* BUGFIX: properly handle case when [/metrics/find](https://docs.victoriametrics.com/#graphite-metrics-api-usage) finds both a leaf and a node for the given `query=prefix.*`.
  In this case only the node must be returned with stripped dot in the end of id as carbonapi does.

## Previous releases

See [releases page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases).
