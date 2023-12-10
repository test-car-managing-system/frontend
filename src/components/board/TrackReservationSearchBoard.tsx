import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import {
  TTrackReservationRequestParams,
  TrackReservationStatus,
} from '../../apis/type/track';
import TrackMyReservaitonTable from '../table/TrackMyReservaitonTable';

function TrackReservationSearchBoard() {
  const [params, setParams] = useState<TTrackReservationRequestParams>();
  const [form] = Form.useForm();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const location = formValues['location'];
    const rawDate = formValues['date'];
    const createdAt = rawDate ? rawDate.format('YYYY-MM-DD') : undefined;
    const status = statusSelected;
    const params: TTrackReservationRequestParams = {
      name,
      createdAt,
      status,
    };
    setParams(params);
  };

  const [statusSelected, setStatusSelected] = useState<string>('');
  const handleFlushButtonClick = () => {
    form.resetFields();
    setParams(undefined);
  };

  const trackReservationStatus = [];
  for (const [key, value] of Object.entries(TrackReservationStatus)) {
    trackReservationStatus.push(
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
          <Form.Item name="name" label="시험장명" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="예약일자" wrapperCol={{ offset: 2 }}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="status" label="예약상태" wrapperCol={{ offset: 2 }}>
            <Select
              style={{ width: '150px' }}
              onChange={(value, option) => {
                setStatusSelected(value);
              }}
            >
              {trackReservationStatus}
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
      <TrackMyReservaitonTable
        title="검색 결과"
        params={params}
        usePagenation={true}
      />
    </>
  );
}

export default TrackReservationSearchBoard;

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
