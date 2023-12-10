import styled from 'styled-components';
import CarSelectionSearchBoard from '../../components/board/CarSelectionSearchBoard';

function CarSelection() {
  return (
    <Wrapper>
      <CarSelectionSearchBoard />
    </Wrapper>
  );
}

export default CarSelection;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
