import { VOCAB } from '../content/vocab';
import { GRAMMAR } from '../content/grammar';
import { LISTENING } from '../content/texts';
import { ORDERING, PARAPHRASE, PRACTICE_LISTENING, PRACTICE_READING } from '../content/practice';
import { readingDistractors, shuffle } from './learning';
import type { ListeningItem, SkillArea } from './types';

/**
 * Builds N2-style practice sets from the curriculum. Section names follow the
 * public structure of the JLPT N2 (言語知識・読解 / 聴解); the questions
 * themselves are original and not official exam material.
 */

export type Section = '漢字読み' | '文脈規定' | '言い換え類義' | '文法形式の判断' | '文の組み立て' | '読解' | '聴解';

export const SECTIONS: { id: Section; area: SkillArea; en: string; part: '言語知識（文字・語彙・文法）・読解' | '聴解' }[] = [
  { id: '漢字読み', area: 'kanji', en: 'Kanji reading', part: '言語知識（文字・語彙・文法）・読解' },
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
    why: `${v.word}（${v.reading}）— ${v.en}`,
    keys: ['v:' + v.id],
  }));
}

export function contextItems(n: number, r = Math.random, levels = ['N2', 'N1']): TestItem[] {
  const pool = VOCAB.filter((v) => levels.includes(v.level) && v.example.includes(v.word));
  return shuffle(pool, r).slice(0, n).map((v) => {
    const others = shuffle(VOCAB.filter((x) => x.id !== v.id && x.pos === v.pos), r).slice(0, 3).map((x) => x.word);
    while (others.length < 3) others.push(shuffle(VOCAB, r)[0].word);
    return {
      id: `cx:${v.id}`, section: '文脈規定', area: 'vocab',
      instruction: '（　　）に入れるのに最もよいものを選びなさい。',
      prompt: v.example.replace(v.word, '（　　）'),
      ...mc([v.word, ...others], 0, r),
      why: `${v.word}（${v.reading}）— ${v.en}\n${v.exampleEn}`,
      keys: ['v:' + v.id],
    } as TestItem;
  });
}

export function paraphraseItems(n: number, r = Math.random): TestItem[] {
  return shuffle(PARAPHRASE, r).slice(0, n).map((p, i) => ({
    id: `pp:${i}:${p.keys[0]}`, section: '言い換え類義', area: 'vocab',
    instruction: '【　】の言葉に意味が最も近いものを選びなさい。',
    prompt: p.q, ...mc(p.options, p.answer, r), why: p.why, keys: p.keys,
  }));
}

export function grammarItems(n: number, r = Math.random): TestItem[] {
  const pool = GRAMMAR.flatMap((g) => g.exercises.map((ex, i) => ({ g, ex, i })));
  return shuffle(pool, r).slice(0, n).map(({ g, ex, i }) => ({
    id: `gr:${g.id}:${i}`, section: '文法形式の判断', area: 'grammar',
    instruction: '次の文の（　　）に入れるのに最もよいものを選びなさい。',
    prompt: ex.sentence.replace('＿＿', '（　　）'),
    ...mc(ex.options.map((o) => o.text), ex.answer, r),
    why: `${ex.why}\n${ex.en}`,
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
      why: `正しい順番：${o.before}${o.pieces.join('')}${o.after}\n${o.en}`,
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
        prompt: q.q, ...mc(q.options, q.answer, r), why: q.why,
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
        audio: l, prompt: q.q, ...mc(q.options, q.answer, r), why: `${q.why}\n${l.en}`,
        keys: l.vocab.map((v) => 'v:' + v),
      });
    });
  }
  return items.slice(0, n);
}

export function buildSectionPractice(section: Section, n = 6, r = Math.random): TestItem[] {
  switch (section) {
    case '漢字読み': return kanjiReadingItems(n, r);
    case '文脈規定': return contextItems(n, r);
    case '言い換え類義': return paraphraseItems(n, r);
    case '文法形式の判断': return grammarItems(n, r);
    case '文の組み立て': return orderingItems(n, r);
    case '読解': return readingItems(n, r);
    case '聴解': return listeningItems(n, r);
  }
}

/** A shortened mock exam covering every section. */
export function buildMockExam(r = Math.random): TestItem[] {
  return [
    ...kanjiReadingItems(4, r),
    ...contextItems(4, r),
    ...paraphraseItems(3, r),
    ...grammarItems(5, r),
    ...orderingItems(3, r),
    ...readingItems(4, r),
    ...listeningItems(4, r),
  ];
}

export const MOCK_TIME_LIMIT_MS = 35 * 60 * 1000;

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
