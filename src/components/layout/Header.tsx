import styled from 'styled-components';
import { Layout } from 'antd';
const { Header } = Layout;
import Button from '../button/Button';
import useGetMyInfo from '../../hooks/useGetMyInfo';

interface LayoutHeaderProps {
  children?: React.ReactNode;
}

function LayoutHeader({ children }: LayoutHeaderProps) {
  const { status: userInfoStatus, data: userInfo } = useGetMyInfo();
  const username =
    userInfoStatus === 'success' ? !!userInfo && userInfo.result.name : 'test';
  return (
    <Header style={{ padding: 0, background: '#fff' }}>
      <Wrapper>
        <AuthUser>{username} 님</AuthUser>
        <Button label="로그아웃" property="logout" />
      </Wrapper>
    </Header>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  overflow-y: none;
  padding: 10px;
`;

const AuthUser = styled.div`
  width: 76px;
  height: 46px;
  margin-right: 20px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export default LayoutHeader;
