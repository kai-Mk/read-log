# F-07: ユニークUI表示 タスクリスト

## 概要

本の状態に応じたユニークなUIで表示する機能を実装する。

## Phase 1: ViewTabs コンポーネント

### 1.1 ビュー切り替えタブ

- [ ] **Red**: アクティブなタブが強調表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/ViewTabs.test.tsx`
  - テストケース: `アクティブなタブがハイライトされる`

- [ ] **Green**: ViewTabs を実装する
  - ファイル: `packages/frontend/src/features/books/components/ViewTabs.tsx`

- [ ] **Red**: タブをクリックするとonChangeが呼ばれることをテストする
  - テストケース: `タブをクリックするとonChangeが呼ばれる`

- [ ] **Green**: onChange コールバックを実装

- [ ] **Red**: 4つのタブ（すべて/積読/読みたい/読了）が表示されることをテストする
  - テストケース: `すべて、積読、読みたい、読了の4つのタブが表示される`

- [ ] **Green**: 4つのタブを実装

## Phase 2: AllBooksView コンポーネント

### 2.1 すべてビュー

- [ ] **Red**: 全ての本が表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/AllBooksView.test.tsx`
  - テストケース: `全ての本がグリッド形式で表示される`

- [ ] **Green**: AllBooksView を実装する（既存のBookList相当）
  - ファイル: `packages/frontend/src/features/books/components/AllBooksView.tsx`

- [ ] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `本がない場合は空状態メッセージが表示される`

- [ ] **Green**: 空状態を実装

- [ ] **Red**: 本をクリックするとonBookClickが呼ばれることをテストする
  - テストケース: `本をクリックするとonBookClickが呼ばれる`

- [ ] **Green**: onBookClick を実装

## Phase 3: UnreadView コンポーネント

### 3.1 積読ビュー

- [ ] **Red**: 積読の本のみ表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/UnreadView.test.tsx`
  - テストケース: `statusがunreadの本のみ表示される`

- [ ] **Green**: UnreadView を実装する
  - ファイル: `packages/frontend/src/features/books/components/UnreadView.tsx`

- [ ] **Red**: 本が積み重なるUIで表示されることをテストする
  - テストケース: `本が積み重なるスタイルで表示される`

- [ ] **Green**: 積み重なるUIを実装（CSSで斜めに重ねる）

- [ ] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `積読の本がない場合は空状態メッセージが表示される`

- [ ] **Green**: 空状態を実装

## Phase 4: WishlistView コンポーネント

### 4.1 読みたいビュー

- [ ] **Red**: 読みたい本のみ表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/WishlistView.test.tsx`
  - テストケース: `statusがwishlistの本のみ表示される`

- [ ] **Green**: WishlistView を実装する
  - ファイル: `packages/frontend/src/features/books/components/WishlistView.tsx`

- [ ] **Red**: 本屋さん風UIで表示されることをテストする
  - テストケース: `本が本屋さん風のスタイルで表示される`

- [ ] **Green**: 本屋さん風UIを実装（表紙を大きく見せる）

- [ ] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `読みたい本がない場合は空状態メッセージが表示される`

- [ ] **Green**: 空状態を実装

## Phase 5: CompletedView コンポーネント

### 5.1 読了ビュー

- [ ] **Red**: 読了の本のみ表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/CompletedView.test.tsx`
  - テストケース: `statusがcompletedの本のみ表示される`

- [ ] **Green**: CompletedView を実装する
  - ファイル: `packages/frontend/src/features/books/components/CompletedView.tsx`

- [ ] **Red**: 本棚風UIで表示されることをテストする
  - テストケース: `本が本棚風のスタイルで表示される`

- [ ] **Green**: 本棚風UIを実装（背表紙を並べる）

- [ ] **Red**: 本がない場合は空状態が表示されることをテストする
  - テストケース: `読了の本がない場合は空状態メッセージが表示される`

- [ ] **Green**: 空状態を実装

## Phase 6: LibraryPage統合

### 6.1 ビュー切り替え機能

- [ ] **Red**: ViewTabsが表示されることをテストする
  - テストファイル: `packages/frontend/src/pages/LibraryPage.test.tsx`
  - テストケース: `ビュー切り替えタブが表示される`

- [ ] **Green**: LibraryPage に ViewTabs を追加

- [ ] **Red**: タブ切り替えで対応するビューが表示されることをテストする
  - テストケース: `積読タブをクリックするとUnreadViewが表示される`
  - テストケース: `読みたいタブをクリックするとWishlistViewが表示される`
  - テストケース: `読了タブをクリックするとCompletedViewが表示される`
  - テストケース: `すべてタブをクリックするとAllBooksViewが表示される`

- [ ] **Green**: 条件分岐でビュー切り替えを実装

- [ ] **Red**: 各ビューでonBookClickが動作することをテストする
  - テストケース: `各ビューで本をクリックすると詳細モーダルが開く`

- [ ] **Green**: onBookClick を各ビューに渡す

## Phase 7: Refactor

- [ ] 共通スタイルの抽出
- [ ] アニメーション・トランジションの追加
- [ ] レスポンシブ対応の確認

## 完了条件

- [ ] 積読の本は本が積み重なっている状態で表示される
- [ ] 読了の本は本棚に整理されている状態で表示される
- [ ] 読みたい本は本屋さんに並んでいる感じで表示される
- [ ] 各ビュー間でスムーズに切り替えられる
- [ ] 全テストがパスする
- [ ] ESLint/TypeScriptエラーがない
