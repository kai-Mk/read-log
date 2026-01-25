import { Hono } from 'hono';
import { librariesRoutes } from './libraries';
import { booksRoutes } from './books';
import { isbnRoutes } from './isbn';

export const apiRoutes = new Hono();

apiRoutes.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

apiRoutes.route('/libraries', librariesRoutes);
apiRoutes.route('/libraries/:libraryId/books', booksRoutes);
apiRoutes.route('/isbn', isbnRoutes);
