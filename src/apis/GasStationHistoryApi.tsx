import { axiosRequest } from './axios';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';
import {
  TGasStationHistoryRequestParams,
  TGasStationHistoryResponse,
} from './type/gasStationHistory';

const GasStationHistoryApi = {
  // 주유 이력 리스트 가져오기
  getGasStationHistories: async (
    params: TGasStationHistoryRequestParams,
    page: TPageRequest,
  ): Promise<TResponseType<TPageResponse<TGasStationHistoryResponse[]>>> => {
    const { data } = await axiosRequest.get('/gas-stations/history', {
      params: {
        name: params?.name,
        memberName: params?.memberName,
        carName: params?.carName,
        stockNumber: params?.stockNumber,
        departmentName: params?.departmentName,
        startDate: params?.startDate,
        endDate: params?.endDate,
        page: page?.page,
        size: page?.size,
      },
    });
    return data;
  },

  // 주유 이력 상세
  getGasStationHistory: async (
    id?: number,
  ): Promise<TResponseType<TGasStationHistoryResponse>> => {
    const { data } = await axiosRequest.get(`/gas-stations/history/${id}`);
    return data;
  },
};

export default GasStationHistoryApi;
