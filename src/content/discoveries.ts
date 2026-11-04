import { DE_STORY } from './de_story';
import { NOTES } from './society';
import { SECRETS } from './secrets';
import type { DialogueRule, Step } from '../core/script';
import type { MapObject } from './maps';
import type { GameState } from '../core/types';

/**
 * Discoveries: glittering spots hidden in the expansion districts (content/expansion.ts). Each is found once
 * (flag `found_<id>`): a little scene with two words of the region's chapter, sometimes a Japan note, a small reward.
 * Finding all of them is a secret. Counted in the menu under 発見.
 */

type T = [en: string, de: string];
const de = ([en, d]: T) => ((DE_STORY[en] ??= d), en);

interface Discovery {
  map: string;
  x: number;
  y: number;
  title: string;
  ja: string;
  t: T;
  learn: string[];
  note?: string;
}

export const DISCOVERIES: Record<string, Discovery> = {
  // ---- Hinomori: the shopping arcade and the hospital (chapter 1)
  hm_key: {
    map: 'ex_hinomori', x: 5, y: 14, title: '鈴のついた鍵', note: 'otoshimono',
    ja: 'だれかの{ジーンズ||v:n3_0020}のポケットから、{うっかり||v:ukkari}落ちたのだろうか。鈴のついた鍵だ。交番に届けておこう。',
    t: ['Probably slipped out of someone’s jeans pocket by accident. A key with a little bell. Better take it to the police box.', 'Wohl jemandem aus der Jeanstasche gefallen, ganz aus Versehen. Ein Schlüssel mit einem Glöckchen. Am besten bringe ich ihn zur Polizeiwache.'],
    learn: ['v:n3_0020', 'v:ukkari'],
  },
  hm_cat: {
    map: 'ex_hinomori', x: 40, y: 22, title: '芝生の猫',
    ja: '{芝生|しばふ|v:n3_0071}の上で、三毛猫が{ごろごろ||v:gorogoro}している。なでると、のどを鳴らした。',
    t: ['A calico cat is lazing about on the lawn. When you stroke it, it purrs.', 'Eine Glückskatze räkelt sich faul auf dem Rasen. Als du sie streichelst, schnurrt sie.'],
    learn: ['v:n3_0071', 'v:gorogoro'],
  },
  hm_sign: {
    map: 'ex_hinomori', x: 21, y: 2, title: '昭和の看板',
    ja: '古いブリキの看板だ。「{上等|じょうとう|v:n3_0146}な{食品|しょくひん|v:n3_0163}、あります」。五十年前の文字が、まだ読める。',
    t: ['An old tin sign: “First-class foods available.” The fifty-year-old letters are still legible.', 'Ein altes Blechschild: „Erstklassige Lebensmittel erhältlich.“ Die fünfzig Jahre alte Schrift ist noch lesbar.'],
    learn: ['v:n3_0146', 'v:n3_0163'],
  },
  hm_chalk: {
    map: 'ex_hinomori', x: 20, y: 25, title: 'チョークの絵',
    ja: '道に、子どものチョークの絵がある。{四角|しかく|v:n3_0022}い家と、大きな{城|しろ|v:n3_0182}。「ぼくの家」と書いてある。',
    t: ['A child’s chalk drawing on the street: a square house and a big castle. It says “my house”.', 'Eine Kreidezeichnung eines Kindes auf der Straße: ein viereckiges Haus und eine große Burg. Daneben steht „mein Haus“.'],
    learn: ['v:n3_0022', 'v:n3_0182'],
  },
  hm_book: {
    map: 'ex_hinomori', x: 33, y: 9, title: 'ベンチの忘れ物',
    ja: 'ベンチに、古い{書物|しょもつ|v:n3_0174}が置き忘れてある。昔の人の{思想|しそう|v:n3_0043}について書いた本だ。しおりが、まん中にはさまっている。',
    t: ['An old book has been left behind on a bench. It’s about the thinking of people long ago. A bookmark sits right in the middle.', 'Auf einer Bank liegt ein vergessenes altes Buch. Es handelt vom Denken früherer Menschen. Ein Lesezeichen steckt genau in der Mitte.'],
    learn: ['v:n3_0174', 'v:n3_0043'],
  },
  // ---- the valley: the branch school and the rice terraces (chapter 2)
  tl_plum: {
    map: 'ex_tal', x: 11, y: 14, title: '一本の梅',
    ja: '道ばたに、一本の{梅|うめ|v:n3_0457}の木。まだ小さいが、{いつか||v:n3_0392}たくさんの実をつけるだろう。',
    t: ['A single plum tree by the path. Still small, but someday it will bear lots of fruit.', 'Ein einzelner Pflaumenbaum am Weg. Noch klein, aber eines Tages wird er viele Früchte tragen.'],
    learn: ['v:n3_0457', 'v:n3_0392'],
  },
  tl_well: {
    map: 'ex_tal', x: 39, y: 18, title: '古い井戸',
    ja: '古い井戸に、木の{板|いた|v:n3_0380}がかぶせてある。すき間からのぞくと、水に自分の顔が{映った|うつった|v:n3_0451}。',
    t: ['An old well covered with a wooden board. Peeking through the gap, you see your own face reflected in the water.', 'Ein alter Brunnen, mit einem Holzbrett abgedeckt. Als du durch den Spalt schaust, spiegelt sich dein Gesicht im Wasser.'],
    learn: ['v:n3_0380', 'v:n3_0451'],
  },
  tl_tractor: {
    map: 'ex_tal', x: 27, y: 8, title: '古いトラクター',
    ja: '草の中に、古いトラクター。{油|あぶら|v:n3_0333}のにおいがする。{エンジン||v:n3_0482}は、もう何年も動いていないようだ。',
    t: ['An old tractor in the grass. It smells of oil. The engine looks as if it hasn’t run for years.', 'Ein alter Traktor im Gras. Es riecht nach Öl. Der Motor scheint seit Jahren nicht mehr gelaufen zu sein.'],
    learn: ['v:n3_0333', 'v:n3_0482'],
  },
  tl_stars: {
    map: 'ex_tal', x: 21, y: 24, title: '谷の夜空',
    ja: '見上げると、町では見えない星がいっぱいだ。{宇宙|うちゅう|v:n3_0444}の中を、小さな光がすっと動いた。{衛星|えいせい|v:n3_0470}だろうか。',
    t: ['Looking up, you see more stars than ever in the town. A little light glides across the universe. A satellite, maybe?', 'Als du aufblickst, siehst du mehr Sterne als je in der Stadt. Ein kleines Licht gleitet durchs All. Vielleicht ein Satellit?'],
    learn: ['v:n3_0444', 'v:n3_0470'],
  },
  tl_jizo: {
    map: 'ex_tal', x: 18, y: 4, title: '道ばたのお地蔵さん', note: 'jizo',
    ja: '赤い前かけのお地蔵さん。{あらゆる||v:n3_0340}旅人の{運|うん|v:n3_0463}を守っているという。手を合わせた。',
    t: ['A Jizō statue with a red bib. They say it watches over the luck of every traveller. You put your hands together.', 'Eine Jizō-Statue mit rotem Lätzchen. Man sagt, sie wacht über das Glück aller Reisenden. Du faltest die Hände.'],
    learn: ['v:n3_0340', 'v:n3_0463'],
  },
  // ---- Yukimi: the ski slope and the hot-spring street (chapter 3)
  yk_can: {
    map: 'ex_yukimi', x: 25, y: 9, title: '雪の中のコーヒー',
    ja: '雪の中に、まだ温かいコーヒーの{缶|かん|v:n3_0661}。のどが{渇いて|かわいて|v:n3_0659}いたので、ありがたい。だれかの差し入れらしい。',
    t: ['In the snow, a can of coffee that’s still warm. You were thirsty, so it’s welcome. Someone seems to have left it as a gift.', 'Im Schnee eine Dose Kaffee, die noch warm ist. Du hattest Durst, also kommt sie gerade recht. Jemand hat sie wohl als Geschenk hingestellt.'],
    learn: ['v:n3_0661', 'v:n3_0659'],
  },
  yk_hokora: {
    map: 'ex_yukimi', x: 6, y: 26, title: '雪の祠', note: 'hokora',
    ja: '雪に半分うもれた、小さな祠。山の{神|かみ|v:n3_0642}様がいるという。近くに立つと、不思議とあたたかい{感じ|かんじ|v:n3_0671}がする。',
    t: ['A small shrine half buried in snow. They say a mountain god lives there. Standing near it, you feel a strange warmth.', 'Ein kleiner Schrein, halb im Schnee begraben. Man sagt, ein Berggott wohnt dort. Wenn du daneben stehst, spürst du eine seltsame Wärme.'],
    learn: ['v:n3_0642', 'v:n3_0671'],
  },
  yk_book: {
    map: 'ex_yukimi', x: 37, y: 20, title: '古い教科書',
    ja: '雪の上に、古い{教科書|きょうかしょ|v:n3_0745}が落ちている。表紙に、子どもの字で名前が{記入|きにゅう|v:n3_0717}してある。「ゆきな」。',
    t: ['An old textbook lies on the snow. On the cover, a name is written in a child’s hand: “Yukina”.', 'Auf dem Schnee liegt ein altes Schulbuch. Auf dem Umschlag steht in Kinderschrift ein Name: „Yukina“.'],
    learn: ['v:n3_0745', 'v:n3_0717'],
  },
  yk_tracks: {
    map: 'ex_yukimi', x: 12, y: 2, title: '雪の足あと',
    ja: '川{岸|ぎし|v:n3_0702}から、小さな足あとが続いている。うさぎだろうか。足あとは、山とは{逆|ぎゃく|v:n3_0729}の方へ消えていた。',
    t: ['Small footprints lead away from the riverbank. A hare, perhaps? The tracks vanish in the opposite direction from the mountain.', 'Vom Flussufer führen kleine Spuren weg. Vielleicht ein Hase? Die Spuren verschwinden in die entgegengesetzte Richtung vom Berg.'],
    learn: ['v:n3_0702', 'v:n3_0729'],
  },
  yk_sign: {
    map: 'ex_yukimi', x: 2, y: 12, title: 'コース外の看板',
    ja: '看板：「コース外の{滑走|かっそう}は{禁止|きんし|v:n3_0770}です。{許可|きょか|v:n3_0756}のない方は入らないでください」。雪の下には、深い谷がある。',
    t: ['A sign: “Skiing off the slopes is prohibited. No entry without permission.” Beneath the snow lies a deep ravine.', 'Ein Schild: „Fahren außerhalb der Pisten ist verboten. Kein Zutritt ohne Erlaubnis.“ Unter dem Schnee liegt eine tiefe Schlucht.'],
    learn: ['v:n3_0770', 'v:n3_0756'],
  },
  // ---- Shiomi Island (chapter 4)
  sm_bottle: {
    map: 'ex_shiomi', x: 22, y: 13, title: '瓶の手紙',
    ja: '浜に流れ着いた瓶の中に、手紙が入っていた。「{明後日|あさって|v:n3_1021}、島に帰ります。{滅多に|めったに|v:n3_1052}書かないけど、元気です」。何年前のものだろう。',
    t: ['A bottle washed up on the beach with a letter inside: “I’m coming back to the island the day after tomorrow. I rarely write, but I’m well.” How many years old could it be?', 'Eine angespülte Flasche mit einem Brief darin: „Übermorgen komme ich auf die Insel zurück. Ich schreibe selten, aber es geht mir gut.“ Wie alt er wohl ist?'],
    learn: ['v:n3_1021', 'v:n3_1052'],
  },
  sm_sakura: {
    map: 'ex_shiomi', x: 37, y: 3, title: '崖の上の桜',
    ja: '崖の上に、一本の{桜|さくら|v:n3_0978}の木。冷たい海風の中で、小さな{芽|め|v:n3_1042}がふくらんでいる。',
    t: ['A single cherry tree on top of the cliff. In the cold sea wind, small buds are swelling.', 'Oben auf der Klippe ein einzelner Kirschbaum. Im kalten Seewind schwellen kleine Knospen an.'],
    learn: ['v:n3_0978', 'v:n3_1042'],
  },
  sm_seat: {
    map: 'ex_shiomi', x: 5, y: 8, title: '古い船の座席',
    ja: '古い船の{座席|ざせき|v:n3_0989}が、ベンチの代わりに置いてある。{丸|まる|v:n3_1003}い窓の形のあとが、まだ残っている。',
    t: ['An old ship’s seat stands here instead of a bench. The mark of a round porthole is still visible.', 'Ein alter Schiffssitz steht hier statt einer Bank. Der Abdruck eines runden Bullauges ist noch zu sehen.'],
    learn: ['v:n3_0989', 'v:n3_1003'],
  },
  sm_proverb: {
    map: 'ex_shiomi', x: 10, y: 21, title: '漁師の諺', note: 'kotowaza_umi',
    ja: '網小屋の壁に、古い{諺|ことわざ|v:n3_0934}が書いてある。「板子一枚下は地獄」。海は{まるで||v:n3_1005}生き物のようだ、という意味らしい。',
    t: ['An old proverb is written on the wall of the net shed: “One plank below, it’s hell.” It seems to mean the sea is just like a living thing.', 'An der Wand des Netzschuppens steht ein altes Sprichwort: „Eine Planke darunter ist die Hölle.“ Es soll bedeuten, dass das Meer wie ein Lebewesen ist.'],
    learn: ['v:n3_0934', 'v:n3_1005'],
  },
  sm_starsand: {
    map: 'ex_shiomi', x: 16, y: 3, title: '星の砂',
    ja: '手のひらの砂を{ざっと||v:n3_0994}見ると、小さな星の形のつぶがある。{指|ゆび}で{指す|さす|v:n3_0985}と、ひとつ、またひとつ。',
    t: ['Taking a rough look at the sand in your palm, you find tiny star-shaped grains. You point at them with your finger: one, and another.', 'Als du den Sand in deiner Hand grob ansiehst, findest du winzige sternförmige Körnchen. Du zeigst mit dem Finger darauf: eins, und noch eins.'],
    learn: ['v:n3_0994', 'v:n3_0985'],
  },
  // ---- Kyoto: the university and Arashiyama (chapter 5)
  ky_leaves: {
    map: 'ex_kyoto', x: 12, y: 11, title: '紅葉の渦', note: 'momijigari',
    ja: '風が吹いて、落ち葉が{渦|うず|v:n3_1224}をまいた。赤、黄、だいだい……葉っぱ{それぞれ||v:n3_1340}に、ちがう秋の色がある。',
    t: ['The wind blows and the fallen leaves whirl in a spiral. Red, yellow, orange… each leaf has its own autumn colour.', 'Der Wind weht, und das Laub wirbelt im Kreis. Rot, gelb, orange … jedes Blatt hat seine eigene Herbstfarbe.'],
    learn: ['v:n3_1224', 'v:n3_1340'],
  },
  ky_cat: {
    map: 'ex_kyoto', x: 39, y: 19, title: '橋の猫',
    ja: '欄干の上で、黒猫が{尾|お|v:n3_1228}をゆらしている。じっと川を見つめていて、まるで{象|ぞう|v:n3_1314}のように動かない。',
    t: ['On the railing, a black cat swishes its tail. It stares at the river, as unmoving as an elephant statue.', 'Auf dem Geländer schwingt eine schwarze Katze den Schwanz. Sie starrt auf den Fluss, so reglos wie eine Elefantenstatue.'],
    learn: ['v:n3_1228', 'v:n3_1314'],
  },
  ky_glasses: {
    map: 'ex_kyoto', x: 27, y: 2, title: '学生のめがね',
    ja: 'ベンチに、{近視|きんし|v:n3_1265}用のめがねが置いてある。持ち主は{そのうち||v:n3_1335}気がついて、取りに来るだろう。',
    t: ['A pair of short-sighted glasses lies on the bench. The owner will notice soon and come back for them.', 'Auf der Bank liegt eine Brille für Kurzsichtige. Der Besitzer wird es bald merken und zurückkommen.'],
    learn: ['v:n3_1265', 'v:n3_1335'],
  },
  ky_view: {
    map: 'ex_kyoto', x: 19, y: 25, title: '嵐山の眺め',
    ja: '川の向こうに、なだらかな{丘陵|きゅうりょう|v:n3_1259}が続いている。ここからだと、嵐山の{全体|ぜんたい|v:n3_1311}が見わたせる。',
    t: ['Gentle hills stretch beyond the river. From here you can see the whole of Arashiyama.', 'Jenseits des Flusses erstrecken sich sanfte Hügel. Von hier aus überblickst du ganz Arashiyama.'],
    learn: ['v:n3_1259', 'v:n3_1311'],
  },
  ky_notice: {
    map: 'ex_kyoto', x: 2, y: 7, title: '掲示板のお知らせ',
    ja: '掲示板：「夜十時以降は{騒音|そうおん|v:n3_1315}に注意。寮の{規制|きせい|v:n3_1258}を守りましょう」。その下に、だれかが「菊江さん、ありがとう」と書きたしている。',
    t: ['Notice board: “After 10 p.m., mind the noise. Please follow the dormitory rules.” Below it, someone has added: “Thank you, Kikue.”', 'Schwarzes Brett: „Nach 22 Uhr bitte auf Lärm achten. Haltet euch an die Regeln des Wohnheims.“ Darunter hat jemand ergänzt: „Danke, Kikue.“'],
    learn: ['v:n3_1315', 'v:n3_1258'],
  },
};

// the Japan notes the discoveries open
Object.assign(NOTES, {
  otoshimono: {
    chapter: 1, title: '落とし物', titleEn: 'Lost property',
    de: 'Wer in Japan etwas findet, bringt es meist zum Kōban, der kleinen Polizeiwache an der Ecke. Erstaunlich viele verlorene Geldbörsen und Schlüssel kommen so zu ihren Besitzern zurück.',
    en: 'In Japan, people who find something usually take it to the kōban, the little police box on the corner. A remarkable number of lost wallets and keys find their way back to their owners.',
    words: '落とし物・交番・届ける',
  },
  jizo: {
    chapter: 2, title: 'お地蔵さん', titleEn: 'Jizō statues',
    de: 'Am Wegrand stehen oft kleine Steinfiguren mit rotem Lätzchen: Jizō. Er gilt als Beschützer von Reisenden und Kindern. Die Leute aus der Nachbarschaft pflegen die Figuren, legen Blumen hin und nähen neue Lätzchen.',
    en: 'Small stone figures with red bibs often stand by the roadside: Jizō, protector of travellers and children. Neighbours look after them, leave flowers and sew new bibs.',
    words: '地蔵・前掛け・お供え',
  },
  hokora: {
    chapter: 3, title: '祠', titleEn: 'Little shrines',
    de: 'In Japan findet man überall winzige Schreine (Hokora): am Feldrand, auf Dächern, im Wald. Sie sind örtlichen Gottheiten geweiht und werden von den Bewohnern still gepflegt. Man verbeugt sich kurz, wenn man vorbeikommt.',
    en: 'Tiny shrines (hokora) can be found all over Japan: at the edge of fields, on roofs, in forests. They are dedicated to local deities and quietly looked after by residents. People bow briefly when passing.',
    words: '祠・神様・お参り',
  },
  kotowaza_umi: {
    chapter: 4, title: '海の諺', titleEn: 'Sayings of the sea',
    de: 'Japan ist ein Inselland, und viele Sprichwörter stammen vom Meer. „Itago ichimai shita wa jigoku“ – eine Planke unter dir ist die Hölle – erinnert Seeleute daran, wie nah die Gefahr immer ist.',
    en: 'Japan is an island nation, and many proverbs come from the sea. “Itago ichimai shita wa jigoku” – one plank below is hell – reminds sailors how close danger always is.',
    words: '諺・板子・漁師',
  },
  momijigari: {
    chapter: 5, title: '紅葉狩り', titleEn: 'Autumn-leaf viewing',
    de: 'Im Herbst fahren viele Menschen in die Berge oder nach Kyoto, um das rote Laub zu bewundern: Momijigari, wörtlich „Ahornjagd“. Wie die Kirschblüte im Frühling wird die Laubfärbung in den Nachrichten vorhergesagt.',
    en: 'In autumn many people travel to the mountains or to Kyoto to admire the red leaves: momijigari, literally “maple hunting”. Like the cherry blossom in spring, the colouring is forecast on the news.',
    words: '紅葉・見頃・嵐山',
  },
});

SECRETS.tanken = { name: '探検家', nameEn: 'Explorer', hint: 'Glittering spots are hidden in the new districts. Find every one of them.' };
DE_STORY['Glittering spots are hidden in the new districts. Find every one of them.'] ??= 'In den neuen Vierteln funkeln versteckte Stellen. Finde jede einzelne.';
DE_STORY['Explorer'] ??= 'Entdeckerin';

export const DISCOVERY_IDS = Object.keys(DISCOVERIES);
export const foundDiscoveries = (s: GameState) => DISCOVERY_IDS.filter((id) => s.flags['found_' + id]).length;

/** the glitter on the maps (it goes once found) */
export const DISCOVERY_OBJECTS: Record<string, MapObject[]> = {};
export const DISCOVERY_SCRIPTS: Record<string, DialogueRule[]> = {};
for (const [id, d] of Object.entries(DISCOVERIES)) {
  (DISCOVERY_OBJECTS[d.map] ??= []).push({
    id: `disc_${id}`, sprite: 'em_sparkle', x: d.x, y: d.y, w: 1, h: 1, solid: false, script: `disc_${id}`, when: { notFlag: `found_${id}` },
  });
  const steps: Step[] = [
    { say: d.ja, en: de(d.t) },
    { do: [{ flag: `found_${id}` }, { learn: d.learn }, { money: 300 }, { xp: 20 }, ...(d.note ? [{ note: d.note }] : [])] },
    ...d.learn.map((k) => ({ teach: k }) as Step),
    { toast: `発見！「${d.title}」` },
    { if: { all: DISCOVERY_IDS.map((x) => ({ flag: `found_${x}` })) }, then: [{ do: [{ secret: 'tanken' }] }, { toast: '探検家！ ぜんぶ見つけた！' }] },
  ];
  DISCOVERY_SCRIPTS[`disc_${id}`] = [{ steps }];
}
