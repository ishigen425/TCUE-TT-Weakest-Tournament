export type PlayerId = 'kiuchi' | 'wakayama' | 'austin' | '';

// 選手の型定義
export interface Player {
  id: PlayerId;
  name: string;
  birthPlace: string;
  warRecord: string[];
  profile: string;
  created_at?: string;
}

// Supabaseからの選手データ
export interface PlayerFromDB {
  id: string;
  name: string;
  profile: string;
  created_at: string;
}
