import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { BookDetailModal } from './BookDetailModal';
import { bookService } from '../services/bookService';

vi.mock('../services/bookService', () => ({
  bookService: {
    updateBook: vi.fn(),
  },
}));

describe('BookDetailModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );

  const mockBook = {
    id: 'book-uuid',
    libraryId: 'library-uuid',
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    isbn: '9784873115658',
    coverImage: 'https://example.com/cover.jpg',
    pageCount: 237,
    status: 'unread' as const,
    category: 'tech' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('本のタイトル、著者、表紙が表示される', () => {
    render(
      <BookDetailModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        book={mockBook}
        libraryId="library-uuid"
      />,
      { wrapper }
    );

    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    expect(screen.getByText('Dustin Boswell')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('StatusDropdownでステータスを変更できる', async () => {
    const updatedBook = { ...mockBook, status: 'completed' as const };
    vi.mocked(bookService.updateBook).mockResolvedValue(updatedBook);
    const onSuccess = vi.fn();

    render(
      <BookDetailModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={onSuccess}
        book={mockBook}
        libraryId="library-uuid"
      />,
      { wrapper }
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    await waitFor(() => {
      expect(bookService.updateBook).toHaveBeenCalledWith('library-uuid', 'book-uuid', {
        title: 'リーダブルコード',
        author: 'Dustin Boswell',
        isbn: '9784873115658',
        coverImage: 'https://example.com/cover.jpg',
        pageCount: 237,
        status: 'completed',
        category: 'tech',
      });
    });
  });

  it('更新成功時にonSuccessコールバックが呼ばれる', async () => {
    const updatedBook = { ...mockBook, status: 'completed' as const };
    vi.mocked(bookService.updateBook).mockResolvedValue(updatedBook);
    const onSuccess = vi.fn();

    render(
      <BookDetailModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={onSuccess}
        book={mockBook}
        libraryId="library-uuid"
      />,
      { wrapper }
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('閉じるボタンをクリックするとonCloseが呼ばれる', () => {
    const onClose = vi.fn();

    render(
      <BookDetailModal
        isOpen={true}
        onClose={onClose}
        onSuccess={vi.fn()}
        book={mockBook}
        libraryId="library-uuid"
      />,
      { wrapper }
    );

    // フッターの閉じるボタンをクリック（テキストが「閉じる」のボタン）
    const closeButtons = screen.getAllByRole('button', { name: '閉じる' });
    const footerCloseButton = closeButtons.find((btn) => btn.textContent === '閉じる');
    if (footerCloseButton) {
      fireEvent.click(footerCloseButton);
    }

    expect(onClose).toHaveBeenCalled();
  });

  it('isOpen=falseの場合は何も表示されない', () => {
    render(
      <BookDetailModal
        isOpen={false}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        book={mockBook}
        libraryId="library-uuid"
      />,
      { wrapper }
    );

    expect(screen.queryByText('リーダブルコード')).not.toBeInTheDocument();
  });

  it('表紙画像がない場合はプレースホルダーが表示される', () => {
    const bookWithoutCover = { ...mockBook, coverImage: null };

    render(
      <BookDetailModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        book={bookWithoutCover}
        libraryId="library-uuid"
      />,
      { wrapper }
    );

    expect(screen.getByTestId('cover-placeholder')).toBeInTheDocument();
  });
});
