import { Hono } from 'hono';
import { z } from 'zod';
import { createBookSchema } from '@read-log/shared';
import { bookController } from '../controllers/bookController';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator';

const libraryIdSchema = z.object({
  libraryId: z.string().uuid(),
});

const getBooksQuerySchema = z.object({
  status: z.enum(['unread', 'wishlist', 'completed']).optional(),
  category: z.enum(['tech', 'novel', 'academic', 'other']).optional(),
  search: z.string().optional(),
});

export const booksRoutes = new Hono();

booksRoutes.post(
  '/',
  validateParams(libraryIdSchema),
  validateBody(createBookSchema),
  bookController.create
);

booksRoutes.get(
  '/',
  validateParams(libraryIdSchema),
  validateQuery(getBooksQuerySchema),
  bookController.list
);
