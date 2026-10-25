import { tr } from '../core/i18n';
import { useEffect, useRef, useState } from 'react';
import { bus } from '../core/events';
import { store } from '../core/store';
import { speak, ttsAvailable } from '../core/audio';
import { VOCAB } from '../content/vocab';
import { KANJI } from '../content/kanji';
import type { VocabEntry } from '../core/types';

/**
 * Looking up any Japanese word in the game: tap a word that has a reading on it, or press and hold any kanji in a
 * text. Shows the reading and the meaning (from the game's vocabulary, else the readings and meanings of each kanji).
 */

const HAS_KANJI = /[一-鿿々]/;
let words: Map<string, VocabEntry> | null = null;
let stems: Map<string, VocabEntry> | null = null;
let kanji: Map<string, (typeof KANJI)[number]> | null = null;
let builtFor = -1;

/** all common kanji (on, kun, meaning) and the readings the game's texts give (public/data/lookup.json, tools/build_lookup.py) */
interface LookupData {
  kanji: Record<string, [string[], string[], string]>;
  words: Record<string, string>;
}
let data: LookupData | null = null;
let loading: Promise<void> | null = null;
function loadData() {
  loading ??= fetch('data/lookup.json')
    .then((r) => r.json())
    .then((d: LookupData) => void (data = d))
    .catch(() => undefined);
  return loading;
}

function build() {
  builtFor = VOCAB.length;
  words = new Map();
  stems = new Map();
  for (const v of VOCAB) {
    if (v.affix) continue;
    const w = v.word.replace(/^～|～$/g, '');
    if (!w || /[（）()・～]/.test(w)) continue;
    if (!words.has(w)) words.set(w, v);
    // conjugated forms: 聞き流して finds 聞き流す, 忙しく finds 忙しい
    if ((v.pos === 'verb' || v.pos === 'i-adj') && w.length > 1 && !stems.has(w.slice(0, -1))) stems.set(w.slice(0, -1), v);
    if (v.pos === 'verb' && w.endsWith('する') && !stems.has(w.slice(0, -2))) stems.set(w.slice(0, -2), v);
  }
  kanji = new Map(KANJI.map((k) => [k.char, k]));
}

/** the vocabulary word that starts the text (longest match), if any */
export function findVocab(text: string): VocabEntry | null {
  if (!words || builtFor !== VOCAB.length) build();
  for (let len = Math.min(text.length, 12); len >= 1; len--) {
    const s = text.slice(0, len);
    if (!HAS_KANJI.test(s)) continue;
    const hit = words!.get(s) ?? stems!.get(s);
    if (hit) return hit;
  }
  return null;
}

export interface LookupReq {
  /** the written word (kanji) */
  text: string;
  /** the reading when the text gave one ({漢字|かんじ}) */
  reading?: string;
  /** text right after the word, to find conjugated forms (聞き流+して) */
  tail?: string;
}

/** a reading from the game's own texts: the word itself, or the longest written word it starts with */
function textReading(text: string): { word: string; reading: string } | null {
  if (!data) return null;
  for (let len = text.length; len >= 2; len--) {
    const r = data.words[text.slice(0, len)];
    if (r) return { word: text.slice(0, len), reading: r };
  }
  return null;
}

export function LookupPopup() {
  const [req, setReq] = useState<LookupReq | null>(null);
  const opened = useRef(0);
  const [, setReady] = useState(0);
  useEffect(
    () =>
      bus.on('lookup', (r: LookupReq) => {
        opened.current = Date.now();
        setReq(r);
        if (!data) void loadData().then(() => setReady((n) => n + 1));
      }),
    [],
  );
  if (!req) return null;
  const v = findVocab(req.text + (req.tail ?? ''));
  const covers = v && req.text.startsWith(v.word.replace(/^～|～$/g, '').replace(/[るうくぐすつぬぶむい]$|する$/, '').slice(0, req.text.length));
  const known = !covers && !req.reading ? textReading(req.text) : null;
  const word = covers ? v!.word : req.text;
  const reading = covers ? v!.reading : req.reading ?? (known?.word === req.text ? known.reading : undefined);
  const lang = store.state?.settings.meaningLang ?? 'en';
  const chars = [...req.text].filter((c) => HAS_KANJI.test(c));
  if (!kanji) build();
  const say = reading ?? (covers ? v!.reading : undefined);
  return (
    // opened by a long press: the tap that ends the press must not close it again
    <div className="gloss-backdrop" onClick={() => Date.now() - opened.current > 450 && setReq(null)}>
      <div className="panel gloss lookup" onClick={(e) => e.stopPropagation()}>
        <div className="lk-word" lang="ja">
          {reading ? (
            <ruby>
              {word}
              <rt>{reading}</rt>
            </ruby>
          ) : (
            word
          )}
          {say && ttsAvailable() && (
            <button className="btn small" onClick={() => void speak([{ text: say }])} aria-label="vorlesen">
              🔊
            </button>
          )}
        </div>
        {covers && v ? (
          <>
            <div className="lk-meaning">{lang === 'de' ? v.de : v.en}</div>
            {v.example && (
              <div className="lk-example" lang="ja">
                {v.example}
                <small>{lang === 'de' ? v.exampleDe ?? tr(v.exampleEn, true) : v.exampleEn}</small>
              </div>
            )}
            <button className="btn small" onClick={() => (setReq(null), bus.emit('gloss', { key: 'v:' + v.id }))}>
              Karte öffnen
            </button>
          </>
        ) : (
          !chars.length && <div className="lk-meaning">—</div>
        )}
        {chars.length > 0 && (
          <div className="lk-kanji">
            {chars.map((c, i) => {
              const k = kanji!.get(c);
              const d = data?.kanji[c];
              const reads = k ? [...k.on, ...k.kun] : d ? [...d[0], ...d[1]] : null;
              const meaning = k ? tr(k.meaning, lang === 'de') : d?.[2];
              return (
                <div key={c + i} className="lk-k">
                  <b lang="ja">{c}</b>
                  {reads ? (
                    <span>
                      <span lang="ja">{reads.join('・')}</span> — {meaning}
                    </span>
                  ) : (
                    <span className="muted">{data ? '—' : '…'}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <button className="btn primary" autoFocus onClick={() => setReq(null)}>
          閉じる
        </button>
      </div>
    </div>
  );
}

/**
 * Press and hold (about half a second) on kanji in any text opens the lookup; the tap that follows the hold is
 * swallowed, so a hold never also advances a dialogue or picks an answer. Installed once.
 */
let installed = false;
export function installHoldLookup() {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let fired = false;
  let start: [number, number] = [0, 0];
  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  window.addEventListener(
    'pointerdown',
    (e) => {
      fired = false;
      cancel();
      const el = (e.target as HTMLElement | null)?.closest?.('.jp-k') as HTMLElement | null;
      if (!el) return;
      start = [e.clientX, e.clientY];
      timer = setTimeout(() => {
        fired = true;
        bus.emit('lookup', { text: el.dataset.k ?? el.textContent ?? '', tail: el.dataset.tail });
      }, 480);
    },
    true,
  );
  window.addEventListener('pointermove', (e) => {
    if (timer && Math.hypot(e.clientX - start[0], e.clientY - start[1]) > 12) cancel();
  });
  window.addEventListener('pointerup', cancel, true);
  window.addEventListener('pointercancel', cancel, true);
  window.addEventListener(
    'click',
    (e) => {
      if (!fired) return;
      fired = false;
      e.preventDefault();
      e.stopPropagation();
    },
    true,
  );
  // the phone's own long-press menu would cover the popup
  window.addEventListener('contextmenu', (e) => {
    if ((e.target as HTMLElement | null)?.closest?.('.jp-k')) e.preventDefault();
  });
}
