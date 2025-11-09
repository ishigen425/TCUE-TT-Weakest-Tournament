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

// 試合結果の型定義
export interface Match {
  player1Id: PlayerId;
  player1Name: string;
  player1Score: number;
  player2Id: PlayerId;
  player2Name: string;
  player2Score: number;
  winnerId: PlayerId;
}

// 順位表の型定義
export interface Ranking {
  playerId: PlayerId;
  playerName: string;
  wins: number;
  losses: number;
  winRate: number;
  rank: number;
}
