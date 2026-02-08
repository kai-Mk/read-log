import type { Book } from '@read-log/shared';
import { BookCard } from './BookCard';

type AllBooksViewProps = {
  books: Book[];
  onBookClick: (book: Book) => void;
};

export function AllBooksView({ books, onBookClick }: AllBooksViewProps) {
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
        <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
      ))}
    </div>
  );
}
