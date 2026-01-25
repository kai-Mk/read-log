# タスクリスト: プロジェクト初期セットアップ

## 概要

- **機能**: プロジェクト初期セットアップ
- **Issue**: #5
- **ブランチ**: 5-project-setup
- **設計書**: `.steering/5-project-setup/design.md`
- **開始日**: 2026-01-25

---

## Phase 1: モノレポ構成 ✅

### 1.1 pnpm workspace

- [x] `pnpm-workspace.yaml` を作成
- [x] ルート `package.json` を作成（workspaceスクリプト定義）

### 1.2 パッケージディレクトリ

- [x] `packages/frontend/` ディレクトリ作成
- [x] `packages/backend/` ディレクトリ作成
- [x] `packages/shared/` ディレクトリ作成

### 1.3 TypeScript設定

- [x] `tsconfig.base.json` を作成（共通設定）
- [x] `packages/frontend/tsconfig.json` を作成
- [x] `packages/backend/tsconfig.json` を作成
- [x] `packages/shared/tsconfig.json` を作成

### 1.4 各パッケージのpackage.json

- [x] `packages/frontend/package.json` を作成
- [x] `packages/backend/package.json` を作成
- [x] `packages/shared/package.json` を作成

---

## Phase 2: 開発ツール ✅

### 2.1 ESLint

- [x] `.eslintrc.cjs` を作成（ESM対応のため.cjs）
- [x] ESLint関連パッケージをインストール

### 2.2 Prettier

- [x] `.prettierrc` を作成
- [x] `.prettierignore` を作成

### 2.3 husky + lint-staged

- [x] husky, lint-staged をインストール
- [x] `npx husky install` を実行
- [x] `.husky/pre-commit` を設定
- [x] `package.json` に lint-staged 設定を追加

### 2.4 Vitest

- [x] `packages/frontend/vitest.config.ts` を作成
- [x] `packages/backend/vitest.config.ts` を作成

---

## Phase 3: Frontend初期化 ✅

### 3.1 Vite + React

- [x] Vite関連パッケージをインストール
- [x] `packages/frontend/vite.config.ts` を作成
- [x] `packages/frontend/index.html` を作成
- [x] `packages/frontend/src/main.tsx` を作成
- [x] `packages/frontend/src/App.tsx` を作成

### 3.2 Tailwind CSS

- [x] Tailwind関連パッケージをインストール
- [x] `packages/frontend/tailwind.config.js` を作成
- [x] `packages/frontend/postcss.config.js` を作成
- [x] `packages/frontend/src/index.css` を作成

---

## Phase 4: Backend初期化 ✅

### 4.1 Hono

- [x] Hono関連パッケージをインストール
- [x] `packages/backend/src/index.ts` を作成（Hello World API）

### 4.2 Prisma

- [x] Prisma関連パッケージをインストール
- [x] `npx prisma init` を実行
- [x] `packages/backend/prisma/schema.prisma` を確認

---

## Phase 5: Shared初期化 ✅

- [x] `packages/shared/src/index.ts` を作成
- [x] zodをインストール

---

## Phase 6: インフラ ✅

### 6.1 Docker

- [x] `docker-compose.yml` を作成（PostgreSQL）

### 6.2 環境変数

- [x] `.env.example` を作成
- [x] `.gitignore` に `.env` を追加

---

## Phase 7: CI/CD ✅

- [x] `.github/workflows/ci.yml` を作成
  - lint ジョブ
  - type-check ジョブ
  - test ジョブ

---

## Phase 8: 動作確認 ✅

- [x] `pnpm install` が成功する
- [x] `pnpm dev` でfrontend/backendが起動する
- [x] `pnpm lint` が成功する
- [x] `pnpm type-check` が成功する
- [x] `pnpm test` が成功する
- [x] `docker compose up -d` でPostgreSQLが起動する
- [x] コミット時にlint-stagedが実行される

---

## 完了条件

- [x] すべてのタスクが完了している
- [x] `pnpm install && pnpm dev` で開発サーバーが起動する
- [x] `pnpm lint && pnpm type-check && pnpm test` がすべてパスする
- [x] コミット時に自動フォーマットが実行される
