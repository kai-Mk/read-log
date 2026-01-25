import type { Library } from '@read-log/shared';
import { fetcher, FetchError } from '../../../utils/fetcher';

export type CreateLibraryInput = {
  name: string;
};

export const libraryService = {
  async createLibrary(input: CreateLibraryInput): Promise<Library> {
    const response = await fetch('/api/libraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const info = await response.json().catch(() => null);
      throw new FetchError('マイ書庫の作成に失敗しました', response.status, info);
    }

    return response.json();
  },

  async getLibrary(id: string): Promise<Library> {
    return fetcher<Library>(`/api/libraries/${id}`);
  },
};
