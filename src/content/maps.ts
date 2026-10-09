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
  bg?: string; // battle background
}

const TOWN = [
  'TTTTTTTTTTTTTTTTTTTT::TTTTTTTTTTT~~TTTTTTTTT',
  'TTT.................::........TTT~~T......TT',
  'TT..................::.........TT~~########T',
  'T...................::..,........~~#XXXXXXXT',
  'T...................::.,.........~~#XXXXXXXT',
  'T..............,....::......,....~~#XXXXXXXT',
  'T.............,.....::...........~~#XXXXXXXT',
  'T..,................::...........~~#XXXXXXXT',
  'T...,...............::...........~~#XXXXXXXT',
  'T......,............::...........~~#XXXXXXXT',
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
  'TT.""""""T...::::...T"."""..TT',
  'TT.""."."T...::::...."""""".TT',
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
  'WWWWWWWWW',
  'WWWWWWWWW',
  'Wfffffffw',
  'Wffmmmffw',
  'Wffmmmffw',
  'WfffffffW',
  'WWWWDWWWW',
].map((r) => r.replace(/w/g, 'W'));

const CAFE = [
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
  'Wfffffffffw',
  'Wcccccffffw',
  'Wffffffmmfw',
  'Wffffffmmfw',
  'Wfffffffffw',
  'WWWWWDWWWWW',
].map((r) => r.replace(/w/g, 'W'));

export const MAPS: Record<string, MapDef> = {
  town: {
    id: 'town', name: 'Hinomori Town', nameJa: '日野森町', tiles: TOWN, bg: 'bg_bridge',
    objects: [
      { id: 'shrine', sprite: 'p_shrine', x: 3, y: 4, w: 4, h: 2, interactAt: [{ x: 4, y: 5 }, { x: 5, y: 5 }] },
      { id: 'sakura1', sprite: 'p_sakura', x: 8, y: 5, w: 2, h: 1, script: 'sakura' },
      { id: 'sakura2', sprite: 'p_sakura', x: 29, y: 15, w: 2, h: 1, script: 'sakura' },
      { id: 'library', sprite: 'b_house_trad', x: 11, y: 8, w: 3, h: 2 },
      { id: 'konbini', sprite: 'b_konbini', x: 15, y: 8, w: 4, h: 2 },
      { id: 'konbini_notice', sprite: 'p_board', x: 19, y: 9, w: 1, h: 1 },
      { id: 'cafe', sprite: 'b_inn', x: 23, y: 7, w: 6, h: 3 },
      { id: 'apartment', sprite: 'b_house_blue', x: 3, y: 15, w: 3, h: 2 },
      { id: 'mailbox', sprite: 'p_mailbox', x: 7, y: 16, w: 1, h: 1 },
      { id: 'garden', sprite: 'p_garden', x: 10, y: 15, w: 3, h: 2 },
      { id: 'ramen', sprite: 'b_shop_red', x: 15, y: 15, w: 3, h: 2 },
      { id: 'pond', sprite: 'p_pond', x: 24, y: 15, w: 3, h: 2 },
      { id: 'signpost', sprite: 'p_signpost', x: 22, y: 13, w: 1, h: 1 },
      { id: 'lamp1', sprite: 'p_lamp', x: 9, y: 13, w: 1, h: 1, script: 'lamp' },
      { id: 'lamp2', sprite: 'p_lamp', x: 28, y: 13, w: 1, h: 1, script: 'lamp' },
      { id: 'lamp3', sprite: 'p_lamp', x: 25, y: 19, w: 1, h: 1, script: 'lamp' },
      { id: 'station_banner', sprite: 'p_banner', x: 8, y: 20, w: 1, h: 1 },
      { id: 'old_board', sprite: 'p_board2', x: 13, y: 20, w: 2, h: 1 },
      { id: 'timetable', sprite: 'p_sign_nihon', x: 24, y: 20, w: 1, h: 1 },
      { id: 'forest_sign', sprite: 'p_sign_small', x: 22, y: 2, w: 1, h: 1 },
      { id: 'lab_door', x: 39, y: 9, w: 1, h: 1 },
      { id: 'lab_sign', sprite: 'p_board', x: 36, y: 10, w: 1, h: 1 },
    ],
    npcs: [
      { id: 'mori', x: 6, y: 17, facing: 'down' },
      { id: 'haruto', x: 17, y: 10, facing: 'down' },
      { id: 'customer', x: 19, y: 11, facing: 'left', when: { notObj: 'mq2.customer' } },
      { id: 'sato', x: 14, y: 10, facing: 'down' },
      { id: 'station_staff', x: 18, y: 21, facing: 'down' },
      { id: 'kirishima', x: 38, y: 11, facing: 'left', when: { questDone: 'mq4' } },
    ],
    warps: [
      { x: 4, y: 16, to: { map: 'apartment', x: 4, y: 5, facing: 'up' } },
      { x: 26, y: 9, to: { map: 'cafe', x: 5, y: 6, facing: 'up' } },
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
    id: 'forest', name: 'Midori Forest', nameJa: 'みどりの森', tiles: FOREST, encounters: 'forest', bg: 'bg_forest',
    objects: [
      { id: 'forest_stone', sprite: 'p_sign_nihon', x: 14, y: 2, w: 2, h: 1, interactAt: [{ x: 14, y: 2 }, { x: 15, y: 2 }] },
      { id: 'forest_lamp1', sprite: 'p_lamp', x: 12, y: 3, w: 1, h: 1, script: 'lamp' },
      { id: 'forest_lamp2', sprite: 'p_lamp', x: 17, y: 3, w: 1, h: 1, script: 'lamp' },
      { id: 'forest_sign2', sprite: 'p_signpost', x: 16, y: 22, w: 1, h: 1 },
    ],
    npcs: [],
    warps: [
      { x: 14, y: 25, to: { map: 'town', x: 20, y: 1, facing: 'down' } },
      { x: 15, y: 25, to: { map: 'town', x: 21, y: 1, facing: 'down' } },
    ],
  },
  apartment: {
    id: 'apartment', name: 'Your apartment', nameJa: 'アパート', tiles: APARTMENT, interior: true,
    objects: [
      { id: 'bed', sprite: 'gen_bed', x: 1, y: 2, w: 1, h: 2 },
      { id: 'desk', sprite: 'gen_desk', x: 6, y: 2, w: 2, h: 1 },
      { id: 'shelf', sprite: 'gen_shelf', x: 3, y: 1, w: 2, h: 1, interactAt: [{ x: 3, y: 1 }, { x: 4, y: 1 }] },
      { id: 'plant', sprite: 'gen_plant', x: 7, y: 5, w: 1, h: 1 },
      { id: 'window', sprite: 'gen_window', x: 6, y: 1, w: 2, h: 1, solid: true },
    ],
    npcs: [],
    warps: [{ x: 4, y: 6, to: { map: 'town', x: 4, y: 17, facing: 'down' } }],
  },
  cafe: {
    id: 'cafe', name: 'Café Kotonoha', nameJa: '喫茶ことのは', tiles: CAFE, interior: true,
    objects: [
      { id: 'cafe_shelf', sprite: 'gen_shelf', x: 1, y: 1, w: 2, h: 1, script: 'cafe_shelf' },
      { id: 'cafe_window', sprite: 'gen_window', x: 7, y: 1, w: 2, h: 1, solid: true },
      { id: 'cafe_table', sprite: 'gen_table', x: 7, y: 4, w: 2, h: 2 },
      { id: 'cafe_plant', sprite: 'gen_plant', x: 9, y: 2, w: 1, h: 1, script: 'plant' },
      { id: 'cafe_plant2', sprite: 'gen_plant', x: 1, y: 6, w: 1, h: 1, script: 'plant' },
    ],
    npcs: [
      { id: 'kaede', x: 3, y: 2, facing: 'down' },
      { id: 'aoi', x: 6, y: 5, facing: 'right' },
    ],
    warps: [{ x: 5, y: 7, to: { map: 'town', x: 26, y: 10, facing: 'down' } }],
  },
};
