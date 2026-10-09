import type { VocabEntry } from '../core/types';

/**
 * N2 core words from Maria's study lists (Konjunktionen, Adverbien, Lautmalerei).
 * `syn:` tags group near-synonyms so they are never offered as wrong answers for each other.
 */
type Row = [id: string, word: string, reading: string, de: string, en: string, example: string, exampleEn: string, syn?: string]; // syn: space-separated group names

const conj: Row[] = [
  ['sonotame', 'そのため', 'そのため', 'deshalb', 'for that reason', '大雪が降った。そのため、電車が止まった。', 'It snowed heavily. For that reason, the trains stopped.', 'folge'],
  ['shitagatte', 'したがって', 'したがって', 'daher, folglich', 'therefore, consequently', '応募者が多かった。したがって、締め切りを早めることにした。', 'There were many applicants. Therefore we decided to close early.', 'folge'],
  ['yueni', 'ゆえに', 'ゆえに', 'daher (schriftlich)', 'hence (written)', '我思う、ゆえに我あり。', 'I think, therefore I am.', 'folge'],
  ['suruto', 'すると', 'すると', 'daraufhin, da', 'thereupon, and then', 'ボタンを押した。すると、ドアがゆっくり開いた。', 'I pressed the button. Thereupon the door slowly opened.'],
  ['sokode', 'そこで', 'そこで', 'daraufhin, deshalb', 'so, accordingly (as a response)', '道が分からなかった。そこで、交番で聞いてみた。', "I didn't know the way, so I asked at the police box.", 'folge'],
  ['tokoroga', 'ところが', 'ところが', 'doch, aber (überraschend)', 'however (unexpectedly)', '晴れると思っていた。ところが、午後から大雨になった。', 'I thought it would be sunny. However, it poured from the afternoon.', 'gegen'],
  ['soredemo', 'それでも', 'それでも', 'trotzdem', 'even so, nevertheless', '何度も失敗した。それでも、彼女はあきらめなかった。', 'She failed many times. Even so, she did not give up.', 'gegen'],
  ['tohaie', 'とはいえ', 'とはいえ', 'wenngleich, dennoch', 'that said, nonetheless', '春になった。とはいえ、朝晩はまだ寒い。', "It's spring. That said, mornings and evenings are still cold.", 'gegen'],
  ['daga', 'だが', 'だが', 'aber', 'but (plain/written)', '計画は完璧だった。だが、結果は失敗だった。', 'The plan was perfect. But the result was a failure.', 'gegen'],
  ['tadashi', 'ただし', 'ただし', 'allerdings, mit der Einschränkung', 'however, provided that', '図書館の本は二週間借りられる。ただし、辞書は貸し出しできない。', 'Library books can be borrowed for two weeks. Dictionaries, however, cannot be lent out.'],
  ['tokorode', 'ところで', 'ところで', 'übrigens', 'by the way', 'ところで、来週の会議の場所は決まりましたか。', 'By the way, has the venue for next week\'s meeting been decided?'],
  ['nazenara', 'なぜなら', 'なぜなら', 'denn, der Grund ist', 'because, the reason is', '今日は早く帰ります。なぜなら、母の誕生日だからです。', "I'm going home early today, because it is my mother's birthday."],
  ['tsumari', 'つまり', 'つまり', 'das heißt, mit anderen Worten', 'in other words', '彼は母の兄、つまり私のおじだ。', "He is my mother's older brother — in other words, my uncle.", 'zusammen'],
  ['sunawachi', 'すなわち', 'すなわち', 'nämlich, das heißt (schriftlich)', 'namely, that is (written)', '日本の首都、すなわち東京は人口が多い。', "Japan's capital, namely Tokyo, has a large population.", 'zusammen'],
  ['moshikuwa', 'もしくは', 'もしくは', 'oder', 'or (formal)', '申込書は郵送、もしくはメールで送ってください。', 'Please send the application by post or by e-mail.', 'oder'],
  ['matawa', 'または', 'または', 'oder', 'or', '黒または青のペンで記入してください。', 'Please fill it in with a black or blue pen.', 'oder'],
  ['soretomo', 'それとも', 'それとも', 'oder (in Fragen)', 'or (in questions)', 'コーヒーにしますか。それとも、紅茶にしますか。', 'Will you have coffee? Or would you like tea?', 'oder'],
  ['mushiro', 'むしろ', 'むしろ', 'eher, vielmehr', 'rather, if anything', '彼は怒っているというより、むしろ悲しんでいるようだ。', 'Rather than angry, he seems sad if anything.'],
  ['soredokoroka', 'それどころか', 'それどころか', 'im Gegenteil, sogar', 'on the contrary, far from it', '薬を飲んでも治らない。それどころか、ますます悪くなった。', "Taking medicine didn't help. On the contrary, it got even worse.", 'more'],
  ['sarani', 'さらに', 'さらに', 'außerdem, noch dazu', 'furthermore, moreover', 'この部屋は広くて明るい。さらに、駅にも近い。', 'This room is spacious and bright. Moreover, it is close to the station.', 'more'],
];

const adv: Row[] = [
  ['kesshite', '決して', 'けっして', 'niemals, auf keinen Fall (～ない)', 'never, by no means (+neg.)', 'このことは決して忘れない。', 'I will never forget this.', 'neg'],
  ['toutei', '到底', 'とうてい', 'unmöglich, beim besten Willen nicht (～ない)', 'utterly (not), cannot possibly (+neg.)', 'この量の仕事は一日では到底終わらない。', 'This amount of work cannot possibly be finished in a day.', 'neg'],
  ['ikkouni', '一向に', 'いっこうに', 'überhaupt nicht (Entwicklung bleibt aus) (～ない)', '(not) at all, no progress (+neg.)', '待っているのに、バスが一向に来ない。', "I've been waiting, but the bus shows no sign of coming.", 'neg'],
  ['kanarazushimo', '必ずしも', 'かならずしも', 'nicht unbedingt (～ない)', 'not necessarily (+neg.)', '高い物が必ずしもいい物だとは限らない。', 'Expensive things are not necessarily good things.', 'neg'],
  ['mettani', 'めったに', 'めったに', 'selten, kaum (～ない)', 'rarely, seldom (+neg.)', '父はめったに怒らない。', 'My father rarely gets angry.', 'neg'],
  ['soutou', '相当', 'そうとう', 'ziemlich, beträchtlich', 'considerably, quite', '駅まで歩くと相当時間がかかる。', 'It takes quite a long time to walk to the station.', 'sehr'],
  ['kiwamete', '極めて', 'きわめて', 'äußerst', 'extremely', '成功する可能性は極めて低い。', 'The chance of success is extremely low.', 'sehr'],
  ['ooini', '大いに', 'おおいに', 'sehr, in hohem Maße', 'greatly, very much', '今夜は大いに楽しみましょう。', "Let's really enjoy ourselves tonight.", 'sehr full'],
  ['hobo', 'ほぼ', 'ほぼ', 'beinahe, nahezu', 'almost, nearly', '会場はほぼ満席だった。', 'The hall was almost full.', 'almost'],
  ['masumasu', 'ますます', 'ますます', 'immer mehr', 'more and more', '駅前はますますにぎやかになっている。', 'The area in front of the station is getting livelier and livelier.', 'grad'],
  ['dandan', 'だんだん', 'だんだん', 'allmählich', 'gradually', '日本語の新聞がだんだん読めるようになった。', 'I gradually became able to read Japanese newspapers.', 'grad'],
  ['tsugitsugini', '次々に', 'つぎつぎに', 'nacheinander, einer nach dem anderen', 'one after another', '新しい店が次々にオープンした。', 'New shops opened one after another.', 'seq'],
  ['aitsuide', '相次いで', 'あいついで', 'in Folge, hintereinander', 'in succession', '今月は大きな地震が相次いで起きた。', 'Big earthquakes occurred in succession this month.', 'seq'],
  ['shibashiba', 'しばしば', 'しばしば', 'oft, häufig', 'often, frequently', 'この道ではしばしば事故が起きる。', 'Accidents often happen on this road.', 'seq'],
  ['tsuini', 'ついに', 'ついに', 'schließlich, endlich', 'at last, finally', '三年かかって、ついに夢がかなった。', 'After three years, my dream finally came true.', 'end'],
  ['kekkyoku', '結局', 'けっきょく', 'letztlich, am Ende', 'in the end, after all', 'いろいろ迷ったが、結局何も買わなかった。', 'I hesitated a lot, but in the end I bought nothing.', 'end'],
  ['omowazu', '思わず', 'おもわず', 'unwillkürlich', 'involuntarily, without thinking', 'あまりにおかしくて、思わず笑ってしまった。', 'It was so funny that I burst out laughing without thinking.', 'careless'],
  ['choudo', 'ちょうど', 'ちょうど', 'genau, gerade', 'exactly, just', '家を出たら、ちょうどバスが来た。', 'When I left the house, the bus came just then.', 'genau'],
  ['zehi', 'ぜひ', 'ぜひ', 'unbedingt, bitte', 'by all means, definitely', '日本に来たら、ぜひ京都に行ってみてください。', 'If you come to Japan, be sure to visit Kyoto.'],
];

const ono: Row[] = [
  ['gussuri', 'ぐっすり', 'ぐっすり', 'tief (schlafen)', 'soundly (sleep)', '疲れていたので、朝までぐっすり眠った。', 'I was tired, so I slept soundly until morning.', 'sleep'],
  ['utouto', 'うとうと', 'うとうと', 'dösend', 'dozing', '電車の中でうとうとしてしまった。', 'I dozed off on the train.', 'sleep'],
  ['iraira', 'いらいら', 'いらいら', 'gereizt, ungeduldig', 'irritated, impatient', '電車が遅れて、いらいらした。', 'The train was late and I got irritated.', 'nervous mood'],
  ['ukiuki', 'うきうき', 'うきうき', 'beschwingt', 'cheerful, buoyant', '明日から旅行なので、うきうきしている。', "I'm in high spirits because my trip starts tomorrow.", 'excite'],
  ['wakuwaku', 'わくわく', 'わくわく', 'aufgeregt vor Vorfreude', 'excited (anticipation)', '初めての海外旅行にわくわくしている。', "I'm thrilled about my first trip abroad.", 'excite'],
  ['dokidoki', 'どきどき', 'どきどき', 'Herzklopfen', 'heart pounding', '面接の前は、胸がどきどきした。', 'Before the interview my heart was pounding.', 'excite nervous'],
  ['perapera', 'ぺらぺら', 'ぺらぺら', 'fließend (sprechen)', 'fluently (speak)', '彼女は英語がぺらぺらだ。', 'She speaks English fluently.', 'fluent'],
  ['surasura', 'すらすら', 'すらすら', 'flüssig, mühelos', 'smoothly, effortlessly', '難しい問題をすらすら解いた。', 'She solved the difficult problem effortlessly.', 'fluent'],
  ['pittari', 'ぴったり', 'ぴったり', 'genau passend', 'perfectly fitting', 'この靴はサイズがぴったりだ。', 'These shoes fit perfectly.', 'genau'],
  ['gisshiri', 'ぎっしり', 'ぎっしり', 'dicht gedrängt, vollgepackt', 'packed tightly', '箱の中に本がぎっしり詰まっている。', 'The box is packed tight with books.', 'full'],
  ['zurari', 'ずらり', 'ずらり', 'in einer langen Reihe', 'in a long row', '店の前に客がずらりと並んでいる。', 'Customers are lined up in a long row in front of the shop.'],
  ['sappari', 'さっぱり', 'さっぱり', 'erfrischt; überhaupt nicht (mit Verneinung)', 'refreshed; (not) at all', '説明を聞いても、さっぱり分からない。', "Even after the explanation, I don't understand it at all.", 'refresh neg'],
  ['sukkiri', 'すっきり', 'すっきり', 'klar, erleichtert, aufgeräumt', 'refreshed, neat, clear', '部屋を片付けたら、気分がすっきりした。', 'After tidying my room, I felt refreshed.', 'refresh'],
  ['bonyari', 'ぼんやり', 'ぼんやり', 'verträumt, undeutlich', 'absent-minded, vague', '窓の外をぼんやり眺めていた。', 'I was gazing absent-mindedly out of the window.', 'calm tired'],
  ['nonbiri', 'のんびり', 'のんびり', 'gemütlich, entspannt', 'leisurely, relaxed', '休みの日は家でのんびり過ごす。', 'On my days off I relax at home.', 'lazy calm'],
  ['shikkari', 'しっかり', 'しっかり', 'fest, zuverlässig', 'firmly, properly', 'ロープをしっかり握ってください。', 'Please hold the rope firmly.', 'exact clear'],
  ['hakkiri', 'はっきり', 'はっきり', 'deutlich', 'clearly', '自分の意見をはっきり言う。', 'She states her opinion clearly.', 'clear exact'],
  ['gakkari', 'がっかり', 'がっかり', 'enttäuscht', 'disappointed', '試合に負けて、がっかりした。', 'I was disappointed that we lost the match.', 'mood'],
  ['bikkuri', 'びっくり', 'びっくり', 'überrascht', 'surprised', '急に大きな音がして、びっくりした。', 'There was a sudden loud noise and I was startled.', 'mood excite'],
  ['kossori', 'こっそり', 'こっそり', 'heimlich', 'secretly, stealthily', '授業中にこっそりお菓子を食べた。', 'I secretly ate snacks during class.', 'secret'],
  ['ukkari', 'うっかり', 'うっかり', 'versehentlich, aus Unachtsamkeit', 'carelessly, inadvertently', 'うっかり財布を家に忘れてきた。', 'I carelessly left my wallet at home.', 'careless'],
  ['chirachira', 'ちらちら', 'ちらちら', 'flimmernd; verstohlen (hinschauen)', 'flickering; glancing furtively', '隣の人がちらちらこちらを見ている。', 'The person next to me keeps glancing over at me.', 'look'],
  ['jirojiro', 'じろじろ', 'じろじろ', 'starrend', 'staring', '人の顔をじろじろ見るのは失礼だ。', "It's rude to stare at people's faces."],
  ['burabura', 'ぶらぶら', 'ぶらぶら', 'herumschlendernd', 'strolling aimlessly', '駅前をぶらぶら歩いた。', 'I strolled around in front of the station.', 'calm'],
  ['furafura', 'ふらふら', 'ふらふら', 'schwindelig, taumelnd', 'dizzy, staggering', '熱があって、頭がふらふらする。', 'I have a fever and feel dizzy.', 'tired pain'],
  ['guttari', 'ぐったり', 'ぐったり', 'erschöpft', 'exhausted, limp', '暑さで犬がぐったりしている。', 'The dog is limp from the heat.', 'tired'],
  ['gorogoro', 'ごろごろ', 'ごろごろ', 'faulenzend; rollend', 'lazing around; rolling', '日曜日は一日中家でごろごろしていた。', 'On Sunday I lazed around at home all day.', 'lazy calm'],
  ['sokkuri', 'そっくり', 'そっくり', 'zum Verwechseln ähnlich', 'exactly alike', '彼は父親にそっくりだ。', 'He looks exactly like his father.'],
  ['tappuri', 'たっぷり', 'たっぷり', 'reichlich', 'plenty, ample', '時間はたっぷりあるから、急がなくていい。', "There's plenty of time, so no need to hurry.", 'full'],
  ['daradara', 'だらだら', 'だらだら', 'träge, schleppend', 'sluggishly, dragging on', '会議がだらだらと続いた。', 'The meeting dragged on and on.', 'lazy'],
  ['tekipaki', 'てきぱき', 'てきぱき', 'zügig und tüchtig', 'briskly, efficiently', '彼女は仕事をてきぱき片付ける。', 'She gets through her work briskly.'],
  ['barabara', 'ばらばら', 'ばらばら', 'auseinander, zerstreut', 'scattered, in pieces', '意見がばらばらで、まとまらない。', 'Opinions are all over the place and cannot be reconciled.', 'mess'],
  ['mechakucha', 'めちゃくちゃ', 'めちゃくちゃ', 'chaotisch, sinnlos', 'a mess, absurd', '台風で庭がめちゃくちゃになった。', 'The typhoon made a complete mess of the garden.', 'mess'],
  ['kukkiri', 'くっきり', 'くっきり', 'scharf konturiert', 'sharply outlined', '今日は富士山がくっきり見える。', 'Mt. Fuji is clearly visible today.', 'clear'],
  ['kicchiri', 'きっちり', 'きっちり', 'genau, pünktlich', 'precisely, exactly', '彼はいつも約束の時間にきっちり来る。', 'He always arrives exactly on time.', 'exact genau'],
  ['girigiri', 'ぎりぎり', 'ぎりぎり', 'auf den letzten Drücker, knapp', 'just barely, at the last minute', '締め切りぎりぎりにレポートを出した。', 'I handed in the report just before the deadline.'],
  ['kotsukotsu', 'こつこつ', 'こつこつ', 'beharrlich, stetig', 'steadily, diligently', '毎日こつこつ単語を覚えている。', 'I steadily memorize words every day.', 'diligent'],
  ['setseto', 'せっせと', 'せっせと', 'emsig', 'busily, diligently', 'アリがせっせと食べ物を運んでいる。', 'The ants are busily carrying food.', 'diligent'],
  ['sowasowa', 'そわそわ', 'そわそわ', 'unruhig', 'restless, fidgety', '結果の発表を待って、そわそわしている。', "He's restless, waiting for the results to be announced.", 'nervous excite mood'],
  ['hisohiso', 'ひそひそ', 'ひそひそ', 'flüsternd', 'whispering', '後ろの席でひそひそ話す声が聞こえる。', 'I can hear whispering in the seats behind.', 'secret'],
  ['zukizuki', 'ずきずき', 'ずきずき', 'pochend (Schmerz)', 'throbbing (pain)', '虫歯がずきずき痛む。', 'My bad tooth is throbbing.', 'pain'],
  ['hirihiri', 'ひりひり', 'ひりひり', 'brennend (Schmerz)', 'stinging, burning (pain)', '日焼けして、肩がひりひりする。', 'I got sunburned and my shoulders sting.', 'pain'],
];

const build = (rows: Row[], pos: VocabEntry['pos'], tag: string): VocabEntry[] =>
  rows.map(([id, word, reading, de, en, example, exampleEn, syn]) => ({
    id, word, reading, de, en, example, exampleEn, pos,
    level: 'N2', chapter: 1, tags: [tag, 'core', ...(syn ? syn.split(' ').map((g) => 'syn:' + g) : [])],
  }));

export const CORE_VOCAB: VocabEntry[] = [
  ...build(conj, 'expression', 'konjunktion'),
  ...build(adv, 'adverb', 'adverb'),
  ...build(ono, 'adverb', 'lautmalerei'),
];
