import { useState } from 'react';
import { NPCS } from '../content/npcs';
import { exerciseFor, recordAnswer, labelOfKey } from '../core/learning';
import { markEcho } from '../core/recall';
import { grantXp } from '../core/game';
import { store } from '../core/store';
import { toast } from '../core/events';
import { Jp } from './Jp';
import { MemoryNote } from './MemoryNote';
import { ExerciseView } from './Question';
import { MasteryCheck } from './Mastery';

/**
 * A person or a thing of the world asks about an item learned with them that is due again: the memory first (the
 * line with the item blanked out), then a question on it. Right: the bond grows. Wrong: the moment comes back in full,
 * then once more in another form.
 */
export function RecallStep({ k, who, onDone }: { k: string; who: string; onDone: () => void }) {
  const npc = NPCS[who];
  const [ex] = useState(() => exerciseFor(store.s, k));
  const [phase, setPhase] = useState<'ask' | 'quiz' | 'good' | 'again'>('ask');
  const face = npc?.portrait?.startsWith('portrait_') ? `${npc.portrait}_${phase === 'good' ? 'happy' : 'neutral'}` : npc?.portrait;
  const done = () => {
    store.update((s) => markEcho(s, who), 'learn');
    onDone();
  };

  if (phase === 'again')
    return (
      <div className="dialogue-wrap">
        <div className="panel quiz-box">
          <MemoryNote k={k} />
          <MasteryCheck keys={[k]} title="もう一度 — once more" sub="Now that the moment is back: once more in another form." onDone={done} />
        </div>
      </div>
    );

  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box recall">
        <div className="recall-head">
          {face && <img className="px memory-face big" src={`assets/${face}.png`} alt="" style={{ borderColor: npc?.color }} />}
          <div>
            <b>{npc?.name ?? '💭'}</b>
            <p lang="ja">
              {phase === 'good' ? (
                <Jp text={npc ? 'そうそう、それ！ ちゃんと{覚|おぼ}えてたね。' : '……そう、ここで{覚|おぼ}えたんだった。'} />
              ) : (
                <Jp text={npc ? 'ねえ、この{前|まえ}の{話|はなし}、{覚|おぼ}えてる？' : '（ここに{来|く}ると、{前|まえ}に{覚|おぼ}えた{言葉|ことば}を{思|おも}い{出|だ}す……）'} />
              )}
            </p>
            <p className="note">{phase === 'good' ? 'Right — you remembered.' : npc ? 'Hey, do you remember what we talked about?' : 'Being here brings back a word you learned.'}</p>
          </div>
        </div>
        <MemoryNote k={k} cue={phase !== 'good'} />
        {phase === 'ask' && (
          <div className="row">
            <button className="btn primary" autoFocus onClick={() => setPhase('quiz')}>思い出す Recall</button>
            <button className="btn" onClick={done}>あとで Later</button>
          </div>
        )}
        {phase === 'quiz' && (
          <ExerciseView
            ex={ex}
            onDone={(ok, ms, chosen) => {
              store.update((s) => {
                recordAnswer(s, ex, ok, ms, chosen);
                if (!ok) return;
                grantXp(s, 4);
                if (npc) {
                  const r = (s.relationships[who] ??= { points: 0, memories: [] });
                  r.points += 1;
                }
              }, 'learn');
              if (ok) toast(`💭 思い出した！ ${labelOfKey(k)}${npc ? ` · ${npc.name} ♥+1` : ''}`, 'learn');
              setPhase(ok ? 'good' : 'again');
            }}
          />
        )}
        {phase === 'good' && (
          <button className="btn primary" autoFocus onClick={done}>次へ ▶</button>
        )}
      </div>
    </div>
  );
}
