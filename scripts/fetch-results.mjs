#!/usr/bin/env node
// Fetch official results (Enhanced Voting media JSON export) and write a
// normalized, compact results file the static site can load.
//
// Usage: node scripts/fetch-results.mjs <config.json> <outDir>
// Writes <outDir>/<electionId>/latest.json, history.json and debug.json.
// Exits 0 even when the source is unreachable, so the workflow keeps going;
// the failure is recorded in debug.json and latest.json keeps its last good data.

import fs from "node:fs";
import path from "node:path";

const [configPath, outRoot] = process.argv.slice(2);
if (!configPath || !outRoot) {
  console.error("usage: fetch-results.mjs <config.json> <outDir>");
  process.exit(2);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const outDir = path.join(outRoot, config.id);
fs.mkdirSync(outDir, { recursive: true });

const UA = "ballot-tool results fetcher (github.com/murphy360/ballot-tool)";
const readJson = (p, d) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return d; } };
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 0) + "\n");

async function fetchJson(url) {
  if (url.startsWith("file:")) return JSON.parse(fs.readFileSync(new URL(url), "utf8"));
  const res = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(), {
    headers: { "User-Agent": UA, Accept: "application/json" },
    signal: AbortSignal.timeout(60_000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  try { return JSON.parse(text); } catch { throw new Error(`Not JSON (${res.headers.get("content-type")}): ${text.slice(0, 200)}`); }
}

const int = (v) => (typeof v === "number" ? v : parseInt(v ?? 0, 10) || 0);

function collectBallotItems(data) {
  const items = new Map();
  const add = (bi, scope) => {
    if (!bi || bi.id == null) return;
    const prev = items.get(bi.id);
    const hasPrecincts = (bi.ballotOptions || []).some((o) => (o.precinctResults || []).length);
    if (!prev || (hasPrecincts && !prev.hasPrecincts) || (scope === "local" && prev.scope !== "local" && hasPrecincts)) {
      items.set(bi.id, { bi, scope, hasPrecincts });
    }
  };
  for (const bi of data?.results?.ballotItems || []) add(bi, "results");
  for (const loc of data?.localResults || []) for (const bi of loc.ballotItems || []) add(bi, "local");
  // Some exports nest under results.localResults
  for (const loc of data?.results?.localResults || []) for (const bi of loc.ballotItems || []) add(bi, "local");
  return [...items.values()].map((x) => x.bi);
}

const REPORTED = /(complete|fully reported|partially reported)/i;
const FULL = /(complete|fully reported)/i;

function normalize(data, source, localities) {
  const locRes = localities.map((l) => ({ ...l, re: new RegExp(l.precinctPattern, l.precinctFlags || "") }));
  const allPrecinctNames = new Set();
  const contests = collectBallotItems(data).map((bi) => {
    const opts = (bi.ballotOptions || []).slice().sort((a, b) => int(a.ballotOrder) - int(b.ballotOrder));
    const local = {};
    for (const l of locRes) local[l.id] = { votes: {}, precincts: {} };
    const options = opts.map((o) => {
      const groups = {};
      for (const g of o.groupResults || []) groups[g.groupName] = int(g.voteCount);
      for (const p of o.precinctResults || []) {
        if (p.name) allPrecinctNames.add(p.name);
        for (const l of locRes) {
          if (!p.name || !l.re.test(p.name)) continue;
          const L = local[l.id];
          L.votes[o.id] = (L.votes[o.id] || 0) + int(p.voteCount);
          const st = p.reportingStatus || "";
          const prev = L.precincts[p.name];
          // keep the "most reported" status seen across options
          const rank = (s) => (FULL.test(s) ? 2 : REPORTED.test(s) ? 1 : 0);
          if (prev === undefined || rank(st) > rank(prev)) L.precincts[p.name] = st;
        }
      }
      return {
        id: String(o.id),
        name: String(o.name || "").trim(),
        party: String(o.politicalParty || "").trim(),
        votes: int(o.voteCount),
        groups,
      };
    });
    const localOut = {};
    for (const l of locRes) {
      const L = local[l.id];
      const names = Object.keys(L.precincts);
      if (!names.length) continue;
      localOut[l.id] = {
        precincts: names.length,
        reported: names.filter((n) => REPORTED.test(L.precincts[n])).length,
        complete: names.filter((n) => FULL.test(L.precincts[n])).length,
        votes: Object.fromEntries(options.map((o) => [o.id, L.votes[o.id] || 0])),
      };
    }
    return {
      id: String(bi.id),
      name: String(bi.name || "").trim(),
      type: bi.contestType || bi.type || "",
      voteFor: int(bi.voteFor) || 1,
      order: int(bi.ballotOrder),
      precinctsReporting: int(bi.precinctsReporting),
      precinctsParticipating: int(bi.precinctsParticipating),
      options,
      local: localOut,
    };
  }).sort((a, b) => a.order - b.order);

  return {
    contests,
    precinctNames: [...allPrecinctNames].sort(),
    meta: {
      electionName: data?.electionName || "",
      electionDate: data?.electionDate || "",
      sourceUpdatedAt: data?.createdAt || null,
    },
  };
}

async function runSource(source, prevDebug) {
  const tried = [];
  // Try the last URL that worked first.
  const urls = [...new Set([prevDebug?.sources?.[source.id]?.workingUrl, ...source.jsonUrls].filter(Boolean))];
  for (const url of urls) {
    try {
      const data = await fetchJson(url);
      tried.push({ url, ok: true });
      return { url, data, tried };
    } catch (e) {
      tried.push({ url, ok: false, error: String(e.message || e).slice(0, 300) });
    }
  }
  return { url: null, data: null, tried };
}

const latestPath = path.join(outDir, "latest.json");
const historyPath = path.join(outDir, "history.json");
const debugPath = path.join(outDir, "debug.json");
const prevLatest = readJson(latestPath, null);
const prevDebug = readJson(debugPath, {});
const now = new Date().toISOString();

const debug = { checkedAt: now, sources: {} };
const latest = {
  electionId: config.id,
  electionName: config.name,
  checkedAt: now,
  updatedAt: prevLatest?.updatedAt || null,
  sources: prevLatest?.sources || {},
};

let changed = false;
for (const source of config.sources) {
  const { url, data, tried } = await runSource(source, prevDebug);
  const dbg = { workingUrl: url, tried };
  if (data) {
    const norm = normalize(data, source, config.localities || []);
    dbg.contestNames = norm.contests.map((c) => `${c.id} | ${c.name}`);
    dbg.precinctNames = norm.precinctNames;
    dbg.localityPrecincts = Object.fromEntries(
      (config.localities || []).map((l) => [l.id, norm.precinctNames.filter((n) => new RegExp(l.precinctPattern, l.precinctFlags || "").test(n))])
    );
    dbg.topKeys = Object.keys(data);
    const prev = latest.sources[source.id];
    const next = {
      label: source.label,
      publicUrl: source.publicUrl,
      ...norm.meta,
      fetchedAt: now,
      contests: norm.contests,
    };
    const sig = (s) => JSON.stringify(s?.contests || []);
    if (!prev || sig(prev) !== sig(next) || prev.sourceUpdatedAt !== next.sourceUpdatedAt) {
      latest.sources[source.id] = next;
      latest.updatedAt = now;
      changed = true;
    } else {
      prev.fetchedAt = now;
    }
  } else {
    dbg.error = "No working results URL";
    if (latest.sources[source.id]) latest.sources[source.id].lastError = { at: now, tried };
  }
  debug.sources[source.id] = dbg;
}

writeJson(latestPath, latest);
writeJson(debugPath, debug);

if (changed) {
  // Compact history: per-snapshot totals for contests, used for "last change" display.
  const history = readJson(historyPath, []);
  history.push({
    at: now,
    sources: Object.fromEntries(Object.entries(latest.sources).map(([id, s]) => [id, {
      sourceUpdatedAt: s.sourceUpdatedAt,
      totals: Object.fromEntries((s.contests || []).map((c) => [c.id, c.options.map((o) => o.votes)])),
    }])),
  });
  writeJson(historyPath, history.slice(-150));
}

console.log(JSON.stringify({ changed, checkedAt: now, sources: Object.fromEntries(Object.entries(debug.sources).map(([k, v]) => [k, { url: v.workingUrl, contests: v.contestNames?.length ?? 0, error: v.error }])) }));
