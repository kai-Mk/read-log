import type { Book, BookStatus } from '@read-log/shared';
import { Modal } from '../../../components/Modal';
import { StatusDropdown } from './StatusDropdown';
import { useUpdateBook } from '../hooks/useUpdateBook';

type BookDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  book: Book;
  libraryId: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  tech: '技術書',
  novel: '小説',
  academic: '学術書',
  other: 'その他',
};

export function BookDetailModal({
  isOpen,
  onClose,
  onSuccess,
  book,
  libraryId,
}: BookDetailModalProps) {
  const { updateBook, isLoading } = useUpdateBook(libraryId);

  const handleStatusChange = async (newStatus: BookStatus) => {
    if (newStatus === book.status) return;

    const result = await updateBook(book.id, {
      title: book.title,
      author: book.author ?? undefined,
      isbn: book.isbn ?? undefined,
      coverImage: book.coverImage ?? undefined,
      pageCount: book.pageCount ?? undefined,
      status: newStatus,
      category: book.category,
    });

    if (result) {
      onSuccess();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="本の詳細" size="lg">
      <div className="flex gap-6">
        <div className="h-48 w-32 flex-shrink-0">
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
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
          {book.author && <p className="mt-1 text-gray-600">{book.author}</p>}
          <div className="mt-4 space-y-2 text-sm text-gray-500">
            {book.pageCount && <p>{book.pageCount}ページ</p>}
            <p>カテゴリ: {CATEGORY_LABELS[book.category]}</p>
            {book.isbn && <p>ISBN: {book.isbn}</p>}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">ステータス</label>
            <div className="mt-1">
              <StatusDropdown
                value={book.status}
                onChange={handleStatusChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          閉じる
        </button>
      </div>
    </Modal>
  );
}
