import React, { useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import {
  CarStockStatus,
  TCarRequestParams,
  TCarStockRequestParams,
} from '../../apis/type/car';
import CarStockTable from '../table/CarStockTable';

const { RangePicker } = DatePicker;

function CarStocksSearchBoard() {
  const [params, setParams] = useState<TCarRequestParams | undefined>();
  const [selectOption, setSelectOption] = useState<string>();
  const [form] = Form.useForm();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const stockNumber = formValues['stockNumber'];
    const status = selectOption;
    const params: TCarStockRequestParams = {
      name,
      stockNumber,
      status,
    };
    setParams(params);
  };

  const handleFlushButtonClick = () => {
    form.resetFields();
    setParams(undefined);
    setSelectOption(undefined);
  };

  const options = [];
  for (const [key, value] of Object.entries(CarStockStatus)) {
    options.push(<Select.Option value={key}>{value}</Select.Option>);
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
          <Form.Item
            name="stockNumber"
            label="재고번호"
            wrapperCol={{ offset: 2 }}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="재고상태" wrapperCol={{ offset: 2 }}>
            <Select
              style={{ width: '150px' }}
              onChange={(value, option) => {
                setSelectOption(value);
              }}
            >
              {options}
            </Select>
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
      <CarStockTable title="검색 결과" params={params} usePagenation={false} />
    </>
  );
}

export default CarStocksSearchBoard;

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
