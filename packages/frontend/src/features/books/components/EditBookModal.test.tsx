import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { EditBookModal } from './EditBookModal';
import { bookService } from '../services/bookService';
import type { Book } from '@read-log/shared';

vi.mock('../services/bookService', () => ({
  bookService: {
    updateBook: vi.fn(),
  },
}));

describe('EditBookModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );

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

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
    book: mockBook,
    libraryId: 'library-uuid',
  };

  it('モーダルが表示される', () => {
    render(<EditBookModal {...defaultProps} />, { wrapper });

    expect(screen.getByText('本の編集')).toBeInTheDocument();
    expect(screen.getByLabelText('タイトル')).toHaveValue('リーダブルコード');
  });

  it('isOpenがfalseの場合は表示されない', () => {
    render(<EditBookModal {...defaultProps} isOpen={false} />, { wrapper });

    expect(screen.queryByText('本の編集')).not.toBeInTheDocument();
  });

  it('保存成功時にonSuccessが呼ばれる', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    vi.mocked(bookService.updateBook).mockResolvedValue(mockBook);

    render(<EditBookModal {...defaultProps} onSuccess={onSuccess} />, { wrapper });

    await user.click(screen.getByRole('button', { name: '保存' }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('キャンセル時にonCloseが呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<EditBookModal {...defaultProps} onClose={onClose} />, { wrapper });

    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    expect(onClose).toHaveBeenCalled();
  });

  it('更新時に正しいデータが送信される', async () => {
    const user = userEvent.setup();
    vi.mocked(bookService.updateBook).mockResolvedValue(mockBook);

    render(<EditBookModal {...defaultProps} />, { wrapper });

    const titleInput = screen.getByLabelText('タイトル');
    await user.clear(titleInput);
    await user.type(titleInput, '新しいタイトル');

    await user.click(screen.getByRole('button', { name: '保存' }));

    await waitFor(() => {
      expect(bookService.updateBook).toHaveBeenCalledWith(
        'library-uuid',
        'book-uuid',
        expect.objectContaining({
          title: '新しいタイトル',
          status: 'unread',
          category: 'tech',
        })
      );
    });
  });
});
