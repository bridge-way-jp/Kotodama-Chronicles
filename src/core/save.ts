import type { GameState } from './types';
import { DEFAULT_SETTINGS, createInitialState } from './store';

/**
 * Local persistence in IndexedDB.
 *
 * Keys in the "saves" object store:
 *   main    – the current save envelope
 *   backup  – the previous successful save (rotated on every write)
 *   rescue  – a save that failed validation, kept so it is never silently lost
 *
 * The envelope is versioned; `migrate()` upgrades older formats.
 * The storage interface is small on purpose so a cloud backend can be added later.
 */

export const SAVE_FORMAT = 'kotodama-save';
export const SAVE_VERSION = 1;

export interface SaveEnvelope {
  format: typeof SAVE_FORMAT;
  version: number;
  savedAt: number;
  playerName: string;
  summary: { level: number; chapter: number; day: number; map: string; playMs: number };
  state: GameState;
}

export interface SaveBackend {
  get(key: string): Promise<unknown>;
  put(key: string, value: unknown): Promise<void>;
  del(key: string): Promise<void>;
}

const DB_NAME = 'kotodama-chronicles';
const STORE = 'saves';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function idbBackend(): SaveBackend {
  let dbp: Promise<IDBDatabase> | null = null;
  const db = () => (dbp ??= openDb());
  const tx = async <T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T> => {
    const d = await db();
    return new Promise<T>((resolve, reject) => {
      const t = d.transaction(STORE, mode);
      const r = fn(t.objectStore(STORE));
      t.oncomplete = () => resolve(r.result as T);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  };
  return {
    get: (key) => tx('readonly', (s) => s.get(key)),
    put: async (key, value) => {
      await tx('readwrite', (s) => s.put(value, key));
    },
    del: async (key) => {
      await tx('readwrite', (s) => s.delete(key));
    },
  };
}

export class ValidationError extends Error {}

function isObj(v: unknown): v is Record<string, any> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Upgrade older save versions in place. */
export function migrate(env: any): SaveEnvelope {
  if (env.version > SAVE_VERSION) {
    throw new ValidationError(`This save was created by a newer game version (v${env.version}).`);
  }
  // v1 is the first version; future migrations go here: if (env.version === 1) {...; env.version = 2}
  return env as SaveEnvelope;
}

/** Validates structure and fills in missing optional fields with defaults. */
export function validateEnvelope(raw: unknown): SaveEnvelope {
  if (!isObj(raw)) throw new ValidationError('Save data is not an object.');
  if (raw.format !== SAVE_FORMAT) throw new ValidationError('Not a Kotodama Chronicles save file.');
  if (typeof raw.version !== 'number') throw new ValidationError('Save version missing.');
  const env = migrate(raw);
  const s = env.state as any;
  if (!isObj(s)) throw new ValidationError('Save has no game state.');
  const required: [string, string][] = [
    ['playerName', 'string'],
    ['map', 'string'],
    ['level', 'number'],
    ['xp', 'number'],
    ['money', 'number'],
  ];
  for (const [k, t] of required) {
    if (typeof s[k] !== t) throw new ValidationError(`Save field "${k}" is missing or invalid.`);
  }
  if (!isObj(s.pos) || typeof s.pos.x !== 'number' || typeof s.pos.y !== 'number')
    throw new ValidationError('Save field "pos" is invalid.');
  if (!Array.isArray(s.team)) throw new ValidationError('Save field "team" is invalid.');
  // fill defaults for anything optional (keeps old saves loadable)
  const defaults = createInitialState(s.playerName, s.createdAt ?? Date.now());
  for (const k of Object.keys(defaults) as (keyof GameState)[]) {
    if (s[k] === undefined) s[k] = (defaults as any)[k];
  }
  s.settings = { ...DEFAULT_SETTINGS, ...(isObj(s.settings) ? s.settings : {}) };
  for (const area of Object.keys(defaults.skills)) {
    if (!isObj(s.skills[area])) s.skills[area] = { ok: 0, total: 0, ms: 0 };
  }
  return env;
}

export function makeEnvelope(state: GameState, now = Date.now()): SaveEnvelope {
  return {
    format: SAVE_FORMAT,
    version: SAVE_VERSION,
    savedAt: now,
    playerName: state.playerName,
    summary: {
      level: state.level,
      chapter: state.chapter,
      day: state.day,
      map: state.map,
      playMs: state.stats.playMs,
    },
    state,
  };
}

export type LoadResult =
  | { kind: 'none' }
  | { kind: 'ok'; env: SaveEnvelope; fromBackup?: boolean }
  | { kind: 'error'; message: string; raw: unknown };

export class SaveManager {
  constructor(private backend: SaveBackend) {}

  async load(): Promise<LoadResult> {
    let raw: unknown;
    try {
      raw = await this.backend.get('main');
    } catch (e) {
      return { kind: 'error', message: `Could not open browser storage: ${(e as Error).message}`, raw: null };
    }
    if (raw === undefined || raw === null) return { kind: 'none' };
    try {
      return { kind: 'ok', env: validateEnvelope(structuredClone(raw)) };
    } catch (e) {
      // main is broken: try the backup, but never overwrite anything here
      try {
        const b = await this.backend.get('backup');
        if (b) return { kind: 'ok', env: validateEnvelope(structuredClone(b)), fromBackup: true };
      } catch {
        /* fall through */
      }
      return { kind: 'error', message: (e as Error).message, raw };
    }
  }

  /** Writes the save, rotating the previous one into `backup`. */
  async save(state: GameState): Promise<SaveEnvelope> {
    const env = makeEnvelope(structuredClone(state));
    const prev = await this.backend.get('main');
    if (prev) {
      try {
        validateEnvelope(structuredClone(prev));
        await this.backend.put('backup', prev);
      } catch {
        await this.backend.put('rescue', prev);
      }
    }
    await this.backend.put('main', env);
    return env;
  }

  /** Moves the current save aside (kept in `rescue`) before a new game. */
  async archiveCurrent(): Promise<void> {
    const prev = await this.backend.get('main');
    if (prev) await this.backend.put('rescue', prev);
    await this.backend.del('main');
  }

  async getRaw(key: 'main' | 'backup' | 'rescue'): Promise<unknown> {
    return this.backend.get(key);
  }
}

export function exportToJson(env: SaveEnvelope | unknown): string {
  return JSON.stringify(env, null, 1);
}

export function importFromJson(text: string): SaveEnvelope {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ValidationError('The file is not valid JSON.');
  }
  return validateEnvelope(parsed);
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
