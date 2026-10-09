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
    id: 'grandpa', sprite: 'grandpa', frames: 3, name: 'おじいさん',
    lines: [
      { jp: '若いころは、毎朝この川沿いを走ったものじゃ。', en: 'When I was young, I used to run along this river every morning.' },
      { jp: 'この町も、ずいぶん変わったのう。', en: 'This town has really changed.' },
      { jp: '言葉というのは、使わんと忘れてしまうもんじゃよ。', en: "Words are things you forget if you don't use them." },
    ],
  },
  delivery: {
    id: 'delivery', sprite: 'delivery', frames: 3, name: '配達員',
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
};
