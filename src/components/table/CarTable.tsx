import React, { useEffect, useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import { CarType } from '../../apis/type/car';
import useGetCars from '../../hooks/query/useGetCars';
import CarApi from '../../apis/CarApi';

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

function CarTable({ title, useSelection, params }: TableProps) {
  // 페이지네이션 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState<number>();

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // 쿼리
  const { status: carStatus, data: cars, refetch } = useGetCars(params);
  const data: DataType[] = [];

  useEffect(() => {
    setTotalPages(cars?.result.totalPages);
    refetch();
  }, [params, currentPage, pageSize, refetch]);

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

  if (useSelection) {
    return (
      <>
        {title}
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
      <TableTitle text={title} />
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
