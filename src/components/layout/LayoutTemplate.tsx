import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';
import LayoutHeader from './Header';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface TemplateProps {
  children?: React.ReactNode;
  variant?: string;
}

function LayoutMenu({ children, variant }: TemplateProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
    getItem('대시보드', '/', <PieChartOutlined />),
    getItem('시험차량 관리', 'cars/reservations', <CarOutlined />, [
      getItem('대여', '/car/reservations/rent'),
      getItem('대여 이력', '/cars/reservations/history'),
    ]),
    getItem('차량 관리', 'cars', <ToolOutlined />, [
      getItem('차량 관리', '/cars'),
      getItem('재고 관리', '/cars/stocs'),
    ]),
    getItem('시험장 관리', 'tracks', <FlagOutlined />, [
      getItem('예약', '/tracks/reservations/new'),
      getItem('예약 이력', '/tracks/reservations'),
      getItem('시험 수행 이력', '/tracks/tests'),
      getItem('시험장 관리', '/tracks'),
    ]),
    getItem('주유 관리', '/gas', <ThunderboltOutlined />),
    getItem('사용자 관리', 'members', <TeamOutlined />, [
      getItem('사용자 조회', '/members'),
      getItem('계정 생성', '/members/register'),
    ]),
    getItem('내정보', '/me', <UserOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([currentPath]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

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
          <Logo onClick={() => navigate('/')}>
            {!collapsed && '시험차량 관리 시스템'}
          </Logo>
          <Menu
            defaultSelectedKeys={['/']}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            mode="inline"
            items={items}
            onClick={({ item, key, keyPath, domEvent }) => {
              if (key && key[0] == '/') navigate(key);
              setSelectedKeys([key]);
            }}
          />
        </Sider>
        <Layout>
          <LayoutHeader />
          <Content style={{ margin: '16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                height: 'calc(93vh - 48px)',
                overflowY: 'scroll',
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
  user-select: none;
  height: 50px;
  width: 100%;
  color: white;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default LayoutMenu;
