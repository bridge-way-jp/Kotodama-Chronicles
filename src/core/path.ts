import { VOCAB } from '../content/vocab';
import { GRAMMAR } from '../content/grammar';
import { KANJI } from '../content/kanji';
import { QUESTS } from '../content/quests';
import { mastery } from './srs';
import type { GameState } from './types';

/**
 * The learning path (Lernpfad): everything the N2 needs, split over the seven chapters of the story.
 * Each chapter holds its N2 words, grammar and kanji plus a seventh of the N3 base vocabulary. The story only goes on
 * as far as the player has studied the chapter's items, and the chapter exam asks the whole chapter.
 */

export const PATH_CHAPTERS = 7;
/** due reviews above this hold the story until they are done */
export const DUE_LIMIT = 60;
/** the share of a chapter's items that must be held (consolidating or mastered) for its exam */
export const HELD_FOR_EXAM = 0.8;

let built: { size: number; chapter: Map<string, number>; items: string[][] } | null = null;

function build() {
  const size = VOCAB.length + GRAMMAR.length + KANJI.length;
  if (built?.size === size) return built;
  const chapter = new Map<string, number>();
  const items: string[][] = Array.from({ length: PATH_CHAPTERS + 1 }, () => []);
  const put = (key: string, ch: number) => {
    if (ch < 1 || ch > PATH_CHAPTERS) return;
    chapter.set(key, ch);
    items[ch].push(key);
  };
  // the N3 base vocabulary (chapter 0 of the curriculum) is spread evenly over the chapters
  const base = VOCAB.filter((v) => v.chapter === 0 && v.level === 'N3');
  base.forEach((v, i) => put('v:' + v.id, 1 + Math.floor((i * PATH_CHAPTERS) / base.length)));
  for (const v of VOCAB) if (v.chapter > 0) put('v:' + v.id, v.chapter);
  for (const g of GRAMMAR) put('g:' + g.id, g.chapter);
  const wordCh = new Map(VOCAB.map((v) => [v.id, chapter.get('v:' + v.id) ?? 0]));
  for (const k of KANJI) {
    const fromWords = k.words.map((w) => wordCh.get(w) ?? 0).filter((c) => c > 0);
    // a kanji comes with its first word (it can only be learned once one of its words is), never earlier
    const own = k.chapter && k.chapter > 0 ? k.chapter : 1;
    put('k:' + k.id, fromWords.length ? Math.max(own, Math.min(...fromWords)) : own);
  }
  built = { size, chapter, items };
  return built;
}

/** the chapter of the learning path an item belongs to (0: not on the path) */
export const pathChapterOf = (key: string) => build().chapter.get(key) ?? 0;

export const pathItems = (ch: number): string[] => build().items[ch] ?? [];

export interface PathStatus {
  chapter: number;
  total: number;
  /** studied at least once */
  introduced: number;
  /** consolidating or mastered (an interval of three days or more) */
  held: number;
  byType: Record<'v' | 'g' | 'k', { total: number; introduced: number; held: number }>;
}

export function pathStatus(s: GameState, ch: number): PathStatus {
  const st: PathStatus = { chapter: ch, total: 0, introduced: 0, held: 0, byType: { v: { total: 0, introduced: 0, held: 0 }, g: { total: 0, introduced: 0, held: 0 }, k: { total: 0, introduced: 0, held: 0 } } };
  for (const k of pathItems(ch)) {
    const t = st.byType[k[0] as 'v' | 'g' | 'k'];
    const c = s.cards[k];
    st.total++;
    t.total++;
    if (c?.introduced) {
      st.introduced++;
      t.introduced++;
      const m = mastery(c);
      if (m === 'young' || m === 'mature') {
        st.held++;
        t.held++;
      }
    }
  }
  return st;
}

/** the story goals of a chapter's main quests: how many there are and how many are reached */
function chapterGoals(s: GameState, ch: number) {
  let total = 0;
  let done = 0;
  for (const q of Object.values(QUESTS)) {
    if (q.kind !== 'main' || q.chapter !== ch) continue;
    const st = s.quests[q.id];
    for (const o of q.objectives) {
      total++;
      if (st?.status === 'done' || st?.objectives[o.id]) done++;
    }
  }
  return { total, done };
}

export interface PathGate {
  ok: boolean;
  /** what holds the story: too few items studied for this point of the chapter, or too many reviews due */
  reason: 'study' | 'due' | null;
  chapter: number;
  /** items of the chapter that must be studied before the next story step */
  need: number;
  have: number;
  total: number;
  due: number;
}

/**
 * May the story go on? Each story goal of a chapter needs its share of the chapter's items studied first
 * (before the first goal nothing, before the last almost all), and the due reviews must not pile up.
 */
export function storyGate(s: GameState, due: number): PathGate {
  const ch = Math.max(1, Math.min(PATH_CHAPTERS, s.chapter || 1));
  const st = pathStatus(s, ch);
  const goals = chapterGoals(s, ch);
  const need = goals.total ? Math.floor((st.total * goals.done) / goals.total) : 0;
  const base = { chapter: ch, need, have: st.introduced, total: st.total, due };
  if (s.settings.pathGate === false) return { ...base, ok: true, reason: null };
  if (due > DUE_LIMIT) return { ...base, ok: false, reason: 'due' };
  if (st.introduced < need) return { ...base, ok: false, reason: 'study' };
  return { ...base, ok: true, reason: null };
}

/** the people's stories (心の物語) of a chapter not yet lived through */
export const episodesOpen = (s: GameState, ch: number) =>
  Object.values(QUESTS).filter((q) => q.id.startsWith('ep_') && q.chapter === ch && s.quests[q.id]?.status !== 'done');

/** the chapter exam can be taken once the chapter's stories are lived, the whole chapter is studied and most of it is held */
export function examReady(s: GameState, ch: number) {
  const st = pathStatus(s, ch);
  const needHeld = Math.ceil(st.total * HELD_FOR_EXAM);
  const episodes = episodesOpen(s, ch);
  return { ok: !episodes.length && (s.settings.pathGate === false || (st.introduced >= st.total && st.held >= needHeld)), status: st, needHeld, episodes };
}
