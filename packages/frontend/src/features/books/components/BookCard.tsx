import type { Book, BookStatus } from '@read-log/shared';

type BookCardProps = {
  book: Book;
};

const STATUS_LABELS: Record<BookStatus, string> = {
  unread: '積読',
  wishlist: '読みたい',
  completed: '読了',
};

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="h-32 w-24 flex-shrink-0">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full rounded object-cover"
            />
          ) : (
            <div
              data-testid="cover-placeholder"
              className="flex h-full w-full items-center justify-center rounded bg-gray-100 text-gray-400"
            >
              No Image
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium text-gray-900">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <div className="mt-auto">
            <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
              {STATUS_LABELS[book.status]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
