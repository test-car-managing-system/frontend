import { axiosRequest } from './axios';
import {
  TCarRequestParams,
  TCarReservationsResponse,
  TCarResponse,
} from './type/car';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';

const CarApi = {
  // 시험차량 예약 조회
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
