import { VOCAB } from '../content/vocab';
import { GRAMMAR } from '../content/grammar';
import { KANJI } from '../content/kanji';
import { mastery, strength, type MasteryLevel } from './srs';
import { jlptScore } from './exam';
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

/** a full mock exam passed with this many points or more is a pass with a margin */
export const SAFE_SCORE = 110;

/**
 * Am I ready for the N2? Checks what the game can see: how much of its words, kanji and grammar is held for good
 * (consolidating or mastered), recent reading and listening accuracy, and the last full mock exam scored like the JLPT.
 */
export function n2Readiness(s: GameState) {
  const r = readiness(s);
  const held = (a: AreaSummary) => (a.total ? (a.counts.young + a.counts.mature) / a.total : a.score);
  const area = (k: SkillArea) => r.areas.find((a) => a.area === k)!;
  const checks = [
    { id: 'vocab', label: '語彙', value: held(area('vocab')), need: 0.7 },
    { id: 'kanji', label: '漢字', value: held(area('kanji')), need: 0.7 },
    { id: 'grammar', label: '文法', value: held(area('grammar')), need: 0.7 },
    { id: 'reading', label: '読解', value: held(area('reading')), need: 0.7 },
    { id: 'listening', label: '聴解', value: held(area('listening')), need: 0.7 },
  ].map((c) => ({ ...c, ok: c.value >= c.need }));
  const lastFull = [...s.practice].reverse().find((p) => p.mode === 'full');
  const score = lastFull ? jlptScore(lastFull.sections) : null;
  const allOk = checks.every((c) => c.ok);
  const level: 'ready' | 'close' | 'not' = score?.pass && score.total >= SAFE_SCORE && allOk ? 'ready' : score?.pass || allOk ? 'close' : 'not';
  return { checks, lastFull, score, level, fullPasses: Number(s.flags.full_mock_passed) || 0 };
}
