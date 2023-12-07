import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import Template from '../../components/layout/Template';
import LayoutMenu from '../../components/layout/LayoutTemplate';
import useGetUserInfo from '../../hooks/query/useGetMyInfo';
import Table from '../../components/table/Table';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/question');
  };

  return (
    <Wrapper>
      {/* <SizedBox /> */}
      <Table></Table>
      <Button
        property="update"
        label="대쉬보드"
        onClick={handleButtonClick}
      ></Button>
      <SizedBox />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 70);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SizedBox = styled.div`
  width: 100%;
  height: 50px;
`;
