import React, { useCallback, memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import logo from '@/assets/images/vnit-logo.svg';
import './index.less';
import { NavLink } from 'react-router-dom';

const { Content, Header } = Layout;

const MainLayout: React.FC = () => {
  const navLinkClassName = useCallback((props: any) => {
    return `qm-vnit-nav-item-link${props.isActive ? ' active' : ''}`;
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="qm-vnit-head">
        <div className="qm-vnit-head-left">
          <img src={logo} alt="logo" className="qm-vnit-logo" />
          <h2 className="qm-vnit-title">qm-vnit</h2>
        </div>
        <div className="qm-vnit-head-right">
          <ul className="qm-vnit-nav">
            <li className="qm-vnit-nav-item">
              <NavLink to="/home" className={navLinkClassName}>
                介绍
              </NavLink>
            </li>
            <li className="qm-vnit-nav-item">
              <NavLink to="/library" className={navLinkClassName}>
                组件
              </NavLink>
            </li>
          </ul>
          <ul className="qm-vnit-tool-bar">
            <li>1.0.0</li>
          </ul>
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default memo(MainLayout);
