# Discussion: shared パッケージの構築

## 2026-01-25

### Q: zodスキーマはバックエンドとフロントエンドでどのように働くか？

| 場所         | 用途                                      | 例                                                     |
| ------------ | ----------------------------------------- | ------------------------------------------------------ |
| **Backend**  | APIリクエストのバリデーション             | `createBookSchema.parse(req.body)`                     |
| **Frontend** | react-hook-formでのフォームバリデーション | `useForm({ resolver: zodResolver(createBookSchema) })` |

**メリット:** スキーマを共有することで、フロントエンド・バックエンドで同じバリデーションルールが適用される。

---

### Q: 型定義（types/）にテストを書かない理由は？

**型定義はテスト不要:**

- TypeScriptの型は**コンパイル時にチェック**される
- ランタイムには存在しない（消える）
- `pnpm type-check`で検証される

**zodスキーマはテストが必要:**

- **ランタイムでバリデーションを実行**する
- 正しい入力でパスするか、不正な入力でエラーになるかをテストで検証

---

### Q: フロントエンドとバックエンドで別ディレクトリなのにどう参照するか？

**pnpm workspace**の仕組みで参照する。

```json
// packages/frontend/package.json
{
  "dependencies": {
    "@read-log/shared": "workspace:*"
  }
}
```

**`workspace:*`** はpnpmに「同じワークスペース内の`@read-log/shared`パッケージを参照する」と伝える。ローカルの`packages/shared`を直接参照する。

```typescript
// frontend or backend から
import { createBookSchema, type Book } from '@read-log/shared';
```
