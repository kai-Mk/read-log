# F-07: ユニークUI表示 タスクリスト

## 概要

本の状態に応じたユニークなUIで表示する機能を実装する。

## Phase 1: ViewTabs コンポーネント

### 1.1 ビュー切り替えタブ

- [x] **Red**: アクティブなタブが強調表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/ViewTabs.test.tsx`
  - テストケース: `アクティブなタブがハイライトされる`

- [x] **Green**: ViewTabs を実装する
  - ファイル: `packages/frontend/src/features/books/components/ViewTabs.tsx`

- [x] **Red**: タブをクリックするとonChangeが呼ばれることをテストする
  - テストケース: `タブをクリックするとonChangeが呼ばれる`

- [x] **Green**: onChange コールバックを実装

- [x] **Red**: 4つのタブ（すべて/積読/読みたい/読了）が表示されることをテストする
  - テストケース: `すべて、積読、読みたい、読了の4つのタブが表示される`

- [x] **Green**: 4つのタブを実装

## Phase 2: AllBooksView コンポーネント

### 2.1 すべてビュー

- [x] **Red**: 全ての本が表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/AllBooksView.test.tsx`
  - テストケース: `全ての本がグリッド形式で表示される`

- [x] **Green**: AllBooksView を実装する（既存のBookList相当）
  - ファイル: `packages/frontend/src/features/books/components/AllBooksView.tsx`

- [x] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `本がない場合は空状態メッセージが表示される`

- [x] **Green**: 空状態を実装

- [x] **Red**: 本をクリックするとonBookClickが呼ばれることをテストする
  - テストケース: `本をクリックするとonBookClickが呼ばれる`

- [x] **Green**: onBookClick を実装

## Phase 3: UnreadView コンポーネント

### 3.1 積読ビュー

- [x] **Red**: 積読の本のみ表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/UnreadView.test.tsx`
  - テストケース: `statusがunreadの本のみ表示される`

- [x] **Green**: UnreadView を実装する
  - ファイル: `packages/frontend/src/features/books/components/UnreadView.tsx`

- [x] **Red**: 本が積み重なるUIで表示されることをテストする
  - テストケース: `本が積み重なるスタイルで表示される`

- [x] **Green**: 積み重なるUIを実装（CSSで斜めに重ねる）

- [x] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `積読の本がない場合は空状態メッセージが表示される`

- [x] **Green**: 空状態を実装

## Phase 4: WishlistView コンポーネント

### 4.1 読みたいビュー

- [x] **Red**: 読みたい本のみ表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/WishlistView.test.tsx`
  - テストケース: `statusがwishlistの本のみ表示される`

- [x] **Green**: WishlistView を実装する
  - ファイル: `packages/frontend/src/features/books/components/WishlistView.tsx`

- [x] **Red**: 本屋さん風UIで表示されることをテストする
  - テストケース: `本が本屋さん風のスタイルで表示される`

- [x] **Green**: 本屋さん風UIを実装（表紙を大きく見せる）

- [x] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `読みたい本がない場合は空状態メッセージが表示される`

- [x] **Green**: 空状態を実装

## Phase 5: CompletedView コンポーネント

### 5.1 読了ビュー

- [x] **Red**: 読了の本のみ表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/CompletedView.test.tsx`
  - テストケース: `statusがcompletedの本のみ表示される`

- [x] **Green**: CompletedView を実装する
  - ファイル: `packages/frontend/src/features/books/components/CompletedView.tsx`

- [x] **Red**: 本棚風UIで表示されることをテストする
  - テストケース: `本が本棚風のスタイルで表示される`

- [x] **Green**: 本棚風UIを実装（背表紙を並べる）

- [x] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `読了の本がない場合は空状態メッセージが表示される`

- [x] **Green**: 空状態を実装

## Phase 6: LibraryPage統合

### 6.1 ビュー切り替え機能

- [x] **Red**: ViewTabsが表示されることをテストする
  - テストファイル: `packages/frontend/src/pages/LibraryPage.test.tsx`
  - テストケース: `ビュー切り替えタブが表示される`

- [x] **Green**: LibraryPage に ViewTabs を追加

- [x] **Red**: タブ切り替えで対応するビューが表示されることをテストする
  - テストケース: `積読タブをクリックするとUnreadViewが表示される`
  - テストケース: `読みたいタブをクリックするとWishlistViewが表示される`
  - テストケース: `読了タブをクリックするとCompletedViewが表示される`
  - テストケース: `すべてタブをクリックするとAllBooksViewが表示される`

- [x] **Green**: 条件分岐でビュー切り替えを実装

- [x] **Red**: 各ビューでonBookClickが動作することをテストする
  - テストケース: `各ビューで本をクリックすると詳細モーダルが開く`

- [x] **Green**: onBookClick を各ビューに渡す

## Phase 7: Refactor

- [x] 共通スタイルの抽出
- [x] アニメーション・トランジションの追加
- [x] レスポンシブ対応の確認

## 完了条件

- [x] 積読の本は本が積み重なっている状態で表示される
- [x] 読了の本は本棚に整理されている状態で表示される
- [x] 読みたい本は本屋さんに並んでいる感じで表示される
- [x] 各ビュー間でスムーズに切り替えられる
- [x] 全テストがパスする
- [x] ESLint/TypeScriptエラーがない
