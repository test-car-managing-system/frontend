import { axiosRequest } from './axios';
import { TPageResponse, TResponseType } from './type/commonResponse';
import { TTrackReservationsResponse } from './type/track';

const TrackApi = {
  // 로그인 요청
  getMyTrackReservations: async (): Promise<
    TResponseType<TPageResponse<TTrackReservationsResponse[]>>
  > => {
    const { data } = await axiosRequest.get('/tracks/reservations');
    return data;
  },
};

export default TrackApi;
