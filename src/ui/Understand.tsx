import { tr } from '../core/i18n';
import { useState } from 'react';
import { VOCAB, VOCAB_BY_ID, wordForm } from '../content/vocab';
import { NPCS } from '../content/npcs';
import { meaningOf, recordAnswer, shuffle, similarWords, type Exercise } from '../core/learning';
import { markupOf } from '../core/memory';
import { highlight } from '../core/recall';
import { mastery, strength } from '../core/srs';
import { grantXp } from '../core/game';
import { store } from '../core/store';
import type { GameState } from '../core/types';
import { findWords } from './autolink';
import { Jp, plainText, withName } from './Jp';
import { MemoryNote } from './MemoryNote';

/**
 * Story lines use words from earlier: once in a story scene, a word of a line that was met before this scene (and is
 * not yet sitting firmly) has to be understood before the story goes on. A wrong answer brings back the moment the
 * word was first met, then the question comes again until it is right.
 */

export interface Understand {
  key: string;
  /** the word as it stands in the line */
  surface: string;
  line: string;
  en?: string;
  who?: string;
}

/** the word of this line to check, if any: met before `since`, not mature, and not first met in this very line */
export function wordToUnderstand(s: GameState, line: string, since: number): Omit<Understand, 'line' | 'en' | 'who'> | null {
  const found = new Map<string, string>();
  for (const m of line.matchAll(/\{([^|{}]+)\|[^{}]*\|(v:[a-z_0-9]+)\}/g)) found.set(m[2], m[1]);
  const plain = plainText(line);
  for (const [a, b, id] of findWords(plain)) if (!found.has('v:' + id)) found.set('v:' + id, plain.slice(a, b));
  const cands = [...found.entries()].filter(([k]) => {
    const c = s.cards[k];
    if (!c || !VOCAB_BY_ID[k.slice(2)] || c.firstSeen > since - 5 * 60_000) return false;
    // the game's own words (言霊 comes up in every scene) are no JLPT practice
    if (VOCAB_BY_ID[k.slice(2)].level === 'story') return false;
    if (mastery(c) === 'mature') return false;
    // not one that was just asked (in the scene before, or a review a moment ago)
    if (c.last && c.last > Date.now() - 30 * 60_000) return false;
    return c.origin?.line !== line;
  });
  if (!cands.length) return null;
  // the shakiest first
  cands.sort(([a], [b]) => (mastery(s.cards[a]) === 'struggling' ? -1 : 0) - (mastery(s.cards[b]) === 'struggling' ? -1 : 0) || strength(s.cards[a]) - strength(s.cards[b]));
  const [key, surface] = cands[0];
  return { key, surface };
}

function options(key: string) {
  const s = store.s;
  const id = key.slice(2);
  const v = VOCAB_BY_ID[id];
  const lang = s.settings.meaningLang;
  const right = meaningOf(id, lang);
  const wrong = similarWords(v, VOCAB.filter((x) => x.id !== id && meaningOf(x.id, lang) !== right), 3).map((x) => meaningOf(x.id, lang));
  return shuffle([right, ...wrong]).map((text) => ({ text, correct: text === right }));
}

export function UnderstandStep({ u, onDone }: { u: Understand; onDone: () => void }) {
  const [opts, setOpts] = useState(() => options(u.key));
  const [picked, setPicked] = useState<number | null>(null);
  const [misses, setMisses] = useState(0);
  const [t0] = useState(() => performance.now());
  const npc = u.who ? NPCS[u.who] : undefined;
  const marked = markupOf(u.key).test(u.line) ? highlight(u.line, u.key) : u.line.replace(u.surface, `【${u.surface}】`);
  const v = VOCAB_BY_ID[u.key.slice(2)];
  const ok = picked !== null && opts[picked].correct;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const good = opts[i].correct;
    if (misses === 0) {
      const ex: Exercise = { id: 'understand', key: u.key, area: 'vocab', mode: 'story-recall', context: true, instruction: '', prompt: u.line, explanation: '' };
      store.update((s) => {
        recordAnswer(s, ex, good, performance.now() - t0);
        if (good) grantXp(s, 3);
      }, 'learn');
    }
    if (!good) setMisses(misses + 1);
  };

  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box understand">
        <div className="memory-where">💭 前にも聞いた言葉 <span className="note">a word you met before</span></div>
        <p lang="ja" className="memory-line">
          {npc && <b>{npc.name}：</b>}「<Jp text={marked} furigana="off" />」
        </p>
        <p lang="ja">
          <Jp text={`今の「${u.surface}」は、どういう{意味|いみ}？`} />
          <span className="note"> What does 「{u.surface}」 mean here?</span>
        </p>
        <div className="options">
          {opts.map((o, i) => (
            <button key={o.text} className={`opt ${picked !== null && o.correct && ok ? 'correct' : ''} ${picked === i && !o.correct ? 'wrong' : ''}`} disabled={picked !== null} onClick={() => pick(i)} data-ok={o.correct ? 1 : 0}>
              <span className="opt-n">{i + 1}</span>
              {o.text}
            </button>
          ))}
        </div>
        {picked !== null && !ok && (
          <div className="feedback ng">
            <div className="fb-title">Not quite — here is where you met it:</div>
            <MemoryNote k={u.key} />
            <p lang="ja">
              <b>{wordForm(v)}</b> = {meaningOf(v.id, store.s.settings.meaningLang)}
            </p>
            <button
              className="btn primary"
              autoFocus
              onClick={() => {
                setOpts(shuffle(opts));
                setPicked(null);
              }}
            >
              もう一度 Once more
            </button>
          </div>
        )}
        {ok && (
          <div className="feedback ok">
            <div className="fb-title">{misses ? '今度は正解！ Got it now.' : '正解！ You remembered it.'}</div>
            {u.en && <p className="note">{withName(tr(u.en))}</p>}
            <button className="btn primary" autoFocus onClick={onDone}>次へ ▶</button>
          </div>
        )}
      </div>
    </div>
  );
}
