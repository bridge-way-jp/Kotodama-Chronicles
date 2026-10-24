/**
 * "Japan im Alltag": small everyday scenes on painted backdrops (public/assets/ui_*.png) where the game writes the
 * Japanese on the empty labels: a ramen-shop ticket machine, a café menu board, the hanging menu plates of a
 * kushikatsu shop, a station departure board with announcements and a lost-property form at the police box.
 * Boxes are in percent of the picture (x, y, w, h). Lines use the {漢字|かな} markup of ui/Jp.
 */

export type Box = [number, number, number, number];

export interface MenuItem {
  id: string;
  /** label text (markup) */
  ja: string;
  en: string;
  price: number;
  box: Box;
}

export interface Order {
  /** what the customer / friend says (markup) */
  say: string;
  en: string;
  /** item ids, in any order */
  want: string[];
}

export interface Shop {
  kind: 'shop';
  image: string;
  title: string;
  titleEn: string;
  /** how the order is given: read on screen, or heard first and shown after */
  mode: 'read' | 'listen';
  /** writing direction of the labels */
  vertical?: boolean;
  /** with kanji only on the labels (no furigana) */
  plain?: boolean;
  intro: string;
  introEn: string;
  task: string;
  taskEn: string;
  items: MenuItem[];
  orders: Order[];
  /** the part of each picture's cell that can be tapped (the label box grown by this much, in percent: up, down) */
  grow?: [number, number];
}

// ---------------------------------------------------------------- the ticket machine (ramen shop, Hinomori)

const TICKET_COLS = [5.5, 28.5, 51.4, 74.4];
const TICKET_ROWS = [14.1, 31.5, 47.9, 62.1, 78.7];
const tk = (i: number): Box => [TICKET_COLS[i % 4], TICKET_ROWS[Math.floor(i / 4)], 20.2, 3.7];
const TICKET: [string, string, string, number][] = [
  ['shoyu', '{醤油|しょうゆ}ラーメン', 'Shoyu ramen', 800],
  ['tonkotsu', '{豚骨|とんこつ}ラーメン', 'Tonkotsu ramen', 850],
  ['miso', '{味噌|みそ}ラーメン', 'Miso ramen', 850],
  ['karamiso', '{辛|から}{味噌|みそ}ラーメン', 'Spicy miso ramen', 900],
  ['tsukemen', 'つけ{麺|めん}', 'Tsukemen (dipping noodles)', 900],
  ['wantan', 'ワンタン{麺|めん}', 'Wonton noodles', 900],
  ['tanmen', 'タンメン', 'Vegetable noodle soup', 800],
  ['chashumen', 'チャーシュー{麺|めん}', 'Chashu noodles', 1050],
  ['gyoza', '{餃子|ぎょうざ}', 'Gyoza', 350],
  ['karaage', '{唐揚|からあ}げ', 'Fried chicken', 400],
  ['rice', 'ライス', 'Rice', 150],
  ['chashudon', 'チャーシュー{丼|どん}', 'Chashu rice bowl', 400],
  ['ajitama', '{味玉|あじたま}', 'Seasoned egg', 120],
  ['menma', 'メンマ', 'Bamboo shoots', 120],
  ['negi', 'ねぎ{増|ま}し', 'Extra spring onion', 100],
  ['nori', 'のり{増|ま}し', 'Extra nori', 100],
  ['beer', '{生|なま}ビール', 'Draught beer', 550],
  ['sour', 'レモンサワー', 'Lemon sour', 450],
  ['sake', '{日本酒|にほんしゅ}', 'Sake', 600],
  ['tea', '{烏龍茶|ウーロンちゃ}', 'Oolong tea', 200],
];

// ---------------------------------------------------------------- the café menu board (Café Kotonoha)

const CAFE_X = [24.6, 61.3];
const CAFE_Y = [23.6, 38.6, 53.6, 68.6];
const cf = (col: number, row: number): Box => [CAFE_X[col], CAFE_Y[row], 23.6, 10.2];

// ---------------------------------------------------------------- the kushikatsu shop (Osaka)

const plate = (i: number): Box => [2.4 + i * 8.07, 25, 6.4, 30.5];
const KUSHI: [string, string, string, string, number][] = [
  ['gyu', '牛串', 'ぎゅうくし', 'Beef skewer', 150],
  ['buta', '豚串', 'ぶたくし', 'Pork skewer', 120],
  ['ebi', '海老', 'えび', 'Prawn', 200],
  ['uzura', '鶉卵', 'うずら', 'Quail egg', 100],
  ['renkon', '蓮根', 'れんこん', 'Lotus root', 100],
  ['shiitake', '椎茸', 'しいたけ', 'Shiitake', 120],
  ['tamanegi', '玉葱', 'たまねぎ', 'Onion', 100],
  ['chikuwa', '竹輪', 'ちくわ', 'Fish-cake tube', 100],
  ['mochi', '餅', 'もち', 'Rice cake', 120],
  ['nasu', '茄子', 'なす', 'Aubergine', 100],
  ['kabocha', '南瓜', 'かぼちゃ', 'Pumpkin', 100],
  ['benishoga', '紅生姜', 'べにしょうが', 'Pickled ginger', 100],
];

export const SHOPS: Record<string, Shop> = {
  ticket: {
    kind: 'shop',
    image: 'ui_ticket_machine',
    title: '{食券機|しょっけんき}',
    titleEn: 'Meal-ticket machine',
    mode: 'read',
    intro: '{先|さき}に{食券|しょっけん}を{買|か}ってから、{席|せき}に{座|すわ}る{店|みせ}だ。{健太|けんた}の{分|ぶん}もまとめて{買|か}ってあげよう。',
    introEn: 'At this shop you buy tickets first, then sit down. You buy for your friend as well.',
    task: '{言|い}われたものの{食券|しょっけん}を{押|お}して、「{購入|こうにゅう}」。',
    taskEn: 'Press the tickets for what is asked, then “Buy”.',
    items: TICKET.map(([id, ja, en, price], i) => ({ id, ja, en, price, box: tk(i) })),
    grow: [13, 0.5],
    orders: [
      { say: '{味噌|みそ}ラーメンと{餃子|ぎょうざ}、お{願|ねが}い。', en: 'Miso ramen and gyoza, please.', want: ['miso', 'gyoza'] },
      { say: '{辛|から}いのは{苦手|にがて}なんだ。{豚骨|とんこつ}にして、{味玉|あじたま}をのせたいな。', en: 'I’m not good with spicy food. Make it tonkotsu, and I’d like a seasoned egg on top.', want: ['tonkotsu', 'ajitama'] },
      { say: '{今日|きょう}は{麺|めん}をスープにつけて{食|た}べたい{気分|きぶん}。それと、ビールじゃなくて、お{酒|さけ}じゃないものを。', en: 'Today I feel like dipping my noodles in the soup. And no beer — something without alcohol.', want: ['tsukemen', 'tea'] },
      { say: '{野菜|やさい}たっぷりのやつと、ご{飯|はん}もの……{肉|にく}がのってる{丼|どんぶり}がいいな。', en: 'The one with lots of vegetables, and a rice dish… a bowl with meat on it.', want: ['tanmen', 'chashudon'] },
      { say: '{一番|いちばん}{辛|から}いラーメンと、{生|なま}を{一|ひと}つ。あ、{揚|あ}げ{物|もの}も{頼|たの}んでおいて。', en: 'The spiciest ramen and one draught beer. Oh, order something fried too.', want: ['karamiso', 'beer', 'karaage'] },
      { say: 'しょうゆ{味|あじ}で。トッピングは、のりとねぎを{多|おお}めに。', en: 'Soy-sauce flavour. For toppings, extra nori and spring onion.', want: ['shoyu', 'nori', 'negi'] },
      { say: 'お{肉|にく}がいっぱいのラーメンがいい。{飲|の}み{物|もの}は、レモンの。', en: 'A ramen with lots of meat. To drink, the lemon one.', want: ['chashumen', 'sour'] },
      { say: 'ワンタンが{入|はい}ってるのと、ライス。お{酒|さけ}は{日本|にほん}のがいいな。', en: 'The one with wontons, and rice. For a drink, I’d like Japanese sake.', want: ['wantan', 'rice', 'sake'] },
    ],
  },
  cafe: {
    kind: 'shop',
    image: 'ui_menu_board',
    title: '{喫茶|きっさ}ことのは',
    titleEn: 'Café Kotonoha — helping at the counter',
    mode: 'listen',
    intro: '{忙|いそが}しい{時間|じかん}だ。マスターに{頼|たの}まれて、{注文|ちゅうもん}を{受|う}けることになった。お{客|きゃく}さんの{言|い}うことを、よく{聞|き}いて！',
    introEn: 'It’s the busy hour. The owner asked you to take orders. Listen carefully to the customers!',
    task: '{聞|き}こえた{注文|ちゅうもん}をメニューから{選|えら}んで、「{注文|ちゅうもん}を{通|とお}す」。',
    taskEn: 'Pick what you heard from the menu, then “Send the order”.',
    items: [
      { id: 'blend', ja: 'ブレンドコーヒー', en: 'Blend coffee', price: 450, box: cf(0, 0) },
      { id: 'iced', ja: 'アイスコーヒー', en: 'Iced coffee', price: 480, box: cf(0, 1) },
      { id: 'ham', ja: 'ハムサンド', en: 'Ham sandwich', price: 650, box: cf(0, 2) },
      { id: 'egg', ja: '{卵|たまご}サンド', en: 'Egg sandwich', price: 600, box: cf(0, 3) },
      { id: 'cake', ja: 'ショートケーキ', en: 'Strawberry shortcake', price: 520, box: cf(1, 0) },
      { id: 'muffin', ja: 'マフィン', en: 'Blueberry muffin', price: 380, box: cf(1, 1) },
      { id: 'tea', ja: '{紅茶|こうちゃ}', en: 'Black tea', price: 450, box: cf(1, 2) },
      { id: 'pot', ja: 'ポットティー', en: 'Pot of tea (two cups)', price: 700, box: cf(1, 3) },
    ],
    grow: [0, 0],
    orders: [
      { say: 'すみません、アイスコーヒーと、ショートケーキをお{願|ねが}いします。', en: 'Excuse me, an iced coffee and a strawberry shortcake, please.', want: ['iced', 'cake'] },
      { say: '{温|あたた}かいコーヒーを{一|ひと}つ。それから、{卵|たまご}のサンドイッチをください。', en: 'One hot coffee. And the egg sandwich, please.', want: ['blend', 'egg'] },
      { say: '{二人|ふたり}で{紅茶|こうちゃ}を{飲|の}みたいので、ポットでお{願|ねが}いできますか。あと、マフィンを{一|ひと}つ。', en: 'We’d like to drink tea for two, so could we have a pot? And one muffin.', want: ['pot', 'muffin'] },
      { say: 'ハムのサンドイッチと、{冷|つめ}たいコーヒーで。', en: 'The ham sandwich and a cold coffee.', want: ['ham', 'iced'] },
      { say: 'ケーキは{甘|あま}すぎるので、マフィンにします。{飲|の}み{物|もの}は{紅茶|こうちゃ}で。', en: 'Cake is too sweet for me, so I’ll have the muffin. Black tea to drink.', want: ['muffin', 'tea'] },
      { say: 'ブレンドを{一|ひと}つと、{卵|たまご}サンドとハムサンド、{両方|りょうほう}お{願|ねが}いします。', en: 'One blend, and both the egg sandwich and the ham sandwich, please.', want: ['blend', 'egg', 'ham'] },
    ],
  },
  kushi: {
    kind: 'shop',
    image: 'ui_izakaya_menu',
    title: '{串|くし}カツ　ふじ',
    titleEn: 'Kushikatsu shop — the menu plates',
    mode: 'read',
    vertical: true,
    plain: true,
    intro: 'かべの{木|き}の{札|ふだ}は、{全部|ぜんぶ}{漢字|かんじ}だけで{書|か}いてある。{健太|けんた}がひらがなで{注文|ちゅうもん}を{言|い}うから、{札|ふだ}を{見|み}つけて！',
    introEn: 'The wooden plates on the wall are written in kanji only. Kenta says the order in hiragana — find the plates!',
    task: '{言|い}われた{串|くし}の{札|ふだ}を{押|お}して、「{注文|ちゅうもん}する」。',
    taskEn: 'Tap the plates of the skewers he asks for, then “Order”.',
    items: KUSHI.map(([id, ja, , en, price], i) => ({ id, ja, en, price, box: plate(i) })),
    grow: [0, 0],
    orders: [
      { say: 'れんこんと、しいたけ。', en: 'Lotus root and shiitake.', want: ['renkon', 'shiitake'] },
      { say: 'ぎゅうくしを{一本|いっぽん}と、うずら。', en: 'One beef skewer and quail egg.', want: ['gyu', 'uzura'] },
      { say: 'えびと、たまねぎと、ちくわ！', en: 'Prawn, onion and chikuwa!', want: ['ebi', 'tamanegi', 'chikuwa'] },
      { say: '{野菜|やさい}がいいな。なすと、かぼちゃ。', en: 'I want vegetables. Aubergine and pumpkin.', want: ['nasu', 'kabocha'] },
      { say: 'もちと、べにしょうが。{大阪|おおさか}っぽいやつ！', en: 'Rice cake and pickled ginger. The Osaka-style ones!', want: ['mochi', 'benishoga'] },
      { say: 'ぶたくしと、しいたけと、れんこん。', en: 'Pork skewer, shiitake and lotus root.', want: ['buta', 'shiitake', 'renkon'] },
    ],
  },
};

/** the readings of the kushikatsu plates, shown after the order */
export const KUSHI_READINGS: Record<string, string> = Object.fromEntries(KUSHI.map(([id, , kana]) => [id, kana]));

// ---------------------------------------------------------------- the departure board

export const BOARD_ROWS: Box[] = [11.7, 21.7, 31.9, 41.7].map((y) => [31.3, y, 58, 7.7]);
export const BOARD_TRACKS: Box[] = [11.7, 21.7, 31.9, 41.7].map((y) => [24.7, y, 5.6, 7.7]);

export interface Departure {
  time: string;
  /** 普通 / 快速 / 特急 */
  type: string;
  dest: string;
  /** destination reading, for the announcement */
  destKana: string;
  track: number;
}

const DESTS: [string, string][] = [['京都', 'きょうと'], ['大阪', 'おおさか'], ['奈良', 'なら'], ['神戸', 'こうべ'], ['名古屋', 'なごや'], ['日野森', 'ひのもり'], ['潮見', 'しおみ'], ['雪見', 'ゆきみ']];
const TYPES = ['普通', '快速', '特急', '各駅停車'];
const TYPE_KANA: Record<string, string> = { 普通: 'ふつう', 快速: 'かいそく', 特急: 'とっきゅう', 各駅停車: 'かくえきていしゃ' };

/** four departures from now on, sorted by time, on four different tracks */
export function makeDepartures(r = Math.random): Departure[] {
  const dests = DESTS.slice().sort(() => r() - 0.5).slice(0, 4);
  const tracks = [1, 2, 3, 4].sort(() => r() - 0.5);
  let h = 9 + Math.floor(r() * 10);
  let m = Math.floor(r() * 4) * 5;
  return dests.map(([dest, destKana], i) => {
    m += 4 + Math.floor(r() * 9);
    if (m >= 60) [h, m] = [h + 1, m - 60];
    return { time: `${h}:${String(m).padStart(2, '0')}`, type: TYPES[Math.floor(r() * TYPES.length)], dest, destKana, track: tracks[i] };
  });
}

const kanaTime = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return `${h}時${m ? `${m}分` : ''}`;
};

export interface Announcement {
  /** spoken (plain Japanese) */
  say: string;
  /** what the player has to find out */
  ask: string;
  askEn: string;
  /** index of the departure the answer is */
  answer: number;
  /** the board changes after the announcement (delay, other track) */
  change?: { row: number; time?: string; track?: number };
}

/** an announcement about one of the departures, with the question the player answers by tapping a row */
export function makeAnnouncement(d: Departure[], r = Math.random): Announcement {
  const i = Math.floor(r() * d.length);
  const x = d[i];
  const kind = Math.floor(r() * 4);
  if (kind === 0)
    return {
      say: `まもなく、${x.track}番線に、${TYPE_KANA[x.type]}、${x.destKana}行きが参ります。危ないですから、黄色い線の内側までお下がりください。`,
      ask: 'どの電車がもうすぐ来ますか。',
      askEn: 'Which train is arriving now?',
      answer: i,
    };
  if (kind === 1) {
    const late = 5 + Math.floor(r() * 4) * 5;
    const [h, m] = x.time.split(':').map(Number);
    const t = h * 60 + m + late;
    return {
      say: `お客様にお知らせいたします。${kanaTime(x.time)}発、${x.destKana}行きは、信号の確認のため、およそ${late}分遅れて運転しております。ご迷惑をおかけして、申し訳ございません。`,
      ask: '遅れている電車はどれですか。',
      askEn: 'Which train is delayed?',
      answer: i,
      change: { row: i, time: `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` },
    };
  }
  if (kind === 2) {
    const to = ((x.track % 4) + 1);
    return {
      say: `${x.destKana}行きの${TYPE_KANA[x.type]}は、本日、${x.track}番線ではなく、${to}番線から発車いたします。お乗り間違えのないよう、ご注意ください。`,
      ask: '乗り場が変わった電車はどれですか。',
      askEn: 'Which train leaves from another platform today?',
      answer: i,
      change: { row: i, track: to },
    };
  }
  return {
    say: `本日、${x.destKana}方面へ向かう最終電車は、${kanaTime(x.time)}発、${x.track}番線の${TYPE_KANA[x.type]}です。お乗り遅れのないよう、ご注意ください。`,
    ask: '最終電車はどれですか。',
    askEn: 'Which one is the last train?',
    answer: i,
  };
}

// ---------------------------------------------------------------- the lost-property form (police box, Tokyo)

export const FORM_FIELDS: { id: string; label: string; en: string; box: Box }[] = [
  { id: 'name', label: '{氏名|しめい}', en: 'Name', box: [26.4, 33.6, 43.3, 4.2] },
  { id: 'contact', label: '{連絡先|れんらくさき}', en: 'Phone', box: [26.4, 40.3, 43.3, 5] },
  { id: 'item', label: '{落|お}とした{物|もの}・{特徴|とくちょう}', en: 'Item and features', box: [26.2, 47.3, 43.6, 14] },
  { id: 'date', label: '{月日|がっぴ}', en: 'Date', box: [25.6, 63.6, 23.2, 4.4] },
  { id: 'time', label: '{時間|じかん}', en: 'Time', box: [49, 63.6, 10.8, 4.4] },
  { id: 'wday', label: '{曜日|ようび}', en: 'Weekday', box: [60, 63.6, 10.5, 4.4] },
  { id: 'place', label: '{場所|ばしょ}', en: 'Place', box: [25.4, 73.8, 45.3, 5.3] },
];

export interface FormCase {
  /** what the player tells the officer (markup) */
  story: string;
  en: string;
  /** the right card for each field (the name field takes the player's name) */
  right: Record<string, string>;
  /** cards that do not belong (similar, to read carefully) */
  wrong: string[];
}

export const FORM_CASES: FormCase[] = [
  {
    story: '{昨日|きのう}の{夕方|ゆうがた}、{渋谷駅|しぶやえき}のホームで、{黒|くろ}い{革|かわ}の{財布|さいふ}を{落|お}としました。{中|なか}には、カードと{現金|げんきん}が{三千円|さんぜんえん}ぐらい{入|はい}っています。{電話|でんわ}は、090-1234-5678です。',
    en: 'Yesterday evening I dropped a black leather wallet on the platform at Shibuya Station. There are cards and about ¥3,000 in cash in it. My phone is 090-1234-5678.',
    right: { contact: '090-1234-5678', item: '黒い革の財布（カード、現金約三千円）', date: '昨日', time: '夕方', place: '渋谷駅のホーム' },
    wrong: ['090-1243-5678', '茶色い革の財布', '新宿駅のホーム', '午前'],
  },
  {
    story: '{今朝|けさ}、{浅草|あさくさ}の{雷門|かみなりもん}の{前|まえ}で、{青|あお}い{傘|かさ}をなくしました。{持|も}ち{手|て}に、{白|しろ}いリボンが{付|つ}いています。{連絡先|れんらくさき}は、080-5555-0123です。',
    en: 'This morning I lost a blue umbrella in front of the Kaminarimon in Asakusa. It has a white ribbon on the handle. My number is 080-5555-0123.',
    right: { contact: '080-5555-0123', item: '青い傘（持ち手に白いリボン）', date: '今日', time: '朝', place: '浅草・雷門の前' },
    wrong: ['080-5555-0132', '赤い傘（持ち手に白いリボン）', '浅草寺の本堂', '夜'],
  },
  {
    story: '{先週|せんしゅう}の{金曜日|きんようび}の{夜|よる}、{新宿|しんじゅく}のバス{停|てい}で、{鍵|かぎ}を{落|お}としたみたいです。{猫|ねこ}のキーホルダーが{付|つ}いています。{電話番号|でんわばんごう}は、070-2468-1357です。',
    en: 'Last Friday night I seem to have dropped my keys at a bus stop in Shinjuku. They have a cat key ring. My phone number is 070-2468-1357.',
    right: { contact: '070-2468-1357', item: '鍵（猫のキーホルダー付き）', date: '先週', time: '夜', wday: '金曜日', place: '新宿のバス停' },
    wrong: ['070-2468-1375', '鍵（犬のキーホルダー付き）', '土曜日', '新宿駅の改札'],
  },
];

/** the script objects that open a scene (content/scripts.ts adds the choice to them) */
export const EVERYDAY_SPOTS: Record<string, { scene: string; text: string; en: string }> = {
  ramen_ticket: { scene: 'ticket', text: '{食券|しょっけん}を{買|か}う', en: 'Buy meal tickets' },
  cafe_menu: { scene: 'cafe', text: '{注文|ちゅうもん}を{手伝|てつだ}う', en: 'Help taking orders' },
  cafe_counter: { scene: 'cafe', text: '{注文|ちゅうもん}を{手伝|てつだ}う', en: 'Help taking orders' },
  kushi_counter: { scene: 'kushi', text: '{串|くし}カツを{注文|ちゅうもん}する', en: 'Order kushikatsu' },
  kushi_rack: { scene: 'kushi', text: '{串|くし}カツを{注文|ちゅうもん}する', en: 'Order kushikatsu' },
  timetable: { scene: 'departure', text: 'アナウンスを{聞|き}く', en: 'Listen to the announcements' },
  station_timetable: { scene: 'departure', text: 'アナウンスを{聞|き}く', en: 'Listen to the announcements' },
  info_board: { scene: 'departure', text: 'アナウンスを{聞|き}く', en: 'Listen to the announcements' },
  koban_desk: { scene: 'form', text: '{遺失届|いしつとどけ}を{書|か}く', en: 'Fill in a lost-property report' },
};
