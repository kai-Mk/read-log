import { z } from 'zod';
import { BOOK_STATUS, BOOK_CATEGORY } from '../constants';

// パスパラメータ用スキーマ
export const libraryIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const libraryIdWithBooksParamSchema = z.object({
  libraryId: z.string().uuid(),
});

export const bookIdParamSchema = z.object({
  libraryId: z.string().uuid(),
  bookId: z.string().uuid(),
});

export const isbnParamSchema = z.object({
  isbn: z.string().min(10).max(13),
});

// クエリパラメータ用スキーマ
export const getBooksQuerySchema = z.object({
  status: z.enum([BOOK_STATUS.UNREAD, BOOK_STATUS.WISHLIST, BOOK_STATUS.COMPLETED]).optional(),
  category: z
    .enum([BOOK_CATEGORY.TECH, BOOK_CATEGORY.NOVEL, BOOK_CATEGORY.ACADEMIC, BOOK_CATEGORY.OTHER])
    .optional(),
  search: z.string().optional(),
});

// 型エクスポート
export type LibraryIdParam = z.infer<typeof libraryIdParamSchema>;
export type LibraryIdWithBooksParam = z.infer<typeof libraryIdWithBooksParamSchema>;
export type BookIdParam = z.infer<typeof bookIdParamSchema>;
export type IsbnParam = z.infer<typeof isbnParamSchema>;
export type GetBooksQuery = z.infer<typeof getBooksQuerySchema>;
