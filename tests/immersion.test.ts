import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { newCard } from '../src/core/srs';
import { VOCAB, hasKanji } from '../src/content/vocab';
import { buildConfusionSession, confusionPairs, exerciseFor, recordAnswer, rng } from '../src/core/learning';
import { normalizeKana } from '../src/core/romaji';
import type { Card } from '../src/core/types';

const withExample = VOCAB.filter((v) => !v.affix && v.example.includes(v.word) && hasKanji(v.word));
const card = (key: string, interval: number): Card => ({ ...newCard(key), introduced: true, interval, history: [{ t: 0, ok: true, mode: 'meaning', ms: 2000 }] });

describe('less English, more writing', () => {
  it('well-known words are asked in Japanese only, often written yourself', () => {
    const s = createInitialState('T');
    const r = rng(7);
    const modes = new Set<string>();
    for (const v of withExample.slice(0, 40)) {
      const key = 'v:' + v.id;
      s.cards[key] = card(key, 30);
      for (let i = 0; i < 5; i++) {
        const ex = exerciseFor(s, key, { r });
        modes.add(ex.mode);
        expect(['meaning', 'sentence', 'listen', 'reverse']).not.toContain(ex.mode);
        if (!ex.options) expect(ex.accept!.length).toBeGreaterThan(0);
      }
    }
    expect(modes.has('produce')).toBe(true);
  });

  it('a written answer accepts the reading in hiragana or romaji', () => {
    const s = createInitialState('T');
    const v = withExample[0];
    const key = 'v:' + v.id;
    s.cards[key] = card(key, 30);
    let ex = exerciseFor(s, key, { r: rng(1) });
    for (let i = 2; ex.mode !== 'produce' && i < 200; i++) ex = exerciseFor(s, key, { r: rng(i) });
    expect(ex.mode).toBe('produce');
    expect(ex.prompt).toContain('＿＿＿');
    expect(ex.prompt).not.toContain(v.word);
    expect(ex.accept!.some((a) => normalizeKana(a) === normalizeKana(v.reading))).toBe(true);
  });
});

describe('mix-ups', () => {
  it('a word picked instead of another is recorded and then drilled against it', () => {
    const s = createInitialState('T');
    const [a, b] = withExample;
    const ka = 'v:' + a.id;
    const kb = 'v:' + b.id;
    s.cards[ka] = card(ka, 5);
    const ex = exerciseFor(s, ka, { prefer: 'context', r: rng(3) });
    for (let i = 0; i < 2; i++) recordAnswer(s, ex, false, 3000, { text: b.word, correct: false, key: kb });
    expect(confusionPairs(s)).toEqual([{ a: ka, b: kb, n: 2 }]);
    const drill = exerciseFor(s, ka, { r: rng(4) });
    expect(drill.mode).toBe('contrast');
    expect(drill.options!.some((o) => o.key === kb)).toBe(true);
    expect(drill.explanation).toContain(b.reading);
    const session = buildConfusionSession(s);
    expect(session.map((e) => e.key)).toEqual([ka, kb]);
    expect(session[1].options!.some((o) => o.key === ka)).toBe(true);
  });
});
