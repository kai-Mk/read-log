import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import type { Book, CreateBookInput } from '@read-log/shared';
import { bookService } from '../services/bookService';

export type UseCreateBookResult = {
  createBook: (input: CreateBookInput) => Promise<Book | null>;
  isLoading: boolean;
  error: Error | null;
};

export function useCreateBook(libraryId: string): UseCreateBookResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const createBook = useCallback(
    async (input: CreateBookInput): Promise<Book | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const book = await bookService.createBook(libraryId, input);
        // 本一覧のキャッシュを更新
        mutate(
          (key) => typeof key === 'string' && key.startsWith(`/api/libraries/${libraryId}/books`)
        );
        return book;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('本の登録に失敗しました');
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [libraryId, mutate]
  );

  return { createBook, isLoading, error };
}
