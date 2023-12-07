import React, { useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';

interface DataType {
  key: React.Key;
  name: string;
  carName: string;
  stockNumber: string;
  startedAt: string;
  expiredAt: string;
  reservationStatus: string;
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
    title: '반납일자',
    dataIndex: 'expiredAt',
    align: 'center',
  },
  {
    title: '대여상태',
    dataIndex: 'reservationStatus',
    align: 'center',
  },
];

// todo : 컬럼명과 데이터를 props 로

const data: DataType[] = [];
for (let i = 1; i <= 5; i++) {
  data.push({
    key: i,
    name: '노경민',
    carName: '아반떼',
    stockNumber: '2023010300001',
    startedAt: '2023-01-13',
    expiredAt: '2023-01-20',
    reservationStatus: '대여중',
  });
}

function CarReservationTable({ title, useSelection }: TableProps) {
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

export default CarReservationTable;
