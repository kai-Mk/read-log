import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookService } from './bookService';
import { FetchError } from '../../../utils/fetcher';

describe('bookService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockBook = {
    id: 'book-uuid',
    libraryId: 'library-uuid',
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    isbn: '9784873115658',
    coverImage: 'https://example.com/cover.jpg',
    pageCount: 237,
    status: 'unread',
    category: 'tech',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  };

  describe('createBook', () => {
    it('POST /api/libraries/:libraryId/books を呼び出す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBook),
      });

      const input = {
        title: 'リーダブルコード',
        author: 'Dustin Boswell',
        isbn: '9784873115658',
        coverImage: 'https://example.com/cover.jpg',
        pageCount: 237,
        status: 'unread' as const,
        category: 'tech' as const,
      };

      await bookService.createBook('library-uuid', input);

      expect(fetch).toHaveBeenCalledWith('/api/libraries/library-uuid/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
    });

    it('作成された本を返す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBook),
      });

      const input = {
        title: 'リーダブルコード',
        status: 'unread' as const,
        category: 'tech' as const,
      };

      const result = await bookService.createBook('library-uuid', input);

      expect(result).toEqual(mockBook);
    });
  });

  describe('getBooks', () => {
    it('GET /api/libraries/:libraryId/books を呼び出す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ books: [mockBook] }),
      });

      await bookService.getBooks('library-uuid');

      expect(fetch).toHaveBeenCalledWith('/api/libraries/library-uuid/books');
    });

    it('本一覧を返す', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ books: [mockBook] }),
      });

      const result = await bookService.getBooks('library-uuid');

      expect(result).toEqual([mockBook]);
    });

    it('クエリパラメータを渡せる', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ books: [mockBook] }),
      });

      await bookService.getBooks('library-uuid', {
        status: 'unread',
        category: 'tech',
        search: 'リーダブル',
      });

      expect(fetch).toHaveBeenCalledWith(
        '/api/libraries/library-uuid/books?status=unread&category=tech&search=%E3%83%AA%E3%83%BC%E3%83%80%E3%83%96%E3%83%AB'
      );
    });

    it('404の場合はエラーを投げる', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not found' }),
      });

      await expect(bookService.getBooks('non-existent')).rejects.toThrow(FetchError);
    });
  });
});
