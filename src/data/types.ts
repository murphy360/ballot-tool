// Data model. Races are tagged with the district they belong to, and a
// locality lists the districts that cover it. Adding an address lookup later
// means resolving an address to a locality (or directly to its district list);
// everything downstream already filters by districts.

export type Party = "R" | "D" | "L" | "Ind." | "Other" | "";

export type Scope =
  | "statewide" // counted across all of Ohio; Summit's feed has only part of it
  | "multi-county" // district crosses county lines
  | "county" // entirely in Summit County; the county feed is the whole count
  | "city"; // entirely within one city

export interface Candidate {
  name: string;
  party?: Party;
  incumbent?: boolean;
  /** Distinctive name tokens used to find this candidate in official results. */
  match?: string[];
}

export interface Race {
  id: string;
  title: string;
  group: "Issues" | "Federal" | "State" | "Courts" | "Legislature" | "County" | "Judges";
  district: string;
  scope: Scope;
  voteFor?: number;
  kind: "candidate" | "issue";
  candidates?: Candidate[];
  /** For issues: regexes tested against the official contest name. All must match. */
  contestPatterns?: string[];
  summary?: string;
  /** Anchor on the guide page with the full write-up. */
  guideAnchor?: string;
}

export interface Locality {
  id: string;
  label: string;
  county: string;
  state: string;
  districts: string[];
  /** Locality id in the results config (precinct subtotals). */
  resultsLocality?: string;
  notes?: string;
}

export interface Election {
  id: string;
  date: string;
  name: string;
  pollsOpen: string;
  pollsClose: string;
  races: Race[];
  localities: Locality[];
  statewideLinks: { label: string; href: string }[];
}
