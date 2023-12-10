import React, { useEffect, useState } from 'react';
import { Table as BaseTable, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableTitle from './TableTitle';
import { TableProps } from './type/TableProps';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import TrackApi from '../../apis/TrackApi';
import TrackReigsterModal from '../modal/TrackRegisterModal';
import { TTrackRequest, TTrackResponse } from '../../apis/type/track';
import Button from '../button/Button';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import { TableRowSelection } from 'antd/es/table/interface';
import ConfirmModal from '../modal/ConfirmModal';
import ErrorModal from '../modal/ErrorModal';
import { ErrorResponse } from '../../apis/type/commonResponse';
import { AxiosError } from 'axios';

interface DataType {
  key: React.Key;
  id?: number;
  name?: string;
  location?: string;
  length?: number;
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
  const [fetchData, setFetchData] = useState<TTrackResponse[]>([]);
  const [tracks, setTracks] = useState<DataType[]>([]);
  const [item, setItem] = useState<{
    id?: number;
    name?: string;
    location?: string;
    length?: number;
    description?: string;
  }>();

  // 쿼리
  useEffect(() => {
    TrackApi.getTracks(params).then((res) => {
      setFetchData(res.result);
    });
  }, [params]);

  useEffect(() => {
    const data = [];
    if (fetchData) {
      for (let i = 0; i < fetchData.length; i++) {
        data.push({
          key: i + 1,
          id: fetchData[i]?.id,
          name: fetchData[i]?.name,
          location: fetchData[i]?.location,
          length: fetchData[i]?.length,
          description: fetchData[i]?.description,
        });
      }

      setTracks(data);
    }
  }, [fetchData]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const ids: number[] = [];
    newSelectedRowKeys.forEach((key) => {
      const item = tracks.find((d) => d.key === key);
      setItem({
        id: item?.id,
        name: item?.name,
        location: item?.location,
        length: item?.length,
        description: item?.description,
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

  const onRegisterButtonConfirmClick = (request: TTrackRequest) => {
    TrackApi.postTrack(request)
      .then((res) => {
        TrackApi.getTracks(params).then(
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

  const onUpdateButtonConfirmClick = (request: TTrackRequest) => {
    TrackApi.updateTrack(request)
      .then((res) => {
        TrackApi.getTracks(params).then(
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
    TrackApi.deleteTracks(ids)
      .then((res) => {
        TrackApi.getTracks(params).then(
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
      <TrackReigsterModal
        title="시험장 등록"
        modalOpen={registerModalOpen}
        onConfirm={(request: TTrackRequest) =>
          onRegisterButtonConfirmClick(request)
        }
        onCancel={() => setRegisterModalOpen(false)}
        buttonText="등록하기"
        property="update"
      />
      <TrackReigsterModal
        title="시험장 정보 수정"
        modalOpen={updateModalOpen}
        onConfirm={(request: TTrackRequest) =>
          onUpdateButtonConfirmClick(request)
        }
        onCancel={() => setUpdateModalOpen(false)}
        defaultValues={item}
        buttonText="수정하기"
        property="update"
      />
      <ConfirmModal
        title="시험장 삭제"
        content="해당 시험장을 삭제하시겠습니까"
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tracks}
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

export default TrackTable;

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
