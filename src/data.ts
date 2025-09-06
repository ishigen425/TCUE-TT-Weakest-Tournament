// 選手データ（定数）
import { Player } from './types';

export const PLAYERS: Player[] = [
  {
    id: 'kiuchi',
    name: '木内',
    birthPlace: '沖縄（日本）',
    warRecord: 
      ['群馬県中学校総合体育大会 柔道競技 ベスト8'],
    profile: '粘り強いプレーが得意です。'
  },
  {
    id: 'wakayama', 
    name: '若山',
    birthPlace: '群馬（日本）',
    warRecord:
      ['準備中'],
    profile: 'パワフルなスマッシュが武器です。'
  },
  {
    id: 'austin',
    name: 'オースティン',
    birthPlace: 'テキサス州（アメリカ）',
    warRecord:
      ['2023年 R-1グランプリ 2回戦敗退',
      '2024年 R-1グランプリ 1回戦敗退'],
    profile: '国際的な視点から卓球を楽しんでいます。'
  }
]
