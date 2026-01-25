import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { z } from 'zod';
import { validateBody, validateParams, validateQuery } from './validator';
import { errorHandler } from './errorHandler';

describe('バリデーションミドルウェア', () => {
  describe('validateBody', () => {
    const schema = z.object({
      name: z.string().min(1).max(100),
    });

    it('有効なリクエストボディを通過させる', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.post('/test', validateBody(schema), (c) => {
        const data = c.get('validatedBody');
        return c.json({ received: data });
      });

      const res = await app.request('/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'テスト' }),
      });

      expect(res.status).toBe(200);
      const body = (await res.json()) as { received: { name: string } };
      expect(body.received).toEqual({ name: 'テスト' });
    });

    it('無効なリクエストボディでバリデーションエラーを返す', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.post('/test', validateBody(schema), (c) => c.json({ ok: true }));

      const res = await app.request('/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '' }),
      });

      expect(res.status).toBe(400);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('validateParams', () => {
    const schema = z.object({
      id: z.string().uuid(),
    });

    it('有効なパスパラメータを通過させる', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test/:id', validateParams(schema), (c) => {
        const params = c.get('validatedParams');
        return c.json({ received: params });
      });

      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const res = await app.request(`/test/${uuid}`);

      expect(res.status).toBe(200);
      const body = (await res.json()) as { received: { id: string } };
      expect(body.received).toEqual({ id: uuid });
    });

    it('無効なパスパラメータでバリデーションエラーを返す', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test/:id', validateParams(schema), (c) => c.json({ ok: true }));

      const res = await app.request('/test/invalid-uuid');

      expect(res.status).toBe(400);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('validateQuery', () => {
    const schema = z.object({
      page: z.string().regex(/^\d+$/).optional(),
      limit: z.string().regex(/^\d+$/).optional(),
    });

    it('有効なクエリパラメータを通過させる', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test', validateQuery(schema), (c) => {
        const query = c.get('validatedQuery');
        return c.json({ received: query });
      });

      const res = await app.request('/test?page=1&limit=10');

      expect(res.status).toBe(200);
      const body = (await res.json()) as { received: { page: string; limit: string } };
      expect(body.received).toEqual({ page: '1', limit: '10' });
    });

    it('無効なクエリパラメータでバリデーションエラーを返す', async () => {
      const app = new Hono();
      app.onError(errorHandler);
      app.get('/test', validateQuery(schema), (c) => c.json({ ok: true }));

      const res = await app.request('/test?page=invalid');

      expect(res.status).toBe(400);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('VALIDATION_ERROR');
    });
  });
});
