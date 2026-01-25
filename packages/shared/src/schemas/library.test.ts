import { describe, it, expect } from 'vitest';
import { createLibrarySchema, updateLibrarySchema } from './library';

describe('createLibrarySchema', () => {
  it('有効な入力でパスする', () => {
    const input = { name: 'マイ書庫' };
    expect(() => createLibrarySchema.parse(input)).not.toThrow();
  });

  it('nameが空文字の場合エラー', () => {
    const input = { name: '' };
    expect(() => createLibrarySchema.parse(input)).toThrow();
  });

  it('nameが100文字を超える場合エラー', () => {
    const input = { name: 'a'.repeat(101) };
    expect(() => createLibrarySchema.parse(input)).toThrow();
  });

  it('nameがない場合エラー', () => {
    const input = {};
    expect(() => createLibrarySchema.parse(input)).toThrow();
  });
});

describe('updateLibrarySchema', () => {
  it('有効な入力でパスする', () => {
    const input = { name: '新しい書庫名' };
    expect(() => updateLibrarySchema.parse(input)).not.toThrow();
  });

  it('nameが空文字の場合エラー', () => {
    const input = { name: '' };
    expect(() => updateLibrarySchema.parse(input)).toThrow();
  });

  it('nameが100文字を超える場合エラー', () => {
    const input = { name: 'a'.repeat(101) };
    expect(() => updateLibrarySchema.parse(input)).toThrow();
  });
});
