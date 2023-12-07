import { axiosRequest } from './axios';
import { TCarReservationsResponse } from './type/car';
import { TPageResponse, TResponseType } from './type/commonResponse';

const CarApi = {
  // 로그인 요청
  getMyCarReservations: async (): Promise<
    TResponseType<TPageResponse<TCarReservationsResponse[]>>
  > => {
    const { data } = await axiosRequest.get('/cars/reservations');
    return data;
  },
};

export default CarApi;
