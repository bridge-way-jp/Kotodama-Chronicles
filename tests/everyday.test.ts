import { describe, expect, it } from 'vitest';
import { EVERYDAY_SPOTS, FORM_CASES, FORM_FIELDS, SHOPS, makeAnnouncement, makeDepartures } from '../src/content/everyday';
import { SCRIPTS } from '../src/content/scripts';

describe('Japan im Alltag', () => {
  it('orders only ask for what is on the menu', () => {
    for (const shop of Object.values(SHOPS)) {
      const ids = new Set(shop.items.map((x) => x.id));
      expect(ids.size).toBe(shop.items.length);
      for (const o of shop.orders) for (const w of o.want) expect(ids.has(w), `${shop.title}: ${w}`).toBe(true);
    }
  });
  it('every spot is a script that offers its scene', () => {
    for (const [id, spot] of Object.entries(EVERYDAY_SPOTS)) {
      const rules = SCRIPTS[id];
      expect(rules, id).toBeTruthy();
      expect(JSON.stringify(rules)).toContain(`alltag:${spot.scene}`);
      expect(spot.scene === 'departure' || spot.scene === 'form' || !!SHOPS[spot.scene]).toBe(true);
    }
  });
  it('form answers fit the fields and differ from the decoys', () => {
    const fields = new Set(FORM_FIELDS.map((f) => f.id));
    for (const c of FORM_CASES) {
      for (const k of Object.keys(c.right)) expect(fields.has(k), k).toBe(true);
      for (const w of c.wrong) expect(Object.values(c.right)).not.toContain(w);
    }
  });
  it('announcements are about a train on the board', () => {
    for (let i = 0; i < 200; i++) {
      const d = makeDepartures();
      expect(new Set(d.map((x) => x.track)).size).toBe(4);
      const a = makeAnnouncement(d);
      expect(a.answer).toBeGreaterThanOrEqual(0);
      expect(a.answer).toBeLessThan(4);
      expect(a.say).toContain(d[a.answer].destKana);
    }
  });
});
