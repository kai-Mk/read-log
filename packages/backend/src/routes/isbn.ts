import { Hono } from 'hono';
import { z } from 'zod';
import { isbnController } from '../controllers/isbnController';
import { validateParams } from '../middlewares/validator';

const isbnSchema = z.object({
  isbn: z.string().min(10).max(13),
});

export const isbnRoutes = new Hono();

isbnRoutes.get('/:isbn', validateParams(isbnSchema), isbnController.search);
