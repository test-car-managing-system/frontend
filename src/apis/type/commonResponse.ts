export type TResponseType<T> = {
  status: number;
  success: boolean;
  result: T;
};
