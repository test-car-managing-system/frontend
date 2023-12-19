import React, { useEffect, useState } from 'react';
import { Table as BaseTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { TableProps } from './type/TableProps';
import TableTitle from './TableTitle';
import {
  TTrackReservationsResponse,
  TrackReservationStatus,
} from '../../apis/type/track';
import TrackApi from '../../apis/TrackApi';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  createdAt: string;
  status: TrackReservationStatus;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '시험장명',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '예약일자',
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    title: '예약상태',
    dataIndex: 'status',
    align: 'center',
  },
];

function TrackMyReservaitonTable({ title, params, maxResult }: TableProps) {
  const [fetchData, setFetchData] = useState<TTrackReservationsResponse[]>([]);
  const [trackReservations, setTrackReservations] = useState<DataType[]>([]);

  // 쿼리
  useEffect(() => {
    TrackApi.getTrackReservations(params).then((res) => {
      setFetchData(res.result);
    });
  }, [params]);

  useEffect(() => {
    const rawData: DataType[] = [];
    const size: number = maxResult
      ? Math.min(maxResult, fetchData.length)
      : fetchData.length;
    if (fetchData) {
      for (let i = 0; i < size; i++) {
        rawData.push({
          key: i + 1,
          id: fetchData[i]?.id,
          name: fetchData[i]?.name,
          createdAt: fetchData[i]?.createdAt,
          status:
            TrackReservationStatus[
              fetchData[i]
                .status as unknown as keyof typeof TrackReservationStatus
            ],
        });
      }
    }
    setTrackReservations(rawData);
  }, [fetchData]);

  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/tracks/reservations/${record.id}`);
  };
  const onRow = (record: any) => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  return (
    <>
      <TableTitle text={title} />
      <BaseTable
        columns={columns}
        dataSource={trackReservations}
        pagination={false}
        onRow={onRow}
        style={{
          width: '100%',
        }}
      />
    </>
  );
}

export default TrackMyReservaitonTable;
