import { useMemo, useRef, useState } from 'react';
import { store } from '../core/store';
import { exerciseFor, recordAnswer, type Exercise } from '../core/learning';
import type { GameState } from '../core/types';
import { ExerciseView } from './Question';

/**
 * A short check that has to be passed: every item must be answered correctly once. A wrong answer shows the
 * explanation and the item comes back later in a different form (at most three tries, then it moves on and the
 * item stays marked as weak for the reviews). Used after a new expression is taught, after a wrong answer in a
 * story quiz and as the ticket check at the station gates.
 */
export function MasteryCheck({ keys, title, sub, onDone }: { keys: string[]; title: string; sub?: string; onDone: (allFirstTry: boolean) => void }) {
  const tries = useRef<Record<string, number>>({});
  const firstTry = useRef(true);
  const [queue, setQueue] = useState<string[]>(keys);
  const [solved, setSolved] = useState(0);
  const [n, setN] = useState(0);
  const key = queue[0];
  const ex: Exercise | null = useMemo(() => (key ? exerciseFor(store.s, key, { prefer: tries.current[key] ? 'context' : undefined }) : null), [key, n]);
  if (!key || !ex) return null;
  return (
    <div className="mastery">
      <div className="mastery-head">
        <b>{title}</b>
        <span className="mastery-dots" aria-label={`${solved} of ${keys.length}`}>
          {keys.map((k, i) => (
            <i key={k + i} className={i < solved ? 'on' : ''} />
          ))}
        </span>
      </div>
      {sub && <div className="mastery-sub">{sub}</div>}
      {(tries.current[key] ?? 0) > 0 && <div className="mastery-again">もう一度！ The same point again, in another form.</div>}
      <ExerciseView
        key={key + ':' + n}
        ex={ex}
        onDone={(ok, ms, chosen) => {
          store.update((s: GameState) => recordAnswer(s, ex, ok, ms, chosen), 'learn');
          tries.current[key] = (tries.current[key] ?? 0) + 1;
          if (!ok) firstTry.current = false;
          const rest = queue.slice(1);
          if (ok || tries.current[key] >= 3) {
            setSolved((v) => v + 1);
            if (!rest.length) return onDone(firstTry.current);
            setQueue(rest);
          } else setQueue([...rest, key]); // comes back after the others (or right away if it is the only one)
          setN((v) => v + 1);
        }}
      />
    </div>
  );
}

/** items for a quick check: due ones first, then the weakest of those already studied (none in a fresh game) */
export function checkKeys(s: GameState, n = 3, now = Date.now()): string[] {
  const studied = Object.values(s.cards).filter((c) => c.introduced && !c.key.startsWith('r:'));
  const due = studied.filter((c) => c.due <= now).sort((a, b) => a.due - b.due);
  const rest = studied.filter((c) => c.due > now).sort((a, b) => (a.reps ?? 0) - (b.reps ?? 0) || a.due - b.due);
  return [...due, ...rest].slice(0, n).map((c) => c.key);
}
