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
};
