import type { ListeningItem, Question, ReadingText } from '../core/types';
import { SOCIETY_LISTENING, SOCIETY_READING } from './practice_society';
import { TOKYO_LISTENING, TOKYO_READING } from './practice_tokyo';
import { MORE_LISTENING, MORE_READING } from './practice_more';
import { MORE2_LISTENING, MORE2_READING } from './practice_more2';

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
  {
    id: 'p_ryokan_notice',
    title: '旅館からのお知らせ',
    kind: 'notice',
    body:
      '【温泉旅館「ゆのか」ご宿泊のお客様へ】\n' +
      '大浴場は、午後三時から夜十一時まで、朝は六時から九時までご利用いただけます。\n' +
      '午前九時から午後三時までは清掃のため、ご利用いただけません。その間は、広場の足湯をご利用ください。\n' +
      'なお、露天風呂は雪の日は安全のため閉鎖いたします。ご理解のほど、よろしくお願いいたします。',
    en: 'To guests of the hot-spring inn Yunoka: the large bath is open 3–11 p.m. and 6–9 a.m. From 9 a.m. to 3 p.m. it is closed for cleaning; please use the footbath on the square during that time. The open-air bath is closed on snowy days for safety. Thank you for your understanding.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '午前十時に温泉に入りたい人は、どうすればいいか。', options: ['広場の足湯を使う', '大浴場に入る', '露天風呂に入る', '午後十一時まで待つ'], answer: 0, why: '９時〜３時は清掃中 → 「その間は、広場の足湯をご利用ください」', type: 'detail' },
      { q: '露天風呂が使えないのはどんなときか。', options: ['雪が降っている日', '清掃をしている夜', '大浴場が混んでいるとき', '足湯が閉まっているとき'], answer: 0, why: '「露天風呂は雪の日は安全のため閉鎖いたします」', type: 'detail' },
    ],
  },
  {
    id: 'p_bus_change',
    title: 'バスの時刻変更',
    kind: 'notice',
    body:
      '【日野森の谷行きバス　時刻変更のお知らせ】\n' +
      '十二月一日から、冬の時刻表に変わります。平日の最終バスは、これまでの午後八時発から午後七時発になります。\n' +
      '土曜・日曜は、これまでどおり午後八時発が最終です。\n' +
      'また、大雪の日は運休することがあります。運休する場合は、当日の朝七時までに駅の掲示板とホームページでお知らせします。',
    en: 'Notice: from 1 December the winter timetable applies. On weekdays the last bus leaves at 7 p.m. instead of 8 p.m. On Saturdays and Sundays the last bus still leaves at 8 p.m. On days with heavy snow buses may be cancelled; this is announced on the station board and the website by 7 a.m. that day.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '十二月の水曜日、最終バスは何時に出るか。', options: ['午後七時', '午後八時', '午後六時', '朝七時'], answer: 0, why: '平日の最終バスは「午後八時発から午後七時発になります」', type: 'detail' },
      { q: 'バスが運休するかどうかは、どうすればわかるか。', options: ['当日の朝、駅の掲示板かホームページを見る', '前の日の夜に運転手に聞く', '十二月一日に駅へ行く', '大雪の日にバス停で待つ'], answer: 0, why: '「当日の朝七時までに駅の掲示板とホームページでお知らせします」', type: 'detail' },
    ],
  },
  {
    id: 'p_shift_mail',
    title: 'アルバイトのメール',
    kind: 'letter',
    body:
      '件名：来週のシフトについて\n' +
      '店長\n' +
      'お疲れさまです。マリアです。\n' +
      '来週の土曜日のシフトですが、大学の試験が入ってしまったため、出られなくなってしまいました。急なお願いで申し訳ありません。\n' +
      'かわりに、日曜日の朝から夕方まででしたら入ることができます。もし難しいようでしたら、ほかの日でも調整いたしますので、ご連絡いただけますと幸いです。\n' +
      'よろしくお願いいたします。',
    en: 'Subject: next week’s shift. Dear manager, it’s Maria. I can no longer work next Saturday because a university exam was scheduled. Sorry for the short notice. Instead I can work Sunday from morning to evening. If that is difficult I can adjust to another day, so I would be grateful if you could let me know.',
    vocab: [],
    grammar: [],
    questions: [
      { q: 'このメールで、マリアさんが一番伝えたいことは何か。', options: ['土曜日に働けないので、ほかの日にかえてほしい', '日曜日は働きたくない', '大学の試験の日を変えてほしい', 'アルバイトをやめたい'], answer: 0, why: 'She cannot work Saturday and offers Sunday or another day instead.', type: 'main' },
      { q: '店長はこのあと、何をすると考えられるか。', options: ['マリアさんに、働ける日について連絡する', '大学に試験について聞く', '土曜日にマリアさんを待つ', '新しいアルバイトを探す'], answer: 0, why: '「ご連絡いただけますと幸いです」: she asks the manager to reply about the day.', type: 'inference' },
    ],
  },
  {
    id: 'p_handwriting_essay',
    title: '手書きの手紙',
    kind: 'essay',
    body:
      '最近は、手紙を書く人がずいぶん減った。メールなら一瞬で届くし、書き間違えてもすぐに直せる。\n' +
      'それでも、わたしはときどき手書きの手紙を書く。字が上手なわけではない。むしろ、書くたびに自分の字の下手さにがっかりする。\n' +
      'しかし、手書きの字には、書いた人のその日の気持ちが残る。急いでいたのか、ゆっくり考えながら書いたのか。受け取った人は、字の形からそれを感じ取ることができる。\n' +
      '速さでは、手紙はメールにかなわない。けれども、手紙にしか運べないものが、たしかにあるのだと思う。',
    en: 'Fewer people write letters now. An email arrives in an instant and mistakes are easy to fix. Still, I sometimes write letters by hand. Not because my handwriting is good; if anything, it disappoints me every time. But handwriting keeps the writer’s feelings of that day: whether they were in a hurry or thought slowly while writing. The reader can sense it from the shape of the characters. In speed, letters cannot compete with email. But I think there are things only a letter can carry.',
    vocab: [],
    grammar: ['wakedewanai'],
    questions: [
      { q: '筆者が手書きの手紙を書くのはなぜか。', options: ['手書きの字には、書いた人の気持ちが残るから', '自分の字が上手だから', 'メールより早く届くから', '書き間違えてもすぐに直せるから'], answer: 0, why: '「手書きの字には、書いた人のその日の気持ちが残る」', type: 'detail' },
      { q: '「手紙にしか運べないもの」とは何か。', options: ['書いた人のその日の気持ち', '速く届くこと', '上手な字', '書き間違いを直すこと'], answer: 0, why: 'The essay says the writer’s feelings remain in the handwriting and the reader can sense them.', type: 'expression' },
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
  {
    id: 'pl_clinic',
    title: '課題理解：診療所の受付',
    lines: [
      { who: '男', jp: 'すみません、初めてなんですが、診てもらえますか。', voice: 'm' },
      { who: '女', jp: 'はい。では、まずこちらの問診票に症状を書いていただけますか。保険証は、お帰りのときで結構です。', voice: 'f' },
      { who: '男', jp: 'わかりました。熱も測ったほうがいいですか。', voice: 'm' },
      { who: '女', jp: 'それは、お名前を呼ばれてから、診察室で看護師が測りますので。', voice: 'f' },
    ],
    en: 'M: Excuse me, it’s my first time; can I see the doctor? W: Yes. First, could you write your symptoms on this questionnaire? Your insurance card can wait until you leave. M: Should I take my temperature too? W: The nurse will do that in the examination room after your name is called.',
    vocab: [],
    questions: [
      { q: '男の人はこのあとまず何をしますか。', options: ['問診票に症状を書く', '保険証を出す', '熱を測る', '診察室に入る'], answer: 0, why: 'まずこちらの問診票に症状を書いて; 保険証 is at the end, the temperature is taken later by the nurse.', type: 'detail' },
    ],
  },
  {
    id: 'pl_saturday',
    title: 'ポイント理解：土曜日の約束',
    lines: [
      { who: '男', jp: '土曜日の花火大会、やっぱり行けないの？', voice: 'm' },
      { who: '女', jp: 'うん、ごめんね。バイトは休みをもらえたんだけど、その日、祖母が田舎から出てくることになって。', voice: 'f' },
      { who: '男', jp: 'そっか。じゃあ、しかたないね。', voice: 'm' },
      { who: '女', jp: '駅まで迎えに行かなきゃいけないし、久しぶりだから、ゆっくり話したいんだ。', voice: 'f' },
    ],
    en: 'M: So you really can’t come to the fireworks on Saturday? W: Sorry. I got the day off from my job, but my grandmother is coming up from the countryside that day. M: I see, that can’t be helped. W: I have to pick her up at the station, and it’s been a while, so I want to talk with her properly.',
    vocab: [],
    questions: [
      { q: '女の人はどうして花火大会に行けませんか。', options: ['祖母に会うから', 'アルバイトがあるから', '花火が好きではないから', '駅で働いているから'], answer: 0, why: 'バイトは休みをもらえた (the job is not the reason) … 祖母が田舎から出てくる.', type: 'detail' },
    ],
  },
  {
    id: 'pl_platform',
    title: '課題理解：駅のアナウンス',
    lines: [
      { who: '駅員', jp: 'お客様にお知らせいたします。雪の影響で、みどり線は現在、運転を見合わせております。', voice: 'm' },
      { who: '駅員', jp: '雪見村方面へお急ぎのお客様は、二番乗り場から出ております臨時バスをご利用ください。', voice: 'm' },
      { who: '駅員', jp: 'なお、臨時バスをご利用の際は、お持ちの切符をそのままお使いいただけます。', voice: 'm' },
    ],
    en: 'Announcement: because of the snow, the Midori Line is currently suspended. Passengers in a hurry to Yukimi Village, please use the special bus leaving from stop 2. You can use your existing ticket on the special bus.',
    vocab: [],
    questions: [
      { q: '雪見村へ急いで行きたい人は、どうしますか。', options: ['二番乗り場の臨時バスに乗る', '新しい切符を買う', 'みどり線の電車を待つ', '駅員に切符を返す'], answer: 0, why: '二番乗り場から出ております臨時バスをご利用ください; the ticket you have can be used as it is.', type: 'detail' },
    ],
  },
  {
    id: 'pl_presentation',
    title: '概要理解：町の発表',
    lines: [
      { who: '女', jp: 'この町では、若い人が都会へ出ていくことが問題だと言われてきました。', voice: 'f' },
      { who: '女', jp: 'たしかに人口は減っています。でも、それだけを見て、町に未来がないと決めつけるのは早いと思います。', voice: 'f' },
      { who: '女', jp: '最近は、一度町を出た人が、仕事を持ったまま戻ってくる例も増えています。大切なのは、戻ってきたいと思える町を、今いる人が作っていくことではないでしょうか。', voice: 'f' },
    ],
    en: 'W: People have said that young people leaving for the city is this town’s problem. The population is indeed falling. But I think it is too early to decide from that alone that the town has no future. Recently more people who once left are coming back while keeping their jobs. Isn’t the important thing that the people here now build a town others want to come back to?',
    vocab: [],
    questions: [
      { q: '女の人が一番言いたいことは何ですか。', options: ['今いる人が、戻ってきたくなる町を作ることが大切だ', '若い人は都会へ出ていかないほうがいい', '人口が減っているので、町に未来はない', '仕事は都会で探したほうがいい'], answer: 0, why: 'Her conclusion: 大切なのは、戻ってきたいと思える町を、今いる人が作っていくこと.', type: 'main' },
    ],
  },
  {
    id: 'pl_bakery',
    title: 'ポイント理解：パン屋で',
    lines: [
      { who: '女', jp: 'すみません、このメロンパン、もう売り切れですか。', voice: 'f' },
      { who: '男', jp: '申し訳ございません。朝の分は売り切れてしまいまして。午後二時にもう一度焼き上がるんですが。', voice: 'm' },
      { who: '女', jp: '二時か……。じゃあ、取っておいてもらうことはできますか。', voice: 'f' },
      { who: '男', jp: 'はい、お名前をいただければ、お取り置きいたします。', voice: 'm' },
    ],
    en: 'W: Excuse me, are the melon buns already sold out? M: I’m sorry, the morning batch is sold out. Another batch is ready at 2 p.m. W: Two o’clock… Then could you put some aside for me? M: Yes, if you give me your name, we’ll keep them for you.',
    vocab: [],
    questions: [
      { q: '女の人はこのあとまず何をしますか。', options: ['店員に名前を伝える', '二時まで店で待つ', 'ほかのパンを買う', '朝もう一度来る'], answer: 0, why: 'お名前をいただければ、お取り置きいたします → she gives her name so they keep the buns.', type: 'detail' },
    ],
  },
];

// society and everyday-life texts (see practice_society.ts)
PRACTICE_READING.push(...SOCIETY_READING);
PRACTICE_LISTENING.push(...SOCIETY_LISTENING);
PRACTICE_READING.push(...TOKYO_READING);
PRACTICE_LISTENING.push(...TOKYO_LISTENING);
PRACTICE_READING.push(...MORE_READING);
PRACTICE_LISTENING.push(...MORE_LISTENING);
PRACTICE_READING.push(...MORE2_READING);
PRACTICE_LISTENING.push(...MORE2_LISTENING);
