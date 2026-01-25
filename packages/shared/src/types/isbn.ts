import type { BookCategory } from './book';

export type IsbnSearchResult = {
  title: string;
  author: string | null;
  coverImage: string | null;
  pageCount: number | null;
  category: BookCategory;
};
