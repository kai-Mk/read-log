import type { Book } from '@read-log/shared';

type CompletedViewProps = {
  books: Book[];
  onBookClick: (book: Book) => void;
};

export function CompletedView({ books, onBookClick }: CompletedViewProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center text-green-600">
        読了した本はありません
      </div>
    );
  }

  return (
    <div
      data-testid="completed-bookshelf"
      className="rounded-lg bg-gradient-to-b from-amber-800 to-amber-900 p-6"
    >
      {/* Bookshelf */}
      <div className="flex flex-wrap items-end justify-start gap-1 border-b-8 border-amber-700 pb-4">
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => onBookClick(book)}
            className="group relative h-40 w-8 transition-all hover:-translate-y-2"
            title={`${book.title} - ${book.author}`}
          >
            {/* Book spine */}
            <div
              className="flex h-full w-full flex-col items-center justify-center rounded-sm bg-gradient-to-r from-green-600 to-green-500 p-1 shadow-md"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              <span className="line-clamp-1 text-xs font-medium text-white">{book.title}</span>
            </div>
            {/* Hover tooltip */}
            <div className="pointer-events-none absolute -top-20 left-1/2 z-50 hidden w-48 -translate-x-1/2 rounded-lg bg-white p-3 shadow-xl group-hover:block">
              <div className="flex gap-2">
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-16 w-12 rounded object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{book.title}</p>
                  <p className="text-xs text-gray-600">{book.author}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Shelf shadow */}
      <div className="h-2 bg-amber-950/30" />
    </div>
  );
}
