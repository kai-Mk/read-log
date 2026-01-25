import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { useLibrary } from '../features/library/hooks/useLibrary';
import { useBooks } from '../features/books/hooks/useBooks';
import { BookList } from '../features/books/components/BookList';
import { AddBookModal } from '../features/books/components/AddBookModal';

export function LibraryPage() {
  const { libraryId } = useParams<{ libraryId: string }>();
  const { data: library, isLoading: isLibraryLoading, error: libraryError } = useLibrary(libraryId);
  const { data: books, isLoading: isBooksLoading, error: booksError, mutate } = useBooks(libraryId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLibraryLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loading message="読み込み中..." />
      </div>
    );
  }

  if (libraryError || !library) {
    return (
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">マイ書庫が見つかりません</h1>
            <p className="mb-6 text-gray-600">
              指定されたマイ書庫は存在しないか、削除されています。
            </p>
            <Link to="/" className="text-blue-600 underline hover:text-blue-800">
              トップページへ戻る
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAddBookSuccess = () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{library.name}</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            本を追加
          </button>
        </div>

        <BookList books={books ?? []} isLoading={isBooksLoading} error={booksError} />

        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAddBookSuccess}
          libraryId={libraryId!}
        />
      </main>
    </div>
  );
}
