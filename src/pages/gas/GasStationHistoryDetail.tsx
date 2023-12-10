import styled from 'styled-components';
import { TGasStationHistoryResponse } from '../../apis/type/gasStationHistory';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Info from '../../components/info/Info';
import track from '../track';
import GasStationHistoryApi from '../../apis/GasStationHistoryApi';

function GasStationHistoryDetail() {
  const [gasStationHistory, setGasStationHistory] =
    useState<TGasStationHistoryResponse>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id &&
      GasStationHistoryApi.getGasStationHistory(id as unknown as number).then(
        (res) => res.result && setGasStationHistory(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '주유소명', data: gasStationHistory?.name },
      { title: '사용자명', data: gasStationHistory?.memberName },
      { title: '차량명', data: gasStationHistory?.carName },
      { title: '재고번호', data: gasStationHistory?.stockNumber },
      { title: '부서', data: gasStationHistory?.departmentName },
      { title: '주유일시', data: gasStationHistory?.usedAt },
      { title: '주유량', data: `${gasStationHistory?.amount?.toString()} L` },
    ]);
  }, [gasStationHistory]);

  return (
    <Wrapper>
      <Info title="주유 이력 정보" contents={data}></Info>
      <VerticalSizedBox />
    </Wrapper>
  );
}

export default GasStationHistoryDetail;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;

const VerticalSizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
