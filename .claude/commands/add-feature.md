# add-feature

新機能の開発を開始するためのコマンド。issueの確認、ブランチ作成、設計書・タスクリストの作成を行う。

## 実行方法

```
/add-feature <機能の説明（日本語）> #<issue番号>
```

例:
```
/add-feature マイ書庫の作成 #9
/add-feature 本の登録機能 #10
/add-feature メモの追加 #15
```

---

## 手順

### ステップ1: issueの確認

1. 指定されたissue番号の内容を `gh issue view <番号>` で取得する
2. issueのタイトルと内容をユーザーに表示する
3. このissueで作業を開始してよいか確認する

### ステップ2: ブランチの作成と切り替え

1. 日本語の機能説明から英語の機能名を推論する
2. ブランチ名を `{issue番号}-{機能名}` の形式で決定する
3. ブランチを作成して切り替える: `git checkout -b {ブランチ名}`

**ブランチ名の例:**
- `#9 マイ書庫の作成` → `9-library-create`
- `#10 本の登録機能` → `10-book-register`
- `#15 メモの追加` → `15-memo-add`

**推論ルール:**
- 日本語の動詞を英語の動詞に変換（作成→create、登録→register、追加→add、編集→edit、削除→delete）
- 対象のリソースを英語に変換（マイ書庫→library、本→book、メモ→memo）
- ケバブケースで結合（例: library-create, book-register）

### ステップ3: 既存ドキュメントの読み込み

1. `docs/product-requirements.md`を読み、該当する機能要件を特定する
2. `docs/functional-design.md`を読み、該当する機能の詳細仕様を確認する
3. `docs/architecture-design.md`を読み、技術的な制約を確認する
4. `docs/repository-structure.md`を読み、ファイル配置のルールを確認する
5. `docs/development-guidelines.md`を読み、コーディング規約とテスト方針を確認する

### ステップ4: 設計書の作成

1. **steeringスキル**をロードする
2. `.steering/{issue番号}-{機能名}/design.md`を作成する
3. 機能の詳細設計を記述する:
   - 機能概要
   - 実装するコンポーネント/モジュール
   - データフロー
   - 依存関係

### ステップ5: タスクリストの作成

1. `.steering/{issue番号}-{機能名}/tasklist.md`を作成する
2. TDDサイクルに基づいたタスクを記述する:
   - Red: テスト作成
   - Green: 実装
   - Refactor: リファクタリング

### ステップ6: ユーザーへの確認

1. 作成した設計書とタスクリストの内容を表示する
2. ユーザーに確認を求める
3. 修正が必要な場合は対応する

---

## SKILLS

- steering

---

## 完了条件

以下が完了していること:

- [ ] issueの内容を確認した
- [ ] ブランチ `{issue番号}-{機能名}` を作成し、切り替えた
- [ ] `.steering/{issue番号}-{機能名}/design.md` - 機能設計書を作成した
- [ ] `.steering/{issue番号}-{機能名}/tasklist.md` - タスクリストを作成した

## 完了メッセージ

機能開発の準備が完了しました。

- Issue: #{issue番号}
- ブランチ: {issue番号}-{機能名}
- 設計書: .steering/{issue番号}-{機能名}/design.md
- タスクリスト: .steering/{issue番号}-{機能名}/tasklist.md

タスクリストに従って実装を開始してください。
