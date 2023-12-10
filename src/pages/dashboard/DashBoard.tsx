import styled from 'styled-components';
import CarReservationTable from '../../components/table/CarReservationTable';
import TrackReservaitonTable from '../../components/table/TrackReservaitonTable';
import TrackMyReservaitonTable from '../../components/table/TrackMyReservaitonTable';

function DashBoard() {
  return (
    <Wrapper>
      {/* <SizedBox /> */}
      <CarReservationTable title="시험 차량 대여 현황" />
      <SizedBox />
      <TrackMyReservaitonTable title="시험장 대여 현황" />
    </Wrapper>
  );
}

export default DashBoard;

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: center;
`;

const SizedBox = styled.div`
  width: 100%;
  height: 50px;
`;
