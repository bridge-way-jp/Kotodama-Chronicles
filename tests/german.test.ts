import { describe, expect, it } from 'vitest';
import { GRAMMAR } from '../src/content/grammar';
import { KANJI } from '../src/content/kanji';
import { DE } from '../src/content/de';
import { tr } from '../src/core/i18n';
import { readFileSync } from 'node:fs';
import type { CurriculumData } from '../src/core/curriculum';

describe('German learning texts', () => {
  it('every grammar point and kanji has its German meaning and explanation', () => {
    const missing: string[] = [];
    for (const g of GRAMMAR) {
      if (g.source === 'anki') continue; // imported ones are German already
      for (const t of [g.meaning, g.explanation, g.nuance, g.mistakes, ...g.examples.map((e) => e.en), ...g.exercises.flatMap((e) => [e.en, e.why])])
        if (t && /[A-Za-z]{3}/.test(t) && !DE[t.trim()]) missing.push(t);
    }
    for (const k of KANJI) if (!DE[k.meaning.trim()]) missing.push(k.meaning);
    expect(missing).toEqual([]);
  });

  it('every curriculum word and kanji carries a German meaning', () => {
    const d: CurriculumData = JSON.parse(readFileSync('public/data/jlpt.json', 'utf8'));
    expect(d.vocab.filter((v) => !v.de).map((v) => v.word)).toEqual([]);
    expect(d.kanji.filter((k) => !k.de).map((k) => k.char)).toEqual([]);
  });

  it('two meanings that differ in English stay different in German (no identical answer options)', () => {
    const clash = (xs: string[]) => {
      const seen = new Map<string, string>();
      const out: string[] = [];
      for (const en of new Set(xs)) {
        const de = tr(en, true);
        if (seen.has(de) && seen.get(de) !== en) out.push(`${seen.get(de)} / ${en} → ${de}`);
        seen.set(de, en);
      }
      return out;
    };
    expect(clash(KANJI.map((k) => k.meaning))).toEqual([]);
    expect(clash(GRAMMAR.map((g) => g.meaning))).toEqual([]);
  });

  it('composed lines are translated piece by piece and a Japanese lead-in is kept', () => {
    const g = GRAMMAR.find((x) => x.source !== 'anki' && DE[x.meaning])!;
    expect(tr(`**${g.pattern}** — ${g.meaning}`, true)).toBe(`**${g.pattern}** — ${DE[g.meaning]}`);
    expect(tr('もう一度！ How is this word read?', true)).toBe('もう一度！ Wie wird dieses Wort gelesen?');
    expect(tr('How is this word read?', false)).toBe('How is this word read?');
  });
});

describe('older saves', () => {
  it('switch to German meanings once, and keep a later choice', async () => {
    const { validateEnvelope, makeEnvelope } = await import('../src/core/save');
    const { createInitialState } = await import('../src/core/store');
    const s = createInitialState('マリア');
    s.settings.meaningLang = 'en';
    delete (s.flags as Record<string, unknown>).lang_de;
    const env = validateEnvelope(JSON.parse(JSON.stringify(makeEnvelope(s))));
    expect(env.state.settings.meaningLang).toBe('de');
    env.state.settings.meaningLang = 'en';
    expect(validateEnvelope(JSON.parse(JSON.stringify(env))).state.settings.meaningLang).toBe('en');
  });
});

describe('story and menu texts', () => {
  it('switch to German and back in place', async () => {
    const { localizeContent } = await import('../src/core/localize');
    const { QUESTS } = await import('../src/content/quests');
    const q = Object.values(QUESTS)[0];
    const en = q.titleEn;
    localizeContent('de');
    expect(q.titleEn).not.toBe(en);
    localizeContent('en');
    expect(q.titleEn).toBe(en);
  });

  it('a screen text keeps its Japanese and translates its English', async () => {
    const { translateText } = await import('../src/ui/domTranslate');
    expect(translateText('今日の目標 Daily goal')).toBe('今日の目標 Tagesziel');
    expect(translateText(' Save now ')).toBe(' Jetzt speichern ');
    expect(translateText('こんにちは')).toBeNull();
  });
});
