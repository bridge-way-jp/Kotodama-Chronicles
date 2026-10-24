import { useEffect, useMemo, useState } from 'react';
import { editor } from '../game/editorState';
import { OBJECT_PALETTE } from '../content/plain.gen';
import { CITY_PALETTE } from '../content/citydecor.gen';
import { loadLocalEdits, loadSharedEdits, mergeEdits, saveLocalEdits, saveSharedEdits } from '../content/edits';
import { cloud, cloudEnabled, publishSharedEdits, signIn } from '../core/cloud';
import { store } from '../core/store';
import { bus } from '../core/events';
import { MAPS } from '../content/maps';

const GROUPS: [string, RegExp][] = [
  ['Natur', /tree|bush|flower|grass|fern|bamboo|rock|hedge_block/],
  ['Zäune', /hedge_[hv]/],
  ['Straße', /lamp|bench|bollard|vend|rack|scooter|planter|tree_pot|bonsai|trash|recycle|sign|bus_pole|pole|shelter|phone|postbox|aframe/],
  ['Markt & Hof', /stall|crates|barrel|jar|sack|laundry|drying|firewood|well|table|beer|cafe_|noren|stone_lantern|fox|hokora|chozuya/],
];
const TOWN_NAMES: Record<string, string> = { hinomori: 'Hinomori', yukimi: 'Yukimi', shiomi: 'Shiomi', kyoto: 'Kyoto', osaka: 'Osaka', tokyo: 'Tokyo' };
const groupOf = (n: string) => (n.startsWith('co_') ? TOWN_NAMES[n.split('_')[1]] : undefined) ?? GROUPS.find(([, re]) => re.test(n))?.[0] ?? 'Sonstiges';
const PALETTE = [...OBJECT_PALETTE, ...CITY_PALETTE];

/** map editor panel (`?edit`): pick an object, click the map to place it, drag to move, erase, export for the game */
export function EditorPanel() {
  const [, tick] = useState(0);
  const [open, setOpen] = useState(true);
  const [group, setGroup] = useState('Natur');
  const [msg, setMsg] = useState('');
  useEffect(() => editor.subscribe(() => tick((n) => n + 1)), []);
  const groups = useMemo(() => ['Natur', 'Zäune', 'Straße', 'Markt & Hof', 'Sonstiges', ...[...new Set(CITY_PALETTE.map((p) => groupOf(p.name)))]], []);
  const items = PALETTE.filter((p) => groupOf(p.name) === group);
  const exportJson = async () => {
    const txt = JSON.stringify(loadLocalEdits());
    try {
      await navigator.clipboard.writeText(txt);
      setMsg('In die Zwischenablage kopiert. Bitte an Claude schicken.');
    } catch {
      setMsg('Datei wird geladen …');
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' }));
    a.download = 'kotodama_edits.json';
    a.click();
  };
  // publish: this browser's changes go on top of what is already published, for every player
  const publish = async () => {
    try {
      if (!cloud.user) {
        setMsg('Mit Google anmelden …');
        await signIn();
        for (let i = 0; i < 40 && !cloud.user; i++) await new Promise((ok) => setTimeout(ok, 250));
        if (!cloud.user) return setMsg('Nicht angemeldet.');
      }
      setMsg('Wird veröffentlicht …');
      const merged = mergeEdits(loadSharedEdits().edits, loadLocalEdits());
      const savedAt = await publishSharedEdits(JSON.stringify(merged));
      saveSharedEdits(savedAt, merged);
      saveLocalEdits({});
      setMsg('Für alle veröffentlicht ✓ (wird neu geladen)');
      setTimeout(() => location.reload(), 1200);
    } catch (e) {
      const code = (e as { code?: string }).code;
      setMsg(code === 'permission-denied' ? 'Dieses Konto darf noch nicht veröffentlichen: bitte die Firebase-Regeln ergänzen (siehe Nachricht von Claude).' : `Fehler: ${(e as Error).message}`);
    }
  };
  const resetMap = () => {
    const all = loadLocalEdits();
    delete all[store.s.map];
    saveLocalEdits(all);
    location.reload();
  };
  return (
    <div className="edit-panel" onPointerDown={(e) => e.stopPropagation()}>
      <div className="edit-head">
        <b>Karten-Editor</b> <small>{store.s.map}</small>
        <button className="btn small" onClick={() => setOpen(!open)}>{open ? '–' : '+'}</button>
      </div>
      {open && (
        <>
          <div className="edit-row">
            <button className={`btn small ${!editor.brush && !editor.eraser ? 'primary' : ''}`} onClick={() => editor.set({ brush: null, eraser: false, walkBrush: null, exits: false })}>Verschieben</button>
            <button className={`btn small ${editor.eraser ? 'primary' : ''}`} onClick={() => editor.set({ brush: null, eraser: !editor.eraser, walkBrush: null, exits: false })}>Löschen</button>
            <button className={`btn small ${editor.exits ? 'primary' : ''}`} onClick={() => editor.set({ exits: !editor.exits, brush: null, eraser: false, walkBrush: null })}>Ausgänge</button>
            <button className={`btn small ${editor.grid ? 'primary' : ''}`} onClick={() => editor.set({ grid: !editor.grid })}>Gitter</button>
          </div>
          <div className="edit-row">
            <select className="edit-map" value={store.s.map} onChange={(e) => bus.emit('editor-goto', { map: e.target.value })}>
              {[...Object.values(MAPS)].sort((a, b) => Number(!!a.interior) - Number(!!b.interior)).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.interior ? '🏠 ' : '🗺 '}
                  {m.nameJa} ({m.name})
                </option>
              ))}
            </select>
          </div>
          <div className="edit-row">
            <button className={`btn small ${editor.overview ? 'primary' : ''}`} onClick={() => editor.set({ overview: !editor.overview })}>Übersicht</button>
            <button className="btn small" onClick={() => editor.zoomBy(1.25)}>＋</button>
            <button className="btn small" onClick={() => editor.zoomBy(0.8)}>－</button>
          </div>
          <div className="edit-row">
            <span className="edit-label">Laufen:</span>
            {([['open', '✓ begehbar'], ['block', '✕ gesperrt'], ['reset', '↺ Original']] as const).map(([k, label]) => (
              <button key={k} className={`btn small ${editor.walkBrush === k ? 'primary' : ''}`} onClick={() => editor.set({ walkBrush: editor.walkBrush === k ? null : k, brush: null, eraser: false, exits: false })}>{label}</button>
            ))}
          </div>
          <div className="edit-row">
            {groups.map((g) => (
              <button key={g} className={`btn small ${g === group ? 'primary' : ''}`} onClick={() => setGroup(g)}>{g}</button>
            ))}
          </div>
          <div className="edit-pal">
            {items.map((p) => (
              <button key={p.name} className={`edit-item ${editor.brush === p.name ? 'on' : ''}`} title={p.name.slice(3)} onClick={() => editor.set({ brush: editor.brush === p.name ? null : p.name, eraser: false, walkBrush: null, exits: false })}>
                <img className="px" src={`assets/${p.name}.png`} alt={p.name.slice(3)} />
              </button>
            ))}
          </div>
          <div className="edit-note">{editor.exits
              ? 'Blaue Felder = Ausgänge zu anderen Karten. Ziehen verschiebt den ganzen Ausgang, die Ankunft auf der anderen Karte zieht mit.'
              : editor.walkBrush
                ? 'Über die Karte wischen: Rot = gesperrt. Grün umrandet = von dir begehbar gemacht.'
                : editor.brush
                  ? `Setzen: ${editor.brush.slice(3)} (auf die Karte tippen)`
                  : editor.eraser
                    ? 'Objekt antippen zum Löschen (Häuser mit Tür und Story-Dinge sind geschützt)'
                    : 'Objekt oder Haus antippen, ziehen zum Verschieben (Türen ziehen mit), Entf zum Löschen'}{editor.info ? ` · ${editor.info}` : ''}</div>
          <div className="edit-row">
            {cloudEnabled && (
              <button className="btn small primary" onClick={() => void publish()}>
                Für alle veröffentlichen
              </button>
            )}
            <button className="btn small" onClick={exportJson}>Exportieren</button>
            <button className="btn small" onClick={resetMap}>Karte zurücksetzen</button>
          </div>
          {msg && <div className="edit-note">{msg}</div>}
        </>
      )}
    </div>
  );
}
