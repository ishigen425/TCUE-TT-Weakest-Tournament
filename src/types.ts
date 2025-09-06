// 選手の型定義
export interface Player {
  id: string;
  name: string;
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
