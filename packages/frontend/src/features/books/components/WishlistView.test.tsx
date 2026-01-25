import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistView } from './WishlistView';
import type { Book } from '@read-log/shared';

describe('WishlistView', () => {
  const mockBooks: Book[] = [
    {
      id: 'book-1',
      libraryId: 'library-uuid',
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      isbn: '9784873115658',
      coverImage: 'https://example.com/cover1.jpg',
      pageCount: 237,
      status: 'wishlist',
      category: 'tech',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 'book-2',
      libraryId: 'library-uuid',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9784048930598',
      coverImage: 'https://example.com/cover2.jpg',
      pageCount: 464,
      status: 'wishlist',
      category: 'tech',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  it('statusがwishlistの本のみ表示される', () => {
    render(<WishlistView books={mockBooks} onBookClick={vi.fn()} />);

    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  it('本が本屋さん風のスタイルで表示される', () => {
    render(<WishlistView books={mockBooks} onBookClick={vi.fn()} />);

    const container = screen.getByTestId('wishlist-display');
    expect(container).toBeInTheDocument();
  });

  it('読みたい本がない場合は空状態メッセージが表示される', () => {
    render(<WishlistView books={[]} onBookClick={vi.fn()} />);

    expect(screen.getByText('読みたい本はありません')).toBeInTheDocument();
  });

  it('本をクリックするとonBookClickが呼ばれる', () => {
    const onBookClick = vi.fn();
    render(<WishlistView books={mockBooks} onBookClick={onBookClick} />);

    const bookCard = screen.getByRole('button', { name: /リーダブルコード/i });
    fireEvent.click(bookCard);

    expect(onBookClick).toHaveBeenCalledWith(mockBooks[0]);
  });
});
