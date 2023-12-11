import { axiosRequest } from './axios';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';
import { TGasStationResponse } from './type/gasStation';
import {
  TGasStationHistoryRequest,
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

  // 주유 이력 등록
  postGasStationHistory: async (
    body: TGasStationHistoryRequest,
  ): Promise<TResponseType<TGasStationHistoryResponse>> => {
    const { data } = await axiosRequest.post(`/gas-stations/history`, {
      gasStationName: body?.gasStationName,
      stockNumber: body?.stockNumber,
      amount: body?.amount,
      usedAt: body?.usedAt,
    });
    return data;
  },
};

export default GasStationHistoryApi;
