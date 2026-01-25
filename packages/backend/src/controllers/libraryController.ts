import type { Context } from 'hono';
import { libraryService } from '../services/libraryService';

export const libraryController = {
  async create(c: Context) {
    const body = c.get('validatedBody') as { name: string };
    const library = await libraryService.createLibrary({ name: body.name });
    return c.json(library, 201);
  },

  async get(c: Context) {
    const { id } = c.get('validatedParams') as { id: string };
    const library = await libraryService.getLibrary(id);
    return c.json(library);
  },

  async update(c: Context) {
    const { id } = c.get('validatedParams') as { id: string };
    const body = c.get('validatedBody') as { name: string };
    const library = await libraryService.updateLibrary(id, { name: body.name });
    return c.json(library);
  },
};
