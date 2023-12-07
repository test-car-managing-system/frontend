import { useQuery } from 'react-query';
import { axiosRequest } from '../../apis/axios';
import CarApi from '../../apis/CarApi';

const useGetMyCarReservations = () => {
  const token = localStorage.getItem('accessToken');
  axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { status, data } = useQuery(
    ['carReservations'],
    CarApi.getMyCarReservations,
    {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
    },
  );

  return { status, data };
};

export default useGetMyCarReservations;
