import styled from 'styled-components';
import CarTable from '../../components/table/CarTable';
import SearchBoard from '../../components/search/SearchBoard';

function Car() {
  return (
    <Wrapper>
      {/* <SizedBox /> */}
      <SearchBoard></SearchBoard>
      <CarTable title="검색 결과" />
    </Wrapper>
  );
}

export default Car;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 50px;
`;
