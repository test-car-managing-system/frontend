import styled from 'styled-components';
import CarStocksSearchBoard from '../../components/board/CarStocksSearchBoard';

function Car() {
  return (
    <Wrapper>
      <CarStocksSearchBoard />
    </Wrapper>
  );
}

export default Car;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
