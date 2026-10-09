import Phaser from 'phaser';
import { MAPS, BLOCKING, type MapDef, type MapObject } from '../content/maps';
import { ROOMS_GEN } from '../content/rooms.gen';
import { NPCS } from '../content/npcs';
import { ENCOUNTERS } from '../content/creatures';
import { check, pickRule, type Step } from '../core/script';
import { SCRIPTS } from '../content/scripts';
import { FOLK, type FolkDef } from '../content/folk';
import { DECO_CATALOG } from '../content/creatures';
import { store } from '../core/store';
import { bus } from '../core/events';
import type { Dir } from '../core/types';
import { TEX, TILE, TILE_IMAGES, buildProps, buildTileset } from './textures';
import { AUTOTILE_KEYS, isForestWall, planCell } from './autotile';
import { input } from './input';

const DIR_NAMES = ['down', 'left', 'right', 'up'];
/** map chars drawn as fence pieces (all blocking) */
const FENCE_CHARS: Record<string, string> = { '#': 'wood', Z: 'stone', Y: 'hedge', J: 'bamboo' };
const DETAIL_KEYS = [
  'g_flower_red', 'g_flower_yellow', 'g_flower_white', 'g_tuft', 'g_pebbles', 'g_mushrooms', 'g_leaves', 'g_stump',
  'g_lily', 'g_lily_flower', 'g_reeds', 'g_butterfly_0', 'g_butterfly_1',
  ...['wood', 'stone', 'hedge', 'bamboo'].flatMap((k) => ['h', 'v', 'corner', 'end', 'h2', 'v2', 'corner2', 'end2'].map((p) => `f_${k}_${p}`)),
  'tp_vending', 'tp_postbox', 'tp_bench', 'tp_bicycle', 'tp_pole', 'tp_lantern', 'tp_hokora', 'tp_garbage', 'tp_pot_tree',
  'tp_pot_flower', 'tp_planter_y', 'tp_planter_p', 'tp_mirror', 'tp_sign', 'tp_trash', 'tp_barrel', 'tp_torii',
  'tile_bridge_n', 'tile_bridge_s',
];
const NPC_SHEETS = ['mori', 'kaede', 'haruto', 'aoi', 'sato', 'kirishima', 'station_staff', 'customer'];

export const ASSET_KEYS = [
  // player walk cycle: hero_<dir>_<frame>, frames 0/2 standing, 1/3 stepping
  ...DIR_NAMES.flatMap((d) => [0, 1, 2, 3].map((f) => `hero_${d}_${f}`)),
  ...NPC_SHEETS.flatMap((n) => DIR_NAMES.map((d) => `npc_${n}_${d}`)),
  'k_fox_blue', 'k_fox_pink', 'k_sprout', 'k_bird_blue', 'k_fox_orange', 'k_puff', 'k_fox_black', 'k_fox_winged',
  'k_sprout2', 'k_blob_pink', 'k_bird_white', 'k_cat_black',
  'b_inn', 'b_house_blue', 'b_house_trad', 'b_konbini', 'b_shop_red', 'b_bridge',
  'p_sakura', 'p_shrine', 'p_pond', 'p_garden', 'p_lamp', 'p_signpost', 'p_board', 'p_board2', 'p_mailbox',
  'p_sign_nihon', 'p_banner', 'p_sign_small',
  ...Object.values(FOLK).flatMap((f) => DIR_NAMES.flatMap((d) => Array.from({ length: f.frames }, (_, i) => `folk_${f.sprite}_${d}_${i}`))),
  ...DECO_CATALOG, 'deco_certificate',
  'em_alert', 'map_forest', 'map_town', 'b_station', 'b_lab', 'b_apartment2', 'b_konbini2', 'b_ramen2', 'b_library2', 'p_hokora',
  ...new Set(Object.values(TILE_IMAGES).flat().filter((k): k is string => !!k)),
  ...AUTOTILE_KEYS,
  ...DETAIL_KEYS,
  'n_tree_round', 'n_tree_cedar', 'n_tree_sakura', 'n_bush', 'n_bush_flowers', 'n_rock', 'n_fence', 'n_fence_post', 'n_lantern',
  // town buildings and rooms built from the Hinomori sheets (tools/build_exteriors.py, tools/build_rooms.py)
  'bx_apartment', 'bx_konbini', 'bx_cafe', 'bx_library', 'bx_station', 'bx_ramen', 'bx_shrine',
  ...Object.values(ROOMS_GEN).flatMap((r) => [r.image, ...r.objects.flatMap((o) => (o.sprite ? [o.sprite] : []))]),
];

const DIRS: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const STEP_MS = 170;

interface NpcSprite {
  id: string;
  sprite: Phaser.GameObjects.Image;
  x: number;
  y: number;
  base: string;
  when?: any;
  marker?: Phaser.GameObjects.Image;
}

interface Wanderer {
  def: FolkDef;
  sprite: Phaser.GameObjects.Image;
  x: number;
  y: number;
  hx: number;
  hy: number;
  r: number;
  dir: Dir;
  moving: boolean;
}

/** true if these steps advance a quest (start it or complete an objective) */
function advancesQuest(steps: Step[]): boolean {
  return steps.some((st) => {
    if ('do' in st) return st.do.some((a) => 'objective' in a || 'startQuest' in a || 'recruit' in a);
    if ('choice' in st) return st.choice.some((c) => c.then && advancesQuest(c.then));
    if ('if' in st) return advancesQuest(st.then) || (!!st.else && advancesQuest(st.else));
    if ('battle' in st) return true;
    return false;
  });
}

export class WorldScene extends Phaser.Scene {
  map!: MapDef;
  layer!: Phaser.Tilemaps.TilemapLayer;
  player!: Phaser.GameObjects.Image;
  shadow!: Phaser.GameObjects.Image;
  px = 0;
  py = 0;
  facing: Dir = 'down';
  moving = false;
  npcs: NpcSprite[] = [];
  wanderers: Wanderer[] = [];
  objects: { def: MapObject; img?: Phaser.GameObjects.Image }[] = [];
  tileIndex: Record<string, number> = {};
  tilesetCols = 0;
  animatedCols: number[] = [];
  grassOverlay?: Phaser.GameObjects.Image;
  animFrame = 0;
  tint?: Phaser.GameObjects.Rectangle;
  unsub: (() => void)[] = [];
  lastStepEncounter = 0;
  stepCount = 0;

  constructor() {
    super('world');
  }

  preload() {
    for (const k of ASSET_KEYS) this.load.image(k, `assets/${k}.png`);
  }

  create() {
    this.moving = false;
    this.animFrame = 0;
    this.npcs = [];
    this.wanderers = [];
    this.objects = [];
    this.tint = undefined;
    if (!this.textures.exists('tiles')) {
      const { canvas, index } = buildTileset((key) =>
        this.textures.exists(key) ? (this.textures.get(key).getSourceImage() as CanvasImageSource) : undefined,
      );
      this.textures.addCanvas('tiles', canvas);
      this.tileIndex = index;
      this.registry.set('tileIndex', index);
      for (const [k, c] of Object.entries(buildProps())) this.textures.addCanvas(k, c);
    } else {
      this.tileIndex = this.registry.get('tileIndex');
    }

    const s = store.s;
    this.map = MAPS[s.map] ?? MAPS.town;
    this.px = s.pos.x;
    this.py = s.pos.y;
    this.facing = s.facing;
    this.buildMap();
    this.buildPlayer();
    this.refreshVisibility();

    const cam = this.cameras.main;
    cam.setBackgroundColor(this.map.interior ? '#1d1a24' : '#2f5a33');
    this.fitCamera();
    this.scale.on('resize', this.fitCamera, this);
    cam.startFollow(this.player, true, 1, 1, 0, -16);
    cam.fadeIn(250, 0, 0, 0);

    this.time.addEvent({ delay: 550, loop: true, callback: () => this.animateTiles() });
    this.unsub.push(store.subscribe(() => this.refreshVisibility()));
    this.unsub.push(bus.on('warp', (p) => this.warpTo(p.map, p.x, p.y, p.facing ?? 'down')));
    this.events.once('shutdown', () => {
      this.unsub.forEach((u) => u());
      this.unsub = [];
      this.scale.off('resize', this.fitCamera, this);
    });
    bus.emit('map-entered', { id: this.map.id, name: this.map.name, nameJa: this.map.nameJa });
  }

  fitCamera() {
    const cam = this.cameras.main;
    const w = this.scale.width;
    const h = this.scale.height;
    const zoom = Math.max(1, Math.floor(Math.min(w / (14 * TILE), h / (9 * TILE))));
    cam.setZoom(zoom);
    const mw = this.map.tiles[0].length * TILE;
    const mh = this.map.tiles.length * TILE;
    const vw = w / zoom;
    const vh = h / zoom;
    // center small maps, clamp large ones
    const bx = mw < vw ? -(vw - mw) / 2 : 0;
    const by = mh < vh ? -(vh - mh) / 2 : 0;
    cam.setBounds(bx, by, Math.max(mw, vw), Math.max(mh, vh));
  }

  // ------------------------------------------------------------ map building
  buildMap() {
    const rows = this.map.tiles;
    const data = this.buildMapTileset();
    const texKey = `tiles_${this.map.id}`;
    const tm = this.make.tilemap({ data, tileWidth: TEX, tileHeight: TEX });
    const ts = tm.addTilesetImage(texKey, texKey, TEX, TEX, 0, 0)!;
    this.layer = tm.createLayer(0, ts, 0, 0)!;
    this.layer.setScale(TILE / TEX);
    this.layer.setDepth(-10);
    if (!this.map.interior) {
      // painted outdoor maps already show trees, flowers and grass
      if (!this.map.image) this.placeScenery();
      this.spawnButterflies();
    }
    if (this.map.image && this.textures.exists(this.map.image)) {
      // pre-drawn room: the tile layer only provides collision
      this.layer.setVisible(false);
      this.add.image(0, 0, this.map.image).setOrigin(0).setDepth(-9);
    }

    for (const def of this.map.objects) {
      const entry: { def: MapObject; img?: Phaser.GameObjects.Image } = { def };
      if (def.sprite && this.textures.exists(def.sprite)) {
        const w = def.w ?? 1;
        const h = def.h ?? 1;
        const cx = def.at ? def.at[0] : (def.x + w / 2) * TILE;
        const by = def.at ? def.at[1] : (def.y + h) * TILE + (def.dy ?? 0);
        const img = this.add.image(cx, by, def.sprite).setOrigin(0.5, 1);
        img.setDepth(by - 1);
        entry.img = img;
        if (def.label) {
          this.add
            .text(cx - img.width / 2 + def.label.x * img.width, by - img.height + def.label.y * img.height, def.label.text, {
              fontFamily: 'DotGothic16, "Noto Sans JP", sans-serif',
              fontSize: '9px',
              color: '#2a2018',
            })
            .setOrigin(0.5)
            .setResolution(4)
            .setDepth(by);
        }
      }
      this.objects.push(entry);
    }

    for (const n of this.map.npcs) {
      const def = NPCS[n.id];
      const base = def.sprite;
      const key = this.textureFor(base, n.facing ?? 'down');
      const img = this.add.image(n.x * TILE + TILE / 2, n.y * TILE + TILE - 2, key).setOrigin(0.5, 1);
      if (def.tint) img.setTint(def.tint);
      img.setDepth(img.y);
      const entry: NpcSprite = { id: n.id, sprite: img, x: n.x, y: n.y, base, when: n.when };
      if (this.textures.exists('em_alert')) {
        entry.marker = this.add.image(img.x, img.y - img.height - 2, 'em_alert').setOrigin(0.5, 1).setDepth(100001).setVisible(false);
        this.tweens.add({ targets: entry.marker, y: entry.marker.y - 4, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      }
      this.npcs.push(entry);
    }

    for (const w of this.map.wanderers ?? []) {
      const def = FOLK[w.id];
      if (!def) continue;
      const img = this.add.image(w.x * TILE + TILE / 2, w.y * TILE + TILE - 2, `folk_${def.sprite}_down_0`).setOrigin(0.5, 1);
      img.setDepth(img.y);
      this.wanderers.push({ def, sprite: img, x: w.x, y: w.y, hx: w.x, hy: w.y, r: w.r, dir: 'down', moving: false });
    }
    if (this.wanderers.length) this.time.addEvent({ delay: 700, loop: true, callback: () => this.wander() });

    if (store.s.timeOfDay === 'evening' && !this.map.interior) {
      this.tint = this.add
        .rectangle(0, 0, rows[0].length * TILE, rows.length * TILE, 0x30205a, 0.28)
        .setOrigin(0)
        .setDepth(100000);
    }
  }

  /** Trees on 'T' tiles, fences on '#', and a little undergrowth in the forest. */
  placeScenery() {
    const rows = this.map.tiles;
    const hash = (x: number, y: number) => (((x * 73856093) ^ (y * 19349663)) >>> 0) % 1000 / 1000;
    const forest = this.map.id === 'forest';
    for (let y = 0; y < rows.length; y++) {
      for (let x = 0; x < rows[y].length; x++) {
        const ch = rows[y][x];
        const r = hash(x, y);
        const px = x * TILE + TILE / 2;
        const py = y * TILE + TILE;
        if (ch === 'T') {
          if (isForestWall(rows, x, y)) continue; // drawn by the forest autotiles
          const key = forest ? (r < 0.5 ? 'n_tree_cedar' : 'n_tree_round') : r < 0.12 ? 'n_tree_sakura' : 'n_tree_round';
          if (!this.textures.exists(key)) continue;
          this.add.image(px + Math.round((r - 0.5) * 8), py + 2, key).setOrigin(0.5, 1).setDepth(py);
        } else if (ch === ',') {
          const key = ['g_flower_red', 'g_flower_yellow', 'g_flower_white'][Math.floor(r * 3)];
          if (this.textures.exists(key)) this.add.image(px, py - 4, key).setOrigin(0.5, 1).setDepth(-5);
        } else if (FENCE_CHARS[ch]) {
          this.placeFence(rows, x, y, FENCE_CHARS[ch]);
        } else if (ch === '~') {
          // lily pads only on open water (not along the shore)
          const open = [[-1, 0], [1, 0], [0, -1], [0, 1]].every(([dx, dy]) => rows[y + dy]?.[x + dx] === '~');
          if (open && r > 0.55) this.add.image(px + (r - 0.75) * 30, py - 8, r > 0.85 ? 'g_lily_flower' : 'g_lily').setOrigin(0.5, 1).setDepth(-5);
        } else if (ch === '.' && !this.objectAt(x, y)) {
          const nearWater = [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([dx, dy]) => rows[y + dy]?.[x + dx] === '~');
          let key: string | null = null;
          if (nearWater && r > 0.8) key = 'g_reeds';
          else if (forest && r > 0.9) key = r > 0.985 ? 'g_stump' : r > 0.97 ? 'g_mushrooms' : r > 0.955 ? 'n_rock' : r > 0.935 ? 'g_leaves' : 'g_tuft';
          else if (!forest && r > 0.95) key = r > 0.985 ? 'g_pebbles' : r > 0.97 ? 'g_flower_white' : 'g_tuft';
          if (key && this.textures.exists(key)) {
            const solid = key === 'g_stump';
            this.add.image(px + (solid ? 0 : (r - 0.5) * 12), py - 2, key).setOrigin(0.5, 1).setDepth(solid ? py - 2 : -5);
          }
        }
      }
    }
  }

  /** fence / wall / hedge pieces chosen from the neighbouring cells of the same kind */
  placeFence(rows: string[], x: number, y: number, kind: string) {
    const ch = rows[y][x];
    const same = (dx: number, dy: number) => rows[y + dy]?.[x + dx] === ch;
    const l = same(-1, 0);
    const r = same(1, 0);
    const u = same(0, -1);
    const d = same(0, 1);
    const alt = (x + y) % 2 ? '2' : '';
    let part = 'h' + alt;
    let flip = false;
    if ((l || r) && (u || d)) {
      part = 'corner';
      flip = l && !r;
    } else if (u || d) part = 'v' + alt;
    else if (l && !r) part = 'end';
    else if (r && !l) {
      part = 'end';
      flip = true;
    }
    const key = `f_${kind}_${part}`;
    if (!this.textures.exists(key)) return;
    const py = y * TILE + TILE;
    this.add.image(x * TILE + TILE / 2, py, key).setOrigin(0.5, 1).setFlipX(flip).setDepth(py - 4);
  }

  /** a few butterflies drifting over outdoor maps */
  spawnButterflies() {
    if (this.map.interior || !this.textures.exists('g_butterfly_0')) return;
    const W = this.map.tiles[0].length * TILE;
    const H = this.map.tiles.length * TILE;
    for (let i = 0; i < 4; i++) {
      const b = this.add.image(Phaser.Math.Between(64, W - 64), Phaser.Math.Between(64, H - 64), 'g_butterfly_0').setDepth(100000).setScale(0.7);
      let f = 0;
      this.time.addEvent({ delay: 160, loop: true, callback: () => b.setTexture(`g_butterfly_${(f = 1 - f)}`) });
      const fly = () =>
        this.tweens.add({
          targets: b,
          x: Phaser.Math.Clamp(b.x + Phaser.Math.Between(-140, 140), 32, W - 32),
          y: Phaser.Math.Clamp(b.y + Phaser.Math.Between(-100, 100), 32, H - 32),
          duration: Phaser.Math.Between(2500, 4500),
          ease: 'Sine.easeInOut',
          onComplete: fly,
        });
      fly();
    }
  }

  textureFor(base: string, dir: Dir, frame = 0): string {
    for (const k of [`${base}_${dir}_${frame}`, `${base}_${dir}_0`, `${base}_${dir}`]) if (this.textures.exists(k)) return k;
    // legacy single-view sprites: side view mirrored for left
    const variant = dir === 'left' ? `${base}_side_flip` : dir === 'right' ? `${base}_side` : `${base}_${dir}`;
    if (this.textures.exists(variant)) return variant;
    if (this.textures.exists(`${base}_down`)) return `${base}_down`;
    return base;
  }

  buildPlayer() {
    this.shadow = this.add.image(0, 0, 'gen_shadow').setOrigin(0.5, 1);
    this.player = this.add.image(0, 0, this.textureFor('hero', this.facing)).setOrigin(0.5, 1);
    if (this.textures.exists('tallgrass_overlay')) {
      this.grassOverlay = this.add.image(0, 0, 'tallgrass_overlay').setOrigin(0, 0).setScale(TILE / TEX).setVisible(false);
    }
    this.placePlayer();
  }

  placePlayer() {
    const x = this.px * TILE + TILE / 2;
    const y = this.py * TILE + TILE - 2;
    this.player.setPosition(x, y);
    this.shadow.setPosition(x, y + 4);
    this.player.setDepth(y);
    this.shadow.setDepth(y - 2);
    // standing in tall grass hides the feet, like in classic handheld RPGs
    const inGrass = this.tileAt(this.px, this.py) === '"';
    this.shadow.setVisible(!inGrass);
    if (this.grassOverlay) {
      this.grassOverlay.setPosition(this.px * TILE, this.py * TILE).setDepth(y + 1).setVisible(inGrass);
    }
  }

  refreshVisibility() {
    if (!store.state || !this.layer) return;
    const s = store.s;
    for (const n of this.npcs) {
      const vis = check(s, n.when);
      n.sprite.setVisible(vis);
      if (n.marker) {
        const steps = vis && SCRIPTS[n.id] ? pickRule(s, SCRIPTS[n.id]) : null;
        n.marker.setVisible(!!steps && advancesQuest(steps));
      }
    }
    for (const o of this.objects) o.img?.setVisible(check(s, o.def.when));
    if (this.tint) this.tint.setVisible(s.timeOfDay === 'evening');
    else if (s.timeOfDay === 'evening' && !this.map.interior) {
      const rows = this.map.tiles;
      this.tint = this.add.rectangle(0, 0, rows[0].length * TILE, rows.length * TILE, 0x30205a, 0.28).setOrigin(0).setDepth(100000);
    }
  }

  /**
   * Builds (once per map) a tileset with exactly the tiles this map needs: plain tiles copied
   * from the base set plus autotiled transitions composed from quadrants. Row 2 holds the
   * second animation frame. Returns the tile-index grid.
   */
  buildMapTileset(): number[][] {
    const rows = this.map.tiles;
    const texKey = `tiles_${this.map.id}`;
    const cached = this.registry.get(texKey) as { data: number[][]; animated: number[]; cols: number } | undefined;
    if (cached && this.textures.exists(texKey)) {
      this.animatedCols = cached.animated;
      this.tilesetCols = cached.cols;
      return cached.data;
    }
    const img = (k: string) => (this.textures.exists(k) ? (this.textures.get(k).getSourceImage() as CanvasImageSource) : undefined);
    const base = this.textures.get('tiles').getSourceImage() as HTMLCanvasElement;
    const baseCols = Object.keys(this.tileIndex).length;
    const columns: { draw: (ctx: CanvasRenderingContext2D, x: number, y: number, f: number) => void; animated: boolean }[] = [];
    const colOf = new Map<string, number>();
    const data = rows.map((r, y) =>
      [...r].map((ch, x) => {
        const plan = this.map.interior ? null : planCell(rows, x, y, img);
        const key = plan ? plan.key : `ch:${ch}`;
        let col = colOf.get(key);
        if (col === undefined) {
          col = columns.length;
          colOf.set(key, col);
          if (plan) columns.push({ draw: (ctx, dx, dy, f) => plan.draw(ctx, dx, dy, TEX, f), animated: plan.animated });
          else {
            const bi = this.tileIndex[ch] ?? this.tileIndex['.'];
            columns.push({
              draw: (ctx, dx, dy, f) => ctx.drawImage(base, bi * TEX, f * TEX, TEX, TEX, dx, dy, TEX, TEX),
              animated: ch === '~',
            });
          }
        }
        return col;
      }),
    );
    void baseCols;
    const canvas = document.createElement('canvas');
    canvas.width = TEX * columns.length;
    canvas.height = TEX * 2;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    columns.forEach((c, i) => {
      c.draw(ctx, i * TEX, 0, 0);
      c.draw(ctx, i * TEX, TEX, 1);
    });
    if (this.textures.exists(texKey)) this.textures.remove(texKey);
    this.textures.addCanvas(texKey, canvas);
    this.animatedCols = columns.map((c, i) => (c.animated ? i : -1)).filter((i) => i >= 0);
    this.tilesetCols = columns.length;
    this.registry.set(texKey, { data, animated: this.animatedCols, cols: columns.length });
    return data;
  }

  animateTiles() {
    this.animFrame = 1 - this.animFrame;
    for (const a of this.animatedCols) {
      const b = a + this.tilesetCols; // second row of the tileset
      if (this.animFrame) this.layer.replaceByIndex(a, b);
      else this.layer.replaceByIndex(b, a);
    }
  }

  // ------------------------------------------------------------ collision
  wandererAt(x: number, y: number): Wanderer | undefined {
    return this.wanderers.find((w) => w.x === x && w.y === y);
  }

  /** each tick some townsfolk take a step within their home radius */
  wander() {
    if (input.locked) return;
    const dirs: Dir[] = ['up', 'down', 'left', 'right'];
    for (const w of this.wanderers) {
      if (w.moving || Math.random() < 0.55) continue;
      const dir = dirs[Math.floor(Math.random() * 4)];
      const [dx, dy] = DIRS[dir];
      const tx = w.x + dx;
      const ty = w.y + dy;
      w.dir = dir;
      const ch = this.tileAt(tx, ty);
      const key = (f: number) => `folk_${w.def.sprite}_${dir}_${f}`;
      const free =
        Math.abs(tx - w.hx) + Math.abs(ty - w.hy) <= w.r &&
        !'rpP~b'.includes(ch) &&
        !this.blocked(tx, ty) &&
        !(tx === this.px && ty === this.py) &&
        !this.map.warps.some((wp) => wp.x === tx && wp.y === ty);
      if (!free) {
        w.sprite.setTexture(key(0));
        continue;
      }
      w.moving = true;
      w.x = tx;
      w.y = ty;
      const sx = w.sprite.x;
      const sy = w.sprite.y;
      const ex = tx * TILE + TILE / 2;
      const ey = ty * TILE + TILE - 2;
      this.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 420,
        onUpdate: (tw) => {
          const t = tw.getValue() ?? 0;
          w.sprite.setTexture(key(t < 0.5 ? 1 : Math.min(w.def.frames - 1, 2)));
          w.sprite.setPosition(Phaser.Math.Linear(sx, ex, t), Phaser.Math.Linear(sy, ey, t));
          w.sprite.setDepth(w.sprite.y);
        },
        onComplete: () => {
          w.sprite.setTexture(key(0));
          w.moving = false;
        },
      });
    }
  }

  tileAt(x: number, y: number): string {
    return this.map.tiles[y]?.[x] ?? 'T';
  }

  npcAt(x: number, y: number): NpcSprite | undefined {
    return this.npcs.find((n) => n.x === x && n.y === y && n.sprite.visible);
  }

  objectAt(x: number, y: number, forInteract = false): MapObject | undefined {
    const s = store.s;
    for (const { def } of this.objects) {
      if (!check(s, def.when)) continue;
      if (forInteract && def.interactAt) {
        if (def.interactAt.some((p) => p.x === x && p.y === y)) return def;
        continue;
      }
      const w = def.w ?? 1;
      const h = def.h ?? 1;
      if (x >= def.x && x < def.x + w && y >= def.y && y < def.y + h) return def;
    }
    return undefined;
  }

  blocked(x: number, y: number): boolean {
    if (BLOCKING.has(this.tileAt(x, y))) return true;
    if (this.npcAt(x, y)) return true;
    if (this.wandererAt(x, y)) return true;
    const s = store.s;
    return this.objects.some(({ def }) => {
      if (def.solid === false || !check(s, def.when)) return false;
      const w = def.w ?? 1;
      const h = def.h ?? 1;
      return x >= def.x && x < def.x + w && y >= def.y && y < def.y + h;
    });
  }

  // ------------------------------------------------------------ update loop
  update() {
    if (!store.state) return;
    if (input.consume('menu')) {
      if (!input.locked) bus.emit('open-menu');
    }
    if (input.locked || this.moving) {
      input.consume('a');
      return;
    }
    if (input.consume('a')) {
      this.interact();
      return;
    }
    const dir = input.direction();
    if (dir) this.tryMove(dir);
  }

  tryMove(dir: Dir) {
    const changed = dir !== this.facing;
    this.facing = dir;
    this.player.setTexture(this.textureFor('hero', dir));
    const [dx, dy] = DIRS[dir];
    const tx = this.px + dx;
    const ty = this.py + dy;
    const warp = this.map.warps.find((w) => w.x === tx && w.y === ty);
    if (warp) {
      if (!check(store.s, warp.when)) {
        if (warp.locked) bus.emit('message', { text: warp.locked });
        return;
      }
      this.warpTo(warp.to.map, warp.to.x, warp.to.y, warp.to.facing);
      return;
    }
    if (this.blocked(tx, ty)) {
      if (changed) store.update((s) => (s.facing = dir), 'facing');
      return;
    }
    this.moving = true;
    this.grassOverlay?.setVisible(false);
    this.shadow.setVisible(true);
    this.stepCount++;
    const stepFrame = this.stepCount % 2 ? 1 : 3;
    this.px = tx;
    this.py = ty;
    const startY = this.player.y;
    const endX = tx * TILE + TILE / 2;
    const endY = ty * TILE + TILE - 2;
    this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: STEP_MS,
      onUpdate: (tw) => {
        const t = tw.getValue() ?? 0;
        const x = Phaser.Math.Linear(this.player.x, endX, t);
        const y = Phaser.Math.Linear(startY, endY, t);
        // alternate left/right step frames between tiles, stand at the end
        const frame = t < 0.75 ? stepFrame : 0;
        this.player.setTexture(this.textureFor('hero', dir, frame));
        this.player.setPosition(x, y);
        this.shadow.setPosition(x, y + 4);
        this.player.setDepth(y);
      },
      onComplete: () => {
        this.placePlayer();
        this.moving = false;
        store.update((s) => {
          s.pos = { x: tx, y: ty };
          s.facing = dir;
          s.stats.steps++;
        }, 'step');
        this.afterStep();
      },
    });
  }

  afterStep() {
    const s = store.s;
    if (this.tileAt(this.px, this.py) === '"' && this.map.encounters && s.team.length > 0) {
      if (s.stats.steps - this.lastStepEncounter > 3 && Math.random() < 0.12) {
        this.lastStepEncounter = s.stats.steps;
        const table = ENCOUNTERS[this.map.encounters];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let roll = Math.random() * total;
        const pick = table.find((e) => (roll -= e.weight) < 0) ?? table[0];
        const level = pick.min + Math.floor(Math.random() * (pick.max - pick.min + 1));
        this.cameras.main.flash(250, 255, 255, 255);
        bus.emit('encounter', { species: pick.species, level, bg: this.map.bg });
      }
    }
  }

  interact() {
    const [dx, dy] = DIRS[this.facing];
    let tx = this.px + dx;
    let ty = this.py + dy;
    const fx = tx;
    const fy = ty;
    // talk across counters (up to two tiles deep)
    for (let i = 0; i < 2 && this.tileAt(tx, ty) === 'c' && !this.npcAt(tx, ty); i++) {
      tx += dx;
      ty += dy;
    }
    const folk = this.wandererAt(fx, fy);
    if (folk) {
      const back: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      folk.dir = back[this.facing];
      folk.sprite.setTexture(`folk_${folk.def.sprite}_${folk.dir}_0`);
      const line = folk.def.lines[Math.floor(Math.random() * folk.def.lines.length)];
      bus.emit('message', { text: `${folk.def.name}：「${line.jp}」`, en: line.en });
      return;
    }
    const npc = this.npcAt(tx, ty);
    if (npc) {
      const back: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      npc.sprite.setTexture(this.textureFor(npc.base, back[this.facing]));
      bus.emit('interact', { id: npc.id, kind: 'npc' });
      return;
    }
    const obj = this.objectAt(fx, fy, true) ?? this.objectAt(fx, fy) ?? this.objectAt(tx, ty, true) ?? this.objectAt(tx, ty);
    if (obj) bus.emit('interact', { id: obj.script ?? obj.id, kind: 'object' });
  }

  warpTo(map: string, x: number, y: number, facing: Dir) {
    if (!MAPS[map]) return;
    this.moving = true;
    this.cameras.main.fadeOut(200, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      store.update((s) => {
        s.map = map;
        s.pos = { x, y };
        s.facing = facing;
      }, 'map');
      this.scene.restart();
    });
  }
}
