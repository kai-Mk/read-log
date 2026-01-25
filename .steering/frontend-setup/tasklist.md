# Frontend パッケージ構築 タスクリスト

## Phase 1: Vite + React 初期化 ✅

- [x] package.json作成（依存関係定義）
- [x] vite.config.ts作成（React SWCプラグイン）
- [x] tsconfig.json作成（strict mode）
- [x] index.html作成
- [x] src/main.tsx作成（Reactエントリポイント）
- [x] src/App.tsx作成（ルートコンポーネント）
- [x] 動作確認

## Phase 2: Tailwind CSS ✅

- [x] tailwind.config.js作成
- [x] postcss.config.js作成
- [x] src/index.css作成（Tailwindディレクティブ）
- [x] App.tsxでスタイル確認

## Phase 3: React Router + SWR ✅

- [x] React Router設定（App.tsx）
- [x] src/pages/TopPage.tsx作成
- [x] src/pages/LibraryPage.tsx作成
- [x] src/utils/fetcher.ts作成（SWR用）
- [x] ルーティング動作確認

## Phase 4: 共通コンポーネント ✅

- [x] src/components/Button.tsx + テスト
- [x] src/components/Input.tsx + テスト
- [x] src/components/Modal.tsx + テスト
- [x] src/components/Loading.tsx + テスト

## Phase 5: 共通hooks ✅

- [x] src/hooks/useLocalStorage.ts + テスト
- [x] src/hooks/useCopyToClipboard.ts + テスト

## Phase 6: ディレクトリ構成 + 統合 ✅

- [x] features/library/ディレクトリ構成
- [x] features/books/ディレクトリ構成
- [x] features/memos/ディレクトリ構成
- [x] src/types/ディレクトリ作成
- [x] 全体テスト実行
- [x] lint/type-check確認
