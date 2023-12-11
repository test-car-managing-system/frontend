import styled from 'styled-components';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MembersApi from '../../apis/MembersApi';
import {
  IMembersRes,
  Role,
  TUpdateMemberRequest,
} from '../../apis/type/member';
import Info from '../../components/info/Info';
import ConfirmModal from '../../components/modal/ConfirmModal';
import ErrorModal from '../../components/modal/ErrorModal';
import MemberUpdateModal from '../../components/modal/MemberUpdateModal';
import useGetMyInfo from '../../hooks/query/useGetMyInfo';
import { ErrorResponse } from '../../apis/type/commonResponse';
import Button from '../../components/button/Button';

function MyPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [member, setMember] = useState<IMembersRes>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasRole, setHasRole] = useState<boolean>(false);

  useEffect(() => {
    MembersApi.getMyInfo().then((res) => {
      if (res.result) {
        setMember(res.result);
        setHasRole(res.result.role === 'ADMIN');
      }
    });
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
      <Info title="사용자 정보" contents={data}></Info>
      <ButtonContainer>
        <Button
          property="update"
          label="수정"
          onClick={() => onUpdateButtonClick()}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
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
