export interface TGasStationHistoryRequestParams {
  name?: string;
  memberName?: string;
  carName?: string;
  stockNumber?: string;
  departmentName?: string;
  startDate?: string;
  endDate?: number;
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
