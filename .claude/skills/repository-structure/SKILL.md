# repository-structure

リポジトリ構造定義書を作成するスキル。

## 使用可能なツール

- **Read** - ドキュメントを読む
- **Write** - リポジトリ構造定義書を作成する
- **Glob** - ファイルを探す

上記以外のツール（Bash、Edit、Grep、WebFetch、WebSearch、AskUserQuestionなど）は使用しない。

## 目的

アーキテクチャ設計書で定義した技術構成を、具体的なディレクトリ構造とファイル配置に落とし込む。各レイヤー間のデータフローも明確にする。

## 作成の流れ

1. `docs/product-requirements.md`、`docs/functional-design.md`、`docs/architecture-design.md`を読み込む
2. モノレポ構成のディレクトリ構造を設計する
3. 各レイヤー間のデータフローを定義する
4. `docs/repository-structure.md`として出力する

## 参照ファイル

- `./guide.md` - 各セクションの記述ガイド
- `./template.md` - 出力フォーマット
