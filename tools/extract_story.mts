/**
 * Collects the English story and menu texts of the content (dialogue translations, quests, items,
 * Kotodama, people, places) that have no German yet in src/content/de_story.ts.
 * npx vite-node tools/extract_story.mts <out.json>
 */
import fs from 'node:fs';
import { DE } from '../src/content/de';
import { DE_STORY } from '../src/content/de_story';
import { VOCAB } from '../src/content/vocab';

// word meanings have their own German (vocab.de, de.ts)
const WORDS = new Set(VOCAB.flatMap((v) => [v.en, v.exampleEn]));

const KEYS = new Set(['en', 'desc', 'descEn', 'text', 'description', 'nameEn', 'titleEn', 'role', 'hint', 'note', 'personality', 'mood', 'say', 'name', 'sub', 'label']);
const english = (t: string) => /[A-Za-z]{3,}/.test(t) && !/[ぁ-んァ-ン一-龯]/.test(t.replace(/[{][^}]*[}]/g, '').slice(0, 12)) || /^[^ぁ-んァ-ン一-龯]*[A-Za-z]{3,} [A-Za-z]{2,}/.test(t);
const out = new Set<string>();
const files = fs.readdirSync('src/content').filter((f) => f.endsWith('.ts') && !f.startsWith('de'));
for (const f of files) {
  const m = await import(process.cwd() + '/src/content/' + f);
  const seen = new Set<unknown>();
  const walk = (x: any, k = '') => {
    if (typeof x === 'string') {
      const t = x.trim();
      if (KEYS.has(k) && english(t) && !DE[t] && !DE_STORY[t] && !WORDS.has(t) && !/^[a-z0-9_]+$/.test(t)) out.add(t);
      return;
    }
    if (!x || typeof x !== 'object' || seen.has(x)) return;
    seen.add(x);
    if (Array.isArray(x)) return x.forEach((v) => walk(v, k));
    for (const [kk, v] of Object.entries(x)) walk(v, kk);
  };
  for (const v of Object.values(m)) walk(v);
}
const list = [...out];
fs.writeFileSync(process.argv[process.argv.length - 1], JSON.stringify(list, null, 1));
console.log(list.length, 'strings,', list.reduce((a, b) => a + b.length, 0), 'chars');
