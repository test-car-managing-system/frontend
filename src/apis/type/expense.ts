export interface TExpenseResponse {
  id?: number;
  memberName?: string;
  departmentName?: string;
  carName?: string;
  stockNumber?: string;
  description?: string;
  usedAt?: string;
  amount?: number;
  createdAt: string;
  updatedAt: string;
  updateMemberName?: string;
}

export interface TExpenseRequestParams {
  memberName?: string;
  departmentName?: string;
  carName?: string;
  stockNumber?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface TExpenseRequest {
  id?: number;
  description?: string;
  stockNumber?: string;
  usedAt?: string;
  amount?: number;
}
