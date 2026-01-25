import type { MiddlewareHandler } from 'hono';
import type { z } from 'zod';
import { ValidationError } from './errorHandler';

declare module 'hono' {
  interface ContextVariableMap {
    validatedBody: unknown;
    validatedParams: unknown;
    validatedQuery: unknown;
  }
}

export function validateBody<T extends z.ZodType>(schema: T): MiddlewareHandler {
  return async (c, next) => {
    const body = await c.req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      throw new ValidationError(message);
    }

    c.set('validatedBody', result.data);
    await next();
  };
}

export function validateParams<T extends z.ZodType>(schema: T): MiddlewareHandler {
  return async (c, next) => {
    const params = c.req.param();
    const result = schema.safeParse(params);

    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      throw new ValidationError(message);
    }

    c.set('validatedParams', result.data);
    await next();
  };
}

export function validateQuery<T extends z.ZodType>(schema: T): MiddlewareHandler {
  return async (c, next) => {
    const query = c.req.query();
    const result = schema.safeParse(query);

    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      throw new ValidationError(message);
    }

    c.set('validatedQuery', result.data);
    await next();
  };
}
