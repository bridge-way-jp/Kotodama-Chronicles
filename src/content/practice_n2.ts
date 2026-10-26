import { DE } from './de';
import type { ListeningItem, Question, ReadingText } from '../core/types';

/**
 * Exam-length reading and listening in the shape of the JLPT N2: medium and long texts, two texts to compare (統合理解),
 * information search (情報検索), and the five listening tasks (課題理解・ポイント理解・概要理解・即時応答・統合理解).
 * Original texts, NOT official JLPT material. The right option is first; the exam builder shuffles.
 * Every English text carries its German, registered for the meaning language German.
 */

type T = [en: string, de: string];
const de = ([en, d]: T) => ((DE[en] ??= d), en);

const Q = (q: string, options: string[], why: T, type: Question['type'] = 'detail'): Question => ({ q, options, answer: 0, why: de(why), type });

const R = (id: string, title: string, kind: string, body: string[], en: T, questions: Question[], grammar: string[] = []): ReadingText => ({
  id, title, kind, body: body.join('\n'), en: de(en), questions, vocab: [], grammar,
});

const L = (id: string, title: string, lines: [who: string, jp: string, voice: 'f' | 'm'][], en: T, questions: Question[]): ListeningItem => ({
  id, title, lines: lines.map(([who, jp, voice]) => ({ who, jp, voice })), en: de(en), questions, vocab: [],
});

// ================================================================== reading

export const N2_READING: ReadingText[] = [
  // ------------------------------------------------ 内容理解（短文）
  R('n2_short_mail', '取引先へのメール', 'mail', [
    '株式会社みどり商事　営業部　田村様',
    'いつもお世話になっております。北山製作所の上野です。',
    '先日ご依頼いただいた新製品のサンプルですが、工場での検査に予定より時間がかかっており、お約束していた十日の発送が難しくなりました。大変申し訳ございません。',
    '現在のところ、十四日には発送できる見込みです。もし十日までに必要な場合は、検査の済んでいる旧型のサンプルでしたらすぐにお送りできますので、お知らせいただけますでしょうか。',
    'ご迷惑をおかけいたしますが、どうぞよろしくお願いいたします。',
  ], [
    'To Mr. Tamura, Sales, Midori Trading. Thank you as always. This is Ueno from Kitayama Works. About the samples of the new product you asked for: the inspection at the factory is taking longer than planned, so shipping on the 10th as promised has become difficult. We are very sorry. At present we expect to ship on the 14th. If you need them by the 10th, we can send samples of the old model, which have passed inspection, right away, so please let us know. We apologise for the inconvenience.',
    'An Herrn Tamura, Vertrieb, Midori Trading. Vielen Dank wie immer. Hier spricht Ueno von Kitayama Works. Zu den Mustern des neuen Produkts, um die Sie gebeten haben: Die Prüfung im Werk dauert länger als geplant, daher ist der versprochene Versand am 10. schwierig geworden. Das tut uns sehr leid. Derzeit rechnen wir mit dem Versand am 14. Falls Sie sie bis zum 10. brauchen, können wir sofort Muster des alten Modells schicken, die die Prüfung schon bestanden haben – bitte geben Sie uns Bescheid. Entschuldigen Sie die Unannehmlichkeiten.',
  ], [
    Q('上野さんが田村さんに知らせてほしいことは何か。', ['十日までに旧型のサンプルが必要かどうか', '新製品のサンプルが何個必要か', '十四日に工場へ来られるかどうか', '検査の方法を変えてもいいかどうか'], [
      'Ueno asks to be told whether the old-model samples, which can be sent at once, are needed by the 10th.',
      'Ueno bittet um Nachricht, ob die Muster des alten Modells, die sofort verschickt werden können, bis zum 10. gebraucht werden.',
    ], 'intent'),
  ]),
  R('n2_short_notice', '図書館からのお知らせ', 'notice', [
    '市立中央図書館をご利用の皆様へ',
    '館内の空調設備の工事のため、七月一日から七月二十日まで、二階の学習室をご利用いただけません。一階の閲覧席は通常どおりご利用いただけますが、席の数に限りがありますので、長時間のご利用はご遠慮ください。',
    'なお、工事期間中も、本の貸し出しと返却、インターネットでの予約は、いつもどおり受け付けております。',
  ], [
    'To all users of the City Central Library. Because of work on the air-conditioning, the study room on the second floor cannot be used from July 1 to July 20. The reading seats on the first floor can be used as usual, but since there are only a limited number of seats, please refrain from using them for a long time. Lending, returns and online reservations are accepted as usual during the work.',
    'An alle Nutzer der Städtischen Zentralbibliothek. Wegen Arbeiten an der Klimaanlage kann der Lernraum im zweiten Stock vom 1. bis 20. Juli nicht genutzt werden. Die Leseplätze im Erdgeschoss sind wie gewohnt nutzbar, aber da es nur begrenzt Plätze gibt, bitten wir, sie nicht lange zu belegen. Ausleihe, Rückgabe und Online-Reservierungen sind während der Arbeiten wie gewohnt möglich.',
  ], [
    Q('このお知らせで、利用者に求めていることは何か。', ['一階の席を長い時間使わないこと', '七月中は本を借りないこと', '本の予約はインターネットだけですること', '工事の間は二階で静かにすること'], [
      'It asks users to refrain from using the limited first-floor seats for a long time.',
      'Sie bittet die Nutzer, die begrenzten Plätze im Erdgeschoss nicht lange zu belegen.',
    ], 'main'),
  ]),
  R('n2_short_memo', '同僚へのメモ', 'memo', [
    '山口さんへ',
    '午後の会議の資料、部長に見ていただいたところ、三ページ目のグラフの数字が去年のものになっているとのことでした。グラフは私が直しておきましたので、山口さんは、そのグラフについて説明している四ページ目の文章のほうを確認してもらえますか。',
    '会議は三時からです。人数分の印刷は、確認が終わってからで大丈夫です。　　　　中野',
  ], [
    'To Mr. Yamaguchi. When the manager looked at the materials for the afternoon meeting, he said the numbers in the graph on page three were last year’s. I have already fixed the graph, so could you check the text on page four, which explains that graph? The meeting is at three. Printing copies for everyone can wait until the check is done. — Nakano',
    'An Herrn Yamaguchi. Als der Abteilungsleiter die Unterlagen für die Sitzung am Nachmittag ansah, sagte er, die Zahlen im Diagramm auf Seite drei seien die vom letzten Jahr. Das Diagramm habe ich schon korrigiert; könnten Sie den Text auf Seite vier prüfen, der dieses Diagramm erklärt? Die Sitzung ist um drei. Die Kopien für alle können warten, bis die Prüfung fertig ist. – Nakano',
  ], [
    Q('山口さんがまずしなければならないことは何か。', ['四ページ目の文章を確認する', '三ページ目のグラフを直す', '部長に資料を見せる', '人数分の資料を印刷する'], [
      'Nakano has already fixed the graph; Yamaguchi is asked to check the text on page four first, and print only afterwards.',
      'Nakano hat das Diagramm schon korrigiert; Yamaguchi soll zuerst den Text auf Seite vier prüfen und erst danach drucken.',
    ], 'detail'),
  ]),
  R('n2_short_essay', '「ありがとう」の重さ', 'essay', [
    '子どものころ、祖母に「ありがとうは、言われた人より言った人のほうが得をする言葉だ」と教えられた。当時は意味がわからなかったが、大人になって、少しわかるようになった。感謝を口にすると、相手との関係が良くなるだけでなく、自分が何に支えられているのかに気づくことができる。言葉にすることで、当たり前だと思っていたことが、当たり前ではなくなるのである。',
  ], [
    'As a child my grandmother taught me that "thank you" is a word that benefits the one who says it more than the one who hears it. Back then I did not understand, but as an adult I have come to understand a little. Saying thanks not only improves the relationship with the other person, it also lets you notice what is supporting you. By putting it into words, what you took for granted stops being something to take for granted.',
    'Als Kind brachte mir meine Großmutter bei, dass „danke“ ein Wort ist, von dem der, der es sagt, mehr hat als der, der es hört. Damals verstand ich das nicht, aber als Erwachsene verstehe ich es ein wenig. Dank auszusprechen verbessert nicht nur die Beziehung zum anderen, man bemerkt auch, wovon man getragen wird. Indem man es in Worte fasst, wird das Selbstverständliche nicht mehr selbstverständlich.',
  ], [
    Q('筆者によると、「ありがとう」と言った人が得をするのはなぜか。', ['自分を支えているものに気づけるから', '相手からお礼をもらえるから', '祖母にほめてもらえるから', '当たり前のことを言わなくてすむから'], [
      'The author says saying thanks lets you notice what supports you; what seemed natural no longer is.',
      'Die Autorin sagt, durch das Danken bemerkt man, wovon man getragen wird; das scheinbar Selbstverständliche ist es nicht mehr.',
    ], 'main'),
  ]),

  // ------------------------------------------------ 内容理解（中文）
  R('n2_mid_wait', '待つ時間', 'essay', [
    '最近、何かを待つことが苦手になった、と感じる人が増えているそうだ。動画は数秒で再生が始まり、買い物をすれば翌日には商品が届く。少しでも時間がかかると、私たちはすぐにいらいらしてしまう。',
    'しかし、待つ時間は本当にむだなのだろうか。私は学生のころ、遠くに住む友人と手紙のやり取りをしていた。返事が届くまでには一週間以上かかったが、その間、友人は今ごろ何をしているだろうか、私の手紙を読んでどう思っただろうか、と何度も考えた。返事を待つ時間があったからこそ、一通の手紙を大切に読むことができたのだと思う。',
    'すぐに手に入るものは便利だが、そのぶん、心に残りにくい。待つ時間は、相手や物事について考える時間でもある。便利な時代だからこそ、あえて待つことを楽しんでみてもいいのではないだろうか。',
  ], [
    'It is said that more and more people feel they have become bad at waiting. Videos start in seconds, and things you buy arrive the next day. When something takes even a little time, we get irritated at once. But is waiting time really wasted? As a student I exchanged letters with a friend who lived far away. A reply took more than a week, and meanwhile I thought again and again about what my friend was doing and how they felt reading my letter. Precisely because there was time to wait, I could read each letter with care. What you get at once is convenient, but it stays in the heart less. Waiting is also time to think about the other person and about things. Precisely because this is a convenient age, we might deliberately try to enjoy waiting.',
    'Es heißt, immer mehr Menschen hätten das Gefühl, nicht mehr gut warten zu können. Videos starten in Sekunden, und was man kauft, kommt am nächsten Tag. Dauert etwas auch nur ein wenig, werden wir sofort ungeduldig. Aber ist Wartezeit wirklich verschwendet? Als Studentin schrieb ich Briefe mit einer Freundin, die weit weg wohnte. Eine Antwort dauerte über eine Woche, und in der Zeit dachte ich immer wieder daran, was sie gerade tat und was sie beim Lesen meines Briefes dachte. Gerade weil es diese Wartezeit gab, konnte ich jeden Brief sorgfältig lesen. Was man sofort bekommt, ist bequem, bleibt aber weniger im Herzen. Warten ist auch Zeit, um über den anderen und die Dinge nachzudenken. Gerade weil wir in einer bequemen Zeit leben, könnten wir versuchen, das Warten bewusst zu genießen.',
  ], [
    Q('筆者が学生のころの手紙の話をしたのはなぜか。', ['待つ時間が物事を大切にすることにつながる例として', '手紙のほうが電話より便利だと伝えるため', '友人との関係が悪くなった理由を説明するため', '昔は物が届くのが遅かったことを批判するため'], [
      'The letters are an example: because there was time to wait, each letter was read with care.',
      'Die Briefe sind ein Beispiel: Weil es Wartezeit gab, wurde jeder Brief sorgfältig gelesen.',
    ], 'inference'),
    Q('「そのぶん、心に残りにくい」とあるが、何が心に残りにくいのか。', ['すぐに手に入るもの', '友人からの手紙', '返事を待つ時間', '昔の思い出'], [
      '「その」 refers to the things you get at once (すぐに手に入るもの).',
      '„その“ bezieht sich auf das, was man sofort bekommt (すぐに手に入るもの).',
    ], 'expression'),
    Q('筆者がいちばん言いたいことは何か。', ['便利な時代でも、待つ時間を楽しむことには意味がある', '動画や買い物のサービスをもっと速くするべきだ', '手紙を書く習慣を学校で教えるべきだ', '待つことが苦手な人は、もっと我慢するべきだ'], [
      'The last paragraph: precisely in a convenient age, enjoying the wait is worth it.',
      'Der letzte Absatz: Gerade in einer bequemen Zeit lohnt es sich, das Warten zu genießen.',
    ], 'main'),
  ]),
  R('n2_mid_bookshop', '町の本屋', 'essay', [
    '私の住む町から、最後の本屋が消えた。駅前で五十年続いた小さな店だった。閉店の日、店の前には、別れを惜しむ人たちの長い列ができていた。',
    'インターネットで本を買えば、家にいながら、ほとんどどんな本でも手に入る。値段も安いことが多い。それなのに、なぜ人々はあの店をそれほど惜しんだのだろうか。',
    '思い返すと、あの店で私が買った本の多くは、もともと買うつもりのなかった本だった。探していた本の隣に並んでいた一冊、店主が手書きのカードで紹介していた一冊。偶然出会った本が、私の興味を少しずつ広げてくれた。インターネットは、自分が探しているものを見つけるのは得意だが、探してもいないものに出会わせてくれることは少ない。',
    '町の本屋がなくなるということは、本を買う場所がなくなるだけではない。思いがけない出会いの場所が、一つ消えるということなのだ。',
  ], [
    'The last bookshop in my town has disappeared. It was a small shop in front of the station that had lasted fifty years. On the day it closed, a long line of people sorry to say goodbye formed in front of it. If you buy books online you can get almost any book without leaving home, and often cheaper. So why did people miss that shop so much? Looking back, many of the books I bought there were books I had not meant to buy: the one next to the book I was looking for, the one the owner recommended on a handwritten card. Books I met by chance widened my interests bit by bit. The internet is good at finding what you are looking for, but rarely lets you meet what you were not looking for. When a town bookshop disappears, it is not only a place to buy books that is lost. A place of unexpected encounters disappears.',
    'Die letzte Buchhandlung meiner Stadt ist verschwunden. Es war ein kleiner Laden vor dem Bahnhof, den es fünfzig Jahre gab. Am Tag der Schließung bildete sich davor eine lange Schlange von Menschen, die Abschied nehmen wollten. Kauft man Bücher im Internet, bekommt man fast jedes Buch, ohne das Haus zu verlassen, oft auch billiger. Warum also vermissten die Leute diesen Laden so sehr? Rückblickend waren viele Bücher, die ich dort kaufte, Bücher, die ich gar nicht kaufen wollte: das neben dem gesuchten Buch, das, welches der Besitzer auf einer handgeschriebenen Karte empfahl. Zufällig gefundene Bücher erweiterten nach und nach meine Interessen. Das Internet ist gut darin, das Gesuchte zu finden, lässt einen aber selten auf das stoßen, was man gar nicht gesucht hat. Wenn eine Buchhandlung verschwindet, verschwindet nicht nur ein Ort zum Bücherkaufen, sondern ein Ort unerwarteter Begegnungen.',
  ], [
    Q('筆者があの店で買った本の多くは、どんな本だったか。', ['買うつもりがなかったが、店で偶然見つけた本', 'インターネットでは買えない古い本', '店主に頼んで取り寄せてもらった本', '駅前で働く人に人気のある本'], [
      'The third paragraph: many were books found by chance, not planned purchases.',
      'Der dritte Absatz: Viele waren zufällig gefundene Bücher, keine geplanten Käufe.',
    ], 'detail'),
    Q('筆者は、インターネットで本を買うことについてどう考えているか。', ['探しているものは見つけやすいが、偶然の出会いは少ない', '値段が高いので、町の本屋のほうがいい', '便利なので、本屋はもう必要ない', '本の種類が少なくて、不便だ'], [
      'It is good at finding what you look for but rarely brings what you were not looking for.',
      'Es findet gut das Gesuchte, bringt aber selten das, wonach man nicht gesucht hat.',
    ], 'detail'),
    Q('この文章で筆者がいちばん言いたいことは何か。', ['町の本屋がなくなると、思いがけない出会いの場所も失われる', '町の本屋は値段を安くするべきだ', 'インターネットで本を買うのはやめるべきだ', '閉店の日に並ぶ人が多いのは不思議だ'], [
      'The conclusion: losing the shop means losing a place of unexpected encounters.',
      'Das Fazit: Mit dem Laden verschwindet ein Ort unerwarteter Begegnungen.',
    ], 'main'),
  ]),
  R('n2_mid_failure', '失敗させる勇気', 'essay', [
    '子どもが失敗しそうになると、親はつい手を出してしまう。重い荷物を持とうとすれば代わりに持ち、宿題で間違えそうになれば答えを教える。子どもを思ってのことだが、それが本当に子どものためになっているかどうかは、考えてみる必要がある。',
    '人は、失敗から多くのことを学ぶ。うまくいかなかったとき、なぜだめだったのかを自分で考え、次はやり方を変えてみる。この経験を何度も重ねることで、問題を解決する力が育っていく。最初から失敗しないように守られてばかりいると、その力を育てる機会が失われてしまう。',
    'もちろん、けがをするような危険なことは止めなければならない。しかし、小さな失敗であれば、あえて見守ることも親の役割ではないだろうか。失敗した子どもに「どうしてだと思う？」と聞いてみる。それだけで、子どもは自分で考え始めるものである。',
  ], [
    'When a child is about to fail, parents tend to step in. If the child tries to carry something heavy they carry it instead; if the child is about to make a mistake in homework they tell the answer. It is done out of love, but whether it really helps the child needs thinking about. People learn a lot from failure. When something does not work, you think yourself about why, and next time try another way. Repeating this experience builds the ability to solve problems. If you are always protected from failing from the start, the chance to build that ability is lost. Of course dangerous things that could cause injury must be stopped. But with small failures, isn’t it also a parent’s role to deliberately watch over? Ask a child who failed, "Why do you think it happened?" That alone makes a child start thinking for themselves.',
    'Wenn ein Kind kurz davor ist zu scheitern, greifen Eltern oft ein. Will es etwas Schweres tragen, tragen sie es; droht ein Fehler in den Hausaufgaben, sagen sie die Lösung. Das geschieht aus Liebe, aber ob es dem Kind wirklich hilft, muss man überdenken. Menschen lernen viel aus Fehlern. Wenn etwas nicht klappt, überlegt man selbst, warum, und versucht es beim nächsten Mal anders. Durch wiederholte solche Erfahrungen wächst die Fähigkeit, Probleme zu lösen. Wird man immer von Anfang an vor dem Scheitern geschützt, geht die Gelegenheit verloren, diese Fähigkeit zu entwickeln. Natürlich muss man Gefährliches, bei dem man sich verletzen könnte, verhindern. Aber bei kleinen Fehlern gehört es doch auch zur Rolle der Eltern, bewusst nur zuzusehen. Fragt man ein Kind nach einem Fehler: „Was meinst du, warum?“, beginnt es schon allein dadurch, selbst nachzudenken.',
  ], [
    Q('筆者によると、問題を解決する力はどのように育つか。', ['失敗の理由を自分で考え、やり方を変える経験を重ねることで', '親が正しい答えをすぐに教えることで', '危険なことをできるだけ多く経験することで', '失敗しないように守られることで'], [
      'The second paragraph: thinking about why it failed and trying another way, again and again.',
      'Der zweite Absatz: Immer wieder überlegen, warum es schiefging, und es anders versuchen.',
    ], 'detail'),
    Q('「その力を育てる機会が失われてしまう」のはどんなときか。', ['いつも失敗しないように守られているとき', '危険なことを止められたとき', '親に「どうして」と聞かれたとき', '宿題を自分で終わらせたとき'], [
      'The sentence before says: when one is always protected from failing from the start.',
      'Der Satz davor sagt: wenn man immer von Anfang an vor dem Scheitern geschützt wird.',
    ], 'expression'),
    Q('筆者の考えに合うものはどれか。', ['小さな失敗なら、親は手を出さずに見守ったほうがいい', '親は子どもの失敗をすべて止めるべきだ', '子どもには危険なことも経験させるべきだ', '宿題の答えは親が教えたほうがいい'], [
      'Dangerous things must be stopped, but small failures should be watched over.',
      'Gefährliches muss man verhindern, kleine Fehler aber soll man begleiten, ohne einzugreifen.',
    ], 'main'),
  ]),

  // ------------------------------------------------ 主張理解（長文）
  R('n2_long_convenience', '便利さと考える力', 'essay', [
    '道に迷うことが、ほとんどなくなった。スマートフォンの地図に行き先を入れれば、どの道を通って、何分で着くのかを教えてくれる。知らない町でも、画面の矢印に従って歩けば、目的地にたどり着ける。本当に便利な時代になったものだ。',
    'ところが先日、旅行先で電池が切れてしまい、私は自分がどこにいるのかまったくわからなくなった。駅までの道を何度も歩いたはずなのに、景色をまったく覚えていなかったのだ。画面ばかり見ていて、町そのものを見ていなかったのである。',
    'これは地図に限った話ではない。わからない言葉があればすぐに検索し、料理を作るときは動画の手順をそのままなぞる。答えがすぐに手に入るので、自分で考えたり、迷ったりする時間が少なくなった。迷うことは、一見むだに思える。しかし、迷いながら周りを観察し、手がかりを探し、自分で判断する過程にこそ、考える力を鍛える機会がある。',
    'だからといって、便利な道具を使うなと言いたいのではない。道具は私たちの時間を節約し、できることを増やしてくれる。大切なのは、道具に頼りきるのではなく、使い方を自分で選ぶことである。たとえば、知っている町を歩くときには、あえて地図を開かずに歩いてみる。調べる前に、まず自分なりの答えを考えてみる。そうした小さな工夫で、便利さと考える力は両立できるはずだ。',
    '便利さは、使い方次第で、私たちの力を伸ばしもすれば、弱めもする。道具に使われるのではなく、道具を使う側でいたいものである。',
  ], [
    'Getting lost has almost disappeared. Enter a destination in your phone map and it tells you which way to go and how many minutes it takes. Even in an unknown town you arrive by following the arrow on the screen. It really has become a convenient age. But recently my battery died on a trip, and I had no idea where I was. Although I had surely walked the way to the station several times, I remembered nothing of the scenery. I had only been looking at the screen, not at the town itself. This is not only about maps. When we don’t know a word we search at once; when cooking we copy the steps of a video. Because answers come at once, there is less time to think or to be at a loss ourselves. Being lost seems wasteful at first glance. But in the process of observing the surroundings, looking for clues and deciding yourself while lost lies the very chance to train the power to think. That does not mean I say not to use convenient tools. Tools save our time and widen what we can do. What matters is not to rely on them completely but to choose ourselves how to use them: for example, walking in a town you know without opening the map, or first thinking of your own answer before searching. With such small efforts, convenience and the power to think should be able to coexist. Depending on how it is used, convenience can either stretch our abilities or weaken them. I want to stay on the side that uses tools, not the side used by them.',
    'Sich zu verlaufen ist fast verschwunden. Gibt man ein Ziel in die Handykarte ein, sagt sie, welchen Weg man nehmen soll und wie viele Minuten es dauert. Selbst in einer fremden Stadt kommt man ans Ziel, wenn man dem Pfeil auf dem Bildschirm folgt. Es ist wirklich eine bequeme Zeit geworden. Doch neulich war auf einer Reise mein Akku leer, und ich wusste überhaupt nicht mehr, wo ich war. Obwohl ich den Weg zum Bahnhof sicher mehrmals gegangen war, erinnerte ich mich an nichts von der Umgebung. Ich hatte nur auf den Bildschirm geschaut, nicht auf die Stadt selbst. Das betrifft nicht nur Karten. Kennen wir ein Wort nicht, suchen wir sofort; beim Kochen folgen wir genau den Schritten eines Videos. Weil die Antworten sofort da sind, bleibt weniger Zeit, selbst nachzudenken oder unsicher zu sein. Sich zu verirren wirkt auf den ersten Blick wie Zeitverschwendung. Doch gerade im Vorgang, unterwegs die Umgebung zu beobachten, nach Hinweisen zu suchen und selbst zu entscheiden, liegt die Chance, das Denken zu trainieren. Damit will ich nicht sagen, man solle keine bequemen Werkzeuge benutzen. Werkzeuge sparen uns Zeit und erweitern, was wir können. Wichtig ist, sich nicht völlig auf sie zu verlassen, sondern selbst zu wählen, wie man sie nutzt – etwa in einer bekannten Stadt bewusst ohne Karte zu gehen oder vor dem Suchen erst eine eigene Antwort zu überlegen. Mit solchen kleinen Kniffen sollten Bequemlichkeit und Denkvermögen zusammengehen. Je nach Gebrauch kann Bequemlichkeit unsere Fähigkeiten stärken oder schwächen. Ich möchte auf der Seite bleiben, die Werkzeuge benutzt, nicht von ihnen benutzt wird.',
  ], [
    Q('電池が切れたとき、筆者が自分のいる場所がわからなかったのはなぜか。', ['画面ばかり見ていて、町の景色を見ていなかったから', '初めて来た町で、駅までの道を一度も歩いていなかったから', '地図の矢印が間違った道を教えたから', '旅行先の人に道を聞けなかったから'], [
      'The second paragraph: he had walked there, but only watched the screen, not the town.',
      'Der zweite Absatz: Er war den Weg gegangen, hatte aber nur den Bildschirm angesehen, nicht die Stadt.',
    ], 'detail'),
    Q('筆者によると、考える力を鍛える機会はどこにあるか。', ['迷いながら観察し、手がかりを探し、自分で判断する過程', '答えをすぐに検索して、正しい知識を増やすこと', '動画の手順をそのとおりにまねすること', 'できるだけ多くの便利な道具を使うこと'], [
      'The third paragraph names the process of observing, looking for clues and deciding while lost.',
      'Der dritte Absatz nennt den Vorgang, beim Verirren zu beobachten, Hinweise zu suchen und selbst zu entscheiden.',
    ], 'detail'),
    Q('この文章で筆者が最も言いたいことは何か。', ['道具に頼りきらず、自分で使い方を選ぶことが大切だ', '便利な道具は考える力を弱めるので、使わないほうがいい', 'スマートフォンの地図はもっと正確になるべきだ', '旅行のときは、必ず予備の電池を持っていくべきだ'], [
      'He says explicitly he does not reject tools; what matters is choosing how to use them and not relying on them completely.',
      'Er sagt ausdrücklich, dass er Werkzeuge nicht ablehnt; wichtig ist, selbst zu wählen, wie man sie nutzt, statt sich ganz auf sie zu verlassen.',
    ], 'main'),
  ]),
  R('n2_long_volunteer', '「助ける」と「助けられる」', 'essay', [
    '大きな地震のあと、私はボランティアとして被災地に一か月滞在した。出発する前、私は「困っている人を助けに行くのだ」と考えていた。家を片づけ、物資を運び、避難所で食事を配る。自分にできることは何でもしようと決めていた。',
    'ところが、現地で過ごすうちに、その考えが少しずつ変わっていった。ある日、避難所で暮らすおばあさんが、私に温かいお茶をいれてくれた。「あなたたちも疲れているでしょう」と言って。家を失い、自分のほうがずっと大変なはずなのに、その人は私を気遣ってくれたのだ。',
    'それからというもの、私は、助ける側と助けられる側という分け方に疑問を持つようになった。物を運ぶのは私たちでも、現地の人たちは、町の道や人のつながりを教えてくれた。私たちが元気をなくしていると、逆に励ましてくれた。支援とは、一方が他方に何かを与えることではなく、お互いにできることを出し合う関係なのではないだろうか。',
    '「助けてあげる」という気持ちは、ときに相手の誇りを傷つける。相手を、ただ助けを待つ人として見てしまうからだ。本当に必要なのは、相手を一人の対等な人間として尊重し、一緒に生活を立て直そうとする姿勢である。あの一か月で私が学んだいちばん大きなことは、そのことだった。',
  ], [
    'After a big earthquake I stayed in the disaster area as a volunteer for a month. Before leaving I thought I was going to help people in trouble: clearing houses, carrying supplies, handing out meals at the shelter. I had decided to do anything I could. But while I was there that thought changed bit by bit. One day an old woman living in the shelter made me a cup of hot tea, saying, "You must be tired too." She had lost her home and surely had it much harder, and yet she cared about me. From then on I began to doubt the division into helpers and the helped. We carried things, but the local people taught us the town’s roads and the ties between people. When we lost heart, they encouraged us instead. Isn’t support not one side giving something to the other, but a relationship where each brings what they can? The feeling of "I will help you" sometimes hurts the other’s pride, because it sees them only as someone waiting for help. What is really needed is the attitude of respecting the other as an equal person and rebuilding life together. That was the biggest thing I learned in that month.',
    'Nach einem großen Erdbeben blieb ich einen Monat als Freiwillige im Katastrophengebiet. Vor der Abreise dachte ich: Ich gehe hin, um Menschen in Not zu helfen – Häuser aufräumen, Hilfsgüter tragen, im Notquartier Essen verteilen. Ich hatte beschlossen, alles zu tun, was ich kann. Doch während meiner Zeit dort änderte sich dieser Gedanke nach und nach. Eines Tages machte mir eine alte Frau, die im Notquartier lebte, einen heißen Tee und sagte: „Ihr seid doch sicher auch müde.“ Sie hatte ihr Haus verloren und hatte es eigentlich viel schwerer, und trotzdem sorgte sie sich um mich. Seitdem begann ich, die Einteilung in Helfende und Hilfeempfangende zu bezweifeln. Wir trugen die Sachen, aber die Einheimischen zeigten uns die Wege der Stadt und die Verbindungen zwischen den Menschen. Wenn wir den Mut verloren, ermutigten sie umgekehrt uns. Ist Unterstützung nicht weniger, dass eine Seite der anderen etwas gibt, sondern eine Beziehung, in der jeder einbringt, was er kann? Das Gefühl „Ich helfe dir“ verletzt manchmal den Stolz des anderen, weil man ihn nur als jemanden sieht, der auf Hilfe wartet. Wirklich nötig ist die Haltung, den anderen als gleichwertigen Menschen zu achten und das Leben gemeinsam wieder aufzubauen. Das war das Wichtigste, was ich in diesem Monat gelernt habe.',
  ], [
    Q('おばあさんがお茶をいれてくれたことについて、筆者はどう感じたか。', ['自分のほうが大変なのに、自分を気遣ってくれたことに心を動かされた', 'ボランティアがお茶をもらうのはよくないと思った', '避難所の食事が足りていないと心配した', 'おばあさんが元気になったので安心した'], [
      'She had lost her home and had it much harder, yet cared about the volunteer; that moved the author.',
      'Sie hatte ihr Haus verloren und es viel schwerer, sorgte sich aber um die Helferin – das bewegte die Autorin.',
    ], 'inference'),
    Q('「その考え」とは、どんな考えか。', ['自分は困っている人を助けに行くのだという考え', '被災地には一か月しかいられないという考え', '物資を運ぶのは現地の人の仕事だという考え', 'ボランティアは疲れてはいけないという考え'], [
      '「その考え」 points back to the first paragraph: "I am going to help people in trouble".',
      '„その考え“ verweist auf den ersten Absatz: „Ich gehe hin, um Menschen in Not zu helfen“.',
    ], 'expression'),
    Q('筆者の考えに最も近いものはどれか。', ['支援とは、対等な立場でお互いにできることを出し合うことだ', '支援する人は、相手の気持ちより作業の量を大切にするべきだ', '被災地の人は、ボランティアに頼らずに生活するべきだ', '「助けてあげる」という気持ちがなければ、支援は続かない'], [
      'The author sees support as an equal relationship where each brings what they can.',
      'Die Autorin versteht Unterstützung als gleichwertige Beziehung, in der jeder einbringt, was er kann.',
    ], 'main'),
  ]),

  // ------------------------------------------------ 統合理解（A と B）
  R('n2_compare_remote', '在宅勤務について', 'compare', [
    'Ａ',
    '在宅勤務を始めてから、通勤に使っていた往復二時間が自由に使えるようになった。朝はゆっくり家族と食事ができ、夜は早く子どもを迎えに行ける。集中したい仕事は、誰にも話しかけられない自宅のほうがはかどる。もちろん、同僚と気軽に相談できないという不便はあるが、オンラインの会議で十分補えている。働く場所を選べることは、これからの時代に欠かせない仕組みだと思う。',
    'Ｂ',
    '在宅勤務には確かに利点が多い。通勤の負担がなくなり、仕事に集中しやすい人もいるだろう。しかし、私が心配しているのは、新しく入った社員のことだ。仕事の進め方や職場の雰囲気は、先輩の仕事ぶりを近くで見たり、ちょっとした雑談をしたりする中で身につくものである。画面越しでは、そうした機会がどうしても少なくなる。在宅勤務を続けるのであれば、新人が孤立しないような工夫が必要だ。',
  ], [
    'A: Since I started working from home, the two hours a day I used to spend commuting are free. In the morning I can eat slowly with my family, and in the evening I can pick up my child early. Work that needs focus goes better at home, where nobody talks to me. Of course it is inconvenient that I cannot easily consult colleagues, but online meetings make up for it well enough. Being able to choose where to work is an indispensable system for the times ahead. B: Working from home certainly has many advantages. The burden of commuting disappears, and some people find it easier to concentrate. But what worries me are new employees. How to do the work and the atmosphere of a workplace are learned by watching seniors work up close and through small chats. Through a screen there are inevitably fewer such chances. If working from home continues, efforts are needed so that newcomers are not isolated.',
    'A: Seit ich im Homeoffice arbeite, habe ich die zwei Stunden Pendelzeit pro Tag frei. Morgens kann ich in Ruhe mit der Familie essen, abends mein Kind früh abholen. Arbeit, die Konzentration braucht, geht zu Hause besser, wo mich niemand anspricht. Natürlich ist es unpraktisch, dass ich Kollegen nicht einfach fragen kann, aber Online-Meetings gleichen das ausreichend aus. Den Arbeitsort wählen zu können, ist für die kommende Zeit unverzichtbar. B: Homeoffice hat sicher viele Vorteile. Die Belastung durchs Pendeln fällt weg, und manche können sich besser konzentrieren. Sorgen mache ich mir aber um neue Mitarbeiter. Wie man arbeitet und wie die Stimmung am Arbeitsplatz ist, lernt man, indem man erfahrenen Kollegen aus der Nähe zusieht und kleine Gespräche führt. Über den Bildschirm gibt es solche Gelegenheiten zwangsläufig weniger. Wenn das Homeoffice weitergeht, braucht es Maßnahmen, damit Neue nicht isoliert werden.',
  ], [
    Q('ＡとＢのどちらにも書かれていることは何か。', ['在宅勤務には、仕事に集中しやすいという面がある', '在宅勤務では、新しい社員が孤立しやすい', 'オンラインの会議だけで相談は十分にできる', '通勤の時間を家族と過ごす時間にするべきだ'], [
      'A says focused work goes better at home; B grants that some find it easier to concentrate.',
      'A sagt, konzentrierte Arbeit gehe zu Hause besser; B räumt ein, dass manche sich besser konzentrieren können.',
    ], 'detail'),
    Q('在宅勤務について、ＡとＢはどのように考えているか。', ['Ａは積極的に評価し、Ｂは利点を認めながらも課題を指摘している', 'ＡもＢも、在宅勤務はやめるべきだと考えている', 'Ａは課題を指摘し、Ｂは積極的に評価している', 'ＡもＢも、新人の教育には在宅勤務が向いていると考えている'], [
      'A calls it indispensable; B accepts the advantages but warns about newcomers becoming isolated.',
      'A nennt es unverzichtbar; B erkennt die Vorteile an, warnt aber vor der Isolation neuer Mitarbeiter.',
    ], 'main'),
  ]),
  R('n2_compare_phone', '子どもとスマートフォン', 'compare', [
    'Ａ',
    '小学生の娘にスマートフォンを持たせることにした。習い事の帰りが遅くなる日もあり、何かあったときにすぐ連絡が取れるのは安心だ。もちろん、使い方には家族でルールを決めた。夜九時以降は使わない、知らない人とはやり取りしない。最初から禁止するより、正しい使い方を一緒に学ぶほうが、本人のためになると考えている。',
    'Ｂ',
    '子どもにスマートフォンを持たせるのは、もう少し待ってもいいのではないか。連絡のためなら、通話だけができる簡単な電話でも十分だ。インターネットにつながる機械を持てば、子どもは大人の目の届かないところで、さまざまな情報に触れることになる。ルールを決めても、それを守らせ続けるのは簡単ではない。本人が自分で判断できる年齢になるまでは、慎重であるべきだ。',
  ], [
    'A: I decided to let my daughter in primary school have a smartphone. Some days she comes home late from lessons, and being able to contact her at once if something happens is reassuring. Of course we set family rules: no use after 9 p.m., no exchanges with strangers. I think learning the right use together is better for her than banning it from the start. B: Couldn’t we wait a little longer before giving children smartphones? For contact, a simple phone that can only make calls is enough. With a device connected to the internet, children come into contact with all kinds of information where adults cannot see. Even if you set rules, making them keep them is not easy. Until they are old enough to judge for themselves, we should be careful.',
    'A: Ich habe beschlossen, meiner Tochter in der Grundschule ein Smartphone zu geben. An manchen Tagen kommt sie spät vom Unterricht, und dass ich sie sofort erreichen kann, wenn etwas ist, beruhigt mich. Natürlich haben wir Familienregeln festgelegt: nach 21 Uhr keine Nutzung, kein Austausch mit Fremden. Ich denke, gemeinsam den richtigen Umgang zu lernen, ist besser für sie, als es von vornherein zu verbieten. B: Könnte man nicht noch etwas warten, bevor man Kindern ein Smartphone gibt? Zum Erreichen reicht ein einfaches Telefon, mit dem man nur anrufen kann. Mit einem Gerät mit Internet kommen Kinder dort, wo Erwachsene nicht hinsehen, mit allerlei Informationen in Kontakt. Auch wenn man Regeln aufstellt, ist es nicht leicht, sie dauerhaft einhalten zu lassen. Bis sie alt genug sind, selbst zu urteilen, sollte man vorsichtig sein.',
  ], [
    Q('ＡとＢが共通して述べていることは何か。', ['子どもとすぐに連絡が取れることは大切だ', '子どもには早くスマートフォンを持たせるべきだ', 'ルールを決めれば、子どもは必ず守る', 'インターネットの情報は子どもにとって役に立つ'], [
      'A values being able to contact her daughter; B also accepts contact as a need, but says a simple phone is enough.',
      'A schätzt es, die Tochter erreichen zu können; auch B erkennt das Erreichen als Bedarf an, meint aber, ein einfaches Telefon reiche.',
    ], 'detail'),
    Q('ルールを決めることについて、ＡとＢはどう考えているか。', ['Ａはルールを決めて一緒に学べばよいと考え、Ｂはルールを守らせ続けるのは難しいと考えている', 'ＡもＢも、ルールがあれば問題はないと考えている', 'Ａはルールは必要ないと考え、Ｂはルールが必要だと考えている', 'ＡもＢも、ルールは子ども自身に決めさせるべきだと考えている'], [
      'A trusts family rules and learning together; B doubts that rules can be kept up.',
      'A vertraut auf Familienregeln und gemeinsames Lernen; B bezweifelt, dass Regeln dauerhaft eingehalten werden.',
    ], 'main'),
  ]),

  // ------------------------------------------------ 情報検索
  R('n2_info_course', '市民講座のご案内（秋）', 'info', [
    'ひかり市　市民講座　秋の受講者募集',
    '■ やさしいパソコン入門　毎週月曜　10:00〜12:00　全6回　受講料3,000円　対象：市内在住の方　定員20名',
    '■ 季節の和菓子づくり　第1・第3土曜　13:00〜15:00　全4回　受講料4,000円（材料費別途1,500円）　対象：どなたでも　定員12名',
    '■ はじめての英会話　毎週水曜　19:00〜20:30　全8回　受講料5,000円　対象：市内在住・在勤の方　定員15名',
    '■ 親子で楽しむ自然観察　第2日曜　9:00〜11:00　全3回　受講料1組2,000円　対象：小学生とその保護者　定員10組',
    '【申し込み方法】往復はがき、または市のホームページから。申し込みは一人二講座まで。',
    '【締め切り】9月15日（必着）。定員を超えた場合は抽選となります。',
    '※市外にお住まいで、市内の会社に勤めている方は、「在勤」の講座にお申し込みいただけます。',
  ], [
    'Hikari City adult courses, autumn. Easy PC introduction: Mondays 10–12, 6 sessions, ¥3,000, for city residents, 20 places. Seasonal wagashi making: 1st and 3rd Saturdays 13–15, 4 sessions, ¥4,000 (materials ¥1,500 extra), open to anyone, 12 places. First English conversation: Wednesdays 19:00–20:30, 8 sessions, ¥5,000, for people living or working in the city, 15 places. Nature watching for parent and child: 2nd Sunday 9–11, 3 sessions, ¥2,000 per pair, primary pupils with a guardian, 10 pairs. Apply by return postcard or the city website; up to two courses per person. Deadline September 15 (must arrive); a lottery if oversubscribed. People living outside the city but working at a company in the city may apply for courses marked "working".',
    'Volkshochschule Stadt Hikari, Herbst. Einfacher PC-Einstieg: montags 10–12 Uhr, 6 Termine, 3.000 ¥, für Einwohner der Stadt, 20 Plätze. Saisonale Wagashi herstellen: 1. und 3. Samstag 13–15 Uhr, 4 Termine, 4.000 ¥ (Material 1.500 ¥ extra), für alle, 12 Plätze. Erstes Englischgespräch: mittwochs 19:00–20:30, 8 Termine, 5.000 ¥, für Einwohner und in der Stadt Berufstätige, 15 Plätze. Naturbeobachtung für Eltern und Kind: 2. Sonntag 9–11 Uhr, 3 Termine, 2.000 ¥ pro Paar, Grundschulkinder mit Erziehungsberechtigtem, 10 Paare. Anmeldung per Antwortpostkarte oder über die Website der Stadt; bis zu zwei Kurse pro Person. Anmeldeschluss 15. September (Eingang); bei zu vielen Anmeldungen wird gelost. Wer außerhalb wohnt, aber in einer Firma in der Stadt arbeitet, kann sich für die Kurse „Berufstätige“ anmelden.',
  ], [
    Q('隣の市に住み、ひかり市の会社に勤めている会社員のリンさんは、平日の夜しか時間がない。リンさんが申し込める講座はどれか。', ['はじめての英会話', 'やさしいパソコン入門', '季節の和菓子づくり', '親子で楽しむ自然観察'], [
      'Only the English course is on a weekday evening, and it is open to people who work in the city.',
      'Nur der Englischkurs liegt an einem Werktagabend und steht auch in der Stadt Berufstätigen offen.',
    ], 'detail'),
    Q('ひかり市に住む田中さんは、和菓子づくりの講座に申し込みたい。全部でいくら必要か。', ['5,500円', '4,000円', '3,000円', '1,500円'], [
      'The fee is ¥4,000 plus ¥1,500 for materials: ¥5,500.',
      'Die Gebühr beträgt 4.000 ¥ plus 1.500 ¥ Material: 5.500 ¥.',
    ], 'detail'),
  ]),
  R('n2_info_job', 'アルバイト募集', 'info', [
    '駅前カフェ「こもれび」　スタッフ募集',
    '【Ａ】朝のホール係　7:00〜11:00　時給1,100円　週3日以上　未経験の方歓迎',
    '【Ｂ】昼のキッチン係　11:00〜16:00　時給1,150円　週2日以上　調理の経験がある方',
    '【Ｃ】夜のホール係　17:00〜22:00　時給1,200円（22時以降は1,500円）　週2日以上　未経験の方歓迎　高校生不可',
    '【Ｄ】土日のみのホール係　10:00〜18:00　時給1,250円　土日両方入れる方',
    '※交通費は一日500円まで支給。※まかない（食事）あり。',
    '応募は、お電話または店頭で。面接の日時はご相談に応じます。',
  ], [
    'Café "Komorebi" by the station, staff wanted. A: morning floor staff 7–11, ¥1,100/h, 3+ days a week, beginners welcome. B: lunchtime kitchen staff 11–16, ¥1,150/h, 2+ days a week, cooking experience required. C: evening floor staff 17–22, ¥1,200/h (¥1,500 after 22:00), 2+ days a week, beginners welcome, no high-school students. D: weekend-only floor staff 10–18, ¥1,250/h, must work both Saturday and Sunday. Travel paid up to ¥500 a day; staff meals. Apply by phone or in the shop; interview time by arrangement.',
    'Café „Komorebi“ am Bahnhof sucht Personal. A: Service morgens 7–11 Uhr, 1.100 ¥/Std., mind. 3 Tage pro Woche, Anfänger willkommen. B: Küche mittags 11–16 Uhr, 1.150 ¥/Std., mind. 2 Tage pro Woche, Kocherfahrung nötig. C: Service abends 17–22 Uhr, 1.200 ¥/Std. (ab 22 Uhr 1.500 ¥), mind. 2 Tage pro Woche, Anfänger willkommen, keine Oberschüler. D: Service nur am Wochenende 10–18 Uhr, 1.250 ¥/Std., man muss Samstag und Sonntag arbeiten. Fahrtkosten bis 500 ¥ pro Tag; Mitarbeiteressen. Bewerbung telefonisch oder im Laden; Vorstellungstermin nach Absprache.',
  ], [
    Q('大学生のキムさんは、料理をした経験がなく、授業がない火曜と木曜の夕方から夜に働きたい。キムさんに合う仕事はどれか。', ['Ｃ', 'Ａ', 'Ｂ', 'Ｄ'], [
      'C is evenings, 2 days a week is enough, and beginners are welcome; a university student is not excluded.',
      'C ist abends, 2 Tage pro Woche reichen, und Anfänger sind willkommen; Studenten sind nicht ausgeschlossen.',
    ], 'detail'),
    Q('この店でアルバイトをしたい人が、まずしなければならないことは何か。', ['電話をかけるか、店に行って応募する', 'ホームページから応募用紙を送る', '面接の日を店に決めてもらう', '交通費の領収書を用意する'], [
      'The last line: apply by phone or in the shop.',
      'Die letzte Zeile: Bewerbung telefonisch oder im Laden.',
    ], 'detail'),
  ]),
];

// ================================================================== listening

export const N2_LISTENING: ListeningItem[] = [
  // ------------------------------------------------ 課題理解
  L('n2_task_meeting', '会社で：会議の準備', [
    ['男', '佐藤さん、明日の会議の準備、どうなってる？', 'm'],
    ['女', '資料はもう印刷しました。あとは会議室の予約なんですが、いつもの第一会議室が使えなくて。', 'f'],
    ['男', 'そうか。じゃあ、第三会議室は？', 'm'],
    ['女', 'そちらは空いているんですが、プロジェクターがないんです。', 'f'],
    ['男', 'プロジェクターなら、総務に言えば貸してもらえるよ。予約を取ったら、すぐ総務に連絡しておいて。', 'm'],
    ['女', 'わかりました。お客様へのお茶の用意はどうしましょう。', 'f'],
    ['男', 'それは当日の朝でいいよ。', 'm'],
  ], [
    'At a company. M: Sato, how is the preparation for tomorrow’s meeting? F: I’ve printed the materials. What remains is booking a room, but the usual Meeting Room 1 is not available. M: I see. What about Room 3? F: That one is free, but it has no projector. M: If you tell General Affairs, they will lend you one. Once you have booked, contact them right away. F: Understood. What about tea for the guests? M: That can wait until the morning of the day.',
    'In einer Firma. M: Frau Sato, wie steht es mit der Vorbereitung der Sitzung morgen? F: Die Unterlagen sind gedruckt. Es fehlt noch die Raumreservierung, aber der übliche Raum 1 ist belegt. M: Verstehe. Und Raum 3? F: Der ist frei, hat aber keinen Projektor. M: Den leiht dir die Verwaltung, wenn du Bescheid sagst. Sobald du reserviert hast, melde dich gleich dort. F: Verstanden. Und der Tee für die Gäste? M: Das reicht am Morgen des Tages.',
  ], [
    Q('女の人はこのあとまず何をしなければならないか。', ['第三会議室を予約する', '総務にプロジェクターを借りに行く', '資料を印刷する', 'お茶の用意をする'], [
      'First the booking of Room 3, then contact General Affairs; tea is for the morning of the day.',
      'Zuerst Raum 3 reservieren, danach die Verwaltung kontaktieren; der Tee hat Zeit bis zum Morgen.',
    ]),
  ]),
  L('n2_task_clinic', '病院の受付で', [
    ['女', '初めての方ですね。保険証はお持ちですか。', 'f'],
    ['男', 'はい、これです。', 'm'],
    ['女', 'ありがとうございます。では、こちらの問診票に、今日の症状と、今飲んでいる薬があれば書いてください。書き終わったら、体温を測ってから、問診票と一緒にこちらに出してください。', 'f'],
    ['男', '体温計はどこにありますか。', 'm'],
    ['女', 'あちらの待合室の机の上にあります。', 'f'],
  ], [
    'At the clinic reception. F: This is your first visit, isn’t it? Do you have your insurance card? M: Yes, here. F: Thank you. Then please write today’s symptoms and any medicine you are taking on this questionnaire. When you have finished, take your temperature and hand it in here together with the questionnaire. M: Where is the thermometer? F: On the desk in the waiting room over there.',
    'Am Empfang einer Praxis. F: Sie sind zum ersten Mal hier, oder? Haben Sie Ihre Versicherungskarte? M: Ja, hier. F: Danke. Dann tragen Sie bitte Ihre heutigen Beschwerden und Medikamente, die Sie nehmen, in diesen Fragebogen ein. Danach messen Sie bitte Fieber und geben es zusammen mit dem Fragebogen hier ab. M: Wo ist das Thermometer? F: Auf dem Tisch im Wartezimmer dort drüben.',
  ], [
    Q('男の人はこのあとまず何をするか。', ['問診票に症状と薬を書く', '体温を測る', '保険証を出す', '待合室で名前が呼ばれるのを待つ'], [
      'The card is already handed over; first fill in the questionnaire, then take the temperature.',
      'Die Karte ist schon abgegeben; zuerst den Fragebogen ausfüllen, dann Fieber messen.',
    ]),
  ]),
  L('n2_task_moving', '引っ越しの相談', [
    ['女', '来月の引っ越し、もう業者には頼んだ？', 'f'],
    ['男', 'うん、三社から見積もりをもらって、一番安いところに決めたよ。', 'm'],
    ['女', 'よかった。じゃあ、電気やガスの手続きは？', 'f'],
    ['男', '電気はインターネットで済ませた。ガスは立ち会いが必要だから、日にちを決めて電話しないと。', 'm'],
    ['女', '住所の変更は？', 'f'],
    ['男', 'それは引っ越してから区役所に行くつもり。', 'm'],
  ], [
    'Talking about moving. F: Have you booked a moving company for next month? M: Yes, I got quotes from three and chose the cheapest. F: Good. And the electricity and gas? M: Electricity I did online. Gas needs someone present, so I have to fix a date and call. F: And the change of address? M: I plan to go to the ward office after moving.',
    'Gespräch über einen Umzug. F: Hast du für nächsten Monat schon eine Umzugsfirma bestellt? M: Ja, ich habe drei Angebote eingeholt und die billigste genommen. F: Gut. Und Strom und Gas? M: Strom habe ich online erledigt. Beim Gas muss jemand dabei sein, also muss ich einen Termin festlegen und anrufen. F: Und die Adressänderung? M: Dafür gehe ich nach dem Umzug zum Bezirksamt.',
  ], [
    Q('男の人はこのあと何をしなければならないか。', ['ガス会社に電話して日にちを決める', '引っ越しの業者を探す', '電気の手続きをする', '区役所に住所の変更をしに行く'], [
      'Mover and electricity are done; the address change comes after the move. What is left now is calling the gas company.',
      'Umzugsfirma und Strom sind erledigt; die Adressänderung kommt nach dem Umzug. Jetzt bleibt der Anruf beim Gas.',
    ]),
  ]),
  // ------------------------------------------------ ポイント理解
  L('n2_point_late', '遅刻の理由', [
    ['女', '田中くん、今朝はどうしたの？電車が遅れたの？', 'f'],
    ['男', 'いえ、電車は時間どおりだったんです。実は、駅で気分の悪くなった人がいて、駅員さんが来るまでそばについていたんです。', 'm'],
    ['女', 'そうだったの。それなら仕方ないね。その人は大丈夫だった？', 'f'],
    ['男', 'はい、救急車が来るころには、少し落ち着いていました。', 'm'],
  ], [
    'F: Tanaka, what happened this morning? Was the train late? M: No, the train was on time. Actually there was someone who felt ill at the station, and I stayed with them until a station worker came. F: I see, then it can’t be helped. Was the person all right? M: Yes, by the time the ambulance came they had calmed down a little.',
    'F: Tanaka, was war heute Morgen los? War der Zug verspätet? M: Nein, der Zug war pünktlich. Am Bahnhof ging es jemandem schlecht, und ich bin bei ihm geblieben, bis ein Bahnmitarbeiter kam. F: Ach so, dann kann man nichts machen. Ging es der Person gut? M: Ja, als der Krankenwagen kam, hatte sie sich etwas beruhigt.',
  ], [
    Q('男の人はどうして遅刻したのか。', ['気分の悪くなった人のそばにいたから', '電車が遅れたから', '自分が病院に行っていたから', '駅員に呼び止められたから'], [
      'The train was on time; he stayed with someone who felt ill.',
      'Der Zug war pünktlich; er blieb bei jemandem, dem es schlecht ging.',
    ]),
  ]),
  L('n2_point_restaurant', 'レストランを選ぶ', [
    ['男', '来週の歓迎会、どこにしようか。駅前のイタリア料理の店は？', 'm'],
    ['女', 'あそこ、料理はおいしいけど、二十人だと入れないんじゃないかな。', 'f'],
    ['男', 'じゃあ、川沿いの和食の店は？広い部屋があったと思うけど。', 'm'],
    ['女', 'うん、あそこなら広さは大丈夫。ただ、新人の山田さん、魚が苦手だって言ってたよ。', 'f'],
    ['男', 'そうか。肉料理もあるか、店に聞いてみるよ。', 'm'],
  ], [
    'M: Where shall we hold next week’s welcome party? The Italian place by the station? F: The food is good there, but I don’t think twenty people fit. M: Then the Japanese place by the river? I think it has a large room. F: Yes, the size is fine there. But the newcomer Yamada said she doesn’t like fish. M: I see. I’ll ask the restaurant whether they have meat dishes too.',
    'M: Wo machen wir nächste Woche die Willkommensfeier? Das Italienische am Bahnhof? F: Das Essen ist gut, aber für zwanzig Leute ist es wohl zu klein. M: Dann das japanische Lokal am Fluss? Ich glaube, es hat einen großen Raum. F: Ja, von der Größe her geht das. Aber die neue Kollegin Yamada hat gesagt, sie mag keinen Fisch. M: Verstehe. Ich frage im Lokal, ob es auch Fleischgerichte gibt.',
  ], [
    Q('男の人は、和食の店について何を確かめるか。', ['肉の料理があるかどうか', '二十人が入れるかどうか', '値段がいくらか', '駅から近いかどうか'], [
      'The size is fine; he will ask whether there are meat dishes, because Yamada dislikes fish.',
      'Die Größe passt; er fragt, ob es Fleischgerichte gibt, weil Yamada keinen Fisch mag.',
    ]),
  ]),
  L('n2_point_quit', 'サークルをやめた理由', [
    ['女', '鈴木くん、テニスのサークル、やめたんだって？忙しくなったの？', 'f'],
    ['男', 'アルバイトは増えたけど、それが理由じゃないんだ。', 'm'],
    ['女', 'じゃあ、人間関係？', 'f'],
    ['男', 'みんないい人だよ。ただ、試合に勝つことばかりが目標になってきて、楽しくテニスをしたい僕とは、ちょっと考え方が合わなくなってね。', 'm'],
  ], [
    'F: Suzuki, I heard you quit the tennis club? Did you get busy? M: My part-time job increased, but that’s not the reason. F: Then the people? M: Everyone is nice. It’s just that winning matches became the only goal, and that no longer fits me, since I want to play tennis for fun.',
    'F: Suzuki, du hast den Tennisclub verlassen? Hast du zu viel zu tun? M: Mein Nebenjob ist mehr geworden, aber das ist nicht der Grund. F: Dann die Leute? M: Alle sind nett. Nur ist das Gewinnen von Spielen zum einzigen Ziel geworden, und das passt nicht mehr zu mir, weil ich aus Spaß Tennis spielen will.',
  ], [
    Q('男の人がサークルをやめた一番の理由は何か。', ['サークルの目標が自分の考えと合わなくなったから', 'アルバイトが忙しくなったから', 'メンバーと仲が悪くなったから', 'テニスが下手になったから'], [
      'He denies the job and the people; the reason is that the club now only aims at winning.',
      'Er verneint Job und Leute; der Grund ist, dass der Club nur noch aufs Gewinnen aus ist.',
    ]),
  ]),
  // ------------------------------------------------ 概要理解
  L('n2_gist_sleep', 'ラジオで：睡眠の話', [
    ['男', '寝る前にスマートフォンを見る習慣がある方は多いと思います。画面の光は、脳を昼間だと勘違いさせ、眠りを浅くすると言われています。ただ、いきなりやめるのは難しいですよね。そこでおすすめしたいのは、寝る三十分前になったら、画面を見る代わりに、紙の本を読んだり、軽く体を伸ばしたりすることです。小さな習慣を一つ変えるだけで、翌朝の目覚めがずいぶん違ってきますよ。', 'm'],
  ], [
    'On the radio. M: Many of you probably have the habit of looking at your phone before sleeping. The light of the screen is said to fool the brain into thinking it is daytime and to make sleep lighter. But stopping suddenly is hard, isn’t it? So what I recommend is, from thirty minutes before bed, reading a paper book or stretching lightly instead of looking at a screen. Changing just one small habit makes a big difference to how you wake up the next morning.',
    'Im Radio. M: Viele von Ihnen haben sicher die Gewohnheit, vor dem Schlafen aufs Handy zu schauen. Das Licht des Bildschirms soll dem Gehirn vorgaukeln, es sei Tag, und den Schlaf leichter machen. Aber plötzlich aufzuhören ist schwer, nicht wahr? Daher empfehle ich, ab dreißig Minuten vor dem Schlafen statt auf einen Bildschirm zu schauen ein Papierbuch zu lesen oder sich leicht zu dehnen. Schon eine kleine Gewohnheit zu ändern, macht beim Aufwachen am nächsten Morgen einen großen Unterschied.',
  ], [
    Q('話の内容として最もよいものはどれか。', ['寝る前の過ごし方を少し変えることのすすめ', 'スマートフォンの画面が明るすぎることへの不満', '紙の本がよく売れている理由', '朝早く起きるための運動の方法'], [
      'The speaker recommends one small change before bed: book or stretching instead of the screen.',
      'Der Sprecher empfiehlt eine kleine Änderung vor dem Schlafen: Buch oder Dehnen statt Bildschirm.',
    ], 'main'),
  ]),
  L('n2_gist_town', '講演：町づくり', [
    ['女', '私たちの町では、空き家が増えていることが問題になっていました。そこで、空き家を若い芸術家に安く貸し出し、アトリエや小さな店として使ってもらうことにしたんです。最初は、地元の人たちも半信半疑でした。でも、店が増えるにつれて、町の外から人が訪れるようになり、今では地元のお年寄りと若い人たちが一緒にお祭りを開くまでになりました。古いものを壊すのではなく、新しい使い方を考えることが、町を元気にする近道だったのだと思います。', 'f'],
  ], [
    'A talk on town development. F: In our town the growing number of empty houses had become a problem. So we decided to rent empty houses cheaply to young artists and let them use them as studios and small shops. At first the locals were doubtful. But as the shops increased, people came from outside the town, and now local elderly people and young people even hold festivals together. I think that, rather than tearing down old things, thinking of new ways to use them was the shortcut to bringing the town to life.',
    'Ein Vortrag zur Stadtentwicklung. F: In unserer Stadt waren immer mehr leerstehende Häuser ein Problem. Also beschlossen wir, leere Häuser billig an junge Künstler zu vermieten, die sie als Ateliers und kleine Läden nutzen. Anfangs waren die Einheimischen skeptisch. Doch mit mehr Läden kamen Besucher von außerhalb, und heute veranstalten ältere Einheimische und junge Leute sogar gemeinsam Feste. Ich glaube, statt Altes abzureißen, neue Nutzungen zu finden, war der kürzeste Weg, die Stadt zu beleben.',
  ], [
    Q('話している人が最も伝えたいことは何か。', ['古い建物に新しい使い方を与えることが町の活性化につながった', '空き家はすぐに壊して新しい建物を建てるべきだ', '若い芸術家は町の外に住むべきだ', 'お祭りは地元のお年寄りだけで開くべきだ'], [
      'The conclusion: not tearing down but finding new uses was the shortcut to reviving the town.',
      'Das Fazit: Nicht abreißen, sondern neue Nutzungen finden, war der kürzeste Weg zur Belebung der Stadt.',
    ], 'main'),
  ]),
  // ------------------------------------------------ 即時応答
  L('n2_quick_1', '即時応答 1', [['男', 'あ、すみません。この席、どなたかいらっしゃいますか。', 'm']], [
    'M: Oh, excuse me. Is anyone sitting here?', 'M: Oh, Entschuldigung. Ist dieser Platz besetzt?',
  ], [
    Q('最もよい返事はどれか。', ['いえ、どうぞ。', 'はい、私が座りました。', 'いいえ、いらっしゃいません。', 'では、お先に失礼します。'], [
      'He asks whether the seat is taken; "No, please (sit)" answers naturally.',
      'Er fragt, ob der Platz besetzt ist; „Nein, bitte (setzen Sie sich)“ ist die natürliche Antwort.',
    ], 'expression'),
  ]),
  L('n2_quick_2', '即時応答 2', [['女', '部長、明日の打ち合わせ、一時間ほど遅らせていただくわけにはいかないでしょうか。', 'f']], [
    'F: Manager, would it be possible to push tomorrow’s meeting back by about an hour?', 'F: Herr Abteilungsleiter, ließe sich die Besprechung morgen um etwa eine Stunde verschieben?',
  ], [
    Q('最もよい返事はどれか。', ['うん、いいよ。じゃあ、三時からにしよう。', 'いや、一時間も早くはできないよ。', 'そうか、打ち合わせはもう終わったよ。', 'じゃあ、一時間待っていてね。'], [
      '〜わけにはいかないでしょうか is a polite request; agreeing and setting the new time fits.',
      '〜わけにはいかないでしょうか ist eine höfliche Bitte; zustimmen und die neue Zeit festlegen passt.',
    ], 'expression'),
  ]),
  L('n2_quick_3', '即時応答 3', [['男', 'この資料、来週までに目を通しておいてもらえる？', 'm']], [
    'M: Could you look through these materials by next week?', 'M: Könntest du diese Unterlagen bis nächste Woche durchsehen?',
  ], [
    Q('最もよい返事はどれか。', ['わかりました。読んでおきます。', 'はい、目が痛いです。', 'じゃあ、来週通ります。', 'いえ、まだ見せていません。'], [
      '目を通す means to look through; "I will read it" answers the request.',
      '目を通す heißt durchsehen; „Ich lese es durch“ beantwortet die Bitte.',
    ], 'expression'),
  ]),
  L('n2_quick_4', '即時応答 4', [['女', '田中さん、昨日は遅くまで手伝っていただいて、本当に助かりました。', 'f']], [
    'F: Mr. Tanaka, thank you so much for helping until late yesterday; it really helped.', 'F: Herr Tanaka, danke, dass Sie gestern bis spät geholfen haben, das war eine große Hilfe.',
  ], [
    Q('最もよい返事はどれか。', ['いえいえ、お役に立ててよかったです。', 'はい、助けてください。', 'では、明日も遅れます。', 'そうですね、本当に困りました。'], [
      'She thanks him; the humble reply is "Not at all, I’m glad I could help".',
      'Sie bedankt sich; die bescheidene Antwort ist „Keine Ursache, schön, dass ich helfen konnte“.',
    ], 'expression'),
  ]),
  L('n2_quick_5', '即時応答 5', [['男', 'せっかく来たのに、店、休みみたいだね。', 'm']], [
    'M: We came all this way, but the shop seems to be closed.', 'M: Jetzt sind wir extra hergekommen, und der Laden hat anscheinend zu.',
  ], [
    Q('最もよい返事はどれか。', ['残念だね。また今度来ようか。', 'よかったね、ゆっくりできるね。', 'うん、せっかく休んだからね。', 'じゃあ、中で待とうか。'], [
      'せっかく〜のに expresses disappointment; sympathising and suggesting another time fits.',
      'せっかく〜のに drückt Enttäuschung aus; Mitgefühl und ein Vorschlag für ein andermal passen.',
    ], 'expression'),
  ]),
  L('n2_quick_6', '即時応答 6', [['女', 'もう少しで電車に乗り遅れるところだったよ。', 'f']], [
    'F: I almost missed the train.', 'F: Fast hätte ich den Zug verpasst.',
  ], [
    Q('最もよい返事はどれか。', ['間に合ってよかったね。', '次の電車は何時？', 'どうして乗らなかったの？', 'じゃあ、遅刻したんだね。'], [
      '〜ところだった means it almost happened but did not; she made it, so "Good that you made it".',
      '〜ところだった heißt: Es wäre fast passiert, ist es aber nicht; sie hat es geschafft – also „Gut, dass du es geschafft hast“.',
    ], 'expression'),
  ]),
  L('n2_quick_7', '即時応答 7', [['男', '山本さんが引き受けてくれるなら、それに越したことはないんだけど。', 'm']], [
    'M: If Ms. Yamamoto would take it on, nothing could be better.', 'M: Wenn Frau Yamamoto das übernimmt, gäbe es nichts Besseres.',
  ], [
    Q('最もよい返事はどれか。', ['じゃあ、私から頼んでみましょうか。', '山本さんはもう越してしまいましたよ。', 'それなら、ほかの人がいいですね。', 'はい、山本さんは断りましたね。'], [
      '〜に越したことはない means "that would be best"; offering to ask her responds well.',
      '〜に越したことはない heißt „das wäre am besten“; anzubieten, sie zu fragen, passt.',
    ], 'expression'),
  ]),
  L('n2_quick_8', '即時応答 8', [['女', '駅までなら、歩いても十分とかからないよ。', 'f']], [
    'F: To the station it takes less than ten minutes even on foot.', 'F: Bis zum Bahnhof braucht man selbst zu Fuß keine zehn Minuten.',
  ], [
    Q('最もよい返事はどれか。', ['じゃあ、歩いて行こうか。', 'そんなに遠いなら、タクシーにしよう。', '十分も歩いたの？', 'じゃあ、駅で十分待つね。'], [
      '十分とかからない means "not even ten minutes"; so walking is fine.',
      '十分とかからない heißt „nicht einmal zehn Minuten“; also kann man laufen.',
    ], 'expression'),
  ]),
  // ------------------------------------------------ 統合理解
  L('n2_integrated_gift', '退職のお祝い', [
    ['女1', '来月退職する木村部長へのプレゼント、何がいいかな。', 'f'],
    ['男', '定年後は旅行をしたいって言ってたから、旅行用のかばんはどう？', 'm'],
    ['女2', 'いいけど、かばんは好みがあるから難しいかも。部長、最近料理教室に通い始めたって聞いたよ。いい包丁はどう？', 'f'],
    ['女1', '包丁は、退職のお祝いには縁起がよくないって言う人もいるよ。', 'f'],
    ['男', 'そうなんだ。じゃあ、みんなで写真を集めてアルバムを作るのは？お金もそんなにかからないし。', 'm'],
    ['女2', 'それ、いいね。思い出に残るし、部長、そういうの喜びそう。', 'f'],
    ['女1', 'じゃあ、それに決めよう。', 'f'],
  ], [
    'F1: What would be a good present for Manager Kimura, who retires next month? M: He said he wants to travel after retiring, so how about a travel bag? F2: Nice, but bags are a matter of taste, so it could be hard. I heard he recently started a cooking class. How about a good kitchen knife? F1: Some people say knives are unlucky as a retirement gift. M: I see. Then how about collecting photos from everyone and making an album? It doesn’t cost much either. F2: That’s good. It stays as a memory, and he would like that kind of thing. F1: Then let’s decide on that.',
    'F1: Was wäre ein gutes Geschenk für Abteilungsleiter Kimura, der nächsten Monat in Rente geht? M: Er sagte, er wolle nach der Rente reisen – wie wäre eine Reisetasche? F2: Gut, aber Taschen sind Geschmackssache, das könnte schwierig sein. Ich habe gehört, er hat kürzlich einen Kochkurs angefangen. Wie wäre ein gutes Küchenmesser? F1: Manche sagen, Messer bringen als Abschiedsgeschenk Unglück. M: Ach so. Dann sammeln wir doch Fotos von allen und machen ein Album? Das kostet auch nicht viel. F2: Gute Idee. Das bleibt als Erinnerung, und so etwas würde ihn freuen. F1: Dann machen wir das.',
  ], [
    Q('三人は何をプレゼントすることにしたか。', ['写真のアルバム', '旅行用のかばん', '料理用の包丁', '料理教室の券'], [
      'The bag is hard to choose, the knife is unlucky; all agree on the photo album.',
      'Die Tasche ist schwer auszusuchen, das Messer bringt Unglück; alle einigen sich auf das Fotoalbum.',
    ], 'main'),
  ]),
  L('n2_integrated_tour', 'ツアーを選ぶ', [
    ['女', 'ツアーのご案内です。Ａコースは、朝早く出発して、山の上から日の出を見るコースです。Ｂコースは、昼から出発して、湖の周りをゆっくり歩きます。Ｃコースは、地元の農家で野菜の収穫を体験し、その野菜で昼ご飯を作ります。Ｄコースは、夜の町を歩きながら、古いお寺を見て回ります。', 'f'],
    ['男', '僕は朝が弱いからなあ。体を動かすのは好きだけど。', 'm'],
    ['女2', '私は料理に興味があるから、これかな。あなたは？', 'f'],
    ['男', 'じゃあ、僕は昼から出発するのにするよ。歩くのは好きだし。', 'm'],
  ], [
    'F: Here is the tour guide. Course A leaves early in the morning to see the sunrise from the mountain top. Course B leaves at noon and walks slowly around the lake. Course C lets you harvest vegetables on a local farm and cook lunch with them. Course D walks through the town at night, visiting old temples. M: I’m bad in the mornings. Though I like moving. F2: I’m interested in cooking, so maybe this one. And you? M: Then I’ll take the one that leaves at noon. I like walking.',
    'F: Hier die Tourenübersicht. Tour A startet früh morgens, um vom Berggipfel den Sonnenaufgang zu sehen. Tour B startet mittags und führt gemütlich um den See. Bei Tour C erntet man auf einem Bauernhof Gemüse und kocht damit das Mittagessen. Tour D geht abends durch die Stadt zu alten Tempeln. M: Morgens bin ich nicht fit. Bewegung mag ich aber. F2: Mich interessiert Kochen, also wohl diese. Und du? M: Dann nehme ich die, die mittags startet. Ich gehe gern.',
  ], [
    Q('女の人（二人目）はどのコースを選んだか。', ['Ｃコース', 'Ａコース', 'Ｂコース', 'Ｄコース'], [
      'She is interested in cooking: course C, where you cook lunch with the harvested vegetables.',
      'Sie interessiert sich fürs Kochen: Tour C, bei der man mit dem geernteten Gemüse kocht.',
    ], 'detail'),
    Q('男の人はどのコースを選んだか。', ['Ｂコース', 'Ａコース', 'Ｃコース', 'Ｄコース'], [
      'He is bad in the mornings, likes walking and takes the one leaving at noon: course B.',
      'Er ist morgens nicht fit, geht gern und nimmt die Tour, die mittags startet: Tour B.',
    ], 'detail'),
  ]),
];
