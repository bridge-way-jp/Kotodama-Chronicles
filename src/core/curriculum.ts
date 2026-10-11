import { VOCAB, VOCAB_BY_ID } from '../content/vocab';
import { KANJI, KANJI_BY_ID } from '../content/kanji';
import type { KanjiEntry, VocabEntry } from './types';

/**
 * The N2 study curriculum built by tools/import_jlpt.py from the community JLPT lists
 * (public/data/jlpt.json). It is loaded at start-up and added to the game's vocabulary and kanji:
 * N2 items enter the review queue region by region (chapter = region, docs/CURRICULUM.md);
 * N3 items (chapter 0) are review material and only enter the queue when the player meets them.
 * Example sentences are written over time; until a word has one, it is drilled without context.
 */

export const CURRICULUM_SOURCE = 'jlpt';

export interface CurriculumData {
  version: number;
  vocab: { id: string; word: string; reading: string; en: string; pos: VocabEntry['pos']; level: 'N2' | 'N3'; chapter: number; topic?: string; example?: string; exampleEn?: string }[];
  kanji: { id: string; char: string; on: string[]; kun: string[]; meaning: string; words: string[]; strokes: number; chapter: number }[];
}

export const curriculumInfo = { loaded: false, n2Words: 0, n3Words: 0, kanji: 0 };

/** Adds the curriculum to the game content (idempotent). Words the game already has are skipped. */
export function registerCurriculum(d: CurriculumData) {
  if (curriculumInfo.loaded) return;
  const have = new Set(VOCAB.map((v) => v.word));
  for (const w of d.vocab) {
    if (VOCAB_BY_ID[w.id] || have.has(w.word)) continue;
    const e: VocabEntry = {
      id: w.id, word: w.word, reading: w.reading, en: w.en, de: w.en, pos: w.pos, level: w.level,
      example: w.example ?? '', exampleEn: w.exampleEn ?? '',
      tags: w.topic ? [w.topic] : [], chapter: w.chapter, source: CURRICULUM_SOURCE,
    };
    VOCAB.push(e);
    VOCAB_BY_ID[e.id] = e;
    have.add(w.word);
    if (w.level === 'N2') curriculumInfo.n2Words++;
    else curriculumInfo.n3Words++;
  }
  const chars = new Set(KANJI.map((k) => k.char));
  for (const k of d.kanji) {
    if (KANJI_BY_ID[k.id] || chars.has(k.char)) continue;
    const words = k.words.filter((id) => VOCAB_BY_ID[id]);
    if (!words.length) continue;
    const e: KanjiEntry = { ...k, words, source: CURRICULUM_SOURCE };
    KANJI.push(e);
    KANJI_BY_ID[e.id] = e;
    curriculumInfo.kanji++;
  }
  curriculumInfo.loaded = true;
}

/** Fetches and registers the curriculum; the game still works (with its own content) if this fails. */
export async function loadCurriculum(): Promise<boolean> {
  if (curriculumInfo.loaded) return true;
  try {
    const res = await fetch('data/jlpt.json');
    if (!res.ok) return false;
    registerCurriculum(await res.json());
    return true;
  } catch {
    return false;
  }
}
