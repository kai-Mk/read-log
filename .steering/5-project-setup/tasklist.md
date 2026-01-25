# タスクリスト: プロジェクト初期セットアップ

## 概要

- **機能**: プロジェクト初期セットアップ
- **Issue**: #5
- **ブランチ**: 5-project-setup
- **設計書**: `.steering/5-project-setup/design.md`
- **開始日**: 2026-01-25

---

## Phase 1: モノレポ構成

### 1.1 pnpm workspace

- [ ] `pnpm-workspace.yaml` を作成
- [ ] ルート `package.json` を作成（workspaceスクリプト定義）

### 1.2 パッケージディレクトリ

- [ ] `packages/frontend/` ディレクトリ作成
- [ ] `packages/backend/` ディレクトリ作成
- [ ] `packages/shared/` ディレクトリ作成

### 1.3 TypeScript設定

- [ ] `tsconfig.base.json` を作成（共通設定）
- [ ] `packages/frontend/tsconfig.json` を作成
- [ ] `packages/backend/tsconfig.json` を作成
- [ ] `packages/shared/tsconfig.json` を作成

### 1.4 各パッケージのpackage.json

- [ ] `packages/frontend/package.json` を作成
- [ ] `packages/backend/package.json` を作成
- [ ] `packages/shared/package.json` を作成

---

## Phase 2: 開発ツール

### 2.1 ESLint

- [ ] `.eslintrc.js` を作成
- [ ] ESLint関連パッケージをインストール

### 2.2 Prettier

- [ ] `.prettierrc` を作成
- [ ] `.prettierignore` を作成

### 2.3 husky + lint-staged

- [ ] husky, lint-staged をインストール
- [ ] `pnpm exec husky init` を実行
- [ ] `.husky/pre-commit` を設定
- [ ] `package.json` に lint-staged 設定を追加

### 2.4 Vitest

- [ ] `packages/frontend/vite.config.ts` にテスト設定を追加
- [ ] `packages/backend/vitest.config.ts` を作成

---

## Phase 3: Frontend初期化

### 3.1 Vite + React

- [ ] Vite関連パッケージをインストール
- [ ] `packages/frontend/vite.config.ts` を作成
- [ ] `packages/frontend/index.html` を作成
- [ ] `packages/frontend/src/main.tsx` を作成
- [ ] `packages/frontend/src/App.tsx` を作成

### 3.2 Tailwind CSS

- [ ] Tailwind関連パッケージをインストール
- [ ] `packages/frontend/tailwind.config.js` を作成
- [ ] `packages/frontend/postcss.config.js` を作成
- [ ] `packages/frontend/src/index.css` を作成

---

## Phase 4: Backend初期化

### 4.1 Hono

- [ ] Hono関連パッケージをインストール
- [ ] `packages/backend/src/index.ts` を作成（Hello World API）

### 4.2 Prisma

- [ ] Prisma関連パッケージをインストール
- [ ] `pnpm --filter backend exec prisma init` を実行
- [ ] `packages/backend/prisma/schema.prisma` を確認

---

## Phase 5: Shared初期化

- [ ] `packages/shared/src/index.ts` を作成
- [ ] zodをインストール

---

## Phase 6: インフラ

### 6.1 Docker

- [ ] `docker-compose.yml` を作成（PostgreSQL）

### 6.2 環境変数

- [ ] `.env.example` を作成
- [ ] `.gitignore` に `.env` を追加

---

## Phase 7: CI/CD

- [ ] `.github/workflows/ci.yml` を作成
  - lint ジョブ
  - type-check ジョブ
  - test ジョブ

---

## Phase 8: 動作確認

- [ ] `pnpm install` が成功する
- [ ] `pnpm dev` でfrontend/backendが起動する
- [ ] `pnpm lint` が成功する
- [ ] `pnpm type-check` が成功する
- [ ] `pnpm test` が成功する
- [ ] `docker compose up -d` でPostgreSQLが起動する
- [ ] コミット時にlint-stagedが実行される

---

## 完了条件

- [ ] すべてのタスクが完了している
- [ ] `pnpm install && pnpm dev` で開発サーバーが起動する
- [ ] `pnpm lint && pnpm type-check && pnpm test` がすべてパスする
- [ ] コミット時に自動フォーマットが実行される
