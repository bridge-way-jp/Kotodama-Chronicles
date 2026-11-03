import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 6, second round: the cinema manager, the castle-museum curator, the hotel porter, Tachibana-san. */
export const EPISODES_CH6B: Episode[] = [
  // ------------------------------------------------------------------ the cinema manager: the last screening
  {
    id: 'ep_kino_shihainin',
    chapter: 6,
    after: 'mq24',
    who: 'kino_shihainin',
    title: ['最後の上映', 'The Last Screening', 'Die letzte Vorstellung'],
    summary: [
      'The old cinema in Shinsekai closes at the end of the month. The manager wants to show one last film — but which one?',
      'Das alte Kino in Shinsekai schließt Ende des Monats. Der Leiter will noch einen letzten Film zeigen – aber welchen?',
    ],
    scenes: [
      {
        at: 'kino_shihainin',
        goal: ['Ask the cinema manager about the closing', 'Frag den Kinoleiter nach der Schließung'],
        lines: [
          l('kino_shihainin', '今月末で、この映画館は閉館です。父の代から六十年。{突然|とつぜん|v:n3_1616}決まったことでしてね。', ['This cinema closes at the end of the month. Sixty years, since my father’s day. It was decided suddenly.', 'Ende des Monats schließt dieses Kino. Sechzig Jahre, seit der Zeit meines Vaters. Es wurde ganz plötzlich entschieden.'], 'worried'),
          l('kino_shihainin', '{当時|とうじ|v:n3_1576}は、毎晩行列ができた。恋人たちの{デート||v:n3_1546}の場所で、いくつもの{出会い|であい|v:n3_1536}がありました。', [
            'Back then there was a queue every night. It was the place for couples’ dates, and so many people met here.',
            'Damals gab es jeden Abend eine Schlange. Es war der Ort für die Verabredungen der Paare, und so viele Begegnungen fanden hier statt.',
          ]),
          l('kino_shihainin', '最後に一本、上映しようと思うんですが、何がいいのか……。お客さんに{提案|ていあん|v:n3_1539}してもらおうにも、もう常連は少なくて。', [
            'I want to show one last film, but I don’t know what… I’d ask the customers for suggestions, but there are few regulars left.',
            'Ich will noch einen letzten Film zeigen, aber ich weiß nicht, welchen… Ich würde die Kunden um Vorschläge bitten, aber es gibt kaum noch Stammgäste.',
          ]),
          l('kino_shihainin', '向かいの古い店のおじさんたちなら、昔のことを覚えているかもしれません。', ['The old men at the old shop across the street might remember the old days.', 'Die alten Männer im alten Laden gegenüber erinnern sich vielleicht an die alten Zeiten.']),
        ],
        teach: ['v:n3_1616', 'v:n3_1576', 'v:n3_1546', 'v:n3_1536', 'v:n3_1539'],
      },
      {
        at: 'shin_shop',
        goal: ['Ask the old men at the shop about the cinema', 'Frag die alten Männer im Laden nach dem Kino'],
        lines: [
          nar('店先の将棋盤を囲むおじさんたちが、懐かしそうに目を細めた。', ['The old men around the shogi board in front of the shop narrow their eyes fondly.', 'Die alten Männer um das Shōgi-Brett vor dem Laden kneifen nostalgisch die Augen zusammen.']),
          nar('「あそこで女房と初めて見たのは、雪の中の駅で別れる恋人の{ドラマ||v:n3_1629}やった。スクリーンを{眺めて|ながめて|v:n3_1651}、二人で泣いたんや」', [
            '“The first thing I saw there with my wife was a drama about lovers parting at a snowy station. We watched the screen and cried together.”',
            '„Das Erste, was ich dort mit meiner Frau gesehen habe, war ein Drama über ein Liebespaar, das sich an einem verschneiten Bahnhof trennt. Wir haben auf die Leinwand geschaut und zusammen geweint.“',
          ]),
          nar('「わしもや！」「わしも、あれで告白した」――{年月|ねんげつ|v:n3_1610}が{流れて|ながれて|v:n3_1653}も、みんなが同じ映画を覚えていた。', [
            '“Me too!” “I proposed during that one.” — However many years have passed, they all remember the same film.',
            '„Ich auch!“ „Ich habe bei dem Film meine Liebe gestanden.“ – Wie viele Jahre auch vergangen sind, alle erinnern sich an denselben Film.',
          ]),
          nar('「支配人の親父さんが、何度もリバイバルしてくれた。あの映画のおかげで、この町の夫婦の{仲|なか|v:n3_1644}は、ええんやで」', [
            '“The manager’s old man revived it again and again. Thanks to that film, the couples in this town get along well.”',
            '„Der Vater des Kinoleiters hat ihn immer wieder neu gezeigt. Dank diesem Film verstehen sich die Ehepaare in dieser Stadt gut.“',
          ]),
        ],
        teach: ['v:n3_1629', 'v:n3_1651', 'v:n3_1610', 'v:n3_1653', 'v:n3_1644'],
      },
      {
        at: 'kino_shihainin',
        goal: ['Tell the cinema manager which film people remember', 'Erzähl dem Kinoleiter, an welchen Film sich die Leute erinnern'],
        evening: true,
        music: 'memory',
        lines: [
          l('kino_shihainin', '雪の駅の映画……。父が一番好きだった作品です。フィルムは、まだ倉庫にある。', ['The film with the snowy station… It was my father’s favourite. The reel is still in the storeroom.', 'Der Film mit dem verschneiten Bahnhof… Das war der Lieblingsfilm meines Vaters. Die Filmrolle ist noch im Lager.'], 'surprised'),
          l('kino_shihainin', '最後の日は、町の夫婦を全員招待する{つもりで||g:x_tsumoride}、ポスターを貼ります。お代はいらない。父{と共に|とともに|v:n3_1625}見送る上映です。', [
            'For the last day I’ll put up posters, meaning to invite every couple in town. No charge. A screening to see the place off, together with my father.',
            'Für den letzten Tag hänge ich Plakate auf, mit der Absicht, alle Paare der Stadt einzuladen. Ohne Eintritt. Eine Vorstellung zum Abschied, gemeinsam mit meinem Vater.',
          ], 'happy'),
          nar('最後の上映の夜。白髪の夫婦たちで、席はいっぱいになった。スクリーンの雪の駅で、恋人たちが別れると、客席のあちこちで、手が{閉じた|とじた|v:n3_1613}ハンカチを握っていた。', [
            'The night of the last screening. The seats are full of grey-haired couples. When the lovers part at the snowy station on screen, here and there in the audience hands clutch handkerchiefs.',
            'Die Nacht der letzten Vorstellung. Die Sitze sind voll mit grauhaarigen Paaren. Als sich das Liebespaar auf der Leinwand am verschneiten Bahnhof trennt, umklammern überall im Saal Hände ihre Taschentücher.',
          ]),
          l('kino_shihainin', '映画館はなくなっても、ここで生まれた思い出は、ちゃんとみんなに{届いて|とどいて|v:n3_1618}いた。……それで{納得|なっとく|v:n3_1659}できました。', [
            'Even if the cinema disappears, the memories born here really did reach everyone. …That I can accept.',
            'Auch wenn das Kino verschwindet – die Erinnerungen, die hier entstanden sind, haben alle wirklich erreicht. …Damit kann ich mich abfinden.',
          ], 'happy'),
          pic('cg_osaka_lantern', '新世界の夜。古い映画館の看板の灯りが、最後にもう一度、ゆっくりと消えていった。', [
            'Night in Shinsekai. The light of the old cinema’s sign slowly goes out, one last time.',
            'Nacht in Shinsekai. Das Licht der Leuchtreklame des alten Kinos erlischt langsam, ein letztes Mal.',
          ]),
        ],
        teach: ['v:n3_1625', 'v:n3_1613', 'v:n3_1618', 'v:n3_1659', 'g:x_tsumoride'],
      },
    ],
  },

  // ------------------------------------------------------------------ the castle-museum curator: the letter inside the armour
  {
    id: 'ep_museum_gakugei',
    chapter: 6,
    after: 'mq25',
    who: 'museum_gakugei',
    title: ['鎧の中の手紙', 'The Letter Inside the Armour', 'Der Brief in der Rüstung'],
    summary: [
      'While repairing an old suit of armour, the curator of the castle museum finds a letter hidden inside for four hundred years.',
      'Beim Restaurieren einer alten Rüstung findet die Kuratorin des Burgmuseums einen Brief, der vierhundert Jahre darin versteckt war.',
    ],
    scenes: [
      {
        at: 'museum_gakugei',
        goal: ['Ask the curator what she has found', 'Frag die Kuratorin, was sie gefunden hat'],
        lines: [
          l('museum_gakugei', '見てください！ この鎧を修理していたら、胸の{鉄|てつ|v:n3_1556}の板の裏から、小さな紙が出てきたんです。', ['Look! While I was repairing this armour, a small piece of paper came out from behind the iron plate on the chest.', 'Schauen Sie! Als ich diese Rüstung restauriert habe, kam hinter der Eisenplatte an der Brust ein kleines Stück Papier hervor.'], 'surprised'),
          l('museum_gakugei', 'この鎧は、{典型|てんけい|v:n3_1564}的な足軽のものです。でも、紐の結び方に{独特|どくとく|v:n3_1601}な{特徴|とくちょう|v:n3_1599}がある。持ち主は、若い兵士だったと思います。', [
            'This is a typical foot soldier’s armour. But the way the cords are tied has a distinctive feature. I think the owner was a young soldier.',
            'Das ist eine typische Rüstung eines einfachen Fußsoldaten. Aber die Art, wie die Schnüre gebunden sind, hat eine eigentümliche Besonderheit. Ich glaube, der Besitzer war ein junger Soldat.',
          ]),
          l('museum_gakugei', '手紙の{内容|ないよう|v:n3_1642}は、古い字で、わたしにも全部は読めません。……お城の石垣の前で、一緒に読んでみませんか。光の下のほうが、読みやすいので。', [
            'The contents of the letter are in old script, and even I can’t read all of it. …Shall we read it together in front of the castle walls? It’s easier to read in daylight.',
            'Der Inhalt des Briefes ist in alter Schrift, selbst ich kann nicht alles lesen. …Wollen wir ihn zusammen vor den Burgmauern lesen? Bei Tageslicht ist er leichter zu lesen.',
          ]),
        ],
        teach: ['v:n3_1556', 'v:n3_1564', 'v:n3_1601', 'v:n3_1599', 'v:n3_1642'],
      },
      {
        at: 'osaka_castle',
        goal: ['Read the letter with the curator in front of the castle', 'Lies den Brief mit der Kuratorin vor der Burg'],
        music: 'memory',
        lines: [
          nar('石垣の前で、学芸員さんが、一文字ずつ、ゆっくり読み上げた。', ['In front of the stone walls, the curator reads it out slowly, character by character.', 'Vor den Steinmauern liest die Kuratorin langsam, Zeichen für Zeichen, vor.']),
          nar('「母上へ。明日、{敵|てき|v:n3_1547}が来ます。わたしは{抵抗|ていこう|v:n3_1541}せずに逃げる者を、どうしても斬れません。これは臆病でしょうか」', [
            '“To my mother. Tomorrow the enemy comes. I cannot bring myself to cut down those who flee without resisting. Is this cowardice?”',
            '„An meine Mutter. Morgen kommt der Feind. Ich bringe es nicht über mich, jene niederzuschlagen, die fliehen, ohne Widerstand zu leisten. Ist das Feigheit?“',
          ]),
          nar('「でも、人を生かすことこそ、母上に教わった{道徳|どうとく|v:n3_1582}だと思うのです。もし帰れなかったら、どうか父上より先に、この手紙を読んでください」', [
            '“But I believe letting people live is the very morality you taught me, Mother. If I do not return, please read this letter before Father does.”',
            '„Aber ich glaube, Menschen leben zu lassen, ist genau die Moral, die Ihr mich gelehrt habt, Mutter. Falls ich nicht zurückkehre, lest diesen Brief bitte vor Vater.“',
          ]),
          nar('紙の端に、別の字で、小さな書き込みがあった。「この子、無事に帰る」――母親の字だった。', [
            'At the edge of the paper, in a different hand, a small note: “This child came home safely.” — The mother’s handwriting.',
            'Am Rand des Papiers steht in einer anderen Schrift eine kleine Notiz: „Dieses Kind ist wohlbehalten heimgekehrt.“ – Die Schrift der Mutter.',
          ]),
        ],
        teach: ['v:n3_1547', 'v:n3_1541', 'v:n3_1582'],
      },
      {
        at: 'museum_gakugei',
        goal: ['Talk to the curator about the letter', 'Sprich mit der Kuratorin über den Brief'],
        lines: [
          l('museum_gakugei', '無事に帰っていた……。四百年前の{出来事|できごと|v:n3_1548}なのに、なんだか、ほっとして涙が出ます。', ['He came home safely… It happened four hundred years ago, and still I’m so relieved I’m crying.', 'Er ist heil heimgekehrt… Das ist vor vierhundert Jahren passiert, und trotzdem bin ich so erleichtert, dass mir die Tränen kommen.'], 'happy'),
          l('museum_gakugei', '歴史というと、戦の勝ち負けばかり。でも、本当は、こういう一人一人の{問い|とい|v:n3_1570}でできているんですね。「これは臆病でしょうか」って。', [
            'When people talk about history, it’s all about who won the battles. But really, it’s made of questions like this, from each single person. “Is this cowardice?”',
            'Wenn man von Geschichte spricht, geht es nur darum, wer die Schlachten gewonnen hat. Aber eigentlich besteht sie aus solchen Fragen einzelner Menschen. „Ist das Feigheit?“',
          ]),
          ask(
            ['この手紙を、展示しましょう', ['Let’s put this letter on display.', 'Lassen Sie uns diesen Brief ausstellen.']],
            ['今の子どもたちにも、読んでほしいです', ['I’d like today’s children to read it too.', 'Ich möchte, dass auch die Kinder von heute ihn lesen.']],
          ),
          l('museum_gakugei', '鎧の隣に、手紙を展示します。{名|な|v:n3_1641}もない若い兵士の、小さな{哲学|てつがく|v:n3_1557}として。……{年寄|としより}も子どもも、きっと立ち止まってくれるはずです。', [
            'I’ll display the letter next to the armour. As the small philosophy of a young soldier with no name. …Old people and children alike will surely stop to read it.',
            'Ich stelle den Brief neben der Rüstung aus. Als kleine Philosophie eines namenlosen jungen Soldaten. …Alte wie Kinder werden bestimmt davor stehen bleiben.',
          ], 'happy'),
          pic('cg_osaka_castle', '大阪城の資料館。鎧の横の小さなガラスケースの前に、子どもたちが集まっていた。', [
            'The Osaka Castle museum. Children gather in front of a small glass case beside the armour.',
            'Das Museum der Burg Osaka. Kinder versammeln sich vor einer kleinen Vitrine neben der Rüstung.',
          ]),
        ],
        teach: ['v:n3_1548', 'v:n3_1570', 'v:n3_1641', 'v:n3_1557'],
      },
    ],
  },

  // ------------------------------------------------------------------ the hotel porter: the suitcase full of stickers
  {
    id: 'ep_porter',
    chapter: 6,
    after: 'mq22',
    who: 'porter',
    title: ['旅をしないポーター', 'The Porter Who Never Travels', 'Der Portier, der nie verreist'],
    summary: [
      'For thirty years the hotel porter has carried other people’s suitcases. He has never once travelled himself.',
      'Seit dreißig Jahren trägt der Hotelportier die Koffer anderer Leute. Er selbst ist nie verreist.',
    ],
    scenes: [
      {
        at: 'porter',
        goal: ['Talk to the hotel porter in Umeda', 'Sprich mit dem Hotelportier in Umeda'],
        lines: [
          l('porter', 'お{到着|とうちゃく|v:n3_1581}、お疲れさまでございます！ ……あ、失礼、お客様ではなかったですね。', ['Welcome — you must be tired after your journey! …Oh, excuse me, you aren’t a guest, are you.', 'Willkommen – Sie sind sicher müde von der Reise! …Oh, Verzeihung, Sie sind ja gar kein Gast.']),
          l('porter', 'このホテルで三十年、お客様の荷物を運んできました。外国の{都市|とし|v:n3_1609}のシールがいっぱいのスーツケースも、毎日見ます。', [
            'For thirty years I’ve carried guests’ luggage at this hotel. Every day I see suitcases covered in stickers from foreign cities.',
            'Seit dreißig Jahren trage ich in diesem Hotel das Gepäck der Gäste. Jeden Tag sehe ich Koffer voller Aufkleber aus ausländischen Städten.',
          ]),
          l('porter', 'でも、わたし自身は、旅をしたことがないんです。{独身|どくしん|v:n3_1598}で、母の介護もあって。{同僚|どうりょう|v:n3_1587}には笑われますよ。「荷物ばかり旅して、本人は動かない」って。', [
            'But I myself have never travelled. I’m single, and I was caring for my mother. My colleagues laugh at me: “Only your luggage travels, you never move.”',
            'Aber ich selbst bin nie verreist. Ich bin ledig und habe meine Mutter gepflegt. Meine Kollegen lachen mich aus: „Nur das Gepäck reist, du selbst rührst dich nie.“',
          ]),
          l('porter', '今朝、一人のお客様が、駅にスーツケースを忘れていかれまして。……一緒に探していただけませんか。', ['This morning a guest left her suitcase at the station. …Would you help me look for it?', 'Heute Morgen hat ein Gast ihren Koffer am Bahnhof vergessen. …Würden Sie mir suchen helfen?']),
        ],
        teach: ['v:n3_1581', 'v:n3_1609', 'v:n3_1598', 'v:n3_1587'],
      },
      {
        at: 'umeda_station',
        goal: ['Look for the guest’s suitcase at Umeda Station', 'Such den Koffer des Gastes am Bahnhof Umeda'],
        lines: [
          nar('駅の{停留所|ていりゅうじょ|v:n3_1545}のベンチに、古いスーツケースがあった。世界中の{鉄道|てつどう|v:n3_1560}のシールが貼ってある。', ['On a bench at the station stop there is an old suitcase, covered with stickers from railways all over the world.', 'Auf einer Bank an der Haltestelle am Bahnhof steht ein alter Koffer, beklebt mit Aufklebern von Eisenbahnen aus aller Welt.']),
          nar('名札には、こう書いてあった。「三十年前、梅田のホテルで、雨の中、傘をさしてくれたポーターさんへ。あなたのおかげで、旅が好きになりました」', [
            'On the name tag it says: “To the porter at the hotel in Umeda who held an umbrella over me in the rain thirty years ago. Thanks to you, I came to love travelling.”',
            'Auf dem Namensschild steht: „An den Portier im Hotel in Umeda, der vor dreißig Jahren im Regen einen Schirm über mich gehalten hat. Dank Ihnen habe ich das Reisen lieben gelernt.“',
          ]),
          nar('スーツケースの中には、{都会|とかい|v:n3_1591}の絵はがき、{登山|とざん|v:n3_1608}の写真、{天候|てんこう|v:n3_1565}の悪い日の日記。三十年分の旅の記録だった。', [
            'Inside the suitcase: postcards of cities, photos of mountain climbs, diary entries from days of bad weather. A record of thirty years of travel.',
            'Im Koffer: Postkarten von Großstädten, Fotos von Bergtouren, Tagebucheinträge von Tagen mit schlechtem Wetter. Eine Aufzeichnung von dreißig Jahren Reisen.',
          ]),
        ],
        teach: ['v:n3_1545', 'v:n3_1560', 'v:n3_1591', 'v:n3_1608', 'v:n3_1565'],
      },
      {
        at: 'porter',
        goal: ['Bring the suitcase back to the porter', 'Bring den Koffer zurück zum Portier'],
        lines: [
          nar('名札を読んだポーターさんは、しばらく、何も言えなかった。', ['After reading the name tag, the porter can’t say anything for a while.', 'Nachdem er das Namensschild gelesen hat, kann der Portier eine Weile nichts sagen.']),
          l('porter', '……覚えています。三十年前の雨の日、{手間|てま|v:n3_1562}だと思いながら、傘をさしたお客様。まさか、わたしに会うために、このスーツケースを。', [
            '…I remember. A guest on a rainy day thirty years ago — I held an umbrella over her, thinking what a bother it was. To think she brought this suitcase to see me.',
            '…Ich erinnere mich. Ein Gast an einem Regentag vor dreißig Jahren – ich habe den Schirm über sie gehalten und dabei gedacht, wie lästig das ist. Und jetzt hat sie diesen Koffer gebracht, um mich zu sehen.',
          ], 'surprised'),
          ask(
            ['今度は、ポーターさんが旅をする番ですね', ['Now it’s your turn to travel.', 'Jetzt sind Sie mit Reisen dran.']],
            ['このスーツケース、一緒にお返ししましょう', ['Let’s give the suitcase back together.', 'Lassen Sie uns den Koffer zusammen zurückgeben.']],
          ),
          l('porter', '荷物を運ぶのが、わたしの{得意|とくい|v:n3_1596}なことだと思っていました。でも、本当は、人の旅を始めさせていたんですね。', [
            'I thought carrying luggage was what I was good at. But in fact, I was getting people’s journeys started.',
            'Ich dachte, Gepäck tragen sei das, was ich gut kann. Aber eigentlich habe ich die Reisen der Menschen in Gang gesetzt.',
          ], 'happy'),
          l('porter', '来年、母を連れて、初めての旅に{飛び出して|とびだして}みます。……行き先は、このスーツケースの最初のシールの町に決めました。', [
            'Next year I’ll take my mother and set off on my very first trip. …I’ve decided the destination: the city on the first sticker on this suitcase.',
            'Nächstes Jahr nehme ich meine Mutter mit und breche zu meiner allerersten Reise auf. …Das Ziel habe ich schon: die Stadt auf dem ersten Aufkleber dieses Koffers.',
          ], 'happy'),
        ],
        teach: ['v:n3_1562', 'v:n3_1596'],
      },
    ],
  },

  // ------------------------------------------------------------------ Tachibana-san: words without a formula
  {
    id: 'ep_tachibana',
    chapter: 6,
    after: 'mq25',
    who: 'tachibana',
    title: ['型のない言葉', 'Words Without a Formula', 'Worte ohne Formel'],
    summary: [
      'Tachibana-san teaches perfect keigo. To her own mother, in a care home, she cannot say a single word that is not a formula.',
      'Frau Tachibana unterrichtet perfektes Keigo. Zu ihrer eigenen Mutter im Pflegeheim bringt sie kein einziges Wort heraus, das keine Floskel ist.',
    ],
    scenes: [
      {
        at: 'tachibana',
        goal: ['Ask Tachibana-san why she cancelled her lesson', 'Frag Frau Tachibana, warum sie ihren Kurs abgesagt hat'],
        lines: [
          l('tachibana', '……@name様。本日の研修は、中止にさせていただきました。{とんでもない||v:n3_1638}失礼を、申し訳ございません。', ['…@name. I have cancelled today’s training. My deepest apologies for this terrible discourtesy.', '…@name. Ich habe die heutige Schulung abgesagt. Ich bitte vielmals um Entschuldigung für diese unverzeihliche Unhöflichkeit.'], 'worried'),
          l('tachibana', '母が施設に入りまして。昨日、面会に行ったのですが……{適切|てきせつ|v:n3_1550}な言葉しか出てこないのです。「ご気分はいかがでしょうか」と。', [
            'My mother has moved into a care home. Yesterday I went to visit her, but… only appropriate phrases came out. “How are you feeling today?”',
            'Meine Mutter ist in ein Pflegeheim gezogen. Gestern habe ich sie besucht, aber… es kamen nur angemessene Floskeln heraus. „Wie fühlen Sie sich heute?“',
          ], 'worried'),
          l('tachibana', '母は笑って、「{友|とも|v:n3_1624}だちに話すみたいに話して」と。でも、二十年、{徹底|てってい|v:n3_1559}して型を身につけてきたので、型のない話し方が、{どうしても||v:n3_1579}思い出せません。', [
            'My mother laughed and said, “Talk to me like you’d talk to a friend.” But after twenty years of thoroughly drilling the formulas, I simply cannot remember how to speak without them.',
            'Meine Mutter lachte und sagte: „Sprich mit mir wie mit einer Freundin.“ Aber nachdem ich zwanzig Jahre lang gründlich die Formeln eingeübt habe, kann ich mich einfach nicht erinnern, wie man ohne sie spricht.',
          ]),
          l('tachibana', '中之島の古い会館で、母と昔、よく{読書|どくしょ|v:n3_1597}会に行ったのです。……そこに行けば、何か思い出せるでしょうか。', ['My mother and I often used to go to reading circles at the old hall in Nakanoshima. …If I go there, might I remember something?', 'Meine Mutter und ich sind früher oft in die alte Halle in Nakanoshima zu Lesekreisen gegangen. …Ob ich mich an etwas erinnere, wenn ich dorthin gehe?']),
        ],
        teach: ['v:n3_1638', 'v:n3_1550', 'v:n3_1624', 'v:n3_1559', 'v:n3_1579', 'v:n3_1597'],
      },
      {
        at: 'nakano_hall',
        goal: ['Visit the old hall in Nakanoshima', 'Besuch die alte Halle in Nakanoshima'],
        music: 'memory',
        lines: [
          nar('赤れんがの会館の掲示板に、色あせた写真があった。三十年前の、子ども読書会。', ['On the noticeboard of the red-brick hall is a faded photo: a children’s reading circle, thirty years ago.', 'Am Brett der Backsteinhalle hängt ein verblasstes Foto: ein Kinder-Lesekreis vor dreißig Jahren.']),
          nar('小さな女の子が、母親の膝の上で、大きな声で絵本を読んでいる。写真の下に、母親の字で一言。「{努力|どりょく|v:n3_1632}しなくていいの。好きな言葉で話してね」', [
            'A little girl on her mother’s lap reads a picture book aloud. Below the photo, a line in the mother’s handwriting: “You don’t have to try so hard. Speak in the words you love.”',
            'Ein kleines Mädchen sitzt auf dem Schoß seiner Mutter und liest laut aus einem Bilderbuch. Unter dem Foto eine Zeile in der Schrift der Mutter: „Du musst dich nicht anstrengen. Sprich mit den Worten, die du magst.“',
          ]),
          nar('女の子が持っている本は、関西弁で書かれた絵本だった。表紙には「ほな、またな」と、大きな字が{流れる|ながれる}ように書いてあった。', [
            'The book the girl is holding is a picture book written in Kansai dialect. On its cover, in big flowing letters: “Hona, mata na” — “See ya, then.”',
            'Das Buch, das das Mädchen hält, ist ein Bilderbuch im Kansai-Dialekt. Auf dem Umschlag steht in großen, fließenden Buchstaben: „Hona, mata na“ – „Na dann, bis bald.“',
          ]),
        ],
        teach: ['v:n3_1632'],
      },
      {
        at: 'tachibana',
        goal: ['Tell Tachibana-san about the photo', 'Erzähl Frau Tachibana von dem Foto'],
        lines: [
          l('tachibana', '……「ほな、またな」。母と、毎晩、寝る前に言い合っていた言葉です。', ['…“Hona, mata na.” The words my mother and I said to each other every night before sleeping.', '…„Hona, mata na.“ Die Worte, die meine Mutter und ich uns jeden Abend vor dem Schlafen gesagt haben.'], 'surprised'),
          l('tachibana', '敬語は、相手との{程度|ていど|v:n3_1544}な距離を作る道具です。仕事では大切。でも、{同様|どうよう|v:n3_1585}に、家族には、距離のない言葉も必要だったのですね。', [
            'Keigo is a tool for keeping a suitable distance from the other person. It matters at work. But in the same way, with family, words without distance were needed too.',
            'Keigo ist ein Werkzeug, um einen angemessenen Abstand zum anderen zu schaffen. Bei der Arbeit ist das wichtig. Aber genauso braucht man in der Familie Worte ohne Abstand.',
          ]),
          ask(
            ['今日、もう一度会いに行きましょう', ['Let’s go and see her again today.', 'Lassen Sie uns heute noch einmal zu ihr gehen.']],
            ['「ほな、またな」と言ってあげてください', ['Please say “hona, mata na” to her.', 'Sagen Sie ihr „Hona, mata na“.']],
          ),
          l('tachibana', '{とにかく||v:n3_1619}、行ってきます。型は、一回だけ、横に置いて。……{辛い|つらい|v:n3_1532}ときに、子どもに戻れる言葉があるのは、幸せなことでございますね。', [
            'I’ll go, no matter what. And for once, I’ll set the formulas aside. …It is a blessing to have words that take you back to childhood when things are hard.',
            'Ich gehe jedenfalls hin. Und lege die Formeln einmal beiseite. …Es ist ein Glück, Worte zu haben, mit denen man in schweren Zeiten wieder Kind sein darf.',
          ], 'happy'),
          nar('その夜、立花さんから、短いメッセージが届いた。「母が泣いて笑いました。帰りぎわ、二人で言いました。『ほな、またな』」', [
            'That night, a short message from Tachibana-san: “My mother cried and laughed. As I left, we both said it: ‘Hona, mata na.’”',
            'In der Nacht kommt eine kurze Nachricht von Frau Tachibana: „Meine Mutter hat geweint und gelacht. Beim Abschied haben wir beide gesagt: ‚Hona, mata na.‘“',
          ]),
        ],
        teach: ['v:n3_1544', 'v:n3_1585', 'v:n3_1619', 'v:n3_1532'],
      },
    ],
  },
];
