import { cors } from 'hono/cors';

type CorsOptions = {
  origin?: string;
};

const DEFAULT_ORIGIN = 'http://localhost:5173';

export function corsMiddleware(options: CorsOptions = {}) {
  const origin = options.origin ?? process.env.CORS_ORIGIN ?? DEFAULT_ORIGIN;

  return cors({
    origin,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  });
}
