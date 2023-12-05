import { Menu, Layout } from 'antd';
import { menuItems } from '@/routers';
import classes from './index.module.less';
import useReducer from '@/utils/useReducer';
import React, { memo, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@/lib';
import { scrollToPosition } from '@/utils';

const { Sider, Content } = Layout;

function initialState() {
  return {
    activeKey: [] as string[],
  };
}

function Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useReducer(initialState);

  useEffect(() => {
    const { pathname } = location;
    const matched = /^\/library\/([^#?]+)/.exec(pathname);
    if (matched) setState({ activeKey: [matched[1]] });
  }, [location]);

  const handleSelect = useCallback((menu: any) => {
    setState({ activeKey: menu.selectedKeys });
    navigate('/library/' + menu.key);
  }, []);

  return (
    <Layout className={classes.page} hasSider>
      <Sider theme="light" width={320}>
        {/* <p className={classes.menu_title}>组件总览</p> */}
        <Menu
          mode="inline"
          items={menuItems as any}
          onSelect={handleSelect}
          selectedKeys={state.activeKey}
          className={classes.menu_wrapper}
        />
      </Sider>
      <Content>
        <Outlet />
        <div className={classes.backTop}>
          <Icon
            name="backtop"
            onClick={() => scrollToPosition(0)}
            style={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.7)' }}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default memo(Page);
