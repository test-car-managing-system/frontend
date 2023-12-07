import React, { useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import useGetMyCarReservations from '../../hooks/query/useGetCarReservations';
import { CarReservationStatus } from '../../apis/type/car';

interface DataType {
  key: React.Key;
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

function CarReservationTable({ title, useSelection }: TableProps) {
  const { status: carReservationsStatus, data: carReservations } =
    useGetMyCarReservations();

  const data: DataType[] = [];
  if (carReservationsStatus === 'success' && carReservations) {
    const contents = carReservations.result.contents;
    const size = Math.min(contents.length, 5);
    for (let i = 0; i < size; i++) {
      data.push({
        key: i + 1,
        carName: contents[i].name,
        stockNumber: contents[i].stockNumber,
        startedAt: contents[i].startedAt,
        expiredAt: contents[i].expiredAt,
        reservationStatus:
          CarReservationStatus[
            contents[i].status as unknown as keyof typeof CarReservationStatus
          ],
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

export default CarReservationTable;
