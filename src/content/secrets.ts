import type { GameState } from '../core/types';

/**
 * Easter eggs. Each is found once (flag `secret_<id>`) and listed in the menu under
 * ステータス, so players know there is more to discover. The hint is shown while it is
 * still hidden; it should point the way without giving it away.
 */
export interface Secret {
  name: string;
  nameEn: string;
  hint: string;
}

export const SECRETS: Record<string, Secret> = {
  neko: { name: '猫に小判', nameEn: 'Gold coins to a cat', hint: 'The calico cat in town seems to want something. Be patient with it.' },
  konami: { name: '昔の呪文', nameEn: 'An old spell', hint: 'An old famous button sequence still works in this world. ↑ …' },
  atari: { name: '当たり！', nameEn: 'Winner!', hint: 'Some vending machines in Japan give a second drink, if you are lucky.' },
  mirror: { name: '鏡の向こう', nameEn: 'Through the mirror', hint: 'Look into the traffic mirror again and again. Thirteen is a strange number.' },
  manpo: { name: '一万歩', nameEn: 'Ten thousand steps', hint: 'Just keep walking.' },
  yofukashi: { name: '夜ふかし', nameEn: 'Up all night', hint: 'Visit the small roadside shrine in town in the middle of the real night.' },
  shogatsu: { name: 'お正月', nameEn: 'New Year', hint: 'Greet Ms. Mori on the first days of a real new year.' },
  tanabata: { name: '七夕', nameEn: 'Tanabata', hint: 'On a real 7 July, the shrine grants a wish.' },
  name_k: { name: 'もう一人のK', nameEn: 'The other K', hint: 'Some people react to a certain name. Starting a new game might help.' },
};

export function foundSecrets(s: GameState): number {
  return Object.keys(SECRETS).filter((id) => s.flags['secret_' + id]).length;
}
