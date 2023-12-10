import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import {
  CarReservationStatus,
  TCarRequestParams,
  TCarReservationsRequestParams,
} from '../../apis/type/car';
import CarMyReservationTable from '../table/CarMyReservationTable';

const { RangePicker } = DatePicker;

function CarSelectionSearchBoard() {
  const [params, setParams] = useState<TCarRequestParams>();
  const [form] = Form.useForm();
  const [statusSelected, setStatusSelected] = useState();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const status = statusSelected;
    const date = formValues['range-picker'];
    const startDate = date && date[0].format('YYYY-MM-DD');
    const endDate = date && date[1]?.format('YYYY-MM-DD');
    const params: TCarReservationsRequestParams = {
      name,
      status,
      startDate,
      endDate,
    };
    setParams(params);
  };

  const handleFlushButtonClick = () => {
    form.resetFields();
    setParams(undefined);
  };

  const carReservationStatus = [];
  for (const [key, value] of Object.entries(CarReservationStatus)) {
    carReservationStatus.push(
      <Select.Option value={key}>{value}</Select.Option>,
    );
  }

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
          <Form.Item name="name" label="차량명" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="대여상태" wrapperCol={{ offset: 2 }}>
            <Select
              style={{ width: '150px' }}
              onChange={(value, option) => {
                setStatusSelected(value);
              }}
            >
              {carReservationStatus}
            </Select>
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
      <CarMyReservationTable
        title="검색 결과"
        params={params}
        usePagenation={true}
      />
    </>
  );
}

export default CarSelectionSearchBoard;

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
