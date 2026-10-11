export interface NpcDef {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  /** base sprite key; "<key>_down/_up/_side" variants are used when available */
  sprite: string;
  tint?: number;
  /** portrait asset; keys starting with "portrait_" have _neutral/_happy/_surprised/_worried variants */
  portrait?: string;
  /** CSS filter so dialogue portraits roughly match the in-world tint */
  portraitFilter?: string;
  color: string;
}

export const NPCS: Record<string, NpcDef> = {
  mori: { id: 'mori', name: '森さん', nameEn: 'Ms. Mori', role: 'Landlady', sprite: 'npc_mori', portrait: 'portrait_mori', color: '#9b6bb3' },
  haruto: { id: 'haruto', name: 'ハルト', nameEn: 'Haruto', role: 'Convenience-store clerk', sprite: 'npc_haruto', portrait: 'portrait_haruto', color: '#d0473a' },
  customer: { id: 'customer', name: '常連さん', nameEn: 'Regular customer', role: 'Regular customer', sprite: 'npc_customer', portrait: 'portrait_customer', color: '#7a6a50' },
  kaede: { id: 'kaede', name: '楓', nameEn: 'Kaede', role: 'Café owner', sprite: 'npc_kaede', portrait: 'portrait_kaede', color: '#d9739b' },
  aoi: { id: 'aoi', name: 'アオイ', nameEn: 'Aoi', role: 'University student', sprite: 'npc_aoi', portrait: 'portrait_aoi', color: '#3f6fd1' },
  sato: { id: 'sato', name: '佐藤先生', nameEn: 'Mr. Satō', role: 'Retired teacher', sprite: 'npc_sato', portrait: 'portrait_sato', color: '#3d5a80' },
  station_staff: { id: 'station_staff', name: '駅員', nameEn: 'Station attendant', role: 'Station attendant', sprite: 'npc_station_staff', portrait: 'portrait_station_staff', color: '#2b4c9b' },
  kirishima: { id: 'kirishima', name: '霧島博士', nameEn: 'Dr. Kirishima', role: 'Researcher', sprite: 'npc_kirishima', portrait: 'portrait_kirishima', color: '#4a6670' },
  yukitsune: { id: 'yukitsune', name: '？？？', nameEn: '???', role: 'Kotodama', sprite: 'k_fox_blue', portrait: 'k_fox_blue', color: '#6c8fd6' },
  // chapter 2: Hinomori valley
  hayashi: { id: 'hayashi', name: '林さん', nameEn: 'Mr. Hayashi', role: 'Peach farmer', sprite: 'npc_hayashi', portrait: 'portrait_hayashi', color: '#b5733a' },
  sakura_hayashi: { id: 'sakura_hayashi', name: 'さくら', nameEn: 'Sakura', role: 'Farmer’s granddaughter', sprite: 'npc_sakura', portrait: 'portrait_sakura', color: '#e0a32a' },
  okami: { id: 'okami', name: '女将さん', nameEn: 'Okami-san', role: 'Onsen inn owner', sprite: 'npc_okami', portrait: 'portrait_okami', color: '#6b3f7a' },
  kenji: { id: 'kenji', name: '健二', nameEn: 'Kenji', role: 'Winemaker', sprite: 'npc_kenji', portrait: 'portrait_kenji', color: '#3f7a4a' },
  ota: { id: 'ota', name: '太田先生', nameEn: 'Mr. Ōta', role: 'Calligrapher, master of words', sprite: 'npc_ota', portrait: 'portrait_ota', color: '#2f4a7a' },
  // chapter 3: Yukimi, the snowy mountain village
  tsuru: { id: 'tsuru', name: 'つるさん', nameEn: 'Grandma Tsuru', role: 'Guesthouse owner', sprite: 'npc_tsuru', portrait: 'portrait_tsuru', color: '#3b4a7a' },
  hina: { id: 'hina', name: 'ひな', nameEn: 'Hina', role: 'Village girl', sprite: 'npc_hina', portrait: 'portrait_hina', color: '#c8463c' },
  fujii: { id: 'fujii', name: '藤井先生', nameEn: 'Dr. Fujii', role: 'Village doctor', sprite: 'npc_fujii', portrait: 'portrait_fujii', color: '#5a8fb8' },
  kuroda: { id: 'kuroda', name: '黒田さん', nameEn: 'Mr. Kuroda', role: 'Mountain guide', sprite: 'npc_kuroda', portrait: 'portrait_kuroda', color: '#d0662a' },
  jokan: { id: 'jokan', name: '定観和尚', nameEn: 'Jōkan-oshō', role: 'Head priest, master of kanji', sprite: 'npc_jokan', portrait: 'portrait_jokan', color: '#8a6a22' },
  traveller: { id: 'traveller', name: '旅の人', nameEn: 'Traveller', role: '???', sprite: 'npc_traveller', portrait: 'portrait_traveller', color: '#3f6a4a' },
  busdriver: { id: 'busdriver', name: '運転手さん', nameEn: 'Bus driver', role: 'Bus driver', sprite: 'npc_busdriver', portrait: 'npc_busdriver_down', color: '#4a86b5' },
};
