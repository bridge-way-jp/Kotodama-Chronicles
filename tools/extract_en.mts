/**
 * Collects the English texts the learning screens show (meanings, explanations, question translations, "why" lines)
 * that have no German yet in src/content/de.ts.  npx vite-node tools/extract_en.mts <out.json>
 */
import fs from 'node:fs';
import { GRAMMAR } from '../src/content/grammar';
import { KANJI } from '../src/content/kanji';
import { VOCAB } from '../src/content/vocab';
import { SCRIPTS } from '../src/content/scripts';
import { READINGS, LISTENING } from '../src/content/texts';
import { SPECIES } from '../src/content/creatures';
import { DE } from '../src/content/de';
import { ORDERING, PARAPHRASE, PRACTICE_LISTENING, PRACTICE_READING } from '../src/content/practice';
import { CONFUSIONS } from '../src/content/confusions';
import { KARAOKE } from '../src/content/karaoke';
import { JOBS } from '../src/content/jobs';
import * as EVERYDAY from '../src/content/everyday';

const out = new Set<string>();
const add = (s: unknown) => {
  if (typeof s !== 'string') return;
  const t = s.trim();
  if (t && /[A-Za-z]{3}/.test(t) && !DE[t]) out.add(t);
};
for (const g of GRAMMAR) {
  [g.meaning, g.formation, g.explanation, g.nuance, g.mistakes].forEach(add);
  g.examples.forEach((e) => add(e.en));
  g.exercises.forEach((e: any) => { add(e.en); add(e.why); });
}
for (const k of KANJI) add(k.meaning);
for (const v of VOCAB) if (!v.exampleDe) add(v.exampleEn);
const walk = (x: any) => {
  if (!x || typeof x !== 'object') return;
  if (Array.isArray(x)) return x.forEach(walk);
  if (x.quiz) { add(x.quiz.qEn); add(x.quiz.why); }
  if (x.hear) add(x.hear.en);
  if (x.build) add(x.build.en);
  for (const v of Object.values(x)) walk(v);
};
walk(SCRIPTS);
for (const t of [...Object.values(READINGS), ...Object.values(LISTENING)] as any[]) { add(t.en); t.questions?.forEach((q: any) => { add(q.qEn); add(q.why); }); }
for (const sp of Object.values(SPECIES) as any[]) sp.talk?.forEach((t: any) => { add(t.en); add(t.why); });
// the practice tests, mix-up drills, karaoke and part-time jobs: their translations and explanations
const KEYS = new Set(['en', 'qEn', 'why', 'note', 'introEn', 'thanksEn', 'taskEn', 'titleEn']);
const deep = (x: any) => {
  if (!x || typeof x !== 'object') return;
  if (Array.isArray(x)) return x.forEach(deep);
  for (const [k, v] of Object.entries(x)) {
    if (KEYS.has(k)) add(v);
    else deep(v);
  }
};
[ORDERING, PARAPHRASE, PRACTICE_LISTENING, PRACTICE_READING, CONFUSIONS, KARAOKE, JOBS, EVERYDAY].forEach(deep);
const list = [...out];
fs.writeFileSync(process.argv[process.argv.length - 1], JSON.stringify(list, null, 1));
console.log(list.length, 'strings,', list.reduce((a, b) => a + b.length, 0), 'chars');
