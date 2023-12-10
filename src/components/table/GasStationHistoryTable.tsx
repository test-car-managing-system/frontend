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
import GasStationHistoryApi from '../../apis/GasStationHistoryApi';
import { TPageResponse } from '../../apis/type/commonResponse';
import { TGasStationHistoryResponse } from '../../apis/type/gasStationHistory';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  carName?: string;
  memberName?: string;
  stockNumber?: string;
  departmentName?: string;
  usedAt?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: '주유소명',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '사용자명',
    dataIndex: 'memberName',
    align: 'center',
  },
  {
    title: '부서',
    dataIndex: 'departmentName',
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
    title: '주유일자',
    dataIndex: 'usedAt',
    align: 'center',
  },
];

function GasStationHistoryTable({
  title,
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
  const [gasStationHistories, setGasStationHistories] = useState<DataType[]>(
    [],
  );
  const [fetchData, setFetchData] =
    useState<TPageResponse<TGasStationHistoryResponse[]>>();

  useEffect(() => {
    // 페이지네이션 쿼리
    GasStationHistoryApi.getGasStationHistories(params, pageParams).then(
      (res) => {
        res && setFetchData(res.result);
        setTotalElements(res.result.totalElements || 0);
        setTotalPages(res.result.totalPages || 1);
      },
    );
  }, [params, pageParams]);

  // 페이지네이션 쿼리
  useEffect(() => {
    const contents = fetchData?.contents || [];
    const size = maxResult || contents?.length || 0;
    const start = (fetchData?.page || 0) * pageParams.size;

    const data: DataType[] = [];
    for (let i = 0; i < size; i++) {
      data.push({
        key: start + i + 1,
        id: contents[i]?.id,
        name: contents[i]?.name,
        memberName: contents[i]?.memberName,
        departmentName: contents[i].departmentName,
        carName: contents[i]?.name,
        stockNumber: contents[i]?.stockNumber,
        usedAt: contents[i].usedAt,
      });
    }
    setGasStationHistories(data);
  }, [fetchData]);

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
    navigate(`/gas/detail/${record.id}`);
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
        dataSource={gasStationHistories}
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

export default GasStationHistoryTable;

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
