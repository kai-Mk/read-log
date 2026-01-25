import { describe, it, expect } from 'vitest';
import { generateUuid, isValidUuid } from './uuid';

describe('UUID ユーティリティ', () => {
  describe('generateUuid', () => {
    it('UUID形式の文字列を返す', () => {
      const uuid = generateUuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      expect(uuid).toMatch(uuidRegex);
    });

    it('呼び出すたびに異なるUUIDを返す', () => {
      const uuid1 = generateUuid();
      const uuid2 = generateUuid();

      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('isValidUuid', () => {
    it('有効なUUIDに対してtrueを返す', () => {
      const validUuid = '550e8400-e29b-41d4-a716-446655440000';
      expect(isValidUuid(validUuid)).toBe(true);
    });

    it('無効な文字列に対してfalseを返す', () => {
      expect(isValidUuid('invalid-uuid')).toBe(false);
      expect(isValidUuid('')).toBe(false);
      expect(isValidUuid('12345')).toBe(false);
    });

    it('generateUuidの結果に対してtrueを返す', () => {
      const uuid = generateUuid();
      expect(isValidUuid(uuid)).toBe(true);
    });
  });
});
