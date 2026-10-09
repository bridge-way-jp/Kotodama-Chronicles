import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { completeObjective, startQuest, runAction, addCreature, giveCreatureXp } from '../src/core/game';
import { buildReviewSession, encounter, recordAnswer, exerciseFor, battleExercise, queueInfo } from '../src/core/learning';
import { check, pickRule } from '../src/core/script';
import { SCRIPTS } from '../src/content/scripts';
import { MAPS, BLOCKING } from '../src/content/maps';
import { NPCS } from '../src/content/npcs';
import { READINGS, LISTENING } from '../src/content/texts';
import { QUESTS } from '../src/content/quests';
import { SPECIES } from '../src/content/creatures';
import { buildMockExam, buildDiagnostic } from '../src/core/exam';
import { readiness } from '../src/core/readiness';
import type { Step } from '../src/core/script';

describe('quests & scripts', () => {
  it('completing all objectives completes the quest, grants rewards and starts the next', () => {
    const s = createInitialState('T');
    startQuest(s, 'mq1');
    completeObjective(s, 'mq1.letter');
    expect(s.quests.mq1.status).toBe('active');
    completeObjective(s, 'mq1.mori');
    expect(s.quests.mq1.status).toBe('done');
    expect(s.money).toBe(3000 + 1000);
    expect(s.quests.mq2.status).toBe('active');
    expect(s.xp + (s.level - 1) * 1000).toBeGreaterThan(0);
  });

  it('conditions select the right dialogue', () => {
    const s = createInitialState('T');
    startQuest(s, 'mq1');
    expect(pickRule(s, SCRIPTS.desk)?.[1]).toHaveProperty('reading', 'r_mori_letter');
    completeObjective(s, 'mq1.letter');
    expect(check(s, { obj: 'mq1.letter' })).toBe(true);
    expect(pickRule(s, SCRIPTS.desk)?.[0]).toHaveProperty('say');
  });

  it('all script references point to existing content', () => {
    const walk = (steps: Step[]) => {
      for (const st of steps) {
        if ('reading' in st) expect(READINGS[st.reading], st.reading).toBeTruthy();
        if ('listening' in st) expect(LISTENING[st.listening], st.listening).toBeTruthy();
        if ('battle' in st) expect(SPECIES[st.battle.species]).toBeTruthy();
        if ('say' in st && st.who) expect(NPCS[st.who], st.who).toBeTruthy();
        if ('do' in st)
          for (const a of st.do) {
            if ('objective' in a) {
              const [q, o] = a.objective.split('.');
              expect(QUESTS[q]?.objectives.some((x) => x.id === o), a.objective).toBe(true);
            }
            if ('startQuest' in a) expect(QUESTS[a.startQuest]).toBeTruthy();
            if ('recruit' in a) expect(SPECIES[a.recruit]).toBeTruthy();
          }
        if ('choice' in st) st.choice.forEach((c) => c.then && walk(c.then));
        if ('if' in st) {
          walk(st.then);
          if (st.else) walk(st.else);
        }
        if ('battle' in st) {
          if (st.win) walk(st.win);
          if (st.lose) walk(st.lose);
        }
      }
    };
    for (const rules of Object.values(SCRIPTS)) rules.forEach((r) => walk(r.steps));
  });
});

describe('maps', () => {
  it('every map is rectangular, NPCs stand on walkable tiles and warps target valid maps', () => {
    for (const m of Object.values(MAPS)) {
      const w = m.tiles[0].length;
      m.tiles.forEach((row, i) => expect(row.length, `${m.id} row ${i}`).toBe(w));
      for (const n of m.npcs) {
        expect(NPCS[n.id]).toBeTruthy();
        expect(BLOCKING.has(m.tiles[n.y][n.x]), `${m.id}:${n.id}`).toBe(false);
      }
      for (const wp of m.warps) {
        const t = MAPS[wp.to.map];
        expect(t).toBeTruthy();
        expect(BLOCKING.has(t.tiles[wp.to.y][wp.to.x]), `${m.id} warp -> ${wp.to.map}`).toBe(false);
      }
      for (const o of m.objects) expect(SCRIPTS[o.script ?? o.id], `script for ${o.id}`).toBeTruthy();
    }
  });
});

describe('learning', () => {
  it('encountering is not learning; answering is', () => {
    const s = createInitialState('T');
    encounter(s, ['v:iiwake']);
    expect(s.cards['v:iiwake'].introduced).toBe(false);
    expect(s.cards['k:chi']).toBeUndefined();
    encounter(s, ['v:chien']);
    expect(s.cards['k:chi']).toBeTruthy(); // kanji surfaced through its word
    const ex = exerciseFor(s, 'v:iiwake');
    recordAnswer(s, ex, true, 3000);
    expect(s.cards['v:iiwake'].introduced).toBe(true);
    expect(s.cards['v:iiwake'].interval).toBe(1);
  });

  it('tracks grammar confusions and then serves contrast drills', () => {
    const s = createInitialState('T');
    const ex = exerciseFor(s, 'g:wakedewanai');
    const wrong = { text: 'わけがない', correct: false, key: 'g:wakeganai' };
    recordAnswer(s, ex, false, 3000, wrong);
    recordAnswer(s, ex, false, 3000, wrong);
    expect(s.confusions['g:wakedewanai|g:wakeganai']).toBe(2);
    expect(exerciseFor(s, 'g:wakedewanai').mode).toBe('contrast');
  });

  it('review sessions respect the daily new-item limit', () => {
    const s = createInitialState('T');
    s.settings.newPerDay = 3;
    const items = buildReviewSession(s, 20);
    expect(items.filter((i) => i.isNew).length).toBe(3);
    expect(queueInfo(s).newAllowed).toBe(3);
  });

  it('exercises always contain exactly one correct option', () => {
    const s = createInitialState('T');
    for (let i = 0; i < 200; i++) {
      const ex = battleExercise(s, (['vocab', 'grammar', 'kanji', 'listening'] as const)[i % 4]);
      if (ex.options) {
        expect(ex.options.filter((o) => o.correct).length).toBe(1);
        expect(new Set(ex.options.map((o) => o.text)).size).toBe(ex.options.length);
      } else expect(ex.accept?.length).toBeGreaterThan(0);
    }
  });

  it('exam sets are well-formed', () => {
    for (const items of [buildMockExam(), buildDiagnostic()]) {
      for (const it of items) {
        expect(it.answer).toBeGreaterThanOrEqual(0);
        expect(it.answer).toBeLessThan(it.options.length);
        expect(new Set(it.options).size, it.id).toBe(it.options.length);
      }
    }
  });

  it('readiness is zero for a fresh game', () => {
    const r = readiness(createInitialState('T'));
    expect(r.overall).toBe(0);
  });
});

describe('creatures', () => {
  it('evolve at the configured level', () => {
    const s = createInitialState('T');
    const c = addCreature(s, 'kotori', 6);
    const msgs = giveCreatureXp(s, c, 500);
    expect(c.speciesId).toBe('shirahane');
    expect(msgs.some((m) => m.includes('evolved'))).toBe(true);
  });

  it('recruit action adds to the team and dex', () => {
    const s = createInitialState('T');
    runAction(s, { recruit: 'yukitsune', level: 5 });
    expect(s.team).toHaveLength(1);
    expect(s.dex.yukitsune).toBe('caught');
  });
});
