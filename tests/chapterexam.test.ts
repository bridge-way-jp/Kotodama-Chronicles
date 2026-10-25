import { describe, expect, it } from 'vitest';

describe('chapter exams', () => {
  it('every chapter has a full exam with words, kanji and grammar', async () => {
    const { readFileSync } = await import('node:fs');
    const { registerCurriculum } = await import('../src/core/curriculum');
    const { createInitialState } = await import('../src/core/store');
    const { buildChapterExam } = await import('../src/core/exam');
    registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
    const s = createInitialState('T');
    for (let c = 1; c <= 7; c++) {
      const items = buildChapterExam(s, c);
      expect(items.length).toBeGreaterThanOrEqual(18);
      for (const sec of ['漢字読み', '言い換え類義', '文法形式の判断']) expect(items.some((i) => i.section === sec)).toBe(true);
      for (const i of items) expect(new Set(i.options).size).toBe(i.options.length);
    }
  });
});
