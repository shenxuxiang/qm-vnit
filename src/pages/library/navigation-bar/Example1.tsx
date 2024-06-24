import { Button } from 'antd';
import useReducer from '@/utils/useReducer';
import React, { memo, useCallback } from 'react';
import Template from '@/components/ExampleTemplate';
import NavigationBar, { type NavBarList } from '@/lib/NavigationBar';
function initialState() {
  return {
    navBarList: [
      { key: '11', label: '数据概览' },
      { key: '22', label: '用户详情' },
      { key: '33', label: '系统设置' },
      { key: '44', label: '角色管理' },
      { key: '55', label: '数据统计' },
      { key: '66', label: '权限设置' },
      { key: '77', label: '查看详情' },
    ] as NavBarList,
    navBarActiveKey: '11',
  };
}

function Example() {
  const [{ navBarList, navBarActiveKey }, setState] = useReducer(initialState);

  const handleClickNavBar = useCallback((activeKey: string) => {
    setState({ navBarActiveKey: activeKey });
  }, []);

  const handleDeleteNavBar = useCallback((navBarList: NavBarList) => {
    setState({ navBarList });
  }, []);

  return (
    <Template markdown={code} title="案例一">
      <div style={{ width: 800 }}>
        <NavigationBar
          navBarList={navBarList}
          activeKey={navBarActiveKey}
          onChange={handleClickNavBar}
          onDelete={handleDeleteNavBar}
        />
      </div>
      <Button style={{ marginTop: 20 }} onClick={() => setState(initialState())}>
        重置导航栏
      </Button>
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import useReducer from '@/utils/useReducer';
import React, { memo, useCallback } from 'react';
import NavigationBar, { type NavBarList } from '@/lib/NavigationBar';

function initialState() {
  return {
    navBarList: [
      { key: '11', label: '数据概览' },
      { key: '22', label: '用户详情' },
      { key: '33', label: '系统设置' },
      { key: '44', label: '角色管理' },
      { key: '55', label: '数据统计' },
      { key: '66', label: '权限设置' },
      { key: '77', label: '查看详情' },
    ] as NavBarList,
    navBarActiveKey: '11',
  };
}

function Example() {
  const [ { navBarList, navBarActiveKey }, setState ] = useReducer(initialState);

  const handleClickNavBar = useCallback((activeKey: string) => {
    setState({ navBarActiveKey: activeKey });
  }, []);

  const handleDeleteNavBar = useCallback((navBarList: NavBarList) => {
    setState({ navBarList });
  }, []);

  return (
    <div style={{ width: 800 }}>
      <NavigationBar
        navBarList={navBarList}
        activeKey={navBarActiveKey}
        onChange={handleClickNavBar}
        onDelete={handleDeleteNavBar}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
