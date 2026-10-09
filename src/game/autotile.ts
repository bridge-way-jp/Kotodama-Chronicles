/**
 * Autotiling: soft transitions between grass and paths, shorelines around water and solid
 * forest walls. Every map cell of an autotiled terrain is assembled from four quadrants,
 * each taken from the sheet tile that matches its neighbours (RPG-Maker style), so a small
 * set of drawn tiles (corners, edges, inner corners, centre) covers every shape:
 * thin paths, bends, crossings, ponds and rivers.
 *
 * Sheet tiles are public/assets/at_<set>_<role>.png (see tools/extract_sheets.py), roles:
 * NW N NE W E SW S SE (grass on that side), iNW iNE iSW iSE (inner corners), C (centre).
 */

export interface AutoSet {
  name: 'path' | 'water' | 'forest';
  /** which map chars are drawn with this set */
  chars: string;
  /** neighbours that count as "same terrain" (no edge drawn towards them) */
  joins: string;
  /** extra centre variants (chosen per cell) */
  centres: string[];
  /** extra south-edge variants (forest trunks) */
  souths?: string[];
  /** animation: centre role used for frame 2 */
  animCentre?: string;
}

export const AUTO_SETS: AutoSet[] = [
  { name: 'path', chars: ':', joins: ':=bxpPXSH', centres: ['C'] },
  { name: 'water', chars: '~', joins: '~b', centres: ['C'], animCentre: 'C2' },
  { name: 'forest', chars: 'T', joins: 'T', centres: ['C', 'C2'], souths: ['S', 'S4', 'S2', 'S3'] },
];

export const AUTOTILE_KEYS = [
  ...['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE', 'iNW', 'iNE', 'iSW', 'iSE', 'C'].map((r) => `at_path_${r}`),
  ...['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE', 'iNW', 'iNE', 'iSW', 'iSE', 'C', 'C2', 'C3'].map((r) => `at_water_${r}`),
  ...['W', 'E', 'S', 'S2', 'S3', 'S4', 'iNW', 'iNE', 'iSW', 'iSE', 'C', 'C2'].map((r) => `at_forest_${r}`),
  'cliff_l', 'cliff_m0', 'cliff_m1', 'cliff_r', 'cliff_stairs', 'tile_tallgrass_0', 'tile_tallgrass_1', 'tallgrass_overlay',
];

const hash = (x: number, y: number) => (((x * 73856093) ^ (y * 19349663)) >>> 0) % 997;

/** grass on each side / diagonal of a cell (true = not the same terrain) */
interface Open {
  n: boolean; s: boolean; e: boolean; w: boolean; nw: boolean; ne: boolean; sw: boolean; se: boolean;
}

export interface CellPlan {
  /** unique key for the tile this cell needs */
  key: string;
  /** draw the cell (frame 0 or 1) into ctx at (dx, dy) with size px */
  draw: (ctx: CanvasRenderingContext2D, dx: number, dy: number, size: number, frame: number) => void;
  animated: boolean;
}

type Img = (key: string) => CanvasImageSource | undefined;

/** forest cells that are too thin for the wall tiles are drawn as single trees instead */
export function isForestWall(tiles: string[], x: number, y: number): boolean {
  const at = (cx: number, cy: number) => {
    if (cy < 0 || cy >= tiles.length || cx < 0 || cx >= tiles[0].length) return true;
    return tiles[cy][cx] === 'T';
  };
  return (at(x - 1, y) || at(x + 1, y)) && (at(x, y - 1) || at(x, y + 1));
}

export function planCell(tiles: string[], x: number, y: number, img: Img): CellPlan | null {
  const ch = tiles[y][x];
  const H = tiles.length;
  const W = tiles[0].length;

  // ---------------- cliffs and stairs
  if (ch === 'K' || ch === 'H') {
    let key = 'cliff_stairs';
    if (ch === 'K') {
      const l = x > 0 && 'KH'.includes(tiles[y][x - 1]);
      const r = x < W - 1 && 'KH'.includes(tiles[y][x + 1]);
      key = !l ? 'cliff_l' : !r ? 'cliff_r' : hash(x, y) % 2 ? 'cliff_m0' : 'cliff_m1';
    }
    const src = img(key);
    if (!src) return null;
    return { key, animated: false, draw: (ctx, dx, dy, size) => ctx.drawImage(src, dx, dy, size, size) };
  }
  if (ch === '"') {
    const a = img('tile_tallgrass_0');
    const b = img('tile_tallgrass_1') ?? a;
    if (!a || !b) return null;
    return { key: 'tallgrass', animated: true, draw: (ctx, dx, dy, size, f) => ctx.drawImage(f ? b : a, dx, dy, size, size) };
  }

  const set = AUTO_SETS.find((s) => s.chars.includes(ch));
  if (!set) return null;
  if (set.name === 'forest' && !isForestWall(tiles, x, y)) return null;
  const same = (cx: number, cy: number) => {
    if (cy < 0 || cy >= H || cx < 0 || cx >= W) return true; // map edge continues the terrain
    return set.joins.includes(tiles[cy][cx]);
  };
  const o: Open = {
    n: !same(x, y - 1), s: !same(x, y + 1), e: !same(x + 1, y), w: !same(x - 1, y),
    nw: !same(x - 1, y - 1), ne: !same(x + 1, y - 1), sw: !same(x - 1, y + 1), se: !same(x + 1, y + 1),
  };
  const centre = set.centres[hash(x, y) % set.centres.length];
  const south = set.souths ? set.souths[hash(x, y) % set.souths.length] : 'S';
  const pick = (vertical: 'n' | 's', horizontal: 'w' | 'e', diag: 'nw' | 'ne' | 'sw' | 'se'): string => {
    const V = vertical.toUpperCase();
    const Hh = horizontal.toUpperCase();
    if (o[vertical] && o[horizontal]) return V + Hh;
    if (o[vertical]) return V === 'S' ? south : V;
    if (o[horizontal]) return Hh;
    if (o[diag]) return 'i' + diag.toUpperCase();
    return '';
  };
  const quads = [pick('n', 'w', 'nw'), pick('n', 'e', 'ne'), pick('s', 'w', 'sw'), pick('s', 'e', 'se')];
  const key = `${set.name}:${quads.join(',')}:${centre}:${south}`;
  const role = (r: string, frame: number) => {
    const c = frame && set.animCentre ? set.animCentre : centre;
    if (!r) return img(`at_${set.name}_${c}`);
    // fall back towards the centre when a role was not drawn (e.g. forest N edge / outer corners)
    const tries = [r, r.length === 2 && !r.startsWith('i') ? r[0] : '', r.length === 2 && !r.startsWith('i') ? r[1] : '', c];
    for (const t of tries) {
      const k = t === 'S' ? south : t;
      const im = k && img(`at_${set.name}_${k}`);
      if (im) return im;
    }
    return undefined;
  };
  const animated = !!set.animCentre;
  return {
    key,
    animated,
    draw: (ctx, dx, dy, size, frame) => {
      const h = size / 2;
      quads.forEach((r, i) => {
        const src = role(r, frame) as (CanvasImageSource & { width: number }) | undefined;
        if (!src) return;
        const sw = (src.width as number) / 2;
        const qx = i % 2;
        const qy = i >> 1;
        ctx.drawImage(src, qx * sw, qy * sw, sw, sw, dx + qx * h, dy + qy * h, h, h);
      });
    },
  };
}
