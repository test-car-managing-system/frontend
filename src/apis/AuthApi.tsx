import { axiosRequest } from './axios';
import { TLoginRequestType, TTokenResponseType } from './type/auth';
import { TResponseType } from './type/commonResponse';

const AuthApi = {
  // 로그인 요청
  login: async (
    payload: TLoginRequestType,
  ): Promise<TResponseType<TTokenResponseType>> => {
    const { data } = await axiosRequest.post('/auth/login', payload);
    return data;
  },
};

export default AuthApi;
