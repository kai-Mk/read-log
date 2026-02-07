import { useState } from 'react';
import type { Book, BookCategory } from '@read-log/shared';
import { BOOK_CATEGORY } from '@read-log/shared';

export type EditBookInput = {
  title: string;
  author?: string;
  coverImage?: string;
  pageCount?: number;
  category: BookCategory;
};

type EditBookFormProps = {
  book: Book;
  onSubmit: (data: EditBookInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const CATEGORY_OPTIONS: { value: BookCategory; label: string }[] = [
  { value: BOOK_CATEGORY.TECH, label: '技術書' },
  { value: BOOK_CATEGORY.NOVEL, label: '小説' },
  { value: BOOK_CATEGORY.ACADEMIC, label: '学術書' },
  { value: BOOK_CATEGORY.OTHER, label: 'その他' },
];

export function EditBookForm({ book, onSubmit, onCancel, isSubmitting }: EditBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author ?? '');
  const [coverImage, setCoverImage] = useState(book.coverImage ?? '');
  const [pageCount, setPageCount] = useState<number | ''>(book.pageCount ?? '');
  const [category, setCategory] = useState<BookCategory>(book.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      author: author.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      pageCount: pageCount === '' ? undefined : pageCount,
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
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
          表紙画像URL
        </label>
        <input
          type="text"
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700">
          ページ数
        </label>
        <input
          type="number"
          id="pageCount"
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value === '' ? '' : Number(e.target.value))}
          min={1}
          max={99999}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
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
          {isSubmitting ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  );
}
