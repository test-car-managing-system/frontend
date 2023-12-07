import React from 'react';
import { Button, Form, Input } from 'antd';
import Template from '../../components/layout/Template';
import { axiosRequest } from '../../apis/axios';
import styled from 'styled-components';
import AuthApi from '../../apis/AuthApi';
import { TLoginRequestType } from '../../apis/type/auth';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const redirectUrl = '/';
    const loginRequest: TLoginRequestType = {
      email: values.username,
      password: values.password,
    };

    try {
      const res = await AuthApi.login(loginRequest);
      const token = res.result.accessToken;
      localStorage.setItem('accessToken', token);
      axiosRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // 에러 처리 로직
    }
  };

  return (
    <Template>
      <Container>
        <Title>시험차량 관리 시스템</Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
          style={{ width: 400 }}
        >
          <Form.Item<FieldType>
            label="이메일"
            name="username"
            rules={[{ required: true, message: '이메일을 입력하세요' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력하세요' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            style={{
              display: 'flex',
              justifyContent: 'right',
              marginRight: '23px',
            }}
          >
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Template>
  );
};

const Title = styled.div`
  width: 100%;
  height: 100px;
  font-size: 50px;
  font-weight: 700;

  display: flex;
  justify-content: center;
  background-color: '#121212';
`;

const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: '#121212';
`;
export default Login;
