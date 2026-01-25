import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddBookModal } from './AddBookModal';

// Mock the hooks
vi.mock('../hooks/useIsbnSearch', () => ({
  useIsbnSearch: () => ({
    search: vi.fn().mockResolvedValue({
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      coverImage: 'https://example.com/cover.jpg',
      pageCount: 237,
      category: 'tech',
    }),
    isSearching: false,
    error: null,
  }),
}));

vi.mock('../hooks/useCreateBook', () => ({
  useCreateBook: () => ({
    createBook: vi.fn().mockResolvedValue({ id: 'new-book-id' }),
    isLoading: false,
    error: null,
  }),
}));

describe('AddBookModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  const libraryId = 'library-uuid';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('モーダルが表示される', () => {
    render(
      <AddBookModal isOpen onClose={mockOnClose} onSuccess={mockOnSuccess} libraryId={libraryId} />
    );

    expect(screen.getByText('本を登録')).toBeInTheDocument();
  });

  it('isOpenがfalseの場合はモーダルが表示されない', () => {
    render(
      <AddBookModal
        isOpen={false}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        libraryId={libraryId}
      />
    );

    expect(screen.queryByText('本を登録')).not.toBeInTheDocument();
  });

  it('ISBN検索フィールドが表示される', () => {
    render(
      <AddBookModal isOpen onClose={mockOnClose} onSuccess={mockOnSuccess} libraryId={libraryId} />
    );

    expect(screen.getByPlaceholderText('ISBNを入力')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '検索' })).toBeInTheDocument();
  });

  it('閉じるボタンをクリックするとonCloseが呼ばれる', async () => {
    const user = userEvent.setup();
    render(
      <AddBookModal isOpen onClose={mockOnClose} onSuccess={mockOnSuccess} libraryId={libraryId} />
    );

    await user.click(screen.getByRole('button', { name: '閉じる' }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
