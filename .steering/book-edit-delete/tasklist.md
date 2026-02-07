# タスクリスト: 本の編集・削除

## 概要

- **機能**: F-04 本の編集・削除
- **設計書**: `.steering/book-edit-delete/design.md`
- **開始日**: 2026-02-07

## 進捗サマリー

- 全タスク数: 24
- 完了: 0
- 進行中: 0
- 未着手: 24

---

## Phase 1: バックエンド - 削除機能（Backend - Delete）

### 1.1 Repository

- [ ] **Red**: bookRepository.softDelete のテストを作成
  - 本を削除すると deletedAt が設定される
  - 存在しない本を削除するとエラーが発生する
- [ ] **Green**: bookRepository.softDelete を実装
- [ ] **Refactor**: Repository のリファクタリング

### 1.2 Service

- [ ] **Red**: bookService.deleteBook のテストを作成
  - 本を削除できる
  - 存在しない本を削除するとエラーが発生する
  - 異なるライブラリの本を削除するとエラーが発生する
- [ ] **Green**: bookService.deleteBook を実装
- [ ] **Refactor**: Service のリファクタリング

### 1.3 Controller

- [ ] **Red**: bookController.delete のテストを作成
  - 本を削除すると 200 と success: true が返る
  - 存在しない本を削除すると 404 が返る
- [ ] **Green**: bookController.delete を実装
- [ ] **Refactor**: Controller のリファクタリング

### 1.4 Route

- [ ] **Red**: DELETE /api/libraries/:libraryId/books/:bookId のE2Eテストを作成
- [ ] **Green**: ルーティングを実装
- [ ] **Refactor**: ルーティングのリファクタリング

---

## Phase 2: フロントエンド - 削除機能（Frontend - Delete）

### 2.1 Service

- [ ] **Red**: bookService.deleteBook のテストを作成（MSWでモック）
  - 本を削除できる
  - エラー時に FetchError が投げられる
- [ ] **Green**: bookService.deleteBook を実装
- [ ] **Refactor**: Service のリファクタリング

### 2.2 Hook

- [ ] **Red**: useDeleteBook のテストを作成
  - deleteBook を呼び出すと本が削除される
  - 成功時にキャッシュが更新される
  - エラー時に error が設定される
- [ ] **Green**: useDeleteBook を実装
- [ ] **Refactor**: Hook のリファクタリング

### 2.3 DeleteConfirmDialog コンポーネント

- [ ] **Red**: DeleteConfirmDialog のテストを作成
  - 確認メッセージが表示される
  - 「キャンセル」をクリックすると onCancel が呼ばれる
  - 「削除する」をクリックすると onConfirm が呼ばれる
- [ ] **Green**: DeleteConfirmDialog を実装
- [ ] **Refactor**: コンポーネントのリファクタリング

---

## Phase 3: フロントエンド - 編集機能（Frontend - Edit）

### 3.1 EditBookForm コンポーネント

- [ ] **Red**: EditBookForm のテストを作成
  - 初期値が表示される
  - タイトル、著者、表紙画像URL、ページ数、カテゴリを編集できる
  - 送信時に onSubmit が呼ばれる
  - キャンセル時に onCancel が呼ばれる
- [ ] **Green**: EditBookForm を実装
- [ ] **Refactor**: コンポーネントのリファクタリング

### 3.2 EditBookModal コンポーネント

- [ ] **Red**: EditBookModal のテストを作成
  - モーダルが表示される
  - 保存成功時に onSuccess が呼ばれる
  - キャンセル時に onClose が呼ばれる
- [ ] **Green**: EditBookModal を実装
- [ ] **Refactor**: コンポーネントのリファクタリング

---

## Phase 4: 統合（Integration）

### 4.1 BookDetailModal の更新

- [ ] **Red**: BookDetailModal のテストを更新
  - 「編集」ボタンをクリックすると EditBookModal が表示される
  - 「削除」ボタンをクリックすると DeleteConfirmDialog が表示される
- [ ] **Green**: BookDetailModal を更新
- [ ] **Refactor**: コンポーネントのリファクタリング

---

## 完了条件

- [ ] すべてのテストがパスしている
- [ ] ESLint/Prettier のエラーがない
- [ ] TypeScript の型エラーがない
- [ ] 設計書通りの動作が確認できる
- [ ] 削除時に確認ダイアログが表示される
- [ ] 編集モーダルで全項目が編集できる

---

## メモ

- 既存の BookForm を参考にして EditBookForm を作成
- 既存の useUpdateBook は編集でも使用可能
- 削除は既存の本一覧から消える（ソフトデリート）
