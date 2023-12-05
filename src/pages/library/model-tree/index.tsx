import { Table } from 'antd';
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## ModelTree 模型树
  该组件是 antd Tree 组件的集成，并支持查询功能
`;

const usage = `
  ### 何时使用
  该组件是 Tree 组件的集成，在任何需要使用 Tree 组件的地方都可以使用 ModelTree
`;

const notes = `
  ### 开发者注意事项
  开箱即用，只用提供 treeData 即可，我们默认 treeData 的数据结构是 PropTreeData 类型

  如果 treeData 的数据结构不是这种类型，组件提供了 formatData 属性来定义具体的数据格式转换方法。
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
      <Example3 />

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'checkable',
    instruct: '节点前添加 Checkbox 复选框',
    type: 'boolean',
    default: 'false',
  },
  {
    key: 'treeData',
    instruct: 'treeNodes 数据，可以是任意类型的数组结构，数据会在组件内容进行格式化转换成 Tree 需要的数据格式',
    type: 'any[]',
  },
  {
    key: 'checkedKeys',
    instruct: '（受控）选中复选框的树节点',
    type: 'Key[]',
  },
  {
    key: 'onChange',
    instruct: '点击复选框触发',
    type: '(checkedKeys: Key[], allKeys: Key[]) => void',
  },
  {
    key: 'formatTreeData',
    instruct: '数据格式化的函数，如果提供的 treeData 数据格式符合 TreeData[] 数据类型，则不需要 formatTreeData 函数。',
    type: '(treeData: any[]) => TreeData[]',
  },
  {
    key: 'showFilter',
    instruct: '是否展示搜索输入框',
    type: 'boolea',
    default: 'true',
  },
  {
    key: 'expandedKeys',
    instruct: '展开项',
    type: 'Key[]',
  },
  {
    key: 'onExpand',
    instruct: '点击组合节点时触发的回调函数',
    type: '(expandeKeys: Key[]) => void;',
  },
];
