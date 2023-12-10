import styled from 'styled-components';
import TrackSearchBoard from '../../components/board/TrackSearchBoard';

// 시험장 관리
function Track() {
  return (
    <Wrapper>
      <TrackSearchBoard />
    </Wrapper>
  );
}

export default Track;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
