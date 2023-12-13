import { axiosRequest } from './axios';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';
import {
  TExpenseRequest,
  TExpenseRequestParams,
  TExpenseResponse,
} from './type/expense';

const ExpenseApi = {
  // 지출 이력 리스트 가져오기
  getExpenses: async (
    params: TExpenseRequestParams,
    page: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TExpenseResponse[]>>> => {
    const { data } = await axiosRequest.get('/expenses', {
      params: {
        memberName: params?.memberName,
        carName: params?.carName,
        stockNumber: params?.stockNumber,
        departmentName: params?.departmentName,
        description: params?.description,
        startDate: params?.startDate,
        endDate: params?.endDate,
        page: page?.page,
        size: page?.size,
      },
    });
    return data;
  },

  // 지출 이력 상세
  getExpense: async (id?: number): Promise<TResponseType<TExpenseResponse>> => {
    const { data } = await axiosRequest.get(`/expenses/${id}`);
    return data;
  },

  // 지출 이력 등록
  postExpense: async (
    request: TExpenseRequest,
  ): Promise<TResponseType<TExpenseResponse>> => {
    const { data } = await axiosRequest.post(`/expenses`, {
      description: request?.description,
      stockNumber: request?.stockNumber,
      usedAt: request?.usedAt,
      amount: request?.amount,
    });
    return data;
  },

  // 지출 이력 수정
  updateExpense: async (
    request: TExpenseRequest,
  ): Promise<TResponseType<TExpenseResponse>> => {
    const { data } = await axiosRequest.patch(`/expenses/${request.id}`, {
      description: request?.description,
      stockNumber: request?.stockNumber,
      usedAt: request?.usedAt,
      amount: request?.amount,
    });
    return data;
  },

  // 지출 이력 삭제
  deleteExpense: async (
    id?: number,
  ): Promise<TResponseType<TExpenseResponse>> => {
    const { data } = await axiosRequest.post(`/expenses/${id}`);
    return data;
  },
};

export default ExpenseApi;
