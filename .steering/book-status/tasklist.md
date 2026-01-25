# F-03: 本の状態管理 タスクリスト

## 概要

本の状態（積読/読みたい/読了）を変更できる機能を実装する。

## Phase 1: Backend - Repository層

### 1.1 bookRepository.update メソッド

- [x] **Red**: 本を更新できることをテストする
  - テストファイル: `packages/backend/src/repositories/bookRepository.test.ts`
  - テストケース: `updateで本の情報を更新できる`

- [x] **Green**: bookRepository.update を実装する
  - ファイル: `packages/backend/src/repositories/bookRepository.ts`

- [x] **Red**: 存在しない本の更新はnullを返すことをテストする
  - テストケース: `updateで存在しない本はnullを返す`

- [x] **Green**: 存在しない本の場合はnullを返す実装

## Phase 2: Backend - Service層

### 2.1 bookService.updateBook メソッド

- [x] **Red**: 本を更新できることをテストする
  - テストファイル: `packages/backend/src/services/bookService.test.ts`
  - テストケース: `updateBookで本の情報を更新できる`

- [x] **Green**: bookService.updateBook を実装する
  - ファイル: `packages/backend/src/services/bookService.ts`

- [x] **Red**: 存在しないライブラリの場合はエラーを投げることをテストする
  - テストケース: `updateBookでライブラリが存在しない場合はNotFoundErrorを投げる`

- [x] **Green**: ライブラリ存在チェックを実装

- [x] **Red**: 存在しない本の場合はエラーを投げることをテストする
  - テストケース: `updateBookで本が存在しない場合はNotFoundErrorを投げる`

- [x] **Green**: 本の存在チェックを実装

- [x] **Red**: 他のライブラリの本は更新できないことをテストする
  - テストケース: `updateBookで他のライブラリの本は更新できない`

- [x] **Green**: ライブラリIDの整合性チェックを実装

## Phase 3: Backend - Controller層

### 3.1 bookController.update ハンドラ

- [x] **Red**: 本を更新するAPIをテストする
  - テストファイル: `packages/backend/src/controllers/bookController.test.ts`
  - テストケース: `PUT /api/libraries/:libraryId/books/:bookIdで本を更新できる`

- [x] **Green**: bookController.update を実装する
  - ファイル: `packages/backend/src/controllers/bookController.ts`

- [x] **Red**: バリデーションエラーをテストする
  - テストケース: `PUT /api/libraries/:libraryId/books/:bookIdでバリデーションエラーを返す`

- [x] **Green**: バリデーションミドルウェアを設定

## Phase 4: Backend - Route層

### 4.1 PUT /:bookId ルート

- [x] **Red**: ルートが正しく設定されていることをテストする
  - テストファイル: `packages/backend/src/routes/index.test.ts` or integration test
  - テストケース: PUT /api/libraries/:libraryId/books/:bookId が正しくルーティングされる

- [x] **Green**: booksRoutes に PUT /:bookId を追加
  - ファイル: `packages/backend/src/routes/books.ts`

## Phase 5: Frontend - Service層

### 5.1 bookService.updateBook メソッド

- [x] **Red**: 本を更新するAPIを呼び出せることをテストする
  - テストファイル: `packages/frontend/src/features/books/services/bookService.test.ts`
  - テストケース: `updateBookで本を更新できる`

- [x] **Green**: bookService.updateBook を実装する
  - ファイル: `packages/frontend/src/features/books/services/bookService.ts`

- [x] **Red**: エラー時にFetchErrorを投げることをテストする
  - テストケース: `updateBookでエラー時にFetchErrorを投げる`

- [x] **Green**: エラーハンドリングを実装

## Phase 6: Frontend - Hook層

### 6.1 useUpdateBook hook

- [x] **Red**: updateBook関数が本を更新できることをテストする
  - テストファイル: `packages/frontend/src/features/books/hooks/useUpdateBook.test.tsx`
  - テストケース: `updateBookで本を更新できる`

- [x] **Green**: useUpdateBook を実装する
  - ファイル: `packages/frontend/src/features/books/hooks/useUpdateBook.ts`

- [x] **Red**: ローディング状態が管理されることをテストする
  - テストケース: `更新中はisLoadingがtrueになる`

- [x] **Green**: ローディング状態を実装

- [x] **Red**: エラー状態が管理されることをテストする
  - テストケース: `エラー時にerrorが設定される`

- [x] **Green**: エラー状態を実装

- [x] **Red**: 成功時にキャッシュが更新されることをテストする
  - テストケース: `更新成功時にSWRキャッシュが更新される`

- [x] **Green**: mutate によるキャッシュ更新を実装

## Phase 7: Frontend - Components

### 7.1 StatusDropdown コンポーネント

- [x] **Red**: 現在のステータスが選択されていることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/StatusDropdown.test.tsx`
  - テストケース: `現在のステータスが選択状態で表示される`

- [x] **Green**: StatusDropdown を実装する
  - ファイル: `packages/frontend/src/features/books/components/StatusDropdown.tsx`

- [x] **Red**: ステータスを変更できることをテストする
  - テストケース: `ステータスを選択するとonChangeが呼ばれる`

- [x] **Green**: onChange コールバックを実装

- [x] **Red**: ローディング中は無効化されることをテストする
  - テストケース: `disabled=trueの場合は操作できない`

- [x] **Green**: disabled プロパティを実装

### 7.2 BookDetailModal コンポーネント

- [x] **Red**: 本の詳細が表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/BookDetailModal.test.tsx`
  - テストケース: `本のタイトル、著者、表紙が表示される`

- [x] **Green**: BookDetailModal を実装する
  - ファイル: `packages/frontend/src/features/books/components/BookDetailModal.tsx`

- [x] **Red**: ステータスを変更できることをテストする
  - テストケース: `StatusDropdownでステータスを変更できる`

- [x] **Green**: StatusDropdown と useUpdateBook を統合

- [x] **Red**: 更新中はローディング状態になることをテストする
  - テストケース: `ステータス変更中はドロップダウンが無効化される`

- [x] **Green**: ローディング状態のUI実装

- [x] **Red**: 更新成功時にonSuccessが呼ばれることをテストする
  - テストケース: `更新成功時にonSuccessコールバックが呼ばれる`

- [x] **Green**: onSuccess コールバックを実装

- [x] **Red**: 閉じるボタンでモーダルが閉じることをテストする
  - テストケース: `閉じるボタンをクリックするとonCloseが呼ばれる`

- [x] **Green**: onClose コールバックを実装

### 7.3 BookCard クリックイベント

- [x] **Red**: クリックでonClickが呼ばれることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/BookCard.test.tsx`
  - テストケース: `カードをクリックするとonClickが呼ばれる`

- [x] **Green**: BookCard に onClick プロパティを追加
  - ファイル: `packages/frontend/src/features/books/components/BookCard.tsx`

## Phase 8: Frontend - Page統合

### 8.1 LibraryPage

- [x] **Red**: BookCardクリックでBookDetailModalが開くことをテストする
  - テストファイル: `packages/frontend/src/pages/LibraryPage.test.tsx`
  - テストケース: `本カードをクリックすると詳細モーダルが開く`

- [x] **Green**: LibraryPage に BookDetailModal を統合
  - ファイル: `packages/frontend/src/pages/LibraryPage.tsx`

- [x] **Red**: ステータス変更後に本一覧が更新されることをテストする
  - テストケース: `ステータス変更後に本一覧が再取得される`

- [x] **Green**: onSuccess で mutate を呼び出す

## Phase 9: Refactor

- [x] 重複コードの削除
- [x] 命名の見直し
- [x] 型定義の整理

## 完了条件

- [x] 積読・読みたい・読了の3つの状態を切り替えられる
- [x] 状態変更すると該当するビューに本が移動する（※ビュー切り替えタブは別issue）
- [x] 全テストがパスする
- [x] ESLint/TypeScriptエラーがない
