import { axiosRequest } from './axios';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';
import {
  IMembersRes,
  TMemberRequestParams,
  TRegisterMemberRequest,
  TUpdateMemberRequest,
} from './type/member';

const MembersApi = {
  // 내 정보 가져오기
  getMyInfo: async (): Promise<TResponseType<IMembersRes>> => {
    const { data } = await axiosRequest.get('/members/me');
    return data;
  },

  // 사용자 리스트 가져오기
  getMembers: async (
    params: TMemberRequestParams,
    page: TPageRequest,
  ): Promise<TResponseType<TPageResponse<IMembersRes[]>>> => {
    const { data } = await axiosRequest.get('/members', {
      params: {
        name: params?.name,
        department: params?.department,
        role: params?.role,
        page: page.page,
        size: page.size,
      },
    });
    return data;
  },

  // 사용자 상세 정보 가져오기
  getMemberDetail: async (id: number): Promise<TResponseType<IMembersRes>> => {
    const { data } = await axiosRequest.get(`/members/${id}`);
    return data;
  },

  // 사용자 생성
  postMember: async (
    request: TRegisterMemberRequest,
  ): Promise<TResponseType<IMembersRes>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.post(`/members/register`, {
      name: request?.name,
      password: request.password,
      email: request?.email,
      departmentId: request?.departmentId,
      role: request?.role,
    });
    return data;
  },

  // 사용자 정보 업데이트
  updateMemberDetail: async (
    request: TUpdateMemberRequest,
  ): Promise<TResponseType<IMembersRes>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.patch(`/members/${request?.id}`, {
      name: request?.name,
      email: request?.email,
      departmentId: request?.departmentId,
      role: request?.role,
    });
    return data;
  },

  // 사용자 삭제
  deleteMember: async (id: number): Promise<TResponseType<IMembersRes>> => {
    const token = localStorage.getItem('accessToken');
    axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axiosRequest.delete(`/members/${id}`);
    return data;
  },
};

export default MembersApi;
