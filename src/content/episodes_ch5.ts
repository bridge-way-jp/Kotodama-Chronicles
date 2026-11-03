import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 5 (Kyoto): Ms. Matsuo, Rin, Mr. Sakamoto, Sumie-san — what people say and what they mean. */
export const EPISODES_CH5: Episode[] = [
  // ------------------------------------------------------------------ Ms. Matsuo: the honest tea-rice
  {
    id: 'ep_matsuo',
    chapter: 5,
    after: 'mq18',
    who: 'matsuo',
    title: ['本音のお茶漬け', 'Tea-Rice from the Heart', 'Ochazuke von Herzen'],
    summary: [
      'Ms. Matsuo always smiles. Since her husband died, nobody in the alley has heard her say what she really feels.',
      'Frau Matsuo lächelt immer. Seit ihr Mann gestorben ist, hat niemand in der Gasse sie sagen hören, was sie wirklich fühlt.',
    ],
    scenes: [
      {
        at: 'matsuo',
        goal: ['Have tea with Ms. Matsuo', 'Trink Tee mit Frau Matsuo'],
        music: 'gion',
        lines: [
          l('matsuo', '@nameさん、お帰りやす。今日も京都、よう歩かはった？ うちは、いつも通り元気どすえ。', [
            'Welcome back, @name. Did you walk a lot in Kyoto today? Me, I’m as fine as ever.',
            'Willkommen zurück, @name. Bist du heute viel durch Kyoto gelaufen? Mir geht es gut wie immer.',
          ], 'happy'),
          nar('そう言って笑う松尾さんの手元の湯飲みは、冷めきっていた。笑顔が、まるで仮面である{かのように||g:kanoyouda}見えた。', [
            'As Ms. Matsuo laughs, the teacup in her hands has gone completely cold. Her smile looks almost like a mask.',
            'Als Frau Matsuo lacht, ist die Teetasse in ihren Händen völlig kalt geworden. Ihr Lächeln wirkt fast wie eine Maske.',
          ]),
          l('matsuo', '京都の人はね、{本音|ほんね|v:ky_honne}と{建前|たてまえ|v:ky_tatemae}を使い分けるんよ。言いたいことは、{遠回し|とおまわし|v:ky_toomawashi}に言うの。', [
            'Kyoto people keep their true feelings and their public face apart. What they want to say, they say indirectly.',
            'Die Leute in Kyoto trennen ihre wahren Gefühle von dem, was sie nach außen zeigen. Was sie sagen wollen, sagen sie durch die Blume.',
          ]),
          l('matsuo', '……主人が亡くなってから、一人で考えこみ{がち||g:gachi}で。あ、ごめんなさい。何でもあらへん。', [
            '…Since my husband died I tend to brood alone. Oh, sorry. It’s nothing.',
            '…Seit mein Mann gestorben ist, grüble ich oft allein. Ach, entschuldige. Es ist nichts.',
          ], 'worried'),
          l('matsuo', 'そうや、この{路地|ろじ|v:ky_roji}の奥の{老舗|しにせ|v:ky_shinise}に、主人の古い知り合いがいてはるの。よかったら、行ってみて。', [
            'Oh, there is an old acquaintance of my husband in the long-established shop at the back of this alley. Go and see him if you like.',
            'Ach ja, im Traditionsgeschäft hinten in dieser Gasse ist ein alter Bekannter meines Mannes. Geh doch mal hin, wenn du magst.',
          ]),
        ],
        teach: ['v:ky_honne', 'v:ky_tatemae', 'v:ky_toomawashi', 'v:ky_roji', 'v:ky_shinise', 'g:kanoyouda', 'g:gachi'],
      },
      {
        at: 'k_shop_old',
        goal: ['Visit the old shop at the back of the alley', 'Besuch das alte Geschäft hinten in der Gasse'],
        music: 'kyoto',
        lines: [
          nar('老舗のご主人は、古い提灯を{修繕|しゅうぜん|v:n2_0834}しながら、松尾さんのご主人の話をしてくれた。', [
            'While repairing an old paper lantern, the owner of the old shop tells you about Ms. Matsuo’s husband.',
            'Während er eine alte Papierlaterne repariert, erzählt dir der Besitzer des alten Ladens von Frau Matsuos Mann.',
          ]),
          nar('「あの人は、提灯の{職人|しょくにん|v:n2_0901}でな。毎晩、この路地の提灯に火を入れて回っとった。奥さんが夜道で迷わんように、言うて」', [
            '“He was a lantern craftsman. Every night he went round lighting the lanterns in this alley. ‘So my wife never gets lost on the way home at night,’ he said.”',
            '„Er war Laternenmacher. Jeden Abend ging er herum und zündete die Laternen in dieser Gasse an. ‚Damit meine Frau sich nachts auf dem Heimweg nicht verirrt‘, sagte er.“',
          ]),
          nar('「亡くなってから、路地の提灯は一つも灯っとらん。奥さんは笑うとるけど、寂しいのを{堪えて|こらえて|v:n2_0679}るんや。わしらには、よう{察する|さっする|v:ky_sassuru}ことしかできん」', [
            '“Since he died, not one lantern in the alley has been lit. His wife laughs, but she is holding back her loneliness. All we can do is sense it.”',
            '„Seit er tot ist, brennt in der Gasse keine einzige Laterne mehr. Seine Frau lacht, aber sie unterdrückt ihre Einsamkeit. Wir können es nur erahnen.“',
          ]),
          nar('ご主人は、直したばかりの提灯を差し出した。「これ、あの人の最後の作品や。奥さんに渡したってくれへんか」', [
            'The owner holds out the lantern he has just repaired. “This is his last piece of work. Would you give it to his wife?”',
            'Der Besitzer reicht dir die Laterne, die er gerade repariert hat. „Das ist sein letztes Werk. Würdest du es seiner Frau geben?“',
          ]),
        ],
        teach: ['v:n2_0834', 'v:n2_0901', 'v:n2_0679', 'v:ky_sassuru'],
      },
      {
        at: 'matsuo',
        goal: ['Bring the lantern to Ms. Matsuo', 'Bring Frau Matsuo die Laterne'],
        evening: true,
        music: 'memory',
        lines: [
          nar('提灯を見た松尾さんは、しばらく、それをじっと{見詰めて|みつめて|v:n2_1715}いた。', ['When Ms. Matsuo sees the lantern, she stares at it for a long while.', 'Als Frau Matsuo die Laterne sieht, starrt sie sie lange an.']),
          l('matsuo', '……あの人の字や。提灯の裏に、「千代へ」って。', ['…That’s his handwriting. On the back of the lantern: “For Chiyo”.', '…Das ist seine Schrift. Auf der Rückseite der Laterne: „Für Chiyo“.'], 'surprised'),
          l('matsuo', '京都の女やから、建前で笑ってなあかん、思てた。{とはいえ||g:tohaie}……本当は、毎晩、真っ暗な路地を歩くのが、怖くて、寂しくて。', [
            'I thought that as a Kyoto woman I had to smile and keep up appearances. And yet… the truth is, walking down the pitch-dark alley every night was frightening and lonely.',
            'Ich dachte, als Frau aus Kyoto muss ich lächeln und den Schein wahren. Und doch… in Wahrheit war es jeden Abend beängstigend und einsam, durch die stockdunkle Gasse zu gehen.',
          ], 'worried'),
          ask(
            ['その本音、言ってくれてうれしいです', ['I’m glad you told me how you really feel.', 'Ich bin froh, dass du mir sagst, wie es dir wirklich geht.']],
            ['今夜、一緒に提灯に火を入れましょう', ['Let’s light the lantern together tonight.', 'Lass uns heute Abend zusammen die Laterne anzünden.']],
          ),
          l('matsuo', '本音を言え{てこそ||g:tekoso}、ほんまの「お帰りやす」が言えるんやね。……今夜は、ほんまのお茶漬け、一緒に食べてくれはる？', [
            'Only when you can speak from the heart can you say a real “welcome home”. …Tonight, will you eat a real ochazuke with me?',
            'Erst wenn man aus dem Herzen sprechen kann, kann man ein echtes „Willkommen zu Hause“ sagen. …Isst du heute Abend ein echtes Ochazuke mit mir?',
          ], 'happy'),
          pic('cg_heart_matsuo', '祇園の路地。何年ぶりかで、一つの提灯に、やわらかな灯がともった。', [
            'An alley in Gion. For the first time in years, a single lantern glows with a soft light.',
            'Eine Gasse in Gion. Zum ersten Mal seit Jahren leuchtet eine einzelne Laterne mit sanftem Licht.',
          ]),
        ],
        teach: ['v:n2_1715', 'g:tohaie', 'g:tekoso'],
      },
    ],
  },

  // ------------------------------------------------------------------ Rin: the borrowed kimono
  {
    id: 'ep_rin',
    chapter: 5,
    after: 'mq19',
    who: 'rin',
    title: ['借り物の着物', 'The Borrowed Kimono', 'Der geliehene Kimono'],
    summary: [
      'Rin came to Kyoto to become an actress. After her third failed audition, she wants to give up.',
      'Rin ist nach Kyoto gekommen, um Schauspielerin zu werden. Nach dem dritten gescheiterten Vorsprechen will sie aufgeben.',
    ],
    scenes: [
      {
        at: 'rin',
        goal: ['Ask Rin why she is not smiling today', 'Frag Rin, warum sie heute nicht lächelt'],
        music: 'gion',
        lines: [
          l('rin', 'いらっしゃいませ……あ、@nameさん。ごめんなさい、今日はちょっと風邪{気味|ぎみ|g:gimi}で。', [
            'Welcome… oh, @name. Sorry, I’m feeling a bit under the weather today.',
            'Willkommen… ach, @name. Entschuldige, ich bin heute etwas erkältet.',
          ], 'worried'),
          l('rin', '……うそです。昨日、{演劇|えんげき|v:n2_0259}のオーディション、また落ちたんです。三回目。', [
            '…That’s a lie. Yesterday I failed another theatre audition. The third time.',
            '…Das stimmt nicht. Gestern bin ich wieder bei einem Theater-Vorsprechen durchgefallen. Zum dritten Mal.',
          ], 'worried'),
          l('rin', '{芸能|げいのう|v:n2_0563}の世界は、才能に{恵まれた|めぐまれた|v:n2_1747}人ばかり。正直、受かった子たちが{羨ましい|うらやましい}。わたしは、どうせ{見掛け|みかけ|v:n2_1703}だけの、借り物の着物みたいな人間なんです。', [
            'The world of performing arts is full of people blessed with talent. Honestly, I envy the girls who passed. I’m just a person who is all appearance — like a borrowed kimono.',
            'In der Welt der Bühne gibt es nur Leute, die mit Talent gesegnet sind. Ehrlich gesagt beneide ich die Mädchen, die bestanden haben. Ich bin doch nur äußerer Schein – wie ein geliehener Kimono.',
          ], 'worried'),
          l('rin', 'お店の奥に、祖母の古い着物があるんです。……見てもらえますか。', ['At the back of the shop there is my grandmother’s old kimono. …Would you look at it?', 'Hinten im Laden liegt der alte Kimono meiner Großmutter. …Würdest du ihn dir ansehen?']),
        ],
        teach: ['v:n2_0259', 'v:n2_0563', 'v:n2_1747', 'v:n2_1703', 'g:gimi'],
      },
      {
        at: 'k_kimono_shop',
        goal: ['Look at the grandmother’s kimono at the back of the shop', 'Sieh dir den Kimono der Großmutter hinten im Laden an'],
        music: 'memory',
        lines: [
          nar('奥の箱には、色あせた紫の着物。ところどころ、何度も縫い直した跡がある。', [
            'In the box at the back lies a faded purple kimono. Here and there you see where it has been resewn again and again.',
            'In der Kiste hinten liegt ein verblasster violetter Kimono. Hier und da sieht man, dass er immer wieder neu genäht wurde.',
          ]),
          nar('襟の内側に、小さな紙が縫いつけてあった。「凛へ。おばあちゃんも、若いころ舞台に立ちたかった。でも勇気がなくて、この着物で一度も立てなかった」', [
            'A small slip of paper is sewn inside the collar: “To Rin. Grandma too wanted to stand on a stage when she was young. But I had no courage, and never once stood there in this kimono.”',
            'In den Kragen ist ein kleiner Zettel eingenäht: „Für Rin. Auch Oma wollte als junge Frau auf der Bühne stehen. Aber ich hatte nicht den Mut und habe in diesem Kimono kein einziges Mal dort gestanden.“',
          ]),
          nar('「上手でなくていい。{上品|じょうひん|v:n2_0890}でなくていい。凛は凛{なりに||g:narini}、思いっきり、舞台に立ってね。おばあちゃんは、いつでも{応援|おうえん|v:n2_0269}しています」', [
            '“You don’t have to be good. You don’t have to be elegant. In your own way, Rin, stand on that stage with all your heart. Grandma is always cheering you on.”',
            '„Du musst nicht gut sein. Du musst nicht elegant sein. Steh auf deine Art auf der Bühne, Rin, mit ganzem Herzen. Oma feuert dich immer an.“',
          ]),
        ],
        teach: ['v:n2_0890', 'v:n2_0269', 'g:narini'],
      },
      {
        at: 'rin',
        goal: ['Bring the grandmother’s note to Rin', 'Bring Rin den Zettel ihrer Großmutter'],
        music: 'gion',
        lines: [
          nar('紙を読んだ凛さんは、着物を胸に抱いて、しばらく泣いていた。', ['Rin reads the note, holds the kimono to her chest and cries for a while.', 'Rin liest den Zettel, drückt den Kimono an sich und weint eine Weile.']),
          l('rin', '祖母は、一回も舞台に立てなかったんだ……。わたしは三回も立てた。落ちたのは、三回挑戦した証拠に{すぎない||g:nisugimai}んですね。', [
            'Grandma never once got on a stage… I’ve stood there three times. Failing is nothing more than proof that I tried three times.',
            'Oma hat es nie auf eine Bühne geschafft… Ich habe dreimal dort gestanden. Das Durchfallen ist nichts weiter als der Beweis, dass ich es dreimal versucht habe.',
          ]),
          l('rin', '次のオーディションは、この着物で受けます。演技も、自分で{工夫|くふう|v:n2_0546}して。', [
            'I’ll go to the next audition in this kimono. And I’ll work out the acting in my own way.',
            'Zum nächsten Vorsprechen gehe ich in diesem Kimono. Und das Spiel denke ich mir selbst aus.',
          ], 'happy'),
          l('rin', '祖母の分まで、きっと舞台に立って{みせる||g:x_temiseru}！ ……@nameさん、見に来てくれますか？', [
            'For Grandma’s sake too, I’ll show them — I will stand on that stage! …@name, will you come and watch?',
            'Auch für Oma werde ich es allen zeigen – ich stehe auf dieser Bühne! …@name, kommst du zuschauen?',
          ], 'happy'),
          pic('cg_kyoto_arrival', '祇園の石畳。紫の着物の凛さんが、{朗らか|ほがらか|v:n2_1644}に笑って、背筋を伸ばした。', [
            'The cobblestones of Gion. Rin, in the purple kimono, laughs cheerfully and straightens her back.',
            'Das Kopfsteinpflaster von Gion. Rin im violetten Kimono lacht fröhlich und richtet sich auf.',
          ]),
        ],
        teach: ['v:n2_0546', 'v:n2_1644', 'g:nisugimai', 'g:x_temiseru'],
      },
    ],
  },

  // ------------------------------------------------------------------ Mr. Sakamoto: the letter of apology
  {
    id: 'ep_sakamoto',
    chapter: 5,
    after: 'mq19',
    who: 'sakamoto',
    title: ['詫び状', 'The Letter of Apology', 'Der Entschuldigungsbrief'],
    summary: [
      'Mr. Sakamoto made a serious mistake with an old client in Kyoto. He also missed his daughter’s school play for the third year running.',
      'Herr Sakamoto hat bei einem alten Kunden in Kyoto einen schweren Fehler gemacht. Und zum dritten Mal in Folge hat er die Schulaufführung seiner Tochter verpasst.',
    ],
    scenes: [
      {
        at: 'sakamoto',
        goal: ['Listen to Mr. Sakamoto at Kyoto Station', 'Hör Herrn Sakamoto am Bahnhof Kyoto zu'],
        lines: [
          l('sakamoto', 'ああ、あなたは先日の……。実は、大変なことになりまして。百年続く老舗のお客様への納品を、うっかり{怠って|おこたって|v:n2_0292}しまったんです。', [
            'Ah, you’re the one from the other day… I’m in serious trouble. I carelessly neglected a delivery to a client — a shop that has existed for a hundred years.',
            'Ach, Sie sind doch die Person von neulich… Ich stecke in großen Schwierigkeiten. Ich habe aus Unachtsamkeit eine Lieferung an einen Kunden versäumt – einen Laden, den es seit hundert Jahren gibt.',
          ], 'worried'),
          l('sakamoto', '契約を{めぐって||g:womeguratte}、会社でも大騒ぎです。直接お{詫び|わび|v:n2_1899}に伺いたいのですが、どんな{敬語|けいご|v:n2_0556}を使えばいいのか、頭が真っ白で。', [
            'There is a huge fuss at the company over the contract. I want to go and apologise in person, but my mind is blank about what keigo to use.',
            'In der Firma gibt es wegen des Vertrags einen Riesenaufruhr. Ich möchte mich persönlich entschuldigen, aber mir fällt keine einzige passende Höflichkeitsform ein.',
          ], 'worried'),
          l('sakamoto', 'それに……今日は娘の学校の劇の日なんです。三年続けて、見に行けていない。もう、謝り{ようがない||g:youganai}ですよ。', [
            'And… today is my daughter’s school play. Three years in a row I haven’t been able to go. There’s no way left to apologise.',
            'Und… heute ist das Schultheater meiner Tochter. Drei Jahre hintereinander konnte ich nicht hingehen. Da gibt es nichts mehr, womit ich mich entschuldigen könnte.',
          ], 'worried'),
          ask(['一緒に詫び状を考えましょう', ['Let’s think up the letter of apology together.', 'Lassen Sie uns zusammen den Entschuldigungsbrief überlegen.']]),
          l('sakamoto', '本当ですか……。駅前のベンチで、下書きをしてきます。少し、待っていてください。', [
            'Really…? I’ll go and draft it on the bench in front of the station. Please wait a moment.',
            'Wirklich…? Ich schreibe auf der Bank vor dem Bahnhof einen Entwurf. Warten Sie bitte einen Moment.',
          ]),
        ],
        teach: ['v:n2_0292', 'v:n2_1899', 'v:n2_0556', 'g:womeguratte', 'g:youganai'],
      },
      {
        at: 'k_station_front',
        goal: ['Look at Mr. Sakamoto’s draft in front of the station', 'Sieh dir Herrn Sakamotos Entwurf vor dem Bahnhof an'],
        lines: [
          nar('ベンチの上に、書きかけの詫び状が二枚あった。一枚目は、完璧な敬語。', ['On the bench lie two half-written letters of apology. The first is in perfect keigo.', 'Auf der Bank liegen zwei halb geschriebene Entschuldigungsbriefe. Der erste in perfekter Höflichkeitssprache.']),
          nar('「この度は、弊社の不手際により、多大なるご迷惑をおかけいたしましたこと、深くお詫び申し上げます。{くれぐれも||v:n2_0553}今後このようなことのなきよう、体制を{改めます|あらためます|v:n2_0164}」', [
            '“We deeply apologise for the great inconvenience caused by our company’s mishandling. We will reform our procedures so that this never happens again, by any means.”',
            '„Wir entschuldigen uns zutiefst für die großen Unannehmlichkeiten, die durch das Versäumnis unseres Unternehmens entstanden sind. Wir werden unsere Abläufe ändern, damit so etwas keinesfalls wieder vorkommt.“',
          ]),
          nar('二枚目は、子どものような字だった。「ゆいへ。お父さんは、また約束を守れませんでした。ごめんなさい。仕事の話は上手に書けるのに、ゆいへの『ごめん』は、一行しか書けません」', [
            'The second is in a childlike hand: “To Yui. Dad couldn’t keep his promise again. I’m sorry. I can write about work so well, but my ‘sorry’ to you, Yui, I can only write in one line.”',
            'Der zweite in fast kindlicher Schrift: „Für Yui. Papa konnte sein Versprechen wieder nicht halten. Es tut mir leid. Über die Arbeit kann ich so gut schreiben, aber mein ‚Entschuldigung‘ an dich, Yui, bringe ich nur in einer Zeile zustande.“',
          ]),
        ],
        teach: ['v:n2_0553', 'v:n2_0164'],
      },
      {
        at: 'sakamoto',
        goal: ['Talk to Mr. Sakamoto about the two letters', 'Sprich mit Herrn Sakamoto über die zwei Briefe'],
        lines: [
          l('sakamoto', '……二枚目も、見られてしまいましたか。', ['…You saw the second one too?', '…Sie haben auch den zweiten gesehen?']),
          ask(
            ['二枚目のほうが、気持ちが伝わります', ['The second one gets the feeling across better.', 'Der zweite bringt das Gefühl besser rüber.']],
            ['今から、劇に間に合いませんか', ['Couldn’t you still make it to the play?', 'Schaffen Sie es nicht noch zum Theater?']],
          ),
          l('sakamoto', '敬語は、相手を{敬う|うやまう|v:n2_0232}気持ちに{基づいて||g:nimotozuite}使うもの……。立派な言葉を並べても、{却って|かえって|v:n2_0362}気持ちが見えなくなるんですね。', [
            'Keigo is meant to be based on respect for the other person… Lining up fine words can actually hide the feeling instead.',
            'Höflichkeitssprache soll auf Respekt vor dem anderen beruhen… Wenn man nur schöne Worte aneinanderreiht, verdeckt man das Gefühl eher.',
          ]),
          l('sakamoto', 'お客様には、明日、短くても、自分の言葉で謝ります。そして今は――娘の劇に、走ります！', [
            'Tomorrow I’ll apologise to the client in my own words, even if briefly. And right now — I’ll run to my daughter’s play!',
            'Morgen entschuldige ich mich beim Kunden mit meinen eigenen Worten, auch wenn es kurz ist. Und jetzt – renne ich zum Theaterstück meiner Tochter!',
          ], 'happy'),
          nar('――翌日。坂本さんから、短いメールが届いた。「老舗のご主人が、わざわざ駅まで{出迎えて|でむかえて|v:n2_1263}くださいました。娘は、劇の最後に、客席のわたしに手を振ってくれました」', [
            '— The next day, a short e-mail from Mr. Sakamoto: “The owner of the old shop even came to the station to meet me. And at the end of the play, my daughter waved to me in the audience.”',
            '— Am nächsten Tag kommt eine kurze Mail von Herrn Sakamoto: „Der Inhaber des Traditionsgeschäfts hat mich sogar am Bahnhof abgeholt. Und am Ende des Stücks hat meine Tochter mir im Publikum zugewinkt.“',
          ]),
          l('sakamoto', '謝ることは、負けではなく、相手を大切に思う気持ち{にほかならない||g:nihokanaranai}。……いい勉強をしました。', [
            'Apologising is not losing — it is nothing other than caring about the other person. …I learned a good lesson.',
            'Sich zu entschuldigen ist keine Niederlage – es ist nichts anderes, als den anderen wertzuschätzen. …Das war eine gute Lektion.',
          ], 'happy'),
        ],
        teach: ['v:n2_0232', 'v:n2_0362', 'v:n2_1263', 'g:nimotozuite', 'g:nihokanaranai'],
      },
    ],
  },

  // ------------------------------------------------------------------ Sumie-san: more than a thousand words
  {
    id: 'ep_sumie',
    chapter: 5,
    after: 'mq20',
    who: 'sumie',
    title: ['千の言葉より', 'More Than a Thousand Words', 'Mehr als tausend Worte'],
    summary: [
      'Sumie-san speaks only in hints. Her apprentice left the tea house ten years ago without a word.',
      'Sumie-san spricht nur in Andeutungen. Ihre Schülerin hat das Teehaus vor zehn Jahren wortlos verlassen.',
    ],
    scenes: [
      {
        at: 'sumie',
        goal: ['Sit for tea with Sumie-san', 'Setz dich zum Tee zu Sumie-san'],
        music: 'gion',
        lines: [
          l('sumie', '……どうぞ、お座りやす。今日の茶碗は、ちょっと変わってますやろ。', ['…Please, sit down. Today’s tea bowl is a little unusual, isn’t it?', '…Bitte, setzen Sie sich. Die heutige Teeschale ist ein wenig ungewöhnlich, nicht wahr?']),
          nar('澄江さんが差し出したのは、欠けたところを金で継いだ、古い茶碗だった。', ['Sumie-san offers you an old tea bowl whose cracks have been mended with gold.', 'Sumie-san reicht dir eine alte Teeschale, deren Sprünge mit Gold gekittet sind.']),
          l('sumie', '{茶道|さどう|v:ky_sadou}ではな、言わんでもわかることが大事どす。{空気を読む|くうきをよむ|v:ky_kuuki}、言うてな。', [
            'In the tea ceremony, what matters is what is understood without being said. Reading the air, as they say.',
            'In der Teezeremonie kommt es auf das an, was man versteht, ohne dass es gesagt wird. Die Stimmung lesen, wie man sagt.',
          ]),
          l('sumie', '十年前、この茶碗を割って、弟子が一人、黙って出て行きました。わたしも、黙って見送った。……言わんでもわかる、思うてな。', [
            'Ten years ago an apprentice broke this bowl and left without a word. And I watched her go without a word. …I thought she would understand without my saying it.',
            'Vor zehn Jahren hat eine Schülerin diese Schale zerbrochen und ist wortlos gegangen. Und ich habe sie wortlos ziehen lassen. …Ich dachte, sie versteht es auch, ohne dass ich es sage.',
          ], 'worried'),
          l('sumie', '鴨川沿いの喫茶店で、あの子が働いている、と聞きました。……あとは、あんさんが{察して|さっして}おくれやす。', [
            'I heard she works at a café along the Kamo river. …The rest, I leave to you to sense.',
            'Ich habe gehört, dass sie in einem Café am Kamo-Fluss arbeitet. …Den Rest überlasse ich Ihrem Gespür.',
          ]),
        ],
        teach: ['v:ky_sadou', 'v:ky_kuuki'],
      },
      {
        at: 'k_kamo_cafe',
        goal: ['Visit the café on the Kamo river', 'Besuch das Café am Kamo-Fluss'],
        evening: true,
        music: 'memory',
        lines: [
          nar('鴨川を見下ろす喫茶店。カウンターの女性が、{湯飲み|ゆのみ|v:n2_1824}を丁寧に拭いていた。', [
            'A café overlooking the Kamo river. A woman at the counter is carefully wiping teacups.',
            'Ein Café mit Blick auf den Kamo-Fluss. Eine Frau an der Theke wischt sorgfältig Teetassen ab.',
          ]),
          nar('澄江さんの名前を出すと、女性の手が止まった。「……先生の茶碗を割って、謝れないまま逃げたんです。先生は、怒って口もきいてくれなかった」', [
            'When you mention Sumie-san’s name, her hands stop. “…I broke the master’s bowl and ran away without apologising. The master was so angry she wouldn’t even speak to me.”',
            'Als du Sumie-sans Namen erwähnst, halten ihre Hände inne. „…Ich habe die Schale der Meisterin zerbrochen und bin weggelaufen, ohne mich zu entschuldigen. Die Meisterin war so wütend, dass sie nicht einmal mit mir sprach.“',
          ]),
          nar('「でも、茶道は{飽くまで|あくまで|v:n2_0130}好きで。ここで、お客さんにお茶を出しながら、今も、先生の教えを思い出すんです」', [
            '“But I still love the tea ceremony, to this day. Even here, serving tea to customers, I remember what the master taught me.”',
            '„Aber die Teezeremonie liebe ich nach wie vor. Auch hier, wenn ich den Gästen Tee serviere, erinnere ich mich an das, was die Meisterin mich gelehrt hat.“',
          ]),
          nar('カウンターの奥に、小さな額があった。拙い筆で一言。「一期一会」――澄江さんの茶室にあるのと、同じ言葉だった。', [
            'At the back of the counter hangs a small frame. In clumsy brushwork, four characters: “ichigo ichie” — once in a lifetime. The same words as in Sumie-san’s tea room.',
            'Hinten an der Theke hängt ein kleiner Rahmen. In ungelenker Pinselschrift vier Zeichen: „ichigo ichie“ – einmalige Begegnung. Dieselben Worte wie in Sumie-sans Teeraum.',
          ]),
        ],
        teach: ['v:n2_1824', 'v:n2_0130'],
      },
      {
        at: 'sumie',
        goal: ['Tell Sumie-san what the apprentice said', 'Erzähl Sumie-san, was die Schülerin gesagt hat'],
        music: 'gion',
        lines: [
          l('sumie', '……怒って口をきかなかった、と。あの子は、そう思うてたんどすか。', ['…That I was angry and wouldn’t speak to her. Is that what she thought?', '…Dass ich wütend war und nicht mit ihr sprach. Das hat sie gedacht?'], 'surprised'),
          l('sumie', 'わたしは、黙っていれば伝わる、思うてました。言葉は、言うてはじめて届くもの……。失って{はじめて||g:tehajimete}、気づきました。', [
            'I thought that if I stayed silent, she would understand. Words only reach someone once they are spoken… I only realised it after losing her.',
            'Ich dachte, wenn ich schweige, kommt es auch an. Worte erreichen einen erst, wenn sie ausgesprochen werden… Erst als ich sie verloren hatte, habe ich das begriffen.',
          ]),
          l('sumie', '割れた茶碗を継いだのは、あの子が戻る場所を残しておきたかったからどす。……今度は、ちゃんと言葉で伝えます。', [
            'I had the broken bowl mended because I wanted to keep a place for her to come back to. …This time, I will tell her properly, in words.',
            'Ich habe die zerbrochene Schale kitten lassen, weil ich ihr einen Ort zum Zurückkommen bewahren wollte. …Diesmal sage ich es ihr richtig, mit Worten.',
          ], 'happy'),
          pic('cg_kyoto_tea', '静かな茶室。澄江さんは、金で継いだ茶碗に、心{をこめて||g:x_wokomete}、お茶を点てた。', [
            'The quiet tea room. Sumie-san whisks tea, with all her heart, in the gold-mended bowl.',
            'Der stille Teeraum. Sumie-san schlägt mit ganzem Herzen Tee in der goldgekitteten Schale auf.',
          ]),
          l('sumie', '{空気を読む|くうきをよむ}のも大事。でも、許すとは、言葉にし{がたい||g:gatai}ことを、あえて言うことどすな。……あんさんには、教えられる{ものがある||g:monogaaru}わ。', [
            'Reading the air matters too. But forgiving means daring to say what is hard to put into words. …There is something to be learned from you.',
            'Die Stimmung lesen ist auch wichtig. Aber vergeben heißt, gerade das auszusprechen, was sich schwer in Worte fassen lässt. …Von Ihnen kann man etwas lernen.',
          ], 'happy'),
        ],
        teach: ['g:tehajimete', 'g:x_wokomete', 'g:gatai', 'g:monogaaru'],
      },
    ],
  },
];
