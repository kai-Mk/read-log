# タスクリスト: 本の編集・削除

## 概要

- **機能**: F-04 本の編集・削除
- **設計書**: `.steering/book-edit-delete/design.md`
- **開始日**: 2026-02-07

## 進捗サマリー

- 全タスク数: 24
- 完了: 24
- 進行中: 0
- 未着手: 0

---

## Phase 1: バックエンド - 削除機能（Backend - Delete）

### 1.1 Repository

- [x] **Red**: bookRepository.softDelete のテストを作成
  - 本を削除すると deletedAt が設定される
  - 存在しない本を削除するとエラーが発生する
- [x] **Green**: bookRepository.softDelete を実装
- [x] **Refactor**: Repository のリファクタリング

### 1.2 Service

- [x] **Red**: bookService.deleteBook のテストを作成
  - 本を削除できる
  - 存在しない本を削除するとエラーが発生する
  - 異なるライブラリの本を削除するとエラーが発生する
- [x] **Green**: bookService.deleteBook を実装
- [x] **Refactor**: Service のリファクタリング

### 1.3 Controller

- [x] **Red**: bookController.delete のテストを作成
  - 本を削除すると 200 と success: true が返る
  - 存在しない本を削除すると 404 が返る
- [x] **Green**: bookController.delete を実装
- [x] **Refactor**: Controller のリファクタリング

### 1.4 Route

- [x] **Red**: DELETE /api/libraries/:libraryId/books/:bookId のE2Eテストを作成
- [x] **Green**: ルーティングを実装
- [x] **Refactor**: ルーティングのリファクタリング

---

## Phase 2: フロントエンド - 削除機能（Frontend - Delete）

### 2.1 Service

- [x] **Red**: bookService.deleteBook のテストを作成（MSWでモック）
  - 本を削除できる
  - エラー時に FetchError が投げられる
- [x] **Green**: bookService.deleteBook を実装
- [x] **Refactor**: Service のリファクタリング

### 2.2 Hook

- [x] **Red**: useDeleteBook のテストを作成
  - deleteBook を呼び出すと本が削除される
  - 成功時にキャッシュが更新される
  - エラー時に error が設定される
- [x] **Green**: useDeleteBook を実装
- [x] **Refactor**: Hook のリファクタリング

### 2.3 DeleteConfirmDialog コンポーネント

- [x] **Red**: DeleteConfirmDialog のテストを作成
  - 確認メッセージが表示される
  - 「キャンセル」をクリックすると onCancel が呼ばれる
  - 「削除する」をクリックすると onConfirm が呼ばれる
- [x] **Green**: DeleteConfirmDialog を実装
- [x] **Refactor**: コンポーネントのリファクタリング

---

## Phase 3: フロントエンド - 編集機能（Frontend - Edit）

### 3.1 EditBookForm コンポーネント

- [x] **Red**: EditBookForm のテストを作成
  - 初期値が表示される
  - タイトル、著者、表紙画像URL、ページ数、カテゴリを編集できる
  - 送信時に onSubmit が呼ばれる
  - キャンセル時に onCancel が呼ばれる
- [x] **Green**: EditBookForm を実装
- [x] **Refactor**: コンポーネントのリファクタリング

### 3.2 EditBookModal コンポーネント

- [x] **Red**: EditBookModal のテストを作成
  - モーダルが表示される
  - 保存成功時に onSuccess が呼ばれる
  - キャンセル時に onClose が呼ばれる
- [x] **Green**: EditBookModal を実装
- [x] **Refactor**: コンポーネントのリファクタリング

---

## Phase 4: 統合（Integration）

### 4.1 BookDetailModal の更新

- [x] **Red**: BookDetailModal のテストを更新
  - 「編集」ボタンをクリックすると EditBookModal が表示される
  - 「削除」ボタンをクリックすると DeleteConfirmDialog が表示される
- [x] **Green**: BookDetailModal を更新
- [x] **Refactor**: コンポーネントのリファクタリング

---

## 完了条件

- [x] すべてのテストがパスしている
- [x] ESLint/Prettier のエラーがない
- [x] TypeScript の型エラーがない
- [x] 設計書通りの動作が確認できる
- [x] 削除時に確認ダイアログが表示される
- [x] 編集モーダルで全項目が編集できる

---

## メモ

- 既存の BookForm を参考にして EditBookForm を作成
- 既存の useUpdateBook は編集でも使用可能
- 削除は既存の本一覧から消える（ソフトデリート）
