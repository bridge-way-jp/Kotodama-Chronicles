import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createInitialState } from '../src/core/store';
import { registerCurriculum, curriculumInfo } from '../src/core/curriculum';
import { buildReviewSession, exerciseFor, queueInfo, recordAnswer } from '../src/core/learning';
import { VOCAB, VOCAB_BY_ID } from '../src/content/vocab';
import { KANJI } from '../src/content/kanji';

registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));

describe('N2 curriculum', () => {
  it('loads the N2 list on top of the game content, without duplicates', () => {
    expect(curriculumInfo.n2Words).toBeGreaterThan(1500);
    expect(curriculumInfo.kanji).toBeGreaterThan(250);
    const words = VOCAB.map((v) => v.word);
    expect(new Set(words).size).toBe(words.length);
    expect(new Set(KANJI.map((k) => k.char)).size).toBe(KANJI.length);
    for (const k of KANJI) for (const w of k.words) expect(VOCAB_BY_ID[w], `${k.char} -> ${w}`).toBeTruthy();
  });

  it('every N2 word belongs to a region, N3 words are review material only', () => {
    const jl = VOCAB.filter((v) => v.source === 'jlpt');
    for (const v of jl) {
      if (v.level === 'N2') expect(v.chapter).toBeGreaterThanOrEqual(1);
      else expect(v.chapter).toBe(0);
    }
  });

  it('new items come after the story items, region by region, never N3 review words', () => {
    const s = createInitialState('T');
    const q = queueInfo(s);
    const jl = q.newAvailable.filter((k) => VOCAB_BY_ID[k.slice(2)]?.source === 'jlpt').map((k) => VOCAB_BY_ID[k.slice(2)]);
    expect(jl.length).toBeGreaterThan(1500);
    expect(jl.every((v) => v.level === 'N2')).toBe(true);
    for (let i = 1; i < jl.length; i++) expect(jl[i].chapter).toBeGreaterThanOrEqual(jl[i - 1].chapter);
    // curriculum kanji wait until one of their words is introduced
    expect(q.newAvailable.some((k) => k.startsWith('k:k2_'))).toBe(false);
  });

  it('words without an example sentence are drilled without context', () => {
    const s = createInitialState('T');
    const v = VOCAB.find((x) => x.source === 'jlpt' && !x.example && /[一-鿿]/.test(x.word))!;
    for (let i = 0; i < 40; i++) {
      const ex = exerciseFor(s, 'v:' + v.id);
      expect(['meaning', 'reading', 'reverse', 'type']).toContain(ex.mode);
      expect(ex.prompt).toBeTruthy();
      for (const o of ex.options ?? []) expect(o.text).toBeTruthy();
    }
  });

  it('a review session with curriculum words works end to end and unlocks their kanji', () => {
    const s = createInitialState('T');
    s.settings.newPerDay = 400;
    const session = buildReviewSession(s, 400);
    expect(session.length).toBeGreaterThan(50);
    for (const ex of session) recordAnswer(s, ex, true, 2000, ex.options?.find((o) => o.correct));
    expect(queueInfo(s).newAvailable.some((k) => k.startsWith('k:k2_'))).toBe(true);
  });
});
