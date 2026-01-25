import { useState } from 'react';
import type { BookStatus, BookCategory, CreateBookInput } from '@read-log/shared';
import { BOOK_STATUS, BOOK_CATEGORY } from '@read-log/shared';

type BookFormProps = {
  onSubmit: (data: CreateBookInput) => void;
  onCancel: () => void;
  initialValues?: Partial<CreateBookInput>;
  isSubmitting?: boolean;
};

const STATUS_OPTIONS: { value: BookStatus; label: string }[] = [
  { value: BOOK_STATUS.UNREAD, label: '積読' },
  { value: BOOK_STATUS.WISHLIST, label: '読みたい' },
  { value: BOOK_STATUS.COMPLETED, label: '読了' },
];

const CATEGORY_OPTIONS: { value: BookCategory; label: string }[] = [
  { value: BOOK_CATEGORY.TECH, label: '技術書' },
  { value: BOOK_CATEGORY.NOVEL, label: '小説' },
  { value: BOOK_CATEGORY.ACADEMIC, label: '学術書' },
  { value: BOOK_CATEGORY.OTHER, label: 'その他' },
];

export function BookForm({ onSubmit, onCancel, initialValues, isSubmitting }: BookFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [author, setAuthor] = useState(initialValues?.author ?? '');
  const [isbn, setIsbn] = useState(initialValues?.isbn ?? '');
  const [coverImage] = useState(initialValues?.coverImage ?? '');
  const [pageCount] = useState(initialValues?.pageCount ?? null);
  const [status, setStatus] = useState<BookStatus>(initialValues?.status ?? BOOK_STATUS.UNREAD);
  const [category, setCategory] = useState<BookCategory>(
    initialValues?.category ?? BOOK_CATEGORY.OTHER
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      author: author.trim() || undefined,
      isbn: isbn.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      pageCount: pageCount ?? undefined,
      status,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          著者
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          ステータス
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as BookStatus)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          カテゴリ
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as BookCategory)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
        >
          {isSubmitting ? '登録中...' : '登録'}
        </button>
      </div>
    </form>
  );
}
