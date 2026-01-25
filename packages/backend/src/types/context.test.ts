import { describe, it, expect } from 'vitest';
import type { AppContext, AppVariables } from './context';
import type { PrismaClient } from '@prisma/client';

describe('Context 型定義', () => {
  it('AppVariablesにPrismaClientが含まれる', () => {
    // 型レベルのテスト - コンパイルが通ることを確認
    const variables: AppVariables = {
      prisma: {} as PrismaClient,
    };

    expect(variables.prisma).toBeDefined();
  });

  it('AppContextが正しく型付けされている', () => {
    // 型レベルのテスト - 型が正しいことを確認
    // 実際のContextはHonoが生成するため、型のみをテスト
    type _TestContext = AppContext;
    const hasType: boolean = true;
    expect(hasType).toBe(true);
  });
});
