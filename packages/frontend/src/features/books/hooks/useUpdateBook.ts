import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import type { Book, UpdateBookInput } from '@read-log/shared';
import { bookService } from '../services/bookService';

export type UseUpdateBookResult = {
  updateBook: (bookId: string, input: UpdateBookInput) => Promise<Book | null>;
  isLoading: boolean;
  error: Error | null;
};

export function useUpdateBook(libraryId: string): UseUpdateBookResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const updateBook = useCallback(
    async (bookId: string, input: UpdateBookInput): Promise<Book | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const book = await bookService.updateBook(libraryId, bookId, input);
        // 本一覧のキャッシュを更新
        mutate(
          (key) => typeof key === 'string' && key.startsWith(`/api/libraries/${libraryId}/books`)
        );
        return book;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('本の更新に失敗しました');
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [libraryId, mutate]
  );

  return { updateBook, isLoading, error };
}
