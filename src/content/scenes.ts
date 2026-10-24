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
  /** show the line itself over this story picture */
  cg?: string;
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
export const CHAPTER_PICTURES = new Set([2, 3, 4, 5, 6, 7]);

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

const pic = (cg: string, say: string, en: string): Step => ({ cg, say, en });

/** the story pictures of the key moments (Story pack A) */
export const PICTURES: Beat[] = [
  { script: 'mori', at: '森さんは、困ったように笑った', cg: 'cg_forgotten_name' },
  {
    script: 'sakura_hayashi', at: 'あなたが、おじいちゃんを手伝ってくれた人？',
    before: [pic('cg_peach_harvest', '{桃畑|ももばたけ}に、{甘|あま}い{香|かお}りが{広|ひろ}がる。はしごの{上|うえ}から{林|はやし}さんが{桃|もも}を{渡|わた}し、かごを{抱|かか}えた{女|おんな}の{子|こ}が{笑|わら}っている。', 'The sweet smell of peaches fills the orchard. Mr. Hayashi hands down peaches from the ladder, and a girl with a basket laughs.')],
  },
  {
    script: 'station_building', at: '雪見村行きですね。',
    after: [pic('cg_farewell_platform', 'ホームに、{森|もり}さんと{楓|かえで}さんとハルトくんが{来|き}てくれた。「いってらっしゃい！」{電車|でんしゃ}の{窓|まど}から、{大|おお}きく{手|て}を{振|ふ}った。', 'Ms. Mori, Kaede and Haruto came to the platform. “Have a good trip!” You wave from the train window.')],
  },
  {
    script: 'hina', at: 'ねえ、聞いて！ かまくらの前',
    before: [pic('cg_fading_kanji', '{夕暮|ゆうぐ}れの{雪見村|ゆきみむら}。{看板|かんばん}やのれんから、{字|じ}がはがれて、{雪|ゆき}のように{舞|ま}っていく……。', 'Dusk in Yukimi. The characters peel off signs and curtains and drift away like snow…')],
  },
  {
    script: 'jokan', at: 'この印をお持ちなさい。',
    after: [pic('cg_temple_letter', 'ろうそくの{灯|あか}りの{中|なか}、{常観|じょうかん}{和尚|おしょう}が{赤|あか}い{封|ふう}をそっと{切|き}った。つるさんも、{息|いき}をのんで{見守|みまも}っている。', 'By candlelight Jōkan-oshō gently breaks the red seal. Grandma Tsuru watches, holding her breath.')],
  },
  {
    script: 'kaito', at: 'ねえねえ、聞いて！',
    after: [pic('cg_harbor_shell', '{貝殻|かいがら}を{耳|みみ}に{当|あ}てると……{波|なみ}の{音|おと}の{向|む}こうに、かすかな{歌|うた}が{聞|き}こえた。', 'You hold the shell to your ear… beyond the sound of the waves, a faint song.')],
  },
  { script: 'k_nishiki_sign', at: '看板の光が、少しやさしくなった', cg: 'cg_nishiki_sign' },
  {
    script: 'kenta', at: '助けてください！',
    after: [pic('cg_osaka_office', '{健太|けんた}さんは、{受話器|じゅわき}を{両手|りょうて}でにぎりしめている。@nameは、メモに{一言|ひとこと}{書|か}いて{差|さ}し{出|だ}した。', 'Kenta grips the receiver with both hands. You write a phrase on a memo and hold it out.')],
  },
  { script: 'doton_alley', at: '@nameは、そっと言った。', cg: 'cg_osaka_lantern' },
  {
    script: 'yoshie', at: '手紙を持っているのね。',
    before: [pic('cg_asakusa_coffee', '{古|ふる}い{喫茶店|きっさてん}に、コーヒーの{香|かお}りが{満|み}ちている。@nameは、Kの{手紙|てがみ}をそっと{広|ひろ}げた。', 'The old coffee house is full of the smell of coffee. You gently unfold K’s letter.')],
  },
  { script: 'yokocho_counter', at: '「ピッ……おつかれさま', cg: 'cg_shinjuku_alley' },
];

const plain = (t: string) => t.replace(/\{([^|}]*)\|[^}]*\}/g, '$1');

/** adds the beats and chapter pictures to the scripts (in place); returns how many were placed */
export function applyBeats(scripts: Record<string, { steps: Step[] }[]>): number {
  // the chapter pictures first, so they come before a scene placed at the same line
  const beats: Beat[] = Object.entries(CHAPTER_TITLES)
    .filter(([n]) => CHAPTER_PICTURES.has(Number(n)))
    .map(([n, c]) => ({ script: c.script, at: c.at, before: [{ cg: `cg_chapter${n}`, say: c.ja, en: c.en }] }));
  beats.push(...PICTURES, ...BEATS);
  let placed = 0;
  for (const b of beats) {
    let done = false;
    const place = (steps: Step[]) => {
      for (let i = 0; i < steps.length && !done; i++) {
        const s = steps[i] as any;
        if (typeof s.say === 'string' && plain(s.say).startsWith(b.at)) {
          if (b.cg) steps[i] = { cg: b.cg, say: s.say, en: s.en };
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

/** the picture that opens each heart talk (Story pack B), with a line that sets the scene */
export const HEART_PICTURES: Record<string, { ja: string; en: string }> = {
  mori: { ja: '{夕方|ゆうがた}、{買|か}い{物|もの}から{帰|かえ}ると、{森|もり}さんが{玄関|げんかん}で{待|ま}っていた。「おかえりなさい」', en: 'Coming home from shopping in the evening, you find Ms. Mori waiting at the door. “Welcome home.”' },
  kaede: { ja: '{閉店後|へいてんご}の{喫茶|きっさ}ことのは。{楓|かえで}さんが、{新|あたら}しいケーキをそっとカウンターに{置|お}いた。', en: 'Café Kotonoha after closing. Kaede gently sets a new cake on the counter.' },
  haruto: { ja: 'コンビニの{裏|うら}。{休憩中|きゅうけいちゅう}のハルトくんが、{大|おお}きなおにぎりを{差|さ}し{出|だ}した。', en: 'Behind the konbini. Haruto, on his break, holds out a huge rice ball.' },
  aoi: { ja: '{喫茶|きっさ}ことのはで、スーツ{姿|すがた}のアオイさんが、{面接|めんせつ}のおじぎを{練習|れんしゅう}している。', en: 'In Café Kotonoha, Aoi in a suit practises her interview bow.' },
  sato: { ja: '{静|しず}かな{図書館|としょかん}。{佐藤|さとう}{先生|せんせい}が、{古|ふる}いしおりを{手|て}に{取|と}った。', en: 'The quiet library. Mr. Satō picks up an old bookmark.' },
  okami: { ja: '{夕暮|ゆうぐ}れの{旅館|りょかん}「ゆのか」。{女将|おかみ}さんが、{深|ふか}くおじぎをして{迎|むか}えてくれた。', en: 'Dusk at the inn “Yunoka”. Okami-san welcomes you with a deep bow.' },
  tsuru: { ja: '{雪|ゆき}の{夜|よる}。{囲炉裏|いろり}でおやきが{焼|や}ける{音|おと}がする。つるさんが、{昔|むかし}の{話|はなし}を{始|はじ}めた。', en: 'A snowy night. Oyaki sizzle by the hearth. Grandma Tsuru begins an old story.' },
  gen: { ja: '{夕日|ゆうひ}の{桟橋|さんばし}。{源|げん}さんが、{炭火|すみび}でいかを{焼|や}いている。', en: 'The pier at sunset. Gen-san grills squid over charcoal.' },
  nagisa: { ja: '{港|みなと}を{見下|みお}ろすベンチ。なぎささんが、{大学|だいがく}のパンフレットを{見|み}つめている。', en: 'A bench above the harbour. Nagisa gazes at a university brochure.' },
  matsuo: { ja: '{町家|まちや}の{夕方|ゆうがた}。{松尾|まつお}さんが、お{茶漬|ちゃづ}けを{運|はこ}んできた。', en: 'Evening in the machiya. Ms. Matsuo brings a bowl of ochazuke.' },
  okan: { ja: '{道頓堀|どうとんぼり}の{夜|よる}。おかんが、{大|おお}きな{箱|はこ}を{両手|りょうて}で{押|お}しつけてきた。', en: 'Night in Dotonbori. Okan pushes a big box into your hands.' },
  kenta: { ja: '{夕方|ゆうがた}のビルの{屋上|おくじょう}。{健太|けんた}さんが、ネクタイをゆるめて{笑|わら}った。', en: 'An office rooftop at dusk. Kenta loosens his tie and laughs.' },
  haru: { ja: '{渋谷|しぶや}のゲームセンター。クレーンが、{小|ちい}さなきつねのぬいぐるみをつかんだ。', en: 'The game centre in Shibuya. The claw grabs a little plush fox.' },
  yoshie: { ja: '{雨|あめ}の{午後|ごご}の{喫茶店|きっさてん}。{芳江|よしえ}さんが、{両手|りょうて}でカップを{温|あたた}めている。', en: 'The coffee house on a rainy afternoon. Yoshie-san warms the cups with her hands.' },
  priya: { ja: '{夕方|ゆうがた}の{渋谷|しぶや}。{会議|かいぎ}を{終|お}えたプリヤさんが、{手|て}を{高|たか}く{上|あ}げた。', en: 'Shibuya in the evening. Priya, just out of her meeting, raises her hand high.' },
};

const nar = (say: string, en: string): Step => ({ say, en });

/** dreams about K after each chapter (Story pack C): the first one not yet dreamt comes when you sleep at home */
export const DREAMS: { id: string; after: string; steps: Step[] }[] = [
  {
    id: 'dream_letters', after: 'mq9',
    steps: [
      pic('cg_dream_letters', '{夢|ゆめ}を{見|み}た。{星空|ほしぞら}に{浮|う}かぶ{図書館|としょかん}。たくさんの{手紙|てがみ}が、{鳥|とり}のように{飛|と}んでいる。', 'You dreamed of a library floating in a starry sky. Countless letters flew like birds.'),
      nar('{遠|とお}くの{机|つくえ}で、だれかが{帳面|ちょうめん}に{何|なに}かを{書|か}いている。{封筒|ふうとう}に、「K」の{字|じ}が{光|ひか}った。', 'At a far desk someone was writing in a notebook. On an envelope, the letter “K” glowed.'),
      nar('……{目|め}が{覚|さ}めると、{手|て}を{伸|の}ばしたままだった。', '…When you woke up, your hand was still reaching out.'),
    ],
  },
  {
    id: 'dream_snow', after: 'mq13',
    steps: [
      pic('cg_dream_snow', '{夢|ゆめ}の{中|なか}の{白|しろ}い{野原|のはら}。{字|じ}が、{雪|ゆき}のように{降|ふ}ってくる。ユキツネが、{光|ひかり}の{足|あし}あとを{残|のこ}して{先|さき}を{歩|ある}く。', 'A white field in a dream. Characters fall like snow. Yukitsune walks ahead, leaving footprints of light.'),
      nar('{地平線|ちへいせん}に、{緑|みどり}のコートの{人|ひと}が{立|た}っていた。「{字|じ}は、{読|よ}む{人|ひと}がいれば{消|き}えないのよ」', 'On the horizon stood someone in a green coat. “Characters do not vanish as long as someone reads them.”'),
    ],
  },
  {
    id: 'dream_sea', after: 'mq17',
    steps: [
      pic('cg_dream_sea', '{静|しず}かな{海|うみ}の{中|なか}。{音符|おんぷ}の{魚|さかな}たちが、まわりを{泳|およ}いでいる。{灯台|とうだい}の{光|ひかり}が、{水|みず}の{中|なか}までとどく。', 'Deep in a calm sea. Fish made of musical notes swim around you. The lighthouse beam reaches down into the water.'),
      nar('{崖|がけ}の{上|うえ}から、Kがこちらを{見下|みお}ろしていた。……{歌|うた}は、{海|うみ}が{覚|おぼ}えている。', 'From the cliff, K was looking down at you. …The sea remembers the songs.'),
    ],
  },
  {
    id: 'dream_gates', after: 'mq21',
    steps: [
      pic('cg_dream_gates', '{千本鳥居|せんぼんとりい}が、いつのまにかネオンの{町|まち}に{変|か}わっていく。Kが{振|ふ}り{返|かえ}る。でも、{顔|かお}は{光|ひかり}にかくれて{見|み}えない。', 'The thousand torii slowly turn into neon streets. K looks back, but her face is hidden in the light.'),
      nar('「{次|つぎ}は、{働|はたら}く{人|ひと}の{町|まち}で」……{声|こえ}だけが、{耳|みみ}に{残|のこ}った。', '“Next, in the city of working people.” …Only her voice stayed in your ears.'),
    ],
  },
  {
    id: 'dream_tree', after: 'mq25',
    steps: [
      pic('cg_dream_tree', '{言葉|ことば}の{葉|は}が{光|ひか}る、{大|おお}きな{木|き}。{川|かわ}の{上|うえ}に、{青|あお}い{夕暮|ゆうぐ}れが{広|ひろ}がっている。', 'A great tree whose leaves are glowing words. Blue dusk spreads over a river.'),
      nar('その{下|した}で、Kがはじめて、こちらを{向|む}いてほほえんだ。「もうすぐ、{会|あ}えるわ」', 'Beneath it, K turns to you and smiles for the first time. “We will meet soon.”'),
    ],
  },
];

/** an evening at home once in each real season (Story pack C), when there is no dream */
export const SEASONS: { id: string; months: number[]; step: Step }[] = [
  { id: 'season_spring', months: [3, 4, 5], step: pic('cg_season_spring', '{窓|まど}から、{桜|さくら}の{花|はな}びらが{入|はい}ってきた。{単語|たんご}カードの{上|うえ}に、{一枚|いちまい}。……{春|はる}だな。', 'Cherry petals blow in through the window. One lands on your vocabulary cards. …Spring.') },
  { id: 'season_summer', months: [6, 7, 8], step: pic('cg_season_summer', 'ベランダで、{花火|はなび}を{見|み}た。{風鈴|ふうりん}が、ちりんと{鳴|な}る。', 'You watch fireworks from the balcony. The wind chime tinkles.') },
  { id: 'season_autumn', months: [9, 10, 11], step: pic('cg_season_autumn', '{雨|あめ}の{音|おと}を{聞|き}きながら、{本|ほん}を{読|よ}んだ。{窓|まど}に、{赤|あか}いもみじが{一枚|いちまい}はりついている。', 'You read to the sound of the rain. A red maple leaf sticks to the window.') },
  { id: 'season_winter', months: [12, 1, 2], step: pic('cg_season_winter', 'こたつで、みかんを{食|た}べながら{単語|たんご}カードをめくる。{外|そと}は、しんしんと{雪|ゆき}が{降|ふ}っている。', 'Under the kotatsu you eat mandarins and turn your vocabulary cards. Outside, snow falls quietly.') },
];

/** what happens while you sleep at home: the next dream, else this season's evening (each once) */
export function sleepScenes(): Step[] {
  const seasons = SEASONS.reduceRight<Step[]>(
    (rest, s) => [{ if: { all: [{ months: s.months }, { notYearFlag: s.id }] }, then: [s.step, { do: [{ yearFlag: s.id }] }], else: rest }],
    [],
  );
  return DREAMS.reduceRight<Step[]>(
    (rest, d) => [{ if: { all: [{ questDone: d.after }, { notFlag: d.id }] }, then: [...d.steps, { do: [{ flag: d.id }] }], else: rest }],
    seasons,
  );
}
