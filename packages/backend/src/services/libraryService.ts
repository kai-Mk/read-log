import { libraryRepository } from '../repositories/libraryRepository';
import { NotFoundError } from '../middlewares/errorHandler';

export type CreateLibraryInput = {
  name: string;
};

export type UpdateLibraryInput = {
  name: string;
};

export const libraryService = {
  async createLibrary(input: CreateLibraryInput) {
    return libraryRepository.create(input);
  },

  async getLibrary(id: string) {
    const library = await libraryRepository.findById(id);
    if (!library) {
      throw new NotFoundError('マイ書庫が見つかりません');
    }
    return library;
  },

  async updateLibrary(id: string, input: UpdateLibraryInput) {
    // 存在確認
    await this.getLibrary(id);
    return libraryRepository.update(id, input);
  },
};
