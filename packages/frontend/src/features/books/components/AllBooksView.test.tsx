import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AllBooksView } from './AllBooksView';
import type { Book } from '@read-log/shared';

describe('AllBooksView', () => {
  const mockBooks: Book[] = [
    {
      id: 'book-1',
      libraryId: 'library-uuid',
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      isbn: '9784873115658',
      coverImage: 'https://example.com/cover1.jpg',
      pageCount: 237,
      status: 'unread',
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
      status: 'completed',
      category: 'tech',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  it('全ての本がグリッド形式で表示される', () => {
    render(<AllBooksView books={mockBooks} onBookClick={vi.fn()} />);

    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  it('本がない場合は空状態メッセージが表示される', () => {
    render(<AllBooksView books={[]} onBookClick={vi.fn()} />);

    expect(screen.getByText('登録されている本はありません')).toBeInTheDocument();
  });

  it('本をクリックするとonBookClickが呼ばれる', () => {
    const onBookClick = vi.fn();
    render(<AllBooksView books={mockBooks} onBookClick={onBookClick} />);

    const bookCard = screen.getByRole('button', { name: /リーダブルコード/i });
    fireEvent.click(bookCard);

    expect(onBookClick).toHaveBeenCalledWith(mockBooks[0]);
  });
});
