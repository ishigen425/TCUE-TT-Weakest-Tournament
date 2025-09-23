export type PlayerId = 'kiuchi' | 'wakayama' | 'austin' | '';

// 選手の型定義
export interface Player {
  id: PlayerId;
  name: string;
  birthPlace: string;
  warRecord: string[];
  strong_point: string;
  coach: string;
  coach_comment: string;
  profile_image: string;
  created_at?: string;
}
