// Diagnostic: discover Enhanced Voting endpoints for a jurisdiction.
const UA = "ballot-tool probe (github.com/murphy360/ballot-tool)";
const get = async (u) => {
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(30000) });
    return { status: r.status, type: r.headers.get("content-type"), text: await r.text() };
  } catch (e) { return { status: 0, text: String(e) }; }
};
const base = "https://app.enhancedvoting.com";
const api = base + "/results/public/api";
const js = (await get(base + "/results/public/main-SDUQU7SI.js")).text;
for (const m of js.matchAll(/.{0,100}(jurisdiction|Jurisdiction)[^]{0,0}.{0,100}\$\{[^}]+\}.{0,80}/g)) if (/baseUrl|http\.get/.test(m[0])) console.log("JUR CTX: " + m[0]);
for (const m of js.matchAll(/http\.get\(`[^`]+`/g)) console.log("GET: " + m[0]);

const may = await get(`${api}/elections/summit-county-oh/May2026Primary`);
console.log("\n### summit May2026Primary:", may.status, "\n" + may.text.slice(0, 4000));
const slugs = ["Nov2026General","November2026General","Nov2026GeneralElection","November2026GeneralElection","Nov2026Gen","Nov2026","November2026","General2026","Nov2026GE","GE2026","2026General","Nov32026General","NovGeneral2026","2026NovGeneral","Nov2026General1","November2026","Nov2026Election","General","Nov262026General"];
for (const s of slugs) {
  const r = await get(`${api}/elections/summit-county-oh/${s}`);
  console.log(`summit-county-oh/${s}: ${r.status} ${r.status === 200 ? r.text.slice(0, 3000) : ""}`);
}
const cuy = await get(`${api}/elections/Cuyahoga-County-OH/GE2026`);
console.log("\n### cuy full:\n" + cuy.text.slice(0, 6000));
