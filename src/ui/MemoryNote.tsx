import { NPCS } from '../content/npcs';
import { cueLine } from '../core/memory';
import { highlight, originOf, placeName, placeNameEn, speakerName } from '../core/recall';
import { store } from '../core/store';
import { Jp, withName } from './Jp';

/** the moment an item was met: place, person and the line (with the item blanked out as a cue, or shown) */
export function MemoryNote({ k, cue, compact }: { k: string; cue?: boolean; compact?: boolean }) {
  const o = originOf(store.s, k);
  if (!o) return null;
  const who = speakerName(o.who);
  const blank = cue ? cueLine(o, k) : null;
  const npc = o.who ? NPCS[o.who] : undefined;
  const face = npc?.portrait?.startsWith('portrait_') ? `${npc.portrait}_neutral` : npc?.portrait;
  return (
    <div className={`memory-note${compact ? ' compact' : ''}`}>
      {o.cg && <img className="memory-cg" src={`assets/${o.cg}.webp`} alt="" />}
      {!o.cg && face && <img className="px memory-face" src={`assets/${face}.png`} alt="" style={{ borderColor: npc?.color }} />}
      <div>
        <div className="memory-where">
          💭 {placeName(o.map)}
          {who ? <> · {who}</> : null} <span className="note">{placeNameEn(o.map)}</span>
        </div>
        <p lang="ja" className="memory-line">「<Jp text={blank ?? highlight(o.line, k)} />」</p>
        {cue && !blank && <p className="note">You met the word around this moment — what was it?</p>}
        {!cue && o.en && <p className="note">{withName(o.en)}</p>}
      </div>
    </div>
  );
}

