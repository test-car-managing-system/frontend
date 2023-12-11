import styled from 'styled-components';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Info from '../../components/info/Info';
import ConfirmModal from '../../components/modal/ConfirmModal';
import ErrorModal from '../../components/modal/ErrorModal';
import CarTestApi from '../../apis/CarTestApi';
import { TCarTestRequest, TCarTestResponse } from '../../apis/type/carTest';
import CarTestRegisterModal from '../../components/modal/CarTestRegisterModal';
import Button from '../../components/button/Button';
import { ErrorResponse } from '../../apis/type/commonResponse';

// 시험 수행 이력 상세
function CarTestDetail() {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [carTest, setCarTest] = useState<TCarTestResponse>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id &&
      CarTestApi.getCarTestDetail(id as unknown as number).then(
        (res) => res.result && setCarTest(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '시험장명', data: carTest?.trackName },
      { title: '사용자명', data: carTest?.memberName },
      { title: '위치', data: carTest?.location },
      { title: '부서', data: carTest?.departmentName },
      { title: '길이', data: carTest?.length?.toString() },
      { title: '특성', data: carTest?.description },
      { title: '차량명', data: carTest?.carName },
      { title: '재고번호', data: carTest?.stockNumber },
      { title: '주행결과', data: carTest?.result },
      { title: '수행일자', data: carTest?.performedAt },
      { title: '비고', data: carTest?.memo || '없음' },
      { title: '등록일자', data: carTest?.createdAt },
      { title: '수정인', data: carTest?.updateMemberName },
      { title: '수정일자', data: carTest?.updatedAt },
    ]);
  }, [carTest]);

  const onUpdateButtonClick = () => {
    setUpdateModalOpen(true);
  };

  const onUpdateButtonConfirmClick = (request: TCarTestRequest) => {
    CarTestApi.updateCarTest(request)
      .then((res) => {
        res.result && setCarTest(res.result);
        setUpdateModalOpen(false);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };

  const onDeleteButtonConfirmClick = (id: number) => {
    CarTestApi.deleteCarTest(id)
      .then((res) => {
        setDeleteModalOpen(false);
        navigate('/cars/tests');
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
      <CarTestRegisterModal
        title="시험 수행 이력 등록"
        modalOpen={updateModalOpen}
        onConfirm={(data: TCarTestRequest) => onUpdateButtonConfirmClick(data)}
        onCancel={() => setUpdateModalOpen(false)}
        buttonText="수정하기"
        property="update"
        defaultValues={carTest}
      />
      <ConfirmModal
        title="시험 수행 이력 삭제"
        content="해당 시험 수행을 이력을 삭제하시겠습니까?"
        modalOpen={deleteModalOpen}
        onConfirm={() => onDeleteButtonConfirmClick(id as unknown as number)}
        onCancel={() => setDeleteModalOpen(false)}
        buttonText="삭제하기"
        property="delete"
      />
      <Info title="사용자 정보" contents={data}></Info>
      <ButtonContainer>
        <Button
          property="update"
          label="수정"
          onClick={() => onUpdateButtonClick()}
        />
        <HorizontalSizedBox />
        <Button
          property="delete"
          label="삭제"
          onClick={() => onDeleteButtonClick()}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default CarTestDetail;

const Wrapper = styled.div``;

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
