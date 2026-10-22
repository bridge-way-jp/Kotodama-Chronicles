import { useEffect, useMemo, useState } from 'react';
import { editor } from '../game/editorState';
import { OBJECT_PALETTE } from '../content/plain.gen';
import { loadLocalEdits, saveLocalEdits } from '../content/edits';
import { store } from '../core/store';

const GROUPS: [string, RegExp][] = [
  ['Natur', /tree|bush|flower|grass|fern|bamboo|rock|hedge_block/],
  ['Zäune', /hedge_[hv]/],
  ['Straße', /lamp|bench|bollard|vend|rack|scooter|planter|tree_pot|bonsai|trash|recycle|sign|bus_pole|pole|shelter|phone|postbox|aframe/],
  ['Markt & Hof', /stall|crates|barrel|jar|sack|laundry|drying|firewood|well|table|beer|cafe_|noren|stone_lantern|fox|hokora|chozuya/],
];
const groupOf = (n: string) => GROUPS.find(([, re]) => re.test(n))?.[0] ?? 'Sonstiges';

/** map editor panel (`?edit`): pick an object, click the map to place it, drag to move, erase, export for the game */
export function EditorPanel() {
  const [, tick] = useState(0);
  const [open, setOpen] = useState(true);
  const [group, setGroup] = useState('Natur');
  const [msg, setMsg] = useState('');
  useEffect(() => editor.subscribe(() => tick((n) => n + 1)), []);
  const groups = useMemo(() => ['Natur', 'Zäune', 'Straße', 'Markt & Hof', 'Sonstiges'], []);
  const items = OBJECT_PALETTE.filter((p) => groupOf(p.name) === group);
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
            <button className={`btn small ${!editor.brush && !editor.eraser ? 'primary' : ''}`} onClick={() => editor.set({ brush: null, eraser: false, walkBrush: null })}>Verschieben</button>
            <button className={`btn small ${editor.eraser ? 'primary' : ''}`} onClick={() => editor.set({ brush: null, eraser: !editor.eraser, walkBrush: null })}>Löschen</button>
            <button className={`btn small ${editor.grid ? 'primary' : ''}`} onClick={() => editor.set({ grid: !editor.grid })}>Gitter</button>
          </div>
          <div className="edit-row">
            <span className="edit-label">Laufen:</span>
            {([['open', '✓ begehbar'], ['block', '✕ gesperrt'], ['reset', '↺ Original']] as const).map(([k, label]) => (
              <button key={k} className={`btn small ${editor.walkBrush === k ? 'primary' : ''}`} onClick={() => editor.set({ walkBrush: editor.walkBrush === k ? null : k, brush: null, eraser: false })}>{label}</button>
            ))}
          </div>
          <div className="edit-row">
            {groups.map((g) => (
              <button key={g} className={`btn small ${g === group ? 'primary' : ''}`} onClick={() => setGroup(g)}>{g}</button>
            ))}
          </div>
          <div className="edit-pal">
            {items.map((p) => (
              <button key={p.name} className={`edit-item ${editor.brush === p.name ? 'on' : ''}`} title={p.name.slice(3)} onClick={() => editor.set({ brush: editor.brush === p.name ? null : p.name, eraser: false, walkBrush: null })}>
                <img className="px" src={`assets/${p.name}.png`} alt={p.name.slice(3)} />
              </button>
            ))}
          </div>
          <div className="edit-note">{editor.walkBrush ? 'Über die Karte wischen: Rot = gesperrt. Grün umrandet = von dir begehbar gemacht.' : editor.brush ? `Setzen: ${editor.brush.slice(3)} (auf die Karte tippen)` : editor.eraser ? 'Objekt antippen zum Löschen' : 'Objekt antippen, ziehen zum Verschieben, Entf zum Löschen'}{editor.info ? ` · ${editor.info}` : ''}</div>
          <div className="edit-row">
            <button className="btn small primary" onClick={exportJson}>Exportieren</button>
            <button className="btn small" onClick={resetMap}>Karte zurücksetzen</button>
          </div>
          {msg && <div className="edit-note">{msg}</div>}
        </>
      )}
    </div>
  );
}
