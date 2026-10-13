import { describe, expect, it } from 'vitest';
import { SCRIPTS } from '../src/content/scripts';
import { VOCAB_BY_ID } from '../src/content/vocab';
import { GRAMMAR_BY_ID } from '../src/content/grammar';
import { KANJI_BY_ID } from '../src/content/kanji';
import { QUESTS } from '../src/content/quests';
import { NPCS } from '../src/content/npcs';
import { MAPS } from '../src/content/maps';
import { ITEMS, SPECIES } from '../src/content/creatures';
import { NOTES } from '../src/content/society';

const text = JSON.stringify(SCRIPTS);

describe('story content references', () => {
  it('every card key used in scripts exists', () => {
    const keys = new Set([...text.matchAll(/\b([vgk]):([a-z0-9_]+)/g)].map((m) => `${m[1]}:${m[2]}`));
    const missing = [...keys].filter(
      (k) => !(k.startsWith('v:') ? VOCAB_BY_ID[k.slice(2)] : k.startsWith('g:') ? GRAMMAR_BY_ID[k.slice(2)] : KANJI_BY_ID[k.slice(2)]),
    );
    expect(keys.size).toBeGreaterThan(50);
    expect(missing).toEqual([]);
  });

  it('every speaker, quest objective, item, species and warp target exists', () => {
    const who = [...text.matchAll(/"who":"([^"]+)"/g)].map((m) => m[1]).filter((w) => !NPCS[w]);
    const objectives = [...text.matchAll(/"(?:obj|notObj|objective)":"([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => {
        const [q, o] = p.split('.');
        return !QUESTS[q]?.objectives.some((x) => x.id === o);
      });
    const quests = [...text.matchAll(/"(?:startQuest|questActive|questDone|questNotStarted)":"([^"]+)"/g)].map((m) => m[1]).filter((q) => !QUESTS[q]);
    const items = [...text.matchAll(/"(?:give|take|item)":"([^"]+)"/g)].map((m) => m[1]).filter((i) => !ITEMS[i]);
    const species = [...text.matchAll(/"species":"([^"]+)"/g)].map((m) => m[1]).filter((sp) => !SPECIES[sp]);
    const warps = [...text.matchAll(/"warp":\{"map":"([^"]+)"/g)].map((m) => m[1]).filter((m) => !MAPS[m]);
    expect({ who, objectives, quests, items, species, warps }).toEqual({ who: [], objectives: [], quests: [], items: [], species: [], warps: [] });
  });

  it('every Japan note that scripts unlock exists, and every note is unlocked somewhere', () => {
    const used = new Set([...text.matchAll(/"note":"([^"]+)"/g)].map((m) => m[1]));
    expect([...used].filter((id) => !NOTES[id])).toEqual([]);
    expect(Object.keys(NOTES).filter((id) => !used.has(id))).toEqual([]);
  });

  it('map NPCs and warps point at real things', () => {
    for (const m of Object.values(MAPS)) {
      for (const n of m.npcs) expect(NPCS[n.id], `${m.id}: npc ${n.id}`).toBeTruthy();
      for (const w of m.warps) expect(MAPS[w.to.map], `${m.id}: warp to ${w.to.map}`).toBeTruthy();
    }
  });
});
