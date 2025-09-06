# GitHub Copilot Instructions for TCUE-TT-Weakest-Tournament

## プロジェクト概要
高崎経済大学卓球部 最弱決定戦のウェブアプリ。React + Vite + Supabaseを使用。

## Supabase設定
- Supabaseプロジェクト: https://eeldtlmtzxxcbraehzgs.supabase.co
- 認証: anon keyを使用
- データベース: PostgreSQL

### 環境変数 (.env)
```
VITE_SUPABASE_URL=https://eeldtlmtzxxcbraehzgs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbGR0bG10enh4Y2JyYWVoemdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzg3MTksImV4cCI6MjA3MjcxNDcxOX0.hzJLxAeYbe8bvPgBhmODribkvgmoIjoFceTv7IcZZ28
```

### データベーススキーマ
#### playersテーブル
```sql
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### サンプルデータ
```sql
INSERT INTO players (name, profile) VALUES
('木内', '粘り強いプレーが得意です。'),
('若山', 'パワフルなスマッシュが武器です。'),
('オースティン', '国際的な視点から卓球を楽しんでいます。');
```

## アプリ構造
- `src/supabase.js`: Supabaseクライアント設定
- `src/App.jsx`: メインコンポーネント、Supabaseからデータを取得
- `src/components/PlayerProfile.jsx`: 選手プロフィール表示コンポーネント
- `src/components/PlayerProfile.css`: プロフィールスタイル

### 主要機能
- 選手一覧の動的取得
- ナビゲーションの動的生成
- 選手プロフィールの表示

## 開発手順
1. Supabaseプロジェクトの設定
2. 環境変数の設定
3. データベースマイグレーションの実行
4. シードデータの挿入
5. アプリの開発・テスト

## デプロイ
- ホスティング: Netlify
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
- GitHub連携で自動デプロイ

## 注意点
- 環境変数は`.env`ファイルに保存し、`.gitignore`で除外
- Supabaseのanon keyは公開可能
- データはSupabaseから動的に取得
- コンポーネントは再利用可能

## 拡張アイデア
- 認証機能の追加
- 選手データの編集機能
- 試合結果の管理
- 画像アップロード機能
