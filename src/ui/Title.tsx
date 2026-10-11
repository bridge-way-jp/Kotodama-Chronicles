import { useEffect, useState } from 'react';
import { playMusic } from '../core/audio';
import type { LoadResult } from '../core/save';
import { exportToJson } from '../core/save';
import { ExportBox, ImportBox } from './Backup';
import { CloudLogin, useCloud } from './CloudPanel';
import { cloudEnabled } from '../core/cloud';

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
  onContinueCloud,
}: {
  load: LoadResult;
  onContinueCloud: () => void;
  onContinue: () => void;
  onNew: (name: string) => void;
  onImport: (text: string) => Promise<void>;
}) {
  const [mode, setMode] = useState<'menu' | 'name' | 'confirm'>('menu');
  const [name, setName] = useState('マリア');
  const [confirmText, setConfirmText] = useState('');
  const [box, setBox] = useState<'import' | 'raw' | 'current' | 'account' | null>(null);
  const c = useCloud();
  // browsers block autoplay: start the title theme with the first click or key press
  useEffect(() => {
    const start = () => playMusic('title');
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, []);
  const remote = c.user ? c.remote : null;
  const hasSave = load.kind === 'ok' || !!remote;
  const local = load.kind === 'ok' ? load.env : null;
  const cloudNewer = !!remote && (!local || remote.savedAt > local.savedAt + 1000);
  const current = local ?? remote;

  return (
    <div className="title-screen">
      <div className="title-bg" />
      <div className="title-logo">
        <h1>
          <img src="assets/title_logo.png" alt="Kotodama Chronicles" />
        </h1>
        <div className="subtitle" lang="ja">
          言葉でつながる、あたらしい世界へ
        </div>
        <div className="tagline">A Japanese learning RPG · from JLPT N3 to N2</div>
      </div>

      <div className="title-menu">
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
            {remote && cloudNewer && (
              <button className="t-btn t-main" autoFocus onClick={onContinueCloud}>
                <span className="t-ico">☁</span>
                <span className="t-lbl">
                  <b lang="ja">
                    つづきから <span>Continue (cloud)</span>
                  </b>
                  <small lang="ja">
                    {remote.playerName} · Lv.{remote.summary.level} · Day {remote.summary.day}
                  </small>
                  <small>
                    {fmtPlay(remote.summary.playMs)} played · saved {new Date(remote.savedAt).toLocaleString()}
                  </small>
                </span>
                <span className="t-chev">›</span>
              </button>
            )}
            {local && load.kind === 'ok' && (
              <button className={`t-btn ${cloudNewer ? '' : 't-main'}`} autoFocus={!cloudNewer} onClick={onContinue}>
                <span className="t-ico">▶</span>
                <span className="t-lbl">
                  <b lang="ja">
                    つづきから <span>Continue</span>
                  </b>
                  <small lang="ja">
                    {load.env.playerName} · Lv.{load.env.summary.level} · Day {load.env.summary.day}
                  </small>
                  <small>
                    {fmtPlay(load.env.summary.playMs)} played
                    {load.fromBackup && ' · restored from backup slot'}
                    {cloudNewer && ' · this device (older than the cloud save)'}
                  </small>
                </span>
                <span className="t-chev">›</span>
              </button>
            )}
            <button
              className={`t-btn ${hasSave ? '' : 't-main'}`}
              autoFocus={!hasSave}
              onClick={() => setMode(hasSave || load.kind === 'error' ? 'confirm' : 'name')}
            >
              <span className="t-ico t-sakura">✿</span>
              <span className="t-lbl">
                <b lang="ja">
                  はじめから <span>New game</span>
                </b>
              </span>
              <span className="t-chev">›</span>
            </button>
            <button className="t-link" onClick={() => setBox(box === 'import' ? null : 'import')}>
              ⤓ Import backup
            </button>
            {box === 'import' && <ImportBox hasSave={hasSave} onClose={() => setBox(null)} onImport={(_env, text) => onImport(text)} />}
            {box === 'raw' && load.kind === 'error' && (
              <ExportBox text={exportToJson(load.raw)} filename="kotodama-save-raw.json" onClose={() => setBox(null)} />
            )}
            <div className="t-divider" />
            <div className="t-status" title="Progress is saved automatically in this browser. Clearing site data erases it — export a backup from Settings now and then.">
              {hasSave ? '✓ Progress saved' : 'Progress is saved automatically'}
              {c.user ? ' · ☁ cloud sync on' : ' in this browser'}
            </div>
            {cloudEnabled && (
              <button className="t-link small" onClick={() => setBox(box === 'account' ? null : 'account')}>
                Account
              </button>
            )}
            {box === 'account' && <CloudLogin />}
            <div className="t-foot">Original game · Unofficial JLPT practice</div>
          </>
        )}
        {mode === 'confirm' && (
          <>
            <div className="warn">
              Starting a new game replaces your current save
              {current ? ` (${current.playerName}, Lv.${current.summary.level})` : ''}{remote ? ' – also in the cloud' : ''}. The old save is moved to a recovery slot, but you
              should export it first if you want to keep it.
            </div>
            {hasSave && box !== 'current' && (
              <button className="btn" onClick={() => setBox('current')}>
                Export current save first
              </button>
            )}
            {hasSave && box === 'current' && (
              <ExportBox text={exportToJson(current)} filename="kotodama-save-backup.json" onClose={() => setBox(null)} />
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
    </div>
  );
}
