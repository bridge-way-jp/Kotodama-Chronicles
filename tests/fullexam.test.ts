import { describe, expect, it } from 'vitest';

describe('full mock exam', () => {
  it('has the length and parts of the real N2, and is scored like the JLPT', async () => {
    const { readFileSync } = await import('node:fs');
    const { registerCurriculum } = await import('../src/core/curriculum');
    const { buildFullExam, jlptScore } = await import('../src/core/exam');
    const { N2_LISTENING, N2_READING } = await import('../src/content/practice_n2');
    const { DE } = await import('../src/content/de');
    registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
    for (let k = 0; k < 5; k++) {
      const items = buildFullExam();
      const n = (sec: string) => items.filter((i) => i.section === sec).length;
      expect(items.length).toBeGreaterThanOrEqual(90);
      expect(n('読解')).toBeGreaterThanOrEqual(19);
      expect(n('聴解')).toBeGreaterThanOrEqual(28);
      // listening comes last, after the break
      expect(items.findIndex((i) => i.section === '聴解')).toBe(items.length - n('聴解'));
      expect(new Set(items.map((i) => i.id)).size).toBe(items.length);
      for (const i of items) expect(new Set(i.options).size).toBe(i.options.length);
    }
    const sec = (ok: number, total: number) => ({ ok, total, ms: 0 });
    expect(jlptScore({ 漢字読み: sec(10, 20), 読解: sec(10, 20), 聴解: sec(10, 20) })).toMatchObject({ total: 90, pass: true });
    expect(jlptScore({ 漢字読み: sec(20, 20), 読解: sec(20, 20), 聴解: sec(5, 20) })).toMatchObject({ listening: 15, pass: false });
    // every new text and explanation has its German
    for (const t of [...N2_READING, ...N2_LISTENING]) {
      expect(DE[t.en], t.id).toBeTruthy();
      for (const q of t.questions) expect(DE[q.why], t.id).toBeTruthy();
    }
  });
});
