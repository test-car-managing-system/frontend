import styled from 'styled-components';
import TrackSelectionTable from '../../components/table/TrackSelectionTable';

function TrackSelection() {
  return (
    <Wrapper>
      <TrackSelectionTable title={'주행시험장 선택'} />
    </Wrapper>
  );
}

export default TrackSelection;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
