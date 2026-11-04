import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 7: the people of the southern island village in Okinawa (content/expansion2.ts). */
export const EPISODES_EX8: Episode[] = [
  {
    id: 'ep_ex_seiyu', chapter: 7, after: 'mq27', who: 'ok_seiyu',
    title: ['四十年目の甕', 'The Jar of Forty Years', 'Der Krug nach vierzig Jahren'],
    summary: ['The old master opens his oldest jar of awamori for a very special occasion.', 'Der alte Meister öffnet seinen ältesten Awamori-Krug zu einem ganz besonderen Anlass.'],
    scenes: [
      { at: 'ok_seiyu', goal: ['Talk to the awamori master', 'Sprich mit dem Awamori-Meister'],
        lines: [
          l('ok_seiyu', '{保存|ほぞん|v:n3_1946}{状態|じょうたい}は、{完璧|かんぺき}じゃ。{瓶|びん|v:n3_1850}に{移|うつ}す{前|まえ}の{甕|かめ}は、{宝石|ほうせき|v:n3_1931}より{大切|たいせつ}な{存在|そんざい}じゃ。', ['The state of preservation is perfect. A jar before it’s moved into bottles is more precious than any gem.', 'Der Zustand der Aufbewahrung ist perfekt. Ein Krug, bevor er in Flaschen abgefüllt wird, ist kostbarer als jeder Edelstein.']),
          l('ok_seiyu', '{専門家|せんもんか}の{評価|ひょうか|v:n3_1840}では、{世界|せかい}で{最高|さいこう}の{古酒|くーす}らしい。……じゃが、{売|う}る{気|き}はない。', ['By experts’ evaluation it’s apparently the best old awamori in the world. …But I’ve no intention of selling.', 'Nach Einschätzung der Experten ist es der beste alte Awamori der Welt. … Aber ich habe nicht vor, ihn zu verkaufen.']),
        ], teach: ['v:n3_1946', 'v:n3_1850', 'v:n3_1931', 'v:n3_1840'] },
      { at: 'exk2_still', goal: ['Be there when the jar is opened', 'Sei dabei, wenn der Krug geöffnet wird'], music: 'memory',
        lines: [
          nar('{孫|まご}の{結婚式|けっこんしき}の{朝|あさ}。{蔵|くら}の{奥|おく}で、{炎|ほのお|v:n3_1950}のような{夕日|ゆうひ}が{甕|かめ}を{赤|あか}く{染|そ}める。{四十年|よんじゅうねん}{目|め}の{蓋|ふた}が、ゆっくり{開|あ}く。', ['The morning of his grandchild’s wedding. Deep in the distillery, a flame-like sunset stains the jar red. The lid of the fortieth year slowly opens.', 'Der Morgen der Hochzeit seines Enkels. Tief in der Brennerei färbt eine flammenartige Abendsonne den Krug rot. Der Deckel des vierzigsten Jahres öffnet sich langsam.']),
          l('ok_seiyu', '{亡|な}き{妻|つま}と、この{日|ひ}に{開|あ}けようと{決|き}めた。……{味|あじ}は、{甘|あま}くて、{少|すこ}しだけ、{涙|なみだ}の{味|あじ}じゃ。', ['With my late wife I decided to open this on this very day. …It tastes sweet, and a little of tears.', 'Mit meiner verstorbenen Frau hatte ich beschlossen, ihn an diesem Tag zu öffnen. … Er schmeckt süß und ein wenig nach Tränen.'], 'happy'),
        ], teach: ['v:n3_1950'] },
    ],
  },
  {
    id: 'ep_ex_umi', chapter: 7, after: 'mq27', who: 'ok_umi',
    title: ['白くなる海', 'The Sea Turning White', 'Das Meer wird weiß'],
    summary: ['The dive instructor measures the dying reef and decides to act.', 'Die Tauchlehrerin misst das sterbende Riff und beschließt zu handeln.'],
    scenes: [
      { at: 'ok_umi', goal: ['Dive with Umi in the shallows', 'Tauche mit Umi im Flachwasser'],
        lines: [
          l('ok_umi', '{浅い|あさい|v:kf_asai}ところの{サンゴ|さんご}から、{白|しろ}くなっていくの。{水温|すいおん}の{平均|へいきん|v:n3_1914}が、ここ十年で{上|あ}がったから。', ['It starts with the coral in the shallows turning white. The average water temperature has risen over the last ten years.', 'Zuerst werden die Korallen im Flachwasser weiß. Die Durchschnittstemperatur des Wassers ist in den letzten zehn Jahren gestiegen.'], 'worried'),
          l('ok_umi', '{海水|かいすい}の{物質|ぶっしつ|v:n3_1889}を、{毎週|まいしゅう}、{分析|ぶんせき|v:n3_1910}しています。サンゴは、{減|へ}る{一方|いっぽう}。{何|なに}か、{方法|ほうほう|v:n3_1934}はないかしら。', ['Every week I analyse the substances in the seawater. The coral keeps decreasing. Isn’t there some method?', 'Jede Woche analysiere ich die Stoffe im Meerwasser. Die Korallen nehmen nur noch ab. Gibt es nicht irgendeine Methode?']),
        ], teach: ['v:kf_asai', 'v:n3_1914', 'v:n3_1889', 'v:n3_1910', 'v:n3_1934'] },
      { at: 'exk2_dive', goal: ['Plant coral with the children', 'Pflanze mit den Kindern Korallen'], music: 'memory',
        lines: [
          nar('{浜|はま}の{子|こ}どもたちが、{小|ちい}さな{サンゴ|さんご}の{枝|えだ}を、{一|ひと}つずつ{海|うみ}に{植|う}えていく。{殖やす|ふやす|v:n3_1897}ためのプロジェクトだ。', ['The beach children plant little coral branches into the sea, one by one. A project to increase them.', 'Die Kinder vom Strand pflanzen kleine Korallenzweige einzeln ins Meer. Ein Projekt, um sie zu vermehren.']),
          l('ok_umi', '{減る|へる|v:n3_1918}のは、{簡単|かんたん}。でも、{殖|ふ}やすのは、{何|なん}十年も、{待|ま}つ{仕事|しごと}。……{一人|ひとり}じゃ、できないと{思|おも}っていた。', ['Decreasing is easy. But increasing is a job of waiting decades. …I thought I couldn’t do it alone.', 'Abnehmen ist leicht. Aber Vermehren ist eine Arbeit, bei der man Jahrzehnte wartet. … Ich dachte, ich könnte es nicht allein.'], 'happy'),
        ], teach: ['v:n3_1897', 'v:n3_1918'] },
    ],
  },
  {
    id: 'ep_ex_sanshin', chapter: 7, after: 'mq27', who: 'ok_sanshin',
    title: ['書かれなかった歌', 'The Song Never Written Down', 'Das nie aufgeschriebene Lied'],
    summary: ['A teacher with three pupils wants to pass on a song that was never written down.', 'Ein Lehrer mit drei Schülern will ein Lied weitergeben, das nie aufgeschrieben wurde.'],
    scenes: [
      { at: 'ok_sanshin', goal: ['Visit the sanshin teacher', 'Besuche den Sanshin-Lehrer'],
        lines: [
          l('ok_sanshin', '{弦|げん}を{巻く|まく|v:n3_1968}たびに、{師匠|ししょう}の{声|こえ}を{思|おも}い{出|だ}す。{真似|まね|v:n3_1995}をして、{覚|おぼ}えた。{笛|ふえ|v:n3_1860}の{音|ね}と、{混|ま}じって。', ['Every time I wind the strings, I recall my master’s voice. I learned by imitating. Mixed with the sound of the flute.', 'Jedes Mal, wenn ich die Saiten aufziehe, erinnere ich mich an die Stimme meines Meisters. Ich habe durch Nachahmung gelernt. Gemischt mit dem Klang der Flöte.']),
          l('ok_sanshin', '{弟子|でし}は{三人|さんにん}。{一人|ひとり}は、{来月|らいげつ}、{島|しま}を{出|で}る。{歌|うた}を、まとめることができる{人|ひと}は、いるだろうか。', ['I have three pupils. One leaves the island next month. Is there anyone who can gather the song together?', 'Ich habe drei Schüler. Einer verlässt nächsten Monat die Insel. Gibt es jemanden, der das Lied zusammentragen kann?']),
        ], teach: ['v:n3_1968', 'v:n3_1995', 'v:n3_1860'] },
      { at: 'exk2_hall', goal: ['Listen at the community hall', 'Hör im Gemeindehaus zu'], music: 'memory',
        lines: [
          nar('{公民館|こうみんかん}の{夜|よる}。{三人|さんにん}の{弟子|でし}が、{三|みっ}つの{違|ちが}う{節|ふし}で{歌|うた}い、{歌|うた}が{一|ひと}つに{まとまる|まとまる|v:n3_1992}。{アレックス|あれっくす}さんが、{録音|ろくおん}をそっと{まとめる|まとめる|v:n3_1993}。', ['A night at the community hall. The three pupils sing three different tunes, and the song comes together as one. Alex quietly puts the recording together.', 'Ein Abend im Gemeindehaus. Die drei Schüler singen drei verschiedene Weisen, und das Lied fügt sich zu einem. Alex stellt leise die Aufnahme zusammen.']),
          l('ok_sanshin', '{歌|うた}は、{書|か}かれなくても、{生|い}きていた。……{皆|みな}を{招く|まねく|v:n3_1996}つもりはなかったが、{客|きゃく}が{百人|ひゃくにん}、{集|あつ}まった。', ['The song lived even unwritten. …I never meant to invite everyone, yet a hundred guests gathered.', 'Das Lied lebte, auch ohne aufgeschrieben zu sein. … Ich wollte nicht alle einladen, doch hundert Gäste versammelten sich.'], 'happy'),
        ], teach: ['v:n3_1992', 'v:n3_1993', 'v:n3_1996'] },
    ],
  },
  {
    id: 'ep_ex_kana', chapter: 7, after: 'mq27', who: 'ok_kana',
    title: ['貝がらの手紙', 'Letters on Seashells', 'Briefe auf Muscheln'],
    summary: ['A girl sends her mother seashell letters, and one day an answer comes.', 'Ein Mädchen schickt ihrer Mutter Muschelbriefe, und eines Tages kommt eine Antwort.'],
    scenes: [
      { at: 'ok_kana', goal: ['Meet Kana on the beach', 'Triff Kana am Strand'],
        lines: [
          l('ok_kana', '{毎日|まいにち}、{一|ひと}つの{貝|かい}に、{一|ひと}つの{言葉|ことば}を{書|か}くの。{連絡|れんらく|v:kf_renraku}は、{船|ふね}の{便|びん|v:n3_1851}で、{週|しゅう}に{一回|いっかい}だけ。', ['Every day I write one word on one shell. Contact is only once a week, by boat service.', 'Jeden Tag schreibe ich ein Wort auf eine Muschel. Kontakt gibt es nur einmal pro Woche mit dem Boot.']),
          l('ok_kana', '{今週|こんしゅう}は、{三冊|さんさつ|v:kf_satsu}ぶんの{貝|かい}。{ボート|ぼーと|v:n3_1939}に{乗|の}せるとき、字の{間違い|まちがい|v:n3_1987}を、{三回|さんかい}{確|たし}かめた。', ['This week it’s three notebooks’ worth of shells. When I put them on the boat, I checked three times for mistakes in the characters.', 'Diese Woche sind es Muscheln für drei Hefte. Als ich sie aufs Boot legte, habe ich dreimal auf Schreibfehler geprüft.']),
        ], teach: ['v:kf_renraku', 'v:n3_1851', 'v:kf_satsu', 'v:n3_1939', 'v:n3_1987'] },
      { at: 'ok_kana', goal: ['See the answer that came for Kana', 'Sieh die Antwort, die für Kana kam'], music: 'memory',
        lines: [
          nar('{浜|はま}の{柵|さく|v:n3_1998}に、{大|おお}きな{貝|かい}が{一|ひと}つ、{結|むす}んである。{中|なか}には、{母|はは}の{字|じ}で{一言|ひとこと}。「ありがとう。もうすぐ、{帰|かえ}ります」', ['Tied to the beach fence is one big shell. Inside, one line in her mother’s hand: “Thank you. I’ll be home soon.”', 'Am Strandzaun hängt eine große Muschel. Darin steht in der Schrift ihrer Mutter ein Satz: „Danke. Ich komme bald heim.“']),
          l('ok_kana', 'お{母|かあ}さんは、{貝|かい}の{中|なか}の{言葉|ことば}を、{全部|ぜんぶ}、{読|よ}んでくれてたの。……{私|わたし}、{海|うみ}に{向|む}かって、{大|おお}きな{声|こえ}で{叫|さけ}んだ。', ['Mum had been reading every word inside the shells. …I shouted out loud toward the sea.', 'Mama hat alle Worte in den Muscheln gelesen. … Ich habe laut zum Meer hin gerufen.'], 'happy'),
        ], teach: ['v:n3_1998'] },
    ],
  },
  {
    id: 'ep_ex_hirugi', chapter: 7, after: 'mq27', who: 'ok_hirugi',
    title: ['なくならないレシピ', 'The Recipe That Won’t Vanish', 'Das Rezept, das nicht verloren geht'],
    summary: ['The old soba grandmother has no written recipe. A young helper tries to catch it.', 'Die Soba-Oma hat kein schriftliches Rezept. Ein junger Helfer versucht, es einzufangen.'],
    scenes: [
      { at: 'ok_hirugi', goal: ['Help Granny Higa in the soba shop', 'Hilf Oma Higa im Sobaladen'],
        lines: [
          l('ok_hirugi', '{野菜|やさい|v:kf_yasai}は、{細かく|こまかく|v:kf_komakai}{切|き}るのよ。{豚肉|ぶたにく}は、じっくり{焼|や}く。{出汁|だし}に、{黒糖|こくとう}が{少|すこ}し{混ざる|まざる|v:n3_1976}と、{甘|あま}くなる。', ['Cut the vegetables finely. Grill the pork slowly. If a little brown sugar mixes into the stock, it turns sweet.', 'Das Gemüse schneidet man fein. Das Schweinefleisch brät man lange. Wenn sich ein wenig brauner Zucker in die Brühe mischt, wird sie süß.']),
          l('ok_hirugi', '{焼く|やく|v:kf_yaku}{順番|じゅんばん}も、とても{大事|だいじ}。でも、{レシピ|れしぴ}は、{書|か}いたことがないさあ。{体|からだ}が、{覚|おぼ}えとる。', ['The order of grilling is utterly important, too. But I’ve never written a recipe. My body remembers.', 'Auch die Reihenfolge beim Braten ist sehr wichtig. Aber ein Rezept habe ich nie aufgeschrieben. Mein Körper erinnert sich.']),
        ], teach: ['v:kf_yasai', 'v:kf_komakai', 'v:kf_yaku', 'v:n3_1976'] },
      { at: 'exk2_soba', goal: ['Watch Alex measure the secrets', 'Sieh, wie Alex die Geheimnisse misst'], music: 'memory',
        lines: [
          nar('アレックスさんが、おばあの{手|て}の{動|うご}きを、{計|はか}りながら、{交ぜる|まぜる|v:n3_1985}{量|りょう}を{メモ|めも}している。{鍋|なべ}の{中|なか}は、{真っ赤|まっか|v:n3_1989}な{唐辛子|とうがらし}。', ['Alex measures the movements of granny’s hands while noting the amounts she mixes in. In the pot, bright red chillies.', 'Alex misst die Bewegungen von Omas Händen und notiert die Mengen, die sie hineinmischt. Im Topf liegen tiefrote Chilischoten.']),
          l('ok_hirugi', '{全く|まったく|v:n3_1990}、{不思議|ふしぎ}な{人|ひと}。{私|わたし}が{知|し}らなかった、{私|わたし}のレシピを、{見|み}つけてくれた。……なくならんさあ。', ['Really, a strange man. He found my recipe — which even I didn’t know. …It won’t vanish.', 'Wirklich ein seltsamer Mensch. Er hat mein Rezept gefunden, das nicht einmal ich kannte. … Es geht nicht verloren.'], 'happy'),
        ], teach: ['v:n3_1985', 'v:n3_1990', 'v:n3_1989'] },
    ],
  },
  {
    id: 'ep_ex_taiyo', chapter: 7, after: 'mq27', who: 'ok_taiyo',
    title: ['波の向こう', 'Beyond the Waves', 'Jenseits der Wellen'],
    summary: ['A surfer dreams of leaving the island but fears disappointing it.', 'Ein Surfer träumt davon, die Insel zu verlassen, fürchtet aber, sie zu enttäuschen.'],
    scenes: [
      { at: 'ok_taiyo', goal: ['Talk to Taiyō at the beach', 'Sprich mit Taiyō am Strand'],
        lines: [
          l('ok_taiyo', '{坂|さか|v:kf_saka}を{下|くだ}って、{腕|うで|v:kf_ude}を{大|おお}きく{振|ふ}る。{ブレーキ|ぶれーき|v:n3_1904}は、かけない。でも、{大|おお}きな{波|なみ}には、よく{ぶつかる|ぶつかる|v:n3_1887}んだ。', ['Down the slope, swinging my arms wide. I don’t brake. But I often crash into big waves.', 'Den Hang hinunter, die Arme weit schwingend. Ich bremse nicht. Aber ich pralle oft gegen große Wellen.']),
          l('ok_taiyo', '{東京|とうきょう}の{大会|たいかい}に{出|で}たい。でも、{島|しま}の{人|ひと}は、{出|で}ていく{人|ひと}を{不利|ふり|v:n3_1901}に{思|おも}うんだ。……{プラス|ぷらす|v:n3_1898}より、{マイナス|まいなす|v:n3_1966}ばかり、{数|かぞ}えてしまう。', ['I want to enter a competition in Tokyo. But the islanders see those who leave as a disadvantage. …I count the minuses more than the pluses.', 'Ich möchte an einem Wettbewerb in Tokio teilnehmen. Aber die Inselleute sehen es als Nachteil, wenn jemand geht. … Ich zähle eher die Minuspunkte als die Pluspunkte.']),
        ], teach: ['v:kf_saka', 'v:kf_ude', 'v:n3_1904', 'v:n3_1887', 'v:n3_1901', 'v:n3_1898', 'v:n3_1966'] },
      { at: 'ok_taiyo', goal: ['Hear what the old people told him', 'Hör, was die Alten ihm gesagt haben'], music: 'memory',
        lines: [
          l('ok_taiyo', 'おばあたちが、{見送|みおく}りの{弁当|べんとう}を{作|つく}ってくれた。「{行|い}って、{戻|もど}っておいで」って。……{島|しま}は、{引|ひ}き{止|と}めなかった。', ['The grandmas made me a send-off lunch. “Go, and come back,” they said. …The island didn’t hold me back.', 'Die Omas haben mir ein Abschiedsessen gemacht. „Geh, und komm zurück“, sagten sie. … Die Insel hat mich nicht zurückgehalten.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_masako', chapter: 7, after: 'mq27', who: 'ok_masako',
    title: ['四つの村の先生', 'The Doctor of Four Villages', 'Die Ärztin von vier Dörfern'],
    summary: ['The only doctor for four villages is exhausted — until an old couple makes her stop.', 'Die einzige Ärztin für vier Dörfer ist erschöpft — bis ein altes Ehepaar sie zum Innehalten bringt.'],
    scenes: [
      { at: 'ok_masako', goal: ['Visit Dr. Masako at the clinic', 'Besuche Dr. Masako in der Praxis'],
        lines: [
          l('ok_masako', '{肺|はい|v:n3_2098}の{音|おと}を{聞|き}いて、{骨|ほね|v:n3_1949}の{写真|しゃしん}を{見|み}て、{薬|くすり}を{出|だ}す。{一日|いちにち}に、{患者|かんじゃ}さんは{六十人|ろくじゅうにん}。', ['I listen to lungs, look at bone X-rays, prescribe medicine. Sixty patients a day.', 'Ich höre die Lunge ab, sehe Knochenaufnahmen an und verschreibe Medikamente. Sechzig Patienten am Tag.']),
          l('ok_masako', '{体|からだ}が{不自由|ふじゆう|v:n3_1873}な{方|かた}の{家|いえ}にも、{行|い}きます。{夫婦|ふうふ|v:n3_1859}で{暮|く}らす{老人|ろうじん}が、{多|おお}いんです。', ['I go to the houses of people with disabilities too. Many old people live as couples.', 'Ich besuche auch die Häuser von Menschen mit Behinderung. Viele alte Leute leben als Ehepaar.']),
        ], teach: ['v:n3_2098', 'v:n3_1949', 'v:n3_1873', 'v:n3_1859'] },
      { at: 'exk2_clinic', goal: ['See how Masako collapses', 'Sieh, wie Masako zusammenbricht'],
        lines: [
          nar('{夕方|ゆうがた}、{先生|せんせい}が{待合室|まちあいしつ}で、ふらりと{倒|たお}れかけた。{夫人|ふじん|v:n3_1874}が、すぐに{肩|かた}を{支|ささ}える。「{先生|せんせい}も、{患者|かんじゃ}さんですよ」', ['In the evening the doctor nearly collapsed in the waiting room. The wife quickly supports her shoulder: “Doctor, you are a patient too.”', 'Am Abend wäre die Ärztin im Wartezimmer fast zusammengebrochen. Die Frau stützt rasch ihre Schulter: „Frau Doktor, auch Sie sind eine Patientin.“']),
          l('ok_masako', '{婦人|ふじん|v:n3_1875}たちが、{交代|こうたい}で{受付|うけつけ}を{手伝|てつだ}うと{言|い}ってくれました。{診察|しんさつ}に{含む|ふくむ|v:n3_1866}べきでないものまで、{私|わたし}は、{抱|かか}えていたのかもしれません。', ['The women said they would take turns helping at reception. Perhaps I had been including in my work what shouldn’t be included.', 'Die Frauen sagten, sie würden abwechselnd am Empfang helfen. Vielleicht hatte ich in meine Arbeit Dinge einbezogen, die nicht hineingehören.'], 'surprised'),
        ], teach: ['v:n3_1874', 'v:n3_1875', 'v:n3_1866'] },
      { at: 'ok_masako', goal: ['Hear what Masako changed', 'Hör, was Masako geändert hat'], music: 'memory',
        lines: [
          l('ok_masako', '{週|しゅう}に{一日|いちにち}、{休|やす}みを{取|と}ることにしました。{看護|かんご}の{学生|がくせい}も、{来|き}てくれます。{一人|ひとり}で{抱|かか}えない。それが、{私|わたし}の{治療|ちりょう}です。', ['I decided to take one day off a week. Nursing students will come too. Not carrying it alone — that is my own treatment.', 'Ich habe beschlossen, einen Tag pro Woche freizunehmen. Auch Pflegeschüler kommen. Nicht alles allein zu tragen — das ist meine eigene Behandlung.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_kenta', chapter: 7, after: 'mq27', who: 'ok_kenta',
    title: ['売らない畑', 'The Field Not for Sale', 'Das Feld, das nicht verkauft wird'],
    summary: ['A hotel wants Kenta’s sugar-cane field, and the price is tempting.', 'Ein Hotel will Kentas Zuckerrohrfeld, und der Preis ist verlockend.'],
    scenes: [
      { at: 'ok_kenta', goal: ['Talk to Kenta in the cane field', 'Sprich mit Kenta im Zuckerrohrfeld'],
        lines: [
          l('ok_kenta', '{春|はる}に{苗|なえ}を{蒔|ま}いて、{冬|ふゆ}に{刈|か}る。{一年|いちねん}で、ようやく{一|ひと}{袋|ふくろ}の{黒糖|こくとう}になる。{畑|はたけ}に{肥料|ひりょう}を{撒く|まく|v:n3_1970}のも、{手|て}です。', ['I sow the seedlings in spring and cut in winter. In a year it finally becomes one bag of brown sugar. Even spreading fertiliser on the field is done by hand.', 'Im Frühjahr säe ich die Setzlinge und im Winter schneide ich. In einem Jahr wird daraus endlich ein Sack braunen Zuckers. Selbst den Dünger auf dem Feld verteile ich von Hand.']),
          l('ok_kenta', '{物価|ぶっか|v:n3_1886}は{上|あ}がるのに、{砂糖|さとう}の{値段|ねだん}は、ずっと{同|おな}じ。{収入|しゅうにゅう}は、{増|ふ}えません。', ['Prices rise, but the price of sugar stays the same. Income doesn’t grow.', 'Die Preise steigen, aber der Zuckerpreis bleibt gleich. Das Einkommen wächst nicht.']),
        ], teach: ['v:n3_1970', 'v:n3_1886'] },
      { at: 'ok_kenta', goal: ['Go with Kenta to the hotel meeting', 'Geh mit Kenta zum Treffen mit dem Hotel'],
        lines: [
          nar('ホテルの{人|ひと}が、{畑|はたけ}の{塀|へい|v:n3_1913}の{前|まえ}で、{図面|ずめん}を{広|ひろ}げた。「ここに、プールを」。{風|かぜ}が、サトウキビの{葉|は}を、さらさらと{揺|ゆ}らしている。', ['The hotel’s man spread out his plan in front of the field’s wall. “A pool here.” The wind rustles the cane leaves.', 'Der Mann vom Hotel breitete vor der Feldmauer seinen Plan aus. „Hier ein Pool.“ Der Wind lässt die Zuckerrohrblätter rascheln.']),
          l('ok_kenta', '{畑|はたけ}を{売|う}れば、{暮|く}らしは、{楽|らく}になる。でも、{爺|じい}さんの{種|たね}を、{私|わたし}の{代|だい}で{断|た}つのは……。', ['If I sell, life gets easier. But to cut off grandfather’s seed in my generation…', 'Wenn ich verkaufe, wird das Leben leichter. Aber den Samen meines Großvaters in meiner Generation abzubrechen …'], 'worried'),
        ], teach: ['v:n3_1913'] },
      { at: 'ok_kenta', goal: ['Hear Kenta’s decision', 'Hör Kentas Entscheidung'], music: 'memory',
        lines: [
          l('ok_kenta', '{畑|はたけ}は、{売|う}りません。{代|か}わりに、{体験|たいけん}の{農園|のうえん}を、{ホテル|ほてる}と{一緒|いっしょ}にやることにした。{客|きゃく}が{畑|はたけ}の{暮|く}らしを{学|まな}ぶ。', ['I won’t sell the field. Instead I’ve decided to run an experience farm with the hotel. Guests learn the life of the fields.', 'Das Feld verkaufe ich nicht. Stattdessen führe ich mit dem Hotel eine Erlebnisfarm. Die Gäste lernen das Leben auf den Feldern kennen.'], 'happy'),
          l('ok_kenta', '{甘|あま}い{黒糖|こくとう}の{値段|ねだん}も、{少|すこ}しずつ、{上|あ}がるはずです。{爺|じい}さんに、{見|み}せたいな。', ['The price of sweet brown sugar should rise little by little, too. I want to show it to grandfather.', 'Auch der Preis für süßen braunen Zucker dürfte nach und nach steigen. Das möchte ich meinem Großvater zeigen.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_alex', chapter: 7, after: 'mq27', who: 'ok_alex',
    title: ['消えていく島の言葉', 'The Island Words Fading', 'Die schwindenden Worte der Insel'],
    summary: ['A volunteer teacher compiles the island’s dialect — and learns that words carry people.', 'Ein freiwilliger Lehrer sammelt den Dialekt der Insel — und lernt, dass Worte Menschen tragen.'],
    scenes: [
      { at: 'ok_alex', goal: ['Talk to Alex at the school', 'Sprich mit Alex an der Schule'],
        lines: [
          l('ok_alex', '{島|しま}の{言葉|ことば}の{文献|ぶんけん|v:n2_1599}は、ほとんどありません。{文脈|ぶんみゃく|v:n2_1605}を{知|し}らないと、{意味|いみ}が{分|わ}からない{言葉|ことば}も{多|おお}いんです。', ['There are almost no documents on the island’s language. Many words mean nothing unless you know the context.', 'Es gibt fast keine Dokumente über die Sprache der Insel. Viele Wörter versteht man nicht, wenn man den Kontext nicht kennt.']),
          l('ok_alex', '{大学|だいがく}の{評論|ひょうろん|v:n2_1531}には、{書|か}いてありません。{用語|ようご|v:n2_1829}は、おじい、おばあの{口|くち}に、だけあるんです。', ['It isn’t written in university critiques. The terms exist only in the mouths of the grandpas and grandmas.', 'In den Kritiken der Universität steht es nicht. Die Begriffe gibt es nur im Mund der Opas und Omas.']),
        ], teach: ['v:n2_1599', 'v:n2_1605', 'v:n2_1531', 'v:n2_1829'] },
      { at: 'exk2_school', goal: ['Join the lesson under the banyan tree', 'Nimm an der Stunde unter dem Banyanbaum teil'],
        lines: [
          nar('ガジュマルの{下|した}で、{子|こ}どもたちが、おじいの{言葉|ことば}を{一|ひと}つずつ{学|まな}んでいる。{学ぶ|まなぶ|v:n3_1994}ことは、その{国|くに}の{文明|ぶんめい|v:n3_1911}を、{知|し}ることでもある。', ['Under the banyan tree the children learn grandpa’s words one by one. Learning is also getting to know a place’s civilisation.', 'Unter dem Banyanbaum lernen die Kinder die Worte des Opas eins nach dem anderen. Lernen heißt auch, die Kultur eines Ortes kennenzulernen.']),
          l('ok_alex', '{島|しま}の{決|き}まり、つまり{島|しま}の{法|ほう|v:n3_1926}も、{言葉|ことば}の{中|なか}に{残|のこ}っています。{敬語|けいご}の{形|かたち}が、{特|とく}に{美|うつく}しいんです。', ['The island’s rules, its “laws” so to speak, remain inside the words. The forms of respectful speech are especially beautiful.', 'Die Regeln der Insel, sozusagen ihr „Gesetz“, bleiben in den Worten erhalten. Die Formen der Höflichkeitssprache sind besonders schön.']),
        ], teach: ['v:n3_1994', 'v:n3_1911', 'v:n3_1926'] },
      { at: 'ok_alex', goal: ['Hear what the children did', 'Hör, was die Kinder getan haben'], music: 'memory',
        lines: [
          l('ok_alex', '{子|こ}どもたちが、{自分|じぶん}で{島|しま}の{言葉|ことば}の{辞書|じしょ}を{作|つく}り{始|はじ}めました。{私|わたし}は、ただ、ペンを{貸|か}しただけです。', ['The children have begun making a dictionary of the island’s language by themselves. I only lent them a pen.', 'Die Kinder haben angefangen, selbst ein Wörterbuch der Inselsprache zu machen. Ich habe ihnen nur einen Stift geliehen.'], 'happy'),
          l('ok_alex', '「{言葉|ことば}は、なくなるんじゃなくて、{引|ひ}き{継|つ}がれる」。……おばあの{口癖|くちぐせ}を、{一番|いちばん}{最初|さいしょ}の{ページ|ぺーじ}に{書|か}きました。', ['“Words don’t vanish; they are handed on.” …I wrote granny’s favourite saying on the very first page.', '„Worte verschwinden nicht, sie werden weitergegeben.“ … Ich schrieb den Lieblingsspruch der Oma auf die allererste Seite.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_nagisa2', chapter: 7, after: 'mq27', who: 'ok_nagisa2',
    title: ['五十回目のエイサー', 'The Fiftieth Eisa', 'Das fünfzigste Eisa'],
    summary: ['The fiftieth Eisa festival is short of dancers. Nagisa goes door to door.', 'Dem fünfzigsten Eisa-Fest fehlen Tänzer. Nagisa geht von Haus zu Haus.'],
    scenes: [
      { at: 'ok_nagisa2', goal: ['Talk to Nagisa at the hall', 'Sprich mit Nagisa im Gemeindehaus'],
        lines: [
          l('ok_nagisa2', '{太鼓|たいこ}を{打つ|うつ|v:n3_1884}{腕|うで}も、{棒|ぼう|v:n3_1927}を{振|ふ}る{足|あし}も、{全部|ぜんぶ}、{決|き}まった{型|かた}があるの。{祭|まつり|v:n3_1991}の{前|まえ}の{日|ひ}に、{皆|みな}で{練習|れんしゅう}します。', ['Both the arm that beats the drum and the foot that swings the stick have set forms. The day before the festival, we all practise.', 'Der Arm, der die Trommel schlägt, und der Fuß, der den Stock schwingt, haben alle feste Formen. Am Tag vor dem Fest üben wir alle gemeinsam.']),
          l('ok_nagisa2', '{服装|ふくそう|v:n3_1865}は、{真|ま}っ{赤|か}な{衣装|いしょう}。……でも、{若|わか}い{人|ひと}が、{足|た}りない。{ボール|ぼーる|v:n3_1941}を{投|な}げて{遊|あそ}ぶ{子|こ}たちは、{多|おお}いのに。', ['The outfit is a deep-red costume. …But there aren’t enough young people, even though many children play throwing balls.', 'Die Kleidung ist ein tiefrotes Kostüm. … Aber es fehlen junge Leute, obwohl viele Kinder Ball spielen.']),
        ], teach: ['v:n3_1884', 'v:n3_1927', 'v:n3_1991', 'v:n3_1865', 'v:n3_1941'] },
      { at: 'exk2_hall', goal: ['Go door to door with Nagisa', 'Geh mit Nagisa von Haus zu Haus'],
        lines: [
          nar('{渚|なぎさ}さんは、{一軒|いっけん}ずつ、{玄関|げんかん}の{ペンキ|ぺんき|v:n3_1921}の{色|いろ}が{違|ちが}う{家|いえ}を、{回|まわ}っている。{腰|こし}に{巻|ま}いた{ベルト|べると|v:n3_1919}に、{小|ちい}さな{鈴|すず}が{揺|ゆ}れる。', ['Nagisa goes from house to house, each with a differently painted door. At the belt around her waist, a little bell sways.', 'Nagisa geht von Haus zu Haus, jedes mit einer anders gestrichenen Tür. An dem Gürtel um ihre Hüfte schwankt ein kleines Glöckchen.']),
          l('ok_nagisa2', '「{一回|いっかい}だけ、{見|み}に{来|き}て」と、{言|い}って{回|まわ}るの。……{断|ことわ}られても、また、{来|く}る。{祭|まつり}は、{招|まね}く{人|ひと}が、{諦|あきら}めたら、{終|お}わり。', ['I go round saying, “Just come and watch once.” …Even if refused, I come again. A festival ends when the one inviting gives up.', 'Ich gehe herum und sage: „Komm nur einmal zuschauen.“ … Auch wenn ich abgewiesen werde, komme ich wieder. Ein Fest ist zu Ende, wenn der Einladende aufgibt.']),
        ], teach: ['v:n3_1921', 'v:n3_1919'] },
      { at: 'ok_nagisa2', goal: ['Hear how many came', 'Hör, wie viele gekommen sind'], music: 'memory', evening: true,
        lines: [
          l('ok_nagisa2', '{五十回目|ごじゅっかいめ}の{夜|よる}、{広場|ひろば}には、{三百人|さんびゃくにん}が{集|あつ}まった！{見|み}ていた{観光客|かんこうきゃく}も、{子|こ}どもたちも、{一緒|いっしょ}に{踊|おど}ったの。', ['On the night of the fiftieth, three hundred gathered in the square! The watching tourists and children danced together.', 'In der Nacht des fünfzigsten Mals versammelten sich dreihundert Menschen auf dem Platz! Die zuschauenden Touristen und die Kinder tanzten zusammen.'], 'happy'),
          l('ok_nagisa2', '{太鼓|たいこ}の{音|おと}は、{島|しま}の{心臓|しんぞう}。{止|と}まったら、{島|しま}も、{止|と}まる。……{来年|らいねん}も、{再来年|さらいねん}も、{打|う}ち{続|つづ}けます。', ['The sound of the drum is the island’s heart. If it stops, the island stops too. …Next year and the year after, we’ll keep beating it.', 'Der Klang der Trommel ist das Herz der Insel. Hört er auf, hört auch die Insel auf. … Nächstes Jahr und übernächstes Jahr schlagen wir weiter.'], 'happy'),
        ], teach: [] },
    ],
  },
];
