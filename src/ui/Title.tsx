import { useState } from 'react';
import type { LoadResult } from '../core/save';
import { exportToJson } from '../core/save';
import { ExportBox, ImportBox } from './Backup';

function fmtPlay(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export function Title({
  load,
  onContinue,
  onNew,
  onImport,
}: {
  load: LoadResult;
  onContinue: () => void;
  onNew: (name: string) => void;
  onImport: (text: string) => Promise<void>;
}) {
  const [mode, setMode] = useState<'menu' | 'name' | 'confirm'>('menu');
  const [name, setName] = useState('マリア');
  const [confirmText, setConfirmText] = useState('');
  const [box, setBox] = useState<'import' | 'raw' | 'current' | null>(null);
  const hasSave = load.kind === 'ok';

  return (
    <div className="title-screen">
      <div className="title-bg" style={{ backgroundImage: 'url(assets/cg_arrival.webp)' }} />
      <div className="title-art">
        <img className="px t-sprite s1" src="assets/hero_up_0.png" alt="" />
        <img className="px t-sprite s2" src="assets/back_k_fox_blue.png" alt="" />
      </div>
      <div className="title-logo">
        <h1>Kotodama Chronicles</h1>
        <div className="subtitle" lang="ja">― 言葉でつながる、あたらしい世界へ ―</div>
        <div className="tagline">A Japanese RPG for the road from JLPT N3 to N2</div>
      </div>

      <div className="panel title-menu">
        {mode === 'menu' && (
          <>
            {load.kind === 'error' && (
              <div className="warn">
                <b>Your save could not be loaded:</b> {load.message}
                <br />
                It has <b>not</b> been overwritten.{' '}
                <button className="btn small" onClick={() => setBox('raw')}>
                  Show raw save data
                </button>
              </div>
            )}
            {hasSave && (
              <button className="btn primary big" autoFocus onClick={onContinue}>
                ▶ つづきから Continue
                <small>
                  {load.env.playerName} · Lv.{load.env.summary.level} · Day {load.env.summary.day} · {fmtPlay(load.env.summary.playMs)} · saved{' '}
                  {new Date(load.env.savedAt).toLocaleString()}
                  {load.fromBackup && ' (restored from backup slot)'}
                </small>
              </button>
            )}
            <button className={`btn big ${hasSave ? '' : 'primary'}`} autoFocus={!hasSave} onClick={() => setMode(hasSave || load.kind === 'error' ? 'confirm' : 'name')}>
              ✦ はじめから New game
            </button>
            <button className="btn" onClick={() => setBox(box === 'import' ? null : 'import')}>
              ⤓ Import backup
            </button>
            {box === 'import' && <ImportBox hasSave={hasSave} onClose={() => setBox(null)} onImport={(_env, text) => onImport(text)} />}
            {box === 'raw' && load.kind === 'error' && (
              <ExportBox text={exportToJson(load.raw)} filename="kotodama-save-raw.json" onClose={() => setBox(null)} />
            )}
            <p className="note">
              Progress is saved automatically in this browser. Clearing site data erases it — export a backup from Settings now and then.
            </p>
          </>
        )}
        {mode === 'confirm' && (
          <>
            <div className="warn">
              Starting a new game replaces your current save
              {hasSave ? ` (${load.env.playerName}, Lv.${load.env.summary.level})` : ''}. The old save is moved to a recovery slot, but you
              should export it first if you want to keep it.
            </div>
            {hasSave && box !== 'current' && (
              <button className="btn" onClick={() => setBox('current')}>
                Export current save first
              </button>
            )}
            {hasSave && box === 'current' && (
              <ExportBox text={exportToJson(load.env)} filename="kotodama-save-backup.json" onClose={() => setBox(null)} />
            )}
            <label>
              Type <b>NEW</b> to confirm:
              <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} autoFocus />
            </label>
            <div className="row">
              <button className="btn" onClick={() => setMode('menu')}>
                Cancel
              </button>
              <button className="btn primary" disabled={confirmText.trim().toUpperCase() !== 'NEW'} onClick={() => setMode('name')}>
                Continue
              </button>
            </div>
          </>
        )}
        {mode === 'name' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNew(name.trim() || 'マリア');
            }}
          >
            <label>
              あなたの名前は？ Your name:
              <input value={name} maxLength={12} onChange={(e) => setName(e.target.value)} autoFocus lang="ja" />
            </label>
            <div className="row">
              <button type="button" className="btn" onClick={() => setMode('menu')}>
                Back
              </button>
              <button type="submit" className="btn primary">
                日野森へ ▶
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="credits">Original game. Practice questions are N2-style originals, not official JLPT material.</div>
    </div>
  );
}
