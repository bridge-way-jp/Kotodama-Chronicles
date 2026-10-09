import type { ListeningItem, Question, ReadingText } from '../core/types';

/**
 * Original practice items written in the style of JLPT N2 question types.
 * They are NOT official JLPT questions.
 */

/** 言い換え類義 — choose the expression closest in meaning to the underlined part */
export const PARAPHRASE: (Question & { keys: string[] })[] = [
  { q: '彼の説明は【曖昧】だった。', options: ['はっきりしなかった', 'とても長かった', 'わかりやすかった', '正しかった'], answer: 0, why: '曖昧 = vague, not clear.', keys: ['v:aimai'] },
  { q: '急に名前を呼ばれて、【戸惑った】。', options: ['どうしたらいいかわからなかった', 'とてもうれしくなった', '少し怒った', '走って逃げた'], answer: 0, why: '戸惑う = to be at a loss.', keys: ['v:tomadou'] },
  { q: '新しい先輩は、とても【頼もしい】。', options: ['頼りになる', 'やさしい', '忙しい', '楽しい'], answer: 0, why: '頼もしい = reliable, someone you can count on.', keys: ['v:tanomoshii'] },
  { q: '強風のため、運転を【見合わせて】います。', options: ['しばらく止めて', '急いで再開して', '予定より早めて', '別の線に変えて'], answer: 0, why: '見合わせる = to suspend / hold off for now.', keys: ['v:miawase'] },
  { q: '【さすが】プロの料理人だ。とてもおいしい。', options: ['やはり', 'たぶん', 'せっかく', 'やっと'], answer: 0, why: 'さすが ≈ やはり (as expected, living up to expectations).', keys: ['v:sasuga'] },
  { q: '時間がたって、あの日の記憶が【薄れて】きた。', options: ['はっきりしなくなって', '増えて', '戻って', '強くなって'], answer: 0, why: '薄れる = to fade.', keys: ['v:usureru'] },
];

/** 文の組み立て — choose the piece that goes in the ★ slot */
export interface OrderItem {
  before: string;
  after: string;
  pieces: string[]; // correct order
  star: number; // index of the ★ slot in the correct order
  en: string;
  keys: string[];
}

export const ORDERING: OrderItem[] = [
  { before: '日本語が難しい', after: 'ない。', pieces: ['からといって', '勉強が', '嫌いな', 'わけでは'], star: 2, en: "Just because Japanese is hard doesn't mean I dislike studying.", keys: ['g:wakedewanai'] },
  { before: '駅に', after: 'くれる？', pieces: ['行く', 'ついでに', '手紙を', '出して'], star: 2, en: "Could you post a letter on your way to the station?", keys: ['g:tsuideni'] },
  { before: '時間が', after: 'いく。', pieces: ['たつ', 'につれて', '記憶が', '薄れて'], star: 2, en: 'As time passes, memories fade.', keys: ['g:nitsurete', 'v:usureru'] },
  { before: '友達', after: '言うんだ。', pieces: ['だ', 'からこそ', '本当の', 'ことを'], star: 2, en: "It's precisely because we're friends that I'm telling you the truth.", keys: ['g:karakoso'] },
  { before: '大事な', after: 'わけにはいかない。', pieces: ['会議が', 'あるので', '今日は', '休む'], star: 2, en: "I have an important meeting, so I can't take today off.", keys: ['g:wakeniwaikanai'] },
];

export const PRACTICE_READING: ReadingText[] = [
  {
    id: 'p_library_notice',
    title: '図書館からのお知らせ',
    kind: 'notice',
    body:
      '【日野森図書館からのお知らせ】\n' +
      '館内の整理のため、３月１０日（月）から１４日（金）まで休館いたします。\n' +
      '休館中に返却する本は、入口横の返却ポストに入れてください。ただし、CDやDVDは機械が故障する{恐|おそ}れがあるため、返却ポストには入れず、開館後にカウンターまでお持ちください。\n' +
      'なお、予約した本の受け取りは１５日（土）からとなります。',
    en: 'Library notice: closed 10–14 March for reorganisation. Books may be returned to the return box by the entrance during the closure. However, CDs and DVDs may damage the machine, so do not put them in the box; bring them to the counter after reopening. Reserved books can be collected from the 15th (Sat).',
    vocab: [],
    grammar: [],
    questions: [
      { q: '休館中にDVDを返したい人は、どうしなければならないか。', options: ['開館してからカウンターに持っていく', '入口横の返却ポストに入れる', '３月１０日までに返す', '予約をしてから返す'], answer: 0, why: '「CDやDVDは…返却ポストには入れず、開館後にカウンターまで」', type: 'detail' },
      { q: '予約した本は、いつから受け取れるか。', options: ['３月１５日から', '３月１０日から', '３月１４日から', '休館中ならいつでも'], answer: 0, why: '「予約した本の受け取りは１５日（土）からとなります」', type: 'detail' },
    ],
  },
  {
    id: 'p_convenience_essay',
    title: '「便利」について',
    kind: 'essay',
    body:
      '「便利」という言葉について考えてみたい。スマートフォンがあれば、知らない町でも迷わずに目的地に着ける。たしかに便利だ。\n' +
      'しかし、道に迷ったからこそ見つけた小さな店や、人に道を聞いたことをきっかけに始まった会話は、もう生まれにくくなっているのかもしれない。\n' +
      '便利さが悪いわけではない。ただ、効率だけでは手に入らないものもあるということを、ときどき思い出したい。',
    en: 'I want to think about the word “convenient”. With a smartphone you can reach your destination without getting lost, even in an unfamiliar town. It is certainly convenient. But the little shops found precisely because we got lost, or conversations that began with asking someone for directions, may now be less likely to happen. Convenience is not bad. I just want to remember now and then that some things cannot be obtained through efficiency alone.',
    vocab: [],
    grammar: ['karakoso', 'wokikkakeni', 'wakedewanai'],
    questions: [
      { q: '筆者の考えに最も近いものはどれか。', options: ['便利さは悪くないが、効率だけでは得られないものもある', '便利なものは使わないほうがいい', 'スマートフォンのせいで、人と話せなくなった', '道に迷わないように、地図を使うべきだ'], answer: 0, why: 'Last paragraph: 便利さが悪いわけではない。ただ、効率だけでは手に入らないものもある.', type: 'main' },
      { q: '「道に迷ったからこそ見つけた小さな店」とはどういう意味か。', options: ['道に迷ったので、偶然見つけることができた店', '迷わないように、前から調べておいた店', '道に迷った人のための店', '見つけるのが難しいので、行かなかった店'], answer: 0, why: 'からこそ: it was BECAUSE we got lost that we found it.', type: 'expression' },
    ],
  },
];

export const PRACTICE_LISTENING: ListeningItem[] = [
  {
    id: 'pl_post',
    title: '課題理解：郵便局で',
    lines: [
      { who: '女', jp: 'すみません、この荷物、今日中に送りたいんですけど。', voice: 'f' },
      { who: '男', jp: 'はい。今日の発送は午後五時までなんですが、今四時半なので、急いでこちらの用紙にご記入ください。', voice: 'm' },
      { who: '女', jp: 'あ、住所を書くんですね。電話番号も必要ですか。', voice: 'f' },
      { who: '男', jp: 'はい、お願いします。それから、お支払いは記入のあとで結構です。', voice: 'm' },
    ],
    en: 'W: I want to send this parcel today. M: Today’s dispatch closes at 5 p.m.; it’s 4:30, so please fill in this form quickly. W: Oh, I write the address? Do you need a phone number too? M: Yes please. Payment can be after you fill it in.',
    vocab: [],
    questions: [
      { q: '女の人はまず何をしますか。', options: ['用紙に住所と電話番号を書く', 'お金を払う', '五時まで待つ', '荷物を箱に入れる'], answer: 0, why: '支払いは記入のあとで結構です → first fill in the form.', type: 'detail' },
    ],
  },
  {
    id: 'pl_jogging',
    title: 'ポイント理解：ジョギング',
    lines: [
      { who: '男', jp: '最近、毎朝ジョギングしてるんだって？', voice: 'm' },
      { who: '女', jp: 'うん。でも、健康のためっていうわけじゃないんだ。', voice: 'f' },
      { who: '男', jp: 'え、じゃあどうして？', voice: 'm' },
      { who: '女', jp: '朝の町って静かで、考え事をするのにちょうどいいの。仕事のアイデアも、走ってるときによく浮かぶんだよね。', voice: 'f' },
    ],
    en: 'M: I heard you jog every morning? W: Yes, but it’s not for my health. M: Then why? W: The town is quiet in the morning — perfect for thinking. Work ideas often come to me while running.',
    vocab: [],
    questions: [
      { q: '女の人はどうしてジョギングをしていますか。', options: ['考え事をするのにいいから', '健康のため', '仕事で必要だから', '友達に誘われたから'], answer: 0, why: '健康のためっていうわけじゃない (not for health) … 考え事をするのにちょうどいい.', type: 'detail' },
    ],
  },
];
