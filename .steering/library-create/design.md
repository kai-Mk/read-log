# F-01: マイ書庫の作成 設計書

## 機能概要

新規ユーザーがマイ書庫を作成し、URLをブックマークしてアクセスできるようにする。マイ書庫には一意のUUIDが付与され、そのIDを使ってアクセスする。

## 関連ドキュメント

- [PRD F-01](../../docs/product-requirements.md)
- [機能設計 API仕様](../../docs/functional-design.md)

## 受け入れ条件

- 「マイ書庫を作成」ボタンをクリックするとマイ書庫が作成される
- マイ書庫には一意のIDが付与される（UUID）
- 作成後、マイ書庫のURLが表示される
- URLをブックマークすることで次回以降アクセスできる
- 既存のマイ書庫IDを入力してアクセスできる

## 実装対象

### Backend

| ファイル                              | 説明                         |
| ------------------------------------- | ---------------------------- |
| src/repositories/libraryRepository.ts | Prismaを使ったデータアクセス |
| src/services/libraryService.ts        | ビジネスロジック             |
| src/controllers/libraryController.ts  | リクエスト/レスポンス処理    |
| src/routes/libraries.ts               | ルート定義                   |

### Frontend

| ファイル                                        | 説明                   |
| ----------------------------------------------- | ---------------------- |
| src/features/library/services/libraryService.ts | API呼び出し            |
| src/features/library/hooks/useLibrary.ts        | マイ書庫取得hook       |
| src/features/library/hooks/useCreateLibrary.ts  | マイ書庫作成hook       |
| src/pages/TopPage.tsx                           | トップページ（更新）   |
| src/pages/LibraryPage.tsx                       | マイ書庫ページ（更新） |

## API仕様

### POST /api/libraries

マイ書庫を作成する。

**Request:**

```json
{
  "name": "マイ書庫"
}
```

**Response (201):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "マイ書庫",
  "createdAt": "2026-01-25T00:00:00.000Z",
  "updatedAt": "2026-01-25T00:00:00.000Z"
}
```

### GET /api/libraries/:libraryId

マイ書庫を取得する。

**Response (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "マイ書庫",
  "createdAt": "2026-01-25T00:00:00.000Z",
  "updatedAt": "2026-01-25T00:00:00.000Z"
}
```

**Response (404):**

```json
{
  "code": "NOT_FOUND",
  "error": "Not Found",
  "message": "マイ書庫が見つかりません"
}
```

### PUT /api/libraries/:libraryId

マイ書庫を更新する。

**Request:**

```json
{
  "name": "新しい名前"
}
```

**Response (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "新しい名前",
  "createdAt": "2026-01-25T00:00:00.000Z",
  "updatedAt": "2026-01-25T00:00:00.000Z"
}
```

## データフロー

```
[TopPage]
    ↓ 「マイ書庫を作成」クリック
[useCreateLibrary hook]
    ↓ libraryService.createLibrary()
[POST /api/libraries]
    ↓ libraryController.create()
[libraryService.createLibrary()]
    ↓ libraryRepository.create()
[Prisma → PostgreSQL]
    ↓
[レスポンス返却]
    ↓
[/library/:libraryId へ遷移]
```

## 注意点

- UUIDはバックエンドで生成（Prismaの@default(uuid())）
- 名前のデフォルト値は「マイ書庫」
- 名前は1〜100文字
- 存在しないライブラリIDへのアクセスは404を返す
