export interface TTrackReservationsResponse {
  id: number;
  name: string;
  createdAt: string;
  status: TrackReservationStatus;
}

export enum TrackReservationStatus {
  RESERVED = '예약중',
  USING = '사용중',
  CANCELED = '예약취소',
  COMPLETED = '반납완료',
}
