// 選手データ（定数）
import { Player } from './types';

export const PLAYERS: Player[] = [
  {
    id: 'kiuchi',
    name: '木内 碧輝',
    birthPlace: '沖縄（日本）',
    warRecord: 
      [
        '上毛ジュニア俳壇 2006年 優秀作品賞 受賞',
        '前橋市民柔道大会 軽量級 優勝',
        '高校卓球関東大会 ベンチメンバー',
        '芋ソムリエ アドバンスド 取得',
        '基本情報技術者試験 受験',
        '日商簿記3級 受験',
        '高崎市民卓球大会 混合複 準優勝'
      ],
    strong_point: '切れ味バツグンのカット',
    coach: '阿部 優貴',
    coach_comment: '日を追うごとによくはなっているが、もう1歩前に足が出てこない。\nサーブの回転数は上がっているから上積みを狙っていきたい',
    profile_image: '/profile-kiuch.jpg'
  },
  {
    id: 'wakayama', 
    name: '若山 峻也',
    birthPlace: '群馬（日本）',
    warRecord:
      [
        '中学校教諭免許状【社会】 取得',
        'インテリアコーディネーター 取得'
      ],
    strong_point: 'パワフルなスマッシュ',
    coach: '新井 つよし',
    coach_comment: '週一のキックボクシングで体力面に不安はない。久々の試合だが対応力は高いし、良い状態で臨めると思います。',
    profile_image: '/profile-waka.jpg'
  },
  {
    id: 'austin',
    name: '佐々木オースティン玲央',
    birthPlace: 'テキサス州（アメリカ）',
    warRecord:
      [
        'R-1グランプリ2024 2回戦進出',
        '基本情報技術者試験 合格',
        '英検2級 取得'
      ],
    strong_point: 'チキータ',
    coach: '石川 元暉',
    coach_comment: '日々マシン練習には取り組んでいるので、いつものプレーができれば結果もついてくるはず。',
    profile_image: '/profile-aus.jpg'
  }
]
