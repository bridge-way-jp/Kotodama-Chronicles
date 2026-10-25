import { createContext, Fragment, useContext, useRef, useState, type ReactNode } from 'react';
import { store } from '../core/store';
import { mastery } from '../core/srs';
import { bus } from '../core/events';
import { findWords } from './autolink';

/**
 * Renders the game's Japanese markup:
 *   {漢字|かんじ}  {漢字|かんじ|v:id}  {pattern||g:id}  @name  **bold**  \n
 * Linked words get a dotted underline and open a glossary popup.
 */

type Token = { t: 'text'; s: string } | { t: 'word'; base: string; ruby: string; key?: string };

export function parseMarkup(src: string): Token[] {
  const out: Token[] = [];
  const re = /\{([^|{}]+)\|([^|{}]*)(?:\|([^{}]+))?\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ t: 'text', s: src.slice(last, m.index) });
    out.push({ t: 'word', base: m[1], ruby: m[2], key: m[3] });
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ t: 'text', s: src.slice(last) });
  return out;
}

/** Plain text version (no furigana) for TTS and comparisons. */
export function plainText(src: string): string {
  return withName(parseMarkup(src).map((t) => (t.t === 'text' ? t.s : t.base)).join('').replace(/\*\*/g, ''));
}

export function withName(s: string): string {
  return s.replace(/@name/g, store.state?.playerName ?? 'マリア');
}

/** kanji runs in plain text: press and hold one to look it up (ui/Lookup.tsx) */
function holdable(s: string, keyBase: string): ReactNode {
  const parts = s.split(/([一-鿿々]+)/);
  if (parts.length === 1) return s;
  return parts.map((p, i) =>
    i % 2 ? (
      <span key={keyBase + i} className="jp-k" data-k={p} data-tail={(parts[i + 1] ?? '').slice(0, 4)}>
        {p}
      </span>
    ) : (
      p
    ),
  );
}

function renderText(s: string, keyBase: string): ReactNode[] {
  const parts = withName(s).split(/(\*\*[^*]+\*\*|\n)/);
  return parts.map((p, i) => {
    if (p === '\n') return <br key={keyBase + i} />;
    if (p.startsWith('**') && p.endsWith('**')) return <b key={keyBase + i}>{holdable(p.slice(2, -2), keyBase + i + 'b')}</b>;
    return <Fragment key={keyBase + i}>{holdable(p, keyBase + i + 'p')}</Fragment>;
  });
}

function showRuby(key: string | undefined, mode: string): boolean {
  if (mode === 'always') return true;
  if (mode === 'off' || mode === 'tap') return false;
  // auto: hide furigana for linked items the player has demonstrably learned
  if (!key) return true;
  const m = mastery(store.state?.cards[key]);
  return !(m === 'young' || m === 'mature');
}

/**
 * In the dialogue box a tap goes on to the next line, so there the words open on a long press instead (a quick tap on
 * a word goes on like anywhere else on the box). The same inside any button (an answer, a choice): a tap picks it.
 * Everywhere else (texts, the notebook) a tap opens them.
 */
export const HoldWords = createContext(false);

/** the press handlers of a word: a tap, or (in the dialogue box and in buttons) a long press */
function usePress(action: () => void) {
  const hold = useContext(HoldWords);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fired = useRef(false);
  const holding = (el: Element) => hold || !!el.closest('button, .choice-box');
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  return {
    onPointerDown: (e: React.PointerEvent) => {
      fired.current = false;
      cancel();
      if (!holding(e.currentTarget)) return;
      timer.current = setTimeout(() => {
        fired.current = true;
        action();
      }, 380);
    },
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
    onClick: (e: React.MouseEvent) => {
      if (!holding(e.currentTarget)) {
        e.stopPropagation();
        action();
        return;
      }
      // after a long press the tap that ends it must not also go on (or pick the answer)
      if (fired.current) {
        e.stopPropagation();
        e.preventDefault();
      }
      fired.current = false;
    },
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };
}

function Word({ tok, mode, tail }: { tok: Extract<Token, { t: 'word' }>; mode: string; tail?: string }) {
  const [revealed, setRevealed] = useState(false);
  // a reading over a word that is already written in kana adds nothing
  const hasRuby = !!tok.ruby && tok.ruby !== tok.base;
  const ruby = hasRuby && (showRuby(tok.key, mode) || revealed);
  const press = usePress(() => {
    if (hasRuby) setRevealed(true);
    if (tok.key) bus.emit('gloss', { key: tok.key });
    // a word with a reading: first tap shows the reading, a tap on a shown reading opens reading + meaning
    else if (hasRuby && (ruby || revealed)) bus.emit('lookup', { text: tok.base, reading: tok.ruby, tail });
  });
  const cls = tok.key ? 'jp-word linked' : hasRuby ? 'jp-word' : undefined;
  const inner = ruby ? (
    <ruby>
      {tok.base}
      <rt>{tok.ruby}</rt>
    </ruby>
  ) : (
    tok.base
  );
  return (
    <span className={cls} {...(tok.key || hasRuby ? press : {})} title={tok.key ? 'Tap for meaning' : hasRuby ? 'Tap for reading and meaning' : undefined}>
      {inner}
    </span>
  );
}

/** the few characters after a word (its okurigana: 並+んでいる), so a lookup finds the dictionary form */
function tailAfter(toks: Token[], i: number): string {
  const n = toks[i + 1];
  return n ? (n.t === 'text' ? n.s : n.base).slice(0, 4) : '';
}

export function Jp({ text, className, furigana, auto }: { text: string; className?: string; furigana?: string; auto?: boolean }) {
  const mode = furigana ?? store.state?.settings.furigana ?? 'auto';
  const toks = parseMarkup(text);
  return (
    <span className={className} lang="ja">
      {auto ? <AutoTokens toks={toks} mode={mode} /> : toks.map((t, i) => (t.t === 'text' ? <Fragment key={i}>{renderText(t.s, 'k' + i)}</Fragment> : <Word key={i} tok={t} mode={mode} tail={tailAfter(toks, i)} />))}
    </span>
  );
}

/**
 * Like the plain rendering, but every vocabulary word that was not linked by hand gets a light dotted underline and
 * opens the glossary when tapped (a built-in dictionary for story text).
 */
function AutoTokens({ toks, mode }: { toks: Token[]; mode: string }) {
  type Atom = { ch?: string; tok?: Extract<Token, { t: 'word' }>; len: number };
  const atoms: Atom[] = [];
  for (const t of toks) {
    if (t.t === 'text') for (const ch of withName(t.s)) atoms.push({ ch, len: 1 });
    else atoms.push({ tok: t, len: t.base.length });
  }
  const plain = atoms.map((a) => (a.ch ?? a.tok!.base)).join('');
  // plain-text offset of every atom
  const starts: number[] = [];
  let off = 0;
  for (const a of atoms) {
    starts.push(off);
    off += a.len;
  }
  // spans that begin and end on atom boundaries, and do not swallow a hand-linked word
  const spanAt = new Map<number, { end: number; id: string }>();
  for (const [a, b, id] of findWords(plain)) spanAt.set(a, { end: b, id });
  const out: ReactNode[] = [];
  let run = '';
  const flush = (k: number) => {
    if (run) out.push(<Fragment key={'t' + k}>{renderText(run, 'r' + k)}</Fragment>);
    run = '';
  };
  for (let i = 0; i < atoms.length; ) {
    const sp = spanAt.get(starts[i]);
    let j = i;
    let ok = !!sp;
    if (sp) {
      while (j < atoms.length && starts[j] < sp.end) {
        if (atoms[j].tok?.key) ok = false;
        j++;
      }
      if (starts[j - 1] + atoms[j - 1].len !== sp.end) ok = false;
    }
    if (sp && ok) {
      flush(i);
      const key = 'v:' + sp.id;
      out.push(
        <AutoWord key={'a' + i} id={key}>
          {atoms.slice(i, j).map((a, n) => (a.tok ? <Word key={n} tok={a.tok} mode={mode} /> : <Fragment key={n}>{a.ch}</Fragment>))}
        </AutoWord>,
      );
      i = j;
    } else {
      const a = atoms[i];
      if (a.tok) {
        flush(i);
        out.push(<Word key={'w' + i} tok={a.tok} mode={mode} />);
      } else run += a.ch;
      i++;
    }
  }
  flush(atoms.length);
  return <>{out}</>;
}

function AutoWord({ id, children }: { id: string; children: ReactNode }) {
  const press = usePress(() => bus.emit('gloss', { key: id }));
  return (
    <span className="jp-auto" {...press} title="Tap for meaning">
      {children}
    </span>
  );
}

/** Explanation text that may contain **bold** and newlines (no furigana markup). */
export function Rich({ text }: { text: string }) {
  return <>{renderText(text, 'r')}</>;
}
