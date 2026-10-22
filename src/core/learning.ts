import { VOCAB, VOCAB_BY_ID, confusable, hasKanji, wordForm } from '../content/vocab';
import { GRAMMAR, GRAMMAR_BY_ID } from '../content/grammar';
import { KANJI, KANJI_BY_ID } from '../content/kanji';
import { gradeFromAnswer, isDue, mastery, needsContext, newCard, review } from './srs';
import { rollDaily, todayKey } from './store';
import { toast } from './events';
import { ttsAvailable } from './audio';
import type { VocabEntry, Card, GameState, SkillArea } from './types';

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

const script = (w: string) => (hasKanji(w) ? 'kanji' : /^[ァ-ヿー]+$/.test(w) ? 'katakana' : 'kana');

/**
 * Wrong answers that look like real competitors: same part of speech, same script (kanji /
 * hiragana / katakana), similar length, and an affix only for an affix. The closest candidates
 * are drawn at random, so an answer can't be spotted by its shape alone.
 */
export function similarWords(v: VocabEntry, pool: VocabEntry[], n: number, r = Math.random): VocabEntry[] {
  const sc = script(v.word);
  let cands = pool.filter((x) => !!x.affix === !!v.affix);
  // the script must match whenever there are enough such words (a kana option among kanji is a giveaway)
  const sameScript = cands.filter((x) => script(x.word) === sc);
  if (sameScript.length >= n * 3) cands = sameScript;
  const score = (x: VocabEntry) =>
    (x.pos === v.pos ? 0 : 2) + (script(x.word) === sc ? 0 : 3) + Math.min(3, Math.abs(x.word.length - v.word.length)) + (x.affix && x.affix !== v.affix ? 2 : 0);
  const ranked = shuffle(cands, r).sort((a, b) => score(a) - score(b));
  // pick from the best few dozen so the same distractors don't always appear together
  return pickN(ranked.slice(0, Math.max(n * 8, 24)), n, r);
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
  if (t === 'v') return VOCAB_BY_ID[id] ? wordForm(VOCAB_BY_ID[id]) : id;
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

function vocabExercise(id: string, mode: string, s: GameState, r: () => number, partner?: string): Exercise {
  const v = VOCAB_BY_ID[id];
  const lang = s.settings.meaningLang;
  const others = VOCAB.filter(
    (x) => x.id !== id && !confusable(v, x) && x.word !== v.word && x.de !== v.de && x.en !== v.en && x.exampleEn !== v.exampleEn && (x.example || (mode !== 'sentence' && mode !== 'listen')),
  );
  // a word the player mixed this one up with is always among the options of a contrast drill
  const mixed = partner ? VOCAB_BY_ID[partner] : undefined;
  const distract = mixed ? [mixed, ...similarWords(v, others.filter((x) => x.id !== mixed.id), 2, r)] : similarWords(v, others, 3, r);
  const form = wordForm(v);
  const key = 'v:' + id;
  const base = { id: `${key}:${mode}:${Math.floor(r() * 1e6)}`, key, area: 'vocab' as SkillArea, mode };
  const tr = (x: VocabEntry) => (lang === 'de' && x.exampleDe) || x.exampleEn;
  const expl = `**${form}**（${v.reading}）— ${lang === 'de' ? v.de : v.en}\n${v.example}\n${tr(v)}`;
  const meaning = lang === 'de' ? v.de : v.en;
  const blank = v.example.includes(v.word) ? v.example.replace(v.word, '＿＿＿') : null;
  switch (mode) {
    case 'contrast': {
      const vs = mixed ? `${wordForm(mixed)}（${mixed.reading}）— ${lang === 'de' ? mixed.de : mixed.en}` : '';
      const why = vs ? `\n\n⚖ ${vs}\n${mixed!.example}\n${tr(mixed!)}` : '';
      if (!blank)
        return {
          ...base, mode: 'contrast', context: false, instruction: 'Words you mixed up — which one means this?',
          prompt: meaning,
          options: shuffle([{ text: form, correct: true }, ...distract.map((d) => ({ text: wordForm(d), correct: false, key: 'v:' + d.id }))], r),
          explanation: expl + why,
        };
      return {
        ...base, mode: 'contrast', context: true, instruction: 'Words you mixed up — which one fits the blank?',
        prompt: blank, promptEn: tr(v),
        options: shuffle([{ text: v.word, correct: true }, ...distract.map((d) => ({ text: d.word, correct: false, key: 'v:' + d.id }))], r),
        explanation: expl + why,
      };
    }
    case 'produce':
      // write the word yourself: the sentence with a gap and the meaning as the only hint
      if (!blank) return vocabExercise(id, 'type', s, r);
      return {
        ...base, context: true, instruction: `Write the missing word: “${meaning}” (hiragana or romaji).`,
        prompt: blank, promptEn: tr(v), accept: [v.reading, v.word], explanation: expl,
      };
    case 'listencloze':
      // Japanese only: hear the whole sentence, then pick the word that was in the gap
      if (!blank) return vocabExercise(id, 'cloze', s, r);
      return {
        ...base, context: true, instruction: 'Listen. Which word goes in the gap?',
        prompt: blank, promptEn: tr(v), audio: v.example,
        options: shuffle([{ text: v.word, correct: true }, ...distract.map((d) => ({ text: d.word, correct: false, key: 'v:' + d.id }))], r),
        explanation: expl,
      };
    case 'reading':
      return {
        ...base, context: false, instruction: 'How is this word read?',
        prompt: form,
        options: shuffle([{ text: v.reading, correct: true }, ...readingDistractors(v.reading, r).map((t) => ({ text: t, correct: false }))], r),
        explanation: expl,
      };
    case 'reverse':
      return {
        ...base, context: false, instruction: 'Which word matches this meaning?',
        prompt: lang === 'de' ? v.de : v.en,
        options: shuffle([{ text: form, correct: true }, ...distract.map((d) => ({ text: wordForm(d), correct: false, key: 'v:' + d.id }))], r),
        explanation: expl,
      };
    case 'cloze': {
      const sentence = v.example.includes(v.word) ? v.example.replace(v.word, '＿＿＿') : null;
      if (!sentence) return vocabExercise(id, 'sentence', s, r);
      return {
        ...base, context: true, instruction: 'Which word fits the blank?',
        prompt: sentence, promptEn: tr(v),
        options: shuffle([{ text: v.word, correct: true }, ...distract.map((d) => ({ text: d.word, correct: false, key: 'v:' + d.id }))], r),
        explanation: expl,
      };
    }
    case 'sentence':
      return {
        ...base, context: true, instruction: 'What does this sentence mean?',
        prompt: v.example,
        options: shuffle([{ text: tr(v), correct: true }, ...distract.map((d) => ({ text: tr(d), correct: false }))], r),
        explanation: expl,
      };
    case 'listen':
      return {
        ...base, area: 'vocab', context: true, instruction: 'Listen. What does the sentence mean?',
        prompt: v.example, audio: v.example, hideTextUntilAnswered: true,
        options: shuffle([{ text: tr(v), correct: true }, ...distract.map((d) => ({ text: tr(d), correct: false }))], r),
        explanation: expl,
      };
    case 'type':
      return {
        ...base, context: false, instruction: 'Type the reading in hiragana (romaji is converted automatically).',
        prompt: form, accept: [v.reading], explanation: expl,
      };
    case 'meaning':
    default:
      return {
        ...base, mode: 'meaning', context: false, instruction: v.affix ? 'What does this prefix / suffix mean?' : 'What does this word mean?',
        prompt: form,
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
  // (whole words only: a lone affix reading like い or しょう is an easy giveaway)
  const kata = (w: string) => /^[ァ-ヿー]+$/.test(w);
  const others = VOCAB.filter((v) => v.reading !== reading && !v.affix && kata(v.reading) === kata(reading));
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
  const expl = `**${g.pattern}** — ${g.meaning}\n${g.explanation}\n${g.examples[0]?.jp ?? ''}\n${g.examples[0]?.en ?? ''}`;
  if (mode === 'meaning' || !g.exercises.length) {
    // meanings of imported items are German, built-in ones English: only compare like with like
    const others = pickN(GRAMMAR.filter((x) => x.id !== id && (x.source === 'anki') === (g.source === 'anki')), 3, r);
    return {
      id: `${key}:meaning:${Math.floor(r() * 1e6)}`, key, area: 'grammar', mode: 'meaning', context: false,
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
  // show the kanji inside a whole word when there is one (an affix like ～館 is a weaker example)
  const whole = k.words.filter((w) => !VOCAB_BY_ID[w]?.affix);
  const ids = whole.length ? whole : k.words;
  const word = VOCAB_BY_ID[ids[Math.floor(r() * ids.length)]];
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
  if (mode === 'type')
    return {
      id: `${key}:type:${Math.floor(r() * 1e6)}`, key, area: 'kanji', mode: 'type', context: true,
      instruction: 'Write the reading of the word in 【 】 (hiragana or romaji).', prompt: sentence, promptEn: word.exampleEn,
      accept: [word.reading], explanation: expl,
    };
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
  if (t === 'k') {
    if (m === 'seen' || r() < 0.3) return kanjiExercise(id, 'meaning', r);
    // well-known kanji: write the reading yourself now and then instead of picking it
    return kanjiExercise(id, (m === 'mature' || m === 'young') && !opts.prefer && r() < 0.4 ? 'type' : 'reading', r);
  }
  // vocab: a word mixed up with another one twice or more comes back as a drill between the two
  const partner = opts.prefer ? null : confusedWith(s, key);
  if (partner?.startsWith('v:') && VOCAB_BY_ID[partner.slice(2)] && !VOCAB_BY_ID[id]?.affix) return vocabExercise(id, 'contrast', s, r, partner.slice(2));
  // the better a word is known, the less English: from picking a meaning to Japanese-only gaps and writing it yourself
  let modes: string[];
  if (opts.prefer === 'listen') modes = ['listen'];
  else if (card && needsContext(card)) modes = ['cloze', 'sentence', 'listen'];
  else if (m === 'seen') modes = ['meaning', 'reading'];
  else if (m === 'learning' || m === 'struggling') modes = ['meaning', 'reading', 'cloze', 'reverse', 'type'];
  else if (m === 'young') modes = ['cloze', 'listencloze', 'type', 'produce', 'reverse', 'sentence'];
  else modes = ['cloze', 'listencloze', 'produce', 'produce', 'type'];
  if (opts.prefer === 'isolated') modes = ['meaning', 'reading', 'reverse'];
  if (opts.prefer === 'context') modes = ['cloze', 'sentence'];
  // an affix is only asked for its reading or meaning (it never stands alone in a sentence)
  if (VOCAB_BY_ID[id]?.affix) modes = modes.filter((x) => x === 'meaning' || x === 'reading' || x === 'reverse');
  // kana-only words (conjunctions, onomatopoeia) have nothing to read or type
  if (!hasKanji(VOCAB_BY_ID[id]?.word ?? '')) modes = modes.filter((x) => x !== 'reading' && x !== 'type');
  if (!ttsAvailable()) modes = modes.filter((x) => x !== 'listencloze');
  // curriculum words without an example sentence yet are drilled without context
  const noExample = !VOCAB_BY_ID[id]?.example;
  if (noExample) modes = modes.filter((x) => x !== 'cloze' && x !== 'sentence' && x !== 'listen' && x !== 'listencloze' && x !== 'produce');
  if (!modes.length) modes = noExample ? ['meaning', 'reverse'] : ['meaning', 'cloze'];
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
  // cards whose item left the curriculum (or whose word list failed to load) are skipped, not lost
  const cards = Object.values(s.cards).filter((c) => keyExists(c.key));
  const due = cards.filter((c) => isDue(c, now)).sort((a, b) => a.due - b.due).map((c) => c.key);
  // new = encountered in the world but never studied; chapter items come after
  const encounteredNew = cards.filter((c) => !c.introduced).sort((a, b) => b.encounters - a.encounters).map((c) => c.key);
  const chapterNew = allKeys()
    .filter((k) => !s.cards[k] && isNewCandidate(s, k))
    .map((k, i) => [k, chapterOf(k) * 1e5 + i] as const)
    .sort((a, b) => a[1] - b[1])
    .map(([k]) => k);
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
  if (t === 'k') return KANJI_BY_ID[id]?.chapter ?? 1;
  return 1;
}

/**
 * Story items unlock with the story chapter. The N2 course (imported words, course grammar) is available
 * from the start and comes region by region (N3 review words only when met); its kanji follow once one of their
 * words has been introduced.
 */
function isNewCandidate(s: GameState, key: string): boolean {
  const [t, id] = key.split(':');
  if (t === 'v' && VOCAB_BY_ID[id]?.source === 'jlpt') return VOCAB_BY_ID[id].chapter > 0;
  if (t === 'g' && GRAMMAR_BY_ID[id]?.source === 'n2course') return true;
  if (t === 'k' && KANJI_BY_ID[id]?.source === 'jlpt') return KANJI_BY_ID[id].words.some((w) => s.cards['v:' + w]?.introduced);
  return chapterOf(key) <= s.chapter;
}

/** A focused review session: due first, then contrast drills, then limited new items. */
/** the items you get wrong most often (at least two tries, under 70 % correct), worst first */
export function buildWeakSession(s: GameState, size = 10, r = Math.random): Exercise[] {
  const weak = Object.values(s.cards)
    .filter((c) => c.introduced && keyExists(c.key))
    .map((c) => {
      const ok = c.isoOk + c.ctxOk;
      const fail = c.isoFail + c.ctxFail;
      return { key: c.key, total: ok + fail, rate: ok / Math.max(1, ok + fail) };
    })
    .filter((x) => x.total >= 2 && x.rate < 0.7)
    .sort((a, b) => a.rate - b.rate || b.total - a.total)
    .slice(0, size);
  return weak.map((w) => exerciseFor(s, w.key, { r }));
}

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
/** keys asked in the last few battle questions, so the same item doesn't come back every turn */
const recentBattleKeys: string[] = [];
const RECENT_BATTLE = 6;

export function battleExercise(s: GameState, area: 'vocab' | 'grammar' | 'kanji' | 'listening', r = Math.random): Exercise {
  const now = Date.now();
  const prefix = area === 'grammar' ? 'g:' : area === 'kanji' ? 'k:' : 'v:';
  const cards = Object.values(s.cards).filter((c) => c.key.startsWith(prefix) && keyExists(c.key));
  const due = cards.filter((c) => isDue(c, now));
  const studied = cards.filter((c) => c.introduced);
  const met = cards.filter((c) => !c.introduced);
  let pool: Card[] = due.length ? due : met.length && r() < 0.5 ? met : studied.length ? studied : met;
  // with only a few items due, mix in other studied ones so battles don't drill one word
  if (due.length && due.length < 4 && studied.length > due.length && r() < 0.5) pool = studied;
  const fresh = (list: Card[]) => list.filter((c) => !recentBattleKeys.includes(c.key));
  if (fresh(pool).length) pool = fresh(pool);
  else if (fresh(cards).length) pool = fresh(cards);
  else if (cards.length > 1) {
    // everything was asked recently (few studied items): take the one asked longest ago, never the one just before
    const age = (c: Card) => recentBattleKeys.lastIndexOf(c.key);
    const oldest = Math.min(...cards.map(age));
    pool = cards.filter((c) => age(c) === oldest);
  }
  let key: string;
  if (pool.length) key = pool[Math.floor(r() * pool.length)].key;
  else {
    const all = allKeys().filter((k) => k.startsWith(prefix) && chapterOf(k) <= s.chapter);
    const unseen = all.filter((k) => !recentBattleKeys.includes(k));
    const from = unseen.length ? unseen : all;
    key = from[Math.floor(r() * from.length)];
  }
  recentBattleKeys.push(key);
  if (recentBattleKeys.length > RECENT_BATTLE) recentBattleKeys.shift();
  return exerciseFor(s, key, { prefer: area === 'listening' ? 'listen' : undefined, r });
}

// ------------------------------------------------------------------
// recording

export const DAILY_GOAL = 20;
const dayNum = (now: number) => Number(todayKey(now).replace(/-/g, ''));
/** answers given today (any mode) */
export function answersToday(s: GameState, now = Date.now()): number {
  const k = todayKey(now);
  let n = 0;
  for (let i = s.exerciseLog.length - 1; i >= 0 && todayKey(s.exerciseLog[i].t) === k; i--) n++;
  return n;
}
/** current streak in days (still alive if the goal was reached today or yesterday) */
export function streakDays(s: GameState, now = Date.now()): number {
  const last = Number(s.flags.streak_day ?? 0);
  if (!last) return 0;
  const yesterday = dayNum(now - 86400000);
  return last === dayNum(now) || last === yesterday ? Number(s.flags.streak_n ?? 0) : 0;
}
function touchStreak(s: GameState, now: number) {
  if (answersToday(s, now) < DAILY_GOAL) return;
  const today = dayNum(now);
  if (s.flags.streak_day === today) return;
  const yesterday = dayNum(now - 86400000);
  s.flags.streak_n = s.flags.streak_day === yesterday ? Number(s.flags.streak_n ?? 0) + 1 : 1;
  s.flags.streak_day = today;
  s.flags.goal_days = Number(s.flags.goal_days ?? 0) + 1;
  s.flags.streak_best = Math.max(Number(s.flags.streak_best ?? 0), Number(s.flags.streak_n));
  s.money += 50 * Math.min(7, Number(s.flags.streak_n));
  toast(`今日の目標達成！ ${s.flags.streak_n}日連続 · +¥${50 * Math.min(7, Number(s.flags.streak_n))}`, 'level');
}

export function recordAnswer(s: GameState, ex: Exercise, ok: boolean, ms: number, chosen?: Option, now = Date.now()) {
  rollDaily(s, now);
  const st = s.skills[ex.area];
  st.total++;
  st.ms += ms;
  if (ok) st.ok++;
  s.exerciseLog.push({ t: now, key: ex.key ?? ex.id, area: ex.area, mode: ex.mode, ok, ms });
  if (s.exerciseLog.length > 600) s.exerciseLog.splice(0, s.exerciseLog.length - 600);
  touchStreak(s, now);
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
  if (!ok && chosen?.key && chosen.key !== ex.key && chosen.key[0] === ex.key[0]) {
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

// ------------------------------------------------------------------
// mix-ups

/** the item this one was mixed up with most (twice or more), if any */
export function confusedWith(s: GameState, key: string): string | null {
  let best: string | null = null;
  let n = 1;
  for (const [pair, c] of Object.entries(s.confusions)) {
    const [a, b] = pair.split('|');
    if (a === key && c > n && keyExists(b)) {
      best = b;
      n = c;
    }
  }
  return best;
}

/** pairs of items the player mixed up (both directions counted together), most often first */
export function confusionPairs(s: GameState): { a: string; b: string; n: number }[] {
  const m = new Map<string, { a: string; b: string; n: number }>();
  for (const [pair, c] of Object.entries(s.confusions)) {
    const [a, b] = pair.split('|');
    if (!keyExists(a) || !keyExists(b)) continue;
    const id = [a, b].sort().join('|');
    const e = m.get(id) ?? { a, b, n: 0 };
    e.n += c;
    m.set(id, e);
  }
  return [...m.values()].sort((x, y) => y.n - x.n);
}

/** a drill of the pairs mixed up most: each item asked against the other one */
export function buildConfusionSession(s: GameState, size = 10, r = Math.random): Exercise[] {
  const out: Exercise[] = [];
  for (const { a, b } of confusionPairs(s)) {
    for (const [x, y] of [[a, b], [b, a]]) {
      if (out.length >= size) break;
      const [t, id] = x.split(':');
      if (t === 'v' && !VOCAB_BY_ID[id].affix) out.push(vocabExercise(id, 'contrast', s, r, y.slice(2)));
      else if (t === 'g') out.push(grammarExercise(id, 'contrast', r));
      else out.push(exerciseFor(s, x, { r }));
    }
  }
  return out;
}

/** the written form, reading and meaning of an item, for showing two mixed-up items side by side */
export function describeKey(key: string, lang: 'en' | 'de' = 'en'): { label: string; reading?: string; meaning: string; example?: string } {
  const [t, id] = key.split(':');
  if (t === 'v' && VOCAB_BY_ID[id]) {
    const v = VOCAB_BY_ID[id];
    return { label: wordForm(v), reading: v.reading, meaning: lang === 'de' ? v.de : v.en, example: v.example || undefined };
  }
  if (t === 'g' && GRAMMAR_BY_ID[id]) {
    const g = GRAMMAR_BY_ID[id];
    return { label: g.pattern, meaning: g.meaning, example: g.examples[0]?.jp };
  }
  if (t === 'k' && KANJI_BY_ID[id]) {
    const k = KANJI_BY_ID[id];
    return { label: k.char, reading: [...k.on, ...k.kun].join('・'), meaning: k.meaning };
  }
  return { label: key, meaning: '' };
}
