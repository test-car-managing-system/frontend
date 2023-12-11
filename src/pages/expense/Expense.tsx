import styled from 'styled-components';
import ExpenseSearchBoard from '../../components/board/ExpenseSearchBoard';

// 지출 관리
function Expense() {
  return (
    <Wrapper>
      <ExpenseSearchBoard />
    </Wrapper>
  );
}

export default Expense;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
