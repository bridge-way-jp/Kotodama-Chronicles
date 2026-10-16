import Phaser from 'phaser';
import { MAPS, BLOCKING, type MapDef, type MapObject } from '../content/maps';
import { editor } from './editorState';
import { emptyEdits, loadLocalEdits, saveLocalEdits } from '../content/edits';
import { OBJECT_PALETTE } from '../content/plain.gen';
import { ROOMS_GEN } from '../content/rooms.gen';
import { OSAKA_GEN } from '../content/osaka.gen';
import { TOKYO_GEN } from '../content/tokyo.gen';
import { NPCS } from '../content/npcs';
import { ENCOUNTERS } from '../content/creatures';
import { check, pickRule, type Step } from '../core/script';
import { SCRIPTS } from '../content/scripts';
import { FOLK, type FolkDef } from '../content/folk';
import { DECO_CATALOG } from '../content/creatures';
import { store } from '../core/store';
import { bus } from '../core/events';
import { RIDE_MS } from '../core/ride';
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
const NPC_SHEETS = ['mori', 'kaede', 'haruto', 'aoi', 'sato', 'kirishima', 'station_staff', 'customer', 'hayashi', 'sakura', 'okami', 'kenji', 'ota', 'busdriver', 'tsuru', 'hina', 'fujii', 'kuroda', 'jokan', 'traveller', 'gen', 'nagisa', 'hamada', 'kaito', 'umino', 'shiraishi', 'sumie', 'matsuo', 'rin', 'ikeda', 'sakamoto', 'emma', 'tachibana', 'kenta', 'okan', 'fujita', 'minh', 'porter', 'kuroi', 'haru', 'yoshie', 'yamamoto', 'priya', 'attendant', 'kotone'];

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
  'bx_apartment', 'bx_konbini', 'bx_cafe', 'bx_library', 'bx_station', 'bx_ramen', 'bx_shrine', 'bx_lab',
  // Hinomori valley, chapter 2 (tools/build_valley.py)
  'wgs_peach_3', 'wgs_grape_3', 'wgs_sunflower_3', 'wgs_rice_2', 'wgs_asagao_3', 'wgs_sakura_2', 'wgs_tag',
  // Yukimi mountain village, chapter 3 (tools/build_mountain.py)
  'map_mountain', 'bx_guesthouse', 'bx_gassho', 'bx_clinic', 'bx_temple', 'bx_yukimi_station', 'bx_kamakura',
  // Shiomi harbour town, chapter 4 (tools/build_harbor.py)
  'bus_front', 'bus_side',
  'map_harbor', 'bx_lighthouse', 'bx_diner', 'bx_harbor_office', 'bx_seaside_inn', 'bx_townhouse', 'bx_shiomi_station',
  'map_bahnhof', 'map_kamogawa', 'map_gion', 'map_nishiki', 'map_fushimi',
  ...(['bahnhof_station', 'bahnhof_kiosk', 'bahnhof_konbini', 'kamogawa_tea_house', 'kamogawa_machiya', 'kamogawa_market_shop', 'kamogawa_kimono_shop', 'kamogawa_machiya2',
    'gion_guesthouse', 'gion_tea_house', 'gion_kimono_shop', 'gion_machiya', 'gion_machiya2', 'gion_machiya3', 'gion_machiya4', 'gion_machiya5',
    'fushimi_shrine', 'fushimi_tea_house', 'fushimi_market_shop'] as const).map((k) => `bx_k_${k}`),
  ...[0, 1, 2, 3, 4, 5].flatMap((i) => [`bx_k_nishiki_shop_t${i}`, `bx_k_nishiki_shop_b${i}`]),
  'map_umeda', 'map_nakanoshima', 'map_dotonbori', 'map_shinsekai', 'map_osakajo',
  ...Object.values(OSAKA_GEN).flatMap((m) => m.objects.flatMap((o) => (o.sprite ? [o.sprite] : []))),
  'map_station', 'map_asakusa', 'map_shibuya', 'map_shinjuku', 'map_sumida',
  ...Object.values(TOKYO_GEN).flatMap((m) => m.objects.flatMap((o) => (o.sprite ? [o.sprite] : []))),
  ...['petal', 'leaf', 'snow', 'rain', 'glow'].flatMap((k) => [0, 1, 2, 3, 4].map((i) => `fx_${k}_${i}`)),
  'map_valley', 'bx_farmhouse', 'bx_winery', 'bx_stand', 'bx_workshop', 'bx_busstop', 'bx_ryokan',
  ...Object.values(ROOMS_GEN).flatMap((r) => [r.image, ...r.objects.flatMap((o) => (o.sprite ? [o.sprite] : []))]),
];

/** painted seasonal versions of an outdoor map (public/assets/<map image>_<season>.png); spring is the base image.
 * Add a map here only once its files exist. */
const SEASONAL: Record<string, string[]> = { map_town: ['summer', 'autumn', 'winter'] };
function currentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
  const m = new Date().getMonth() + 1;
  return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';
}
/** the image to draw for a map today: the seasonal variant if there is one */
function seasonalImage(image: string | undefined): string | undefined {
  const season = currentSeason();
  return image && SEASONAL[image]?.includes(season) ? `${image}_${season}` : image;
}

/** images a map needs: its painted backdrop and the sprites of its objects */
function mapKeys(m: MapDef | undefined): string[] {
  if (!m) return [];
  return [...(m.image ? [...new Set([seasonalImage(m.image)!, m.image])] : []), ...m.objects.flatMap((o) => (o.sprite ? [o.sprite] : []))];
}
/** keys only some maps need (painted maps, buildings): loaded when the player gets there, not at start-up */
const LAZY_KEYS = new Set(Object.values(MAPS).flatMap(mapKeys));
const CORE_KEYS = ASSET_KEYS.filter((k) => !LAZY_KEYS.has(k));

/** set when the player rides the bus to another map: the bus drives off once the new map is shown */
let busLeavingOnEnter = false;

const DIRS: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const STEP_MS = 170;
/** after a few steps in one direction without letting go, the hero breaks into a brisk walk */
const RUN_MS = 118;
const RUN_AFTER = 4;

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
  objects: { def: MapObject; img?: Phaser.GameObjects.Image; marker?: Phaser.GameObjects.Image }[] = [];
  tileIndex: Record<string, number> = {};
  tilesetCols = 0;
  animatedCols: number[] = [];
  grassOverlay?: Phaser.GameObjects.Image;
  animFrame = 0;
  tint?: Phaser.GameObjects.Rectangle;
  unsub: (() => void)[] = [];
  lastStepEncounter = 0;
  manpoShown = false;
  stepCount = 0;

  constructor() {
    super('world');
  }

  preload() {
    const here = MAPS[store.s.map] ?? MAPS.town;
    for (const k of new Set([...CORE_KEYS, ...mapKeys(here)])) if (!this.textures.exists(k)) this.load.image(k, `assets/${k}.png`);
    if (this.load.list.size) this.showLoading();
  }

  /** a quiet progress bar while the first images arrive (the painted maps are large) */
  private showLoading() {
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, 0x14121c).setOrigin(0).setDepth(1e6);
    const label = this.add.text(width / 2, height / 2 - 22, '言の葉  Loading…', { fontFamily: 'sans-serif', fontSize: '18px', color: '#f4e7c8' }).setOrigin(0.5).setDepth(1e6 + 1);
    const frame = this.add.rectangle(width / 2, height / 2 + 6, 240, 10, 0x3b3550).setDepth(1e6 + 1);
    const bar = this.add.rectangle(width / 2 - 120, height / 2 + 6, 1, 10, 0xe8a1b6).setOrigin(0, 0.5).setDepth(1e6 + 2);
    this.load.on('progress', (v: number) => bar.active && bar.setSize(Math.max(1, 240 * v), 10));
    this.load.once('complete', () => [bg, label, frame, bar].forEach((o) => o.destroy()));
  }

  /** while the player explores, quietly fetch the maps the exits lead to so crossing is instant */
  private prefetchNeighbours() {
    const keys = new Set<string>();
    for (const w of this.map.warps) for (const k of mapKeys(MAPS[w.to.map])) if (!this.textures.exists(k)) keys.add(k);
    if (!keys.size) return;
    for (const k of keys) this.load.image(k, `assets/${k}.png`);
    this.load.start();
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
    this.unsub.push(
      bus.on('bus', ({ mode }) => {
        if (mode === 'arrive') this.busArrive();
        else busLeavingOnEnter = true;
      }),
    );
    if (busLeavingOnEnter) {
      busLeavingOnEnter = false;
      this.busLeave();
    }
    this.events.once('shutdown', () => {
      this.unsub.forEach((u) => u());
      this.unsub = [];
      this.scale.off('resize', this.fitCamera, this);
    });
    bus.emit('map-entered', { id: this.map.id, name: this.map.name, nameJa: this.map.nameJa });
    this.time.delayedCall(1500, () => this.prefetchNeighbours());
    if (editor.enabled) this.setupEditor();
  }

  // ------------------------------------------------------------ map editor (?edit)
  private editSel?: { def: MapObject; img: Phaser.GameObjects.Image };
  private editBox?: Phaser.GameObjects.Rectangle;
  private dragging = false;

  private setupEditor() {
    const grid = this.add.graphics().setDepth(100010);
    this.editBox = this.add.rectangle(0, 0, 10, 10).setStrokeStyle(2, 0xffe14d).setFillStyle(0xffe14d, 0.12).setDepth(100011).setVisible(false);
    const drawGrid = () => {
      grid.clear();
      if (!editor.grid) return;
      const cam = this.cameras.main.worldView;
      grid.lineStyle(1, 0xffffff, 0.22);
      for (let x = Math.floor(cam.x / TILE) * TILE; x < cam.right + TILE; x += TILE) grid.lineBetween(x, cam.y, x, cam.bottom);
      for (let y = Math.floor(cam.y / TILE) * TILE; y < cam.bottom + TILE; y += TILE) grid.lineBetween(cam.x, y, cam.right, y);
    };
    this.events.on('postupdate', drawGrid);
    this.unsub.push(editor.subscribe(drawGrid));
    const edits = () => {
      const all = loadLocalEdits();
      return { all, me: (all[this.map.id] ??= emptyEdits()) };
    };
    const pick = (wx: number, wy: number) => {
      for (let i = this.objects.length - 1; i >= 0; i--) {
        const o = this.objects[i];
        if (o.def.decor && o.img && o.img.visible && o.img.getBounds().contains(wx, wy)) return o as { def: MapObject; img: Phaser.GameObjects.Image };
      }
      return undefined;
    };
    const place = (o: { def: MapObject; img?: Phaser.GameObjects.Image }, tx: number, ty: number) => {
      o.def.x = tx;
      o.def.y = ty;
      const w = o.def.w ?? 1;
      const h = o.def.h ?? 1;
      if (o.img) {
        o.img.setPosition((tx + w / 2) * TILE, (ty + h) * TILE + (o.def.dy ?? 0));
        o.img.setDepth(o.img.y - 1);
      }
    };
    const select = (o: typeof this.editSel) => {
      this.editSel = o;
      if (o) {
        const b = o.img.getBounds();
        this.editBox!.setPosition(b.centerX, b.centerY).setSize(b.width, b.height).setVisible(true);
        editor.set({ info: `${o.def.sprite} · ${o.def.x},${o.def.y}` });
      } else this.editBox!.setVisible(false);
    };
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const tx = Math.floor(p.worldX / TILE);
      const ty = Math.floor(p.worldY / TILE);
      if (editor.brush) {
        const key = editor.brush;
        const pal = OBJECT_PALETTE.find((q) => q.name === key);
        const w = Math.max(1, Math.round((pal?.w ?? TILE) / TILE));
        const def: MapObject = { id: `${this.map.id}_u${Date.now().toString(36)}`, sprite: key, x: tx, y: ty, w, h: 1, solid: true, decor: true };
        const add = () => {
          const w2 = def.w ?? 1;
          const img = this.add.image((tx + w2 / 2) * TILE, (ty + 1) * TILE, key).setOrigin(0.5, 1);
          img.setDepth(img.y - 1);
          this.objects.push({ def, img });
          this.map.objects.push(def);
          const e = edits();
          e.me.added.push({ ...def });
          saveLocalEdits(e.all);
          select({ def, img });
        };
        if (this.textures.exists(key)) add();
        else this.load.once('complete', add).image(key, `assets/${key}.png`).start();
        return;
      }
      const hit = pick(p.worldX, p.worldY);
      if (editor.eraser) {
        if (!hit) return;
        const e = edits();
        const idx = e.me.added.findIndex((a) => a.id === hit.def.id);
        if (idx >= 0) e.me.added.splice(idx, 1);
        else e.me.removed.push(hit.def.id);
        saveLocalEdits(e.all);
        hit.img.destroy();
        this.objects = this.objects.filter((o) => o !== hit);
        this.map.objects = this.map.objects.filter((o) => o !== hit.def);
        select(undefined);
        return;
      }
      select(hit);
      this.dragging = !!hit;
    });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!this.dragging || !this.editSel || !p.isDown) return;
      place(this.editSel, Math.floor(p.worldX / TILE), Math.floor(p.worldY / TILE));
      select(this.editSel);
    });
    this.input.on('pointerup', () => {
      if (!this.dragging || !this.editSel) return;
      this.dragging = false;
      const e = edits();
      const a = e.me.added.find((q) => q.id === this.editSel!.def.id);
      if (a) {
        a.x = this.editSel.def.x;
        a.y = this.editSel.def.y;
      } else e.me.moved[this.editSel.def.id] = [this.editSel.def.x, this.editSel.def.y];
      saveLocalEdits(e.all);
    });
    this.input.keyboard?.on('keydown-DELETE', () => {
      if (!this.editSel) return;
      editor.set({ eraser: true });
      const o = this.editSel;
      const e = edits();
      const idx = e.me.added.findIndex((a) => a.id === o.def.id);
      if (idx >= 0) e.me.added.splice(idx, 1);
      else e.me.removed.push(o.def.id);
      saveLocalEdits(e.all);
      o.img.destroy();
      this.objects = this.objects.filter((x) => x.def !== o.def);
      this.map.objects = this.map.objects.filter((d) => d !== o.def);
      editor.set({ eraser: false });
      select(undefined);
    });
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
      this.spawnSteam();
      if (this.map.snow) this.spawnSnow();
      else this.spawnWeather();
    }
    const backdrop = [seasonalImage(this.map.image), this.map.image].find((k) => k && this.textures.exists(k));
    if (backdrop) {
      // pre-drawn room: the tile layer only provides collision
      this.layer.setVisible(false);
      this.add.image(0, 0, backdrop).setOrigin(0).setDepth(-9);
    }

    for (const def of this.map.objects) {
      const entry: { def: MapObject; img?: Phaser.GameObjects.Image; marker?: Phaser.GameObjects.Image } = { def };
      if (def.sprite && this.textures.exists(def.sprite)) {
        const w = def.w ?? 1;
        const h = def.h ?? 1;
        const cx = def.at ? def.at[0] : (def.x + w / 2) * TILE;
        const by = def.at ? def.at[1] : (def.y + h) * TILE + (def.dy ?? 0);
        const img = this.add.image(cx, by, def.sprite).setOrigin(0.5, 1);
        img.setDepth(by - 1);
        entry.img = img;
        if (def.hint && this.textures.exists('em_alert')) {
          entry.marker = this.add.image(cx, by - Math.min(img.height, 3 * TILE) - 2, 'em_alert').setOrigin(0.5, 1).setDepth(100001).setVisible(false);
          this.tweens.add({ targets: entry.marker, y: entry.marker.y - 4, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        }
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

  /**
   * Seasonal drift and rain over outdoor maps: petals in spring, leaves in autumn, snow in winter (by the real
   * calendar), fireflies on summer evenings, and rain on every fourth game day. Switch off in Settings.
   */
  spawnWeather() {
    if (store.s.settings.effects === false) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const month = new Date().getMonth() + 1;
    const cam = this.cameras.main;
    const rain = store.s.day % 4 === 0 && month !== 12 && month > 2;
    /** painted particle if the sprite sheet is loaded, otherwise a plain shape */
    const piece = (kind: string, x: number, y: number, color: number, w: number, round: boolean) => {
      const key = `fx_${kind}_${Phaser.Math.Between(0, 4)}`;
      if (this.textures.exists(key)) return this.add.image(x, y, key).setAlpha(0.95);
      return round ? this.add.circle(x, y, w, color, 0.85) : this.add.ellipse(x, y, w * 2, w * 1.3, color, 0.9);
    };
    const drift = (kind: string, colors: number[], size: [number, number], delay: number, fall: [number, number], sway: number, round = false) =>
      this.time.addEvent({
        delay,
        loop: true,
        callback: () => {
          const v = cam.worldView;
          const c = colors[Phaser.Math.Between(0, colors.length - 1)];
          const w = Phaser.Math.FloatBetween(size[0], size[1]);
          const p = piece(kind, v.x + Phaser.Math.Between(-40, v.width + 40), v.y - 8, c, w, round);
          p.setDepth(100002);
          this.tweens.add({ targets: p, y: p.y + v.height + 20, x: p.x + Phaser.Math.Between(-sway, sway), angle: Phaser.Math.Between(-240, 240), duration: Phaser.Math.Between(fall[0], fall[1]), ease: 'Sine.easeInOut', onComplete: () => p.destroy() });
        },
      });
    if (rain) {
      this.time.addEvent({
        delay: 30,
        loop: true,
        callback: () => {
          const v = cam.worldView;
          for (let i = 0; i < 2; i++) {
            const rk = `fx_rain_${Phaser.Math.Between(0, 4)}`;
            const rx = v.x + Phaser.Math.Between(-30, v.width + 60);
            const d = (this.textures.exists(rk) ? this.add.image(rx, v.y - 12, rk).setAlpha(0.8) : this.add.rectangle(rx, v.y - 12, 1, Phaser.Math.Between(9, 15), 0xcfe6ff, 0.7).setAngle(12)).setDepth(100002);
            this.tweens.add({ targets: d, y: d.y + v.height + 30, x: d.x - 24, duration: Phaser.Math.Between(520, 760), ease: 'Linear', onComplete: () => d.destroy() });
          }
        },
      });
      return;
    }
    if (month >= 3 && month <= 5) drift('petal', [0xffd1dc, 0xffc0cb, 0xffe3ea], [2, 3.4], 220, [5500, 9000], 90);
    else if (month >= 10 && month <= 11) drift('leaf', [0xe8742c, 0xc9452a, 0xf2b13c], [2.4, 3.8], 240, [5000, 8500], 70);
    else if (month === 12 || month <= 2) drift('snow', [0xffffff], [1, 2.2], 110, [5000, 9000], 50, true);
    else if (store.s.timeOfDay === 'evening') {
      this.time.addEvent({
        delay: 700,
        loop: true,
        callback: () => {
          const v = cam.worldView;
          const gk = `fx_glow_${Phaser.Math.Between(0, 4)}`;
          const gx = v.x + Phaser.Math.Between(20, v.width - 20);
          const gy = v.y + Phaser.Math.Between(v.height / 3, v.height - 20);
          const f = (this.textures.exists(gk) ? this.add.image(gx, gy, gk).setScale(0.7) : this.add.circle(gx, gy, 1.8, 0xf8ee7a, 0)).setDepth(100002);
          this.tweens.add({ targets: f, alpha: { from: 0, to: 0.95 }, y: f.y - Phaser.Math.Between(20, 50), x: f.x + Phaser.Math.Between(-25, 25), yoyo: true, duration: Phaser.Math.Between(1400, 2400), onComplete: () => f.destroy() });
        },
      });
    }
  }

  /** gentle snowfall drifting across the camera view (map.snow) */
  spawnSnow() {
    const cam = this.cameras.main;
    this.time.addEvent({
      delay: 90,
      loop: true,
      callback: () => {
        const v = cam.worldView;
        const flake = this.add
          .circle(v.x + Phaser.Math.Between(-40, v.width + 40), v.y - 8, Phaser.Math.FloatBetween(1, 2.4), 0xffffff, Phaser.Math.FloatBetween(0.55, 0.95))
          .setDepth(100002);
        this.tweens.add({
          targets: flake,
          y: flake.y + v.height + 20,
          x: flake.x + Phaser.Math.Between(-60, 30),
          duration: Phaser.Math.Between(5000, 9000),
          ease: 'Linear',
          onComplete: () => flake.destroy(),
        });
      },
    });
  }

  /** soft steam puffs rising from hot springs (map.steam) */
  spawnSteam() {
    if (!this.map.steam?.length) return;
    if (!this.textures.exists('fx_steam')) {
      const g = this.make.graphics({ x: 0, y: 0 }, false);
      for (let r = 16; r > 0; r--) {
        g.fillStyle(0xffffff, 0.09);
        g.fillCircle(16, 16, r);
      }
      g.generateTexture('fx_steam', 32, 32);
      g.destroy();
    }
    for (const src of this.map.steam) {
      this.time.addEvent({
        delay: 200,
        loop: true,
        callback: () => {
          const p = this.add
            .image(src.x + Phaser.Math.Between(-src.w / 2, src.w / 2), src.y + Phaser.Math.Between(-6, 6), 'fx_steam')
            .setDepth(src.depth ?? 100000)
            .setAlpha(0)
            .setScale(Phaser.Math.FloatBetween(0.8, 1.4));
          this.tweens.add({
            targets: p,
            y: p.y - Phaser.Math.Between(60, 110),
            x: p.x + Phaser.Math.Between(-14, 14),
            scale: p.scale * 2.2,
            alpha: { from: 0.95, to: 0 },
            duration: Phaser.Math.Between(2200, 3200),
            ease: 'Sine.easeOut',
            onComplete: () => p.destroy(),
          });
        },
      });
    }
  }

  /** the bus comes down the road from the north, brakes and settles at the stop */
  busArrive() {
    const stop = this.map.busStop;
    if (!stop || !this.textures.exists('bus_front')) return;
    const x = stop.x * TILE;
    const y = (stop.y + 1) * TILE;
    const shadow = this.add.ellipse(x, y - 2, 64, 14, 0x000000, 0.28).setDepth(y - 1).setAlpha(0);
    const b = this.add.image(x, y - 12 * TILE, 'bus_front').setOrigin(0.5, 1).setDepth(y).setAlpha(0);
    this.tweens.add({ targets: [b, shadow], alpha: { from: 0, to: 1 }, duration: 500 });
    this.tweens.add({ targets: shadow, y: y - 2 });
    // engine noise: rolling in, then easing off with a little nose-dive as the brakes bite
    this.tweens.add({ targets: b, y, duration: 1900, ease: 'Cubic.easeOut' });
    this.tweens.add({ targets: b, scaleY: 0.97, delay: 1500, duration: 140, yoyo: true });
    this.puffs(x - 22, y - 4, 1500, 4);
  }

  /** arriving by bus: the ride scene covers the screen first, then the bus waits a moment and pulls away */
  busLeave() {
    const stop = this.map.busStop;
    if (!stop || !this.textures.exists('bus_front')) return;
    const x = stop.x * TILE;
    const y = (stop.y + 1) * TILE;
    const wait = RIDE_MS + 500;
    const b = this.add.image(x, y, 'bus_front').setOrigin(0.5, 1).setDepth(y);
    this.puffs(x - 22, y - 4, wait + 700, 5);
    this.tweens.add({ targets: b, y: y + 12 * TILE, alpha: 0, delay: wait + 900, duration: 2600, ease: 'Cubic.easeIn', onComplete: () => b.destroy() });
  }

  /** a few grey exhaust puffs drifting up from a point */
  puffs(x: number, y: number, delay: number, n: number) {
    for (let i = 0; i < n; i++) {
      const p = this.add.circle(x + Phaser.Math.Between(-3, 3), y, Phaser.Math.Between(4, 7), 0xc8c8c8, 0.55).setDepth(100000).setAlpha(0);
      this.tweens.add({ targets: p, alpha: { from: 0.55, to: 0 }, x: p.x - Phaser.Math.Between(6, 18), y: y - Phaser.Math.Between(18, 34), scale: 2.2, delay: delay + i * 260, duration: 1300, onStart: () => p.setAlpha(0.55), onComplete: () => p.destroy() });
    }
  }

  /** a few butterflies drifting over outdoor maps (not in the snow) */
  spawnButterflies() {
    if (this.map.interior || this.map.snow || !this.textures.exists('g_butterfly_0')) return;
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
    for (const o of this.objects) {
      o.img?.setVisible(check(s, o.def.when));
      if (o.marker) {
        const rules = SCRIPTS[o.def.script ?? o.def.id];
        const steps = rules ? pickRule(s, rules) : null;
        o.marker.setVisible(o.def.hint === 'always' || (!!steps && advancesQuest(steps)));
      }
    }
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
      if (forInteract && def.decor) continue;
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
    else this.streak = 0;
  }

  /** steps taken in a row in the same direction (resets when the key is released or the way is blocked) */
  streak = 0;

  tryMove(dir: Dir) {
    const changed = dir !== this.facing;
    if (changed) this.streak = 0;
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
      this.streak = 0;
      if (changed) store.update((s) => (s.facing = dir), 'facing');
      return;
    }
    this.moving = true;
    this.streak++;
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
      duration: this.streak > RUN_AFTER ? RUN_MS : STEP_MS,
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
    if (s.stats.steps >= 10000 && !s.flags.secret_manpo && !this.manpoShown) {
      this.manpoShown = true;
      bus.emit('interact', { id: 'egg_manpo', kind: 'object' });
    }
    if (this.tileAt(this.px, this.py) === '"' && this.map.encounters && s.team.length > 0) {
      if (s.stats.steps - this.lastStepEncounter > 3 && Math.random() < 0.12) {
        this.lastStepEncounter = s.stats.steps;
        const zone = this.map.zones?.find((z) => this.px >= z.x0 && this.px <= z.x1 && this.py >= z.y0 && this.py <= z.y1);
        const table = ENCOUNTERS[zone?.encounters ?? this.map.encounters];
        const total = table.reduce((a, b) => a + b.weight, 0);
        let roll = Math.random() * total;
        const pick = table.find((e) => (roll -= e.weight) < 0) ?? table[0];
        const level = pick.min + Math.floor(Math.random() * (pick.max - pick.min + 1));
        this.cameras.main.flash(250, 255, 255, 255);
        bus.emit('encounter', { species: pick.species, level, bg: zone?.bg ?? this.map.bg });
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
      // some townsfolk have a script of their own (easter eggs), the rest say a random line
      if (SCRIPTS['folk_' + folk.def.id]) {
        bus.emit('interact', { id: 'folk_' + folk.def.id, kind: 'npc' });
        return;
      }
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
    if (obj && !obj.decor) bus.emit('interact', { id: obj.script ?? obj.id, kind: 'object' });
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
