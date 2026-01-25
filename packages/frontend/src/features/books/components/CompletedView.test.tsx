import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompletedView } from './CompletedView';
import type { Book } from '@read-log/shared';

describe('CompletedView', () => {
  const mockBooks: Book[] = [
    {
      id: 'book-1',
      libraryId: 'library-uuid',
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      isbn: '9784873115658',
      coverImage: 'https://example.com/cover1.jpg',
      pageCount: 237,
      status: 'completed',
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

  it('statusがcompletedの本のみ表示される', () => {
    render(<CompletedView books={mockBooks} onBookClick={vi.fn()} />);

    expect(screen.getAllByText('リーダブルコード').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Clean Code').length).toBeGreaterThan(0);
  });

  it('本が本棚風のスタイルで表示される', () => {
    render(<CompletedView books={mockBooks} onBookClick={vi.fn()} />);

    const container = screen.getByTestId('completed-bookshelf');
    expect(container).toBeInTheDocument();
  });

  it('読了の本がない場合は空状態メッセージが表示される', () => {
    render(<CompletedView books={[]} onBookClick={vi.fn()} />);

    expect(screen.getByText('読了した本はありません')).toBeInTheDocument();
  });

  it('本をクリックするとonBookClickが呼ばれる', () => {
    const onBookClick = vi.fn();
    render(<CompletedView books={mockBooks} onBookClick={onBookClick} />);

    const bookCards = screen.getAllByRole('button');
    fireEvent.click(bookCards[0]);

    expect(onBookClick).toHaveBeenCalledWith(mockBooks[0]);
  });
});
