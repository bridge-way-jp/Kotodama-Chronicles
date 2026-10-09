import { useEffect, useMemo, useRef, useState } from 'react';
import { Jp, Rich, plainText, withName } from './Jp';
import { speak, stopSpeech, ttsAvailable, sfx } from '../core/audio';
import { normalizeKana } from '../core/romaji';
import { shuffle, type Exercise, type Option } from '../core/learning';
import { store } from '../core/store';
import type { Question } from '../core/types';

/** test hook: with ?debug, correct options carry data-ok for automated play-testing */
const DEBUG = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug');
export const dbgOk = (ok: boolean) => (DEBUG && ok ? { 'data-ok': '1' } : {});

export function AudioButton({
  lines,
  label = '▶ 再生',
  autoPlay,
  initialRate,
}: {
  lines: { text: string; voice?: 'f' | 'm' }[];
  label?: string;
  autoPlay?: boolean;
  initialRate?: number;
}) {
  const [rate, setRate] = useState(initialRate ?? store.state?.settings.ttsRate ?? 1);
  const [playing, setPlaying] = useState(false);
  const play = async (r = rate) => {
    setPlaying(true);
    await speak(lines, r);
    setPlaying(false);
  };
  useEffect(() => {
    if (autoPlay) play();
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!ttsAvailable()) return <div className="note warn">Audio is not available in this browser. The transcript is shown instead.</div>;
  return (
    <div className="audio-row">
      <button className="btn small" onClick={() => play()} disabled={playing}>
        {playing ? '♪ …' : label}
      </button>
      <label className="speed">
        速度
        <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
          <option value={0.7}>0.7×</option>
          <option value={0.85}>0.85×</option>
          <option value={1}>1×</option>
          <option value={1.15}>1.15×</option>
        </select>
      </label>
      <span className="tts-tag" title="Synthetic browser speech, not a native-speaker recording">TTS</span>
    </div>
  );
}

/** A comprehension question with shuffled options and explained feedback. */
export function QuestionBlock({
  q,
  retry = false,
  onDone,
  showEnToggle = true,
}: {
  q: Question;
  retry?: boolean;
  onDone: (firstOk: boolean, ms: number) => void;
  showEnToggle?: boolean;
}) {
  const order = useMemo(() => shuffle(q.options.map((_, i) => i)), [q]);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [firstOk, setFirstOk] = useState<boolean | null>(null);
  const [showEn, setShowEn] = useState(store.state?.settings.translation === 'always');
  const t0 = useRef(performance.now());
  const ms = useRef(0);
  const done = picked !== null && (picked === q.answer || !retry);

  const choose = (i: number) => {
    if (done || wrong.has(i)) return;
    const ok = i === q.answer;
    if (firstOk === null) {
      setFirstOk(ok);
      ms.current = performance.now() - t0.current;
    }
    sfx(ok ? 'ok' : 'bad');
    setPicked(i);
    if (!ok) setWrong(new Set(wrong).add(i));
  };

  return (
    <div className="question">
      <div className="q-text">
        <Jp text={q.q} />
        {q.qEn && showEnToggle && store.state?.settings.translation !== 'never' && (
          <button className="en-btn" onClick={() => setShowEn(!showEn)}>EN</button>
        )}
      </div>
      {showEn && q.qEn && <div className="q-en">{withName(q.qEn)}</div>}
      <div className="options">
        {order.map((i, n) => {
          const cls = ['opt'];
          if (picked !== null && i === q.answer && (done || picked === i)) cls.push('correct');
          if (wrong.has(i)) cls.push('wrong');
          return (
            <button key={i} className={cls.join(' ')} onClick={() => choose(i)} disabled={done || wrong.has(i)} {...dbgOk(i === q.answer)}>
              <span className="opt-n">{n + 1}</span>
              <Jp text={q.options[i]} />
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`feedback ${picked === q.answer ? 'ok' : 'ng'}`}>
          <div className="fb-title">{picked === q.answer ? '正解！ Correct' : retry && !done ? 'ちがうみたい… Not quite — try again.' : '残念… Not quite.'}</div>
          {(done || picked !== q.answer) && (
            <div className="fb-why">
              <Jp text={withName(q.why)} />
            </div>
          )}
          {done && (
            <button className="btn primary" autoFocus onClick={() => onDone(!!firstOk, ms.current)}>
              次へ ▶
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export interface ExerciseTools {
  eliminate?: number; // remove N wrong options
  showReading?: boolean;
  showEn?: boolean;
  slowAudio?: boolean;
}

/** Runs one SRS exercise (multiple choice or typed). */
export function ExerciseView({
  ex,
  onDone,
  tools,
  compact,
}: {
  ex: Exercise;
  onDone: (ok: boolean, ms: number, chosen?: Option) => void;
  tools?: ExerciseTools;
  compact?: boolean;
}) {
  const [chosen, setChosen] = useState<Option | null>(null);
  const [typed, setTyped] = useState('');
  const [typedResult, setTypedResult] = useState<boolean | null>(null);
  const t0 = useRef(performance.now());
  const ms = useRef(0);
  const answered = chosen !== null || typedResult !== null;
  const ok = chosen ? chosen.correct : !!typedResult;

  const hidden = useMemo(() => {
    const n = tools?.eliminate ?? 0;
    if (!n || !ex.options) return new Set<string>();
    return new Set(shuffle(ex.options.filter((o) => !o.correct)).slice(0, n).map((o) => o.text));
  }, [tools?.eliminate, ex]);

  const finish = (good: boolean) => {
    ms.current = performance.now() - t0.current;
    sfx(good ? 'ok' : 'bad');
  };

  const pick = (o: Option) => {
    if (answered) return;
    setChosen(o);
    finish(o.correct);
  };

  const submitTyped = () => {
    if (answered || !typed.trim()) return;
    const good = (ex.accept ?? []).some((a) => normalizeKana(a) === normalizeKana(typed));
    setTypedResult(good);
    finish(good);
  };

  const showText = !ex.hideTextUntilAnswered || answered;
  const readingHint = tools?.showReading && ex.key ? hintReading(ex) : null;

  return (
    <div className={`exercise ${compact ? 'compact' : ''}`}>
      <div className="ex-instr">
        {ex.isNew && <span className="badge new">NEW</span>}
        {ex.instruction}
      </div>
      {ex.audio && (
        <AudioButton
          lines={[{ text: ex.audio }]}
          autoPlay
          label="▶ 聞く"
          initialRate={tools?.slowAudio ? 0.7 : undefined}
          key={ex.id + (tools?.slowAudio ? 's' : '')}
        />
      )}
      {showText ? (
        <div className={`ex-prompt ${ex.prompt.length < 8 ? 'big' : ''}`}>
          <Jp text={ex.prompt} furigana={ex.mode === 'reading' || ex.area === 'kanji' ? 'off' : undefined} />
        </div>
      ) : (
        <div className="ex-prompt hidden-text">🎧 ……</div>
      )}
      {readingHint && <div className="hint">よみ: {readingHint}</div>}
      {(tools?.showEn || (answered && ex.promptEn)) && ex.promptEn && <div className="q-en">{ex.promptEn}</div>}
      {ex.options ? (
        <div className="options">
          {ex.options.map((o, i) =>
            hidden.has(o.text) ? null : (
              <button
                key={i}
                className={`opt ${answered && o.correct ? 'correct' : ''} ${chosen === o && !o.correct ? 'wrong' : ''}`}
                disabled={answered}
                onClick={() => pick(o)}
                {...dbgOk(o.correct)}
              >
                <span className="opt-n">{i + 1}</span>
                <Jp text={o.text} furigana="off" />
              </button>
            ),
          )}
        </div>
      ) : (
        <form
          className="typed"
          onSubmit={(e) => {
            e.preventDefault();
            submitTyped();
          }}
        >
          <input
            autoFocus
            value={typed}
            disabled={answered}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="ひらがな / romaji"
            lang="ja"
            autoComplete="off"
            autoCapitalize="off"
            {...(DEBUG ? { 'data-answer': ex.accept?.[0] } : {})}
          />
          <span className="preview">{normalizeKana(typed)}</span>
          <button className="btn" type="submit" disabled={answered}>
            OK
          </button>
        </form>
      )}
      {answered && (
        <div className={`feedback ${ok ? 'ok' : 'ng'}`}>
          <div className="fb-title">
            {ok ? '正解！ Correct' : 'Not quite.'}
            {!ok && ex.accept && <> 答え：{ex.accept[0]}</>}
          </div>
          {ex.hideTextUntilAnswered && <div className="fb-why"><Jp text={ex.prompt} /></div>}
          <div className="fb-why">
            <Rich text={ex.explanation} />
          </div>
          <button className="btn primary" autoFocus onClick={() => onDone(ok, ms.current, chosen ?? undefined)}>
            次へ ▶
          </button>
        </div>
      )}
    </div>
  );
}

function hintReading(ex: Exercise): string | null {
  const m = /（([^）]+)）/.exec(ex.explanation);
  if (ex.key?.startsWith('g:')) return ex.explanation.split('\n')[0].replace(/\*\*/g, '');
  return m ? m[1] : null;
}

export function TextPassage({ title, body }: { title: string; body: string }) {
  return (
    <div className="passage">
      <div className="passage-title">{title}</div>
      <div className="passage-body">
        <Jp text={body} />
      </div>
    </div>
  );
}

export { plainText };
