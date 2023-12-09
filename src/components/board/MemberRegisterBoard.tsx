import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import CarApi from '../../apis/CarApi';
import ErrorModal from '../modal/ErrorModal';
import { ErrorResponse } from '../../apis/type/commonResponse';
import { AxiosError } from 'axios';
import AlertModal from '../modal/AlertModal';
import {
  Role,
  TRegisterMemberRequest,
  TUpdateMemberRequest,
} from '../../apis/type/member';
import DepartmentApi from '../../apis/DeparmentApi';
import MembersApi from '../../apis/MembersApi';

function MemberRegisterBoard() {
  const [request, setRequest] = useState<TUpdateMemberRequest>();
  const [form] = Form.useForm();
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const handleRegisterButtonClick = () => {
    const formValues = form.getFieldsValue();
    const email = formValues['email'];
    const password = formValues['password'];
    const name = formValues['name'];
    const request: TRegisterMemberRequest = {
      name,
      password,
      email,
      departmentId: departmentSelected ?? formValues['department'],
      role: roleSelected ?? formValues['role'],
    };
    setRequest(request);
  };

  useEffect(() => {
    request &&
      MembersApi.postMember(request)
        .then((res) => {
          setAlertModalOpen(true);
        })
        .catch((error: AxiosError) => {
          const data: ErrorResponse = error.response?.data as ErrorResponse;
          setErrorMessage(data.message);
          setErrorModalOpen(true);
        });
  }, [request]);

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
  const [departmentSelected, setDepartmentSelected] = useState<number>();
  const [roleSelected, setRoleSelected] = useState<string>();

  return (
    <>
      <AlertModal
        modalOpen={alertModalOpen}
        title={'사용자 등록 알림'}
        content={'사용자를 성공적으로 등록했습니다!'}
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
            name="email"
            label="아이디"
            wrapperCol={{ offset: 2 }}
            rules={[{ required: true, message: '아이디를 입력하세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            wrapperCol={{ offset: 2 }}
            rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="name"
            label="이름"
            wrapperCol={{ offset: 2 }}
            rules={[{ required: true, message: '이름을 입력하세요' }]}
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

export default MemberRegisterBoard;

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
