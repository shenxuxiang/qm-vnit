import React, { memo } from 'react';
import { Table } from 'antd';
import Example1 from './Example1';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## Icon 图标
`;

const usage = `
  ### 何时使用
  你可以在任何希望插入图标的地方插入
`;

const notes = `
  ### 开发者注意事项
  开发者可以给组件传递除 name、className、style、onClick 之外的其他任意属性，任意属性应该以 "data-" 作为前缀。
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
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'name',
    instruct: '图标的名称',
    type: 'string',
  },
  {
    key: 'className',
    instruct: '图标的类名',
    type: 'string',
  },
  {
    key: 'style',
    instruct: '图标的样式',
    type: 'React.CSSProperties',
  },
  {
    key: 'onClick',
    instruct: '绑定的点击事件',
    type: '(event: any) => void',
  },
  {
    key: '其他',
    instruct: '你还可以绑定其他任意的属性，建议使用 "data-" 前缀，这样不会破坏 HTML 结构属性',
    type: 'any',
  },
];
