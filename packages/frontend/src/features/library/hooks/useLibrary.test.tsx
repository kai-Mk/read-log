import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { useLibrary } from './useLibrary';
import { libraryService } from '../services/libraryService';
import { FetchError } from '../../../utils/fetcher';

vi.mock('../services/libraryService', () => ({
  libraryService: {
    getLibrary: vi.fn(),
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>{children}</SWRConfig>
);

describe('useLibrary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('libraryIdを渡すとマイ書庫を取得する', async () => {
    const mockLibrary = {
      id: 'test-uuid',
      name: '技術書コレクション',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    vi.mocked(libraryService.getLibrary).mockResolvedValue(mockLibrary);

    const { result } = renderHook(() => useLibrary('test-uuid'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockLibrary);
    });

    expect(libraryService.getLibrary).toHaveBeenCalledWith('test-uuid');
  });

  it('取得中はisLoadingがtrueになる', async () => {
    const mockLibrary = {
      id: 'test-uuid',
      name: '技術書コレクション',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    vi.mocked(libraryService.getLibrary).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockLibrary), 100);
        })
    );

    const { result } = renderHook(() => useLibrary('test-uuid'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('取得成功時にdataにマイ書庫情報がセットされる', async () => {
    const mockLibrary = {
      id: 'test-uuid',
      name: '技術書コレクション',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    vi.mocked(libraryService.getLibrary).mockResolvedValue(mockLibrary);

    const { result } = renderHook(() => useLibrary('test-uuid'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockLibrary);
    });
  });

  it('404の場合はerrorがセットされる', async () => {
    const error = new FetchError('Not found', 404);
    vi.mocked(libraryService.getLibrary).mockRejectedValue(error);

    const { result } = renderHook(() => useLibrary('non-existent'), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
