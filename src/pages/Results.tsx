import { useEffect, useMemo, useState } from "react";
import { election } from "../data/2026-11-03";
import type { Locality, Race } from "../data/types";
import { candidateForOption, matchRace, type RContest, type RLatest, type ROption } from "../results/match";

const RESULTS_URL = `${import.meta.env.BASE_URL}results/${election.id}/latest.json`;
const REFRESH_MS = 60_000;

const fmt = new Intl.NumberFormat("en-US");
const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
const dateTimeFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
const when = (iso?: string | null) => (iso ? dateTimeFmt.format(new Date(iso)) + " ET" : "—");

const STATEWIDE_URL = `${import.meta.env.BASE_URL}manual/${election.id}/statewide.json`;
interface Manual { updatedAt: string | null; source: string | null; sourceUrl: string | null;
  races: Record<string, { reporting?: string; called?: string; options: { name: string; party?: string; votes: number }[] }> }
function useStatewide() {
  const [m, setM] = useState<Manual | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () => fetch(STATEWIDE_URL + "?t=" + Date.now(), { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((j) => alive && setM(j)).catch(() => {});
    load(); const t = setInterval(load, REFRESH_MS);
    return () => { alive = false; clearInterval(t); };
  }, []);
  return m;
}

function StatewideBlock({ race, manual }: { race: Race; manual: Manual | null }) {
  const label = race.scope === "statewide" ? "Ohio statewide total" : "Full district total";
  const entry = manual?.races?.[race.id];
  if (!entry || !entry.options?.length) {
    return (
      <div className="block statewide">
        <div className="block-h">{label}</div>
        <div className="small">
          Summit County's feed doesn't include the {race.scope === "statewide" ? "statewide" : "district-wide"} count.{" "}
          <a className="sw-link" href="https://liveresults.ohiosos.gov/" target="_blank" rel="noopener noreferrer">See {race.scope === "statewide" ? "statewide" : "district"} results at the Ohio Secretary of State ↗</a>
        </div>
      </div>
    );
  }
  const options = entry.options.map((o, i) => ({ id: "m" + i, name: o.name, party: o.party || "", votes: o.votes, groups: {} }));
  const pseudo = { id: "m-" + race.id, name: race.title, type: "", voteFor: race.voteFor || 1, order: 0, precinctsReporting: 0, precinctsParticipating: 0, options, local: {} };
  return (
    <div className="block statewide">
      <div className="block-h">{label}</div>
      {entry.reporting && <div className="reporting">{entry.reporting}</div>}
      {entry.called && <div className="called">Projected winner: {entry.called}</div>}
      <Bars options={options} votes={(o) => o.votes} voteFor={race.voteFor || 1} race={race} contest={pseudo} final={false} />
      <div className="muted small">
        Entered by hand{manual?.source ? <> from {manual.sourceUrl ? <a href={manual.sourceUrl} target="_blank" rel="noopener noreferrer">{manual.source}</a> : manual.source}</> : null}
        {manual?.updatedAt ? <>, as of {when(manual.updatedAt)}</> : null}. Not live.
      </div>
    </div>
  );
}

function useResults() {
  const [data, setData] = useState<RLatest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(RESULTS_URL + "?t=" + Date.now(), { cache: "no-store" });
        if (r.status === 404) { if (alive) { setData(null); setError(null); setLoadedAt(new Date()); } return; }
        if (!r.ok) throw new Error("HTTP " + r.status);
        const j = (await r.json()) as RLatest;
        if (alive) { setData(j); setError(null); setLoadedAt(new Date()); }
      } catch (e: any) {
        if (alive) setError(String(e.message || e));
      }
    };
    load();
    const t = setInterval(load, REFRESH_MS);
    const onVis = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVis);
    return () => { alive = false; clearInterval(t); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return { data, error, loadedAt };
}

const SCOPE_NOTE: Record<Race["scope"], string> = {
  statewide: "Summit County votes only. The statewide winner is decided by all 88 counties.",
  "multi-county": "Summit County votes only. This district extends beyond the county.",
  county: "Countywide race: these are the full results.",
  city: "City of Twinsburg question: these are the full results.",
};

function partyClass(p?: string) {
  const s = (p || "").toLowerCase();
  if (s.startsWith("rep") || s === "r") return "party-r";
  if (s.startsWith("dem") || s === "d") return "party-d";
  if (s.startsWith("lib") || s === "l") return "party-l";
  return "party-o";
}
const partyAbbr = (p?: string) => {
  const s = (p || "").toLowerCase().trim();
  if (!s || s.startsWith("nonpartisan")) return "";
  if (s.startsWith("rep") || s === "r") return "R";
  if (s.startsWith("dem") || s === "d") return "D";
  if (s.startsWith("lib") || s === "l") return "L";
  if (s.startsWith("nonparty") || s.startsWith("ind")) return "Ind.";
  if (s.startsWith("other")) return "Other";
  return p!.length <= 6 ? p! : p!.slice(0, 5);
};

function Bars({ options, votes, voteFor, race, contest, final }: {
  options: ROption[]; votes: (o: ROption) => number; voteFor: number; race?: Race; contest: RContest; final: boolean;
}) {
  const total = options.reduce((s, o) => s + votes(o), 0);
  const ranked = [...options].filter((o) => !(/^write-?in/i.test(o.name) && votes(o) === 0)).sort((a, b) => votes(b) - votes(a));
  const top = new Set(total > 0 ? ranked.slice(0, voteFor).map((o) => o.id) : []);
  // Don't mark a leader when tied at the cutoff.
  if (total > 0 && ranked.length > voteFor && votes(ranked[voteFor - 1]) === votes(ranked[voteFor])) top.clear();
  return (
    <div className="bars">
      {ranked.map((o) => {
        const v = votes(o);
        const pct = total ? (100 * v) / total : 0;
        const cand = race ? candidateForOption(race, contest, o) : undefined;
        const party = o.party || cand?.party || "";
        const ab = partyAbbr(party) || partyAbbr(cand?.party);
        return (
          <div key={o.id} className={"bar-row" + (top.has(o.id) ? " leading" : "")}>
            <div className="bar-label">
              <span className="bar-name">
                {cand?.name ?? titleCase(o.name)}
                {ab && <span className={"pchip " + partyClass(ab)}>{ab}</span>}
                {cand?.incumbent && <span className="inc">inc.</span>}
                {top.has(o.id) && <span className={"lead-tag" + (final ? " final" : "")}>{final ? "✓ Won (unofficial)" : "Leading"}</span>}
              </span>
              <span className="bar-num">{fmt.format(v)} <span className="pct">{pct.toFixed(1)}%</span></span>
            </div>
            <div className="bar-track"><div className={"bar-fill " + partyClass(ab)} style={{ width: pct + "%" }} /></div>
          </div>
        );
      })}
      {total === 0 && <div className="muted small">No votes reported yet.</div>}
    </div>
  );
}

function titleCase(s: string) {
  if (s !== s.toUpperCase()) return s;
  return s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\bMc([a-z])/g, (_m, c) => "Mc" + c.toUpperCase());
}

function ContestCard({ race, contest, locality, title, localFirst = false, manual = null }: { race?: Race; contest: RContest; locality?: Locality; title?: string; localFirst?: boolean; manual?: Manual | null }) {
  const loc = locality?.resultsLocality ? contest.local?.[locality.resultsLocality] : undefined;
  const countyDone = contest.precinctsParticipating > 0 && contest.precinctsReporting >= contest.precinctsParticipating;
  const scope = race?.scope;
  const canCall = scope === "county" || scope === "city";
  const finalCounty = canCall && countyDone;
  return (
    <div className="card contest">
      <div className="contest-head">
        <h3>{title ?? race?.title ?? titleCase(contest.name)}</h3>
        {race?.guideAnchor && <a className="small" href={`#/guide?s=${race.guideAnchor}`}>About this race</a>}
      </div>
      {scope && <div className={"scope-note scope-" + scope}>{SCOPE_NOTE[scope]}</div>}
      {race && (scope === "statewide" || scope === "multi-county") && <StatewideBlock race={race} manual={manual} />}
      {(() => {
        const total = (
          <div className="block">
            <div className="block-h">Summit County total</div>
            <div className="reporting">{contest.precinctsReporting} of {contest.precinctsParticipating} precincts reporting</div>
            <Bars options={contest.options} votes={(o) => o.votes} voteFor={contest.voteFor} race={race} contest={contest} final={finalCounty && scope === "county"} />
          </div>
        );
        // A city-only question: the Twinsburg precincts ARE the total, so show it once.
        if (!loc || scope === "city") {
          if (loc && scope === "city") {
            return (
              <div className="block">
                <div className="block-h">Total ({locality!.label})</div>
                <div className="reporting">{loc.reported} of {loc.precincts} precincts reporting{loc.complete < loc.precincts && loc.reported > 0 ? ` (${loc.complete} complete)` : ""}</div>
                <Bars options={contest.options} votes={(o) => o.votes} voteFor={contest.voteFor} race={race} contest={contest}
                  final={loc.precincts > 0 && loc.complete >= loc.precincts && countyDone} />
              </div>
            );
          }
          return total;
        }
        return (
          <div className={"blocks" + (localFirst ? " local-first" : "")}>
            {total}
            <div className="block">
              <div className="block-h">{locality!.label}</div>
              <div className="reporting">{loc.reported} of {loc.precincts} city precincts reporting{loc.complete < loc.precincts && loc.reported > 0 ? ` (${loc.complete} complete)` : ""}</div>
              <Bars options={contest.options} votes={(o) => loc.votes[o.id] || 0} voteFor={contest.voteFor} race={race} contest={contest} final={false} />
            </div>
          </div>
        );
      })()}
      {contest.voteFor > 1 && <div className="muted small">Vote for up to {contest.voteFor}. The top {contest.voteFor} win.</div>}
    </div>
  );
}

function Status({ data, loadedAt, error }: { data: RLatest | null; loadedAt: Date | null; error: string | null }) {
  const now = Date.now();
  const closeAt = Date.parse(election.pollsClose);
  const src = data?.sources?.summit;
  const contests = src?.contests || [];
  const biggest = contests.reduce<RContest | undefined>((a, c) => (!a || c.precinctsParticipating > a.precinctsParticipating ? c : a), undefined);
  const reporting = biggest ? `${biggest.precinctsReporting} of ${biggest.precinctsParticipating} county precincts reporting` : null;
  const allIn = biggest && biggest.precinctsParticipating > 0 && biggest.precinctsReporting >= biggest.precinctsParticipating;
  const stale = data?.checkedAt && now - Date.parse(data.checkedAt) > 20 * 60_000 && now > closeAt && now < closeAt + 12 * 3600_000;
  let phase: string;
  if (now < closeAt) phase = `Polls close at ${timeFmt.format(new Date(closeAt))} ET. The county's first update (early and mail-in votes) usually comes by about 8 PM.`;
  else if (!src) phase = "Waiting for the county's first results upload.";
  else if (allIn) phase = "All precincts have reported. These are unofficial election-night results. Late-arriving mail ballots and provisional ballots are added in the official count, usually 2–3 weeks later.";
  else phase = "Unofficial results are coming in. Numbers will change as more precincts report.";
  return (
    <div className={"status card" + (allIn ? " status-final" : now >= closeAt ? " status-live" : "")}>
      <div className="status-line">
        <span className={"dot" + (now >= closeAt && !allIn ? " pulse" : "")} />
        <strong>{now < closeAt ? "Before polls close" : allIn ? "Election night count complete" : "Live: unofficial results"}</strong>
      </div>
      {reporting && <div className="muted small">{reporting}</div>}
      <p>{phase}</p>
      <div className="small muted">
        County data updated {when(src?.sourceUpdatedAt)} · Checked {when(data?.checkedAt)} · Page refreshed {loadedAt ? timeFmt.format(loadedAt) : "—"} ET
        {src?.publicUrl && <> · <a href={src.publicUrl} target="_blank" rel="noopener noreferrer">Official county results</a></>}
      </div>
      {stale && <div className="warn small">The results feed hasn't been checked in over 20 minutes. Check the official county results link above for the latest numbers.</div>}
      {error && <div className="warn small">Couldn't refresh: {error}. Retrying every minute.</div>}
    </div>
  );
}

export default function Results() {
  const { data, error, loadedAt } = useResults();
  const manual = useStatewide();
  const locality = election.localities[0];
  const [view, setView] = useState<"ballot" | "all">("ballot");
  const [q, setQ] = useState("");
  const contests = data?.sources?.summit?.contests || [];

  const matched = useMemo(() => {
    const races = election.races.filter((r) => locality.districts.includes(r.district));
    return races.map((race) => ({ race, contest: matchRace(race, contests) }));
  }, [contests, locality]);
  const missing = matched.filter((m) => !m.contest);
  const groups = [...new Set(matched.map((m) => m.race.group))];

  const all = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return contests.filter((c) => !needle || c.name.toLowerCase().includes(needle) || c.options.some((o) => o.name.toLowerCase().includes(needle)));
  }, [contests, q]);

  return (
    <div className="page">
      <h1>Results: {election.name}</h1>
      <Status data={data} loadedAt={loadedAt} error={error} />

      <div className="tabs big">
        <button className={view === "ballot" ? "on" : ""} onClick={() => setView("ballot")}>{locality.label} ballot</button>
        <button className={view === "all" ? "on" : ""} onClick={() => setView("all")}>All Summit County contests{contests.length ? ` (${contests.length})` : ""}</button>
      </div>

      {view === "ballot" && (
        <>
          {!contests.length && (
            <div className="card muted">
              Results will appear here automatically once the Summit County Board of Elections publishes its first update after polls close. This page checks every minute.
            </div>
          )}
          {contests.length > 0 && groups.map((g) => {
            const items = matched.filter((m) => m.race.group === g && m.contest);
            if (!items.length) return null;
            return (
              <section key={g}>
                <h2>{g}</h2>
                {items.map(({ race, contest }) => <ContestCard key={race.id} race={race} contest={contest!} locality={locality} manual={manual} />)}
              </section>
            );
          })}
          {contests.length > 0 && missing.length > 0 && (
            <div className="card small muted">
              Not found in the county's feed yet: {missing.map((m) => m.race.title).join("; ")}. Use the "All Summit County contests" tab to search for them.
            </div>
          )}
          <div className="card small">
            <strong>Statewide totals</strong>
            <p>This page uses Summit County's results feed. For statewide races, the outcome depends on every county:</p>
            <ul>{election.statewideLinks.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}</ul>
          </div>
        </>
      )}

      {view === "all" && (
        <>
          <input className="search" placeholder="Search contests or candidates (e.g. Hudson, levy, Issue)" value={q} onChange={(e) => setQ(e.target.value)} />
          {!contests.length && <div className="card muted">No results published yet.</div>}
          {all.map((c) => <ContestCard key={c.id} contest={c} />)}
        </>
      )}
    </div>
  );
}
