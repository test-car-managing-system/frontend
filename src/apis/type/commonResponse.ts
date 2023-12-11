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

export type ErrorResponse = {
  status: number;
  success: boolean;
  message: string;
  code: string;
  errors: ErrorField[];
};

export type ErrorField = {
  field: string;
  value: string;
  reason: string;
};
