import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetcher, FetchError } from './fetcher';

describe('fetcher', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('成功時にJSONデータを返す', async () => {
    const mockData = { id: 1, name: 'test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetcher<typeof mockData>('/api/test');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('/api/test');
  });

  it('エラー時にFetchErrorをthrowする', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: 'Not found' }),
    });

    await expect(fetcher('/api/test')).rejects.toThrow(FetchError);
  });

  it('FetchErrorにステータスコードが含まれる', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    try {
      await fetcher('/api/test');
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);
      expect((error as FetchError).status).toBe(500);
      expect((error as FetchError).info).toEqual({ error: 'Server error' });
    }
  });

  it('JSONパースエラー時はinfoがnullになる', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error('JSON parse error')),
    });

    try {
      await fetcher('/api/test');
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);
      expect((error as FetchError).info).toBeNull();
    }
  });
});
