import useSWR from 'swr';
import type { Book } from '@read-log/shared';
import { bookService, GetBooksFilter } from '../services/bookService';

export interface UseBooksResult {
  data: Book[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => void;
}

export function useBooks(libraryId: string | undefined, filter?: GetBooksFilter): UseBooksResult {
  const key = libraryId
    ? filter
      ? `/api/libraries/${libraryId}/books?${JSON.stringify(filter)}`
      : `/api/libraries/${libraryId}/books`
    : null;

  const { data, error, isLoading, mutate } = useSWR<Book[], Error>(key, () =>
    bookService.getBooks(libraryId!, filter)
  );

  return { data, isLoading, error, mutate };
}
