import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useIsbnSearch } from './useIsbnSearch';
import { isbnService } from '../services/isbnService';

vi.mock('../services/isbnService', () => ({
  isbnService: {
    searchByIsbn: vi.fn(),
  },
}));

describe('useIsbnSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockResult = {
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    coverImage: 'https://books.google.com/cover.jpg',
    pageCount: 237,
    category: 'tech' as const,
  };

  it('search関数を返す', () => {
    const { result } = renderHook(() => useIsbnSearch());

    expect(typeof result.current.search).toBe('function');
  });

  it('search呼び出しでAPIを呼び出す', async () => {
    vi.mocked(isbnService.searchByIsbn).mockResolvedValue(mockResult);

    const { result } = renderHook(() => useIsbnSearch());

    await act(async () => {
      await result.current.search('9784873115658');
    });

    expect(isbnService.searchByIsbn).toHaveBeenCalledWith('9784873115658');
  });

  it('成功時に書籍情報を返す', async () => {
    vi.mocked(isbnService.searchByIsbn).mockResolvedValue(mockResult);

    const { result } = renderHook(() => useIsbnSearch());

    let searchResult;
    await act(async () => {
      searchResult = await result.current.search('9784873115658');
    });

    expect(searchResult).toEqual(mockResult);
  });

  it('見つからない場合はnullを返す', async () => {
    vi.mocked(isbnService.searchByIsbn).mockResolvedValue(null);

    const { result } = renderHook(() => useIsbnSearch());

    let searchResult;
    await act(async () => {
      searchResult = await result.current.search('0000000000000');
    });

    expect(searchResult).toBeNull();
  });

  it('isSearchingが正しく更新される', async () => {
    vi.mocked(isbnService.searchByIsbn).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockResult), 100);
        })
    );

    const { result } = renderHook(() => useIsbnSearch());

    expect(result.current.isSearching).toBe(false);

    let promise: Promise<unknown>;
    act(() => {
      promise = result.current.search('9784873115658');
    });

    await waitFor(() => {
      expect(result.current.isSearching).toBe(true);
    });

    await act(async () => {
      await promise;
    });

    expect(result.current.isSearching).toBe(false);
  });
});
