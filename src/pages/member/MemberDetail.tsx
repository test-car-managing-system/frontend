import styled from 'styled-components';
import Info from '../../components/info/Info';
import { useEffect, useState } from 'react';
import CarApi from '../../apis/CarApi';
import { useNavigate, useParams } from 'react-router-dom';
import { CarType, TCarRequest, TCarResponse } from '../../apis/type/car';
import Button from '../../components/button/Button';
import CarStockTable from '../../components/table/CarDetailStockTable';
import ConfirmModal from '../../components/modal/ConfirmModal';
import CarUpdateModal from '../../components/modal/CarUpdateModal';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import ErrorModal from '../../components/modal/ErrorModal';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import MembersApi from '../../apis/MembersApi';
import {
  IMembersRes,
  Role,
  TUpdateMemberRequest,
} from '../../apis/type/member';
import MemberUpdateModal from '../../components/modal/MemberUpdateModal';

function MemberDetail() {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [member, setMember] = useState<IMembersRes>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, data: user } = useGetMyInfo();
  const hasRole = user?.result.role == 'ADMIN';

  useEffect(() => {
    id &&
      MembersApi.getMemberDetail(id as unknown as number).then(
        (res) => res.result && setMember(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '이름', data: member?.name },
      {
        title: '권한',
        data: Role[member?.role as unknown as keyof typeof Role],
      },
      { title: '이메일', data: member?.email },
      { title: '가입일자', data: member?.createdAt },
      { title: '부서', data: member?.department?.name },
    ]);
  }, [member]);

  const onUpdateButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setUpdateModalOpen(true);
    }
  };

  const onUpdateButtonConfirmClick = (request: TUpdateMemberRequest) => {
    MembersApi.updateMemberDetail(request)
      .then((res) => {
        res.result && setMember(res.result);
        setUpdateModalOpen(false);
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  const onDeleteButtonClick = () => {
    if (!hasRole) {
      setErrorMessage('해당 기능에 대한 접근 권한이 없습니다.');
      setErrorModalOpen(true);
    } else {
      setDeleteModalOpen(true);
    }
  };

  const onDeleteButtonConfirmClick = (id: number) => {
    MembersApi.deleteMember(id)
      .then((res) => {
        setDeleteModalOpen(false);
        navigate('/members');
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  return (
    <Wrapper>
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <MemberUpdateModal
        title="사용자 정보 수정"
        modalOpen={updateModalOpen}
        onConfirm={(data: TUpdateMemberRequest) =>
          onUpdateButtonConfirmClick(data)
        }
        onCancel={() => setUpdateModalOpen(false)}
        buttonText="수정하기"
        property="update"
        defaultValues={member}
      />
      <ConfirmModal
        title="사용자 삭제"
        content="해당 사용자를 삭제하시겠습니까?"
        modalOpen={deleteModalOpen}
        onConfirm={() => onDeleteButtonConfirmClick(id as unknown as number)}
        onCancel={() => setDeleteModalOpen(false)}
        buttonText="삭제하기"
        property="delete"
      />
      <Info title="사용자 정보" contents={data}></Info>
      <ButtonContainer>
        <Button
          property="update"
          label="수정"
          onClick={() => onUpdateButtonClick()}
        />
        <HorizontalSizedBox />
        <Button
          property="delete"
          label="삭제"
          onClick={() => onDeleteButtonClick()}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default MemberDetail;

const Wrapper = styled.div``;

const Container = styled.div`
  overflow-y: scroll;
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
