import { DE_STORY } from './de_story';
import type { DialogueRule, Mood, Step } from '../core/script';
import type { QuestDef } from './quests';

/**
 * 心の物語 (Herzensgeschichten): story episodes with the people of a chapter, told over several scenes. The chapter's
 * words and grammar stand at the heart of each scene — said by a person, at a place, in a moment that matters — and are
 * learned right at its end (card and question). Later reviews bring back that very line as the cue (core/memory.ts).
 * Each episode becomes a quest (ep_*) plus dialogue rules on the people and things where its scenes happen.
 * Every English text carries its German, registered for the meaning language German.
 */

type T = [en: string, de: string];
const de = ([en, d]: T) => ((DE_STORY[en] ??= d), en);

/** a person's line (who: an NPCS id) */
export const l = (who: string, ja: string, t: T, mood?: Mood): Step => (mood ? { say: ja, who, en: de(t), mood } : { say: ja, who, en: de(t) });
/** narration */
export const nar = (ja: string, t: T): Step => ({ say: ja, en: de(t) });
/** a story picture with its line */
export const pic = (cg: string, ja: string, t: T): Step => ({ cg, say: ja, en: de(t) });
/** the player's answer: one or more options, each with what follows */
export const ask = (...options: [ja: string, t: T, then?: Step[]][]): Step => ({ choice: options.map(([text, t, then]) => ({ text, en: de(t), ...(then ? { then } : {}) })) });

export interface Scene {
  /** where the scene happens: the person or thing to talk to (a SCRIPTS key) */
  at: string;
  /** what the quest log says to do */
  goal: T;
  /** the evening falls for this scene */
  evening?: boolean;
  /** a mood for the scene: a music track (core/audio TRACKS) */
  music?: string;
  lines: Step[];
  /** the chapter's items at the heart of the scene: learned at its end */
  teach: string[];
  /** given at the end of the scene */
  give?: [item: string, n?: number];
}

export interface Episode {
  id: string;
  chapter: number;
  /** the main quest that must be done before the episode begins */
  after: string;
  /** the person whose story it is (relationship and memory) */
  who: string;
  title: [ja: string, en: string, de: string];
  summary: T;
  scenes: Scene[];
}

export function buildEpisodes(eps: Episode[]) {
  const quests: Record<string, QuestDef> = {};
  const rules: Record<string, DialogueRule[]> = {};
  for (const ep of eps) {
    DE_STORY[ep.title[1]] ??= ep.title[2];
    quests[ep.id] = {
      id: ep.id,
      kind: 'character',
      chapter: ep.chapter,
      title: ep.title[0],
      titleEn: ep.title[1],
      description: de(ep.summary),
      objectives: ep.scenes.map((sc, i) => ({ id: 's' + (i + 1), text: de(sc.goal) })),
      rewards: { xp: 60 },
      learning: ep.scenes.flatMap((sc) => sc.teach),
    };
    ep.scenes.forEach((sc, i) => {
      const obj = `${ep.id}.s${i + 1}`;
      const when =
        i === 0
          ? { all: [{ questNotStarted: ep.id }, { questDone: ep.after }] }
          : { all: [{ questActive: ep.id }, { obj: `${ep.id}.s${i}` }, { notObj: obj }] };
      const last = i === ep.scenes.length - 1;
      const steps: Step[] = [
        ...(i === 0 ? [{ do: [{ startQuest: ep.id }] } as Step] : []),
        ...(sc.evening ? [{ do: [{ time: 'evening' as const }] } as Step] : []),
        ...(sc.music ? [{ do: [{ music: sc.music }] } as Step] : []),
        ...sc.lines,
        { do: [{ learn: sc.teach }, ...(sc.give ? [{ give: sc.give[0], n: sc.give[1] ?? 1 }] : [])] },
        // the words of this moment, learned while it is still fresh
        ...sc.teach.map((k) => ({ teach: k }) as Step),
        ...(sc.music ? [{ do: [{ music: 'map' }] } as Step] : []),
        { do: [{ objective: obj }, ...(last ? [{ rel: ep.who, points: 3, memory: ep.id }] : [])] },
        ...(last ? [{ toast: `心の物語「${ep.title[0]}」 ♥` } as Step] : []),
      ];
      (rules[sc.at] ??= []).push({ when, steps });
    });
  }
  return { quests, rules };
}
