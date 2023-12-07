import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import Template from '../../components/layout/Template';
import LayoutMenu from '../../components/layout/LayoutTemplate';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/question');
  };

  return (
    <Template variant="홈">
      <LayoutMenu>
        <Wrapper>
          {/* <SizedBox /> */}
          <Button
            property="update"
            label="대쉬보드"
            onClick={handleButtonClick}
          ></Button>
          <SizedBox />
        </Wrapper>
      </LayoutMenu>
    </Template>
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

const OhzuLogo = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 180px;
    height: auto;
  }
`;

const SizedBox = styled.div`
  width: 100%;
  height: 50px;
`;
