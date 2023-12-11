import React, { useEffect, useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import styled from 'styled-components';
import { TPageRequest } from '../../apis/type/commonRequest';
import PageSizeSelect from '../select/PageSizeSelect';
import Pagination from '../select/Pagination';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, TPageResponse } from '../../apis/type/commonResponse';
import Button from '../button/Button';
import ErrorModal from '../modal/ErrorModal';
import { AxiosError } from 'axios';
import { TExpenseRequest, TExpenseResponse } from '../../apis/type/expense';
import ExpenseApi from '../../apis/ExpenseApi';
import ExpenseRegisterModal from '../modal/ExpenseRegisterModal';

interface DataType {
  key: React.Key;
  id?: number;
  usedAt?: string;
  memberName?: string;
  departmentName?: string;
  carName?: string;
  stockNumber?: string;
  description?: string;
  amount?: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '지출일자',
    dataIndex: 'usedAt',
    align: 'center',
  },
  {
    title: '사용자명',
    dataIndex: 'memberName',
    align: 'center',
  },
  {
    title: '부서',
    dataIndex: 'departmentName',
    align: 'center',
  },
  {
    title: '차량명',
    dataIndex: 'carName',
    align: 'center',
  },
  {
    title: '재고번호',
    dataIndex: 'stockNumber',
    align: 'center',
  },
  {
    title: '지출내용',
    dataIndex: 'description',
    align: 'center',
  },
  {
    title: '금액',
    dataIndex: 'amount',
    align: 'center',
  },
];

function ExpenseTable({ title, params }: TableProps) {
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  // 페이지네이션 관리
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageParams, setPageParams] = useState<TPageRequest>({
    page: 0,
    size: 10,
  });
  const [expenses, setExpenses] = useState<DataType[]>([]);
  const [fetchData, setFetchData] =
    useState<TPageResponse<TExpenseResponse[]>>();

  useEffect(() => {
    // 페이지네이션 쿼리
    ExpenseApi.getExpenses(params, pageParams).then((res) => {
      res && setFetchData(res.result);
      setTotalElements(res.result.totalElements || 0);
      setTotalPages(res.result.totalPages || 1);
    });
  }, [params, pageParams]);

  // 페이지네이션 쿼리
  useEffect(() => {
    const contents = fetchData?.contents || [];
    const size = contents?.length || 0;
    const start = (fetchData?.page || 0) * pageParams.size;

    const data: DataType[] = [];
    for (let i = 0; i < size; i++) {
      data.push({
        key: start + i + 1,
        id: contents[i]?.id,
        usedAt: contents[i].usedAt,
        memberName: contents[i]?.memberName,
        departmentName: contents[i].departmentName,
        carName: contents[i]?.carName || '-',
        stockNumber: contents[i].stockNumber || '-',
        description: contents[i]?.description,
        amount: contents[i]?.amount,
      });
    }
    setExpenses(data);
  }, [fetchData]);

  const pageSelect = <PageSizeSelect onchange={setPageParams}></PageSizeSelect>;
  const pagination = (
    <PaginationContainer>
      <Pagination
        pageSize={pageParams.size}
        totalElements={totalElements}
        onchange={setPageParams}
      ></Pagination>
    </PaginationContainer>
  );

  // 차량 클릭 시 이동 로직
  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/expenses/detail/${record.id}`);
  };
  const onRow = (record: any) => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  // 모달 오픈
  const onRegisterButtonClick = () => {
    setRegisterModalOpen(true);
  };

  const onRegisterButtonConfirmClick = (request: TExpenseRequest) => {
    ExpenseApi.postExpense(request)
      .then((res) => {
        ExpenseApi.getExpenses(params, pageParams).then(
          (res) => res.result && setFetchData(res.result),
        );
        setRegisterModalOpen(false);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        if (data.errors) {
          setErrorMessage(data.errors[0].reason);
        } else {
          setErrorMessage(data.message);
        }
        setErrorModalOpen(true);
      });
  };

  return (
    <>
      <ExpenseRegisterModal
        title="지출 이력 등록"
        modalOpen={registerModalOpen}
        onConfirm={(request: TExpenseRequest) =>
          onRegisterButtonConfirmClick(request)
        }
        onCancel={() => setRegisterModalOpen(false)}
        buttonText="등록하기"
        property="update"
      />
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <SelectContainer>
        <TableTitle text={title} />
        {pageSelect}
      </SelectContainer>
      <BaseTable
        columns={columns}
        dataSource={expenses}
        pagination={false}
        onRow={onRow}
        style={{
          width: '100%',
        }}
      />
      {pagination}
      <ButtonContainer>
        <Button
          property="update"
          label="등록"
          onClick={() => {
            onRegisterButtonClick();
          }}
        />
      </ButtonContainer>
    </>
  );
}

export default ExpenseTable;

const SelectContainer = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const PaginationContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: right;
  align-items: center;
`;
