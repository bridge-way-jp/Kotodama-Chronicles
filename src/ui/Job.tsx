import { tr } from '../core/i18n';
import { useState } from 'react';
import { JOBS, jobFlag } from '../content/jobs';
import { NPCS } from '../content/npcs';
import { ITEMS } from '../content/creatures';
import { battleExercise, exerciseFor, recordAnswer, shuffle, type Exercise } from '../core/learning';
import { grantXp } from '../core/game';
import { store } from '../core/store';
import type { GameState } from '../core/types';
import { ExerciseView } from './Question';
import { Jp } from './Jp';

/** Builds the round: due/known cards of the job's area, mixed with the job's own theme words. */
function buildRound(s: GameState, id: string): Exercise[] {
  const job = JOBS[id];
  const out: Exercise[] = [];
  const theme = shuffle(job.theme.slice());
  for (let i = 0; i < job.rounds; i++) {
    const useTheme = theme.length && (i % 2 === 0 || job.area === 'vocab');
    if (useTheme) out.push(exerciseFor(s, theme.pop()!, { prefer: job.area === 'listening' ? 'listen' : undefined }));
    else out.push(battleExercise(s, job.area === 'listening' ? 'listening' : job.area));
  }
  return out;
}

export function JobSession({ id, onClose }: { id: string; onClose: () => void }) {
  const job = JOBS[id];
  const npc = NPCS[job.npc];
  const [items] = useState(() => buildRound(store.s, id));
  const [i, setI] = useState(-1); // -1 = intro
  const [ok, setOk] = useState(0);
  // crane-game skin: the claw drops after every answer and a capsule falls into the chute when it was right
  const [claw, setClaw] = useState<{ n: number; good: boolean } | null>(null);
  const portrait = npc.portrait?.startsWith('portrait_') ? `${npc.portrait}_${i >= items.length ? 'happy' : 'neutral'}` : npc.portrait;

  const head = (
    <div className="panel-title">
      {job.title} <span className="note">{tr(job.titleEn)}</span>
      {i >= 0 && i < items.length && <span className="note"> · {i + 1} / {items.length} · ¥{ok * job.payPer}</span>}
    </div>
  );

  if (i < 0 && store.s.flags[jobFlag(id)] === store.s.day)
    return (
      <div className="panel study job">
        {head}
        <p lang="ja">今日のバイトは、もう終わりました。また明日お願いします！</p>
        <p className="note">You already worked here today. Sleep to start a new day, then come back.</p>
        <button className="btn primary" autoFocus onClick={onClose}>閉じる</button>
      </div>
    );

  if (i < 0)
    return (
      <div className="panel study job">
        {head}
        <div className="job-talk">
          {portrait && <img className="px job-portrait" src={`assets/${portrait}.png`} alt="" style={{ borderColor: npc.color }} />}
          <div>
            <b>{npc.name}</b>
            <p lang="ja"><Jp text={job.intro} /></p>
            <p className="note">{tr(job.introEn)}</p>
            <p className="note">Pay: ¥{job.payPer} per correct answer · perfect round: {ITEMS[job.bonus]?.name}</p>
          </div>
        </div>
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setI(0)}>始める Start</button>
          <button className="btn" onClick={onClose}>やめる</button>
        </div>
      </div>
    );

  if (i >= items.length) {
    const perfect = ok === items.length;
    return (
      <div className="panel study job">
        {head}
        <div className="job-talk">
          {portrait && <img className="px job-portrait" src={`assets/${portrait}.png`} alt="" style={{ borderColor: npc.color }} />}
          <div>
            <b>{npc.name}</b>
            <p lang="ja"><Jp text={job.thanks} /></p>
            <p className="note">{tr(job.thanksEn)}</p>
          </div>
        </div>
        <p className="big-score">{ok} / {items.length}</p>
        <p>
          +¥{ok * job.payPer}
          {perfect && <> · bonus: <b>{ITEMS[job.bonus]?.name}</b></>}
        </p>
        <p className="note">The job is open again tomorrow (sleep to start a new day).</p>
        <button className="btn primary" autoFocus onClick={onClose}>閉じる</button>
      </div>
    );
  }

  const ex = items[i];
  const crane = id === 'crane';
  const capsule = ['pink', 'blue', 'green', 'yellow', 'orange', 'purple'][(claw?.n ?? 0) % 6];
  return (
    <div className={`panel study job${crane ? ' crane' : ''}`}>
      {head}
      <div className="progress"><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <p className="note job-task" lang="ja">{job.task} <span>· {tr(job.taskEn)}</span></p>
      {crane && (
        <div className="crane-art" aria-hidden>
          <img className="crane-machine px" src="assets/crane_machine.png" alt="" />
          <img key={'c' + (claw?.n ?? 0)} className={`crane-claw px${claw ? ' drop' : ''}`} src={`assets/crane_claw_${claw ? 'closed' : 'open'}.png`} alt="" />
          {claw?.good && <img key={'p' + claw.n} className="crane-prize px" src={`assets/capsule_${capsule}.png`} alt="" />}
        </div>
      )}
      <ExerciseView
        key={ex.id}
        ex={ex}
        onDone={(good, ms, chosen) => {
          const total = ok + (good ? 1 : 0);
          const last = i + 1 === items.length;
          store.update((s) => {
            recordAnswer(s, ex, good, ms, chosen);
            if (!last) return;
            // pay once, when the round ends
            s.money += total * job.payPer;
            s.flags[jobFlag(id)] = s.day;
            if (total === items.length) s.inventory[job.bonus] = (s.inventory[job.bonus] ?? 0) + 1;
            grantXp(s, 10 + total * 3);
          }, 'learn');
          setOk(total);
          setClaw({ n: (claw?.n ?? 0) + 1, good });
          setI(i + 1);
        }}
      />
    </div>
  );
}
