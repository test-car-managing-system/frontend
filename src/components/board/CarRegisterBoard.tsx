import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import CarTable from '../table/CarTable';
import { CarType, TCarRequest, TCarRequestParams } from '../../apis/type/car';
import mapKoreanToCarType from '../../apis/util/mapToKorCarType';
import CarApi from '../../apis/CarApi';
import ErrorModal from '../modal/ErrorModal';
import { ErrorResponse } from '../../apis/type/commonResponse';
import { AxiosError } from 'axios';
import AlertModal from '../modal/AlertModal';

const { RangePicker } = DatePicker;

function CarSearchBoard() {
  const [request, setRequest] = useState<TCarRequest>();
  const [form] = Form.useForm();
  const [selectOption, setSelectOption] = useState<string>('SEDAN');
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const handleRegisterButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['carName'];
    const type = selectOption;
    const displacement = formValues['displacement'];
    const request: TCarRequest = {
      name,
      type,
      displacement,
    };
    setRequest(request);
  };

  useEffect(() => {
    request &&
      CarApi.postCar(request)
        .then((res) => {
          setAlertModalOpen(true);
        })
        .catch((error: AxiosError) => {
          const data: ErrorResponse = error.response?.data as ErrorResponse;
          setErrorMessage(data.message);
          setErrorModalOpen(true);
        });
  }, [request]);

  const options = [];
  for (const [key, value] of Object.entries(CarType)) {
    options.push(<Select.Option value={key}>{value}</Select.Option>);
  }

  return (
    <>
      <AlertModal
        modalOpen={alertModalOpen}
        title={'차량 등록 알림'}
        content={'차량을 성공적으로 등록했습니다!'}
        onCancel={() => setAlertModalOpen(false)}
      />
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <Container>
        <Form
          size="middle"
          name="searchCars"
          labelAlign="left"
          labelCol={{ span: 2 }}
          form={form}
          style={{ justifyContent: 'center', width: '80%', fontWeight: '700' }}
        >
          <Form.Item
            name="carName"
            label="차량명"
            wrapperCol={{ offset: 2 }}
            rules={[{ required: true, message: '차량명을 입력하세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="carType"
            label="차종"
            wrapperCol={{ offset: 2 }}
            rules={[{ required: true, message: '차종을 선택하세요' }]}
          >
            <Select
              style={{ width: '150px' }}
              defaultValue={'SEDAN'}
              onChange={(value, option) => {
                setSelectOption(value);
              }}
            >
              {options}
            </Select>
          </Form.Item>
          <Form.Item
            name="displacement"
            label="배기량"
            wrapperCol={{ offset: 2 }}
            rules={[{ required: true, message: '배기량을 입력하세요' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Container>
      <ButtonContainer>
        <Button
          property="update"
          onClick={handleRegisterButtonClick}
          label="등록"
        ></Button>
      </ButtonContainer>
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
  justify-content: right;
  align-items: center;
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
