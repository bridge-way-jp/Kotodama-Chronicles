export interface QuestDef {
  id: string;
  kind: 'main' | 'side' | 'character';
  chapter: number;
  title: string;
  titleEn: string;
  description: string;
  objectives: { id: string; text: string; hint?: string }[];
  rewards: { xp: number; money?: number; items?: Record<string, number> };
  learning: string[]; // card keys this quest focuses on
  next?: string;
  onComplete?: string; // flag set on completion
}

export const QUESTS: Record<string, QuestDef> = {
  mq1: {
    id: 'mq1', kind: 'main', chapter: 1,
    title: 'ようこそ、日野森へ', titleEn: 'Welcome to Hinomori',
    description: 'You have just moved into a small apartment in Hinomori. Your landlady left you a letter.',
    objectives: [
      { id: 'letter', text: 'Read the letter on your desk', hint: 'The desk is in your apartment.' },
      { id: 'mori', text: 'Meet Ms. Mori in front of the apartment' },
    ],
    rewards: { xp: 40, money: 1000 },
    learning: ['v:shuushuu', 'v:bunbetsu', 'v:ooya', 'g:wakedewanai', 'g:tsuideni'],
    next: 'mq2',
  },
  mq2: {
    id: 'mq2', kind: 'main', chapter: 1,
    title: 'コンビニの困りごと', titleEn: 'Trouble at the Konbini',
    description: 'Ms. Mori mentioned that Haruto, the convenience-store clerk, seems to be in trouble.',
    objectives: [
      { id: 'haruto', text: 'Talk to Haruto at the convenience store' },
      { id: 'customer', text: 'Help Haruto understand the regular customer' },
    ],
    rewards: { xp: 50, money: 500, items: { onigiri: 3, greentea: 1 } },
    learning: ['v:shinagire', 'v:toriyoseru', 'v:ryoushuusho', 'v:jouren'],
    next: 'mq3',
  },
  mq3: {
    id: 'mq3', kind: 'main', chapter: 1,
    title: '差出人のない手紙', titleEn: 'The Unsigned Letter',
    description: 'Kaede at Café Kotonoha has a letter addressed to you — but there is no sender.',
    objectives: [
      { id: 'kaede', text: 'Visit Kaede at Café Kotonoha' },
      { id: 'read', text: 'Decipher the unsigned letter' },
    ],
    rewards: { xp: 60, items: { shiori: 2 } },
    learning: ['v:sashidashinin', 'v:atesaki', 'v:tegakari', 'g:karakoso'],
    next: 'mq4',
  },
  mq4: {
    id: 'mq4', kind: 'main', chapter: 1,
    title: '消えたアナウンス', titleEn: 'The Vanishing Announcement',
    description: 'The letter pointed to the old bulletin board at the station. Something strange is happening there.',
    objectives: [
      { id: 'staff', text: 'Help the station attendant with the announcement' },
      { id: 'board', text: 'Listen carefully at the old bulletin board' },
    ],
    rewards: { xp: 80, items: { onigiri: 2 } },
    learning: ['v:chien', 'v:eikyou', 'v:saikai', 'v:meiwaku'],
    next: 'mq5',
  },
  mq5: {
    id: 'mq5', kind: 'main', chapter: 1,
    title: 'みどりの森のささやき', titleEn: 'Whispers of Midori Forest',
    description: 'A researcher at the edge of town knows something about the Kotodama. The forest to the north seems to be the key.',
    objectives: [
      { id: 'kirishima', text: 'Visit the researcher inside his lab (east, across the river)' },
      { id: 'befriend', text: 'Win a battle or befriend a Kotodama in Midori Forest' },
      { id: 'stone', text: 'Read the inscription at the forest shrine' },
      { id: 'report', text: 'Report back to Dr. Kirishima' },
    ],
    rewards: { xp: 150, money: 2000 },
    learning: ['v:kioku', 'v:usureru', 'v:kizamu', 'g:nichigainai', 'g:nitsurete', 'g:kanenai'],
    onComplete: 'chapter1_done',
  },
  // ================================================================ chapter 2: Hinomori valley
  mq6: {
    id: 'mq6', kind: 'main', chapter: 2,
    title: '忘れられた名前', titleEn: 'The Forgotten Name',
    description: 'Ms. Mori could not remember your name. Dr. Kirishima may know what is happening.',
    objectives: [
      { id: 'mori', text: 'Talk to Ms. Mori in front of the apartment' },
      { id: 'kirishima', text: 'Ask Dr. Kirishima about the forgetting', hint: 'His lab is east, across the river.' },
      { id: 'arrive', text: 'Take the bus to Hinomori Valley', hint: 'The bus stop is by the road in front of the station.' },
    ],
    rewards: { xp: 120, items: { onigiri: 3 } },
    learning: ['v:wasureppoi', 'v:kotozuke', 'g:uchini'],
    next: 'mq7',
  },
  mq7: {
    id: 'mq7', kind: 'main', chapter: 2,
    title: '桃の谷のはたらき手', titleEn: 'Helping Hands in the Peach Valley',
    description: 'Mr. Hayashi, an old peach farmer, has more fruit than hands. His granddaughter Sakura is worried about him.',
    objectives: [
      { id: 'hayashi', text: 'Talk to Mr. Hayashi at the farmhouse (north-west)' },
      { id: 'harvest', text: 'Help with the peach harvest' },
      { id: 'sakura', text: 'Find Sakura in the peach grove (north-east)' },
    ],
    rewards: { xp: 160, money: 2500, items: { peach: 3 } },
    learning: ['v:kajuen', 'v:shuukaku', 'v:jukusu', 'v:hinshu', 'v:shukka', 'v:hitodebusoku', 'g:tatotan', 'g:tabini'],
    next: 'mq8',
  },
  mq8: {
    id: 'mq8', kind: 'main', chapter: 2,
    title: '湯けむりの記憶', titleEn: 'Memories in the Steam',
    description: 'Okami-san runs the old hot-spring inn “Yunoka”. Something is troubling her, too.',
    objectives: [
      { id: 'okami', text: 'Talk to Okami-san in front of the inn (east)' },
      { id: 'onsen', text: 'Rest at the footbath on the onsen square', hint: 'The stone square north-east of the inn.' },
    ],
    rewards: { xp: 180, items: { onsen_tamago: 3 } },
    learning: ['v:ryokan', 'v:yuge', 'v:motenashi', 'v:tsukaru', 'g:okagede', 'g:amari'],
    next: 'mq9',
  },
  mq9: {
    id: 'mq9', kind: 'main', chapter: 2,
    title: '名前を書く人', titleEn: 'The One Who Writes Names',
    description: 'Mr. Ōta, the old calligrapher, is said to have known “K”. He is also the valley’s master of words.',
    objectives: [
      { id: 'ota', text: 'Visit Mr. Ōta at his calligraphy workshop' },
      { id: 'calligraphy', text: 'Write a name with Mr. Ōta' },
      { id: 'master', text: 'Pass Mr. Ōta’s trial of words (vocabulary)' },
    ],
    rewards: { xp: 300, money: 5000, items: { grape_juice: 2 } },
    learning: ['v:shodou', 'v:fude', 'v:sumi', 'v:nazukeru', 'v:nagori', 'g:karaniwa'],
    onComplete: 'chapter2_done',
  },
  // ================================================================ chapter 3: Yukimi mountain village
  mq10: {
    id: 'mq10', kind: 'main', chapter: 3,
    title: '雪国からの便り', titleEn: 'A Letter from the Snow Country',
    description: 'Ms. Mori’s old friend Tsuru writes from Yukimi Village — but her letters are full of blank spaces where the kanji should be.',
    objectives: [
      { id: 'mori', text: 'Talk to Ms. Mori in front of the apartment' },
      { id: 'arrive', text: 'Take the train to Yukimi Village', hint: 'The train leaves from the station building.' },
      { id: 'tsuru', text: 'Visit Grandma Tsuru at her guesthouse (east)' },
    ],
    rewards: { xp: 200, items: { amazake: 3 } },
    learning: ['v:tayori', 'v:fuutou', 'v:irori', 'v:hougen', 'g:hodo'],
    next: 'mq11',
  },
  mq11: {
    id: 'mq11', kind: 'main', chapter: 3,
    title: '消えていく字', titleEn: 'Fading Characters',
    description: 'It is not only Tsuru: all over the village, kanji are disappearing from signs, labels and books.',
    objectives: [
      { id: 'hina', text: 'Ask Hina about the kamakura sign (centre)' },
      { id: 'fujii', text: 'Help Dr. Fujii at the clinic (south)' },
    ],
    rewards: { xp: 240, money: 3000, items: { oyaki: 3 } },
    learning: ['v:shinryoujo', 'v:shoujou', 'v:shohou', 'v:taichou', 'v:kogoeru', 'g:naikagiri', 'g:seika'],
    next: 'mq12',
  },
  mq12: {
    id: 'mq12', kind: 'main', chapter: 3,
    title: '雪灯籠の夜', titleEn: 'The Night of Snow Lanterns',
    description: 'Mr. Kuroda is preparing the snow-lantern festival. Tsuru says a traveller with a notebook comes every year for it.',
    objectives: [
      { id: 'kuroda', text: 'Help Mr. Kuroda with the lanterns (south road)' },
      { id: 'festival', text: 'Go to the festival field west of the square', hint: 'The snowy field next to the station path.' },
    ],
    rewards: { xp: 280, items: { hoshigaki: 2 } },
    learning: ['v:dentou', 'v:gyouji', 'v:tourou', 'v:tsugu', 'g:kotonaku', 'g:dakeni'],
    next: 'mq13',
  },
  mq13: {
    id: 'mq13', kind: 'main', chapter: 3,
    title: '山寺の試練', titleEn: 'The Trial of the Mountain Temple',
    description: 'The traveller left a sealed letter. Jōkan-oshō, the head priest and the region’s master of kanji, keeps the seal’s secret.',
    objectives: [
      { id: 'jokan', text: 'Show the sealed letter to Jōkan-oshō (temple, north)' },
      { id: 'master', text: 'Pass Jōkan-oshō’s trial of kanji' },
      { id: 'tsuru', text: 'Read the letter with Grandma Tsuru' },
    ],
    rewards: { xp: 400, money: 6000, items: { amazake: 3 } },
    learning: ['v:bushu', 'v:kakusuu', 'v:kakitomeru', 'v:tsutaeru', 'g:nikagirazu', 'g:kotoni'],
    onComplete: 'chapter3_done',
  },
  mq14: {
    id: 'mq14', kind: 'main', chapter: 4,
    title: '海の見える町', titleEn: 'A Town by the Sea',
    description: 'K wrote that she waits “in a town where you can see the sea”. Ms. Mori knows a harbour town on the Inland Sea: Shiomi.',
    objectives: [
      { id: 'mori', text: 'Talk to Ms. Mori in front of the apartment' },
      { id: 'arrive', text: 'Take the train to Shiomi', hint: 'Trains leave from Hinomori station.' },
      { id: 'nagisa', text: 'Ask Nagisa at the harbour square about the town' },
    ],
    rewards: { xp: 300, items: { lemon: 3 } },
    learning: ['v:gyokou', 'v:kankoukyaku', 'v:meibutsu', 'v:teikisen', 'g:toittemo', 'g:warini'],
    next: 'mq15',
  },
  mq15: {
    id: 'mq15', kind: 'main', chapter: 4,
    title: '忘れられた舟歌', titleEn: 'The Forgotten Boat Song',
    description: 'Shiomi is forgetting its songs. Nobody can sing the old fishermen’s song any more — not even the last fisherman who knew it.',
    objectives: [
      { id: 'gen', text: 'Find Gen-san on the east pier' },
      { id: 'hamada', text: 'Help Mrs. Hamada at the harbour diner' },
      { id: 'kaito', text: 'Look for Kaito on the beach (west)' },
    ],
    rewards: { xp: 320, money: 3000, items: { ikayaki: 2 } },
    learning: ['v:ryoushi', 'v:funauta', 'v:kuchizusamu', 'v:kaigara', 'g:monono', 'g:nimokakawarazu', 'g:nishitewa'],
    next: 'mq16',
  },
  mq16: {
    id: 'mq16', kind: 'main', chapter: 4,
    title: '夜明けの歌', titleEn: 'The Song at Dawn',
    description: 'Kaito’s shell still holds a piece of the song. A marine researcher on the breakwater says the sea itself remembers.',
    objectives: [
      { id: 'shiraishi', text: 'Talk to Dr. Shiraishi on the breakwater' },
      { id: 'dawn', text: 'Bring the shell to Gen-san on the east pier' },
    ],
    rewards: { xp: 340, items: { takosen: 3 } },
    learning: ['v:hibiku', 'v:utaitsugu', 'v:yoake', 'v:kakegoe', 'g:dokoroka', 'g:zaruoenai'],
    next: 'mq17',
  },
  mq17: {
    id: 'mq17', kind: 'main', chapter: 4,
    title: '灯台守の試練', titleEn: 'The Lighthouse Keeper’s Trial',
    description: 'Mr. Umino, the stern lighthouse keeper and the region’s master of grammar, has seen a woman with a notebook on the cliff at night.',
    objectives: [
      { id: 'umino', text: 'Show the boat-song lyrics to Mr. Umino (lighthouse, east cliff)' },
      { id: 'master', text: 'Pass Mr. Umino’s trial of grammar' },
      { id: 'lighthouse', text: 'Meet the woman at the lighthouse railing' },
    ],
    rewards: { xp: 450, money: 7000, items: { ikayaki: 3 } },
    learning: ['v:toudai', 'v:suiheisen', 'g:shikanai', 'g:toshitemo', 'g:dokorodehanai'],
    onComplete: 'chapter4_done',
  },
  mq18: {
    id: 'mq18', kind: 'main', chapter: 5,
    title: '古い都へ', titleEn: 'To the Old Capital',
    description: 'K’s next clue: “a city where the old and the new walk side by side”. Ms. Mori thinks of Kyoto — and a guesthouse run by a friend.',
    objectives: [
      { id: 'mori', text: 'Talk to Ms. Mori in front of the apartment' },
      { id: 'arrive', text: 'Take the train to Kyoto', hint: 'Trains leave from Hinomori station (change at the big station).' },
      { id: 'ikeda', text: 'Ask the station attendant, Mr. Ikeda, for the way' },
      { id: 'matsuo', text: 'Find the machiya guesthouse in Gion and meet the host, Ms. Matsuo' },
    ],
    rewards: { xp: 360, items: { greentea: 3, ic_card: 1 } },
    learning: ['v:ky_machiya', 'v:ky_annai', 'g:nisakidatte', 'g:wotsujite'],
    next: 'mq19',
  },
  mq19: {
    id: 'mq19', kind: 'main', chapter: 5,
    title: '空気を読む', titleEn: 'Reading the Air',
    description: 'Kyoto is full of voices: signs in five languages, announcements, crowds. The old shopkeepers have stopped saying what they mean — and visitors do not hear it.',
    objectives: [
      { id: 'emma', text: 'Help Emma, a backpacker, at Kyoto Station' },
      { id: 'sakamoto', text: 'Listen to Mr. Sakamoto, a worried businessman, at Kyoto Station' },
      { id: 'rin', text: 'Visit the kimono-rental shop in Gion and talk to Rin' },
      { id: 'nishiki', text: 'Quiet the noisy sign at Nishiki Market (walk from the station)' },
    ],
    rewards: { xp: 380, money: 4000, items: { wagashi: 2, sensu: 1 } },
    learning: ['v:ky_honne', 'v:ky_tatemae', 'v:ky_kuuki', 'g:tohaie', 'g:nisugimai', 'g:kanoyouda', 'g:tomonaruto'],
    next: 'mq20',
  },
  mq20: {
    id: 'mq20', kind: 'main', chapter: 5,
    title: 'お茶のヒント', titleEn: 'Hints over Tea',
    description: 'The tea-house mistress in Gion, the region’s master of reading between the lines, speaks only in hints. To meet K, you must learn to hear them.',
    objectives: [
      { id: 'sumie', text: 'Visit the tea house on the island in Gion and talk to Sumie-san' },
      { id: 'master', text: 'Pass Sumie-san’s trial of three hints' },
    ],
    rewards: { xp: 450, money: 6000, items: { matcha: 3, omamori_k: 1 } },
    learning: ['v:ky_sassuru', 'v:ky_toomawashi', 'v:ky_kikubari', 'g:hatomokaku', 'g:tekoso', 'g:dakenokotohaaru', 'g:narini'],
    next: 'mq21',
  },
  mq21: {
    id: 'mq21', kind: 'main', chapter: 5,
    title: '伏見の夜明け', titleEn: 'Dawn at Fushimi',
    description: 'Sumie-san’s last hint: “She walks where a thousand gates stand — at dawn, when few people are there.”',
    objectives: [
      { id: 'fushimi', text: 'Take the local train to Fushimi Inari (Kyoto Station)' },
      { id: 'summit', text: 'Climb the tunnel of torii gates to the summit' },
    ],
    rewards: { xp: 520, money: 8000, items: { yatsuhashi: 3, goshuin: 1, paper_cranes: 1 } },
    learning: ['v:ky_sassuru', 'g:nihokanaranai', 'g:tsutsuaru', 'g:wotowazu'],
    onComplete: 'chapter5_done',
  },
  sq_aoi: {
    id: 'sq_aoi', kind: 'character', chapter: 1,
    title: 'アオイの発表', titleEn: "Aoi's Presentation",
    description: 'Aoi, a university student, is nervous about a presentation in formal Japanese.',
    objectives: [{ id: 'help', text: 'Help Aoi polish her polite expressions' }],
    rewards: { xp: 45, items: { cake: 1 } },
    learning: ['v:osoreiru', 'v:shouchi', 'v:kinchou', 'v:happyou'],
  },
  sq_sato: {
    id: 'sq_sato', kind: 'side', chapter: 1,
    title: '佐藤先生の宿題', titleEn: "Mr. Satō's Homework",
    description: 'The retired teacher at the library wants to test whether you can tell the three わけ patterns apart.',
    objectives: [
      { id: 'quiz', text: 'Answer Mr. Satō’s わけ questions' },
      { id: 'essay', text: 'Read Mr. Satō’s column' },
    ],
    rewards: { xp: 60, items: { shiori: 1 } },
    learning: ['g:wakedewanai', 'g:wakeganai', 'g:wakeniwaikanai', 'g:monoda'],
  },
  sq_shrine: {
    id: 'sq_shrine', kind: 'side', chapter: 1,
    title: '神社のおみくじ', titleEn: 'The Shrine Fortune',
    description: 'The fortune slips at Hinomori Shrine are written in difficult kanji.',
    objectives: [{ id: 'omikuji', text: 'Read the fortune slip at the shrine' }],
    rewards: { xp: 40, items: { omamori: 1 } },
    learning: ['k:hai', 'k:oku', 'k:koku'],
  },
};
