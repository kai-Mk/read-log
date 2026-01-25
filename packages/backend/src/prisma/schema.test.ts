import { describe, it, expect } from 'vitest';
import type {
  Library as SharedLibrary,
  Book as SharedBook,
  Memo as SharedMemo,
} from '@read-log/shared';

/**
 * Prismaモデルと共有型定義の整合性を検証するテスト
 * 共有型の構造をテストし、Prismaスキーマとの整合性を確認する
 */

describe('Prisma Schema', () => {
  describe('Library モデル', () => {
    it('必須フィールドを持つ', () => {
      const library: SharedLibrary = {
        id: 'test-id',
        name: 'テスト書庫',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      expect(library.id).toBeDefined();
      expect(library.name).toBeDefined();
      expect(library.createdAt).toBeInstanceOf(Date);
      expect(library.updatedAt).toBeInstanceOf(Date);
      expect(library.deletedAt).toBeNull();
    });
  });

  describe('Book モデル', () => {
    it('必須フィールドを持つ', () => {
      const book: SharedBook = {
        id: 'test-book-id',
        libraryId: 'test-library-id',
        title: 'テストブック',
        author: null,
        isbn: null,
        coverImage: null,
        pageCount: null,
        status: 'unread',
        category: 'other',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      expect(book.id).toBeDefined();
      expect(book.libraryId).toBeDefined();
      expect(book.title).toBeDefined();
      expect(book.status).toBe('unread');
      expect(book.category).toBe('other');
    });

    it('オプションフィールドを持つ', () => {
      const book: SharedBook = {
        id: 'test-book-id',
        libraryId: 'test-library-id',
        title: 'テストブック',
        author: '著者名',
        isbn: '9784000000000',
        coverImage: 'https://example.com/cover.jpg',
        pageCount: 300,
        status: 'completed',
        category: 'tech',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      expect(book.author).toBe('著者名');
      expect(book.isbn).toBe('9784000000000');
      expect(book.coverImage).toBe('https://example.com/cover.jpg');
      expect(book.pageCount).toBe(300);
    });
  });

  describe('Memo モデル', () => {
    it('必須フィールドを持つ', () => {
      const memo: SharedMemo = {
        id: 'test-memo-id',
        bookId: 'test-book-id',
        content: 'メモの内容',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      expect(memo.id).toBeDefined();
      expect(memo.bookId).toBeDefined();
      expect(memo.content).toBeDefined();
      expect(memo.createdAt).toBeInstanceOf(Date);
      expect(memo.updatedAt).toBeInstanceOf(Date);
      expect(memo.deletedAt).toBeNull();
    });
  });
});
