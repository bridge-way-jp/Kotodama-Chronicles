import { useEffect, useState } from 'react';
import { bus } from '../core/events';
import { cloud, cloudEnabled, adoptBase, pushNow, refreshRemote, signIn, signOut } from '../core/cloud';
import { makeEnvelope } from '../core/save';
import { store } from '../core/store';
import { saveNow } from '../core/persistence';

/** re-renders on every cloud status change */
export function useCloud() {
  const [, setN] = useState(0);
  useEffect(() => bus.on('cloud', () => setN((n) => n + 1)), []);
  return cloud;
}

function ago(t: number) {
  if (!t) return '—';
  const s = Math.round((Date.now() - t) / 1000);
  return s < 60 ? `vor ${s} s` : s < 3600 ? `vor ${Math.round(s / 60)} min` : new Date(t).toLocaleString();
}

/** small login row for the title screen */
export function CloudLogin() {
  const c = useCloud();
  const [err, setErr] = useState('');
  if (!cloudEnabled) return null;
  if (!c.ready) return <p className="note">☁ Cloud wird geladen…</p>;
  if (!c.user)
    return (
      <>
        <button className="btn" onClick={() => signIn().catch((e) => setErr(e.message))}>
          ☁ Mit Google anmelden <small>Spielstand auf allen Geräten</small>
        </button>
        {err && <p className="warn">{err}</p>}
      </>
    );
  return (
    <p className="note cloud-row">
      ☁ Angemeldet als <b>{c.user.email ?? c.user.name}</b>
      {c.state === 'error' && <span className="warn"> · {c.error}</span>}{' '}
      <button className="btn small ghost" onClick={() => void signOut()}>abmelden</button>
    </p>
  );
}

/** cloud section of the settings tab */
export function CloudSettings() {
  const c = useCloud();
  const [busy, setBusy] = useState(false);
  if (!cloudEnabled)
    return <p className="note">Cloud-Speicherung ist noch nicht eingerichtet (siehe CLOUD_SETUP.md).</p>;
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try { await fn(); } finally { setBusy(false); }
  };
  if (!c.user)
    return (
      <div>
        <p className="note">Melde dich an, damit dein Spielstand auf Handy, Tablet und PC derselbe ist.</p>
        <CloudLogin />
      </div>
    );
  const stateText = { idle: 'bereit', syncing: 'lädt hoch…', synced: `gesichert ${ago(c.lastSync)}`, conflict: 'Konflikt', error: `Fehler: ${c.error}` }[c.state];
  return (
    <div className="cloud-settings">
      <CloudLogin />
      <p>Status: <b>{stateText}</b></p>
      {c.state === 'conflict' && c.remote && (
        <div className="warn">
          Auf einem anderen Gerät wurde weitergespielt ({c.remote.playerName}, Lv.{c.remote.summary.level}, Day {c.remote.summary.day},{' '}
          {new Date(c.remote.savedAt).toLocaleString()}). Welcher Stand soll gelten?
          <div className="row wrap">
            <button className="btn primary" disabled={busy} onClick={() => run(async () => {
              const r = c.remote!;
              store.set(r.state, 'load');
              adoptBase(r.savedAt);
              await saveNow();
              location.reload();
            })}>☁ Cloud-Stand laden</button>
            <button className="btn" disabled={busy} onClick={() => run(async () => {
              await pushNow(makeEnvelope(structuredClone(store.s)), true);
            })}>📱 Diesen Stand behalten (Cloud überschreiben)</button>
          </div>
          <p className="note">Der jeweils ersetzte Stand bleibt als Sicherung erhalten.</p>
        </div>
      )}
      {c.state !== 'conflict' && (
        <div className="row wrap">
          <button className="btn" disabled={busy} onClick={() => run(async () => {
            await saveNow();
            await pushNow(makeEnvelope(structuredClone(store.s)));
          })}>☁ Jetzt sichern</button>
          <button className="btn ghost" disabled={busy} onClick={() => run(refreshRemote)}>Cloud prüfen</button>
        </div>
      )}
    </div>
  );
}
