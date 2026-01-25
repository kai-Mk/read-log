import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateBook } from './useCreateBook';
import { bookService } from '../services/bookService';

vi.mock('../services/bookService', () => ({
  bookService: {
    createBook: vi.fn(),
  },
}));

vi.mock('swr', async () => {
  const actual = await vi.importActual('swr');
  return {
    ...actual,
    useSWRConfig: () => ({
      mutate: vi.fn(),
    }),
  };
});

describe('useCreateBook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('createBook関数を返す', () => {
    const { result } = renderHook(() => useCreateBook('library-uuid'));

    expect(typeof result.current.createBook).toBe('function');
  });

  it('createBook呼び出しでAPIを呼び出す', async () => {
    vi.mocked(bookService.createBook).mockResolvedValue(mockBook);

    const { result } = renderHook(() => useCreateBook('library-uuid'));

    const input = {
      title: 'リーダブルコード',
      status: 'unread' as const,
      category: 'tech' as const,
    };

    await act(async () => {
      await result.current.createBook(input);
    });

    expect(bookService.createBook).toHaveBeenCalledWith('library-uuid', input);
  });

  it('成功時に作成された本を返す', async () => {
    vi.mocked(bookService.createBook).mockResolvedValue(mockBook);

    const { result } = renderHook(() => useCreateBook('library-uuid'));

    const input = {
      title: 'リーダブルコード',
      status: 'unread' as const,
      category: 'tech' as const,
    };

    let book;
    await act(async () => {
      book = await result.current.createBook(input);
    });

    expect(book).toEqual(mockBook);
  });

  it('isLoadingが正しく更新される', async () => {
    vi.mocked(bookService.createBook).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockBook), 100);
        })
    );

    const { result } = renderHook(() => useCreateBook('library-uuid'));

    expect(result.current.isLoading).toBe(false);

    const input = {
      title: 'リーダブルコード',
      status: 'unread' as const,
      category: 'tech' as const,
    };

    let promise: Promise<unknown>;
    act(() => {
      promise = result.current.createBook(input);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('エラー時にerrorがセットされる', async () => {
    const error = new Error('登録に失敗しました');
    vi.mocked(bookService.createBook).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateBook('library-uuid'));

    const input = {
      title: 'リーダブルコード',
      status: 'unread' as const,
      category: 'tech' as const,
    };

    await act(async () => {
      await result.current.createBook(input);
    });

    expect(result.current.error).toEqual(error);
  });
});
