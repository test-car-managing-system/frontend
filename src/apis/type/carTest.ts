export interface TCarTestResponse {
  id?: number;
  trackName?: string;
  memberName?: string;
  departmentName?: string;
  carName?: string;
  stockNumber?: string;
  performedAt?: string;
}

export interface TCarTestRequestParams {
  trackName?: string;
  memberName?: string;
  carName?: string;
  stockNumber?: string;
  departmentName?: string;
  startDate?: string;
  endDate?: string;
}

export interface TCarTestRequest {
  id?: number;
  trackName?: string;
  stockNumber?: string;
  performedAt?: string;
  result?: string;
  memo?: string;
}
