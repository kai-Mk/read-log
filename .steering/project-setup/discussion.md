# Discussion: プロジェクト初期セットアップ

## 2026-01-25

### Q: pnpm-workspace.yamlとルートpackage.jsonは何のために作成するか？

**pnpm-workspace.yaml**
- pnpmにモノレポ構成を認識させる
- `packages/*`配下を1つのリポジトリで管理
- パッケージ間で`workspace:*`を使って相互参照できる（例: frontendからsharedを参照）

**ルートpackage.json**
- ワークスペース全体のスクリプト定義（`pnpm dev`で全体起動など）
- 共通devDependenciesの定義（ESLint, Prettier, TypeScriptを共有）
- 重複インストールを回避
