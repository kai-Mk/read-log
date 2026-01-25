import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { errorHandler, AppError, NotFoundError, ValidationError } from './errorHandler';

describe('エラーハンドリングミドルウェア', () => {
  describe('AppError', () => {
    it('カスタムエラーを正しく処理する', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test', () => {
        throw new AppError('CUSTOM_ERROR', 'カスタムエラー', 400);
      });

      const res = await app.request('/test');

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body).toEqual({
        code: 'CUSTOM_ERROR',
        error: 'Bad Request',
        message: 'カスタムエラー',
      });
    });
  });

  describe('NotFoundError', () => {
    it('404エラーを正しく処理する', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test', () => {
        throw new NotFoundError('リソースが見つかりません');
      });

      const res = await app.request('/test');

      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body).toEqual({
        code: 'NOT_FOUND',
        error: 'Not Found',
        message: 'リソースが見つかりません',
      });
    });
  });

  describe('ValidationError', () => {
    it('バリデーションエラーを正しく処理する', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test', () => {
        throw new ValidationError('入力が不正です');
      });

      const res = await app.request('/test');

      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body).toEqual({
        code: 'VALIDATION_ERROR',
        error: 'Bad Request',
        message: '入力が不正です',
      });
    });
  });

  describe('予期しないエラー', () => {
    it('500エラーとして処理する', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test', () => {
        throw new Error('予期しないエラー');
      });

      const res = await app.request('/test');

      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body).toEqual({
        code: 'INTERNAL_ERROR',
        error: 'Internal Server Error',
        message: 'エラーが発生しました',
      });
    });
  });
});
