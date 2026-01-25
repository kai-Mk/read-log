export type Memo = {
  id: string;
  bookId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateMemoRequest = {
  content: string;
};

export type UpdateMemoRequest = {
  content: string;
};
