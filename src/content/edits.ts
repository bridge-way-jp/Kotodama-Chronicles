import type { MapObject } from './maps';


/**
 * Hand edits of placed objects (made in the in-game map editor, `?edit` in the address).
 * Two layers: `EDITS_BASE` is what is committed to the game (merged from exported files), `local` is what this browser changed.
 * Per map: ids to remove, moved positions (tile x,y) and newly added objects.
 */
export interface MapEdits {
  removed: string[];
  moved: Record<string, [number, number]>;
  added: MapObject[];
  /** painted walkability, "x,y" -> 1 walkable / 0 blocked (beats the map's own collision and objects) */
  walk?: Record<string, 0 | 1>;
  /** exits to other maps moved: original tile "x,y" -> new tile (the arrival on the other side moves along) */
  exits?: Record<string, [number, number]>;
}
export type Edits = Record<string, MapEdits>;

import base from './edits.base.json';
export const EDITS_BASE: Edits = base as unknown as Edits;

const KEY = 'kc_map_edits_v1';
const SHARED_KEY = 'kc_map_edits_shared';

/** the edits published for every player (cached here from the cloud, applied between the committed ones and this browser's own) */
export function loadSharedEdits(): { savedAt: number; edits: Edits } {
  try {
    const s = JSON.parse(localStorage.getItem(SHARED_KEY) || 'null');
    return s && typeof s === 'object' ? { savedAt: Number(s.savedAt) || 0, edits: s.edits ?? {} } : { savedAt: 0, edits: {} };
  } catch {
    return { savedAt: 0, edits: {} };
  }
}
export function saveSharedEdits(savedAt: number, edits: Edits) {
  try {
    localStorage.setItem(SHARED_KEY, JSON.stringify({ savedAt, edits }));
  } catch {
    /* ignore */
  }
}

/** one layer on top of another: what the upper layer changed wins */
export function mergeEdits(lower: Edits, upper: Edits): Edits {
  const out: Edits = JSON.parse(JSON.stringify(lower));
  for (const [map, u] of Object.entries(upper)) {
    const l = (out[map] ??= emptyEdits());
    const removed = new Set([...l.removed, ...u.removed]);
    l.added = [...l.added.filter((a) => !u.added.some((b) => b.id === a.id) && !u.removed.includes(a.id)), ...u.added];
    // a removed object that was only added in the lower layer is simply gone
    l.removed = [...removed].filter((id) => !(lower[map]?.added ?? []).some((a) => a.id === id));
    l.moved = { ...l.moved, ...u.moved };
    l.walk = { ...l.walk, ...u.walk };
    l.exits = { ...l.exits, ...u.exits };
  }
  return out;
}
export const emptyEdits = (): MapEdits => ({ removed: [], moved: {}, added: [], walk: {}, exits: {} });

export function loadLocalEdits(): Edits {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Edits;
  } catch {
    return {};
  }
}
export function saveLocalEdits(e: Edits) {
  try {
    localStorage.setItem(KEY, JSON.stringify(e));
  } catch {
    /* ignore (private mode) */
  }
}

/** applies one layer of edits to a map's object list */
export function applyEdits(objects: MapObject[], e: MapEdits | undefined): MapObject[] {
  if (!e) return objects;
  const gone = new Set(e.removed);
  const out = objects.filter((o) => !gone.has(o.id)).map((o) => (e.moved[o.id] ? { ...o, x: e.moved[o.id][0], y: e.moved[o.id][1] } : o));
  for (const a of e.added) if (!out.some((o) => o.id === a.id)) out.push(e.moved[a.id] ? { ...a, x: e.moved[a.id][0], y: e.moved[a.id][1] } : a);
  return out;
}

/** the painted walkability of both layers for one map (the browser's own paint wins) */
export function walkOverrides(...layers: (MapEdits | undefined)[]): Record<string, 0 | 1> {
  return Object.assign({}, ...layers.map((e) => e?.walk ?? {}));
}
