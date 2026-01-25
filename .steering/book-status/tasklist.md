# F-03: 本の状態管理 タスクリスト

## 概要

本の状態（積読/読みたい/読了）を変更できる機能を実装する。

## Phase 1: Backend - Repository層

### 1.1 bookRepository.update メソッド

- [ ] **Red**: 本を更新できることをテストする
  - テストファイル: `packages/backend/src/repositories/bookRepository.test.ts`
  - テストケース: `updateで本の情報を更新できる`

- [ ] **Green**: bookRepository.update を実装する
  - ファイル: `packages/backend/src/repositories/bookRepository.ts`

- [ ] **Red**: 存在しない本の更新はnullを返すことをテストする
  - テストケース: `updateで存在しない本はnullを返す`

- [ ] **Green**: 存在しない本の場合はnullを返す実装

## Phase 2: Backend - Service層

### 2.1 bookService.updateBook メソッド

- [ ] **Red**: 本を更新できることをテストする
  - テストファイル: `packages/backend/src/services/bookService.test.ts`
  - テストケース: `updateBookで本の情報を更新できる`

- [ ] **Green**: bookService.updateBook を実装する
  - ファイル: `packages/backend/src/services/bookService.ts`

- [ ] **Red**: 存在しないライブラリの場合はエラーを投げることをテストする
  - テストケース: `updateBookでライブラリが存在しない場合はNotFoundErrorを投げる`

- [ ] **Green**: ライブラリ存在チェックを実装

- [ ] **Red**: 存在しない本の場合はエラーを投げることをテストする
  - テストケース: `updateBookで本が存在しない場合はNotFoundErrorを投げる`

- [ ] **Green**: 本の存在チェックを実装

- [ ] **Red**: 他のライブラリの本は更新できないことをテストする
  - テストケース: `updateBookで他のライブラリの本は更新できない`

- [ ] **Green**: ライブラリIDの整合性チェックを実装

## Phase 3: Backend - Controller層

### 3.1 bookController.update ハンドラ

- [ ] **Red**: 本を更新するAPIをテストする
  - テストファイル: `packages/backend/src/controllers/bookController.test.ts`
  - テストケース: `PUT /api/libraries/:libraryId/books/:bookIdで本を更新できる`

- [ ] **Green**: bookController.update を実装する
  - ファイル: `packages/backend/src/controllers/bookController.ts`

- [ ] **Red**: バリデーションエラーをテストする
  - テストケース: `PUT /api/libraries/:libraryId/books/:bookIdでバリデーションエラーを返す`

- [ ] **Green**: バリデーションミドルウェアを設定

## Phase 4: Backend - Route層

### 4.1 PUT /:bookId ルート

- [ ] **Red**: ルートが正しく設定されていることをテストする
  - テストファイル: `packages/backend/src/routes/index.test.ts` or integration test
  - テストケース: PUT /api/libraries/:libraryId/books/:bookId が正しくルーティングされる

- [ ] **Green**: booksRoutes に PUT /:bookId を追加
  - ファイル: `packages/backend/src/routes/books.ts`

## Phase 5: Frontend - Service層

### 5.1 bookService.updateBook メソッド

- [ ] **Red**: 本を更新するAPIを呼び出せることをテストする
  - テストファイル: `packages/frontend/src/features/books/services/bookService.test.ts`
  - テストケース: `updateBookで本を更新できる`

- [ ] **Green**: bookService.updateBook を実装する
  - ファイル: `packages/frontend/src/features/books/services/bookService.ts`

- [ ] **Red**: エラー時にFetchErrorを投げることをテストする
  - テストケース: `updateBookでエラー時にFetchErrorを投げる`

- [ ] **Green**: エラーハンドリングを実装

## Phase 6: Frontend - Hook層

### 6.1 useUpdateBook hook

- [ ] **Red**: updateBook関数が本を更新できることをテストする
  - テストファイル: `packages/frontend/src/features/books/hooks/useUpdateBook.test.ts`
  - テストケース: `updateBookで本を更新できる`

- [ ] **Green**: useUpdateBook を実装する
  - ファイル: `packages/frontend/src/features/books/hooks/useUpdateBook.ts`

- [ ] **Red**: ローディング状態が管理されることをテストする
  - テストケース: `更新中はisLoadingがtrueになる`

- [ ] **Green**: ローディング状態を実装

- [ ] **Red**: エラー状態が管理されることをテストする
  - テストケース: `エラー時にerrorが設定される`

- [ ] **Green**: エラー状態を実装

- [ ] **Red**: 成功時にキャッシュが更新されることをテストする
  - テストケース: `更新成功時にSWRキャッシュが更新される`

- [ ] **Green**: mutate によるキャッシュ更新を実装

## Phase 7: Frontend - Components

### 7.1 StatusDropdown コンポーネント

- [ ] **Red**: 現在のステータスが選択されていることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/StatusDropdown.test.tsx`
  - テストケース: `現在のステータスが選択状態で表示される`

- [ ] **Green**: StatusDropdown を実装する
  - ファイル: `packages/frontend/src/features/books/components/StatusDropdown.tsx`

- [ ] **Red**: ステータスを変更できることをテストする
  - テストケース: `ステータスを選択するとonChangeが呼ばれる`

- [ ] **Green**: onChange コールバックを実装

- [ ] **Red**: ローディング中は無効化されることをテストする
  - テストケース: `disabled=trueの場合は操作できない`

- [ ] **Green**: disabled プロパティを実装

### 7.2 BookDetailModal コンポーネント

- [ ] **Red**: 本の詳細が表示されることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/BookDetailModal.test.tsx`
  - テストケース: `本のタイトル、著者、表紙が表示される`

- [ ] **Green**: BookDetailModal を実装する
  - ファイル: `packages/frontend/src/features/books/components/BookDetailModal.tsx`

- [ ] **Red**: ステータスを変更できることをテストする
  - テストケース: `StatusDropdownでステータスを変更できる`

- [ ] **Green**: StatusDropdown と useUpdateBook を統合

- [ ] **Red**: 更新中はローディング状態になることをテストする
  - テストケース: `ステータス変更中はドロップダウンが無効化される`

- [ ] **Green**: ローディング状態のUI実装

- [ ] **Red**: 更新成功時にonSuccessが呼ばれることをテストする
  - テストケース: `更新成功時にonSuccessコールバックが呼ばれる`

- [ ] **Green**: onSuccess コールバックを実装

- [ ] **Red**: 閉じるボタンでモーダルが閉じることをテストする
  - テストケース: `閉じるボタンをクリックするとonCloseが呼ばれる`

- [ ] **Green**: onClose コールバックを実装

### 7.3 BookCard クリックイベント

- [ ] **Red**: クリックでonClickが呼ばれることをテストする
  - テストファイル: `packages/frontend/src/features/books/components/BookCard.test.tsx`
  - テストケース: `カードをクリックするとonClickが呼ばれる`

- [ ] **Green**: BookCard に onClick プロパティを追加
  - ファイル: `packages/frontend/src/features/books/components/BookCard.tsx`

## Phase 8: Frontend - Page統合

### 8.1 LibraryPage

- [ ] **Red**: BookCardクリックでBookDetailModalが開くことをテストする
  - テストファイル: `packages/frontend/src/pages/LibraryPage.test.tsx`
  - テストケース: `本カードをクリックすると詳細モーダルが開く`

- [ ] **Green**: LibraryPage に BookDetailModal を統合
  - ファイル: `packages/frontend/src/pages/LibraryPage.tsx`

- [ ] **Red**: ステータス変更後に本一覧が更新されることをテストする
  - テストケース: `ステータス変更後に本一覧が再取得される`

- [ ] **Green**: onSuccess で mutate を呼び出す

## Phase 9: Refactor

- [ ] 重複コードの削除
- [ ] 命名の見直し
- [ ] 型定義の整理

## 完了条件

- [ ] 積読・読みたい・読了の3つの状態を切り替えられる
- [ ] 状態変更すると該当するビューに本が移動する（※ビュー切り替えタブは別issue）
- [ ] 全テストがパスする
- [ ] ESLint/TypeScriptエラーがない
