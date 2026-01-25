import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';
import { z } from 'zod';
import { isbnController } from './isbnController';
import { isbnService } from '../services/isbnService';
import { errorHandler } from '../middlewares/errorHandler';
import { validateParams } from '../middlewares/validator';

vi.mock('../services/isbnService', () => ({
  isbnService: {
    searchByIsbn: vi.fn(),
  },
}));

const isbnSchema = z.object({
  isbn: z.string().min(10).max(13),
});

describe('isbnController', () => {
  let app: Hono;

  beforeEach(() => {
    vi.clearAllMocks();
    app = new Hono();
    app.onError(errorHandler);

    app.get('/api/isbn/:isbn', validateParams(isbnSchema), isbnController.search);
  });

  describe('GET /api/isbn/:isbn', () => {
    it('200を返し、書籍情報を返す', async () => {
      const mockResult = {
        title: 'リーダブルコード',
        author: 'Dustin Boswell',
        coverImage: 'https://books.google.com/cover.jpg',
        pageCount: 237,
        category: 'tech' as const,
      };

      vi.mocked(isbnService.searchByIsbn).mockResolvedValue(mockResult);

      const res = await app.request('/api/isbn/9784873115658');

      expect(res.status).toBe(200);
      const body = (await res.json()) as { title: string };
      expect(body.title).toBe('リーダブルコード');
      expect(isbnService.searchByIsbn).toHaveBeenCalledWith('9784873115658');
    });

    it('見つからない場合は404を返す', async () => {
      vi.mocked(isbnService.searchByIsbn).mockResolvedValue(null);

      const res = await app.request('/api/isbn/0000000000000');

      expect(res.status).toBe(404);
      const body = (await res.json()) as { found: boolean };
      expect(body.found).toBe(false);
    });
  });
});
