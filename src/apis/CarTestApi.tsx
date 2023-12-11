import { axiosRequest } from './axios';
import {
  TCarRequest,
  TCarRequestParams,
  TCarReservationsRequestParams,
  TCarReservationsResponse,
  TCarResponse,
  TCarStockRequest,
  TCarStockRequestParams,
  TCarStockResponse,
  TTestCarResponse,
} from './type/car';
import {
  TCarTestRequest,
  TCarTestRequestParams,
  TCarTestResponse,
} from './type/carTest';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';

const CarTestApi = {
  // 시험 수행 이력 조회
  getCarTests: async (
    params?: TCarTestRequestParams,
    page?: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TCarTestResponse[]>>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars/tests', {
      params: {
        trackName: params?.trackName,
        memberName: params?.memberName,
        carName: params?.carName,
        stockNumber: params?.stockNumber,
        departmentName: params?.departmentName,
        startDate: params?.startDate,
        endDate: params?.endDate,
        page: page?.page,
        size: page?.size,
      },
    });
    return data;
  },

  // 시험 차량 상세 조회
  getCarTestDetail: async (
    id?: number,
  ): Promise<TResponseType<TCarTestResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get(`/cars/tests/${id}`);
    return data;
  },

  // 시험 이력 등록
  postCarTest: async (
    request: TCarTestRequest,
  ): Promise<TResponseType<TCarTestResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.post(`/cars/tests`, {
      trackName: request?.trackName,
      stockNumber: request?.stockNumber,
      performedAt: request?.performedAt,
      result: request?.result,
      memo: request?.memo,
    });
    return data;
  },

  // 시험 정보 업데이트
  updateCarTest: async (
    request: TCarTestRequest,
  ): Promise<TResponseType<TCarTestResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.patch(`/cars/tests/${request.id}`, {
      trackName: request?.trackName,
      stockNumber: request?.stockNumber,
      performedAt: request?.performedAt,
      result: request?.result,
      memo: request?.memo,
    });
    return data;
  },

  // 시험 이력 삭제
  deleteCarTest: async (
    id: number,
  ): Promise<TResponseType<TCarTestResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.delete(`/cars/tests/${id}`);
    return data;
  },
};

export default CarTestApi;
