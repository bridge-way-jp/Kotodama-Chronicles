import type { Cond } from '../core/script';
import { ROOMS_GEN } from './rooms.gen';
import { FOREST_GEN } from './forest.gen';
import { VALLEY_GEN } from './valley.gen';
import { MOUNTAIN_GEN } from './mountain.gen';
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
  'T...................::.,.........~~........T',
  'T..............,....::......,....~~........T',
  'T.............,.....::...........~~........T',
  'T..,................::...........~~........T',
  'T...,...............::...........~~........T',
  'T......,............::...........~~........T',
  'T================================~~xxxxxxxxT',
  'T================================bbxxxxxxxxT',
  'T================================bbxxxxxxxxT',
  'T...................::...........~~xxxxxxxxT',
  'T...................::...........~~.......TT',
  'T...................::..~~~~.....~~......TTT',
  'T...................::..~~~~.....~~..,....TT',
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
      { id: 'timetable', sprite: 'p_sign_nihon', x: 24, y: 20, w: 1, h: 1 },
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
      { id: 'station_building', sprite: 'bx_station', x: 25, y: 18, w: 5, h: 2 },
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
    // footprints match tools/build_valley.py BUILDINGS
    objects: [
      { id: 'valley_farmhouse', sprite: 'bx_farmhouse', x: 4, y: 4, w: 5, h: 2 },
      { id: 'valley_winery', sprite: 'bx_winery', x: 22, y: 13, w: 4, h: 2 },
      { id: 'valley_stand', sprite: 'bx_stand', x: 15, y: 19, w: 3, h: 1 },
      { id: 'valley_workshop', sprite: 'bx_workshop', x: 16, y: 14, w: 3, h: 1 },
      { id: 'valley_busstop', sprite: 'bx_busstop', x: 22, y: 19, w: 3, h: 1, interactAt: [{ x: 22, y: 20 }, { x: 23, y: 20 }, { x: 24, y: 20 }, { x: 21, y: 19 }] },
      { id: 'valley_ryokan', sprite: 'bx_ryokan', x: 29, y: 13, w: 7, h: 2 },
      // the word garden next to the farmhouse (Mr. Hayashi lends Maria a bed after the harvest)
      ...(['peach_3', 'grape_3', 'sunflower_3', 'rice_2', 'asagao_3', 'sakura_2'] as const).map((p, i) => ({
        id: `valley_garden_${i}`, sprite: `wgs_${p}`, x: 10 + (i % 2), y: 3 + Math.floor(i / 2), w: 1, h: 1, script: 'valley_garden',
      })),
      { id: 'valley_garden_tag', sprite: 'wgs_tag', x: 9, y: 5, w: 1, h: 1, script: 'valley_garden' },
      // the footbath on the onsen square: talk to it from the square, facing north
      { id: 'valley_ashiyu', x: 35, y: 8, w: 6, h: 1, solid: false, interactAt: [35, 36, 37, 38, 39, 40].map((x) => ({ x, y: 9 })) },
    ],
    npcs: [
      { id: 'hayashi', x: 7, y: 6, facing: 'down' },
      { id: 'sakura_hayashi', x: 24, y: 3, facing: 'right' },
      { id: 'okami', x: 32, y: 15, facing: 'down' },
      { id: 'kenji', x: 24, y: 15, facing: 'down' },
      { id: 'ota', x: 17, y: 15, facing: 'down' },
      { id: 'busdriver', x: 23, y: 21, facing: 'up' },
    ],
    warps: [19, 20, 21].map((x) => ({ x, y: 27, to: { map: 'town', x: 27, y: 20, facing: 'down' as const } })),
    zones: [
      { x0: 25, y0: 1, x1: 32, y1: 4, encounters: 'valley_grove', bg: 'bg_valley_orchard.webp' },
      { x0: 2, y0: 15, x1: 7, y1: 17, encounters: 'valley_river', bg: 'bg_valley_river.webp' },
    ],
    steam: [
      { x: 1000, y: 300, w: 30, depth: 470 }, // behind the inn roof
      { x: 1085, y: 300, w: 30, depth: 470 },
      { x: 1205, y: 270, w: 70 }, // hot-spring falls
      { x: 1240, y: 336, w: 50 }, // footbath on the onsen square
    ],
  },
  mountain: {
    id: 'mountain', name: 'Yukimi Village', nameJa: '雪見村', tiles: MOUNTAIN_GEN, image: 'map_mountain', encounters: 'mountain', snow: true,
    // footprints match tools/build_mountain.py BUILDINGS
    objects: [
      { id: 'yukimi_guesthouse', sprite: 'bx_guesthouse', x: 32, y: 15, w: 6, h: 2 },
      { id: 'yukimi_gassho', sprite: 'bx_gassho', x: 24, y: 14, w: 5, h: 2 },
      { id: 'yukimi_clinic', sprite: 'bx_clinic', x: 25, y: 20, w: 5, h: 2 },
      { id: 'yukimi_temple', sprite: 'bx_temple', x: 18, y: 2, w: 6, h: 2, interactAt: [{ x: 20, y: 4 }, { x: 21, y: 4 }] },
      { id: 'yukimi_station', sprite: 'bx_yukimi_station', x: 1, y: 19, w: 4, h: 2, interactAt: [{ x: 5, y: 19 }, { x: 6, y: 20 }, { x: 3, y: 18 }, { x: 4, y: 18 }] },
      { id: 'yukimi_kamakura', sprite: 'bx_kamakura', x: 17, y: 15, w: 3, h: 1 },
    ],
    npcs: [
      { id: 'tsuru', x: 34, y: 17, facing: 'down' },
      { id: 'hina', x: 19, y: 16, facing: 'down' },
      { id: 'fujii', x: 27, y: 22, facing: 'down' },
      { id: 'kuroda', x: 22, y: 24, facing: 'up' },
      { id: 'jokan', x: 21, y: 4, facing: 'down' },
    ],
    warps: [],
    zones: [
      { x0: 2, y0: 11, x1: 7, y1: 13, encounters: 'mountain_snow' },
      { x0: 37, y0: 10, x1: 40, y1: 13, encounters: 'mountain_lantern' },
    ],
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
    objects: ROOMS_GEN.station.objects,
    npcs: [],
    warps: [
      { x: 10, y: 14, to: { map: 'town', x: 27, y: 20, facing: 'down' } },
      { x: 11, y: 14, to: { map: 'town', x: 27, y: 20, facing: 'down' } },
    ],
  },
};
