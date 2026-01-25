import { Hono } from 'hono';
import { librariesRoutes } from './libraries';

export const apiRoutes = new Hono();

apiRoutes.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

apiRoutes.route('/libraries', librariesRoutes);
