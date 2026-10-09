import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
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
        if ('say' in st && 'who' in st && st.who) expect(NPCS[st.who], st.who).toBeTruthy();
        if ('cg' in st) expect(existsSync(`public/assets/${st.cg}.webp`), st.cg).toBe(true);
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
      for (const o of m.objects) if (o.w !== 0 && o.solid !== false) expect(SCRIPTS[o.script ?? o.id], `script for ${o.id}`).toBeTruthy();
      for (const w of m.wanderers ?? []) expect(BLOCKING.has(m.tiles[w.y][w.x]), `${m.id}:${w.id}`).toBe(false);
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
    expect(c.speciesId).toBe('haneuta');
    expect(msgs.some((m) => m.includes('evolved'))).toBe(true);
  });

  it('recruit action adds to the team and dex', () => {
    const s = createInitialState('T');
    runAction(s, { recruit: 'yukitsune', level: 5 });
    expect(s.team).toHaveLength(1);
    expect(s.dex.yukitsune).toBe('caught');
  });
});

describe('room reachability', () => {
  it('from every entrance you can reach the exit and stand next to every NPC', () => {
    for (const m of Object.values(MAPS)) {
      const H = m.tiles.length;
      const W = m.tiles[0].length;
      const solid = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= W || y >= H) return true;
        if (BLOCKING.has(m.tiles[y][x])) return true;
        if (m.npcs.some((n) => n.x === x && n.y === y)) return true;
        return m.objects.some((o) => o.solid !== false && (o.w ?? 1) > 0 && x >= o.x && x < o.x + (o.w ?? 1) && y >= o.y && y < o.y + (o.h ?? 1));
      };
      // every place you arrive on this map from elsewhere
      const entries = Object.values(MAPS).flatMap((src) => src.warps.filter((w) => w.to.map === m.id).map((w) => w.to));
      for (const e of entries) {
        expect(solid(e.x, e.y), `${m.id}: entrance ${e.x},${e.y} is blocked`).toBe(false);
        const seen = new Set([`${e.x},${e.y}`]);
        const q = [[e.x, e.y]];
        while (q.length) {
          const [x, y] = q.shift()!;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nx = x + dx;
            const ny = y + dy;
            const k = `${nx},${ny}`;
            if (seen.has(k) || solid(nx, ny)) continue;
            seen.add(k);
            q.push([nx, ny]);
          }
        }
        const near = (x: number, y: number) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => seen.has(`${x + dx},${y + dy}`));
        // talking across a counter (up to two counter tiles) also counts
        const viaCounter = (x: number, y: number) =>
          [[0, 1], [0, -1], [1, 0], [-1, 0]].some(([dx, dy]) => {
            for (let i = 1; i <= 3; i++) {
              const cx = x + dx * i;
              const cy = y + dy * i;
              if (seen.has(`${cx},${cy}`)) return i > 1;
              if (m.tiles[cy]?.[cx] !== 'c') return false;
            }
            return false;
          });
        for (const w of m.warps) expect(near(w.x, w.y), `${m.id}: exit ${w.x},${w.y} unreachable from ${e.x},${e.y}`).toBe(true);
        for (const n of m.npcs) expect(near(n.x, n.y) || viaCounter(n.x, n.y), `${m.id}: ${n.id} unreachable`).toBe(true);
      }
    }
  });
});

describe('N2 core lists', () => {
  it('vocab ids are unique and examples contain their word', async () => {
    const { VOCAB } = await import('../src/content/vocab');
    const ids = new Set<string>();
    for (const v of VOCAB) {
      expect(ids.has(v.id), v.id).toBe(false);
      ids.add(v.id);
      if (v.tags.includes('core')) expect(v.example.includes(v.word), v.id).toBe(true);
    }
  });
  it('affix examples start/end with their affix and sentences contain the word', async () => {
    const { AFFIXES } = await import('../src/content/wordformation');
    for (const a of AFFIXES) for (const e of a.examples) {
      expect(a.kind === 'prefix' ? e.word.startsWith(a.part) : e.word.endsWith(a.part), e.word).toBe(true);
      expect(e.sentence.includes(e.word), e.word).toBe(true);
    }
  });
  it('confusion exercises have a blank and 4 distinct options', async () => {
    const { CONFUSIONS } = await import('../src/content/confusions');
    for (const g of CONFUSIONS) for (const e of g.ex) {
      expect(e.s.includes('＿＿'), e.s).toBe(true);
      expect(new Set(e.opts).size, e.s).toBe(4);
    }
  });
  it('exam sections build without duplicate options', async () => {
    const { buildSectionPractice, SECTIONS } = await import('../src/core/exam');
    for (const sec of SECTIONS) for (let k = 0; k < 20; k++) for (const it of buildSectionPractice(sec.id, 6)) {
      expect(new Set(it.options).size, it.prompt).toBe(it.options.length);
    }
  });
});

describe('content packs', () => {
  it('registers vocab/grammar, keeps known words, seeds Anki progress once', async () => {
    const { registerPack, seedProgress, packInfo } = await import('../src/core/packs');
    const { VOCAB_BY_ID, VOCAB } = await import('../src/content/vocab');
    const { GRAMMAR_BY_ID } = await import('../src/content/grammar');
    const { createInitialState } = await import('../src/core/store');
    const { exerciseFor } = await import('../src/core/learning');
    const before = VOCAB.length;
    const gram = (i: number, blank: string) => ({ id: 'ag' + i, pattern: blank + 'X', meaning: 'm' + i, context: 'c', example: `文の${blank}です。`, exampleDe: 'de', blank });
    registerPack({
      id: 'anki', title: 't', version: 1,
      vocab: [
        { id: 'a1', word: '一家', reading: 'いっか', en: 'family', de: 'Familie', pos: 'noun', level: 'N2', chapter: 1, tags: [], example: '一家を支える。', exampleEn: 'support the family' },
        { id: 'a2', word: '締め切り', reading: 'しめきり', en: 'deadline', de: 'Frist', pos: 'noun', level: 'N2', chapter: 1, tags: [], example: '締め切りだ。', exampleEn: 'deadline' },
      ],
      grammar: [gram(1, 'あげく'), gram(2, 'ものなら'), gram(3, 'たまえ'), gram(4, 'そうすると')],
      progress: { 'v:a1': { ivl: 40, lapses: 0, reps: 5 }, 'v:a2': { ivl: 10, lapses: 1, reps: 3 }, 'g:ag1': { ivl: 0, lapses: 0, reps: 1 } },
    });
    expect(VOCAB.length).toBe(before + 1); // 締め切り already exists
    expect(VOCAB_BY_ID.a1.source).toBe('anki');
    expect(GRAMMAR_BY_ID.ag1.exercises[0].options).toHaveLength(4);
    expect(packInfo.loaded?.words).toBe(2);
    const s = createInitialState('M');
    expect(seedProgress(s)).toBe(2); // a1 + alias a2 -> shimekiri; ag1 has no interval
    expect(s.cards['v:a1'].interval).toBe(40);
    expect(s.cards['v:shimekiri'].introduced).toBe(true);
    expect(seedProgress(s)).toBe(0);
    for (let i = 0; i < 20; i++) {
      exerciseFor(s, 'g:ag1');
      exerciseFor(s, 'v:a1');
    }
  });
});
