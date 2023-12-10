import styled from 'styled-components';
import GasStationHistorySearchBoard from '../../components/board/GasStationHistorySearchBoard';

// 시험장 관리
function GasStationHistory() {
  return (
    <Wrapper>
      <GasStationHistorySearchBoard />
    </Wrapper>
  );
}

export default GasStationHistory;

const Wrapper = styled.div``;
