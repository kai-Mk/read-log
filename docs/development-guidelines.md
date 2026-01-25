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

## 2. テスト方針

### 2.1 TDDの進め方

1. **Red**: 失敗するテストを書く
   - 実装したい機能の期待する振る舞いをテストとして記述
   - テストを実行し、失敗することを確認

2. **Green**: テストが通る最小限のコードを書く
   - テストをパスさせることだけに集中
   - コードの美しさは後回し

3. **Refactor**: コードを整理する
   - テストがパスしたままコードを改善
   - 重複を排除、命名を改善、構造を整理

### 2.2 カバレッジ目標

| 対象 | 目標 |
| ---- | ---- |
| services（バックエンド） | 80%以上 |
| repositories | 70%以上 |
| hooks（フロントエンド） | 70%以上 |
| components | 60%以上 |
| utils | 90%以上 |

### 2.3 テストの種類

| 種類 | 用途 | ツール |
| ---- | ---- | ------ |
| 単体テスト | 個々の関数・コンポーネントの動作検証 | Vitest |
| コンポーネントテスト | Reactコンポーネントの描画・インタラクション検証 | React Testing Library |
| 統合テスト | 複数モジュールの連携検証 | Vitest + MSW |
| APIテスト | エンドポイントの動作検証 | Vitest + supertest |

### 2.4 テストの書き方

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

## 3. CI/CD

### 3.1 GitHub Actions

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

### 3.2 自動チェック

- [ ] ESLint: コードスタイルチェック
- [ ] TypeScript: 型チェック
- [ ] Vitest: テスト実行
- [ ] Prettier: フォーマットチェック（lint内で実行）

### 3.3 デプロイ

デプロイは本プロジェクトのスコープ外。
ローカル開発環境での動作確認を優先する。
