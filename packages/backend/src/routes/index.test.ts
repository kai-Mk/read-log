import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { apiRoutes } from './index';

describe('API ルート', () => {
  describe('GET /api/health', () => {
    it('ヘルスチェック結果を返す', async () => {
      const app = new Hono();
      app.route('/api', apiRoutes);

      const res = await app.request('/api/health');

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual({ status: 'ok' });
    });
  });
});
