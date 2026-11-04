import { buildEpisodes } from './episodes_dsl';
import { EPISODES_CH1 } from './episodes_ch1';
import { EPISODES_CH2 } from './episodes_ch2';
import { EPISODES_CH3 } from './episodes_ch3';
import { EPISODES_CH4 } from './episodes_ch4';
import { EPISODES_CH5 } from './episodes_ch5';
import { EPISODES_CH6 } from './episodes_ch6';
import { EPISODES_CH7 } from './episodes_ch7';
import { EPISODES_CH1B } from './episodes_ch1b';
import { EPISODES_CH2B } from './episodes_ch2b';
import { EPISODES_CH3B } from './episodes_ch3b';
import { EPISODES_CH4B } from './episodes_ch4b';
import { EPISODES_CH5B } from './episodes_ch5b';
import { EPISODES_CH6B } from './episodes_ch6b';
import { EPISODES_CH7B } from './episodes_ch7b';
import { EPISODES_EX1 } from './episodes_ex1';
import { EPISODES_EX2 } from './episodes_ex2';
import { EPISODES_EX3 } from './episodes_ex3';
import { EPISODES_EX4 } from './episodes_ex4';
import { EPISODES_EX5 } from './episodes_ex5';
import { EPISODES_EX1B } from './episodes_ex1b';
import { EPISODES_EX2B } from './episodes_ex2b';
import { EPISODES_EX6 } from './episodes_ex6';
import { EPISODES_EX7 } from './episodes_ex7';

/** 心の物語 of every chapter (content/episodes_dsl.ts), as quests and dialogue rules */
export const EPISODES = [...EPISODES_CH1, ...EPISODES_CH2, ...EPISODES_CH3, ...EPISODES_CH4, ...EPISODES_CH5, ...EPISODES_CH6, ...EPISODES_CH7, ...EPISODES_CH1B, ...EPISODES_CH2B, ...EPISODES_CH3B, ...EPISODES_CH4B, ...EPISODES_CH5B, ...EPISODES_CH6B, ...EPISODES_CH7B, ...EPISODES_EX1, ...EPISODES_EX2, ...EPISODES_EX3, ...EPISODES_EX4, ...EPISODES_EX5, ...EPISODES_EX1B, ...EPISODES_EX2B, ...EPISODES_EX6, ...EPISODES_EX7];
export const { quests: EPISODE_QUESTS, rules: EPISODE_RULES } = buildEpisodes(EPISODES);
