import { z } from 'zod';
import { BOOK_STATUS, BOOK_CATEGORY } from '../constants';

const bookStatusSchema = z.enum([BOOK_STATUS.UNREAD, BOOK_STATUS.WISHLIST, BOOK_STATUS.COMPLETED]);

const bookCategorySchema = z.enum([
  BOOK_CATEGORY.TECH,
  BOOK_CATEGORY.NOVEL,
  BOOK_CATEGORY.ACADEMIC,
  BOOK_CATEGORY.OTHER,
]);

export const createBookSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100).optional(),
  isbn: z.string().optional(),
  coverImage: z.string().url().optional(),
  pageCount: z.number().int().min(1).max(99999).optional(),
  status: bookStatusSchema,
  category: bookCategorySchema,
});

export const updateBookSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100).optional(),
  isbn: z.string().optional(),
  coverImage: z.string().url().optional(),
  pageCount: z.number().int().min(1).max(99999).optional(),
  status: bookStatusSchema,
  category: bookCategorySchema,
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
