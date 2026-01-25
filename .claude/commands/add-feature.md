# add-feature

新機能の開発を開始するためのコマンド。機能ごとの設計書とタスクリストを作成する。

## 実行方法

```
/add-feature <機能パス>
```

例:
```
/add-feature library/create
/add-feature books/register
/add-feature memos/add
```

このコマンドを実行すると、`.steering/<機能パス>/`に設計書とタスクリストを作成します。

---

## 手順

### ステップ1: 機能パスの確認

1. 引数で指定された機能パスを確認する
2. パスが指定されていない場合は、ユーザーに入力を求める

### ステップ2: 既存ドキュメントの読み込み

1. `docs/product-requirements.md`を読み、該当する機能要件を特定する
2. `docs/functional-design.md`を読み、該当する機能の詳細仕様を確認する
3. `docs/architecture-design.md`を読み、技術的な制約を確認する
4. `docs/repository-structure.md`を読み、ファイル配置のルールを確認する

### ステップ3: 設計書の作成

1. **steeringスキル**をロードする
2. `.steering/<機能パス>/design.md`を作成する
3. 機能の詳細設計を記述する:
   - 機能概要
   - 実装するコンポーネント/モジュール
   - データフロー
   - 依存関係

### ステップ4: タスクリストの作成

1. `.steering/<機能パス>/tasklist.md`を作成する
2. TDDサイクルに基づいたタスクを記述する:
   - Red: テスト作成
   - Green: 実装
   - Refactor: リファクタリング

### ステップ5: ユーザーへの確認

1. 作成した設計書とタスクリストの内容を表示する
2. ユーザーに確認を求める
3. 修正が必要な場合は対応する

---

## SKILLS

- steering

---

## 完了条件

以下のファイルが作成されていること:

- [ ] `.steering/<機能パス>/design.md` - 機能設計書
- [ ] `.steering/<機能パス>/tasklist.md` - タスクリスト

## 完了メッセージ

機能の設計書とタスクリストを作成しました。

作成されたファイル:

- .steering/<機能パス>/design.md
- .steering/<機能パス>/tasklist.md

タスクリストに従って実装を開始してください。
