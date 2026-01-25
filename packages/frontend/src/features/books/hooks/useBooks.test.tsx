import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { useBooks } from './useBooks';
import { bookService, GetBooksFilter } from '../services/bookService';
import { FetchError } from '../../../utils/fetcher';

vi.mock('../services/bookService', () => ({
  bookService: {
    getBooks: vi.fn(),
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>{children}</SWRConfig>
);

describe('useBooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockBooks = [
    {
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
    },
  ];

  it('libraryIdを渡すと本一覧を取得する', async () => {
    vi.mocked(bookService.getBooks).mockResolvedValue(mockBooks);

    const { result } = renderHook(() => useBooks('library-uuid'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBooks);
    });

    expect(bookService.getBooks).toHaveBeenCalledWith('library-uuid', undefined);
  });

  it('取得中はisLoadingがtrueになる', async () => {
    vi.mocked(bookService.getBooks).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockBooks), 100);
        })
    );

    const { result } = renderHook(() => useBooks('library-uuid'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('取得成功時にdataに本一覧がセットされる', async () => {
    vi.mocked(bookService.getBooks).mockResolvedValue(mockBooks);

    const { result } = renderHook(() => useBooks('library-uuid'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBooks);
    });
  });

  it('フィルタ条件を変更すると再取得する', async () => {
    vi.mocked(bookService.getBooks).mockResolvedValue(mockBooks);

    const { result, rerender } = renderHook(
      ({ libraryId, filter }: { libraryId: string; filter: GetBooksFilter | undefined }) =>
        useBooks(libraryId, filter),
      {
        wrapper,
        initialProps: {
          libraryId: 'library-uuid',
          filter: undefined as GetBooksFilter | undefined,
        },
      }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBooks);
    });

    rerender({ libraryId: 'library-uuid', filter: { status: 'unread' } });

    await waitFor(() => {
      expect(bookService.getBooks).toHaveBeenCalledWith('library-uuid', { status: 'unread' });
    });
  });

  it('404の場合はerrorがセットされる', async () => {
    const error = new FetchError('Not found', 404);
    vi.mocked(bookService.getBooks).mockRejectedValue(error);

    const { result } = renderHook(() => useBooks('non-existent'), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
