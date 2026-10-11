import type { Card, GameState } from './types';
import { DAY, mastery } from './srs';
import { VOCAB_BY_ID } from '../content/vocab';

/**
 * The word garden (the Stardew part): every word the player has met is a plant.
 * Seed = only met, sprout = learning, young plant = known for a few days, in bloom = long-term memory.
 * Plants wilt when their review is more than a day overdue or the item keeps being missed;
 * reviewing ("watering") brings them back.
 */
export type PlantKind = 'sakura' | 'peach' | 'grape' | 'rice' | 'sunflower' | 'asagao';
export type PlantStage = 0 | 1 | 2 | 3 | 4; // seed, sprout, young, bloom, wilted

export interface Plant {
  key: string;
  kind: PlantKind;
  stage: PlantStage;
  thirsty: boolean;
}

export function plantKind(key: string): PlantKind {
  const [t, id] = key.split(':');
  if (t === 'g') return 'asagao';
  if (t === 'k') return 'sakura';
  const v = VOCAB_BY_ID[id];
  if (v?.source === 'jlpt') return 'rice';
  if (v?.chapter === 2) return id.length % 2 ? 'grape' : 'peach';
  return 'sunflower';
}

export function plantStage(card: Card, now = Date.now()): PlantStage {
  const m = mastery(card);
  if (m === 'seen') return 0;
  if (m === 'struggling' || card.due < now - DAY) return 4;
  if (m === 'learning') return 1;
  if (m === 'young') return 2;
  return 3;
}

export function garden(s: GameState, now = Date.now()): Plant[] {
  return Object.values(s.cards)
    .map((c) => ({ key: c.key, kind: plantKind(c.key), stage: plantStage(c, now), thirsty: c.introduced && c.due <= now }))
    .sort((a, b) => a.kind.localeCompare(b.kind) || b.stage - a.stage);
}
