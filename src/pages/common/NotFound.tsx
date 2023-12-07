import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LongButton from '../../components/button/LongButton';
import Template from '../../components/layout/Template';
import LayoutMenu from '../../components/layout/LayoutTemplate';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Notice>
        <p>페이지를 찾을 수 없습니다</p>
      </Notice>
      <LongButton
        property="update"
        label="이전 페이지로 가기"
        onClick={() => navigate(-1)}
      ></LongButton>
    </Wrapper>
  );
}

export default NotFound;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 70);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Notice = styled.div`
  margin-bottom: 60px;
  & p {
    ${({ theme }) => theme.typo.text.T_21_EB}
    font-weight: 500;
    color: ${({ theme }) => theme.palette.main.darkGray};
  }
`;
