import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateLibrary } from './useCreateLibrary';
import { libraryService } from '../services/libraryService';

vi.mock('../services/libraryService', () => ({
  libraryService: {
    createLibrary: vi.fn(),
  },
}));

describe('useCreateLibrary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createLibrary関数を返す', () => {
    const { result } = renderHook(() => useCreateLibrary());

    expect(typeof result.current.createLibrary).toBe('function');
  });

  it('createLibrary呼び出しでAPIを呼び出す', async () => {
    const mockLibrary = {
      id: 'test-uuid',
      name: '技術書コレクション',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    vi.mocked(libraryService.createLibrary).mockResolvedValue(mockLibrary);

    const { result } = renderHook(() => useCreateLibrary());

    await act(async () => {
      await result.current.createLibrary('技術書コレクション');
    });

    expect(libraryService.createLibrary).toHaveBeenCalledWith({ name: '技術書コレクション' });
  });

  it('成功時に作成されたマイ書庫を返す', async () => {
    const mockLibrary = {
      id: 'test-uuid',
      name: '技術書コレクション',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    vi.mocked(libraryService.createLibrary).mockResolvedValue(mockLibrary);

    const { result } = renderHook(() => useCreateLibrary());

    let library;
    await act(async () => {
      library = await result.current.createLibrary('技術書コレクション');
    });

    expect(library).toEqual(mockLibrary);
  });

  it('isLoadingが正しく更新される', async () => {
    const mockLibrary = {
      id: 'test-uuid',
      name: '技術書コレクション',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    vi.mocked(libraryService.createLibrary).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockLibrary), 100);
        })
    );

    const { result } = renderHook(() => useCreateLibrary());

    expect(result.current.isLoading).toBe(false);

    let promise: Promise<unknown>;
    act(() => {
      promise = result.current.createLibrary('技術書コレクション');
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
    const error = new Error('作成に失敗しました');
    vi.mocked(libraryService.createLibrary).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateLibrary());

    await act(async () => {
      await result.current.createLibrary('技術書コレクション');
    });

    expect(result.current.error).toEqual(error);
  });
});
