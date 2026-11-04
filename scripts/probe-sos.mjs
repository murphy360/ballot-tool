// Check whether Ohio SOS live results are reachable by an identified, non-browser client.
const UA = "ballot-tool results fetcher (github.com/murphy360/ballot-tool)";
const get = async (u) => { try { const r = await fetch(u, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) }); return { s: r.status, t: r.headers.get("content-type"), x: await r.text() }; } catch (e) { return { s: 0, x: String(e) }; } };
for (const u of ["https://liveresults.ohiosos.gov/", "https://publicfiles.ohiosos.gov/election-results/files-index.json"]) {
  const r = await get(u);
  console.log("TRY", u, r.s, r.t, "cloudflare-challenge:", /Just a moment|cf-chl|Enable JavaScript and cookies/i.test(r.x));
  console.log(r.x.slice(0, 800));
}
