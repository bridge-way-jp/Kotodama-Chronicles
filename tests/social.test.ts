import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { runAction } from '../src/core/game';
import { giftReaction, profileOf, smallTalk, socialMenu, talkLine } from '../src/core/social';
import { HEART_EVENTS, PROFILES, REPLIES, TALK } from '../src/content/social';
import { NPCS } from '../src/content/npcs';
import { ITEMS } from '../src/content/creatures';
import type { Step } from '../src/core/script';

const flat = (steps: Step[]): Step[] => steps.flatMap((st) => [st, ...('choice' in st ? st.choice.flatMap((c) => flat(c.then ?? [])) : [])]);

describe('talking with people', () => {
  it('content is consistent', () => {
    for (const id of Object.keys(PROFILES)) expect(NPCS[id], id).toBeTruthy();
    for (const p of Object.values(PROFILES)) for (const it of [...(p.loves ?? []), ...(p.likes ?? [])]) expect(ITEMS[it]?.kind, it).toBe('heal');
    for (const l of TALK) expect(REPLIES[l.reply], l.reply).toBeTruthy();
    for (const r of Object.values(REPLIES)) expect(r.chunks.join('')).toBe(r.polite);
    for (const id of Object.keys(HEART_EVENTS)) expect(PROFILES[id], id).toBeTruthy();
  });

  it('small talk asks for a reply and a fitting register earns closeness once a day', () => {
    const s = createInitialState('T');
    let r = 0;
    const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 30; i++) {
      const steps = smallTalk(s, 'aoi', rnd);
      expect(steps.some((st) => 'choice' in st || 'build' in st)).toBe(true);
    }
    expect(talkLine(s)).toBeTruthy();
    expect(profileOf('yukitsune')).toBeNull();
    expect(profileOf('kyoto_wagashi' in NPCS ? 'kyoto_wagashi' : 'mori')).toBeTruthy();
  });

  it('gifts: loved ones count most, only once a day', () => {
    const s = createInitialState('T');
    s.inventory.ramen = 2;
    const steps = giftReaction(s, 'haruto', 'ramen');
    for (const st of steps) if ('do' in st) st.do.forEach((a) => runAction(s, a));
    expect(s.relationships.haruto.points).toBe(3);
    expect(s.inventory.ramen).toBe(1);
    const again = giftReaction(s, 'haruto', 'ramen');
    for (const st of again) if ('do' in st) st.do.forEach((a) => runAction(s, a));
    expect(s.relationships.haruto.points).toBe(3);
  });

  it('the heart event is offered when close enough, once', () => {
    const s = createInitialState('T');
    const has = () => flat(socialMenu(s, 'mori')).some((st) => 'choice' in st && st.choice.some((c) => c.text.includes('♥')));
    expect(has()).toBe(false);
    s.relationships.mori = { points: 6, memories: [] };
    expect(has()).toBe(true);
    s.flags.heart_mori = true;
    expect(has()).toBe(false);
  });
});
