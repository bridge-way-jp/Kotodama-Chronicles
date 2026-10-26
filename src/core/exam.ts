import { VOCAB, confusable } from '../content/vocab';
import { GRAMMAR } from '../content/grammar';
import { LISTENING } from '../content/texts';
import { ORDERING, PARAPHRASE, PRACTICE_LISTENING, PRACTICE_READING } from '../content/practice';
import { AFFIXES } from '../content/wordformation';
import { CONFUSIONS } from '../content/confusions';
import { readingDistractors, shuffle, similarWords } from './learning';
import { tr, isDe } from './i18n';
import type { GameState, ListeningItem, PracticeResult, ReadingText, SkillArea, VocabEntry } from './types';

const meaning = (v: VocabEntry) => (isDe() ? v.de : v.en);
const sentence = (v: VocabEntry) => (isDe() && v.exampleDe) || tr(v.exampleEn);

/**
 * Builds N2-style practice sets from the curriculum. Section names follow the
 * public structure of the JLPT N2 (言語知識・読解 / 聴解); the questions
 * themselves are original and not official exam material.
 */

export type Section = '漢字読み' | '語形成' | '文脈規定' | '言い換え類義' | '文法形式の判断' | '文の組み立て' | '読解' | '聴解';

export const SECTIONS: { id: Section; area: SkillArea; en: string; part: '言語知識（文字・語彙・文法）・読解' | '聴解' }[] = [
  { id: '漢字読み', area: 'kanji', en: 'Kanji reading', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '語形成', area: 'vocab', en: 'Word formation (prefix / suffix)', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '文脈規定', area: 'vocab', en: 'Contextually-defined expressions', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '言い換え類義', area: 'vocab', en: 'Paraphrases', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '文法形式の判断', area: 'grammar', en: 'Selecting grammar form', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '文の組み立て', area: 'grammar', en: 'Sentence composition (★)', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '読解', area: 'reading', en: 'Reading comprehension', part: '言語知識（文字・語彙・文法）・読解' },
  { id: '聴解', area: 'listening', en: 'Listening comprehension', part: '聴解' },
];

export interface TestItem {
  id: string;
  section: Section;
  area: SkillArea;
  instruction: string;
  prompt: string;
  passage?: { title: string; body: string };
  audio?: ListeningItem;
  options: string[];
  answer: number;
  why: string;
  keys: string[];
}

function mc(options: string[], answer: number, r: () => number) {
  const order = shuffle(options.map((_, i) => i), r);
  return { options: order.map((i) => options[i]), answer: order.indexOf(answer) };
}

const KANJI_RE = /[一-龯]/;

export function kanjiReadingItems(n: number, r = Math.random, levels = ['N2', 'N1']): TestItem[] {
  const pool = VOCAB.filter((v) => KANJI_RE.test(v.word) && levels.includes(v.level) && v.example.includes(v.word));
  return shuffle(pool, r).slice(0, n).map((v) => ({
    id: `kr:${v.id}`, section: '漢字読み', area: 'kanji',
    instruction: '＿＿の言葉の読み方として最もよいものを選びなさい。',
    prompt: v.example.replace(v.word, `【${v.word}】`),
    ...mc([v.reading, ...readingDistractors(v.reading, r)], 0, r),
    why: `${v.word}（${v.reading}）— ${meaning(v)}`,
    keys: ['v:' + v.id],
  }));
}

export function contextItems(n: number, r = Math.random, levels = ['N2', 'N1']): TestItem[] {
  const pool = VOCAB.filter((v) => levels.includes(v.level) && v.example.includes(v.word));
  return shuffle(pool, r).slice(0, n).map((v) => {
    // distinct distractors of the same part of speech, topped up from the whole list
    const others = [...new Set(similarWords(v, VOCAB.filter((x) => x.word !== v.word && !confusable(v, x)), 6, r).map((x) => x.word))].slice(0, 3);
    for (const x of shuffle(VOCAB, r)) {
      if (others.length >= 3) break;
      if (x.word !== v.word && !x.affix && !confusable(v, x) && !others.includes(x.word)) others.push(x.word);
    }
    return {
      id: `cx:${v.id}`, section: '文脈規定', area: 'vocab',
      instruction: '（　　）に入れるのに最もよいものを選びなさい。',
      prompt: v.example.replace(v.word, '（　　）'),
      ...mc([v.word, ...others], 0, r),
      why: `${v.word}（${v.reading}）— ${meaning(v)}\n${sentence(v)}`,
      keys: ['v:' + v.id],
    } as TestItem;
  });
}

/** 語形成: the affix is blanked out of a real sentence; distractors are affixes of the same kind that do not form a word there */
export function affixItems(n: number, r = Math.random): TestItem[] {
  const pool = AFFIXES.flatMap((a) => a.examples.map((ex) => ({ a, ex })));
  return shuffle(pool, r).slice(0, n).map(({ a, ex }, i) => {
    const blank = a.kind === 'prefix' ? '（　）' + ex.word.slice(a.part.length) : ex.word.slice(0, ex.word.length - a.part.length) + '（　）';
    const wrong = shuffle(AFFIXES.filter((b) => b.kind === a.kind && b.part !== a.part && !ex.alt?.includes(b.part)), r).slice(0, 3).map((b) => b.part);
    return {
      id: `af:${i}:${ex.word}`, section: '語形成', area: 'vocab',
      instruction: '（　）に入れるのに最もよいものを選びなさい。',
      prompt: ex.sentence.replace(ex.word, blank),
      ...mc([a.part, ...wrong], 0, r),
      why: `${ex.word}（${ex.reading}）— ${a.part}（${a.reading}）: ${a.de}`,
      keys: [],
    };
  });
}

/** contrast questions from the Verwechslungsgruppen */
export function confusionItems(n: number, r = Math.random): TestItem[] {
  const pool = CONFUSIONS.flatMap((g) => g.ex.map((ex, i) => ({ g, ex, i })));
  return shuffle(pool, r).slice(0, n).map(({ g, ex, i }) => ({
    id: `cf:${g.id}:${i}`, section: '文法形式の判断', area: 'grammar',
    instruction: '次の文の（　　）に入れるのに最もよいものを選びなさい。',
    prompt: ex.s.split('＿＿').join('（　　）'),
    ...mc(ex.opts, 0, r),
    why: `${tr(ex.why)}\n${tr(ex.en)}\n— ${g.forms.join(' · ')}: ${tr(g.note)}`,
    keys: [],
  }));
}

export function paraphraseItems(n: number, r = Math.random): TestItem[] {
  return shuffle(PARAPHRASE, r).slice(0, n).map((p, i) => ({
    id: `pp:${i}:${p.keys[0]}`, section: '言い換え類義', area: 'vocab',
    instruction: '【　】の言葉に意味が最も近いものを選びなさい。',
    prompt: p.q, ...mc(p.options, p.answer, r), why: tr(p.why), keys: p.keys,
  }));
}

export function grammarItems(n: number, r = Math.random): TestItem[] {
  const pool = GRAMMAR.flatMap((g) => g.exercises.map((ex, i) => ({ g, ex, i })));
  return shuffle(pool, r).slice(0, n).map(({ g, ex, i }) => ({
    id: `gr:${g.id}:${i}`, section: '文法形式の判断', area: 'grammar',
    instruction: '次の文の（　　）に入れるのに最もよいものを選びなさい。',
    prompt: ex.sentence.replace('＿＿', '（　　）'),
    ...mc(ex.options.map((o) => o.text), ex.answer, r),
    why: `${tr(ex.why)}\n${tr(ex.en)}`,
    keys: ['g:' + g.id],
  }));
}

export function orderingItems(n: number, r = Math.random): TestItem[] {
  return shuffle(ORDERING, r).slice(0, n).map((o, i) => {
    const slots = o.pieces.map((_, j) => (j === o.star ? '＿★＿' : '＿＿＿')).join(' ');
    const sorted = mc(o.pieces, o.star, r);
    return {
      id: `or:${i}:${o.keys[0]}`, section: '文の組み立て', area: 'grammar',
      instruction: '次の文の ★ に入る最もよいものを選びなさい。',
      prompt: `${o.before} ${slots} ${o.after}`,
      ...sorted,
      why: `正しい順番：${o.before}${o.pieces.join('')}${o.after}\n${tr(o.en)}`,
      keys: o.keys,
    };
  });
}

export function readingItems(n: number, r = Math.random): TestItem[] {
  const items: TestItem[] = [];
  for (const t of shuffle(PRACTICE_READING, r)) {
    t.questions.forEach((q, i) => {
      items.push({
        id: `rd:${t.id}:${i}`, section: '読解', area: 'reading',
        instruction: '次の文章を読んで、質問に答えなさい。',
        passage: { title: t.title, body: t.body },
        prompt: q.q, ...mc(q.options, q.answer, r), why: tr(q.why),
        keys: t.grammar.map((g) => 'g:' + g),
      });
    });
  }
  return items.slice(0, n);
}

export function listeningItems(n: number, r = Math.random): TestItem[] {
  const items: TestItem[] = [];
  for (const l of shuffle([...PRACTICE_LISTENING, LISTENING.l_cafe_talk], r)) {
    l.questions.forEach((q, i) => {
      items.push({
        id: `ls:${l.id}:${i}`, section: '聴解', area: 'listening',
        instruction: 'まず話を聞いてください。それから質問を読んで、最もよいものを選びなさい。',
        audio: l, prompt: q.q, ...mc(q.options, q.answer, r), why: `${tr(q.why)}\n${tr(l.en)}`,
        keys: l.vocab.map((v) => 'v:' + v),
      });
    });
  }
  return items.slice(0, n);
}

export function buildSectionPractice(section: Section, n = 6, r = Math.random): TestItem[] {
  switch (section) {
    case '漢字読み': return kanjiReadingItems(n, r);
    case '語形成': return affixItems(n, r);
    case '文脈規定': return contextItems(n, r);
    case '言い換え類義': return paraphraseItems(n, r);
    case '文法形式の判断': {
      const c = Math.floor(n / 2);
      return shuffle([...grammarItems(n - c, r), ...confusionItems(c, r)], r);
    }
    case '文の組み立て': return orderingItems(n, r);
    case '読解': return readingItems(n, r);
    case '聴解': return listeningItems(n, r);
  }
}

/** A shortened mock exam covering every section. */
export function buildMockExam(r = Math.random): TestItem[] {
  return [
    ...kanjiReadingItems(4, r),
    ...affixItems(2, r),
    ...contextItems(4, r),
    ...paraphraseItems(3, r),
    ...grammarItems(3, r),
    ...confusionItems(2, r),
    ...orderingItems(3, r),
    ...readingItems(4, r),
    ...listeningItems(4, r),
  ];
}

export const MOCK_TIME_LIMIT_MS = 35 * 60 * 1000;

// ------------------------------------------------------------------ the full mock exam

/** the questions of whole texts, in order (an exam never splits a text) */
function textItems(texts: ReadingText[], r: () => number): TestItem[] {
  return texts.flatMap((t) =>
    t.questions.map((q, i) => ({
      id: `rd:${t.id}:${i}`, section: '読解' as const, area: 'reading' as const,
      instruction: t.kind === 'compare' ? '次のＡとＢの文章を読んで、質問に答えなさい。' : t.kind === 'info' ? '右のページは案内である。これを読んで、質問に答えなさい。' : '次の文章を読んで、質問に答えなさい。',
      passage: { title: t.title, body: t.body },
      prompt: q.q, ...mc(q.options, q.answer, r), why: tr(q.why),
      keys: t.grammar.map((g) => 'g:' + g),
    })),
  );
}

const LISTEN_INSTR: [RegExp, string][] = [
  [/^n2_task/, 'まず質問を聞いてください。それから話を聞いて、このあと何をするか、最もよいものを選びなさい。'],
  [/^n2_point/, 'まず質問を聞いてください。そのあと話を聞いて、最もよいものを選びなさい。'],
  [/^n2_gist/, 'この問題では、話全体としてどんな内容かを聞きます。話を聞いて、最もよいものを選びなさい。'],
  [/^n2_quick/, 'まず文を聞いてください。それから、その返事として最もよいものを選びなさい。'],
  [/^n2_integrated/, '長めの話を聞きます。話を聞いて、最もよいものを選びなさい。'],
];

function listenItems(items: ListeningItem[], r: () => number): TestItem[] {
  return items.flatMap((l) =>
    l.questions.map((q, i) => ({
      id: `ls:${l.id}:${i}`, section: '聴解' as const, area: 'listening' as const,
      instruction: LISTEN_INSTR.find(([re]) => re.test(l.id))?.[1] ?? 'まず話を聞いてください。それから質問を読んで、最もよいものを選びなさい。',
      audio: l, prompt: q.q, ...mc(q.options, q.answer, r), why: `${tr(q.why)}\n${tr(l.en)}`,
      keys: l.vocab.map((v) => 'v:' + v),
    })),
  );
}

/** whole texts of a kind until at least n questions */
function pickTexts<X extends { questions: unknown[] }>(pool: X[], n: number, r: () => number, not = new Set<X>()): X[] {
  const out: X[] = [];
  let q = 0;
  for (const t of shuffle(pool.filter((x) => !not.has(x)), r)) {
    if (q >= n) break;
    out.push(t);
    not.add(t);
    q += t.questions.length;
  }
  return out;
}

/**
 * The full mock exam, in the length and order of the real N2: part 1 言語知識（文字・語彙・文法）・読解 (105 minutes),
 * part 2 聴解 (50 minutes). The item counts follow the public test structure; the questions are original.
 */
export function buildFullExam(r = Math.random): TestItem[] {
  const usedR = new Set<ReadingText>();
  const kind = (k: string) => PRACTICE_READING.filter((t) => t.kind === k);
  const short = PRACTICE_READING.filter((t) => t.questions.length === 1);
  const reading = [
    ...pickTexts(short, 5, r, usedR),
    ...pickTexts(PRACTICE_READING.filter((t) => t.questions.length >= 3 && t.kind !== 'info' && !t.id.startsWith('n2_long')), 9, r, usedR),
    ...pickTexts(kind('compare'), 2, r, usedR),
    ...pickTexts(PRACTICE_READING.filter((t) => t.id.startsWith('n2_long')), 3, r, usedR),
    ...pickTexts(kind('info'), 2, r, usedR),
  ];
  const usedL = new Set<ListeningItem>();
  const of = (re: RegExp) => PRACTICE_LISTENING.filter((l) => re.test(l.id));
  const listening = [
    ...pickTexts(of(/^n2_task/), 3, r, usedL),
    ...pickTexts(of(/^n2_point/), 3, r, usedL),
    ...pickTexts(of(/^n2_gist/), 2, r, usedL),
    ...pickTexts(of(/^n2_quick/), 8, r, usedL),
    ...pickTexts(of(/^n2_integrated/), 3, r, usedL),
  ];
  // the rest of the listening part from the other practice dialogues
  listening.push(...pickTexts(PRACTICE_LISTENING, 30 - listening.reduce((n, l) => n + l.questions.length, 0), r, usedL));
  return [
    ...kanjiReadingItems(10, r),
    ...affixItems(5, r),
    ...contextItems(7, r),
    ...paraphraseItems(5, r),
    ...grammarItems(8, r),
    ...confusionItems(4, r),
    ...orderingItems(5, r),
    ...textItems(reading, r),
    ...listenItems(listening, r),
  ];
}

/** the time of each part of the full mock exam, as in the real N2 */
export const FULL_TIME_MS = { 言語知識: 105 * 60 * 1000, 聴解: 50 * 60 * 1000 };

/**
 * A JLPT-style score of an exam result: the three scored parts of the N2 (言語知識（文字・語彙・文法）, 読解, 聴解),
 * each 0–60, total 0–180. The N2 passes with 90 in total and at least 19 in each part. The real JLPT scales its scores;
 * this simple proportion is only an estimate.
 */
export function jlptScore(sections: PracticeResult['sections']) {
  const part = (ids: string[]) => {
    let ok = 0;
    let total = 0;
    for (const id of ids) {
      ok += sections[id]?.ok ?? 0;
      total += sections[id]?.total ?? 0;
    }
    return total ? Math.round((60 * ok) / total) : 0;
  };
  const knowledge = part(['漢字読み', '語形成', '文脈規定', '言い換え類義', '文法形式の判断', '文の組み立て']);
  const reading = part(['読解']);
  const listening = part(['聴解']);
  const total = knowledge + reading + listening;
  return { knowledge, reading, listening, total, pass: total >= JLPT_PASS.total && Math.min(knowledge, reading, listening) >= JLPT_PASS.part };
}

export const JLPT_PASS = { total: 90, part: 19 };

/** Diagnostic: N3 review + N2 items across all skills. */
export function buildDiagnostic(r = Math.random): TestItem[] {
  return [
    ...kanjiReadingItems(2, r, ['N3']),
    ...kanjiReadingItems(3, r, ['N2']),
    ...contextItems(2, r, ['N3']),
    ...contextItems(2, r, ['N2']),
    ...grammarItems(4, r),
    ...orderingItems(1, r),
    ...readingItems(2, r),
    ...listeningItems(2, r),
  ];
}

// ------------------------------------------------------------------ chapter exams

/** the share of right answers a chapter exam needs */
export const CHAPTER_PASS = 0.7;

/**
 * The exam at the end of a chapter: the words, kanji and grammar of that region (the ones the player has met
 * first), in N2 form. It has to be passed before the next chapter begins; missed items go into the reviews.
 */
export function buildChapterExam(s: GameState, ch: number, r = Math.random): TestItem[] {
  const met = (k: string) => !!s.cards[k];
  const metFirst = <T>(xs: T[], key: (x: T) => string) => [...shuffle(xs.filter((x) => met(key(x))), r), ...shuffle(xs.filter((x) => !met(key(x))), r)];
  const words = VOCAB.filter((v) => v.chapter === ch && v.level !== 'story' && !v.affix);
  const used = new Set<string>();
  const take = (xs: VocabEntry[], n: number) => {
    const out: VocabEntry[] = [];
    for (const v of metFirst(xs, (x) => 'v:' + x.id)) {
      if (out.length >= n) break;
      if (used.has(v.id)) continue;
      used.add(v.id);
      out.push(v);
    }
    return out;
  };
  const items: TestItem[] = [];
  for (const v of take(words.filter((x) => KANJI_RE.test(x.word)), 5))
    items.push({
      id: `ce:${ch}:kr:${v.id}`, section: '漢字読み', area: 'kanji',
      instruction: '＿＿の言葉の読み方として最もよいものを選びなさい。',
      prompt: v.example.includes(v.word) ? v.example.replace(v.word, `【${v.word}】`) : `【${v.word}】`,
      ...mc([v.reading, ...readingDistractors(v.reading, r)], 0, r),
      why: `${v.word}（${v.reading}）— ${meaning(v)}`,
      keys: ['v:' + v.id],
    });
  for (const v of take(words.filter((x) => x.example.includes(x.word)), 3)) {
    const others = similarWords(v, VOCAB.filter((x) => x.word !== v.word && !confusable(v, x) && !x.affix), 3, r).map((x) => x.word);
    items.push({
      id: `ce:${ch}:cx:${v.id}`, section: '文脈規定', area: 'vocab',
      instruction: '（　　）に入れるのに最もよいものを選びなさい。',
      prompt: v.example.replace(v.word, '（　　）'),
      ...mc([v.word, ...others], 0, r),
      why: `${v.word}（${v.reading}）— ${meaning(v)}\n${sentence(v)}`,
      keys: ['v:' + v.id],
    });
  }
  for (const v of take(words, 5)) {
    const pool = VOCAB.filter((x) => x.id !== v.id && !x.affix && meaning(x) !== meaning(v) && !confusable(v, x));
    const others = [...new Set(similarWords(v, pool, 6, r).map(meaning))].filter((m) => m !== meaning(v)).slice(0, 3);
    if (others.length < 3) continue;
    items.push({
      id: `ce:${ch}:mn:${v.id}`, section: '言い換え類義', area: 'vocab',
      instruction: '【　】の言葉の意味として最もよいものを選びなさい。',
      prompt: `【${v.word}】`,
      ...mc([meaning(v), ...others], 0, r),
      why: `${v.word}（${v.reading}）— ${meaning(v)}`,
      keys: ['v:' + v.id],
    });
  }
  // the chapter's grammar, topped up with grammar met in earlier chapters when it has few points of its own
  const own = metFirst(GRAMMAR.filter((g) => g.chapter === ch && g.exercises.length), (g) => 'g:' + g.id);
  const before = GRAMMAR.filter((g) => g.chapter < ch && g.exercises.length);
  const earlier = [...shuffle(before.filter((g) => met('g:' + g.id)), r), ...shuffle(before.filter((g) => !met('g:' + g.id)), r)];
  const grammar = [...own, ...earlier].slice(0, 5);
  for (const g of grammar) {
    const ex = g.exercises[Math.floor(r() * g.exercises.length)];
    items.push({
      id: `ce:${ch}:gr:${g.id}`, section: '文法形式の判断', area: 'grammar',
      instruction: '次の文の（　　）に入れるのに最もよいものを選びなさい。',
      prompt: ex.sentence.replace('＿＿', '（　　）'),
      ...mc(ex.options.map((o) => o.text), ex.answer, r),
      why: `${tr(ex.why)}\n${tr(ex.en)}`,
      keys: ['g:' + g.id],
    });
  }
  return [...items, ...readingItems(1, r), ...listeningItems(1, r)];
}

/** the chapters whose exam can be taken (their story is done) */
export const chapterExamsOpen = (s: GameState) => [1, 2, 3, 4, 5, 6, 7].filter((c) => s.flags[`chapter${c}_done`]);
export const chapterExamPassed = (s: GameState, ch: number) => !!s.flags[`exam_ch${ch}`];
