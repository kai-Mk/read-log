import type { Book } from '@read-log/shared';
import { Modal } from '../../../components/Modal';
import { EditBookForm, EditBookInput } from './EditBookForm';
import { useUpdateBook } from '../hooks/useUpdateBook';

type EditBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  book: Book;
  libraryId: string;
};

export function EditBookModal({ isOpen, onClose, onSuccess, book, libraryId }: EditBookModalProps) {
  const { updateBook, isLoading } = useUpdateBook(libraryId);

  const handleSubmit = async (data: EditBookInput) => {
    const result = await updateBook(book.id, {
      title: data.title,
      author: data.author,
      isbn: book.isbn ?? undefined,
      coverImage: data.coverImage,
      pageCount: data.pageCount,
      status: book.status,
      category: data.category,
    });

    if (result) {
      onSuccess();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="本の編集" size="md">
      <EditBookForm
        book={book}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isLoading}
      />
    </Modal>
  );
}
