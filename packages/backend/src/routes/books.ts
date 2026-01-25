import { Hono } from 'hono';
import {
  createBookSchema,
  libraryIdWithBooksParamSchema,
  getBooksQuerySchema,
} from '@read-log/shared';
import { bookController } from '../controllers/bookController';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator';

export const booksRoutes = new Hono();

booksRoutes.post(
  '/',
  validateParams(libraryIdWithBooksParamSchema),
  validateBody(createBookSchema),
  bookController.create
);

booksRoutes.get(
  '/',
  validateParams(libraryIdWithBooksParamSchema),
  validateQuery(getBooksQuerySchema),
  bookController.list
);
