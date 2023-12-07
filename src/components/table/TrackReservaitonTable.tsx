import React, { useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { TableProps } from './type/TableProps';
import TableTitle from './TableTitle';
import useGetMyTrackReservations from '../../hooks/query/useGetTrackReservations';
import { TrackReservationStatus } from '../../apis/type/track';

interface DataType {
  key: React.Key;
  trackName: string;
  createdAt: string;
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

function TrackReservaitonTable({ title, useSelection }: TableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { status: trackReservationsStatus, data: trackReservations } =
    useGetMyTrackReservations();

  const data: DataType[] = [];
  if (trackReservationsStatus === 'success' && trackReservations) {
    const contents = trackReservations.result.contents;
    const size = Math.min(contents.length, 5);
    for (let i = 0; i < size; i++) {
      data.push({
        key: i + 1,
        trackName: contents[i].name,
        createdAt: contents[i].createdAt,
        reservationStatus:
          TrackReservationStatus[
            contents[i].status as unknown as keyof typeof TrackReservationStatus
          ],
      });
    }
  }

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
