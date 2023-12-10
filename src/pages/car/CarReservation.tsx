import styled from 'styled-components';
import CarReservationSearchBoard from '../../components/board/CarReservationSearchBoard';

function CarReservation() {
  return (
    <Wrapper>
      <CarReservationSearchBoard />
    </Wrapper>
  );
}

export default CarReservation;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
