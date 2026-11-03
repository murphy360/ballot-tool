// Diagnostic: discover Enhanced Voting endpoints for a jurisdiction.
const UA = "ballot-tool probe (github.com/murphy360/ballot-tool)";
const get = async (u) => {
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
    const t = await r.text();
    return { status: r.status, type: r.headers.get("content-type"), text: t };
  } catch (e) { return { status: 0, text: String(e) }; }
};
const show = (label, r, n = 400) => console.log(`\n### ${label}: ${r.status} ${r.type || ""}\n${(r.text || "").slice(0, n)}`);

const base = "https://app.enhancedvoting.com";
const page = await get(`${base}/results/public/Summit-County-OH/GE2026`);
show("public page", page, 3000);
const scripts = [...page.text.matchAll(/src="([^"]+\.js[^"]*)"/g)].map((m) => new URL(m[1], base + "/results/public/").href);
console.log("scripts:", scripts);
for (const s of scripts) {
  const js = await get(s);
  const hits = new Set();
  for (const m of js.text.matchAll(/["'`]([^"'`\n]{0,80}(?:api\/|cdn\/|export|\/elections|ballotItems)[^"'`\n]{0,120})["'`]/gi)) hits.add(m[1]);
  for (const m of js.text.matchAll(/.{0,120}(?:\/api\/|cdn\/results).{0,160}/g)) hits.add("CTX: " + m[0]);
  console.log(`\n### strings in ${s} (${js.text.length} bytes)`);
  console.log([...hits].slice(0, 120).join("\n"));
}
for (const u of [
  `${base}/cdn/results/Cuyahoga-County-OH/export-GE2026.json`,
  `${base}/cdn/results/Cuyahoga-County-OH/export-GE2026.zip`,
  `${base}/results/public/api/elections/Summit-County-OH`,
  `${base}/results/public/api/elections/Summit-County-OH/GE2026`,
  `${base}/results/public/api/jurisdictions/Summit-County-OH/elections`,
  `${base}/api/results/public/Summit-County-OH/elections`,
  `${base}/results/public/Summit-County-OH`,
]) show(u, await get(u), 600);
