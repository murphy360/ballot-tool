import { Page, Section, Text, Callout, LinkCards, useState } from "../canvas";

type Pos = { [topic: string]: number | null };
type Cand = { name: string; party: string; pos: Pos; note?: string };
type Race = { id: string; name: string; pick?: number; note?: string; candidates: Cand[] };

const TOPICS: any[] = [
  { id: "tax", label: "Taxes", q: "Cutting income and property taxes should be a top priority, even if it means less government spending.", ctx: "Covers the 2025 federal tax law, Ohio's flat income tax and property-tax caps." },
  { id: "schoolfund", label: "School funding", q: "The state should pay more of public school costs, such as fully funding the Fair School Funding Plan, so schools rely less on local levies.", ctx: "Twinsburg City Schools' income tax failed in May 2026." },
  { id: "vouchers", label: "EdChoice vouchers", q: "EdChoice private-school vouchers should be scaled back.", ctx: "EdChoice is open to almost all students. A state appeals court ruled it unconstitutional in Oct 2026; an appeal is expected." },
  { id: "abortion", label: "Abortion access", q: "The abortion access protected by Ohio's 2023 constitutional amendment (Issue 1) should be preserved, with no new restrictions.", ctx: "Issue 1 passed 57% to 43% in 2023." },
  { id: "aca", label: "Health insurance costs", q: "Congress should extend the enhanced ACA premium tax credits, which expired at the end of 2025, to keep marketplace premiums lower.", ctx: "Applies to the U.S. Senate and House races." },
  { id: "insurance", label: "Insurer denials", q: "Government should bar insurers from denying care a patient's doctor says is needed, and fine insurers that wrongly deny claims.", ctx: "Proposed by the Brown campaign; no bill text was found, and no other candidate's position was found." },
  { id: "security", label: "Border and immigration", q: "Stronger border and immigration enforcement, including local cooperation with ICE, should be a priority.", ctx: "" },
  { id: "guns", label: "Gun policy", q: "Ohio and federal law should add gun-safety measures such as universal background checks and red-flag laws.", ctx: "Ohio has allowed permitless concealed carry since 2022. A red-flag law lets a court temporarily remove guns from someone found to be dangerous." },
  { id: "energy", label: "Data centers and electric bills", q: "Ohio should stop giving tax breaks to new data centers, and limit or pause new ones until household electric bills are protected.", ctx: "Nearly every candidate says data centers should pay their own power costs. They differ on tax breaks and on pausing new projects." },
  { id: "marijuana", label: "Marijuana", q: "Ohio should keep the 2023 voter-approved marijuana law (Issue 2) as passed, rather than the legislature rolling parts of it back.", ctx: "Issue 2 passed with 57%. Senate Bill 56, in effect since March 2026, changed it and restricted intoxicating hemp products." },
  { id: "photoid", label: "Photo ID to vote", q: "Voters should have to show photo ID, including for mail voting, and the rule should be in the Ohio Constitution.", ctx: "State Issue 3 puts photo ID in the constitution. Photo ID at the polls is already state law." },
  { id: "redistrict", label: "Redistricting", q: "Ohio should replace its politician-run redistricting commission with an independent citizens' commission.", ctx: "A 2024 amendment to do this (Issue 1) failed 54% to 46%. The governor, secretary of state and auditor sit on the current commission." },
  { id: "checks", label: "Divided government", q: "I'd prefer more divided government: the U.S. Senate majority and Ohio state government should not all be controlled by one party.", ctx: "Today Republicans hold the U.S. Senate (53-47), the Ohio House (65-34) and Senate (24-9), every statewide executive office, and 6 of 7 Ohio Supreme Court seats. Agreeing favors Democrats in those races; disagreeing favors Republicans. This is separate from the party shortcut above." },
  { id: "ethics", label: "Ethics and corruption", q: "Cleaning up after the HB 6 bribery scandal, and a candidate's own ethics record, should weigh heavily in my vote.", ctx: "Counts only if you agree. A documented record was found only in the Treasurer race.", oneSided: true },
  { id: "ratings", label: "Judicial ratings", q: "In court races, bar association ratings and experience should matter more than party.", ctx: "Counts only if you agree. Uses Akron Bar ratings (Appeals) and Judge4Yourself ratings (Supreme Court).", oneSided: true },
];

const R = (name: string, pos: Pos, note?: string): Cand => ({ name, party: "R", pos, note });
const D = (name: string, pos: Pos, note?: string): Cand => ({ name, party: "D", pos, note });

const RACES: Race[] = [
  { id: "sen", name: "U.S. Senate (special election)", candidates: [
    R("Jon Husted", { tax: 1, vouchers: -1, abortion: -1, aca: 0.5, security: 1, guns: -1, energy: -0.5, checks: -1 }, "Incumbent (appointed 2025). Backed the 2025 tax law; helped create EdChoice; 'champion for life'; wants more border and ICE funding. Filed a bill to extend ACA credits 2 years with changes, but voted against debating a separate extension. Buckeye Firearms: A. Backed data-center tax breaks as lieutenant governor; his Ratepayer Protection Act would have data centers pay grid costs. No position found on insurer denials."),
    D("Sherrod Brown", { tax: -1, vouchers: 1, abortion: 1, aca: 1, insurance: 1, security: 0, guns: 1, energy: 0.5, checks: 1 }, "Former senator. Opposes the 2025 tax law and vouchers; supports abortion access; attacks Husted over lost ACA coverage; pledges to fine insurer denials. Buckeye Firearms: F. Would end data-center tax breaks and make them pay full utility costs; hasn't backed a pause. Mixed security record."),
    { name: "Bill Redpath", party: "L", pos: {}, note: "Libertarian. Would abolish tariffs and the federal Education Department; no stances found on these topics." },
    { name: "Greg Levy", party: "Other", pos: {}, note: "Socialist, not a major-party nominee. Supports single-payer health care, which doesn't map onto these questions." },
  ] },
  { id: "h13", name: "U.S. House, 13th District", candidates: [
    R("Carey Coleman", { abortion: -1, security: 1 }, "Radio host. Campaigns on border security and fiscal discipline; endorsed by Ohio Right to Life."),
    D("Emilia Sykes", { tax: -1, abortion: 1, aca: 1 }, "Incumbent. Voted against the 2025 tax law; voted in Jan 2026 to extend ACA credits through 2028; rated pro-abortion-rights by Reproductive Freedom for All."),
    { name: "Sandeep Dixit", party: "Ind.", pos: {}, note: "Independent. Campaigns on education, jobs and affordability, too general to score." },
  ] },
  { id: "gov", name: "Governor", candidates: [
    R("Vivek Ramaswamy", { tax: 1, schoolfund: 0, vouchers: -1, abortion: -1, guns: -1, energy: 0, marijuana: -0.5, checks: -1 }, "Property-tax and electric-bill relief; won't commit to the Fair School Funding Plan; keeps EdChoice; pro-life. Would let 18-20-year-olds buy handguns; opposes red-flag laws (Buckeye Firearms: A+). Wants statewide data-center standards rather than a pause. Voted no on 2023's Issue 2 but backs federal legalization."),
    D("Amy Acton", { tax: 0, schoolfund: 1, vouchers: 0.5, abortion: 1, guns: 1, energy: 1, marijuana: 1, redistrict: 1, checks: 1 }, "Working-families tax cut but no further income-tax cuts; would fully fund the plan; wants voucher accountability; supports abortion rights. Backs background checks and red-flag laws. Proposes a conditional data-center moratorium. Voted yes on Issue 2. Would push a new redistricting amendment."),
    { name: "Don Kissick", party: "L", pos: { tax: 1, schoolfund: 0.5, vouchers: 0, abortion: 1, guns: -0.5, energy: 1, marijuana: 1 }, note: "Libertarian. Would phase out property taxes. Has said both that EdChoice should target the families with the greatest barriers and that he'd keep it with accountability. Personally opposes abortion but would respect Issue 1. Backs handgun access at 18, with a focus on violence prevention. Wants an immediate data-center moratorium. Would keep Issue 2." },
  ] },
  { id: "ag", name: "Attorney General", candidates: [
    R("Keith Faber", { security: 1, abortion: -1, guns: -1, checks: -1 }, "Current state auditor. Calls local cooperation with immigration enforcement 'key'; endorsed by Ohio Right to Life; Buckeye Firearms: A+."),
    D("John J. Kulewicz", { security: 0, abortion: 1, checks: 1 }, "Attorney. Would comply with immigration enforcement but not make it a priority; endorsed by Planned Parenthood."),
  ] },
  { id: "sos", name: "Secretary of State", candidates: [
    R("Robert Sprague", { photoid: 1, abortion: -1, guns: -1, redistrict: -1, checks: -1 }, "Current treasurer. Wants photo ID for mail voting and no drop boxes; says the current redistricting system worked; Ohio Right to Life; Buckeye Firearms: A."),
    D("Allison Russo", { photoid: -1, abortion: 1, guns: 1, redistrict: 1, checks: 1 }, "State representative and former redistricting commissioner. Voted against putting Issue 3 on the ballot; calls the redistricting system broken; supported Issue 1 (2023); Buckeye Firearms: F."),
    { name: "Tom Pruss", party: "L", pos: {}, note: "Libertarian. Wants open election data and fewer petition hurdles; none of these topics apply." },
  ] },
  { id: "aud", name: "Auditor", candidates: [
    R("Frank LaRose", { abortion: -1, guns: -1, checks: -1 }, "Current secretary of state. Endorsed by Ohio Right to Life; Buckeye Firearms: A. Led the August 2023 effort to raise the amendment threshold to 60%."),
    D("Annette Blackwell", { abortion: 1, checks: 1 }, "Maple Heights mayor. Endorsed by Planned Parenthood; got her city out of fiscal emergency."),
  ] },
  { id: "tre", name: "Treasurer", candidates: [
    R("Jay Edwards", { tax: 1, vouchers: -1, guns: -1, energy: 0.5, ethics: -1, checks: -1 }, "Former House Finance chair. Signed petitions to abolish property taxes; helped pass universal EdChoice; criticizes 'massive tax breaks' for data centers; Buckeye Firearms: A. Voted for HB 6 and against expelling Householder (never charged)."),
    D("Seth Walsh", { abortion: 1, energy: 0.5, ethics: 0.5, checks: 1 }, "Cincinnati council member. Endorsed by Planned Parenthood; opposes special data-center tax breaks. A 2023 aide complaint found insufficient evidence of misuse of city resources."),
  ] },
  { id: "sc1", name: "Ohio Supreme Court (term starts Jan 1)", candidates: [
    R("Daniel R. Hawkins", { abortion: -1, ratings: -0.33, checks: -1 }, "Incumbent. Rated Satisfactory, Satisfactory and Not Recommended. Endorsed by Ohio Right to Life and Buckeye Firearms."),
    D("Marilyn Zayas", { abortion: 1, ratings: 0.83, checks: 1 }, "Appeals judge. Rated Excellent, Excellent and Good. Endorsed by Planned Parenthood."),
  ] },
  { id: "sc2", name: "Ohio Supreme Court (term starts Jan 2)", candidates: [
    R("Colleen O'Donnell", { abortion: -1, ratings: -0.17, checks: -1 }, "Former immigration judge. Rated Satisfactory, Not Recommended and Good. Endorsed by Ohio Right to Life and Buckeye Firearms."),
    D("Jennifer Brunner", { abortion: 1, ratings: 1, checks: 1 }, "Incumbent; the court's only Democrat. Rated Excellent by all three groups. Endorsed by Planned Parenthood."),
  ] },
  { id: "ap1", name: "9th District Court of Appeals (full term)", candidates: [
    D("Betty Sutton", { ratings: 0.5 }, "Incumbent. Akron Bar: Good."),
    R("Cynthia Curtin", { ratings: 0 }, "Akron Bar: Adequate."),
  ] },
  { id: "ap2", name: "9th District Court of Appeals (unexpired term)", candidates: [
    R("Nathan Manning", { ratings: 0.5 }, "Appointed incumbent. Akron Bar: Good."),
    D("Tavia Galonski", { ratings: 0.5 }, "Akron Bar: Good. Both have the same rating."),
  ] },
  { id: "sd27", name: "Ohio Senate, District 27", candidates: [
    R("Steve Demetriou", { tax: 1, schoolfund: -0.5, vouchers: -1, abortion: -1, guns: -1, energy: 1, checks: -1 }, "State representative. Voted for HB 186's property-tax cap and the 2025 budget, which did not fully fund the plan; backs school choice; Ohio Right to Life; Buckeye Firearms: A. Sponsored HB 710 to ban public incentives for new data centers and keep their costs off household bills."),
    D("Mike Roberto", { tax: 0, schoolfund: 1, vouchers: 1, abortion: 1, guns: 1, checks: 1 }, "Retired superintendent. Property-tax relief for seniors and those in need; would fully fund public schools; criticizes voucher spending; supports abortion rights, universal background checks and red-flag laws."),
  ] },
  { id: "hd35", name: "Ohio House, District 35", candidates: [
    R("Vik Sandhu", { tax: 1, abortion: -1, checks: -1 }, "Twinsburg small-business owner. Wants a lower income tax and capped property taxes; supports more affordable housing; endorsed by Ohio Right to Life. No school-funding, gun or energy position found."),
    D("Samantha Salamon", { tax: 0, schoolfund: 1, abortion: 1, checks: 1 }, "Attorney. Wants to fund public schools while easing property taxes; endorsed by Planned Parenthood."),
  ] },
  { id: "cc", name: "Summit County Council at large", pick: 3, note: "No documented issue positions were found for any candidate, so only the party shortcut can suggest picks here.", candidates: [
    D("Erin Dickinson", {}, "Incumbent; council president."),
    D("Elizabeth Walters", {}, "Incumbent since 2016."),
    D("John A. Donofrio", {}, "Incumbent; retired county fiscal officer."),
    R("Shane R. Barker", {}, "Retired sheriff's office captain; Macedonia council."),
    R("Jonathon D. Bollas", {}, "Tallmadge council; IT project manager."),
    R("John Chapman", {}, "Cuyahoga Falls attorney."),
  ] },
];

const JUDGES = [
  ["Common Pleas, Jan 2", "O'Brien (inc.): Excellent. Nemer: Good."],
  ["Common Pleas, Jan 3", "McLaughlin (inc.): unopposed."],
  ["Common Pleas, Jan 5", "McCarty (inc.): Excellent. Perry: Good."],
  ["Common Pleas, Jan 6", "Rowlands (inc.): Excellent. Makra: Not Acceptable."],
  ["Common Pleas, Feb 9", "Croce (inc.): Excellent. J. Galonski: Good."],
  ["Common Pleas, May 1", "Oldfield (inc.): Excellent. Darwal: Adequate."],
  ["Juvenile", "Corrigall Jones: Excellent. Lombardi: Good (2018 $1,200 campaign-literature fine)."],
  ["Domestic Relations", "Cook (inc.): Excellent. Dean: Good."],
  ["Probate", "Elliott: Excellent. Stevenson: Excellent."],
];

const PARTIES = [
  { v: "R", l: "Republican" },
  { v: "D", l: "Democrat" },
  { v: "L", l: "Libertarian" },
  { v: "I", l: "Independent / none" },
  { v: "N", l: "No party preference" },
];
const PARTY_NAME: any = { R: "Republican", D: "Democratic", L: "Libertarian", I: "independent or minor-party" };
const BONUS = 5;

const SCALE = [
  { v: 1, l: "Agree" },
  { v: 0.5, l: "Lean agree" },
  { v: 0, l: "Neutral" },
  { v: -0.5, l: "Lean disagree" },
  { v: -1, l: "Disagree" },
];
const WEIGHTS = [{ v: 1, l: "Low" }, { v: 2, l: "Medium" }, { v: 3, l: "High" }];

const match = (u: number, p: number) => 1 - Math.abs(u - p) / 2;
const fits = (p: string | undefined, c: Cand) =>
  p === "R" ? c.party === "R" : p === "D" ? c.party === "D" : p === "L" ? c.party === "L" : p === "I" ? c.party === "Ind." || c.party === "Other" : false;

const btn = (on: boolean): any => ({
  padding: "8px 10px", margin: "3px", borderRadius: 8, fontSize: 14, cursor: "pointer",
  border: on ? "2px solid #2563eb" : "1px solid rgba(128,128,128,0.45)",
  background: on ? "rgba(37,99,235,0.15)" : "transparent", color: "inherit", fontWeight: on ? 600 : 400,
});
const card: any = { border: "1px solid rgba(128,128,128,0.35)", borderRadius: 10, padding: 12, margin: "10px 0" };
const partyColor = (p: string) => (p === "R" ? "#dc2626" : p === "D" ? "#2563eb" : "#7c3aed");
const chip = (bg: string): any => ({ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: bg, color: "#fff", marginRight: 6 });

export default function App() {
  const [ans, setAns] = useState<{ [k: string]: number | undefined }>({});
  const [wt, setWt] = useState<{ [k: string]: number }>({});
  const [party, setParty] = useState<string | undefined>(undefined);
  const w = (id: string) => wt[id] ?? 2;
  const active = (t: any) => {
    const a = ans[t.id];
    if (a === undefined) return false;
    if (t.oneSided && a <= 0) return false;
    return true;
  };

  const score = (c: Cand) => {
    let num = 0, den = 0, n = 0;
    for (const t of TOPICS) {
      if (!active(t)) continue;
      const p = c.pos[t.id];
      if (p === undefined || p === null) continue;
      num += w(t.id) * match(ans[t.id] as number, p);
      den += w(t.id);
      n++;
    }
    return { pct: den ? Math.round((100 * num) / den) : null, n };
  };

  const recommend = (r: Race, scored: any[]) => {
    const k = r.pick ?? 1;
    const partyC = r.candidates.filter((c) => fits(party, c));
    const withScore = scored.filter((x) => x.s.pct !== null);
    const partyUnscored = partyC.length > 0 && partyC.some((pc) => scored.find((x) => x.c === pc).s.pct === null);
    if (withScore.length === 0 || partyUnscored) {
      if (partyC.length > 0) {
        return { mode: "party", picks: partyC.slice(0, k), msg: withScore.length > 0 ? "Your answered topics have no known position for this party's candidate, so the party default stands." : "" };
      }
      return { mode: "none", picks: [], msg: party && party !== "N" ? "No " + PARTY_NAME[party] + " candidate in this race." : "" };
    }
    const eff = withScore.map((x) => ({ ...x, e: x.s.pct + (fits(party, x.c) ? BONUS : 0) })).sort((a, b) => b.e - a.e);
    const raw = [...withScore].sort((a, b) => b.s.pct - a.s.pct);
    const picks = eff.slice(0, k).map((x) => x.c);
    const rawPicks = raw.slice(0, k).map((x) => x.c);
    const notes: string[] = [];
    let flag = false;
    if (eff.length > k && eff[k - 1].e === eff[k].e) notes.push("Tied on your answers; your call.");
    if (partyC.length > 0) {
      if (!picks.some((c) => fits(party, c))) { flag = true; }
      else {
        const pp = eff.find((x) => fits(party, x.c) && picks.includes(x.c));
        const rival = withScore.some((x) => !picks.includes(x.c) && pp && x.s.pct >= pp.s.pct);
        if (rival || rawPicks.some((c, i) => c !== picks[i])) notes.push("Close call: your party preference broke a tie or near-tie.");
      }
    }
    const minN = Math.min(...eff.slice(0, k).map((x) => x.s.n));
    if (minN === 1) notes.push("Based on only one topic.");
    return { mode: "issues", picks, msg: notes.join(" "), flag };
  };

  const answered = TOPICS.filter((t) => ans[t.id] !== undefined).length;
  const anyActive = TOPICS.some(active);
  const idAns = ans["photoid"];
  const partySet = party !== undefined && party !== "N";

  const Bar = ({ pct, color }: { pct: number | null; color: string }) => (
    <div style={{ height: 8, background: "rgba(128,128,128,0.2)", borderRadius: 4, overflow: "hidden", marginTop: 4 }}>
      {pct !== null && <div style={{ width: pct + "%", height: "100%", background: color }} />}
    </div>
  );

  const results = RACES.map((r) => {
    const scored = r.candidates.map((c) => ({ c, s: score(c) })).sort((a, b) => (b.s.pct ?? -1) - (a.s.pct ?? -1));
    return { r, scored, rec: recommend(r, scored) };
  });

  const RecLine = ({ rec }: { rec: any }) => {
    if (rec.mode === "none") return rec.msg ? <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>{rec.msg}</div> : null;
    return (
      <div style={{ marginTop: 6, fontSize: 14 }}>
        <span style={chip(rec.mode === "party" ? "#6b7280" : "#16a34a")}>{rec.mode === "party" ? "From party" : "From issues"}</span>
        {rec.flag && <span style={chip("#d97706")}>Differs from party</span>}
        <b>{rec.picks.map((c: Cand) => c.name).join(", ")}</b>
        {rec.flag && <div style={{ fontSize: 13, marginTop: 3 }}>Your issue answers point away from the {PARTY_NAME[party as string]} candidate in this race.</div>}
        {rec.msg && <div style={{ fontSize: 13, opacity: 0.75, marginTop: 3 }}>{rec.msg}</div>}
      </div>
    );
  };

  return (
    <Page
      title="Nov 3, 2026 ballot alignment quiz (City of Twinsburg, OH)"
      summary="Pick a party shortcut, answer plain-language questions, or both, and see how closely each candidate's sourced positions match yours. Nothing is pre-filled and nothing is saved."
      width="column"
    >
      <Callout tone="info" lead="How to use">
        Start with the optional party shortcut, then answer any questions you like and skip the rest. Your issue answers decide each race; the party choice only breaks near-ties or fills races your answers don't cover. Two people can each take it separately; tap Reset to start over.
      </Callout>

      <Section heading="Start here: vote by party (optional)" caption="Fills in that party's candidate in each partisan race. Your answers below override it.">
        <div style={card}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {PARTIES.map((p) => (
              <button key={p.v} style={btn(party === p.v)} onClick={() => setParty(party === p.v ? undefined : p.v)}>{p.l}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>
            Libertarians are running only for U.S. Senate, Governor and Secretary of State. "Independent / none" picks the independent or minor-party candidates in the U.S. Senate and U.S. House 13 races. County judges are unaffected.
          </div>
        </div>
      </Section>

      <Section heading={"Questions (" + answered + " of " + TOPICS.length + " answered)"}>
        {TOPICS.map((t, i) => (
          <div key={t.id} style={card}>
            <div style={{ fontSize: 13, opacity: 0.7 }}>{i + 1}. {t.label}</div>
            <div style={{ fontWeight: 600, margin: "4px 0 6px" }}>{t.q}</div>
            {t.ctx && <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>{t.ctx}</div>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {SCALE.map((s) => (
                <button key={s.l} style={btn(ans[t.id] === s.v)} onClick={() => setAns({ ...ans, [t.id]: ans[t.id] === s.v ? undefined : s.v })}>{s.l}</button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: 4, fontSize: 13 }}>
              <span style={{ marginRight: 4, opacity: 0.75 }}>Importance:</span>
              {WEIGHTS.map((x) => (
                <button key={x.l} style={{ ...btn(w(t.id) === x.v), padding: "4px 8px", fontSize: 13 }} onClick={() => setWt({ ...wt, [t.id]: x.v })}>{x.l}</button>
              ))}
            </div>
          </div>
        ))}
        <button style={btn(false)} onClick={() => { setAns({}); setWt({}); setParty(undefined); }}>Reset everything</button>
      </Section>

      <Section heading="Your ballot at a glance" caption="One line per race. Green means your issue answers decided it; gray means the party shortcut did.">
        {!anyActive && !partySet && <Text>Choose a party or answer a question to see suggestions.</Text>}
        {(anyActive || partySet) && results.map(({ r, rec }) => (
          <div key={r.id} style={{ fontSize: 14, padding: "6px 0", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>
            <div style={{ opacity: 0.75 }}>{r.name}</div>
            {rec.mode === "none" ? <div style={{ opacity: 0.6 }}>{rec.msg || "No suggestion yet"}</div> : (
              <div>
                <span style={chip(rec.mode === "party" ? "#6b7280" : "#16a34a")}>{rec.mode === "party" ? "Party" : "Issues"}</span>
                {rec.flag && <span style={chip("#d97706")}>Differs from party</span>}
                <b>{rec.picks.map((c: Cand) => c.name).join(", ")}</b>
              </div>
            )}
          </div>
        ))}
      </Section>

      <Section heading="Your alignment by race" caption="The percent shows how closely your answers match each candidate on topics where their position is known. 'Insufficient data' means none of your answered topics has a known position for that candidate.">
        {results.map(({ r, scored, rec }) => (
          <div key={r.id} style={card}>
            <div style={{ fontWeight: 700 }}>{r.name}{r.pick ? " (vote for " + r.pick + ")" : ""}</div>
            {r.note && <div style={{ fontSize: 13, opacity: 0.75 }}>{r.note}</div>}
            <RecLine rec={rec} />
            {scored.map(({ c, s }) => (
              <div key={c.name} style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span><b style={{ color: partyColor(c.party) }}>{c.party}</b> {c.name}</span>
                  <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{s.pct === null ? (anyActive ? "Insufficient data" : "") : s.pct + "%"}</span>
                </div>
                <Bar pct={s.pct} color={partyColor(c.party)} />
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{s.pct === null ? "" : "Based on " + s.n + " topic" + (s.n === 1 ? "" : "s") + ". "}{c.note}</div>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section heading="Ballot issues">
        <div style={card}>
          <div style={{ fontWeight: 700 }}>State Issue 3: photo ID in the Ohio Constitution</div>
          {idAns === undefined ? (
            <div style={{ fontSize: 14, marginTop: 4 }}>Answer the photo ID question to see your alignment.</div>
          ) : (
            <div style={{ marginTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Yes</span><b>{Math.round(100 * match(idAns, 1))}%</b></div>
              <Bar pct={Math.round(100 * match(idAns, 1))} color="#16a34a" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span>No</span><b>{Math.round(100 * match(idAns, -1))}%</b></div>
              <Bar pct={Math.round(100 * match(idAns, -1))} color="#6b7280" />
            </div>
          )}
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Not affected by the party shortcut.</div>
        </div>
        <div style={card}>
          <div style={{ fontWeight: 700 }}>Issue 38: rezoning of 2570 Post Road (City of Twinsburg)</div>
          <div style={{ fontSize: 14, marginTop: 4 }}>Not scored: none of the quiz topics apply. It asks whether to rezone 3.2 acres from Public Facilities to single-family residential (R-3), and it involves no tax. Yes approves the rezoning; No rejects it.</div>
        </div>
      </Section>

      <Section heading="Alignment by topic" caption="For each topic you answered, the match in each race where at least one candidate has a known position.">
        {!anyActive && <Text>Answer a question to see topic-by-topic matches.</Text>}
        {TOPICS.filter(active).map((t) => (
          <div key={t.id} style={card}>
            <div style={{ fontWeight: 700 }}>{t.label}</div>
            {RACES.map((r) => {
              const known = r.candidates.filter((c) => c.pos[t.id] !== undefined && c.pos[t.id] !== null);
              if (known.length === 0) return null;
              const list = known.map((c) => ({ c, m: Math.round(100 * match(ans[t.id] as number, c.pos[t.id] as number)) })).sort((a, b) => b.m - a.m);
              const unknown = r.candidates.length - known.length;
              return (
                <div key={r.id} style={{ fontSize: 14, marginTop: 6 }}>
                  <span style={{ opacity: 0.75 }}>{r.name}: </span>
                  {list.map((x, i) => (
                    <span key={x.c.name}>{i > 0 ? " · " : ""}<b style={{ color: partyColor(x.c.party) }}>{x.c.name.split(" ").slice(-1)[0]}</b> {x.m}%</span>
                  ))}
                  {unknown > 0 && <span style={{ opacity: 0.6 }}> · {unknown} with insufficient data</span>}
                </div>
              );
            })}
          </div>
        ))}
      </Section>

      <Section heading="County judges (not scored)" caption="These races carry no party label on the ballot, and the judges don't take policy positions, so they are not scored and the party shortcut skips them. No party endorsements were found for them. Akron Bar Association ratings: Excellent, Good, Adequate, Not Acceptable.">
        {JUDGES.map(([k, v]) => (
          <div key={k} style={{ fontSize: 14, padding: "6px 0", borderBottom: "1px solid rgba(128,128,128,0.2)" }}><b>{k}:</b> {v}</div>
        ))}
        <div style={{ fontSize: 13, opacity: 0.75, marginTop: 8 }}>Ohio Supreme Court and Court of Appeals candidates do have party labels on the ballot, so they are treated as partisan races above.</div>
      </Section>

      <Section heading="Methodology">
        <Text>Each candidate gets a position on each topic, from -1 (opposes the statement) to +1 (supports it). Mixed records are scored 0 or ±0.5. A topic counts for a candidate only if a sourced position exists; otherwise it is left out of that candidate's score, never guessed. Your answer runs from -1 (Disagree) to +1 (Agree). The match on a topic is 1 minus half the gap between your answer and their position, so a Neutral answer matches a mixed record best. Topics are weighted by your importance setting (Low 1, Medium 2, High 3) and averaged.</Text>
        <Text>Party shortcut: if you pick a party and answer nothing, each partisan race suggests that party's candidate. Once your answers give scores in a race, the highest score wins, and your party's candidate gets a {BONUS}-point tie-breaker that can only decide close races. If the issue winner isn't your party's candidate, the race is flagged "Differs from party." If your party's candidate has no known position on any topic you answered, the party default stays, since there's nothing to compare. The "Divided government" question is a separate, issue-style question about checks and balances; it isn't counted twice with the shortcut unless you use both.</Text>
        <Text>Abortion positions for the AG, Secretary of State, Auditor, Treasurer, Supreme Court, Ohio Senate 27 and Ohio House 35 candidates rest mostly on endorsements from Ohio Right to Life and Planned Parenthood Advocates of Ohio. Gun positions for Husted, Brown, Ramaswamy, Faber, Sprague, Russo, LaRose, Edwards and Demetriou rest on Buckeye Firearms Association grades (A or A+ scored -1, F scored +1); that group grades mainly candidates who answer its survey, so most Democrats are ungraded and left unknown. Bar ratings are converted to a scale (Excellent +1, Good +0.5, Adequate or Satisfactory 0, Not Recommended -1) and averaged across raters. Judicial ratings and ethics count only if you agree they matter. Supreme Court ratings come from the Cleveland Metropolitan Bar, the Cuyahoga Criminal Defense Lawyers and the Norman S. Minor Bar, through Judge4Yourself; the Ohio State Bar does not rate candidates.</Text>
        <Text>Not added as questions: cost of living, jobs and housing (candidates broadly agree, or positions were too general to score), and Medicaid (positions found only for the governor candidates, and they don't line up on one question). This quiz is a tool for comparing positions, not an endorsement. Research as of Nov 2, 2026.</Text>
      </Section>

      <Section heading="Sources">
        <LinkCards
          links={[
            { title: "Official candidate list and issue synopsis", site: "Summit County Board of Elections", href: "https://www.boe.ohio.gov/summit/c/upload/Election_60IssueSynopsis.pdf" },
            { title: "Husted and Brown on key issues", site: "10tv / AP", href: "https://www.10tv.com/article/news/politics/elections/ohio-us-senate-race-2026-jon-husted-sherrod-brown/530-2bf46b68-a2a3-425d-9c44-2a655c74bd60" },
            { title: "Brown's issue page", site: "sherrodbrown.com", href: "https://www.sherrodbrown.com/our-fight/" },
            { title: "Health insurance: Brown vs. Husted record check", site: "The Stated Record", href: "https://statedrecord.com/issues/ohio-us-senate-special-2026/health-insurance-and-drug-costs" },
            { title: "Is Husted to blame for lost coverage?", site: "PolitiFact", href: "https://politifact.com/factchecks/2026/oct/09/sherrod-brown/jon-husted-health-insurance-490000-ohio-senate/" },
            { title: "Senate candidates on data centers", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/08/10/ohio-u-s-senate-candidates-offer-contrasting-visions-for-data-centers/" },
            { title: "Data centers a hot-button issue in Ohio", site: "NPR", href: "https://www.npr.org/2026/10/27/nx-s1-5989174/candidates-work-to-ease-concerns-as-data-centers-become-hot-button-issue-for-ohioans" },
            { title: "Senate candidates compared", site: "SparkVotes", href: "https://www.sparkvotes.org/ohio/races/oh-us-senate/" },
            { title: "Races that will decide Senate control", site: "Reuters via Yahoo", href: "https://www.yahoo.com/news/politics/articles/factbox-races-decide-control-us-100635328.html" },
            { title: "Sykes, Coleman, Dixit", site: "Cleveland 19", href: "https://www.cleveland19.com/2026/10/27/democrat-sykes-faces-republican-coleman-independent-dixit-ohios-competitive-13th-district/" },
            { title: "Sykes on the 2025 tax and health law", site: "sykes.house.gov", href: "https://sykes.house.gov/media/press-releases/rep-sykes-votes-against-gutting-healthcare-for-17-million-americans-raising-energy-costs-on-families" },
            { title: "Sykes's record", site: "The Full Record", href: "https://www.thefullrecord.org/guide/race/us-house-oh-13/emilia-sykes" },
            { title: "Sykes abortion scorecard", site: "Reproductive Freedom for All", href: "https://reproductivefreedomforall.org/lawmaker/emilia-sykes/" },
            { title: "Governor candidates on abortion", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/10/28/where-ohios-candidates-for-governor-stand-on-abortion/" },
            { title: "Governor candidates on education", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/09/11/ohio-governor-race-where-amy-acton-and-vivek-ramaswamy-stand-on-education-issues/" },
            { title: "Governor candidates on guns", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/10/21/ohio-18-year-olds-could-buy-handguns-if-ramaswamy-gets-elected/" },
            { title: "Governor candidates on data centers and costs", site: "Ideastream", href: "https://www.ideastream.org/government-politics/2026-09-30/watch-ohios-3-candidates-for-governor-weigh-in-on-data-centers-cost-of-living-and-more" },
            { title: "Governor candidates on the issues, incl. marijuana", site: "Times-Reporter", href: "https://www.timesreporter.com/story/news/politics/2026/10/04/ohio-governor-candidates-amy-acton-and-vivek-ramaswamy-on-the-issues/88588933007/" },
            { title: "Governor candidates on marijuana", site: "Marijuana Herald", href: "https://themarijuanaherald.com/2026/07/where-ohio-governor-candidates-vivek-ramaswamy-and-amy-acton-stand-on-marijuana-legalization/" },
            { title: "Candidates pledge to keep the cannabis law", site: "NUG Magazine", href: "https://www.nugmag.com/ohio-s-top-candidates-pledge-to-protect-voter-approved-cannabis-law-20260815-5e15e413/" },
            { title: "Acton on a new redistricting amendment", site: "Signal Ohio", href: "https://signalohio.org/amy-acton-says-shell-push-for-new-redistricting-amendment-as-ohio-governor-election-2026/" },
            { title: "Ramaswamy's education plan", site: "WKYC", href: "https://www.wkyc.com/article/news/education/education-station/vivek-ramaswamy-outlines-education-plan-ohio-one-on-one-interview-3news-danielle-wiggins-education-station/95-f3401685-2f35-4248-9afe-56b59004f928" },
            { title: "Acton's education plan", site: "WKYC", href: "https://www.wkyc.com/article/news/education/education-station/amy-acton-outlines-education-plan-ohio-one-on-one-interview-3news-danielle-wiggins-education-station/95-430b698a-46d3-47b5-a363-752bdb4ff7ad" },
            { title: "AG candidates on Flock and ICE", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/11/02/where-the-candidates-for-ohio-attorney-general-stand-on-flock-ice/" },
            { title: "Secretary of State candidates compared", site: "Signal Ohio", href: "https://signalohio.org/whats-at-stake-in-ohios-secretary-of-state-race-in-november-2026-election/" },
            { title: "Secretary of State race", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-secretary-of-state" },
            { title: "Treasurer race: Edwards vs. Walsh", site: "WKYC", href: "https://www.wkyc.com/article/news/politics/elections/ohio-election-treasurer-race-candidates-jay-edwards-vs-seth-walsh/95-6cba19f7-1c81-48df-8647-058d76163ab0" },
            { title: "Treasurer race: record and money", site: "Cracked Buckeye", href: "https://crackedbuckeye.com/election/2026/treasurer/" },
            { title: "2026 grades and endorsements", site: "Buckeye Firearms Association", href: "https://www.buckeyefirearms.org/2026-bfa-pac-grades-and-endorsements-ohio-general-election" },
            { title: "Ohio Supreme Court ratings", site: "Judge4Yourself", href: "https://www.judge4yourself.com/judicial-candidate-ratings/" },
            { title: "Is Ohio on the cusp of an all-Republican Supreme Court?", site: "Signal Ohio", href: "https://signalohio.org/is-ohio-on-the-cusp-of-an-all-republican-state-supreme-court/" },
            { title: "Judicial ratings", site: "Akron Bar Association", href: "https://www.akronbar.org/?pg=GeneralDivision" },
            { title: "Ninth District ratings", site: "Akron Bar Association", href: "https://www.akronbar.org/?pg=NinthDistrictCourtofAppeals" },
            { title: "Ohio Senate 27 positions", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-senate-27-full-term-commencing-1-1-2027" },
            { title: "HB 710 (data-center incentives ban)", site: "Ohio House", href: "https://www.ohiohouse.gov/legislation/136/hb710" },
            { title: "Ohio House 35 positions", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-house-35" },
            { title: "HB 96 votes", site: "Ohio Legislature", href: "https://www.legislature.ohio.gov/legislation/136/hb96/votes" },
            { title: "SB 56 (marijuana changes) votes", site: "Ohio Legislature", href: "https://www.legislature.ohio.gov/legislation/136/sb56/votes" },
            { title: "Endorsement of Demetriou", site: "AFP Ohio", href: "https://buckeyeblueprint.com/economic-progress/endorsement-steve-demetriou-for-ohio-senate-district-27/" },
            { title: "Educators running for the Statehouse", site: "Signal Ohio", href: "https://signalohio.org/these-ohio-educators-were-fed-up-democrats-recruited-them-to-run-for-the-statehouse-election-2026/" },
            { title: "Statehouse supermajority", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/07/24/dems-need-to-flip-6-seats-to-break-the-republican-statehouse-supermajority-and-northeast-ohio-is-pivotal/" },
            { title: "2026 recommendations", site: "Ohio Right to Life PAC", href: "https://ohiolife.org/ohio-right-to-life-pac-announces-2026-general-election-candidate-recommendations/" },
            { title: "2026 endorsements", site: "Planned Parenthood Advocates of Ohio", href: "https://www.plannedparenthoodaction.org/planned-parenthood-advocates-ohio/elections" },
            { title: "County Council candidates", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-summit-council-at-large-full-term-commencing-1-1-2027" },
            { title: "Court declares EdChoice unconstitutional", site: "Education Week", href: "https://www.edweek.org/policy-politics/court-declares-ohio-school-choice-voucher-program-unconstitutional/2026/10" },
          ]}
        />
      </Section>
    </Page>
  );
}


