import styled from 'styled-components';
import MemberRegisterBoard from '../../components/board/MemberRegisterBoard';

function MemberRegister() {
  return (
    <Wrapper>
      <MemberRegisterBoard />
    </Wrapper>
  );
}

export default MemberRegister;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
