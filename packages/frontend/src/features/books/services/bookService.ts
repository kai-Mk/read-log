import type {
  Book,
  CreateBookInput,
  UpdateBookInput,
  BookStatus,
  BookCategory,
} from '@read-log/shared';
import { FetchError } from '../../../utils/fetcher';

export type GetBooksFilter = {
  status?: BookStatus;
  category?: BookCategory;
  search?: string;
};

export const bookService = {
  async createBook(libraryId: string, input: CreateBookInput): Promise<Book> {
    const response = await fetch(`/api/libraries/${libraryId}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const info = await response.json().catch(() => null);
      throw new FetchError('本の登録に失敗しました', response.status, info);
    }

    return response.json();
  },

  async getBooks(libraryId: string, filter?: GetBooksFilter): Promise<Book[]> {
    let url = `/api/libraries/${libraryId}/books`;

    if (filter) {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.category) params.append('category', filter.category);
      if (filter.search) params.append('search', filter.search);

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await fetch(url);

    if (!response.ok) {
      const info = await response.json().catch(() => null);
      throw new FetchError('本の取得に失敗しました', response.status, info);
    }

    const data = (await response.json()) as { books: Book[] };
    return data.books;
  },

  async updateBook(libraryId: string, bookId: string, input: UpdateBookInput): Promise<Book> {
    const response = await fetch(`/api/libraries/${libraryId}/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const info = await response.json().catch(() => null);
      throw new FetchError('本の更新に失敗しました', response.status, info);
    }

    return response.json();
  },

  async deleteBook(libraryId: string, bookId: string): Promise<void> {
    const response = await fetch(`/api/libraries/${libraryId}/books/${bookId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const info = await response.json().catch(() => null);
      throw new FetchError('本の削除に失敗しました', response.status, info);
    }
  },
};
