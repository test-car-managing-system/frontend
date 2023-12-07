import { axiosRequest } from './axios';
import { TResponseType } from './type/commonResponse';
import { IMembersRes } from './type/member';

const UsersApi = {
  // 내 정보 가져오기
  getMyInfo: async (): Promise<TResponseType<IMembersRes>> => {
    const { data } = await axiosRequest.get('/members/me');
    return data;
  },
};

export default UsersApi;
