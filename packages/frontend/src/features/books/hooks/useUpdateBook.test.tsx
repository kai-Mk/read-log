import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { useUpdateBook } from './useUpdateBook';
import { bookService } from '../services/bookService';

vi.mock('../services/bookService', () => ({
  bookService: {
    updateBook: vi.fn(),
  },
}));

describe('useUpdateBook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );

  const mockBook = {
    id: 'book-uuid',
    libraryId: 'library-uuid',
    title: '更新後のタイトル',
    author: 'Dustin Boswell',
    isbn: '9784873115658',
    coverImage: 'https://example.com/cover.jpg',
    pageCount: 237,
    status: 'completed' as const,
    category: 'tech' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  it('updateBookで本を更新できる', async () => {
    vi.mocked(bookService.updateBook).mockResolvedValue(mockBook);

    const { result } = renderHook(() => useUpdateBook('library-uuid'), { wrapper });

    let updatedBook;
    await act(async () => {
      updatedBook = await result.current.updateBook('book-uuid', {
        title: '更新後のタイトル',
        status: 'completed',
        category: 'tech',
      });
    });

    expect(bookService.updateBook).toHaveBeenCalledWith('library-uuid', 'book-uuid', {
      title: '更新後のタイトル',
      status: 'completed',
      category: 'tech',
    });
    expect(updatedBook).toEqual(mockBook);
  });

  it('更新中はisLoadingがtrueになる', async () => {
    let resolvePromise: (value: typeof mockBook) => void;
    const promise = new Promise<typeof mockBook>((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(bookService.updateBook).mockReturnValue(promise);

    const { result } = renderHook(() => useUpdateBook('library-uuid'), { wrapper });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.updateBook('book-uuid', {
        title: 'テスト',
        status: 'unread',
        category: 'other',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      resolvePromise!(mockBook);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('エラー時にerrorが設定される', async () => {
    const error = new Error('更新に失敗しました');
    vi.mocked(bookService.updateBook).mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateBook('library-uuid'), { wrapper });

    await act(async () => {
      await result.current.updateBook('book-uuid', {
        title: 'テスト',
        status: 'unread',
        category: 'other',
      });
    });

    expect(result.current.error).toEqual(error);
  });

  it('更新成功時はnullを返す（エラーなし）', async () => {
    vi.mocked(bookService.updateBook).mockResolvedValue(mockBook);

    const { result } = renderHook(() => useUpdateBook('library-uuid'), { wrapper });

    await act(async () => {
      await result.current.updateBook('book-uuid', {
        title: '更新後のタイトル',
        status: 'completed',
        category: 'tech',
      });
    });

    expect(result.current.error).toBeNull();
  });
});
