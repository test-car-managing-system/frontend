export interface TCarReservationsResponse {
  id: number;
  name: string;
  stockNumber: string;
  startedAt: string;
  expiredAt: string;
  status: CarReservationStatus;
}

export enum CarReservationStatus {
  RESERVED = '예약중',
  RETURNED = '반납완료',
}
