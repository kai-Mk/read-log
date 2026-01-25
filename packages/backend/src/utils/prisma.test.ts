import { describe, it, expect } from 'vitest';

describe('Prisma Client', () => {
  it('prismaモジュールがエクスポートされている', async () => {
    // 動的インポートでモジュールの存在を確認
    const module = await import('./prisma');
    expect(module).toHaveProperty('prisma');
  });

  it('常に同じインスタンスを返す（シングルトン）', async () => {
    const { prisma: prisma1 } = await import('./prisma');
    const { prisma: prisma2 } = await import('./prisma');

    expect(prisma1).toBe(prisma2);
  });
});
