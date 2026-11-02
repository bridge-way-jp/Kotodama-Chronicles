import { describe, expect, it } from 'vitest';

describe('learning path', () => {
  it('splits the whole N2 over the chapters and holds the story until the chapter is studied', async () => {
    const { readFileSync } = await import('node:fs');
    const { registerCurriculum } = await import('../src/core/curriculum');
    const { createInitialState } = await import('../src/core/store');
    const { PATH_CHAPTERS, pathItems, pathStatus, storyGate, examReady, DUE_LIMIT } = await import('../src/core/path');
    const { VOCAB } = await import('../src/content/vocab');
    const { GRAMMAR } = await import('../src/content/grammar');
    const { review, newCard } = await import('../src/core/srs');
    const { QUESTS } = await import('../src/content/quests');
    registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
    const all = Array.from({ length: PATH_CHAPTERS }, (_, i) => pathItems(i + 1)).flat();
    // every N2 word, every grammar point and the whole N3 base are on the path, each once
    expect(new Set(all).size).toBe(all.length);
    for (const v of VOCAB.filter((x) => x.level === 'N2' || (x.level === 'N3' && x.chapter === 0))) expect(all, v.id).toContain('v:' + v.id);
    for (const g of GRAMMAR) expect(all).toContain('g:' + g.id);
    for (let c = 1; c <= PATH_CHAPTERS; c++) expect(pathItems(c).length).toBeGreaterThan(400);

    const s = createInitialState('T');
    // the first story goal of a chapter is free
    expect(storyGate(s, 0).ok).toBe(true);
    // after two of the chapter's goals, two shares of the chapter must be studied
    const goals = Object.values(QUESTS).filter((q) => q.kind === 'main' && q.chapter === 1).flatMap((q) => q.objectives.map((o) => [q.id, o.id]));
    for (const [q, o] of goals.slice(0, 2)) {
      s.quests[q] ??= { id: q, status: 'active', objectives: {}, startedAt: 0 } as any;
      s.quests[q].objectives[o] = true;
    }
    const g = storyGate(s, 0);
    expect(g.ok).toBe(false);
    expect(g.reason).toBe('study');
    expect(g.need).toBe(Math.floor((pathStatus(s, 1).total * 2) / goals.length));
    for (const k of pathItems(1).slice(0, g.need)) review((s.cards[k] = newCard(k)), 4);
    expect(storyGate(s, 0).ok).toBe(true);
    // too many reviews due hold the story as well
    expect(storyGate(s, DUE_LIMIT + 1).reason).toBe('due');
    // switched off in the settings, nothing waits
    s.settings.pathGate = false;
    expect(storyGate(s, DUE_LIMIT + 1).ok).toBe(true);
    s.settings.pathGate = true;
    // the chapter exam needs the whole chapter studied and most of it held
    expect(examReady(s, 1).ok).toBe(false);
    for (const k of pathItems(1)) {
      const c = (s.cards[k] ??= newCard(k));
      review(c, 4);
      review(c, 4);
      c.history.push({ t: 0, ok: true, mode: 'test', ms: 1000 });
    }
    expect(examReady(s, 1).ok).toBe(true);
  });

  it('the placement test marks quick right answers as known and the rest as met', async () => {
    const { readFileSync } = await import('node:fs');
    const { registerCurriculum } = await import('../src/core/curriculum');
    const { createInitialState } = await import('../src/core/store');
    const { buildPlacementSession, recordPlacement } = await import('../src/core/learning');
    const { mastery } = await import('../src/core/srs');
    const { VOCAB_BY_ID } = await import('../src/content/vocab');
    registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
    const s = createInitialState('T');
    const items = buildPlacementSession(s, 10);
    expect(items.length).toBe(10);
    expect(items.every((x) => VOCAB_BY_ID[x.key!.slice(2)].level === 'N3')).toBe(true);
    recordPlacement(s, items[0], true, 2000);
    recordPlacement(s, items[1], true, 20_000);
    recordPlacement(s, items[2], false, 2000);
    expect(mastery(s.cards[items[0].key!])).toBe('young');
    expect(s.cards[items[1].key!].introduced).toBe(false);
    expect(s.cards[items[2].key!].introduced).toBe(false);
    expect(s.daily.newIntroduced).toBe(0);
  });
});
