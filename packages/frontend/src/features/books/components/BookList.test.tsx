import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookList } from './BookList';
import type { Book } from '@read-log/shared';

describe('BookList', () => {
  const mockBooks: Book[] = [
    {
      id: 'book-1',
      libraryId: 'library-uuid',
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      isbn: '9784873115658',
      coverImage: 'https://example.com/cover1.jpg',
      pageCount: 237,
      status: 'unread' as const,
      category: 'tech' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 'book-2',
      libraryId: 'library-uuid',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      coverImage: 'https://example.com/cover2.jpg',
      pageCount: 464,
      status: 'completed' as const,
      category: 'tech' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  it('本のリストが表示される', () => {
    render(<BookList books={mockBooks} />);

    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  it('本がない場合は空の状態が表示される', () => {
    render(<BookList books={[]} />);

    expect(screen.getByText('登録されている本はありません')).toBeInTheDocument();
  });

  it('ローディング中はスケルトンが表示される', () => {
    render(<BookList books={[]} isLoading />);

    expect(screen.getByTestId('book-list-skeleton')).toBeInTheDocument();
  });

  it('エラーがある場合はエラーメッセージが表示される', () => {
    const error = new Error('読み込みに失敗しました');
    render(<BookList books={[]} error={error} />);

    expect(screen.getByText('読み込みに失敗しました')).toBeInTheDocument();
  });
});
