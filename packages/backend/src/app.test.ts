import { describe, it, expect } from 'vitest';
import { app } from './app';

describe('Hono アプリケーション', () => {
  describe('GET /', () => {
    it('APIメッセージを返す', async () => {
      const res = await app.request('/');

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual({ message: 'Read Log API' });
    });
  });

  describe('GET /api/health', () => {
    it('ヘルスチェック結果を返す', async () => {
      const res = await app.request('/api/health');

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual({ status: 'ok' });
    });
  });

  describe('CORS', () => {
    it('CORSヘッダーが付与される', async () => {
      const res = await app.request('/', {
        headers: { Origin: 'http://localhost:5173' },
      });

      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
    });
  });

  describe('エラーハンドリング', () => {
    it('存在しないエンドポイントで404を返す', async () => {
      const res = await app.request('/api/not-found');

      expect(res.status).toBe(404);
    });
  });
});
