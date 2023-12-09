import styled from 'styled-components';
import Info from '../../components/info/Info';
import { useEffect, useState } from 'react';
import CarApi from '../../apis/CarApi';
import { useParams } from 'react-router-dom';
import { CarType, TCarResponse } from '../../apis/type/car';
import Button from '../../components/button/Button';
import CarStockTable from '../../components/table/CarDetailStockTable';

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
      <ButtonContainer>
        <Button property="update" label="수정" />
        <HorizontalSizedBox />
        <Button property="delete" label="삭제" />
      </ButtonContainer>
      <Container>
        <CarStockTable title="재고 조회" />
      </Container>
    </Wrapper>
  );
}

export default CarDetail;

const Wrapper = styled.div``;

const Container = styled.div`
  overflow-y: scroll;
`;

const HorizontalSizedBox = styled.div`
  width: 5px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: right;
  align-items: center;
`;
