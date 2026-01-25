# add-feature

新機能の開発を開始するためのコマンド。機能ごとの設計書とタスクリストを作成する。

## 実行方法

```
/add-feature <機能の説明（日本語）>
```

例:
```
/add-feature マイ書庫の作成
/add-feature 本の登録機能
/add-feature メモの追加
```

このコマンドを実行すると、`.steering/yyyymmdd-{機能名}/`に設計書とタスクリストを作成します。

**フォルダ名の例:**
- `マイ書庫の作成` → `.steering/20260125-library-create/`
- `本の登録機能` → `.steering/20260125-book-register/`
- `メモの追加` → `.steering/20260125-memo-add/`

---

## 手順

### ステップ1: 機能名の推論とフォルダ作成

1. 日本語の機能説明から英語の機能名を推論する
2. 現在の日付（yyyymmdd形式）を取得する
3. フォルダ名を `yyyymmdd-{機能名}` の形式で決定する
4. ユーザーに推論した機能名を確認する

**推論ルール:**
- 日本語の動詞を英語の動詞に変換（作成→create、登録→register、追加→add、編集→edit、削除→delete）
- 対象のリソースを英語に変換（マイ書庫→library、本→book、メモ→memo）
- ケバブケースで結合（例: library-create, book-register）

### ステップ2: 既存ドキュメントの読み込み

1. `docs/product-requirements.md`を読み、該当する機能要件を特定する
2. `docs/functional-design.md`を読み、該当する機能の詳細仕様を確認する
3. `docs/architecture-design.md`を読み、技術的な制約を確認する
4. `docs/repository-structure.md`を読み、ファイル配置のルールを確認する

### ステップ3: 設計書の作成

1. **steeringスキル**をロードする
2. `.steering/yyyymmdd-{機能名}/design.md`を作成する
3. 機能の詳細設計を記述する:
   - 機能概要
   - 実装するコンポーネント/モジュール
   - データフロー
   - 依存関係

### ステップ4: タスクリストの作成

1. `.steering/yyyymmdd-{機能名}/tasklist.md`を作成する
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

- [ ] `.steering/yyyymmdd-{機能名}/design.md` - 機能設計書
- [ ] `.steering/yyyymmdd-{機能名}/tasklist.md` - タスクリスト

## 完了メッセージ

機能の設計書とタスクリストを作成しました。

作成されたファイル:

- .steering/yyyymmdd-{機能名}/design.md
- .steering/yyyymmdd-{機能名}/tasklist.md

タスクリストに従って実装を開始してください。
