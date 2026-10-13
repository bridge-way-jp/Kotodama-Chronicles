import type { ListeningItem, ReadingText } from '../core/types';

/**
 * More exam-style reading and listening practice, on everyday life and society in Japan (the topics of the
 * Japan notebook). Original texts, NOT official JLPT material. The right option is first; the exam builder shuffles.
 */

export const SOCIETY_READING: ReadingText[] = [
  {
    id: 'p_kaso_essay',
    title: '故郷の小学校',
    kind: 'essay',
    body:
      '先月、十年ぶりに故郷の町に帰った。駅前の商店街は、ほとんどの店のシャッターが閉まっていた。子どもの頃によく通った文房具店も、もうなかった。\n' +
      '町の人口は、ここ二十年で半分近くに減ったそうだ。若い人は仕事を求めて都会へ出ていき、残っているのはお年寄りが多い。わたしが通っていた小学校も、三年前に{廃校|はいこう}になった。\n' +
      'ところが、その校舎は今、地元の人たちが運営するカフェになっていた。教室だった場所で、お年寄りがお茶を飲みながら笑っている。黒板には、観光客が書いた「ありがとう」の文字が並んでいた。\n' +
      '町が小さくなっていくのを止めることは、おそらくできない。それでも、失われたものの{跡|あと}に新しい人の流れが生まれることもあるのだと、わたしは少し安心した。',
    en:
      'Last month I went back to my hometown for the first time in ten years. Most shops on the street in front of the station had their shutters down. The stationery shop I used to visit as a child was gone. The population has reportedly almost halved in twenty years. Young people went to the cities for work; many of those left are elderly. My old primary school closed three years ago. But the building is now a café run by local people. Elderly people laugh over tea in what used to be a classroom. On the blackboard are “thank you” messages written by tourists. Probably the town’s shrinking cannot be stopped. Still, I felt a little relieved that a new flow of people can appear where something was lost.',
    vocab: ['kaso'],
    grammar: [],
    questions: [
      { q: '筆者の故郷の町では、この二十年でどんな変化があったか。', qEn: 'What change has happened in the author’s hometown over the last twenty years?', options: ['人口が半分近くに減った', '観光客が半分に減った', '商店街の店が増えた', '小学校が二つになった'], answer: 0, why: '「人口は、ここ二十年で半分近くに減った」とある。', type: 'detail' },
      { q: '小学校の校舎は、今どうなっているか。', qEn: 'What has become of the school building?', options: ['地元の人が運営するカフェになっている', '観光客のための宿になっている', '今も小学校として使われている', '取り壊されて、なくなった'], answer: 0, why: '「その校舎は今、地元の人たちが運営するカフェになっていた」とある。', type: 'detail' },
      { q: '筆者がこの文章で一番伝えたいことは何か。', qEn: 'What is the author’s main point?', options: ['町が小さくなっても、新しい動きが生まれることもある', '故郷には二度と帰りたくない', '廃校はすべてカフェにするべきだ', '観光客は町の生活をじゃましている'], answer: 0, why: '最後の段落に「失われたものの跡に新しい人の流れが生まれることもある」とある。', type: 'main' },
    ],
  },
  {
    id: 'p_guesthouse_notice',
    title: 'ご宿泊のお客様へ',
    kind: 'notice',
    body:
      '当宿は、{古|ふる}い町家を改装した宿です。近所には、昔からお住まいの方がたくさんいらっしゃいます。\n' +
      '次のことに、ご協力をお願いいたします。\n' +
      '一、夜十時以降は、玄関や{路地|ろじ|v:ky_roji}での大声での会話をお控えください。\n' +
      '二、近所の家や{私有地|しゆうち}への立ち入り、無断での写真撮影はご遠慮ください。\n' +
      '三、ごみは、分別して指定の場所にお出しください。\n' +
      '最近、観光客の増加により、地域の方から苦情が寄せられております。皆様のご理解をお願いいたします。',
    en:
      'This inn is a renovated old townhouse. Many long-time residents live nearby. Please cooperate: 1. After 10 p.m. refrain from loud talk at the entrance and in the lane. 2. Please refrain from entering neighbours’ houses or private land and from taking photos without permission. 3. Please sort your rubbish and put it in the designated place. Recently, with more tourists, complaints have been received from local residents. We ask for your understanding.',
    vocab: ['ky_roji', 'ky_hikaeru'],
    grammar: [],
    questions: [
      { q: 'この文書は、何のために書かれたか。', qEn: 'Why was this notice written?', options: ['近所に迷惑をかけないように、客に協力を頼むため', '宿の料金が上がることを知らせるため', '近所の人に宿の見学を勧めるため', '観光客の数を減らすため'], answer: 0, why: '近所の苦情があるので、静かにする・無断で撮影しないなどの協力をお願いしている。', type: 'intent' },
      { q: '夜十時以降にしてはいけないことは何か。', qEn: 'What must not be done after 10 p.m.?', options: ['玄関や路地で大声で話すこと', '部屋で静かに過ごすこと', 'ごみを分別すること', '玄関の鍵をかけること'], answer: 0, why: '一番目に「夜十時以降は、玄関や路地での大声での会話をお控えください」とある。', type: 'detail' },
    ],
  },
  {
    id: 'p_polite_refusal',
    title: '取引先へのメール',
    kind: 'letter',
    body:
      '件名：ご提案について\n' +
      '株式会社山田商店　鈴木様\n' +
      'いつもお世話になっております。\n' +
      'このたびは、新商品についてのご提案をいただき、誠にありがとうございました。社内で慎重に検討いたしましたが、今期は予算の都合もあり、{見送|みおく}らせていただくことになりました。\n' +
      'せっかくお時間をいただいたにもかかわらず、ご期待に添えず申し訳ございません。\n' +
      'また機会がございましたら、ぜひよろしくお願いいたします。',
    en:
      'Subject: About your proposal. To Mr. Suzuki, Yamada Shoten. Thank you for your continued support. Thank you very much for your proposal on the new product. We considered it carefully within the company, but because of budget circumstances this term, we have decided to pass. We are sorry we cannot meet your expectations even though you took the time. If there is another opportunity, we look forward to working with you.',
    vocab: [],
    grammar: ['nimokakawarazu'],
    questions: [
      { q: 'このメールの内容として、正しいものはどれか。', qEn: 'Which is correct about this email?', options: ['提案を受け入れないことを、ていねいに伝えている', '提案を喜んで受け入れると伝えている', '予算を増やしてほしいと頼んでいる', '新しい商品の説明を求めている'], answer: 0, why: '「見送らせていただく」は、受け入れない（断る）ことをていねいに言う表現。', type: 'main' },
      { q: '「ご期待に添えず」は、ここではどんな意味か。', qEn: 'What does 「ご期待に添えず」 mean here?', options: ['相手が望んだ答えを出せなくて', '相手の期待を超えてしまって', '約束の時間に遅れてしまって', '相手の話をよく聞けなくて'], answer: 0, why: '「期待に添う」= to meet the expectation. 添えず = could not meet it.', type: 'expression' },
    ],
  },
  {
    id: 'p_akiya_notice',
    title: '空き家バンクのご案内',
    kind: 'notice',
    body:
      '{空|あ}き家の{活用|かつよう}にご協力ください\n' +
      '当町では、住む人がいなくなった家を、新しく町に住みたい方に紹介する「空き家バンク」を行っています。\n' +
      '家を貸したい・売りたい方は、町役場の窓口にお申し込みください。{登録|とうろく}は無料です。\n' +
      '借りたい・買いたい方には、町が{改修|かいしゅう}費用の一部を{補助|ほじょ}する場合があります。ただし、補助を受けるには、五年以上この町に住むことが条件です。\n' +
      '{詳|くわ}しくは、町役場の企画課までお問い合わせください。',
    en:
      'Please help us use empty houses. Our town runs an “akiya bank” that introduces houses whose residents have gone to people who want to move here. If you want to rent out or sell a house, apply at the town hall. Registration is free. For those who want to rent or buy, the town may subsidise part of the renovation cost. However, to receive the subsidy you must live in the town for at least five years. For details, contact the planning section of the town hall.',
    vocab: [],
    grammar: [],
    questions: [
      { q: '補助を受けるための条件は何か。', qEn: 'What is the condition for receiving the subsidy?', options: ['五年以上、この町に住むこと', '家を町に売ること', '町役場で働くこと', '登録の料金を払うこと'], answer: 0, why: '「補助を受けるには、五年以上この町に住むことが条件です」とある。', type: 'detail' },
      { q: 'この文章の内容に合うものはどれか。', qEn: 'Which matches the text?', options: ['家を貸したい人は、無料で登録できる', '家を買う人は、必ず補助がもらえる', '空き家バンクは、町の外の人だけが使える', '申し込みは、電話でしか受け付けない'], answer: 0, why: '「登録は無料です」とある。補助は「場合がある」で、必ずではない。', type: 'detail' },
    ],
  },
  {
    id: 'p_first_year_essay',
    title: '新入社員の一年目',
    kind: 'essay',
    body:
      '四月に入社してから、もうすぐ一年になる。最初の数か月は、毎日が緊張の連続だった。電話の取り方も、メールの書き方も、すべて先輩に教えてもらわなければならなかった。\n' +
      '先輩は、よく「わからないことは、すぐ聞いて」と言ってくれた。しかし、忙しそうな先輩を見ると、なかなか声をかけられなかった。結局、一人で悩んで、仕事が遅れてしまったこともある。\n' +
      'ある日、上司に言われた。「聞くのは、迷惑をかけることではない。聞かないで{間違|まちが}えるほうが、ずっと迷惑なんだよ」。\n' +
      'それから、わたしは{遠慮|えんりょ}しないで質問するようにした。すると、不思議なことに、先輩たちのほうから「最近どう？」と声をかけてくれるようになった。',
    en:
      'It will soon be a year since I joined the company in April. For the first months every day was tension. I had to be taught everything by my seniors, from answering the phone to writing emails. My seniors often said, “Ask right away if you do not understand.” But seeing them look busy, I could not bring myself to speak. In the end I sometimes worried alone and my work was delayed. One day my boss told me: “Asking is not causing trouble. Making mistakes without asking is much more trouble.” After that I began asking without holding back. Strangely, my seniors started to say to me, “How are you doing lately?”',
    vocab: ['enryo'],
    grammar: [],
    questions: [
      { q: '筆者が先輩に質問できなかったのは、なぜか。', qEn: 'Why couldn’t the author ask seniors questions?', options: ['先輩が忙しそうで、声をかけにくかったから', '先輩がとてもこわかったから', '質問することが禁止されていたから', '質問したいことがなかったから'], answer: 0, why: '「忙しそうな先輩を見ると、なかなか声をかけられなかった」とある。', type: 'detail' },
      { q: '上司の言葉の意味に、最も近いものはどれか。', qEn: 'Which is closest to the boss’s words?', options: ['聞かないで失敗するより、聞くほうがいい', '質問は、仕事が終わってからするべきだ', '間違えても、気にしなくていい', '先輩には、あまり質問しないほうがいい'], answer: 0, why: '「聞かないで間違えるほうが、ずっと迷惑」= asking is better than failing silently.', type: 'inference' },
      { q: '筆者の変化について、正しいものはどれか。', qEn: 'What is true about the author’s change?', options: ['遠慮しないで質問したら、先輩のほうから声をかけてくれるようになった', '質問をやめたら、仕事が速くなった', '上司に怒られて、会社を辞めたくなった', '先輩に質問されることが増えた'], answer: 0, why: '最後に「先輩たちのほうから『最近どう？』と声をかけてくれるようになった」とある。', type: 'main' },
    ],
  },
];

export const SOCIETY_LISTENING: ListeningItem[] = [
  {
    id: 'pl_bus_announce',
    title: '課題理解：電車のアナウンス',
    lines: [
      { who: '女', jp: 'ご乗車ありがとうございます。この電車は、混雑のため、約五分遅れて運転しております。', voice: 'f' },
      { who: '女', jp: 'お急ぎのところ、ご迷惑をおかけして申し訳ございません。なお、次の停留所では、お降りのお客様を先にお通しください。', voice: 'f' },
    ],
    en: 'F: Thank you for riding. Because of crowding, this service is running about five minutes late. We apologise for the inconvenience to those in a hurry. At the next stop, please let passengers getting off pass first.',
    vocab: [],
    questions: [
      { q: 'この放送で、客にお願いしていることは何ですか。', qEn: 'What does the announcement ask passengers to do?', options: ['降りる人を先に通すこと', '五分待つこと', '別の乗り物に乗りかえること', '席をゆずること'], answer: 0, why: '「お降りのお客様を先にお通しください」とある。', type: 'detail' },
    ],
  },
  {
    id: 'pl_guesthouse_rules',
    title: 'ポイント理解：宿のルール',
    lines: [
      { who: '女', jp: 'いらっしゃいませ。ご予約のマリア様ですね。お部屋は二階の奥です。', voice: 'f' },
      { who: '女', jp: '玄関で靴を脱いで、このスリッパをお使いください。お風呂は夜十一時までです。', voice: 'f' },
      { who: '男', jp: '十一時までですね。ごみは、どうしたらいいですか。', voice: 'm' },
      { who: '女', jp: '部屋のごみ箱に、燃えるものと、びん・缶を分けて入れておいてください。朝、わたしが集めますので。', voice: 'f' },
    ],
    en: 'F: Welcome. You are Ms. Maria with the reservation? Your room is at the back of the second floor. Please take your shoes off at the entrance and use these slippers. The bath is open until 11 p.m. M: Until eleven. What should I do about rubbish? F: In the room bin, please separate burnable items from bottles and cans. I will collect it in the morning.',
    vocab: [],
    questions: [
      { q: 'ごみについて、客は何をしなければなりませんか。', qEn: 'What must the guest do about rubbish?', options: ['燃えるものとびん・缶を分けて入れる', '朝、自分で外に出す', 'フロントにまとめて持っていく', 'そのまま部屋に置いておく'], answer: 0, why: '「燃えるものと、びん・缶を分けて入れておいてください」と言っている。', type: 'detail' },
      { q: 'お風呂は、何時まで使えますか。', qEn: 'Until when can the bath be used?', options: ['夜十一時まで', '夜十時まで', '朝まで', '夕方五時まで'], answer: 0, why: '「お風呂は夜十一時までです」と言っている。', type: 'detail' },
    ],
  },
  {
    id: 'pl_polite_decline',
    title: '概要理解：誘いの返事',
    lines: [
      { who: '男', jp: '田中さん、今度の金曜日、みんなで飲みに行くんだけど、一緒にどう？', voice: 'm' },
      { who: '女', jp: 'あ、金曜日ですか。ありがとうございます。ちょっと、その日は……。', voice: 'f' },
      { who: '男', jp: 'そっか。じゃあ、また今度ね。', voice: 'm' },
      { who: '女', jp: 'はい、すみません。また誘ってください。', voice: 'f' },
    ],
    en: 'M: Ms. Tanaka, this Friday we are all going for drinks. Want to join? F: Oh, Friday? Thank you. That day is a bit… M: I see. Then another time. F: Yes, sorry. Please invite me again.',
    vocab: [],
    questions: [
      { q: '女の人は、金曜日の誘いにどう答えましたか。', qEn: 'How did the woman answer the Friday invitation?', options: ['はっきり言わずに、断った', 'すぐに行くと答えた', '行くかどうか、あとで連絡すると言った', '男の人を別の日に誘った'], answer: 0, why: '「ちょっと、その日は……」は、はっきり言わずに断る言い方。男の人も「また今度ね」と受け取っている。', type: 'inference' },
    ],
  },
  {
    id: 'pl_clinic_reservation',
    title: '課題理解：診療所の電話',
    lines: [
      { who: '男', jp: 'はい、雪見診療所です。', voice: 'm' },
      { who: '女', jp: 'あの、明日の午前中に診てもらいたいんですが、予約はできますか。', voice: 'f' },
      { who: '男', jp: '明日は九時半か十一時なら空いています。初めてでしたら、保険証をお持ちくださいね。', voice: 'm' },
      { who: '女', jp: 'じゃあ、九時半でお願いします。保険証は、今日のうちに探しておきます。', voice: 'f' },
    ],
    en: 'M: Yukimi Clinic. F: I would like to be seen tomorrow morning; can I make a reservation? M: Tomorrow 9:30 or 11:00 are free. If it is your first time, please bring your insurance card. F: Then 9:30 please. I will look for my insurance card today.',
    vocab: [],
    questions: [
      { q: '女の人は、このあと何をしますか。', qEn: 'What will the woman do next?', options: ['保険証を探す', '十一時に電話をかけ直す', '診療所に保険証を送る', '予約をキャンセルする'], answer: 0, why: '「保険証は、今日のうちに探しておきます」と言っている。', type: 'detail' },
    ],
  },
];
