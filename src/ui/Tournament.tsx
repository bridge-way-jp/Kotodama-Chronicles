import { useState } from 'react';
import { battleExercise, recordAnswer, type Exercise } from '../core/learning';
import { grantXp } from '../core/game';
import { store } from '../core/store';
import { ExerciseView } from './Question';

const AREAS = ['vocab', 'kanji', 'grammar', 'listening'] as const;
const ROUNDS = 12;
const RANKS = [
  { min: 0, ja: '見習い', en: 'Apprentice', pay: 200 },
  { min: 700, ja: '銅', en: 'Bronze', pay: 500 },
  { min: 1300, ja: '銀', en: 'Silver', pay: 900 },
  { min: 1900, ja: '金', en: 'Gold', pay: 1400 },
  { min: 2500, ja: '言葉の達人', en: 'Word Master', pay: 2200 },
];
const rankOf = (pts: number) => [...RANKS].reverse().find((r) => pts >= r.min)!;

/** Postgame challenge after chapter 7: twelve mixed questions, streaks and quick answers score more; pays once a day. */
export function Tournament({ onClose }: { onClose: () => void }) {
  const [items] = useState<Exercise[]>(() => Array.from({ length: ROUNDS }, (_, i) => battleExercise(store.s, AREAS[i % AREAS.length])));
  const [i, setI] = useState(-1);
  const [pts, setPts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [right, setRight] = useState(0);
  const [gain, setGain] = useState<number | null>(null);
  const best = Number(store.s.flags.tournament_best ?? 0);

  if (i < 0)
    return (
      <div className="panel study job">
        <div className="panel-title">言葉の大会 <span className="note">Word Tournament</span></div>
        <p lang="ja">語彙・漢字・文法・聞き取りから12問。連続で正解すると点が増えます。早く答えるとボーナスもあります。</p>
        <p className="note">12 questions from vocabulary, kanji, grammar and listening. Streaks add points and quick answers earn a bonus. Prize money is paid once per day (sleep to reset).</p>
        {best > 0 && <p className="note">Best: {best} pts · {rankOf(best).ja} {rankOf(best).en}</p>}
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setI(0)}>始める Start</button>
          <button className="btn" onClick={onClose}>やめる</button>
        </div>
      </div>
    );

  if (i >= items.length) {
    const rank = rankOf(pts);
    const paid = store.s.flags.tournament_day === store.s.day;
    return (
      <div className="panel study job">
        <div className="panel-title">言葉の大会 <span className="note">Word Tournament</span></div>
        <p className="big-score">{pts} pts</p>
        <p lang="ja"><b>{rank.ja}</b> <span className="note">{rank.en}</span> · {right} / {items.length}</p>
        {pts > best && <p>🏆 New best!</p>}
        <p>{gain ? `+¥${gain}` : 'Prize money was already paid today – come back tomorrow.'}</p>
        <div className="row">
          <button className="btn primary" autoFocus onClick={onClose}>閉じる</button>
        </div>
        {paid && !gain && <p className="note">Your learning progress was still saved.</p>}
      </div>
    );
  }

  const ex = items[i];
  return (
    <div className="panel study job">
      <div className="panel-title">
        言葉の大会 <span className="note">· {i + 1} / {items.length} · {pts} pts{streak > 1 ? ` · 🔥 ${streak}` : ''}</span>
      </div>
      <div className="progress"><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <ExerciseView
        key={ex.id + i}
        ex={ex}
        onDone={(good, ms, chosen) => {
          const s2 = good ? streak + 1 : 0;
          const add = good ? 100 + Math.min(streak, 5) * 20 + (ms < 6000 ? 30 : 0) : 0;
          const total = pts + add;
          const last = i + 1 === items.length;
          let paid = 0;
          store.update((s) => {
            recordAnswer(s, ex, good, ms, chosen);
            if (!last) return;
            if (total > Number(s.flags.tournament_best ?? 0)) s.flags.tournament_best = total;
            if (s.flags.tournament_day !== s.day) {
              s.flags.tournament_day = s.day;
              paid = rankOf(total).pay;
              s.money += paid;
              grantXp(s, 20 + Math.round(total / 100));
            }
          }, 'learn');
          setPts(total);
          setStreak(s2);
          setRight(right + (good ? 1 : 0));
          if (last) setGain(paid || null);
          setI(i + 1);
        }}
      />
    </div>
  );
}
