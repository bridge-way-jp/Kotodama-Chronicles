import { useState } from 'react';
import { READINGS, LISTENING } from '../content/texts';
import { store } from '../core/store';
import { encounter, recordComprehension } from '../core/learning';
import { ttsAvailable } from '../core/audio';
import { AudioButton, QuestionBlock, TextPassage } from './Question';
import { Jp, withName } from './Jp';
import type { ListeningItem, ReadingText } from '../core/types';

function finishText(keys: string[]) {
  store.update((s) => encounter(s, keys), 'learn');
}

export function ReadingChallenge({ id, text, onDone }: { id?: string; text?: ReadingText; onDone: (score: number) => void }) {
  const t = text ?? READINGS[id!];
  const [qi, setQi] = useState(-1);
  const [score, setScore] = useState(0);
  const [showEn, setShowEn] = useState(false);
  const keys = [...t.vocab.map((v) => 'v:' + v), ...t.grammar.map((g) => 'g:' + g)];

  return (
    <div className="challenge reading">
      <div className="ch-kind">📖 読解 Reading</div>
      <TextPassage title={t.title} body={t.body} />
      {qi === -1 ? (
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setQi(0)}>
            読んだ！ 質問へ ▶
          </button>
          <span className="note">Tap dotted words for meanings.</span>
        </div>
      ) : qi < t.questions.length ? (
        <div>
          <div className="q-count">
            質問 {qi + 1} / {t.questions.length}
          </div>
          <QuestionBlock
            key={qi}
            q={t.questions[qi]}
            retry
            onDone={(ok, ms) => {
              store.update((s) => recordComprehension(s, 'reading', ok, ms, keys), 'learn');
              if (ok) setScore(score + 1);
              setQi(qi + 1);
            }}
          />
        </div>
      ) : (
        <div className="feedback ok">
          <div className="fb-title">
            読解完了！ {score} / {t.questions.length} correct on the first try
          </div>
          <button className="btn small" onClick={() => setShowEn(!showEn)}>
            {showEn ? 'Hide' : 'Show'} translation
          </button>
          {showEn && <div className="q-en pre">{withName(t.en)}</div>}
          <button
            className="btn primary"
            autoFocus
            onClick={() => {
              finishText(keys);
              onDone(score);
            }}
          >
            次へ ▶
          </button>
        </div>
      )}
    </div>
  );
}

export function ListeningChallenge({ id, item, onDone }: { id?: string; item?: ListeningItem; onDone: (score: number) => void }) {
  const l = item ?? LISTENING[id!];
  const [qi, setQi] = useState(-1);
  const [score, setScore] = useState(0);
  const [subs, setSubs] = useState(!ttsAvailable());
  const [showEn, setShowEn] = useState(false);
  const keys = l.vocab.map((v) => 'v:' + v);
  const lines = l.lines.map((x) => ({ text: x.jp, voice: x.voice }));

  return (
    <div className="challenge listening">
      <div className="ch-kind">🎧 聴解 Listening — {l.title}</div>
      <AudioButton lines={lines} autoPlay={qi === -1} label="▶ 音声を聞く" />
      <div className="row">
        <button className="btn small ghost" onClick={() => setSubs(!subs)}>
          {subs ? '字幕を隠す Hide subtitles' : '字幕を表示 Show subtitles'}
        </button>
      </div>
      {subs && (
        <div className="transcript">
          {l.lines.map((x, i) => (
            <div key={i}>
              <b>{x.who}：</b>
              <Jp text={x.jp} />
            </div>
          ))}
        </div>
      )}
      {qi === -1 ? (
        <button className="btn primary" onClick={() => setQi(0)}>
          質問へ ▶
        </button>
      ) : qi < l.questions.length ? (
        <div>
          <div className="q-count">
            質問 {qi + 1} / {l.questions.length}
          </div>
          <QuestionBlock
            key={qi}
            q={l.questions[qi]}
            retry
            onDone={(ok, ms) => {
              store.update((s) => recordComprehension(s, 'listening', ok && !subs, ms, keys), 'learn');
              if (ok) setScore(score + 1);
              setQi(qi + 1);
            }}
          />
          {subs && <div className="note">Subtitles are on — answers count as assisted (not as listening mastery).</div>}
        </div>
      ) : (
        <div className="feedback ok">
          <div className="fb-title">
            聴解完了！ {score} / {l.questions.length}
          </div>
          <button className="btn small" onClick={() => setShowEn(!showEn)}>
            {showEn ? 'Hide' : 'Show'} translation
          </button>
          {showEn && <div className="q-en pre">{l.en}</div>}
          <button
            className="btn primary"
            autoFocus
            onClick={() => {
              finishText(keys);
              onDone(score);
            }}
          >
            次へ ▶
          </button>
        </div>
      )}
    </div>
  );
}
