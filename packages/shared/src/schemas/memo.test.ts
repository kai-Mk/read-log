import { describe, it, expect } from 'vitest';
import { createMemoSchema, updateMemoSchema } from './memo';

describe('createMemoSchema', () => {
  it('有効な入力でパスする', () => {
    const input = { content: 'メモの内容' };
    expect(() => createMemoSchema.parse(input)).not.toThrow();
  });

  it('contentが空文字の場合エラー', () => {
    const input = { content: '' };
    expect(() => createMemoSchema.parse(input)).toThrow();
  });

  it('contentが10000文字を超える場合エラー', () => {
    const input = { content: 'a'.repeat(10001) };
    expect(() => createMemoSchema.parse(input)).toThrow();
  });
});

describe('updateMemoSchema', () => {
  it('有効な入力でパスする', () => {
    const input = { content: '更新後のメモ' };
    expect(() => updateMemoSchema.parse(input)).not.toThrow();
  });

  it('contentが空文字の場合エラー', () => {
    const input = { content: '' };
    expect(() => updateMemoSchema.parse(input)).toThrow();
  });

  it('contentが10000文字を超える場合エラー', () => {
    const input = { content: 'a'.repeat(10001) };
    expect(() => updateMemoSchema.parse(input)).toThrow();
  });
});
