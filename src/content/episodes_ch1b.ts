import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 1, second round: the station attendant, Dr. Kirishima, Mr. Satō. */
export const EPISODES_CH1B: Episode[] = [
  // ------------------------------------------------------------------ the station attendant: the last ticket gate
  {
    id: 'ep_station_staff',
    chapter: 1,
    after: 'mq4',
    who: 'station_staff',
    title: ['最後の改札係', 'The Last Man at the Ticket Gate', 'Der letzte Mann an der Sperre'],
    summary: [
      'Hinomori station is getting automatic gates. The young attendant is afraid there will be no place left for him.',
      'Der Bahnhof Hinomori bekommt automatische Sperren. Der junge Bahnhofsangestellte fürchtet, dass es für ihn keinen Platz mehr gibt.',
    ],
    scenes: [
      {
        at: 'station_staff',
        goal: ['Ask the station attendant why he looks worried', 'Frag den Bahnhofsangestellten, warum er besorgt aussieht'],
        lines: [
          l('station_staff', 'あ、おはようございます。……来月から、この駅の改札は全部{自動|じどう|v:n3_0065}になるんです。', [
            'Ah, good morning. …From next month, all the ticket gates at this station will be automatic.',
            'Ah, guten Morgen. …Ab nächsten Monat werden alle Sperren an diesem Bahnhof automatisch.',
          ], 'worried'),
          l('station_staff', '電車の{時刻|じこく|v:n3_0034}を{正確|せいかく|v:n3_0260}に案内するのも、機械のほうが上手です。僕なんか、いらなくなる。……{失業|しつぎょう|v:n3_0050}するかもしれません。', [
            'Machines are better at announcing the train times accurately too. They won’t need someone like me any more. …I might lose my job.',
            'Auch die Abfahrtszeiten sagen Maschinen genauer an. Jemanden wie mich braucht man dann nicht mehr. …Vielleicht werde ich arbeitslos.',
          ], 'worried'),
          l('station_staff', '本当は運転士になりたかったんです。でも、目の検査で落ちて。この{職業|しょくぎょう|v:n3_0161}は、二番目の夢でした。', [
            'Actually I wanted to become a train driver. But I failed the eye test. This job was my second dream.',
            'Eigentlich wollte ich Lokführer werden. Aber ich bin beim Sehtest durchgefallen. Dieser Beruf war mein zweiter Traum.',
          ]),
          l('station_staff', '毎朝、バス停から来る{乗客|じょうきゃく|v:n3_0132}のおばあさんがいて……。機械に「おはよう」なんて言う{わけがない||g:wakeganai}ですよね。', [
            'There’s an old lady who comes every morning from the bus stop… A machine would never say “good morning” to her, would it?',
            'Jeden Morgen kommt eine alte Dame von der Bushaltestelle… Eine Maschine sagt ihr doch niemals „Guten Morgen“, oder?',
          ]),
        ],
        teach: ['v:n3_0065', 'v:n3_0034', 'v:n3_0260', 'v:n3_0050', 'v:n3_0161', 'v:n3_0132', 'g:wakeganai'],
      },
      {
        at: 'town_busstop',
        goal: ['Meet the old lady at the bus stop at dawn', 'Triff die alte Dame im Morgengrauen an der Bushaltestelle'],
        music: 'memory',
        lines: [
          nar('{明け方|あけがた|v:n2_0132}のバス停。小さなおばあさんが、ゆっくり駅のほうへ歩いていく。', ['The bus stop at dawn. A small old lady walks slowly towards the station.', 'Die Bushaltestelle im Morgengrauen. Eine kleine alte Dame geht langsam zum Bahnhof.']),
          nar('「{実は|じつは|v:n3_0060}ね、目がほとんど見えないの。でも、毎朝、改札のあの子の声が{合図|あいず|v:n3_0298}なのよ」', [
            '“The truth is, I can hardly see. But every morning, that boy’s voice at the gate is my signal.”',
            '„Weißt du, ich sehe fast nichts mehr. Aber jeden Morgen ist die Stimme des Jungen an der Sperre mein Zeichen.“',
          ]),
          nar('「『おはようございます、三番線です』って言ってくれるの。{信号|しんごう|v:n3_0187}より、あの声のほうが安心するわ」', [
            '“He says, ‘Good morning, platform three.’ That voice reassures me more than any signal.”',
            '„Er sagt: ‚Guten Morgen, Gleis drei.‘ Diese Stimme beruhigt mich mehr als jedes Signal.“',
          ]),
          nar('「病院に通う{姿|すがた|v:n3_0219}を、毎日見ていてくれる。{親しい|したしい|v:n3_0048}人は、もうあの子くらいしかいないのよ」', [
            '“He sees me going to the hospital every day. He is almost the only person close to me left.”',
            '„Er sieht mich jeden Tag zum Krankenhaus gehen. Er ist fast der einzige Mensch, der mir noch nahesteht.“',
          ]),
        ],
        teach: ['v:n2_0132', 'v:n3_0060', 'v:n3_0298', 'v:n3_0187', 'v:n3_0219', 'v:n3_0048'],
      },
      {
        at: 'station_staff',
        goal: ['Tell the station attendant what the old lady said', 'Erzähl dem Bahnhofsangestellten, was die alte Dame gesagt hat'],
        lines: [
          l('station_staff', '……目が、見えなかったんですか。毎朝、僕の声で、ホームを探していた……。', ['…She can’t see? Every morning she was finding the platform by my voice…', '…Sie kann nicht sehen? Jeden Morgen hat sie den Bahnsteig an meiner Stimme gefunden…'], 'surprised'),
          l('station_staff', '入社して{以来||g:x_ijou}、案内は機械と同じ仕事だと思っていました。でも、声には、人を{信頼|しんらい|v:n3_0205}させる力があるんですね。', [
            'Ever since I joined, I thought announcing was the same work a machine does. But a voice has the power to make people trust you.',
            'Seit ich hier angefangen habe, dachte ich, Ansagen sind dieselbe Arbeit, die eine Maschine macht. Aber eine Stimme kann Menschen Vertrauen geben.',
          ]),
          ask(
            ['機械にはできない仕事ですね', ['That’s work a machine can’t do.', 'Das ist Arbeit, die keine Maschine kann.']],
            ['駅長さんに、話してみたら？', ['Why not tell the stationmaster?', 'Warum erzählen Sie es nicht dem Bahnhofsvorsteher?']],
          ),
          l('station_staff', '駅長に話します。改札が自動でも、困っている人を案内する係は、なくなり{得ない||g:x_eru}って。それが、駅員の{責任|せきにん|v:n3_0287}だと思うから。', [
            'I’ll tell the stationmaster. Even with automatic gates, someone to guide people in trouble can’t disappear. Because I think that is a station attendant’s responsibility.',
            'Ich spreche mit dem Bahnhofsvorsteher. Auch mit automatischen Sperren kann es nicht sein, dass niemand mehr da ist, der Menschen in Not hilft. Denn das ist die Verantwortung eines Bahnhofsangestellten.',
          ], 'happy'),
          pic('cg_board', '朝の日野森駅。新しい自動改札の横で、駅員さんが、小さなおばあさんに手を差し出していた。', [
            'Hinomori station in the morning. Beside the new automatic gate, the attendant holds out his hand to the small old lady.',
            'Der Bahnhof Hinomori am Morgen. Neben der neuen automatischen Sperre reicht der Bahnhofsangestellte der kleinen alten Dame die Hand.',
          ]),
          l('station_staff', '運転士にはなれなかったけど、人の{人生|じんせい|v:n3_0193}の一日を、ここから送り出せる。……今、ちょっと{幸せ|しあわせ|v:n3_0019}です。', [
            'I couldn’t become a driver, but from here I can send off one day of people’s lives. …Right now, I’m a little happy.',
            'Lokführer konnte ich nicht werden, aber von hier aus kann ich einen Tag im Leben der Menschen auf den Weg schicken. …Gerade bin ich ein bisschen glücklich.',
          ], 'happy'),
        ],
        teach: ['v:n3_0205', 'v:n3_0287', 'v:n3_0193', 'v:n3_0019', 'g:x_ijou', 'g:x_eru'],
      },
    ],
  },

  // ------------------------------------------------------------------ Dr. Kirishima: the light in the laboratory
  {
    id: 'ep_kirishima',
    chapter: 1,
    after: 'mq6',
    who: 'kirishima',
    title: ['研究所の灯り', 'The Light in the Laboratory', 'Das Licht im Labor'],
    summary: [
      'Dr. Kirishima studies the forgetting day and night. He has forgotten something important of his own.',
      'Dr. Kirishima erforscht Tag und Nacht das Vergessen. Dabei hat er selbst etwas Wichtiges vergessen.',
    ],
    scenes: [
      {
        at: 'kirishima',
        goal: ['Visit Dr. Kirishima in his lab', 'Besuch Dr. Kirishima in seinem Labor'],
        lines: [
          l('kirishima', 'ああ、@nameくんか。すまない、三日ほど寝ていなくてね。{実験|じっけん|v:n3_0052}のデータを見っ{ぱなし||g:ppanashi}なんだ。', [
            'Ah, @name. Sorry, I haven’t slept for about three days. I’ve been staring at experiment data non-stop.',
            'Ah, @name. Entschuldige, ich habe seit etwa drei Tagen nicht geschlafen. Ich sitze ununterbrochen an den Versuchsdaten.',
          ]),
          l('kirishima', '町の人の言葉が消えていく{状況|じょうきょう|v:n3_0134}は、日に日に悪くなっている。{至急|しきゅう|v:n3_0029}、原因を見つけないと。', [
            'The situation, with the townspeople’s words disappearing, gets worse day by day. I must find the cause urgently.',
            'Die Lage, dass den Leuten der Stadt die Worte verschwinden, wird von Tag zu Tag schlimmer. Ich muss dringend die Ursache finden.',
          ], 'worried'),
          l('kirishima', '{睡眠|すいみん|v:n3_0214}不足で{頭痛|ずつう|v:n3_0234}がひどいが、{集中|しゅうちゅう|v:n3_0102}していないと、不安でね。', [
            'The lack of sleep gives me terrible headaches, but if I’m not concentrating, I feel anxious.',
            'Vom Schlafmangel habe ich schreckliche Kopfschmerzen, aber wenn ich mich nicht konzentriere, werde ich unruhig.',
          ]),
          nar('机の上で、スマホが何度も光っていた。「美月」という名前からの着信が、{しきりに||v:n3_0030}続いている。', [
            'On the desk his phone keeps lighting up. Calls from someone called “Mizuki” keep coming, again and again.',
            'Auf dem Schreibtisch leuchtet sein Handy immer wieder auf. Anrufe von „Mizuki“ kommen einer nach dem anderen.',
          ]),
        ],
        teach: ['v:n3_0052', 'v:n3_0134', 'v:n3_0029', 'v:n3_0214', 'v:n3_0234', 'v:n3_0102', 'v:n3_0030', 'g:ppanashi'],
      },
      {
        at: 'lab_sign',
        goal: ['Look at the drawing taped to the lab window', 'Sieh dir das Bild am Laborfenster an'],
        evening: true,
        music: 'memory',
        lines: [
          nar('夜の研究所。窓ガラスに、子どもの描いた{図|ず|v:n3_0210}が一枚、テープで貼ってあった。', ['The lab at night. A child’s drawing is taped to the window.', 'Das Labor bei Nacht. Am Fenster klebt eine Kinderzeichnung.']),
          nar('白衣の男の人と、ドレスの{少女|しょうじょ|v:n3_0139}。「パパへ。学校の{芝居|しばい|v:n3_0069}で、お姫さまをやります。見に来てね」', [
            'A man in a white coat and a girl in a dress. “For Dad. I’m playing the princess in the school play. Come and watch!”',
            'Ein Mann im weißen Kittel und ein Mädchen im Kleid. „Für Papa. Ich spiele die Prinzessin im Schultheater. Komm zuschauen!“',
          ]),
          nar('日付は、{既に|すでに|v:n3_0238}二週間前に過ぎていた。', ['The date has already passed — two weeks ago.', 'Das Datum ist schon vorbei – vor zwei Wochen.']),
          nar('絵の下に、小さな字。「パパ、{真剣|しんけん|v:n3_0185}にお仕事してるから、来られなくてもいいよ。でも、忘れないでね」', [
            'Below the drawing, in small letters: “Dad, you’re working so seriously, it’s okay if you can’t come. But don’t forget me.”',
            'Unter dem Bild, klein: „Papa, du arbeitest so ernsthaft, es ist okay, wenn du nicht kommen kannst. Aber vergiss mich nicht.“',
          ]),
        ],
        teach: ['v:n3_0210', 'v:n3_0139', 'v:n3_0069', 'v:n3_0238', 'v:n3_0185'],
      },
      {
        at: 'kirishima',
        goal: ['Talk to Dr. Kirishima about the drawing', 'Sprich mit Dr. Kirishima über das Bild'],
        lines: [
          l('kirishima', '……美月の芝居。そうか、あれは、二週間も前だったのか。', ['…Mizuki’s play. So that was two weeks ago already.', '…Mizukis Theaterstück. Das war also schon vor zwei Wochen.'], 'surprised'),
          l('kirishima', '人が言葉を忘れる研究をしながら、自分は娘との約束を忘れていた。……{正直|しょうじき|v:n3_0137}、科学者として、父親として、恥ずかしいよ。', [
            'While researching how people forget words, I forgot my promise to my daughter. …Honestly, as a scientist and as a father, I’m ashamed.',
            'Während ich erforsche, wie Menschen Worte vergessen, habe ich mein Versprechen an meine Tochter vergessen. …Ehrlich gesagt schäme ich mich, als Wissenschaftler und als Vater.',
          ], 'worried'),
          ask(
            ['今から、電話してあげてください', ['Please call her now.', 'Bitte rufen Sie sie jetzt an.']],
            ['研究も大事。でも、休むのも研究のうちです', ['Research matters. But resting is part of research too.', 'Die Forschung ist wichtig. Aber Ausruhen gehört auch zur Forschung.']],
          ),
          l('kirishima', '徹夜した{せいで||g:seide}、データも見落としていた。{慎重|しんちょう|v:n3_0199}に考えれば、休むのも、{やむをえない||v:n2_1808}ことだな。', [
            'Because I stayed up all night, I was even missing things in the data. If I think carefully, resting is unavoidable.',
            'Weil ich die Nächte durchgearbeitet habe, habe ich sogar in den Daten etwas übersehen. Wenn ich es mir genau überlege, ist eine Pause unvermeidlich.',
          ]),
          l('kirishima', '{人類|じんるい|v:n3_0207}の{進歩|しんぽ|v:n3_0202}も大事だが、{目下|もっか|v:n2_1751}の一番の研究課題は……娘に謝ることだ。散歩{がてら||g:x_gatera}、迎えに行ってくるよ。', [
            'The progress of humanity matters, but my most urgent research topic right now… is apologising to my daughter. I’ll go and pick her up — a walk at the same time.',
            'Der Fortschritt der Menschheit ist wichtig, aber mein dringendstes Forschungsthema im Moment… ist, mich bei meiner Tochter zu entschuldigen. Ich hole sie ab – und mache dabei gleich einen Spaziergang.',
          ], 'happy'),
        ],
        teach: ['v:n3_0137', 'v:n3_0199', 'v:n2_1808', 'v:n3_0207', 'v:n3_0202', 'v:n2_1751', 'g:seide', 'g:x_gatera'],
      },
    ],
  },

  // ------------------------------------------------------------------ Mr. Satō: the boy who could not read
  {
    id: 'ep_sato',
    chapter: 1,
    after: 'mq3',
    who: 'sato',
    title: ['読めなかった少年', 'The Boy Who Could Not Read', 'Der Junge, der nicht lesen konnte'],
    summary: [
      'Forty years ago Mr. Satō gave up on a pupil who could not read. He has never forgiven himself.',
      'Vor vierzig Jahren hat Herr Satō einen Schüler aufgegeben, der nicht lesen konnte. Das hat er sich nie verziehen.',
    ],
    scenes: [
      {
        at: 'sato',
        goal: ['Ask Mr. Satō about the old class photo', 'Frag Herrn Satō nach dem alten Klassenfoto'],
        lines: [
          l('sato', 'この写真ですか。四十年前、わたしが初めて担任をしたクラスです。', ['This photo? It’s the first class I was in charge of, forty years ago.', 'Dieses Foto? Das ist die erste Klasse, für die ich verantwortlich war, vor vierzig Jahren.']),
          l('sato', '一番後ろの{少年|しょうねん|v:n3_0150}……字が読めない子でした。{成績|せいせき|v:n3_0272}はいつも最下位。わたしは若くて、{指導|しどう|v:n3_0064}の仕方もわからなかった。', [
            'The boy at the very back… he couldn’t read. His marks were always the lowest. I was young and didn’t know how to teach him.',
            'Der Junge ganz hinten… er konnte nicht lesen. Seine Noten waren immer die schlechtesten. Ich war jung und wusste nicht, wie ich ihn unterrichten sollte.',
          ]),
          l('sato', 'ある日、{呆れて|あきれて|v:n2_0127}言ってしまったのです。「もういい、お前には無理だ」と。それっ{きり||g:x_kiri}、あの子は学校に来なくなりました。', [
            'One day, fed up, I said it: “Enough, you can’t do it.” After that, he never came to school again.',
            'Eines Tages habe ich es entnervt gesagt: „Schluss, du schaffst das nicht.“ Danach ist er nie wieder zur Schule gekommen.',
          ], 'worried'),
          l('sato', '家の{事情|じじょう|v:n3_0038}も知らずに……。教師として、一番の{失望|しつぼう|v:n3_0061}は、自分自身にでした。', [
            'Without even knowing his situation at home… As a teacher, my biggest disappointment was in myself.',
            'Ohne zu wissen, wie es bei ihm zu Hause aussah… Als Lehrer war ich von niemandem so enttäuscht wie von mir selbst.',
          ]),
        ],
        teach: ['v:n3_0150', 'v:n3_0272', 'v:n3_0064', 'v:n2_0127', 'v:n3_0038', 'v:n3_0061', 'g:x_kiri'],
      },
      {
        at: 'library',
        goal: ['Look at the new books at the library', 'Sieh dir die neuen Bücher in der Bibliothek an'],
        lines: [
          nar('図書館の新刊の棚に、一冊の本があった。今年の文学{賞|しょう|v:n3_0128}を取った、ある{詩人|しじん}の{詩|し|v:n3_0018}集だった。', [
            'On the library’s new-arrivals shelf there is a book: a collection of poems by a poet who won this year’s literary prize.',
            'Im Regal mit den Neuerscheinungen der Bibliothek steht ein Buch: ein Gedichtband eines Dichters, der dieses Jahr einen Literaturpreis gewonnen hat.',
          ]),
          nar('最初の{章|しょう|v:n3_0127}の前に、一行だけ。「字の読めなかったぼくに、最初に本を開いてくれた、佐藤先生へ」', [
            'Before the first chapter, a single line: “To Mr. Satō, who was the first to open a book for me, the boy who could not read.”',
            'Vor dem ersten Kapitel eine einzige Zeile: „Für Herrn Satō, der mir, dem Jungen, der nicht lesen konnte, als Erster ein Buch aufgeschlagen hat.“',
          ]),
          nar('あとがきには、こうあった。「先生は一度だけ、放課後に絵本を読んでくれた。あの声だけが、ぼく{自身|じしん|v:n3_0040}を信じさせてくれた」', [
            'The afterword says: “Once, after school, my teacher read me a picture book. That voice alone made me believe in myself.”',
            'Im Nachwort steht: „Einmal hat mir mein Lehrer nach der Schule ein Bilderbuch vorgelesen. Allein diese Stimme hat mich an mich selbst glauben lassen.“',
          ]),
          nar('{出版|しゅっぱん|v:n3_0115}社のしおりには、作者の{署名|しょめい|v:n3_0173}と、「近日、日野森で朗読会」の文字。', [
            'On the publisher’s bookmark: the author’s signature, and the words “Reading in Hinomori, coming soon”.',
            'Auf dem Lesezeichen des Verlags: die Unterschrift des Autors und die Worte „Demnächst Lesung in Hinomori“.',
          ]),
        ],
        teach: ['v:n3_0128', 'v:n3_0018', 'v:n3_0127', 'v:n3_0040', 'v:n3_0115', 'v:n3_0173'],
      },
      {
        at: 'sato',
        goal: ['Bring the book to Mr. Satō', 'Bring Herrn Satō das Buch'],
        lines: [
          nar('本を受け取った佐藤先生の手が、震えていた。', ['Mr. Satō’s hands tremble as he takes the book.', 'Herrn Satōs Hände zittern, als er das Buch nimmt.']),
          l('sato', '……あの子だ。わたしは、一度だけ絵本を読んだことさえ、忘れていた。', ['…It’s him. I had even forgotten that I once read him a picture book.', '…Er ist es. Ich hatte sogar vergessen, dass ich ihm einmal ein Bilderbuch vorgelesen habe.'], 'surprised'),
          l('sato', '四十年、あの子を{救えなかった|すくえなかった|v:n3_0221}と思っていました。でも、あの子は、自分で{成長|せいちょう|v:n3_0275}していたのですね。', [
            'For forty years I believed I had failed to save him. But he grew up on his own.',
            'Vierzig Jahre lang glaubte ich, ihn nicht gerettet zu haben. Aber er ist aus eigener Kraft gewachsen.',
          ]),
          ask(
            ['朗読会に、行きましょう', ['Let’s go to the reading.', 'Lassen Sie uns zur Lesung gehen.']],
            ['先生の一言が、あの子を支えたんです', ['Your words were what kept him going.', 'Ihre Worte haben ihn getragen.']],
          ),
          l('sato', '{近々|ちかぢか|v:n2_1149}の朗読会には、{真っ先|まっさき|v:n2_1684}に行きます。{ひとまず||v:n2_1508}、謝って……いや、まず、おめでとうと言いましょう。', [
            'I’ll be the very first to arrive at the upcoming reading. For now I’ll apologise… no — first, I’ll say congratulations.',
            'Zur baldigen Lesung gehe ich als Allererster. Fürs Erste entschuldige ich mich… nein – zuerst sage ich: Herzlichen Glückwunsch.',
          ], 'happy'),
          pic('cg_heart_sato', '静かな図書館。佐藤先生が、一冊の詩集を、そっと胸に抱いた。', [
            'The quiet library. Mr. Satō gently holds a book of poems to his chest.',
            'Die stille Bibliothek. Herr Satō drückt behutsam einen Gedichtband an seine Brust.',
          ]),
          l('sato', '教師の言葉は、思った以上に残るものですね。悪い言葉も、いい言葉も。……@nameさん、言葉を{信じて|しんじて|v:n3_0192}ください。', [
            'A teacher’s words stay far longer than one thinks. The bad ones and the good ones. …@name, please believe in words.',
            'Die Worte eines Lehrers bleiben viel länger, als man denkt. Die schlechten wie die guten. …@name, glaube bitte an Worte.',
          ], 'happy'),
        ],
        teach: ['v:n3_0221', 'v:n3_0275', 'v:n2_1149', 'v:n2_1684', 'v:n2_1508', 'v:n3_0192'],
      },
    ],
  },
];
