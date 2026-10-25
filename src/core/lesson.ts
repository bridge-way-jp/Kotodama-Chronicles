import { GRAMMAR } from '../content/grammar';
import { VOCAB } from '../content/vocab';
import type { Step } from './script';
import type { GameState } from './types';

/**
 * The lesson at each step of the story: when a quest goal is reached, one new item of the region is taught
 * (the card, then a question that has to be answered right) and one item learned before is asked again.
 * Grammar and words take turns; the region's items come first, then earlier regions' that are still new.
 */
export function lessonKey(s: GameState): string | null {
  const fresh = (k: string) => !s.cards[k]?.introduced;
  const chapters = [Math.max(1, Math.min(7, s.chapter ?? 1))];
  for (let c = chapters[0] - 1; c >= 1; c--) chapters.push(c);
  const grammarOf = (c: number) => GRAMMAR.filter((g) => g.chapter === c && g.exercises.length && g.source !== 'anki').map((g) => 'g:' + g.id).filter(fresh);
  // words met in the world first, then ones with an example sentence
  const wordsOf = (c: number) =>
    VOCAB.filter((v) => v.chapter === c && v.level === 'N2' && !v.affix)
      .sort((a, b) => Number(!s.cards['v:' + a.id]) - Number(!s.cards['v:' + b.id]) || Number(!a.example) - Number(!b.example))
      .map((v) => 'v:' + v.id)
      .filter(fresh);
  const grammarTurn = Number(s.flags.lesson_n ?? 0) % 2 === 0;
  for (const c of chapters) {
    const g = grammarOf(c)[0];
    const w = wordsOf(c)[0];
    const k = grammarTurn ? g ?? w : w ?? g;
    if (k) return k;
  }
  return null;
}

/** an item studied before to ask again (due ones first), not the one just taught */
export function reviewKey(s: GameState, not: string | null, now = Date.now()): string | null {
  const studied = Object.values(s.cards).filter((c) => c.introduced && c.key !== not && !c.key.startsWith('r:'));
  const due = studied.filter((c) => c.due <= now).sort((a, b) => a.due - b.due);
  const rest = studied.filter((c) => c.due > now).sort((a, b) => (a.reps ?? 0) - (b.reps ?? 0) || a.due - b.due);
  return [...due, ...rest][0]?.key ?? null;
}

export function lessonSteps(s: GameState): Step[] {
  const k = lessonKey(s);
  const steps: Step[] = [];
  const again = reviewKey(s, k);
  if (again) steps.push({ check: 'lesson' });
  if (k) steps.push({ do: [{ add: 'lesson_n' }] }, { teach: k });
  return steps;
}

/** whether a scene completes a quest goal (only those carry a lesson) */
export function reachesGoal(steps: Step[]): boolean {
  return steps.some((st) => {
    if ('do' in st) return st.do.some((a) => 'objective' in a);
    if ('choice' in st) return st.choice.some((c) => c.then && reachesGoal(c.then));
    if ('if' in st) return reachesGoal(st.then) || (!!st.else && reachesGoal(st.else));
    return false;
  });
}
