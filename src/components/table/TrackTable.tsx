import React, { useEffect, useState } from 'react';
import { Table as BaseTable, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TrackApi from '../../apis/TrackApi';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  location?: string;
  description?: string;
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
    title: '위치',
    dataIndex: 'location',
    align: 'center',
  },
  {
    title: '특성',
    dataIndex: 'description',
    align: 'center',
  },
];

function TrackTable({ title, params }: TableProps) {
  const [tracks, setTracks] = useState<DataType[]>([]);

  // 쿼리
  useEffect(() => {
    TrackApi.getTracks(params).then((res) => {
      const contents = res.result;
      const data = [];
      if (contents) {
        for (let i = 0; i < contents.length; i++) {
          data.push({
            key: i + 1,
            id: contents[i]?.id,
            name: contents[i]?.name,
            location: contents[i]?.location,
            description: contents[i]?.description,
          });
        }

        setTracks(data);
      }
    });
  }, [params]);

  // 멤버 클릭 시 이동 로직
  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/tracks/reservations/new/detail/${record.id}`);
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
        columns={columns}
        dataSource={tracks}
        pagination={false}
        onRow={onRow}
        style={{
          width: '100%',
        }}
      />
    </>
  );
}

export default TrackTable;

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
