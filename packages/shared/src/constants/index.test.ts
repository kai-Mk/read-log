import { describe, it, expect } from 'vitest';
import { BOOK_STATUS, BOOK_CATEGORY } from './index';

describe('BOOK_STATUS', () => {
  it('3つのステータス値を持つ', () => {
    const values = Object.values(BOOK_STATUS);
    expect(values).toHaveLength(3);
    expect(values).toEqual(['unread', 'wishlist', 'completed']);
  });

  it('UNREADが"unread"である', () => {
    expect(BOOK_STATUS.UNREAD).toBe('unread');
  });

  it('WISHLISTが"wishlist"である', () => {
    expect(BOOK_STATUS.WISHLIST).toBe('wishlist');
  });

  it('COMPLETEDが"completed"である', () => {
    expect(BOOK_STATUS.COMPLETED).toBe('completed');
  });
});

describe('BOOK_CATEGORY', () => {
  it('4つのカテゴリ値を持つ', () => {
    const values = Object.values(BOOK_CATEGORY);
    expect(values).toHaveLength(4);
    expect(values).toEqual(['tech', 'novel', 'academic', 'other']);
  });

  it('TECHが"tech"である', () => {
    expect(BOOK_CATEGORY.TECH).toBe('tech');
  });

  it('NOVELが"novel"である', () => {
    expect(BOOK_CATEGORY.NOVEL).toBe('novel');
  });

  it('ACADEMICが"academic"である', () => {
    expect(BOOK_CATEGORY.ACADEMIC).toBe('academic');
  });

  it('OTHERが"other"である', () => {
    expect(BOOK_CATEGORY.OTHER).toBe('other');
  });
});
