import { DE_STORY } from './de_story';
import type { JobDef } from './jobs';

/** Part-time jobs of the expansion districts: each is offered by a person there and trains the words of their stories. */
type J = Omit<JobDef, 'titleEn' | 'introEn' | 'taskEn' | 'thanksEn'> & { en: [title: string, intro: string, task: string, thanks: string]; de: [string, string, string, string] };

const LIST: J[] = [
  { id: 'ex_bakery', title: 'パン屋の{朝|あさ}', npc: 'ex_misaki', area: 'vocab', theme: ['v:n3_0002', 'v:n3_0004', 'v:n3_0007', 'v:n3_0162', 'v:n3_0166', 'v:n3_0273', 'v:n2_0255', 'v:n2_0407', 'v:n2_0399'],
    rounds: 8, payPer: 160, bonus: 'onigiri',
    intro: '朝四時から、パンを並べるのを手伝って。言葉のラベルと、合うパンを選んでね。', task: 'パンのラベル', thanks: 'ありがとう！ 焼きたてをどうぞ。',
    en: ['Bakery morning (vocabulary)', 'Help me set out the bread from four in the morning. Pick the bread that matches each word label.', 'Bread label', 'Thank you! Here, something fresh from the oven.'],
    de: ['Bäckerei am Morgen (Wortschatz)', 'Hilf mir ab vier Uhr morgens beim Auslegen des Brots. Wähle das Brot, das zum Wortschild passt.', 'Brotschild', 'Danke! Hier, frisch aus dem Ofen.'] },
  { id: 'ex_hospital', title: '夜の{病院|びょういん}', npc: 'ex_chihiro', area: 'vocab', theme: ['v:n3_0190', 'v:n3_0016', 'v:n3_0196', 'v:n3_0109', 'v:n3_0143', 'v:n2_1636', 'v:n2_1678', 'v:n3_0285'],
    rounds: 8, payPer: 200, bonus: 'greentea',
    intro: '夜は、言葉の聞きまちがいが命にかかわるの。メモの言葉を、正しく確かめてね。', task: 'カルテのメモ', thanks: 'おかげで、安心して夜を過ごせたわ。お茶をどうぞ。',
    en: ['Night at the hospital (vocabulary)', 'At night, mishearing a word can cost a life. Check the words in the notes correctly.', 'Chart note', 'Thanks to you I could get through the night calmly. Have some tea.'],
    de: ['Nacht im Krankenhaus (Wortschatz)', 'Nachts kann ein falsch verstandenes Wort ein Leben kosten. Prüfe die Wörter in den Notizen genau.', 'Notiz in der Akte', 'Dank dir konnte ich die Nacht ruhig überstehen. Trink einen Tee.'] },
  { id: 'ex_cafe', title: '{分校|ぶんこう}カフェの{注文|ちゅうもん}', npc: 'ex_risa', area: 'listening', theme: ['v:n3_0569', 'v:n2_0286', 'v:n2_0283', 'v:n3_0469', 'v:n2_1237', 'v:n2_1333'],
    rounds: 6, payPer: 200, bonus: 'coffee_black',
    intro: '村の人は早口なの。注文を最後まで聞いてから、運んでね。', task: 'お客さんの注文', thanks: '助かったわ。コーヒーをごちそうするね。',
    en: ['Orders at the school café (listening)', 'The villagers talk fast. Listen to the order to the end before you serve.', 'A guest orders', 'That was a help. Let me treat you to a coffee.'],
    de: ['Bestellungen im Schulcafé (Hören)', 'Die Dorfleute reden schnell. Hör die Bestellung bis zum Ende, bevor du servierst.', 'Ein Gast bestellt', 'Das war eine Hilfe. Ich lade dich auf einen Kaffee ein.'] },
  { id: 'ex_brewery', title: '{酒蔵|さかぐら}の{記録|きろく}', npc: 'ex_toji', area: 'vocab', theme: ['v:n2_1565', 'v:n2_0601', 'v:n3_0542', 'v:n3_0596', 'v:n3_0573', 'v:n3_0586', 'v:n2_0789'],
    rounds: 7, payPer: 180, bonus: 'grape_juice',
    intro: '温度も、量も、全部ノートに書く。言葉を間違えるな。', task: '仕込みのノート', thanks: 'ふん、悪くない。これを持っていけ。',
    en: ['Brewery log (vocabulary)', 'Temperature and amounts all go in the notebook. Don’t get a word wrong.', 'Brewing notebook', 'Hmph, not bad. Take this.'],
    de: ['Brauerei-Protokoll (Wortschatz)', 'Temperatur und Mengen kommen alle ins Heft. Verwechsle kein Wort.', 'Brau-Notizbuch', 'Hm, nicht schlecht. Nimm das mit.'] },
  { id: 'ex_pension', title: '{民宿|みんしゅく}の{準備|じゅんび}', npc: 'ex_sachiko', area: 'vocab', theme: ['v:n3_0669', 'v:n3_0825', 'v:n3_0824', 'v:n2_1668', 'v:n3_0617', 'v:n2_1850', 'v:n2_1011'],
    rounds: 7, payPer: 180, bonus: 'onsen_tamago',
    intro: 'いつお客さんが来てもいいように、部屋を整えたいの。言葉と合うものを選んでね。', task: '部屋の道具', thanks: 'ありがとう。気持ちのいい部屋になったわ。温泉卵をどうぞ。',
    en: ['Guesthouse preparations (vocabulary)', 'I want the rooms ready whenever a guest comes. Choose what matches each word.', 'Room item', 'Thank you. The rooms feel lovely. Have a hot-spring egg.'],
    de: ['Pension vorbereiten (Wortschatz)', 'Ich möchte die Zimmer bereit haben, wann immer ein Gast kommt. Wähle, was zum Wort passt.', 'Gegenstand im Zimmer', 'Danke. Die Zimmer fühlen sich schön an. Nimm ein Onsen-Ei.'] },
  { id: 'ex_lift', title: 'スキー{教室|きょうしつ}', npc: 'ex_yukina', area: 'listening', theme: ['v:n3_0760', 'v:n3_0737', 'v:n3_0739', 'v:n3_0775', 'v:n3_0820', 'v:n3_0753'],
    rounds: 6, payPer: 200, bonus: 'greentea',
    intro: '斜面では、指示を聞き逃したら危ないわ。しっかり聞いて、答えてね。', task: 'コーチの声', thanks: 'いい耳ね。あたたかいお茶をどうぞ。',
    en: ['Ski school (listening)', 'On the slope, missing an instruction is dangerous. Listen well and answer.', 'The coach says', 'Good ears. Have some warm tea.'],
    de: ['Skischule (Hören)', 'Am Hang ist es gefährlich, eine Anweisung zu verpassen. Hör gut zu und antworte.', 'Der Trainer sagt', 'Gute Ohren. Trink einen warmen Tee.'] },
  { id: 'ex_ferry', title: '{渡|わた}し{船|ぶね}の{案内|あんない}', npc: 'ex_tsuyoshi', area: 'listening', theme: ['v:n2_1201', 'v:n3_0962', 'v:n2_0409', 'v:n2_0274', 'v:n3_1171', 'v:n2_1233'],
    rounds: 6, payPer: 200, bonus: 'ikayaki',
    intro: '乗る人に、時間と料金を正しく伝えてくれ。聞き間違えたら、船に乗れんからな。', task: '乗客の声', thanks: 'ご苦労さん。いか焼きでも食っていけ。',
    en: ['Ferry information (listening)', 'Tell the passengers the times and fares correctly. If you mishear, they miss the boat.', 'A passenger says', 'Good work. Have some grilled squid.'],
    de: ['Fähr-Auskunft (Hören)', 'Sag den Fahrgästen Zeiten und Preise richtig. Wer sich verhört, verpasst das Boot.', 'Ein Fahrgast sagt', 'Gut gemacht. Iss einen gegrillten Tintenfisch.'] },
  { id: 'ex_coop', title: '{漁協|ぎょきょう}の{事務|じむ}', npc: 'ex_saori', area: 'vocab', theme: ['v:n3_1168', 'v:n3_1140', 'v:n3_0964', 'v:n3_1131', 'v:n2_0857', 'v:n2_0847'],
    rounds: 7, payPer: 200, bonus: 'ikayaki',
    intro: '資料の言葉を、一つずつ確かめてほしいの。数字より、言葉のほうが大事なこともあるから。', task: '資料の言葉', thanks: 'ありがとう。これ、島のお礼です。',
    en: ['Co-op office work (vocabulary)', 'Please check the words in the documents one by one. Sometimes words matter more than numbers.', 'Word in the document', 'Thank you. This is the island’s thanks.'],
    de: ['Büroarbeit in der Genossenschaft (Wortschatz)', 'Bitte prüfe die Wörter in den Unterlagen einzeln. Manchmal sind Worte wichtiger als Zahlen.', 'Wort in den Unterlagen', 'Danke. Das ist der Dank der Insel.'] },
  { id: 'ex_library', title: '{図書館|としょかん}の{返却|へんきゃく}', npc: 'ex_haruka', area: 'vocab', theme: ['v:n2_0192', 'v:n2_1187', 'v:n2_0185', 'v:n2_0396', 'v:n2_0417', 'v:n2_0912'],
    rounds: 7, payPer: 180, bonus: 'wagashi',
    intro: '返ってきた本を、元の棚に戻したいの。言葉のラベルと、棚の名前を合わせてね。', task: '本の分類', thanks: 'ありがとう。静かな午後になったわ。和菓子をどうぞ。',
    en: ['Library returns (vocabulary)', 'I want to put the returned books back on their shelves. Match the word labels with the shelf names.', 'Book category', 'Thank you. A quiet afternoon. Have some wagashi.'],
    de: ['Rückgabe in der Bibliothek (Wortschatz)', 'Ich möchte die zurückgegebenen Bücher in ihre Regale stellen. Ordne die Wortschilder den Regalnamen zu.', 'Buchkategorie', 'Danke. Ein ruhiger Nachmittag. Nimm ein Wagashi.'] },
  { id: 'ex_rickshaw', title: '{人力車|じんりきしゃ}の{案内|あんない}', npc: 'ex_daisuke', area: 'listening', theme: ['v:n3_1365', 'v:n3_1360', 'v:n3_1288', 'v:n3_1358', 'v:n3_1322', 'v:n2_0404'],
    rounds: 6, payPer: 200, bonus: 'wagashi',
    intro: 'お客さんの話を聞いて、行き先と料金を間違えずに伝えてくれ！', task: 'お客さんの声', thanks: 'ナイス！ 一緒に走ったみたいっす。おみやげ、どうぞ。',
    en: ['Rickshaw guiding (listening)', 'Listen to the customers and tell them the destination and fare without mistakes!', 'A customer says', 'Nice! It felt like we ran together. Here, a souvenir.'],
    de: ['Rikscha-Führung (Hören)', 'Hör den Kunden zu und nenne Ziel und Preis ohne Fehler!', 'Ein Kunde sagt', 'Super! Als wären wir zusammen gelaufen. Hier, ein Mitbringsel.'] },
];

export const EX_JOBS: Record<string, JobDef> = {};
export const EX_JOB_NPC: Record<string, string> = {};
for (const { en, de, ...j } of LIST) {
  for (let i = 0; i < 4; i++) DE_STORY[en[i]] ??= de[i];
  EX_JOBS[j.id] = { ...j, titleEn: en[0], introEn: en[1], taskEn: en[2], thanksEn: en[3] };
  EX_JOB_NPC[j.npc] = j.id;
}
