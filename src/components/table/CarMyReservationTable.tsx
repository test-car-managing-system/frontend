import React, { useEffect, useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import {
  CarReservationStatus,
  CarStockStatus,
  CarType,
  TCarReservationsResponse,
  TCarStockRequest,
  TCarStockResponse,
} from '../../apis/type/car';
import { useNavigate, useParams } from 'react-router-dom';
import CarApi from '../../apis/CarApi';
import Button from '../button/Button';
import ConfirmModal from '../modal/ConfirmModal';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import { ErrorResponse, TPageResponse } from '../../apis/type/commonResponse';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import CarStockRegisterModal from '../modal/CarStockRegisterModal';
import ErrorModal from '../modal/ErrorModal';
import PageSizeSelect from '../select/PageSizeSelect';
import { TPageRequest } from '../../apis/type/commonRequest';
import Pagination from '../select/Pagination';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  stockNumber?: string;
  startedAt?: string;
  expiredAt?: string;
  status?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '차량명',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '재고번호',
    dataIndex: 'stockNumber',
    align: 'center',
  },
  {
    title: '대여일자',
    dataIndex: 'startedAt',
    align: 'center',
  },
  {
    title: '반납(예정) 일자',
    dataIndex: 'expiredAt',
    align: 'center',
  },
  {
    title: '대여상태',
    dataIndex: 'status',
    align: 'center',
  },
];

function CarMyReservationTable({ title, params }: TableProps) {
  // 페이지네이션 관리
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageParams, setPageParams] = useState<TPageRequest>({
    page: 0,
    size: 10,
  });
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [carReservations, setCarReservations] =
    useState<TCarReservationsResponse[]>();
  const [fetchData, setFetchData] =
    useState<TPageResponse<TCarReservationsResponse[]>>();

  // 쿼리
  useEffect(() => {
    CarApi.getCarReservations(params, pageParams).then((res) => {
      res.result.contents && setFetchData(res.result);
    });
  }, [params, pageParams]);

  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    const contents = fetchData?.contents;
    setTotalElements(fetchData?.totalElements || 0);
    setTotalPages(fetchData?.totalPages || 1);
    const start = (fetchData?.page ? fetchData?.page : 0) * pageParams.size;
    setCarReservations(contents);

    const rawData: DataType[] = [];
    contents?.forEach((content, index) => {
      rawData.push({
        key: start + index + 1,
        id: content.id,
        name: content.name,
        stockNumber: content.stockNumber,
        startedAt: content.startedAt,
        expiredAt: content.expiredAt,
        status:
          CarReservationStatus[
            content.status as unknown as keyof typeof CarReservationStatus
          ],
      });
    });
    setData(rawData);
  }, [fetchData]);

  // 선택
  const [ids, setIds] = useState<number[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const idList: number[] = [];
    newSelectedRowKeys.forEach((key) => {
      const item = data.find((d) => d.key === key);
      idList.push(item?.id ? item.id : 0);
    });
    setIds(idList);

    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys && newSelectedRowKeys.length > 0) {
      setUpdateAvailable(true);
    } else {
      setUpdateAvailable(false);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: DataType) => ({
      disabled: record.status !== '예약중' && record.status !== '사용중',
    }),
  };

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

  const onUpdateButtonClick = () => {
    setUpdateModalOpen(true);
  };

  const onUpdateButtonConfirmClick = () => {
    CarApi.updateReturnCarReservation(ids)
      .then((res) => {
        CarApi.getCarReservations(params, pageParams).then(
          (res) => res.result && setFetchData(res.result),
        );
        setUpdateModalOpen(false);
        setUpdateAvailable(false);
        setSelectedRowKeys([]);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  // 컴포넌트
  return (
    <>
      <ConfirmModal
        title="차량 반납"
        content="선택한 차량을 반납하시겠습니까?"
        modalOpen={updateModalOpen}
        onConfirm={() => onUpdateButtonConfirmClick()}
        onCancel={() => setUpdateModalOpen(false)}
        buttonText="예약하기"
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
        key="d"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{
          width: '100%',
        }}
      />
      {pagination}
      <ButtonContainer>
        <Button
          property="update"
          label="반납"
          state={updateAvailable}
          onClick={() => {
            updateAvailable && onUpdateButtonClick();
          }}
        />
      </ButtonContainer>
    </>
  );
}

export default CarMyReservationTable;

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
