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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      BaseTable.SELECTION_ALL,
      BaseTable.SELECTION_INVERT,
      BaseTable.SELECTION_NONE,
    ],
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
