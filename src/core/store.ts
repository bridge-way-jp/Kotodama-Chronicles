import type { GameState, Settings } from './types';

/**
 * Minimal observable store. The game state is mutated in place through
 * `update()`, which bumps a version counter and notifies subscribers
 * (React via useSyncExternalStore, Phaser, and the autosaver).
 */

export const DEFAULT_SETTINGS: Settings = {
  furigana: 'auto',
  translation: 'tap',
  meaningLang: 'en',
  newPerDay: 8,
  ttsRate: 1,
  sfx: true,
};

export function todayKey(now = Date.now()): string {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function createInitialState(playerName: string, now = Date.now()): GameState {
  return {
    id: Math.random().toString(36).slice(2) + now.toString(36),
    createdAt: now,
    playerName: playerName || 'マリア',
    map: 'apartment',
    pos: { x: 4, y: 4 },
    facing: 'down',
    chapter: 1,
    day: 1,
    timeOfDay: 'morning',
    level: 1,
    xp: 0,
    money: 3000,
    inventory: { onigiri: 2 },
    team: [],
    box: [],
    dex: {},
    quests: {},
    flags: {},
    relationships: {},
    cards: {},
    confusions: {},
    skills: {
      vocab: { ok: 0, total: 0, ms: 0 },
      kanji: { ok: 0, total: 0, ms: 0 },
      grammar: { ok: 0, total: 0, ms: 0 },
      reading: { ok: 0, total: 0, ms: 0 },
      listening: { ok: 0, total: 0, ms: 0 },
    },
    exerciseLog: [],
    daily: { date: todayKey(now), newIntroduced: 0, reviews: 0 },
    practice: [],
    settings: { ...DEFAULT_SETTINGS },
    stats: { battlesWon: 0, recruited: 0, steps: 0, playMs: 0 },
  };
}

type Listener = (reason: string) => void;

class Store {
  state: GameState | null = null;
  version = 0;
  private listeners = new Set<Listener>();

  subscribe = (fn: Listener) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  getVersion = () => this.version;

  set(state: GameState | null, reason = 'load') {
    this.state = state;
    this.bump(reason);
  }

  /** Mutate the current game state. `reason` lets the autosaver decide urgency. */
  update(fn: (s: GameState) => void, reason = 'update') {
    if (!this.state) return;
    fn(this.state);
    this.bump(reason);
  }

  get s(): GameState {
    if (!this.state) throw new Error('No active game');
    return this.state;
  }

  private bump(reason: string) {
    this.version++;
    for (const l of [...this.listeners]) l(reason);
  }
}

export const store = new Store();

/** Ensures daily counters are reset when the real-world date changes. */
export function rollDaily(s: GameState, now = Date.now()) {
  const key = todayKey(now);
  if (s.daily.date !== key) s.daily = { date: key, newIntroduced: 0, reviews: 0 };
}
