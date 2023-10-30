import React, { useCallback, memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Popconfirm, Popover } from 'antd';
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
            <li>
              <Popover
                title={
                  <div>
                    <h3>Version 2.x 在 1.x 的基础上进行了一下修改：</h3>
                    <p style={{ margin: '10px 0 0 0' }}>
                      1、Version 2.x 重写了 UploadFile、UploadImage、UploadVideo、UploadAudio 组件。
                    </p>
                    <p style={{ margin: '10px 0 0 0' }}>
                      2、对 ContentFormTable、ModelTree 组件进行了优化，并添加了一些新功能。
                    </p>
                    <p style={{ margin: '10px 0 0 0' }}>3、新增 Image 组件。</p>
                  </div>
                }
              >
                <span style={{ padding: '5px 12px', cursor: 'pointer' }}>2.0.0</span>
              </Popover>
            </li>
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
