import type { Book } from '@read-log/shared';

type UnreadViewProps = {
  books: Book[];
  onBookClick: (book: Book) => void;
};

export function UnreadView({ books, onBookClick }: UnreadViewProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 text-center text-amber-600">
        積読の本はありません
      </div>
    );
  }

  return (
    <div data-testid="unread-stack" className="relative flex justify-center py-8">
      <div className="relative" style={{ height: `${Math.min(books.length * 40 + 200, 500)}px` }}>
        {books.map((book, index) => (
          <button
            key={book.id}
            onClick={() => onBookClick(book)}
            className="absolute left-1/2 w-48 -translate-x-1/2 transform rounded-lg border border-amber-200 bg-white p-3 shadow-lg transition-all hover:z-50 hover:-translate-y-2 hover:shadow-xl"
            style={{
              top: `${index * 40}px`,
              transform: `translateX(-50%) rotate(${(index % 2 === 0 ? 1 : -1) * ((index % 3) + 1)}deg)`,
              zIndex: books.length - index,
            }}
          >
            <div className="flex gap-3">
              <div className="h-24 w-16 flex-shrink-0">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full rounded object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded bg-amber-100 text-xs text-amber-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex flex-col text-left">
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{book.title}</h3>
                <p className="mt-1 text-xs text-gray-600">{book.author}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
