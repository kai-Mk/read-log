export type BookStatus = 'unread' | 'wishlist' | 'completed';
export type BookCategory = 'tech' | 'novel' | 'academic' | 'other';

export type Book = {
  id: string;
  libraryId: string;
  title: string;
  author: string | null;
  isbn: string | null;
  coverImage: string | null;
  pageCount: number | null;
  status: BookStatus;
  category: BookCategory;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateBookRequest = {
  title: string;
  author?: string;
  isbn?: string;
  coverImage?: string;
  pageCount?: number;
  status: BookStatus;
  category: BookCategory;
};

export type UpdateBookRequest = {
  title: string;
  author?: string;
  isbn?: string;
  coverImage?: string;
  pageCount?: number;
  status: BookStatus;
  category: BookCategory;
};
