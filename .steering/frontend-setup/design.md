# Frontend パッケージ設計書

## 機能概要

Vite + React + TypeScript でフロントエンドの基盤を構築する。共通コンポーネント、hooks、ディレクトリ構成を整備し、機能開発の土台を作成する。

## 関連ドキュメント

- [PRD](../../docs/product-requirements.md)
- [アーキテクチャ設計](../../docs/architecture-design.md) - フロントエンドセクション
- [リポジトリ構造](../../docs/repository-structure.md) - Frontend セクション

## 実装対象

### Phase 1: Vite + React 初期化

| ファイル                         | 説明                  |
| -------------------------------- | --------------------- |
| packages/frontend/package.json   | 依存関係定義          |
| packages/frontend/vite.config.ts | Vite設定（React SWC） |
| packages/frontend/tsconfig.json  | TypeScript設定        |
| packages/frontend/index.html     | HTMLエントリポイント  |
| packages/frontend/src/main.tsx   | Reactエントリポイント |
| packages/frontend/src/App.tsx    | ルートコンポーネント  |

### Phase 2: Tailwind CSS

| ファイル                             | 説明               |
| ------------------------------------ | ------------------ |
| packages/frontend/tailwind.config.js | Tailwind設定       |
| packages/frontend/postcss.config.js  | PostCSS設定        |
| packages/frontend/src/index.css      | グローバルスタイル |

### Phase 3: React Router + SWR

| ファイル                                    | 説明             |
| ------------------------------------------- | ---------------- |
| packages/frontend/src/App.tsx               | ルーティング設定 |
| packages/frontend/src/pages/TopPage.tsx     | トップページ     |
| packages/frontend/src/pages/LibraryPage.tsx | マイ書庫ページ   |
| packages/frontend/src/utils/fetcher.ts      | SWR用fetcher     |

### Phase 4: 共通コンポーネント

| ファイル                                     | 説明                 |
| -------------------------------------------- | -------------------- |
| packages/frontend/src/components/Button.tsx  | ボタンコンポーネント |
| packages/frontend/src/components/Input.tsx   | 入力フィールド       |
| packages/frontend/src/components/Modal.tsx   | モーダル             |
| packages/frontend/src/components/Loading.tsx | ローディング表示     |

### Phase 5: 共通hooks

| ファイル                                          | 説明                 |
| ------------------------------------------------- | -------------------- |
| packages/frontend/src/hooks/useLocalStorage.ts    | LocalStorage管理     |
| packages/frontend/src/hooks/useCopyToClipboard.ts | クリップボードコピー |

### Phase 6: ディレクトリ構成

| ディレクトリ                            | 説明           |
| --------------------------------------- | -------------- |
| packages/frontend/src/features/library/ | マイ書庫機能   |
| packages/frontend/src/features/books/   | 本の管理機能   |
| packages/frontend/src/features/memos/   | メモ機能       |
| packages/frontend/src/types/            | 型定義         |
| packages/frontend/src/utils/            | ユーティリティ |

## 依存関係

### 本番依存

- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0
- swr: ^2.2.0
- @read-log/shared: workspace:\*

### 開発依存

- vite: ^5.0.0
- @vitejs/plugin-react-swc: ^3.5.0
- typescript: ^5.3.0
- tailwindcss: ^3.3.0
- postcss: ^8.4.0
- autoprefixer: ^10.4.0
- vitest: ^1.0.0
- @testing-library/react: ^14.1.0
- @testing-library/jest-dom: ^6.1.0
- jsdom: ^23.0.0

## 注意点

- strict modeを有効にする
- React SWCプラグインで高速コンパイル
- Tailwind JITモード有効
- テストファイルは対象と同じディレクトリに配置
- featuresディレクトリにはcomponents, hooks, servicesサブディレクトリを作成
