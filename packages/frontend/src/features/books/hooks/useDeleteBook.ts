import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { bookService } from '../services/bookService';

export type UseDeleteBookResult = {
  deleteBook: (bookId: string) => Promise<boolean>;
  isLoading: boolean;
  error: Error | null;
};

export function useDeleteBook(libraryId: string): UseDeleteBookResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const deleteBook = useCallback(
    async (bookId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await bookService.deleteBook(libraryId, bookId);
        // 本一覧のキャッシュを更新
        mutate(
          (key) => typeof key === 'string' && key.startsWith(`/api/libraries/${libraryId}/books`)
        );
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('本の削除に失敗しました');
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [libraryId, mutate]
  );

  return { deleteBook, isLoading, error };
}
