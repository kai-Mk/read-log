import { describe, it, expect, vi, beforeEach } from 'vitest';
import { libraryService } from './libraryService';
import { FetchError } from '../../../utils/fetcher';

describe('libraryService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createLibrary', () => {
    it('POST /api/libraries を呼び出す', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockLibrary),
      });

      await libraryService.createLibrary({ name: '技術書コレクション' });

      expect(fetch).toHaveBeenCalledWith('/api/libraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '技術書コレクション' }),
      });
    });

    it('作成されたマイ書庫を返す', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockLibrary),
      });

      const result = await libraryService.createLibrary({ name: '技術書コレクション' });

      expect(result).toEqual(mockLibrary);
    });
  });

  describe('getLibrary', () => {
    it('GET /api/libraries/:id を呼び出す', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockLibrary),
      });

      await libraryService.getLibrary('test-uuid');

      expect(fetch).toHaveBeenCalledWith('/api/libraries/test-uuid');
    });

    it('マイ書庫情報を返す', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockLibrary),
      });

      const result = await libraryService.getLibrary('test-uuid');

      expect(result).toEqual(mockLibrary);
    });

    it('404の場合はエラーを投げる', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not found' }),
      });

      await expect(libraryService.getLibrary('non-existent')).rejects.toThrow(FetchError);
    });
  });
});
