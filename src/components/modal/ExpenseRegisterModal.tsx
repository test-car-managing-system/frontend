import { DatePicker, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import ConfirmButton from '../button/ConfirmButton';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TExpenseRequest } from '../../apis/type/expense';
interface ConfirmModalProps {
  title: string;
  modalOpen: boolean;
  onConfirm?: (data: TExpenseRequest) => any;
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

function ExpenseRegisterModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  defaultValues,
  buttonText,
  property = 'default',
}: ConfirmModalProps) {
  const [form] = Form.useForm();
  const [request, setRequest] = useState<TExpenseRequest>();

  const onUpdateButtonClick = () => {
    const formValues = form.getFieldsValue();
    const description = formValues['description'];
    const stockNumber = formValues['stockNumber'];
    const amount = formValues['amount'];
    const rawDate = formValues['usedAt'];
    const usedAt = rawDate ? rawDate.format('YYYY-MM-DD') : undefined;

    const request: TExpenseRequest = {
      id: defaultValues?.id,
      description,
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
              name="description"
              label="지출내용"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '지출내용을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="stockNumber"
              label="재고번호"
              wrapperCol={{ offset: 2 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="usedAt"
              label="지출일자"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '지출일자를 입력하세요' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="amount"
              label="금액"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '금액을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Container>
      </Wrapper>
    </Modal>
  );
}

export default ExpenseRegisterModal;

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
