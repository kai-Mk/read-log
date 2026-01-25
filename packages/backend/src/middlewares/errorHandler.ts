import type { ErrorHandler } from 'hono';

type ErrorResponseBody = {
  code: string;
  error: string;
  message: string;
};

const HTTP_STATUS_TEXT: Record<number, string> = {
  400: 'Bad Request',
  404: 'Not Found',
  500: 'Internal Server Error',
};

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'リソースが見つかりません') {
    super('NOT_FOUND', message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string = '入力が不正です') {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
  }
}

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof AppError) {
    const body: ErrorResponseBody = {
      code: err.code,
      error: HTTP_STATUS_TEXT[err.statusCode] ?? 'Error',
      message: err.message,
    };
    return c.json(body, err.statusCode as 400 | 404 | 500);
  }

  const body: ErrorResponseBody = {
    code: 'INTERNAL_ERROR',
    error: 'Internal Server Error',
    message: 'エラーが発生しました',
  };
  return c.json(body, 500);
};
