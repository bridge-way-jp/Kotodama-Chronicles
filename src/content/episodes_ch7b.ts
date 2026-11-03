import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 7, second round: the kōban officer, the karaoke receptionist, the bookseller, the souvenir-shop owner, the share-house resident, the observation-deck attendant. */
export const EPISODES_CH7B: Episode[] = [
  // ------------------------------------------------------------------ the kōban officer: the boy who comes every day
  {
    id: 'ep_koban_omawari',
    chapter: 7,
    after: 'mq28',
    who: 'koban_omawari',
    title: ['毎日来る迷子', 'The Lost Boy Who Comes Every Day', 'Der verirrte Junge, der jeden Tag kommt'],
    summary: [
      'Every evening a small boy comes to the police box and says he is lost. He always knows the way home.',
      'Jeden Abend kommt ein kleiner Junge zum Polizeihäuschen und sagt, er habe sich verlaufen. Den Heimweg kennt er immer.',
    ],
    scenes: [
      {
        at: 'koban_omawari',
        goal: ['Ask the officer about the boy at the police box', 'Frag den Polizisten nach dem Jungen im Kōban'],
        lines: [
          l('koban_omawari', 'ああ、あの子ですか。毎晩七時、「{迷子|まいご|v:n3_1965}になった」と言って、ここに来るんです。', ['Ah, that boy? Every evening at seven he comes here saying, “I’m lost.”', 'Ach, der Junge? Jeden Abend um sieben kommt er her und sagt: „Ich habe mich verlaufen.“']),
          l('koban_omawari', 'でも、家の{方向|ほうこう|v:n3_1929}は、ちゃんとわかっている。{普段|ふだん|v:n3_1882}は明るい子なのに、ここに来ると、{不安|ふあん|v:n3_1857}そうな{表情|ひょうじょう|v:n3_1842}をするんですよ。', [
            'But he knows perfectly well which way his home is. He’s usually a cheerful kid, but when he comes here he has such an anxious look.',
            'Aber er weiß genau, in welcher Richtung sein Zuhause liegt. Normalerweise ist er ein fröhliches Kind, aber wenn er herkommt, sieht er so ängstlich aus.',
          ]),
          l('koban_omawari', '……あの子の家、どこだった{っけ||g:x_kke}。たしか、川沿いの古いアパートでした。お母さんは、夜の仕事だそうです。', ['…Where was his home again? The old apartment by the river, I think. His mother works nights, apparently.', '…Wo wohnte er noch mal? Im alten Wohnhaus am Fluss, glaube ich. Seine Mutter arbeitet nachts, heißt es.']),
          l('koban_omawari', '今夜も七時に来るはずです。……一緒に、話を聞いてもらえませんか。', ['He should come again at seven tonight. …Would you listen to him with me?', 'Heute Abend um sieben kommt er bestimmt wieder. …Würdest du mit mir zusammen zuhören?']),
        ],
        teach: ['v:n3_1965', 'v:n3_1929', 'v:n3_1882', 'v:n3_1857', 'v:n3_1842', 'g:x_kke'],
      },
      {
        at: 'koban_omawari',
        goal: ['Wait for the boy at the police box at seven', 'Wart um sieben am Kōban auf den Jungen'],
        evening: true,
        music: 'tokyo_night',
        lines: [
          nar('七時になる{かならないかのうちに||g:kanainaikanouchini}、男の子が、手作りの{弁当|べんとう|v:n3_1924}の袋を持って駆けこんできた。', [
            'It has barely turned seven when the boy comes running in, carrying a bag with a home-made lunchbox.',
            'Kaum ist es sieben, kommt der Junge hereingerannt, eine Tüte mit einer selbstgemachten Brotdose in der Hand.',
          ]),
          nar('「おまわりさん、ぼく、迷子！ ……あのね、これ、お母さんが作ったの。おまわりさんの分」', ['“Officer, I’m lost! …Look, Mum made this. It’s for you.”', '„Herr Polizist, ich hab mich verlaufen! …Schau mal, das hat Mama gemacht. Für dich.“']),
          nar('「お母さん、夜はお仕事でいないから、ぼく、一人のおうち、こわいの。でも、ここに来ると、おまわりさんが{微笑んで|ほほえんで|v:n3_1954}くれるでしょ」', [
            '“Mum is at work at night, so I’m scared at home alone. But when I come here, you smile at me.”',
            '„Mama ist nachts arbeiten, und allein zu Hause habe ich Angst. Aber wenn ich herkomme, lächelst du mich an.“',
          ]),
          nar('弁当の袋には、母親の字で手紙が入っていた。「いつも息子が{訪問|ほうもん|v:n3_1936}して、すみません。夜、一人にしてしまうのが、つらくて」', [
            'In the bag there is a note in the mother’s handwriting: “I’m sorry my son keeps visiting you. Leaving him alone at night is so hard for me.”',
            'In der Tüte steckt ein Brief in der Schrift der Mutter: „Entschuldigen Sie, dass mein Sohn Sie ständig besucht. Es fällt mir so schwer, ihn nachts allein zu lassen.“',
          ]),
        ],
        teach: ['v:n3_1924', 'v:n3_1954', 'v:n3_1936', 'g:kanainaikanouchini'],
      },
      {
        at: 'koban_omawari',
        goal: ['Talk to the officer after the boy has gone home', 'Sprich mit dem Polizisten, nachdem der Junge heimgegangen ist'],
        lines: [
          l('koban_omawari', '迷子のふりをして、さみしさを{防いで|ふせいで|v:n3_1877}いたんですね。……子どもっ{ぽい||g:ppoi}嘘だと思っていた自分が、恥ずかしい。', [
            'He was pretending to be lost to keep the loneliness away. …I’m ashamed I thought it was just a childish lie.',
            'Er hat so getan, als hätte er sich verlaufen, um die Einsamkeit abzuwehren. …Ich schäme mich, dass ich dachte, es sei nur eine kindische Lüge.',
          ]),
          ask(
            ['地域の子ども食堂を、紹介してあげては？', ['Why not tell them about the neighbourhood children’s cafeteria?', 'Warum erzählen Sie ihnen nicht von der Kinderkantine im Viertel?']],
            ['これからも、ここに来ていいって伝えましょう', ['Let’s tell him he can keep coming here.', 'Sagen wir ihm, dass er weiter herkommen darf.']],
          ),
          l('koban_omawari', '夜の子ども食堂のことを、お母さんに{報告|ほうこく|v:n3_1930}がてら、伝えます。それまでは、毎晩七時、ここで{無事|ぶじ|v:n3_1871}を確認します。', [
            'I’ll tell the mother about the evening children’s cafeteria when I report to her. Until then, every evening at seven, I’ll check here that he’s safe.',
            'Ich erzähle der Mutter bei der Gelegenheit von der abendlichen Kinderkantine. Bis dahin vergewissere ich mich jeden Abend um sieben hier, dass es ihm gut geht.',
          ], 'happy'),
          pic('cg_tokyo_river', '夜の交番の灯り。{歩道|ほどう|v:n3_1947}の向こうで、男の子が、何度も振り返って手を振っていた。', [
            'The light of the police box at night. Across the pavement, the boy turns round again and again to wave.',
            'Das Licht des Kōban in der Nacht. Auf der anderen Seite des Gehwegs dreht sich der Junge immer wieder um und winkt.',
          ]),
        ],
        teach: ['v:n3_1877', 'v:n3_1930', 'v:n3_1871', 'v:n3_1947', 'g:ppoi'],
      },
    ],
  },

  // ------------------------------------------------------------------ the karaoke receptionist: the Friday singer
  {
    id: 'ep_karaoke_uketsuke',
    chapter: 7,
    after: 'mq29',
    who: 'karaoke_uketsuke',
    title: ['金曜日の一人カラオケ', 'The Friday Night Singer', 'Der Freitagssänger'],
    summary: [
      'Every Friday a tired office worker books a karaoke room alone and sings the same song. The receptionist has heard him through the door for a year.',
      'Jeden Freitag bucht ein müder Büroangestellter allein einen Karaokeraum und singt dasselbe Lied. Die Empfangsdame hört ihn seit einem Jahr durch die Tür.',
    ],
    scenes: [
      {
        at: 'karaoke_uketsuke',
        goal: ['Talk to the karaoke receptionist', 'Sprich mit der Karaoke-Empfangsdame'],
        lines: [
          l('karaoke_uketsuke', 'あ、こんばんは！ 金曜の夜は、いつも同じお客さんが来るんです。スーツの男の人で、一人で三時間。', ['Oh, good evening! On Friday nights the same customer always comes. A man in a suit, alone, for three hours.', 'Oh, guten Abend! Freitagabends kommt immer derselbe Kunde. Ein Mann im Anzug, allein, drei Stunden lang.']),
          l('karaoke_uketsuke', 'ドア越しに聞こえる歌が、本当にうまいんです。{プロ||v:n3_1906}みたい。でも、同じ{節|ふし|v:n3_1870}になると、毎回、声が{震える|ふるえる|v:n3_1903}んです。', [
            'The singing I hear through the door is really good. Like a professional. But at the same part of the melody, his voice trembles every time.',
            'Was ich durch die Tür höre, ist wirklich gut. Wie ein Profi. Aber an derselben Stelle der Melodie zittert jedes Mal seine Stimme.',
          ]),
          l('karaoke_uketsuke', '来月、店の{舞台|ぶたい|v:n3_1879}で、お客さんが歌う会があるんです。誘いたいけど、受付が声をかけるなんて、失礼{きわまりない||g:kiwamarinai}ですよね……。', [
            'Next month there’s an evening where customers sing on the shop’s stage. I want to invite him, but a receptionist speaking to him would be utterly rude, wouldn’t it…',
            'Nächsten Monat gibt es einen Abend, an dem Kunden auf der Bühne des Ladens singen. Ich würde ihn gern einladen, aber dass eine Empfangsdame ihn anspricht, wäre doch äußerst unhöflich…',
          ]),
        ],
        teach: ['v:n3_1906', 'v:n3_1870', 'v:n3_1903', 'v:n3_1879', 'g:kiwamarinai'],
      },
      {
        at: 'karaoke_uketsuke',
        goal: ['Listen to the Friday singer through the door', 'Hör dem Freitagssänger durch die Tür zu'],
        evening: true,
        music: 'tokyo_night',
        lines: [
          nar('金曜の夜。廊下の奥の部屋から、低く温かい歌声が聞こえてきた。', ['Friday night. From the room at the end of the corridor comes a low, warm singing voice.', 'Freitagabend. Aus dem Raum am Ende des Flurs kommt eine tiefe, warme Singstimme.']),
          nar('ドアのすき間から見えた男の人は、{マイク||v:n3_1964}を握りしめて、目を閉じていた。歌は、昔のバンドの曲だった。', [
            'Through the gap in the door you see the man clutching the microphone, eyes closed. The song is by an old band.',
            'Durch den Türspalt siehst du den Mann, der das Mikrofon umklammert, die Augen geschlossen. Das Lied ist von einer alten Band.',
          ]),
          nar('歌い終わると、男の人は独り言をつぶやいた。「二十年前、{評判|ひょうばん|v:n3_1844}のバンドだったのに、就職のために{幕|まく|v:n3_1971}を下ろした。……{負け|まけ|v:n3_1972}を認めたんだ、おれは」', [
            'When he finishes, the man murmurs to himself: “Twenty years ago we were a band people talked about, and I brought the curtain down to get a job. …I admitted defeat.”',
            'Als er fertig ist, murmelt der Mann vor sich hin: „Vor zwanzig Jahren waren wir eine Band, von der alle sprachen, und für eine Anstellung habe ich den Vorhang fallen lassen. …Ich habe meine Niederlage eingestanden.“',
          ]),
        ],
        teach: ['v:n3_1964', 'v:n3_1844', 'v:n3_1971', 'v:n3_1972'],
      },
      {
        at: 'karaoke_uketsuke',
        goal: ['Help the receptionist invite the singer', 'Hilf der Empfangsdame, den Sänger einzuladen'],
        lines: [
          ask(
            ['一緒に、ちらしを渡しに行きましょう', ['Let’s go and give him the flyer together.', 'Lass uns ihm zusammen den Flyer geben.']],
            ['あなたの言葉で、誘ってあげてください', ['Invite him in your own words.', 'Lade ihn mit deinen eigenen Worten ein.']],
          ),
          l('karaoke_uketsuke', '「いつも、ドアの外で聴いていました。お客様の歌は、{本物|ほんもの|v:n3_1959}です」って……言えた！', ['“I’ve always been listening outside the door. Your singing is the real thing.” …I said it!', '„Ich habe immer vor der Tür zugehört. Ihr Gesang ist echt.“ …Ich hab’s gesagt!'], 'happy'),
          nar('男の人は、驚いた顔をしてから、少しだけ笑った。「下手だっ{たって||g:x_tatte}、もう一度、人の前で歌ってみるか」', [
            'The man looks surprised, then smiles a little. “Even if I’m bad at it — maybe I’ll sing in front of people one more time.”',
            'Der Mann schaut überrascht und lächelt dann ein wenig. „Auch wenn ich schlecht bin – vielleicht singe ich noch einmal vor Leuten.“',
          ]),
          l('karaoke_uketsuke', '歌は、一人で歌うより、聴いてくれる人の前で歌う{に限る||g:nikagiru}。……あのお客さんの{誇り|ほこり|v:n3_1943}、戻るといいな。', [
            'Singing is best done in front of people who listen, not alone. …I hope that customer gets his pride back.',
            'Singen tut man am besten vor Leuten, die zuhören, nicht allein. …Ich hoffe, der Kunde bekommt seinen Stolz zurück.',
          ], 'happy'),
          pic('cg_tokyo_radio', '翌月の舞台。スポットライトの中で、スーツの男の人が、震えずに最後まで歌い切った。', [
            'The stage the following month. In the spotlight, the man in the suit sings to the very end without his voice trembling.',
            'Die Bühne im Monat darauf. Im Scheinwerferlicht singt der Mann im Anzug bis zum Schluss, ohne dass seine Stimme zittert.',
          ]),
        ],
        teach: ['v:n3_1959', 'v:n3_1943', 'g:x_tatte', 'g:nikagiru'],
      },
    ],
  },

  // ------------------------------------------------------------------ the bookseller: the boy who steals books
  {
    id: 'ep_books_shuijin',
    chapter: 7,
    after: 'mq28',
    who: 'books_shuijin',
    title: ['盗まれた本の行方', 'Where the Stolen Books Go', 'Wohin die gestohlenen Bücher gehen'],
    summary: [
      'One book disappears from the bookshop every week. The owner knows who takes them — and does not call the police.',
      'Jede Woche verschwindet ein Buch aus der Buchhandlung. Die Besitzerin weiß, wer sie nimmt – und ruft nicht die Polizei.',
    ],
    scenes: [
      {
        at: 'books_shuijin',
        goal: ['Ask the bookseller about the missing books', 'Frag die Buchhändlerin nach den verschwundenen Büchern'],
        lines: [
          l('books_shuijin', '毎週、一冊ずつ、本がなくなるんです。犯人は、わかっています。制服の男の子。', ['Every week, one book disappears. I know who does it. A boy in a school uniform.', 'Jede Woche verschwindet ein Buch. Ich weiß, wer es ist. Ein Junge in Schuluniform.']),
          l('books_shuijin', '{不正|ふせい|v:n3_1876}は不正です。でも、{まさか||v:n3_1974}と思うのは、盗むのが、全部辞書と科学の{分野|ぶんや|v:n3_1912}の本なんです。', [
            'Wrong is wrong. But what I can hardly believe is that everything he steals is dictionaries and science books.',
            'Unrecht ist Unrecht. Aber was ich kaum glauben kann: Alles, was er stiehlt, sind Wörterbücher und Bücher aus dem Bereich Naturwissenschaften.',
          ]),
          l('books_shuijin', '盗まれる本が難しい本ばかりだという{ことから||g:kotokara}、ただのいたずらじゃないと思って。……今日も、そろそろ来る時間です。', [
            'Because the stolen books are always difficult ones, I don’t think it’s just mischief. …It’s about time he came today, too.',
            'Weil die gestohlenen Bücher immer schwierige sind, glaube ich nicht, dass es nur ein Streich ist. …Heute müsste er auch bald kommen.',
          ]),
        ],
        teach: ['v:n3_1876', 'v:n3_1974', 'v:n3_1912', 'g:kotokara'],
      },
      {
        at: 'books_shuijin',
        goal: ['Talk to the boy when he comes', 'Sprich mit dem Jungen, wenn er kommt'],
        evening: true,
        lines: [
          nar('物理の本をかばんに入れようとした男の子の手が、止まった。', ['The hand of the boy, about to slip a physics book into his bag, stops.', 'Die Hand des Jungen, der gerade ein Physikbuch in seine Tasche stecken will, hält inne.']),
          nar('「……ごめんなさい。家が{貧しくて|まずしくて|v:n3_1981}、本を買うお金がないんです。でも、どうしても大学に行きたくて」', [
            '“…I’m sorry. My family is poor, and I have no money for books. But I really want to go to university.”',
            '„…Entschuldigung. Meine Familie ist arm, ich habe kein Geld für Bücher. Aber ich will unbedingt studieren.“',
          ]),
          nar('かばんの中のノートには、盗んだ本を一字一字写した{文|ぶん|v:n3_1908}が、びっしりと並んでいた。写し終わった本は、全部、そっと棚に戻してあったのだ。', [
            'In the notebook in his bag, sentence after sentence from the stolen books has been copied out, character by character. Every book he finished copying, he had quietly put back on the shelf.',
            'Im Heft in seiner Tasche stehen dicht an dicht Sätze, Zeichen für Zeichen aus den gestohlenen Büchern abgeschrieben. Jedes Buch, das er fertig abgeschrieben hatte, hatte er leise wieder ins Regal gestellt.',
          ]),
          nar('男の子は、言った。「本当は、返すたびに、おばさんに言おうと思ってたんです。でも、言えなかった。本の中の{表現|ひょうげん|v:n3_1841}が、{不思議|ふしぎ|v:n3_1872}なくらい、きれいで」', [
            'The boy says: “Every time I returned one, I meant to tell you. But I couldn’t. The way things are put in those books is so beautiful it’s strange.”',
            'Der Junge sagt: „Jedes Mal, wenn ich eins zurückgestellt habe, wollte ich es Ihnen sagen. Aber ich konnte nicht. Die Sprache in den Büchern ist so schön, dass es fast seltsam ist.“',
          ]),
        ],
        teach: ['v:n3_1981', 'v:n3_1908', 'v:n3_1841', 'v:n3_1872'],
      },
      {
        at: 'books_shuijin',
        goal: ['Help the bookseller decide what to do', 'Hilf der Buchhändlerin zu entscheiden, was sie tun soll'],
        lines: [
          l('books_shuijin', '返していた{本人|ほんにん|v:n3_1958}が、謝りに来たんだもの。警察には言いません。', ['The very person who was returning them came to apologise. I won’t tell the police.', 'Er hat sie ja selbst zurückgebracht und ist gekommen, um sich zu entschuldigen. Ich sage der Polizei nichts.']),
          ask(
            ['お店で、アルバイトをしてもらっては？', ['Why not let him work part-time in the shop?', 'Warum lassen Sie ihn nicht als Aushilfe im Laden arbeiten?']],
            ['本を貸してあげてください', ['Please lend him the books.', 'Leihen Sie ihm bitte die Bücher.']],
          ),
          l('books_shuijin', 'これ{を契機に||g:wokikini}、週末は店番を{任せる|まかせる|v:n3_1967}わ。給料のかわりに、本は好きなだけ読んでいい。うちの店は、科学の本も{豊富|ほうふ|v:n3_1933}なのよ。', [
            'Taking this as a chance, I’ll leave the shop to him at weekends. Instead of pay, he can read as many books as he likes. My shop has plenty of science books, you know.',
            'Ich nehme das zum Anlass und überlasse ihm am Wochenende den Laden. Statt Lohn darf er so viele Bücher lesen, wie er will. Mein Laden hat übrigens reichlich Wissenschaftsbücher.',
          ], 'happy'),
          l('books_shuijin', '最近、本屋は減っていく{ばかりだ||g:x_bakarida}って言われる。でも、こういう子がいる限り、本屋の仕事はなくならないって、{保証|ほしょう|v:n3_1945}するわ。', [
            'People say bookshops are only getting fewer these days. But as long as there are kids like him, I guarantee there’ll always be work for a bookshop.',
            'Die Leute sagen, Buchläden werden heutzutage immer weniger. Aber solange es solche Kinder gibt, garantiere ich, dass die Arbeit einer Buchhandlung nie verschwindet.',
          ], 'happy'),
        ],
        teach: ['v:n3_1958', 'v:n3_1967', 'v:n3_1933', 'v:n3_1945', 'g:wokikini', 'g:x_bakarida'],
      },
    ],
  },

  // ------------------------------------------------------------------ the souvenir-shop owner: the other half of the lucky cat
  {
    id: 'ep_souvenir_okami',
    chapter: 7,
    after: 'mq27',
    who: 'souvenir_okami',
    title: ['招き猫の片割れ', 'The Other Half of the Lucky Cat', 'Die andere Hälfte der Glückskatze'],
    summary: [
      'The souvenir-shop owner in Asakusa keeps a lucky cat that raises only its left paw. Its twin went abroad thirty years ago — with her sister.',
      'Die Andenkenhändlerin in Asakusa hat eine Glückskatze, die nur die linke Pfote hebt. Ihr Zwilling ging vor dreißig Jahren ins Ausland – mit ihrer Schwester.',
    ],
    scenes: [
      {
        at: 'souvenir_okami',
        goal: ['Ask the souvenir-shop owner about the lucky cat on the shelf', 'Frag die Andenkenhändlerin nach der Glückskatze im Regal'],
        lines: [
          l('souvenir_okami', 'あの招き猫？ 売り物じゃないのよ。わたしと{双子|ふたご|v:n3_1880}の妹で、一つずつ持っていたの。左手の猫と、右手の猫。', [
            'That lucky cat? It’s not for sale. My twin sister and I each had one. A cat with its left paw raised, and one with its right.',
            'Die Glückskatze? Die ist nicht zu verkaufen. Meine Zwillingsschwester und ich hatten je eine. Eine Katze mit erhobener linker Pfote und eine mit der rechten.',
          ]),
          l('souvenir_okami', '三十年前、妹はフランス人と結婚して、パリへ。親が反対して、わたしも、ひどいことを言っちゃって。それっきり。', [
            'Thirty years ago my sister married a Frenchman and went to Paris. Our parents were against it, and I said terrible things too. That was the end of it.',
            'Vor dreißig Jahren hat meine Schwester einen Franzosen geheiratet und ist nach Paris gegangen. Unsere Eltern waren dagegen, und ich habe auch Schlimmes gesagt. Seitdem nichts mehr.',
          ], 'worried'),
          l('souvenir_okami', '来週、{再び|ふたたび|v:n3_1881}日本に来るって、手紙が来たの。{孫|まご|v:n3_1973}を連れて。……会いたい。でも、何から話せばいいのか。', [
            'A letter came saying she’s coming to Japan again next week. With her grandchild. …I want to see her. But I don’t know where to start.',
            'Ein Brief ist gekommen: Sie kommt nächste Woche wieder nach Japan. Mit ihrem Enkelkind. …Ich will sie sehen. Aber ich weiß nicht, womit ich anfangen soll.',
          ]),
        ],
        teach: ['v:n3_1880', 'v:n3_1881', 'v:n3_1973'],
      },
      {
        at: 'souvenir_okami',
        goal: ['Be at the shop when the sister arrives', 'Sei im Laden, wenn die Schwester kommt'],
        music: 'tokyo',
        lines: [
          nar('一週間後。店の前に、同じ顔をした二人の{婦人|ふじん}が立っていた。妹さんの手には、小さな{袋|ふくろ|v:n3_1868}。', ['A week later. In front of the shop stand two women with the same face. The sister holds a small bag.', 'Eine Woche später. Vor dem Laden stehen zwei Frauen mit demselben Gesicht. Die Schwester hält eine kleine Tüte in der Hand.']),
          nar('袋の中から出てきたのは、右手を挙げた招き猫だった。三十年、パリの台所で、毎日{拭いて|ふいて|v:n3_1864}いたらしく、ぴかぴかだった。', [
            'Out of the bag comes a lucky cat raising its right paw. She must have wiped it every day in her Paris kitchen for thirty years — it is gleaming.',
            'Aus der Tüte kommt eine Glückskatze mit erhobener rechter Pfote. Sie muss sie dreißig Jahre lang jeden Tag in ihrer Pariser Küche abgewischt haben – sie glänzt.',
          ]),
          nar('「お姉ちゃん、ごめん{ってば||g:ttcheba}。……ずっと、言いたかったの」妹さんの{頬|ほお|v:n3_1951}を、涙が流れた。', [
            '“Sis, I said I’m sorry! …I’ve wanted to say it all this time.” Tears run down the sister’s cheeks.',
            '„Schwesterherz, ich sag doch, es tut mir leid! …Das wollte ich die ganze Zeit sagen.“ Tränen laufen der Schwester über die Wangen.',
          ]),
        ],
        teach: ['v:n3_1868', 'v:n3_1864', 'v:n3_1951', 'g:ttcheba'],
      },
      {
        at: 'souvenir_okami',
        goal: ['Stay with the twins in the shop', 'Bleib bei den Zwillingen im Laden'],
        music: 'tokyo',
        lines: [
          l('souvenir_okami', '謝るのは、わたしのほう。三十年、{不幸|ふこう|v:n3_1869}だったのは、意地を張ったわたし。', ['It’s me who should apologise. For thirty years, the one who was unhappy was me, being so stubborn.', 'Ich bin es, die sich entschuldigen muss. Dreißig Jahre lang war ich die Unglückliche, weil ich so stur war.']),
          ask(
            ['二匹の猫を、並べて飾りましょう', ['Let’s display the two cats side by side.', 'Lassen Sie uns die zwei Katzen nebeneinanderstellen.']],
            ['お孫さんにも、会わせてあげてください', ['Please let her meet the grandchild too.', 'Lassen Sie sie bitte auch das Enkelkind kennenlernen.']],
          ),
          nar('店の真ん中に、左手と右手の招き猫が並んだ。妹さんの孫が、日本語で「はじめまして」と、手を{振った|ふった|v:n3_1902}。', [
            'In the middle of the shop, the left-paw and right-paw lucky cats now stand side by side. The sister’s grandchild waves and says “Hajimemashite” in Japanese.',
            'In der Mitte des Ladens stehen jetzt die Glückskatzen mit linker und rechter Pfote nebeneinander. Das Enkelkind der Schwester winkt und sagt auf Japanisch „Hajimemashite“.',
          ]),
          l('souvenir_okami', '今日は、いいこと{ずくめ||g:zukume}ね。三十年分の涙が出た{くらい||g:x_kurai}よ。……お店も、心も、やっと{平和|へいわ|v:n3_1915}になったわ。', [
            'Today is nothing but good things. I cried about thirty years’ worth of tears. …The shop and my heart have finally found peace.',
            'Heute gibt es nur gute Dinge. Ich habe etwa dreißig Jahre Tränen geweint. …Der Laden und mein Herz haben endlich Frieden gefunden.',
          ], 'happy'),
          pic('cg_asakusa_coffee', '浅草のお土産屋。二匹の招き猫の前で、そっくりな二人が、同じ顔で笑っていた。', [
            'The souvenir shop in Asakusa. In front of the two lucky cats, two lookalikes laugh with the same face.',
            'Der Andenkenladen in Asakusa. Vor den zwei Glückskatzen lachen zwei, die sich zum Verwechseln ähnlich sehen, mit demselben Gesicht.',
          ]),
        ],
        teach: ['v:n3_1869', 'v:n3_1902', 'v:n3_1915', 'g:zukume', 'g:x_kurai'],
      },
    ],
  },

  // ------------------------------------------------------------------ the share-house resident: the shared kitchen
  {
    id: 'ep_share_resident',
    chapter: 7,
    after: 'mq28',
    who: 'share_resident',
    title: ['シェアハウスの台所', 'The Share-House Kitchen', 'Die Küche der WG'],
    summary: [
      'Six people live in the share house by the river. In a year, they have never once eaten together.',
      'In der WG am Fluss wohnen sechs Menschen. In einem Jahr haben sie kein einziges Mal zusammen gegessen.',
    ],
    scenes: [
      {
        at: 'share_resident',
        goal: ['Talk to the share-house resident in the kitchen', 'Sprich mit der WG-Bewohnerin in der Küche'],
        lines: [
          l('share_resident', 'このシェアハウス、六人住んでるのに、誰も話さないの。冷蔵庫には、名前を書いた{分|ぶん}だけ。', ['Six of us live in this share house, and nobody talks. The fridge only has each person’s own share, with names on it.', 'In dieser WG wohnen sechs Leute, und keiner redet. Im Kühlschrank liegt nur der eigene Anteil jedes Einzelnen, mit Namen drauf.']),
          l('share_resident', '掃除の当番も、{平等|びょうどう|v:n3_1843}じゃないって{不満|ふまん|v:n3_1895}ばかり。ホワイトボードは、{不平|ふへい|v:n3_1894}のメモだらけ。……{雰囲気|ふんいき|v:n3_1909}、最悪でしょ？', [
            'All anyone does is complain that the cleaning rota isn’t fair. The whiteboard is covered in grumbling notes. …The atmosphere is awful, right?',
            'Alle beschweren sich nur, dass der Putzplan nicht gerecht ist. Das Whiteboard ist voller Meckerzettel. …Die Stimmung ist schrecklich, oder?',
          ], 'worried'),
          l('share_resident', 'わたし、ちょっとした{冒険|ぼうけん|v:n3_1928}をしてみたいの。今度の日曜、みんなで鍋をする{プラン||v:n3_1900}。……手伝ってくれる？', [
            'I want to try a little adventure. A plan for all of us to have hot pot together this Sunday. …Will you help?',
            'Ich möchte ein kleines Abenteuer wagen. Ein Plan: Am Sonntag essen wir alle zusammen Nabe. …Hilfst du mir?',
          ]),
        ],
        teach: ['v:n3_1843', 'v:n3_1895', 'v:n3_1894', 'v:n3_1909', 'v:n3_1928', 'v:n3_1900'],
      },
      {
        at: 'share_resident',
        goal: ['Help with the Sunday hot pot', 'Hilf beim Nabe-Essen am Sonntag'],
        evening: true,
        music: 'tokyo_night',
        lines: [
          nar('日曜の夜。最初に来たのは、一人だけだった。具材が{不足|ふそく|v:n3_1878}しているかと思ったら、次々に人が来た。', [
            'Sunday night. At first only one person comes. Just when it seems there won’t be enough ingredients, people arrive one after another.',
            'Sonntagabend. Zuerst kommt nur eine Person. Gerade als es scheint, als würden die Zutaten nicht reichen, kommen nacheinander immer mehr.',
          ]),
          nar('看護師の人は野菜を、エンジニアの人はキムチを、学生は安い肉を持ってきた。鍋に{混ぜる|まぜる|v:n3_1984}と、ふしぎな味になった。', [
            'The nurse brings vegetables, the engineer brings kimchi, the student cheap meat. Mixed in the pot, it becomes a strange flavour.',
            'Die Krankenschwester bringt Gemüse, der Ingenieur Kimchi, der Student billiges Fleisch. Im Topf vermischt ergibt das einen seltsamen Geschmack.',
          ]),
          nar('「掃除の当番、表を作り直そうか」「川{にそって||g:nisotte}、みんなで散歩するのもいいね」――話が、少しずつ{増えて|ふえて}いった。', [
            '“Shall we redo the cleaning rota?” “A walk along the river together would be nice too.” — Little by little, the conversation grows.',
            '„Sollen wir den Putzplan neu machen?“ „Ein gemeinsamer Spaziergang am Fluss entlang wäre auch schön.“ – Nach und nach wird mehr geredet.',
          ]),
        ],
        teach: ['v:n3_1878', 'v:n3_1984', 'g:nisotte'],
      },
      {
        at: 'share_resident',
        goal: ['Look at the whiteboard the next morning', 'Sieh dir am nächsten Morgen das Whiteboard an'],
        lines: [
          nar('翌朝。ホワイトボードの不平のメモが、一つもなくなっていた。かわりに、六人の字で、一行ずつ。', ['The next morning. Not one grumbling note is left on the whiteboard. Instead, one line each, in six different hands.', 'Am nächsten Morgen. Kein einziger Meckerzettel hängt mehr am Whiteboard. Stattdessen je eine Zeile in sechs verschiedenen Handschriften.']),
          nar('「来週はカレー！」「ゴミの日、忘れないでね」「ありがとう、楽しかった」', ['“Curry next week!” “Don’t forget rubbish day.” “Thanks, that was fun.”', '„Nächste Woche Curry!“ „Vergesst den Mülltag nicht.“ „Danke, das war schön.“']),
          l('share_resident', '文句を{減らす|へらす|v:n3_1917}より、話す時間を{増やす|ふやす|v:n3_1896}ほうが、ずっと早かったね。……たった一回の鍋で、こんなに{変化|へんか|v:n3_1920}があるなんて。', [
            'Making more time to talk worked much faster than cutting down the complaints. …To think one hot pot could change so much.',
            'Mehr Zeit zum Reden zu schaffen, hat viel schneller gewirkt, als die Beschwerden zu verringern. …Dass ein einziges Nabe-Essen so viel verändern kann.',
          ], 'happy'),
          pic('cg_epilog_home', '隅田川沿いのシェアハウス。窓の灯りの中で、六人が、同じ鍋を囲んで笑っていた。', [
            'The share house on the Sumida river. In the light of the window, six people laugh around the same pot.',
            'Die WG am Sumida-Fluss. Im Licht des Fensters lachen sechs Menschen um denselben Topf.',
          ]),
        ],
        teach: ['v:n3_1917', 'v:n3_1896', 'v:n3_1920'],
      },
    ],
  },

  // ------------------------------------------------------------------ the observation-deck attendant: the light across the bay
  {
    id: 'ep_deck_staff',
    chapter: 7,
    after: 'mq29',
    who: 'deck_staff',
    title: ['湾の向こうの光', 'The Light Across the Bay', 'Das Licht jenseits der Bucht'],
    summary: [
      'Every night a man comes to the observation deck and points the telescope at one hospital window across the bay.',
      'Jeden Abend kommt ein Mann auf die Aussichtsplattform und richtet das Fernrohr auf ein einziges Krankenhausfenster jenseits der Bucht.',
    ],
    scenes: [
      {
        at: 'deck_staff',
        goal: ['Talk to the observation-deck attendant', 'Sprich mit dem Angestellten der Aussichtsplattform'],
        lines: [
          l('deck_staff', '東京の夜の{風景|ふうけい|v:n3_1858}は、何度見ても飽きません。{街|まち|v:n3_1986}の灯りが、海まで{広がって|ひろがって|v:n3_1846}いるでしょう。', [
            'I never tire of Tokyo’s night view, however many times I see it. The city lights spread all the way to the sea, don’t they?',
            'Ich werde der nächtlichen Aussicht auf Tokio nie müde, so oft ich sie auch sehe. Die Lichter der Stadt reichen bis ans Meer, nicht wahr?',
          ]),
          l('deck_staff', '毎晩、閉館{ぎりぎり|ぎりぎり}に来るお客さんがいましてね。望遠鏡を、いつも同じ{方|ほう|v:n3_1925}に向けるんです。湾の向こうの病院です。', [
            'There’s a customer who comes every night just before closing. He always points the telescope in the same direction. At the hospital across the bay.',
            'Es gibt einen Gast, der jeden Abend kurz vor Schluss kommt. Er richtet das Fernrohr immer in dieselbe Richtung. Auf das Krankenhaus jenseits der Bucht.',
          ]),
          l('deck_staff', '{ふと||v:n3_1892}見ると、その人、泣いているんです。……今夜も、そろそろ来る時間です。', ['Sometimes I suddenly notice he’s crying. …It’s about time he came tonight, too.', 'Manchmal bemerke ich plötzlich, dass er weint. …Heute Abend müsste er auch bald kommen.']),
        ],
        teach: ['v:n3_1858', 'v:n3_1986', 'v:n3_1846', 'v:n3_1925', 'v:n3_1892'],
      },
      {
        at: 'deck_staff',
        goal: ['Wait at the telescope late at night', 'Warte spätabends am Fernrohr'],
        evening: true,
        music: 'tokyo_night',
        lines: [
          nar('閉館前。作業着の男の人が、望遠鏡にコインを入れた。', ['Before closing. A man in work clothes puts a coin into the telescope.', 'Kurz vor Schluss. Ein Mann in Arbeitskleidung wirft eine Münze ins Fernrohr.']),
          nar('「娘が、あの病院に入院しているんです。面会時間には、仕事で{間に合わない|まにあわない}。だから毎晩、ここから見るんです」', [
            '“My daughter is in that hospital. I can’t make visiting hours because of work. So every night I look from here.”',
            '„Meine Tochter liegt in dem Krankenhaus. Wegen der Arbeit schaffe ich es nie zur Besuchszeit. Deshalb schaue ich jeden Abend von hier.“',
          ]),
          nar('「九時になると、娘が窓の電気を三回つけたり消したりする。それが、『おやすみ』の合図なんです」', [
            '“At nine my daughter switches her window light on and off three times. That’s our signal for ‘good night’.”',
            '„Um neun schaltet meine Tochter das Licht am Fenster dreimal an und aus. Das ist unser Zeichen für ‚Gute Nacht‘.“',
          ]),
          nar('九時。湾の向こうの小さな窓で、光が三回またたいた。男の人は、望遠鏡の{表面|ひょうめん|v:n3_1845}にそっと{触れた|ふれた|v:n3_1905}。', [
            'Nine o’clock. In a small window across the bay, a light blinks three times. The man gently touches the surface of the telescope.',
            'Neun Uhr. In einem kleinen Fenster jenseits der Bucht blinkt dreimal ein Licht. Der Mann berührt sanft die Oberfläche des Fernrohrs.',
          ]),
        ],
        teach: ['v:n3_1845', 'v:n3_1905'],
      },
      {
        at: 'deck_staff',
        goal: ['Help the attendant answer the light', 'Hilf dem Angestellten, das Licht zu beantworten'],
        evening: true,
        lines: [
          l('deck_staff', '……毎晩、あの合図を見ていたんですね。でも、娘さんからは、こちらの光は見えない。', ['…So every night he was watching for that signal. But his daughter can’t see any light from here.', '…Jeden Abend hat er also auf dieses Zeichen gewartet. Aber seine Tochter kann von hier aus kein Licht sehen.']),
          ask(
            ['展望台の灯りで、答えてあげましょう', ['Let’s answer with the observation deck’s lights.', 'Lassen Sie uns mit dem Licht der Aussichtsplattform antworten.']],
            ['お父さんに、懐中電灯を貸してあげては？', ['Why not lend the father a torch?', 'Warum leihen Sie dem Vater keine Taschenlampe?']],
          ),
          l('deck_staff', '閉館の時間を少し{変更|へんこう|v:n3_1922}して、窓際の照明を三回点滅させましょう。上司には、わたしから話します。', [
            'Let’s change the closing time a little and flash the window lights three times. I’ll talk to my boss myself.',
            'Lassen Sie uns die Schließzeit ein wenig ändern und das Fensterlicht dreimal blinken lassen. Mit meinem Chef rede ich selbst.',
          ], 'happy'),
          nar('次の夜、九時。展望台の大きな窓が、三回またたいた。湾の向こうの小さな窓が、うれしそうに、何度も何度も光り返した。', [
            'The next night, nine o’clock. The big windows of the observation deck blink three times. Across the bay, the small window flashes back again and again, as if overjoyed.',
            'Am nächsten Abend um neun blinken die großen Fenster der Aussichtsplattform dreimal. Jenseits der Bucht blinkt das kleine Fenster immer wieder zurück, als würde es sich freuen.',
          ]),
          l('deck_staff', '展望台は、景色を見る場所だと思っていました。でも、{まさに||v:n3_1975}今夜は、誰かと誰かの気持ちをつなぐ場所でしたね。……これが、{本当|ほんとう|v:n3_1957}の展望台の仕事かもしれません。', [
            'I thought an observation deck was a place for looking at views. But tonight it was exactly a place that connects one person’s feelings with another’s. …Perhaps this is an observation deck’s true work.',
            'Ich dachte, eine Aussichtsplattform sei ein Ort, um die Aussicht zu betrachten. Aber heute Abend war sie genau ein Ort, der die Gefühle zweier Menschen verbindet. …Vielleicht ist das die wahre Aufgabe einer Aussichtsplattform.',
          ], 'happy'),
          pic('cg_tokyo_river', '夜の東京湾。展望台の光と、病院の小さな窓の光が、海をはさんで、またたき合っていた。', [
            'Tokyo Bay at night. The light of the observation deck and the light of the small hospital window blink at each other across the water.',
            'Die Bucht von Tokio bei Nacht. Das Licht der Aussichtsplattform und das Licht des kleinen Krankenhausfensters blinken einander über das Wasser hinweg zu.',
          ]),
        ],
        teach: ['v:n3_1922', 'v:n3_1975', 'v:n3_1957'],
      },
    ],
  },
];
