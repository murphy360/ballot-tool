import type { Candidate, Race } from "../data/types";

export interface ROption { id: string; name: string; party: string; votes: number; groups: Record<string, number> }
export interface RLocal { precincts: number; reported: number; complete: number; votes: Record<string, number> }
export interface RContest {
  id: string; name: string; type: string; voteFor: number; order: number;
  precinctsReporting: number; precinctsParticipating: number;
  options: ROption[]; local: Record<string, RLocal>;
}
export interface RSource {
  label: string; publicUrl: string; electionName: string; electionDate: string;
  sourceUpdatedAt: string | null; fetchedAt: string; contests: RContest[];
  lastError?: { at: string };
}
export interface RLatest {
  electionId: string; electionName: string; checkedAt: string; updatedAt: string | null;
  sources: Record<string, RSource>;
}

const norm = (s: string) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[’‘`]/g, "'").toLowerCase();

const SUFFIX = /^(jr\.?|sr\.?|ii|iii|iv)$/i;
export function matchTokens(c: Candidate): string[] {
  if (c.match?.length) return c.match;
  const first = c.name.split("/")[0].replace(/\([^)]*\)/g, " ").trim();
  const parts = first.split(/\s+/).filter((p) => !SUFFIX.test(p));
  return [parts[parts.length - 1]];
}

const hasToken = (hay: string, tok: string) => {
  const t = norm(tok).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(^|[^a-z'])" + t + "($|[^a-z])").test(norm(hay));
};

export function optionFor(c: Candidate, contest: RContest): ROption | undefined {
  const toks = matchTokens(c);
  return contest.options.find((o) => toks.every((t) => hasToken(o.name, t)));
}

export interface Matched { race: Race; contest?: RContest; options?: Map<string, Candidate | undefined> }

export function matchRace(race: Race, contests: RContest[]): RContest | undefined {
  if (race.kind === "issue") {
    const pats = (race.contestPatterns || []).map((p) => new RegExp(p, "i"));
    const hits = contests.filter((c) => pats.every((re) => re.test(c.name)));
    // Prefer the shortest name: it's usually the main question, not a sub-item.
    return hits.sort((a, b) => a.name.length - b.name.length)[0];
  }
  const cands = race.candidates || [];
  const hits = contests.filter((ct) => {
    if (cands.length === 1 && !/judge|pleas|court/i.test(ct.name)) return false;
    return cands.every((c) => optionFor(c, ct));
  });
  // Prefer the contest with the fewest options not on our list.
  return hits.sort((a, b) => a.options.length - b.options.length)[0];
}

export function candidateForOption(race: Race, contest: RContest, opt: ROption): Candidate | undefined {
  return (race.candidates || []).find((c) => optionFor(c, contest)?.id === opt.id);
}
