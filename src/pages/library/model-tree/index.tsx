import React, { memo } from 'react';
import classes from '../index.module.less';
import { Table } from 'antd';
import Example1 from './Example1';
import Example2 from './Example2';
import { TABLE_HEADER } from '@/pages/library/constants';
import MarkdownCode from '@/components/MarkdownCode';

function Page() {
  return (
    <section className={classes.module}>
      <h1 className={classes.module_title}>ModelTree 模型树</h1>
      <p className={classes.module_subtitle}>该组件是 antd Tree 组件的集成，并支持查询功能</p>

      <h1 className={classes.module_notice_title}>何时使用</h1>
      <p className={classes.module_subtitle}>
        该组件是 Tree 组件的集成，在任何需要使用 Tree 组件的地方都可以使用 ModelTree，
      </p>

      <h1 className={classes.module_notice_title}>开发者注意事项</h1>
      <p className={classes.module_subtitle}>
        开箱即用，只用提供 treeData 即可，我们默认 treeData 的数据结构是 PropTreeData 类型
      </p>
      <p className={classes.module_subtitle}>
        如果 treeData 的数据结构不是这种类型，组件提供了 formatData 属性来定义具体的数据格式转换方法。
      </p>

      <h1 className={classes.module_notice_title}>代码演示</h1>

      <Example1 />
      <Example2 />

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />

      <MarkdownCode code={code} defaultExpand />
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
    type: 'string[]',
  },
  {
    key: 'onChange',
    instruct: '点击复选框触发',
    type: '(checkedKeys: string[], allKeys: string[]) => void',
  },
  {
    key: 'formatData',
    instruct:
      '数据格式化的函数，如果提供的 treeData 数据格式符合 TreeData[] 数据类型，则不需要 formatData 函数进行再次处理，此时我们应该将其设置为 null 避免不必要的性能损耗。',
    type: '((treeData: any[]) => TreeData[]) | null',
    default: 'computePropTreeData',
  },
  {
    key: 'filterOption',
    instruct: '条件筛选方法，将 filterOption 设置为 false 将隐藏条件过滤项',
    type: 'boolean | ((data: TreeData[], searchValue: string) => TreeData[])',
    default: 'true',
  },
];

const code = `
~~~jsx
type PropTreeData = { id: string; parentId: string; name: string; children: PropTreeData }[];
type TreeData = { key: string; parentKey?: string; title: string; children?: TreeData[], [propName: string]: any };

function computePropTreeData(sourceList: PropTreeData): TreeData[] {
  return (
    sourceList?.map((item) => {
      const { id, parentId, name, children, ...props } = item;
      return {
        key: id,
        title: name,
        parentKey: parentId,
        children: children ? computePropTreeData(children) : undefined,
        ...props,
      };
    }) ?? []
  );
}
~~~
`;
