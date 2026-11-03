import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 2, second round: Kenji's father the winemaker, the farmhouse grandmother, the valley bus driver. */
export const EPISODES_CH2B: Episode[] = [
  // ------------------------------------------------------------------ the winemaster (Kenji's father): the barrel of the year he was born
  {
    id: 'ep_winery_master',
    chapter: 2,
    after: 'mq9',
    who: 'winery_master',
    title: ['生まれ年の樽', 'The Barrel of His Birth Year', 'Das Fass seines Geburtsjahres'],
    summary: [
      'Kenji’s father guards the frost at night but never speaks to his son. In the cellar there is one barrel nobody may open.',
      'Kenjis Vater wacht nachts über den Frost, spricht aber nie mit seinem Sohn. Im Keller steht ein Fass, das niemand öffnen darf.',
    ],
    scenes: [
      {
        at: 'winery_master',
        goal: ['Talk to the winemaster in the tasting room', 'Sprich mit dem Weinmeister im Probierraum'],
        lines: [
          l('winery_master', '健二の知り合いか。……あいつは、何か言っていたか。', ['You know Kenji? …Did he say anything?', 'Du kennst Kenji? …Hat er irgendwas gesagt?']),
          l('winery_master', '{以前|いぜん|v:n3_0379}、わしも東京で働いていた。親父の反対を押し切ってな。だから、あいつが会社を辞めて帰ってきたとき、何も言えなかった。', [
            'I used to work in Tokyo too. Against my own father’s wishes. So when Kenji quit his company and came back, I couldn’t say anything.',
            'Früher habe ich auch in Tokio gearbeitet. Gegen den Willen meines Vaters. Darum konnte ich nichts sagen, als Kenji kündigte und zurückkam.',
          ]),
          l('winery_master', '畑の仕事は、{汗|あせ|v:n3_0317}と{嵐|あらし|v:n3_0337}との戦いだ。途中で{諦める|あきらめる|v:n3_0308}くらいなら、最初からやらないほうがいい。……そう言う{かわりに||g:kawarini}、黙って見ていた。', [
            'Farm work is a fight against sweat and storms. If you’re going to give up halfway, better not to start. …Instead of saying that, I just watched in silence.',
            'Die Arbeit im Weinberg ist ein Kampf gegen Schweiß und Stürme. Wer auf halbem Weg aufgibt, sollte gar nicht erst anfangen. …Statt das zu sagen, habe ich nur schweigend zugeschaut.',
          ]),
          l('winery_master', '地下の倉庫に、一つだけ、わしが封をした樽がある。……健二には、見せないでくれ。', ['In the cellar there is one barrel I sealed myself. …Don’t show it to Kenji.', 'Im Keller steht ein einziges Fass, das ich selbst versiegelt habe. …Zeig es Kenji nicht.']),
        ],
        teach: ['v:n3_0379', 'v:n3_0317', 'v:n3_0337', 'v:n3_0308', 'g:kawarini'],
      },
      {
        at: 'kenji',
        goal: ['Ask Kenji about the sealed barrel', 'Frag Kenji nach dem versiegelten Fass'],
        lines: [
          l('kenji', '封をした樽？ ……ああ、子どものころから「絶対に触るな」って言われていたやつです。', ['A sealed barrel? …Ah, the one I was told “never touch” since I was a kid.', 'Ein versiegeltes Fass? …Ach, das, von dem es seit meiner Kindheit hieß: „Niemals anfassen.“']),
          l('kenji', '母の話{によると||g:x_niyoruto}、ぼくが生まれた年に、父が一人で仕込んだワインらしいです。', ['According to my mother, it’s a wine my father made all by himself in the year I was born.', 'Laut meiner Mutter ist es ein Wein, den mein Vater ganz allein in meinem Geburtsjahr angesetzt hat.']),
          l('kenji', '樽には、父の字で日付と、ぼくの名前が書いてある。それが何を{表す|あらわす|v:n3_0341}のか、{一生|いっしょう|v:n3_0396}聞けないと思っていました。', [
            'On the barrel, in my father’s writing, are a date and my name. I thought I would never in my life be able to ask what it means.',
            'Auf dem Fass stehen in der Schrift meines Vaters ein Datum und mein Name. Ich dachte, ich könnte mein Leben lang nie fragen, was das bedeutet.',
          ]),
          l('kenji', '……でも、聞きたい。父の{意志|いし|v:n3_0372}を、ちゃんと知りたいです。一緒に来てもらえますか。', ['…But I want to ask. I want to really know what my father intends. Will you come with me?', '…Aber ich will fragen. Ich will wirklich wissen, was mein Vater will. Kommst du mit?']),
        ],
        teach: ['v:n3_0341', 'v:n3_0396', 'v:n3_0372', 'g:x_niyoruto'],
      },
      {
        at: 'winery_master',
        goal: ['Go to the winemaster with Kenji', 'Geh mit Kenji zum Weinmeister'],
        music: 'memory',
        lines: [
          nar('健二さんが、父親の前に立った。二人とも、しばらく何も言わなかった。', ['Kenji stands in front of his father. For a while neither of them speaks.', 'Kenji steht vor seinem Vater. Eine Weile sagt keiner von beiden etwas.']),
          l('winery_master', '……あの樽は、お前が一人前になった日に開けるつもりだった。三十年、待つ{ことだ||g:x_kotoda}、と自分に言い聞かせてな。', [
            '…I meant to open that barrel on the day you became a man in your own right. Thirty years — “just wait,” I kept telling myself.',
            '…Dieses Fass wollte ich an dem Tag öffnen, an dem du ein ganzer Mann bist. Dreißig Jahre – „Man muss eben warten“, habe ich mir immer gesagt.',
          ]),
          l('winery_master', '霜の夜、お前が一本の木を必死に守る{跡|あと|v:n3_0331}を見た。あれで、{明らか|あきらか|v:n3_0307}になった。お前はもう、一人前だ。', [
            'On the frosty night I saw the traces of you desperately protecting that one vine. That made it clear. You are already a man in your own right.',
            'In der Frostnacht habe ich die Spuren gesehen, wie du verzweifelt diesen einen Rebstock geschützt hast. Da war es klar. Du bist schon ein ganzer Mann.',
          ], 'happy'),
          ask(
            ['二人で、樽を開けましょう', ['Open the barrel together, you two.', 'Öffnet das Fass zu zweit.']],
            ['（そっと、外に出て待つ）', ['(Quietly step outside and wait)', '(Leise hinausgehen und warten)']],
          ),
          nar('父と子は、三十年ぶりに{握手|あくしゅ|v:n3_0310}をした。開けた樽からは、驚くほど{新た|あらた|v:n3_0339}な香りがした。', [
            'For the first time in thirty years, father and son shake hands. From the opened barrel comes a surprisingly fresh scent.',
            'Zum ersten Mal seit dreißig Jahren geben sich Vater und Sohn die Hand. Aus dem geöffneten Fass steigt ein überraschend frischer Duft.',
          ]),
          l('winery_master', '開ける{際||g:sai}に何を言うか、三十年考えた。結局、これしか出てこん。……おめでとう、健二。お前の{祝い|いわい}だ。', [
            'For thirty years I thought about what to say when I opened it. In the end, only this comes out. …Congratulations, Kenji. This is your celebration.',
            'Dreißig Jahre habe ich überlegt, was ich beim Öffnen sagen soll. Am Ende kommt nur das heraus. …Glückwunsch, Kenji. Das ist deine Feier.',
          ], 'happy'),
          l('kenji', '……ありがとう、父さん。このワインを、ぼくの最初の商品の名前にします。{祝う|いわう|v:n3_0425}ための、ワインに。', [
            '…Thank you, Dad. I’ll give my first product the name of this wine. A wine for celebrating.',
            '…Danke, Papa. Mein erstes Produkt bekommt den Namen dieses Weins. Ein Wein zum Feiern.',
          ], 'happy'),
        ],
        teach: ['v:n3_0331', 'v:n3_0307', 'v:n3_0310', 'v:n3_0339', 'v:n3_0425', 'g:x_kotoda', 'g:sai'],
        give: ['grape_juice', 1],
      },
    ],
  },

  // ------------------------------------------------------------------ the farmhouse grandmother: the last jam
  {
    id: 'ep_farm_obaa',
    chapter: 2,
    after: 'mq7',
    who: 'farm_obaa',
    title: ['最後のジャム', 'The Last Jam', 'Die letzte Marmelade'],
    summary: [
      'The old woman in the farmhouse is losing her sight. She wants to make grape jam one last time for everyone who helped her.',
      'Die alte Frau im Bauernhaus verliert ihr Augenlicht. Sie möchte ein letztes Mal Traubenmarmelade für alle machen, die ihr geholfen haben.',
    ],
    scenes: [
      {
        at: 'farm_obaa',
        goal: ['Have tea with the old woman in the farmhouse', 'Trink Tee mit der alten Frau im Bauernhaus'],
        lines: [
          l('farm_obaa', 'よく来たねえ。{あいにく||v:n3_0302}、お茶菓子がなくてね。そのかわり、炭火で{温めた|あたためた|v:n3_0323}お茶はうまいよ。', [
            'Welcome, welcome. Unfortunately I have no sweets for the tea. But tea warmed over charcoal tastes wonderful.',
            'Schön, dass du da bist. Leider habe ich kein Gebäck zum Tee. Aber Tee, der über Holzkohle erwärmt wurde, schmeckt herrlich.',
          ], 'happy'),
          l('farm_obaa', 'じつはね、目が悪くなって、もうこの{辺り|あたり|v:n3_0324}しか見えないの。お医者さん{によって||g:x_niyotte}言うことが違うけど、治らないそうだよ。', [
            'The truth is, my eyes have got bad, and I can only see what’s right around me. Every doctor says something different, but apparently it won’t heal.',
            'Weißt du, meine Augen sind schlecht geworden, ich sehe nur noch, was direkt um mich herum ist. Jeder Arzt sagt etwas anderes, aber heilen wird es wohl nicht.',
          ], 'worried'),
          l('farm_obaa', 'ぶどうの木は、においで{あちこち||v:n3_0327}わかるけど、はさみを{扱う|あつかう|v:n3_0328}のは、もう危なくてね。', [
            'I can find the vines here and there by their smell, but handling the shears is dangerous now.',
            'Die Reben finde ich am Geruch hier und da, aber mit der Schere umzugehen ist jetzt gefährlich.',
          ]),
          l('farm_obaa', '目が見えるうちに、最後にもう一度、ぶどうのジャムを作りたいの。村の{集まり|あつまり|v:n3_0329}で、みんなに配りたくてね。手伝ってくれるかい？', [
            'While I can still see, I want to make grape jam one last time. I’d like to hand it out to everyone at the village gathering. Will you help?',
            'Solange ich noch etwas sehe, möchte ich ein letztes Mal Traubenmarmelade machen. Ich will sie beim Dorftreffen an alle verteilen. Hilfst du mir?',
          ]),
        ],
        teach: ['v:n3_0302', 'v:n3_0323', 'v:n3_0324', 'v:n3_0327', 'v:n3_0328', 'v:n3_0329', 'g:x_niyotte'],
      },
      {
        at: 'valley_garden',
        goal: ['Pick grapes in the farmhouse garden', 'Pflück Trauben im Garten des Bauernhauses'],
        lines: [
          nar('畑のぶどうは、虫に食われた{穴|あな|v:n3_0332}だらけだった。でも、残った房は甘く熟していた。', ['The grapes are full of holes eaten by insects. But the bunches that remain are sweet and ripe.', 'Die Trauben sind voller Löcher, von Insekten angefressen. Aber die übrigen Trauben sind süß und reif.']),
          nar('しばらく摘んでいると、{意外|いがい|v:n3_0363}にも、さくらちゃんと林さんがやってきた。「ばあちゃんのジャム、毎年楽しみにしてたんだ」', [
            'After you’ve been picking for a while, to your surprise Sakura and Mr. Hayashi turn up. “We looked forward to Grandma’s jam every year.”',
            'Nachdem du eine Weile gepflückt hast, kommen überraschend Sakura und Herr Hayashi. „Auf Omas Marmelade haben wir uns jedes Jahr gefreut.“',
          ]),
          nar('林さん{をはじめ||g:wohajime}、村の人たちが、次々に手伝いに来た。いつの間にか、畑は人{だらけ||g:x_darake}になっていた。', [
            'Starting with Mr. Hayashi, villager after villager comes to help. Before you know it, the field is full of people.',
            'Angefangen mit Herrn Hayashi kommen immer mehr Dorfleute zum Helfen. Ehe man sich versieht, ist das Feld voller Menschen.',
          ]),
        ],
        teach: ['v:n3_0332', 'v:n3_0363', 'g:wohajime', 'g:x_darake'],
      },
      {
        at: 'farm_obaa',
        goal: ['Make the jam with the old woman', 'Mach mit der alten Frau die Marmelade'],
        evening: true,
        music: 'memory',
        lines: [
          nar('台所の{明かり|あかり|v:n3_0305}の下、大きな鍋で、ぶどうがことことと煮えていく。', ['Under the kitchen light, the grapes simmer softly in a big pot.', 'Unter dem Küchenlicht köchelt die Marmelade leise in einem großen Topf.']),
          l('farm_obaa', 'みんな、来てくれたのかい。……目がよく見えなくても、声で、誰だかわかるよ。', ['Everyone came? …Even if I can’t see well, I know who you are by your voices.', 'Ihr seid alle gekommen? …Auch wenn ich nicht gut sehe, erkenne ich euch an der Stimme.'], 'surprised'),
          l('farm_obaa', '昔、この家は子ども{はもちろん||g:hamochiron}、大人もしょっちゅう集まる家だった。……また、こんなに{温かい|あたたかい|v:n3_0319}台所になるなんてね。', [
            'Long ago, this house was where not only children but grown-ups too were always gathering. …To think my kitchen would be this warm again.',
            'Früher war dieses Haus ein Ort, an dem nicht nur Kinder, sondern auch Erwachsene ständig zusammenkamen. …Dass meine Küche noch einmal so warm wird.',
          ], 'happy'),
          l('farm_obaa', '目が見えなくなる{にしたがって||g:nishitagatte}、怖くなると思っていた。でもね、{一瞬|いっしゅん|v:n3_0395}一瞬が、前より大事になったよ。', [
            'I thought I would get more afraid the more my sight went. But you know, every single moment has become more precious than before.',
            'Ich dachte, je mehr mein Augenlicht schwindet, desto mehr Angst bekomme ich. Aber weißt du, jeder einzelne Augenblick ist mir kostbarer geworden als früher.',
          ], 'happy'),
          pic('cg_peach_harvest', '夜の農家。湯気の向こうで、みんなが、小さなジャムの瓶を手に笑っていた。', [
            'The farmhouse at night. Behind the steam, everyone laughs, each holding a small jar of jam.',
            'Das Bauernhaus bei Nacht. Hinter dem Dampf lachen alle, jeder mit einem kleinen Glas Marmelade in der Hand.',
          ]),
          l('farm_obaa', 'これは、あんたの分だよ。{息|いき|v:n3_0366}を吹きかけて、冷ましてからお食べ。', ['This one’s yours. Blow on it to cool it down before you eat it.', 'Das ist deins. Puste drauf, damit es abkühlt, bevor du isst.'], 'happy'),
        ],
        teach: ['v:n3_0305', 'v:n3_0319', 'v:n3_0395', 'v:n3_0366', 'g:hamochiron', 'g:nishitagatte'],
      },
    ],
  },

  // ------------------------------------------------------------------ the valley bus driver: the last bus
  {
    id: 'ep_busdriver',
    chapter: 2,
    after: 'mq6',
    who: 'busdriver',
    title: ['最終バス', 'The Last Bus', 'Der letzte Bus'],
    summary: [
      'After thirty years the bus line to the valley is to be cut. The driver has a last journey he wants to make.',
      'Nach dreißig Jahren soll die Buslinie ins Tal eingestellt werden. Der Fahrer will noch eine letzte Fahrt machen.',
    ],
    scenes: [
      {
        at: 'busdriver',
        goal: ['Talk to the bus driver at the valley stop', 'Sprich mit dem Busfahrer an der Haltestelle im Tal'],
        lines: [
          l('busdriver', 'お客さん、知ってますか。この谷へのバスは、来月で終わりなんです。', ['Did you know? The bus to this valley stops next month.', 'Wussten Sie schon? Der Bus in dieses Tal fährt nur noch bis nächsten Monat.'], 'worried'),
          l('busdriver', '人口が減る{に伴って||g:nitomonatte}、乗る人も減ってね。路線を{維持|いじ|v:n3_0373}するお金がないって、町の{委員|いいん|v:n3_0362}会が決めたんです。', [
            'As the population fell, so did the passengers. The town committee decided there’s no money to keep the route going.',
            'Mit der Bevölkerung sind auch die Fahrgäste weniger geworden. Der Ausschuss der Stadt hat entschieden, dass es kein Geld gibt, um die Linie zu erhalten.',
          ]),
          l('busdriver', '天気{にかかわらず||g:nikakawarazu}、三十年、毎日走ってきました。{一般|いっぱん|v:n3_0402}の人にはただのバスでも、この谷の人には、町への唯一の{移動|いどう|v:n3_0405}手段なんですよ。', [
            'Whatever the weather, I’ve driven every day for thirty years. For most people it’s just a bus, but for the people of this valley it’s the only way to get to town.',
            'Bei jedem Wetter bin ich dreißig Jahre lang jeden Tag gefahren. Für die meisten ist es nur ein Bus, aber für die Leute in diesem Tal ist es die einzige Möglichkeit, in die Stadt zu kommen.',
          ]),
          l('busdriver', 'バス停の後ろに、古い掲示板があるんです。……最後の日の前に、見ておいてもらえませんか。', ['Behind the bus stop there’s an old noticeboard. …Would you take a look at it before the last day?', 'Hinter der Haltestelle ist ein altes Brett. …Würden Sie es sich vor dem letzten Tag ansehen?']),
        ],
        teach: ['v:n3_0373', 'v:n3_0362', 'v:n3_0402', 'v:n3_0405', 'g:nitomonatte', 'g:nikakawarazu'],
      },
      {
        at: 'valley_busstop',
        goal: ['Look at the old board behind the bus stop', 'Sieh dir das alte Brett hinter der Haltestelle an'],
        music: 'memory',
        lines: [
          nar('色あせた掲示板に、何十枚もの紙が貼ってあった。子どもの字、大人の字、震える字。', ['On the faded board are dozens of pieces of paper. Children’s writing, grown-ups’ writing, shaky writing.', 'Am verblichenen Brett hängen Dutzende Zettel. Kinderschrift, Erwachsenenschrift, zittrige Schrift.']),
          nar('「運転手さんへ。毎朝、バスの中で宿題を見てくれてありがとう。おかげで高校に受かりました」――{以来|いらい}、毎年、同じ子から一枚ずつ。', [
            '“To the driver. Thank you for checking my homework on the bus every morning. Thanks to you I got into high school.” — And since then, one more note every year from the same child.',
            '„Für den Fahrer. Danke, dass Sie jeden Morgen im Bus meine Hausaufgaben angeschaut haben. Dank Ihnen habe ich die Oberschule geschafft.“ – Und seitdem jedes Jahr ein Zettel vom selben Kind.',
          ]),
          nar('「病院への{行き|いき|v:n3_0364}も帰りも、待っていてくれた。あなたのおかげで、主人の{命|いのち|v:n3_0410}が助かりました」', [
            '“You waited for us both on the way to the hospital and on the way back. Thanks to you, my husband’s life was saved.”',
            '„Sie haben auf dem Hinweg zum Krankenhaus und auf dem Rückweg auf uns gewartet. Dank Ihnen wurde das Leben meines Mannes gerettet.“',
          ]),
          nar('掲示板の一番上には、新しい紙。「最終バスの日、みんなで乗ろう。　谷の住民一同」', [
            'At the very top, a new sheet: “On the day of the last bus, let’s all ride together. — All the residents of the valley.”',
            'Ganz oben ein neuer Zettel: „Am Tag des letzten Busses fahren wir alle zusammen mit. – Alle Bewohner des Tals.“',
          ]),
        ],
        teach: ['v:n3_0364', 'v:n3_0410'],
      },
      {
        at: 'busdriver',
        goal: ['Ride the last bus', 'Fahr mit dem letzten Bus'],
        evening: true,
        music: 'bus_ride',
        lines: [
          nar('最終バスの日。座席は、谷の人たちでいっぱいだった。立っている人もいる。', ['The day of the last bus. The seats are full of valley people. Some are even standing.', 'Der Tag des letzten Busses. Die Sitze sind voll mit Leuten aus dem Tal. Manche stehen sogar.']),
          l('busdriver', '……{いつのまにか||v:n3_0401}、こんなに。三十年分のお客さんが、全員乗っているみたいだ。', ['…Before I knew it, so many. It’s as if thirty years’ worth of passengers are all on board.', '…Ehe ich mich versah, so viele. Als säßen die Fahrgäste aus dreißig Jahren alle im Bus.'], 'surprised'),
          nar('バスが谷の終点に着くと、拍手が起こった。高校生だった子が、今は大人になって、花束を{受け取って|うけとって|v:n3_0438}ほしいと差し出した。', [
            'When the bus reaches the end of the line in the valley, applause breaks out. The child who was once a high-school student, now grown up, holds out a bouquet for him to take.',
            'Als der Bus die Endstation im Tal erreicht, gibt es Applaus. Das Kind, das damals Oberschüler war und jetzt erwachsen ist, reicht ihm einen Blumenstrauß.',
          ]),
          l('busdriver', 'このバスは終わるけど、町と話し合った{上で||g:uede}、来月から乗り合いタクシーを走らせることになりました。運転は、もちろんわたしです。', [
            'This bus ends, but after talks with the town, from next month there will be a shared taxi. The driver, of course, will be me.',
            'Dieser Bus endet, aber nach Gesprächen mit der Stadt fährt ab nächsten Monat ein Sammeltaxi. Am Steuer sitze natürlich ich.',
          ], 'happy'),
          l('busdriver', '天気{次第||g:shidai}で遅れる日もあるでしょうが……この谷の人たちとは、{いつまでも||v:n3_0404}一緒に走りたいですから。', [
            'Some days it may be late depending on the weather… but I want to keep riding with the people of this valley, for ever.',
            'An manchen Tagen wird es je nach Wetter Verspätung geben… aber mit den Leuten aus diesem Tal will ich für immer weiterfahren.',
          ], 'happy'),
          pic('cg_valley_arrival', '夕暮れの谷のバス停。満員のバスから、たくさんの手が振られていた。', [
            'The valley bus stop at dusk. From the packed bus, many hands are waving.',
            'Die Bushaltestelle im Tal in der Abenddämmerung. Aus dem vollen Bus winken viele Hände.',
          ]),
        ],
        teach: ['v:n3_0401', 'v:n3_0438', 'v:n3_0404', 'g:uede', 'g:shidai'],
      },
    ],
  },
];
