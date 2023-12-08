export interface TCarResponse {
  id: number;
  name: string;
  type: CarType;
  displacement: number;
  createdAt: string;
}

export interface TCarRequestParams {
  name?: string;
  type?: CarType;
  startDate?: string;
  endDate?: string;
}

export enum CarType {
  SEDAN = '세단',
  SUV = 'SUV',
  TRUCK = '트럭',
  VAN = '밴',
  NULL = '없음',
}

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
