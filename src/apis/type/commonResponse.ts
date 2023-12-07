export type TResponseType<T> = {
  status: number;
  success: boolean;
  result: T;
};

export type TPageResponse<T> = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  contents: T;
};
