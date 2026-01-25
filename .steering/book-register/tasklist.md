# F-02: 本の登録 タスクリスト

## Phase 1: Backend - Book Repository ✅

### テストケース: bookRepository.test.ts

- [x] `create`: 本を作成できる
- [x] `create`: libraryIdが存在しない場合はエラーを投げる
- [x] `findById`: IDで本を取得できる
- [x] `findById`: 存在しないIDの場合はnullを返す
- [x] `findById`: 削除済み（deletedAt != null）の場合はnullを返す
- [x] `findByLibraryId`: ライブラリIDで本一覧を取得できる
- [x] `findByLibraryId`: statusでフィルタできる
- [x] `findByLibraryId`: categoryでフィルタできる
- [x] `findByLibraryId`: タイトル・著者で検索できる

### 実装

- [x] bookRepository.ts 実装（create, findById, findByLibraryId）

## Phase 2: Backend - Book Service ✅

### テストケース: bookService.test.ts

- [x] `createBook`: 本を作成できる
- [x] `createBook`: ライブラリが存在しない場合はNotFoundErrorを投げる
- [x] `getBook`: 本を取得できる
- [x] `getBook`: 存在しない場合はNotFoundErrorを投げる
- [x] `getBooks`: ライブラリの本一覧を取得できる
- [x] `getBooks`: ライブラリが存在しない場合はNotFoundErrorを投げる
- [x] `getBooks`: フィルタとsearchを適用できる

### 実装

- [x] bookService.ts 実装

## Phase 3: Backend - ISBN Service ✅

### テストケース: isbnService.test.ts

- [x] `searchByIsbn`: Google Books APIから書籍情報を取得できる
- [x] `searchByIsbn`: 見つからない場合はnullを返す
- [x] `searchByIsbn`: APIエラー時はnullを返す
- [x] `mapCategory`: categoriesからcategoryをマッピングできる

### 実装

- [x] isbnService.ts 実装

## Phase 4: Backend - Controllers & Routes ✅

### テストケース: bookController.test.ts

- [x] `POST /api/libraries/:libraryId/books`: 201を返し、本が作成される
- [x] `POST /api/libraries/:libraryId/books`: タイトルが空の場合は400を返す
- [x] `POST /api/libraries/:libraryId/books`: ライブラリが存在しない場合は404を返す
- [x] `GET /api/libraries/:libraryId/books`: 200を返し、本一覧を返す
- [x] `GET /api/libraries/:libraryId/books`: statusでフィルタできる
- [x] `GET /api/libraries/:libraryId/books`: ライブラリが存在しない場合は404を返す

### テストケース: isbnController.test.ts

- [x] `GET /api/isbn/:isbn`: 200を返し、書籍情報を返す
- [x] `GET /api/isbn/:isbn`: 見つからない場合は404を返す

### 実装

- [x] bookController.ts 実装
- [x] isbnController.ts 実装
- [x] routes/books.ts 実装
- [x] routes/isbn.ts 実装
- [x] routes/index.ts にルート追加
- [ ] API動作確認（curl/httpie）

## Phase 5: Frontend - Services ✅

### テストケース: bookService.test.ts

- [x] `createBook`: POST /api/libraries/:libraryId/books を呼び出す
- [x] `createBook`: 作成された本を返す
- [x] `getBooks`: GET /api/libraries/:libraryId/books を呼び出す
- [x] `getBooks`: 本一覧を返す
- [x] `getBooks`: クエリパラメータを渡せる

### テストケース: isbnService.test.ts

- [x] `searchByIsbn`: GET /api/isbn/:isbn を呼び出す
- [x] `searchByIsbn`: 書籍情報を返す
- [x] `searchByIsbn`: 404の場合はnullを返す

### 実装

- [x] features/books/services/bookService.ts 実装
- [x] features/books/services/isbnService.ts 実装

## Phase 6: Frontend - Hooks ✅

### テストケース: useBooks.test.ts

- [x] libraryIdを渡すと本一覧を取得する
- [x] 取得中は`isLoading`がtrueになる
- [x] 取得成功時に`data`に本一覧がセットされる
- [x] フィルタ条件を変更すると再取得する

### テストケース: useCreateBook.test.ts

- [x] `createBook`関数を返す
- [x] `createBook`呼び出しでAPIを呼び出す
- [x] 成功時に作成された本を返す
- [x] `isLoading`が正しく更新される
- [x] エラー時に`error`がセットされる
- [x] 成功時にuseBooksのキャッシュをmutateする

### テストケース: useIsbnSearch.test.ts

- [x] `search`関数を返す
- [x] `search`呼び出しでAPIを呼び出す
- [x] 成功時に書籍情報を返す
- [x] 見つからない場合はnullを返す
- [x] `isSearching`が正しく更新される

### 実装

- [x] hooks/useBooks.ts 実装
- [x] hooks/useCreateBook.ts 実装
- [x] hooks/useIsbnSearch.ts 実装

## Phase 7: Frontend - Components

### テストケース: BookCard.test.tsx

- [ ] 本のタイトルが表示される
- [ ] 本の著者が表示される
- [ ] 表紙画像が表示される（存在する場合）
- [ ] 表紙画像がない場合はプレースホルダーが表示される
- [ ] ステータスバッジが表示される

### テストケース: BookList.test.tsx

- [ ] 本一覧が表示される
- [ ] 本がない場合は空状態メッセージが表示される
- [ ] ローディング中はスケルトンが表示される

### テストケース: BookForm.test.tsx

- [ ] タイトル入力欄が表示される
- [ ] 著者入力欄が表示される
- [ ] ステータス選択が表示される
- [ ] カテゴリ選択が表示される
- [ ] タイトルが空の場合はバリデーションエラーを表示する
- [ ] 送信時にonSubmitが呼ばれる

### テストケース: AddBookModal.test.tsx

- [ ] モーダルタイトルが表示される
- [ ] ISBN検索タブが表示される
- [ ] 手動入力タブが表示される
- [ ] ISBN入力して検索ボタンを押すと検索される
- [ ] 検索結果がフォームに自動入力される
- [ ] 検索結果がない場合はメッセージが表示される
- [ ] 登録ボタンを押すと本が登録される
- [ ] 登録成功後にモーダルが閉じる
- [ ] キャンセルボタンでモーダルが閉じる

### 実装

- [ ] components/BookCard.tsx 実装
- [ ] components/BookList.tsx 実装
- [ ] components/BookForm.tsx 実装
- [ ] components/AddBookModal.tsx 実装

## Phase 8: Frontend - Page Integration

### テストケース: LibraryPage.test.tsx（追加）

- [ ] 「本を追加」ボタンが表示される
- [ ] ボタンをクリックするとAddBookModalが開く
- [ ] 本一覧が表示される

### 実装

- [ ] LibraryPage.tsx 更新（本一覧表示、追加ボタン追加）
- [ ] 画面動作確認

## Phase 9: 統合テスト

- [ ] シナリオ: ISBNで本を検索し、登録できる
- [ ] シナリオ: 手動入力で本を登録できる
- [ ] シナリオ: 登録した本が一覧に表示される
- [ ] 全テスト実行（pnpm test）
- [ ] lint/type-check確認
