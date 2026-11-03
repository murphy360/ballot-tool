import type { Election, Race } from "./types";

// Races on the City of Twinsburg ballot, from the Summit County Board of
// Elections candidate list and issue synopsis (see the guide page for sources).
const races: Race[] = [
  {
    id: "issue-3", title: "State Issue 3: photo ID to vote", group: "Issues", district: "oh", scope: "statewide", kind: "issue",
    contestPatterns: ["issue\\s*(no\\.?\\s*)?3\\b|photo|identification"], guideAnchor: "issues",
    summary: "Constitutional amendment requiring approved photo ID to vote. Yes adds it to the Ohio Constitution.",
  },
  {
    id: "issue-38", title: "Issue 38: Twinsburg rezoning of 2570 Post Road", group: "Issues", district: "oh-summit-twinsburg", scope: "city", kind: "issue",
    contestPatterns: ["twinsburg", "zon|issue\\s*(no\\.?\\s*)?38\\b|2026-093|post"], guideAnchor: "issues",
    summary: "Rezones 3.2 acres from Public Facilities to R-3 single-family residential. Not a tax.",
  },
  {
    id: "us-senate", title: "U.S. Senate (special election)", group: "Federal", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "federal",
    candidates: [
      { name: "Jon Husted", party: "R", incumbent: true },
      { name: "Sherrod Brown", party: "D" },
      { name: "William (Bill) Redpath", party: "L", match: ["Redpath"] },
      { name: "Greg Levy", party: "Other", match: ["Levy"] },
    ],
  },
  {
    id: "us-house-13", title: "U.S. House, 13th District", group: "Federal", district: "oh-cd13", scope: "multi-county", kind: "candidate", guideAnchor: "federal",
    candidates: [
      { name: "Emilia Sykes", party: "D", incumbent: true },
      { name: "Carey Coleman", party: "R" },
      { name: "Sandeep Dixit", party: "Ind." },
    ],
  },
  {
    id: "governor", title: "Governor and Lieutenant Governor", group: "State", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "statewide",
    candidates: [
      { name: "Vivek Ramaswamy / Robert A. McColley", party: "R", match: ["Ramaswamy"] },
      { name: "Amy Acton / David Pepper", party: "D", match: ["Acton"] },
      { name: "Don Kissick / James L. Mills", party: "L", match: ["Kissick"] },
    ],
  },
  {
    id: "attorney-general", title: "Attorney General", group: "State", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "statewide",
    candidates: [{ name: "Keith Faber", party: "R" }, { name: "John J. Kulewicz", party: "D", match: ["Kulewicz"] }],
  },
  {
    id: "secretary-of-state", title: "Secretary of State", group: "State", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "statewide",
    candidates: [{ name: "Robert Sprague", party: "R" }, { name: "Allison Russo", party: "D" }, { name: "Tom Pruss", party: "L" }],
  },
  {
    id: "auditor", title: "Auditor of State", group: "State", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "statewide",
    candidates: [{ name: "Frank LaRose", party: "R" }, { name: "Annette Blackwell", party: "D" }],
  },
  {
    id: "treasurer", title: "Treasurer of State", group: "State", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "statewide",
    candidates: [{ name: "Jay Edwards", party: "R" }, { name: "Seth Walsh", party: "D" }],
  },
  {
    id: "supreme-court-1", title: "Ohio Supreme Court (term starting Jan 1, 2027)", group: "Courts", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "courts",
    candidates: [{ name: "Daniel R. Hawkins", party: "R", incumbent: true }, { name: "Marilyn Zayas", party: "D" }],
  },
  {
    id: "supreme-court-2", title: "Ohio Supreme Court (term starting Jan 2, 2027)", group: "Courts", district: "oh", scope: "statewide", kind: "candidate", guideAnchor: "courts",
    candidates: [{ name: "Jennifer Brunner", party: "D", incumbent: true }, { name: "Colleen O'Donnell", party: "R" }],
  },
  {
    id: "appeals-9-full", title: "9th District Court of Appeals (full term starting Feb 9, 2027)", group: "Courts", district: "oh-app9", scope: "multi-county", kind: "candidate", guideAnchor: "courts",
    candidates: [{ name: "Betty Sutton", party: "D", incumbent: true }, { name: "Cynthia Curtin", party: "R" }],
  },
  {
    id: "appeals-9-unexpired", title: "9th District Court of Appeals (unexpired term ending Feb 9, 2029)", group: "Courts", district: "oh-app9", scope: "multi-county", kind: "candidate", guideAnchor: "courts",
    candidates: [{ name: "Nathan Manning", party: "R", incumbent: true }, { name: "Tavia Galonski", party: "D", match: ["Tavia", "Galonski"] }],
  },
  {
    id: "oh-senate-27", title: "Ohio Senate, District 27", group: "Legislature", district: "oh-sd27", scope: "multi-county", kind: "candidate", guideAnchor: "legislature",
    candidates: [{ name: "Steve Demetriou", party: "R" }, { name: "Mike Roberto", party: "D" }],
  },
  {
    id: "oh-house-35", title: "Ohio House, District 35", group: "Legislature", district: "oh-hd35", scope: "multi-county", kind: "candidate", guideAnchor: "legislature",
    candidates: [{ name: "Vik Sandhu", party: "R" }, { name: "Samantha Salamon", party: "D" }],
  },
  {
    id: "county-council-at-large", title: "Summit County Council at large (vote for 3)", group: "County", district: "oh-summit", scope: "county", kind: "candidate", voteFor: 3, guideAnchor: "county",
    candidates: [
      { name: "Erin Dickinson", party: "D", incumbent: true },
      { name: "Elizabeth Walters", party: "D", incumbent: true },
      { name: "John A. Donofrio", party: "D", incumbent: true },
      { name: "Jonathon D. Bollas", party: "R" },
      { name: "Shane R. Barker", party: "R" },
      { name: "John Chapman", party: "R" },
    ],
  },
  ...([
    ["cp-jan2", "Common Pleas, General Division (term starting Jan 2)", [["Tammy O'Brien", true], ["Tania Nemer"]]],
    ["cp-jan3", "Common Pleas, General Division (term starting Jan 3)", [["Kelly L. McLaughlin", true]]],
    ["cp-jan5", "Common Pleas, General Division (term starting Jan 5)", [["Alison McCarty", true], ["Job Esau Perry", false, ["Esau", "Perry"]]]],
    ["cp-jan6", "Common Pleas, General Division (term starting Jan 6)", [["Mary Margaret Rowlands", true], ["Kate A. Makra"]]],
    ["cp-feb9", "Common Pleas, General Division (term starting Feb 9)", [["Christine L. Croce", true], ["John Galonski", false, ["John", "Galonski"]]]],
    ["cp-may", "Common Pleas, General Division (May term)", [["Joy Malek Oldfield", true], ["Joe Darwal"]]],
    ["juvenile", "Common Pleas, Juvenile Division", [["Amy Corrigall Jones", false, ["Corrigall"]], ["David Lombardi"]]],
    ["domestic-relations", "Common Pleas, Domestic Relations Division", [["Katarina Cook", true, ["Katarina", "Cook"]], ["Lisa Dean", false, ["Lisa", "Dean"]]]],
    ["probate", "Common Pleas, Probate Division", [["Steve Elliott"], ["Diana Stevenson"]]],
  ] as [string, string, [string, boolean?, string[]?][]][]).map(([id, title, cands]): Race => ({
    id, title: "Judge, " + title, group: "Judges", district: "oh-summit", scope: "county", kind: "candidate", guideAnchor: "judges",
    candidates: cands.map(([name, incumbent, match]) => ({ name, party: "", incumbent: !!incumbent, match })),
  })),
];

export const election: Election = {
  id: "2026-11-03",
  date: "2026-11-03",
  name: "November 3, 2026 General Election",
  pollsOpen: "2026-11-03T11:30:00Z",
  pollsClose: "2026-11-04T00:30:00Z",
  races,
  localities: [
    {
      id: "twinsburg",
      label: "City of Twinsburg",
      county: "Summit",
      state: "OH",
      districts: ["oh", "oh-cd13", "oh-app9", "oh-sd27", "oh-hd35", "oh-summit", "oh-summit-twinsburg"],
      resultsLocality: "twinsburg",
      notes: "Every part of the city is in U.S. House 13, Ohio Senate 27, Ohio House 35 and Twinsburg City Schools, so the ballot is the same in every city precinct.",
    },
  ],
  statewideLinks: [
    { label: "Ohio Secretary of State: statewide live results", href: "https://liveresults.ohiosos.gov/" },
    { label: "Summit County Board of Elections: official results page", href: "https://app.enhancedvoting.com/results/public/Summit-County-OH/GE2026" },
  ],
};
