# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

read-log は積読本・読みたい本・読了本を管理するWebアプリケーション。スペック駆動開発・TDDを実践するプロジェクト。

## 技術スタック

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + SWR
- **Backend**: Hono + Prisma + Node.js 22
- **Database**: PostgreSQL 16
- **Testing**: Vitest + React Testing Library + MSW
- **Package Manager**: pnpm (workspace)

## 開発コマンド（予定）

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev                    # frontend + backend 同時起動
pnpm --filter frontend dev  # frontend のみ
pnpm --filter backend dev   # backend のみ

# テスト
pnpm test                   # 全テスト実行
pnpm test -- --watch        # watchモード
pnpm --filter frontend test # frontend のみ
pnpm --filter backend test  # backend のみ

# リント・型チェック
pnpm lint
pnpm type-check

# データベース
pnpm --filter backend prisma migrate dev    # マイグレーション実行
pnpm --filter backend prisma studio         # Prisma Studio起動
```

## アーキテクチャ

### モノレポ構成

```
packages/
├── frontend/     # React SPA
├── backend/      # Hono API
└── shared/       # 共有型定義・zodスキーマ
```

### Frontend レイヤー

pages → features/{機能}/components → hooks → services

- `features/`: 機能ごとのモジュール（library, books, memos）
- `pages/`: TopPage, LibraryPage のみ（本の登録・詳細・編集はモーダル）
- `components/`: 共通UI（Button, Input, Modal）

### Backend レイヤー

routes → controllers → services → repositories → Prisma

### 依存ルール

- 上位から下位への一方向依存のみ許可
- features間の直接依存禁止
- sharedは全レイヤーから参照可能

## コーディング規約

### 命名規則

- コンポーネント・型: PascalCase（`BookList`, `CreateBookRequest`）
- 関数・変数・hooks: camelCase（`getBooks`, `useBooks`）
- export定数: UPPER_SNAKE_CASE（`MAX_BOOKS`）
- ファイル: コンポーネントはPascalCase、その他はcamelCase

### テスト

- TDD: Red → Green → Refactor サイクルで実装
- テストファイルは対象と同じディレクトリに配置（`BookList.test.tsx`）
- 命名: `should [動作] when [条件]`
- 構造: Arrange-Act-Assert パターン

## カスタムコマンド

- `/setup-project`: 初期設計ドキュメント一括作成
- `/add-feature <機能説明>`: 機能開発用の設計書・タスクリスト作成
  - 例: `/add-feature マイ書庫の作成` → `.steering/20260125-library-create/`

## ドキュメント

設計ドキュメントは `docs/` に配置:

- `product-requirements.md`: プロダクト要件定義
- `functional-design.md`: 機能設計（データモデル、API仕様、画面仕様）
- `architecture-design.md`: 技術スタック、環境構成
- `repository-structure.md`: ディレクトリ構造、レイヤー間データフロー
- `development-guidelines.md`: コーディング規約、テスト方針
