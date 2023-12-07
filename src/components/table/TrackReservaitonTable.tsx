import React, { useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { TableProps } from './type/TableProps';
import TableTitle from './TableTitle';

interface DataType {
  key: React.Key;
  trackName: string;
  startedAt: string;
  reservationStatus: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '시험장명',
    dataIndex: 'trackName',
    align: 'center',
  },
  {
    title: '예약일자',
    dataIndex: 'startedAt',
    align: 'center',
  },
  {
    title: '예약상태',
    dataIndex: 'reservationStatus',
    align: 'center',
  },
];

// todo : 컬럼명과 데이터를 props 로

const data: DataType[] = [];
for (let i = 1; i <= 5; i++) {
  data.push({
    key: i,
    trackName: '서산주행시험장',
    startedAt: '2023-01-13',
    reservationStatus: '예약완료',
  });
}

function TrackReservaitonTable({ title, useSelection }: TableProps) {
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

export default TrackReservaitonTable;
