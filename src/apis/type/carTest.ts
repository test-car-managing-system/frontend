export interface TCarTestResponse {
  id?: number;
  trackName?: string;
  memberName?: string;
  updateMemberName?: string;
  location?: string;
  departmentName?: string;
  length?: number;
  description?: string;
  carName?: string;
  stockNumber?: string;
  result?: string;
  performedAt?: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
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
