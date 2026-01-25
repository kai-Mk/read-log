import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isbnService, mapCategory } from './isbnService';

// グローバルfetchをモック
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('isbnService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchByIsbn', () => {
    it('Google Books APIから書籍情報を取得できる', async () => {
      const mockResponse = {
        totalItems: 1,
        items: [
          {
            volumeInfo: {
              title: 'リーダブルコード',
              authors: ['Dustin Boswell', 'Trevor Foucher'],
              imageLinks: {
                thumbnail: 'https://books.google.com/cover.jpg',
              },
              pageCount: 237,
              categories: ['Computers'],
            },
          },
        ],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await isbnService.searchByIsbn('9784873115658');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=isbn:9784873115658'
      );
      expect(result).toEqual({
        title: 'リーダブルコード',
        author: 'Dustin Boswell, Trevor Foucher',
        coverImage: 'https://books.google.com/cover.jpg',
        pageCount: 237,
        category: 'tech',
      });
    });

    it('見つからない場合はnullを返す', async () => {
      const mockResponse = {
        totalItems: 0,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await isbnService.searchByIsbn('0000000000000');

      expect(result).toBeNull();
    });

    it('APIエラー時はnullを返す', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await isbnService.searchByIsbn('9784873115658');

      expect(result).toBeNull();
    });

    it('レスポンスがokでない場合はnullを返す', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      const result = await isbnService.searchByIsbn('9784873115658');

      expect(result).toBeNull();
    });
  });

  describe('mapCategory', () => {
    it('Computersカテゴリをtechにマッピングする', () => {
      expect(mapCategory(['Computers'])).toBe('tech');
    });

    it('Technologyカテゴリをtechにマッピングする', () => {
      expect(mapCategory(['Technology'])).toBe('tech');
    });

    it('Programmingカテゴリをtechにマッピングする', () => {
      expect(mapCategory(['Programming'])).toBe('tech');
    });

    it('Fictionカテゴリをnovelにマッピングする', () => {
      expect(mapCategory(['Fiction'])).toBe('novel');
    });

    it('Literatureカテゴリをnovelにマッピングする', () => {
      expect(mapCategory(['Literature'])).toBe('novel');
    });

    it('Scienceカテゴリをacademicにマッピングする', () => {
      expect(mapCategory(['Science'])).toBe('academic');
    });

    it('Mathematicsカテゴリをacademicにマッピングする', () => {
      expect(mapCategory(['Mathematics'])).toBe('academic');
    });

    it('Philosophyカテゴリをacademicにマッピングする', () => {
      expect(mapCategory(['Philosophy'])).toBe('academic');
    });

    it('Historyカテゴリをacademicにマッピングする', () => {
      expect(mapCategory(['History'])).toBe('academic');
    });

    it('該当しないカテゴリはotherにマッピングする', () => {
      expect(mapCategory(['Cooking'])).toBe('other');
    });

    it('空配列はotherにマッピングする', () => {
      expect(mapCategory([])).toBe('other');
    });

    it('undefinedはotherにマッピングする', () => {
      expect(mapCategory(undefined)).toBe('other');
    });

    it('複数カテゴリがある場合は最初にマッチしたものを返す', () => {
      expect(mapCategory(['Cooking', 'Computers', 'Fiction'])).toBe('tech');
    });
  });
});
