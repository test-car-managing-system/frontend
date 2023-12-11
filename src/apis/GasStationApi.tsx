import { axiosRequest } from './axios';
import { TPageRequest } from './type/commonRequest';
import { TPageResponse, TResponseType } from './type/commonResponse';
import { TGasStationRequest, TGasStationResponse } from './type/gasStation';
import {
  TGasStationHistoryRequestParams,
  TGasStationHistoryResponse,
} from './type/gasStationHistory';

const GasStationApi = {
  // 주유소 리스트 가져오기
  getGasStations: async (): Promise<TResponseType<TGasStationResponse[]>> => {
    const { data } = await axiosRequest.get('/gas-stations');
    return data;
  },

  // 주유소 상세
  getGasStationDetail: async (
    id?: number,
  ): Promise<TResponseType<TGasStationResponse>> => {
    const { data } = await axiosRequest.get(`/gas-stations/${id}`);
    return data;
  },

  // 주유소 등록
  postGasStation: async (
    body: TGasStationRequest,
  ): Promise<TResponseType<TGasStationResponse>> => {
    const { data } = await axiosRequest.post(`/gas-stations`, {
      name: body?.name,
    });
    return data;
  },

  // 주유소 수정
  updateGasStation: async (
    body: TGasStationRequest,
  ): Promise<TResponseType<TGasStationResponse>> => {
    const { data } = await axiosRequest.patch(`/gas-stations/${body.id}`, {
      name: body?.name,
    });
    return data;
  },

  // 주유소 삭제
  deleteGasStations: async (
    ids: number[],
  ): Promise<TResponseType<TGasStationResponse>> => {
    const { data } = await axiosRequest.delete(`/gas-stations`, {
      data: {
        ids: ids,
      },
    });
    return data;
  },
};

export default GasStationApi;
