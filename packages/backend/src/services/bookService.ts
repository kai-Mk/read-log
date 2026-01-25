import type { CreateBookInput } from '@read-log/shared';
import { bookRepository, FindBooksFilter } from '../repositories/bookRepository';
import { libraryRepository } from '../repositories/libraryRepository';
import { NotFoundError } from '../middlewares/errorHandler';

export const bookService = {
  async createBook(libraryId: string, input: CreateBookInput) {
    // ライブラリの存在確認
    const library = await libraryRepository.findById(libraryId);
    if (!library) {
      throw new NotFoundError('マイ書庫が見つかりません');
    }

    return bookRepository.create(libraryId, input);
  },

  async getBook(id: string) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new NotFoundError('本が見つかりません');
    }
    return book;
  },

  async getBooks(libraryId: string, filter?: FindBooksFilter) {
    // ライブラリの存在確認
    const library = await libraryRepository.findById(libraryId);
    if (!library) {
      throw new NotFoundError('マイ書庫が見つかりません');
    }

    return bookRepository.findByLibraryId(libraryId, filter);
  },
};
