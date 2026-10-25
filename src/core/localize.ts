import { DE_STORY } from '../content/de_story';

/**
 * The English story and menu texts of the content (dialogue translations, quests, items, Kotodama,
 * people, places) are swapped for their German in place when the meaning language is German,
 * so every screen that shows them follows without its own lookup. Switching back restores them.
 */
const KEYS = new Set(['en', 'desc', 'descEn', 'text', 'description', 'nameEn', 'titleEn', 'role', 'hint', 'note', 'personality', 'mood', 'say', 'name', 'sub', 'label']);
const MODULES = import.meta.glob(['../content/*.ts', '!../content/de*.ts'], { eager: true }) as Record<string, Record<string, unknown>>;

const original = new Map<Record<string, unknown>, Record<string, string>>();
let applied: 'en' | 'de' = 'en';

function walk(x: unknown, de: boolean, seen: Set<unknown>) {
  if (!x || typeof x !== 'object' || seen.has(x)) return;
  seen.add(x);
  if (Array.isArray(x)) {
    if (typeof x[0] === 'number') return; // map grids
    for (const v of x) walk(v, de, seen);
    return;
  }
  const o = x as Record<string, unknown>;
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string') {
      if (!KEYS.has(k)) continue;
      if (de) {
        const t = DE_STORY[v.trim()];
        if (t) {
          const keep = original.get(o) ?? {};
          keep[k] ??= v;
          original.set(o, keep);
          o[k] = t;
        }
      } else {
        const en = original.get(o)?.[k];
        if (en !== undefined) o[k] = en;
      }
    } else walk(v, de, seen);
  }
}

export function localizeContent(lang: 'en' | 'de') {
  if (lang === applied) return;
  applied = lang;
  const seen = new Set<unknown>();
  for (const m of Object.values(MODULES)) for (const v of Object.values(m)) walk(v, lang === 'de', seen);
}
