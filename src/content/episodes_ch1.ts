import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 1 (Hinomori): Ms. Mori, Haruto, Kaede, Aoi. */
export const EPISODES_CH1: Episode[] = [
  // ------------------------------------------------------------------ Ms. Mori: the one you say "tadaima" to
  {
    id: 'ep_mori',
    chapter: 1,
    after: 'mq1',
    who: 'mori',
    title: ['「ただいま」を言う相手', 'Someone to Say “Tadaima” To', 'Jemand, dem man „Tadaima“ sagt'],
    summary: [
      'Ms. Mori’s husband is in hospital, and his memory is fading. She asks you to look after the house.',
      'Frau Moris Mann liegt im Krankenhaus, und sein Gedächtnis lässt nach. Sie bittet dich, auf das Haus aufzupassen.',
    ],
    scenes: [
      {
        at: 'mori',
        goal: ['Listen to Ms. Mori’s request', 'Hör dir Frau Moris Bitte an'],
        lines: [
          l('mori', '@nameさん、ちょっといいかしら。……明日、{留守番|るすばん|v:n2_1877}をお願いできない？', [
            '@name, do you have a moment? …Could you look after the house for me tomorrow?',
            '@name, hast du kurz Zeit? …Könntest du morgen auf das Haus aufpassen?',
          ]),
          l('mori', '夫が、町の病院に入院しているの。最近ね、{記憶|きおく|v:kioku}が少しずつ{薄れて|うすれて|v:usureru}きているのよ。', [
            'My husband is in hospital in the city. Lately his memory has been fading, little by little.',
            'Mein Mann liegt in der Stadt im Krankenhaus. In letzter Zeit lässt sein Gedächtnis nach, ganz langsam.',
          ], 'worried'),
          l('mori', 'わたしの顔を見ても、{戸惑う|とまどう|v:tomadou}ことが増えて……。それでも、会いに行かない{わけにはいかない||g:wakeniwaikanai}でしょう？', [
            'More and more often he looks at my face and is at a loss… Even so, I can’t not go and see him, can I?',
            'Immer öfter sieht er mein Gesicht und ist verwirrt… Trotzdem kann ich doch nicht einfach nicht hingehen, oder?',
          ], 'worried'),
          ask(
            ['もちろんです。留守番します', ['Of course. I’ll look after the house.', 'Natürlich. Ich passe auf das Haus auf.']],
            ['わたしにできることなら、何でも', ['Anything I can do.', 'Alles, was ich tun kann.']],
          ),
          l('mori', 'ありがとう。じゃあ、この鍵を{預かって|あずかって|v:azukaru}くれる？ アパートの部屋、全部の鍵なの。', [
            'Thank you. Then will you keep these keys for me? They are the keys to every room in the building.',
            'Danke. Dann nimmst du diese Schlüssel für mich in Verwahrung? Es sind die Schlüssel zu allen Zimmern im Haus.',
          ], 'happy'),
          nar('鍵を渡す森さんの手は、少しだけ震えていた。', [
            'Ms. Mori’s hand trembles a little as she gives you the keys.',
            'Frau Moris Hand zittert ein wenig, als sie dir die Schlüssel gibt.',
          ]),
        ],
        teach: ['v:n2_1877', 'v:kioku', 'v:usureru', 'v:azukaru'],
      },
      {
        at: 'garden',
        goal: ['Water Ms. Mori’s vegetable patch in the evening', 'Gieß am Abend Frau Moris Gemüsebeet'],
        evening: true,
        music: 'memory',
        lines: [
          nar('夕方。森さんの畑に水をやっていると、土の上に古い{手帳|てちょう|v:n2_1255}が落ちていた。', [
            'Evening. While you water Ms. Mori’s patch, you find an old notebook lying on the soil.',
            'Abend. Während du Frau Moris Beet gießt, liegt da ein altes Notizbuch auf der Erde.',
          ]),
          nar('表紙に「正夫」と書いてある。森さんのご主人の名前だ。……悪いと思いながら、最後のページを開いてしまった。', [
            'On the cover it says “Masao” — the name of Ms. Mori’s husband. …Knowing you shouldn’t, you open the last page.',
            'Auf dem Umschlag steht „Masao“ – der Name von Frau Moris Mann. …Obwohl du weißt, dass es sich nicht gehört, schlägst du die letzte Seite auf.',
          ]),
          nar('震える字で、こう書いてあった。「忘れたくないこと」', [
            'In shaky handwriting it says: “Things I don’t want to forget.”',
            'In zittriger Schrift steht da: „Was ich nicht vergessen will.“',
          ]),
          nar('一、妻の名前は、千代子。　二、千代子のトマトは、日本一うまい。　三、家に帰ったら、かならず「{ただいま||v:n2_1117}」と言うこと。', [
            'One: my wife’s name is Chiyoko. Two: Chiyoko’s tomatoes are the best in Japan. Three: when I come home, always say “tadaima”.',
            'Erstens: Meine Frau heißt Chiyoko. Zweitens: Chiyokos Tomaten sind die besten in Japan. Drittens: Wenn ich nach Hause komme, immer „Tadaima“ sagen.',
          ]),
          nar('字は、ページの終わりに近づく{につれて||g:nitsurete}、小さく、{曖昧|あいまい|v:aimai}になっていく。', [
            'The closer it gets to the end of the page, the smaller and vaguer the writing becomes.',
            'Je näher das Ende der Seite kommt, desto kleiner und undeutlicher wird die Schrift.',
          ]),
          nar('{思わず|おもわず|v:omowazu}、手帳をぎゅっと胸に抱きしめた。', [
            'Without thinking, you hold the notebook tight against your chest.',
            'Unwillkürlich drückst du das Notizbuch fest an deine Brust.',
          ]),
        ],
        teach: ['v:n2_1255', 'v:n2_1117', 'v:aimai', 'v:omowazu', 'g:nitsurete'],
      },
      {
        at: 'mori',
        goal: ['Welcome Ms. Mori home', 'Empfange Frau Mori zu Hause'],
        music: 'memory',
        lines: [
          l('mori', 'ただいま、@nameさん。留守番、ありがとう。……ごめんなさいね、変な顔をしているでしょう。', [
            'I’m home, @name. Thank you for looking after the house. …Sorry, I must look strange.',
            'Ich bin zurück, @name. Danke fürs Aufpassen. …Entschuldige, ich sehe bestimmt seltsam aus.',
          ], 'worried'),
          l('mori', '今日ね、夫は、わたしの名前を、とうとう思い出せなかったの。', [
            'Today… my husband could not remember my name at all.',
            'Heute… konnte sich mein Mann überhaupt nicht mehr an meinen Namen erinnern.',
          ], 'worried'),
          nar('@nameは、畑で見つけた手帳を、そっと森さんに渡した。', [
            '@name quietly hands Ms. Mori the notebook from the vegetable patch.',
            '@name reicht Frau Mori leise das Notizbuch aus dem Beet.',
          ]),
          l('mori', 'これ……夫の手帳？ 病気だと{診断|しんだん|v:n2_0927}された日から、毎晩何か書いていたの。', [
            'This… is my husband’s notebook? From the day he was diagnosed, he wrote something in it every night.',
            'Das… ist das Notizbuch meines Mannes? Seit dem Tag der Diagnose hat er jeden Abend etwas hineingeschrieben.',
          ], 'surprised'),
          nar('森さんは最後のページを読んで、しばらく何も言わなかった。', [
            'Ms. Mori reads the last page and says nothing for a long while.',
            'Frau Mori liest die letzte Seite und sagt lange nichts.',
          ]),
          l('mori', '……ばかね、トマトのことなんか書いて。でもね、今日、帰りぎわにわたしが「ただいま」って言ったら……あの人、「おかえり」って言ったの。', [
            '…Silly man, writing about tomatoes. But today, as I was leaving, when I said “tadaima”… he said “okaeri”.',
            '…Dummkopf, schreibt über Tomaten. Aber heute, als ich ging und „Tadaima“ sagte… da hat er „Okaeri“ gesagt.',
          ]),
          ask(
            ['言葉は、ちゃんと残っていたんですね', ['The words were still there.', 'Die Worte waren noch da.']],
            ['（何も言わずに、そっと隣に座る）', ['(Sit down quietly beside her without a word)', '(Setz dich wortlos leise neben sie)']],
          ),
          l('mori', 'ええ……。大家として、あなたを支えるつもりだったのに。人を{慰める|なぐさめる|v:n2_1343}のは、言葉がなくてもできるのね。', [
            'Yes… As your landlady I meant to be the one supporting you. You can comfort someone even without words, can’t you.',
            'Ja… Als deine Vermieterin wollte eigentlich ich dich unterstützen. Man kann jemanden auch ohne Worte trösten, nicht wahr.',
          ], 'happy'),
          l('mori', '待っている人がいる{からこそ||g:karakoso}、人は帰ってこられるのね。最近、{しみじみ||v:n2_0805}そう思うの。', [
            'It is precisely because someone is waiting that people can come home. Lately I feel that deep in my heart.',
            'Gerade weil jemand wartet, können Menschen nach Hause kommen. In letzter Zeit spüre ich das ganz tief.',
          ]),
          pic('cg_heart_mori', '夕方、買い物から帰ると、森さんが玄関で待っていた。「おかえりなさい」', [
            'Coming home from shopping in the evening, you find Ms. Mori waiting at the door. “Welcome home.”',
            'Als du am Abend vom Einkaufen heimkommst, wartet Frau Mori an der Tür. „Willkommen zu Hause.“',
          ]),
          l('mori', 'これからも、「ただいま」って帰ってきてね、@nameさん。', [
            'Keep coming home and saying “tadaima”, @name.',
            'Komm auch weiterhin nach Hause und sag „Tadaima“, @name.',
          ], 'happy'),
        ],
        teach: ['v:n2_0927', 'v:n2_1343', 'v:n2_0805', 'g:karakoso'],
      },
    ],
  },

  // ------------------------------------------------------------------ Haruto: the last rice ball
  {
    id: 'ep_haruto',
    chapter: 1,
    after: 'mq2',
    who: 'haruto',
    title: ['最後の梅おにぎり', 'The Last Plum Rice Ball', 'Der letzte Pflaumen-Reisball'],
    summary: [
      'An old regular who buys one rice ball every night has not come for three days. Haruto is worried.',
      'Ein alter Stammkunde, der jeden Abend einen Reisball kauft, ist seit drei Tagen nicht gekommen. Haruto macht sich Sorgen.',
    ],
    scenes: [
      {
        at: 'haruto',
        goal: ['Hear what worries Haruto', 'Hör dir an, was Haruto Sorgen macht'],
        lines: [
          l('haruto', 'なあ@name、毎晩十時に来るじいちゃん、知ってる？ あの{常連|じょうれん|v:jouren}さん。', [
            'Hey @name, you know the old man who comes every night at ten? That regular.',
            'Sag mal, @name, kennst du den alten Mann, der jeden Abend um zehn kommt? Den Stammkunden.',
          ]),
          l('haruto', 'いつも{賞味期限|しょうみきげん|v:shoumikigen}ぎりぎりの梅おにぎりを、一つだけ買っていくんだ。「もったいないから」って。', [
            'He always buys just one plum rice ball that is about to pass its best-before date. “It would be a waste,” he says.',
            'Er kauft immer genau einen Pflaumen-Reisball, der kurz vor dem Mindesthaltbarkeitsdatum ist. „Wäre doch schade drum“, sagt er.',
          ]),
          l('haruto', 'それが、もう三日も来ない。あの人が休むなんて、{めったに||v:mettani}ないのに。', [
            'And now he hasn’t come for three days. He hardly ever misses a day.',
            'Und jetzt ist er seit drei Tagen nicht gekommen. Er fehlt fast nie.',
          ], 'worried'),
          l('haruto', 'さっきから{そわそわ||v:sowasowa}して、仕事が{一向に|いっこうに|v:ikkouni}進まない。何かあった{に違いない||g:nichigainai}よ。', [
            'I’ve been restless all evening and my work isn’t getting anywhere. Something must have happened.',
            'Ich bin den ganzen Abend unruhig und komme mit der Arbeit überhaupt nicht voran. Da muss etwas passiert sein.',
          ], 'worried'),
          ask(['わたしが様子を見てきます', ['I’ll go and see how he is.', 'Ich schaue nach, wie es ihm geht.']]),
          l('haruto', '本当か！ 住所は、ポイントカードの申込書に……三丁目の、十二{番地|ばんち|v:n2_1471}だ。', [
            'Really? His address is on his point-card form… 3-chōme, number 12.',
            'Wirklich? Seine Adresse steht auf dem Antrag für die Punktekarte… 3-chōme, Hausnummer 12.',
          ], 'surprised'),
          l('haruto', 'あと、これ。{在庫|ざいこ|v:zaiko}の最後の梅おにぎり。じいちゃんの分、取っておいたんだ。', [
            'And take this. The last plum rice ball in stock. I kept it for him.',
            'Und nimm das mit. Der letzte Pflaumen-Reisball, den wir noch haben. Ich habe ihn für ihn aufgehoben.',
          ]),
        ],
        teach: ['v:shoumikigen', 'v:mettani', 'v:sowasowa', 'v:ikkouni', 'g:nichigainai'],
        give: ['onigiri', 1],
      },
      {
        at: 'sakura',
        goal: ['Look for the old regular (3-chōme 12, near the big cherry tree)', 'Such den alten Stammkunden (3-chōme 12, beim großen Kirschbaum)'],
        evening: true,
        music: 'memory',
        lines: [
          nar('三丁目の十二番地には、誰もいなかった。……ふと見ると、大きな桜の木の下に、おじいさんが座っている。', [
            'Nobody is home at 3-chōme 12. …Then you notice an old man sitting under the big cherry tree.',
            'In 3-chōme 12 ist niemand zu Hause. …Dann siehst du einen alten Mann unter dem großen Kirschbaum sitzen.',
          ]),
          nar('顔色が悪く、{ぐったり||v:guttari}している。', ['He looks pale and completely exhausted.', 'Er ist blass und völlig erschöpft.']),
          ask(['大丈夫ですか！', ['Are you all right?', 'Geht es Ihnen gut?']]),
          l('customer', '……ああ、すまんね。ちょっと{ふらふら||v:furafura}して、座っていただけだ。そんなに{慌てる|あわてる|v:awateru}ことはないよ。', [
            '…Ah, sorry. I just felt a bit dizzy and sat down. No need to panic.',
            '…Ach, entschuldige. Mir war nur etwas schwindelig, da habe ich mich hingesetzt. Kein Grund zur Aufregung.',
          ]),
          l('customer', '三日前が、家内の命日でね。この桜の下で、毎年二人で花見をしたんだ。', [
            'Three days ago was the anniversary of my wife’s death. Every year we watched the blossoms under this tree, the two of us.',
            'Vor drei Tagen war der Todestag meiner Frau. Jedes Jahr haben wir zu zweit unter diesem Baum die Kirschblüten angeschaut.',
          ]),
          l('customer', '家内の梅おにぎりが、{恋しくて|こいしくて|v:n2_0606}な。……コンビニのは、少しだけ、あれに似ているんだよ。', [
            'I miss my wife’s plum rice balls so much. …The konbini ones are a little like hers.',
            'Ich vermisse die Pflaumen-Reisbälle meiner Frau so sehr. …Die aus dem Konbini sind ihren ein kleines bisschen ähnlich.',
          ]),
          nar('@nameは、ハルトから預かったおにぎりを差し出した。', ['@name holds out the rice ball from Haruto.', '@name reicht ihm den Reisball von Haruto.']),
          l('customer', '……ハルトくんが、わしのために？ そうか……。じゃあ、{早速|さっそく|v:n2_0730}いただこう。', [
            '…Haruto kept this for me? I see… Then I’ll have it right away.',
            '…Haruto hat das für mich aufgehoben? Ach so… Dann esse ich ihn gleich.',
          ], 'happy'),
          nar('おじいさんは、ゆっくり、ゆっくり、おにぎりを食べた。桜の花びらが、一枚、肩に落ちた。', [
            'The old man eats the rice ball slowly, very slowly. A single cherry petal falls on his shoulder.',
            'Der alte Mann isst den Reisball langsam, ganz langsam. Ein einzelnes Kirschblütenblatt fällt auf seine Schulter.',
          ]),
        ],
        teach: ['v:guttari', 'v:furafura', 'v:awateru', 'v:n2_0606', 'v:n2_0730'],
      },
      {
        at: 'haruto',
        goal: ['Tell Haruto what happened', 'Erzähl Haruto, was passiert ist'],
        lines: [
          l('haruto', 'じいちゃん、無事だったのか！ ……よかった。本当に、よかった。', ['He’s all right? …Thank goodness. Really, thank goodness.', 'Es geht ihm gut? …Zum Glück. Wirklich, zum Glück.'], 'happy'),
          l('haruto', 'そっか、奥さんの味か……。実はさ、おれ、昔は料理人になりたかったんだ。', [
            'I see, his wife’s taste… You know, I used to want to become a cook.',
            'Verstehe, der Geschmack seiner Frau… Weißt du, früher wollte ich Koch werden.',
          ]),
          l('haruto', '決めた。仕事に行く{ついでに||g:tsuideni}、毎朝じいちゃんの分だけ、自分でおにぎりを握る。{こつこつ||v:kotsukotsu}練習して、奥さんの味に近づけてみせる。', [
            'I’ve decided. On my way to work, every morning, I’ll make a rice ball just for him. I’ll practise step by step and get close to his wife’s taste.',
            'Ich hab’s beschlossen. Auf dem Weg zur Arbeit mache ich jeden Morgen einen Reisball nur für ihn. Ich übe Schritt für Schritt, bis ich dem Geschmack seiner Frau nahekomme.',
          ]),
          nar('――それから、二週間後。', ['— Two weeks later.', '— Zwei Wochen später.']),
          l('haruto', '@name、聞いてくれよ！ じいちゃんがおれのおにぎりを食べて、泣いたんだ。「家内の味だ」って。{ついに||v:tsuini}、だよ！', [
            '@name, listen! The old man ate my rice ball and cried. “That’s my wife’s taste,” he said. Finally!',
            '@name, hör zu! Der alte Mann hat meinen Reisball gegessen und geweint. „Das ist der Geschmack meiner Frau“, hat er gesagt. Endlich!',
          ], 'happy'),
          l('haruto', 'おれ、あんなに{感激|かんげき|v:n2_0453}したの、生まれて初めてかもしれない。', [
            'I think I’ve never been so moved in my whole life.',
            'Ich glaube, ich war in meinem ganzen Leben noch nie so gerührt.',
          ], 'happy'),
          pic('cg_heart_haruto', 'コンビニの裏。休憩中のハルトくんが、大きなおにぎりを差し出した。', [
            'Behind the konbini. Haruto, on his break, holds out a huge rice ball.',
            'Hinter dem Konbini. Haruto hält dir in seiner Pause einen riesigen Reisball hin.',
          ]),
          l('haruto', 'はい、これは@nameの分。お礼に、{思いっきり|おもいっきり|v:n2_0325}でっかく握っといた！', [
            'Here, this one’s for you. As thanks I made it as big as I possibly could!',
            'Hier, der ist für dich. Als Dankeschön habe ich ihn so groß gemacht, wie es nur ging!',
          ], 'happy'),
        ],
        teach: ['v:kotsukotsu', 'v:tsuini', 'v:n2_0453', 'v:n2_0325', 'g:tsuideni'],
        give: ['onigiri', 3],
      },
    ],
  },

  // ------------------------------------------------------------------ Kaede: her mother's taste, her own taste
  {
    id: 'ep_kaede',
    chapter: 1,
    after: 'mq3',
    who: 'kaede',
    title: ['母の味、わたしの味', 'My Mother’s Taste, My Own', 'Der Geschmack meiner Mutter, mein eigener'],
    summary: [
      'The last line of Kaede’s mother’s recipe has faded. Without it, the old regulars say, the coffee is not the same.',
      'Die letzte Zeile im Rezept von Kaedes Mutter ist verblasst. Ohne sie, sagen die alten Stammgäste, ist der Kaffee nicht derselbe.',
    ],
    scenes: [
      {
        at: 'kaede',
        goal: ['Ask Kaede why she looks sad', 'Frag Kaede, warum sie traurig aussieht'],
        music: 'cafe',
        lines: [
          l('kaede', 'いらっしゃい、@nameさん。……ごめんね、今日はちょっと元気がなくて。', ['Welcome, @name. …Sorry, I’m a bit low today.', 'Willkommen, @name. …Entschuldige, ich bin heute etwas niedergeschlagen.'], 'worried'),
          l('kaede', '今月の{売り上げ|うりあげ|v:n2_0240}、また下がっちゃった。お客さんは{相変わらず|あいかわらず|v:n2_0122}来てくれるけど、昔からの常連さんが、少しずつ減ってるの。', [
            'This month’s takings went down again. Customers still come as always, but the old regulars are slowly getting fewer.',
            'Der Umsatz ist diesen Monat schon wieder gesunken. Die Gäste kommen wie immer, aber die alten Stammgäste werden langsam weniger.',
          ], 'worried'),
          l('kaede', '「お母さんのコーヒーが飲みたい」って言われると……ね。', ['When they say “I miss your mother’s coffee”… you know.', 'Wenn sie sagen „Ich hätte gern den Kaffee deiner Mutter“… du weißt schon.']),
          l('kaede', 'これ、母のレシピノート。ほとんど全部書いてあるのに、最後の一行だけ、字が{消えかけて|きえかけて|g:x_kake}いるの。', [
            'This is my mother’s recipe notebook. Almost everything is written down, but the very last line has nearly faded away.',
            'Das ist das Rezeptheft meiner Mutter. Fast alles steht drin, nur die allerletzte Zeile ist fast verblasst.',
          ]),
          nar('「最後に、{匙|さじ|v:n2_0720}一杯の……」そこから先は、にじんで読めない。', ['“Finally, one spoonful of…” After that, the ink has run and it can’t be read.', '„Zum Schluss einen Löffel voll…“ Danach ist die Tinte verlaufen und nicht mehr lesbar.']),
          l('kaede', '{惜しい|おしい|v:n2_0297}でしょう？ あと少しなのに。', ['So close, isn’t it? It’s almost there.', 'Ärgerlich, oder? Es fehlt nur noch so wenig.']),
          ask(['一緒に手がかりを探しましょう', ['Let’s look for a clue together.', 'Lass uns zusammen nach einem Hinweis suchen.']]),
          l('kaede', 'ありがとう。……そうだ、佐藤先生は母の店に毎朝来ていたの。何か覚えているかもしれない。', [
            'Thank you. …Oh, Mr. Satō came to my mother’s café every morning. Maybe he remembers something.',
            'Danke. …Ach ja, Herr Satō kam jeden Morgen ins Café meiner Mutter. Vielleicht erinnert er sich an etwas.',
          ], 'happy'),
        ],
        teach: ['v:n2_0240', 'v:n2_0122', 'v:n2_0720', 'v:n2_0297', 'g:x_kake'],
      },
      {
        at: 'sato',
        goal: ['Ask Mr. Satō about Kaede’s mother’s coffee', 'Frag Herrn Satō nach dem Kaffee von Kaedes Mutter'],
        lines: [
          l('sato', '楓さんのお母さんのコーヒーですか。ええ、毎朝いただいていましたよ。', ['Kaede’s mother’s coffee? Yes, I had it every morning.', 'Den Kaffee von Kaedes Mutter? Ja, den habe ich jeden Morgen getrunken.']),
          l('sato', '不思議なことに、毎日少しずつ味が違ったのです。疲れた日は甘く、寝不足の日は{さっぱり||v:sappari}と。', [
            'Strangely, it tasted a little different every day. Sweet on tired days, light and refreshing after a short night.',
            'Seltsamerweise schmeckte er jeden Tag ein bisschen anders. An müden Tagen süß, nach kurzen Nächten frisch und leicht.',
          ]),
          l('sato', 'いつも、わたしの顔を見てから豆を{まぜて||v:n2_1675}いました。そしてカップを置くとき、必ず「今日はどう？」と聞くのです。', [
            'She always looked at my face before mixing the beans. And when she set down the cup, she always asked, “How are you today?”',
            'Sie sah mir immer ins Gesicht, bevor sie die Bohnen mischte. Und wenn sie die Tasse hinstellte, fragte sie immer: „Wie geht’s dir heute?“',
          ]),
          l('sato', 'わたしの{感想|かんそう|v:n2_0460}を、小さなノートに書いていましたね。', ['She wrote down what I said about it in a little notebook.', 'Was ich dazu sagte, schrieb sie in ein kleines Heft.']),
          l('sato', 'あの味は、豆の{成分|せいぶん|v:n2_1003}だけでできていた{わけではない||g:wakedewanai}と思いますよ。その日のわたしに{ぴったり||v:pittari}だった。それが、あのコーヒーでした。', [
            'I don’t think that taste came only from what was in the beans. It was exactly right for me on that day. That was her coffee.',
            'Ich glaube nicht, dass dieser Geschmack nur aus den Bestandteilen der Bohnen kam. Er passte genau zu mir an diesem Tag. Das war ihr Kaffee.',
          ], 'happy'),
        ],
        teach: ['v:sappari', 'v:n2_1675', 'v:n2_0460', 'v:n2_1003', 'v:pittari', 'g:wakedewanai'],
      },
      {
        at: 'kaede',
        goal: ['Bring Mr. Satō’s answer to Kaede', 'Bring Kaede die Antwort von Herrn Satō'],
        music: 'cafe',
        lines: [
          nar('佐藤先生の話を伝えると、楓さんは、母のノートをじっと見つめた。', ['When you pass on Mr. Satō’s words, Kaede stares at her mother’s notebook.', 'Als du Herrn Satōs Worte weitergibst, schaut Kaede lange auf das Heft ihrer Mutter.']),
          l('kaede', '「最後に、匙一杯の」……「今日はどう？」……そうか。母は、材料じゃなくて、人を見ていたんだ。', [
            '“Finally, one spoonful of”… “How are you today?”… I see. My mother wasn’t looking at the ingredients — she was looking at people.',
            '„Zum Schluss einen Löffel voll“… „Wie geht’s dir heute?“… Ich verstehe. Meine Mutter hat nicht auf die Zutaten geschaut, sondern auf die Menschen.',
          ], 'surprised'),
          l('kaede', 'そんな{発想|はっそう|v:n2_1443}、わたしにはなかった。{結局|けっきょく|v:kekkyoku}、わたしは母の味を、カップの中ばかり探していたのね。', [
            'That way of thinking never occurred to me. In the end, I was only searching for her taste inside the cup.',
            'Auf diesen Gedanken bin ich nie gekommen. Am Ende habe ich ihren Geschmack immer nur in der Tasse gesucht.',
          ]),
          l('kaede', 'じゃあ、練習させて。……@nameさん、今日はどう？', ['Then let me practise. …@name, how are you today?', 'Dann lass mich üben. …@name, wie geht’s dir heute?'], 'happy'),
          ask(
            ['ちょっと疲れています', ['A bit tired.', 'Ein bisschen müde.']],
            ['わくわくしています', ['Excited.', 'Voller Vorfreude.']],
          ),
          l('kaede', 'じゃあ、ミルクを{たっぷり||v:tappuri}入れるね。気持ちが{落着く|おちつく|v:n2_0304}から。人の気持ちは、毎日変わる{ものだ||g:monoda}から。', [
            'Then I’ll put in plenty of milk. It calms you down. People’s feelings change every day, after all.',
            'Dann kommt reichlich Milch hinein. Das beruhigt. Die Gefühle der Menschen ändern sich ja jeden Tag.',
          ], 'happy'),
          pic('cg_heart_kaede', '閉店後の喫茶ことのは。楓さんが、新しいカップを、そっとカウンターに置いた。「今日はどう？」', [
            'Café Kotonoha after closing. Kaede gently sets a new cup on the counter. “How are you today?”',
            'Das Café Kotonoha nach Ladenschluss. Kaede stellt behutsam eine neue Tasse auf die Theke. „Wie geht’s dir heute?“',
          ]),
          l('kaede', '母のまねじゃなくて、わたしのやり方で、一人一人に聞いてみる。……ありがとう、@nameさん。', [
            'Not copying my mother, but in my own way: I’ll ask each person. …Thank you, @name.',
            'Nicht meine Mutter nachmachen, sondern auf meine Art: Ich frage jeden Einzelnen. …Danke, @name.',
          ], 'happy'),
        ],
        teach: ['v:n2_1443', 'v:kekkyoku', 'v:tappuri', 'v:n2_0304', 'g:monoda'],
      },
    ],
  },

  // ------------------------------------------------------------------ Aoi: the call she cannot make
  {
    id: 'ep_aoi',
    chapter: 1,
    after: 'mq4',
    who: 'aoi',
    title: ['かけられない電話', 'The Call She Cannot Make', 'Der Anruf, den sie nicht machen kann'],
    summary: [
      'Aoi has not spoken to her mother for three months — and the deadline for her job essay is tomorrow.',
      'Aoi hat seit drei Monaten nicht mit ihrer Mutter gesprochen – und morgen ist Abgabeschluss für ihren Bewerbungsaufsatz.',
    ],
    scenes: [
      {
        at: 'aoi',
        goal: ['Find out why Aoi is on edge', 'Finde heraus, warum Aoi so angespannt ist'],
        lines: [
          l('aoi', 'あ、@name……ごめん、今ちょっと{いらいら||v:iraira}してて。', ['Oh, @name… sorry, I’m a bit on edge right now.', 'Ach, @name… sorry, ich bin gerade ziemlich gereizt.'], 'worried'),
          l('aoi', '就職の作文、{締め切り|しめきり|v:shimekiri}が明日なの。テーマは「あなたが働きたい理由」。……もう{ぎりぎり||v:girigiri}なのに、一行も書けない。', [
            'My job-application essay is due tomorrow. The topic is “Why you want to work”. …It’s down to the wire and I can’t write a single line.',
            'Mein Bewerbungsaufsatz muss morgen abgegeben werden. Das Thema: „Warum Sie arbeiten möchten“. …Es ist knapp, und ich kriege keine Zeile hin.',
          ], 'worried'),
          l('aoi', '本当はね、{古里|ふるさと|v:n2_1590}の母と、三か月話してないの。家のお店を継がないって言ったら、けんかになっちゃって。', [
            'Actually, I haven’t talked to my mother back home for three months. When I said I wouldn’t take over the family shop, we had a fight.',
            'Ehrlich gesagt habe ich seit drei Monaten nicht mit meiner Mutter in der Heimat gesprochen. Als ich sagte, dass ich den Familienladen nicht übernehme, haben wir uns gestritten.',
          ]),
          l('aoi', '「働きたい理由」なんて書いたら、全部{言い訳|いいわけ|v:iiwake}に見えそうで……。このままだと、作文も、母とのことも、だめになり{かねない||g:kanenai}。', [
            'Whatever I write as “why I want to work” looks like an excuse… At this rate, the essay and things with my mother could both fall apart.',
            'Was ich auch als „Grund“ schreibe, klingt wie eine Ausrede… So wie es aussieht, könnte beides kaputtgehen: der Aufsatz und das mit meiner Mutter.',
          ], 'worried'),
          ask(
            ['お母さんに電話してみたら？', ['Why not call your mother?', 'Warum rufst du nicht deine Mutter an?']],
            ['一緒に考えよう', ['Let’s think it through together.', 'Lass uns das zusammen durchdenken.']],
          ),
          l('aoi', '……電話、か。ずっと、かけようとしては{ためらって||v:n2_1131}たんだ。駅の時刻表を見ると、帰りたくなっちゃうし。', [
            '…A call, huh. I keep trying and then hesitating. And when I look at the train timetable at the station, I just want to go home.',
            '…Ein Anruf, hm. Ich will immer anrufen und zögere dann doch. Und wenn ich am Bahnhof auf den Fahrplan schaue, will ich nur noch nach Hause.',
          ]),
        ],
        teach: ['v:iraira', 'v:shimekiri', 'v:girigiri', 'v:n2_1590', 'v:iiwake', 'v:n2_1131', 'g:kanenai'],
      },
      {
        at: 'station_timetable',
        goal: ['Meet Aoi at the station timetable', 'Triff Aoi am Fahrplan im Bahnhof'],
        evening: true,
        lines: [
          nar('夕方の駅。アオイさんは、時刻表の前で、スマホを握りしめていた。', ['The station in the evening. Aoi stands in front of the timetable, clutching her phone.', 'Der Bahnhof am Abend. Aoi steht vor dem Fahrplan und umklammert ihr Handy.']),
          l('aoi', '{どきどき||v:dokidoki}して、指が動かない。……@name、そばにいてくれる？', ['My heart is pounding and my fingers won’t move. …@name, will you stay with me?', 'Mein Herz klopft, und meine Finger bewegen sich nicht. …@name, bleibst du bei mir?'], 'worried'),
          nar('呼び出し音が三回。そして――', ['Three rings. And then —', 'Dreimal klingelt es. Und dann –']),
          l('aoi', '……もしもし、お母さん？ ……うん、わたし。……ごめんね。', ['…Hello, Mum? …Yes, it’s me. …I’m sorry.', '…Hallo, Mama? …Ja, ich bin’s. …Es tut mir leid.']),
          nar('受話口から、小さく笑う声が聞こえた。アオイさんの目から、涙がこぼれた。', ['A quiet laugh comes from the phone. Tears fall from Aoi’s eyes.', 'Aus dem Telefon kommt ein leises Lachen. Aoi kommen die Tränen.']),
          l('aoi', '母がね、「言いたいことは、{はっきり||v:hakkiri}言いなさい。あんたらしく働けば、それでいい」って。', [
            'My mother said: “Say clearly what you want to say. If you work in your own way, that’s enough.”',
            'Meine Mutter hat gesagt: „Sag deutlich, was du sagen willst. Wenn du auf deine Art arbeitest, ist das gut so.“',
          ], 'happy'),
          l('aoi', 'けんかを{きっかけに||g:wokikkakeni}、わたし、ずっと逃げてたんだね。母は、怒ってなんかいなかったのに。', [
            'After the fight I just kept running away. And my mother wasn’t even angry.',
            'Seit dem Streit bin ich nur weggelaufen. Dabei war meine Mutter gar nicht wütend.',
          ]),
        ],
        teach: ['v:dokidoki', 'v:hakkiri', 'g:wokikkakeni'],
      },
      {
        at: 'aoi',
        goal: ['See how Aoi’s essay is going', 'Schau, wie es mit Aois Aufsatz läuft'],
        lines: [
          l('aoi', '@name！ 見て、作文、書けたよ。昨日の夜、{すらすら||v:surasura}書けたの。', ['@name! Look, I finished the essay. Last night it just flowed.', '@name! Schau, der Aufsatz ist fertig. Gestern Abend lief es ganz flüssig.'], 'happy'),
          l('aoi', '働きたい理由はね、「母の店で、お客さんの笑顔を見て育ったから。今度は、自分の場所で、それを作りたいから」。', [
            'My reason for wanting to work: “Because I grew up watching customers smile in my mother’s shop. Now I want to make that happen in a place of my own.”',
            'Mein Grund: „Weil ich im Laden meiner Mutter mit dem Lächeln der Kunden aufgewachsen bin. Jetzt möchte ich das an meinem eigenen Ort schaffen.“',
          ]),
          l('aoi', '店を継がない理由じゃなくて、母から{受け継いだ|うけついだ}もの。それを書けばよかったんだ。', [
            'Not why I won’t take over the shop, but what I inherited from my mother. That’s what I should have written.',
            'Nicht, warum ich den Laden nicht übernehme, sondern was ich von meiner Mutter mitbekommen habe. Das hätte ich schreiben sollen.',
          ]),
          l('aoi', 'なんだか、胸の中が{すっきり||v:sukkiri}した。結果がだめでも、{少なくとも|すくなくとも|v:n2_0963}、もう逃げてないもん。', [
            'Somehow my chest feels clear. Even if the result is bad, at least I’m not running away any more.',
            'Irgendwie fühle ich mich ganz befreit. Selbst wenn es nicht klappt – wenigstens laufe ich nicht mehr weg.',
          ], 'happy'),
          pic('cg_heart_aoi', '喫茶ことのはで、スーツ姿のアオイさんが、面接のおじぎを練習している。', [
            'In Café Kotonoha, Aoi in a suit practises her interview bow.',
            'Im Café Kotonoha übt Aoi im Anzug ihre Verbeugung für das Vorstellungsgespräch.',
          ]),
          l('aoi', '今度、{ぜひ||v:zehi}母の店に来てね。母に、@nameのこと、話したんだ。', ['You must come to my mother’s shop some time. I told her about you, @name.', 'Komm unbedingt mal in den Laden meiner Mutter. Ich habe ihr von dir erzählt, @name.'], 'happy'),
        ],
        teach: ['v:surasura', 'v:sukkiri', 'v:n2_0963', 'v:zehi'],
      },
    ],
  },
];
