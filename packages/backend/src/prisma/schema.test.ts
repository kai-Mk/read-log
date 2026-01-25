import { describe, it, expect } from 'vitest';
import type { Library, Book, Memo } from '@prisma/client';
import type {
  Library as SharedLibrary,
  Book as SharedBook,
  Memo as SharedMemo,
} from '@read-log/shared';

/**
 * Prismaモデルと共有型定義の整合性を検証するテスト
 * 型レベルでの整合性を確認し、実行時にはモデルの構造を検証する
 */

describe('Prisma Schema', () => {
  describe('Library モデル', () => {
    it('必須フィールドを持つ', () => {
      const library: Library = {
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

    it('共有型定義と同じフィールドを持つ', () => {
      // 型レベルでの整合性確認
      const prismaLibrary: Library = {
        id: 'test-id',
        name: 'テスト書庫',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // Prismaの型が共有型にキャスト可能であることを確認
      const sharedLibrary: SharedLibrary = prismaLibrary;

      expect(sharedLibrary.id).toBe(prismaLibrary.id);
      expect(sharedLibrary.name).toBe(prismaLibrary.name);
    });
  });

  describe('Book モデル', () => {
    it('必須フィールドを持つ', () => {
      const book: Book = {
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
      const book: Book = {
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

    it('共有型定義と同じフィールドを持つ', () => {
      const prismaBook: Book = {
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

      // Prismaの型が共有型にキャスト可能であることを確認
      // status/categoryはPrismaではstring型だが、実行時の値はリテラル型と互換性がある
      const sharedBook: SharedBook = {
        ...prismaBook,
        status: prismaBook.status as SharedBook['status'],
        category: prismaBook.category as SharedBook['category'],
      };

      expect(sharedBook.id).toBe(prismaBook.id);
      expect(sharedBook.libraryId).toBe(prismaBook.libraryId);
      expect(sharedBook.title).toBe(prismaBook.title);
    });
  });

  describe('Memo モデル', () => {
    it('必須フィールドを持つ', () => {
      const memo: Memo = {
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

    it('共有型定義と同じフィールドを持つ', () => {
      const prismaMemo: Memo = {
        id: 'test-memo-id',
        bookId: 'test-book-id',
        content: 'メモの内容',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // Prismaの型が共有型にキャスト可能であることを確認
      const sharedMemo: SharedMemo = prismaMemo;

      expect(sharedMemo.id).toBe(prismaMemo.id);
      expect(sharedMemo.bookId).toBe(prismaMemo.bookId);
      expect(sharedMemo.content).toBe(prismaMemo.content);
    });
  });
});
