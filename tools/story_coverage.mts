/**
 * How much of the N2 learning path the story covers: an item counts once it is said in a story line (its markup in a
 * script) or taught in a 心の物語 scene. Lists the chapter's items not yet in any story, for writing the next stories.
 *   npx vite-node tools/story_coverage.mts            per chapter
 *   npx vite-node tools/story_coverage.mts 3 v        the uncovered words of chapter 3 (v, g or k)
 */
import { readFileSync } from 'node:fs';
import { registerCurriculum } from '../src/core/curriculum';
registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
const { PATH_CHAPTERS, pathItems } = await import('../src/core/path');
const { SCRIPTS } = await import('../src/content/scripts');
const { EPISODES } = await import('../src/content/episodes');
const { VOCAB_BY_ID } = await import('../src/content/vocab');
const { GRAMMAR_BY_ID } = await import('../src/content/grammar');
const { KANJI_BY_ID } = await import('../src/content/kanji');

const text = JSON.stringify(SCRIPTS);
const covered = new Set([...text.matchAll(/\|([vgk]:[A-Za-z0-9_]+)\}/g)].map((m) => m[1]));
for (const ep of EPISODES) for (const sc of ep.scenes) for (const k of sc.teach) covered.add(k);
// a kanji is in the story once one of its words is
const { KANJI } = await import('../src/content/kanji');
for (const k of KANJI) if (k.words.some((w) => covered.has('v:' + w))) covered.add('k:' + k.id);

const [chArg, typeArg] = process.argv.slice(2).filter((a) => !a.endsWith('.mts'));
let all = 0;
let cov = 0;
for (let c = 1; c <= PATH_CHAPTERS; c++) {
  const items = pathItems(c);
  const n = items.filter((k) => covered.has(k)).length;
  all += items.length;
  cov += n;
  if (!chArg) console.log(`chapter ${c}: ${n}/${items.length} (${Math.round((n / items.length) * 100)}%)`);
}
if (!chArg) console.log(`all: ${cov}/${all} (${Math.round((cov / all) * 100)}%)`);
else {
  const label = (k: string) => {
    const [t, id] = k.split(':');
    if (t === 'v') return `${k}=${VOCAB_BY_ID[id].word}(${VOCAB_BY_ID[id].de})`;
    if (t === 'g') return `${k}=${GRAMMAR_BY_ID[id].pattern}`;
    return `${k}=${KANJI_BY_ID[id].char}`;
  };
  console.log(pathItems(Number(chArg)).filter((k) => !covered.has(k) && (!typeArg || k.startsWith(typeArg + ':'))).map(label).join(' '));
}
