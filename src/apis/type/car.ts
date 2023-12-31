export interface TCarResponse {
  id: number;
  name: string;
  type: CarType;
  displacement: number;
  createdAt: string;
}

export interface TTestCarResponse {
  id: number;
  name: string;
  type: string;
  stock: number;
  status: string;
  displacement: number;
  createdAt: string;
}

export interface TCarRequestParams {
  name?: string;
  type?: CarType;
  startDate?: string;
  endDate?: string;
}

export interface TCarRequest {
  id?: number;
  name?: string;
  type?: string;
  displacement?: number;
}

export enum CarType {
  SEDAN = '세단',
  SUV = 'SUV',
  TRUCK = '트럭',
  VAN = '밴',
  NULL = '없음',
}

export interface TCarStockRequest {
  id?: number;
  carId?: number;
  stockNumber?: string;
  status?: string;
}

export interface TCarStockResponse {
  id: number;
  name: string;
  type: CarType;
  stockNumber: string;
  createdAt: string;
  status: CarStockStatus;
}

export interface TCarStockRequestParams {
  carId?: number;
  name?: string;
  stockNumber?: string;
  status?: string;
}

export enum CarStockStatus {
  AVAILABLE = '대여가능',
  INSPECTION = '검수중',
  RESERVED = '대여중',
  UNAVAILABLE = '폐기',
}

export interface TCarReservationsRequestParams {
  name?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface TCarReservationsResponse {
  id: number;
  name: string;
  stockNumber: string;
  startedAt: string;
  expiredAt: string;
  status: CarReservationStatus;
}

export interface TCarReservationRankingResponse {
  name: string;
  count: number;
}

export enum CarReservationStatus {
  RESERVED = '예약중',
  RETURNED = '반납완료',
}
