# タスクリスト: shared パッケージの構築

## 概要

- **機能**: shared パッケージの構築
- **Issue**: #6
- **ブランチ**: 6-shared-setup
- **設計書**: `.steering/shared-setup/design.md`
- **開始日**: 2026-01-25

---

## Phase 1: 定数の作成

### 1.1 constants/index.ts

- [ ] Red: BOOK_STATUS定数のテストを作成
- [ ] Green: BOOK_STATUS定数を実装
- [ ] Red: BOOK_CATEGORY定数のテストを作成
- [ ] Green: BOOK_CATEGORY定数を実装
- [ ] Refactor: 必要に応じてリファクタリング

---

## Phase 2: 型定義の作成

### 2.1 types/library.ts

- [ ] Library型を定義
- [ ] CreateLibraryRequest型を定義
- [ ] UpdateLibraryRequest型を定義

### 2.2 types/book.ts

- [ ] BookStatus型を定義
- [ ] BookCategory型を定義
- [ ] Book型を定義
- [ ] CreateBookRequest型を定義
- [ ] UpdateBookRequest型を定義

### 2.3 types/memo.ts

- [ ] Memo型を定義
- [ ] CreateMemoRequest型を定義
- [ ] UpdateMemoRequest型を定義

### 2.4 types/api.ts

- [ ] ErrorResponse型を定義
- [ ] APIレスポンス型を定義

### 2.5 types/index.ts

- [ ] 全ての型を再エクスポート

---

## Phase 3: zodスキーマの作成

### 3.1 schemas/library.ts

- [ ] Red: createLibrarySchemaのテストを作成
- [ ] Green: createLibrarySchemaを実装
- [ ] Red: updateLibrarySchemaのテストを作成
- [ ] Green: updateLibrarySchemaを実装
- [ ] Refactor: 必要に応じてリファクタリング

### 3.2 schemas/book.ts

- [ ] Red: createBookSchemaのテストを作成
- [ ] Green: createBookSchemaを実装
- [ ] Red: updateBookSchemaのテストを作成
- [ ] Green: updateBookSchemaを実装
- [ ] Refactor: 必要に応じてリファクタリング

### 3.3 schemas/memo.ts

- [ ] Red: createMemoSchemaのテストを作成
- [ ] Green: createMemoSchemaを実装
- [ ] Red: updateMemoSchemaのテストを作成
- [ ] Green: updateMemoSchemaを実装
- [ ] Refactor: 必要に応じてリファクタリング

### 3.4 schemas/index.ts

- [ ] 全てのスキーマを再エクスポート

---

## Phase 4: エントリポイントの整理

### 4.1 src/index.ts

- [ ] types, schemas, constantsを再エクスポート
- [ ] 既存の空ファイルを削除

---

## Phase 5: 動作確認

- [ ] `pnpm lint` が成功する
- [ ] `pnpm type-check` が成功する
- [ ] `pnpm test` が成功する
- [ ] frontend, backendからimportできることを確認

---

## 完了条件

- [ ] すべてのタスクが完了している
- [ ] types/, schemas/, constants/が設計通りに作成されている
- [ ] zodスキーマのテストがパスしている
- [ ] frontend, backendから`@read-log/shared`として参照できる
