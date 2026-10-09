import { useEffect, useMemo, useRef, useState } from 'react';
import { store } from '../core/store';
import { buildReviewSession, encounter, queueInfo, recordAnswer, recordComprehension, labelOfKey, type Exercise } from '../core/learning';
import { buildDiagnostic, buildMockExam, buildSectionPractice, MOCK_TIME_LIMIT_MS, SECTIONS, type Section, type TestItem } from '../core/exam';
import { review } from '../core/srs';
import { grantXp } from '../core/game';
import { ExerciseView, AudioButton, TextPassage, dbgOk } from './Question';
import { Jp, Rich } from './Jp';
import { sfx } from '../core/audio';
import type { PracticeResult } from '../core/types';

// ================================================================== review

export function ReviewSession({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState<Exercise[]>(() => buildReviewSession(store.s));
  const [i, setI] = useState(0);
  const [results, setResults] = useState<{ key?: string; ok: boolean }[]>([]);
  const info = queueInfo(store.s);

  if (!items.length)
    return (
      <div className="panel study">
        <div className="panel-title">復習 Review</div>
        <p>Nothing is due right now and today's new-item limit ({store.s.settings.newPerDay}/day) is reached or nothing new is unlocked.</p>
        <p className="note">Explore, talk to people, and come back later — items return when they are due. (You can raise the daily limit in Settings.)</p>
        <button className="btn primary" autoFocus onClick={onClose}>
          閉じる
        </button>
      </div>
    );

  if (i >= items.length) {
    const ok = results.filter((r) => r.ok).length;
    const missed = results.filter((r) => !r.ok && r.key).map((r) => labelOfKey(r.key!));
    return (
      <div className="panel study">
        <div className="panel-title">復習完了！ Review complete</div>
        <p className="big-score">
          {ok} / {results.length}
        </p>
        {missed.length > 0 && (
          <p>
            Missed items will come back in about 10 minutes and again in later sessions: <b lang="ja">{missed.join('、')}</b>
          </p>
        )}
        <p className="note">
          Still due: {queueInfo(store.s).due.length} · new today: {store.s.daily.newIntroduced}/{store.s.settings.newPerDay}
        </p>
        <div className="row">
          <button
            className="btn"
            onClick={() => {
              const more = buildReviewSession(store.s);
              setItems(more);
              setI(0);
              setResults([]);
            }}
          >
            もう少し More
          </button>
          <button className="btn primary" autoFocus onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    );
  }

  const ex = items[i];
  return (
    <div className="panel study">
      <div className="panel-title">
        復習 Review <span className="note">{i + 1} / {items.length} · due {info.due.length} · new left today {info.newAllowed}</span>
        <button className="btn small ghost close" onClick={onClose}>✕</button>
      </div>
      <div className="progress"><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <ExerciseView
        key={ex.id}
        ex={ex}
        onDone={(ok, ms, chosen) => {
          store.update((s) => {
            recordAnswer(s, ex, ok, ms, chosen);
            if (ok) grantXp(s, 2);
          }, 'learn');
          setResults([...results, { key: ex.key, ok }]);
          setI(i + 1);
        }}
      />
    </div>
  );
}

// ================================================================== exams

type ExamMode = 'practice' | 'mock' | 'diagnostic';

function recordItem(item: TestItem, ok: boolean, ms: number, diagnostic: boolean) {
  store.update((s) => {
    const [first, ...rest] = item.keys;
    if (item.area === 'reading' || item.area === 'listening' || !first) {
      recordComprehension(s, item.area, ok, ms, item.keys);
      encounter(s, item.keys);
    } else {
      encounter(s, item.keys);
      if (diagnostic) {
        // diagnostic seeds the scheduler (known items start further along) without claiming mastery
        const c = s.cards[first];
        if (ok && c && !c.introduced) {
          review(c, 4);
          review(c, 4);
        }
        recordComprehension(s, item.area, ok, ms);
      } else {
        recordAnswer(s, { id: item.id, key: first, area: item.area, mode: 'exam:' + item.section, context: true, instruction: '', prompt: item.prompt, explanation: '' }, ok, ms);
        encounter(s, rest);
      }
    }
  }, 'learn');
}

export function ExamRunner({ mode, section, onClose }: { mode: ExamMode; section?: Section; onClose: () => void }) {
  const items = useMemo(
    () => (mode === 'mock' ? buildMockExam() : mode === 'diagnostic' ? buildDiagnostic() : buildSectionPractice(section ?? '文法形式の判断', 6)),
    [mode, section],
  );
  const [i, setI] = useState(-1);
  const [answers, setAnswers] = useState<{ item: TestItem; picked: number; ms: number }[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const start = useRef(0);
  const qStart = useRef(0);
  const [now, setNow] = useState(Date.now());
  const timed = mode === 'mock';
  const showFeedback = mode === 'practice';

  useEffect(() => {
    if (!timed || i < 0) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [timed, i]);

  const remaining = timed && i >= 0 ? MOCK_TIME_LIMIT_MS - (now - start.current) : 0;
  const timeUp = timed && i >= 0 && i < items.length && remaining <= 0;

  const finishExam = (all: typeof answers) => {
    const sections: PracticeResult['sections'] = {};
    for (const a of all) {
      const sec = (sections[a.item.section] ??= { ok: 0, total: 0, ms: 0 });
      sec.total++;
      sec.ms += a.ms;
      if (a.picked === a.item.answer) sec.ok++;
    }
    const result: PracticeResult = {
      t: Date.now(),
      mode,
      sections,
      mistakes: all.filter((a) => a.picked !== a.item.answer).map((a) => a.item.id),
      durationMs: Date.now() - start.current,
    };
    store.update((s) => {
      s.practice.push(result);
      if (s.practice.length > 50) s.practice.shift();
      grantXp(s, all.filter((a) => a.picked === a.item.answer).length * 3);
      if (mode === 'diagnostic') s.flags.diagnostic_done = true;
    }, 'practice');
  };

  useEffect(() => {
    if (timeUp) {
      finishExam(answers);
      setI(items.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeUp]);

  const title = mode === 'mock' ? '模擬試験 Mock exam (short form)' : mode === 'diagnostic' ? '実力診断 Diagnostic assessment' : `練習 Practice — ${section}`;

  if (i === -1)
    return (
      <div className="panel study">
        <div className="panel-title">{title}<button className="btn small ghost close" onClick={onClose}>✕</button></div>
        <p>{items.length} questions{timed ? ` · time limit ${MOCK_TIME_LIMIT_MS / 60000} minutes` : ''}.</p>
        {mode === 'diagnostic' && (
          <p>
            This estimates where you stand after N3: kanji readings, vocabulary in context, grammar, reading and listening. Results personalise
            your review queue — items you already know are scheduled further out, so you don't repeat beginner material.
          </p>
        )}
        {mode === 'mock' && <p>Answers are revealed at the end, like a real exam. Sections mirror the N2 structure (言語知識・読解 / 聴解) in shortened form.</p>}
        <p className="note">Original practice questions in the style of the JLPT N2 — not official exam material. A good score here does not guarantee passing the real JLPT.</p>
        <button
          className="btn primary"
          autoFocus
          onClick={() => {
            start.current = Date.now();
            qStart.current = performance.now();
            setI(0);
          }}
        >
          はじめる Start
        </button>
      </div>
    );

  if (i >= items.length) return <ExamReport mode={mode} answers={answers} onClose={onClose} title={title} />;

  const item = items[i];
  const answered = picked !== null;
  const choose = (n: number) => {
    if (answered) return;
    const ms = performance.now() - qStart.current;
    const ok = n === item.answer;
    sfx(showFeedback ? (ok ? 'ok' : 'bad') : 'blip');
    recordItem(item, ok, ms, mode === 'diagnostic');
    const next = [...answers, { item, picked: n, ms }];
    setAnswers(next);
    if (showFeedback) setPicked(n);
    else goNext(next);
  };
  const goNext = (all = answers) => {
    setPicked(null);
    qStart.current = performance.now();
    if (i + 1 >= items.length) finishExam(all);
    setI(i + 1);
  };

  return (
    <div className="panel study exam">
      <div className="panel-title">
        {title}
        <span className="note">
          {i + 1}/{items.length} · {item.section}
          {timed && ` · ⏱ ${Math.max(0, Math.floor(remaining / 60000))}:${String(Math.max(0, Math.floor((remaining % 60000) / 1000))).padStart(2, '0')}`}
        </span>
        <button className="btn small ghost close" onClick={onClose}>✕</button>
      </div>
      <div className="progress"><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <div className="ex-instr" lang="ja">{item.instruction}</div>
      {item.passage && <TextPassage title={item.passage.title} body={item.passage.body} />}
      {item.audio && (
        <>
          <AudioButton key={item.id} lines={item.audio.lines.map((l) => ({ text: l.jp, voice: l.voice }))} autoPlay label="▶ 音声" />
          {answered && (
            <div className="transcript">
              {item.audio.lines.map((l, k) => (
                <div key={k}><b>{l.who}：</b>{l.jp}</div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="ex-prompt" lang="ja">
        <Jp text={item.prompt} furigana="off" />
      </div>
      <div className="options">
        {item.options.map((o, n) => (
          <button
            key={n}
            className={`opt ${answered && n === item.answer ? 'correct' : ''} ${answered && n === picked && n !== item.answer ? 'wrong' : ''}`}
            disabled={answered}
            onClick={() => choose(n)}
            {...dbgOk(n === item.answer)}
          >
            <span className="opt-n">{n + 1}</span>
            <span lang="ja">{o}</span>
          </button>
        ))}
      </div>
      {answered && (
        <div className={`feedback ${picked === item.answer ? 'ok' : 'ng'}`}>
          <div className="fb-title">{picked === item.answer ? '正解！' : '残念…'}</div>
          <div className="fb-why"><Rich text={item.why} /></div>
          <button className="btn primary" autoFocus onClick={() => goNext()}>次へ ▶</button>
        </div>
      )}
    </div>
  );
}

function ExamReport({ mode, answers, onClose, title }: { mode: ExamMode; answers: { item: TestItem; picked: number; ms: number }[]; onClose: () => void; title: string }) {
  const bySection = SECTIONS.map((sec) => {
    const a = answers.filter((x) => x.item.section === sec.id);
    return { sec, total: a.length, ok: a.filter((x) => x.picked === x.item.answer).length, ms: a.reduce((t, x) => t + x.ms, 0) };
  }).filter((x) => x.total > 0);
  const total = answers.length;
  const ok = answers.filter((a) => a.picked === a.item.answer).length;
  const prev = store.s.practice.filter((p) => p.mode === mode).slice(-2, -1)[0];
  const prevPct = prev ? Object.values(prev.sections).reduce((a, b) => a + b.ok, 0) / Math.max(1, Object.values(prev.sections).reduce((a, b) => a + b.total, 0)) : null;
  const mistakes = answers.filter((a) => a.picked !== a.item.answer);
  const weak = [...bySection].sort((a, b) => a.ok / a.total - b.ok / b.total).filter((x) => x.ok / x.total < 0.7);
  return (
    <div className="panel study">
      <div className="panel-title">{title} — 結果 Results<button className="btn small ghost close" onClick={onClose}>✕</button></div>
      <p className="big-score">
        {ok} / {total} <small>({Math.round((ok / Math.max(1, total)) * 100)}%)</small>
      </p>
      {prevPct !== null && <p className="note">Previous attempt: {Math.round(prevPct * 100)}%</p>}
      <table className="report">
        <thead>
          <tr><th>Section</th><th>Score</th><th>Avg time</th></tr>
        </thead>
        <tbody>
          {bySection.map((b) => (
            <tr key={b.sec.id} className={b.ok / b.total < 0.6 ? 'weak' : ''}>
              <td lang="ja">{b.sec.id}<br /><small>{b.sec.en}</small></td>
              <td>{b.ok}/{b.total}</td>
              <td>{(b.ms / b.total / 1000).toFixed(1)}s</td>
            </tr>
          ))}
        </tbody>
      </table>
      {weak.length > 0 && (
        <p>
          <b>Focus next:</b> {weak.map((w) => `${w.sec.id} (${w.sec.en})`).join(', ')}
        </p>
      )}
      {mode === 'diagnostic' && <p className="note">Your review queue has been personalised: correctly answered items start further along the schedule; missed items are queued as new learning.</p>}
      {mistakes.length > 0 && (
        <details>
          <summary>Review mistakes ({mistakes.length})</summary>
          {mistakes.map((m, k) => (
            <div key={k} className="mistake">
              <div lang="ja"><Jp text={m.item.prompt} furigana="off" /></div>
              <div>✓ <span lang="ja">{m.item.options[m.item.answer]}</span> · ✗ <span lang="ja">{m.item.options[m.picked]}</span></div>
              <div className="note"><Rich text={m.item.why} /></div>
            </div>
          ))}
        </details>
      )}
      <p className="note">Original N2-style questions. This is practice feedback, not a prediction of your official JLPT result.</p>
      <button className="btn primary" autoFocus onClick={onClose}>閉じる</button>
    </div>
  );
}
