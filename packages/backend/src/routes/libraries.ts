import { Hono } from 'hono';
import { z } from 'zod';
import { createLibrarySchema, updateLibrarySchema } from '@read-log/shared';
import { libraryController } from '../controllers/libraryController';
import { validateBody, validateParams } from '../middlewares/validator';

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
