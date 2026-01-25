import type { Context } from 'hono';
import type { PrismaClient } from '@prisma/client';

export type AppVariables = {
  prisma: PrismaClient;
};

export type AppContext = Context<{ Variables: AppVariables }>;
