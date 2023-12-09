import { axiosRequest } from './axios';
import { TResponseType } from './type/commonResponse';
import { IDepartmentResponse } from './type/department';

const DepartmentApi = {
  // 부서 리스트 가져오기
  getDepartments: async (): Promise<TResponseType<IDepartmentResponse[]>> => {
    const { data } = await axiosRequest.get('/departments');
    return data;
  },
};

export default DepartmentApi;
