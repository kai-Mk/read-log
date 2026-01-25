import type { CreateLibraryInput, UpdateLibraryInput } from '@read-log/shared';
import { prisma } from '../utils/prisma';

export const libraryRepository = {
  async create(input: CreateLibraryInput) {
    return prisma.library.create({
      data: {
        name: input.name,
      },
    });
  },

  async findById(id: string) {
    return prisma.library.findUnique({
      where: { id, deletedAt: null },
    });
  },

  async update(id: string, input: UpdateLibraryInput) {
    return prisma.library.update({
      where: { id },
      data: {
        name: input.name,
      },
    });
  },
};
