import { Table } from 'antd';
import Example1 from './Example1';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## NavigationBar 导航栏
`;

const usage = `
  ### 何时使用
  如果你希望你的页面有一个导航栏时
`;

const notes = `
  ### 开发者注意事项
  默认数据第一项不能删除，该配置不支持修改。
`;

function Page() {
  return (
    <section style={{ padding: '20px 20px 20px 60px' }}>
      <MarkdownCode code={header} hasExpandButton={false} defaultExpand />
      <br />
      <MarkdownCode code={usage} hasExpandButton={false} defaultExpand />
      <br />
      <MarkdownCode code={notes} hasExpandButton={false} defaultExpand />
      <br />
      <MarkdownCode code="### 代码演示" hasExpandButton={false} defaultExpand />

      <Example1 />

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />

      <br />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'activeKey',
    instruct: '当前选中的导航项',
    type: 'string',
  },
  {
    key: 'navBarList',
    instruct: '列表',
    type: 'NavBarList',
    default: '[]',
  },
  {
    key: 'onChange',
    instruct: '当用户点击导航栏时触发',
    type: '(activeKey: string) => void',
  },
  {
    key: 'onDelete',
    instruct: '当用户删除导航栏时触发',
    type: '(newNavBarList: NavBarList) => void',
  },
];
