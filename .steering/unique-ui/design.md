# F-07: ユニークUI表示 設計書

## 機能概要

本の状態（積読/読みたい/読了）に応じたユニークなUIで表示し、読書体験を楽しくする機能。各ステータスごとに異なるビジュアルで本を表示し、タブで切り替えられるようにする。

## 関連ドキュメント

- `docs/product-requirements.md`: F-07 ユニークUI表示
- `docs/functional-design.md`:
  - 2.2 画面詳細 > マイ書庫
  - ビュー切り替えタブ（積読/読みたい/読了/すべて）

## 実装対象

### Frontend

| ファイル                                                            | 説明                               |
| ------------------------------------------------------------------- | ---------------------------------- |
| `packages/frontend/src/features/books/components/ViewTabs.tsx`      | ビュー切り替えタブ                 |
| `packages/frontend/src/features/books/components/UnreadView.tsx`    | 積読ビュー（本が積み重なるUI）     |
| `packages/frontend/src/features/books/components/WishlistView.tsx`  | 読みたいビュー（本屋さん風UI）     |
| `packages/frontend/src/features/books/components/CompletedView.tsx` | 読了ビュー（本棚風UI）             |
| `packages/frontend/src/features/books/components/AllBooksView.tsx`  | すべてビュー（既存のグリッド表示） |
| `packages/frontend/src/pages/LibraryPage.tsx`                       | ビュー切り替え統合                 |

## 各ビューのデザインコンセプト

### 積読ビュー（UnreadView）

- **コンセプト**: 本が机の上に積み重なっているイメージ
- **UI**: 本を斜めに重ねて表示、少しずつずらして積み上げる
- **色味**: 暖色系（アンバー/オレンジ）のアクセント

### 読みたいビュー（WishlistView）

- **コンセプト**: 本屋さんの平積み/面陳列
- **UI**: 本の表紙を大きく見せる、カード形式で並べる
- **色味**: 明るいブルー系のアクセント

### 読了ビュー（CompletedView）

- **コンセプト**: 本棚に整理されている状態
- **UI**: 本棚風の背景、本の背表紙を並べる
- **色味**: グリーン系のアクセント

### すべてビュー（AllBooksView）

- **コンセプト**: 標準的なグリッド表示
- **UI**: 既存のBookListと同様
- **色味**: ニュートラル

## データフロー

```
[ユーザーアクション]
    |
    v
ViewTabs (タブ選択)
    |
    v
LibraryPage (activeView状態更新)
    |
    v
条件分岐: activeView === 'unread' | 'wishlist' | 'completed' | 'all'
    |
    +-- UnreadView (status='unread' でフィルタ)
    +-- WishlistView (status='wishlist' でフィルタ)
    +-- CompletedView (status='completed' でフィルタ)
    +-- AllBooksView (フィルタなし)
    |
    v
各ビューでBookCardを表示
    |
    v
[本クリック → BookDetailModal]
```

## 依存関係

### 使用する既存コンポーネント

- `BookCard` - 本のカード表示
- `BookDetailModal` - 本の詳細モーダル

### 使用する既存hooks

- `useBooks` - 本一覧の取得（フィルタ対応済み）

### 外部ライブラリ

- Tailwind CSS（スタイリング）
- CSS Transitions（アニメーション）

## 注意点

1. **パフォーマンス**: 本の数が多い場合のレンダリング最適化
2. **レスポンシブ**: モバイル/タブレット/デスクトップでの表示調整
3. **アクセシビリティ**: タブのキーボード操作対応
4. **状態維持**: タブ切り替え時のスクロール位置
5. **フィルタリング**: 各ビューでは該当ステータスの本のみ表示
6. **空状態**: 各ビューで本がない場合の表示
