export type Library = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateLibraryRequest = {
  name: string;
};

export type UpdateLibraryRequest = {
  name: string;
};
