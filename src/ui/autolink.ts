import { VOCAB } from '../content/vocab';

/**
 * A small built-in dictionary lookup for story text: finds vocabulary words (dictionary form, and the stem of
 * verbs and い-adjectives so that 聞き流して finds 聞き流す) in plain Japanese text. Only words that contain kanji and
 * are at least two characters long, and are level N2, N1 or story words, are used, so that short common stems do not match by accident.
 */
const KANJI = /[一-鿿]/;
let index: Map<string, string> | null = null;
let size = -1;
let maxLen = 2;

function build() {
  size = VOCAB.length;
  index = new Map();
  maxLen = 2;
  const add = (form: string, id: string) => {
    if (form.length < 2 || !KANJI.test(form) || index!.has(form)) return;
    index!.set(form, id);
    maxLen = Math.max(maxLen, form.length);
  };
  for (const v of VOCAB) {
    if (v.affix || (v.level !== 'N2' && v.level !== 'N1' && v.level !== 'story')) continue;
    const w = v.word.replace(/^～|～$/g, '');
    if (!w || /[～（）()・]/.test(w) || !KANJI.test(w)) continue;
    add(w, v.id);
    if ((v.pos === 'verb' || v.pos === 'i-adj') && /[るうくぐすつぬぶむい]$/.test(w)) add(w.slice(0, -1), v.id);
  }
}

/** [start, end, vocab id] spans in `plain`, longest match first, no overlaps */
export function findWords(plain: string): [number, number, string][] {
  if (!index || size !== VOCAB.length) build();
  const out: [number, number, string][] = [];
  let i = 0;
  while (i < plain.length) {
    let hit: [number, string] | null = null;
    if (KANJI.test(plain[i])) {
      for (let len = Math.min(maxLen, plain.length - i); len >= 2; len--) {
        const id = index!.get(plain.slice(i, i + len));
        if (id) {
          hit = [len, id];
          break;
        }
      }
    }
    if (hit) {
      out.push([i, i + hit[0], hit[1]]);
      i += hit[0];
    } else i++;
  }
  return out;
}
