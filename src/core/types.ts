// Core data model shared by all systems. Everything in GameState is persisted.

export type Dir = 'up' | 'down' | 'left' | 'right';

export type Affinity =
  | 'nature'
  | 'water'
  | 'fire'
  | 'lightning'
  | 'wind'
  | 'memory'
  | 'knowledge'
  | 'emotion';

export type SkillArea = 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening';

export interface CreatureInstance {
  uid: string;
  speciesId: string;
  level: number;
  xp: number;
  hp: number;
  caughtAt: number;
  caughtWhere: string;
  /** trust gained by successful "talk" actions; used for recruitment */
  bond?: number;
}

/** A spaced-repetition card for one learnable item (vocab / grammar / kanji). */
export interface Card {
  key: string; // "v:id" | "g:id" | "k:id"
  firstSeen: number;
  /** true once the item was actively studied at least once (not just seen) */
  introduced: boolean;
  /** how many times the player met the item in dialogue / texts */
  encounters: number;
  reps: number; // consecutive successful reviews
  lapses: number;
  ease: number;
  interval: number; // days
  due: number; // epoch ms
  last: number; // epoch ms of last review, 0 = never
  isoOk: number;
  isoFail: number;
  ctxOk: number;
  ctxFail: number;
  history: { t: number; ok: boolean; mode: string; ms: number }[];
}

export interface QuestProgress {
  id: string;
  status: 'active' | 'done';
  objectives: Record<string, boolean>;
  startedAt: number;
  doneAt?: number;
}

export interface Settings {
  furigana: 'auto' | 'always' | 'tap' | 'off';
  translation: 'tap' | 'always' | 'never';
  meaningLang: 'en' | 'de';
  newPerDay: number;
  ttsRate: number;
  sfx: boolean;
  musicVolume: number;
}

export interface SkillStat {
  ok: number;
  total: number;
  ms: number;
}

export interface PracticeResult {
  t: number;
  mode: 'practice' | 'mock' | 'diagnostic';
  sections: Record<string, { ok: number; total: number; ms: number }>;
  mistakes: string[];
  durationMs: number;
}

export interface Relationship {
  points: number;
  memories: string[];
}

export interface GameState {
  id: string;
  createdAt: number;
  playerName: string;
  map: string;
  pos: { x: number; y: number };
  facing: Dir;
  chapter: number;
  day: number;
  timeOfDay: 'morning' | 'evening';
  level: number;
  xp: number;
  money: number;
  inventory: Record<string, number>;
  team: CreatureInstance[];
  box: CreatureInstance[];
  dex: Record<string, 'seen' | 'caught'>;
  quests: Record<string, QuestProgress>;
  flags: Record<string, boolean | number>;
  relationships: Record<string, Relationship>;
  cards: Record<string, Card>;
  /** "g:a|g:b" -> number of times a was mixed up with b */
  confusions: Record<string, number>;
  skills: Record<SkillArea, SkillStat>;
  exerciseLog: { t: number; key: string; area: SkillArea; mode: string; ok: boolean; ms: number }[];
  daily: { date: string; newIntroduced: number; reviews: number };
  practice: PracticeResult[];
  settings: Settings;
  stats: { battlesWon: number; recruited: number; steps: number; playMs: number };
}

// ---------- content models ----------

export interface VocabEntry {
  id: string;
  word: string;
  reading: string;
  en: string;
  de: string;
  pos: 'noun' | 'verb' | 'i-adj' | 'na-adj' | 'adverb' | 'expression';
  example: string; // plain Japanese
  exampleEn: string;
  exampleDe?: string;
  source?: string;
  /** approximate level, based on common N2 study lists (no official list exists) */
  level: 'N3' | 'N2' | 'N1' | 'story';
  tags: string[];
  collocations?: string[];
  related?: string[];
  chapter: number;
}

export interface GrammarExercise {
  sentence: string; // with ＿＿ for the blank
  en: string;
  options: { text: string; grammar?: string }[];
  answer: number;
  why: string;
}

export interface GrammarEntry {
  id: string;
  pattern: string;
  meaning: string;
  formation: string;
  explanation: string;
  nuance: string;
  mistakes: string;
  examples: { jp: string; en: string }[];
  similar: string[];
  exercises: GrammarExercise[];
  level: 'N3' | 'N2';
  chapter: number;
  /** imported from a content pack (e.g. 'anki'); such items quiz against each other */
  source?: string;
}

export interface KanjiEntry {
  id: string;
  char: string;
  on: string[];
  kun: string[];
  meaning: string;
  words: string[]; // vocab ids
  strokes: number;
}

export interface Question {
  q: string; // Japanese question (markup allowed)
  qEn?: string;
  options: string[];
  answer: number;
  why: string;
  type?: 'main' | 'detail' | 'inference' | 'intent' | 'expression';
}

export interface ReadingText {
  id: string;
  title: string;
  kind: string; // letter, notice, ...
  body: string; // markup
  en: string;
  questions: Question[];
  vocab: string[];
  grammar: string[];
}

export interface ListeningItem {
  id: string;
  title: string;
  /** lines spoken by TTS: [speaker label, japanese] */
  lines: { who: string; jp: string; voice?: 'f' | 'm' }[];
  en: string;
  questions: Question[];
  vocab: string[];
}

export interface Species {
  id: string;
  name: string; // katakana
  nameEn: string;
  sprite: string;
  affinity: Affinity;
  baseHp: number;
  baseAtk: number;
  desc: string; // Japanese, markup
  descEn: string;
  personality: string;
  moves: string[];
  evolvesTo?: { species: string; level: number };
  ability: { id: AbilityId; name: string; desc: string };
  talk: { line: string; en: string; options: string[]; answer: number; why: string }[];
}

export type AbilityId = 'reveal_reading' | 'eliminate' | 'highlight' | 'replay' | 'translate';

export interface Move {
  id: string;
  name: string;
  nameEn: string;
  power: number;
  area: 'vocab' | 'grammar' | 'kanji' | 'listening';
  affinity: Affinity;
}

export interface ItemDef {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  icon: string;
  kind: 'heal' | 'key' | 'hint' | 'gift' | 'deco';
  heal?: number;
  price?: number;
}
