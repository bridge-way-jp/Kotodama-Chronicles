import type { Affinity, ItemDef, Move, Species } from '../core/types';

export const AFFINITY_INFO: Record<Affinity, { ja: string; en: string; icon: string; color: string }> = {
  nature: { ja: '自然', en: 'Nature', icon: 'e_nature', color: '#5fae4a' },
  water: { ja: '水', en: 'Water', icon: 'e_water', color: '#3f8fd8' },
  fire: { ja: '炎', en: 'Fire', icon: 'e_fire', color: '#e5762e' },
  lightning: { ja: '雷', en: 'Lightning', icon: 'e_lightning', color: '#e4b92b' },
  wind: { ja: '風', en: 'Wind', icon: 'e_wind', color: '#4aa3b5' },
  memory: { ja: '記憶', en: 'Memory', icon: 'e_memory', color: '#e886a8' },
  knowledge: { ja: '知識', en: 'Knowledge', icon: 'e_knowledge', color: '#7b7f8c' },
  emotion: { ja: '感情', en: 'Emotion', icon: 'e_emotion', color: '#d84a5b' },
};

/** attacker -> defenders it is strong against */
const STRONG: Record<Affinity, Affinity[]> = {
  water: ['fire'],
  fire: ['nature'],
  nature: ['water'],
  lightning: ['water', 'wind'],
  wind: ['nature'],
  memory: ['emotion'],
  emotion: ['knowledge'],
  knowledge: ['memory', 'lightning'],
};

export function affinityMultiplier(att: Affinity, def: Affinity): number {
  if (STRONG[att].includes(def)) return 1.5;
  if (STRONG[def].includes(att)) return 0.75;
  return 1;
}

export const MOVES: Record<string, Move> = {
  memory_echo: { id: 'memory_echo', name: 'きおくのこだま', nameEn: 'Memory Echo', power: 16, area: 'vocab', affinity: 'memory' },
  word_spark: { id: 'word_spark', name: 'ことばの火花', nameEn: 'Word Spark', power: 14, area: 'kanji', affinity: 'lightning' },
  leaf_whisper: { id: 'leaf_whisper', name: 'このはささやき', nameEn: 'Leaf Whisper', power: 15, area: 'vocab', affinity: 'nature' },
  root_grammar: { id: 'root_grammar', name: 'ぶんぽうの根', nameEn: 'Grammar Roots', power: 18, area: 'grammar', affinity: 'nature' },
  gust_call: { id: 'gust_call', name: 'よびかぜ', nameEn: 'Calling Gust', power: 15, area: 'listening', affinity: 'wind' },
  flame_phrase: { id: 'flame_phrase', name: 'ほのおの句', nameEn: 'Flame Phrase', power: 17, area: 'grammar', affinity: 'fire' },
  soft_heart: { id: 'soft_heart', name: 'やさしいことば', nameEn: 'Gentle Words', power: 14, area: 'vocab', affinity: 'emotion' },
  ripple_read: { id: 'ripple_read', name: 'よみのさざなみ', nameEn: 'Reading Ripple', power: 15, area: 'kanji', affinity: 'water' },
  sky_verse: { id: 'sky_verse', name: 'そらのうた', nameEn: 'Sky Verse', power: 20, area: 'listening', affinity: 'wind' },
  shadow_kanji: { id: 'shadow_kanji', name: 'かげの漢字', nameEn: 'Shadow Kanji', power: 18, area: 'kanji', affinity: 'knowledge' },
  petal_dance: { id: 'petal_dance', name: 'ももの花まい', nameEn: 'Peach Petal Dance', power: 17, area: 'vocab', affinity: 'nature' },
  steam_veil: { id: 'steam_veil', name: 'ゆけむり', nameEn: 'Steam Veil', power: 16, area: 'listening', affinity: 'water' },
  bloom_bond: { id: 'bloom_bond', name: 'はなのきずな', nameEn: 'Blossom Bond', power: 16, area: 'grammar', affinity: 'memory' },
};

const talk = (line: string, en: string, options: string[], why: string) => ({ line, en, options, answer: 0, why });

export const SPECIES: Record<string, Species> = {
  yukitsune: {
    id: 'yukitsune', name: 'ユキツネ', nameEn: 'Yukitsune', sprite: 'k_fox_blue', affinity: 'memory', baseHp: 30, baseAtk: 10,
    desc: '忘れられた言葉から生まれた子ぎつね。{記憶|きおく}の{欠片|かけら}を集めるのが好き。',
    descEn: 'A fox kit born from forgotten words. It loves collecting fragments of memory.',
    personality: 'curious, a little shy',
    moves: ['memory_echo', 'word_spark'],
    evolvesTo: { species: 'soragitsune', level: 9 },
    ability: { id: 'reveal_reading', name: 'よみとき', desc: 'Reveals the reading of the key word in a question.' },
    talk: [
      talk('……ここ、どこ？　だれも、わたしのこと覚えてないの……？', '…Where am I? Doesn’t anyone remember me…?',
        ['大丈夫。わたしが覚えておくよ。', 'うるさいなあ、あっちへ行って。', 'ここは駅だから、切符を買ってね。'],
        'It is lonely and afraid of being forgotten — a reassuring answer fits.'),
    ],
  },
  soragitsune: {
    id: 'soragitsune', name: 'ソラギツネ', nameEn: 'Soragitsune', sprite: 'k_fox_winged', affinity: 'wind', baseHp: 42, baseAtk: 14,
    desc: '取り戻した言葉の力で、空を{駆|か}けるようになった姿。',
    descEn: 'Its form after regaining the power of words — it can now run across the sky.',
    personality: 'brave, loyal',
    moves: ['sky_verse', 'memory_echo'],
    ability: { id: 'reveal_reading', name: 'よみとき', desc: 'Reveals the reading of the key word in a question.' },
    talk: [],
  },
  kotori: {
    id: 'kotori', name: 'コトリ', nameEn: 'Kotori', sprite: 'k_bird1', affinity: 'wind', baseHp: 24, baseAtk: 9,
    desc: '人のうわさ話から生まれる小鳥。聞いた言葉を何でもまねする。',
    descEn: 'A little bird born from gossip. It imitates any words it hears.',
    personality: 'chatty',
    moves: ['gust_call', 'soft_heart'],
    evolvesTo: { species: 'haneuta', level: 7 },
    ability: { id: 'replay', name: 'こだま', desc: 'Replays listening audio at slower speed.' },
    talk: [
      talk('ねえねえ、聞いた？　森の奥で、だれかが言葉を集めてるんだって！', 'Hey hey, did you hear? Someone is collecting words deep in the forest!',
        ['えっ、本当？　もっと詳しく聞かせて。', 'わたしは森に行ったことがない。', '静かにしないと怒るよ。'],
        'It is sharing gossip — showing interest (“tell me more”) is the natural response.'),
      talk('ぼく、うたうのが好きなわけじゃないよ。言葉をわすれたくないだけ。', "It's not that I like singing. I just don't want to forget words.",
        ['そうなんだ。言葉を大切にしてるんだね。', 'じゃあ、うたが大好きなんだね。', 'わすれてもいいと思うよ。'],
        'わけじゃない corrects the assumption: it doesn’t love singing, it wants to keep words.'),
    ],
  },
  shirahane: {
    id: 'shirahane', name: 'シラハネ', nameEn: 'Shirahane', sprite: 'k_bird3', affinity: 'wind', baseHp: 46, baseAtk: 16,
    desc: '遠くの声まで聞き取る白い鳥。ささやきさえ{逃|のが}さない。',
    descEn: 'A white bird that hears voices from far away. Not even a whisper escapes it.',
    personality: 'calm, attentive',
    moves: ['sky_verse', 'soft_heart'],
    ability: { id: 'replay', name: 'こだま', desc: 'Replays listening audio at slower speed.' },
    talk: [],
  },
  mebuki: {
    id: 'mebuki', name: 'メブキ', nameEn: 'Mebuki', sprite: 'k_leaf1', affinity: 'nature', baseHp: 28, baseAtk: 9,
    desc: '新しく覚えた言葉が{芽|め}を出した姿。水と{褒|ほ}め言葉が好き。',
    descEn: 'A newly learned word that has sprouted. It likes water and compliments.',
    personality: 'gentle, sleepy',
    moves: ['leaf_whisper', 'root_grammar'],
    evolvesTo: { species: 'morime', level: 7 },
    ability: { id: 'eliminate', name: 'えだわけ', desc: 'Removes one wrong answer.' },
    talk: [
      talk('のど、かわいた……。でも、えんりょしてるわけじゃないよ。', "I'm thirsty… but it's not that I'm holding back.",
        ['じゃあ、お水をどうぞ。遠慮しないでね。', 'のどがかわいていないんだね。', '遠慮するのはよくないから、帰って。'],
        'It is thirsty; offering water and “don’t hold back” (遠慮しないで) is kind and natural.'),
      talk('ぼく、ゆっくり大きくなるんだ。急がせないでね。', "I grow slowly. Please don't rush me.",
        ['うん、あなたのペースでいいよ。', '早く大きくなってね。', 'ゆっくりするのはだめだよ。'],
        'It asks not to be rushed — respecting its pace is the fitting reply.'),
    ],
  },
  morime: {
    id: 'morime', name: 'モリメ', nameEn: 'Morime', sprite: 'k_leaf2', affinity: 'nature', baseHp: 38, baseAtk: 12,
    desc: '{根|ね}を張った言葉はもう忘れられない。森を守る小さな番人。',
    descEn: 'A word that has put down roots can no longer be forgotten. A small guardian of the forest.',
    personality: 'steady',
    moves: ['root_grammar', 'leaf_whisper'],
    evolvesTo: { species: 'komorino', level: 14 },
    ability: { id: 'eliminate', name: 'えだわけ', desc: 'Removes one wrong answer.' },
    talk: [],
  },
  komorino: {
    id: 'komorino', name: 'コモリノ', nameEn: 'Komorino', sprite: 'k_leaf3', affinity: 'nature', baseHp: 52, baseAtk: 15,
    desc: '森じゅうの言葉が花になって咲いた姿。そばにいると、忘れた言葉を思い出すという。',
    descEn: 'All the words of the forest blooming as flowers. People say you remember forgotten words when it is near.',
    personality: 'gentle, wise',
    moves: ['root_grammar', 'bloom_bond'],
    ability: { id: 'eliminate', name: 'えだわけ', desc: 'Removes one wrong answer.' },
    talk: [],
  },
  haneuta: {
    id: 'haneuta', name: 'ハネウタ', nameEn: 'Haneuta', sprite: 'k_bird2', affinity: 'wind', baseHp: 34, baseAtk: 12,
    desc: '聞いた言葉を歌にして覚える小鳥。しっぽの羽が{金色|きんいろ}に光る。',
    descEn: 'A bird that memorises words by turning them into songs. Its tail feathers shine gold.',
    personality: 'cheerful',
    moves: ['gust_call', 'sky_verse'],
    evolvesTo: { species: 'shirahane', level: 14 },
    ability: { id: 'replay', name: 'こだま', desc: 'Replays listening audio at slower speed.' },
    talk: [],
  },
  kagiroi: {
    id: 'kagiroi', name: 'カギロイ', nameEn: 'Kagiroi', sprite: 'k_fire2', affinity: 'fire', baseHp: 38, baseAtk: 14,
    desc: '朝焼けのような毛並みのきつね。強い言葉ほど、炎が明るく燃える。',
    descEn: 'A fox with fur like the dawn sky. The stronger the words, the brighter its flame.',
    personality: 'proud, brave',
    moves: ['flame_phrase', 'word_spark'],
    evolvesTo: { species: 'hikaribi', level: 14 },
    ability: { id: 'highlight', name: 'ひかりの筆', desc: 'Highlights the grammar structure in a question.' },
    talk: [],
  },
  hikaribi: {
    id: 'hikaribi', name: 'ヒカリビ', nameEn: 'Hikaribi', sprite: 'k_fire3', affinity: 'fire', baseHp: 50, baseAtk: 17,
    desc: '三本の尾に言葉の炎を宿す。その光は、迷った人の道を照らすという。',
    descEn: 'It carries the flame of words in its three tails. Its light is said to guide those who are lost.',
    personality: 'noble',
    moves: ['flame_phrase', 'shadow_kanji'],
    ability: { id: 'highlight', name: 'ひかりの筆', desc: 'Highlights the grammar structure in a question.' },
    talk: [],
  },
  homura: {
    id: 'homura', name: 'ホムラ', nameEn: 'Homura', sprite: 'k_fire1', affinity: 'fire', baseHp: 30, baseAtk: 11,
    desc: '強い気持ちをこめた言葉から生まれる。{怒|おこ}りっぽいが、{根|ね}はやさしい。',
    descEn: 'Born from words spoken with strong feelings. Quick-tempered but kind at heart.',
    personality: 'hot-headed',
    moves: ['flame_phrase', 'word_spark'],
    evolvesTo: { species: 'kagiroi', level: 7 },
    ability: { id: 'highlight', name: 'ひかりの筆', desc: 'Highlights the grammar structure in a question.' },
    talk: [
      talk('ふん！　どうせお前も、オレのことなんかすぐ忘れるに違いない！', "Hmph! I bet you'll forget about me soon, too!",
        ['忘れないよ。約束する。', 'うん、たぶん忘れると思う。', '違いないって、どういう意味？'],
        'It expects to be forgotten (に違いない = it’s convinced). A sincere promise addresses its fear.'),
    ],
  },
  fuwari: {
    id: 'fuwari', name: 'フワリ', nameEn: 'Fuwari', sprite: 'k_puff', affinity: 'emotion', baseHp: 26, baseAtk: 8,
    desc: 'ほっとした時のため息から生まれる。さわるととても{柔|やわ}らかい。',
    descEn: 'Born from sighs of relief. Very soft to the touch.',
    personality: 'relaxed',
    moves: ['soft_heart', 'gust_call'],
    ability: { id: 'translate', name: 'ほんやく', desc: 'Shows the English meaning of the question sentence.' },
    talk: [
      talk('ふわぁ……毎日いそがしいと、ひと休みしたくなるものだよね。', '*yawn*… When every day is busy, you just want to take a break, right?',
        ['うん、たまには休むのも大事だよね。', 'いそがしいのは楽しいから休まない。', '昨日は休んだものだ。'],
        'ものだ here expresses a general feeling (“that’s just how it is”) — agreeing is natural.'),
    ],
  },
  sakurako: {
    id: 'sakurako', name: 'サクラコ', nameEn: 'Sakurako', sprite: 'k_fox_pink', affinity: 'memory', baseHp: 28, baseAtk: 10,
    desc: '春の思い出から生まれた。桜の季節になると、よく神社に{姿|すがた}を見せる。',
    descEn: 'Born from spring memories. It often appears at the shrine in cherry-blossom season.',
    personality: 'nostalgic',
    moves: ['bloom_bond', 'soft_heart'],
    ability: { id: 'translate', name: 'ほんやく', desc: 'Shows the English meaning of the question sentence.' },
    talk: [
      talk('昔はここで、子どもたちがよくお花見をしたものよ。懐かしいわ。', 'Long ago, children used to have flower-viewing parties here. How nostalgic.',
        ['そうなんだ。素敵な思い出だね。', '昨日、お花見をしたんだね。', 'お花見は禁止です。'],
        'た-form + ものだ = nostalgic past habit, not a single event yesterday.'),
    ],
  },
  kurone: {
    id: 'kurone', name: 'クロネ', nameEn: 'Kurone', sprite: 'k_cat_black', affinity: 'lightning', baseHp: 44, baseAtk: 12,
    desc: '消えかけた言葉の{影|かげ}をまとう黒猫。なぜか研究所の{方角|ほうがく}をじっと見ている。',
    descEn: 'A black cat cloaked in the shadows of fading words. For some reason it keeps staring towards the research facility.',
    personality: 'aloof, mysterious',
    moves: ['shadow_kanji', 'word_spark'],
    ability: { id: 'highlight', name: 'ひかりの筆', desc: 'Highlights the grammar structure in a question.' },
    talk: [],
  },
  // ---- Hinomori valley (chapter 2)
  momotan: {
    id: 'momotan', name: 'モモタン', nameEn: 'Momotan', sprite: 'k_peach1', affinity: 'nature', baseHp: 30, baseAtk: 10,
    desc: '「おいしい」と言われた{桃|もも}から生まれた。{甘|あま}いにおいがする。',
    descEn: 'Born from a peach someone called delicious. It smells sweet.',
    personality: 'cheerful, greedy',
    moves: ['petal_dance', 'leaf_whisper'],
    evolvesTo: { species: 'momoriss', level: 12 },
    ability: { id: 'eliminate', name: 'えだわけ', desc: 'Removes one wrong answer.' },
    talk: [
      talk('この桃、食べてもいい？　……だめ？　ちょっとだけでもいいから！', 'Can I eat this peach? …No? Even just a little!',
        ['じゃあ、半分こしよう。', '桃は果物ではありません。', 'ちょっとだけ食べたことがある。'],
        'でもいいから = “even (just) that is fine” — it begs; sharing half is the friendly answer.'),
    ],
  },
  momoriss: {
    id: 'momoriss', name: 'モモリス', nameEn: 'Momoriss', sprite: 'k_peach2', affinity: 'nature', baseHp: 40, baseAtk: 13,
    desc: '花の{尾|お}をふると、{果樹園|かじゅえん}の実が{熟|じゅく}すという。',
    descEn: 'They say the orchard’s fruit ripens when it waves its blossom tail.',
    personality: 'playful',
    moves: ['petal_dance', 'root_grammar'],
    evolvesTo: { species: 'tougenkyo', level: 20 },
    ability: { id: 'eliminate', name: 'えだわけ', desc: 'Removes one wrong answer.' },
    talk: [],
  },
  tougenkyo: {
    id: 'tougenkyo', name: 'トウゲンキョウ', nameEn: 'Tougenkyō', sprite: 'k_peach3', affinity: 'nature', baseHp: 54, baseAtk: 17,
    desc: '{桃源郷|とうげんきょう}の名を持つ{狐|きつね}。光る花びらは、大切な人の言葉を運ぶ。',
    descEn: 'A fox named after the land of peach blossoms. Its glowing petals carry the words of loved ones.',
    personality: 'graceful, kind',
    moves: ['petal_dance', 'bloom_bond'],
    ability: { id: 'eliminate', name: 'えだわけ', desc: 'Removes one wrong answer.' },
    talk: [],
  },
  yukemuri: {
    id: 'yukemuri', name: 'ユケムリ', nameEn: 'Yukemuri', sprite: 'k_steam1', affinity: 'water', baseHp: 28, baseAtk: 10,
    desc: '{温泉|おんせん}で「ああ、いい{湯|ゆ}だ」とつぶやいた声から生まれた。',
    descEn: 'Born from someone sighing “ah, what a nice bath” in a hot spring.',
    personality: 'sleepy, easygoing',
    moves: ['steam_veil', 'ripple_read'],
    evolvesTo: { species: 'yukawauso', level: 12 },
    ability: { id: 'replay', name: 'こだま', desc: 'Replays listening audio at slower speed.' },
    talk: [
      talk('お湯につかったとたん、ねむくなっちゃった……。', 'The moment I got into the hot water, I got sleepy…',
        ['気持ちよかったんだね。少し休もう。', 'まだ温泉に入っていないんだね。', 'ねむくなるまで走ろう。'],
        'たとたん = “the moment (it happened)”: it already got in and immediately got sleepy.'),
    ],
  },
  yukawauso: {
    id: 'yukawauso', name: 'ユカワウソ', nameEn: 'Yukawauso', sprite: 'k_steam2', affinity: 'water', baseHp: 38, baseAtk: 13,
    desc: '{手|て}ぬぐいを{頭|あたま}にのせた{川|かわ}うそ。{湯加減|ゆかげん}にはうるさい。',
    descEn: 'An otter with a towel on its head. Very particular about the water temperature.',
    personality: 'fussy, friendly',
    moves: ['steam_veil', 'ripple_read'],
    evolvesTo: { species: 'yudatsu', level: 20 },
    ability: { id: 'replay', name: 'こだま', desc: 'Replays listening audio at slower speed.' },
    talk: [],
  },
  yudatsu: {
    id: 'yudatsu', name: 'ユダツ', nameEn: 'Yudatsu', sprite: 'k_steam3', affinity: 'water', baseHp: 52, baseAtk: 17,
    desc: '湯けむりのように{渦巻|うずま}く{竜|りゅう}。谷の{温泉|おんせん}を何百年も守ってきた。',
    descEn: 'A dragon that curls like onsen steam. It has guarded the valley’s hot springs for centuries.',
    personality: 'dignified, warm',
    moves: ['steam_veil', 'sky_verse'],
    ability: { id: 'replay', name: 'こだま', desc: 'Replays listening audio at slower speed.' },
    talk: [],
  },
};

export const ENCOUNTERS: Record<string, { species: string; min: number; max: number; weight: number }[]> = {
  forest: [
    { species: 'kotori', min: 2, max: 4, weight: 4 },
    { species: 'mebuki', min: 2, max: 4, weight: 4 },
    { species: 'homura', min: 3, max: 5, weight: 2 },
    { species: 'fuwari', min: 3, max: 5, weight: 2 },
  ],
  valley: [
    { species: 'momotan', min: 6, max: 9, weight: 4 },
    { species: 'yukemuri', min: 6, max: 9, weight: 4 },
    { species: 'kotori', min: 6, max: 8, weight: 1 },
    { species: 'fuwari', min: 6, max: 8, weight: 1 },
  ],
};

export const ITEMS: Record<string, ItemDef> = {
  onigiri: { id: 'onigiri', name: 'おにぎり', nameEn: 'Rice ball', desc: 'Restores 20 HP to a Kotodama.', icon: 'i_onigiri', kind: 'heal', heal: 20, price: 150 },
  greentea: { id: 'greentea', name: '日野森緑茶', nameEn: 'Hinomori green tea', desc: 'Restores 40 HP to a Kotodama.', icon: 'i_greentea', kind: 'heal', heal: 40, price: 300 },
  shiori: { id: 'shiori', name: 'ことのはの栞', nameEn: 'Kotonoha bookmark', desc: 'Use during a question to reveal a hint (removes two wrong answers).', icon: 'i_shiori', kind: 'hint', price: 400 },
  omamori: { id: 'omamori', name: 'お守り', nameEn: 'Shrine charm', desc: 'A charm from Hinomori Shrine. Your Kotodama gain 10% more XP while you carry it.', icon: 'i_omamori', kind: 'key' },
  kakera: { id: 'kakera', name: '言葉の欠片', nameEn: 'Word fragment', desc: 'A glowing fragment found at the forest shrine. The researcher wants to see it.', icon: 'i_kakera', kind: 'key' },
  mystery_letter: { id: 'mystery_letter', name: '差出人のない手紙', nameEn: 'Unsigned letter', desc: 'A letter signed only “K”.', icon: 'i_letter_k', kind: 'key' },
  cake: { id: 'cake', name: '手作りケーキ', nameEn: 'Homemade cake', desc: 'Kaede’s cake. A nice gift. Restores 30 HP.', icon: 'i_cake', kind: 'heal', heal: 30, price: 350 },
  peach: { id: 'peach', name: '日野森の桃', nameEn: 'Hinomori peach', desc: 'A ripe peach from Mr. Hayashi’s orchard. Restores 25 HP.', icon: 'i_peach', kind: 'heal', heal: 25, price: 200 },
  onsen_tamago: { id: 'onsen_tamago', name: '温泉たまご', nameEn: 'Onsen egg', desc: 'An egg slow-cooked in the hot spring. Restores 35 HP.', icon: 'i_onsen_tamago', kind: 'heal', heal: 35, price: 250 },
  grape_juice: { id: 'grape_juice', name: 'ぶどうジュース', nameEn: 'Grape juice', desc: 'Kenji’s grape juice from the valley. Restores 50 HP.', icon: 'i_grape_juice', kind: 'heal', heal: 50, price: 450 },
  ota_fude: { id: 'ota_fude', name: '太田先生の筆', nameEn: 'Mr. Ōta’s brush', desc: 'The brush Mr. Ōta gave you. Proof that you passed the valley’s trial of words.', icon: 'i_fude', kind: 'key' },
  name_scroll: { id: 'name_scroll', name: '名前の書', nameEn: 'Name scroll', desc: 'Ms. Mori’s name, written by your own hand. Bring it to her.', icon: 'i_washi', kind: 'key' },
  deco_poster: { id: 'deco_poster', name: 'アニメのポスター', nameEn: 'Anime poster', desc: 'A poster of your favourite anime heroine.', icon: 'deco_poster', kind: 'deco', price: 800 },
  deco_worldmap: { id: 'deco_worldmap', name: '世界地図', nameEn: 'World map', desc: 'A map to remember where you came from.', icon: 'deco_worldmap', kind: 'deco', price: 900 },
  deco_aquarium: { id: 'deco_aquarium', name: '水そう', nameEn: 'Aquarium', desc: 'A small tank with a calm little fish.', icon: 'deco_aquarium', kind: 'deco', price: 2500 },
  deco_cactus: { id: 'deco_cactus', name: 'サボテン', nameEn: 'Cactus', desc: 'Hard to kill. Perfect for busy learners.', icon: 'deco_cactus', kind: 'deco', price: 300 },
  deco_bonsai: { id: 'deco_bonsai', name: '盆栽', nameEn: 'Bonsai', desc: 'Needs patience — like learning kanji.', icon: 'deco_bonsai', kind: 'deco', price: 1800 },
  deco_lights: { id: 'deco_lights', name: 'ガーランドライト', nameEn: 'String lights', desc: 'Warm lights for evening study sessions.', icon: 'deco_lights', kind: 'deco', price: 700 },
  deco_cushion: { id: 'deco_cushion', name: 'ざぶとん', nameEn: 'Floor cushion', desc: 'A soft pink cushion for the tatami.', icon: 'deco_cushion', kind: 'deco', price: 500 },
  deco_beanbag: { id: 'deco_beanbag', name: 'ビーズクッション', nameEn: 'Bean bag', desc: 'You could fall asleep reading on this.', icon: 'deco_beanbag', kind: 'deco', price: 1500 },
  deco_shelf: { id: 'deco_shelf', name: '小さな本棚', nameEn: 'Small bookshelf', desc: 'More room for Japanese books.', icon: 'deco_shelf', kind: 'deco', price: 1200 },
  deco_books: { id: 'deco_books', name: '教科書の山', nameEn: 'Stack of textbooks', desc: 'N2 textbooks. Heavy, in every sense.', icon: 'deco_books', kind: 'deco', price: 600 },
  deco_manekineko: { id: 'deco_manekineko', name: '招き猫', nameEn: 'Lucky cat', desc: 'Said to invite good fortune.', icon: 'deco_manekineko', kind: 'deco', price: 1000 },
  deco_furin: { id: 'deco_furin', name: '風鈴', nameEn: 'Wind chime', desc: 'Its tinkling sound means summer.', icon: 'deco_furin', kind: 'deco', price: 400 },
  deco_tv: { id: 'deco_tv', name: 'テレビとゲーム機', nameEn: 'TV and console', desc: 'For listening practice… and maybe games.', icon: 'deco_tv', kind: 'deco', price: 3000 },
  deco_lamp: { id: 'deco_lamp', name: 'デスクライト', nameEn: 'Desk lamp', desc: 'Bright light for late-night reviews.', icon: 'deco_lamp', kind: 'deco', price: 600 },
  deco_laundry: { id: 'deco_laundry', name: '物干し', nameEn: 'Laundry rack', desc: 'Very realistic Japanese apartment life.', icon: 'deco_laundry', kind: 'deco', price: 400 },
  deco_certificate: { id: 'deco_certificate', name: 'JLPT模試合格証', nameEn: 'Mock exam certificate', desc: 'Awarded for scoring 70% or more on the mock exam. It hangs proudly on your wall.', icon: 'deco_certificate', kind: 'deco' },
};

export const DECO_CATALOG = ['deco_poster', 'deco_worldmap', 'deco_aquarium', 'deco_cactus', 'deco_bonsai', 'deco_lights', 'deco_cushion', 'deco_beanbag', 'deco_shelf', 'deco_books', 'deco_manekineko', 'deco_furin', 'deco_tv', 'deco_lamp', 'deco_laundry'];

/** sprites that have idle_<sprite>_0/_1 frames */
/** sprites with a 2-frame idle animation (tools/build_kotodama.py) */
export const IDLE_SPRITES = ['k_fox_blue', 'k_fox_winged', 'k_bird1', 'k_bird2', 'k_bird3', 'k_leaf1', 'k_leaf2', 'k_leaf3', 'k_fire1', 'k_fire2', 'k_fire3', 'k_puff', 'k_fox_pink', 'k_cat_black',
  'k_peach1', 'k_peach2', 'k_peach3', 'k_steam1', 'k_steam2', 'k_steam3'];
/** sprites with an action pose (atk_<key>.png), shown when the creature attacks */
export const ATTACK_SPRITES = IDLE_SPRITES;
