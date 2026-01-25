import { Hono } from 'hono';
import { z } from 'zod';
import { libraryController } from '../controllers/libraryController';
import { validateBody, validateParams } from '../middlewares/validator';

const createLibrarySchema = z.object({
  name: z.string().min(1).max(100),
});

const updateLibrarySchema = z.object({
  name: z.string().min(1).max(100),
});

const libraryIdSchema = z.object({
  id: z.string().uuid(),
});

export const librariesRoutes = new Hono();

librariesRoutes.post('/', validateBody(createLibrarySchema), libraryController.create);

librariesRoutes.get('/:id', validateParams(libraryIdSchema), libraryController.get);

librariesRoutes.put(
  '/:id',
  validateParams(libraryIdSchema),
  validateBody(updateLibrarySchema),
  libraryController.update
);
