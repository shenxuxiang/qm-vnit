import { Table } from 'antd';
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## ContentFormHead 表头查询功能
  为页面、表单等提供查询功能
`;

const usage = `
  ### 何时使用
  表头查询既可以作为页头，作为页面的表格数据的查询功能，也可以作为某个表格数据的查询功能
`;

const notes = `
  ### 开发者注意事项
  在不传入 cols 参数的情况下，**ContentFormHead** 会根据屏幕的宽度自动调节（一行可以放置几列）
`;

const updateText = `
  ### 更新内容
  * onReset 回调函数将返回一个 Promise 实例；
  * onSubmit 回调函数将返回一个 Promise 实例；
  * onExport回调函数将返回一个 Promise 实例；
  * 新增提交按钮、导出按钮、重置按钮用户反馈交互，并可以消除用户持续提交动作；
  * 将原本内置的导出文件功能删除，新版本中开发者通过 exportTableList(query) 方法自定义导出文件；
  * 组件内部逻辑优化，组件性能有所提升；
  * 组件样式微调；
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
      <h1>QueryListItem</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={queryListItem} pagination={false} />

      <br />
      <MarkdownCode code={updateText} hasExpandButton={false} defaultExpand />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'cols',
    instruct: '指定一行放置几列, 指定后布局列数不在随屏幕宽度的大小而变化（这里指的并不是包含的容器）。',
    type: 'number',
  },
  {
    key: 'extraNodes',
    instruct: '按钮区域需要插入的自定义内容',
    type: 'ReactNode',
  },
  {
    key: 'submitButtonText',
    instruct: '提交查询表单按钮的文字',
    type: 'string',
    default: '查询',
  },
  {
    key: 'initialValues',
    instruct: '表单查询的初始值',
    type: 'object',
  },
  {
    key: 'defaultExpand',
    instruct: '是否展开所有查询的表单，默认展开',
    type: 'boolean',
    default: 'true',
  },
  {
    key: 'showResetButton',
    instruct: '是否展示重置按钮，默认展示',
    type: 'boolean',
    default: 'true',
  },
  {
    key: 'queryList',
    instruct: '查询表单项',
    type: 'QueryListItem[]',
  },
  {
    key: 'showExportButton',
    instruct: '是否展示导出功能按钮',
    type: 'boolean',
  },
  {
    key: 'onSubmit',
    instruct: '表单提交回调函数',
    type: '(values) => Promise<any>',
  },
  {
    key: 'onReset',
    instruct: '表单重置的回调函数',
    type: '(values) => Promise<any>',
  },
  {
    key: 'onExport',
    instruct: '导出功能回调函数',
    type: '(values) => Promise<any>',
  },
];

const queryListItem = [
  {
    key: 'name',
    instruct: '可选，表单的 name 值',
    type: 'string',
  },
  {
    key: 'title',
    instruct: '可选，表单的 label 值，如果 title 和 label 字段同时存在，以 label 为准',
    type: 'string',
  },
  {
    key: 'dataIndex',
    instruct: '可选，表单的 name 值，如果 dataIndex 和 name 字段同时存在，以 name 为准',
    type: 'string',
  },
  {
    key: 'options',
    instruct: '可选，以配置形式设置子元素，',
    type: 'any[]',
  },
  {
    key: 'properties',
    instruct: '可选，传递给表单组件的 props，你可以通过 properties 来给组件传递任何属性',
    type: 'object',
  },
  {
    key: 'placeholder',
    instruct: '可选，传递给 Input、Select 等组件的 placeholder 属性',
    type: 'string | [string, string]',
  },
  {
    key: 'formType',
    instruct: '可选，告诉 ContentFormHead 你希望渲染哪种类型的组件',
    type: 'input | select | rangePicker | datePicker | cascader',
  },
  {
    key: 'component',
    instruct: '可选，自定义你希望渲染的内容，当 formType 无法满足你的需求时可以使用该方案',
    type: 'React.ReactElement',
  },
  {
    key: 'watch',
    instruct:
      '查询表单项值改变时触发的监听事件，最后一个参数是 formRef， 通过 formRef 可以调用 setFieldValue() 修改其他表单项的值。',
    type: 'function',
  },
  {
    key: 'dataFormat',
    instruct:
      '表单项数据格式化函数，格式化函数将在表达提交时执行，我们可以页面底部的 dataFormat 函数中查看 dataFormat() 调用',
    type: '(value: any) => object',
  },
];
