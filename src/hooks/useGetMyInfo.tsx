import { useQuery } from 'react-query';
import MembersApi from '../apis/MembersApi';
import { axiosRequest } from '../apis/axios';

const useGetMyInfo = () => {
  const token = localStorage.getItem('accessToken');
  axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { status, data } = useQuery(['members'], MembersApi.getMyInfo, {
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  });

  return { status, data };
};

export default useGetMyInfo;
