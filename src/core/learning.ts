import { VOCAB, VOCAB_BY_ID, confusable, hasKanji } from '../content/vocab';
import { GRAMMAR, GRAMMAR_BY_ID } from '../content/grammar';
import { KANJI, KANJI_BY_ID } from '../content/kanji';
import { gradeFromAnswer, isDue, mastery, needsContext, newCard, review } from './srs';
import { rollDaily } from './store';
import type { Card, GameState, SkillArea } from './types';

/**
 * Exercise generation and answer recording. Every learnable item has a card
 * keyed "v:<id>", "g:<id>" or "k:<id>". Seeing an item in the world only
 * creates/updates a card with `encounters`; it is not counted as learned
 * until the player answers questions about it.
 */

export interface Option {
  text: string;
  correct: boolean;
  /** card key this distractor stands for (used for confusion tracking) */
  key?: string;
}

export interface Exercise {
  id: string;
  key?: string;
  area: SkillArea;
  mode: string;
  context: boolean;
  instruction: string;
  /** Japanese prompt (markup allowed) */
  prompt: string;
  promptEn?: string;
  /** text to speak instead of / in addition to showing */
  audio?: string;
  hideTextUntilAnswered?: boolean;
  options?: Option[];
  /** accepted kana answers for typed exercises */
  accept?: string[];
  explanation: string;
  isNew?: boolean;
}

export function rng(seed?: number) {
  let s = seed ?? Math.floor(Math.random() * 2 ** 31);
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function shuffle<T>(arr: T[], r = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN<T>(arr: T[], n: number, r = Math.random): T[] {
  return shuffle(arr, r).slice(0, n);
}

export function meaningOf(id: string, lang: 'en' | 'de') {
  const v = VOCAB_BY_ID[id];
  return lang === 'de' ? v.de : v.en;
}

export function areaOfKey(key: string): SkillArea {
  return key.startsWith('g:') ? 'grammar' : key.startsWith('k:') ? 'kanji' : 'vocab';
}

export function labelOfKey(key: string): string {
  const [t, id] = key.split(':');
  if (t === 'v') return VOCAB_BY_ID[id]?.word ?? id;
  if (t === 'g') return GRAMMAR_BY_ID[id]?.pattern ?? id;
  if (t === 'k') return KANJI_BY_ID[id]?.char ?? id;
  return key;
}

export function keyExists(key: string): boolean {
  const [t, id] = key.split(':');
  return t === 'v' ? !!VOCAB_BY_ID[id] : t === 'g' ? !!GRAMMAR_BY_ID[id] : t === 'k' ? !!KANJI_BY_ID[id] : false;
}

export function allKeys(): string[] {
  return [...VOCAB.map((v) => 'v:' + v.id), ...GRAMMAR.map((g) => 'g:' + g.id), ...KANJI.map((k) => 'k:' + k.id)];
}

/** Register that the player met these items in context. Returns keys that were new. */
export function encounter(s: GameState, keys: string[], now = Date.now()): string[] {
  const fresh: string[] = [];
  for (const key of keys) {
    if (!keyExists(key)) continue;
    let c = s.cards[key];
    if (!c) {
      c = s.cards[key] = newCard(key, now);
      fresh.push(key);
    }
    c.encounters++;
    // kanji are tied to their words: meeting a word also surfaces its kanji
    if (key.startsWith('v:')) {
      for (const k of KANJI) {
        if (k.words.includes(key.slice(2)) && !s.cards['k:' + k.id]) {
          s.cards['k:' + k.id] = newCard('k:' + k.id, now);
          s.cards['k:' + k.id].encounters++;
        }
      }
    }
  }
  return fresh;
}

// ------------------------------------------------------------------
// exercise builders

function vocabExercise(id: string, mode: string, s: GameState, r: () => number): Exercise {
  const v = VOCAB_BY_ID[id];
  const lang = s.settings.meaningLang;
  const others = VOCAB.filter((x) => x.id !== id && !confusable(v, x) && x.word !== v.word);
  const samePos = others.filter((x) => x.pos === v.pos);
  const pool = samePos.length >= 3 ? samePos : others;
  const distract = pickN(pool, 3, r);
  const key = 'v:' + id;
  const base = { id: `${key}:${mode}:${Math.floor(r() * 1e6)}`, key, area: 'vocab' as SkillArea, mode };
  const expl = `**${v.word}**（${v.reading}）— ${lang === 'de' ? v.de : v.en}\n${v.example}\n${v.exampleEn}`;
  switch (mode) {
    case 'reading':
      return {
        ...base, context: false, instruction: 'How is this word read?',
        prompt: v.word,
        options: shuffle([{ text: v.reading, correct: true }, ...readingDistractors(v.reading, r).map((t) => ({ text: t, correct: false }))], r),
        explanation: expl,
      };
    case 'reverse':
      return {
        ...base, context: false, instruction: 'Which word matches this meaning?',
        prompt: lang === 'de' ? v.de : v.en,
        options: shuffle([{ text: v.word, correct: true }, ...distract.map((d) => ({ text: d.word, correct: false, key: 'v:' + d.id }))], r),
        explanation: expl,
      };
    case 'cloze': {
      const sentence = v.example.includes(v.word) ? v.example.replace(v.word, '＿＿＿') : null;
      if (!sentence) return vocabExercise(id, 'sentence', s, r);
      return {
        ...base, context: true, instruction: 'Which word fits the blank?',
        prompt: sentence, promptEn: v.exampleEn,
        options: shuffle([{ text: v.word, correct: true }, ...distract.map((d) => ({ text: d.word, correct: false, key: 'v:' + d.id }))], r),
        explanation: expl,
      };
    }
    case 'sentence':
      return {
        ...base, context: true, instruction: 'What does this sentence mean?',
        prompt: v.example,
        options: shuffle([{ text: v.exampleEn, correct: true }, ...distract.map((d) => ({ text: d.exampleEn, correct: false }))], r),
        explanation: expl,
      };
    case 'listen':
      return {
        ...base, area: 'vocab', context: true, instruction: 'Listen. What does the sentence mean?',
        prompt: v.example, audio: v.example, hideTextUntilAnswered: true,
        options: shuffle([{ text: v.exampleEn, correct: true }, ...distract.map((d) => ({ text: d.exampleEn, correct: false }))], r),
        explanation: expl,
      };
    case 'type':
      return {
        ...base, context: false, instruction: 'Type the reading in hiragana (romaji is converted automatically).',
        prompt: v.word, accept: [v.reading], explanation: expl,
      };
    case 'meaning':
    default:
      return {
        ...base, mode: 'meaning', context: false, instruction: 'What does this word mean?',
        prompt: v.word,
        options: shuffle([{ text: lang === 'de' ? v.de : v.en, correct: true }, ...distract.map((d) => ({ text: lang === 'de' ? d.de : d.en, correct: false, key: 'v:' + d.id }))], r),
        explanation: expl,
      };
  }
}

/** Plausible wrong readings: other readings of similar length plus small mutations. */
export function readingDistractors(reading: string, r: () => number): string[] {
  const swaps: [string, string][] = [
    ['しゅう', 'しゅ'], ['しょう', 'しょ'], ['じょう', 'じょ'], ['りょう', 'りょ'], ['きょう', 'きょ'],
    ['ゆう', 'ゆ'], ['こう', 'こ'], ['かん', 'がん'], ['けい', 'げい'], ['ち', 'じ'], ['さ', 'ざ'], ['た', 'だ'],
    ['か', 'が'], ['っ', ''], ['ん', ''], ['へ', 'べ'], ['き', 'ぎ'], ['し', 'じ'],
  ];
  const out = new Set<string>();
  for (const [a, b] of shuffle(swaps, r)) {
    if (reading.includes(a)) out.add(reading.replace(a, b));
    else if (b && reading.includes(b)) out.add(reading.replace(b, a));
    if (out.size >= 3) break;
  }
  out.delete(reading);
  // prefer real readings of the same length, then ±1, so no option is trivially wrong
  const others = VOCAB.filter((v) => v.reading !== reading);
  const fill = [
    ...shuffle(others.filter((v) => v.reading.length === reading.length), r),
    ...shuffle(others.filter((v) => Math.abs(v.reading.length - reading.length) === 1), r),
  ];
  for (const v of fill) {
    if (out.size >= 3) break;
    out.add(v.reading);
  }
  return [...out].slice(0, 3);
}

function grammarExercise(id: string, mode: string, r: () => number): Exercise {
  const g = GRAMMAR_BY_ID[id];
  const key = 'g:' + id;
  const expl = `**${g.pattern}** — ${g.meaning}\n${g.explanation}\n${g.examples[0].jp}\n${g.examples[0].en}`;
  if (mode === 'meaning') {
    const others = pickN(GRAMMAR.filter((x) => x.id !== id), 3, r);
    return {
      id: `${key}:meaning:${Math.floor(r() * 1e6)}`, key, area: 'grammar', mode, context: false,
      instruction: 'What does this pattern express?', prompt: g.pattern,
      options: shuffle([{ text: g.meaning, correct: true }, ...others.map((o) => ({ text: o.meaning, correct: false, key: 'g:' + o.id }))], r),
      explanation: expl,
    };
  }
  const ex = g.exercises[Math.floor(r() * g.exercises.length)];
  return {
    id: `${key}:cloze:${Math.floor(r() * 1e6)}`, key, area: 'grammar', mode: mode === 'contrast' ? 'contrast' : 'cloze', context: true,
    instruction: mode === 'contrast' ? 'Contrast drill — choose the pattern that fits. Watch the nuance!' : 'Choose the expression that fits the blank.',
    prompt: ex.sentence, promptEn: ex.en,
    options: shuffle(ex.options.map((o, i) => ({ text: o.text, correct: i === ex.answer, key: o.grammar ? 'g:' + o.grammar : undefined })), r),
    explanation: `${ex.why}\n\n${expl}`,
  };
}

function kanjiExercise(id: string, mode: string, r: () => number): Exercise {
  const k = KANJI_BY_ID[id];
  const key = 'k:' + id;
  const word = VOCAB_BY_ID[k.words[Math.floor(r() * k.words.length)]];
  const expl = `**${k.char}** — ${k.meaning}\n音: ${k.on.join('、') || '—'}　訓: ${k.kun.join('、') || '—'}\n${word.word}（${word.reading}）${word.en}`;
  if (mode === 'meaning') {
    const others = pickN(KANJI.filter((x) => x.id !== id), 3, r);
    return {
      id: `${key}:meaning:${Math.floor(r() * 1e6)}`, key, area: 'kanji', mode, context: false,
      instruction: `What does the kanji mean? (as in ${word.word})`, prompt: k.char,
      options: shuffle([{ text: k.meaning, correct: true }, ...others.map((o) => ({ text: o.meaning, correct: false, key: 'k:' + o.id }))], r),
      explanation: expl,
    };
  }
  // reading of the kanji inside a real word, shown in a sentence
  const sentence = word.example.includes(word.word) ? word.example.replace(word.word, `【${word.word}】`) : `【${word.word}】`;
  return {
    id: `${key}:reading:${Math.floor(r() * 1e6)}`, key, area: 'kanji', mode: 'reading', context: true,
    instruction: 'How is the word in 【 】 read?', prompt: sentence, promptEn: word.exampleEn,
    options: shuffle([{ text: word.reading, correct: true }, ...readingDistractors(word.reading, r).map((t) => ({ text: t, correct: false }))], r),
    explanation: expl,
  };
}

/** Builds an exercise for a card, choosing the mode from its learning history. */
export function exerciseFor(s: GameState, key: string, opts: { prefer?: 'listen' | 'context' | 'isolated'; r?: () => number } = {}): Exercise {
  const r = opts.r ?? Math.random;
  const [t, id] = key.split(':');
  const card = s.cards[key];
  const m = mastery(card);
  if (t === 'g') {
    const confused = Object.keys(s.confusions).some((c) => c.startsWith(key + '|') && s.confusions[c] >= 2);
    if (confused) return grammarExercise(id, 'contrast', r);
    if (m === 'seen' && r() < 0.5) return grammarExercise(id, 'meaning', r);
    return grammarExercise(id, 'cloze', r);
  }
  if (t === 'k') return kanjiExercise(id, m === 'seen' || r() < 0.3 ? 'meaning' : 'reading', r);
  // vocab
  let modes: string[];
  if (opts.prefer === 'listen') modes = ['listen'];
  else if (card && needsContext(card)) modes = ['cloze', 'sentence', 'listen'];
  else if (m === 'seen') modes = ['meaning', 'reading'];
  else if (m === 'learning' || m === 'struggling') modes = ['meaning', 'reading', 'cloze', 'reverse'];
  else modes = ['cloze', 'sentence', 'listen', 'type', 'reverse'];
  if (opts.prefer === 'isolated') modes = ['meaning', 'reading', 'reverse'];
  if (opts.prefer === 'context') modes = ['cloze', 'sentence'];
  // kana-only words (conjunctions, onomatopoeia) have nothing to read or type
  if (!hasKanji(VOCAB_BY_ID[id]?.word ?? '')) modes = modes.filter((x) => x !== 'reading' && x !== 'type');
  if (!modes.length) modes = ['meaning', 'cloze'];
  return vocabExercise(id, modes[Math.floor(r() * modes.length)], s, r);
}

// ------------------------------------------------------------------
// queues

export interface QueueInfo {
  due: string[];
  newAvailable: string[];
  newAllowed: number;
  struggling: string[];
}

export function queueInfo(s: GameState, now = Date.now()): QueueInfo {
  rollDaily(s, now);
  const cards = Object.values(s.cards);
  const due = cards.filter((c) => isDue(c, now)).sort((a, b) => a.due - b.due).map((c) => c.key);
  // new = encountered in the world but never studied; chapter items come after
  const encounteredNew = cards.filter((c) => !c.introduced).sort((a, b) => b.encounters - a.encounters).map((c) => c.key);
  const chapterNew = allKeys().filter((k) => !s.cards[k] && chapterOf(k) <= s.chapter);
  const struggling = cards.filter((c) => mastery(c) === 'struggling').map((c) => c.key);
  return {
    due,
    newAvailable: [...encounteredNew, ...chapterNew],
    newAllowed: Math.max(0, s.settings.newPerDay - s.daily.newIntroduced),
    struggling,
  };
}

function chapterOf(key: string): number {
  const [t, id] = key.split(':');
  if (t === 'v') return VOCAB_BY_ID[id]?.chapter ?? 99;
  if (t === 'g') return GRAMMAR_BY_ID[id]?.chapter ?? 99;
  return 1;
}

/** A focused review session: due first, then contrast drills, then limited new items. */
export function buildReviewSession(s: GameState, size = 12, now = Date.now(), r = Math.random): Exercise[] {
  const q = queueInfo(s, now);
  const out: Exercise[] = [];
  const used = new Set<string>();
  for (const k of q.due) {
    if (out.length >= size) break;
    out.push(exerciseFor(s, k, { r }));
    used.add(k);
  }
  // contrast drills for repeated confusions
  for (const [pair, n] of Object.entries(s.confusions)) {
    if (out.length >= size || n < 2) continue;
    const a = pair.split('|')[0];
    if (!used.has(a) && keyExists(a)) {
      out.push(exerciseFor(s, a, { r }));
      used.add(a);
    }
  }
  let newCount = 0;
  for (const k of q.newAvailable) {
    if (out.length >= size || newCount >= q.newAllowed) break;
    if (used.has(k)) continue;
    const ex = exerciseFor(s, k, { r });
    ex.isNew = true;
    out.push(ex);
    used.add(k);
    newCount++;
  }
  return out;
}

/** Picks one exercise for a battle move of the given area, preferring due items. */
export function battleExercise(s: GameState, area: 'vocab' | 'grammar' | 'kanji' | 'listening', r = Math.random): Exercise {
  const now = Date.now();
  const prefix = area === 'grammar' ? 'g:' : area === 'kanji' ? 'k:' : 'v:';
  const cards = Object.values(s.cards).filter((c) => c.key.startsWith(prefix));
  const due = cards.filter((c) => isDue(c, now));
  const studied = cards.filter((c) => c.introduced);
  const met = cards.filter((c) => !c.introduced);
  let pool: Card[] = due.length ? due : met.length && r() < 0.5 ? met : studied.length ? studied : met;
  let key: string;
  if (pool.length) key = pool[Math.floor(r() * pool.length)].key;
  else {
    const all = allKeys().filter((k) => k.startsWith(prefix) && chapterOf(k) <= s.chapter);
    key = all[Math.floor(r() * all.length)];
  }
  return exerciseFor(s, key, { prefer: area === 'listening' ? 'listen' : undefined, r });
}

// ------------------------------------------------------------------
// recording

export function recordAnswer(s: GameState, ex: Exercise, ok: boolean, ms: number, chosen?: Option, now = Date.now()) {
  rollDaily(s, now);
  const st = s.skills[ex.area];
  st.total++;
  st.ms += ms;
  if (ok) st.ok++;
  s.exerciseLog.push({ t: now, key: ex.key ?? ex.id, area: ex.area, mode: ex.mode, ok, ms });
  if (s.exerciseLog.length > 600) s.exerciseLog.splice(0, s.exerciseLog.length - 600);
  if (!ex.key) return;
  let card = s.cards[ex.key];
  if (!card) card = s.cards[ex.key] = newCard(ex.key, now);
  if (!card.introduced) s.daily.newIntroduced++;
  else s.daily.reviews++;
  if (ex.context) ok ? card.ctxOk++ : card.ctxFail++;
  else ok ? card.isoOk++ : card.isoFail++;
  // only reschedule when the item was actually due (or new); early extra practice
  // in battles is logged but does not inflate intervals
  if (!card.introduced || card.due <= now || !ok) review(card, gradeFromAnswer(ok, ms), now);
  card.history.push({ t: now, ok, mode: ex.mode, ms });
  if (card.history.length > 20) card.history.splice(0, card.history.length - 20);
  if (!ok && chosen?.key && chosen.key !== ex.key && chosen.key.startsWith('g:')) {
    const pair = `${ex.key}|${chosen.key}`;
    s.confusions[pair] = (s.confusions[pair] ?? 0) + 1;
  }
}

/** Records a comprehension question (reading / listening) and the linked items. */
export function recordComprehension(s: GameState, area: SkillArea, ok: boolean, ms: number, keys: string[] = [], now = Date.now()) {
  const st = s.skills[area];
  st.total++;
  st.ms += ms;
  if (ok) st.ok++;
  s.exerciseLog.push({ t: now, key: area, area, mode: 'comprehension', ok, ms });
  for (const k of keys) {
    const c = s.cards[k];
    if (!c) continue;
    ok ? c.ctxOk++ : c.ctxFail++;
  }
}
