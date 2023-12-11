import { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import DepartmentApi from '../../apis/DeparmentApi';
import { TGasStationHistoryRequestParams } from '../../apis/type/gasStationHistory';
import GasStationHistoryTable from '../table/GasStationHistoryTable';

const { RangePicker } = DatePicker;

function GasStationHistorySearchBoard() {
  const [params, setParams] = useState<TGasStationHistoryRequestParams>();
  const [form] = Form.useForm();
  const handleSearchButtonClick = () => {
    const formValues = form.getFieldsValue();
    const name = formValues['name'];
    const carName = formValues['carName'];
    const memberName = formValues['memberName'];
    const stockNumber = formValues['stockNumber'];
    const departmentName = departmentSelected;
    const date = formValues['range-picker'];
    const startDate = date && date[0].format('YYYY-MM-DD');
    const endDate = date && date[1]?.format('YYYY-MM-DD');
    const params: TGasStationHistoryRequestParams = {
      name,
      carName,
      memberName,
      stockNumber,
      departmentName,
      startDate,
      endDate,
    };
    setParams(params);
  };

  const handleFlushButtonClick = () => {
    form.resetFields();
    setParams(undefined);
  };

  const [departmentSelected, setDepartmentSelected] = useState<string>('');
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
    <Select.Option value={department.name}>{department.name}</Select.Option>
  ));

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
          <Form.Item name="name" label="주유소명" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item name="carName" label="차량명" wrapperCol={{ offset: 2 }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="memberName"
            label="사용자명"
            wrapperCol={{ offset: 2 }}
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
          <Form.Item
            name="range-picker"
            label="기간"
            wrapperCol={{ offset: 2 }}
          >
            <RangePicker />
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
      <GasStationHistoryTable
        title="검색 결과"
        params={params}
        usePagenation={true}
      />
    </>
  );
}

export default GasStationHistorySearchBoard;

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
