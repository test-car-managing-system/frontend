import styled from 'styled-components';
import Info from '../../components/info/Info';
import { useEffect, useState } from 'react';
import CarApi from '../../apis/CarApi';
import { useNavigate, useParams } from 'react-router-dom';
import { CarType, TCarRequest, TCarResponse } from '../../apis/type/car';
import Button from '../../components/button/Button';
import CarStockTable from '../../components/table/CarDetailStockTable';
import ConfirmModal from '../../components/modal/ConfirmModal';
import CarUpdateModal from '../../components/modal/CarUpdateModal';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import ErrorModal from '../../components/modal/ErrorModal';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';

function CarDetail() {
  const [carDeleteModalOpen, setCarDeleteModalOpen] = useState<boolean>(false);
  const [carUpdateModalOpen, setCarUpdateModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [car, setCar] = useState<TCarResponse>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, data: user } = useGetMyInfo();
  const hasRole = user?.result.role == 'ADMIN';

  useEffect(() => {
    id &&
      CarApi.getCarDetail(id as unknown as number).then(
        (res) => res.result && setCar(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '차량명', data: car?.name },
      { title: '등록일자', data: car?.createdAt },
      {
        title: '차종',
        data: CarType[car?.type as unknown as keyof typeof CarType],
      },
      { title: '배기량', data: car?.displacement.toString() },
    ]);
  }, [car]);

  const onCarUpdateButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setCarUpdateModalOpen(true);
    }
  };

  const onCarUpdateButtonConfirmClick = (request: TCarRequest) => {
    CarApi.updateCarDetail(request)
      .then((res) => {
        res.result && setCar(res.result);
        setCarUpdateModalOpen(false);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onCarDeleteButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setCarDeleteModalOpen(true);
    }
  };

  const onCarDeleteButtonConfirmClick = (id: number) => {
    CarApi.deleteCar(id)
      .then((res) => {
        setCarUpdateModalOpen(false);
        navigate('/cars');
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  return (
    <Wrapper>
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <CarUpdateModal
        title="차량 수정"
        content="해당 차량을 수정하시겠습니까?"
        modalOpen={carUpdateModalOpen}
        onConfirm={(data: TCarRequest) => onCarUpdateButtonConfirmClick(data)}
        onCancel={() => setCarUpdateModalOpen(false)}
        buttonText="수정하기"
        property="update"
        defaultValues={car}
      />
      <ConfirmModal
        title="차량 삭제"
        content="해당 차량을 삭제하시겠습니까?"
        modalOpen={carDeleteModalOpen}
        onConfirm={() => onCarDeleteButtonConfirmClick(id as unknown as number)}
        onCancel={() => setCarDeleteModalOpen(false)}
        buttonText="삭제하기"
        property="delete"
      />
      <Info title="차량 정보" contents={data}></Info>
      <ButtonContainer>
        <Button
          property="update"
          label="수정"
          onClick={() => onCarUpdateButtonClick()}
        />
        <HorizontalSizedBox />
        <Button
          property="delete"
          label="삭제"
          onClick={() => onCarDeleteButtonClick()}
        />
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
