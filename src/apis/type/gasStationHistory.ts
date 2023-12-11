export interface TGasStationHistoryRequestParams {
  name?: string;
  memberName?: string;
  carName?: string;
  stockNumber?: string;
  departmentName?: string;
  startDate?: string;
  endDate?: number;
}

export interface TGasStationHistoryRequest {
  id?: number;
  gasStationName?: string;
  stockNumber?: string;
  amount?: number;
  usedAt?: string;
}

export interface TGasStationHistoryResponse {
  id?: number;
  name?: string;
  memberName?: string;
  carName?: string;
  stockNumber?: string;
  departmentName?: string;
  usedAt?: string;
  amount?: number;
}
