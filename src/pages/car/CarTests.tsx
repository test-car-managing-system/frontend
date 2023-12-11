import styled from 'styled-components';
import CarTestSearchBoard from '../../components/board/CarTestSearchBoard';

// 시험 수행 이력
function CarTests() {
  return (
    <Wrapper>
      <CarTestSearchBoard />
    </Wrapper>
  );
}

export default CarTests;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
