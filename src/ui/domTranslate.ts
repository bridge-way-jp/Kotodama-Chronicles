import { DE_UI } from '../content/de_ui';
import { lookupDe } from '../core/i18n';

/**
 * The fixed English texts of the screens (menus, buttons, notes) are written in the components;
 * with German as the meaning language they are swapped in the page as they appear. A text that is
 * Japanese followed by English ("今日の目標 Daily goal") keeps its Japanese.
 */
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE']);
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
const original = new Map<Node, string>();
const originalAttr = new Map<Element, Record<string, string>>();
let on = false;

const find = (t: string) => DE_UI[t] ?? lookupDe(t);
/** texts put together around a value ("Practice — 漢字読み") */
const RULES: [RegExp, string][] = [
  [/\bPractice — /, 'Übung – '],
  [/\bmastered(?=: )/, 'gemeistert'],
  [/\bconsolidating(?=: )/, 'festigend'],
  [/\blearning(?=: )/, 'lernend'],
  [/\bneeds work(?=: )/, 'braucht Übung'],
  [/\bseen(?=: )/, 'gesehen'],
];

export function translateText(s: string): string | null {
  const t = s.trim();
  if (!t || !/[A-Za-z]{2}/.test(t)) return null;
  const at = s.indexOf(t);
  let d = find(t);
  if (!d) {
    const m = /^(.*[　-鿿＀-￯][\s—–\-:：]*)([A-Za-z(].*)$/.exec(t);
    const tail = m && find(m[2].trim());
    if (m && tail) d = m[1] + tail;
  }
  if (!d) for (const [re, to] of RULES) if (re.test(t)) d = t.replace(re, to);
  if (!d && t.includes(' · ')) {
    // a list of separately translatable parts
    const parts = t.split(' · ');
    const out = parts.map((x) => find(x.trim()) ?? x);
    if (out.some((x, i) => x !== parts[i])) d = out.join(' · ');
  }
  return d ? s.slice(0, at) + d + s.slice(at + t.length) : null;
}

function fixText(n: Node) {
  const p = n.parentElement;
  if (!p || SKIP.has(p.tagName)) return;
  const v = n.nodeValue ?? '';
  const d = translateText(v);
  if (d && d !== v) {
    if (!original.has(n)) original.set(n, v);
    n.nodeValue = d;
  }
}

function fixAttrs(el: Element) {
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    const d = v && translateText(v);
    if (d && d !== v) {
      const keep = originalAttr.get(el) ?? {};
      keep[a] ??= v!;
      originalAttr.set(el, keep);
      el.setAttribute(a, d);
    }
  }
}

function walk(n: Node) {
  if (n.nodeType === Node.TEXT_NODE) return fixText(n);
  if (n.nodeType !== Node.ELEMENT_NODE || SKIP.has((n as Element).tagName)) return;
  fixAttrs(n as Element);
  for (const c of Array.from(n.childNodes)) walk(c);
}

const observer = typeof MutationObserver === 'undefined' ? null : new MutationObserver((muts) => {
  if (!on) return;
  for (const m of muts) {
    if (m.type === 'characterData') fixText(m.target);
    else if (m.type === 'attributes') fixAttrs(m.target as Element);
    else m.addedNodes.forEach(walk);
  }
});

export function setDomLanguage(lang: 'en' | 'de') {
  const want = lang === 'de';
  if (want === on || !observer) return;
  on = want;
  if (on) {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    walk(document.body);
  } else {
    observer.disconnect();
    for (const [n, v] of original) if (n.isConnected) n.nodeValue = v;
    for (const [el, keep] of originalAttr) for (const [a, v] of Object.entries(keep)) el.setAttribute(a, v);
    original.clear();
    originalAttr.clear();
  }
}
