import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { corsMiddleware } from './cors';

describe('CORS ミドルウェア', () => {
  it('Access-Control-Allow-Originヘッダーを付与する', async () => {
    const app = new Hono();
    app.use('*', corsMiddleware());
    app.get('/test', (c) => c.json({ ok: true }));

    const res = await app.request('/test', {
      headers: { Origin: 'http://localhost:5173' },
    });

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
  });

  it('Access-Control-Allow-Methodsヘッダーを付与する', async () => {
    const app = new Hono();
    app.use('*', corsMiddleware());
    app.get('/test', (c) => c.json({ ok: true }));

    const res = await app.request('/test', {
      method: 'OPTIONS',
      headers: { Origin: 'http://localhost:5173' },
    });

    const allowMethods = res.headers.get('Access-Control-Allow-Methods');
    expect(allowMethods).toContain('GET');
    expect(allowMethods).toContain('POST');
    expect(allowMethods).toContain('PUT');
    expect(allowMethods).toContain('DELETE');
  });

  it('Access-Control-Allow-Headersヘッダーを付与する', async () => {
    const app = new Hono();
    app.use('*', corsMiddleware());
    app.get('/test', (c) => c.json({ ok: true }));

    const res = await app.request('/test', {
      method: 'OPTIONS',
      headers: { Origin: 'http://localhost:5173' },
    });

    const allowHeaders = res.headers.get('Access-Control-Allow-Headers');
    expect(allowHeaders).toContain('Content-Type');
  });

  it('カスタムオリジンを設定できる', async () => {
    const app = new Hono();
    app.use('*', corsMiddleware({ origin: 'https://example.com' }));
    app.get('/test', (c) => c.json({ ok: true }));

    const res = await app.request('/test', {
      headers: { Origin: 'https://example.com' },
    });

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://example.com');
  });
});
