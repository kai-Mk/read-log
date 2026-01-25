import { describe, it, expect } from 'vitest';
import { createBookSchema, updateBookSchema } from './book';

describe('createBookSchema', () => {
  it('必須項目のみでパスする', () => {
    const input = {
      title: 'テスト本',
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).not.toThrow();
  });

  it('全項目入力でパスする', () => {
    const input = {
      title: 'テスト本',
      author: '著者名',
      isbn: '978-4-00-000000-0',
      coverImage: 'https://example.com/cover.jpg',
      pageCount: 300,
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).not.toThrow();
  });

  it('titleが空文字の場合エラー', () => {
    const input = {
      title: '',
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });

  it('titleが200文字を超える場合エラー', () => {
    const input = {
      title: 'a'.repeat(201),
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });

  it('authorが100文字を超える場合エラー', () => {
    const input = {
      title: 'テスト本',
      author: 'a'.repeat(101),
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });

  it('pageCountが0以下の場合エラー', () => {
    const input = {
      title: 'テスト本',
      pageCount: 0,
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });

  it('pageCountが99999を超える場合エラー', () => {
    const input = {
      title: 'テスト本',
      pageCount: 100000,
      status: 'unread',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });

  it('statusが不正な値の場合エラー', () => {
    const input = {
      title: 'テスト本',
      status: 'invalid',
      category: 'tech',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });

  it('categoryが不正な値の場合エラー', () => {
    const input = {
      title: 'テスト本',
      status: 'unread',
      category: 'invalid',
    };
    expect(() => createBookSchema.parse(input)).toThrow();
  });
});

describe('updateBookSchema', () => {
  it('有効な入力でパスする', () => {
    const input = {
      title: '更新後のタイトル',
      status: 'completed',
      category: 'novel',
    };
    expect(() => updateBookSchema.parse(input)).not.toThrow();
  });

  it('titleが空文字の場合エラー', () => {
    const input = {
      title: '',
      status: 'unread',
      category: 'tech',
    };
    expect(() => updateBookSchema.parse(input)).toThrow();
  });
});
