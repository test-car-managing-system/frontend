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
import { TExpenseRequest, TExpenseResponse } from '../../apis/type/expense';
import ExpenseApi from '../../apis/ExpenseApi';
import ExpenseRegisterModal from '../../components/modal/ExpenseRegisterModal';

function ExpenseDetail() {
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [expense, setExpense] = useState<TExpenseResponse>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id &&
      ExpenseApi.getExpense(id as unknown as number).then(
        (res) => res.result && setExpense(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '사용자명', data: expense?.memberName },
      { title: '부서', data: expense?.departmentName },
      { title: '차량명', data: expense?.carName || '-' },
      { title: '재고번호', data: expense?.stockNumber || '-' },
      { title: '지출일시', data: expense?.usedAt },
      { title: '금액', data: `${expense?.amount?.toString()} 원` },
      { title: '지출내용', data: expense?.description },
      { title: '등록일시', data: expense?.createdAt },
      { title: '수정인', data: expense?.updateMemberName },
      { title: '수정일시', data: expense?.updatedAt },
    ]);
  }, [expense]);

  const onUpdateButtonClick = () => {
    setUpdateModalOpen(true);
  };

  const onDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };

  const onUpdateButtonConfirmClick = (request: TExpenseRequest) => {
    ExpenseApi.updateExpense(request)
      .then((res) => {
        setExpense(res.result);
        setUpdateModalOpen(false);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onDeleteButtonConfirmClick = (id: number) => {
    ExpenseApi.deleteExpense(id)
      .then((res) => {
        setDeleteModalOpen(false);
        navigate('/expenses');
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  return (
    <Wrapper>
      <ExpenseRegisterModal
        title="지출 이력 수정"
        modalOpen={updateModalOpen}
        onConfirm={(request: TExpenseRequest) =>
          onUpdateButtonConfirmClick(request)
        }
        onCancel={() => setUpdateModalOpen(false)}
        defaultValues={{
          id: expense?.id,
          description: expense?.description,
          stockNumber: expense?.stockNumber,
          amount: expense?.amount,
          usedAt: expense?.usedAt,
        }}
        buttonText="수정하기"
        property="update"
      />
      <ConfirmModal
        title="지출 이력 삭제"
        content="해당 지출 이력을 삭제하시겠습니까"
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
      <Info title="지출 상세 정보" contents={data}></Info>
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

export default ExpenseDetail;

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
