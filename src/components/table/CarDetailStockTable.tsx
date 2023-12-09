import React, { useEffect, useState } from 'react';
import { Table as BaseTable, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import {
  CarStockStatus,
  CarType,
  TCarStockResponse,
} from '../../apis/type/car';
import useGetCars from '../../hooks/query/useGetCars';
import styled from 'styled-components';
import { TPageRequest } from '../../apis/type/commonRequest';
import PageSizeSelect from '../select/PageSizeSelect';
import Pagination from '../select/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import CarApi from '../../apis/CarApi';
import Button from '../button/Button';
import ConfirmModal from '../modal/ConfirmModal';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import { ErrorResponse } from '../../apis/type/commonResponse';
import { AxiosError } from 'axios';
import ErrorModal from '../modal/ErrorModal';

interface DataType {
  key: React.Key;
  id: number;
  stockNumber: string;
  status: CarStockStatus;
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '재고번호',
    dataIndex: 'stockNumber',
    align: 'center',
  },
  {
    title: '등록일시',
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    title: '재고상태',
    dataIndex: 'status',
    align: 'center',
  },
];

function CarStockTable({ title }: TableProps) {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [deleteAvailable, setDeleteAvailable] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [carStockDeleteModalOpen, setCarStockDeleteModalOpen] =
    useState<boolean>(false);
  const [carStockRegisterModalOpen, setCarStockRegisterModalOpen] =
    useState<boolean>(false);
  const [carStockUpdateModalOpen, setCarStockUpdateModalOpen] =
    useState<boolean>(false);
  const [carStocks, setCarStocks] = useState<TCarStockResponse[]>();
  const { id } = useParams();
  const { status, data: user } = useGetMyInfo();
  const hasRole = user?.result.role == 'ADMIN';
  console.log(hasRole);

  useEffect(() => {
    id &&
      CarApi.getCarStocks({ carId: id as unknown as number }).then(
        (res) => res.result.contents && setCarStocks(res.result.contents),
      );
  }, []);

  const [data, setData] = useState<DataType[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => {
    const rawData: DataType[] = [];
    carStocks?.forEach((content, index) => {
      rawData.push({
        key: index + 1,
        id: content.id,
        stockNumber: content.stockNumber,
        createdAt: content.createdAt,
        status:
          CarStockStatus[
            content.status as unknown as keyof typeof CarStockStatus
          ],
      });
    });
    setData(rawData);
  }, [carStocks]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const ids = newSelectedRowKeys.map((key) => {
      const item = data.find((d) => d.key === key);
      return item ? item.id : 0;
    });
    setIds(ids);

    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys && newSelectedRowKeys.length == 1) {
      setUpdateAvailable(true);
    } else {
      setUpdateAvailable(false);
    }

    if (newSelectedRowKeys && newSelectedRowKeys.length > 0) {
      setDeleteAvailable(true);
    } else {
      setDeleteAvailable(false);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 모달 오픈
  const onCarStockRegisterButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setCarStockRegisterModalOpen(true);
    }
  };

  const onCarStockUpdateButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setCarStockUpdateModalOpen(true);
    }
  };

  const onCarStockDeleteButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setCarStockDeleteModalOpen(true);
    }
  };

  const onCarStockDeleteButtonConfirmClick = (ids: number[]) => {
    CarApi.deleteCarStocks(ids)
      .then((res) => {
        id &&
          CarApi.getCarStocks({ carId: id as unknown as number }).then(
            (res) => res.result.contents && setCarStocks(res.result.contents),
          );
        setCarStockDeleteModalOpen(false);
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
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <ConfirmModal
        title="재고 삭제"
        content="해당 재고를 삭제하시겠습니까"
        modalOpen={carStockDeleteModalOpen}
        onConfirm={() => onCarStockDeleteButtonConfirmClick(ids)}
        onCancel={() => setCarStockDeleteModalOpen(false)}
        buttonText="삭제하기"
        property="delete"
      />
      <TableTitle text={title} />
      <BaseTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{
          width: '100%',
        }}
      />
      <ButtonContainer>
        <Button
          property="update"
          label="등록"
          onClick={() => {
            onCarStockRegisterButtonClick();
          }}
        />
        <HorizontalSizedBox />
        <Button
          property="update"
          label="수정"
          state={updateAvailable}
          onClick={() => {
            updateAvailable && onCarStockUpdateButtonClick();
          }}
        />
        <HorizontalSizedBox />
        <Button
          property="delete"
          label="삭제"
          state={deleteAvailable}
          onClick={() => {
            deleteAvailable && onCarStockDeleteButtonClick();
          }}
        />
      </ButtonContainer>
    </>
  );
}

export default CarStockTable;

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
