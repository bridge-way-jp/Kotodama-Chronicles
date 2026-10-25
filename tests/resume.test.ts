import { describe, expect, it } from 'vitest';
import { SCRIPTS } from '../src/content/scripts';

/**
 * A scene that completes objective A, then shows lines, then completes B: on a phone the app can be closed in
 * between. Some rule (another one) must still lead to B once A is done, else the story is stuck.
 */
const objsIn = (steps: any[], out: string[] = []): string[] => {
  for (const st of steps) {
    if (!st || typeof st !== 'object') continue;
    if (st.do) for (const a of st.do) if (a.objective) out.push(a.objective);
    for (const k of ['then', 'else', 'win', 'lose']) if (Array.isArray(st[k])) objsIn(st[k], out);
    if (st.choice) for (const c of st.choice) if (c.then) objsIn(c.then, out);
  }
  return out;
};

describe('scenes left half-way', () => {
  it('can always be picked up again', () => {
    const rules = Object.entries(SCRIPTS).flatMap(([id, rs]) => rs.map((r) => ({ id, r })));
    const dead: string[] = [];
    for (const { id, r } of rules) {
      const steps = r.steps as any[];
      const seq: { obj: string; i: number }[] = [];
      steps.forEach((st, i) => st?.do?.forEach((a: any) => a.objective && seq.push({ obj: a.objective, i })));
      for (let k = 0; k + 1 < seq.length; k++) {
        const [a, b] = [seq[k], seq[k + 1]];
        if (a.obj === b.obj) continue;
        const between = steps.slice(a.i + 1, b.i);
        if (!between.some((st) => st.say || st.cg || st.reading || st.listening || st.quiz || st.battle || st.choice || st.hear || st.build)) continue;
        const resume = rules.some(({ r: o }) => o !== r && objsIn(o.steps).includes(b.obj) && !JSON.stringify(o.when ?? {}).includes(`"notObj":"${a.obj}"`));
        if (!resume) dead.push(`${id}: ${a.obj} -> ${b.obj}`);
      }
    }
    expect(dead).toEqual([]);
  });
});

describe('a quest offered in a scene', () => {
  it('is offered again if the scene was left before its task was done', async () => {
    const { createInitialState } = await import('../src/core/store');
    const { pickRule } = await import('../src/core/script');
    const flat = (steps: any[], out: any[] = []): any[] => {
      for (const st of steps) {
        if (!st || typeof st !== 'object') continue;
        out.push(st);
        for (const k of ['then', 'else', 'win', 'lose']) if (Array.isArray(st[k])) flat(st[k], out);
        if (st.choice) for (const c of st.choice) if (c.then) flat(c.then, out);
      }
      return out;
    };
    const stuck: string[] = [];
    for (const [id, rules] of Object.entries(SCRIPTS)) {
      for (const r of rules) {
        const fl = flat(r.steps);
        fl.forEach((st, i) => {
          for (const a of st.do ?? []) {
            if (!a.startQuest) continue;
            const later = fl.slice(i + 1);
            const at = later.findIndex((x) => x.do?.some((y: any) => y.objective?.startsWith(a.startQuest + '.')));
            if (at <= 0 || !later.slice(0, at).some((x) => x.say || x.quiz || x.reading || x.cg || x.battle || x.hear || x.build)) continue;
            const obj = later[at].do.find((y: any) => y.objective?.startsWith(a.startQuest + '.')).objective;
            // the state right after the interruption: the quest started, nothing else changed
            const s = createInitialState('T');
            s.quests[a.startQuest] = { id: a.startQuest, status: 'active', objectives: {}, startedAt: 0 };
            const again = pickRule(s, rules);
            // only judged where the offering rule itself applies to a fresh game (the rest needs story state)
            const fresh = createInitialState('T');
            if (pickRule(fresh, rules) !== r.steps) continue;
            if (!again || !flat(again).some((x) => x.do?.some((y: any) => y.objective === obj))) stuck.push(`${id}: ${obj}`);
          }
        });
      }
    }
    expect(stuck).toEqual([]);
  });
});
