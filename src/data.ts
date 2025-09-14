// 選手データ（定数）
import { Player } from './types';

export const PLAYERS: Player[] = [
  {
    id: 'kiuchi',
    name: '木内 碧輝',
    birthPlace: '沖縄（日本）',
    warRecord: 
      ['群馬県中学校総合体育大会 柔道競技 ベスト8'],
    profile: '粘り強いプレーが得意です。',
    coach: '阿部 優貴',
    profile_image: '/profile-kiuch.jpg'
  },
  {
    id: 'wakayama', 
    name: '若山 峻也',
    birthPlace: '群馬（日本）',
    warRecord:
      ['準備中'],
    profile: 'パワフルなスマッシュが武器です。',
    coach: '新井 つよし',
    profile_image: '/profile-waka.jpg'
  },
  {
    id: 'austin',
    name: '佐々木オースティン玲央',
    birthPlace: 'テキサス州（アメリカ）',
    warRecord:
      ['2023年 R-1グランプリ 2回戦敗退',
      '2024年 R-1グランプリ 1回戦敗退'],
    profile: '国際的な視点から卓球を楽しんでいます。',
    coach: '石川 元暉',
    profile_image: '/profile-aus.jpg'
  }
]
