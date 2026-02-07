import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { useDeleteBook } from './useDeleteBook';
import { bookService } from '../services/bookService';

vi.mock('../services/bookService', () => ({
  bookService: {
    deleteBook: vi.fn(),
  },
}));

describe('useDeleteBook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );

  it('deleteBookで本を削除できる', async () => {
    vi.mocked(bookService.deleteBook).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteBook('library-uuid'), { wrapper });

    let success;
    await act(async () => {
      success = await result.current.deleteBook('book-uuid');
    });

    expect(bookService.deleteBook).toHaveBeenCalledWith('library-uuid', 'book-uuid');
    expect(success).toBe(true);
  });

  it('削除中はisLoadingがtrueになる', async () => {
    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(bookService.deleteBook).mockReturnValue(promise);

    const { result } = renderHook(() => useDeleteBook('library-uuid'), { wrapper });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.deleteBook('book-uuid');
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      resolvePromise!();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('エラー時にerrorが設定される', async () => {
    const error = new Error('削除に失敗しました');
    vi.mocked(bookService.deleteBook).mockRejectedValue(error);

    const { result } = renderHook(() => useDeleteBook('library-uuid'), { wrapper });

    await act(async () => {
      await result.current.deleteBook('book-uuid');
    });

    expect(result.current.error).toEqual(error);
  });

  it('エラー時にfalseを返す', async () => {
    const error = new Error('削除に失敗しました');
    vi.mocked(bookService.deleteBook).mockRejectedValue(error);

    const { result } = renderHook(() => useDeleteBook('library-uuid'), { wrapper });

    let success;
    await act(async () => {
      success = await result.current.deleteBook('book-uuid');
    });

    expect(success).toBe(false);
  });

  it('削除成功時はerrorがnullになる', async () => {
    vi.mocked(bookService.deleteBook).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteBook('library-uuid'), { wrapper });

    await act(async () => {
      await result.current.deleteBook('book-uuid');
    });

    expect(result.current.error).toBeNull();
  });
});
