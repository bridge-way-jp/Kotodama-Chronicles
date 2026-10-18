import type { Cond } from '../core/script';
import { ROOMS_GEN } from './rooms.gen';
import { FOREST_GEN } from './forest.gen';
import { VALLEY_GEN } from './valley.gen';
import { MOUNTAIN_GEN } from './mountain.gen';
import { HARBOR_GEN } from './harbor.gen';
import { KYOTO_GEN } from './kyoto.gen';
import { OSAKA_GEN } from './osaka.gen';
import { TOKYO_GEN } from './tokyo.gen';
import { PLAIN_GEN } from './plain.gen';
import { ROOMS2_GEN } from './rooms2.gen';
import { HOUSE_SWAPS } from './houses.gen';
import { EDITS_BASE, applyEdits, loadLocalEdits } from './edits';
import type { Dir } from '../core/types';

/**
 * Tile legend (32×32 world px per tile, textures generated in game/textures.ts)
 *   .  grass        ,  flowers      "  tall grass (encounters on maps with an encounter table)
 *   :  dirt path    =  paved street  ~  water          b  wooden bridge
 *   T  tree         #  fence         r  rail track     p  station platform  P  platform edge
 *   X  facility wall  x  concrete    S  shrine stone
 *   W  interior wall  f  wooden floor  m  tatami / rug  c  counter  D  doormat
 *   K  cliff (blocking, autotiled ends)  H  stone stairs up a cliff
 */
export const BLOCKING = new Set(['T', '~', '#', 'r', 'X', 'W', 'c', 'S', 'K', 'Z', 'Y', 'J']);

export interface MapObject {
  id: string;
  sprite?: string; // asset key (images from public/assets or generated textures)
  x: number; // footprint top-left tile
  y: number;
  w?: number; // footprint size in tiles (blocking)
  h?: number;
  solid?: boolean;
  /** interaction script id (defaults to id) */
  script?: string;
  /** tiles that trigger this object's script when faced (defaults to footprint) */
  interactAt?: { x: number; y: number }[];
  when?: Cond;
  /** text painted onto the sprite, position relative to the image (0..1) */
  label?: { text: string; x: number; y: number };
  /** pure decoration (planting, street furniture): blocks like a solid object but cannot be interacted with */
  decor?: boolean;
  /** show the quest alert mark above this object while its script would advance a quest */
  hint?: boolean | 'always';
  /** extra vertical offset for the image in px */
  dy?: number;
  /** draw at an absolute world position (bottom-centre, px) instead of the footprint */
  at?: [number, number];
}

export interface NpcPlacement {
  id: string;
  x: number;
  y: number;
  facing?: Dir;
  when?: Cond;
}

export interface Warp {
  x: number;
  y: number;
  to: { map: string; x: number; y: number; facing: Dir };
  when?: Cond;
  locked?: string; // message when the condition fails
}

export interface MapDef {
  id: string;
  name: string;
  nameJa: string;
  tiles: string[];
  objects: MapObject[];
  npcs: NpcPlacement[];
  warps: Warp[];
  encounters?: string; // key into ENCOUNTERS
  interior?: boolean;
  /** pre-drawn room image (public/assets/<image>.png) drawn instead of tiles; tiles then only define collision */
  image?: string;
  bg?: string; // battle background
  /** areas with their own encounter table / battle background (inclusive tile rectangles) */
  zones?: { x0: number; y0: number; x1: number; y1: number; encounters?: string; bg?: string }[];
  /** world positions (px) where steam rises, with the depth to draw it at */
  steam?: { x: number; y: number; w: number; depth?: number }[];
  /** where the bus stops: x is the tile line under its middle, y the tile row of its front bumper; it comes down the road from the north */
  busStop?: { x: number; y: number };
  /** gentle snowfall over the map */
  snow?: boolean;
  /** wandering townsfolk: FOLK id, home tile, wander radius in tiles */
  wanderers?: { id: string; x: number; y: number; r: number }[];
}

const TOWN = [
  'TTTTTTTTTTTTTTTTTTTT::TTTTTTTTTTT~~TTTTTTTTT',
  'TTT.................::........TTT~~T......TT',
  'TT..................::.........TT~~........T',
  'T.JJJJJJ............::..,........~~........T',
  'T...............TTTT::.,.........~~........T',
  'TTT............,TTTT::......,....~~........T',
  'TTT...........,.....::...........~~........T',
  'T..,................::...........~~........T',
  'T...,...............::...........~~........T',
  'T......,............::...........~~........T',
  'T================================~~xxxxxxxxT',
  'T================================bbxxxxxxxxT',
  'T================================bbxxxxxxxxT',
  'T...................::...........~~xxxxxxxxT',
  'T...................::...........~~.......TT',
  'TTT.................::..~~~~.....~~......TTT',
  'TTT.................::..~~~~.....~~..,....TT',
  'T...................::..~~~~,....~~.....,..T',
  'T.......,....,......::.......,...~~....,...T',
  'T....,...,..........::....,......~~........T',
  'T...ppppppppppppppppppppppppppp..~~........T',
  'T...ppppppppppppppppppppppppppp..~~........T',
  'T...PPPPPPPPPPPPPPPPPPPPPPPPPPP..~~........T',
  'Trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr~~rrrrrrrrT',
  'Trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr~~rrrrrrrrT',
  'TT##############################T~~........T',
  'TTT............................TT~~.......TT',
  'TTTT..........................TTT~~TT.....TT',
  'T................................~~........T',
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~TTTTTTTTT',
];







export const MAPS: Record<string, MapDef> = {
  town: {
    id: 'town', name: 'Hinomori Town', nameJa: '日野森町', tiles: TOWN, image: 'map_town',
    busStop: { x: 21, y: 20 },
    wanderers: [
      { id: 'schoolgirl', x: 12, y: 11, r: 6 },
      { id: 'salaryman', x: 26, y: 12, r: 6 },
      { id: 'delivery', x: 30, y: 11, r: 5 },
      { id: 'cat', x: 14, y: 14, r: 4 },
      { id: 'dog', x: 38, y: 16, r: 3 },
      { id: 'miko', x: 8, y: 6, r: 2 },
      { id: 'gardener', x: 11, y: 17, r: 2 },
      { id: 'kid', x: 16, y: 12, r: 5 },
      { id: 'student', x: 8, y: 11, r: 4 },
      { id: 'sparrow', x: 38, y: 18, r: 3 },
    ], bg: 'bg_town_sunset.webp',
    objects: [
      { id: 'shrine', sprite: 'bx_shrine', x: 3, y: 4, w: 4, h: 2, interactAt: [{ x: 4, y: 5 }, { x: 5, y: 5 }] },
      { id: 'sakura1', sprite: 'p_sakura', x: 8, y: 5, w: 2, h: 1, script: 'sakura' },
      { id: 'sakura2', sprite: 'p_sakura', x: 29, y: 15, w: 2, h: 1, script: 'sakura' },
      { id: 'library', sprite: 'bx_library', x: 11, y: 8, w: 3, h: 2 },
      { id: 'konbini', sprite: 'bx_konbini', x: 15, y: 8, w: 4, h: 2 },
      { id: 'konbini_notice', sprite: 'p_board', x: 19, y: 9, w: 1, h: 1 },
      { id: 'cafe', sprite: 'bx_cafe', x: 23, y: 7, w: 6, h: 3 },
      { id: 'apartment', sprite: 'bx_apartment', x: 3, y: 15, w: 3, h: 2 },
      { id: 'mailbox', sprite: 'p_mailbox', x: 7, y: 16, w: 1, h: 1 },
      { id: 'garden', sprite: 'p_garden', x: 10, y: 15, w: 3, h: 2 },
      { id: 'ramen', sprite: 'bx_ramen', x: 15, y: 15, w: 3, h: 2 },
      { id: 'pond', x: 24, y: 15, w: 4, h: 3 },
      { id: 'signpost', sprite: 'p_signpost', x: 22, y: 13, w: 1, h: 1 },
      { id: 'lamp1', sprite: 'p_lamp', x: 9, y: 13, w: 1, h: 1, script: 'lamp' },
      { id: 'lamp2', sprite: 'p_lamp', x: 28, y: 13, w: 1, h: 1, script: 'lamp' },
      { id: 'lamp3', sprite: 'p_lamp', x: 24, y: 19, w: 1, h: 1, script: 'lamp' },
      { id: 'station_banner', sprite: 'p_banner', x: 8, y: 20, w: 1, h: 1 },
      { id: 'old_board', sprite: 'p_board2', x: 13, y: 20, w: 2, h: 1 },
      { id: 'forest_sign', sprite: 'p_sign_small', x: 22, y: 2, w: 1, h: 1 },
      { id: 'lab', sprite: 'bx_lab', x: 36, y: 5, w: 7, h: 5, script: 'lab_door' },
      { id: 'lab_sign', sprite: 'p_board', x: 36, y: 10, w: 1, h: 1 },
      // street furniture
      { id: 'vending', sprite: 'tp_vending', x: 14, y: 9, w: 1, h: 1 },
      { id: 'postbox', sprite: 'tp_postbox', x: 22, y: 19, w: 1, h: 1 },
      { id: 'bench_station', sprite: 'tp_bench', x: 5, y: 21, w: 2, h: 1, script: 'bench' },
      { id: 'bench_pond', sprite: 'tp_bench', x: 31, y: 17, w: 2, h: 1, script: 'bench' },
      { id: 'bicycle', sprite: 'tp_bicycle', x: 6, y: 15, w: 2, h: 1 },
      { id: 'pole1', sprite: 'tp_pole', x: 2, y: 9, w: 1, h: 1, script: 'pole' },
      { id: 'pole2', sprite: 'tp_pole', x: 31, y: 9, w: 1, h: 1, script: 'pole' },
      { id: 'pole3', sprite: 'tp_pole', x: 14, y: 13, w: 1, h: 1, script: 'pole' },
      { id: 'lantern1', sprite: 'tp_lantern', x: 2, y: 5, w: 1, h: 1, script: 'stone_lantern' },
      { id: 'lantern2', sprite: 'tp_lantern', x: 7, y: 5, w: 1, h: 1, script: 'stone_lantern' },
      { id: 'torii', sprite: 'tp_torii', x: 3, y: 7, w: 3, h: 1, solid: false },
      { id: 'torii_l', x: 3, y: 7, w: 1, h: 1, script: 'torii' },
      { id: 'torii_r', x: 5, y: 7, w: 1, h: 1, script: 'torii' },
      { id: 'town_hokora', sprite: 'tp_hokora', x: 41, y: 20, w: 1, h: 1 },
      { id: 'garbage', sprite: 'tp_garbage', x: 1, y: 15, w: 2, h: 1 },
      { id: 'pot1', sprite: 'tp_pot_tree', x: 22, y: 9, w: 1, h: 1, script: 'plant' },
      { id: 'pot2', sprite: 'tp_pot_flower', x: 29, y: 9, w: 1, h: 1, script: 'plant' },
      { id: 'planter1', sprite: 'tp_planter_y', x: 12, y: 13, w: 1, h: 1, script: 'planter' },
      { id: 'planter2', sprite: 'tp_planter_p', x: 18, y: 13, w: 1, h: 1, script: 'planter' },
      { id: 'mirror', sprite: 'tp_mirror', x: 19, y: 13, w: 1, h: 1 },
      { id: 'nosign', sprite: 'tp_sign', x: 35, y: 14, w: 1, h: 1 },
      { id: 'trash', sprite: 'tp_trash', x: 14, y: 21, w: 1, h: 1 },
      { id: 'barrel', sprite: 'tp_barrel', x: 18, y: 16, w: 1, h: 1 },
      { id: 'station_building', sprite: 'bx_station', x: 25, y: 18, w: 5, h: 2, hint: true },
      // buses to the valley stop by the road in front of the station
      { id: 'town_busstop', sprite: 'bx_busstop', x: 17, y: 19, w: 3, h: 1, interactAt: [{ x: 17, y: 20 }, { x: 18, y: 20 }, { x: 19, y: 20 }, { x: 20, y: 19 }, { x: 16, y: 19 }] },
    ],
    npcs: [
      { id: 'mori', x: 6, y: 17, facing: 'down' },
      { id: 'station_staff', x: 18, y: 21, facing: 'down' },
    ],
    warps: [
      { x: 4, y: 16, to: { map: 'apartment', x: 5, y: 10, facing: 'up' } },
      { x: 26, y: 9, to: { map: 'cafe', x: 6, y: 10, facing: 'up' } },
      { x: 17, y: 9, to: { map: 'konbini', x: 7, y: 10, facing: 'up' } },
      { x: 12, y: 9, to: { map: 'library', x: 6, y: 10, facing: 'up' } },
      {
        x: 39, y: 9, to: { map: 'lab', x: 6, y: 9, facing: 'up' },
        when: { questDone: 'mq4' },
        locked: 'ドアには鍵がかかっている。中は暗くて、何も見えない。',
      },
      {
        x: 16, y: 16, to: { map: 'ramen', x: 5, y: 8, facing: 'up' },
        when: { questDone: 'mq2' },
        locked: 'ラーメン屋「まんぷく」の張り紙：「本日は臨時休業いたします。ご迷惑をおかけして申し訳ございません。」',
      },
      { x: 27, y: 19, to: { map: 'station', x: 10, y: 13, facing: 'up' } },
      {
        x: 20, y: 0, to: { map: 'forest', x: 14, y: 23, facing: 'up' },
        when: { flag: 'forest_open' },
        locked: 'この先は、みどりの森だ。…言霊の仲間もなしに一人で入るのは、危なそうだ。',
      },
      {
        x: 21, y: 0, to: { map: 'forest', x: 15, y: 23, facing: 'up' },
        when: { flag: 'forest_open' },
        locked: 'この先は、みどりの森だ。…言霊の仲間もなしに一人で入るのは、危なそうだ。',
      },
    ],
  },
  forest: {
    id: 'forest', name: 'Midori Forest', nameJa: 'みどりの森', tiles: FOREST_GEN, image: 'map_forest', encounters: 'forest', bg: 'bg_forest_clearing.webp',
    objects: [
      { id: 'forest_stone', sprite: 'p_hokora', x: 13, y: 2, w: 4, h: 2, interactAt: [{ x: 14, y: 4 }, { x: 15, y: 4 }] },
      { id: 'forest_sign2', sprite: 'p_signpost', x: 16, y: 22, w: 1, h: 1 },
    ],
    npcs: [],
    warps: [
      { x: 14, y: 25, to: { map: 'town', x: 20, y: 1, facing: 'down' } },
      { x: 15, y: 25, to: { map: 'town', x: 21, y: 1, facing: 'down' } },
    ],
  },
  valley: {
    id: 'valley', name: 'Hinomori Valley', nameJa: '日野森の谷', tiles: VALLEY_GEN, image: 'map_valley', encounters: 'valley', bg: 'bg_valley_orchard.webp',
    busStop: { x: 21, y: 20 },
    // footprints match tools/build_valley.py BUILDINGS
    objects: [
      { id: 'valley_farmhouse', sprite: 'bx_farmhouse', x: 4, y: 3, w: 5, h: 2 },
      { id: 'valley_winery', sprite: 'bx_winery', x: 22, y: 11, w: 4, h: 2 },
      { id: 'valley_stand', sprite: 'bx_stand', x: 16, y: 19, w: 3, h: 1 },
      { id: 'valley_workshop', sprite: 'bx_workshop', x: 14, y: 17, w: 3, h: 1 },
      { id: 'valley_busstop', sprite: 'bx_busstop', x: 23, y: 20, w: 3, h: 1, interactAt: [{ x: 22, y: 20 }, { x: 23, y: 21 }, { x: 25, y: 21 }] },
      { id: 'valley_ryokan', sprite: 'bx_ryokan', x: 29, y: 12, w: 7, h: 2 },
      // the word garden next to the farmhouse (Mr. Hayashi lends Maria a bed after the harvest)
      ...(['peach_3', 'grape_3', 'sunflower_3', 'rice_2', 'asagao_3', 'sakura_2'] as const).map((p, i) => ({
        id: `valley_garden_${i}`, sprite: `wgs_${p}`, x: 10 + (i % 2), y: 3 + Math.floor(i / 2), w: 1, h: 1, script: 'valley_garden',
      })),
      { id: 'valley_garden_tag', sprite: 'wgs_tag', x: 9, y: 5, w: 1, h: 1, script: 'valley_garden' },
      // the footbath on the onsen square: talk to it from the square, facing north
      { id: 'valley_ashiyu', x: 36, y: 9, w: 5, h: 1, solid: false, interactAt: [36, 37, 38, 39].map((x) => ({ x, y: 10 })) },
    ],
    npcs: [
      { id: 'hayashi', x: 7, y: 5, facing: 'down' },
      { id: 'sakura_hayashi', x: 24, y: 3, facing: 'right' },
      { id: 'kenji', x: 23, y: 15, facing: 'down' },
      { id: 'busdriver', x: 24, y: 21, facing: 'up' },
    ],
    warps: [
      ...[20, 21].map((x) => ({ x, y: 27, to: { map: 'town', x: 18, y: 20, facing: 'down' as const } })),
      { x: 32, y: 13, to: { map: 'ryokan', x: 6, y: 9, facing: 'up' as const } },
      { x: 33, y: 13, to: { map: 'ryokan', x: 7, y: 9, facing: 'up' as const } },
      { x: 15, y: 17, to: { map: 'werkstatt', x: 5, y: 8, facing: 'up' as const } },
    ],
    zones: [
      { x0: 25, y0: 0, x1: 33, y1: 4, encounters: 'valley_grove', bg: 'bg_valley_orchard.webp' },
      { x0: 3, y0: 16, x1: 7, y1: 17, encounters: 'valley_river', bg: 'bg_valley_river.webp' },
    ],
    steam: [
      { x: 1230, y: 250, w: 40 }, // hot-spring pool
      { x: 1275, y: 245, w: 36 },
      { x: 1250, y: 330, w: 50 }, // footbath edge
    ],
  },
  mountain: {
    id: 'mountain', name: 'Yukimi Village', nameJa: '雪見村', tiles: MOUNTAIN_GEN, image: 'map_mountain', encounters: 'mountain', snow: true, bg: 'bg_mountain_village.webp',
    // footprints match tools/build_mountain.py BUILDINGS
    objects: [
      { id: 'yukimi_guesthouse', sprite: 'bx_guesthouse', x: 32, y: 15, w: 6, h: 2 },
      { id: 'yukimi_gassho', sprite: 'bx_gassho', x: 24, y: 14, w: 5, h: 2 },
      { id: 'yukimi_clinic', sprite: 'bx_clinic', x: 25, y: 20, w: 5, h: 2 },
      { id: 'yukimi_temple', sprite: 'bx_temple', x: 18, y: 2, w: 6, h: 2, interactAt: [{ x: 20, y: 4 }, { x: 21, y: 4 }] },
      { id: 'yukimi_station', sprite: 'bx_yukimi_station', x: 1, y: 19, w: 4, h: 2, interactAt: [{ x: 5, y: 19 }, { x: 6, y: 20 }, { x: 3, y: 18 }, { x: 4, y: 18 }] },
      { id: 'yukimi_kamakura', sprite: 'bx_kamakura', x: 17, y: 15, w: 3, h: 1 },
      // the festival field (snow lanterns are lit in the story)
      { id: 'yukimi_festival', x: 13, y: 21, w: 6, h: 3, solid: false },
    ],
    npcs: [
      { id: 'hina', x: 19, y: 16, facing: 'down' },
      { id: 'kuroda', x: 22, y: 24, facing: 'up' },
      { id: 'jokan', x: 21, y: 4, facing: 'down' },
    ],
    warps: [
      { x: 34, y: 16, to: { map: 'tsuru', x: 6, y: 9, facing: 'up' } },
      { x: 35, y: 16, to: { map: 'tsuru', x: 7, y: 9, facing: 'up' } },
      { x: 27, y: 21, to: { map: 'klinik', x: 5, y: 8, facing: 'up' } },
      { x: 28, y: 21, to: { map: 'klinik', x: 6, y: 8, facing: 'up' } },
    ],
    zones: [
      { x0: 2, y0: 11, x1: 7, y1: 13, encounters: 'mountain_snow', bg: 'bg_mountain_trail.webp' },
      { x0: 37, y0: 10, x1: 40, y1: 13, encounters: 'mountain_lantern', bg: 'bg_mountain_trail.webp' },
    ],
  },
  harbor: {
    id: 'harbor', name: 'Shiomi', nameJa: '潮見町', tiles: HARBOR_GEN, image: 'map_harbor', encounters: 'harbor', bg: 'bg_harbor_quay.webp',
    // footprints match tools/build_harbor.py BUILDINGS
    objects: [
      { id: 'shiomi_station', sprite: 'bx_shiomi_station', x: 5, y: 1, w: 5, h: 2, interactAt: [{ x: 10, y: 2 }, { x: 10, y: 1 }] },
      { id: 'harbor_diner', sprite: 'bx_diner', x: 14, y: 11, w: 6, h: 2 },
      { id: 'harbor_inn', sprite: 'bx_seaside_inn', x: 24, y: 11, w: 7, h: 2, interactAt: [{ x: 24, y: 13 }, { x: 29, y: 13 }, { x: 30, y: 13 }] },
      { id: 'harbor_office', sprite: 'bx_harbor_office', x: 25, y: 13, w: 4, h: 2 },
      { id: 'harbor_genhouse', sprite: 'bx_townhouse', x: 25, y: 4, w: 3, h: 2 },
      { id: 'harbor_lighthouse', sprite: 'bx_lighthouse', x: 38, y: 3, w: 3, h: 2, interactAt: [{ x: 37, y: 3 }, { x: 37, y: 4 }] },
      { id: 'harbor_lemon', sprite: 'ob_crates_b', x: 15, y: 4, w: 5, h: 2, solid: false },
      { id: 'harbor_bottle', sprite: 'ob_jar_blue', x: 3, y: 15, w: 1, h: 1, solid: false },
      { id: 'harbor_hokora', sprite: 'tp_hokora', x: 40, y: 21, w: 1, h: 1 },
      { id: 'harbor_light', sprite: 'ob_lamp_old', x: 23, y: 20, w: 1, h: 1 },
    ],
    npcs: [
      { id: 'nagisa', x: 21, y: 14, facing: 'down' },
      { id: 'gen', x: 29, y: 19, facing: 'left' },
      { id: 'kaito', x: 6, y: 15, facing: 'down' },
      { id: 'shiraishi', x: 22, y: 20, facing: 'up', when: { questDone: 'mq15' } },
      { id: 'umino', x: 36, y: 4, facing: 'up', when: { not: { item: 'lighthouse_key' } } },
      { id: 'traveller', x: 36, y: 2, facing: 'down', when: { all: [{ obj: 'mq17.master' }, { notObj: 'mq17.lighthouse' }] } },
    ],
    warps: [
      ...[16, 17, 18].map((x) => ({ x, y: 12, to: { map: 'kneipe', x: 6, y: 8, facing: 'up' as const } })),
      ...[3, 4].map((y) => ({
        x: 38, y, to: { map: 'leuchtturm', x: 5, y: 8, facing: 'up' as const }, when: { item: 'lighthouse_key' },
        locked: '灯台の扉には鍵がかかっている。「関係者以外立入禁止」。',
      })),
    ],
    zones: [
      { x0: 0, y0: 7, x1: 8, y1: 11, encounters: 'harbor_dunes', bg: 'bg_harbor_beach.webp' },
      { x0: 37, y0: 9, x1: 40, y1: 12, encounters: 'harbor_cliff', bg: 'bg_harbor_cliff.webp' },
    ],
  },
  // ---- Kyoto (chapter 5); footprints match tools/build_kyoto.py
  k_station: {
    id: 'k_station', name: 'Kyoto Station', nameJa: '京都駅前', tiles: KYOTO_GEN.bahnhof, image: 'map_bahnhof',
    objects: [
      { id: 'k_station', sprite: 'bx_k_bahnhof_station', x: 15, y: 5, w: 12, h: 2, script: 'k_station_front' },
      { id: 'k_kiosk', sprite: 'bx_k_bahnhof_kiosk', x: 4, y: 17, w: 5, h: 2, solid: false },
      { id: 'k_konbini', sprite: 'bx_k_bahnhof_konbini', x: 35, y: 12, w: 6, h: 2, solid: false },
    ],
    npcs: [
      { id: 'ikeda', x: 18, y: 9, facing: 'down' },
      { id: 'emma', x: 13, y: 9, facing: 'right', when: { not: { obj: 'mq19.emma' } } },
      { id: 'sakamoto', x: 25, y: 9, facing: 'left' },
    ],
    warps: [
      ...[19, 20, 21].map((x) => ({ x, y: 27, to: { map: 'k_nishiki', x: 20, y: 2, facing: 'down' as const } })),
      { x: 20, y: 6, to: { map: 'bahnhofinfo', x: 6, y: 9, facing: 'up' as const } },
      { x: 21, y: 6, to: { map: 'bahnhofinfo', x: 7, y: 9, facing: 'up' as const } },
    ],
  },
  k_nishiki: {
    id: 'k_nishiki', name: 'Nishiki Market', nameJa: '錦市場', tiles: KYOTO_GEN.nishiki, image: 'map_nishiki',
    objects: [
      ...[7, 11, 15, 22, 27, 31].flatMap((x, i) => [
        { id: `k_shop_t${i}`, sprite: `bx_k_nishiki_shop_t${i}`, x, y: 8, w: 4, h: 2, script: i % 2 === 0 ? 'k_shop_veg' : 'k_shop_old' },
        { id: `k_shop_b${i}`, sprite: `bx_k_nishiki_shop_b${i}`, x, y: 17, w: 4, h: 2, script: i % 2 === 0 ? 'k_shop_veg' : 'k_shop_old' },
      ]),
      { id: 'k_nishiki_sign', sprite: 'ob_sign_board', hint: true, x: 20, y: 11, w: 2, h: 1, solid: false, interactAt: [{ x: 20, y: 12 }, { x: 21, y: 12 }], script: 'k_nishiki_sign' },
    ],
    npcs: [],
    warps: [
      ...[20, 21].map((x) => ({ x, y: 0, to: { map: 'k_station', x: 20, y: 25, facing: 'up' as const } })),
      ...[11, 12, 13].map((y) => ({ x: 0, y, to: { map: 'k_kamo', x: 40, y: 14, facing: 'left' as const } })),
      ...[11, 12, 13].map((y) => ({ x: 41, y, to: { map: 'k_gion', x: 1, y: 17, facing: 'right' as const } })),
      ...[8, 9].map((x) => ({ x, y: 9, to: { map: 'nishikiladen', x: x - 3, y: 8, facing: 'up' as const } })),
    ],
  },
  k_kamo: {
    id: 'k_kamo', name: 'Kamo River', nameJa: '鴨川', tiles: KYOTO_GEN.kamogawa, image: 'map_kamogawa', encounters: 'kyoto_river', bg: 'bg_kyoto_river.webp',
    objects: [
      { id: 'k_kamo_cafe', sprite: 'bx_k_kamogawa_tea_house', x: 6, y: 14, w: 4, h: 2, script: 'k_kamo_cafe' },
      { id: 'k_izakaya', sprite: 'bx_k_kamogawa_machiya', x: 5, y: 19, w: 3, h: 3, script: 'k_izakaya' },
      { id: 'k_kamo_shop', sprite: 'bx_k_kamogawa_market_shop', x: 9, y: 19, w: 4, h: 3, script: 'k_shop_veg' },
      { id: 'k_kamo_kimono', sprite: 'bx_k_kamogawa_kimono_shop', x: 18, y: 19, w: 5, h: 3, script: 'k_kimono_shop' },
      { id: 'k_kamo_house', sprite: 'bx_k_kamogawa_machiya2', x: 30, y: 19, w: 3, h: 3, script: 'k_izakaya' },
    ],
    npcs: [],
    warps: [
      ...[14, 15].map((y) => ({ x: 41, y, to: { map: 'k_nishiki', x: 1, y: 12, facing: 'right' as const } })),
      ...[6, 7].map((x) => ({ x, y: 19, to: { map: 'izakaya', x: 6, y: 8, facing: 'up' as const } })),
    ],
  },
  k_gion: {
    id: 'k_gion', name: 'Gion', nameJa: '祇園', tiles: KYOTO_GEN.gion, image: 'map_gion', bg: 'bg_kyoto_gion.webp',
    objects: [
      { id: 'k_guesthouse', sprite: 'bx_k_gion_guesthouse', x: 31, y: 9, w: 6, h: 2, script: 'k_guesthouse', interactAt: [{ x: 33, y: 11 }, { x: 34, y: 11 }] },
      { id: 'k_teahouse', sprite: 'bx_k_gion_tea_house', x: 26, y: 18, w: 6, h: 2, script: 'k_teahouse' },
      { id: 'k_kimono', sprite: 'bx_k_gion_kimono_shop', x: 5, y: 15, w: 5, h: 2, script: 'k_kimono_shop' },
      { id: 'k_machiya1', sprite: 'bx_k_gion_machiya', x: 3, y: 6, w: 3, h: 2, solid: false },
      { id: 'k_machiya2', sprite: 'bx_k_gion_machiya2', x: 6, y: 6, w: 3, h: 2, solid: false },
      { id: 'k_machiya3', sprite: 'bx_k_gion_machiya3', x: 3, y: 12, w: 3, h: 2, solid: false },
      { id: 'k_machiya4', sprite: 'bx_k_gion_machiya4', x: 6, y: 12, w: 3, h: 2, solid: false },
      { id: 'k_machiya5', sprite: 'bx_k_gion_machiya5', x: 25, y: 4, w: 3, h: 2, solid: false },
      { id: 'k_gion_hokora', sprite: 'ob_hokora', x: 20, y: 2, w: 3, h: 1, solid: false, script: 'k_gion_hokora' },
      { id: 'k_gion_lantern', sprite: 'ob_stone_lantern', x: 20, y: 9, w: 2, h: 3, solid: false, script: 'k_gion_lantern' },
    ],
    npcs: [],
    warps: [
      ...[17, 18].map((y) => ({ x: 0, y, to: { map: 'k_nishiki', x: 40, y: 12, facing: 'left' as const } })),
      { x: 33, y: 11, to: { map: 'machiya', x: 6, y: 9, facing: 'up' as const } },
      { x: 34, y: 11, to: { map: 'machiya', x: 7, y: 9, facing: 'up' as const } },
      { x: 29, y: 19, to: { map: 'teehaus', x: 5, y: 8, facing: 'up' as const } },
      { x: 30, y: 19, to: { map: 'teehaus', x: 6, y: 8, facing: 'up' as const } },
      { x: 7, y: 16, to: { map: 'kimono', x: 6, y: 8, facing: 'up' as const } },
      { x: 8, y: 16, to: { map: 'kimono', x: 6, y: 8, facing: 'up' as const } },
    ],
  },
  k_fushimi: {
    id: 'k_fushimi', name: 'Fushimi Inari', nameJa: '伏見稲荷', tiles: KYOTO_GEN.fushimi, image: 'map_fushimi', encounters: 'fushimi', bg: 'bg_kyoto_fushimi.webp',
    objects: [
      { id: 'k_shrine', sprite: 'bx_k_fushimi_shrine', x: 21, y: 15, w: 4, h: 2, script: 'k_shrine' },
      { id: 'k_shrine_office', sprite: 'bx_k_fushimi_tea_house', x: 11, y: 18, w: 4, h: 2, script: 'k_shrine_office' },
      { id: 'k_souvenir', sprite: 'bx_k_fushimi_market_shop', x: 27, y: 18, w: 4, h: 2, script: 'k_souvenir' },
      { id: 'k_fushimi_summit', x: 28, y: 1, w: 6, h: 1, solid: false, script: 'k_fushimi_summit' },
    ],
    npcs: [],
    zones: [{ x0: 17, y0: 3, x1: 26, y1: 10, encounters: 'fushimi', bg: 'bg_kyoto_fushimi.webp' }],
    warps: [19, 20, 21, 22].map((x) => ({ x, y: 27, to: { map: 'k_station', x: 20, y: 9, facing: 'up' as const } })),
  },
  // ---- Osaka (chapter 6); built by tools/build_osaka.py
  o_umeda: {
    id: 'o_umeda', name: 'Umeda', nameJa: '梅田', tiles: OSAKA_GEN.umeda.tiles, image: 'map_umeda', objects: OSAKA_GEN.umeda.objects,
    npcs: [{ id: 'porter', x: 22, y: 9, facing: 'left' }], warps: OSAKA_GEN.umeda.warps,
  },
  o_nakanoshima: {
    id: 'o_nakanoshima', name: 'Nakanoshima', nameJa: '中之島', tiles: OSAKA_GEN.nakanoshima.tiles, image: 'map_nakanoshima', objects: OSAKA_GEN.nakanoshima.objects,
    npcs: [], warps: OSAKA_GEN.nakanoshima.warps,
  },
  o_dotonbori: {
    id: 'o_dotonbori', name: 'Dotonbori', nameJa: '道頓堀', tiles: OSAKA_GEN.dotonbori.tiles, image: 'map_dotonbori',
    objects: [...OSAKA_GEN.dotonbori.objects, { id: 'doton_alley', x: 15, y: 10, w: 2, h: 1, solid: false, script: 'doton_alley' }],
    npcs: [], warps: OSAKA_GEN.dotonbori.warps, bg: 'bg_osaka_dotonbori.webp',
    // the alley between the shops: the worn-out lantern lives there
    // (objects are appended below)
  },
  o_shinsekai: {
    id: 'o_shinsekai', name: 'Shinsekai', nameJa: '新世界', tiles: OSAKA_GEN.shinsekai.tiles, image: 'map_shinsekai', objects: OSAKA_GEN.shinsekai.objects,
    npcs: [], warps: OSAKA_GEN.shinsekai.warps, bg: 'bg_osaka_dotonbori.webp',
  },
  o_castle: {
    id: 'o_castle', name: 'Osaka Castle', nameJa: '大阪城', tiles: OSAKA_GEN.osakajo.tiles, image: 'map_osakajo',
    objects: [...OSAKA_GEN.osakajo.objects, { id: 'castle_bridge', x: 20, y: 12, w: 4, h: 1, solid: false, script: 'castle_bridge' }], encounters: 'osaka_castle', bg: 'bg_osaka_castle.webp',
    npcs: [], warps: OSAKA_GEN.osakajo.warps,
    zones: [{ x0: 3, y0: 6, x1: 7, y1: 12, encounters: 'osaka_castle', bg: 'bg_osaka_castle.webp' }],
  },
  // ---- Tokyo (chapter 7); built by tools/build_tokyo.py
  t_station: {
    id: 't_station', name: 'Tokyo Station', nameJa: '東京駅', tiles: TOKYO_GEN.station.tiles, image: 'map_station', objects: TOKYO_GEN.station.objects,
    npcs: [{ id: 'attendant', x: 24, y: 10, facing: 'left' }], warps: TOKYO_GEN.station.warps, bg: 'bg_tokyo_shibuya.webp',
  },
  t_asakusa: {
    id: 't_asakusa', name: 'Asakusa', nameJa: '浅草', tiles: TOKYO_GEN.asakusa.tiles, image: 'map_asakusa', objects: TOKYO_GEN.asakusa.objects,
    npcs: [], warps: TOKYO_GEN.asakusa.warps, bg: 'bg_tokyo_shibuya.webp',
  },
  t_shibuya: {
    id: 't_shibuya', name: 'Shibuya', nameJa: '渋谷', tiles: TOKYO_GEN.shibuya.tiles, image: 'map_shibuya', objects: TOKYO_GEN.shibuya.objects,
    npcs: [{ id: 'priya', x: 15, y: 21, facing: 'right' }], warps: TOKYO_GEN.shibuya.warps, bg: 'bg_tokyo_shibuya.webp',
  },
  t_shinjuku: {
    id: 't_shinjuku', name: 'Shinjuku', nameJa: '新宿', tiles: TOKYO_GEN.shinjuku.tiles, image: 'map_shinjuku', encounters: 'tokyo_gyoen', objects: TOKYO_GEN.shinjuku.objects,
    npcs: [], warps: TOKYO_GEN.shinjuku.warps, bg: 'bg_tokyo_yokocho.webp',
    zones: [{ x0: 32, y0: 3, x1: 39, y1: 7, encounters: 'tokyo_gyoen', bg: 'bg_tokyo_yokocho.webp' }],
  },
  t_sumida: {
    id: 't_sumida', name: 'Sumida Riverside', nameJa: '隅田川', tiles: TOKYO_GEN.sumida.tiles, image: 'map_sumida', encounters: 'tokyo_river',
    objects: [...TOKYO_GEN.sumida.objects, { id: 'sm_river', x: 31, y: 8, w: 4, h: 1, solid: false, script: 'sm_river' }, { id: 'sm_dock', x: 20, y: 19, w: 3, h: 1, solid: false, script: 'sm_dock' }],
    npcs: [{ id: 'kotone', x: 33, y: 8, facing: 'down', when: { flag: 'chapter7_done' } }], warps: TOKYO_GEN.sumida.warps, bg: 'bg_tokyo_sumida.webp',
    zones: [{ x0: 1, y0: 21, x1: 12, y1: 25, encounters: 'tokyo_river', bg: 'bg_tokyo_sumida.webp' }],
  },
  kissaten: {
    id: 'kissaten', name: 'Kissaten', nameJa: '喫茶店', tiles: ROOMS_GEN.kissaten.tiles, interior: true, image: ROOMS_GEN.kissaten.image, objects: ROOMS_GEN.kissaten.objects,
    npcs: [{ id: 'yoshie', x: 5, y: 4, facing: 'up' }],
    warps: [6, 7].map((x) => ({ x, y: 9, to: { map: 't_asakusa', x: 10, y: 6, facing: 'down' as const } })),
  },
  sento: {
    id: 'sento', name: 'Sento', nameJa: '銭湯', tiles: ROOMS_GEN.sento.tiles, interior: true, image: ROOMS_GEN.sento.image, objects: ROOMS_GEN.sento.objects,
    npcs: [],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 't_asakusa', x: 9 + x - 5, y: 12, facing: 'down' as const } })),
  },
  gamecenter: {
    id: 'gamecenter', name: 'Game centre', nameJa: 'ゲームセンター', tiles: ROOMS_GEN.gamecenter.tiles, interior: true, image: ROOMS_GEN.gamecenter.image, objects: ROOMS_GEN.gamecenter.objects,
    npcs: [{ id: 'haru', x: 5, y: 5, facing: 'left' }],
    warps: [6, 7].map((x) => ({ x, y: 9, to: { map: 't_shibuya', x: 9 + x - 6, y: 10, facing: 'down' as const } })),
  },
  yokocho: {
    id: 'yokocho', name: 'Yokocho izakaya', nameJa: '横丁の居酒屋', tiles: ROOMS_GEN.yokocho.tiles, interior: true, image: ROOMS_GEN.yokocho.image, objects: ROOMS_GEN.yokocho.objects,
    npcs: [], warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 't_shinjuku', x: 22, y: 13, facing: 'down' as const } })),
  },
  kuyakusho: {
    id: 'kuyakusho', name: 'Ward office', nameJa: '区役所', tiles: ROOMS_GEN.kuyakusho.tiles, interior: true, image: ROOMS_GEN.kuyakusho.image, objects: ROOMS_GEN.kuyakusho.objects,
    npcs: [{ id: 'yamamoto', x: 6, y: 5, facing: 'down' }],
    warps: [6, 7].map((x) => ({ x, y: 10, to: { map: 't_shinjuku', x: 4 + x - 6, y: 9, facing: 'down' as const } })),
  },
  radio: {
    id: 'radio', name: 'Radio studio', nameJa: 'ラジオ局', tiles: ROOMS_GEN.radio.tiles, interior: true, image: ROOMS_GEN.radio.image, objects: ROOMS_GEN.radio.objects,
    npcs: [{ id: 'kuroi', x: 6, y: 5, facing: 'down' }],
    warps: [6, 7].map((x) => ({ x, y: 9, to: { map: 't_sumida', x: 17 + x - 6, y: 8, facing: 'down' as const } })),
  },
  buero: {
    id: 'buero', name: 'Open-plan office', nameJa: 'オフィス', tiles: ROOMS_GEN.buero.tiles, interior: true, image: ROOMS_GEN.buero.image, objects: ROOMS_GEN.buero.objects,
    npcs: [{ id: 'kenta', x: 6, y: 7, facing: 'up' }],
    warps: [6, 7].map((x) => ({ x, y: 10, to: { map: 'o_umeda', x: 8 + x - 6, y: 14, facing: 'down' as const } })),
  },
  empfang: {
    id: 'empfang', name: 'Company reception', nameJa: '会社の受付', tiles: ROOMS_GEN.empfang.tiles, interior: true, image: ROOMS_GEN.empfang.image, objects: ROOMS_GEN.empfang.objects,
    npcs: [{ id: 'tachibana', x: 5, y: 5, facing: 'down' }],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 'o_umeda', x: 8 + x - 5, y: 22, facing: 'down' as const } })),
  },
  takoladen: {
    id: 'takoladen', name: 'Takoyaki shop', nameJa: 'たこ焼き屋', tiles: ROOMS_GEN.takoladen.tiles, interior: true, image: ROOMS_GEN.takoladen.image, objects: ROOMS_GEN.takoladen.objects,
    npcs: [{ id: 'okan', x: 10, y: 3, facing: 'left' }],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 'o_dotonbori', x: 7 + x - 5, y: 12, facing: 'down' as const } })),
  },
  okonomi: {
    id: 'okonomi', name: 'Okonomiyaki restaurant', nameJa: 'お好み焼き屋', tiles: ROOMS_GEN.okonomi.tiles, interior: true, image: ROOMS_GEN.okonomi.image, objects: ROOMS_GEN.okonomi.objects,
    npcs: [], warps: [6, 7].map((x) => ({ x, y: 9, to: { map: 'o_dotonbori', x: 12 + x - 6, y: 12, facing: 'down' as const } })),
  },
  konbini2: {
    id: 'konbini2', name: 'Convenience store', nameJa: 'コンビニ', tiles: ROOMS_GEN.konbini2.tiles, interior: true, image: ROOMS_GEN.konbini2.image, objects: ROOMS_GEN.konbini2.objects,
    npcs: [{ id: 'minh', x: 7, y: 3, facing: 'down' }],
    warps: [6, 7].map((x) => ({ x, y: 9, to: { map: 'o_umeda', x: 33 + x - 6, y: 22, facing: 'down' as const } })),
  },
  kushikatsu: {
    id: 'kushikatsu', name: 'Kushikatsu diner', nameJa: '串カツ屋', tiles: ROOMS_GEN.kushikatsu.tiles, interior: true, image: ROOMS_GEN.kushikatsu.image, objects: ROOMS_GEN.kushikatsu.objects,
    npcs: [{ id: 'fujita', x: 4, y: 5, facing: 'left' }],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 'o_shinsekai', x: 4 + x - 5, y: 15, facing: 'down' as const } })),
  },
  apartment: {
    id: 'apartment', name: 'Your apartment', nameJa: 'アパート', tiles: ROOMS_GEN.apartment.tiles, interior: true, image: ROOMS_GEN.apartment.image,
    objects: [
      ...ROOMS_GEN.apartment.objects,
      { id: 'deco_poster', sprite: 'deco_poster', x: 0, y: 0, w: 0, h: 0, solid: false, at: [112, 66], when: { item: 'deco_poster' } },
      { id: 'deco_worldmap', sprite: 'deco_worldmap', x: 0, y: 0, w: 0, h: 0, solid: false, at: [272, 80], when: { item: 'deco_worldmap' } },
      { id: 'deco_certificate', sprite: 'deco_certificate', x: 0, y: 0, w: 0, h: 0, solid: false, at: [336, 50], when: { item: 'deco_certificate' } },
      { id: 'deco_lights', sprite: 'deco_lights', x: 0, y: 0, w: 0, h: 0, solid: false, at: [186, 50], when: { item: 'deco_lights' } },
      { id: 'deco_furin', sprite: 'deco_furin', x: 0, y: 0, w: 0, h: 0, solid: false, at: [150, 58], when: { item: 'deco_furin' } },
      { id: 'deco_cactus', sprite: 'deco_cactus', x: 0, y: 0, w: 0, h: 0, solid: false, at: [112, 232], when: { item: 'deco_cactus' } },
      { id: 'deco_lamp', sprite: 'deco_lamp', x: 0, y: 0, w: 0, h: 0, solid: false, at: [118, 104], when: { item: 'deco_lamp' } },
      { id: 'deco_bonsai', sprite: 'deco_bonsai', x: 0, y: 0, w: 0, h: 0, solid: false, at: [140, 175], when: { item: 'deco_bonsai' } },
      { id: 'deco_cushion', sprite: 'deco_cushion', x: 0, y: 0, w: 0, h: 0, solid: false, at: [230, 285], when: { item: 'deco_cushion' } },
      { id: 'deco_beanbag', sprite: 'deco_beanbag', x: 0, y: 0, w: 0, h: 0, solid: false, at: [300, 230], when: { item: 'deco_beanbag' } },
      { id: 'deco_books', sprite: 'deco_books', x: 0, y: 0, w: 0, h: 0, solid: false, at: [176, 285], when: { item: 'deco_books' } },
      { id: 'deco_aquarium', sprite: 'deco_aquarium', x: 0, y: 0, w: 0, h: 0, solid: false, at: [176, 335], when: { item: 'deco_aquarium' } },
      { id: 'deco_tv', sprite: 'deco_tv', x: 0, y: 0, w: 0, h: 0, solid: false, at: [118, 330], when: { item: 'deco_tv' } },
      { id: 'deco_manekineko', sprite: 'deco_manekineko', x: 0, y: 0, w: 0, h: 0, solid: false, at: [228, 345], when: { item: 'deco_manekineko' } },
      { id: 'deco_shelf', sprite: 'deco_shelf', x: 0, y: 0, w: 0, h: 0, solid: false, at: [300, 180], when: { item: 'deco_shelf' } },
      { id: 'deco_laundry', sprite: 'deco_laundry', x: 0, y: 0, w: 0, h: 0, solid: false, at: [52, 350], when: { item: 'deco_laundry' } },
    ],
    npcs: [],
    warps: [
      { x: 5, y: 11, to: { map: 'town', x: 4, y: 17, facing: 'down' } },
      { x: 6, y: 11, to: { map: 'town', x: 4, y: 17, facing: 'down' } },
    ],
  },
  cafe: {
    id: 'cafe', name: 'Café Kotonoha', nameJa: '喫茶ことのは', tiles: ROOMS_GEN.cafe.tiles, interior: true, image: ROOMS_GEN.cafe.image,
    objects: ROOMS_GEN.cafe.objects,
    npcs: [
      { id: 'kaede', x: 10, y: 5, facing: 'left' },
      { id: 'aoi', x: 5, y: 8, facing: 'left' },
    ],
    warps: [{ x: 6, y: 11, to: { map: 'town', x: 26, y: 10, facing: 'down' } }],
  },

  konbini: {
    id: 'konbini', name: 'Convenience store', nameJa: 'コンビニ ひのもり店', tiles: ROOMS_GEN.konbini.tiles, interior: true, image: ROOMS_GEN.konbini.image,
    objects: ROOMS_GEN.konbini.objects,
    npcs: [
      { id: 'haruto', x: 13, y: 6, facing: 'left' },
      { id: 'customer', x: 7, y: 6, facing: 'left', when: { notObj: 'mq2.customer' } },
    ],
    warps: [6, 7, 8].map((x) => ({ x, y: 11, to: { map: 'town', x: 17, y: 10, facing: 'down' as const } })),
  },

  ramen: {
    id: 'ramen', name: 'Ramen Manpuku', nameJa: 'ラーメン まんぷく', tiles: ROOMS_GEN.ramen.tiles, interior: true, image: ROOMS_GEN.ramen.image,
    objects: ROOMS_GEN.ramen.objects,
    wanderers: [{ id: 'chef', x: 9, y: 3, r: 1 }],
    npcs: [],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 'town', x: 16, y: 17, facing: 'down' as const } })),
  },

  lab: {
    id: 'lab', name: 'Kirishima Lab', nameJa: '霧島研究室', tiles: ROOMS_GEN.lab.tiles, interior: true, image: ROOMS_GEN.lab.image,
    objects: ROOMS_GEN.lab.objects,
    npcs: [{ id: 'kirishima', x: 9, y: 5, facing: 'down', when: { questDone: 'mq4' } }],
    warps: [6, 7].map((x) => ({ x, y: 10, to: { map: 'town', x: 39, y: 10, facing: 'down' as const } })),
  },

  library: {
    id: 'library', name: 'Hinomori Library', nameJa: '日野森図書館', tiles: ROOMS_GEN.library.tiles, interior: true, image: ROOMS_GEN.library.image,
    objects: ROOMS_GEN.library.objects,
    npcs: [{ id: 'sato', x: 9, y: 7, facing: 'down' }],
    warps: [
      { x: 6, y: 11, to: { map: 'town', x: 12, y: 10, facing: 'down' } },
      { x: 7, y: 11, to: { map: 'town', x: 12, y: 10, facing: 'down' } },
    ],
  },
  station: {
    id: 'station', name: 'Station waiting room', nameJa: '日野森駅 待合室', tiles: ROOMS_GEN.station.tiles, interior: true, image: ROOMS_GEN.station.image,
    // the ticket gates open the departure board (the same as the sign on the platform)
    objects: ROOMS_GEN.station.objects.map((o) => (o.id === 'station_gate' ? { ...o, script: 'station_building', hint: 'always' } : o)),
    npcs: [],
    warps: [
      { x: 10, y: 14, to: { map: 'town', x: 27, y: 20, facing: 'down' } },
      { x: 11, y: 14, to: { map: 'town', x: 27, y: 20, facing: 'down' } },
    ],
  },
  ryokan: {
    id: 'ryokan', name: 'Onsen inn Yunoka', nameJa: '温泉旅館 ゆのか', tiles: ROOMS_GEN.ryokan.tiles, interior: true, image: ROOMS_GEN.ryokan.image,
    objects: ROOMS_GEN.ryokan.objects,
    npcs: [{ id: 'okami', x: 6, y: 3, facing: 'left' }],
    warps: [
      { x: 6, y: 10, to: { map: 'valley', x: 32, y: 15, facing: 'down' } },
      { x: 7, y: 10, to: { map: 'valley', x: 33, y: 15, facing: 'down' } },
    ],
  },
  werkstatt: {
    id: 'werkstatt', name: 'Calligraphy workshop', nameJa: '書道の工房', tiles: ROOMS_GEN.werkstatt.tiles, interior: true, image: ROOMS_GEN.werkstatt.image,
    objects: ROOMS_GEN.werkstatt.objects,
    npcs: [{ id: 'ota', x: 7, y: 5, facing: 'left' }],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 'valley', x: 17, y: 15, facing: 'down' as const } })),
  },
  tsuru: {
    id: 'tsuru', name: 'Tsuru’s guesthouse', nameJa: 'つるさんの民宿', tiles: ROOMS_GEN.tsuru.tiles, interior: true, image: ROOMS_GEN.tsuru.image,
    objects: ROOMS_GEN.tsuru.objects,
    npcs: [{ id: 'tsuru', x: 5, y: 6, facing: 'right' }],
    warps: [
      { x: 6, y: 10, to: { map: 'mountain', x: 34, y: 17, facing: 'down' } },
      { x: 7, y: 10, to: { map: 'mountain', x: 35, y: 17, facing: 'down' } },
    ],
  },
  klinik: {
    id: 'klinik', name: 'Yukimi clinic', nameJa: '雪見診療所', tiles: ROOMS_GEN.klinik.tiles, interior: true, image: ROOMS_GEN.klinik.image,
    objects: ROOMS_GEN.klinik.objects,
    npcs: [{ id: 'fujii', x: 4, y: 3, facing: 'right' }],
    warps: [
      { x: 5, y: 9, to: { map: 'mountain', x: 27, y: 22, facing: 'down' } },
      { x: 6, y: 9, to: { map: 'mountain', x: 28, y: 22, facing: 'down' } },
    ],
  },
  kneipe: {
    id: 'kneipe', name: 'Harbour diner Hamada', nameJa: '港食堂 はまだ', tiles: ROOMS_GEN.kneipe.tiles, interior: true, image: ROOMS_GEN.kneipe.image,
    objects: ROOMS_GEN.kneipe.objects,
    npcs: [{ id: 'hamada', x: 5, y: 3, facing: 'down' }],
    warps: [{ x: 6, y: 9, to: { map: 'harbor', x: 17, y: 13, facing: 'down' } }],
  },
  leuchtturm: {
    id: 'leuchtturm', name: 'Lighthouse keeper’s room', nameJa: '灯台守の部屋', tiles: ROOMS_GEN.leuchtturm.tiles, interior: true, image: ROOMS_GEN.leuchtturm.image,
    objects: ROOMS_GEN.leuchtturm.objects,
    npcs: [{ id: 'umino', x: 8, y: 5, facing: 'left' }],
    warps: [5, 6].map((x) => ({ x, y: 9, to: { map: 'harbor', x: 37, y: 4, facing: 'left' as const } })),
  },
  machiya: {
    id: 'machiya', name: 'Guesthouse Matsuo', nameJa: 'ゲストハウス まつお', tiles: ROOMS_GEN.machiya.tiles, interior: true, image: ROOMS_GEN.machiya.image,
    objects: ROOMS_GEN.machiya.objects,
    npcs: [{ id: 'matsuo', x: 5, y: 3, facing: 'left' }],
    warps: [
      { x: 6, y: 10, to: { map: 'k_gion', x: 33, y: 12, facing: 'down' } },
      { x: 7, y: 10, to: { map: 'k_gion', x: 34, y: 12, facing: 'down' } },
    ],
  },
  teehaus: {
    id: 'teehaus', name: 'Tea house', nameJa: '島の茶室', tiles: ROOMS_GEN.teehaus.tiles, interior: true, image: ROOMS_GEN.teehaus.image,
    objects: ROOMS_GEN.teehaus.objects,
    npcs: [{ id: 'sumie', x: 6, y: 4, facing: 'down' }],
    warps: [
      { x: 5, y: 9, to: { map: 'k_gion', x: 29, y: 20, facing: 'down' } },
      { x: 6, y: 9, to: { map: 'k_gion', x: 30, y: 20, facing: 'down' } },
    ],
  },
  kimono: {
    id: 'kimono', name: 'Kimono rental', nameJa: '着物レンタル', tiles: ROOMS_GEN.kimono.tiles, interior: true, image: ROOMS_GEN.kimono.image,
    objects: ROOMS_GEN.kimono.objects,
    npcs: [{ id: 'rin', x: 2, y: 3, facing: 'right' }],
    warps: [{ x: 6, y: 9, to: { map: 'k_gion', x: 7, y: 17, facing: 'down' } }],
  },
  izakaya: {
    id: 'izakaya', name: 'Izakaya', nameJa: '居酒屋', tiles: ROOMS_GEN.izakaya.tiles, interior: true, image: ROOMS_GEN.izakaya.image,
    objects: ROOMS_GEN.izakaya.objects,
    npcs: [],
    warps: [{ x: 6, y: 9, to: { map: 'k_kamo', x: 6, y: 18, facing: 'down' } }],
  },
  bahnhofinfo: {
    id: 'bahnhofinfo', name: 'Station information', nameJa: '京都駅 案内所・改札', tiles: ROOMS_GEN.bahnhofinfo.tiles, interior: true, image: ROOMS_GEN.bahnhofinfo.image,
    // the information desk wall (map + board) is the way to the trains: it opens the departures
    objects: ROOMS_GEN.bahnhofinfo.objects.map((o) => (o.id === 'bahnhofinfo_map' || o.id === 'bahnhofinfo_board' ? { ...o, script: 'kyoto_station', hint: 'always' as const } : o)),
    npcs: [],
    warps: [
      { x: 6, y: 10, to: { map: 'k_station', x: 20, y: 7, facing: 'down' } },
      { x: 7, y: 10, to: { map: 'k_station', x: 21, y: 7, facing: 'down' } },
    ],
  },
  nishikiladen: {
    id: 'nishikiladen', name: 'Pickle shop', nameJa: '漬物屋', tiles: ROOMS_GEN.nishikiladen.tiles, interior: true, image: ROOMS_GEN.nishikiladen.image,
    objects: ROOMS_GEN.nishikiladen.objects,
    npcs: [],
    warps: [
      { x: 5, y: 9, to: { map: 'k_nishiki', x: 8, y: 10, facing: 'down' } },
      { x: 6, y: 9, to: { map: 'k_nishiki', x: 9, y: 10, facing: 'down' } },
    ],
  },
};

// maps repainted as a flat ground image plus separate sprites (tools/build_plain.py): the ground, its collision
// tiles and the planted/placed decor replace the old painted-in versions, buildings and interactions stay
for (const [id, p] of Object.entries(PLAIN_GEN)) {
  const m = MAPS[id];
  if (!m) continue;
  m.image = p.image;
  m.tiles = p.tiles;
  m.objects = [...m.objects, ...p.decor.map((d) => ({ ...d, decor: true }))];
}

// buildings that used to repeat: the new house variants (tools/build_houses.py)
for (const m of Object.values(MAPS)) for (const o of m.objects) if (HOUSE_SWAPS[o.id]) o.sprite = HOUSE_SWAPS[o.id];

// shops, halls and houses that were added later (tools/build_new_rooms.py): a room map plus the door tiles in its outdoor map
for (const [id, r] of Object.entries(ROOMS2_GEN)) {
  const [, H] = r.size;
  const e = r.ext;
  MAPS[id] = {
    id, name: r.name, nameJa: r.nameJa, tiles: r.tiles, interior: true, image: r.image, objects: r.objects, npcs: r.npc ? [r.npc] : [],
    // a hall: each door leads back to its own tile; a shop: all doors lead to the one in front of the entrance
    warps: r.doors.map((x, i) => ({ x, y: H - 1, to: { map: e.map, x: e.stand.x + (r.spread ? i : 0), y: e.stand.y, facing: e.stand.facing } })),
  };
  const outdoor = MAPS[e.map];
  outdoor.warps = outdoor.warps.filter((w) => !e.tiles.some(([x, y]) => w.x === x && w.y === y)); // a hall replaces the old door
  const inX = r.doors[Math.floor((r.doors.length - 1) / 2)];
  e.tiles.forEach(([x, y], i) => outdoor.warps.push({ x, y, to: { map: id, x: r.spread ? r.doors[Math.min(i, r.doors.length - 1)] : inX, y: H - 2, facing: 'up' } }));
}

// hand edits: committed ones first, then the ones made in this browser's editor
{
  const local = typeof localStorage !== 'undefined' ? loadLocalEdits() : {};
  for (const m of Object.values(MAPS)) m.objects = applyEdits(applyEdits(m.objects, EDITS_BASE[m.id]), local[m.id]);
}
