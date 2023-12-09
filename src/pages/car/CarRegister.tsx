import styled from 'styled-components';
import CarSearchBoard from '../../components/board/CarSearchBoard';
import CarRegisterBoard from '../../components/board/CarRegisterBoard';

function CarRegister() {
  return (
    <Wrapper>
      <CarRegisterBoard />
    </Wrapper>
  );
}

export default CarRegister;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
