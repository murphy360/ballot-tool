# Ballot Tool

A static site for the November 3, 2026 general election in the City of Twinsburg (Summit County, Ohio):

- **Ballot**: every race and issue on the Twinsburg ballot.
- **Results**: live election-night results and final results, refreshed every minute. Each race shows the City of Twinsburg's 15 precincts or all of Summit County.
- **Guide**: neutral notes on every race and issue, with sources.
- **Quiz**: an alignment quiz that scores candidates against your answers.

Published to GitHub Pages from the `gh-pages` branch.

## How results work

`scripts/fetch-results.mjs` downloads the Summit County Board of Elections' media export from Enhanced Voting:

- Feed: `https://app.enhancedvoting.com/cdn/results/summit-county-oh/export-Nov2026General.json`
- Status (official/unofficial): `https://app.enhancedvoting.com/results/public/api/elections/summit-county-oh/Nov2026General`

It writes compact results to `gh-pages:results/<election>/latest.json`. The fetch also adds up the City of Twinsburg precincts (`283 TWINSBURG 1-A` … `297 TWINSBURG 5-C`). Township precincts (`TWINSBURG TWP …`) are excluded.

The **Fetch results** workflow runs every 5 minutes on election night (6 PM–7 AM ET). Inside the window set in `config/elections/2026-11-03.json`, each run polls about once a minute for 50 minutes. Outside that window it checks once an hour, which picks up late counts and the official canvass. It pushes when the numbers change, plus a heartbeat every 10 minutes, which keeps Pages rebuilds under GitHub's limit.

Statewide races only include Summit County's votes. The page labels those races and links to the Ohio Secretary of State for statewide totals.

## Layout

- `config/elections/*.json`: results sources and locality precinct filters
- `src/data/*.ts`: races, candidates and localities. Races are tagged by district, and a locality lists its districts, so address lookup can map an address to districts later.
- `src/results/match.ts`: matches the county's contests to ballot races by candidate names (issues by name pattern)
- `src/pages/GuideCanvas.tsx`, `QuizCanvas.tsx`: the original Cursor canvases (`canvases/`), rendered through `src/canvas`, a small replacement for `grok/canvas`

## Develop

```sh
npm install
npm run fetch-results   # optional: pull live results into public/results
npm run dev
```

Neutral research notes, not endorsements. Results are unofficial until the Board of Elections certifies them.
