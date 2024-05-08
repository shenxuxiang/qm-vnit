import { Table } from 'antd';
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## ContentFormPage 表格页面
  提供数据查询、表格展示、分页的完整功能。
`;

const usage = `
  ### 何时使用
  只要涉及到表格数据的展示都可以使用，只需要开发者传递一个获取数据的异步方法(queryTableList)即可使用。

  必要时，开发者可以传递 customResponse 属性，当 queryTableList() 完成时会见返回值传递给 customResponse() 方法，

  customResponse() 方法执行完成后，将返回的值传递给组件并进行展示。

`;

const notes = `
  ### 开发者注意事项
  为方便开发开箱即用，组件提供了 customResponse 属性，开发者可以通过该属性根据返回的数据结构返回组件所需要的内容

  查询功能则是使用的 ContentFormHeader 组件实现
`;

const updateText = `
  ### 更新内容
  * requestDataSource 属性替换成 queryTableList；
  * 删除 exportFileName 属性；
  * 将原本内置的导出文件功能删除，新版本中开发者通过 exportTableList(query) 方法自定义导出文件；
  * tableTitle 属性类型由原来的 string 类型替换成 React.ReactNode；
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
      <h1>TableColumnsType</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={tableColumnsType} pagination={false} />

      <br />
      <MarkdownCode code={updateText} hasExpandButton={false} defaultExpand />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'tableTitle',
    instruct: '表格左上角展示的标题',
    type: 'React.ReactNode',
  },
  {
    key: 'extra',
    instruct: '表格右上角展示自定义内容',
    type: 'ReactNode',
  },
  {
    key: 'extraNodesInsertHeader',
    instruct: '查询表单按钮区域需要插入的额外内容',
    type: 'ReactNode',
  },
  {
    key: 'exportTableList',
    instruct: '表格数据数据导出功能',
    type: 'function(values)',
  },
  {
    key: 'submitButtonText',
    instruct: '表单查询按钮内容自定义',
    type: 'string',
    default: '查询',
  },
  {
    key: 'showResetButton',
    instruct: '是否显示表单重置按钮',
    type: 'boolean',
    default: 'true',
  },
  {
    key: 'showExportButton',
    instruct: '是否显示导出按钮',
    type: 'boolean',
    default: 'false',
  },
  {
    key: 'queryTableList',
    instruct: '请求数据的方法',
    type: 'function',
  },
  {
    key: 'customResponse',
    instruct: '自定义接口返回值处理函数，如果 HTTP 接口返回值的数据结构比较特殊，可以通过定义该返回来解决',
    type: '(data: any) => { tableList: any[]; total: number }',
  },
  {
    key: 'tableScroll',
    instruct: '同 Table 组件的 scroll',
    type: 'object',
  },
  {
    key: 'rowKey',
    instruct: '表格行 key 的取值，可以是字符串或一个函数',
    type: 'string | function(record): string',
  },
  {
    key: 'columns',
    instruct: '表格列的配置描述，具体项见下表（columns 默认还支持 Table Column 中所有的字段）',
    type: 'TableColumnsType[]',
  },
  {
    key: 'bordered',
    instruct: '是否展示外边框和列边框',
    type: 'false',
  },
  {
    key: 'rowSelection',
    instruct: '同 Table 组件的 rowSelection',
    type: 'object',
  },
  {
    key: 'paginationSize',
    instruct: '同 Pagination 组件的 size',
    type: 'default | small',
    default: 'default',
  },
  {
    key: 'showTotal',
    instruct: '同 Pagination 组件的 paginationShowTotal',
    type: '(total: number, range: number[]) => string',
    default: 'showTotal',
  },
  {
    key: 'onPaginationChange',
    instruct: '同 Pagination 组件的 onChange 事件',
    type: '(pageNum: number, pageSize: number) => void',
  },
  {
    key: 'tableSize',
    instruct: '同 Table 组件的 size',
    type: 'small | middle | large',
  },
  {
    key: 'immediate',
    instruct: '是否在页面初始化时就请求数据接口',
    type: 'boolean',
    default: 'true',
  },
];

const tableColumnsType = [
  {
    key: 'name',
    instruct: '可选，表单的 name 值，如果 name 与 dataIndex 字段所对应的值相同，则可以不传 name。',
    type: 'string',
  },
  {
    key: 'title',
    instruct: '列头显示文字',
    type: 'string | ReactNode',
  },
  {
    key: 'dataIndex',
    instruct: '列数据在数据项中对应的路径，支持通过数组查询嵌套路径',
    type: 'string | string[]',
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
    type: 'string',
  },
  {
    key: 'formType',
    instruct: '可选，告诉 <ContentFormHeader/> 你希望渲染哪种类型的组件',
    type: 'input | select | rangePicker | datePicker | cascader',
  },
  {
    key: 'component',
    instruct: '可选，自定义你希望渲染的内容，当 formType 无法满足你的需求时可以使用该方案',
    type: 'React.ReactElement',
  },
  {
    key: 'initialValue',
    instruct: '表单项的初始值',
    type: 'any',
  },
  {
    key: 'dataFormat',
    instruct:
      '表单项数据格式化函数，格式化函数将在表达提交时执行，我们可以页面底部的 formatFormData 函数中查看 formatData() 调用',
    type: '(value: any) => { [propName: string]: any }',
  },
  {
    key: 'visibleInTable',
    instruct: '是否在 table 中显示',
    type: 'boolean',
    default: 'true',
  },
  {
    key: 'watch',
    instruct:
      '查询表单项值改变时触发的监听事件，最后一个参数是 formRef， 通过 formRef 可以调用 setFieldValue()、getFieldValue() 修改/获取其他表单项的值。',
    type: 'function(...args)',
  },
];
