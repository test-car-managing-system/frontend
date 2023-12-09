import React, { useEffect, useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import { CarStockStatus, TCarStockResponse } from '../../apis/type/car';
import { useNavigate, useParams } from 'react-router-dom';
import CarApi from '../../apis/CarApi';
import Button from '../button/Button';
import ConfirmModal from '../modal/ConfirmModal';
import styled from 'styled-components';

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [carStocks, setCarStocks] = useState<TCarStockResponse[]>();
  const { id } = useParams();

  useEffect(() => {
    id &&
      CarApi.getCarStocks({ carId: id as unknown as number }).then(
        (res) => res.result.contents && setCarStocks(res.result.contents),
      );
  }, []);

  const [data, setData] = useState<DataType[]>([]);
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

  // const onCarStockDeleteButtonClick = () => {
  // }
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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

  // 차량 클릭 시 이동 로직
  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/cars/detail/${record.id}`);
  };
  const onRow = (record: any) => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  // 컴포넌트
  return (
    <>
      <TableTitle text={title} />
      <BaseTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={onRow}
        style={{
          width: '100%',
        }}
      />
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
