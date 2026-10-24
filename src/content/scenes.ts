import type { Step, StageCmd } from '../core/script';

/**
 * Staging for the story: little scenes in the world (people show what they feel, walk, the camera moves to what
 * matters, the screen shakes or flashes) and the chapter title pictures, added to the existing scripts at the line
 * they belong to. A line is found by how its plain text starts (markup like {漢字|かんじ} removed), in the script of
 * the person or thing named. People who are not on the current map are left out of a scene by themselves.
 */

export interface Beat {
  script: string;
  /** the start of the line's plain text */
  at: string;
  before?: Step[];
  after?: Step[];
}

const st = (...cmds: StageCmd[]): Step => ({ stage: cmds });
const feel = (who: string, emote: Extract<StageCmd, { emote: unknown }>['emote']): StageCmd => ({ emote, who });
const turn = (who: string, to = 'player'): StageCmd => ({ face: who, to });

/** the chapter title pictures that exist (cg_chapterN), shown when the chapter begins */
export const CHAPTER_TITLES: Record<number, { ja: string; en: string; script: string; at: string }> = {
  2: { ja: '第二章　桃と湯けむりの谷', en: 'Chapter 2 — The Valley of Peaches and Steam', script: 'mori', at: 'あら、おかえりなさい。えっと' },
  3: { ja: '第三章　雪見村の手紙', en: 'Chapter 3 — The Letter from the Snow Village', script: 'mori', at: '@nameちゃん、ちょっといい？ 雪見村' },
  4: { ja: '第四章　潮見町の舟歌', en: 'Chapter 4 — The Boat Song of Shiomi', script: 'mori', at: '@nameちゃん、おかえり！ つるさんから' },
  5: { ja: '第五章　京都', en: 'Chapter 5 — Kyoto', script: 'mori', at: '@nameちゃん、おかえり！ 潮見の灯台' },
  6: { ja: '第六章　大阪', en: 'Chapter 6 — Osaka', script: 'mori', at: '@nameちゃん、おかえり！ 京都のお話' },
  7: { ja: '第七章　東京', en: 'Chapter 7 — Tokyo', script: 'mori', at: '@nameちゃん、おかえり！ 大阪のお話' },
};
/** chapter pictures delivered so far (public/assets/cg_chapterN.webp) */
export const CHAPTER_PICTURES = new Set([2]);

export const BEATS: Beat[] = [
  // chapter 1
  { script: 'mori', at: '@nameさん、いらっしゃい！ 大家の森です', before: [st(turn('mori'), feel('mori', 'heart'))] },
  { script: 'mori', at: 'ただ……最近、ちょっと不思議なこと', before: [st(feel('mori', 'dots'))] },
  { script: 'haruto', at: '実は、ちょっと困ってて', before: [st(feel('haruto', 'sweat'))] },
  { script: 'customer', at: 'そうだ、取り寄せと領収書だ', before: [st(feel('haruto', 'idea'))] },
  { script: 'kaede', at: '「K」……？', before: [st(feel('kaede', 'question'))] },
  { script: 'kaede', at: '……まさか、ね。', before: [st(feel('kaede', 'dots'))] },
  { script: 'station_staff', at: 'あっ、すみません！ 今、電光掲示板', before: [st(feel('station_staff', 'sweat'))] },
  { script: 'old_board', at: '……耳を澄ますと', before: [st({ camera: 'player', zoom: 1.5, ms: 900 }, feel('player', 'question'))] },
  { script: 'old_board', at: '掲示板の文字がふわりと光り', before: [st({ shake: 350 }, { flash: true })] },
  { script: 'kirishima', at: '……君、その子は……！', before: [st(turn('kirishima'), feel('kirishima', 'alert'))] },
  { script: 'kirishima', at: 'これは……言葉の欠片だ！', before: [st(feel('kirishima', 'alert'))] },
  { script: 'kirishima', at: '計画の中心にいた研究者のイニシャル', before: [st({ camera: 'kirishima', zoom: 1.5, ms: 900 }, { wait: 300 })] },
  { script: 'forest_stone', at: '石碑が光った！', before: [st({ shake: 500 }, { flash: true })] },
  // chapter 2
  { script: 'mori', at: 'あら、おかえりなさい。えっと', before: [st(turn('mori'), feel('mori', 'question'))] },
  { script: 'mori', at: '森さんは、困ったように笑った', after: [st(feel('player', 'sweat'))] },
  { script: 'kirishima', at: '森さんが、君の名前を', before: [st(feel('kirishima', 'alert'))] },
  { script: 'hayashi', at: '……出てこねえ。', before: [st(feel('hayashi', 'dots'))] },
  { script: 'sakura_hayashi', at: 'この子、モモタン！', before: [st(feel('sakura_hayashi', 'heart'))] },
  { script: 'ota', at: '……何の用だ。弟子なら取らんぞ。', before: [st(turn('ota'), feel('ota', 'angry'))] },
  { script: 'ota', at: 'Kか……。', before: [st(feel('ota', 'dots'))] },
  { script: 'ota', at: '……見事だ。', before: [st(feel('ota', 'sparkle'))] },
  // chapter 3
  { script: 'hina', at: 'ねえ、聞いて！ かまくらの前', before: [st(feel('hina', 'alert'))] },
  { script: 'hina', at: 'つかまえた！', before: [st(feel('hina', 'sparkle'))] },
  { script: 'fujii', at: 'ちょうどよかった！', before: [st(feel('fujii', 'sweat'))] },
  { script: 'jokan', at: 'ほう……その封は。', before: [st(turn('jokan'), feel('jokan', 'idea'))] },
  { script: 'jokan', at: '見事。字は、書く人と読む人', before: [st(feel('jokan', 'sparkle'))] },
  { script: 'tsuru', at: '「お母さん、お正月には帰ります」', before: [st(feel('tsuru', 'heart'))] },
  // chapter 4
  { script: 'gen', at: '……なんだ、観光客か。', before: [st(feel('gen', 'dots'))] },
  { script: 'gen', at: '……出た。全部、出た。', before: [st(feel('gen', 'music'))] },
  { script: 'gen', at: '思い出すどころか', before: [st(feel('gen', 'music'), feel('player', 'heart'))] },
  { script: 'kaito', at: 'ねえねえ、聞いて！', before: [st(turn('kaito'), feel('kaito', 'music'))] },
  { script: 'hamada', at: 'あんた、耳がいいねえ！', before: [st(feel('hamada', 'heart'))] },
  { script: 'umino', at: '……何の用かね。', before: [st(turn('umino'), feel('umino', 'dots'))] },
  { script: 'umino', at: '見事だ。……生徒に', before: [st(feel('umino', 'sparkle'))] },
  { script: 'umino', at: '夜になった。', after: [st({ camera: 'traveller', zoom: 1.4, ms: 1200 }, { wait: 400 }, { camera: 'back', ms: 800 })] },
  { script: 'traveller', at: '……雪見村でも、会ったわね。', before: [st(turn('traveller'), feel('player', 'alert'))] },
  // chapter 5
  { script: 'emma', at: 'あの、すみません！', before: [st(feel('emma', 'question'))] },
  { script: 'sakamoto', at: 'ああ、君は旅行者かね。', before: [st(feel('sakamoto', 'sweat'))] },
  { script: 'sumie', at: 'ぶぶ漬けでも、いかがどすか。', before: [st(feel('sumie', 'idea'))] },
  { script: 'sumie', at: '……お見事です。', before: [st(feel('sumie', 'sparkle'))] },
  // chapter 6
  { script: 'kenta', at: '助けてください！', before: [st(turn('kenta'), feel('kenta', 'sweat'), { shake: 200 })] },
  { script: 'kenta', at: '……できた！ 電話、つながりました', before: [st(feel('kenta', 'sparkle'))] },
  { script: 'okan', at: 'いらっしゃい、いらっしゃい！', before: [st(turn('okan'), feel('okan', 'music'))] },
  { script: 'fujita', at: '……お前に話したら、少し楽に', before: [st(feel('fujita', 'heart'))] },
  { script: 'tachibana', at: '「お疲れさま」……。', before: [st(feel('tachibana', 'heart'))] },
  // chapter 7
  { script: 'attendant', at: 'いらっしゃいませ。……あ、きょろきょろ', before: [st(turn('attendant'), feel('attendant', 'idea'))] },
  { script: 'yoshie', at: '手紙を持っているのね。', before: [st(feel('yoshie', 'alert'))] },
  { script: 'haru', at: 'わっ、びっくりした！', before: [st(feel('haru', 'alert'), { shake: 200 })] },
  { script: 'haru', at: 'こんなこと、人に話したの', before: [st(feel('haru', 'heart'))] },
  { script: 'priya', at: 'ふふ、完璧な返事。', before: [st(feel('priya', 'music'))] },
];

const plain = (t: string) => t.replace(/\{([^|}]*)\|[^}]*\}/g, '$1');

/** adds the beats and chapter pictures to the scripts (in place); returns how many were placed */
export function applyBeats(scripts: Record<string, { steps: Step[] }[]>): number {
  // the chapter pictures first, so they come before a scene placed at the same line
  const beats: Beat[] = Object.entries(CHAPTER_TITLES)
    .filter(([n]) => CHAPTER_PICTURES.has(Number(n)))
    .map(([n, c]) => ({ script: c.script, at: c.at, before: [{ cg: `cg_chapter${n}`, say: c.ja, en: c.en }] }));
  beats.push(...BEATS);
  let placed = 0;
  for (const b of beats) {
    let done = false;
    const place = (steps: Step[]) => {
      for (let i = 0; i < steps.length && !done; i++) {
        const s = steps[i] as any;
        if (typeof s.say === 'string' && plain(s.say).startsWith(b.at)) {
          steps.splice(i + 1, 0, ...(b.after ?? []));
          steps.splice(i, 0, ...(b.before ?? []));
          done = true;
          return;
        }
        for (const k of ['then', 'else', 'win', 'lose']) if (Array.isArray(s[k])) place(s[k]);
        if (s.choice) for (const c of s.choice) if (c.then) place(c.then);
      }
    };
    for (const r of scripts[b.script] ?? []) if (!done) place(r.steps);
    if (done) placed++;
  }
  return placed;
}
