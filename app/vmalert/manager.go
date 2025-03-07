package main

import (
	"context"
	"fmt"
	"net/url"
	"sort"
	"sync"

	"github.com/VictoriaMetrics/VictoriaMetrics/app/vmalert/config"
	"github.com/VictoriaMetrics/VictoriaMetrics/app/vmalert/datasource"
	"github.com/VictoriaMetrics/VictoriaMetrics/app/vmalert/notifier"
	"github.com/VictoriaMetrics/VictoriaMetrics/app/vmalert/remotewrite"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/logger"
)

// manager controls group states
type manager struct {
	querierBuilder datasource.QuerierBuilder
	notifiers      func() []notifier.Notifier

	rw *remotewrite.Client
	// remote read builder.
	rr datasource.QuerierBuilder

	wg     sync.WaitGroup
	labels map[string]string

	groupsMu sync.RWMutex
	groups   map[uint64]*Group
}

// RuleAPI generates APIRule object from alert by its ID(hash)
func (m *manager) RuleAPI(gID, rID uint64) (APIRule, error) {
	m.groupsMu.RLock()
	defer m.groupsMu.RUnlock()

	g, ok := m.groups[gID]
	if !ok {
		return APIRule{}, fmt.Errorf("can't find group with id %d", gID)
	}
	for _, rule := range g.Rules {
		if rule.ID() == rID {
			return rule.ToAPI(), nil
		}
	}
	return APIRule{}, fmt.Errorf("can't find rule with id %d in group %q", rID, g.Name)
}

// AlertAPI generates APIAlert object from alert by its ID(hash)
func (m *manager) AlertAPI(gID, aID uint64) (*APIAlert, error) {
	m.groupsMu.RLock()
	defer m.groupsMu.RUnlock()

	g, ok := m.groups[gID]
	if !ok {
		return nil, fmt.Errorf("can't find group with id %d", gID)
	}
	for _, rule := range g.Rules {
		ar, ok := rule.(*AlertingRule)
		if !ok {
			continue
		}
		if apiAlert := ar.AlertAPI(aID); apiAlert != nil {
			return apiAlert, nil
		}
	}
	return nil, fmt.Errorf("can't find alert with id %d in group %q", aID, g.Name)
}

func (m *manager) start(ctx context.Context, groupsCfg []config.Group) error {
	return m.update(ctx, groupsCfg, true)
}

func (m *manager) close() {
	if m.rw != nil {
		err := m.rw.Close()
		if err != nil {
			logger.Fatalf("cannot stop the remotewrite: %s", err)
		}
	}
	m.wg.Wait()
}

func (m *manager) startGroup(ctx context.Context, g *Group, restore bool) error {
	m.wg.Add(1)
	id := g.ID()
	go func() {
		defer m.wg.Done()
		if restore {
			g.start(ctx, m.notifiers, m.rw, m.rr)
		} else {
			g.start(ctx, m.notifiers, m.rw, nil)
		}
	}()
	m.groups[id] = g
	return nil
}

func (m *manager) update(ctx context.Context, groupsCfg []config.Group, restore bool) error {
	var rrPresent, arPresent bool
	groupsRegistry := make(map[uint64]*Group)
	for _, cfg := range groupsCfg {
		for _, r := range cfg.Rules {
			if rrPresent && arPresent {
				continue
			}
			if r.Record != "" {
				rrPresent = true
			}
			if r.Alert != "" {
				arPresent = true
			}
		}
		ng,err := newGroup(cfg, m.querierBuilder, *evaluationInterval, m.labels)
		if err != nil {
			return err
		}
		groupsRegistry[ng.ID()] = ng
	}

	if rrPresent && m.rw == nil {
		return fmt.Errorf("config contains recording rules but `-remoteWrite.url` isn't set")
	}
	if arPresent && m.notifiers == nil {
		return fmt.Errorf("config contains alerting rules but neither `-notifier.url` nor `-notifier.config` aren't set")
	}

	type updateItem struct {
		old *Group
		new *Group
	}
	var toUpdate []updateItem

	m.groupsMu.Lock()
	for _, og := range m.groups {
		ng, ok := groupsRegistry[og.ID()]
		if !ok {
			// old group is not present in new list,
			// so must be stopped and deleted
			og.close()
			delete(m.groups, og.ID())
			og = nil
			continue
		}
		delete(groupsRegistry, ng.ID())
		if og.Checksum != ng.Checksum {
			toUpdate = append(toUpdate, updateItem{old: og, new: ng})
		}
	}
	for _, ng := range groupsRegistry {
		if err := m.startGroup(ctx, ng, restore); err != nil {
			m.groupsMu.Unlock()
			return err
		}
	}
	m.groupsMu.Unlock()

	if len(toUpdate) > 0 {
		var wg sync.WaitGroup
		for _, item := range toUpdate {
			wg.Add(1)
			go func(old *Group, new *Group) {
				old.updateCh <- new
				wg.Done()
			}(item.old, item.new)
			item.old.interruptEval()
		}
		wg.Wait()
	}
	return nil
}

func (g *Group) toAPI() APIGroup {
	g.mu.RLock()
	defer g.mu.RUnlock()

	ag := APIGroup{
		// encode as string to avoid rounding
		ID: fmt.Sprintf("%d", g.ID()),

		Name:           g.Name,
		Type:           g.Type.String(),
		File:           g.File,
		Interval:       g.Interval.Seconds(),
		IntervalOffset: g.IntervalOffset.Seconds(),
		LastEvaluation: g.LastEvaluation,
		Concurrency:    g.Concurrency,
		Params:         urlValuesToStrings(g.Params),
		Headers:        headersToStrings(g.Headers),
		Labels:         g.Labels,
	}
	for _, r := range g.Rules {
		ag.Rules = append(ag.Rules, r.ToAPI())
	}
	return ag
}

func urlValuesToStrings(values url.Values) []string {
	if len(values) < 1 {
		return nil
	}

	keys := make([]string, 0, len(values))
	for k := range values {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var res []string
	for _, k := range keys {
		params := values[k]
		for _, v := range params {
			res = append(res, fmt.Sprintf("%s=%s", k, v))
		}
	}
	return res
}

func headersToStrings(headers map[string]string) []string {
	if len(headers) < 1 {
		return nil
	}

	keys := make([]string, 0, len(headers))
	for k := range headers {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var res []string
	for _, k := range keys {
		v := headers[k]
		res = append(res, fmt.Sprintf("%s: %s", k, v))
	}

	return res
}
