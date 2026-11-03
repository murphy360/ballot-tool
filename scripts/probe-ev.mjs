// Diagnostic: discover Enhanced Voting endpoints for a jurisdiction.
const UA = "ballot-tool probe (github.com/murphy360/ballot-tool)";
const get = async (u) => {
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(30000) });
    return { status: r.status, type: r.headers.get("content-type"), text: await r.text() };
  } catch (e) { return { status: 0, text: String(e) }; }
};
const show = (label, r, n = 400) => console.log(`\n### ${label}: ${r.status} ${r.type || ""}\n${(r.text || "").slice(0, n)}`);
const base = "https://app.enhancedvoting.com";
const api = base + "/results/public/api";

const js = (await get(base + "/results/public/main-SDUQU7SI.js")).text;
const pats = new Set();
for (const m of js.matchAll(/\$\{this\.baseUrl\}[^`]{0,120}`/g)) pats.add(m[0]);
console.log("API PATTERNS:\n" + [...pats].join("\n"));
for (const m of js.matchAll(/.{0,200}mediaExportPath.{0,200}/g)) console.log("MEDIA CTX: " + m[0]);
for (const m of js.matchAll(/.{0,160}baseUrl=.{0,160}/g)) console.log("BASEURL CTX: " + m[0]);

const cuy = await get(`${api}/elections/Cuyahoga-County-OH/GE2026`);
show("cuyahoga election", cuy, 3000);
for (const p of ["", "/localities", "/stats"]) show("cuy" + p, await get(`${api}/elections/Cuyahoga-County-OH/GE2026${p}`), 1500);
for (const slug of ["GE2026", "GEN2026", "G2026", "General2026", "GE-2026", "2026GE", "November2026", "GE11032026", "Nov2026", "2026General", "GE26", "GENERAL2026"]) {
  const r = await get(`${api}/elections/Summit-County-OH/${slug}`);
  console.log(`summit ${slug}: ${r.status} ${r.text.slice(0, 150)}`);
}
for (const j of ["Summit-County-OH", "SummitCounty-OH", "Summit-OH", "SummitCountyOH", "Summit-County-Ohio"]) {
  const r = await get(`${api}/jurisdictions/${j}/elections`);
  console.log(`jur ${j}: ${r.status} ${r.text.slice(0, 600)}`);
  const r2 = await get(`${api}/elections/${j}`);
  console.log(`elections ${j}: ${r2.status} ${r2.text.slice(0, 600)}`);
}
