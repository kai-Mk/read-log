import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LibraryPage } from './LibraryPage';
import type { Library, Book } from '@read-log/shared';

// Mock hooks
const mockLibrary: Library = {
  id: 'library-uuid',
  name: 'テスト書庫',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const mockBooks: Book[] = [
  {
    id: 'book-1',
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
  },
];

vi.mock('../features/library/hooks/useLibrary', () => ({
  useLibrary: () => ({
    data: mockLibrary,
    isLoading: false,
    error: undefined,
  }),
}));

vi.mock('../features/books/hooks/useBooks', () => ({
  useBooks: () => ({
    data: mockBooks,
    isLoading: false,
    error: undefined,
    mutate: vi.fn(),
  }),
}));

vi.mock('../features/books/hooks/useCreateBook', () => ({
  useCreateBook: () => ({
    createBook: vi.fn().mockResolvedValue({ id: 'new-book-id' }),
    isLoading: false,
    error: null,
  }),
}));

vi.mock('../features/books/hooks/useIsbnSearch', () => ({
  useIsbnSearch: () => ({
    search: vi.fn().mockResolvedValue(null),
    isSearching: false,
    error: null,
  }),
}));

vi.mock('../features/books/hooks/useUpdateBook', () => ({
  useUpdateBook: () => ({
    updateBook: vi.fn().mockResolvedValue({ id: 'book-1' }),
    isLoading: false,
    error: null,
  }),
}));

const renderWithRouter = (libraryId: string = 'library-uuid') => {
  return render(
    <MemoryRouter initialEntries={[`/libraries/${libraryId}`]}>
      <Routes>
        <Route path="/libraries/:libraryId" element={<LibraryPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('LibraryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('書庫名が表示される', () => {
    renderWithRouter();

    expect(screen.getByText('テスト書庫')).toBeInTheDocument();
  });

  it('「本を追加」ボタンが表示される', () => {
    renderWithRouter();

    expect(screen.getByRole('button', { name: '本を追加' })).toBeInTheDocument();
  });

  it('本一覧が表示される', () => {
    renderWithRouter();

    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
  });

  it('「本を追加」ボタンをクリックするとモーダルが開く', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByRole('button', { name: '本を追加' }));

    expect(screen.getByText('本を登録')).toBeInTheDocument();
  });

  it('本カードをクリックすると詳細モーダルが開く', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // 本カードをクリック（ボタンとして表示されている）
    const bookCards = screen.getAllByRole('button');
    const bookCard = bookCards.find((button) => button.textContent?.includes('リーダブルコード'));
    if (bookCard) {
      await user.click(bookCard);
    }

    expect(screen.getByText('本の詳細')).toBeInTheDocument();
  });
});
