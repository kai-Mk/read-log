import type { Book } from '@read-log/shared';
import { BookCard } from './BookCard';

type BookListProps = {
  books: Book[];
  isLoading?: boolean;
  error?: Error;
  onBookClick?: (book: Book) => void;
};

function BookListSkeleton() {
  return (
    <div data-testid="book-list-skeleton" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-lg border border-gray-200 bg-gray-100" />
      ))}
    </div>
  );
}

export function BookList({ books, isLoading, error, onBookClick }: BookListProps) {
  if (isLoading) {
    return <BookListSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error.message}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
        登録されている本はありません
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={onBookClick ? () => onBookClick(book) : undefined}
        />
      ))}
    </div>
  );
}
