import { z } from 'zod';

export const createMemoSchema = z.object({
  content: z.string().min(1).max(10000),
});

export const updateMemoSchema = z.object({
  content: z.string().min(1).max(10000),
});

export type CreateMemoInput = z.infer<typeof createMemoSchema>;
export type UpdateMemoInput = z.infer<typeof updateMemoSchema>;
