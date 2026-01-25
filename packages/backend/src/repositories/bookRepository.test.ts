import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookRepository } from './bookRepository';
import { prisma } from '../utils/prisma';

vi.mock('../utils/prisma', () => ({
  prisma: {
    book: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('bookRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('本を作成できる', async () => {
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

      vi.mocked(prisma.book.create).mockResolvedValue(mockBook);

      const result = await bookRepository.create('library-uuid', {
        title: 'リーダブルコード',
        author: 'Dustin Boswell',
        isbn: '9784873115658',
        coverImage: 'https://example.com/cover.jpg',
        pageCount: 237,
        status: 'unread',
        category: 'tech',
      });

      expect(prisma.book.create).toHaveBeenCalledWith({
        data: {
          libraryId: 'library-uuid',
          title: 'リーダブルコード',
          author: 'Dustin Boswell',
          isbn: '9784873115658',
          coverImage: 'https://example.com/cover.jpg',
          pageCount: 237,
          status: 'unread',
          category: 'tech',
        },
      });
      expect(result).toEqual(mockBook);
    });

    it('libraryIdが存在しない場合はエラーを投げる', async () => {
      const prismaError = new Error('Foreign key constraint failed');
      vi.mocked(prisma.book.create).mockRejectedValue(prismaError);

      await expect(
        bookRepository.create('non-existent-library', {
          title: 'テスト本',
          status: 'unread',
          category: 'other',
        })
      ).rejects.toThrow('Foreign key constraint failed');
    });
  });

  describe('findById', () => {
    it('IDで本を取得できる', async () => {
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

      vi.mocked(prisma.book.findUnique).mockResolvedValue(mockBook);

      const result = await bookRepository.findById('book-uuid');

      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: 'book-uuid', deletedAt: null },
      });
      expect(result).toEqual(mockBook);
    });

    it('存在しないIDの場合はnullを返す', async () => {
      vi.mocked(prisma.book.findUnique).mockResolvedValue(null);

      const result = await bookRepository.findById('non-existent');

      expect(result).toBeNull();
    });

    it('削除済み（deletedAt != null）の場合はnullを返す', async () => {
      vi.mocked(prisma.book.findUnique).mockResolvedValue(null);

      const result = await bookRepository.findById('deleted-uuid');

      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: 'deleted-uuid', deletedAt: null },
      });
      expect(result).toBeNull();
    });
  });

  describe('findByLibraryId', () => {
    const mockBooks = [
      {
        id: 'book-1',
        libraryId: 'library-uuid',
        title: 'リーダブルコード',
        author: 'Dustin Boswell',
        isbn: '9784873115658',
        coverImage: null,
        pageCount: 237,
        status: 'unread',
        category: 'tech',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'book-2',
        libraryId: 'library-uuid',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: null,
        coverImage: null,
        pageCount: 464,
        status: 'completed',
        category: 'tech',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    it('ライブラリIDで本一覧を取得できる', async () => {
      vi.mocked(prisma.book.findMany).mockResolvedValue(mockBooks);

      const result = await bookRepository.findByLibraryId('library-uuid');

      expect(prisma.book.findMany).toHaveBeenCalledWith({
        where: {
          libraryId: 'library-uuid',
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(mockBooks);
    });

    it('statusでフィルタできる', async () => {
      vi.mocked(prisma.book.findMany).mockResolvedValue([mockBooks[0]]);

      const result = await bookRepository.findByLibraryId('library-uuid', {
        status: 'unread',
      });

      expect(prisma.book.findMany).toHaveBeenCalledWith({
        where: {
          libraryId: 'library-uuid',
          deletedAt: null,
          status: 'unread',
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toHaveLength(1);
    });

    it('categoryでフィルタできる', async () => {
      vi.mocked(prisma.book.findMany).mockResolvedValue(mockBooks);

      const result = await bookRepository.findByLibraryId('library-uuid', {
        category: 'tech',
      });

      expect(prisma.book.findMany).toHaveBeenCalledWith({
        where: {
          libraryId: 'library-uuid',
          deletedAt: null,
          category: 'tech',
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(mockBooks);
    });

    it('タイトル・著者で検索できる', async () => {
      vi.mocked(prisma.book.findMany).mockResolvedValue([mockBooks[0]]);

      const result = await bookRepository.findByLibraryId('library-uuid', {
        search: 'リーダブル',
      });

      expect(prisma.book.findMany).toHaveBeenCalledWith({
        where: {
          libraryId: 'library-uuid',
          deletedAt: null,
          OR: [
            { title: { contains: 'リーダブル', mode: 'insensitive' } },
            { author: { contains: 'リーダブル', mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('本の情報を更新できる', async () => {
      const updatedBook = {
        id: 'book-uuid',
        libraryId: 'library-uuid',
        title: '更新後のタイトル',
        author: '更新後の著者',
        isbn: '9784873115658',
        coverImage: 'https://example.com/cover.jpg',
        pageCount: 300,
        status: 'completed',
        category: 'tech',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(prisma.book.update).mockResolvedValue(updatedBook);

      const result = await bookRepository.update('book-uuid', {
        title: '更新後のタイトル',
        author: '更新後の著者',
        status: 'completed',
        category: 'tech',
      });

      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: 'book-uuid', deletedAt: null },
        data: {
          title: '更新後のタイトル',
          author: '更新後の著者',
          status: 'completed',
          category: 'tech',
        },
      });
      expect(result).toEqual(updatedBook);
    });

    it('存在しない本の場合はnullを返す', async () => {
      const prismaError = new Error('Record to update not found');
      (prismaError as { code?: string }).code = 'P2025';
      vi.mocked(prisma.book.update).mockRejectedValue(prismaError);

      const result = await bookRepository.update('non-existent', {
        title: 'テスト',
        status: 'unread',
        category: 'other',
      });

      expect(result).toBeNull();
    });
  });
});
