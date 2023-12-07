import { useQuery } from 'react-query';
import { axiosRequest } from '../../apis/axios';
import TrackApi from '../../apis/TrackApi';

const useGetMyTrackReservations = () => {
  const token = localStorage.getItem('accessToken');
  axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { status, data } = useQuery(
    ['trackReservations'],
    TrackApi.getMyTrackReservations,
    {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
    },
  );

  return { status, data };
};

export default useGetMyTrackReservations;
