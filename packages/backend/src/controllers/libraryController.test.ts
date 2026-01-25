import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';
import { z } from 'zod';
import { libraryController } from './libraryController';
import { libraryService } from '../services/libraryService';
import { errorHandler, NotFoundError } from '../middlewares/errorHandler';
import { validateBody, validateParams } from '../middlewares/validator';

vi.mock('../services/libraryService', () => ({
  libraryService: {
    createLibrary: vi.fn(),
    getLibrary: vi.fn(),
    updateLibrary: vi.fn(),
  },
}));

const createLibrarySchema = z.object({
  name: z.string().min(1).max(100),
});

const libraryIdSchema = z.object({
  id: z.string().uuid(),
});

describe('libraryController', () => {
  let app: Hono;

  beforeEach(() => {
    vi.clearAllMocks();
    app = new Hono();
    app.onError(errorHandler);

    app.post('/api/libraries', validateBody(createLibrarySchema), libraryController.create);
    app.get('/api/libraries/:id', validateParams(libraryIdSchema), libraryController.get);
    app.put(
      '/api/libraries/:id',
      validateParams(libraryIdSchema),
      validateBody(createLibrarySchema),
      libraryController.update
    );
  });

  describe('POST /api/libraries', () => {
    it('201を返し、マイ書庫が作成される', async () => {
      const mockLibrary = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(libraryService.createLibrary).mockResolvedValue(mockLibrary);

      const res = await app.request('/api/libraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '技術書コレクション' }),
      });

      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.name).toBe('技術書コレクション');
      expect(libraryService.createLibrary).toHaveBeenCalledWith({ name: '技術書コレクション' });
    });

    it('名前が空の場合は400を返す', async () => {
      const res = await app.request('/api/libraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '' }),
      });

      expect(res.status).toBe(400);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('VALIDATION_ERROR');
    });

    it('名前が100文字を超える場合は400を返す', async () => {
      const longName = 'あ'.repeat(101);
      const res = await app.request('/api/libraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: longName }),
      });

      expect(res.status).toBe(400);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/libraries/:id', () => {
    it('200を返し、マイ書庫情報を返す', async () => {
      const mockLibrary = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: '技術書コレクション',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(libraryService.getLibrary).mockResolvedValue(mockLibrary);

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000');

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.name).toBe('技術書コレクション');
    });

    it('存在しない場合は404を返す', async () => {
      vi.mocked(libraryService.getLibrary).mockRejectedValue(
        new NotFoundError('マイ書庫が見つかりません')
      );

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000');

      expect(res.status).toBe(404);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('NOT_FOUND');
    });
  });

  describe('PUT /api/libraries/:id', () => {
    it('200を返し、マイ書庫が更新される', async () => {
      const mockLibrary = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: '新しい名前',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      vi.mocked(libraryService.updateLibrary).mockResolvedValue(mockLibrary);

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '新しい名前' }),
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.name).toBe('新しい名前');
    });

    it('存在しない場合は404を返す', async () => {
      vi.mocked(libraryService.updateLibrary).mockRejectedValue(
        new NotFoundError('マイ書庫が見つかりません')
      );

      const res = await app.request('/api/libraries/550e8400-e29b-41d4-a716-446655440000', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '新しい名前' }),
      });

      expect(res.status).toBe(404);
      const body = (await res.json()) as { code: string };
      expect(body.code).toBe('NOT_FOUND');
    });
  });
});
