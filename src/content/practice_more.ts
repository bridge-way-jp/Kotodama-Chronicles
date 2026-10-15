import type { ListeningItem, ReadingText } from '../core/types';

/**
 * More exam-style reading and listening practice (N2 level): e-mail, argument, notice, two-opinion comparison, letter, essay.
 * Original texts, NOT official JLPT material. The right option is first; the exam builder shuffles.
 */

export const MORE_READING: ReadingText[] = [
  {
    id: 'p_more_mail_schedule',
    title: '打ち合わせの日程変更',
    kind: 'email',
    body:
      '件名：打ち合わせの日程変更のお願い\n' +
      '田中様\n' +
      'いつもお世話になっております。大阪商事の山本です。\n' +
      '来週火曜日に予定しておりました打ち合わせですが、急な出張が入りましたため、日程を変更していただけないでしょうか。誠に申し訳ございません。\n' +
      '木曜日の午後であれば、何時でも対応できます。もし木曜日が難しい場合は、翌週の月曜日でも構いません。資料は、前もってメールでお送りいたしますので、ご都合のよい日をお知らせください。\n' +
      'お忙しいところ恐縮ですが、ご検討のほど、よろしくお願い申し上げます。',
    en:
      'Subject: Request to change the meeting date. Dear Mr. Tanaka, this is Yamamoto of Osaka Shoji. About the meeting planned for next Tuesday: because a sudden business trip has come up, could we change the date? I am very sorry. I can make any time on Thursday afternoon. If Thursday is difficult, the following Monday is also fine. I will send the materials by e-mail beforehand, so please let me know a convenient day. I apologise for troubling you when you are busy and ask for your consideration.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '山本さんは、なぜ日程の変更をお願いしていますか。', qEn: 'Why is Mr. Yamamoto asking for a change of date?', options: ['急に出張に行くことになったから', '資料がまだできていないから', '田中さんの都合が悪くなったから', '火曜日は会社が休みだから'], answer: 0, why: 'He says a sudden business trip has come up (急な出張が入りました).', type: 'detail' },
      { q: '山本さんが対応できないのは、いつですか。', qEn: 'When is Mr. Yamamoto NOT available?', options: ['来週の火曜日', '木曜日の午後', '来週の月曜日', '木曜日の午前'], answer: 0, why: 'He can do any time Thursday afternoon, and Monday of the following week; the problem is next Tuesday.', type: 'inference' },
      { q: 'このメールで、山本さんが田中さんに求めていることは何ですか。', qEn: 'What does Mr. Yamamoto ask Mr. Tanaka to do?', options: ['都合のよい日を知らせること', '資料を先に送ること', '出張の予定を変えること', '木曜日に会社に来ること'], answer: 0, why: 'The closing request is to tell him a convenient day; he himself will send the materials.', type: 'intent' },
    ],
  },
  {
    id: 'p_more_essay_perfect',
    title: '完璧でなくてもいい',
    kind: 'essay',
    body:
      '外国語を勉強していると、間違えるのが怖くて、なかなか話せない人が多い。文法が完璧になってから話そうと考えるのだ。\n' +
      'しかし、実際には、話さないかぎり、上手にはならない。わたしの知っている留学生は、最初の半年、毎日のように間違いをして、笑われた。ところが、彼女はまったく気にしなかった。「間違えたら、直してもらえるからありがたい」と言うのである。一年後、彼女の日本語は、勉強ばかりしていた友人よりも、はるかに自然になっていた。\n' +
      '言葉は、試験のための知識ではなく、人と人をつなぐ道具である。完璧を目指すより、まず使ってみること。間違いは、上達への入り口にほかならない。',
    en:
      'When studying a foreign language, many people are afraid of mistakes and cannot speak easily. They think they will speak once their grammar is perfect. In reality, though, you do not get good unless you speak. An exchange student I know made mistakes almost every day for the first six months and was laughed at. But she did not mind at all. “If I make a mistake, someone corrects me, so I’m grateful,” she says. A year later her Japanese was far more natural than that of a friend who had only studied. Language is not knowledge for exams but a tool that connects people. Rather than aiming for perfection, first try using it. Mistakes are nothing other than the entrance to improvement.',
    vocab: [],
    grammar: ['nihokanaranai'],
    questions: [
      { q: '「彼女はまったく気にしなかった」とあるが、それはなぜか。', qEn: 'Why did she not mind at all?', options: ['間違えると直してもらえるので、ありがたいと考えていたから', '日本語が上手で、間違いがほとんどなかったから', '友達が一緒に笑ってくれたから', '間違いを覚えていなかったから'], answer: 0, why: 'She said that being corrected after a mistake is something to be grateful for.', type: 'inference' },
      { q: '一年後、留学生と、勉強ばかりしていた友人は、どうなっていたか。', qEn: 'After a year, how did the exchange student compare to the friend who only studied?', options: ['留学生のほうが、ずっと自然に話せるようになっていた', '二人とも同じくらい上手になっていた', '友人のほうが、ずっと自然に話せていた', '留学生は、話すのをやめてしまった'], answer: 0, why: 'Her Japanese had become far more natural than that of the friend who only studied.', type: 'detail' },
      { q: '筆者の主張に最も近いものはどれか。', qEn: 'Which is closest to the author’s claim?', options: ['完璧を待たずに言葉を使うことが、上達につながる', '文法を完璧にしてから話すべきだ', '留学すれば、誰でもすぐに上手になる', '間違いを笑う人とは話さないほうがいい'], answer: 0, why: 'The conclusion says: rather than aiming for perfection, use the language; mistakes lead to improvement.', type: 'main' },
    ],
  },
  {
    id: 'p_more_notice_library',
    title: '図書館の改装工事について',
    kind: 'notice',
    body:
      '市立図書館 改装工事のお知らせ\n' +
      '工事のため、次の期間は、本館の一階と二階を閉鎖いたします。\n' +
      '　期間：十一月一日（月）～十二月十七日（金）\n' +
      '　この間、本の貸し出しと返却は、駅前の分館でお願いいたします。ただし、分館に置いていない本は、お取り寄せに三日ほどかかります。\n' +
      'なお、返却だけでしたら、本館の入口にあるポストに入れていただくこともできます。三階の学習室は、これまでどおり利用できますが、工事の音が出る時間帯がございます。\n' +
      'ご不便をおかけいたしますが、ご理解とご協力をお願い申し上げます。',
    en:
      'Notice of renovation work at the city library. Because of construction, the first and second floors of the main building will be closed in the following period: Monday 1 November to Friday 17 December. During this time please borrow and return books at the branch in front of the station. However, books not kept at the branch take about three days to be brought in. If you only want to return books, you can also put them in the post box at the entrance of the main building. The study room on the third floor can be used as before, but there are times when construction noise occurs. We apologise for the inconvenience and ask for your understanding and cooperation.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '工事の期間中、本を借りたいときは、どうすればよいか。', qEn: 'During the work, what should you do to borrow a book?', options: ['駅前の分館に行く', '本館の三階に行く', '本館の入口のポストを使う', '工事が終わるまで待つ'], answer: 0, why: 'Borrowing and returning during the work is done at the branch in front of the station.', type: 'detail' },
      { q: '分館にない本を読みたいとき、どうなるか。', qEn: 'What happens if you want a book the branch does not have?', options: ['届くまでに三日ほどかかる', '本館に取りに行ける', '借りることができない', '次の日にすぐ届く'], answer: 0, why: 'The notice says it takes about three days to bring in books not kept at the branch.', type: 'detail' },
      { q: 'この期間中も使えるのは、どれか。', qEn: 'Which can still be used during this period?', options: ['三階の学習室', '一階の閲覧室', '二階の雑誌コーナー', '本館のすべての部屋'], answer: 0, why: 'Floors one and two close; the third-floor study room remains available (with some noise).', type: 'detail' },
    ],
  },
  {
    id: 'p_more_compare_remote',
    title: '在宅勤務について',
    kind: 'compare',
    body:
      '【A】在宅勤務には、利点が多い。通勤に使っていた時間を、家族と過ごしたり、勉強に使ったりすることができる。また、静かな環境のほうが、一人で集中して仕事を進められる。会社に行かなくても成果を出せる人は、わざわざ出社する必要はないだろう。\n' +
      '【B】在宅勤務は便利だが、問題もある。同僚と顔を合わせないと、ちょっとした相談ができず、仕事の悩みを一人でかかえてしまいやすい。特に、入社して間もない人は、周りの仕事のやり方を見て学ぶ機会が少なくなる。便利さだけで判断せず、会社に集まる日と、家で働く日を組み合わせるのがよいと思う。',
    en:
      '[A] Working from home has many advantages. You can use the commuting time to be with family or study. A quiet environment also lets you concentrate and get work done alone. People who can produce results without going to the office have no need to go in. [B] Working from home is convenient but has problems. If you do not see colleagues, you cannot have a quick consultation and tend to carry worries alone. Especially people who have just joined the company have fewer chances to learn by watching how others work. Without judging by convenience alone, I think it is good to combine days gathering at the office with days working at home.',
    vocab: ['tk_tsuukin'],
    grammar: [],
    questions: [
      { q: 'Aの筆者が、在宅勤務のよい点として挙げているのは何か。', qEn: 'What does writer A give as a good point of working from home?', options: ['集中しやすく、通勤の時間を自由に使えること', '同僚とすぐに相談できること', '新しい仕事のやり方を学べること', '会社の費用が安くなること'], answer: 0, why: 'A mentions free time from commuting and a quiet environment that helps concentration.', type: 'detail' },
      { q: 'Bの筆者が心配しているのは、どんなことか。', qEn: 'What is writer B worried about?', options: ['相談しにくく、新しい人が学ぶ機会も減ること', '通勤の時間が長くなること', '家で仕事に集中できないこと', '会社の成果が下がること'], answer: 0, why: 'B says it is hard to consult colleagues and newcomers have fewer chances to learn by watching.', type: 'detail' },
      { q: 'AとBの意見の違いについて、正しいものはどれか。', qEn: 'Which statement about the difference between A and B is correct?', options: ['Aは在宅勤務の利点を重視し、Bは会社に集まる日との組み合わせを勧めている', 'Aは在宅勤務に反対し、Bは賛成している', 'AもBも、全員が家で働くべきだと考えている', 'AもBも、在宅勤務はやめるべきだと考えている'], answer: 0, why: 'A stresses advantages; B accepts convenience but recommends mixing office days and home days.', type: 'main' },
    ],
  },
  {
    id: 'p_more_letter_teacher',
    title: '恩師へのお礼の手紙',
    kind: 'letter',
    body:
      '山田先生\n' +
      '秋も深まってまいりましたが、お元気でいらっしゃいますか。\n' +
      '先日は、お忙しい中、わたしの結婚式にお越しくださり、本当にありがとうございました。先生のスピーチを聞いて、高校時代に「失敗を恐れずに挑戦しなさい」と言われたことを思い出しました。あの言葉があったからこそ、今の仕事を選ぶことができたと思っております。\n' +
      '来月、新しい職場で、初めてのプロジェクトを任されることになりました。不安もありますが、先生の教えを胸に、頑張るつもりです。\n' +
      'どうぞ、お体に気をつけてお過ごしください。近いうちに、また、ごあいさつに伺います。',
    en:
      'Dear Mr. Yamada, autumn is deepening; are you well? The other day, thank you very much for coming to my wedding despite being busy. Hearing your speech, I remembered you telling me in high school to “take on challenges without fearing failure”. It is because of those words that I could choose my present job. Next month I will be entrusted with my first project at my new workplace. I am anxious too, but keeping your teaching in mind I intend to do my best. Please take care of yourself. I will visit again soon to greet you.',
    vocab: [],
    grammar: ['karakoso'],
    questions: [
      { q: '「あの言葉」とは、どんな言葉か。', qEn: 'What are “those words”?', options: ['失敗を恐れずに挑戦しなさい', '結婚してから仕事を探しなさい', '先生のように教師になりなさい', '体に気をつけて頑張りなさい'], answer: 0, why: 'It refers to the teacher’s high-school advice: take on challenges without fearing failure.', type: 'expression' },
      { q: '手紙を書いた人は、来月、何をする予定か。', qEn: 'What is the writer going to do next month?', options: ['新しい職場で初めてのプロジェクトを担当する', '山田先生の家を訪ねる', '新しい職場を探し始める', '結婚式の準備をする'], answer: 0, why: 'She will be entrusted with her first project at the new workplace next month.', type: 'detail' },
      { q: 'この手紙を書いた主な目的は何か。', qEn: 'What is the main purpose of this letter?', options: ['結婚式に来てもらったお礼を伝えること', '仕事の悩みを相談すること', '結婚式に招待すること', '先生の近況をたずねること'], answer: 0, why: 'The letter mainly thanks the teacher for attending the wedding and his influence.', type: 'intent' },
    ],
  },
  {
    id: 'p_more_essay_convenience',
    title: '便利になった暮らし',
    kind: 'essay',
    body:
      '最近は、スマートフォン一つで、買い物も、道案内も、支払いも済ませることができる。たしかに、これほど便利な時代はない。\n' +
      'しかし、便利になるにつれて、失ったものもあるのではないだろうか。以前は、知らない町で道に迷うと、近くの人に声をかけるしかなかった。そこから、思いがけない会話が生まれ、旅の思い出になったりしたものだ。今は、地図の指示どおりに歩けば、誰とも話さずに目的地に着ける。\n' +
      'もちろん、便利さを否定するつもりはない。ただ、便利な道具に頼りきるのではなく、ときには、あえて遠回りをしてみる余裕を持ちたいと思う。',
    en:
      'Nowadays, with just a smartphone you can finish shopping, directions and payment. Certainly there has never been such a convenient age. But as things became convenient, may we not have lost something too? Before, if you got lost in an unfamiliar town you had no choice but to call out to someone nearby. From that, unexpected conversations arose and became memories of the trip. Now, if you walk as the map instructs, you arrive at your destination without talking to anyone. Of course I do not intend to deny convenience. But rather than relying completely on convenient tools, I would like to keep the leeway to deliberately take a detour sometimes.',
    vocab: [],
    grammar: ['nitsurete'],
    questions: [
      { q: '筆者は、便利になったことで、何を失ったかもしれないと考えているか。', qEn: 'What does the author think we may have lost through convenience?', options: ['見知らぬ人との思いがけない会話', '買い物をする楽しみ', '地図を読む力', '旅行に行く時間'], answer: 0, why: 'Getting lost used to lead to unexpected conversations that became travel memories.', type: 'detail' },
      { q: '「あえて遠回りをしてみる」とは、どういうことか。', qEn: 'What does “deliberately take a detour” mean here?', options: ['便利な方法を選ばず、時間をかけてみること', '道に迷ったまま歩き続けること', '地図を見ないで目的地へ行くこと', '遠い場所へ旅行すること'], answer: 0, why: 'It means not always relying on the convenient way, but sometimes spending extra time on purpose.', type: 'expression' },
      { q: '筆者の考えに合っているものはどれか。', qEn: 'Which matches the author’s view?', options: ['便利さを認めながらも、頼りすぎないようにしたい', '便利な道具は使わないほうがよい', '昔の暮らしのほうが、すべての面で優れていた', 'スマートフォンは旅行には向かない'], answer: 0, why: 'He does not deny convenience but wants not to rely on it completely.', type: 'main' },
    ],
  },
];

export const MORE_LISTENING: ListeningItem[] = [
  {
    id: 'pl_more_hotel',
    title: '課題理解：ホテルのフロントで',
    lines: [
      { who: '女', jp: 'すみません、今夜から二泊で予約している鈴木ですが。', voice: 'f' },
      { who: '男', jp: '鈴木様ですね。お待ちしておりました。あいにく、ご予約の禁煙のお部屋が、お掃除に時間がかかっておりまして。', voice: 'm' },
      { who: '女', jp: 'ええ、そうなんですか。どのくらい待てばいいですか。', voice: 'f' },
      { who: '男', jp: '三十分ほどお待ちいただければ。お待ちの間、お荷物はこちらでお預かりして、一階のラウンジで、コーヒーをどうぞ。', voice: 'm' },
      { who: '女', jp: 'ありがとうございます。じゃあ、荷物をお願いします。', voice: 'f' },
    ],
    en: 'W: Excuse me, I’m Suzuki, booked for two nights from tonight. M: Ms. Suzuki, we have been expecting you. Unfortunately the non-smoking room you booked is taking time to clean. W: Oh, is that so? How long should I wait? M: If you could wait about thirty minutes. While you wait, we will keep your luggage here, and please have a coffee in the ground-floor lounge. W: Thank you. Then please take my luggage.',
    vocab: [],
    questions: [
      { q: '女の人は、このあと、まず何をしますか。', qEn: 'What will the woman do first?', options: ['荷物を預けて、ラウンジで待つ', '別のホテルを探す', 'すぐに部屋に入る', '部屋の掃除を手伝う'], answer: 0, why: 'She leaves her luggage with the front desk and waits in the lounge for about thirty minutes.', type: 'main' },
    ],
  },
  {
    id: 'pl_more_shop_return',
    title: 'ポイント理解：靴の返品',
    lines: [
      { who: '男', jp: 'この靴、先週買ったんですが、サイズが少し小さくて。', voice: 'm' },
      { who: '女', jp: '申し訳ございません。お買い上げから七日以内で、まだ履いておられなければ、交換できます。', voice: 'f' },
      { who: '男', jp: '家の中で一回だけ履いたんですけど、だめですか。', voice: 'm' },
      { who: '女', jp: '室内で軽く履かれた程度でしたら、問題ございません。レシートはお持ちですか。', voice: 'f' },
      { who: '男', jp: 'あ、レシート、家に忘れてきました。', voice: 'm' },
      { who: '女', jp: 'それでは、レシートをお持ちになってから、もう一度お越しください。', voice: 'f' },
    ],
    en: 'M: I bought these shoes last week but the size is a bit small. W: I’m sorry. Within seven days of purchase, if they haven’t been worn, they can be exchanged. M: I wore them once inside the house; is that no good? W: If they were only lightly worn indoors, that is no problem. Do you have the receipt? M: Oh, I left the receipt at home. W: Then please come again after you bring the receipt.',
    vocab: [],
    questions: [
      { q: '男の人は、どうして靴を交換できませんでしたか。', qEn: 'Why could the man not exchange the shoes?', options: ['レシートを持ってきていなかったから', '買ってから七日以上たっていたから', '何度も外で履いたから', '同じサイズの靴がなかったから'], answer: 0, why: 'He wore them only lightly indoors, which is fine, but he forgot the receipt at home.', type: 'detail' },
    ],
  },
  {
    id: 'pl_more_lecture_sleep',
    title: '概要理解：睡眠についての話',
    lines: [
      { who: '女', jp: '皆さんは、睡眠時間を削って、勉強や仕事をしたことがありますか。', voice: 'f' },
      { who: '女', jp: '実は、睡眠が足りないと、集中力が落ちるだけでなく、覚えたことを頭に定着させる力も弱くなります。', voice: 'f' },
      { who: '女', jp: 'ある研究では、同じ内容を勉強した二つのグループのうち、よく寝たグループのほうが、翌日のテストの成績がよかったそうです。', voice: 'f' },
      { who: '女', jp: 'ですから、試験の前の晩は、遅くまで頑張るより、いつもどおり寝るほうが効果的だと言えるでしょう。', voice: 'f' },
    ],
    en: 'W: Have you ever cut your sleep to study or work? In fact, if you lack sleep, not only does concentration fall, but the power to fix what you learned in your head also weakens. In one study, of two groups that studied the same content, the group that slept well scored better on the next day’s test. So, the night before an exam, sleeping as usual can be said to be more effective than working hard until late.',
    vocab: [],
    questions: [
      { q: '話の内容に合っているものはどれですか。', qEn: 'Which matches the content of the talk?', options: ['試験の前の晩は、いつもどおり寝るほうが効果的だ', '睡眠時間が短いほど、記憶力はよくなる', '勉強したあとは、何も考えずに寝るべきだ', '遅くまで勉強すると、成績が上がる'], answer: 0, why: 'The speaker concludes that sleeping as usual the night before an exam is more effective.', type: 'main' },
    ],
  },
  {
    id: 'pl_more_office_plan',
    title: '課題理解：会議室の予約',
    lines: [
      { who: '男', jp: '来週の木曜日、午後に会議室を使いたいんだけど、空いてるかな。', voice: 'm' },
      { who: '女', jp: 'ええと、二時から三時までは、営業部が使っています。三時以降なら大丈夫です。', voice: 'f' },
      { who: '男', jp: '三時からだと、一時間じゃ足りないんだよね。会議は二時間の予定だから。', voice: 'm' },
      { who: '女', jp: 'それなら、午前中はどうですか。十時から十二時まで、空いていますよ。', voice: 'f' },
      { who: '男', jp: 'じゃあ、午前にしようかな。参加者に連絡してみるよ。', voice: 'm' },
    ],
    en: 'M: Next Thursday afternoon I’d like to use the meeting room; is it free? W: Well, from two to three the sales department is using it. After three it is fine. M: From three one hour isn’t enough; the meeting is planned for two hours. W: Then how about the morning? It is free from ten to twelve. M: Then maybe I’ll make it the morning. I’ll contact the participants.',
    vocab: [],
    questions: [
      { q: '男の人は、このあとまず何をしますか。', qEn: 'What will the man do next?', options: ['参加者に午前でよいか連絡する', '営業部に部屋をゆずってもらう', '会議を一時間に短くする', '三時からの時間に予約する'], answer: 0, why: 'He decides on the morning slot and says he will contact the participants.', type: 'main' },
    ],
  },
  {
    id: 'pl_more_weather_news',
    title: 'ポイント理解：天気予報',
    lines: [
      { who: '女', jp: '明日の天気です。午前中は晴れますが、午後からは雲が広がり、夕方には、雨が降り出すでしょう。', voice: 'f' },
      { who: '女', jp: '雨は夜遅くまで続き、場所によっては、激しく降るおそれがあります。', voice: 'f' },
      { who: '女', jp: '気温は、今日より五度ほど低くなりますので、お出かけの際は、上着と、折りたたみの傘をお持ちください。', voice: 'f' },
    ],
    en: 'W: Tomorrow’s weather. It will be fine in the morning, but clouds spread from the afternoon and it will start raining by evening. The rain continues until late at night and may fall hard in places. The temperature will be about five degrees lower than today, so when going out please take a jacket and a folding umbrella.',
    vocab: [],
    questions: [
      { q: '明日、出かけるとき、何を持っていくとよいと言っていますか。', qEn: 'What does she recommend taking when going out tomorrow?', options: ['上着と折りたたみの傘', '帽子とサングラス', '長い傘だけ', '何も必要ない'], answer: 0, why: 'It gets colder and rains from the evening, so a jacket and a folding umbrella are recommended.', type: 'detail' },
    ],
  },
  {
    id: 'pl_more_club_talk',
    title: '統合理解：サークルの選び方',
    lines: [
      { who: '女', jp: '新入生の皆さん、サークルは決まりましたか。わたしは、テニスと写真のどちらにするか、まだ迷っています。', voice: 'f' },
      { who: '男', jp: 'テニスは、週に三回練習があって、体力的に大変だけど、友達が増えやすいよ。', voice: 'm' },
      { who: '男', jp: '写真は、週に一回で、のんびりしているけど、撮影旅行のお金が、少しかかる。', voice: 'm' },
      { who: '女', jp: 'わたし、アルバイトもしたいから、あまり時間も、お金も使えないんです。', voice: 'f' },
      { who: '男', jp: 'それなら、きみには、写真より、テニスのほうが向いているかもしれないね。', voice: 'm' },
      { who: '女', jp: 'ううん、練習が週三回だと、バイトとの両立が難しいから、やっぱり、写真にします。', voice: 'f' },
    ],
    en: 'W: New students, have you decided on a club? I am still torn between tennis and photography. M: Tennis has practice three times a week and is hard physically, but it is easy to make friends. Photography is once a week and relaxed, but the shooting trips cost a bit of money. W: I also want a part-time job, so I can’t spend much time or money. M: In that case tennis may suit you better than photography. W: No, with practice three times a week, balancing it with the job is hard, so after all I’ll choose photography.',
    vocab: [],
    questions: [
      { q: '女の人は、どのサークルに入ることにしましたか。また、その理由は何ですか。', qEn: 'Which club did the woman decide to join, and why?', options: ['写真。練習が週一回で、アルバイトと両立しやすいから', 'テニス。友達ができやすいから', '写真。撮影旅行にたくさん行きたいから', 'テニス。体力をつけたいから'], answer: 0, why: 'Photography is once a week, which she can combine with a part-time job.', type: 'main' },
    ],
  },
];
