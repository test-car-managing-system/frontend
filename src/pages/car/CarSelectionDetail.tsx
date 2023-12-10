import styled from 'styled-components';
import {
  TTrackReservationDetailResponse,
  TTrackReservationSlot,
  TrackReservationStatus,
} from '../../apis/type/track';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Info from '../../components/info/Info';
import TrackApi from '../../apis/TrackApi';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import ErrorModal from '../../components/modal/ErrorModal';
import ConfirmModal from '../../components/modal/ConfirmModal';
import Button from '../../components/button/Button';
import { Col, Row } from 'antd';
import {
  CarType,
  TCarStockRequestParams,
  TTestCarResponse,
} from '../../apis/type/car';
import CarApi from '../../apis/CarApi';
import CarSelectionStockTable from '../../components/table/CarSelectionStockTable';

function CarSelectionDetail() {
  const { id } = useParams();
  const [testCar, setTestCar] = useState<TTestCarResponse>();
  const [params, setParams] = useState<TCarStockRequestParams>();
  const navigate = useNavigate();

  useEffect(() => {
    id &&
      CarApi.getTestCar(id as unknown as number).then(
        (res) => res.result && setTestCar(res.result),
      );
    const param: TCarStockRequestParams = { carId: id as unknown as number };
    setParams(param);
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '차량명', data: testCar?.name },
      { title: '등록일자', data: testCar?.createdAt },
      {
        title: '차종',
        data: CarType[testCar?.type as unknown as keyof typeof CarType],
      },
      { title: '배기량', data: testCar?.displacement.toString() },
      { title: '남은재고', data: testCar?.stock.toString() },
      { title: '재고상태', data: testCar?.status },
    ]);
  }, [testCar]);

  return (
    <Wrapper>
      <Info title="차량 정보" contents={data} />
      <CarSelectionStockTable params={params} />
    </Wrapper>
  );
}

export default CarSelectionDetail;

const Wrapper = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: right;
  align-items: center;
`;
