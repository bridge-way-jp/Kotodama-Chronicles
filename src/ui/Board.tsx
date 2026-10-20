import { useEffect, useMemo, useState } from 'react';
import { store } from '../core/store';
import type { GameState } from '../core/types';

/**
 * The departure board of a railway station. Destinations unlock as the player visits places; picking one runs the
 * train ride and warps to the other station (see GameView, which passes the actions on as a script).
 */
export interface Dest {
  id: string;
  ja: string;
  en: string;
  kind: 'local' | 'shinkansen';
  map: string;
  x: number;
  y: number;
  when: (s: GameState) => boolean;
  /** train name shown on the board */
  train: string;
  mins: number;
}

const D: Record<string, Dest> = {
  hinomori: { id: 'hinomori', ja: '日野森', en: 'Hinomori', kind: 'local', map: 'town', x: 27, y: 20, when: () => true, train: '普通', mins: 12 },
  kyoto: { id: 'kyoto', ja: '京都', en: 'Kyoto', kind: 'shinkansen', map: 'k_station', x: 20, y: 9, when: (s) => !!s.flags.kyoto_visited, train: 'のぞみ', mins: 8 },
  osaka: { id: 'osaka', ja: '大阪', en: 'Osaka', kind: 'shinkansen', map: 'o_umeda', x: 20, y: 25, when: (s) => !!s.flags.osaka_visited, train: 'のぞみ', mins: 15 },
  tokyo: { id: 'tokyo', ja: '東京', en: 'Tokyo', kind: 'shinkansen', map: 't_station', x: 20, y: 9, when: (s) => !!s.flags.tokyo_visited, train: 'のぞみ', mins: 5 },
  fushimi: { id: 'fushimi', ja: '伏見稲荷', en: 'Fushimi Inari', kind: 'local', map: 'k_fushimi', x: 20, y: 26, when: (s) => !!s.flags.fushimi_visited, train: '奈良線', mins: 6 },
  shiomi: { id: 'shiomi', ja: '潮見町', en: 'Shiomi', kind: 'local', map: 'harbor', x: 10, y: 2, when: (s) => !!s.flags.shiomi_visited, train: '各駅停車', mins: 20 },
  yukimi: { id: 'yukimi', ja: '雪見村', en: 'Yukimi Village', kind: 'local', map: 'mountain', x: 9, y: 19, when: (s) => !!s.flags.yukimi_visited, train: '各駅停車', mins: 25 },
};

export const STATIONS: Record<string, { ja: string; en: string; dests: string[] }> = {
  hinomori: { ja: '日野森駅', en: 'Hinomori', dests: ['tokyo', 'osaka', 'kyoto', 'shiomi', 'yukimi'] },
  kyoto: { ja: '京都駅', en: 'Kyoto', dests: ['fushimi', 'hinomori', 'osaka', 'tokyo'] },
  osaka: { ja: '梅田駅', en: 'Umeda', dests: ['hinomori', 'kyoto', 'tokyo'] },
  tokyo: { ja: '東京駅', en: 'Tokyo', dests: ['hinomori', 'osaka', 'kyoto'] },
  shiomi: { ja: '潮見駅', en: 'Shiomi', dests: ['hinomori'] },
  yukimi: { ja: '雪見駅', en: 'Yukimi', dests: ['hinomori'] },
};

const hhmm = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export function Board({ station, onPick, onClose }: { station: string; onPick: (d: Dest) => void; onClose: () => void }) {
  const st = STATIONS[station] ?? STATIONS.hinomori;
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  const rows = useMemo(() => st.dests.map((id) => D[id]).filter((d) => d.when(store.s)).sort((a, b) => a.mins - b.mins), [st]);
  return (
    <div className="menu-backdrop" onClick={onClose}>
      <div className="panel board" onClick={(e) => e.stopPropagation()}>
        <div className="board-scene" style={{ backgroundImage: 'url(assets/platform.png)' }} aria-hidden />
        <h3 lang="ja">
          {st.ja} <small>{st.en} · 発車案内 Departures</small>
        </h3>
        <div className="board-led" role="list">
          <div className="board-head">
            <span>時刻</span>
            <span>種別</span>
            <span>行き先</span>
            <span>番線</span>
          </div>
          {rows.map((d, i) => {
            const t = new Date(now.getTime() + (d.mins + i * 3) * 60000);
            t.setMinutes(Math.ceil(t.getMinutes() / 5) * 5);
            return (
              <button key={d.id} className="board-row" role="listitem" onClick={() => onPick(d)}>
                <span>{hhmm(t)}</span>
                <span className={d.kind}>{d.train}</span>
                <span lang="ja">
                  {d.ja} <small>{d.en}</small>
                </span>
                <span>{i + 1}番</span>
              </button>
            );
          })}
          {!rows.length && <p className="note">No trains to anywhere you have been yet.</p>}
        </div>
        <button className="btn" onClick={onClose}>閉じる Close</button>
      </div>
    </div>
  );
}
