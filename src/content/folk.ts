/** Wandering townsfolk and animals. Each says one short line of natural Japanese. */
export interface FolkDef {
  id: string;
  sprite: string; // folk_<sprite>_<dir>_<frame>
  frames: number;
  name: string;
  lines: { jp: string; en: string }[];
}

export const FOLK: Record<string, FolkDef> = {
  schoolgirl: {
    id: 'schoolgirl', sprite: 'schoolgirl', frames: 4, name: '女子高生',
    lines: [
      { jp: 'やばい、遅刻しそう！ 今日テストなのに……。', en: "Oh no, I'm going to be late! And there's a test today…" },
      { jp: '駅前のコンビニ、新しいスイーツが出たらしいよ。', en: 'Apparently the konbini by the station has a new dessert.' },
      { jp: '最近、友達が言葉を忘れちゃうことがあって、ちょっと心配なんだ。', en: "Lately my friend sometimes forgets words. I'm a bit worried." },
    ],
  },
  salaryman: {
    id: 'salaryman', sprite: 'salaryman', frames: 4, name: '会社員',
    lines: [
      { jp: '電車が遅れているせいで、会議に間に合いそうにない……。', en: "Because the train is delayed, I won't make it to the meeting…" },
      { jp: '締め切りが明日だというのに、まだ資料ができていないんだ。', en: "The deadline is tomorrow and the documents still aren't ready." },
      { jp: 'お疲れさまです。今日もいい天気ですね。', en: 'Good work today. Nice weather again, isn’t it?' },
    ],
  },
  grandpa: {
    id: 'grandpa', sprite: 'grandpa', frames: 4, name: 'おじいさん',
    lines: [
      { jp: '若いころは、毎朝この川沿いを走ったものじゃ。', en: 'When I was young, I used to run along this river every morning.' },
      { jp: 'この町も、ずいぶん変わったのう。', en: 'This town has really changed.' },
      { jp: '言葉というのは、使わんと忘れてしまうもんじゃよ。', en: "Words are things you forget if you don't use them." },
    ],
  },
  delivery: {
    id: 'delivery', sprite: 'delivery', frames: 4, name: '配達員',
    lines: [
      { jp: 'お荷物のお届けです！ ……あれ、宛先の住所はどこだったっけ。', en: 'Delivery! …Huh, where was the address again?' },
      { jp: '再配達のご依頼は、お電話かネットでお願いします。', en: 'Please request redelivery by phone or online.' },
    ],
  },
  cat: {
    id: 'cat', sprite: 'cat', frames: 4, name: '三毛猫',
    lines: [
      { jp: 'にゃーん。（のんびりしている）', en: 'Meow. (It looks relaxed.)' },
      { jp: '……。（こちらをじっと見ている）', en: '… (It is staring at you.)' },
    ],
  },
  dog: {
    id: 'dog', sprite: 'dog', frames: 4, name: '柴犬',
    lines: [
      { jp: 'ワン！ （しっぽを振っている）', en: 'Woof! (It is wagging its tail.)' },
      { jp: 'くぅーん。（散歩に行きたそうだ）', en: 'Whimper. (It seems to want a walk.)' },
    ],
  },
  miko: {
    id: 'miko', sprite: 'miko', frames: 4, name: '巫女さん',
    lines: [
      { jp: 'お参りの前に、手水舎で手を清めてくださいね。', en: 'Before you pray, please purify your hands at the water basin.' },
      { jp: 'このごろ、おみくじの文字が読めないと言う方が増えているんです。', en: 'Lately more and more people say they can’t read the fortune slips.' },
    ],
  },
  chef: {
    id: 'chef', sprite: 'chef', frames: 4, name: 'ラーメン屋の店主',
    lines: [
      { jp: 'うちのスープは、三日かけて作ってるんだ。一度食べてみな！', en: 'Our broth takes three days to make. Come try it some time!' },
      { jp: '今日は仕込みが間に合わなくて、開店が少し遅れそうだ。', en: 'Prep isn’t done in time today, so we’ll open a little late.' },
    ],
  },
  gardener: {
    id: 'gardener', sprite: 'gardener', frames: 4, name: '畑のおばあさん',
    lines: [
      { jp: '今年はトマトがよく育ったよ。雨が多かったおかげだね。', en: 'The tomatoes grew well this year, thanks to all the rain.' },
      { jp: '野菜は手をかければかけるほど、おいしくなるもんさ。', en: 'The more care you give vegetables, the tastier they get.' },
    ],
  },
  kid: {
    id: 'kid', sprite: 'kid', frames: 4, name: '小学生',
    lines: [
      { jp: 'ねえねえ、森の奥に光る動物がいるって本当？', en: 'Hey, is it true there’s a glowing animal deep in the forest?' },
      { jp: '宿題、まだ終わってないけど……遊んでからやろうっと。', en: 'I haven’t finished my homework… I’ll do it after playing.' },
    ],
  },
  student: {
    id: 'student', sprite: 'student', frames: 4, name: '大学生',
    lines: [
      { jp: '図書館で調べものをするつもりが、つい寝てしまって……。', en: 'I meant to do research at the library, but I dozed off…' },
      { jp: 'レポートの締め切りに間に合うかどうか、微妙なところだ。', en: 'Whether I’ll make the report deadline is a close call.' },
    ],
  },
  grandma: {
    id: 'grandma', sprite: 'grandma', frames: 4, name: 'おばあさん',
    lines: [
      { jp: 'あら、見かけない顔ね。日野森へようこそ。', en: 'Oh, a new face. Welcome to Hinomori.' },
      { jp: '駅前のお団子屋さん、昔はいつも行列ができていたのよ。', en: 'The dumpling shop by the station used to always have a queue.' },
    ],
  },
  sparrow: {
    id: 'sparrow', sprite: 'sparrow', frames: 4, name: 'スズメ',
    lines: [
      { jp: 'チュンチュン。（パンくずを探している）', en: 'Tweet tweet. (It is looking for bread crumbs.)' },
      { jp: '……。（ぴょんと跳ねて、少し離れた）', en: '… (It hopped a little further away.)' },
    ],
  },
};
