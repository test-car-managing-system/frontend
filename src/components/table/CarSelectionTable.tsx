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
import { useNavigate } from 'react-router-dom';
import CarApi from '../../apis/CarApi';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  type: CarType;
  createdAt: string;
  stock: number;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '차량명',
    dataIndex: 'name',
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
  {
    title: '남은 수량',
    dataIndex: 'stock',
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'status',
    align: 'center',
  },
];

function CarSelectionTable({
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
  const [testCars, setTestCars] = useState<DataType[]>([]);

  // 쿼리

  // 페이지네이션 쿼리
  useEffect(() => {
    CarApi.getTestCars(params, pageParams).then((res) => {
      const contents = res.result.contents;
      const size = maxResult ? maxResult : contents.length;
      const start = res.result.page * pageParams.size;

      const data: DataType[] = [];
      for (let i = 0; i < size; i++) {
        data.push({
          key: start + i + 1,
          id: contents[i].id,
          name: contents[i].name,
          type: CarType[contents[i].type as unknown as keyof typeof CarType],
          stock: contents[i].stock,
          status: contents[i].status,
          createdAt: contents[i].createdAt,
        });
      }

      setTotalElements(res.result.totalElements || 0);
      setTotalPages(res.result.totalPages || 1);
      setTestCars(data);
    });
  }, [params, pageParams]);

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

  // 멤버 클릭 시 이동 로직
  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/cars/reservations/new/${record.id}`);
  };
  const onRow = (record: any) => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  return (
    <>
      <SelectContainer>
        <TableTitle text={title} />
        {usePagenation && pageSelect}
      </SelectContainer>
      <BaseTable
        columns={columns}
        dataSource={testCars}
        pagination={false}
        onRow={onRow}
        style={{
          width: '100%',
        }}
      />
      {usePagenation && pagination}
    </>
  );
}

export default CarSelectionTable;

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
