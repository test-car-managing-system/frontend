import { Form, Input, Modal, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import ConfirmButton from '../button/ConfirmButton';
import {
  CarStockStatus,
  CarType,
  TCarRequest,
  TCarResponse,
  TCarStockRequest,
  TCarStockResponse,
} from '../../apis/type/car';
import { useEffect, useState } from 'react';

interface ConfirmModalProps {
  title: string;
  modalOpen: boolean;
  onConfirm?: (data: TCarRequest) => any;
  onCancel?: () => any;
  buttonText: string;
  carId?: number;
  defaultValues?: {
    id?: number;
    stockNumber?: string;
    status?: string;
  };
  property?: 'default' | 'update' | 'logout' | 'delete';
}

function CarStockRegisterModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  carId,
  defaultValues,
  buttonText,
  property = 'default',
}: ConfirmModalProps) {
  const [form] = Form.useForm();
  const [request, setRequest] = useState<TCarStockRequest>();
  const [selectOption, setSelectOption] = useState<string>('AVAILABLE');

  const onUpdateButtonClick = () => {
    const formValues = form.getFieldsValue();
    const stockNumber = formValues['stockNumber'];
    const status = selectOption;
    const request: TCarStockRequest = {
      id: defaultValues?.id,
      carId: carId,
      stockNumber: stockNumber,
      status: status,
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
              stockNumber: defaultValues?.stockNumber,
              status: defaultValues?.status,
            }}
            size="middle"
            name="registerCar"
            labelAlign="left"
            labelCol={{ span: 4 }}
            form={form}
            style={{
              justifyContent: 'center',
              fontWeight: '700',
            }}
          >
            <Form.Item
              name="stockNumber"
              label="재고번호"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '재고번호를 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="재고상태"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '재고상태를 선택하세요' }]}
            >
              <Select
                style={{ width: '150px' }}
                defaultValue={'AVAILABLE'}
                onChange={(value, option) => {
                  setSelectOption(value);
                }}
              >
                <Select.Option value={'AVAILABLE'}>대여가능</Select.Option>
                <Select.Option value={'INSPECTION'}>검수중</Select.Option>
                <Select.Option value={'RESERVED'}>대여중</Select.Option>
                <Select.Option value={'UNAVAILABLE'}>폐기</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Container>
      </Wrapper>
    </Modal>
  );
}

export default CarStockRegisterModal;

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
