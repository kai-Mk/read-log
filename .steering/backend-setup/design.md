# backend パッケージの構築 - 設計書

## 機能概要

Hono + Prisma でバックエンドAPIの基盤を構築する。ディレクトリ構成、ミドルウェア、Prismaスキーマを整備し、APIエンドポイント実装の土台を作る。

## 関連ドキュメント

- [プロダクト要件定義書](../../docs/product-requirements.md)
- [機能設計書 - API仕様](../../docs/functional-design.md#3-api仕様)
- [機能設計書 - データモデル](../../docs/functional-design.md#1-データモデル)
- [アーキテクチャ設計書 - バックエンド](../../docs/architecture-design.md#22-バックエンド)
- [リポジトリ構造 - Backend](../../docs/repository-structure.md#backend)

## 実装対象

### ディレクトリ構成

```
packages/backend/src/
├── index.ts              # エントリポイント（既存）
├── app.ts                # Honoアプリケーション設定
├── routes/
│   └── index.ts          # ルート集約
├── controllers/
│   └── .gitkeep
├── services/
│   └── .gitkeep
├── repositories/
│   └── .gitkeep
├── middlewares/
│   ├── cors.ts           # CORS設定
│   ├── errorHandler.ts   # エラーハンドリング
│   └── validator.ts      # バリデーション
├── types/
│   └── context.ts        # Hono Context型拡張
└── utils/
    ├── prisma.ts         # Prisma Client インスタンス
    └── uuid.ts           # UUID生成
```

### Prisma スキーマ

```prisma
model Library {
  id        String    @id @default(uuid())
  name      String
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")
  books     Book[]

  @@map("libraries")
}

model Book {
  id         String    @id @default(uuid())
  libraryId  String    @map("library_id")
  title      String
  author     String?
  isbn       String?
  coverImage String?   @map("cover_image")
  pageCount  Int?      @map("page_count")
  status     String    @default("unread")
  category   String    @default("other")
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")
  deletedAt  DateTime? @map("deleted_at")
  library    Library   @relation(fields: [libraryId], references: [id])
  memos      Memo[]

  @@map("books")
}

model Memo {
  id        String    @id @default(uuid())
  bookId    String    @map("book_id")
  content   String
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")
  book      Book      @relation(fields: [bookId], references: [id])

  @@map("memos")
}
```

## データフロー

```
HTTP Request
    ↓
[middlewares/cors.ts]       # CORS処理
    ↓
[routes/index.ts]           # ルーティング
    ↓
[controllers/*]             # リクエスト処理（今回は空）
    ↓
[services/*]                # ビジネスロジック（今回は空）
    ↓
[repositories/*]            # データアクセス（今回は空）
    ↓
[utils/prisma.ts]           # Prisma Client
    ↓
PostgreSQL
    ↓
HTTP Response
    ↓
[middlewares/errorHandler.ts] # エラー処理（異常時）
```

## 依存関係

### 使用するパッケージ

- `hono`: Webフレームワーク
- `@hono/node-server`: Node.jsアダプター
- `@prisma/client`: Prisma クライアント
- `@read-log/shared`: 共有型定義・zodスキーマ

### 共有パッケージからの参照

- `@read-log/shared/schemas`: バリデーションスキーマ
- `@read-log/shared/types`: 型定義（Library, Book, Memo等）
- `@read-log/shared/constants`: 定数（BOOK_STATUS, BOOK_CATEGORY）

## 注意点

### CORS設定

- 開発環境: `http://localhost:5173` のみ許可
- `credentials: false`（認証なしのため）

### エラーハンドリング

- 統一されたエラーレスポンス形式を使用
- `{ code: string, error: string, message: string }`
- HTTPステータスコード: 400, 404, 500

### バリデーション

- `@read-log/shared/schemas` のzodスキーマを使用
- リクエストボディ・パスパラメータの検証

### Prisma

- シングルトンパターンでクライアントを管理
- ソフトデリート（deletedAt）を使用
- カラム名はsnake_case、モデルプロパティはcamelCase

### エントリポイント

- `index.ts`: サーバー起動のみ
- `app.ts`: Honoアプリケーション設定（ミドルウェア・ルート登録）
- テスト容易性のためアプリケーション設定を分離
