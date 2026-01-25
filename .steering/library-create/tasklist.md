# F-01: マイ書庫の作成 タスクリスト

## Phase 1: Backend - Repository ✅

### テストケース: libraryRepository.test.ts

- [x] `create`: マイ書庫を作成できる
- [x] `findById`: IDでマイ書庫を取得できる
- [x] `findById`: 存在しないIDの場合はnullを返す
- [x] `findById`: 削除済み（deletedAt != null）の場合はnullを返す
- [x] `update`: マイ書庫の名前を更新できる

### 実装

- [x] libraryRepository.ts 実装（create, findById, update）

## Phase 2: Backend - Service ✅

### テストケース: libraryService.test.ts

- [x] `createLibrary`: マイ書庫を作成できる
- [x] `getLibrary`: マイ書庫を取得できる
- [x] `getLibrary`: 存在しない場合はNotFoundErrorを投げる
- [x] `updateLibrary`: マイ書庫を更新できる
- [x] `updateLibrary`: 存在しない場合はNotFoundErrorを投げる

### 実装

- [x] libraryService.ts 実装

## Phase 3: Backend - Controller & Routes ✅

### テストケース: libraryController.test.ts

- [x] `POST /api/libraries`: 201を返し、マイ書庫が作成される
- [x] `POST /api/libraries`: 名前が空の場合は400を返す
- [x] `POST /api/libraries`: 名前が100文字を超える場合は400を返す
- [x] `GET /api/libraries/:id`: 200を返し、マイ書庫情報を返す
- [x] `GET /api/libraries/:id`: 存在しない場合は404を返す
- [x] `PUT /api/libraries/:id`: 200を返し、マイ書庫が更新される
- [x] `PUT /api/libraries/:id`: 存在しない場合は404を返す

### 実装

- [x] libraryController.ts 実装
- [x] routes/libraries.ts 実装
- [x] routes/index.ts にルート追加
- [x] API動作確認（curl/httpie）

## Phase 4: Frontend - Service ✅

### テストケース: libraryService.test.ts

- [x] `createLibrary`: POST /api/libraries を呼び出す
- [x] `createLibrary`: 作成されたマイ書庫を返す
- [x] `getLibrary`: GET /api/libraries/:id を呼び出す
- [x] `getLibrary`: マイ書庫情報を返す
- [x] `getLibrary`: 404の場合はエラーを投げる

### 実装

- [x] features/library/services/libraryService.ts 実装

## Phase 5: Frontend - Hooks ✅

### テストケース: useCreateLibrary.test.ts

- [x] `createLibrary`関数を返す
- [x] `createLibrary`呼び出しでAPIを呼び出す
- [x] 成功時に作成されたマイ書庫を返す
- [x] `isLoading`が正しく更新される
- [x] エラー時に`error`がセットされる

### テストケース: useLibrary.test.ts

- [x] libraryIdを渡すとマイ書庫を取得する
- [x] 取得中は`isLoading`がtrueになる
- [x] 取得成功時に`data`にマイ書庫情報がセットされる
- [x] 404の場合は`error`がセットされる

### 実装

- [x] hooks/useCreateLibrary.ts 実装
- [x] hooks/useLibrary.ts 実装

## Phase 6: Frontend - Pages ✅

### テストケース: TopPage.test.tsx

- [x] 書庫名の入力欄が表示される
- [x] 「マイ書庫を作成」ボタンが表示される
- [x] 書庫名を入力して作成ボタンを押すとAPIが呼ばれる
- [x] 作成成功後、/library/:id へ遷移する
- [x] 作成中はボタンがローディング状態になる
- [x] 名前が空の場合はバリデーションエラーを表示する

### テストケース: LibraryPage.test.tsx

- [x] マイ書庫の名前が表示される
- [x] 取得中はローディングが表示される
- [x] 存在しないIDの場合はエラーメッセージを表示する

### 実装

- [x] TopPage.tsx 更新（名前入力欄追加、API連携）
- [x] LibraryPage.tsx 更新（マイ書庫情報表示）
- [x] 画面動作確認

## Phase 7: 統合テスト

- [ ] シナリオ: 新しいマイ書庫を作成し、ページに遷移できる
- [ ] シナリオ: 既存のマイ書庫IDでアクセスできる
- [ ] 全テスト実行（pnpm test）
- [ ] lint/type-check確認
