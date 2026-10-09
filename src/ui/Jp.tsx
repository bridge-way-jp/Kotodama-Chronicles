import { Fragment, useState, type ReactNode } from 'react';
import { store } from '../core/store';
import { mastery } from '../core/srs';
import { bus } from '../core/events';

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

function renderText(s: string, keyBase: string): ReactNode[] {
  const parts = withName(s).split(/(\*\*[^*]+\*\*|\n)/);
  return parts.map((p, i) => {
    if (p === '\n') return <br key={keyBase + i} />;
    if (p.startsWith('**') && p.endsWith('**')) return <b key={keyBase + i}>{p.slice(2, -2)}</b>;
    return <Fragment key={keyBase + i}>{p}</Fragment>;
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

function Word({ tok, mode }: { tok: Extract<Token, { t: 'word' }>; mode: string }) {
  const [revealed, setRevealed] = useState(false);
  const ruby = tok.ruby && (showRuby(tok.key, mode) || revealed);
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tok.ruby) setRevealed(true);
    if (tok.key) bus.emit('gloss', { key: tok.key });
  };
  const cls = tok.key ? 'jp-word linked' : tok.ruby ? 'jp-word' : undefined;
  const inner = ruby ? (
    <ruby>
      {tok.base}
      <rt>{tok.ruby}</rt>
    </ruby>
  ) : (
    tok.base
  );
  return (
    <span className={cls} onClick={tok.key || (tok.ruby && !ruby) ? onClick : undefined} title={tok.key ? 'Tap for meaning' : undefined}>
      {inner}
    </span>
  );
}

export function Jp({ text, className, furigana }: { text: string; className?: string; furigana?: string }) {
  const mode = furigana ?? store.state?.settings.furigana ?? 'auto';
  const toks = parseMarkup(text);
  return (
    <span className={className} lang="ja">
      {toks.map((t, i) => (t.t === 'text' ? <Fragment key={i}>{renderText(t.s, 'k' + i)}</Fragment> : <Word key={i} tok={t} mode={mode} />))}
    </span>
  );
}

/** Explanation text that may contain **bold** and newlines (no furigana markup). */
export function Rich({ text }: { text: string }) {
  return <>{renderText(text, 'r')}</>;
}
