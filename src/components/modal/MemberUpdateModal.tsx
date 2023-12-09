import { Form, Input, Modal, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import ConfirmButton from '../button/ConfirmButton';
import { CarType, TCarRequest, TCarResponse } from '../../apis/type/car';
import mapKoreanToCarType from '../../apis/util/mapToKorCarType';
import { useEffect, useState } from 'react';
import parseKorToCarType from '../../apis/util/parseKorToCarType';
import {
  IMembersRes,
  Role,
  TMemberRequestParams,
  TUpdateMemberRequest,
} from '../../apis/type/member';
import DepartmentApi from '../../apis/DeparmentApi';

interface ModalProps {
  title: string;
  modalOpen: boolean;
  onConfirm?: (data: TCarRequest) => any;
  onCancel?: () => any;
  buttonText: string;
  defaultValues?: IMembersRes;
  property?: 'default' | 'update' | 'logout' | 'delete';
}

function MemberUpdateModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  defaultValues,
  buttonText,
  property = 'default',
}: ModalProps) {
  const [form] = Form.useForm();
  const [request, setRequest] = useState<TUpdateMemberRequest>();
  const onUpdateButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const email = formValues['email'];
    const request: TUpdateMemberRequest = {
      id: defaultValues?.id,
      name: name,
      email: email,
      departmentId: departmentSelected ?? formValues['department'],
      role: roleSelected ?? formValues['role'],
    };
    setRequest(request);
  };

  useEffect(() => {
    if (onConfirm && request) onConfirm(request);
  }, [request]);

  const [departmentSelected, setDepartmentSelected] = useState<
    number | undefined
  >(defaultValues?.department?.id);
  const [roleSelected, setRoleSelected] = useState<string | undefined>(
    defaultValues?.role,
  );
  useEffect(() => {
    setDepartmentSelected(defaultValues?.department?.id);
    setRoleSelected(defaultValues?.role);
  }, [defaultValues]);

  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    DepartmentApi.getDepartments().then((res) => {
      const rawData: { id: number; name: string }[] = [];
      res.result.forEach((department) => {
        rawData.push({
          id: department.id,
          name: department.name,
        });
      });
      setDepartments(rawData);
    });
  }, []);

  const departmentSelect = departments.map((department) => (
    <Select.Option key={department.id} value={department.id}>
      {department.name}
    </Select.Option>
  ));

  const roleSelect = Object.entries(Role).map(([key, value]) => (
    <Select.Option key={key} value={key}>
      {value}
    </Select.Option>
  ));

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
              email: defaultValues?.email,
              department: defaultValues?.department?.id,
              role: defaultValues?.role,
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
              label="이름"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '이름을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="이메일"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '이메일을 입력하세요' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="department"
              label="부서"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '부서를 선택하세요' }]}
            >
              <Select
                style={{ width: '150px' }}
                onChange={(value, option) => {
                  setDepartmentSelected(value);
                }}
              >
                {departmentSelect}
              </Select>
            </Form.Item>
            <Form.Item
              name="role"
              label="권한"
              wrapperCol={{ offset: 2 }}
              rules={[{ required: true, message: '권한을 선택하세요' }]}
            >
              <Select
                style={{ width: '150px' }}
                onChange={(value, option) => {
                  setRoleSelected(value);
                }}
              >
                {roleSelect}
              </Select>
            </Form.Item>
          </Form>
        </Container>
      </Wrapper>
    </Modal>
  );
}

export default MemberUpdateModal;

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
