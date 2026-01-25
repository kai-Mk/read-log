import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookCard } from './BookCard';
import type { Book } from '@read-log/shared';

describe('BookCard', () => {
  const mockBook: Book = {
    id: 'book-uuid',
    libraryId: 'library-uuid',
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    isbn: '9784873115658',
    coverImage: 'https://example.com/cover.jpg',
    pageCount: 237,
    status: 'unread',
    category: 'tech',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('本のタイトルが表示される', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
  });

  it('本の著者が表示される', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText('Dustin Boswell')).toBeInTheDocument();
  });

  it('表紙画像が表示される（存在する場合）', () => {
    render(<BookCard book={mockBook} />);

    const img = screen.getByRole('img', { name: 'リーダブルコード' });
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('表紙画像がない場合はプレースホルダーが表示される', () => {
    const bookWithoutCover = { ...mockBook, coverImage: null };
    render(<BookCard book={bookWithoutCover} />);

    expect(screen.getByTestId('cover-placeholder')).toBeInTheDocument();
  });

  it('ステータスバッジが表示される', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText('積読')).toBeInTheDocument();
  });

  it('wishlistステータスの場合は「読みたい」と表示される', () => {
    const wishlistBook = { ...mockBook, status: 'wishlist' as const };
    render(<BookCard book={wishlistBook} />);

    expect(screen.getByText('読みたい')).toBeInTheDocument();
  });

  it('completedステータスの場合は「読了」と表示される', () => {
    const completedBook = { ...mockBook, status: 'completed' as const };
    render(<BookCard book={completedBook} />);

    expect(screen.getByText('読了')).toBeInTheDocument();
  });

  it('カードをクリックするとonClickが呼ばれる', () => {
    const onClick = vi.fn();
    render(<BookCard book={mockBook} onClick={onClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalled();
  });

  it('onClickが指定されていない場合はボタンではなくdivとして表示される', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
