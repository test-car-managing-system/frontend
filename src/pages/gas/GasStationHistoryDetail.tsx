import styled from 'styled-components';
import {
  TGasStationHistoryRequest,
  TGasStationHistoryResponse,
} from '../../apis/type/gasStationHistory';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Info from '../../components/info/Info';
import GasStationHistoryApi from '../../apis/GasStationHistoryApi';
import GasStationHistoryRegisterModal from '../../components/modal/GasStationHistoryRegisterModal';
import ErrorModal from '../../components/modal/ErrorModal';
import ConfirmModal from '../../components/modal/ConfirmModal';
import Button from '../../components/button/Button';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import dayjs from 'dayjs';

function GasStationHistoryDetail() {
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
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
      { title: '등록일시', data: gasStationHistory?.createdAt },
      { title: '수정인', data: gasStationHistory?.updateMemberName },
      { title: '수정일시', data: gasStationHistory?.updatedAt },
    ]);
  }, [gasStationHistory]);

  const onUpdateButtonClick = () => {
    setUpdateModalOpen(true);
  };

  const onDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };

  const onUpdateButtonConfirmClick = (request: TGasStationHistoryRequest) => {
    GasStationHistoryApi.updateGasStationHistory(request)
      .then((res) => {
        setGasStationHistory(res.result);
        setUpdateModalOpen(false);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onDeleteButtonConfirmClick = (id: number) => {
    GasStationHistoryApi.deleteGasStationHistory(id)
      .then((res) => {
        setDeleteModalOpen(false);
        navigate('/gas/history');
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  return (
    <Wrapper>
      <GasStationHistoryRegisterModal
        title="주유 이력 수정"
        modalOpen={updateModalOpen}
        onConfirm={(request: TGasStationHistoryRequest) =>
          onUpdateButtonConfirmClick(request)
        }
        onCancel={() => setUpdateModalOpen(false)}
        defaultValues={{
          id: gasStationHistory?.id,
          name: gasStationHistory?.name,
          stockNumber: gasStationHistory?.stockNumber,
          amount: gasStationHistory?.amount,
          usedAt: gasStationHistory?.usedAt,
        }}
        buttonText="수정하기"
        property="update"
      />
      <ConfirmModal
        title="주유 이력 삭제"
        content="해당 주유 이력을 삭제하시겠습니까"
        modalOpen={deleteModalOpen}
        onConfirm={() => onDeleteButtonConfirmClick(id as unknown as number)}
        onCancel={() => setDeleteModalOpen(false)}
        buttonText="삭제하기"
        property="delete"
      />
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <Info title="주유 이력 정보" contents={data}></Info>
      <VerticalSizedBox />
      <ButtonContainer>
        <HorizontalSizedBox />
        <Button
          property="update"
          label="수정"
          onClick={() => {
            onUpdateButtonClick();
          }}
        />
        <HorizontalSizedBox />
        <Button
          property="delete"
          label="삭제"
          onClick={() => {
            onDeleteButtonClick();
          }}
        />
      </ButtonContainer>
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
