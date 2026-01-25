import { useState, useCallback } from 'react';
import type { Library } from '@read-log/shared';
import { libraryService } from '../services/libraryService';

export type UseCreateLibraryResult = {
  createLibrary: (name: string) => Promise<Library | null>;
  isLoading: boolean;
  error: Error | null;
};

export function useCreateLibrary(): UseCreateLibraryResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createLibrary = useCallback(async (name: string): Promise<Library | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const library = await libraryService.createLibrary({ name });
      return library;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('マイ書庫の作成に失敗しました');
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createLibrary, isLoading, error };
}
