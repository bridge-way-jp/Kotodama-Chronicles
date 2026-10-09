import { useEffect, useState } from 'react';
import { store, createInitialState } from '../core/store';
import { saves, saveNow, startAutosave } from '../core/persistence';
import { importFromJson, type LoadResult } from '../core/save';
import { Title } from './Title';
import { cloud, initCloud, adoptBase } from '../core/cloud';

/** this device may overwrite the cloud save it has seen (the player chose a save on the title screen) */
const acceptRemote = () => adoptBase(cloud.remote?.savedAt ?? 0);
import { GameView } from './GameView';

export function App() {
  const [screen, setScreen] = useState<'boot' | 'title' | 'game'>('boot');
  const [load, setLoad] = useState<LoadResult>({ kind: 'none' });

  const refresh = async () => {
    const [r] = await Promise.all([saves.load(), Promise.race([initCloud(), new Promise((ok) => setTimeout(ok, 6000))])]);
    setLoad(r);
    setScreen('title');
  };

  useEffect(() => {
    void refresh();
    // ask the browser to keep our storage (best effort)
    navigator.storage?.persist?.().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (screen !== 'game') return;
    return startAutosave();
  }, [screen]);

  if (screen === 'boot') return <div className="boot">読み込み中… Loading…</div>;

  if (screen === 'title')
    return (
      <Title
        load={load}
        onContinue={() => {
          if (load.kind !== 'ok') return;
          acceptRemote();
          store.set(load.env.state, 'load');
          setScreen('game');
        }}
        onContinueCloud={async () => {
          const r = cloud.remote;
          if (!r) return;
          adoptBase(r.savedAt);
          store.set(r.state, 'load');
          await saveNow();
          setScreen('game');
        }}
        onNew={async (name) => {
          if (load.kind !== 'none') await saves.archiveCurrent();
          acceptRemote();
          store.set(createInitialState(name), 'new');
          await saveNow();
          setScreen('game');
        }}
        onImport={async (text) => {
          const env = importFromJson(text);
          acceptRemote();
          store.set(env.state, 'import');
          await saveNow();
          await refresh();
        }}
      />
    );

  return (
    <GameView
      onExit={async () => {
        await saveNow();
        store.set(null, 'load');
        await refresh();
      }}
    />
  );
}
