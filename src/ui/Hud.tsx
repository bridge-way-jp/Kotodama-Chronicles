import { useEffect, useRef, useState } from 'react';
import { bus, type ToastMsg } from '../core/events';
import { store } from '../core/store';
import { QUESTS } from '../content/quests';
import { SPECIES } from '../content/creatures';
import { maxHp } from '../core/game';
import { queueInfo } from '../core/learning';
import { saveStatus } from '../core/persistence';
import { input } from '../game/input';
import type { Dir } from '../core/types';

export function Hud({ onMenu }: { onMenu: (tab?: any) => void }) {
  const s = store.s;
  const [, setV] = useState(0);
  useEffect(() => bus.on('save-status', () => setV((v) => v + 1)), []);
  const main = Object.values(s.quests).find((q) => q.status === 'active' && QUESTS[q.id].kind === 'main');
  const objective = main ? QUESTS[main.id].objectives.find((o) => !main.objectives[o.id]) : null;
  const lead = s.team[0];
  const due = queueInfo(s).due.length;
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
          </button>
        )}
        <div className="hud-right">
          {due > 0 && (
            <button className="hud-box due-box" onClick={() => onMenu('jlpt')} title="Items due for review">
              復習 {due}
            </button>
          )}
          <button className="hud-box menu-btn" onClick={() => onMenu()}>
            <img className="px hud-icon" src="assets/mi_bag.png" alt="" /> メニュー
          </button>
          <div className={`save-dot ${saveStatus.state}`} title={saveStatus.state === 'error' ? `Save failed: ${saveStatus.error}` : saveStatus.last ? `Saved ${new Date(saveStatus.last).toLocaleTimeString()}` : 'Not saved yet'}>
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

export function TouchControls() {
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
    <div className="touch">
      <div className="dpad">
        <button className="up" {...hold('up')}>▲</button>
        <button className="left" {...hold('left')}>◀</button>
        <button className="right" {...hold('right')}>▶</button>
        <button className="down" {...hold('down')}>▼</button>
      </div>
      <div className="abtns">
        <button className="a" onPointerDown={(e) => (e.preventDefault(), input.tap('a'))}>A<small>話す</small></button>
        <button className="b" onPointerDown={(e) => (e.preventDefault(), input.tap('menu'))}>☰</button>
      </div>
    </div>
  );
}
