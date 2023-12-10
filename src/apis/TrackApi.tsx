import { axiosRequest } from './axios';
import { TPageResponse, TResponseType } from './type/commonResponse';
import {
  TTrackRequestParams,
  TTrackReservationDetailResponse,
  TTrackReservationRequest,
  TTrackReservationRequestParams,
  TTrackReservationSlotRequestParams,
  TTrackReservationsResponse,
  TTrackReservationsSlotResponse,
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

  // 대시보드 나의 시험장 예약 현황
  getMyTrackReservations: async (): Promise<
    TResponseType<TPageResponse<TTrackReservationsResponse[]>>
  > => {
    const { data } = await axiosRequest.get('/tracks/reservations');
    return data;
  },

  // 나의 시험장 예약 현황
  getTrackReservations: async (
    params: TTrackReservationRequestParams,
  ): Promise<TResponseType<TTrackReservationsResponse[]>> => {
    const { data } = await axiosRequest.get('/tracks/reservations', {
      params: {
        name: params?.name,
        createdAt: params?.createdAt,
        status: params?.status,
      },
    });
    return data;
  },

  // 시험장 예약 상세
  getTrackReservationDetail: async (
    id?: number,
  ): Promise<TResponseType<TTrackReservationDetailResponse>> => {
    const { data } = await axiosRequest.get(`/tracks/reservations/${id}`);
    return data;
  },

  // 시험장 예약 현황 슬롯
  getTrackReservationSlots: async (
    params: TTrackReservationSlotRequestParams,
  ): Promise<TResponseType<TTrackReservationsSlotResponse>> => {
    const { data } = await axiosRequest.get(
      `/tracks/${params.trackId}/reservations`,
      { params: { date: params.date } },
    );
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

  // 시험장 예약 취소
  deleteTrackReservation: async (
    id?: number,
  ): Promise<TResponseType<TTrackReservationDetailResponse>> => {
    const { data } = await axiosRequest.delete(
      `/tracks/reservations/${id}/cancel`,
    );
    return data;
  },
};

export default TrackApi;
