import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { encounter, exerciseFor, recordAnswer } from '../src/core/learning';
import { clearLines } from '../src/core/memory';
import { wordToUnderstand } from '../src/ui/Understand';

describe('story lines ask for words from earlier', () => {
  const line = '雪のせいで、電車に遅延が出ているらしい。';
  it('a word met before the scene is checked, in plain text too', () => {
    const s = createInitialState('T');
    clearLines();
    encounter(s, ['v:chien']);
    s.cards['v:chien'].firstSeen -= 3600_000;
    expect(wordToUnderstand(s, line, Date.now())).toEqual({ key: 'v:chien', surface: '遅延' });
  });
  it('not a word met just now, never met, or sitting firmly', () => {
    const s = createInitialState('T');
    expect(wordToUnderstand(s, line, Date.now())).toBeNull();
    encounter(s, ['v:chien']);
    expect(wordToUnderstand(s, line, Date.now())).toBeNull(); // met a moment ago
    const c = s.cards['v:chien'];
    c.firstSeen -= 3600_000;
    for (let i = 0; i < 6; i++) recordAnswer(s, exerciseFor(s, 'v:chien'), true, 2000, undefined, Date.now() + i * 40 * 86400_000);
    expect(wordToUnderstand(s, line, Date.now())).toBeNull(); // mature
  });
});
