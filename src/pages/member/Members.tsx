import styled from 'styled-components';
import MemberSeachBoard from '../../components/board/MemberSearchBorad';

function Members() {
  return (
    <Wrapper>
      <MemberSeachBoard></MemberSeachBoard>
    </Wrapper>
  );
}

export default Members;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
