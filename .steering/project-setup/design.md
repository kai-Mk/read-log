# 機能設計書: プロジェクト初期セットアップ

## 1. 機能概要

開発を開始するためのモノレポ構成、開発ツール、インフラ、CI/CDを構築する。

## 2. 関連ドキュメント

- アーキテクチャ: `docs/architecture-design.md` - 技術スタック、環境構成
- リポジトリ構造: `docs/repository-structure.md` - ディレクトリ構造
- 開発ガイドライン: `docs/development-guidelines.md` - ESLint/Prettier設定、CI/CD

## 3. 実装対象

### ルートディレクトリ

| ファイルパス | 種類 | 責務 |
| ------------ | ---- | ---- |
| `package.json` | 設定 | ルートパッケージ、workspaceスクリプト |
| `pnpm-workspace.yaml` | 設定 | pnpm workspace定義 |
| `tsconfig.base.json` | 設定 | 共通TypeScript設定 |
| `.eslintrc.js` | 設定 | ESLint設定 |
| `.prettierrc` | 設定 | Prettier設定 |
| `.gitignore` | 設定 | Git除外設定 |
| `docker-compose.yml` | 設定 | PostgreSQL |
| `.env.example` | 設定 | 環境変数テンプレート |

### packages/frontend

| ファイルパス | 種類 | 責務 |
| ------------ | ---- | ---- |
| `package.json` | 設定 | フロントエンド依存関係 |
| `tsconfig.json` | 設定 | TypeScript設定（base継承） |
| `vite.config.ts` | 設定 | Vite設定 |
| `tailwind.config.js` | 設定 | Tailwind CSS設定 |
| `postcss.config.js` | 設定 | PostCSS設定 |
| `index.html` | エントリ | HTMLテンプレート |
| `src/main.tsx` | エントリ | Reactエントリーポイント |
| `src/App.tsx` | コンポーネント | ルートコンポーネント |

### packages/backend

| ファイルパス | 種類 | 責務 |
| ------------ | ---- | ---- |
| `package.json` | 設定 | バックエンド依存関係 |
| `tsconfig.json` | 設定 | TypeScript設定（base継承） |
| `src/index.ts` | エントリ | Honoエントリーポイント |
| `prisma/schema.prisma` | 設定 | Prismaスキーマ（空） |

### packages/shared

| ファイルパス | 種類 | 責務 |
| ------------ | ---- | ---- |
| `package.json` | 設定 | 共有パッケージ |
| `tsconfig.json` | 設定 | TypeScript設定（base継承） |
| `src/index.ts` | エントリ | エクスポート |

### husky + lint-staged

| ファイルパス | 種類 | 責務 |
| ------------ | ---- | ---- |
| `.husky/pre-commit` | フック | コミット前にlint-staged実行 |

### CI/CD

| ファイルパス | 種類 | 責務 |
| ------------ | ---- | ---- |
| `.github/workflows/ci.yml` | ワークフロー | lint, type-check, test |

## 4. 依存関係

### ルート（devDependencies）

- typescript
- eslint + plugins
- prettier
- husky
- lint-staged

### Frontend

- react, react-dom
- vite, @vitejs/plugin-react-swc
- tailwindcss, postcss, autoprefixer
- vitest, @testing-library/react

### Backend

- hono, @hono/node-server
- prisma, @prisma/client
- vitest

### Shared

- zod

## 5. 注意点

- Node.js 22を使用
- pnpm 8+を使用
- strictモードを有効にする
- パッケージ間の参照は`workspace:*`を使用
