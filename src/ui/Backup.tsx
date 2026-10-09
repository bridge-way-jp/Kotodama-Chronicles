import { useRef, useState } from 'react';
import { downloadText, importFromJson, type SaveEnvelope } from '../core/save';

/**
 * Backup export/import that works everywhere: some embedded viewers block file
 * downloads and native confirm() dialogs, so the backup is also shown as
 * copyable text and every confirmation happens inside the page.
 */

export function ExportBox({ text, filename, onClose }: { text: string; filename: string; onClose: () => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [msg, setMsg] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setMsg('Copied. Paste it into a note or file to keep it safe.');
    } catch {
      ref.current?.select();
      setMsg('Copying is blocked here. The text is selected — press Ctrl+C / ⌘C.');
    }
  };
  return (
    <div className="backup-box">
      <p className="note">Save this text somewhere safe (a note, an e-mail to yourself or a .json file). You can paste it back in with “Import backup”.</p>
      <textarea id="backup-export" ref={ref} readOnly value={text} rows={5} onFocus={(e) => e.currentTarget.select()} />
      <div className="row wrap">
        <button className="btn primary" onClick={copy}>Copy backup</button>
        <button className="btn" onClick={() => downloadText(filename, text)}>Download .json</button>
        <button className="btn ghost" onClick={onClose}>Close</button>
      </div>
      {msg && <p className="note">{msg}</p>}
    </div>
  );
}

export function ImportBox({
  hasSave,
  onImport,
  onClose,
}: {
  hasSave: boolean;
  onImport: (env: SaveEnvelope, text: string) => Promise<void>;
  onClose: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [env, setEnv] = useState<SaveEnvelope | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const check = (t: string) => {
    setErr('');
    setEnv(null);
    try {
      setEnv(importFromJson(t));
    } catch (e) {
      setErr((e as Error).message);
    }
  };

  return (
    <div className="backup-box">
      <div className="row wrap">
        <button className="btn" onClick={() => fileRef.current?.click()}>Choose .json file</button>
        <span className="note">or paste the backup text below</span>
      </div>
      <input
        ref={fileRef}
        id="backup-file"
        type="file"
        accept="application/json,.json"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (!f) return;
          const t = await f.text();
          setText(t);
          check(t);
        }}
      />
      <textarea id="backup-import" rows={4} value={text} placeholder="{ &quot;format&quot;: &quot;kotodama-save&quot;, … }" onChange={(e) => setText(e.target.value)} />
      {!env && (
        <div className="row">
          <button className="btn" disabled={!text.trim()} onClick={() => check(text)}>Check backup</button>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
        </div>
      )}
      {err && <div className="warn">This backup can't be used: {err}</div>}
      {env && (
        <>
          <div className={hasSave ? 'warn' : 'note'}>
            Backup of <b>{env.playerName}</b> · Lv.{env.summary.level} · Day {env.summary.day} · saved {new Date(env.savedAt).toLocaleString()}.
            {hasSave && ' Loading it replaces your current game; the current save is kept in the backup slot.'}
          </div>
          <div className="row">
            <button className="btn ghost" onClick={onClose}>Cancel</button>
            <button
              className="btn primary"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await onImport(env, text);
                } catch (e) {
                  setErr((e as Error).message);
                  setBusy(false);
                }
              }}
            >
              {hasSave ? 'Replace current game' : 'Load backup'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
