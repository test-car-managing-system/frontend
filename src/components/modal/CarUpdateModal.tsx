import { Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import ConfirmButton from '../button/ConfirmButton';
import { CarType, TCarRequest, TCarResponse } from '../../apis/type/car';
import mapKoreanToCarType from '../../apis/util/mapToKorCarType';
import { useEffect, useState } from 'react';
import parseKorToCarType from '../../apis/util/parseKorToCarType';

interface ConfirmModalProps {
  title: string;
  content: string;
  modalOpen: boolean;
  onConfirm?: (data: TCarRequest) => any;
  onCancel?: () => any;
  buttonText: string;
  defaultValues?: TCarResponse;
  property?: 'default' | 'update' | 'logout' | 'delete';
}

function ConfirmModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  defaultValues,
  buttonText,
  property = 'default',
}: ConfirmModalProps) {
  const [form] = Form.useForm();
  const [request, setRequest] = useState<TCarRequest>();
  const onUpdateButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const type = formValues['type'];
    const displacement = formValues['displacement'];
    const request: TCarRequest = {
      id: defaultValues?.id,
      name: name,
      type: type ? parseKorToCarType(type) : 'null',
      displacement: displacement ? parseFloat(displacement) : 0,
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
              type: CarType[
                defaultValues?.type as unknown as keyof typeof CarType
              ],
              displacement: defaultValues?.displacement,
            }}
            size="middle"
            name="updateCar"
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
              label="차량명"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '차량명을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="차종"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '차종을 입력하세요' }]}
            >
              <Input />
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
      </Wrapper>
    </Modal>
  );
}

export default ConfirmModal;

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
