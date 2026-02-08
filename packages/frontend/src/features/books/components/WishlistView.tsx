import type { Book } from '@read-log/shared';

type WishlistViewProps = {
  books: Book[];
  onBookClick: (book: Book) => void;
};

export function WishlistView({ books, onBookClick }: WishlistViewProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center text-blue-600">
        読みたい本はありません
      </div>
    );
  }

  return (
    <div data-testid="wishlist-display" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <button
          key={book.id}
          onClick={() => onBookClick(book)}
          className="group rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-col items-center">
            <div className="mb-4 h-48 w-32 overflow-hidden rounded-lg shadow-lg transition-transform group-hover:scale-105">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-400">
                  No Image
                </div>
              )}
            </div>
            <div className="w-full text-center">
              <h3 className="line-clamp-2 font-medium text-gray-900">{book.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{book.author}</p>
              <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">
                読みたい
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
