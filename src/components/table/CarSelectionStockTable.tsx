import React, { useEffect, useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import {
  CarStockStatus,
  CarType,
  TCarStockRequest,
  TCarStockResponse,
} from '../../apis/type/car';
import { useNavigate, useParams } from 'react-router-dom';
import CarApi from '../../apis/CarApi';
import Button from '../button/Button';
import ConfirmModal from '../modal/ConfirmModal';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import CarStockRegisterModal from '../modal/CarStockRegisterModal';
import ErrorModal from '../modal/ErrorModal';
import dayjs from 'dayjs';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  type?: string;
  status?: CarStockStatus;
  stockNumber?: string;
  createdAt?: string;
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
    title: '차종',
    dataIndex: 'type',
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

function CarSelectionStockTable({ title, params }: TableProps) {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [carStocks, setCarStocks] = useState<TCarStockResponse[]>();
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  // 쿼리
  useEffect(() => {
    CarApi.getCarStocks(params).then(
      (res) => res.result.contents && setCarStocks(res.result.contents),
    );
  }, [params]);

  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    const rawData: DataType[] = [];
    carStocks?.forEach((content, index) => {
      rawData.push({
        key: index + 1,
        id: content.id,
        name: content.name,
        type: CarType[content.type as unknown as keyof typeof CarType],
        stockNumber: content.stockNumber,
        createdAt: content.createdAt,
        status:
          CarStockStatus[
            content.status as unknown as keyof typeof CarStockStatus
          ],
      });
    });
    setData(rawData);
    setExpiredDate(dayjs().add(7, 'day').format('YYYY-MM-DD'));
  }, [carStocks]);

  const [selectedId, setSelectedId] = useState<number>();
  const [expiredDate, setExpiredDate] = useState<string>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (newSelectedRowKeys && newSelectedRowKeys.length > 1) {
      newSelectedRowKeys.slice(1);
    }
    newSelectedRowKeys.forEach((key) => {
      const item = data.find((d) => d.key === key);
      setSelectedId(item ? (item.id as number) : 0);
    });

    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys && newSelectedRowKeys.length == 1) {
      setUpdateAvailable(true);
    } else {
      setUpdateAvailable(false);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
    getCheckboxProps: (record: DataType) => ({
      disabled: record.status !== '대여가능',
    }),
  };

  const onUpdateButtonClick = () => {
    setUpdateModalOpen(true);
  };

  const onUpdateButtonConfirmClick = () => {
    CarApi.postCarReservation(selectedId as unknown as number)
      .then((res) => {
        CarApi.getCarStocks(params).then(
          (res) => res.result.contents && setCarStocks(res.result.contents),
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
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <ConfirmModal
        title="예약"
        content={
          <div>
            <Text>최대 대여 가능 기간은 1주일 입니다.</Text>
            <RedText>{`(${expiredDate} 자정까지)`}</RedText>
            <Text>
              시험 차량은 반납 예정일에 시스템에 의해 자동 반납 됩니다.{' '}
            </Text>
            <Text>해당 시험 차량을 대여햐시겠습니까?</Text>
          </div>
        }
        modalOpen={updateModalOpen}
        onConfirm={() => onUpdateButtonConfirmClick()}
        onCancel={() => setUpdateModalOpen(false)}
        buttonText="예약하기"
        property="update"
      />
      <TableTitle text={title} />
      <BaseTable
        key="carSelectionStockTable"
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
          label="예약"
          state={updateAvailable}
          onClick={() => onUpdateButtonClick()}
        />
      </ButtonContainer>
    </>
  );
}

export default CarSelectionStockTable;

const Text = styled.span`
  padding: 10px;
  font-size: 16px;
  display: inline-block;
`;

const RedText = styled.span`
  padding: 10px 10px 10px 0;
  font-size: 16px;
  color: red;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: right;
  align-items: center;
`;
