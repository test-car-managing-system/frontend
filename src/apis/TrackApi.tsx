import { axiosRequest } from './axios';
import { TPageResponse, TResponseType } from './type/commonResponse';
import {
  TTrackRequestParams,
  TTrackReservationRequest,
  TTrackReservationsResponse,
  TTrackResponse,
} from './type/track';

const TrackApi = {
  // 시험장 필터 조회
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

  // 시험장 상세 조회
  getTrackDetail: async (
    id: number,
  ): Promise<TResponseType<TTrackResponse>> => {
    const { data } = await axiosRequest.get(`/tracks/${id}`);
    return data;
  },

  // 시험장 예약 현황
  getMyTrackReservations: async (): Promise<
    TResponseType<TPageResponse<TTrackReservationsResponse[]>>
  > => {
    const { data } = await axiosRequest.get('/tracks/reservations');
    return data;
  },

  // 시험장 예약
  postTrackReservations: async (
    request: TTrackReservationRequest,
  ): Promise<TResponseType<TTrackReservationsResponse>> => {
    const { data } = await axiosRequest.post(`/tracks/${request.id}/reserve`, {
      date: request.date,
      reservationSlots: request.reservationSlots,
    });
    return data;
  },
};

export default TrackApi;
