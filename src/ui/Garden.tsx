import { useMemo, useState } from 'react';
import { garden, type Plant, type PlantKind } from '../core/garden';
import { labelOfKey } from '../core/learning';
import { store } from '../core/store';
import { VOCAB_BY_ID } from '../content/vocab';
import { GRAMMAR_BY_ID } from '../content/grammar';
import { KANJI_BY_ID } from '../content/kanji';

const KINDS: { id: PlantKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sunflower', label: '🌻 Chapter 1 words' },
  { id: 'peach', label: '🍑 Valley words' },
  { id: 'grape', label: '🍇 Valley words' },
  { id: 'rice', label: '🌾 N2 course words' },
  { id: 'sakura', label: '🌸 Kanji' },
  { id: 'asagao', label: '🔵 Grammar' },
];
const STAGE = ['seed (met in the world)', 'sprout (learning)', 'growing (known for a few days)', 'in bloom (long-term memory)', 'wilted (needs a review)'];
const PAGE = 48;

function meaning(key: string) {
  const [t, id] = key.split(':');
  if (t === 'v') return VOCAB_BY_ID[id] ? `${VOCAB_BY_ID[id].reading} · ${VOCAB_BY_ID[id].en}` : '';
  if (t === 'g') return GRAMMAR_BY_ID[id]?.meaning ?? '';
  if (t === 'k') return KANJI_BY_ID[id]?.meaning ?? '';
  return '';
}

export function Garden({ onWater, onClose }: { onWater: () => void; onClose: () => void }) {
  const all = useMemo(() => garden(store.s), []);
  const [kind, setKind] = useState<PlantKind | 'all'>('all');
  const [onlyWilted, setOnlyWilted] = useState(false);
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState<Plant | null>(null);
  const shown = all.filter((p) => (kind === 'all' || p.kind === kind) && (!onlyWilted || p.stage === 4));
  const pages = Math.max(1, Math.ceil(shown.length / PAGE));
  const bloom = all.filter((p) => p.stage === 3).length;
  const wilted = all.filter((p) => p.stage === 4).length;
  const thirsty = all.filter((p) => p.thirsty).length;
  const card = sel ? store.s.cards[sel.key] : undefined;

  return (
    <div className="panel garden">
      <div className="panel-title">
        言葉の庭 <span className="note">Word garden · {all.length} plants · {bloom} in bloom · {wilted} wilted</span>
        <button className="btn small ghost close" onClick={onClose}>✕</button>
      </div>
      <p className="note">
        Every word, kanji and grammar point you meet is planted here. Studying makes it grow; long-term memory makes it bloom.
        Items that are overdue for review or keep being missed wilt. Watering = reviewing.
      </p>
      <div className="garden-tabs">
        {KINDS.map((k) => (
          <button key={k.id} className={`btn small ${kind === k.id ? 'primary' : ''}`} onClick={() => (setKind(k.id), setPage(0))}>
            {k.label}
          </button>
        ))}
        <label className="garden-check">
          <input type="checkbox" checked={onlyWilted} onChange={(e) => (setOnlyWilted(e.target.checked), setPage(0))} /> only wilted
        </label>
      </div>
      {shown.length === 0 ? (
        <p className="garden-empty">
          <img className="px" src="assets/wg_tag.png" alt="" /> Nothing planted here yet. Talk to people, read signs and study — every new word becomes a seed.
        </p>
      ) : (
        <div className="garden-bed">
          {shown.slice(page * PAGE, page * PAGE + PAGE).map((p) => (
            <button key={p.key} className={`plot ${sel?.key === p.key ? 'sel' : ''} ${p.thirsty ? 'thirsty' : ''}`} onClick={() => setSel(p)} title={labelOfKey(p.key)}>
              <img className="px" src={`assets/wg_${p.kind}_${p.stage}.png`} alt="" />
              <span lang="ja">{labelOfKey(p.key)}</span>
            </button>
          ))}
        </div>
      )}
      {pages > 1 && (
        <div className="row garden-pages">
          <button className="btn small" disabled={page === 0} onClick={() => setPage(page - 1)}>◀</button>
          <span className="note">{page + 1} / {pages}</span>
          <button className="btn small" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>▶</button>
        </div>
      )}
      {sel && (
        <div className="garden-info">
          <img className="px" src={`assets/wg_${sel.kind}_${sel.stage}.png`} alt="" />
          <div>
            <b lang="ja">{labelOfKey(sel.key)}</b> <span className="note">{meaning(sel.key)}</span>
            <div className="note">
              {STAGE[sel.stage]}
              {card?.introduced && ` · next review: ${card.due <= Date.now() ? 'now' : new Date(card.due).toLocaleDateString()}`}
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <button className="btn primary" autoFocus onClick={onWater}>
          <img className="px garden-can" src="assets/wg_can.png" alt="" /> 水をやる Water ({thirsty} due)
        </button>
        <button className="btn" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}
