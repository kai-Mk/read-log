# setup-project

プロジェクトの初期設計ドキュメントを一括作成するコマンド。

## 実行方法

```
/setup-project
```

このコマンドを実行すると、`docs/ideas`内のアイデアをもとに5つの設計ドキュメントを順次作成します。

---

## 手順

### ステップ0: インプットの読み込み

1. `docs/ideas`内のマークダウンファイルをすべて読む
2. 内容を理解し、PRD作成の参考にする

### ステップ1: プロダクト要件定義書の作成

1. **prd-writingスキル**をロードする
2. `docs/ideas`の内容をもとに`docs/product-requirements.md`を作成する
3. 壁打ちで出たアイデアを具体化する:
   - 詳細なユーザーストーリー
   - 受け入れ条件
   - 非機能要件
4. ユーザーに確認を求め、**認証されるまで待機する**

**以降のステップはプロダクト要求定義書の内容を基にするため、自動的に作成する**

### ステップ2: 機能設計書の作成

1. **functional-designスキル**をロードする
2. `docs/product-requirements.md`を読む
3. スキルのテンプレートガイドに従って`docs/functional-design.md`を作成する

### ステップ3: アーキテクチャ設計書の作成

1. **architecture-designスキル**をロードする
2. 既存のドキュメントを読む
3. スキルのテンプレートとガイドに従って`docs/architecture-design.md`を作成する

### ステップ4: リポジトリ構造定義書の作成

1. **repository-structureスキル**をロードする
2. 既存のドキュメントを読む
3. スキルのテンプレートとガイドに従って`docs/repository-structure.md`を作成する

### ステップ5: 開発ガイドラインの作成

1. **development-guidelinesスキル**をロードする
2. 既存のドキュメントを読む
3. スキルのテンプレートとガイドに従って`docs/development-guidelines.md`を作成する

---

## SKILLS（後で作成）

- prd-writing
- functional-design
- architecture-design
- repository-structure
- development-guidelines

---

## 完了条件

以下の5つのドキュメントがすべて作成されていること:

- [ ] `docs/product-requirements.md` - プロダクト要件定義書
- [ ] `docs/functional-design.md` - 機能設計書
- [ ] `docs/architecture-design.md` - アーキテクチャ設計書
- [ ] `docs/repository-structure.md` - リポジトリ構造定義書
- [ ] `docs/development-guidelines.md` - 開発ガイドライン

## 完了メッセージ

すべてのドキュメント作成が完了しました。

作成されたドキュメント:

- docs/product-requirements.md
- docs/functional-design.md
- docs/architecture-design.md
- docs/repository-structure.md
- docs/development-guidelines.md

これでプロジェクトの設計ドキュメントが揃いました。実装を開始する準備が整っています。
