# backend パッケージの構築 - タスクリスト

## 概要

TDDサイクル（Red → Green → Refactor）に基づいてバックエンドの基盤を構築する。

## タスク

### Phase 1: Prisma スキーマ作成

#### 1.1 Library モデル定義

- [ ] **Red**: Library モデルの型定義テストを作成
- [ ] **Green**: schema.prisma に Library モデルを追加
- [ ] **Refactor**: 型定義の整合性確認

#### 1.2 Book モデル定義

- [ ] **Red**: Book モデルの型定義テストを作成
- [ ] **Green**: schema.prisma に Book モデルを追加
- [ ] **Refactor**: Library との関連付け確認

#### 1.3 Memo モデル定義

- [ ] **Red**: Memo モデルの型定義テストを作成
- [ ] **Green**: schema.prisma に Memo モデルを追加
- [ ] **Refactor**: Book との関連付け確認

#### 1.4 マイグレーション実行

- [ ] `npx prisma migrate dev --name init` で初期マイグレーション
- [ ] Prisma Client 生成確認

### Phase 2: ユーティリティ作成

#### 2.1 Prisma Client シングルトン

- [ ] **Red**: Prisma Client インスタンス取得テストを作成
- [ ] **Green**: `utils/prisma.ts` を作成
- [ ] **Refactor**: シングルトンパターンの確認

#### 2.2 UUID生成ユーティリティ

- [ ] **Red**: UUID形式の検証テストを作成
- [ ] **Green**: `utils/uuid.ts` を作成
- [ ] **Refactor**: 型定義の追加

### Phase 3: ミドルウェア作成

#### 3.1 CORS ミドルウェア

- [ ] **Red**: CORS ヘッダー付与テストを作成
- [ ] **Green**: `middlewares/cors.ts` を作成
- [ ] **Refactor**: 環境変数からオリジン取得

#### 3.2 エラーハンドリングミドルウェア

- [ ] **Red**: エラーレスポンス形式テストを作成
- [ ] **Green**: `middlewares/errorHandler.ts` を作成
- [ ] **Refactor**: エラータイプ別の処理

#### 3.3 バリデーションミドルウェア

- [ ] **Red**: バリデーションエラーテストを作成
- [ ] **Green**: `middlewares/validator.ts` を作成
- [ ] **Refactor**: zodスキーマとの連携

### Phase 4: アプリケーション設定

#### 4.1 Hono アプリケーション分離

- [ ] **Red**: アプリケーション設定テストを作成
- [ ] **Green**: `app.ts` を作成、`index.ts` からアプリ設定を分離
- [ ] **Refactor**: ミドルウェア登録順序の整理

#### 4.2 ルート集約

- [ ] **Red**: ルート定義テストを作成
- [ ] **Green**: `routes/index.ts` を作成
- [ ] **Refactor**: ヘルスチェックエンドポイントの移動

### Phase 5: ディレクトリ構成整備

#### 5.1 空ディレクトリの作成

- [ ] `controllers/` ディレクトリと `.gitkeep` 作成
- [ ] `services/` ディレクトリと `.gitkeep` 作成
- [ ] `repositories/` ディレクトリと `.gitkeep` 作成

#### 5.2 型定義

- [ ] **Red**: Context 型拡張テストを作成
- [ ] **Green**: `types/context.ts` を作成
- [ ] **Refactor**: Prisma Client の型統合

### Phase 6: 統合確認

#### 6.1 サーバー起動確認

- [ ] 開発サーバー起動テスト
- [ ] ヘルスチェックエンドポイント動作確認
- [ ] CORS ヘッダー確認

#### 6.2 データベース接続確認

- [ ] Prisma Client 接続テスト
- [ ] PostgreSQL との疎通確認

## 完了条件

- [ ] Prisma スキーマに Library, Book, Memo モデルが定義されている
- [ ] 初期マイグレーションが実行され、テーブルが作成されている
- [ ] CORS ミドルウェアが動作している
- [ ] エラーハンドリングミドルウェアが動作している
- [ ] バリデーションミドルウェアが動作している
- [ ] ディレクトリ構成が整備されている
- [ ] すべてのテストがパスしている
