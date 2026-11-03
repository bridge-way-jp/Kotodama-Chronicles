import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 6 (Osaka, the working city): Kenta, Minh, Section chief Fujita, Okan. */
export const EPISODES_CH6: Episode[] = [
  // ------------------------------------------------------------------ Kenta: the newcomer's tears
  {
    id: 'ep_kenta',
    chapter: 6,
    after: 'mq23',
    who: 'kenta',
    title: ['新人の涙', 'The Newcomer’s Tears', 'Die Tränen des Neulings'],
    summary: [
      'Kenta has written his resignation letter. He has not handed it in yet.',
      'Kenta hat sein Kündigungsschreiben verfasst. Abgegeben hat er es noch nicht.',
    ],
    scenes: [
      {
        at: 'kenta',
        goal: ['Ask Kenta what he is hiding in his drawer', 'Frag Kenta, was er in seiner Schublade versteckt'],
        music: 'osaka',
        lines: [
          l('kenta', 'あ、@nameさん……。見ないでください、これ。退職届の{下書き|したがき|v:n2_0774}です。', ['Oh, @name… please don’t look at this. It’s a draft of my resignation letter.', 'Ach, @name… bitte nicht hinschauen. Das ist der Entwurf meines Kündigungsschreibens.'], 'worried'),
          l('kenta', '{新入社員|しんにゅうしゃいん|v:os_shinnyuu}になって三か月。毎日{残業|ざんぎょう|v:os_zangyou}して、今日は{取引先|とりひきさき|v:os_torihiki}に送るメールの宛先を間違えるところでした。', [
            'Three months as a new employee. Overtime every day, and today I nearly sent an e-mail for a business partner to the wrong address.',
            'Seit drei Monaten bin ich neuer Mitarbeiter. Jeden Tag Überstunden, und heute hätte ich fast eine Mail an einen Geschäftspartner an die falsche Adresse geschickt.',
          ], 'worried'),
          l('kenta', '危うく大失敗する{ところだった||g:x_tokorodatta}んです。{どうせ||v:n2_1293}ぼくなんか、この仕事に向いてないんですよ。', [
            'I was this close to a huge blunder. I’m just not cut out for this job anyway.',
            'Ich war so knapp vor einem riesigen Fehler. Ich bin für diesen Job sowieso nicht gemacht.',
          ], 'worried'),
          l('kenta', '昼休みは、いつも広場の屋台で一人で食べてます。……今日も、行ってきます。', ['At lunchtime I always eat alone at the stall on the square. …I’m off there today too.', 'Mittags esse ich immer allein am Stand auf dem Platz. …Da gehe ich heute auch hin.']),
        ],
        teach: ['v:n2_0774', 'v:os_shinnyuu', 'v:os_zangyou', 'v:os_torihiki', 'v:n2_1293', 'g:x_tokorodatta'],
      },
      {
        at: 'umeda_stall',
        goal: ['Go to the food stall on the square at lunchtime', 'Geh mittags zum Imbissstand auf dem Platz'],
        lines: [
          nar('屋台のベンチに、健太くんのお弁当箱が置き忘れてあった。ふたの裏に、小さな紙が貼ってある。', [
            'On the bench at the stall, Kenta has left his lunchbox behind. A little note is stuck inside the lid.',
            'Auf der Bank am Stand hat Kenta seine Brotdose liegen lassen. Innen am Deckel klebt ein kleiner Zettel.',
          ]),
          nar('「健太へ。失敗しても、{落第|らくだい|v:n2_1856}なんかじゃないよ。毎日がんばって働いてる、その{姿勢|しせい|v:n2_0769}が、お母さんの自慢です」', [
            '“Kenta. Even if you make mistakes, you haven’t failed. The way you work hard every day — that is what Mum is proud of.”',
            '„Kenta. Auch wenn du Fehler machst, bist du nicht durchgefallen. Wie du dich jeden Tag bei der Arbeit anstrengst – darauf ist Mama stolz.“',
          ]),
          nar('紙は一枚ではなかった。ふたの裏に、何十枚も重ねて貼ってある。毎日、一枚ずつ。', ['It isn’t just one note. Dozens are stuck on top of each other inside the lid. One for every day.', 'Es ist nicht nur ein Zettel. Dutzende kleben übereinander innen im Deckel. Einer für jeden Tag.']),
          nar('一番下の紙だけ、字が違った。「健太くんへ。三十年前、わたしも同じ紙を母からもらった。　藤田」', [
            'Only the bottom one is in different handwriting: “To Kenta. Thirty years ago, I got the same notes from my mother. — Fujita”',
            'Nur der unterste ist in anderer Schrift: „Für Kenta. Vor dreißig Jahren habe ich dieselben Zettel von meiner Mutter bekommen. – Fujita“',
          ]),
        ],
        teach: ['v:n2_1856', 'v:n2_0769'],
      },
      {
        at: 'kenta',
        goal: ['Bring Kenta his lunchbox', 'Bring Kenta seine Brotdose'],
        music: 'osaka',
        lines: [
          l('kenta', '藤田課長が……？ あの、いつも怒ってばかりの課長が、こっそり。', ['Section chief Fujita…? That chief who is always getting angry — secretly?', 'Abteilungsleiter Fujita…? Der Chef, der immer nur schimpft – heimlich?'], 'surprised'),
          l('kenta', '課長が怒るのは、ぼくの{言葉遣い|ことばづかい|v:n2_0672}がお客様に失礼だったときだけでした。ぼくのこと、ちゃんと見てくれてたんだ。', [
            'He only got angry when my wording was rude to customers. He was really watching out for me.',
            'Er hat nur geschimpft, wenn meine Ausdrucksweise den Kunden gegenüber unhöflich war. Er hat wirklich auf mich geachtet.',
          ]),
          ask(
            ['退職届、どうしますか', ['What will you do with the resignation letter?', 'Was machst du mit dem Kündigungsschreiben?']],
            ['一年目は、失敗してもしかたがないよ', ['In your first year, mistakes can’t be helped.', 'Im ersten Jahr sind Fehler normal.']],
          ),
          l('kenta', '一年目の失敗は、し{てもしかたがない||g:x_temoshikata}。でも、同じ失敗はしない。メールは送る前に、三回{見直します|みなおします|v:n2_1716}！', [
            'Mistakes in the first year can’t be helped. But I won’t make the same mistake twice. I’ll check every e-mail three times before I send it!',
            'Fehler im ersten Jahr lassen sich nicht vermeiden. Aber denselben Fehler mache ich nicht zweimal. Jede Mail prüfe ich vor dem Absenden dreimal!',
          ], 'happy'),
          nar('健太くんは、退職届をびりびりに破いた。', ['Kenta tears the resignation letter into tiny pieces.', 'Kenta zerreißt das Kündigungsschreiben in kleine Stücke.']),
          l('kenta', '課長に、{申し訳ない|もうしわけない|v:n2_1767}ことをしました。……明日、ちゃんとお礼を言います。新人のつもりで、何回でも。がんばる{かいがある||g:x_kaigaaru}仕事だって、やっとわかりました。', [
            'I’ve done the chief wrong. …Tomorrow I’ll thank him properly. As many times as it takes, like the newcomer I am. I finally understand: this work is worth the effort.',
            'Ich habe dem Chef Unrecht getan. …Morgen bedanke ich mich richtig bei ihm. So oft wie nötig, wie der Neuling, der ich bin. Endlich verstehe ich: Diese Arbeit ist die Mühe wert.',
          ], 'happy'),
          pic('cg_heart_kenta', '梅田のオフィス。健太くんが、背筋を伸ばして、受話器を取った。「お電話ありがとうございます！」', [
            'The office in Umeda. Kenta straightens his back and picks up the phone. “Thank you for calling!”',
            'Das Büro in Umeda. Kenta richtet sich auf und nimmt den Hörer ab. „Vielen Dank für Ihren Anruf!“',
          ]),
        ],
        teach: ['v:n2_0672', 'v:n2_1716', 'v:n2_1767', 'g:x_temoshikata', 'g:x_kaigaaru'],
      },
    ],
  },

  // ------------------------------------------------------------------ Minh: the name of the taste of home
  {
    id: 'ep_minh',
    chapter: 6,
    after: 'mq23',
    who: 'minh',
    title: ['ミンさんの名札', 'Minh’s Name Tag', 'Minhs Namensschild'],
    summary: [
      'Customers call Minh “you there” or nothing at all. He has been studying Japanese every night for three years.',
      'Die Kunden nennen Minh „Sie da“ oder gar nichts. Seit drei Jahren lernt er jeden Abend Japanisch.',
    ],
    scenes: [
      {
        at: 'minh',
        goal: ['Talk to Minh at the convenience store', 'Sprich mit Minh im Konbini'],
        lines: [
          l('minh', 'いらっしゃいませ。……あ、@nameさん。今日、お客さんに「ちょっと、外国人の人」と呼ばれました。', [
            'Welcome… oh, @name. Today a customer called me “Hey, you, the foreigner”.',
            'Willkommen… ach, @name. Heute hat mich ein Kunde „He, Sie, der Ausländer“ gerufen.',
          ], 'worried'),
          l('minh', '名札に「ミン」と書いてあるのに、誰も読みません。……日本の人にとっては、それが{当たり前|あたりまえ|v:n2_0140}なのかな。', [
            'My name tag says “Minh”, but nobody reads it. …Maybe for Japanese people that is just normal.',
            'Auf meinem Namensschild steht „Minh“, aber niemand liest es. …Vielleicht ist das für Japaner einfach selbstverständlich.',
          ], 'worried'),
          l('minh', 'ベトナムの母は、「日本で仕事を{募集|ぼしゅう|v:n2_1649}していたから、いい{待遇|たいぐう|v:os_taiguu}のはずだ」と喜んでいます。だから、本当のことは言えません。', [
            'My mother in Vietnam is happy: “They were recruiting in Japan, so the conditions must be good.” So I can’t tell her the truth.',
            'Meine Mutter in Vietnam freut sich: „In Japan haben sie Leute gesucht, also müssen die Bedingungen gut sein.“ Deshalb kann ich ihr die Wahrheit nicht sagen.',
          ]),
          l('minh', '休みの日は、中之島の川沿いのカフェで勉強しています。ノート、忘れてきちゃったかも……。', ['On my days off I study at the riverside café in Nakanoshima. I think I may have left my notebook there…', 'An freien Tagen lerne ich im Café am Fluss in Nakanoshima. Ich glaube, ich habe mein Heft dort vergessen…']),
        ],
        teach: ['v:n2_0140', 'v:n2_1649', 'v:os_taiguu'],
      },
      {
        at: 'nakano_cafe',
        goal: ['Look for Minh’s notebook at the riverside café', 'Such Minhs Heft im Café am Fluss'],
        evening: true,
        music: 'memory',
        lines: [
          nar('窓際の席に、ぼろぼろのノートが置いてあった。三年分の、日本語の勉強の跡。', ['On the window seat lies a battered notebook. Three years’ worth of Japanese study.', 'Auf dem Fensterplatz liegt ein zerfleddertes Heft. Drei Jahre Japanischlernen.']),
          nar('漢字の{熟語|じゅくご|v:n2_0845}、{送り仮名|おくりがな|v:n2_0290}の練習。赤ペンで何度も直してある。「お客様の名前を覚える」と、何度も書いてあった。', [
            'Kanji compounds, practice of the kana endings, corrected again and again in red pen. “Remember the customers’ names,” written over and over.',
            'Kanji-Komposita, Übungen zu den Kana-Endungen, immer wieder mit Rotstift korrigiert. „Die Namen der Kunden merken“, steht da immer wieder.',
          ]),
          nar('最後のページには、お客さんの名前と、好きなものが並んでいた。「田中さん――梅おにぎり。山下さん――雨の日は傘を忘れる。藤田課長――疲れた日は、何も言わずに缶コーヒー」', [
            'On the last page, customers’ names and what they like: “Mr. Tanaka — plum rice ball. Ms. Yamashita — forgets her umbrella on rainy days. Section chief Fujita — on tired days, a can of coffee without a word.”',
            'Auf der letzten Seite stehen Namen von Kunden und was sie mögen: „Herr Tanaka – Pflaumen-Reisball. Frau Yamashita – vergisst an Regentagen ihren Schirm. Abteilungsleiter Fujita – an müden Tagen wortlos ein Dosenkaffee.“',
          ]),
          nar('ページの隅に、小さく。「いつか、みんなが僕の名前を呼んでくれると{信じて|しんじて|v:n2_0923}いる」', [
            'In the corner, in small letters: “I believe that one day everyone will call me by my name.”',
            'In der Ecke, klein: „Ich glaube daran, dass mich eines Tages alle beim Namen nennen.“',
          ]),
        ],
        teach: ['v:n2_0845', 'v:n2_0290', 'v:n2_0923'],
      },
      {
        at: 'minh',
        goal: ['Bring Minh his notebook', 'Bring Minh sein Heft'],
        lines: [
          l('minh', 'あ、ぼくのノート！ ……読んじゃいましたか。はずかしいな。', ['Ah, my notebook! …Did you read it? How embarrassing.', 'Ah, mein Heft! …Hast du es gelesen? Wie peinlich.']),
          nar('そのとき、自動ドアが開いた。藤田課長だった。', ['Just then the automatic door opens. It is Section chief Fujita.', 'Da öffnet sich die automatische Tür. Es ist Abteilungsleiter Fujita.']),
          l('fujita', '……ミンくん。いつもの、頼むわ。', ['…Minh. The usual, please.', '…Minh. Das Übliche, bitte.']),
          l('minh', '……！ はい、藤田課長。缶コーヒー、温かいのですね。', ['…! Yes, Mr. Fujita. A can of coffee, the hot one.', '…! Ja, Herr Fujita. Ein Dosenkaffee, der warme.'], 'surprised'),
          nar('課長が出て行ったあと、ミンさんは、しばらく名札を見つめていた。', ['After the chief has gone, Minh looks at his name tag for a long time.', 'Nachdem der Chef gegangen ist, schaut Minh lange auf sein Namensschild.']),
          l('minh', '名前を呼ばれると、ここにいていい、って言われた気がします。待っているだけじゃなくて、ぼくも、もっと自分から話しかければいい{はず||g:x_hazuda}です。', [
            'When someone calls my name, it feels like being told I belong here. I shouldn’t just wait — I should talk to people more myself.',
            'Wenn mich jemand beim Namen nennt, fühlt es sich an, als würde man mir sagen, dass ich hierhergehöre. Ich sollte nicht nur warten, sondern selbst mehr auf die Leute zugehen.',
          ], 'happy'),
          l('minh', '母にも、本当のことを話します。大変だけど、名前を呼んでくれる人がいる{ということ||g:x_toiukotoda}も。……忘れ{ないうちに||g:x_naiuchini}、今夜、電話します！', [
            'I’ll tell my mother the truth too. That it’s hard — but also that there are people who call me by my name. …I’ll call tonight, before I forget!',
            'Ich sage auch meiner Mutter die Wahrheit. Dass es schwer ist – aber auch, dass es Menschen gibt, die mich beim Namen nennen. …Ich rufe heute Abend an, bevor ich es vergesse!',
          ], 'happy'),
          l('minh', '@nameさんも、もっと早く話してくれれ{ばよかったのに||g:x_bainoni}、って思ってたでしょう？ ……ありがとう、@nameさん。', [
            'You were thinking I should have spoken up sooner, weren’t you? …Thank you, @name.',
            'Du hast gedacht, ich hätte früher etwas sagen sollen, oder? …Danke, @name.',
          ], 'happy'),
        ],
        teach: ['g:x_hazuda', 'g:x_toiukotoda', 'g:x_naiuchini', 'g:x_bainoni'],
      },
    ],
  },

  // ------------------------------------------------------------------ Section chief Fujita: the evening he never had
  {
    id: 'ep_fujita',
    chapter: 6,
    after: 'mq24',
    who: 'fujita',
    title: ['課長の夕日', 'The Section Chief’s Sunset', 'Der Sonnenuntergang des Abteilungsleiters'],
    summary: [
      'Section chief Fujita has not seen a sunset for twenty years. Tomorrow is his twenty-fifth wedding anniversary.',
      'Abteilungsleiter Fujita hat seit zwanzig Jahren keinen Sonnenuntergang gesehen. Morgen ist sein fünfundzwanzigster Hochzeitstag.',
    ],
    scenes: [
      {
        at: 'fujita',
        goal: ['Sit down with Section chief Fujita at the diner', 'Setz dich im Imbiss zu Abteilungsleiter Fujita'],
        music: 'osaka',
        lines: [
          l('fujita', 'おう、座りや。……今日も部下の{飲み会|のみかい|v:os_nomikai}、断ってしもた。{課長|かちょう|v:os_kachou}がおったら、みんな気ぃ使うやろ。', [
            'Hey, sit down. …I turned down my team’s after-work drinks again today. With the section chief there, everyone has to be careful.',
            'Na, setz dich. …Heute habe ich die Trinkrunde meines Teams wieder abgesagt. Wenn der Chef dabei ist, müssen alle aufpassen.',
          ]),
          l('fujita', '二十五年、月曜から土曜まで、一日{おきに||g:x_oki}徹夜しとった時期もある。{女房|にょうぼう|v:n2_1381}には、苦労をかけっぱなしや。', [
            'Twenty-five years, Monday to Saturday. There were times I pulled an all-nighter every other day. I’ve put my wife through nothing but hardship.',
            'Fünfundzwanzig Jahre, Montag bis Samstag. Es gab Zeiten, da habe ich jeden zweiten Tag durchgearbeitet. Meiner Frau habe ich nur Mühe gemacht.',
          ], 'worried'),
          l('fujita', '明日は結婚二十五年目や。……何を言うたらええんか、わからん。会社の挨拶なら、なんぼでも言えるのにな。', [
            'Tomorrow is our twenty-fifth anniversary. …I don’t know what to say. A speech at the office, I could give any number of those.',
            'Morgen ist unser fünfundzwanzigster Hochzeitstag. …Ich weiß nicht, was ich sagen soll. Eine Rede in der Firma könnte ich jederzeit halten.',
          ]),
          l('fujita', '若い頃、女房とよう通天閣に登ったわ。展望台から見る{夕日|ゆうひ|v:n2_1815}が、好きやった。……もう二十年、見とらんけどな。', [
            'When we were young, my wife and I often climbed Tsūtenkaku. She loved the sunset from the observation deck. …I haven’t seen it in twenty years, though.',
            'Als wir jung waren, sind meine Frau und ich oft auf den Tsūtenkaku gestiegen. Sie liebte den Sonnenuntergang von der Aussichtsplattform. …Ich habe ihn seit zwanzig Jahren nicht gesehen.',
          ]),
        ],
        teach: ['v:os_nomikai', 'v:os_kachou', 'v:n2_1381', 'v:n2_1815', 'g:x_oki'],
      },
      {
        at: 'shin_tower',
        goal: ['Go up the old tower at sunset', 'Steig bei Sonnenuntergang auf den alten Turm'],
        evening: true,
        music: 'memory',
        lines: [
          nar('通天閣の展望台。窓の外で、大阪の町がオレンジ色に染まっていく。', ['The observation deck of Tsūtenkaku. Outside the window, Osaka turns orange.', 'Die Aussichtsplattform des Tsūtenkaku. Draußen färbt sich Osaka orange.']),
          nar('窓際に、一人の女性が座っていた。手には、古い写真。若い頃の藤田さんと、この女性が並んで笑っている。', [
            'A woman sits by the window, an old photo in her hand: a young Mr. Fujita and this woman, laughing side by side.',
            'Am Fenster sitzt eine Frau, ein altes Foto in der Hand: der junge Herr Fujita und diese Frau, lachend nebeneinander.',
          ]),
          nar('「毎年、結婚記念日の前の日に、ここに来るんです。あの人は忙しくて、一度も来られへんけど」', [
            '“Every year, on the day before our anniversary, I come here. He’s always too busy, he’s never once managed to come.”',
            '„Jedes Jahr am Tag vor unserem Hochzeitstag komme ich hierher. Er hat immer zu viel zu tun, er hat es nie geschafft.“',
          ]),
          nar('「別に、{一流|いちりゅう|v:n2_0191}のレストランなんかいらへん。夕日を、もう一回、二人で見たいだけ。……そんな{欲張り|よくばり}でもないでしょ？」', [
            '“I don’t need some first-class restaurant. I just want to watch the sunset together once more. …That isn’t asking much, is it?”',
            '„Ich brauche kein erstklassiges Restaurant. Ich will nur noch einmal zusammen den Sonnenuntergang sehen. …Das ist doch nicht zu viel verlangt, oder?“',
          ]),
          nar('夕日が沈むと、細い{三日月|みかづき|v:n2_1704}が、空に浮かんでいた。', ['When the sun has set, a thin crescent moon hangs in the sky.', 'Als die Sonne untergegangen ist, steht eine schmale Mondsichel am Himmel.']),
        ],
        teach: ['v:n2_0191', 'v:n2_1704'],
      },
      {
        at: 'fujita',
        goal: ['Tell Section chief Fujita who was on the tower', 'Erzähl Abteilungsleiter Fujita, wer auf dem Turm war'],
        music: 'osaka',
        lines: [
          l('fujita', '……あいつが、毎年？ 二十年も、一人で？', ['…She goes every year? For twenty years, alone?', '…Sie geht jedes Jahr hin? Zwanzig Jahre lang, allein?'], 'surprised'),
          l('fujita', '働く男{といえば||g:x_toieba}、家族のために会社に尽くすもんやと思とった。そやけど、女房が欲しかったんは、たった一回の夕日やったんか。', [
            'When you said “a working man”, I thought that meant devoting yourself to the company for your family. But all my wife wanted was one sunset.',
            'Wenn man von einem „arbeitenden Mann“ sprach, dachte ich, das heißt, sich für die Familie der Firma zu widmen. Aber alles, was meine Frau wollte, war ein einziger Sonnenuntergang.',
          ]),
          ask(
            ['明日は、定時で帰りませんか', ['Why not leave on time tomorrow?', 'Warum gehen Sie morgen nicht pünktlich nach Hause?']],
            ['部下の皆さんにも、任せてみたら？', ['Why not leave things to your team too?', 'Warum überlassen Sie Ihrem Team nicht auch mal etwas?']],
          ),
          l('fujita', '明日の会議は、健太に任せる。若手{向け||g:x_mukeni}の、ええ勉強になるやろ。……本日、課長は私用{につき||g:x_nitsuki}、定時で失礼します、や。', [
            'I’ll leave tomorrow’s meeting to Kenta. It’ll be good practice, the kind meant for young staff. …“Today the section chief is leaving on time for personal reasons.”',
            'Die Besprechung morgen überlasse ich Kenta. Das ist eine gute Übung für die Jungen. …„Heute geht der Abteilungsleiter aus privaten Gründen pünktlich.“',
          ], 'happy'),
          pic('cg_osaka_lantern', '翌日の夕方。通天閣の展望台に、二人分の影が並んでいた。', [
            'The next evening, two shadows stand side by side on the observation deck of Tsūtenkaku.',
            'Am nächsten Abend stehen auf der Aussichtsplattform des Tsūtenkaku zwei Schatten nebeneinander.',
          ]),
          l('fujita', '二十年ぶりの夕日、ええもんやったで。女房、泣いて笑うとった。……おおきにな、@name。', ['The first sunset in twenty years — it was something. My wife cried and laughed. …Thanks a lot, @name.', 'Der erste Sonnenuntergang seit zwanzig Jahren – das war was. Meine Frau hat geweint und gelacht. …Vielen Dank, @name.'], 'happy'),
        ],
        teach: ['g:x_toieba', 'g:x_mukeni', 'g:x_nitsuki'],
      },
    ],
  },

  // ------------------------------------------------------------------ Okan: ten thousand "ōkini"
  {
    id: 'ep_okan',
    chapter: 6,
    after: 'mq24',
    who: 'okan',
    title: ['一万回の「おおきに」', 'Ten Thousand “Ōkini”', 'Zehntausend „Ōkini“'],
    summary: [
      'Okan says “ōkini” ten thousand times a day. Her son wants to turn the shop into a modern chain store.',
      'Okan sagt jeden Tag zehntausendmal „ōkini“. Ihr Sohn will den Laden in eine moderne Kettenfiliale verwandeln.',
    ],
    scenes: [
      {
        at: 'okan',
        goal: ['Help Okan at the takoyaki shop', 'Hilf Okan am Takoyaki-Stand'],
        music: 'dotonbori',
        lines: [
          l('okan', 'おおきに！ おおきに！ ……ふう。あんた、聞いてくれる？ 息子がな、この店を全国チェーンにするって言うねん。', [
            'Ōkini! Ōkini! …Phew. Will you listen? My son says he wants to turn this shop into a nationwide chain.',
            'Ōkini! Ōkini! …Puh. Hörst du mir zu? Mein Sohn will aus diesem Laden eine landesweite Kette machen.',
          ]),
          l('okan', '道頓堀は{賑わって|にぎわって|v:os_oraiyou}るけど、お客さんは観光客ばっかり。息子は、{割引|わりびき|v:n2_1904}券に、機械の注文に、決まった{台詞|せりふ|v:n2_1023}で「ありがとうございました」やって。', [
            'Dōtonbori is bustling, but the customers are all tourists. My son wants discount coupons, ordering machines, and a fixed line: “Thank you very much.”',
            'Dōtonbori ist belebt, aber die Kunden sind alles Touristen. Mein Sohn will Rabattgutscheine, Bestellautomaten und einen festen Spruch: „Vielen herzlichen Dank.“',
          ], 'worried'),
          l('okan', 'うちの「おおきに」も、毎日一万回言うてたら、{なんとなく||v:n2_1361}、からっぽになってきた気がするわ。', [
            'And my own “ōkini” — saying it ten thousand times a day, somehow it feels like it’s gone hollow.',
            'Und mein eigenes „Ōkini“ – wenn ich es jeden Tag zehntausendmal sage, fühlt es sich irgendwie hohl an.',
          ], 'worried'),
          l('okan', '店の奥の古い劇場に、亡くなった主人の屋台が、まだしまってあるねん。……ちょっと見てきて。', ['In the old theatre behind the shop, my late husband’s first stall is still stored away. …Go and have a look.', 'Im alten Theater hinter dem Laden steht noch der erste Stand meines verstorbenen Mannes. …Schau ihn dir mal an.']),
        ],
        teach: ['v:os_oraiyou', 'v:n2_1904', 'v:n2_1023', 'v:n2_1361'],
      },
      {
        at: 'doton_hall',
        goal: ['Look at the old stall in the theatre', 'Sieh dir den alten Stand im Theater an'],
        music: 'memory',
        lines: [
          nar('古い赤れんがの劇場の隅に、小さな木の屋台があった。のれんには、手書きの字。', ['In a corner of the old red-brick theatre stands a small wooden stall. On its curtain, handwritten letters.', 'In einer Ecke des alten Backsteintheaters steht ein kleiner Holzstand. Auf seinem Vorhang handgeschriebene Zeichen.']),
          nar('屋台の柱に、小さな傷がたくさん{刻んで|きざんで}あった。一本一本、日付と、お客さんの名前。「おばあちゃん、初めて笑った」「受験生、合格した」', [
            'Many little notches have been cut into the post of the stall. Each one with a date and a customer’s name: “Grandma laughed for the first time.” “The exam student passed.”',
            'In den Pfosten des Stands sind viele kleine Kerben geritzt. Jede mit Datum und dem Namen eines Kunden: „Oma hat zum ersten Mal gelacht.“ „Der Prüfling hat bestanden.“',
          ]),
          nar('傷の一つ一つが、その日の「おおきに」を{物語って|ものがたって|v:n2_1779}いた。', ['Each notch tells the story of that day’s “ōkini”.', 'Jede Kerbe erzählt vom „Ōkini“ jenes Tages.']),
          nar('一番上の傷だけ、まだ新しかった。息子さんの字で、「父ちゃんの店を、全国の人に知ってほしい」', [
            'Only the highest notch is still fresh. In her son’s handwriting: “I want people all over the country to know Dad’s shop.”',
            'Nur die oberste Kerbe ist noch frisch. In der Schrift ihres Sohnes: „Ich möchte, dass die Leute im ganzen Land Papas Laden kennen.“',
          ]),
        ],
        teach: ['v:n2_1779'],
      },
      {
        at: 'okan',
        goal: ['Tell Okan about the notches on the old stall', 'Erzähl Okan von den Kerben am alten Stand'],
        music: 'dotonbori',
        lines: [
          l('okan', '……息子が、そんなこと書いとったんか。店をなくしたいんやなくて、広めたかったんやな。', ['…My son wrote that? He didn’t want to get rid of the shop — he wanted to spread it.', '…Das hat mein Sohn geschrieben? Er wollte den Laden nicht loswerden – er wollte ihn bekannt machen.'], 'surprised'),
          l('okan', '「おおきに」は、言うた回数やない。一人一人の顔を見て言うから、意味があるんや。商売{上||g:x_jou}の決まり文句{といった||g:x_toitta}もんやない。', [
            '“Ōkini” isn’t about how many times you say it. It means something because you say it looking at each person’s face. It isn’t some set phrase of the trade.',
            '„Ōkini“ hängt nicht davon ab, wie oft man es sagt. Es bedeutet etwas, weil man jedem Einzelnen dabei ins Gesicht schaut. Es ist keine Floskel des Geschäfts.',
          ]),
          l('okan', '息子と話すわ。チェーンにしても{差し支えない||g:x_temosashitsukaenai}。そのかわり、どの店でも、お客さんの顔を見て「おおきに」って言うこと。それを、店の決まりとしよ。', [
            'I’ll talk to my son. It’s fine if it becomes a chain. In return, in every shop, people say “ōkini” looking at the customer’s face. Let’s make that the rule of the shop.',
            'Ich rede mit meinem Sohn. Eine Kette ist in Ordnung. Dafür sagt man in jedem Laden „Ōkini“ und schaut dem Kunden dabei ins Gesicht. Das machen wir zur Regel des Hauses.',
          ], 'happy'),
          l('okan', 'この屋台{を||g:x_wotoshite}一号店{として||g:x_wotoshite}、新しい店の真ん中に飾るんや。主人も、喜ぶやろ。', [
            'We’ll display this stall in the middle of the new shop, as shop number one. My husband would be pleased.',
            'Diesen Stand stellen wir als Filiale Nummer eins mitten in den neuen Laden. Mein Mann würde sich freuen.',
          ], 'happy'),
          pic('cg_heart_okan', '道頓堀のたこ焼き屋。おかんが、一人一人の顔を見て、熱々のたこ焼きを手渡した。', [
            'The takoyaki shop in Dōtonbori. Okan looks each customer in the face as she hands over the piping-hot takoyaki.',
            'Der Takoyaki-Stand in Dōtonbori. Okan schaut jedem Kunden ins Gesicht, als sie die dampfend heißen Takoyaki überreicht.',
          ]),
          l('okan', 'はい、あんたの分。……おおきに、@name。今日のは、ほんまもんの「おおきに」やで。', ['Here, this one’s yours. …Ōkini, @name. Today’s is a real “ōkini”.', 'Hier, das ist deins. …Ōkini, @name. Das heute ist ein echtes „Ōkini“.'], 'happy'),
        ],
        teach: ['g:x_jou', 'g:x_toitta', 'g:x_temosashitsukaenai', 'g:x_wotoshite'],
        give: ['takoyaki', 2],
      },
    ],
  },
];
