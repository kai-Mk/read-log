import { Hono } from 'hono';
import { createLibrarySchema, updateLibrarySchema, libraryIdParamSchema } from '@read-log/shared';
import { libraryController } from '../controllers/libraryController';
import { validateBody, validateParams } from '../middlewares/validator';

export const librariesRoutes = new Hono();

librariesRoutes.post('/', validateBody(createLibrarySchema), libraryController.create);

librariesRoutes.get('/:id', validateParams(libraryIdParamSchema), libraryController.get);

librariesRoutes.put(
  '/:id',
  validateParams(libraryIdParamSchema),
  validateBody(updateLibrarySchema),
  libraryController.update
);
