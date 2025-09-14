# TCUE-TT-Weakest-Tournament 
## 高崎経済大学卓球部 部内リーグ最終戦 告知サイト

高崎経済大学卓球部の「部内リーグ最終戦」のための告知・情報発信Webサイトです。

### 🏓 プロジェクト概要

このサイトは高崎経済大学卓球部で開催される部内リーグ最終戦の告知と情報発信を目的としています。

**掲載コンテンツ：**
- 🎯 大会の目的と意義
- 👤 参加選手のプロフィールと戦績
- 🗳️ 選手への投票機能（LocalStorage制御による1人1回投票）
- 📊 投票結果のリアルタイム表示（円グラフ・棒グラフ）
- 📝 大会に関するコラム・記事

### 🚀 技術スタック

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Language**: TypeScript (TSX)
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS + Tailwind CSS
- **Charts**: Recharts
- **Linting**: ESLint
- **Deployment**: Netlify

### 📋 セットアップ

#### 必要な環境
- Node.js (18.0.0以上推奨)
- npm または yarn

#### インストール手順

1. リポジトリをクローン
```bash
git clone https://github.com/ishigen425/TCUE-TT-Weakest-Tournament.git
cd TCUE-TT-Weakest-Tournament
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定（.envファイルを作成）
```bash
# .envファイルを作成
touch .env

# 以下の内容を.envファイルに追加
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. 開発サーバーを起動
```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで `http://localhost:5173` にアクセスしてください。

### 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番用ビルド
npm run build

# TypeScriptの型チェック
npm run type-check

# ビルドしたファイルをプレビュー
npm run preview

# ESLintでコードチェック
npm run lint
```

### 📁 プロジェクト構造

```
TCUE-TT-Weakest-Tournament/
├── public/                    # 静的ファイル（画像など）
├── src/                      # ソースコード
│   ├── App.tsx              # メインアプリケーションコンポーネント
│   ├── App.css              # アプリケーションのスタイル
│   ├── main.tsx             # エントリーポイント
│   ├── supabase.ts          # Supabase クライアント設定
│   ├── types.ts             # TypeScript 型定義
│   ├── data.ts              # 選手データ定義
│   ├── components/          # Reactコンポーネント
│   │   ├── PlayerProfile.tsx    # 選手プロフィール表示
│   │   ├── VoteChart.tsx        # 投票結果グラフ
│   │   ├── EndRollColumn.tsx    # エンドロール
│   │   └── ...              # その他のコンポーネント
│   └── assets/              # アセットファイル
├── supabase/                # Supabase設定
│   ├── migrations/          # データベースマイグレーション
│   └── seed.sql            # 初期データ
├── .github/workflows/       # GitHub Actions設定
├── index.html              # HTMLテンプレート
├── vite.config.ts          # Vite設定ファイル
├── tailwind.config.js      # Tailwind CSS設定
├── tsconfig.json           # TypeScript設定
└── package.json            # プロジェクト設定
```

### 🌐 デプロイ

このプロジェクトは**Netlify**でホスティングされており、以下のURLで公開されています。

**🌍 公開サイト**: https://lucent-marshmallow-9921dd.netlify.app/

#### 自動デプロイ
- `main` ブランチにプッシュすると自動的にNetlifyにデプロイされます
- GitHub Actionsを使用してビルドとデプロイを自動化しています
- 環境変数（Supabase設定）はGitHub SecretsとNetlify環境変数で管理されています

#### デプロイフロー
1. コードを`main`ブランチにプッシュ
2. GitHub Actionsが自動実行
3. 依存関係のインストールとビルド実行
4. Netlify CLIを使用してNetlifyにデプロイ

#### 手動デプロイ（ローカル環境から）
```bash
# 環境変数を設定
export VITE_SUPABASE_URL=your_supabase_url
export VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# ビルド実行
npm run build

# Netlify CLIでデプロイ（Netlify CLIのインストールが必要）
npx netlify-cli deploy --prod --dir=dist
```

### 🎨 開発ガイドライン

#### コーディング規約
- ESLintの設定に従ってください
- コンポーネントはPascalCaseで命名
- ファイル名は小文字とハイフンを使用
- CSSクラス名はkebab-caseを使用

#### コミットメッセージ
- 日本語または英語で簡潔に記述
- 変更内容が分かりやすいメッセージを心がける

### 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

### 📞 お問い合わせ

- Repository: [TCUE-TT-Weakest-Tournament](https://github.com/ishigen425/TCUE-TT-Weakest-Tournament)
- Issues: [GitHub Issues](https://github.com/ishigen425/TCUE-TT-Weakest-Tournament/issues)

---

**高崎経済大学卓球部 最弱決定戦** - 真の最弱を決める戦い 🏓
