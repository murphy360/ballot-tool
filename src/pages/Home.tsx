import { useState } from "react";
import { election } from "../data/2026-11-03";

const dateFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" });
const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

const PARTY: Record<string, string> = { R: "party-r", D: "party-d", L: "party-l" };

export default function Home() {
  const [locId, setLocId] = useState(election.localities[0].id);
  const locality = election.localities.find((l) => l.id === locId)!;
  const races = election.races.filter((r) => locality.districts.includes(r.district));
  const groups = [...new Set(races.map((r) => r.group))];
  const now = Date.now();
  const open = Date.parse(election.pollsOpen), close = Date.parse(election.pollsClose);
  const phase = now < open ? "upcoming" : now < close ? "voting" : "counting";

  return (
    <div className="page">
      <h1>{election.name}</h1>
      <p className="summary">{dateFmt.format(new Date(election.date + "T12:00:00Z"))}. Polls are open {timeFmt.format(new Date(open))} to {timeFmt.format(new Date(close))} ET.</p>

      <div className="card where">
        <label htmlFor="loc"><strong>Where do you vote?</strong></label>
        <select id="loc" value={locId} onChange={(e) => setLocId(e.target.value)}>
          {election.localities.map((l) => <option key={l.id} value={l.id}>{l.label}, {l.county} County, {l.state}</option>)}
        </select>
        <div className="small muted">Twinsburg is the only area covered so far. Looking up your ballot by street address is planned.</div>
        {locality.notes && <div className="small">{locality.notes}</div>}
      </div>

      <div className="cta-row">
        <a className={"cta" + (phase !== "upcoming" ? " primary" : "")} href="#/results">{phase === "counting" ? "See live results" : "Results page"}</a>
        <a className="cta" href="#/guide">Read the full guide</a>
        <a className="cta" href="#/quiz">Take the alignment quiz</a>
      </div>

      <h2>On your ballot</h2>
      {groups.map((g) => (
        <section key={g}>
          <h3 className="group-h">{g}</h3>
          <div className="race-list">
            {races.filter((r) => r.group === g).map((r) => (
              <a key={r.id} className="race-item" href={r.guideAnchor ? `#/guide?s=${r.guideAnchor}` : "#/guide"}>
                <div className="race-title">{r.title}</div>
                {r.summary && <div className="small muted">{r.summary}</div>}
                {r.candidates && (
                  <div className="cands">
                    {r.candidates.map((c) => (
                      <span key={c.name} className="cand">
                        {c.party && <span className={"pchip " + (PARTY[c.party] || "party-o")}>{c.party}</span>}
                        {c.name}{c.incumbent ? " (inc.)" : ""}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
