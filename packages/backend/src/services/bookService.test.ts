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
    update: vi.fn(),
    softDelete: vi.fn(),
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

  describe('updateBook', () => {
    const updatedBook = {
      ...mockBook,
      title: '更新後のタイトル',
      status: 'completed',
    };

    it('本を更新できる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findById).mockResolvedValue(mockBook);
      vi.mocked(bookRepository.update).mockResolvedValue(updatedBook);

      const input = {
        title: '更新後のタイトル',
        status: 'completed' as const,
        category: 'tech' as const,
      };

      const result = await bookService.updateBook('library-uuid', 'book-uuid', input);

      expect(libraryRepository.findById).toHaveBeenCalledWith('library-uuid');
      expect(bookRepository.findById).toHaveBeenCalledWith('book-uuid');
      expect(bookRepository.update).toHaveBeenCalledWith('book-uuid', input);
      expect(result).toEqual(updatedBook);
    });

    it('ライブラリが存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(null);

      const input = {
        title: 'テスト',
        status: 'unread' as const,
        category: 'other' as const,
      };

      await expect(bookService.updateBook('non-existent', 'book-uuid', input)).rejects.toThrow(
        NotFoundError
      );
      await expect(bookService.updateBook('non-existent', 'book-uuid', input)).rejects.toThrow(
        'マイ書庫が見つかりません'
      );
      expect(bookRepository.update).not.toHaveBeenCalled();
    });

    it('本が存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findById).mockResolvedValue(null);

      const input = {
        title: 'テスト',
        status: 'unread' as const,
        category: 'other' as const,
      };

      await expect(bookService.updateBook('library-uuid', 'non-existent', input)).rejects.toThrow(
        NotFoundError
      );
      await expect(bookService.updateBook('library-uuid', 'non-existent', input)).rejects.toThrow(
        '本が見つかりません'
      );
      expect(bookRepository.update).not.toHaveBeenCalled();
    });

    it('他のライブラリの本は更新できない', async () => {
      const otherLibraryBook = {
        ...mockBook,
        libraryId: 'other-library-uuid',
      };
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findById).mockResolvedValue(otherLibraryBook);

      const input = {
        title: 'テスト',
        status: 'unread' as const,
        category: 'other' as const,
      };

      await expect(bookService.updateBook('library-uuid', 'book-uuid', input)).rejects.toThrow(
        NotFoundError
      );
      await expect(bookService.updateBook('library-uuid', 'book-uuid', input)).rejects.toThrow(
        '本が見つかりません'
      );
      expect(bookRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteBook', () => {
    it('本を削除できる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findById).mockResolvedValue(mockBook);
      vi.mocked(bookRepository.softDelete).mockResolvedValue({
        ...mockBook,
        deletedAt: new Date(),
      });

      await bookService.deleteBook('library-uuid', 'book-uuid');

      expect(libraryRepository.findById).toHaveBeenCalledWith('library-uuid');
      expect(bookRepository.findById).toHaveBeenCalledWith('book-uuid');
      expect(bookRepository.softDelete).toHaveBeenCalledWith('book-uuid');
    });

    it('ライブラリが存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(null);

      await expect(bookService.deleteBook('non-existent', 'book-uuid')).rejects.toThrow(
        NotFoundError
      );
      await expect(bookService.deleteBook('non-existent', 'book-uuid')).rejects.toThrow(
        'マイ書庫が見つかりません'
      );
      expect(bookRepository.softDelete).not.toHaveBeenCalled();
    });

    it('本が存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findById).mockResolvedValue(null);

      await expect(bookService.deleteBook('library-uuid', 'non-existent')).rejects.toThrow(
        NotFoundError
      );
      await expect(bookService.deleteBook('library-uuid', 'non-existent')).rejects.toThrow(
        '本が見つかりません'
      );
      expect(bookRepository.softDelete).not.toHaveBeenCalled();
    });

    it('他のライブラリの本は削除できない', async () => {
      const otherLibraryBook = {
        ...mockBook,
        libraryId: 'other-library-uuid',
      };
      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(bookRepository.findById).mockResolvedValue(otherLibraryBook);

      await expect(bookService.deleteBook('library-uuid', 'book-uuid')).rejects.toThrow(
        NotFoundError
      );
      await expect(bookService.deleteBook('library-uuid', 'book-uuid')).rejects.toThrow(
        '本が見つかりません'
      );
      expect(bookRepository.softDelete).not.toHaveBeenCalled();
    });
  });
});
