import { describe, expect, it } from 'vitest';
import { normalizeKana, romajiToHiragana } from '../src/core/romaji';

describe('romaji input', () => {
  it.each([
    ['iiwake', 'いいわけ'],
    ['shuushuu', 'しゅうしゅう'],
    ['ryoushuusho', 'りょうしゅうしょ'],
    ['hikkoshi', 'ひっこし'],
    ['kanrinin', 'かんりにん'],
    ['onna', 'おんな'],
    ['tachiirikinshi', 'たちいりきんし'],
    ['chien', 'ちえん'],
  ])('%s -> %s', (r, k) => expect(romajiToHiragana(r)).toBe(k));

  it('normalises katakana and spaces', () => {
    expect(normalizeKana(' カンリニン ')).toBe('かんりにん');
  });
});
