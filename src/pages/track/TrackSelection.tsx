import styled from 'styled-components';
import CarSearchBoard from '../../components/board/CarSearchBoard';
import TrackTable from '../../components/table/TrackTable';

function TrackSelection() {
  return (
    <Wrapper>
      <TrackTable title={'주행시험장 선택'} />
    </Wrapper>
  );
}

export default TrackSelection;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
