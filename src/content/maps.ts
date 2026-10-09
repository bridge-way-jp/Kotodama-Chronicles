import type { Cond } from '../core/script';
import type { Dir } from '../core/types';

/**
 * Tile legend (32×32 world px per tile, textures generated in game/textures.ts)
 *   .  grass        ,  flowers      "  tall grass (encounters on maps with an encounter table)
 *   :  dirt path    =  paved street  ~  water          b  wooden bridge
 *   T  tree         #  fence         r  rail track     p  station platform  P  platform edge
 *   X  facility wall  x  concrete    S  shrine stone
 *   W  interior wall  f  wooden floor  m  tatami / rug  c  counter  D  doormat
 */
export const BLOCKING = new Set(['T', '~', '#', 'r', 'X', 'W', 'c', 'S']);

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
}

const TOWN = [
  'TTTTTTTTTTTTTTTTTTTT::TTTTTTTTTTT~~TTTTTTTTT',
  'TTT.................::........TTT~~T......TT',
  'TT..................::.........TT~~........T',
  'T...................::..,........~~........T',
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
  'T...................::...........~~......TTT',
  'T...................::...........~~..,....TT',
  'T...................::......,....~~.....,..T',
  'T.......,....,......::.......,...~~....,...T',
  'T....,...,..........::....,......~~........T',
  'T...ppppppppppppppppppppppppppp..~~........T',
  'T...ppppppppppppppppppppppppppp..~~........T',
  'T...PPPPPPPPPPPPPPPPPPPPPPPPPPP..~~........T',
  'Trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr~~........T',
  'Trrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr~~........T',
  'TT..............................T~~........T',
  'TTT..""""""""..................TT~~.......TT',
  'TTTT."""""""".................TTT~~TT.....TT',
  'T................................~~........T',
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~TTTTTTTTT',
];

const FOREST = [
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
  'TT..........................TT',
  'TT.""""""T..........T"."""..TT',
  'TT.""."."T..........."""""".TT',
  'TT.""""""..........T."""""".TT',
  'TT.""."""...T.:....T..""""".TT',
  'TT............:......".""."TTT',
  'TT..........:::"""""."".....TT',
  'TT.""""".".T:.."."""""..T...TT',
  'TT."""""""..:.."""""""......TT',
  'TT."""""""..:...............TT',
  'TT..""""""..:::::::.T.....T.TT',
  'TT."".""""..T...T.:.""."""".TT',
  'TT."."".""........:.""."""".TT',
  'TT..T......T......:.".""""..TT',
  'TT................:.""""""".TT',
  'TT....T...:::::::::.""."".".TT',
  'TT."""""".:.................TT',
  'TT."""""..:......""""""~~~~.TT',
  'TT."T"""".:..T.."""""""~~~~.TT',
  'TT."""."".:::::."".."""~~~~.TT',
  'TT."""""".....:..."""""~~~~.TT',
  'TT............:..T..........TT',
  'TTTTTTTTTTTTTT:.TTTTTTTTTTTTTT',
  'TTTTTTTTTTTTTT::TTTTTTTTTTTTTT',
];

const APARTMENT = [
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  'WWWWfWWWWWWW',
  'WWWWfWfWWWWW',
  'WWWWfffffffW',
  'WWWWffffWWWW',
  'WWWfffffWWWW',
  'WWWWWfffWWWW',
  'WWWWWfffWWWW',
  'WfffffffWWWW',
  'WWWWWDDWWWWW',
];

const CAFE = [
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWW',
  'WWWWfffWWWWWW',
  'WccccccccccWW',
  'WccccccccccWW',
  'WWfffffffffWW',
  'WWffffffffffW',
  'WWfWWWWfWWWfW',
  'WWfWWWWfWWWWW',
  'WWfffffffffWW',
  'WWWWWWDWWWWWW',
];

const KONBINI_ROOM = [
  'WWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWfffWWWWWWWW',
  'WWWffffffffffWWWWWWWW',
  'WWWffWWffWWWffWWWWWWW',
  'WWWffWWffWWWffffffWWW',
  'WWWffWWffWWWffWWWfWWW',
  'WWWffWWffWWWffWWWfWWW',
  'WWWffWWffWWWffWWWWWWW',
  'WWWffWWffWWWffWWWWWWW',
  'WWWffWWffWWWfffffWWWW',
  'WWWfffffWfffWffffWWWW',
  'WWWWWWWWWWDWWWWWWWWWW',
];

const LIBRARY_ROOM = [
  'WWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWW',
  'WWfffffffffffffWWWWWWW',
  'WWfWWWWWWWWWWffWWWWWWW',
  'WWfWWWWWWWWWWffWWWWWWW',
  'WWfWWWWWWWWWWffWWWWWWW',
  'WWfWWWWWWWWWWfffffffWW',
  'WWffffffffffffffWfffWW',
  'WWWWWWWffffffWWWWWWWWW',
  'WWWWWWWWffffWWWWWWWWWW',
  'WWWWWWWWWDDWWWWWWWWWWW',
];

const STATION_ROOM = [
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WWffffWWWWWWfWWfffffWWW',
  'WWWfffffffffffffffWWWWW',
  'WWWffWWWWWffWWWWffWWWWW',
  'WWWffWWWWWffWWWWffWWWWW',
  'WWWffffffffffffffffWWWW',
  'WWWffffffffffffffffWWWW',
  'WWWWWWWWWWfffWWWWWWWWWW',
  'WWWWWWWWWWWDWWWWWWWWWWW',
];

export const MAPS: Record<string, MapDef> = {
  town: {
    id: 'town', name: 'Hinomori Town', nameJa: '日野森町', tiles: TOWN, bg: 'bg_town_sunset.webp',
    objects: [
      { id: 'shrine', sprite: 'p_shrine', x: 3, y: 4, w: 4, h: 2, interactAt: [{ x: 4, y: 5 }, { x: 5, y: 5 }] },
      { id: 'sakura1', sprite: 'p_sakura', x: 8, y: 5, w: 2, h: 1, script: 'sakura' },
      { id: 'sakura2', sprite: 'p_sakura', x: 29, y: 15, w: 2, h: 1, script: 'sakura' },
      { id: 'library', sprite: 'b_library2', x: 11, y: 8, w: 3, h: 2 },
      { id: 'konbini', sprite: 'b_konbini2', x: 15, y: 8, w: 4, h: 2 },
      { id: 'konbini_notice', sprite: 'p_board', x: 19, y: 9, w: 1, h: 1 },
      { id: 'cafe', sprite: 'b_inn', x: 23, y: 7, w: 6, h: 3 },
      { id: 'apartment', sprite: 'b_apartment2', x: 3, y: 15, w: 3, h: 2 },
      { id: 'mailbox', sprite: 'p_mailbox', x: 7, y: 16, w: 1, h: 1 },
      { id: 'garden', sprite: 'p_garden', x: 10, y: 15, w: 3, h: 2 },
      { id: 'ramen', sprite: 'b_ramen2', x: 15, y: 15, w: 3, h: 2 },
      { id: 'pond', sprite: 'p_pond', x: 24, y: 15, w: 3, h: 2 },
      { id: 'signpost', sprite: 'p_signpost', x: 22, y: 13, w: 1, h: 1 },
      { id: 'lamp1', sprite: 'p_lamp', x: 9, y: 13, w: 1, h: 1, script: 'lamp' },
      { id: 'lamp2', sprite: 'p_lamp', x: 28, y: 13, w: 1, h: 1, script: 'lamp' },
      { id: 'lamp3', sprite: 'p_lamp', x: 24, y: 19, w: 1, h: 1, script: 'lamp' },
      { id: 'station_banner', sprite: 'p_banner', x: 8, y: 20, w: 1, h: 1 },
      { id: 'old_board', sprite: 'p_board2', x: 13, y: 20, w: 2, h: 1 },
      { id: 'timetable', sprite: 'p_sign_nihon', x: 24, y: 20, w: 1, h: 1 },
      { id: 'forest_sign', sprite: 'p_sign_small', x: 22, y: 2, w: 1, h: 1 },
      { id: 'lab', sprite: 'b_lab', x: 36, y: 5, w: 7, h: 5, script: 'lab_door' },
      { id: 'lab_sign', sprite: 'p_board', x: 36, y: 10, w: 1, h: 1 },
      { id: 'station_building', sprite: 'b_station', x: 25, y: 18, w: 5, h: 2, label: { text: '日野森駅', x: 0.5, y: 0.54 } },
    ],
    npcs: [
      { id: 'mori', x: 6, y: 17, facing: 'down' },
      { id: 'station_staff', x: 18, y: 21, facing: 'down' },
      { id: 'kirishima', x: 38, y: 11, facing: 'left', when: { questDone: 'mq4' } },
    ],
    warps: [
      { x: 4, y: 16, to: { map: 'apartment', x: 5, y: 10, facing: 'up' } },
      { x: 26, y: 9, to: { map: 'cafe', x: 6, y: 10, facing: 'up' } },
      { x: 17, y: 9, to: { map: 'konbini', x: 10, y: 13, facing: 'up' } },
      { x: 12, y: 9, to: { map: 'library', x: 9, y: 13, facing: 'up' } },
      { x: 27, y: 19, to: { map: 'station', x: 11, y: 12, facing: 'up' } },
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
    id: 'forest', name: 'Midori Forest', nameJa: 'みどりの森', tiles: FOREST, encounters: 'forest', bg: 'bg_forest_clearing.webp',
    objects: [
      { id: 'forest_stone', sprite: 'p_hokora', x: 13, y: 3, w: 4, h: 2, interactAt: [{ x: 14, y: 4 }, { x: 15, y: 4 }] },
      { id: 'forest_sign2', sprite: 'p_signpost', x: 16, y: 22, w: 1, h: 1 },
    ],
    npcs: [],
    warps: [
      { x: 14, y: 25, to: { map: 'town', x: 20, y: 1, facing: 'down' } },
      { x: 15, y: 25, to: { map: 'town', x: 21, y: 1, facing: 'down' } },
    ],
  },
  apartment: {
    id: 'apartment', name: 'Your apartment', nameJa: 'アパート', tiles: APARTMENT, interior: true, image: 'room_apartment',
    objects: [
      { id: 'bed', x: 1, y: 2, w: 3, h: 5 },
      { id: 'desk', x: 5, y: 3, w: 3, h: 1 },
      { id: 'shelf', x: 8, y: 2, w: 2, h: 3 },
      { id: 'plant', x: 10, y: 3, w: 2, h: 2 },
      { id: 'kitchen', x: 1, y: 8, w: 4, h: 2 },
      { id: 'kotatsu', x: 8, y: 6, w: 3, h: 3 },
    ],
    npcs: [],
    warps: [
      { x: 5, y: 11, to: { map: 'town', x: 4, y: 17, facing: 'down' } },
      { x: 6, y: 11, to: { map: 'town', x: 4, y: 17, facing: 'down' } },
    ],
  },
  cafe: {
    id: 'cafe', name: 'Café Kotonoha', nameJa: '喫茶ことのは', tiles: CAFE, interior: true, image: 'room_cafe',
    objects: [
      { id: 'cafe_shelf', x: 1, y: 4, w: 3, h: 1 },
      { id: 'cafe_table', x: 3, y: 8, w: 4, h: 2 },
      { id: 'cafe_table2', x: 8, y: 8, w: 3, h: 2, script: 'cafe_table' },
      { id: 'cafe_window', x: 1, y: 6, w: 1, h: 5 },
      { id: 'cafe_plant', x: 11, y: 4, w: 1, h: 2, script: 'plant' },
    ],
    npcs: [
      { id: 'kaede', x: 5, y: 3, facing: 'down' },
      { id: 'aoi', x: 2, y: 8, facing: 'right' },
    ],
    warps: [{ x: 6, y: 11, to: { map: 'town', x: 26, y: 10, facing: 'down' } }],
  },
  konbini: {
    id: 'konbini', name: 'Convenience store', nameJa: 'コンビニ ひのもり店', tiles: KONBINI_ROOM, interior: true, image: 'room_konbini',
    objects: [
      { id: 'konbini_fridge', x: 3, y: 4, w: 5, h: 1 },
      { id: 'konbini_shelf', x: 5, y: 6, w: 2, h: 7 },
      { id: 'konbini_shelf2', x: 9, y: 6, w: 3, h: 7, script: 'konbini_shelf' },
      { id: 'konbini_snacks', x: 14, y: 8, w: 3, h: 4, script: 'konbini_shelf' },
      { id: 'konbini_counter', x: 14, y: 4, w: 6, h: 3 },
    ],
    npcs: [
      { id: 'haruto', x: 16, y: 7, facing: 'down' },
      { id: 'customer', x: 12, y: 8, facing: 'right', when: { notObj: 'mq2.customer' } },
    ],
    warps: [{ x: 10, y: 14, to: { map: 'town', x: 17, y: 10, facing: 'down' } }],
  },
  library: {
    id: 'library', name: 'Hinomori Library', nameJa: '日野森図書館', tiles: LIBRARY_ROOM, interior: true, image: 'room_library',
    objects: [
      { id: 'library_shelf', x: 2, y: 5, w: 12, h: 1 },
      { id: 'library_clock', x: 15, y: 5, w: 1, h: 1 },
      { id: 'library_table', x: 3, y: 7, w: 10, h: 4 },
    ],
    npcs: [{ id: 'sato', x: 17, y: 10, facing: 'down' }],
    warps: [
      { x: 9, y: 14, to: { map: 'town', x: 12, y: 10, facing: 'down' } },
      { x: 10, y: 14, to: { map: 'town', x: 12, y: 10, facing: 'down' } },
    ],
  },
  station: {
    id: 'station', name: 'Station waiting room', nameJa: '日野森駅 待合室', tiles: STATION_ROOM, interior: true, image: 'room_station',
    objects: [
      { id: 'station_timetable', x: 7, y: 6, w: 5, h: 1 },
      { id: 'station_ticket', x: 13, y: 6, w: 2, h: 1 },
      { id: 'station_map', x: 2, y: 5, w: 3, h: 1 },
      { id: 'station_stove', x: 19, y: 10, w: 1, h: 2 },
    ],
    npcs: [],
    warps: [{ x: 11, y: 13, to: { map: 'town', x: 27, y: 20, facing: 'down' } }],
  },
};
