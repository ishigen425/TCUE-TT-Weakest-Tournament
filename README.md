# TCUE-TT-Weakest-Tournament 
## 高崎経済大学卓球部 最弱決定戦 告知サイト

高崎経済大学卓球部の「最弱決定戦」のための告知・情報発信Webサイトです。

### 🏓 プロジェクト概要

このサイトは高崎経済大学卓球部で開催される最弱決定戦の告知と情報発信を目的としています。

**掲載予定コンテンツ：**
- 🎯 大会の目的と意義
- 👤 参加選手のプロフィールと戦績
- 📝 大会に関するコラム・記事
- 📊 試合結果と統計

### 🚀 技術スタック

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Language**: JavaScript (JSX)
- **Styling**: CSS
- **Linting**: ESLint
- **Deployment**: GitHub Pages

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

3. 開発サーバーを起動
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

# ビルドしたファイルをプレビュー
npm run preview

# ESLintでコードチェック
npm run lint
```

### 📁 プロジェクト構造

```
TCUE-TT-Weakest-Tournament/
├── public/                 # 静的ファイル
├── src/                   # ソースコード
│   ├── App.jsx           # メインアプリケーションコンポーネント
│   ├── App.css           # アプリケーションのスタイル
│   ├── index.css         # グローバルスタイル
│   └── main.jsx          # エントリーポイント
├── index.html            # HTMLテンプレート
├── vite.config.js        # Vite設定ファイル
├── eslint.config.js      # ESLint設定ファイル
└── package.json          # プロジェクト設定
```

### 🌐 デプロイ

このプロジェクトはGitHub Pagesにデプロイされます。

**デプロイ先URL**: https://ishigen425.github.io/TCUE-TT-Weakest-Tournament/

#### 自動デプロイ
- `main` ブランチにプッシュすると自動的にGitHub Pagesにデプロイされます
- GitHub Actionsを使用してビルドとデプロイを自動化しています

#### 手動デプロイ
```bash
# ビルド実行
npm run build

# distフォルダの内容をgh-pagesブランチにデプロイ
# (GitHub Pagesの設定が必要)
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
