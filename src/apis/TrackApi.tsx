import { axiosRequest } from './axios';
import { TPageResponse, TResponseType } from './type/commonResponse';
import {
  TTrackRequestParams,
  TTrackReservationsResponse,
  TTrackResponse,
} from './type/track';

const TrackApi = {
  getTracks: async (
    params: TTrackRequestParams,
  ): Promise<TResponseType<TTrackResponse[]>> => {
    const { data } = await axiosRequest.get('/tracks', {
      params: {
        name: params?.name,
        location: params?.location,
      },
    });
    return data;
  },
  // 시험장 예약 현황
  getMyTrackReservations: async (): Promise<
    TResponseType<TPageResponse<TTrackReservationsResponse[]>>
  > => {
    const { data } = await axiosRequest.get('/tracks/reservations');
    return data;
  },
};

export default TrackApi;
