export interface TTrackResponse {
  id?: number;
  name?: string;
  location?: string;
  longitude?: string;
  latitude?: string;
  weather?: string;
  temperature?: string;
  description?: string;
  length?: number;
}

export interface TTrackRequest {
  id?: number;
  name?: string;
  location?: string;
  description?: string;
  length?: number;
}

export interface TTrackReservationRequest {
  id?: number;
  date?: string;
  reservationSlots?: TTrackReservationSlot[];
}

export interface TTrackReservationSlot {
  startedAt?: string;
  expiredAt?: string;
}

export interface TTrackRequestParams {
  name?: string;
  location?: string;
}

export interface TTrackReservationRequestParams {
  name?: string;
  createdAt?: string;
  status?: string;
}

export interface TTrackReservationSlotRequestParams {
  trackId?: number;
  date?: string;
}

export interface TTrackReservationsResponse {
  id: number;
  name: string;
  createdAt: string;
  status: TrackReservationStatus;
}

export interface TTrackReservationRankingResponse {
  name: string;
  count: number;
}

export interface TTrackReservationDetailResponse {
  id: number;
  memberName: string;
  name: string;
  location: string;
  length: number;
  description: string;
  status: string;
  reservationTime: TTrackReservationSlot[];
}

export interface TTrackReservationsSlotResponse {
  date?: string;
  reservationTime: TTrackReservationSlot[];
}

export enum TrackReservationStatus {
  RESERVED = '예약중',
  USING = '사용중',
  CANCELED = '예약취소',
  COMPLETED = '반납완료',
}
