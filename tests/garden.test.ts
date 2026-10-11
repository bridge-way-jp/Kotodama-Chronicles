import { describe, expect, it } from 'vitest';
import { plantKind, plantStage } from '../src/core/garden';
import { newCard, DAY } from '../src/core/srs';

const now = Date.UTC(2026, 9, 1);

describe('word garden', () => {
  it('picks a plant per kind of item', () => {
    expect(plantKind('g:uchini')).toBe('asagao');
    expect(plantKind('k:hai')).toBe('sakura');
    expect(['peach', 'grape']).toContain(plantKind('v:kajuen'));
    expect(plantKind('v:hikkoshi')).toBe('sunflower');
  });

  it('grows with memory and wilts when overdue', () => {
    const c = newCard('v:kajuen', now);
    expect(plantStage(c, now)).toBe(0); // only met
    c.introduced = true;
    c.history.push({ t: now, ok: true, mode: 'meaning', ms: 2000 });
    c.interval = 1;
    c.due = now + DAY;
    expect(plantStage(c, now)).toBe(1);
    c.interval = 5;
    expect(plantStage(c, now)).toBe(2);
    c.interval = 30;
    expect(plantStage(c, now)).toBe(3);
    c.due = now - 2 * DAY;
    expect(plantStage(c, now)).toBe(4);
  });
});
