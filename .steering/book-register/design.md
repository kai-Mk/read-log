# F-02: 本の登録 設計書

## 機能概要

ISBNを入力して書籍情報を自動取得（Google Books API）、または手動入力で本を登録する。登録時に本の状態（積読/読みたい/読了）とカテゴリを選択できる。

## 関連ドキュメント

- [PRD F-02](../../docs/product-requirements.md)
- [機能設計 API仕様](../../docs/functional-design.md)
- [外部API連携](../../docs/functional-design.md#5-外部api連携)

## 受け入れ条件

- ISBNを入力すると書籍情報が自動取得される（Google Books API）
- タイトル、著者、表紙画像、ページ数が表示される
- ISBN検索で見つからない場合は手動入力できる
- 登録時に本の状態（積読/読みたい/読了）を選択できる
- 登録した本が一覧に追加される

## 実装対象

### Backend

| ファイル                           | 説明                            |
| ---------------------------------- | ------------------------------- |
| src/repositories/bookRepository.ts | Prismaを使ったデータアクセス    |
| src/services/bookService.ts        | ビジネスロジック                |
| src/services/isbnService.ts        | Google Books API連携            |
| src/controllers/bookController.ts  | リクエスト/レスポンス処理       |
| src/controllers/isbnController.ts  | ISBN検索のリクエスト/レスポンス |
| src/routes/books.ts                | 本のルート定義                  |
| src/routes/isbn.ts                 | ISBN検索のルート定義            |

### Frontend

| ファイル                                       | 説明                   |
| ---------------------------------------------- | ---------------------- |
| src/features/books/services/bookService.ts     | 本のAPI呼び出し        |
| src/features/books/services/isbnService.ts     | ISBN検索API呼び出し    |
| src/features/books/hooks/useBooks.ts           | 本一覧取得hook         |
| src/features/books/hooks/useCreateBook.ts      | 本登録hook             |
| src/features/books/hooks/useIsbnSearch.ts      | ISBN検索hook           |
| src/features/books/components/AddBookModal.tsx | 本登録モーダル         |
| src/features/books/components/BookForm.tsx     | 本登録フォーム         |
| src/features/books/components/BookList.tsx     | 本一覧表示             |
| src/features/books/components/BookCard.tsx     | 本カード表示           |
| src/pages/LibraryPage.tsx                      | マイ書庫ページ（更新） |

## API仕様

### POST /api/libraries/:libraryId/books

本を登録する。

**Request:**

```json
{
  "title": "リーダブルコード",
  "author": "Dustin Boswell",
  "isbn": "9784873115658",
  "coverImage": "https://example.com/cover.jpg",
  "pageCount": 237,
  "status": "unread",
  "category": "tech"
}
```

**Response (201):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "libraryId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "リーダブルコード",
  "author": "Dustin Boswell",
  "isbn": "9784873115658",
  "coverImage": "https://example.com/cover.jpg",
  "pageCount": 237,
  "status": "unread",
  "category": "tech",
  "createdAt": "2026-01-25T00:00:00.000Z",
  "updatedAt": "2026-01-25T00:00:00.000Z"
}
```

**Response (400 - Validation Error):**

```json
{
  "code": "VALIDATION_ERROR",
  "error": "Bad Request",
  "message": "タイトルは必須です"
}
```

**Response (404 - Library Not Found):**

```json
{
  "code": "NOT_FOUND",
  "error": "Not Found",
  "message": "マイ書庫が見つかりません"
}
```

### GET /api/libraries/:libraryId/books

マイ書庫の本一覧を取得する。

**Query Parameters:**

- `status`: フィルタ（unread, wishlist, completed）
- `category`: フィルタ（tech, novel, academic, other）
- `search`: タイトル・著者で検索

**Response (200):**

```json
{
  "books": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "libraryId": "550e8400-e29b-41d4-a716-446655440000",
      "title": "リーダブルコード",
      "author": "Dustin Boswell",
      "isbn": "9784873115658",
      "coverImage": "https://example.com/cover.jpg",
      "pageCount": 237,
      "status": "unread",
      "category": "tech",
      "createdAt": "2026-01-25T00:00:00.000Z",
      "updatedAt": "2026-01-25T00:00:00.000Z"
    }
  ]
}
```

### GET /api/isbn/:isbn

ISBNで書籍情報を検索する（Google Books API連携）。

**Response (200 - Found):**

```json
{
  "title": "リーダブルコード",
  "author": "Dustin Boswell",
  "coverImage": "https://books.google.com/...",
  "pageCount": 237,
  "category": "tech"
}
```

**Response (404 - Not Found):**

```json
{
  "found": false
}
```

## データフロー

### 本の登録（ISBN検索あり）

```
[AddBookModal]
    ↓ ISBNを入力
[useIsbnSearch hook]
    ↓ isbnService.searchByIsbn(isbn)
[GET /api/isbn/:isbn]
    ↓ isbnController.search()
[isbnService.searchByIsbn()]
    ↓ Google Books API呼び出し
[レスポンス返却]
    ↓ フォームに自動入力
[BookForm]
    ↓ ステータス・カテゴリ選択、登録ボタンクリック
[useCreateBook hook]
    ↓ bookService.createBook(libraryId, data)
[POST /api/libraries/:libraryId/books]
    ↓ bookController.create()
[bookService.createBook()]
    ↓ bookRepository.create()
[Prisma → PostgreSQL]
    ↓
[レスポンス返却]
    ↓ モーダルを閉じ、一覧を更新
```

### 本の登録（手動入力）

```
[AddBookModal]
    ↓ 「手動入力」タブを選択
[BookForm]
    ↓ 必要項目を入力、登録ボタンクリック
[useCreateBook hook]
    ↓ bookService.createBook(libraryId, data)
[POST /api/libraries/:libraryId/books]
    ↓ bookController.create()
[bookService.createBook()]
    ↓ bookRepository.create()
[Prisma → PostgreSQL]
    ↓
[レスポンス返却]
    ↓ モーダルを閉じ、一覧を更新
```

## 外部API連携

### Google Books API

**エンドポイント:**

```
GET https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}
```

**レスポンス例:**

```json
{
  "totalItems": 1,
  "items": [
    {
      "volumeInfo": {
        "title": "リーダブルコード",
        "authors": ["Dustin Boswell", "Trevor Foucher"],
        "imageLinks": {
          "thumbnail": "https://books.google.com/..."
        },
        "pageCount": 237,
        "categories": ["Computers"]
      }
    }
  ]
}
```

**カテゴリマッピング:**

| Google Books カテゴリ                     | アプリカテゴリ |
| ----------------------------------------- | -------------- |
| Computers, Technology, Programming        | tech           |
| Fiction, Literature                       | novel          |
| Science, Mathematics, Philosophy, History | academic       |
| その他                                    | other          |

## 依存関係

### 使用する共通コンポーネント

- `components/Button.tsx` - ボタン
- `components/Input.tsx` - 入力フォーム
- `components/Modal.tsx` - モーダル
- `components/Loading.tsx` - ローディング表示

### 外部ライブラリ

- `react-hook-form` - フォーム管理
- `@hookform/resolvers` - zodとの連携
- `swr` - データフェッチ・キャッシュ
- `zod` - バリデーション

### shared パッケージ

- `@read-log/shared/schemas/book` - createBookSchema, updateBookSchema
- `@read-log/shared/types/book` - Book, CreateBookRequest
- `@read-log/shared/constants` - BOOK_STATUS, BOOK_CATEGORY

## 注意点

- マイ書庫が存在しない場合は404エラーを返す
- タイトルは必須（1〜200文字）
- ISBN検索のタイムアウトは5秒に設定
- ISBN検索失敗時はエラーメッセージを表示し、手動入力を促す
- 登録成功後はSWRのmutateで一覧を再取得
- 1つのマイ書庫に登録できる本は最大500冊
