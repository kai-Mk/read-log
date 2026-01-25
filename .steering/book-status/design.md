# F-03: 本の状態管理 設計書

## 機能概要

本の状態（積読/読みたい/読了）を変更できるようにする機能。ユーザーはBookCardをクリックして詳細モーダルを開き、ドロップダウンでステータスを変更できる。

## 関連ドキュメント

- `docs/product-requirements.md`: F-03 本の状態管理
- `docs/functional-design.md`:
  - 2.2 画面詳細 > 本の詳細（モーダル）
  - 3. API仕様 > PUT /api/libraries/:libraryId/books/:bookId
  - 6. ビジネスルール > 本の状態遷移

## 実装対象

### Backend

| ファイル                                              | 説明                    |
| ----------------------------------------------------- | ----------------------- |
| `packages/backend/src/repositories/bookRepository.ts` | update メソッド追加     |
| `packages/backend/src/services/bookService.ts`        | updateBook メソッド追加 |
| `packages/backend/src/controllers/bookController.ts`  | update ハンドラ追加     |
| `packages/backend/src/routes/books.ts`                | PUT /:bookId ルート追加 |

### Frontend

| ファイル                                                              | 説明                    |
| --------------------------------------------------------------------- | ----------------------- |
| `packages/frontend/src/features/books/services/bookService.ts`        | updateBook メソッド追加 |
| `packages/frontend/src/features/books/hooks/useUpdateBook.ts`         | 新規作成                |
| `packages/frontend/src/features/books/components/StatusDropdown.tsx`  | 新規作成                |
| `packages/frontend/src/features/books/components/BookDetailModal.tsx` | 新規作成                |
| `packages/frontend/src/features/books/components/BookCard.tsx`        | クリックイベント追加    |
| `packages/frontend/src/pages/LibraryPage.tsx`                         | BookDetailModal統合     |

### Shared

| ファイル | 説明                                          |
| -------- | --------------------------------------------- |
| なし     | updateBookSchema, bookIdParamSchemaは既に存在 |

## データフロー

```
[ユーザーアクション]
    |
    v
BookCard (クリック)
    |
    v
BookDetailModal (表示)
    |
    v
StatusDropdown (選択)
    |
    v
useUpdateBook.updateBook()
    |
    v
bookService.updateBook() (Frontend)
    |
    v
PUT /api/libraries/:libraryId/books/:bookId
    |
    v
bookController.update()
    |
    v
bookService.updateBook() (Backend)
    |
    v
bookRepository.update()
    |
    v
Prisma → PostgreSQL
    |
    v
[レスポンス返却]
    |
    v
SWR キャッシュ更新 (mutate)
    |
    v
BookList 再描画（本が該当ビューに移動）
```

## 依存関係

### 使用する既存コンポーネント

- `Modal` (共通コンポーネント)
- `Loading` (共通コンポーネント)

### 使用する既存hooks/services

- `bookService` (Frontend)
- `useBooks` の mutate

### 外部ライブラリ

- SWR (キャッシュ更新)
- react-hook-form (未使用 - 単純なドロップダウンのため不要)

## API仕様

### PUT /api/libraries/:libraryId/books/:bookId

**リクエスト**:

```typescript
type UpdateBookRequest = {
  title: string;
  author?: string;
  isbn?: string;
  coverImage?: string;
  pageCount?: number;
  status: 'unread' | 'wishlist' | 'completed';
  category: 'tech' | 'novel' | 'academic' | 'other';
};
```

**レスポンス**:

```typescript
type UpdateBookResponse = Book;
```

**ステータスコード**:

- 200: 更新成功
- 400: バリデーションエラー
- 404: 本またはマイ書庫が見つからない
- 500: サーバーエラー

## 注意点

1. **状態遷移**: すべての状態間で自由に遷移可能（制約なし）
2. **キャッシュ更新**: ステータス変更後は本一覧のキャッシュを更新する
3. **楽観的更新**: 今回は実装しない（シンプルにAPIレスポンス後に更新）
4. **エラーハンドリング**: 更新失敗時はエラーメッセージを表示
5. **ローディング状態**: 更新中はドロップダウンを無効化する
6. **PUT APIの仕様**: 全フィールドを送信する必要がある（PATCH方式ではない）
