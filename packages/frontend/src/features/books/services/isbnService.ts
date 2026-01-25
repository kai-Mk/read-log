import type { IsbnSearchResult } from '@read-log/shared';

export const isbnService = {
  async searchByIsbn(isbn: string): Promise<IsbnSearchResult | null> {
    const response = await fetch(`/api/isbn/${isbn}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      return null;
    }

    return response.json();
  },
};
