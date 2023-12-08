import React, { useEffect, useState } from 'react';
import { Table as BaseTable, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import { CarType } from '../../apis/type/car';
import useGetCars from '../../hooks/query/useGetCars';
import CarApi from '../../apis/CarApi';
import styled from 'styled-components';
import { TPageRequest } from '../../apis/type/commonRequest';

interface DataType {
  key: React.Key;
  carName: string;
  type: CarType;
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '차량명',
    dataIndex: 'carName',
    align: 'center',
  },
  {
    title: '차종',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '등록일시',
    dataIndex: 'createdAt',
    align: 'center',
  },
];

function CarTable({ title, useSelection, usePagenation, params }: TableProps) {
  // 페이지네이션 관리
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState<number>();
  const [pageParams, setPageParams] = useState<TPageRequest>();

  // 쿼리
  const {
    status: carStatus,
    data: cars,
    refetch,
  } = useGetCars(params, pageParams);
  const data: DataType[] = [];

  useEffect(() => {
    setPageParams({ page: currentPage, size: pageSize });
  }, [currentPage, pageSize]);

  useEffect(() => {
    refetch();
    setTotalPages(cars?.result.totalPages);
  }, [params, pageParams, refetch]);

  if (carStatus === 'success' && cars) {
    const contents = cars.result.contents;
    const size = Math.min(contents.length, 5);

    for (let i = 0; i < size; i++) {
      data.push({
        key: i + 1,
        carName: contents[i].name,
        createdAt: contents[i].createdAt,
        type: CarType[contents[i].type as unknown as keyof typeof CarType],
      });
    }
  }

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

  const pageSelect = (
    <Select
      style={{ width: '150px' }}
      defaultValue={pageSize}
      onChange={(value, option) => setPageSize(value)}
    >
      <Select.Option value={5}>5개씩 보기</Select.Option>
      <Select.Option value={10}>10개씩 보기</Select.Option>
      <Select.Option value={20}>20개씩 보기</Select.Option>
      <Select.Option value={50}>50개씩 보기</Select.Option>
    </Select>
  );

  if (useSelection) {
    return (
      <>
        <TableTitle text={title} />
        {usePagenation && pageSelect}
        <BaseTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{
            width: '100%',
          }}
        />
      </>
    );
  }
  return (
    <>
      <SelectContainer>
        <TableTitle text={title} />
        {usePagenation && pageSelect}
      </SelectContainer>
      <BaseTable
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{
          width: '100%',
        }}
      />
    </>
  );
}

export default CarTable;

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
