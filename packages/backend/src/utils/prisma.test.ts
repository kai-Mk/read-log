import { describe, it, expect } from 'vitest';
import { prisma } from './prisma';
import { PrismaClient } from '@prisma/client';

describe('Prisma Client', () => {
  it('PrismaClientのインスタンスを返す', () => {
    expect(prisma).toBeInstanceOf(PrismaClient);
  });

  it('常に同じインスタンスを返す（シングルトン）', async () => {
    const { prisma: prisma1 } = await import('./prisma');
    const { prisma: prisma2 } = await import('./prisma');

    expect(prisma1).toBe(prisma2);
  });
});
