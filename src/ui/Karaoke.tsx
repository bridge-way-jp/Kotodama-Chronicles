import { tr } from '../core/i18n';
import { useEffect, useMemo, useRef, useState } from 'react';
import { KARAOKE, type KaraokeLine, type KaraokeSong } from '../content/karaoke';
import { grantXp } from '../core/game';
import { shuffle } from '../core/learning';
import { speak, stopSpeech, sfx, ttsAvailable } from '../core/audio';
import { store } from '../core/store';
import { toast } from '../core/events';

const LINE_MS = 9000;
const grade = (pct: number) => (pct >= 0.95 ? 'S' : pct >= 0.8 ? 'A' : pct >= 0.6 ? 'B' : 'C');

interface Round {
  line: KaraokeLine;
  options: string[];
  answer: number;
}
const build = (song: KaraokeSong): Round[] =>
  song.lines.map((line) => {
    const options = shuffle(line.options.slice());
    return { line, options, answer: options.indexOf(line.options[0]) };
  });

/** Karaoke mini game: sing along, fill in the missing grammar of every lyric line before the bar runs out. */
export function Karaoke({ onClose }: { onClose: () => void }) {
  const [song, setSong] = useState<KaraokeSong | null>(null);
  if (!song) {
    const day = store.s.day;
    return (
      <div className="panel study karaoke">
        <div className="panel-title">カラオケ <span className="note">Karaoke</span></div>
        <p lang="ja">好きな曲を選んで、歌詞の空いているところに、正しい言葉を入れよう！</p>
        <p className="note">Pick a song and fill in the missing grammar of each line before the bar runs out. The lyrics are original, written for the game. Prize money is paid once per song per day.</p>
        <div className="kar-list">
          {KARAOKE.map((s) => (
            <button key={s.id} className="btn big" onClick={() => setSong(s)}>
              <span lang="ja">{s.title}</span>
              <small>{tr(s.titleEn)} · {s.mood} · best {String(store.s.flags[`karaoke_best_${s.id}`] ?? '–')}{store.s.flags[`karaoke_${s.id}`] === day ? ' · paid today' : ''}</small>
            </button>
          ))}
        </div>
        <button className="btn" onClick={onClose}>やめる</button>
      </div>
    );
  }
  return <Stage song={song} onBack={() => setSong(null)} onClose={onClose} />;
}

function Stage({ song, onBack, onClose }: { song: KaraokeSong; onBack: () => void; onClose: () => void }) {
  const rounds = useMemo(() => build(song), [song]);
  const [i, setI] = useState(-1);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(1);
  const [sung, setSung] = useState<string[]>([]);
  const t0 = useRef(0);
  const paid = useRef<number | null>(null);

  // the countdown of the current line
  useEffect(() => {
    if (i < 0 || i >= rounds.length || picked !== null) return;
    t0.current = performance.now();
    const t = setInterval(() => {
      const f = 1 - (performance.now() - t0.current) / LINE_MS;
      setLeft(Math.max(0, f));
      if (f <= 0) answer(-1);
    }, 80);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, picked]);
  useEffect(() => () => stopSpeech(), []);

  const answer = (n: number) => {
    if (picked !== null) return;
    const r = rounds[i];
    const ok = n === r.answer;
    sfx(ok ? 'ok' : 'bad');
    setPicked(n);
    const text = r.line.jp.replace('＿＿', r.options[r.answer]);
    setSung((l) => [...l, text]);
    if (ok) {
      const bonus = Math.min(combo, 5) * 20 + Math.round(left * 40);
      setScore((s) => s + 100 + bonus);
      setCombo((c) => c + 1);
      setRight((x) => x + 1);
    } else setCombo(0);
    if (ttsAvailable()) void speak([{ text }], store.s.settings.ttsRate ?? 1);
  };
  const next = () => {
    stopSpeech();
    const last = i + 1 >= rounds.length;
    setPicked(null);
    setLeft(1);
    setI(i + 1);
    if (last) finish();
  };
  const finish = () => {
    store.update((s) => {
      const best = Number(s.flags[`karaoke_best_${song.id}`] ?? 0);
      if (score > best) s.flags[`karaoke_best_${song.id}`] = score;
      if (s.flags[`karaoke_${song.id}`] !== s.day) {
        s.flags[`karaoke_${song.id}`] = s.day;
        paid.current = right * 40 + (right === rounds.length ? 200 : 0);
        s.money += paid.current;
        grantXp(s, 15 + right * 3);
      }
    }, 'learn');
    if (right === rounds.length) toast('パーフェクト！ 拍手がなりやまない！', 'level');
  };

  if (i < 0)
    return (
      <div className="panel study karaoke">
        <div className="panel-title">{song.title} <span className="note">{tr(song.titleEn)}</span></div>
        <div className="kar-stage"><div className="kar-neon">♪ {song.mood} ♪</div></div>
        <p className="note">{rounds.length} lines · {LINE_MS / 1000} seconds each · quick answers and combos score more.</p>
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setI(0)}>歌う Sing</button>
          <button className="btn" onClick={onBack}>曲を選ぶ</button>
        </div>
      </div>
    );

  if (i >= rounds.length) {
    const pct = right / rounds.length;
    return (
      <div className="panel study karaoke">
        <div className="panel-title">{song.title} — 結果 Result</div>
        <div className="kar-stage"><div className="kar-grade">{grade(pct)}</div></div>
        <p className="big-score">{score} pts · {right}/{rounds.length}</p>
        <p>{paid.current ? `+¥${paid.current}` : 'Prize money for this song was already paid today.'}</p>
        <details>
          <summary>歌詞 Lyrics</summary>
          {sung.map((l, k) => <p key={k} lang="ja">{l}</p>)}
        </details>
        <div className="row">
          <button className="btn primary" autoFocus onClick={onBack}>もう一曲</button>
          <button className="btn" onClick={onClose}>閉じる</button>
        </div>
      </div>
    );
  }

  const r = rounds[i];
  const [before, after] = r.line.jp.split('＿＿');
  return (
    <div className="panel study karaoke">
      <div className="panel-title">
        {song.title} <span className="note">· {i + 1}/{rounds.length} · {score} pts{combo > 1 ? ` · 🔥${combo}` : ''}</span>
      </div>
      <div className="kar-stage">
        {sung.slice(-2).map((l, k) => <div key={k} className="kar-old" lang="ja">{l}</div>)}
        <div className="kar-line" lang="ja">
          {before}
          <span className={`kar-gap ${picked === null ? '' : picked === r.answer ? 'ok' : 'ng'}`}>{picked === null ? '＿＿' : r.options[r.answer]}</span>
          {after}
        </div>
      </div>
      <div className="kar-bar"><div style={{ width: `${left * 100}%` }} /></div>
      <div className="options">
        {r.options.map((o, n) => (
          <button key={n} className={`opt ${picked !== null ? (n === r.answer ? 'correct' : n === picked ? 'wrong' : '') : ''}`} disabled={picked !== null} onClick={() => answer(n)}>
            <span className="opt-n">{n + 1}</span>
            <span lang="ja">{o}</span>
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className={`feedback ${picked === r.answer ? 'ok' : 'ng'}`}>
          <div className="fb-title">{picked === r.answer ? '正解！' : picked < 0 ? '時間切れ…' : '残念…'}</div>
          <div className="fb-why">{tr(r.line.en)}</div>
          <div className="note">{tr(r.line.why)}</div>
          <button className="btn primary" autoFocus onClick={next}>次へ ▶</button>
        </div>
      )}
    </div>
  );
}
