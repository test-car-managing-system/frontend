import React, { useEffect, useState } from 'react';
import { Table as BaseTable, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import styled from 'styled-components';
import GasStationApi from '../../apis/GasStationApi';
import { TableRowSelection } from 'antd/es/table/interface';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import GasStationRegisterModal from '../modal/GasStationRegisterModal';
import {
  TGasStationRequest,
  TGasStationResponse,
} from '../../apis/type/gasStation';
import ConfirmModal from '../modal/ConfirmModal';
import Button from '../button/Button';
import { ErrorResponse } from '../../apis/type/commonResponse';
import { AxiosError } from 'axios';
import ErrorModal from '../modal/ErrorModal';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  createdAt?: string;
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
    title: '등록일자',
    dataIndex: 'createdAt',
    align: 'center',
  },
];

function GasStationTable({ title }: TableProps) {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [deleteAvailable, setDeleteAvailable] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const { status, data: user } = useGetMyInfo();
  const hasRole = user?.result.role == 'ADMIN';

  const [ids, setIds] = useState<number[]>([]);
  const [fetchData, setFetchData] = useState<TGasStationResponse[]>([]);
  const [gasStations, setGasStations] = useState<DataType[]>([]);
  const [item, setItem] = useState<{
    id?: number;
    name?: string;
    createdAt?: string;
  }>();

  // 쿼리
  useEffect(() => {
    GasStationApi.getGasStations().then((res) => {
      setFetchData(res.result);
    });
  }, []);

  // 쿼리
  useEffect(() => {
    const contents = fetchData;
    const data = [];
    if (contents) {
      for (let i = 0; i < contents.length; i++) {
        data.push({
          key: i + 1,
          id: contents[i]?.id,
          name: contents[i]?.name,
          createdAt: contents[i]?.createdAt,
        });
      }

      setGasStations(data);
    }
  }, [fetchData]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const ids: number[] = [];
    newSelectedRowKeys.forEach((key) => {
      const item = gasStations.find((d) => d.key === key);
      setItem({
        id: item?.id,
        name: item?.name,
        createdAt: item?.createdAt,
      });
      ids.push(item ? (item.id as unknown as number) : 0);
    });
    setIds(ids);

    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys && newSelectedRowKeys.length == 1) {
      setUpdateAvailable(true);
    } else {
      setUpdateAvailable(false);
    }

    if (newSelectedRowKeys && newSelectedRowKeys.length > 0) {
      setDeleteAvailable(true);
    } else {
      setDeleteAvailable(false);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 모달 오픈
  const onRegisterButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setRegisterModalOpen(true);
    }
  };

  const onUpdateButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setUpdateModalOpen(true);
    }
  };

  const onDeleteButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setDeleteModalOpen(true);
    }
  };

  const onRegisterButtonConfirmClick = (request: TGasStationRequest) => {
    GasStationApi.postGasStation(request)
      .then((res) => {
        GasStationApi.getGasStations().then(
          (res) => res.result && setFetchData(res.result),
        );
        setRegisterModalOpen(false);
        setSelectedRowKeys([]);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onUpdateButtonConfirmClick = (request: TGasStationRequest) => {
    GasStationApi.updateGasStation(request)
      .then((res) => {
        GasStationApi.getGasStations().then(
          (res) => res.result && setFetchData(res.result),
        );
        setUpdateModalOpen(false);
        setSelectedRowKeys([]);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onDeleteButtonConfirmClick = (ids: number[]) => {
    GasStationApi.deleteGasStations(ids)
      .then((res) => {
        GasStationApi.getGasStations().then(
          (res) => res.result && setFetchData(res.result),
        );
        setDeleteModalOpen(false);
        setSelectedRowKeys([]);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  // 컴포넌트
  return (
    <>
      <GasStationRegisterModal
        title="주유소 등록"
        modalOpen={registerModalOpen}
        onConfirm={(request: TGasStationRequest) =>
          onRegisterButtonConfirmClick(request)
        }
        onCancel={() => setRegisterModalOpen(false)}
        buttonText="등록하기"
        property="update"
      />
      <GasStationRegisterModal
        title="주유소 정보 수정"
        modalOpen={updateModalOpen}
        onConfirm={(request: TGasStationRequest) =>
          onUpdateButtonConfirmClick(request)
        }
        onCancel={() => setUpdateModalOpen(false)}
        defaultValues={item}
        buttonText="수정하기"
        property="update"
      />
      <ConfirmModal
        title="주유소 삭제"
        content="해당 주유소를 삭제하시겠습니까"
        modalOpen={deleteModalOpen}
        onConfirm={() => onDeleteButtonConfirmClick(ids)}
        onCancel={() => setDeleteModalOpen(false)}
        buttonText="삭제하기"
        property="delete"
      />
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <TableTitle text={title} />
      <BaseTable
        columns={columns}
        rowSelection={rowSelection}
        dataSource={gasStations}
        pagination={false}
        style={{
          width: '100%',
        }}
      />
      <ButtonContainer>
        <Button
          property="update"
          label="등록"
          onClick={() => {
            onRegisterButtonClick();
          }}
        />
        <HorizontalSizedBox />
        <Button
          property="update"
          label="수정"
          state={updateAvailable}
          onClick={() => {
            updateAvailable && onUpdateButtonClick();
          }}
        />
        <HorizontalSizedBox />
        <Button
          property="delete"
          label="삭제"
          state={deleteAvailable}
          onClick={() => {
            deleteAvailable && onDeleteButtonClick();
          }}
        />
      </ButtonContainer>
    </>
  );
}

export default GasStationTable;

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

const HorizontalSizedBox = styled.div`
  width: 5px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: right;
  align-items: center;
`;
