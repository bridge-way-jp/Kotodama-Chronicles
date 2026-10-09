import { useEffect, useState } from 'react';
import { store, createInitialState } from '../core/store';
import { saves, saveNow, startAutosave } from '../core/persistence';
import { importFromJson, type LoadResult } from '../core/save';
import { Title } from './Title';
import { GameView } from './GameView';

export function App() {
  const [screen, setScreen] = useState<'boot' | 'title' | 'game'>('boot');
  const [load, setLoad] = useState<LoadResult>({ kind: 'none' });

  const refresh = async () => {
    const r = await saves.load();
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
          store.set(load.env.state, 'load');
          setScreen('game');
        }}
        onNew={async (name) => {
          if (load.kind !== 'none') await saves.archiveCurrent();
          store.set(createInitialState(name), 'new');
          await saveNow();
          setScreen('game');
        }}
        onImport={async (text) => {
          const env = importFromJson(text);
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
