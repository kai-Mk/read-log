import { Hono } from 'hono';
import { isbnParamSchema } from '@read-log/shared';
import { isbnController } from '../controllers/isbnController';
import { validateParams } from '../middlewares/validator';

export const isbnRoutes = new Hono();

isbnRoutes.get('/:isbn', validateParams(isbnParamSchema), isbnController.search);
