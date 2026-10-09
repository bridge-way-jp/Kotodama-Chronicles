import Phaser from 'phaser';
import { MAPS, BLOCKING, type MapDef, type MapObject } from '../content/maps';
import { NPCS } from '../content/npcs';
import { ENCOUNTERS } from '../content/creatures';
import { check } from '../core/script';
import { store } from '../core/store';
import { bus } from '../core/events';
import type { Dir } from '../core/types';
import { ANIMATED, TILE, buildProps, buildTileset } from './textures';
import { input } from './input';

export const ASSET_KEYS = [
  'hero_down', 'hero_side', 'hero_side_flip', 'hero_up', 'boy_down', 'boy_side', 'boy_side_flip', 'boy_up',
  'kimono_m', 'kimono_f',
  'k_fox_blue', 'k_fox_pink', 'k_sprout', 'k_bird_blue', 'k_fox_orange', 'k_puff', 'k_fox_black', 'k_fox_winged',
  'k_sprout2', 'k_blob_pink', 'k_bird_white', 'k_cat_black',
  'b_inn', 'b_house_blue', 'b_house_trad', 'b_konbini', 'b_shop_red', 'b_bridge',
  'p_sakura', 'p_shrine', 'p_pond', 'p_garden', 'p_lamp', 'p_signpost', 'p_board', 'p_board2', 'p_mailbox',
  'p_sign_nihon', 'p_banner', 'p_sign_small',
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
  objects: { def: MapObject; img?: Phaser.GameObjects.Image }[] = [];
  tileIndex: Record<string, number> = {};
  tilesetCols = 0;
  animFrame = 0;
  tint?: Phaser.GameObjects.Rectangle;
  unsub: (() => void)[] = [];
  lastStepEncounter = 0;

  constructor() {
    super('world');
  }

  preload() {
    for (const k of ASSET_KEYS) this.load.image(k, `assets/${k}.png`);
  }

  create() {
    this.moving = false;
    this.npcs = [];
    this.objects = [];
    this.tint = undefined;
    if (!this.textures.exists('tiles')) {
      const { canvas, index } = buildTileset();
      this.textures.addCanvas('tiles', canvas);
      this.tileIndex = index;
      this.registry.set('tileIndex', index);
      for (const [k, c] of Object.entries(buildProps())) this.textures.addCanvas(k, c);
    } else {
      this.tileIndex = this.registry.get('tileIndex');
    }
    this.tilesetCols = Object.keys(this.tileIndex).length;

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
    const data = rows.map((r) => [...r].map((ch) => this.tileIndex[ch] ?? this.tileIndex['.']));
    const tm = this.make.tilemap({ data, tileWidth: TILE, tileHeight: TILE });
    const ts = tm.addTilesetImage('tiles', 'tiles', TILE, TILE, 0, 0)!;
    this.layer = tm.createLayer(0, ts, 0, 0)!;
    this.layer.setDepth(-10);

    for (const def of this.map.objects) {
      const entry: { def: MapObject; img?: Phaser.GameObjects.Image } = { def };
      if (def.sprite && this.textures.exists(def.sprite)) {
        const w = def.w ?? 1;
        const h = def.h ?? 1;
        const cx = (def.x + w / 2) * TILE;
        const by = (def.y + h) * TILE + (def.dy ?? 0);
        const img = this.add.image(cx, by, def.sprite).setOrigin(0.5, 1);
        img.setDepth(by - 1);
        entry.img = img;
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
      this.npcs.push({ id: n.id, sprite: img, x: n.x, y: n.y, base, when: n.when });
    }

    if (store.s.timeOfDay === 'evening' && !this.map.interior) {
      this.tint = this.add
        .rectangle(0, 0, rows[0].length * TILE, rows.length * TILE, 0x30205a, 0.28)
        .setOrigin(0)
        .setDepth(100000);
    }
  }

  textureFor(base: string, dir: Dir): string {
    const variant = dir === 'left' ? `${base}_side_flip` : dir === 'right' ? `${base}_side` : `${base}_${dir}`;
    if (this.textures.exists(variant)) return variant;
    if (this.textures.exists(`${base}_down`)) return `${base}_down`;
    return base;
  }

  buildPlayer() {
    this.shadow = this.add.image(0, 0, 'gen_shadow').setOrigin(0.5, 1);
    this.player = this.add.image(0, 0, this.textureFor('hero', this.facing)).setOrigin(0.5, 1);
    this.placePlayer();
  }

  placePlayer() {
    const x = this.px * TILE + TILE / 2;
    const y = this.py * TILE + TILE - 2;
    this.player.setPosition(x, y);
    this.shadow.setPosition(x, y + 4);
    this.player.setDepth(y);
    this.shadow.setDepth(y - 2);
  }

  refreshVisibility() {
    if (!store.state || !this.sys.isActive()) return;
    const s = store.s;
    for (const n of this.npcs) n.sprite.setVisible(check(s, n.when));
    for (const o of this.objects) o.img?.setVisible(check(s, o.def.when));
    if (this.tint) this.tint.setVisible(s.timeOfDay === 'evening');
    else if (s.timeOfDay === 'evening' && !this.map.interior) {
      const rows = this.map.tiles;
      this.tint = this.add.rectangle(0, 0, rows[0].length * TILE, rows.length * TILE, 0x30205a, 0.28).setOrigin(0).setDepth(100000);
    }
  }

  animateTiles() {
    this.animFrame = 1 - this.animFrame;
    for (const ch of ANIMATED) {
      const a = this.tileIndex[ch];
      const b = a + this.tilesetCols; // second row of the tileset
      if (this.animFrame) this.layer.replaceByIndex(a, b);
      else this.layer.replaceByIndex(b, a);
    }
  }

  // ------------------------------------------------------------ collision
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
    const o = this.objectAt(x, y);
    if (o && o.solid !== false) return true;
    return false;
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
        const bob = Math.sin(t * Math.PI) * 2;
        this.player.setPosition(x, y - bob);
        this.player.setScale(1, 1 - Math.sin(t * Math.PI) * 0.04);
        this.shadow.setPosition(x, y + 4);
        this.player.setDepth(y);
      },
      onComplete: () => {
        this.player.setScale(1);
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
    // talk across counters
    if (this.tileAt(tx, ty) === 'c') {
      tx += dx;
      ty += dy;
    }
    const npc = this.npcAt(tx, ty);
    if (npc) {
      const back: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      npc.sprite.setTexture(this.textureFor(npc.base, back[this.facing]));
      bus.emit('interact', { id: npc.id, kind: 'npc' });
      return;
    }
    const obj = this.objectAt(tx, ty, true) ?? this.objectAt(tx, ty);
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
