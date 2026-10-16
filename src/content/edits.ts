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
}
export type Edits = Record<string, MapEdits>;

export const EDITS_BASE: Edits = {};

const KEY = 'kc_map_edits_v1';
export const emptyEdits = (): MapEdits => ({ removed: [], moved: {}, added: [] });

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
