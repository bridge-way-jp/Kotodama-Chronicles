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
      { id: 'arrive', text: 'Take the bus to Hinomori Valley', hint: 'The bus leaves from the station building.' },
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
