import React, { useState } from 'react';
import {
  CarOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ToolOutlined,
  FlagOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { theme as globalTheme } from '../../common/theme';
import type { MenuProps } from 'antd';
import { ConfigProvider, Breadcrumb, Layout, Menu, theme } from 'antd';
import Button from '../button/Button';
import styled from 'styled-components';
import LayoutHeader from './Header';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('대시보드', '01', <PieChartOutlined />),
  getItem('시험차량 관리', '02', <CarOutlined />, [
    getItem('대여', '021'),
    getItem('대여 이력', '022'),
  ]),
  getItem('차량 관리', '03', <ToolOutlined />, [
    getItem('차량 관리', '031'),
    getItem('재고 관리', '032'),
  ]),
  getItem('시험장 관리', '04', <FlagOutlined />, [
    getItem('예약', '041'),
    getItem('예약 이력', '042'),
    getItem('시험 수행 이력', '043'),
    getItem('시험장 관리', '044'),
  ]),
  getItem('주유 관리', '05', <ThunderboltOutlined />),
  getItem('사용자 관리', '06', <TeamOutlined />, [
    getItem('사용자 조회', '061'),
    getItem('계정 생성', '062'),
  ]),
  getItem('내정보', '07', <UserOutlined />),
];

interface TemplateProps {
  children?: React.ReactNode;
  variant?: string;
}

function LayoutMenu({ children, variant }: TemplateProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemColor: globalTheme.palette.main.dashBoardMenuColor,
            itemBg: globalTheme.palette.main.dashBoardMenuBg,
            subMenuItemBg: globalTheme.palette.main.dashBoardSubMenuBg,
            itemSelectedBg: globalTheme.palette.main.dashBoardMenuSelectedBg,
            itemSelectedColor:
              globalTheme.palette.main.dashBoardMenuSelectedColor,
            itemHoverColor: globalTheme.palette.main.dashBoardMenuSelectedColor,
            itemHoverBg: globalTheme.palette.main.dashBoardMenuSelectedBg,
          },
          Layout: {
            colorText: '#000',
          },
        },
        token: {
          borderRadius: 0,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={220}
        >
          <Logo>시험차량 관리 시스템</Logo>
          <div className="demo-logo-vertical" />
          <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <LayoutHeader />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

const Logo = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

export default LayoutMenu;
