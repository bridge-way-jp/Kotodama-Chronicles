import type { ListeningItem, ReadingText } from '../core/types';

/**
 * Second batch of exam-style practice (N2 level): advertisement, longer argument, e-mail with a request, report on a survey.
 * Original texts, NOT official JLPT material. The right option is first; the exam builder shuffles.
 */

export const MORE2_READING: ReadingText[] = [
  {
    id: 'p_more2_ad_course',
    title: '料理教室のご案内',
    kind: 'ad',
    body:
      '初めての方も大歓迎！ 週末の和食料理教室\n' +
      '毎週土曜日、午前十時から十二時まで。先生は、和食レストランで二十年働いた経験を持つ料理人です。\n' +
      '一回の参加費は三千円（材料費を含みます）。作った料理は、その場で試食するほか、持ち帰りもできます。\n' +
      '初回は無料体験ができますので、エプロンだけお持ちください。ただし、定員は十人ですので、お申し込みはお早めに。三回続けて欠席なさった場合は、席をお譲りいただくことがあります。',
    en:
      'Beginners very welcome! Weekend Japanese cooking class. Every Saturday from 10 to 12. The teacher is a cook with twenty years of experience at a Japanese restaurant. The fee per session is 3,000 yen (ingredients included). You eat what you cooked on the spot, and can also take it home. The first time is a free trial, so just bring an apron. However, the capacity is ten people, so apply early. If you are absent three times in a row, you may be asked to give up your seat.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '初めて参加する人は、何を持っていけばよいか。', qEn: 'What should a first-time participant bring?', options: ['エプロン', '材料', '参加費三千円', '料理の道具'], answer: 0, why: 'The first time is a free trial and only an apron is needed.', type: 'detail' },
      { q: 'この料理教室について、正しいものはどれか。', qEn: 'Which statement about this class is correct?', options: ['作った料理は持ち帰ることもできる', '参加人数に制限はない', '先生は、まだ経験が少ない', '毎週日曜日に行われる'], answer: 0, why: 'You can eat on the spot and also take it home; capacity is ten and it is on Saturdays.', type: 'detail' },
      { q: '席をゆずらなければならないのは、どんな場合か。', qEn: 'When might someone have to give up their seat?', options: ['三回続けて休んだとき', '材料費を払わなかったとき', '初回の体験に来なかったとき', '十人より早く申し込んだとき'], answer: 0, why: 'The ad says absence three times in a row may lead to giving up the seat.', type: 'detail' },
    ],
  },
  {
    id: 'p_more2_essay_reading',
    title: '本を読むということ',
    kind: 'essay',
    body:
      '最近、本を読む人が減っていると言われる。確かに、電車の中でも、本を開いている人より、スマートフォンを見ている人のほうがはるかに多い。\n' +
      'しかし、わたしは、読書の価値が下がったとは思わない。インターネットの情報は、短く、すぐに手に入る。その反対に、本は、一つのテーマについて、時間をかけて、順序立てて考えさせてくれる。\n' +
      'たとえば、ある問題について、ニュースを十本読んでも、全体の姿は見えてこないことがある。ところが、一冊の本を読み終えたとき、バラバラだった知識が、つながって見えるようになる。\n' +
      '忙しいからこそ、一日十分でもいい、スマートフォンを置いて、本と向き合う時間を作ってみてはどうだろうか。',
    en:
      'Recently it is said that fewer people read books. Indeed, even on the train there are far more people looking at smartphones than opening books. But I do not think the value of reading has fallen. Information on the internet is short and available at once. Books, on the contrary, make us think about one theme over time and in order. For example, even if you read ten news items on a problem, the whole picture may not appear. But when you finish one book, scattered knowledge comes to look connected. Precisely because we are busy, why not make time to put the smartphone down and face a book, even ten minutes a day?',
    vocab: [],
    grammar: [],
    questions: [
      { q: '筆者は、インターネットの情報と本を比べて、本にはどんな特徴があると述べているか。', qEn: 'What feature of books does the author state compared with internet information?', options: ['一つのテーマを順序立てて、じっくり考えさせてくれる', '短い時間で、すぐに情報が手に入る', '最新のニュースを正確に伝えてくれる', '難しいので、考える必要がない'], answer: 0, why: 'Books let us think about one theme over time and in order.', type: 'detail' },
      { q: '「バラバラだった知識が、つながって見えるようになる」とは、どういうことか。', qEn: 'What does “scattered knowledge comes to look connected” mean?', options: ['別々に知っていたことが、一冊を読むことで一つにまとまること', '読んだ本の内容を全部覚えること', 'ニュースの数が増えること', '新しい知識が必要なくなること'], answer: 0, why: 'After finishing a book, separately known facts come together as a whole.', type: 'expression' },
      { q: '筆者が最も言いたいことは何か。', qEn: 'What does the author most want to say?', options: ['忙しくても、少しの時間、本を読む価値がある', '本は、もう読まれなくなるだろう', '電車の中でスマートフォンを使うべきではない', 'ニュースを多く読むほうが理解が深まる'], answer: 0, why: 'The conclusion proposes making even ten minutes for books because we are busy.', type: 'main' },
    ],
  },
  {
    id: 'p_more2_mail_request',
    title: '資料のお願い',
    kind: 'email',
    body:
      '件名：会議資料について\n' +
      '佐藤さん\n' +
      'お疲れさまです。来週の月曜日に行う会議の件ですが、先日いただいた売り上げの資料を、もう少し細かくまとめていただけないでしょうか。\n' +
      '具体的には、商品別の数字に加えて、先月との比較がわかるようにしていただければ助かります。グラフがあると、さらに見やすいと思います。\n' +
      '木曜日のお昼までにいただければ、金曜日に全員に配ることができます。難しい場合は、早めにご連絡ください。よろしくお願いします。\n' +
      '中村',
    en:
      'Subject: About the meeting materials. Mr. Sato, thank you for your work. About next Monday’s meeting: could you summarise the sales materials you gave me the other day in a bit more detail? Specifically, in addition to figures by product, it would help if the comparison with last month is clear. With a graph it would be even easier to read. If I receive it by Thursday noon, I can hand it out to everyone on Friday. If it is difficult, please tell me early. Thank you. Nakamura.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '中村さんは、佐藤さんに何を頼んでいるか。', qEn: 'What does Mr. Nakamura ask Mr. Sato to do?', options: ['売り上げの資料を、もっと細かくまとめ直すこと', '会議の日程を変えること', '全員に資料を配ること', '先月の会議の記録を送ること'], answer: 0, why: 'He asks for the sales materials to be summarised in more detail, with product figures and last-month comparison.', type: 'intent' },
      { q: '資料は、いつまでに必要か。', qEn: 'By when is the material needed?', options: ['木曜日のお昼まで', '金曜日の朝まで', '月曜日の会議の前の日の夜まで', '来週の月曜日のお昼まで'], answer: 0, why: 'If received by Thursday noon, he can hand it out on Friday.', type: 'detail' },
      { q: '資料にあるとよいと言っているものは何か。', qEn: 'What does he say would be good to have in the material?', options: ['商品別の数字、先月との比較、グラフ', '商品の写真と値段の一覧', '全員の名前と連絡先', '来月の売り上げの予想だけ'], answer: 0, why: 'He lists figures by product, comparison with last month, and a graph.', type: 'detail' },
    ],
  },
  {
    id: 'p_more2_report_survey',
    title: 'アンケート調査の結果',
    kind: 'report',
    body:
      '二十代から五十代の会社員、千人に、「昼食をどうしているか」を聞いた。最も多かったのは「コンビニなどで買う」で四十パーセント、次いで「社員食堂や外食」が三十パーセント、「自分で作って持っていく」は二十パーセントだった。\n' +
      '年代別に見ると、二十代では「買う」と答えた人が半数近くに上った。一方、五十代では、「自分で作る」人が三割を超え、他の年代より多かった。\n' +
      '「自分で作る」人に理由を聞くと、「お金を節約できるから」という答えが最も多く、「健康のため」が続いた。調査を行った会社は、「物価が上がる中、昼食を手作りする人は、今後さらに増えるだろう」と話している。',
    en:
      'We asked 1,000 office workers in their twenties to fifties how they handle lunch. The most common was “buy at a convenience store etc.” at 40%, followed by “staff canteen or eating out” at 30%, and “make it myself and bring it” at 20%. By age group, among people in their twenties nearly half answered “buy”. On the other hand, among people in their fifties, those who “make it myself” exceeded three in ten, more than other age groups. Asked their reason, those who make it themselves most often answered “because I can save money”, followed by “for health”. The company that did the survey says, “as prices rise, people who make their own lunch will probably increase further”.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '昼食で、最も多かった答えは何か。', qEn: 'What was the most common answer for lunch?', options: ['コンビニなどで買う', '社員食堂や外食', '自分で作って持っていく', '昼食は食べない'], answer: 0, why: '“Buy at a convenience store” was highest at 40%.', type: 'detail' },
      { q: '五十代の特徴として、正しいものはどれか。', qEn: 'Which is correct as a feature of people in their fifties?', options: ['自分で作る人が、他の年代より多い', '買う人が、半数近くいる', '社員食堂を使う人が最も多い', '昼食を作る人は一人もいない'], answer: 0, why: 'In the fifties, over three in ten make their own lunch, more than other age groups.', type: 'detail' },
      { q: '調査を行った会社は、今後どうなると考えているか。', qEn: 'What does the company think will happen?', options: ['昼食を手作りする人が増える', '昼食を買う人が減って外食が増える', '社員食堂の利用者が増える', '昼食を食べない人が増える'], answer: 0, why: 'It says that as prices rise, more people will make lunch themselves.', type: 'inference' },
    ],
  },
];

export const MORE2_LISTENING: ListeningItem[] = [
  {
    id: 'pl_more2_taxi',
    title: '課題理解：タクシーを呼ぶ',
    lines: [
      { who: '女', jp: 'すみません、駅の近くまで、タクシーをお願いしたいんですが。', voice: 'f' },
      { who: '男', jp: 'はい。今、お電話の場所はどちらですか。', voice: 'm' },
      { who: '女', jp: '市民病院の正面玄関の前にいます。急いでいて、十分以内に来られますか。', voice: 'f' },
      { who: '男', jp: '少々お待ちください。……申し訳ありません、今は、ちょうど出ている車が多くて、十五分ほどかかります。', voice: 'm' },
      { who: '女', jp: 'そうですか。それじゃ、バスのほうが早そうだから、やっぱり、いいです。', voice: 'f' },
    ],
    en: 'W: Excuse me, I’d like a taxi to near the station. M: Yes. Where are you calling from? W: In front of the main entrance of the city hospital. I’m in a hurry; can you come within ten minutes? M: One moment. … I’m sorry, many cars are out right now, so it will take about fifteen minutes. W: I see. Then the bus seems faster, so never mind.',
    vocab: [],
    questions: [
      { q: '女の人は、このあとどうしますか。', qEn: 'What will the woman do next?', options: ['バスで駅へ行く', '十五分待ってタクシーに乗る', '病院の中で待つ', '別のタクシー会社に電話する'], answer: 0, why: 'The taxi takes fifteen minutes, so she thinks the bus is faster and cancels.', type: 'main' },
    ],
  },
  {
    id: 'pl_more2_diet',
    title: 'ポイント理解：健康の話',
    lines: [
      { who: '男', jp: '最近、健康のために、毎朝、散歩を始めたんだ。', voice: 'm' },
      { who: '女', jp: 'いいわね。わたしも続けたいんだけど、三日坊主で終わっちゃうの。', voice: 'f' },
      { who: '男', jp: '最初から長く歩こうとすると、続かないよ。ぼくは、まず十分だけと決めて、それが慣れたら、少しずつ延ばしたんだ。', voice: 'm' },
      { who: '女', jp: 'なるほど。それなら、できそうね。', voice: 'f' },
    ],
    en: 'M: Recently, for my health, I started taking a walk every morning. W: Nice. I’d like to keep it up too, but I always quit after three days. M: If you try to walk long from the start, it doesn’t last. I decided on just ten minutes first, and once I got used to that, I extended it little by little. W: I see. Then I might be able to do it.',
    vocab: [],
    questions: [
      { q: '男の人は、散歩を続けるために、どうしましたか。', qEn: 'What did the man do to keep up his walks?', options: ['最初は短い時間にして、少しずつ延ばした', '毎日、決まった友達と歩いた', '長い時間、歩くことから始めた', '雨の日は、家の中を歩いた'], answer: 0, why: 'He started with just ten minutes and extended it as he got used to it.', type: 'detail' },
    ],
  },
  {
    id: 'pl_more2_station_announce',
    title: '概要理解：駅のアナウンス',
    lines: [
      { who: '女', jp: 'ご案内いたします。ただいま、強い風の影響で、上り線の電車に遅れが出ております。', voice: 'f' },
      { who: '女', jp: '復旧の見込みは、現在のところ、立っておりません。', voice: 'f' },
      { who: '女', jp: 'お急ぎのお客様は、下り線のホームから出ているバスをご利用ください。', voice: 'f' },
      { who: '女', jp: 'お客様には、大変ご迷惑をおかけいたしますが、ご理解のほど、よろしくお願い申し上げます。', voice: 'f' },
    ],
    en: 'W: Attention please. At present, because of strong wind, trains on the up line are delayed. There is currently no prospect of recovery. Passengers in a hurry, please use the bus leaving from the down-line platform side. We apologise for the great inconvenience and ask for your understanding.',
    vocab: [],
    questions: [
      { q: 'このアナウンスの内容として、正しいものはどれですか。', qEn: 'Which is correct as the content of this announcement?', options: ['上り線の電車が遅れていて、いつ動くかわからない', '上り線の電車は、すべて運休している', '下り線の電車が、強い風で止まっている', '電車は、もうすぐ動き出す'], answer: 0, why: 'Up-line trains are delayed by wind and there is no prospect of recovery yet.', type: 'main' },
    ],
  },
  {
    id: 'pl_more2_apartment',
    title: '統合理解：部屋探し',
    lines: [
      { who: '男', jp: '部屋を探しているんですが、駅から近くて、家賃が七万円以内のところはありますか。', voice: 'm' },
      { who: '女', jp: 'そうですね。駅から徒歩五分で六万五千円の部屋と、徒歩十五分で五万五千円の部屋が、ございます。', voice: 'f' },
      { who: '女', jp: '近いほうは少し狭くて、日当たりがあまりよくありません。遠いほうは広くて明るいですが、坂道があります。', voice: 'f' },
      { who: '男', jp: '毎日の通勤を考えると、遠いのは大変だな。狭くても、近いほうにします。', voice: 'm' },
    ],
    en: 'M: I’m looking for a room; is there one close to the station with rent within 70,000 yen? W: Well, there is a room five minutes on foot from the station for 65,000 yen and a room fifteen minutes on foot for 55,000 yen. The closer one is a bit small and not very sunny. The farther one is spacious and bright but has a slope. M: Thinking of the daily commute, far is hard. Even if small, I’ll take the closer one.',
    vocab: [],
    questions: [
      { q: '男の人は、どちらの部屋にしますか。また、その理由は何ですか。', qEn: 'Which room does the man choose, and why?', options: ['駅に近い部屋。毎日の通勤が楽だから', '駅から遠い部屋。家賃が安いから', '駅から遠い部屋。広くて明るいから', '駅に近い部屋。坂道がないから'], answer: 0, why: 'He chooses the closer room because the daily commute matters more to him than size.', type: 'main' },
    ],
  },
];
