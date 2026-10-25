import { useState } from 'react';
import { labelOfKey } from '../core/learning';
import { mastery } from '../core/srs';
import { palace, placeName, placeNameEn } from '../core/recall';
import { store } from '../core/store';
import { MemoryNote } from './MemoryNote';

/**
 * The memory palace: every place of the world with the words met there. A word is easier to find again in the place
 * and the moment it was heard; each place can be reviewed on its own, and every word shows its moment.
 */
export function PalaceSection({ onPlace }: { onPlace: (map: string) => void }) {
  const s = store.s;
  const places = palace(s);
  const [open, setOpen] = useState<string | null>(null);
  const [word, setWord] = useState<string | null>(null);
  if (!places.length) return null;
  return (
    <>
      <h3>思い出の地図 Memory palace</h3>
      <p className="note">Every word remembers where and from whom you heard it. Review a place to bring its moments back — people there will also ask you about them.</p>
      <div className="palace">
        {places.map((p) => (
          <div key={p.map} className={`palace-place${open === p.map ? ' open' : ''}`}>
            <button className="palace-head" onClick={() => setOpen(open === p.map ? null : p.map)}>
              <span lang="ja"><b>{placeName(p.map)}</b></span>
              <span className="note"> {placeNameEn(p.map)}</span>
              <span className="palace-count">
                {p.due > 0 && <span className="palace-due">💭 {p.due}</span>} {p.strong}/{p.keys.length}
              </span>
              <span className="palace-bar"><i style={{ width: `${(p.strong / p.keys.length) * 100}%` }} /></span>
            </button>
            {open === p.map && (
              <div className="palace-body">
                <div className="palace-words">
                  {p.keys.map((k) => (
                    <button key={k} className={`palace-word m-${mastery(s.cards[k])}${word === k ? ' on' : ''}`} lang="ja" onClick={() => setWord(word === k ? null : k)}>
                      {labelOfKey(k)}
                    </button>
                  ))}
                </div>
                {word && p.keys.includes(word) && <MemoryNote k={word} />}
                <button className="btn primary small" onClick={() => onPlace(p.map)}>ここを思い出す Review this place</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
