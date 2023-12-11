import { DatePicker, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import ConfirmButton from '../button/ConfirmButton';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TCarTestRequest } from '../../apis/type/carTest';
interface ConfirmModalProps {
  title: string;
  modalOpen: boolean;
  onConfirm?: (data: TCarTestRequest) => any;
  onCancel?: () => any;
  buttonText: string;
  defaultValues?: {
    id?: number;
    trackName?: string;
    stockNumber?: string;
    performedAt?: string;
    result?: string;
    memo?: string;
  };
  property?: 'default' | 'update' | 'logout' | 'delete';
}

function CarTestRegisterModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  defaultValues,
  buttonText,
  property = 'default',
}: ConfirmModalProps) {
  const [form] = Form.useForm();
  const [request, setRequest] = useState<TCarTestRequest>();

  const onUpdateButtonClick = () => {
    const formValues = form.getFieldsValue();
    const trackName = formValues['trackName'];
    const stockNumber = formValues['stockNumber'];
    const result = formValues['result'];
    const memo = formValues['memo'];
    const rawDate = formValues['performedAt'];
    const performedAt = rawDate ? rawDate.format('YYYY-MM-DD') : undefined;

    const request: TCarTestRequest = {
      id: defaultValues?.id,
      trackName: trackName,
      stockNumber: stockNumber,
      performedAt: performedAt,
      result: result,
      memo: memo,
    };
    setRequest(request);
  };

  useEffect(() => {
    if (onConfirm && request) onConfirm(request);
  }, [request]);

  return (
    <Modal
      style={{ border: '0.5px solid black', fontWeight: '500' }}
      title={<Title>{title}</Title>}
      centered
      open={modalOpen}
      footer={
        <ButtonWrapper>
          <ConfirmButton
            label={buttonText}
            property={property}
            onClick={onUpdateButtonClick}
          ></ConfirmButton>
        </ButtonWrapper>
      }
      onCancel={onCancel}
    >
      <Wrapper>
        <Container>
          <Form
            initialValues={{
              trackName: defaultValues?.trackName,
              stockNumber: defaultValues?.stockNumber,
              result: defaultValues?.result,
              memo: defaultValues?.memo,
              performedAt:
                defaultValues &&
                defaultValues.performedAt &&
                dayjs(defaultValues.performedAt),
            }}
            size="middle"
            name="registerGasStation"
            labelAlign="left"
            labelCol={{ span: 4 }}
            form={form}
            style={{
              justifyContent: 'center',
              fontWeight: '700',
            }}
          >
            <Form.Item
              name="trackName"
              label="시험장명"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '시험장명을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="stockNumber"
              label="재고번호"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '재고번호를 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="performedAt"
              label="수행일시"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '수행일시 입력하세요' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="result"
              label="수행결과"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '수행결과를 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="memo" label="비고" wrapperCol={{ offset: 2 }}>
              <Input />
            </Form.Item>
          </Form>
        </Container>
      </Wrapper>
    </Modal>
  );
}

export default CarTestRegisterModal;

const Title = styled.div`
  ${({ theme }) => theme.typo.text.T_18_EB};
  font-weight: 700;
  padding: 8px 0 8px 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const Wrapper = styled.div`
  margin-top: 10px;
  border-top: 0.5px solid black;
  padding: 15px 0 15px;
  ${({ theme }) => theme.typo.text.T_16_EB};
  font-weight: 500;
`;

const Container = styled.div`
  border: 0.5px solid black;
  padding: 30px 20px 30px 20px;
  ${({ theme }) => theme.typo.text.T_16_EB};
  font-weight: 500;
`;
