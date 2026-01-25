export type ErrorResponse = {
  code: string;
  error: string;
  message: string;
};

export type SuccessResponse<T> = T;

export type DeleteResponse = {
  success: true;
};
