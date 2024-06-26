import React, { memo } from 'react';
import { Table } from 'antd';
import Example1 from './Example1';
import Example2 from './Example2';
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

const updateText = `
  ### 更新内容
  * 新增 lazy 属性，支持手动开启图片的惰性加载功能；
  * 修改 style 属性，支持 string 类型，可以像书写内联样式一样；
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
      <Example2 />

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />

      <br />
      <MarkdownCode code={updateText} hasExpandButton={false} defaultExpand />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'src',
    instruct: '图像的路径',
    type: 'string',
  },
  {
    key: 'lazy',
    instruct: '是否开启 img 的惰性加载功能',
    type: 'string',
    default: 'true',
  },
  {
    key: 'alt',
    instruct: '图像的 alt',
    type: 'string',
  },
  {
    key: 'className',
    instruct: '添加的类型',
    type: 'string',
  },
  {
    key: 'style',
    instruct: '添加的样式',
    type: 'React.CSSProperties | string',
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
