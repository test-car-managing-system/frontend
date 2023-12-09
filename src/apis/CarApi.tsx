import { axiosRequest } from './axios';
import {
  TCarRequest,
  TCarRequestParams,
  TCarReservationsResponse,
  TCarResponse,
  TCarStockRequestParams,
  TCarStockResponse,
} from './type/car';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';

const CarApi = {
  // 차량 관리 차량 조회
  getCars: async (
    params?: TCarRequestParams,
    page?: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TCarResponse[]>>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars', {
      params: {
        name: params?.name,
        type: params?.type,
        startDate: params?.startDate,
        endDate: params?.endDate,
        page: page?.page,
        size: page?.size,
      },
    });
    return data;
  },

  // 차량 관리 차량 조회
  getCarDetail: async (id: number): Promise<TResponseType<TCarResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get(`/cars/${id}`);
    return data;
  },

  // 차량 정보 업데이트
  updateCarDetail: async (
    request: TCarRequest,
  ): Promise<TResponseType<TCarResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.patch(`/cars/${request.id}`, {
      name: request.name,
      type: request.type,
      displacement: request.displacement,
    });
    return data;
  },

  // 차량 관리 차량 재고 조회
  getCarStocks: async (
    params?: TCarStockRequestParams,
    page?: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TCarStockResponse[]>>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars/stocks', {
      params: {
        carId: params?.carId,
        name: params?.name,
        stockNumber: params?.stockNumber,
        status: params?.status,
        page: page?.page,
        size: page?.size,
      },
    });
    return data;
  },

  // 시험차량 예약 조회
  getMyCarReservations: async (): Promise<
    TResponseType<TPageResponse<TCarReservationsResponse[]>>
  > => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars/reservations');
    return data;
  },
};

export default CarApi;
