import React, { useEffect, useState } from 'react';
import { Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Button from '../button/Button';
import mapKoreanToCarType from '../../apis/util/mapToKorCarType';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { TTrackReservationRequest } from '../../apis/type/track';
import { useParams } from 'react-router-dom';
import TrackApi from '../../apis/TrackApi';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import ErrorModal from '../modal/ErrorModal';
import AlertModal from '../modal/AlertModal';

const options = [
  { label: '08:00 ~ 09:00', value: '08:00 ~ 09:00' },
  { label: '09:00 ~ 10:00', value: '09:00 ~ 10:00' },
  { label: '10:00 ~ 11:00', value: '10:00 ~ 11:00' },
  { label: '11:00 ~ 12:00', value: '11:00 ~ 12:00' },
  { label: '12:00 ~ 13:00', value: '12:00 ~ 13:00' },
  { label: '13:00 ~ 14:00', value: '13:00 ~ 14:00' },
  { label: '14:00 ~ 15:00', value: '14:00 ~ 15:00' },
  { label: '15:00 ~ 16:00', value: '15:00 ~ 16:00' },
  { label: '16:00 ~ 17:00', value: '16:00 ~ 17:00' },
  { label: '17:00 ~ 18:00', value: '17:00 ~ 18:00' },
  { label: '18:00 ~ 19:00', value: '18:00 ~ 19:00' },
  { label: '19:00 ~ 20:00', value: '19:00 ~ 20:00' },
  { label: '20:00 ~ 21:00', value: '20:00 ~ 21:00' },
  { label: '21:00 ~ 22:00', value: '21:00 ~ 22:00' },
];

function TrackReservationDateBoard() {
  const [request, setRequest] = useState<TTrackReservationRequest>();
  const [today, setTotay] = useState<string>();
  const [checkedTime, setCheckedTime] = useState<CheckboxValueType[]>([]);
  const [form] = Form.useForm();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['carName'];
    const type = mapKoreanToCarType(formValues['carType']);
    const date = formValues['date'];
  };

  const [groupedOptions, setGroupedOptions] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const rows = [];
    const now = dayjs();
    for (let i = 0; i < options.length; i += 3) {
      const group = options.slice(i, i + 3);

      const cols = group.map((option, index) => {
        const [startTime] = option.value.split(' ~ ');
        const dateTime = today && dayjs(`${today} ${startTime}`);
        const isDisabled = dateTime ? dateTime.isBefore(now) : false;

        return (
          <Col key={index} style={{ fontWeight: '500' }} span={6}>
            <Checkbox value={option.value} disabled={isDisabled}>
              {option.label}
            </Checkbox>
          </Col>
        );
      });
      while (cols.length < 3) {
        cols.push(<Col key={i + cols.length} span={6}></Col>);
      }
      rows.push(
        <Row key={i} justify="space-around">
          {cols}
        </Row>,
      );
    }
    setGroupedOptions(rows);
    setCheckedTime([]);
  }, [today]);

  useEffect(() => {
    const slots: { startedAt: string; expiredAt: string }[] = [];
    const formValues = form.getFieldsValue();
    const date = formValues['date']?.format('YYYY-MM-DD');
    checkedTime?.map((time) => {
      const timeString = time.toString().split(' ~ ');
      slots.push({
        startedAt: `${date}T${timeString[0]}:00.000Z`,
        expiredAt: `${date}T${timeString[1]}:00.000Z`,
      });
    });
    setRequest({
      id: id as unknown as number,
      date: date,
      reservationSlots: slots,
    });
  }, [checkedTime]);

  const handleReservationButtonClick = (value: any) => {
    if (request) {
      TrackApi.postTrackReservations(request)
        .then((res) => {
          setAlertModalOpen(true);
        })
        .catch((error: AxiosError) => {
          const data: ErrorResponse = error.response?.data as ErrorResponse;
          setErrorMessage(data.message);
          setErrorModalOpen(true);
        });
    }
  };

  const handleDateChange = (value: any) => {
    const formValues = form.getFieldsValue();
    const date = formValues['date'];
    if (!date) {
      setTotay('0');
    } else {
      const startDate = date.format('YYYY-MM-DD');
      setTotay(startDate);
    }
    setCheckedTime([]);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setCheckedTime(checkedValues);
  };

  return (
    <>
      <Container>
        <AlertModal
          modalOpen={alertModalOpen}
          content={'시험장 예약을 성공했습니다'}
          onCancel={() => setAlertModalOpen(false)}
          title={'시험장 예약 알림'}
        />
        <ErrorModal
          modalOpen={errorModalOpen}
          content={errorMessage}
          onCancel={() => setErrorModalOpen(false)}
        />
        <Form
          size="middle"
          name="times"
          labelAlign="left"
          labelCol={{ span: 2 }}
          form={form}
          initialValues={{ date: dayjs() }}
          style={{ justifyContent: 'center', width: '80%', fontWeight: '700' }}
        >
          <Form.Item name="date" label="일자" wrapperCol={{ offset: 2 }}>
            <DatePicker onChange={handleDateChange} />
          </Form.Item>
          <Content>
            <Checkbox.Group
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onChange={onChange}
            >
              {groupedOptions}
            </Checkbox.Group>
          </Content>
        </Form>
      </Container>
      <ButtonContainer>
        <Button
          property="update"
          label="예약"
          onClick={handleReservationButtonClick}
          state={checkedTime && checkedTime.length > 0}
        />
      </ButtonContainer>
    </>
  );
}

export default TrackReservationDateBoard;

const Container = styled.div`
  width: 100%;
  padding: 50px 0px 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.main.white};
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
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
