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
import MembersApi from '../../apis/MembersApi';
import { Role } from '../../apis/type/member';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  department?: string;
  role?: string;
  createdAt?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '부서',
    dataIndex: 'department',
    align: 'center',
  },
  {
    title: '권한',
    dataIndex: 'role',
    align: 'center',
  },
  {
    title: '가입일시',
    dataIndex: 'createdAt',
    align: 'center',
  },
];

function MemberTable({
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
  const [members, setMembers] = useState<DataType[]>([]);

  // 쿼리
  MembersApi.getMembers(params).then((res) => {
    const contents = res.result.contents;
    const size = maxResult ? maxResult : contents.length;
    const start = res.result.page * pageParams.size;

    const data = [];
    for (let i = 0; i < size; i++) {
      data.push({
        key: start + i + 1,
        id: contents[i].id,
        name: contents[i].name,
        department: contents[i].department?.name,
        role: Role[contents[i].role as unknown as keyof typeof Role],
        createdAt: contents[i].createdAt,
      });
    }

    setTotalElements(res.result.totalElements || 0);
    setTotalPages(res.result.totalPages || 1);
    setMembers(data);
  });

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

  // 차량 클릭 시 이동 로직
  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/members/detail/${record.id}`);
  };
  const onRow = (record: any) => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  // 컴포넌트
  if (useSelection) {
    return (
      <>
        <TableTitle text={title} />
        {usePagenation && pageSelect}
        <BaseTable
          columns={columns}
          dataSource={members}
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
  return (
    <>
      <SelectContainer>
        <TableTitle text={title} />
        {usePagenation && pageSelect}
      </SelectContainer>
      <BaseTable
        columns={columns}
        dataSource={members}
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

export default MemberTable;

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
