# 設計書: shared パッケージの構築

## 概要

- **機能**: shared パッケージの構築
- **Issue**: #6
- **ブランチ**: 6-shared-setup

フロントエンド・バックエンドで共有する型定義、zodスキーマ、定数を作成する。

## 実装するモジュール

### 1. 型定義（types/）

| ファイル     | 内容                                        |
| ------------ | ------------------------------------------- |
| `library.ts` | Library型                                   |
| `book.ts`    | Book型、BookStatus型、BookCategory型        |
| `memo.ts`    | Memo型                                      |
| `api.ts`     | APIリクエスト/レスポンス型、ErrorResponse型 |
| `index.ts`   | 再エクスポート                              |

### 2. zodスキーマ（schemas/）

| ファイル     | 内容                                     |
| ------------ | ---------------------------------------- |
| `library.ts` | createLibrarySchema, updateLibrarySchema |
| `book.ts`    | createBookSchema, updateBookSchema       |
| `memo.ts`    | createMemoSchema, updateMemoSchema       |
| `index.ts`   | 再エクスポート                           |

### 3. 定数（constants/）

| ファイル   | 内容                           |
| ---------- | ------------------------------ |
| `index.ts` | BOOK_STATUS, BOOK_CATEGORY定数 |

## データモデル

### Library

```typescript
type Library = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
```

### Book

```typescript
type BookStatus = 'unread' | 'wishlist' | 'completed';
type BookCategory = 'tech' | 'novel' | 'academic' | 'other';

type Book = {
  id: string;
  libraryId: string;
  title: string;
  author: string | null;
  isbn: string | null;
  coverImage: string | null;
  pageCount: number | null;
  status: BookStatus;
  category: BookCategory;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
```

### Memo

```typescript
type Memo = {
  id: string;
  bookId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
```

## バリデーションルール

### Library

| フィールド | ルール           |
| ---------- | ---------------- |
| name       | 必須、1〜100文字 |

### Book

| フィールド | ルール                                           |
| ---------- | ------------------------------------------------ |
| title      | 必須、1〜200文字                                 |
| author     | 任意、1〜100文字                                 |
| isbn       | 任意、ISBN-10またはISBN-13形式                   |
| coverImage | 任意、URL形式                                    |
| pageCount  | 任意、1〜99999の整数                             |
| status     | 必須、'unread' \| 'wishlist' \| 'completed'      |
| category   | 必須、'tech' \| 'novel' \| 'academic' \| 'other' |

### Memo

| フィールド | ルール             |
| ---------- | ------------------ |
| content    | 必須、1〜10000文字 |

## ディレクトリ構成

```
packages/shared/
├── src/
│   ├── types/
│   │   ├── library.ts
│   │   ├── book.ts
│   │   ├── memo.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── schemas/
│   │   ├── library.ts
│   │   ├── book.ts
│   │   ├── memo.ts
│   │   └── index.ts
│   ├── constants/
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## 依存関係

- `zod`: バリデーションスキーマ

## テストケース

### constants/index.ts

#### BOOK_STATUS

| テストケース                             | 期待値                                |
| ---------------------------------------- | ------------------------------------- |
| BOOK_STATUSが3つの値を持つ               | `['unread', 'wishlist', 'completed']` |
| BOOK_STATUS.UNREADが'unread'である       | `'unread'`                            |
| BOOK_STATUS.WISHLISTが'wishlist'である   | `'wishlist'`                          |
| BOOK_STATUS.COMPLETEDが'completed'である | `'completed'`                         |

#### BOOK_CATEGORY

| テストケース                             | 期待値                                   |
| ---------------------------------------- | ---------------------------------------- |
| BOOK_CATEGORYが4つの値を持つ             | `['tech', 'novel', 'academic', 'other']` |
| BOOK_CATEGORY.TECHが'tech'である         | `'tech'`                                 |
| BOOK_CATEGORY.NOVELが'novel'である       | `'novel'`                                |
| BOOK_CATEGORY.ACADEMICが'academic'である | `'academic'`                             |
| BOOK_CATEGORY.OTHERが'other'である       | `'other'`                                |
