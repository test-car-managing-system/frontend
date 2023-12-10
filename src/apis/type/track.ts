export interface TTrackResponse {
  id?: number;
  name?: string;
  location?: string;
  longitude?: string;
  latitude?: string;
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
