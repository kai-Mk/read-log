import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookService } from './bookService';
import { bookRepository } from '../repositories/bookRepository';
import { libraryRepository } from '../repositories/libraryRepository';
import { NotFoundError } from '../middlewares/errorHandler';

vi.mock('../repositories/bookRepository', () => ({
  bookRepository: {
    create: vi.fn(),
    findById: vi.fn(),
    findByLibraryId: vi.fn(),
  },
}));

vi.mock('../repositories/libraryRepository', () => ({
  libraryRepository: {
    findById: vi.fn(),
  },
}));

describe('bookService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockLibrary = {
    id: 'library-uuid',
    name: '技術書コレクション',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

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
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  describe('createBook', () => {
    it('本を作成できる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.create).mockResolvedValue(mockBook);

      const input = {
        title: 'リーダブルコード',
        author: 'Dustin Boswell',
        isbn: '9784873115658',
        coverImage: 'https://example.com/cover.jpg',
        pageCount: 237,
        status: 'unread' as const,
        category: 'tech' as const,
      };

      const result = await bookService.createBook('library-uuid', input);

      expect(libraryRepository.findById).toHaveBeenCalledWith('library-uuid');
      expect(bookRepository.create).toHaveBeenCalledWith('library-uuid', input);
      expect(result).toEqual(mockBook);
    });

    it('ライブラリが存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(null);

      const input = {
        title: 'テスト本',
        status: 'unread' as const,
        category: 'other' as const,
      };

      await expect(bookService.createBook('non-existent', input)).rejects.toThrow(NotFoundError);
      await expect(bookService.createBook('non-existent', input)).rejects.toThrow(
        'マイ書庫が見つかりません'
      );
      expect(bookRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getBook', () => {
    it('本を取得できる', async () => {
      vi.mocked(bookRepository.findById).mockResolvedValue(mockBook);

      const result = await bookService.getBook('book-uuid');

      expect(bookRepository.findById).toHaveBeenCalledWith('book-uuid');
      expect(result).toEqual(mockBook);
    });

    it('存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(bookRepository.findById).mockResolvedValue(null);

      await expect(bookService.getBook('non-existent')).rejects.toThrow(NotFoundError);
      await expect(bookService.getBook('non-existent')).rejects.toThrow('本が見つかりません');
    });
  });

  describe('getBooks', () => {
    const mockBooks = [mockBook];

    it('ライブラリの本一覧を取得できる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findByLibraryId).mockResolvedValue(mockBooks);

      const result = await bookService.getBooks('library-uuid');

      expect(libraryRepository.findById).toHaveBeenCalledWith('library-uuid');
      expect(bookRepository.findByLibraryId).toHaveBeenCalledWith('library-uuid', undefined);
      expect(result).toEqual(mockBooks);
    });

    it('ライブラリが存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(null);

      await expect(bookService.getBooks('non-existent')).rejects.toThrow(NotFoundError);
      await expect(bookService.getBooks('non-existent')).rejects.toThrow(
        'マイ書庫が見つかりません'
      );
      expect(bookRepository.findByLibraryId).not.toHaveBeenCalled();
    });

    it('フィルタとsearchを適用できる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findByLibraryId).mockResolvedValue(mockBooks);

      const filter = {
        status: 'unread' as const,
        category: 'tech' as const,
        search: 'リーダブル',
      };

      const result = await bookService.getBooks('library-uuid', filter);

      expect(bookRepository.findByLibraryId).toHaveBeenCalledWith('library-uuid', filter);
      expect(result).toEqual(mockBooks);
    });
  });
});
