import styled from 'styled-components';
import CarTable from '../../components/table/CarTable';
import CarSearchBoard from '../../components/search/CarSearchBoard';
import { SetStateAction, useState } from 'react';

function Car() {
  return (
    <Wrapper>
      <CarSearchBoard></CarSearchBoard>
    </Wrapper>
  );
}

export default Car;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
