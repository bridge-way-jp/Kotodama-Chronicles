import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type Phaser from 'phaser';
import { createGame } from '../game/PhaserGame';
import { input } from '../game/input';
import { bus } from '../core/events';
import { store } from '../core/store';
import { pickRule, type Step } from '../core/script';
import { healTeam, runAction, type ActionHooks } from '../core/game';
import { MAP_MUSIC, busSound, currentMusic, duckMusic, playMusic, setMusicVolume, setSfx, sfx, stopBusSound, stopMusic, stopSpeech, stopTrainSound, trainSound } from '../core/audio';
import { RIDE_MS } from '../core/ride';
import { BusRide } from './BusRide';
import { SCRIPTS } from '../content/scripts';
import { saveNow } from '../core/persistence';
import type { BattleSetup } from '../core/battle';
import { ScriptRunner } from './Dialogue';
import { Battle } from './Battle';
import { Menu, type MenuTab } from './Menu';
import { JobSession } from './Job';
import { Garden } from './Garden';
import { ReviewSession, ExamRunner } from './Study';
import { GlossPopup } from './Cards';
import { Hud, MapBanner, Toasts, TouchControls } from './Hud';
import type { Section } from '../core/exam';

type Overlay =
  | { id: number; kind: 'script'; steps: Step[] }
  | { id: number; kind: 'battle'; setup: BattleSetup }
  | { id: number; kind: 'menu'; tab?: MenuTab }
  | { id: number; kind: 'review' }
  | { id: number; kind: 'job'; job: string }
  | { id: number; kind: 'garden' }
  | { id: number; kind: 'exam'; mode: 'practice' | 'mock' | 'diagnostic'; section?: Section };

type NewOverlay = Overlay extends infer O ? (O extends Overlay ? Omit<O, 'id'> : never) : never;

const INTRO: Step[] = [
  { cg: 'cg_chapter1', say: '第一章　日野森の春', en: 'Chapter 1 — Spring in Hinomori' },
  { cg: 'cg_arrival', say: '春。@nameは、新しい生活を始めるために、日本の小さな町・{日野森|ひのもり}へやってきた。', en: 'Spring. @name has come to Hinomori, a small Japanese town, to start a new life.' },
  { say: 'JLPT N3には合格した。次の目標は、N2。そして、日本語で本当に生きていけるようになること。', en: 'You passed the JLPT N3. The next goal: N2 — and being able to truly live your life in Japanese.' },
  {
    say: '（操作：矢印キー / WASD で移動、Space / Enter で話す・調べる、Esc / M でメニュー。点線の言葉をタップすると意味が見られる。EN ボタンで英語訳。）',
    en: 'Controls: arrow keys / WASD to move · Space / Enter to talk or examine · Esc / M for the menu. Tap dotted words for their meaning; the EN button shows a translation.',
  },
  {
    say: '始める前に、実力診断テスト（約10分）を受けますか？ 結果に合わせて、復習の内容が調整されます。',
    en: 'Before you start, take the diagnostic (about 10 min)? Your review queue will be adjusted to the results.',
  },
  {
    choice: [
      { text: '受ける', en: 'Take the diagnostic now', then: [{ do: [{ open: 'diagnostic' }] }] },
      { text: 'あとで（机でいつでも受けられる）', en: 'Later — available any time at your desk' },
    ],
  },
  { do: [{ flag: 'intro_done' }, { startQuest: 'mq1' }] },
];

export function GameView({ onExit }: { onExit: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const nextId = useRef(1);
  useSyncExternalStore(store.subscribe, store.getVersion);

  const push = useCallback((o: NewOverlay) => {
    const id = nextId.current++;
    setOverlays((x) => [...x, { ...o, id } as Overlay]);
    return id;
  }, []);
  const remove = useCallback((id: number) => {
    setOverlays((x) => x.filter((o) => o.id !== id));
  }, []);

  const [ride, setRide] = useState<null | 'bus' | 'local' | 'shinkansen'>(null);
  const endRide = useCallback(() => {
    stopBusSound();
    stopTrainSound();
    setRide(null);
  }, []);
  useEffect(() => {
    if (!ride) return;
    duckMusic(0.35);
    return () => duckMusic(1);
  }, [ride]);

  const hooks: ActionHooks = {
    warp: (map, x, y) => bus.emit('warp', { map, x, y }),
    music: (key) => playMusic(key === 'map' ? MAP_MUSIC[store.s.map] ?? 'town' : key),
    bus: (mode) => {
      bus.emit('bus', { mode });
      if (mode === 'arrive') busSound('arrive');
      else {
        input.locked = true;
        input.releaseAll();
        busSound('ride', RIDE_MS / 1000);
        setRide('bus');
      }
    },
    train: (kind) => {
      input.locked = true;
      input.releaseAll();
      trainSound(kind, RIDE_MS / 1000);
      setRide(kind);
    },
    open: (what) => {
      if (what === 'review') push({ kind: 'review' });
      else if (what === 'dashboard') push({ kind: 'menu', tab: 'jlpt' });
      else if (what === 'diagnostic') push({ kind: 'exam', mode: 'diagnostic' });
      else if (what === 'menu') push({ kind: 'menu' });
      else if (what === 'garden') push({ kind: 'garden' });
      else if (what.startsWith('job:')) push({ kind: 'job', job: what.slice(4) });
    },
  };

  // battles get a quieter mix so the Japanese questions stay in focus
  const inBattle = overlays.some((o) => o.kind === 'battle' || o.kind === 'exam');
  useEffect(() => {
    duckMusic(inBattle ? 0.7 : 1);
  }, [inBattle]);

  // lock world input while any overlay is open
  useEffect(() => {
    input.locked = overlays.length > 0 || !!ride;
    if (overlays.length) input.releaseAll();
  }, [overlays.length, ride]);

  useEffect(() => {
    setSfx(store.s.settings.sfx);
    setMusicVolume(store.s.settings.musicVolume ?? 0.5);
    if (!gameRef.current && hostRef.current) gameRef.current = createGame(hostRef.current);
    const offs = [
      bus.on('interact', ({ id }) => {
        const rules = SCRIPTS[id];
        if (!rules) return;
        const steps = pickRule(store.s, rules);
        if (steps) {
          sfx('open');
          push({ kind: 'script', steps });
        }
      }),
      bus.on('message', ({ text, en }) => push({ kind: 'script', steps: [{ say: text, en }] })),
      bus.on('encounter', (p) => push({ kind: 'battle', setup: { species: p.species, level: p.level, recruitable: true, bg: p.bg } })),
      bus.on('open-menu', () => push({ kind: 'menu' })),
      bus.on('map-entered', ({ id }) => playMusic(MAP_MUSIC[id] ?? 'town')),
    ];
    if (!store.s.flags.intro_done) push({ kind: 'script', steps: INTRO });
    return () => {
      offs.forEach((o) => o());
      stopSpeech();
      stopMusic();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ↑↑↓↓←→←→ B A while walking around: an old spell still works here
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let at = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      at = e.code === code[at] ? at + 1 : e.code === code[0] ? 1 : 0;
      if (at < code.length) return;
      at = 0;
      if (!overlays.length && !store.s.flags.secret_konami) bus.emit('interact', { id: 'egg_konami', kind: 'object' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlays]);

  // Esc closes the topmost closable overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Escape') return;
      const top = overlays[overlays.length - 1];

      if (top && (top.kind === 'menu' || top.kind === 'review')) {
        input.consume('menu');
        remove(top.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlays, remove]);

  const top = overlays[overlays.length - 1];

  const renderOverlay = (o: Overlay) => {
    switch (o.kind) {
      case 'script':
        return (
          <ScriptRunner
            steps={o.steps}
            hooks={hooks}
            onEnd={() => {
              remove(o.id);
              // a scene's own music (memory, onsen, festival, lighthouse) ends with the scene
              if (['memory', 'onsen', 'festival', 'lighthouse'].includes(currentMusic())) playMusic(MAP_MUSIC[store.s.map] ?? 'town');
              void saveNow();
            }}
          />
        );
      case 'battle':
        return (
          <div className="overlay-full">
            <Battle
              setup={o.setup}
              onEnd={(r) => {
                remove(o.id);
                if (r === 'lose') {
                  // gentle defeat: wake up at home, nothing learned is lost
                  store.update((s) => {
                    healTeam(s);
                    runAction(s, { time: 'morning' });
                  }, 'battle');
                  bus.emit('warp', { map: 'apartment', x: 4, y: 4, facing: 'down' });
                  push({
                    kind: 'script',
                    steps: [{ say: '……気がつくと、自分の部屋にいた。言霊たちも、ぐっすり休んで元気になったようだ。', en: '…You wake up in your room. Your Kotodama have rested and recovered.' }],
                  });
                }
                void saveNow();
              }}
            />
          </div>
        );
      case 'menu':
        return (
          <Menu
            tab={o.tab}
            onClose={() => remove(o.id)}
            actions={{
              openReview: () => push({ kind: 'review' }),
              openExam: (mode, section) => push({ kind: 'exam', mode, section }),
              toTitle: onExit,
            }}
          />
        );
      case 'garden':
        return (
          <div className="overlay-panel">
            <Garden onClose={() => remove(o.id)} onWater={() => (remove(o.id), push({ kind: 'review' }))} />
          </div>
        );
      case 'job':
        return (
          <div className="overlay-panel">
            <JobSession id={o.job} onClose={() => remove(o.id)} />
          </div>
        );
      case 'review':
        return (
          <div className="overlay-panel">
            <ReviewSession onClose={() => remove(o.id)} />
          </div>
        );
      case 'exam':
        return (
          <div className="overlay-panel">
            <ExamRunner mode={o.mode} section={o.section} onClose={() => remove(o.id)} />
          </div>
        );
    }
  };



  return (
    <div className="game-root">
      <div className="world" ref={hostRef} />
      <Hud onMenu={(tab) => push({ kind: 'menu', tab })} />
      <MapBanner />
      {!top && <TouchControls />}
      {overlays.map((o) => (
        <div key={o.id} className="overlay-slot" style={{ display: o === top ? 'contents' : 'none' }}>
          {renderOverlay(o)}
        </div>
      ))}
      {ride && <BusRide kind={ride} onDone={endRide} />}
      <GlossPopup />
      <Toasts />
    </div>
  );
}
