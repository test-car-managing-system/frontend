import { useState } from 'react';
import { DatePicker, Form, Input } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import { TTrackRequestParams } from '../../apis/type/track';
import TrackTable from '../table/TrackTable';

function TrackSearchBoard() {
  const [params, setParams] = useState<TTrackRequestParams>();
  const [form] = Form.useForm();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const location = formValues['location'];
    const params: TTrackRequestParams = {
      name,
      location,
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
          <Form.Item name="name" label="시험장명" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="위치" wrapperCol={{ offset: 2 }}>
            <Input />
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
      <TrackTable title="검색 결과" params={params} />
    </>
  );
}

export default TrackSearchBoard;

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
