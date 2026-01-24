# 開発ガイドライン

## 1. コーディング規約

### 1.1 ESLint設定

基本設定:
- `eslint:recommended` をベースに使用
- TypeScript用に `@typescript-eslint/recommended` を使用
- React用に `plugin:react/recommended` と `plugin:react-hooks/recommended` を使用

主要なカスタムルール:
- `no-console`: warn（本番コードではconsole.logを避ける）
- `@typescript-eslint/explicit-function-return-type`: off（型推論を活用）
- `@typescript-eslint/no-unused-vars`: error（未使用変数を禁止、_プレフィックスは許可）
- `react/react-in-jsx-scope`: off（React 17+では不要）

### 1.2 Prettier設定

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

### 1.3 命名規則

| 対象 | 規則 | 例 |
| ---- | ---- | -- |
| 変数 | camelCase | `bookList`, `isLoading` |
| 関数 | camelCase | `getBooks`, `handleSubmit` |
| コンポーネント | PascalCase | `BookList`, `MemoForm` |
| 定数（export） | UPPER_SNAKE_CASE | `MAX_BOOKS`, `API_BASE_URL` |
| 定数（ローカル） | camelCase | `defaultStatus` |
| 型/インターフェース | PascalCase | `Book`, `CreateBookRequest` |
| enum値 | camelCase | `BookStatus.unread` |
| ファイル（コンポーネント） | PascalCase | `BookList.tsx` |
| ファイル（その他） | camelCase | `bookService.ts` |
| テストファイル | 対象ファイル名.test | `BookList.test.tsx` |

### 1.4 コメント

- **書くべき場面**:
  - 複雑なビジネスロジックの説明
  - なぜそのコードを書いたか（Whyの説明）
  - TODO、FIXME、HACKなどの注記
  - 外部APIの仕様に関する補足

- **書かなくてよい場面**:
  - コードを読めば明らかなこと（Whatの説明）
  - 関数名やメソッド名で意図が伝わる場合

- **形式**:
  - 単一行: `// コメント`
  - 複数行: JSDocスタイル `/** ... */`
  - TODO: `// TODO: 説明`

## 2. Git運用ルール

### 2.1 ブランチ戦略

| ブランチ | 用途 | 命名規則 |
| -------- | ---- | -------- |
| main | 本番リリース可能な状態を維持 | - |
| feature | 新機能開発 | `feature/[機能名]` |
| fix | バグ修正 | `fix/[バグ内容]` |
| refactor | リファクタリング | `refactor/[内容]` |
| docs | ドキュメント更新 | `docs/[内容]` |
| test | テスト追加・修正 | `test/[内容]` |

例:
- `feature/add-book-registration`
- `fix/isbn-search-error`
- `refactor/book-service`

### 2.2 コミットメッセージ規約

```
[type]: [subject]

[body（任意）]
```

| type | 用途 |
| ---- | ---- |
| feat | 新機能の追加 |
| fix | バグ修正 |
| docs | ドキュメントのみの変更 |
| style | コードの意味に影響しない変更（フォーマット等） |
| refactor | バグ修正や機能追加を伴わないコード変更 |
| test | テストの追加・修正 |
| chore | ビルドプロセスやツールの変更 |

例:
- `feat: 本の登録機能を追加`
- `fix: ISBN検索でエラーが発生する問題を修正`
- `refactor: bookServiceの共通処理を抽出`

### 2.3 マージ方針

- **feature → main**: Squash and merge（コミットを1つにまとめる）
- コミットメッセージはPRタイトルを使用
- マージ前にリベースして最新のmainを取り込む

## 3. テスト方針

### 3.1 TDDの進め方

1. **Red**: 失敗するテストを書く
   - 実装したい機能の期待する振る舞いをテストとして記述
   - テストを実行し、失敗することを確認

2. **Green**: テストが通る最小限のコードを書く
   - テストをパスさせることだけに集中
   - コードの美しさは後回し

3. **Refactor**: コードを整理する
   - テストがパスしたままコードを改善
   - 重複を排除、命名を改善、構造を整理

### 3.2 カバレッジ目標

| 対象 | 目標 |
| ---- | ---- |
| services（バックエンド） | 80%以上 |
| repositories | 70%以上 |
| hooks（フロントエンド） | 70%以上 |
| components | 60%以上 |
| utils | 90%以上 |

### 3.3 テストの種類

| 種類 | 用途 | ツール |
| ---- | ---- | ------ |
| 単体テスト | 個々の関数・コンポーネントの動作検証 | Vitest |
| コンポーネントテスト | Reactコンポーネントの描画・インタラクション検証 | React Testing Library |
| 統合テスト | 複数モジュールの連携検証 | Vitest + MSW |
| APIテスト | エンドポイントの動作検証 | Vitest + supertest |

### 3.4 テストの書き方

- **ファイル配置**: テスト対象と同じディレクトリに配置
  - `BookList.tsx` → `BookList.test.tsx`
  - `bookService.ts` → `bookService.test.ts`

- **テスト構造**: Arrange-Act-Assert パターン
  ```typescript
  describe('BookService', () => {
    describe('getBooks', () => {
      it('should return books for the given library', async () => {
        // Arrange: テストデータの準備
        const libraryId = 'test-library-id';

        // Act: テスト対象の実行
        const result = await bookService.getBooks(libraryId);

        // Assert: 結果の検証
        expect(result).toHaveLength(2);
      });
    });
  });
  ```

- **命名規則**: `should [期待する動作] when [条件]`
  - `should return empty array when no books exist`
  - `should throw error when library not found`

## 4. レビュー基準

### 4.1 PRの作成ルール

- **粒度**: 1つのPRは1つの機能・修正に限定
- **サイズ**: 変更行数は300行以内を目安
- **説明**: 以下を含める
  - 変更の概要
  - 変更理由
  - テスト方法
  - スクリーンショット（UI変更の場合）

### 4.2 チェック項目

- [ ] コードが設計ドキュメントに沿っている
- [ ] 命名規則に従っている
- [ ] 不要なコード・コメントがない
- [ ] エラーハンドリングが適切
- [ ] テストが追加されている
- [ ] 既存のテストがすべてパスしている
- [ ] TypeScriptの型エラーがない
- [ ] ESLint/Prettierのエラーがない

### 4.3 承認基準

- すべての自動チェック（CI）がパスしている
- チェック項目をすべて満たしている
- 1人以上のApproveがある（個人開発の場合はセルフレビューでOK）

## 5. CI/CD

### 5.1 GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
```

### 5.2 自動チェック

- [ ] ESLint: コードスタイルチェック
- [ ] TypeScript: 型チェック
- [ ] Vitest: テスト実行
- [ ] Prettier: フォーマットチェック（lint内で実行）

### 5.3 デプロイ

デプロイは本プロジェクトのスコープ外。
ローカル開発環境での動作確認を優先する。

## 6. 開発フロー

### 6.1 機能追加の手順

1. **Issue作成**: 追加する機能の内容を記述
2. **ブランチ作成**: `feature/[機能名]` でブランチを作成
3. **テスト作成**: 機能の期待する動作をテストとして記述（TDD: Red）
4. **実装**: テストがパスする最小限のコードを実装（TDD: Green）
5. **リファクタリング**: コードを整理（TDD: Refactor）
6. **PR作成**: 変更内容を説明したPRを作成
7. **レビュー**: チェック項目を確認
8. **マージ**: Squash and mergeでmainにマージ

### 6.2 バグ修正の手順

1. **Issue作成**: バグの内容、再現手順、期待する動作を記述
2. **ブランチ作成**: `fix/[バグ内容]` でブランチを作成
3. **再現テスト作成**: バグを再現するテストを記述（失敗することを確認）
4. **修正**: テストがパスするようにコードを修正
5. **回帰テスト**: 既存のテストがすべてパスすることを確認
6. **PR作成**: 修正内容と原因を説明したPRを作成
7. **レビュー**: チェック項目を確認
8. **マージ**: Squash and mergeでmainにマージ
