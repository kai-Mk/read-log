import { useState } from 'react';
import type { CreateBookInput, IsbnSearchResult } from '@read-log/shared';
import { useIsbnSearch } from '../hooks/useIsbnSearch';
import { useCreateBook } from '../hooks/useCreateBook';
import { BookForm } from './BookForm';

type AddBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  libraryId: string;
};

export function AddBookModal({ isOpen, onClose, onSuccess, libraryId }: AddBookModalProps) {
  const [isbn, setIsbn] = useState('');
  const [searchResult, setSearchResult] = useState<IsbnSearchResult | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { search, isSearching, error: searchError } = useIsbnSearch();
  const { createBook, isLoading: isCreating, error: createError } = useCreateBook(libraryId);

  const handleSearch = async () => {
    if (!isbn.trim()) return;

    const result = await search(isbn.trim());
    if (result) {
      setSearchResult(result);
      setShowForm(true);
    }
  };

  const handleManualInput = () => {
    setSearchResult(null);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateBookInput) => {
    const book = await createBook(data);
    if (book) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setIsbn('');
    setSearchResult(null);
    setShowForm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">本を登録</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="閉じる"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {!showForm ? (
          <div className="space-y-4">
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="ISBNを入力"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isSearching ? '検索中...' : '検索'}
                </button>
              </div>
              {searchError && <p className="mt-2 text-sm text-red-600">{searchError.message}</p>}
            </div>

            <div className="text-center">
              <span className="text-gray-500">または</span>
            </div>

            <button
              onClick={handleManualInput}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              手動で入力
            </button>
          </div>
        ) : (
          <div>
            {createError && <p className="mb-4 text-sm text-red-600">{createError.message}</p>}
            <BookForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
              initialValues={
                searchResult
                  ? {
                      title: searchResult.title,
                      author: searchResult.author ?? undefined,
                      coverImage: searchResult.coverImage ?? undefined,
                      pageCount: searchResult.pageCount ?? undefined,
                      category: searchResult.category,
                    }
                  : undefined
              }
              isSubmitting={isCreating}
            />
          </div>
        )}
      </div>
    </div>
  );
}
