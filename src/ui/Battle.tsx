import { useEffect, useMemo, useRef, useState } from 'react';
import { AFFINITY_INFO, IDLE_SPRITES, ITEMS, MOVES, SPECIES } from '../content/creatures';
import { store } from '../core/store';
import { battleExercise, recordAnswer, type Exercise, type Option } from '../core/learning';
import { enemyDamage, enemyMaxHp, makeEnemy, playerDamage, recruitSucceeds, xpReward, type BattleSetup } from '../core/battle';
import { addCreature, completeObjective, giveCreatureXp, grantXp, healTeam, maxHp } from '../core/game';
import { currentMusic, playJingle, playMusic, sfx } from '../core/audio';
import { ExerciseView, QuestionBlock, type ExerciseTools } from './Question';
import type { CreatureInstance, Question } from '../core/types';

export type BattleResult = 'win' | 'lose' | 'run' | 'recruit';

type Phase =
  | { k: 'msg' }
  | { k: 'menu' }
  | { k: 'moves' }
  | { k: 'question'; moveId: string; ex: Exercise }
  | { k: 'talk'; q: Question }
  | { k: 'items' }
  | { k: 'switch'; forced?: boolean }
  | { k: 'end'; result: BattleResult };

const GENERIC_TALK: Question = {
  q: '……（言霊は、じっとこちらを見ている）',
  qEn: '…(The Kotodama is staring at you.)',
  options: ['こわくないよ。いっしょに来ない？', 'じっと見ないでよ。', 'あっちへ行って！'],
  answer: 0,
  why: 'A calm, friendly invitation is the most natural way to approach it.',
};

function HpBar({ hp, max }: { hp: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (hp / max) * 100));
  const col = pct > 50 ? '#4cc463' : pct > 20 ? '#e8c64a' : '#e5533d';
  return (
    <div className="hpbar">
      <span>HP</span>
      <div className="hp-track">
        <div className="hp-fill" style={{ width: `${pct}%`, background: col }} />
      </div>
    </div>
  );
}

function InfoBox({ c, max, mine }: { c: CreatureInstance; max: number; mine?: boolean }) {
  const sp = SPECIES[c.speciesId];
  const aff = AFFINITY_INFO[sp.affinity];
  return (
    <div className={`infobox ${mine ? 'mine' : ''}`}>
      <div className="ib-top">
        <img className="px aff-icon" src={`assets/${aff.icon}.png`} alt={aff.en} title={aff.en} />
        <b>{sp.name}</b>
        <span className="lv">Lv.{c.level}</span>
      </div>
      <HpBar hp={c.hp} max={max} />
      {mine && (
        <div className="hp-num">
          {Math.max(0, c.hp)} / {max}
        </div>
      )}
    </div>
  );
}

export function Battle({ setup, onEnd }: { setup: BattleSetup; onEnd: (r: BattleResult) => void }) {
  const s = store.s;
  const enemyRef = useRef<CreatureInstance>(makeEnemy(setup));
  const enemyMax = useMemo(() => enemyMaxHp(enemyRef.current, setup.boss), [setup.boss]);
  const [active, setActiveState] = useState(() => Math.max(0, s.team.findIndex((c) => c.hp > 0)));
  // ref mirror: turn callbacks are queued and must see the latest active slot
  const activeRef = useRef(active);
  const setActive = (i: number) => {
    activeRef.current = i;
    setActiveState(i);
  };
  const levelMsgs = useRef<string[]>([]);
  const [phase, setPhase] = useState<Phase>({ k: 'msg' });
  const [queue, setQueue] = useState<string[]>([]);
  const after = useRef<() => void>(() => setPhase({ k: 'menu' }));
  const [shake, setShake] = useState<'enemy' | 'me' | null>(null);
  // battle theme (boss fights get their own); the map music returns afterwards
  useEffect(() => {
    const prev = currentMusic();
    playMusic(setup.boss ? 'boss' : 'battle');
    return () => playMusic(prev || 'town');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // idle "breathing / blinking": show the second frame briefly every couple of seconds
  const [idleFrame, setIdleFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setIdleFrame(1);
      setTimeout(() => setIdleFrame(0), 380);
    }, 2200);
    return () => clearInterval(t);
  }, []);
  const [fx, setFx] = useState<{ name: string; on: 'enemy' | 'me'; k: number } | null>(null);
  const playFx = (name: string, on: 'enemy' | 'me') => {
    const k = Date.now() + Math.random();
    setFx({ name, on, k });
    setTimeout(() => setFx((cur) => (cur?.k === k ? null : cur)), 700);
  };
  const [tools, setTools] = useState<ExerciseTools>({});
  const usedAbility = useRef(new Set<string>());
  const bond = useRef(0);
  const enemy = enemyRef.current;
  const me = s.team[active];
  const esp = SPECIES[enemy.speciesId];

  const say = (msgs: string[], then: () => void) => {
    setQueue(msgs);
    after.current = then;
    setPhase({ k: 'msg' });
  };

  useEffect(() => {
    store.update((st) => {
      if (!st.dex[enemy.speciesId]) st.dex[enemy.speciesId] = 'seen';
    }, 'dex');
    say(
      [
        setup.boss ? `${esp.name}が立ちはだかった！` : `野生の${esp.name}が現れた！`,
        me ? `行け、${SPECIES[me.speciesId].name}！` : '……',
      ],
      () => setPhase({ k: 'menu' }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextMsg = () => {
    sfx('blip');
    if (queue.length > 1) setQueue(queue.slice(1));
    else {
      setQueue([]);
      after.current();
    }
  };

  // ------------------------------------------------ turn resolution
  const enemyTurn = () => {
    const active = activeRef.current;
    const target = store.s.team[active];
    const hit = enemyDamage(enemy, target, setup.boss);
    store.update((st) => {
      st.team[active].hp = Math.max(0, st.team[active].hp - hit.dmg);
    }, 'battle');
    setShake('me');
    playFx(FX_BY_AFFINITY[hit.move.affinity], 'me');
    sfx('hit');
    setTimeout(() => setShake(null), 400);
    const msgs = [`${esp.name}の「${hit.move.name}」！ ${hit.dmg}のダメージ。`];
    if (hit.aff > 1) msgs.push('効果はばつぐんだ！');
    const fainted = store.s.team[active].hp <= 0;
    if (fainted) {
      msgs.push(`${SPECIES[target.speciesId].name}は疲れて動けなくなった……`);
      const next = store.s.team.findIndex((c) => c.hp > 0);
      if (next === -1) {
        say([...msgs, 'みんな疲れてしまった……。いったん休もう。'], () => finish('lose'));
        return;
      }
      say(msgs, () => setPhase({ k: 'switch', forced: true }));
      return;
    }
    say(msgs, () => setPhase({ k: 'menu' }));
  };

  const finish = (result: BattleResult) => {
    const active = activeRef.current;
    store.update((st) => {
      if (result === 'win' || result === 'recruit') {
        st.stats.battlesWon++;
        const xp = xpReward(enemy, setup.boss);
        grantXp(st, Math.round(xp / 2));
        st.team.forEach((c, i) => {
          if (c.hp > 0 || i === active) giveCreatureXp(st, c, i === active ? xp : Math.round(xp / 2)).forEach((m) => levelMsgs.current.push(m));
        });
        if (st.map === 'forest' && st.quests.mq5?.status === 'active' && st.quests.mq5.objectives.kirishima) completeObjective(st, 'mq5.befriend');
      }
      if (result === 'lose') healTeam(st);
    }, 'battle');
    if (result === 'win' || result === 'recruit') playJingle('victory');
    if (levelMsgs.current.length) {
      sfx('level');
      playFx('levelup', 'me');
      say(levelMsgs.current, () => setPhase({ k: 'end', result }));
      levelMsgs.current = [];
    } else setPhase({ k: 'end', result });
  };

  const onAnswer = (moveId: string, ex: Exercise, ok: boolean, ms: number, chosen?: Option) => {
    store.update((st) => recordAnswer(st, ex, ok, ms, chosen), 'learn');
    const hit = playerDamage(me, moveId, enemy, ok, ms);
    enemy.hp = Math.max(0, enemy.hp - hit.dmg);
    setShake('enemy');
    playFx(ok ? FX_BY_AFFINITY[MOVES[moveId].affinity] : 'hit', 'enemy');
    sfx('hit');
    setTimeout(() => setShake(null), 400);
    setTools({});
    const mv = MOVES[moveId];
    const msgs = [`${SPECIES[me.speciesId].name}の「${mv.name}」！`];
    if (ok) msgs.push(hit.critical ? `すばやい正解！ 言葉の力が強く届いた！ ${hit.dmg}のダメージ！` : `言葉の力が届いた！ ${hit.dmg}のダメージ！`);
    else msgs.push(`言葉が少しだけ届いた…… ${hit.dmg}のダメージ。（この言葉はあとでまた出てくるよ）`);
    if (hit.aff > 1) msgs.push('効果はばつぐんだ！');
    if (hit.aff < 1) msgs.push('効果はいまひとつのようだ……');
    if (enemy.hp <= 0) {
      msgs.push(setup.boss ? `${esp.name}は力を失い、姿を消した……！` : `${esp.name}はおとなしくなった。`);
      if (setup.recruitable && !setup.boss) msgs.push(`今なら「はなす」で仲間にできたかもしれない……。${esp.name}は森の奥へ帰っていった。`);
      say(msgs, () => finish('win'));
      return;
    }
    say(msgs, enemyTurn);
  };

  const onTalk = (ok: boolean) => {
    if (ok && recruitSucceeds(enemy, enemyMax, true, bond.current)) {
      store.update((st) => addCreature(st, enemy.speciesId, enemy.level), 'battle');
      sfx('level');
      say([`${esp.name}は、うれしそうに近づいてきた。`, `${esp.name}が仲間になった！`], () => finish('recruit'));
      return;
    }
    if (ok) {
      bond.current++;
      say([`${esp.name}は少し心を開いたようだ。`, 'もう少しで、気持ちが通じそうだ……'], enemyTurn);
    } else say([`${esp.name}はそっぽを向いた……。`], enemyTurn);
  };

  const useItem = (id: string) => {
    const item = ITEMS[id];
    store.update((st) => {
      const c = st.team[activeRef.current];
      c.hp = Math.min(maxHp(c), c.hp + (item.heal ?? 0));
      st.inventory[id]--;
      if (!st.inventory[id]) delete st.inventory[id];
    }, 'battle');
    playFx('heal', 'me');
    say([`${item.name}を使った！ ${SPECIES[me.speciesId].name}は元気になった。`], enemyTurn);
  };

  const ability = me ? SPECIES[me.speciesId].ability : null;
  const abilityTools = (id: string): ExerciseTools =>
    ({
      reveal_reading: { showReading: true },
      eliminate: { eliminate: 1 },
      highlight: { showReading: true },
      replay: { slowAudio: true, eliminate: 1 },
      translate: { showEn: true },
    })[id] ?? {};

  const end = phase.k === 'end' ? phase.result : null;
  useEffect(() => {
    if (end) onEnd(end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  if (!me) {
    return (
      <div className="battle">
        <div className="panel">言霊の仲間がいない……。</div>
        <button className="btn" onClick={() => onEnd('run')}>OK</button>
      </div>
    );
  }

  return (
    <div className="battle">
      <div className="arena" style={{ backgroundImage: `url(assets/${bgFile(setup.bg)})` }}>
        <div className="arena-shade" />
        {fx && <div key={fx.k} className={`fx fx-on-${fx.on}`} style={{ backgroundImage: `url(assets/fx_${fx.name}.png)` }} />}
        <InfoBox c={enemy} max={enemyMax} />
        <img className={`px enemy-sprite ${shake === 'enemy' ? 'shake' : ''} ${enemy.hp <= 0 ? 'fade' : ''}`} src={IDLE_SPRITES.includes(esp.sprite) ? `assets/idle_${esp.sprite}_${idleFrame}.png` : `assets/${esp.sprite}.png`} alt={esp.name} />
        <img
          key={me.speciesId}
          className={`px my-sprite back ${shake === 'me' ? 'shake' : ''}`}
          src={`assets/back_${SPECIES[me.speciesId].sprite}.png`}
          alt=""
          onError={(e) => {
            // no back view drawn yet: fall back to the mirrored front sprite
            const img = e.currentTarget;
            img.classList.remove('back');
            img.src = `assets/${SPECIES[me.speciesId].sprite}.png`;
          }}
        />
        <InfoBox c={me} max={maxHp(me)} mine />
      </div>
      <div className="battle-ui">
        {phase.k === 'msg' && (
          <div className="msgbox" onClick={nextMsg}>
            <span lang="ja">{queue[0]}</span>
            <button className="next-arrow petal" aria-label="Next" autoFocus onClick={(e) => (e.stopPropagation(), nextMsg())} />
          </div>
        )}
        {phase.k === 'menu' && (
          <div className="cmd-grid">
            <div className="msgbox small">{SPECIES[me.speciesId].name}はどうする？</div>
            <div className="cmds">
              <button className="btn cmd" autoFocus onClick={() => setPhase({ k: 'moves' })}>⚔ たたかう</button>
              <button className="btn cmd" disabled={!setup.recruitable || setup.boss} onClick={() => setPhase({ k: 'talk', q: pickTalk(enemy.speciesId) })}>💬 はなす</button>
              <button className="btn cmd" onClick={() => setPhase({ k: 'items' })}>🎒 どうぐ</button>
              <button className="btn cmd" disabled={store.s.team.length < 2} onClick={() => setPhase({ k: 'switch' })}>🔁 いれかえ</button>
              <button className="btn cmd" disabled={setup.boss} onClick={() => say(['うまく逃げきれた！'], () => setPhase({ k: 'end', result: 'run' }))}>🏃 にげる</button>
            </div>
          </div>
        )}
        {phase.k === 'moves' && (
          <div className="cmd-grid">
            <div className="msgbox small">Each move asks a Japanese question. Correct = strong hit.</div>
            <div className="cmds">
              {SPECIES[me.speciesId].moves.map((id) => {
                const m = MOVES[id];
                return (
                  <button key={id} className="btn cmd move" onClick={() => setPhase({ k: 'question', moveId: id, ex: battleExercise(store.s, m.area) })}>
                    <b>{m.name}</b>
                    <small>
                      {AFFINITY_INFO[m.affinity].ja} · {{ vocab: '語彙', grammar: '文法', kanji: '漢字', listening: '聴解' }[m.area]} · 威力{m.power}
                    </small>
                  </button>
                );
              })}
              <button className="btn cmd ghost" onClick={() => setPhase({ k: 'menu' })}>◀ もどる</button>
            </div>
          </div>
        )}
        {phase.k === 'question' && (
          <div className="battle-question">
            <div className="tool-row">
              {ability && !usedAbility.current.has(me.uid) && (
                <button
                  className="btn small"
                  title={ability.desc}
                  onClick={() => {
                    usedAbility.current.add(me.uid);
                    setTools({ ...tools, ...abilityTools(ability.id) });
                  }}
                >
                  ✦ {ability.name}
                </button>
              )}
              {(store.s.inventory.shiori ?? 0) > 0 && !tools.eliminate && phase.ex.options && (
                <button
                  className="btn small"
                  title={ITEMS.shiori.desc}
                  onClick={() => {
                    store.update((st) => {
                      st.inventory.shiori--;
                      if (!st.inventory.shiori) delete st.inventory.shiori;
                    }, 'item');
                    setTools({ ...tools, eliminate: 2 });
                  }}
                >
                  🔖 栞 ×{store.s.inventory.shiori}
                </button>
              )}
            </div>
            <ExerciseView key={phase.ex.id} ex={phase.ex} tools={tools} compact onDone={(ok, ms, ch) => onAnswer(phase.moveId, phase.ex, ok, ms, ch)} />
          </div>
        )}
        {phase.k === 'talk' && (
          <div className="battle-question">
            <div className="ch-kind">💬 {esp.name}に話しかける — choose the most natural reply</div>
            <QuestionBlock q={phase.q} onDone={(ok) => onTalk(ok)} />
          </div>
        )}
        {phase.k === 'items' && (
          <div className="cmd-grid">
            <div className="msgbox small">どれを使う？</div>
            <div className="cmds">
              {Object.entries(store.s.inventory)
                .filter(([id, n]) => n > 0 && ITEMS[id]?.kind === 'heal')
                .map(([id, n]) => (
                  <button key={id} className="btn cmd" onClick={() => useItem(id)}>
                    {ITEMS[id].name} ×{n}
                    <small>HP +{ITEMS[id].heal}</small>
                  </button>
                ))}
              <button className="btn cmd ghost" onClick={() => setPhase({ k: 'menu' })}>◀ もどる</button>
            </div>
          </div>
        )}
        {phase.k === 'switch' && (
          <div className="cmd-grid">
            <div className="msgbox small">{phase.forced ? '次はだれが行く？' : 'だれと交代する？'}</div>
            <div className="cmds">
              {store.s.team.map((c, i) => (
                <button
                  key={c.uid}
                  className="btn cmd"
                  disabled={c.hp <= 0 || i === active}
                  onClick={() => {
                    setActive(i);
                    say([`行け、${SPECIES[c.speciesId].name}！`], phase.forced ? () => setPhase({ k: 'menu' }) : enemyTurn);
                  }}
                >
                  {SPECIES[c.speciesId].name} Lv.{c.level}
                  <small>
                    HP {c.hp}/{maxHp(c)}
                  </small>
                </button>
              ))}
              {!phase.forced && (
                <button className="btn cmd ghost" onClick={() => setPhase({ k: 'menu' })}>◀ もどる</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const FX_BY_AFFINITY: Record<string, string> = {
  fire: 'fire', water: 'water', nature: 'leaf', wind: 'wind', lightning: 'lightning',
  memory: 'memory', knowledge: 'memory', emotion: 'memory',
};

function bgFile(bg?: string) {
  const name = bg ?? 'bg_forest_clearing.webp';
  return name.includes('.') ? name : `${name}.png`;
}

function pickTalk(speciesId: string): Question {
  const t = SPECIES[speciesId].talk;
  if (!t.length) return GENERIC_TALK;
  const x = t[Math.floor(Math.random() * t.length)];
  return { q: x.line, qEn: x.en, options: x.options, answer: x.answer, why: x.why };
}
