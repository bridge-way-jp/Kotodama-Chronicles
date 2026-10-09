import { VOCAB, VOCAB_BY_ID } from '../content/vocab';
import { GRAMMAR, GRAMMAR_BY_ID } from '../content/grammar';
import { CONFUSIONS } from '../content/confusions';
import { idbBackend } from './save';
import { DAY, newCard } from './srs';
import { shuffle } from './learning';
import type { GameState, GrammarEntry, VocabEntry } from './types';
import { bus } from './events';

/**
 * Content packs: extra vocabulary/grammar the player imports (e.g. converted from their own
 * Anki decks with tools/anki_pack.py). Packs are personal material, so they are not part of the
 * game files: they live in the browser (IndexedDB) and in the player's own cloud save.
 */

export interface PackGrammar {
  id: string;
  pattern: string;
  meaning: string;
  context: string;
  example: string;
  exampleDe: string;
  blank: string | null;
}

export interface Pack {
  id: string;
  title: string;
  version: number;
  vocab: VocabEntry[];
  grammar: PackGrammar[];
  /** Anki learning state per game key (v:id / g:id) */
  progress: Record<string, { ivl: number; lapses: number; reps: number }>;
}

export const packInfo = { loaded: null as null | { id: string; title: string; words: number; grammar: number; progress: number } };

const PACK_KEY = 'pack:anki';
const db = idbBackend();

export function parsePack(text: string): Pack {
  const p = JSON.parse(text);
  if (!p || typeof p !== 'object' || !Array.isArray(p.vocab) || !Array.isArray(p.grammar) || typeof p.id !== 'string')
    throw new Error('Das ist kein Kotodama-Lernpaket.');
  for (const v of p.vocab.slice(0, 5)) if (typeof v.word !== 'string' || typeof v.reading !== 'string') throw new Error('Lernpaket ist beschädigt.');
  return p as Pack;
}

const sameGroup = (a: string, b: string) => CONFUSIONS.some((g) => g.forms.some((f) => a.includes(f)) && g.forms.some((f) => b.includes(f)));

function toGrammar(g: PackGrammar, all: PackGrammar[]): GrammarEntry {
  const exercises: GrammarEntry['exercises'] = [];
  if (g.blank && g.example.includes(g.blank)) {
    // distractors: other imported patterns' blanks that are clearly different forms
    const pool = shuffle(
      all.filter((o) => o.id !== g.id && o.blank && o.blank !== g.blank && !o.blank.includes(g.blank!) && !g.blank!.includes(o.blank) && !sameGroup(o.pattern, g.pattern)),
      Math.random,
    ).slice(0, 3);
    if (pool.length === 3)
      exercises.push({
        sentence: g.example.replace(g.blank, '＿＿'),
        en: g.exampleDe,
        options: [{ text: g.blank }, ...pool.map((o) => ({ text: o.blank!, grammar: o.id }))],
        answer: 0,
        why: `${g.pattern}: ${g.meaning}. ${g.context}`,
      });
  }
  return {
    id: g.id, pattern: g.pattern, meaning: g.meaning, formation: '', explanation: g.context, nuance: '', mistakes: '',
    examples: [{ jp: g.example, en: g.exampleDe }], similar: [], exercises, level: 'N2', chapter: 1, source: 'anki',
  };
}

/** Adds the pack's items to the curriculum (idempotent). Words the game already has are skipped. */
export function registerPack(p: Pack) {
  if (packInfo.loaded?.id === p.id) return;
  const byWord = new Map(VOCAB.map((v) => [v.word, v.id]));
  for (const v of p.vocab) {
    const existing = byWord.get(v.word);
    if (existing) {
      if (existing !== v.id) alias['v:' + v.id] = 'v:' + existing; // keep the Anki progress for words the game already teaches
      continue;
    }
    if (VOCAB_BY_ID[v.id]) continue;
    const e: VocabEntry = { ...v, source: p.id, tags: v.tags ?? [], chapter: v.chapter ?? 1 };
    VOCAB.push(e);
    VOCAB_BY_ID[e.id] = e;
    byWord.set(v.word, v.id);
  }
  const patterns = new Set(GRAMMAR.map((g) => g.pattern.replace(/^～/, '')));
  for (const g of p.grammar) {
    if (GRAMMAR_BY_ID[g.id] || patterns.has(g.pattern.replace(/（.*?）/, ''))) continue;
    const e = toGrammar(g, p.grammar);
    GRAMMAR.push(e);
    GRAMMAR_BY_ID[e.id] = e;
  }
  packInfo.loaded = { id: p.id, title: p.title, words: p.vocab.length, grammar: p.grammar.length, progress: Object.keys(p.progress ?? {}).length };
  current = p;
  bus.emit('pack');
}

let current: Pack | null = null;
const alias: Record<string, string> = {};

/** Loads a pack stored in this browser. */
export async function loadLocalPack(): Promise<boolean> {
  try {
    const text = (await db.get(PACK_KEY)) as string | undefined;
    if (!text) return false;
    registerPack(parsePack(text));
    return true;
  } catch {
    return false;
  }
}

export async function storeLocalPack(text: string) {
  await db.put(PACK_KEY, text);
}

/**
 * Transfers Anki learning progress into the save once per pack: words Maria already
 * knows start with a long interval instead of being taught again from zero.
 */
export function seedProgress(s: GameState, now = Date.now()): number {
  if (!current || s.flags[`pack_${current.id}_seeded`]) return 0;
  let n = 0;
  for (const [rawKey, pr] of Object.entries(current.progress ?? {})) {
    const key = alias[rawKey] ?? rawKey;
    if (!(key.slice(2) in (key[0] === 'v' ? VOCAB_BY_ID : GRAMMAR_BY_ID))) continue;
    const c = s.cards[key];
    if (c && c.introduced) continue;
    if (!pr.reps || pr.ivl <= 0) continue;
    const card = newCard(key, now);
    const ivl = Math.min(365, pr.ivl);
    card.introduced = true;
    card.encounters = 1;
    card.reps = Math.min(pr.reps, 6);
    card.lapses = Math.min(pr.lapses, 2);
    card.interval = ivl;
    card.last = now;
    // spread the first reviews out so they don't all come due on one day
    card.due = now + Math.max(1, Math.round(ivl * (0.3 + 0.7 * Math.random()))) * DAY;
    card.history = [{ t: now, ok: true, mode: 'anki', ms: 0 }];
    s.cards[key] = card;
    n++;
  }
  s.flags[`pack_${current.id}_seeded`] = true;
  return n;
}
