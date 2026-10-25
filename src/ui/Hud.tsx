import { useEffect, useRef, useState } from 'react';
import { isDe } from '../core/i18n';
import { bus, type ToastMsg } from '../core/events';
import { store } from '../core/store';
import { QUESTS } from '../content/quests';
import { guideFor } from '../core/guide';
import { SPECIES } from '../content/creatures';
import { maxHp } from '../core/game';
import { DAILY_GOAL, answersToday, queueInfo, streakDays } from '../core/learning';
import { saveStatus } from '../core/persistence';
import { input } from '../game/input';
import type { Dir } from '../core/types';
import { openRequests } from './Progress';
import { dueHere } from '../core/recall';
import { SCRIPTS } from '../content/scripts';
import { NPCS } from '../content/npcs';
import { pickRule, type Step } from '../core/script';

/** between two chapters: who starts the next main quest now (looked up once per quest state) */
let nextCache: { key: string; who: string | null } = { key: '', who: null };
function nextStarter(s: typeof store.s): string | null {
  const key = Object.values(s.quests).map((q) => q.id + q.status).join() + s.chapter;
  if (nextCache.key === key) return nextCache.who;
  const starts = (steps: Step[]): boolean =>
    steps.some((st) => ('do' in st && st.do.some((a) => 'startQuest' in a && QUESTS[a.startQuest]?.kind === 'main')) || ('choice' in st && st.choice.some((c) => c.then && starts(c.then))) || ('if' in st && (starts(st.then) || starts(st.else ?? []))));
  const who = Object.keys(SCRIPTS).find((id) => NPCS[id] && starts(pickRule(s, SCRIPTS[id]) ?? [])) ?? null;
  nextCache = { key, who };
  return who;
}

export function Hud({ onMenu, onPlace }: { onMenu: (tab?: any) => void; onPlace?: (map: string) => void }) {
  const s = store.s;
  const [, setV] = useState(0);
  useEffect(() => bus.on('save-status', () => setV((v) => v + 1)), []);
  const main = Object.values(s.quests).find((q) => q.status === 'active' && QUESTS[q.id].kind === 'main');
  const objective = main ? QUESTS[main.id].objectives.find((o) => !main.objectives[o.id]) : null;
  const guide = main ? guideFor(s, main.id, s.map) : null;
  const next = main ? null : nextStarter(s);
  const lead = s.team[0];
  const due = queueInfo(s).due.length;
  // words learned at this very place that are due: recall them where they were heard
  const here = onPlace ? dueHere(s, s.map).length : 0;
  return (
    <>
      <div className="hud-top">
        <div className="hud-box player-box">
          <img className="px" src="assets/portrait_hero_neutral.png" alt="" />
          <div>
            <div>
              <b>{s.playerName}</b> Lv.{s.level}
            </div>
            <div className="small">
              ¥{s.money} · Day {s.day}
            </div>
          </div>
          {lead && (
            <div className="lead-mini" title={SPECIES[lead.speciesId].name}>
              <img className="px" src={`assets/${SPECIES[lead.speciesId].sprite}.png`} alt="" />
              <div className="mini-hp">
                <div style={{ width: `${(lead.hp / maxHp(lead)) * 100}%` }} />
              </div>
            </div>
          )}
        </div>
        {main && objective && (
          <button className="hud-box quest-box" onClick={() => onMenu('quests')}>
            <span className="qkind main">メイン</span>
            <span lang="ja">{QUESTS[main.id].title}</span>
            <div className="small">▸ {objective.text}</div>
            {guide && (
              <div className="small guide" title={guide.en}>
                📍 <span lang="ja">{guide.ja}</span> <span className="guide-en">{guide.en}</span>
                {guide.far && <span className="guide-far"> · 駅・バスで</span>}
                {guide.route && <div className="guide-route" lang="ja">➜ {guide.route}</div>}
              </div>
            )}
          </button>
        )}
        {!main && next && (
          <button className="hud-box quest-box" onClick={() => onMenu('quests')}>
            <span className="qkind main">次へ</span>
            <span lang="ja">{NPCS[next].name}に会いに行こう</span>
            <div className="small">▸ The story goes on with {NPCS[next].nameEn ?? NPCS[next].name} (look for the “!”)</div>
          </button>
        )}
        <div className="hud-right">
          <div className="hud-box goal-box" title="Daily goal: answer 20 questions to keep your streak">
            🔥{streakDays(s)} <small>{Math.min(answersToday(s), DAILY_GOAL)}/{DAILY_GOAL}</small>
          </div>
          {openRequests() > 0 && (
            <button className="hud-box req-box" onClick={() => onMenu('diary')} title="Today's requests from people">
              ✉ {openRequests()}
            </button>
          )}
          {here > 0 && (
            <button className="hud-box memory-box" onClick={() => onPlace?.(s.map)} title="Words you learned at this place are due — recall them here">
              💭 {here}
            </button>
          )}
          {due > 0 && (
            <button className="hud-box due-box" onClick={() => onMenu('jlpt')} title="Items due for review">
              復習 {due}
            </button>
          )}
          <button className="hud-box menu-btn" onClick={() => onMenu()}>
            <img className="px hud-icon" src="assets/mi_bag.png" alt="" /> メニュー
          </button>
          <div className={`save-dot ${saveStatus.state}`} title={saveStatus.state === 'error' ? `Save failed: ${saveStatus.error}` : saveStatus.last ? `${isDe() ? 'Gespeichert' : 'Saved'} ${new Date(saveStatus.last).toLocaleTimeString()}` : 'Not saved yet'}>
            {saveStatus.state === 'saving' ? '…' : saveStatus.state === 'error' ? '!' : '✓'}
          </div>
        </div>
      </div>
    </>
  );
}

export function Toasts() {
  const [items, setItems] = useState<(ToastMsg & { id: number })[]>([]);
  const n = useRef(0);
  useEffect(
    () =>
      bus.on('toast', (t: ToastMsg) => {
        const id = ++n.current;
        setItems((x) => [...x.slice(-4), { ...t, id }]);
        setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 4200);
      }),
    [],
  );
  return (
    <div className="toasts">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.kind ?? 'info'}`} lang="ja">
          {t.text}
        </div>
      ))}
    </div>
  );
}

export function MapBanner() {
  const [m, setM] = useState<{ name: string; nameJa: string; k: number } | null>(null);
  useEffect(
    () =>
      bus.on('map-entered', (p) => {
        const k = Date.now();
        setM({ ...p, k });
        setTimeout(() => setM((cur) => (cur?.k === k ? null : cur)), 2200);
      }),
    [],
  );
  if (!m) return null;
  return (
    <div className="map-banner" key={m.k}>
      <div lang="ja">{m.nameJa}</div>
      <small>{m.name}</small>
    </div>
  );
}

/** a stick that appears under the thumb: touch the world anywhere and drag to walk, tap to talk or examine */
function StickZone() {
  const [stick, setStick] = useState<{ x: number; y: number; dx: number; dy: number } | null>(null);
  const g = useRef<{ id: number; x: number; y: number; t: number; moved: boolean; dir: Dir | null } | null>(null);
  const RADIUS = 52;
  const setDir = (d: Dir | null) => {
    const cur = g.current;
    if (!cur || cur.dir === d) return;
    if (cur.dir) input.release(cur.dir);
    if (d) input.press(d);
    cur.dir = d;
  };
  const end = (e: React.PointerEvent) => {
    const cur = g.current;
    if (!cur || cur.id !== e.pointerId) return;
    setDir(null);
    if (!cur.moved && Date.now() - cur.t < 300 && e.type === 'pointerup') input.tap('a');
    g.current = null;
    setStick(null);
  };
  useEffect(() => () => input.releaseAll(), []);
  return (
    <div
      className="stick-zone"
      onPointerDown={(e) => {
        if (g.current) return;
        e.preventDefault();
        e.currentTarget.setPointerCapture?.(e.pointerId);
        g.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: Date.now(), moved: false, dir: null };
        setStick({ x: e.clientX, y: e.clientY, dx: 0, dy: 0 });
      }}
      onPointerMove={(e) => {
        const cur = g.current;
        if (!cur || cur.id !== e.pointerId) return;
        let dx = e.clientX - cur.x;
        let dy = e.clientY - cur.y;
        const len = Math.hypot(dx, dy);
        if (len > 10) cur.moved = true;
        if (len > RADIUS) {
          // the stick follows the thumb, so a long drag never needs a re-centre
          cur.x += (dx / len) * (len - RADIUS);
          cur.y += (dy / len) * (len - RADIUS);
          dx = e.clientX - cur.x;
          dy = e.clientY - cur.y;
        }
        // a small dead zone, and a bias towards the direction already walked so diagonals do not jitter
        if (len < 16) setDir(null);
        else {
          const horiz = Math.abs(dx) > Math.abs(dy) * (cur.dir === 'up' || cur.dir === 'down' ? 1.4 : 0.71);
          setDir(horiz ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
        }
        setStick({ x: cur.x, y: cur.y, dx, dy });
      }}
      onPointerUp={end}
      onPointerCancel={end}
    >
      {stick && (
        <div className="stick-base" style={{ left: stick.x, top: stick.y }}>
          <div className="stick-knob" style={{ transform: `translate(${stick.dx}px, ${stick.dy}px)` }} />
        </div>
      )}
    </div>
  );
}

export function TouchControls() {
  const mode = store.s.settings.touchMode ?? 'stick';
  const hold = (d: Dir) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      input.press(d);
    },
    onPointerUp: () => input.release(d),
    onPointerCancel: () => input.release(d),
    onPointerLeave: () => input.release(d),
  });
  return (
    <>
    {mode === 'stick' && <StickZone />}
    <div className={`touch ${mode}`}>
      {mode === 'dpad' ? <div className="dpad">
        <button className="up" {...hold('up')}>▲</button>
        <button className="left" {...hold('left')}>◀</button>
        <button className="right" {...hold('right')}>▶</button>
        <button className="down" {...hold('down')}>▼</button>
      </div> : <div />}
      <div className="abtns">
        <button className="a" onPointerDown={(e) => (e.preventDefault(), input.tap('a'))}><b>A</b><small>話す</small></button>
        <button className="b" onPointerDown={(e) => (e.preventDefault(), input.tap('menu'))}>☰</button>
      </div>
    </div>
    </>
  );
}
