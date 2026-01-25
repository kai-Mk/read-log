# read-log

積読本・読みたい本・読了本を管理し、読書状況を可視化するWebアプリケーション。

## 特徴

- **ログイン不要**: URLをブックマークするだけで使える
- **ISBN検索**: ISBNを入力すると書籍情報を自動取得
- **3つの状態管理**: 積読 / 読みたい / 読了
- **ユニークUI**: 状態に応じた視覚的な表示（積み重なる本、本棚、本屋さん風）
- **メモ機能**: 各本に感想や要点をメモ

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, SWR |
| Backend | Hono, Prisma, Node.js 22 |
| Database | PostgreSQL 16 |
| Testing | Vitest, React Testing Library, MSW |
| Package Manager | pnpm (workspace) |

## セットアップ

### 前提条件

- Node.js 22+
- pnpm 8+
- Docker & Docker Compose

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kai-Mk/read-log.git
cd read-log

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env

# データベースの起動
docker compose up -d

# マイグレーションの実行
pnpm --filter backend prisma migrate dev

# 開発サーバーの起動
pnpm dev
```

### 開発サーバー

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# テスト実行
pnpm test

# リント
pnpm lint

# 型チェック
pnpm type-check

# フォーマット
pnpm format
```

## プロジェクト構成

```
packages/
├── frontend/     # React SPA
├── backend/      # Hono API
└── shared/       # 共有型定義・zodスキーマ
```

詳細は [docs/repository-structure.md](./docs/repository-structure.md) を参照。

## ドキュメント

| ドキュメント | 説明 |
|-------------|------|
| [プロダクト要件定義書](./docs/product-requirements.md) | 機能要件、ユーザーストーリー |
| [機能設計書](./docs/functional-design.md) | データモデル、API仕様、画面仕様 |
| [アーキテクチャ設計書](./docs/architecture-design.md) | 技術スタック、環境構成 |
| [リポジトリ構造定義書](./docs/repository-structure.md) | ディレクトリ構造、依存関係 |
| [開発ガイドライン](./docs/development-guidelines.md) | コーディング規約、テスト方針 |

## ライセンス

MIT
