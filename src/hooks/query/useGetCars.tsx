import { useQuery } from 'react-query';
import CarApi from '../../apis/CarApi';
import { TCarRequestParams } from '../../apis/type/car';
import { TPageRequest } from '../../apis/type/commonRequest';

const useGetCars = (params?: TCarRequestParams, page?: TPageRequest) => {
  const fetchCars = async () => CarApi.getCars(params, page);
  const { status, data, refetch } = useQuery(['cars', params], fetchCars, {
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  });

  return { status, data, refetch };
};

export default useGetCars;
