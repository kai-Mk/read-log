import { z } from 'zod';

export const createLibrarySchema = z.object({
  name: z.string().min(1).max(100),
});

export const updateLibrarySchema = z.object({
  name: z.string().min(1).max(100),
});

export type CreateLibraryInput = z.infer<typeof createLibrarySchema>;
export type UpdateLibraryInput = z.infer<typeof updateLibrarySchema>;
