import styled from 'styled-components';
import TestSearchBoard from '../../components/board/TestSearchBoard';

// 시험 수행 이력
function CarTests() {
  return (
    <Wrapper>
      <TestSearchBoard />
    </Wrapper>
  );
}

export default CarTests;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
