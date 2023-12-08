import React, { useEffect, useState } from 'react';
import { Table as BaseTable, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import { CarType } from '../../apis/type/car';
import useGetCars from '../../hooks/query/useGetCars';
import styled from 'styled-components';
import { TPageRequest } from '../../apis/type/commonRequest';
import PageSizeSelect from '../select/PageSizeSelect';
import Pagination from '../select/Pagination';

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

function CarTable({
  title,
  useSelection,
  usePagenation,
  maxResult,
  params,
}: TableProps) {
  // 페이지네이션 관리
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageParams, setPageParams] = useState<TPageRequest>({
    page: 0,
    size: 10,
  });

  // 쿼리
  const {
    status: carStatus,
    data: cars,
    refetch,
  } = useGetCars(params, pageParams);
  const data: DataType[] = [];

  useEffect(() => {
    refetch();
    setTotalElements(
      cars?.result.totalElements ? cars?.result.totalElements : 0,
    );
    setTotalPages(cars?.result.totalPages ? cars?.result.totalPages : 0);
  }, [params, pageParams, refetch]);

  useEffect(() => {
    if (carStatus === 'success' && cars) {
      setTotalElements(cars.result.totalElements || 0);
      setTotalPages(cars.result.totalPages || 1);
    }
  }, [cars, carStatus]);

  if (carStatus === 'success' && cars) {
    const contents = cars.result.contents;
    const size = maxResult ? maxResult : contents.length;
    const start = cars.result.page * pageParams.size;

    for (let i = 0; i < size; i++) {
      data.push({
        key: start + i + 1,
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

  // 컴포넌트
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
        {usePagenation && pagination}
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
      {usePagenation && pagination}
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

const PaginationContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
