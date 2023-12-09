import React, { useState } from 'react';
import { DatePicker, Form, Input } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import CarTable from '../table/CarTable';
import { TCarRequestParams } from '../../apis/type/car';
import mapKoreanToCarType from '../../apis/util/mapToKorCarType';

const { RangePicker } = DatePicker;

function CarSearchBoard() {
  const [params, setParams] = useState<TCarRequestParams>();
  const [form] = Form.useForm();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['carName'];
    const type = mapKoreanToCarType(formValues['carType']);
    const date = formValues['range-picker'];
    const startDate = date && date[0].format('YYYY-MM-DD');
    const endDate = date && date[1]?.format('YYYY-MM-DD');
    const params: TCarRequestParams = {
      name,
      type,
      startDate,
      endDate,
    };
    setParams(params);
  };

  const handleFlushButtonClick = () => {
    form.resetFields();
    setParams(undefined);
  };

  return (
    <>
      <Container>
        <Form
          size="middle"
          name="searchCars"
          labelAlign="left"
          labelCol={{ span: 2 }}
          form={form}
          style={{ justifyContent: 'center', width: '80%', fontWeight: '700' }}
        >
          <Form.Item name="carName" label="차량명" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item name="carType" label="차종" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="range-picker"
            label="기간"
            wrapperCol={{ offset: 2 }}
          >
            <RangePicker />
          </Form.Item>
          <Divider />
          <ButtonContainer>
            <Button
              property="update"
              onClick={handleSearchButtonClick}
              label="검색"
            ></Button>
            <HorizontalSizedBox />
            <Button onClick={handleFlushButtonClick} label="초기화" />
          </ButtonContainer>
        </Form>
      </Container>
      <VerticalSizedBox />
      <CarTable title="검색 결과" params={params} usePagenation={true} />
    </>
  );
}

export default CarSearchBoard;

const Container = styled.div`
  width: 100%;
  padding: 50px 0px 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.main.white};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.main.white};
`;

const Divider = styled.div`
  width: 100%;
  margin-bottom: 5px;
  border-top: 0.5px solid black;
`;

const HorizontalSizedBox = styled.div`
  width: 5px;
`;

const VerticalSizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
