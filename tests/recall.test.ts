import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { encounter, exerciseFor, recordAnswer } from '../src/core/learning';
import { clearLines, cueLine, noteLine } from '../src/core/memory';
import { echoFor, markEcho, originOf, palace, placeSession, staticOrigin } from '../src/core/recall';

describe('memories', () => {
  it('a word keeps the place, the person and the line it was met in', () => {
    const s = createInitialState('T');
    s.map = 'town';
    clearLines();
    noteLine('mori', 'この{瓶|びん}は{懐かしい|なつかしい|v:natsukashii}ね。', 'This jar is nostalgic.');
    noteLine(undefined, 'ふうん。');
    encounter(s, ['v:natsukashii']);
    const o = s.cards['v:natsukashii'].origin!;
    expect(o).toMatchObject({ map: 'town', who: 'mori', en: 'This jar is nostalgic.' });
    expect(cueLine(o, 'v:natsukashii')).toContain('？');
    expect(cueLine(o, 'v:natsukashii')).not.toContain('懐かしい');
  });

  it('without a scene there is no made-up memory, but the scripts know one', () => {
    const s = createInitialState('T');
    clearLines();
    encounter(s, ['v:natsukashii']);
    expect(s.cards['v:natsukashii'].origin).toBeUndefined();
    const st = staticOrigin('v:natsukashii');
    expect(st?.script).toBe('cafe_shelf');
    expect(originOf(s, 'v:natsukashii')?.map).toBe(st?.map);
  });

  it('the person asks about a word heard from them on a later day, once a day', () => {
    const s = createInitialState('T');
    s.map = 'town';
    clearLines();
    noteLine('mori', '{懐かしい|なつかしい|v:natsukashii}でしょう？');
    encounter(s, ['v:natsukashii']);
    const now = Date.now();
    expect(echoFor(s, 'mori', now)).toBeNull(); // just heard
    s.day++;
    expect(echoFor(s, 'mori', now)).toBe('v:natsukashii');
    expect(echoFor(s, 'sato', now)).toBeNull(); // someone else did not say it
    markEcho(s, 'mori');
    expect(echoFor(s, 'mori', now)).toBeNull();
    s.day++;
    s.settings.echoes = false;
    expect(echoFor(s, 'mori', now)).toBeNull();
  });

  it('a studied word comes back with its person only when it is due', () => {
    const s = createInitialState('T');
    s.map = 'town';
    clearLines();
    noteLine('mori', '{懐かしい|なつかしい|v:natsukashii}');
    encounter(s, ['v:natsukashii']);
    const ex = exerciseFor(s, 'v:natsukashii');
    recordAnswer(s, ex, true, 3000);
    s.day += 1;
    expect(echoFor(s, 'mori', Date.now())).toBeNull();
    expect(echoFor(s, 'mori', s.cards['v:natsukashii'].due + 1)).toBe('v:natsukashii');
  });

  it('the memory palace groups words by place and reviews one place', () => {
    const s = createInitialState('T');
    s.map = 'town';
    clearLines();
    noteLine('mori', '{懐かしい|なつかしい|v:natsukashii}');
    encounter(s, ['v:natsukashii']);
    recordAnswer(s, exerciseFor(s, 'v:natsukashii'), true, 3000);
    const p = palace(s).find((x) => x.map === 'town');
    expect(p?.keys).toContain('v:natsukashii');
    expect(placeSession(s, 'town').map((e) => e.key)).toContain('v:natsukashii');
  });
});
