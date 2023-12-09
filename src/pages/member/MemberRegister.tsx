import styled from 'styled-components';
import MemberRegisterBoard from '../../components/board/MemberRegisterBoard';

function CarRegister() {
  return (
    <Wrapper>
      <MemberRegisterBoard />
    </Wrapper>
  );
}

export default CarRegister;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
