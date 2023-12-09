import { IDepartmentResponse } from './department';

export interface IMembersRes {
  id: number;
  email?: string;
  name?: string;
  role?: string;
  department?: IDepartmentResponse;
  createdAt?: string;
}

export interface TMemberRequestParams {
  name?: string;
  department?: string;
  role?: string;
}

export interface TUpdateMemberRequest {
  id?: number;
  name?: string;
  email?: string;
  departmentId?: number;
  role?: string;
}

export interface TRegisterMemberRequest {
  name?: string;
  password?: string;
  email?: string;
  departmentId?: number;
  role?: string;
}

export enum Role {
  USER = '사용자',
  ADMIN = '관리자',
}
