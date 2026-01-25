import type { CreateBookInput, UpdateBookInput, BookStatus, BookCategory } from '@read-log/shared';
import { prisma } from '../utils/prisma';

export type FindBooksFilter = {
  status?: BookStatus;
  category?: BookCategory;
  search?: string;
};

export const bookRepository = {
  async create(libraryId: string, input: CreateBookInput) {
    return prisma.book.create({
      data: {
        libraryId,
        title: input.title,
        author: input.author,
        isbn: input.isbn,
        coverImage: input.coverImage,
        pageCount: input.pageCount,
        status: input.status,
        category: input.category,
      },
    });
  },

  async findById(id: string) {
    return prisma.book.findUnique({
      where: { id, deletedAt: null },
    });
  },

  async findByLibraryId(libraryId: string, filter?: FindBooksFilter) {
    const where: {
      libraryId: string;
      deletedAt: null;
      status?: string;
      category?: string;
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' };
        author?: { contains: string; mode: 'insensitive' };
      }>;
    } = {
      libraryId,
      deletedAt: null,
    };

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.category) {
      where.category = filter.category;
    }

    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { author: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    return prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  },

  async update(id: string, input: UpdateBookInput) {
    try {
      return await prisma.book.update({
        where: { id, deletedAt: null },
        data: {
          title: input.title,
          author: input.author,
          isbn: input.isbn,
          coverImage: input.coverImage,
          pageCount: input.pageCount,
          status: input.status,
          category: input.category,
        },
      });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        return null;
      }
      throw error;
    }
  },
};
