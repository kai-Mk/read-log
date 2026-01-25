import { useState, useCallback } from 'react';
import type { IsbnSearchResult } from '@read-log/shared';
import { isbnService } from '../services/isbnService';

export interface UseIsbnSearchResult {
  search: (isbn: string) => Promise<IsbnSearchResult | null>;
  isSearching: boolean;
  error: Error | null;
}

export function useIsbnSearch(): UseIsbnSearchResult {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (isbn: string): Promise<IsbnSearchResult | null> => {
    setIsSearching(true);
    setError(null);

    try {
      const result = await isbnService.searchByIsbn(isbn);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('ISBN検索に失敗しました');
      setError(error);
      return null;
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { search, isSearching, error };
}
