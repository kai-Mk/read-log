# アーキテクチャ設計書

## 1. システム構成図

```mermaid
flowchart LR
    subgraph Client
        Browser[ブラウザ]
    end

    subgraph Frontend
        React[React + Vite]
    end

    subgraph Backend
        Hono[Hono API]
        Prisma[Prisma ORM]
    end

    subgraph Database
        PostgreSQL[(PostgreSQL)]
    end

    subgraph External
        GoogleBooks[Google Books API]
    end

    Browser --> React
    React --> Hono
    Hono --> Prisma
    Prisma --> PostgreSQL
    Hono --> GoogleBooks
```

## 2. 技術スタック詳細

### 2.1 フロントエンド

| 技術 | バージョン | 選定理由 |
| ---- | ---------- | -------- |
| React | ^18.2.0 | コンポーネントベースの開発、豊富なエコシステム |
| Vite | ^5.0.0 | 高速なHMR、シンプルな設定 |
| TypeScript | ^5.3.0 | 型安全性、開発体験の向上 |
| React Router | ^6.20.0 | 宣言的なルーティング、ネストルート対応 |
| SWR | ^2.2.0 | データフェッチとキャッシュ管理、リアルタイム更新 |
| react-hook-form | ^7.48.0 | パフォーマンスの高いフォーム管理 |
| Tailwind CSS | ^3.3.0 | ユーティリティファーストCSS、高速なスタイリング |

**主要な設定**:

- Vite: React SWCプラグインを使用して高速コンパイル
- TypeScript: strict mode有効
- Tailwind CSS: JIT（Just-In-Time）モード有効

### 2.2 バックエンド

| 技術 | バージョン | 選定理由 |
| ---- | ---------- | -------- |
| Hono | ^3.11.0 | 軽量、TypeScriptネイティブ、Edge対応 |
| Node.js | ^20.10.0 | LTS、安定性 |
| Prisma | ^5.7.0 | 型安全なORM、マイグレーション管理 |

**主要な設定**:

- Hono: Node.jsアダプター使用
- Prisma: PostgreSQL provider、プレビュー機能なし

### 2.3 データベース

| 技術 | バージョン | 選定理由 |
| ---- | ---------- | -------- |
| PostgreSQL | 16 | リレーショナル、JSON対応、信頼性 |

**主要な設定**:

- 文字コード: UTF-8
- タイムゾーン: UTC
- 接続プール: Prismaのデフォルト設定（connection_limit=5）

## 3. 環境構成

### 3.1 Docker構成

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: read-log-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=readlog
      - POSTGRES_PASSWORD=readlog
      - POSTGRES_DB=readlog
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3.2 環境変数

| 変数名 | 説明 | 例 |
| ------ | ---- | -- |
| DATABASE_URL | PostgreSQL接続文字列 | postgresql://readlog:readlog@localhost:5432/readlog |
| PORT | APIサーバーポート | 3000 |
| CORS_ORIGIN | 許可するオリジン | http://localhost:5173 |

### 3.3 ポート設定

| サービス | ポート | 用途 |
| -------- | ------ | ---- |
| Frontend (Vite) | 5173 | 開発サーバー |
| Backend (Hono) | 3000 | APIサーバー |
| PostgreSQL | 5432 | データベース |

## 4. 依存関係

### 4.1 フロントエンド

| パッケージ | バージョン | 用途 |
| ---------- | ---------- | ---- |
| react | ^18.2.0 | UIライブラリ |
| react-dom | ^18.2.0 | DOM レンダリング |
| react-router-dom | ^6.20.0 | ルーティング |
| swr | ^2.2.0 | データフェッチ・キャッシュ |
| react-hook-form | ^7.48.0 | フォーム管理 |
| @hookform/resolvers | ^3.3.0 | zodとの連携 |
| tailwindcss | ^3.3.0 | スタイリング |
| lucide-react | ^0.294.0 | アイコン |
| luxon | ^3.4.0 | 日付操作 |

### 4.2 バックエンド

| パッケージ | バージョン | 用途 |
| ---------- | ---------- | ---- |
| hono | ^3.11.0 | Webフレームワーク |
| @hono/node-server | ^1.3.0 | Node.jsアダプター |
| @prisma/client | ^5.7.0 | Prismaクライアント |
| prisma | ^5.7.0 | Prisma CLI |

### 4.3 共通

| パッケージ | バージョン | 用途 |
| ---------- | ---------- | ---- |
| zod | ^3.22.0 | スキーマバリデーション |
| typescript | ^5.3.0 | 型システム |
| @types/luxon | ^3.3.0 | Luxonの型定義 |

### 4.4 開発

| パッケージ | バージョン | 用途 |
| ---------- | ---------- | ---- |
| vitest | ^1.0.0 | テストランナー |
| @testing-library/react | ^14.1.0 | Reactコンポーネントテスト |
| @testing-library/jest-dom | ^6.1.0 | DOMアサーション拡張 |
| msw | ^2.0.0 | APIモック |
| eslint | ^8.55.0 | リンター |
| prettier | ^3.1.0 | フォーマッター |
| @vitejs/plugin-react-swc | ^3.5.0 | React SWCプラグイン |

## 5. パフォーマンス設計

### 5.1 キャッシュ戦略

- SWRのstale-while-revalidateパターンを使用
- 本の一覧は30秒間キャッシュを維持
- ISBN検索結果は5分間キャッシュを維持
- ミューテーション後は関連キャッシュを自動的に再検証

```typescript
// SWR設定例
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
};
```

### 5.2 最適化

- 画像: Google Books APIから取得した表紙画像はそのまま使用（外部URL）
- バンドルサイズ: 動的インポートでルート別にコード分割
- 初期ロード: クリティカルCSSのインライン化

### 5.3 目標値

| 指標 | 目標値 | 施策 |
| ---- | ------ | ---- |
| ページ読み込み | 3秒以内 | コード分割、キャッシュ活用 |
| ISBN検索レスポンス | 2秒以内 | バックエンドでのキャッシュ |
| API レスポンス | 500ms以内 | データベースインデックス最適化 |

## 6. セキュリティ設計

### 6.1 アクセス制御

- マイ書庫IDはUUIDv4を使用し、推測困難にする
- URLにマイ書庫IDを含め、知っている人のみアクセス可能
- APIエンドポイントはすべてマイ書庫IDをパスパラメータに含む
- 存在しないマイ書庫IDへのアクセスは404を返す

### 6.2 入力検証

- フロントエンド: zodによるクライアントサイドバリデーション
- バックエンド: zodによるサーバーサイドバリデーション
- 両方で同じスキーマを共有し、一貫性を確保
- バリデーションエラーは400 Bad Requestで返却

```typescript
// バリデーションスキーマの共有例
// packages/shared/schemas/book.ts
export const createBookSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100).optional(),
  isbn: z.string().regex(/^(97[89])?\d{9}[\dX]$/).optional(),
  // ...
});
```

### 6.3 CORS設定

- 開発環境: http://localhost:5173 のみ許可
- 本番環境: 特定のドメインのみ許可
- credentials: trueは不要（認証なしのため）

```typescript
// Hono CORS設定
app.use('*', cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type'],
}));
```

### 6.4 機密情報の管理

- DATABASE_URLは.envファイルで管理
- .envファイルは.gitignoreに追加
- 本番環境では環境変数として設定
- Google Books APIはAPIキー不要（公開API）

### 6.5 その他

- XSS対策: Reactの自動エスケープ機能を活用、dangerouslySetInnerHTMLは使用しない
- SQLインジェクション対策: Prismaのパラメータ化クエリを使用、生SQLは避ける
- HTTPヘッダー: Honoのsecure-headersミドルウェアを使用
