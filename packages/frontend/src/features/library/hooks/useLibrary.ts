import useSWR from 'swr';
import type { Library } from '@read-log/shared';
import { libraryService } from '../services/libraryService';

export type UseLibraryResult = {
  data: Library | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

export function useLibrary(libraryId: string | undefined): UseLibraryResult {
  const { data, error, isLoading } = useSWR<Library, Error>(
    libraryId ? `/api/libraries/${libraryId}` : null,
    () => libraryService.getLibrary(libraryId!)
  );

  return { data, isLoading, error };
}
