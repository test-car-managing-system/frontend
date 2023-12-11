import styled from 'styled-components';
import TrackReservationSearchBoard from '../../components/board/TrackReservationSearchBoard';

function TrackReservation() {
  return (
    <Wrapper>
      <TrackReservationSearchBoard />
    </Wrapper>
  );
}

export default TrackReservation;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
