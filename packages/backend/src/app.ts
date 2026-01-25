import { Hono } from 'hono';
import { corsMiddleware } from './middlewares/cors';
import { errorHandler } from './middlewares/errorHandler';
import { apiRoutes } from './routes';

export const app = new Hono();

// ミドルウェア登録
app.use('*', corsMiddleware());
app.onError(errorHandler);

// ルート
app.get('/', (c) => {
  return c.json({ message: 'Read Log API' });
});

// API ルート
app.route('/api', apiRoutes);
