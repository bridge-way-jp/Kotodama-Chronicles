import type { Step } from './script';
import type { GameState } from './types';
import { NPCS } from '../content/npcs';
import { ITEMS } from '../content/creatures';
import { GREETINGS, HEART_EVENTS, PROFILES, REACT, REPLIES, TALK, type Profile, type Register, type TalkLine } from '../content/social';
import { regionOf } from './guide';
import { ttsAvailable } from './audio';

/**
 * Conversations with people outside the story scenes: after what a person usually says, the player can talk a
 * little longer (small talk that fits the moment, answered in the right register, sometimes heard first or built
 * from blocks), give a gift, or, when close enough, hear their personal story (heart event).
 */

const NOT_PEOPLE = new Set(['yukitsune', 'kotone', 'traveller', 'busdriver']);

export function profileOf(id: string): Profile | null {
  if (NOT_PEOPLE.has(id) || !NPCS[id]) return null;
  if (PROFILES[id]) return PROFILES[id];
  // shopkeepers and other people without a profile of their own: polite, voice from the sprite they borrow
  const sp = NPCS[id].sprite.replace(/^npc_/, '');
  return { voice: PROFILES[sp]?.voice ?? 'f', reg: 'polite' };
}

export const hearts = (s: GameState, id: string) => Math.min(5, Math.floor((s.relationships[id]?.points ?? 0) / 3));
export const dayNum = (t = Date.now()) => {
  const d = new Date(t);
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

function season(): 'spring' | 'summer' | 'autumn' | 'winter' {
  const m = new Date().getMonth() + 1;
  return m >= 3 && m <= 5 ? 'spring' : m <= 8 && m >= 6 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';
}

function fits(s: GameState, l: TalkLine): boolean {
  const w = l.when;
  if (!w) return true;
  if (w.time && s.timeOfDay !== w.time) return false;
  if (w.season && season() !== w.season) return false;
  if (w.region && regionOf(s.map) !== w.region) return false;
  if (w.flag && !s.flags[w.flag]) return false;
  if (w.notFlag && s.flags[w.notFlag]) return false;
  return true;
}

const pick = <T,>(a: T[], r = Math.random) => a[Math.floor(r() * a.length)];

/** a small-talk line that fits now: lines tied to the moment are preferred over the general ones */
export function talkLine(s: GameState, r = Math.random): TalkLine {
  const ok = TALK.filter((l) => fits(s, l));
  const special = ok.filter((l) => l.when);
  return special.length && r() < 0.7 ? pick(special, r) : pick(ok, r);
}

/** the reaction to a reply in register `chosen` from a person who expects `want` */
function reaction(id: string, want: Register, chosen: Register, firstToday: boolean): Step[] {
  const n = (jp: string, en: string): Step => ({ say: jp, en });
  if (chosen === 'casual' && want !== 'casual') return [{ say: REACT.tooCasual.jp, en: REACT.tooCasual.en, who: id, mood: 'surprised' }, n('（' + REACT.tooCasual.note + '）', REACT.tooCasual.note)];
  if (chosen === 'keigo' && want === 'casual') return [{ say: REACT.tooStiff.jp, en: REACT.tooStiff.en, who: id, mood: 'surprised' }, n('（' + REACT.tooStiff.note + '）', REACT.tooStiff.note)];
  const g = REACT.good[want];
  return [{ say: g.jp, en: g.en, who: id, mood: 'happy' }, ...(firstToday ? [{ do: [{ rel: id, points: 1 }] } as Step] : [])];
}

/** a little more talk: their line (sometimes only heard first), then the player's reply in a register of their choice */
export function smallTalk(s: GameState, id: string, r = Math.random): Step[] {
  const p = profileOf(id)!;
  const l = talkLine(s, r);
  const theirs = p.reg === 'casual' ? l.casual : l.polite;
  const firstToday = s.flags['soc_' + id] !== dayNum();
  const steps: Step[] = [];
  if (ttsAvailable() && r() < 0.35) {
    const others = TALK.filter((t) => t.en !== l.en).sort(() => r() - 0.5).slice(0, 2).map((t) => t.en);
    const options = [l.en, ...others].sort(() => r() - 0.5);
    steps.push({ hear: { text: theirs, en: l.en, who: id, voice: p.voice, options, answer: options.indexOf(l.en) } });
  } else steps.push({ say: theirs, who: id, en: l.en });
  const rep = REPLIES[l.reply];
  if (r() < 0.3) {
    // build the polite reply from blocks
    steps.push({ build: { chunks: rep.chunks, en: rep.en } });
    steps.push(...reaction(id, p.reg, 'polite', firstToday));
  } else {
    const regs: Register[] = (['keigo', 'polite', 'casual'] as Register[]).sort(() => r() - 0.5);
    steps.push({ choice: regs.map((reg) => ({ text: rep[reg], en: rep.en, then: reaction(id, p.reg, reg, firstToday) })) });
  }
  steps.push({ do: [{ flag: 'soc_' + id, value: dayNum() }] });
  return steps;
}

/** the reaction to a gift: loved, liked, or just polite thanks */
export function giftReaction(s: GameState, id: string, item: string): Step[] {
  const p = profileOf(id)!;
  const casual = p.reg === 'casual';
  const tier = p.loves?.includes(item) ? 3 : p.likes?.includes(item) ? 2 : 1;
  const name = ITEMS[item]?.name ?? item;
  const first = s.flags['gift_' + id] !== dayNum();
  const line =
    tier === 3
      ? casual
        ? { jp: `えっ、${name}！ これ、大好きなんだ！ ありがとう！`, en: `${ITEMS[item]?.nameEn}! I love this! Thank you!` }
        : { jp: `まあ、${name}！ 大好きなんです。本当にありがとうございます。`, en: `Oh, ${ITEMS[item]?.nameEn}! I love it. Thank you so much.` }
      : tier === 2
        ? casual
          ? { jp: `${name}？ うれしい、ありがとう！`, en: `${ITEMS[item]?.nameEn}? Nice, thanks!` }
          : { jp: `${name}ですか。うれしいです、ありがとうございます。`, en: `${ITEMS[item]?.nameEn}? I am glad, thank you.` }
        : casual
          ? { jp: 'ありがとう。もらっとくね。', en: 'Thanks. I will take it.' }
          : { jp: 'ありがとうございます。いただきます。', en: 'Thank you. I will gladly accept it.' };
  return [
    { say: line.jp, who: id, en: line.en, mood: tier > 1 ? 'happy' : 'neutral' },
    { do: [{ take: item }, ...(first ? [{ rel: id, points: tier }, { flag: 'gift_' + id, value: dayNum() }] : [])] },
    ...(first ? [] : [{ say: '（今日はもう贈り物をした。気持ちは伝わったけれど、仲はこれ以上深まらない。）', en: '(You already gave a gift today. They are happy, but it does not bring you closer again today.)' } as Step]),
  ];
}

/** how to hand over a gift: the humble formula for most people, a light one for friends */
export function giftPhrase(s: GameState, id: string, item: string): Step[] {
  const p = profileOf(id)!;
  const opts: { reg: Register; text: string; en: string }[] = [
    { reg: 'keigo', text: 'つまらないものですが、どうぞお納めください。', en: 'It is only a small thing, but please accept it.' },
    { reg: 'polite', text: 'よかったら、どうぞ。', en: 'Please, if you like.' },
    { reg: 'casual', text: 'はい、これ。あげる！', en: 'Here, this is for you!' },
  ];
  const ok = (reg: Register) => !(reg === 'casual' && p.reg !== 'casual') && !(reg === 'keigo' && p.reg === 'casual');
  return [
    {
      choice: opts.map((o) => ({
        text: o.text,
        en: o.en,
        then: [
          ...(ok(o.reg) ? [] : reaction(id, p.reg, o.reg, false)),
          ...giftReaction(s, id, item),
        ],
      })),
    },
  ];
}

/** what follows a person's usual lines: talk more, give a gift, their heart event, or goodbye */
export function socialMenu(s: GameState, id: string): Step[] {
  const p = profileOf(id);
  if (!p) return [];
  const heart = HEART_EVENTS[id] && (s.relationships[id]?.points ?? 0) >= 6 && !s.flags['heart_' + id];
  const gifts = Object.entries(s.inventory).filter(([k, n]) => n > 0 && ITEMS[k]?.kind === 'heal');
  return [
    { do: [{ rel: id, points: 0 }] }, // you have met them: they appear in the diary
    {
      choice: [
        ...(heart
          ? [{ text: '♥ ゆっくり話す', en: '♥ Take time to talk', then: [...HEART_EVENTS[id], { do: [{ flag: 'heart_' + id }, { rel: id, points: 2, memory: 'heart1' }] }, { toast: `♥ ${NPCS[id].name}と仲良くなった！` }] }]
          : []),
        { text: 'もう少し話す', en: 'Talk a little more', then: [{ talk: id }] },
        ...(gifts.length ? [{ text: 'プレゼントを渡す', en: 'Give a gift', then: [{ gift: id }] }] : []),
        { text: 'またね', en: 'See you' },
      ],
    },
  ];
}

/** a short call for a speech bubble when walking past someone */
export function greetingFor(id: string, r = Math.random): string {
  const p = profileOf(id);
  const reg = p?.reg ?? 'polite';
  return pick(GREETINGS[reg], r);
}
