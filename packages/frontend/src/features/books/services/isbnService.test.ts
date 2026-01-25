import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isbnService } from './isbnService';

describe('isbnService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockResult = {
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    coverImage: 'https://books.google.com/cover.jpg',
    pageCount: 237,
    category: 'tech' as const,
  };

  describe('searchByIsbn', () => {
    it('GET /api/isbn/:isbn を呼び出す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResult),
      });

      await isbnService.searchByIsbn('9784873115658');

      expect(fetch).toHaveBeenCalledWith('/api/isbn/9784873115658');
    });

    it('書籍情報を返す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResult),
      });

      const result = await isbnService.searchByIsbn('9784873115658');

      expect(result).toEqual(mockResult);
    });

    it('404の場合はnullを返す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ found: false }),
      });

      const result = await isbnService.searchByIsbn('0000000000000');

      expect(result).toBeNull();
    });
  });
});
