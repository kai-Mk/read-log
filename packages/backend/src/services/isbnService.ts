import type { BookCategory } from '@read-log/shared';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

type GoogleBooksResponse = {
  totalItems: number;
  items?: {
    volumeInfo: {
      title: string;
      authors?: string[];
      imageLinks?: {
        thumbnail?: string;
      };
      pageCount?: number;
      categories?: string[];
    };
  }[];
};

export type IsbnSearchResult = {
  title: string;
  author: string | null;
  coverImage: string | null;
  pageCount: number | null;
  category: BookCategory;
};

// カテゴリマッピング用の定義
const TECH_CATEGORIES = ['Computers', 'Technology', 'Programming'];
const NOVEL_CATEGORIES = ['Fiction', 'Literature'];
const ACADEMIC_CATEGORIES = ['Science', 'Mathematics', 'Philosophy', 'History'];

export function mapCategory(categories: string[] | undefined): BookCategory {
  if (!categories || categories.length === 0) {
    return 'other';
  }

  for (const category of categories) {
    if (TECH_CATEGORIES.some((c) => category.includes(c))) {
      return 'tech';
    }
    if (NOVEL_CATEGORIES.some((c) => category.includes(c))) {
      return 'novel';
    }
    if (ACADEMIC_CATEGORIES.some((c) => category.includes(c))) {
      return 'academic';
    }
  }

  return 'other';
}

export const isbnService = {
  async searchByIsbn(isbn: string): Promise<IsbnSearchResult | null> {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}`);

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as GoogleBooksResponse;

      if (data.totalItems === 0 || !data.items || data.items.length === 0) {
        return null;
      }

      const volumeInfo = data.items[0].volumeInfo;

      return {
        title: volumeInfo.title,
        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : null,
        coverImage: volumeInfo.imageLinks?.thumbnail || null,
        pageCount: volumeInfo.pageCount || null,
        category: mapCategory(volumeInfo.categories),
      };
    } catch {
      return null;
    }
  },
};
