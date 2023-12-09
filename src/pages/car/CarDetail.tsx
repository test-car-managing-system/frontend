import styled from 'styled-components';
import Info from '../../components/info/Info';
import { useEffect, useState } from 'react';
import CarApi from '../../apis/CarApi';
import { useParams } from 'react-router-dom';
import { CarType, TCarResponse } from '../../apis/type/car';

function CarDetail() {
  const [cars, setCars] = useState<TCarResponse>();
  const { id } = useParams();

  useEffect(() => {
    id &&
      CarApi.getCarDetail(id as unknown as number).then(
        (res) => res.result && setCars(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '차량명', data: cars?.name },
      { title: '등록일자', data: cars?.createdAt },
      {
        title: '차종',
        data: CarType[cars?.type as unknown as keyof typeof CarType],
      },
      { title: '배기량', data: cars?.displacement.toString() },
    ]);
  }, [cars]);

  return (
    <Wrapper>
      <Info title="차량 정보" contents={data}></Info>
    </Wrapper>
  );
}

export default CarDetail;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
