import { VOCAB } from '../content/vocab';
import { GRAMMAR } from '../content/grammar';
import { KANJI } from '../content/kanji';
import { mastery, strength, type MasteryLevel } from './srs';
import type { GameState, SkillArea } from './types';

/**
 * Progress summary for the JLPT N2 dashboard. Measures demonstrated knowledge
 * of the game's CURRENT curriculum. It is not a prediction of an exam result.
 */

export interface AreaSummary {
  area: SkillArea;
  label: string;
  total: number; // curriculum items (0 for skill-only areas)
  encountered: number;
  counts: Record<MasteryLevel | 'unseen', number>;
  /** 0..1 demonstrated mastery */
  score: number;
  accuracy: number | null;
  avgMs: number | null;
  attempts: number;
}

function itemArea(s: GameState, area: SkillArea, label: string, keys: string[]): AreaSummary {
  const counts: AreaSummary['counts'] = { unseen: 0, seen: 0, learning: 0, young: 0, mature: 0, struggling: 0 };
  let sum = 0;
  let encountered = 0;
  for (const k of keys) {
    const c = s.cards[k];
    if (!c) {
      counts.unseen++;
      continue;
    }
    encountered++;
    counts[mastery(c)]++;
    sum += strength(c);
  }
  const st = s.skills[area];
  return {
    area, label, total: keys.length, encountered, counts,
    score: keys.length ? sum / keys.length : 0,
    accuracy: st.total ? st.ok / st.total : null,
    avgMs: st.total ? st.ms / st.total : null,
    attempts: st.total,
  };
}

function skillArea(s: GameState, area: SkillArea, label: string): AreaSummary {
  const st = s.skills[area];
  // recent accuracy over the last 20 comprehension answers weighs more than lifetime
  const recent = s.exerciseLog.filter((e) => e.area === area).slice(-20);
  const recentAcc = recent.length ? recent.filter((e) => e.ok).length / recent.length : 0;
  // confidence grows with number of attempts (needs ~20 answers for full weight)
  const confidence = Math.min(1, st.total / 20);
  return {
    area, label, total: 0, encountered: st.total,
    counts: { unseen: 0, seen: 0, learning: 0, young: 0, mature: 0, struggling: 0 },
    score: recentAcc * confidence,
    accuracy: st.total ? st.ok / st.total : null,
    avgMs: st.total ? st.ms / st.total : null,
    attempts: st.total,
  };
}

export function readiness(s: GameState) {
  const areas: AreaSummary[] = [
    itemArea(s, 'vocab', '語彙 Vocabulary', VOCAB.map((v) => 'v:' + v.id)),
    itemArea(s, 'kanji', '漢字 Kanji', KANJI.map((k) => 'k:' + k.id)),
    itemArea(s, 'grammar', '文法 Grammar', GRAMMAR.map((g) => 'g:' + g.id)),
    skillArea(s, 'reading', '読解 Reading'),
    skillArea(s, 'listening', '聴解 Listening'),
  ];
  const overall = areas.reduce((a, b) => a + b.score, 0) / areas.length;
  const lastMock = [...s.practice].reverse().find((p) => p.mode === 'mock');
  const weakest = [...areas].sort((a, b) => a.score - b.score)[0];
  return { areas, overall, lastMock, weakest };
}
