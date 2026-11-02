import { describe, expect, it } from 'vitest';

describe('心の物語 (story episodes)', () => {
  it('each scene says the words it teaches, in German too, and the quests are well-formed', async () => {
    const { readFileSync } = await import('node:fs');
    const { registerCurriculum } = await import('../src/core/curriculum');
    registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
    const { EPISODES } = await import('../src/content/episodes');
    const { QUESTS } = await import('../src/content/quests');
    const { SCRIPTS } = await import('../src/content/scripts');
    const { DE_STORY } = await import('../src/content/de_story');
    const { keyExists } = await import('../src/core/learning');
    const { markupOf } = await import('../src/core/memory');
    const { pathChapterOf } = await import('../src/core/path');
    expect(EPISODES.length).toBeGreaterThanOrEqual(4);
    const taught = new Set<string>();
    for (const ep of EPISODES) {
      expect(QUESTS[ep.id], ep.id).toBeTruthy();
      expect(QUESTS[ep.after], ep.id).toBeTruthy();
      expect(DE_STORY[ep.title[1]]).toBeTruthy();
      for (const sc of ep.scenes) {
        expect(SCRIPTS[sc.at], `${ep.id}: ${sc.at}`).toBeTruthy();
        const text = JSON.stringify(sc.lines);
        for (const k of sc.teach) {
          expect(keyExists(k), `${ep.id}: ${k}`).toBe(true);
          // the word stands in the scene, so the review can bring the moment back
          expect(markupOf(k).test(text), `${ep.id}: ${k} is not said in its scene`).toBe(true);
          // and it belongs to the learning path of this chapter or an earlier one
          expect(pathChapterOf(k), `${ep.id}: ${k}`).toBeGreaterThan(0);
          expect(pathChapterOf(k), `${ep.id}: ${k}`).toBeLessThanOrEqual(ep.chapter);
          expect(taught.has(k), `${ep.id}: ${k} taught twice`).toBe(false);
          taught.add(k);
        }
        // every English line has its German
        for (const m of text.matchAll(/"en":"((?:[^"\\]|\\.)*)"/g)) expect(DE_STORY[JSON.parse(`"${m[1]}"`)], m[1]).toBeTruthy();
      }
    }
  });
});
