import { describe, it, expect, vi, beforeEach } from 'vitest';
import { libraryService } from './libraryService';
import { libraryRepository } from '../repositories/libraryRepository';
import { NotFoundError } from '../middlewares/errorHandler';

vi.mock('../repositories/libraryRepository', () => ({
  libraryRepository: {
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
  },
}));

describe('libraryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createLibrary', () => {
    it('マイ書庫を作成できる', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(libraryRepository.create).mockResolvedValue(mockLibrary);

      const result = await libraryService.createLibrary({ name: '技術書コレクション' });

      expect(libraryRepository.create).toHaveBeenCalledWith({ name: '技術書コレクション' });
      expect(result).toEqual(mockLibrary);
    });
  });

  describe('getLibrary', () => {
    it('マイ書庫を取得できる', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);

      const result = await libraryService.getLibrary('test-uuid');

      expect(libraryRepository.findById).toHaveBeenCalledWith('test-uuid');
      expect(result).toEqual(mockLibrary);
    });

    it('存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(null);

      await expect(libraryService.getLibrary('non-existent')).rejects.toThrow(NotFoundError);
      await expect(libraryService.getLibrary('non-existent')).rejects.toThrow(
        'マイ書庫が見つかりません'
      );
    });
  });

  describe('updateLibrary', () => {
    it('マイ書庫を更新できる', async () => {
      const mockLibrary = {
        id: 'test-uuid',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const updatedLibrary = {
        ...mockLibrary,
        name: '新しい名前',
      };

      vi.mocked(libraryRepository.findById).mockResolvedValue(mockLibrary);
      vi.mocked(libraryRepository.update).mockResolvedValue(updatedLibrary);

      const result = await libraryService.updateLibrary('test-uuid', {
        name: '新しい名前',
      });

      expect(libraryRepository.update).toHaveBeenCalledWith('test-uuid', {
        name: '新しい名前',
      });
      expect(result).toEqual(updatedLibrary);
    });

    it('存在しない場合はNotFoundErrorを投げる', async () => {
      vi.mocked(libraryRepository.findById).mockResolvedValue(null);

      await expect(
        libraryService.updateLibrary('non-existent', { name: '新しい名前' })
      ).rejects.toThrow(NotFoundError);
    });
  });
});
