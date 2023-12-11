import { DatePicker, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import ConfirmButton from '../button/ConfirmButton';
import { useEffect, useState } from 'react';
import { TGasStationRequest } from '../../apis/type/gasStation';
import { TGasStationHistoryRequest } from '../../apis/type/gasStationHistory';
import dayjs from 'dayjs';
interface ConfirmModalProps {
  title: string;
  modalOpen: boolean;
  onConfirm?: (data: TGasStationHistoryRequest) => any;
  onCancel?: () => any;
  buttonText: string;
  defaultValues?: {
    id?: number;
    name?: string;
    stockNumber?: string;
    amount?: number;
    usedAt?: string;
  };
  property?: 'default' | 'update' | 'logout' | 'delete';
}

function GasStationHistoryRegisterModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  defaultValues,
  buttonText,
  property = 'default',
}: ConfirmModalProps) {
  const [form] = Form.useForm();
  const [request, setRequest] = useState<TGasStationRequest>();

  const onUpdateButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const stockNumber = formValues['stockNumber'];
    const amount = formValues['amount'];
    const rawDate = formValues['usedAt'];
    const usedAt = rawDate ? rawDate.format('YYYY-MM-DD') : undefined;

    const request: TGasStationHistoryRequest = {
      id: defaultValues?.id,
      gasStationName: name,
      stockNumber,
      amount,
      usedAt,
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
              name: defaultValues?.name,
              stockNumber: defaultValues?.stockNumber,
              amount: defaultValues?.amount,
              usedAt:
                defaultValues &&
                defaultValues.usedAt &&
                dayjs(defaultValues.usedAt),
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
              name="name"
              label="주유소명"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '주유소명을 입력하세요' }]}
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
              name="amount"
              label="주유량"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '주유량을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="usedAt"
              label="주유일시"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '주유일시를 입력하세요' }]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </Container>
      </Wrapper>
    </Modal>
  );
}

export default GasStationHistoryRegisterModal;

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
