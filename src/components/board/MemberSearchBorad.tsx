import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import { Role, TMemberRequestParams } from '../../apis/type/member';
import DepartmentApi from '../../apis/DeparmentApi';
import MemberTable from '../table/MemberTable';

function MemberSeachBoard() {
  const [params, setParams] = useState<TMemberRequestParams>();
  const [form] = Form.useForm();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['carName'];
    const department = departmentSelected;
    const role = roleSelected;
    const params: TMemberRequestParams = {
      name,
      department,
      role,
    };
    setParams(params);
  };

  const [departmentSelected, setDepartmentSelected] = useState<string>('');
  const [roleSelected, setRoleSelected] = useState<string>('');
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

  const handleFlushButtonClick = () => {
    form.resetFields();
    setParams(undefined);
  };

  const departmentSelect = departments.map((department) => (
    <Select.Option value={department.name}>{department.name}</Select.Option>
  ));

  const roles = [];
  for (const [key, value] of Object.entries(Role)) {
    roles.push(<Select.Option value={key}>{value}</Select.Option>);
  }

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
          <Form.Item name="name" label="이름" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item name="deparment" label="부서" wrapperCol={{ offset: 2 }}>
            <Select
              style={{ width: '150px' }}
              onChange={(value, option) => {
                setDepartmentSelected(value);
              }}
            >
              {departmentSelect}
            </Select>
          </Form.Item>
          <Form.Item name="role" label="권한" wrapperCol={{ offset: 2 }}>
            <Select
              style={{ width: '150px' }}
              onChange={(value, option) => {
                setRoleSelected(value);
              }}
            >
              {roles}
            </Select>
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
      <MemberTable title="검색 결과" params={params} usePagenation={true} />
    </>
  );
}

export default MemberSeachBoard;

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
