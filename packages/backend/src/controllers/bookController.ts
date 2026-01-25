import type { Context } from 'hono';
import type { CreateBookInput, UpdateBookInput, BookStatus, BookCategory } from '@read-log/shared';
import { bookService } from '../services/bookService';

export const bookController = {
  async create(c: Context) {
    const { libraryId } = c.get('validatedParams') as { libraryId: string };
    const body = c.get('validatedBody') as CreateBookInput;
    const book = await bookService.createBook(libraryId, body);
    return c.json(book, 201);
  },

  async list(c: Context) {
    const { libraryId } = c.get('validatedParams') as { libraryId: string };
    const query = c.get('validatedQuery') as {
      status?: BookStatus;
      category?: BookCategory;
      search?: string;
    };

    const filter = {
      ...(query.status && { status: query.status }),
      ...(query.category && { category: query.category }),
      ...(query.search && { search: query.search }),
    };

    const books = await bookService.getBooks(
      libraryId,
      Object.keys(filter).length > 0 ? filter : undefined
    );
    return c.json({ books });
  },

  async update(c: Context) {
    const { libraryId, bookId } = c.get('validatedParams') as {
      libraryId: string;
      bookId: string;
    };
    const body = c.get('validatedBody') as UpdateBookInput;
    const book = await bookService.updateBook(libraryId, bookId, body);
    return c.json(book);
  },
};
