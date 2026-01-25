import { describe, it, expect, vi, beforeEach } from 'vitest';
import { libraryRepository } from './libraryRepository';
import { prisma } from '../utils/prisma';

vi.mock('../utils/prisma', () => ({
  prisma: {
    library: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('libraryRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('マイ書庫を作成できる', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(prisma.library.create).mockResolvedValue(mockLibrary);

      const result = await libraryRepository.create({ name: '技術書コレクション' });

      expect(prisma.library.create).toHaveBeenCalledWith({
        data: { name: '技術書コレクション' },
      });
      expect(result).toEqual(mockLibrary);
    });
  });

  describe('findById', () => {
    it('IDでマイ書庫を取得できる', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(prisma.library.findUnique).mockResolvedValue(mockLibrary);

      const result = await libraryRepository.findById('test-uuid');

      expect(prisma.library.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-uuid', deletedAt: null },
      });
      expect(result).toEqual(mockLibrary);
    });

    it('存在しないIDの場合はnullを返す', async () => {
      vi.mocked(prisma.library.findUnique).mockResolvedValue(null);

      const result = await libraryRepository.findById('non-existent');

      expect(result).toBeNull();
    });

    it('削除済み（deletedAt != null）の場合はnullを返す', async () => {
      // deletedAt条件がwhereに含まれているので、Prismaがnullを返す
      vi.mocked(prisma.library.findUnique).mockResolvedValue(null);

      const result = await libraryRepository.findById('deleted-uuid');

      expect(prisma.library.findUnique).toHaveBeenCalledWith({
        where: { id: 'deleted-uuid', deletedAt: null },
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('マイ書庫の名前を更新できる', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '新しい名前',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(prisma.library.update).mockResolvedValue(mockLibrary);

      const result = await libraryRepository.update('test-uuid', {
        name: '新しい名前',
      });

      expect(prisma.library.update).toHaveBeenCalledWith({
        where: { id: 'test-uuid' },
        data: { name: '新しい名前' },
      });
      expect(result).toEqual(mockLibrary);
    });
  });
});
