# タスクリスト: {機能名}

## 概要

- **機能**: {機能名}
- **設計書**: `.steering/{機能パス}/design.md`
- **開始日**: {日付}

## 進捗サマリー

- 全タスク数: {n}
- 完了: {n}
- 進行中: {n}
- 未着手: {n}

---

## Phase 1: 共有モジュール（Shared）

### 1.1 型定義

- [ ] **Red**: {型名}の型定義テストを作成
- [ ] **Green**: {型名}の型定義を実装
- [ ] **Refactor**: 型定義のリファクタリング

### 1.2 スキーマ

- [ ] **Red**: {スキーマ名}のバリデーションテストを作成
- [ ] **Green**: {スキーマ名}のzodスキーマを実装
- [ ] **Refactor**: スキーマのリファクタリング

---

## Phase 2: バックエンド（Backend）

### 2.1 Repository

- [ ] **Red**: {Repository名}のテストを作成
  - {テストケース1}
  - {テストケース2}
- [ ] **Green**: {Repository名}を実装
- [ ] **Refactor**: Repositoryのリファクタリング

### 2.2 Service

- [ ] **Red**: {Service名}のテストを作成
  - {テストケース1}
  - {テストケース2}
- [ ] **Green**: {Service名}を実装
- [ ] **Refactor**: Serviceのリファクタリング

### 2.3 Controller

- [ ] **Red**: {Controller名}のテストを作成
  - {テストケース1}
  - {テストケース2}
- [ ] **Green**: {Controller名}を実装
- [ ] **Refactor**: Controllerのリファクタリング

### 2.4 Route

- [ ] **Red**: {Route}のE2Eテストを作成
- [ ] **Green**: {Route}のルーティングを実装
- [ ] **Refactor**: ルーティングのリファクタリング

---

## Phase 3: フロントエンド（Frontend）

### 3.1 Service

- [ ] **Red**: {Service名}のテストを作成（MSWでモック）
  - {テストケース1}
  - {テストケース2}
- [ ] **Green**: {Service名}を実装
- [ ] **Refactor**: Serviceのリファクタリング

### 3.2 Hook

- [ ] **Red**: {Hook名}のテストを作成
  - {テストケース1}
  - {テストケース2}
- [ ] **Green**: {Hook名}を実装
- [ ] **Refactor**: Hookのリファクタリング

### 3.3 Component

- [ ] **Red**: {Component名}のテストを作成
  - {テストケース1}
  - {テストケース2}
- [ ] **Green**: {Component名}を実装
- [ ] **Refactor**: Componentのリファクタリング

---

## Phase 4: 統合テスト

- [ ] フロントエンドとバックエンドの統合テスト
- [ ] エッジケースの確認
- [ ] エラーハンドリングの確認

---

## 完了条件

- [ ] すべてのテストがパスしている
- [ ] ESLint/Prettierのエラーがない
- [ ] TypeScriptの型エラーがない
- [ ] 設計書通りの動作が確認できる

---

## メモ

{実装中に気づいたことや変更点を記録}
