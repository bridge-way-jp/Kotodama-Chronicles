import type { ListeningItem, ReadingText } from '../core/types';

/**
 * Exam-style reading and listening practice for chapter 7 (Tokyo): commuting, paperwork, loneliness, radio.
 * Original texts, NOT official JLPT material. The right option is first; the exam builder shuffles.
 */

export const TOKYO_READING: ReadingText[] = [
  {
    id: 'p_tk_commute_essay',
    title: '朝の電車',
    kind: 'essay',
    body:
      '東京に引っ越して、もうすぐ一年になる。毎朝、満員電車に乗って、一時間かけて会社に通っている。\n' +
      '最初のころは、電車の中の静けさに驚いた。何百人もの人が同じ車両にいるのに、誰も話さない。みんな、スマートフォンを見ているか、目を閉じている。\n' +
      'ところが、ある朝、わたしの前に立っていたおばあさんが、突然ふらついた。すると、周りの人たちが、何も言わずに道をあけて、席をゆずった。声は出さなくても、みんなが周りを見ていたのだ。\n' +
      '静かな電車は、冷たいのではなく、お互いに邪魔をしないように気をつけている場所なのかもしれない。今では、わたしも、その静けさが少し好きになった。',
    en:
      'It will soon be a year since I moved to Tokyo. Every morning I take a packed train and commute for an hour. At first I was surprised by the quiet inside. Hundreds of people are in one car and nobody talks; everyone looks at a phone or has closed their eyes. But one morning an old woman standing in front of me suddenly swayed. Without a word the people around made way and gave up a seat. Even without voices, everyone had been watching their surroundings. A quiet train may not be cold, but a place where people take care not to disturb one another. Now I have come to like that quiet a little.',
    vocab: ['tk_manin', 'tk_tsuukin'],
    grammar: [],
    questions: [
      { q: '筆者は、電車の中の様子に最初どう感じたか。', qEn: 'How did the author first feel about the scene inside the train?', options: ['多くの人がいるのに誰も話さないことに驚いた', '人が少なくて寂しいと思った', '話し声がうるさくて困った', '席がたくさん空いていて喜んだ'], answer: 0, why: 'The text says she was surprised by the quiet although hundreds of people were in the car.', type: 'detail' },
      { q: 'おばあさんがふらついたとき、周りの人はどうしたか。', qEn: 'What did the people around do when the old woman swayed?', options: ['何も言わずに、道をあけて席をゆずった', '大きな声で駅員を呼んだ', '見ないふりをして目を閉じた', '次の駅で一緒に降りた'], answer: 0, why: 'They made way and offered a seat without speaking.', type: 'detail' },
      { q: '筆者は、静かな電車をどんな場所だと考えるようになったか。', qEn: 'What kind of place does the author come to think the quiet train is?', options: ['お互いに邪魔をしないように気をつけている場所', '人と人が全く関心を持たない場所', '会話の練習をするための場所', '早く降りたいと思う場所'], answer: 0, why: 'The last paragraph says the quiet is care not to disturb each other, not coldness.', type: 'main' },
    ],
  },
  {
    id: 'p_tk_kuyakusho_notice',
    title: '区役所からのお知らせ',
    kind: 'notice',
    body:
      '新しく東京にお住まいになった方へ\n' +
      '引っ越しをしたら、十四日以内に、{区役所|くやくしょ}の{窓口|まどぐち|v:tk_madoguchi}で{手続き|てつづき|v:tk_tetsuzuki}をしてください。\n' +
      '一、窓口に来る前に、本人確認ができるもの（在留カードやパスポートなど）を用意してください。\n' +
      '二、入口で{番号札|ばんごうふだ}を取って、お呼びするまでお待ちください。\n' +
      '三、{住民票|じゅうみんひょう|v:tk_juuminhyou}が必要な方は、その場でお申し込みいただけます。\n' +
      'なお、平日の夕方は大変混み合います。お時間のある方は、午前中のご来庁をおすすめします。英語、中国語、ベトナム語の案内も、窓口にご用意しております。',
    en:
      'To those who have newly come to live in Tokyo. After moving, please do the procedure at the ward-office counter within 14 days. 1. Before coming, prepare something that proves your identity (residence card, passport). 2. Take a number ticket at the entrance and wait until called. 3. If you need a certificate of residence, you can apply on the spot. Weekday evenings are very crowded; if you have time, we recommend coming in the morning. Guides in English, Chinese and Vietnamese are available at the counter.',
    vocab: ['tk_madoguchi', 'tk_tetsuzuki', 'tk_juuminhyou'],
    grammar: [],
    questions: [
      { q: 'この文書は、何のために書かれたか。', qEn: 'Why was this notice written?', options: ['引っ越した人に、手続きの方法を知らせるため', '区役所の新しい場所を知らせるため', '外国語の授業を宣伝するため', '住民票の料金が変わることを知らせるため'], answer: 0, why: 'It explains how newcomers must register after moving.', type: 'main' },
      { q: '窓口に来る前に、しなければならないことは何か。', qEn: 'What must you do before coming to the counter?', options: ['本人確認ができるものを用意する', '番号札を家で取っておく', '住民票を自分で書く', '午前中に電話で予約する'], answer: 0, why: 'Item 1 says to prepare something that proves your identity.', type: 'detail' },
      { q: '区役所は、どの時間に来ることをすすめているか。', qEn: 'When does the ward office recommend coming?', options: ['午前中', '平日の夕方', '休日の夜', '昼の十二時'], answer: 0, why: 'It says weekday evenings are very crowded and recommends the morning.', type: 'detail' },
    ],
  },
  {
    id: 'p_tk_radio_letter',
    title: 'ラジオへの手紙',
    kind: 'letter',
    body:
      '黒井さんへ\n' +
      'こんばんは。いつも{深夜|しんや|v:tk_shinya}の{放送|ほうそう|v:tk_housou}を聞いています。\n' +
      'わたしは、二年前に地方から東京に来て、一人で暮らしています。仕事が終わって家に帰ると、部屋が静かすぎて、テレビをつけたまま寝てしまうこともありました。\n' +
      'けれど、先月から、夜、黒井さんのラジオを聞くようになりました。誰かが話している声があるだけで、不思議と、{孤独|こどく|v:tk_kodoku}が少し軽くなったように思います。\n' +
      '今日は、会社で初めて、自分の意見を言うことができました。そのことを、誰かに聞いてほしくて、この手紙を書きました。これからも、よろしくお願いします。',
    en:
      'Dear Mr. Kuroi, Good evening. I always listen to your late-night broadcast. I came to Tokyo from the countryside two years ago and live alone. After work the room was so quiet that sometimes I fell asleep with the TV on. But since last month I have listened to your radio at night. Just having someone’s voice speaking has, strangely, made my loneliness feel a little lighter. Today at work, for the first time, I could say my own opinion. I wrote this letter because I wanted someone to hear it. Thank you in advance for the future too.',
    vocab: ['tk_shinya', 'tk_housou', 'tk_kodoku'],
    grammar: [],
    questions: [
      { q: '筆者は、どうしてラジオを聞くようになったか。', qEn: 'Why did the writer start listening to the radio?', options: ['家の中が静かすぎて、寂しかったから', '仕事でラジオ番組を作っているから', 'テレビが壊れてしまったから', '黒井さんに会ったことがあるから'], answer: 0, why: 'The room was too quiet and she felt lonely; the voice on the radio eased it.', type: 'detail' },
      { q: 'ラジオを聞き始めてから、筆者の気持ちはどう変わったか。', qEn: 'How have the writer’s feelings changed since she began listening?', options: ['孤独な気持ちが少し軽くなった', '黒井さんの声が嫌いになった', '仕事に行きたくなくなった', '地方に帰りたくなった'], answer: 0, why: 'She says her loneliness became a little lighter.', type: 'main' },
      { q: '筆者がこの手紙を書いた理由は何か。', qEn: 'Why did the writer write this letter?', options: ['会社で初めて意見が言えたことを、誰かに聞いてほしかったから', '番組の内容に文句を言いたかったから', '放送の時間を変えてほしかったから', '黒井さんを会社に招待したかったから'], answer: 0, why: 'The last paragraph says she wanted someone to hear that she spoke her opinion.', type: 'intent' },
    ],
  },
];

export const TOKYO_LISTENING: ListeningItem[] = [
  {
    id: 'pl_tk_lost_umbrella',
    title: '課題理解：忘れ物センター',
    lines: [
      { who: '女', jp: 'すみません、昨日の夜、電車に傘を忘れてしまったんですが。', voice: 'f' },
      { who: '男', jp: 'どの路線の、何時ごろの電車でしたか。', voice: 'm' },
      { who: '女', jp: '山手線の、夜九時ごろです。青い折りたたみ傘です。', voice: 'f' },
      { who: '男', jp: '確認しますね。……ありましたよ。こちらの用紙に、お名前と連絡先を書いてください。それから、身分証を見せてください。', voice: 'm' },
      { who: '女', jp: 'ありがとうございます。身分証は、財布に入っているので、先に用紙を書きます。', voice: 'f' },
    ],
    en: 'F: Excuse me, I left my umbrella on a train last night. M: Which line, and about what time? F: The Yamanote Line, around nine in the evening. A blue folding umbrella. M: I’ll check… Yes, we have it. Please write your name and contact on this form. Then show your ID. F: Thank you. My ID is in my wallet, so I’ll fill in the form first.',
    vocab: ['tk_wasuremono'],
    questions: [
      { q: '女の人は、このあと最初に何をしますか。', qEn: 'What will the woman do first?', options: ['用紙に名前と連絡先を書く', '財布から身分証を出す', '電車の路線を調べる', '傘の色を伝える'], answer: 0, why: 'She says she will fill in the form first and show the ID after.', type: 'detail' },
    ],
  },
  {
    id: 'pl_tk_share_house',
    title: 'ポイント理解：シェアハウスのルール',
    lines: [
      { who: '女', jp: 'ようこそ。うちのシェアハウスは、六人で台所とお風呂を使います。', voice: 'f' },
      { who: '女', jp: '台所は、使ったらすぐに洗ってください。夜十時以降は、洗濯機を使わないでくださいね。音が響きますから。', voice: 'f' },
      { who: '男', jp: '分かりました。ごみは、どうしたらいいですか。', voice: 'm' },
      { who: '女', jp: '燃えるごみは、月曜と木曜の朝です。前の日の夜に、玄関に出しておいてください。', voice: 'f' },
    ],
    en: 'F: Welcome. In our share house six people use the kitchen and bath. Please wash up right after using the kitchen. After 10 p.m. please do not use the washing machine; the noise carries. M: Understood. What about rubbish? F: Burnable rubbish goes out on Monday and Thursday mornings. Please put it at the entrance the night before.',
    vocab: ['tk_share'],
    questions: [
      { q: '夜十時以降は、何をしてはいけませんか。', qEn: 'What must not be done after 10 p.m.?', options: ['洗濯機を使うこと', '台所を使うこと', 'お風呂に入ること', 'ごみを出すこと'], answer: 0, why: 'She asks them not to use the washing machine after ten because of the noise.', type: 'detail' },
      { q: '燃えるごみは、いつ出しますか。', qEn: 'When is burnable rubbish put out?', options: ['月曜と木曜の朝（前の日の夜に玄関へ）', '毎日の夜', '水曜の夜', '土曜の朝だけ'], answer: 0, why: 'It goes out Monday and Thursday mornings, placed at the entrance the night before.', type: 'detail' },
    ],
  },
  {
    id: 'pl_tk_radio_intro',
    title: '概要理解：深夜ラジオの始まり',
    lines: [
      { who: '男', jp: 'こんばんは。夜が長い夜も、眠れない夜も、この番組は、あなたのそばにいます。', voice: 'm' },
      { who: '男', jp: '今夜は、先週、たくさんいただいたお手紙の中から、いくつか読ませていただきます。', voice: 'm' },
      { who: '男', jp: 'ところで、最近、一つ気がついたことがあります。話すより、聞くほうが、実は難しいということです。', voice: 'm' },
      { who: '男', jp: 'みなさんの声を、今夜も、ゆっくり聞かせてください。', voice: 'm' },
    ],
    en: 'M: Good evening. On long nights and sleepless nights, this programme is at your side. Tonight I will read some of the many letters we received last week. By the way, lately I noticed something: listening is actually harder than speaking. Please let me hear your voices slowly again tonight.',
    vocab: ['tk_shinya', 'tk_housou'],
    questions: [
      { q: '男の人は、最近どんなことに気がつきましたか。', qEn: 'What has the man recently noticed?', options: ['話すより、聞くほうが難しいということ', '手紙の数が減ったということ', '眠れない人が減ったということ', '番組の時間が短くなったということ'], answer: 0, why: 'He says listening is actually harder than speaking.', type: 'main' },
    ],
  },
];
