/**
 * Procedural pixel-art textures. Every tile is painted on a 16×16 grid and
 * upscaled 2× with nearest-neighbour so tiles share one consistent pixel size.
 * Replace any of these with hand-made art later by loading an image with the
 * same texture key — game logic does not depend on how they are drawn.
 */

const ART = 16;
const SCALE = 2;
export const TILE = ART * SCALE;

type Painter = (p: Pix, frame: number) => void;

class Pix {
  constructor(private ctx: CanvasRenderingContext2D, private ox: number, private oy: number, private seed: number) {}
  rand() {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed / 2147483647;
  }
  px(x: number, y: number, c: string) {
    if (x < 0 || y < 0 || x >= ART || y >= ART) return;
    this.ctx.fillStyle = c;
    this.ctx.fillRect(this.ox + x * SCALE, this.oy + y * SCALE, SCALE, SCALE);
  }
  rect(x: number, y: number, w: number, h: number, c: string) {
    this.ctx.fillStyle = c;
    this.ctx.fillRect(this.ox + x * SCALE, this.oy + y * SCALE, w * SCALE, h * SCALE);
  }
  noise(cols: string[], density: number) {
    for (let y = 0; y < ART; y++)
      for (let x = 0; x < ART; x++) if (this.rand() < density) this.px(x, y, cols[Math.floor(this.rand() * cols.length)]);
  }
}

const C = {
  grass: '#78c35a', grass2: '#6ab450', grass3: '#8fd56a', grassDark: '#4f9a3d',
  path: '#d9b77a', path2: '#c9a466', path3: '#e6c88e',
  street: '#b9b2a6', street2: '#a9a294', streetLine: '#d8d2c6',
  water: '#4aa3e0', water2: '#6cc0f0', water3: '#3a88c8', foam: '#c8ecff',
  tree: '#3f8f3a', tree2: '#2f7430', tree3: '#5bb04a', trunk: '#7a5032',
  wood: '#b07a46', wood2: '#8e5d33', wood3: '#c99260',
  rail: '#6c5a4a', railMetal: '#9aa4ad', gravel: '#8d877c',
  platform: '#d6d0c2', platform2: '#c4bdaf', yellow: '#e8c64a',
  wall: '#e8dcc4', wall2: '#d2c3a6', wallTop: '#8b6e52',
  floor: '#c8935a', floor2: '#b58049', tatami: '#c9c27c', tatami2: '#b5ad66',
  concrete: '#bfc4c8', concrete2: '#aeb4b9', lab: '#7d8792', lab2: '#5f6873', labWin: '#9fd3ec',
  flowerR: '#f07a8c', flowerY: '#f5d54a', flowerW: '#ffffff', flowerP: '#f6a8c8',
  stone: '#9b9a95', stone2: '#7b7a74',
};

const painters: Record<string, Painter> = {
  '.': (p) => {
    p.rect(0, 0, 16, 16, C.grass);
    p.noise([C.grass2, C.grass3], 0.12);
    p.px(3, 4, C.grassDark); p.px(4, 3, C.grassDark); p.px(11, 10, C.grassDark); p.px(12, 9, C.grassDark);
  },
  ',': (p) => {
    painters['.'](p, 0);
    const cols = [C.flowerR, C.flowerY, C.flowerW, C.flowerP];
    for (let i = 0; i < 4; i++) {
      const x = 2 + Math.floor(p.rand() * 12), y = 2 + Math.floor(p.rand() * 12);
      const c = cols[i % cols.length];
      p.px(x, y, c); p.px(x - 1, y, c); p.px(x + 1, y, c); p.px(x, y - 1, c); p.px(x, y + 1, c); p.px(x, y, C.flowerY);
    }
  },
  '"': (p, f) => {
    p.rect(0, 0, 16, 16, C.grass2);
    const sway = f ? 1 : 0;
    for (let i = 0; i < 6; i++) {
      const x = (i * 5 + 1) % 15, y = 3 + (i % 3) * 4;
      p.px(x + sway, y, C.tree3); p.px(x, y + 1, C.tree); p.px(x + 1, y + 1, C.tree);
      p.px(x - 1 + sway, y + 1, C.tree3); p.px(x, y + 2, C.grassDark); p.px(x + 1, y + 2, C.grassDark);
      p.px(x + 2 + sway, y, C.tree3);
    }
  },
  ':': (p) => {
    p.rect(0, 0, 16, 16, C.path);
    p.noise([C.path2, C.path3], 0.15);
  },
  '=': (p) => {
    p.rect(0, 0, 16, 16, C.street);
    p.noise([C.street2], 0.08);
    for (let x = 0; x < 16; x++) p.px(x, 0, C.street2);
    for (let y = 0; y < 16; y += 8) for (let x = 0; x < 16; x++) p.px(x, y, C.streetLine);
    for (let y = 0; y < 16; y++) p.px((y < 8 ? 4 : 12), y, C.streetLine);
  },
  '~': (p, f) => {
    p.rect(0, 0, 16, 16, C.water);
    p.noise([C.water3], 0.06);
    const o = f ? 4 : 0;
    for (const [x, y] of [[2, 3], [9, 6], [5, 11], [12, 13]]) {
      p.px((x + o) % 16, y, C.water2); p.px((x + o + 1) % 16, y, C.water2); p.px((x + o + 2) % 16, y, C.foam);
    }
  },
  b: (p) => {
    p.rect(0, 0, 16, 16, C.wood);
    for (let y = 0; y < 16; y += 4) for (let x = 0; x < 16; x++) p.px(x, y, C.wood2);
    p.px(3, 2, C.wood3); p.px(10, 6, C.wood3); p.px(6, 10, C.wood3); p.px(13, 14, C.wood3);
  },
  T: (p) => {
    painters['.'](p, 0);
    p.rect(7, 12, 3, 4, C.trunk);
    // canopy
    for (let y = 1; y < 13; y++)
      for (let x = 1; x < 15; x++) {
        const dx = x - 7.5, dy = y - 6.5;
        if (dx * dx + dy * dy < 40) p.px(x, y, (x + y) % 5 === 0 ? C.tree3 : dy > 2 ? C.tree2 : C.tree);
      }
    p.px(5, 3, C.tree3); p.px(6, 3, C.tree3); p.px(9, 5, C.tree3); p.px(4, 7, C.tree3);
  },
  '#': (p) => {
    painters['.'](p, 0);
    p.rect(0, 6, 16, 2, C.wood); p.rect(0, 11, 16, 2, C.wood);
    p.rect(1, 3, 2, 12, C.wood2); p.rect(13, 3, 2, 12, C.wood2);
  },
  r: (p) => {
    p.rect(0, 0, 16, 16, C.gravel);
    p.noise(['#7a756b', '#a39d91'], 0.2);
    for (let x = 0; x < 16; x += 4) p.rect(x, 1, 2, 14, C.rail);
    p.rect(0, 3, 16, 1, C.railMetal); p.rect(0, 12, 16, 1, C.railMetal);
  },
  p: (p) => {
    p.rect(0, 0, 16, 16, '#cfc6b4');
    p.noise(['#c2b8a4'], 0.08);
    for (let i = 0; i < 16; i++) {
      p.px(i, 0, '#b3a892');
      p.px(0, i, '#b3a892');
      p.px(i, 8, '#bdb29c');
      p.px(8, i, '#bdb29c');
    }
  },
  P: (p) => {
    painters.p(p, 0);
    p.rect(0, 9, 16, 4, C.yellow);
    for (let x = 1; x < 16; x += 3) p.px(x, 10, '#c9a52f'), p.px(x, 12, '#c9a52f');
    p.rect(0, 14, 16, 2, '#8d877c');
  },
  X: (p) => {
    p.rect(0, 0, 16, 16, C.lab);
    for (let y = 0; y < 16; y += 4) for (let x = 0; x < 16; x++) p.px(x, y, C.lab2);
    p.rect(4, 5, 8, 4, C.labWin); p.rect(4, 5, 8, 1, '#ffffff');
  },
  x: (p) => {
    p.rect(0, 0, 16, 16, C.concrete);
    p.noise([C.concrete2], 0.1);
    for (let x = 0; x < 16; x++) p.px(x, 0, C.concrete2);
    for (let y = 0; y < 16; y++) p.px(0, y, C.concrete2);
  },
  S: (p) => {
    painters[':'](p, 0);
  },
  W: (p) => {
    p.rect(0, 0, 16, 16, C.wall);
    p.rect(0, 0, 16, 3, C.wallTop);
    for (let x = 0; x < 16; x += 4) p.rect(x, 3, 1, 13, C.wall2);
    p.rect(0, 14, 16, 2, C.wood2);
  },
  f: (p) => {
    p.rect(0, 0, 16, 16, C.floor);
    for (let y = 0; y < 16; y += 4) for (let x = 0; x < 16; x++) p.px(x, y, C.floor2);
    p.px(5, 1, C.floor2); p.px(11, 5, C.floor2); p.px(3, 9, C.floor2); p.px(13, 13, C.floor2);
  },
  m: (p) => {
    p.rect(0, 0, 16, 16, C.tatami);
    for (let y = 1; y < 16; y += 2) for (let x = 0; x < 16; x++) if ((x + y) % 3 === 0) p.px(x, y, C.tatami2);
    p.rect(0, 0, 16, 1, '#6b8f4a'); p.rect(0, 15, 16, 1, '#6b8f4a');
  },
  c: (p) => {
    p.rect(0, 0, 16, 16, C.wood2);
    p.rect(0, 0, 16, 6, C.wood3);
    p.rect(0, 6, 16, 1, '#5d3a1e');
    for (let x = 2; x < 16; x += 5) p.rect(x, 9, 2, 5, C.wood);
  },
  D: (p) => {
    painters.f(p, 0);
    p.rect(2, 4, 12, 10, '#a3423a');
    p.rect(3, 5, 10, 8, '#c4584d');
  },
};

export const TILE_CHARS = Object.keys(painters);
/** animated tiles: char -> extra frame index */
export const ANIMATED = ['~', '"'];

/** Builds the tileset canvas: one column per tile char, second row = animation frame. */
export function buildTileset(): { canvas: HTMLCanvasElement; index: Record<string, number> } {
  const canvas = document.createElement('canvas');
  canvas.width = TILE * TILE_CHARS.length;
  canvas.height = TILE * 2;
  const ctx = canvas.getContext('2d')!;
  const index: Record<string, number> = {};
  TILE_CHARS.forEach((ch, i) => {
    index[ch] = i;
    for (let f = 0; f < 2; f++) painters[ch](new Pix(ctx, i * TILE, f * TILE, 1234 + i * 97), f);
  });
  return { canvas, index };
}

// ---------------- furniture & props (multi-tile) ----------------

function canvasOf(wt: number, ht: number, paint: (p: (x: number, y: number, w: number, h: number, c: string) => void) => void) {
  const c = document.createElement('canvas');
  c.width = wt * TILE;
  c.height = ht * TILE;
  const ctx = c.getContext('2d')!;
  paint((x, y, w, h, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
  });
  return c;
}

export function buildProps(): Record<string, HTMLCanvasElement> {
  return {
    gen_bed: canvasOf(1, 2, (r) => {
      r(1, 1, 14, 30, '#7a4b2a');
      r(2, 2, 12, 28, '#f3f0ea');
      r(3, 3, 10, 6, '#ffffff');
      r(2, 12, 12, 18, '#5b8fd6');
      r(2, 12, 12, 2, '#7fb0ee');
      for (let y = 16; y < 30; y += 4) r(2, y, 12, 1, '#4a7bc0');
    }),
    gen_desk: canvasOf(2, 1, (r) => {
      r(0, 4, 32, 9, '#9a6a3c');
      r(0, 4, 32, 2, '#b98552');
      r(2, 13, 3, 3, '#6e4523');
      r(27, 13, 3, 3, '#6e4523');
      r(5, 1, 8, 5, '#f4efe3');
      r(6, 2, 6, 1, '#9aa0a8');
      r(20, 0, 7, 6, '#3d5a80');
      r(21, 1, 5, 4, '#7fb6e8');
      r(15, 2, 3, 3, '#e8c64a');
    }),
    gen_shelf: canvasOf(2, 1, (r) => {
      r(1, 0, 30, 16, '#7a4b2a');
      r(2, 1, 28, 6, '#5d3a1e');
      r(2, 9, 28, 6, '#5d3a1e');
      const cols = ['#d0473a', '#3d6fd1', '#e8c64a', '#5fae4a', '#9b6bb3', '#e5762e'];
      for (let i = 0; i < 9; i++) r(3 + i * 3, 2, 2, 5, cols[i % 6]);
      for (let i = 0; i < 8; i++) r(4 + i * 3, 10, 2, 5, cols[(i + 2) % 6]);
    }),
    gen_plant: canvasOf(1, 1, (r) => {
      r(5, 10, 6, 6, '#b5653a');
      r(5, 10, 6, 1, '#d88a5a');
      r(3, 3, 10, 7, '#4f9a3d');
      r(5, 1, 6, 4, '#6ab450');
      r(2, 6, 3, 3, '#6ab450');
      r(11, 5, 3, 3, '#6ab450');
    }),
    gen_window: canvasOf(2, 1, (r) => {
      r(3, 2, 26, 10, '#6b4a2c');
      r(4, 3, 24, 8, '#a8dcf5');
      r(15, 3, 2, 8, '#6b4a2c');
      r(4, 3, 24, 2, '#e8f7ff');
      r(2, 1, 6, 12, '#e88fa8');
      r(24, 1, 6, 12, '#e88fa8');
    }),
    gen_table: canvasOf(2, 2, (r) => {
      r(3, 6, 26, 18, '#9a6a3c');
      r(3, 6, 26, 3, '#b98552');
      r(5, 24, 3, 6, '#6e4523');
      r(24, 24, 3, 6, '#6e4523');
      r(8, 10, 6, 4, '#ffffff');
      r(9, 11, 4, 2, '#6b3e1e');
      r(18, 9, 7, 5, '#f4d7e0');
    }),
    gen_station: (() => {
      // small wooden station building with a 日野森駅 sign
      const c = canvasOf(3, 3, (r) => {
        r(2, 14, 44, 30, '#8a5a34'); // walls
        for (let x = 2; x < 46; x += 4) r(x, 14, 1, 30, '#744a29');
        r(0, 6, 48, 9, '#2f4a7a'); // roof
        r(0, 6, 48, 2, '#46669e');
        r(4, 2, 40, 5, '#263d66');
        r(18, 30, 12, 14, '#3a2414'); // door
        r(19, 31, 10, 13, '#5a3a22');
        r(6, 22, 9, 7, '#f6e3a5'); // windows
        r(33, 22, 9, 7, '#f6e3a5');
        r(10, 22, 1, 7, '#744a29');
        r(37, 22, 1, 7, '#744a29');
        r(12, 15, 24, 6, '#f4efe3'); // sign board
      });
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#1f2633';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('日野森駅', c.width / 2, 36);
      return c;
    })(),
    gen_shadow: canvasOf(1, 1, (r) => {
      r(3, 12, 10, 3, 'rgba(0,0,0,0.22)');
    }),
  };
}
