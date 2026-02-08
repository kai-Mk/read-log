import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Book } from '@read-log/shared';
import { Loading } from '../components/Loading';
import { useLibrary } from '../features/library/hooks/useLibrary';
import { useBooks } from '../features/books/hooks/useBooks';
import { ViewTabs, type ViewType } from '../features/books/components/ViewTabs';
import { AllBooksView } from '../features/books/components/AllBooksView';
import { UnreadView } from '../features/books/components/UnreadView';
import { WishlistView } from '../features/books/components/WishlistView';
import { CompletedView } from '../features/books/components/CompletedView';
import { AddBookModal } from '../features/books/components/AddBookModal';
import { BookDetailModal } from '../features/books/components/BookDetailModal';

export function LibraryPage() {
  const { libraryId } = useParams<{ libraryId: string }>();
  const { data: library, isLoading: isLibraryLoading, error: libraryError } = useLibrary(libraryId);
  const { data: books, isLoading: isBooksLoading, error: booksError, mutate } = useBooks(libraryId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('all');

  const filteredBooks = useMemo(() => {
    const allBooks = books ?? [];
    switch (activeView) {
      case 'unread':
        return allBooks.filter((book) => book.status === 'unread');
      case 'wishlist':
        return allBooks.filter((book) => book.status === 'wishlist');
      case 'completed':
        return allBooks.filter((book) => book.status === 'completed');
      default:
        return allBooks;
    }
  }, [books, activeView]);

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

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleDetailClose = () => {
    setSelectedBook(null);
  };

  const handleDetailSuccess = async () => {
    const updatedBooks = await mutate();
    if (updatedBooks && selectedBook) {
      const updatedBook = updatedBooks.find((b) => b.id === selectedBook.id);
      if (updatedBook) {
        setSelectedBook(updatedBook);
      }
    }
  };

  const renderView = () => {
    if (isBooksLoading) {
      return <Loading message="本を読み込み中..." />;
    }

    if (booksError) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {booksError.message}
        </div>
      );
    }

    switch (activeView) {
      case 'unread':
        return <UnreadView books={filteredBooks} onBookClick={handleBookClick} />;
      case 'wishlist':
        return <WishlistView books={filteredBooks} onBookClick={handleBookClick} />;
      case 'completed':
        return <CompletedView books={filteredBooks} onBookClick={handleBookClick} />;
      default:
        return <AllBooksView books={filteredBooks} onBookClick={handleBookClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{library.name}</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            本を追加
          </button>
        </div>

        <ViewTabs activeView={activeView} onChange={setActiveView} />

        {renderView()}

        <AddBookModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddBookSuccess}
          libraryId={libraryId!}
        />

        {selectedBook && (
          <BookDetailModal
            isOpen={true}
            onClose={handleDetailClose}
            onSuccess={handleDetailSuccess}
            book={selectedBook}
            libraryId={libraryId!}
          />
        )}
      </main>
    </div>
  );
}
