# F-01: マイ書庫の作成 タスクリスト

## Phase 1: Backend - Repository

### テストケース: libraryRepository.test.ts

- [ ] `create`: マイ書庫を作成できる
- [ ] `findById`: IDでマイ書庫を取得できる
- [ ] `findById`: 存在しないIDの場合はnullを返す
- [ ] `findById`: 削除済み（deletedAt != null）の場合はnullを返す
- [ ] `update`: マイ書庫の名前を更新できる

### 実装

- [ ] libraryRepository.ts 実装（create, findById, update）

## Phase 2: Backend - Service

### テストケース: libraryService.test.ts

- [ ] `createLibrary`: マイ書庫を作成できる
- [ ] `getLibrary`: マイ書庫を取得できる
- [ ] `getLibrary`: 存在しない場合はNotFoundErrorを投げる
- [ ] `updateLibrary`: マイ書庫を更新できる
- [ ] `updateLibrary`: 存在しない場合はNotFoundErrorを投げる

### 実装

- [ ] libraryService.ts 実装

## Phase 3: Backend - Controller & Routes

### テストケース: libraryController.test.ts

- [ ] `POST /api/libraries`: 201を返し、マイ書庫が作成される
- [ ] `POST /api/libraries`: 名前が空の場合は400を返す
- [ ] `POST /api/libraries`: 名前が100文字を超える場合は400を返す
- [ ] `GET /api/libraries/:id`: 200を返し、マイ書庫情報を返す
- [ ] `GET /api/libraries/:id`: 存在しない場合は404を返す
- [ ] `PUT /api/libraries/:id`: 200を返し、マイ書庫が更新される
- [ ] `PUT /api/libraries/:id`: 存在しない場合は404を返す

### 実装

- [ ] libraryController.ts 実装
- [ ] routes/libraries.ts 実装
- [ ] routes/index.ts にルート追加
- [ ] API動作確認（curl/httpie）

## Phase 4: Frontend - Service

### テストケース: libraryService.test.ts

- [ ] `createLibrary`: POST /api/libraries を呼び出す
- [ ] `createLibrary`: 作成されたマイ書庫を返す
- [ ] `getLibrary`: GET /api/libraries/:id を呼び出す
- [ ] `getLibrary`: マイ書庫情報を返す
- [ ] `getLibrary`: 404の場合はエラーを投げる

### 実装

- [ ] features/library/services/libraryService.ts 実装

## Phase 5: Frontend - Hooks

### テストケース: useCreateLibrary.test.ts

- [ ] `createLibrary`関数を返す
- [ ] `createLibrary`呼び出しでAPIを呼び出す
- [ ] 成功時に作成されたマイ書庫を返す
- [ ] `isLoading`が正しく更新される
- [ ] エラー時に`error`がセットされる

### テストケース: useLibrary.test.ts

- [ ] libraryIdを渡すとマイ書庫を取得する
- [ ] 取得中は`isLoading`がtrueになる
- [ ] 取得成功時に`data`にマイ書庫情報がセットされる
- [ ] 404の場合は`error`がセットされる

### 実装

- [ ] hooks/useCreateLibrary.ts 実装
- [ ] hooks/useLibrary.ts 実装

## Phase 6: Frontend - Pages

### テストケース: TopPage.test.tsx

- [ ] 書庫名の入力欄が表示される
- [ ] 「マイ書庫を作成」ボタンが表示される
- [ ] 書庫名を入力して作成ボタンを押すとAPIが呼ばれる
- [ ] 作成成功後、/library/:id へ遷移する
- [ ] 作成中はボタンがローディング状態になる
- [ ] 名前が空の場合はバリデーションエラーを表示する

### テストケース: LibraryPage.test.tsx

- [ ] マイ書庫の名前が表示される
- [ ] 取得中はローディングが表示される
- [ ] 存在しないIDの場合はエラーメッセージを表示する

### 実装

- [ ] TopPage.tsx 更新（名前入力欄追加、API連携）
- [ ] LibraryPage.tsx 更新（マイ書庫情報表示）
- [ ] 画面動作確認

## Phase 7: 統合テスト

- [ ] シナリオ: 新しいマイ書庫を作成し、ページに遷移できる
- [ ] シナリオ: 既存のマイ書庫IDでアクセスできる
- [ ] 全テスト実行（pnpm test）
- [ ] lint/type-check確認
