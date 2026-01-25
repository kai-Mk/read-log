import { describe, it, expect } from 'vitest';
import type { AppVariables } from './context';

describe('Context 型定義', () => {
  it('AppVariablesが正しく定義されている', () => {
    // 型レベルのテスト - コンパイルが通ることを確認
    const variables: Partial<AppVariables> = {};

    expect(variables).toBeDefined();
  });
});
