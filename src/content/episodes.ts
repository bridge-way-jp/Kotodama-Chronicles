import { buildEpisodes } from './episodes_dsl';
import { EPISODES_CH1 } from './episodes_ch1';
import { EPISODES_CH2 } from './episodes_ch2';
import { EPISODES_CH3 } from './episodes_ch3';
import { EPISODES_CH4 } from './episodes_ch4';
import { EPISODES_CH5 } from './episodes_ch5';
import { EPISODES_CH6 } from './episodes_ch6';

/** 心の物語 of every chapter (content/episodes_dsl.ts), as quests and dialogue rules */
export const EPISODES = [...EPISODES_CH1, ...EPISODES_CH2, ...EPISODES_CH3, ...EPISODES_CH4, ...EPISODES_CH5, ...EPISODES_CH6];
export const { quests: EPISODE_QUESTS, rules: EPISODE_RULES } = buildEpisodes(EPISODES);
