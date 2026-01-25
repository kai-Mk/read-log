import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';
import { z } from 'zod';
import { bookController } from './bookController';
import { bookService } from '../services/bookService';
import { errorHandler, NotFoundError } from '../middlewares/errorHandler';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator';
import { createBookSchema } from '@read-log/shared';

vi.mock('../services/bookService', () => ({
  bookService: {
    createBook: vi.fn(),
    getBooks: vi.fn(),
  },
}));

const libraryIdSchema = z.object({
  libraryId: z.string().uuid(),
});

const getBooksQuerySchema = z.object({
  status: z.enum(['unread', 'wishlist', 'completed']).optional(),
  category: z.enum(['tech', 'novel', 'academic', 'other']).optional(),
  search: z.string().optional(),
});

describe('bookController', () => {
  let app: Hono;

  beforeEach(() => {
    vi.clearAllMocks();
    app = new Hono();
    app.onError(errorHandler);

    app.post(
      '/api/libraries/:libraryId/books',
      validateParams(libraryIdSchema),
      validateBody(createBookSchema),
      bookController.create
    );
    app.get(
      '/api/libraries/:libraryId/books',
      validateParams(libraryIdSchema),
      validateQuery(getBooksQuerySchema),
      bookController.list
    );
  });

  const mockBook = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    libraryId: '550e8400-e29b-41d4-a716-446655440000',
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    isbn: '9784873115658',
    coverImage: 'https://example.com/cover.jpg',
    pageCount: 237,
    status: 'unread',
    category: 'tech',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  describe('POST /api/libraries/:libraryId/books', () => {
    it('201を返し、本が作成される', async () => {
      vi.mocked(bookService.createBook).mockResolvedValue(mockBook);

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'リーダブルコード',
          author: 'Dustin Boswell',
          isbn: '9784873115658',
          coverImage: 'https://example.com/cover.jpg',
          pageCount: 237,
          status: 'unread',
          category: 'tech',
        }),
      });

      expect(res.status).toBe(201);
      const body = (await res.json()) as { title: string };
      expect(body.title).toBe('リーダブルコード');
      expect(bookService.createBook).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000',
        expect.objectContaining({ title: 'リーダブルコード' })
      );
    });

    it('タイトルが空の場合は400を返す', async () => {
      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '',
          status: 'unread',
          category: 'tech',
        }),
      });

      expect(res.status).toBe(400);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('VALIDATION_ERROR');
    });

    it('ライブラリが存在しない場合は404を返す', async () => {
      vi.mocked(bookService.createBook).mockRejectedValue(
        new NotFoundError('マイ書庫が見つかりません')
      );

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'テスト本',
          status: 'unread',
          category: 'tech',
        }),
      });

      expect(res.status).toBe(404);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('NOT_FOUND');
    });
  });

  describe('GET /api/libraries/:libraryId/books', () => {
    it('200を返し、本一覧を返す', async () => {
      vi.mocked(bookService.getBooks).mockResolvedValue([mockBook]);

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000/books');

      expect(res.status).toBe(200);
      const body = (await res.json()) as { books: Array<{ title: string }> };
      expect(body.books).toHaveLength(1);
      expect(body.books[0].title).toBe('リーダブルコード');
    });

    it('statusでフィルタできる', async () => {
      vi.mocked(bookService.getBooks).mockResolvedValue([mockBook]);

      const res = await app.request(
        '/api/libraries/550e8400-e29b-41d4-a716-446655440000/books?status=unread'
      );

      expect(res.status).toBe(200);
      expect(bookService.getBooks).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000',
        expect.objectContaining({ status: 'unread' })
      );
    });

    it('ライブラリが存在しない場合は404を返す', async () => {
      vi.mocked(bookService.getBooks).mockRejectedValue(
        new NotFoundError('マイ書庫が見つかりません')
      );

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000/books');

      expect(res.status).toBe(404);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('NOT_FOUND');
    });
  });
});
