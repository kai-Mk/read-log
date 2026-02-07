import { useState, useEffect } from 'react';
import type { Book, BookStatus } from '@read-log/shared';
import { Modal } from '../../../components/Modal';
import { StatusDropdown } from './StatusDropdown';
import { EditBookModal } from './EditBookModal';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { useUpdateBook } from '../hooks/useUpdateBook';
import { useDeleteBook } from '../hooks/useDeleteBook';

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
  const { deleteBook, isLoading: isDeleting } = useDeleteBook(libraryId);
  const [currentStatus, setCurrentStatus] = useState<BookStatus>(book.status);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // bookが変更されたらローカルステートを同期
  useEffect(() => {
    setCurrentStatus(book.status);
  }, [book.status]);

  const handleStatusChange = async (newStatus: BookStatus) => {
    if (newStatus === currentStatus) return;

    // 楽観的更新: 即座にUIを更新
    setCurrentStatus(newStatus);

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
    } else {
      // 失敗時は元に戻す
      setCurrentStatus(book.status);
    }
  };

  const handleDelete = async () => {
    const success = await deleteBook(book.id);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    onSuccess();
  };

  // 編集モーダルが開いている場合は詳細モーダルを非表示にする
  if (isEditModalOpen) {
    return (
      <EditBookModal
        isOpen={true}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        book={book}
        libraryId={libraryId}
      />
    );
  }

  // 削除確認ダイアログが開いている場合は詳細モーダルを非表示にする
  if (isDeleteDialogOpen) {
    return (
      <DeleteConfirmDialog
        isOpen={true}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        bookTitle={book.title}
        isLoading={isDeleting}
      />
    );
  }

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
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="rounded-md bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
        >
          削除
        </button>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200"
        >
          編集
        </button>
      </div>
    </Modal>
  );
}
