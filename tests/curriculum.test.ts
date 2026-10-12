import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createInitialState } from '../src/core/store';
import { registerCurriculum, curriculumInfo } from '../src/core/curriculum';
import { buildReviewSession, exerciseFor, queueInfo, recordAnswer } from '../src/core/learning';
import { VOCAB, VOCAB_BY_ID, wordForm } from '../src/content/vocab';
import { KANJI } from '../src/content/kanji';
import { GRAMMAR, GRAMMAR_BY_ID } from '../src/content/grammar';

registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));

describe('N2 curriculum', () => {
  it('loads the N2 list on top of the game content, without duplicates', () => {
    expect(curriculumInfo.n2Words).toBeGreaterThan(1500);
    expect(curriculumInfo.kanji).toBeGreaterThan(250);
    // an affix and a whole word may share characters (～位 い / 位 くらい), so compare written forms
    const words = VOCAB.map(wordForm);
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

  it('imported words are clean: no notes, brackets or ～ left in the word or reading', () => {
    for (const v of VOCAB.filter((x) => x.source === 'jlpt')) {
      expect(v.word, v.id).not.toMatch(/[()（）～〜\s;]/);
      expect(v.reading, v.id).not.toMatch(/[()（）～〜\s;]/);
    }
    // bound affixes are marked, and the whole word with the same characters is kept as well
    expect(VOCAB.find((v) => v.word === '館' && v.affix === 'suffix')).toBeTruthy();
    expect(VOCAB.find((v) => v.word === '位' && v.reading === 'くらい' && !v.affix)).toBeTruthy();
  });

  it('wrong answers are whole words of the same script, never a lone affix', () => {
    const s = createInitialState('T');
    const hasKanji = (w: string) => /[一-龯々]/.test(w);
    const words = VOCAB.filter((v) => !v.affix && hasKanji(v.word)).slice(0, 300);
    for (const v of words) {
      const ex = exerciseFor(s, 'v:' + v.id, { prefer: 'isolated' });
      if (ex.mode !== 'reverse') continue;
      for (const o of ex.options ?? []) {
        expect(o.text, `${v.word}: ${o.text}`).not.toMatch(/～/);
        expect(hasKanji(o.text), `${v.word}: ${o.text}`).toBe(true);
      }
    }
    // an affix is shown with its ～ and only asked for its reading or meaning
    const kan = VOCAB.find((v) => v.word === '館' && v.affix)!;
    for (let i = 0; i < 20; i++) {
      const ex = exerciseFor(s, 'v:' + kan.id);
      expect(['meaning', 'reading', 'reverse']).toContain(ex.mode);
      if (ex.mode !== 'reverse') expect(ex.prompt).toBe('～館');
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


describe('N2 course grammar', () => {
  it('every entry is complete and its exercises are well-formed', () => {
    const ids = GRAMMAR.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    const course = GRAMMAR.filter((g) => g.source === 'n2course');
    expect(course.length).toBeGreaterThanOrEqual(20);
    for (const g of course) {
      expect(g.meaning && g.formation && g.explanation && g.nuance && g.mistakes, g.id).toBeTruthy();
      expect(g.examples.length, g.id).toBeGreaterThanOrEqual(2);
      expect(g.exercises.length, g.id).toBeGreaterThanOrEqual(2);
      for (const s of g.similar) expect(GRAMMAR_BY_ID[s], `${g.id} similar ${s}`).toBeTruthy();
      for (const ex of g.exercises) {
        expect(ex.sentence.split('＿＿').length - 1, ex.sentence).toBe(1);
        expect(ex.options.length).toBe(4);
        expect(new Set(ex.options.map((o) => o.text)).size, ex.sentence).toBe(4);
        expect(ex.options[ex.answer].grammar, ex.sentence).toBe(g.id);
        for (const o of ex.options) if (o.grammar) expect(GRAMMAR_BY_ID[o.grammar], `${g.id}: ${o.grammar}`).toBeTruthy();
        expect(ex.why.length).toBeGreaterThan(20);
      }
    }
  });

  it('course grammar is available from the start, after chapter-1 story grammar', () => {
    const s = createInitialState('T');
    const q = queueInfo(s).newAvailable.filter((k) => k.startsWith('g:'));
    const firstCourse = q.findIndex((k) => GRAMMAR_BY_ID[k.slice(2)].source === 'n2course');
    expect(firstCourse).toBeGreaterThan(0);
    expect(q.slice(0, firstCourse).every((k) => GRAMMAR_BY_ID[k.slice(2)].chapter === 1)).toBe(true);
  });
});
