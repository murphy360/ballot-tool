// Diagnostic: discover Enhanced Voting endpoints for a jurisdiction.
const UA = "ballot-tool probe (github.com/murphy360/ballot-tool)";
const get = async (u) => {
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(60000) });
    return { status: r.status, type: r.headers.get("content-type"), text: await r.text() };
  } catch (e) { return { status: 0, text: String(e) }; }
};
const base = "https://app.enhancedvoting.com";
const api = base + "/results/public/api";
for (const e of ["May2026Primary", "Nov2026General"]) {
  const r = await get(`${api}/elections/summit-county-oh/${e}`);
  let j = {}; try { j = JSON.parse(r.text); } catch {}
  console.log(`\n### ${e} election keys:`, Object.keys(j));
  for (const k of Object.keys(j)) if (!["publicReportCategories"].includes(k)) console.log(`  ${k}: ${JSON.stringify(j[k]).slice(0, 600)}`);
  for (const u of [
    `${base}/cdn/results/summit-county-oh/export-${e}.json`,
    `${base}/cdn/results/Summit-County-OH/export-${e}.json`,
    `${base}/cdn/results/summit-county-oh/elections/export-${e}.json`,
  ]) {
    const x = await get(u);
    console.log(`EXPORT ${u}: ${x.status} ${x.text.length} bytes ${x.text.slice(0, 300)}`);
    if (x.status === 200) {
      try {
        const d = JSON.parse(x.text);
        console.log("  top keys", Object.keys(d), "results keys", Object.keys(d.results || {}));
        const items = [...(d.results?.ballotItems || []), ...((d.localResults || []).flatMap((l) => l.ballotItems || []))];
        console.log("  items", items.length, "localResults", (d.localResults || []).map((l) => l.name));
        const pn = new Set(); for (const bi of items) for (const o of bi.ballotOptions || []) for (const p of o.precinctResults || []) pn.add(p.name);
        console.log("  precincts", pn.size, [...pn].filter((n) => /twins/i.test(n)));
        console.log("  sample item", JSON.stringify(items[0]).slice(0, 1500));
        console.log("  names", items.slice(0, 60).map((i) => i.name).join(" | "));
      } catch (e) { console.log("parse fail", e.message); }
    }
  }
}
