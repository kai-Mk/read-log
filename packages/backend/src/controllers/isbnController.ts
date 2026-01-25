import type { Context } from 'hono';
import { isbnService } from '../services/isbnService';

export const isbnController = {
  async search(c: Context) {
    const { isbn } = c.get('validatedParams') as { isbn: string };
    const result = await isbnService.searchByIsbn(isbn);

    if (!result) {
      return c.json({ found: false }, 404);
    }

    return c.json(result);
  },
};
