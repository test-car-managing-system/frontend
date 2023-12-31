import { axiosRequest } from './axios';
import {
  TCarRequest,
  TCarRequestParams,
  TCarReservationRankingResponse,
  TCarReservationsRequestParams,
  TCarReservationsResponse,
  TCarResponse,
  TCarStockRequest,
  TCarStockRequestParams,
  TCarStockResponse,
  TTestCarResponse,
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

  // 시험 차량 조회
  getTestCars: async (
    params?: TCarRequestParams,
    page?: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TTestCarResponse[]>>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/test-cars', {
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

  // 시험 차량 상세 조회
  getTestCar: async (id?: number): Promise<TResponseType<TTestCarResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get(`/test-cars/${id}`);
    return data;
  },

  // 차량 관리 차량 조회
  getCarDetail: async (id: number): Promise<TResponseType<TCarResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get(`/cars/${id}`);
    return data;
  },

  // 차량 등록
  postCar: async (
    request: TCarRequest,
  ): Promise<TResponseType<TCarResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.post(`/cars/register`, {
      name: request.name,
      type: request.type,
      displacement: request.displacement,
    });
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

  // 차량 삭제
  deleteCar: async (id: number): Promise<TResponseType<TCarResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.delete(`/cars/${id}`);
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

  // 차량 재고 등록
  postCarStock: async (
    request: TCarStockRequest,
  ): Promise<TResponseType<number[]>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.post(`/cars/stocks/register`, {
      carId: request.carId,
      stockNumber: request.stockNumber,
      status: request.status,
    });
    return data;
  },

  // 차량 재고 업데이트
  updateCarStock: async (
    request: TCarStockRequest,
  ): Promise<TResponseType<number[]>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.patch(`/cars/stocks/${request.id}`, {
      stockNumber: request.stockNumber,
      status: request.status,
    });
    return data;
  },

  // 차량 재고 리스트 삭제
  deleteCarStocks: async (ids: number[]): Promise<TResponseType<number[]>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.delete(`/cars/stocks`, {
      data: {
        ids: ids,
      },
    });
    return data;
  },

  // 대시보드 시험차량 예약 조회
  getMyCarReservations: async (): Promise<
    TResponseType<TPageResponse<TCarReservationsResponse[]>>
  > => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars/reservations');
    return data;
  },

  // 시험차량 예약 조회 필터링
  getCarReservations: async (
    params: TCarReservationsRequestParams,
    page: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TCarReservationsResponse[]>>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars/reservations', {
      params: {
        name: params?.name,
        status: params?.status,
        startDate: params?.startDate,
        endDate: params?.endDate,
        page: page?.page,
        size: page?.size,
      },
    });
    return data;
  },

  // 시험차량 예약 랭킹 조회
  getCarReservationsRanking: async (): Promise<
    TResponseType<TCarReservationRankingResponse[]>
  > => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.get('/cars/reservations/rank');
    return data;
  },

  // 시험차량 예약
  postCarReservation: async (
    id: number,
  ): Promise<TResponseType<TCarReservationsResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.post(`/cars/reserve`, {
      carStockId: id,
    });
    return data;
  },

  // 시험차량 반납
  updateReturnCarReservation: async (
    ids: number[],
  ): Promise<TResponseType<TCarReservationsResponse>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.patch(`/cars/return`, {
      carReservationIds: ids,
    });
    return data;
  },
};

export default CarApi;
