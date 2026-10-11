import { useEffect, useState } from 'react';
import { SPECIES } from '../content/creatures';
import { sfx } from '../core/audio';

/**
 * Full-screen moments for Kotodama:
 * - evolve: the old form glows, flickers between both silhouettes faster and faster, a flash, the new form appears
 * - new: a ball of light falls, bursts open and the new Kotodama pops out with its name card
 * Tap/click (or Space/Enter) continues once the animation is done.
 */
export type SceneSpec = { kind: 'evolve'; from: string; to: string } | { kind: 'new'; species: string };

const EVOLVE_MS = 4200;
const NEW_MS = 2200;

export function KotodamaScene({ spec, onDone }: { spec: SceneSpec; onDone: () => void }) {
  const [done, setDone] = useState(false);
  const target = SPECIES[spec.kind === 'evolve' ? spec.to : spec.species];
  const from = spec.kind === 'evolve' ? SPECIES[spec.from] : null;

  useEffect(() => {
    setDone(false);
    sfx('open');
    const t = setTimeout(() => {
      setDone(true);
      sfx('level');
    }, spec.kind === 'evolve' ? EVOLVE_MS : NEW_MS);
    return () => clearTimeout(t);
  }, [spec]);

  useEffect(() => {
    if (!done) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'z') onDone();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [done, onDone]);

  return (
    <div className={`kd-scene kd-${spec.kind} ${done ? 'kd-done' : ''}`} onClick={() => done && onDone()}>
      <div className="kd-rays" />
      <div className="kd-stage">
        {spec.kind === 'evolve' && from && (
          <>
            <img className="px kd-sprite kd-old" src={`assets/${from.sprite}.png`} alt={from.name} />
            <img className="px kd-sprite kd-new" src={`assets/${target.sprite}.png`} alt={target.name} />
          </>
        )}
        {spec.kind === 'new' && (
          <>
            <div className="kd-orb" />
            <img className="px kd-sprite kd-new" src={`assets/${target.sprite}.png`} alt={target.name} />
          </>
        )}
        <div className="kd-flash" />
        <div className="kd-sparkles">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ ['--a' as string]: `${(i * 360) / 14}deg`, ['--d' as string]: `${i % 3}` }} />
          ))}
        </div>
      </div>
      <div className="kd-text panel">
        {spec.kind === 'evolve' && from && !done && <p lang="ja">おや……？ {from.name}のようすが……！</p>}
        {spec.kind === 'evolve' && from && done && (
          <p lang="ja">
            おめでとう！ {from.name}は<b>{target.name}</b>に進化した！
            <small>{from.nameEn} evolved into {target.nameEn}!</small>
          </p>
        )}
        {spec.kind === 'new' && !done && <p lang="ja">言葉の光が集まっていく……</p>}
        {spec.kind === 'new' && done && (
          <p lang="ja">
            <b>{target.name}</b>が仲間になった！
            <small>
              {target.nameEn} joined your team!{target.ability ? ` · ${target.ability.name}: ${target.ability.desc}` : ''}
            </small>
          </p>
        )}
        {done && <span className="kd-next">▼</span>}
      </div>
    </div>
  );
}
