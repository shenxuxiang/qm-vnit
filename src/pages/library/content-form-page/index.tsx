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
  只要涉及到表格数据的展示都可以使用，只需要开发者传递一个获取数据的异步方法(requestDataSource)即可使用。

  必要时，开发者可以传递 customResponse 属性，当 requestDataSource() 完成时会见返回值传递给 customResponse() 方法，

  customResponse() 方法执行完成后，将返回的值传递给组件并进行展示。

`;

const notes = `
  ### 开发者注意事项
  为方便开发开箱即用，组件提供了 customResponse 属性，开发者可以通过该属性根据返回的数据结构返回组件所需要的内容

  查询功能则是使用的 ContentFormHead 组件实现
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
      <MarkdownCode code={code} defaultExpand />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'tableTitle',
    instruct: '表格左上角展示的标题',
    type: 'string',
  },
  {
    key: 'extra',
    instruct: '表格右上角展示自定义内容',
    type: 'ReactNode',
  },
  {
    key: 'dataExport',
    instruct: '数据导出功能，如果不用传，则表单搜索功能中不展示导出按钮',
    type: 'function(values)',
  },
  {
    key: 'exportFileName',
    instruct: '导出的文件名',
    type: 'string',
  },
  {
    key: 'searchButtonText',
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
    key: 'requestDataSource',
    instruct: '请求数据的方法',
    type: 'function',
  },
  {
    key: 'hasSearchFunction',
    instruct: '是否具有搜索表单功能',
    type: 'boolean',
    default: 'false',
  },
  {
    key: 'customResponse',
    instruct: '自定义接口返回值处理函数，如果 HTTP 接口返回值的数据结构比较特殊，可以通过定义该返回来解决',
    type: '(data: any) => {pageList: any[], total: number, pageNum: number, pageSize: number }',
    default: 'handleResponse',
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
    key: 'paginationShowTotal',
    instruct: '同 Pagination 组件的 paginationShowTotal',
    type: '(total: number, range: number[]) => string',
    default: 'showTotal',
  },
  {
    key: 'onPaginationChange',
    instruct: '同 Pagination 组件的 onChange 事件',
    type: '(pageNum: number, pageSize: number) => void',
  },
];

const tableColumnsType = [
  {
    key: 'name',
    instruct: '可选，表单的 name 值，如果 name 与 dataIndex 字段所对应的值相同，则可以不传 name。',
    type: 'string',
  },
  {
    key: 'label',
    instruct: '可选，表单的 label 值，如果 label 与 title 字段所对应的值相同，则可以不传 label。',
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
    key: 'keyNameForKey',
    instruct:
      '可选，如果 options 中的数组对象不是 {label, value} 的形式时，我们可以通过 keyNameForKey 来定义 label 字段的取值',
    type: 'string',
  },
  {
    key: 'keyNameForValue',
    instruct:
      '可选，如果 options 中的数组对象不是 {label, value} 的形式时，我们可以通过 keyNameForValue 来定义 value 字段的取值',
    type: 'string',
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
    instruct: '可选，告诉 ContentFormHead 你希望渲染哪种类型的组件',
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
    key: 'formatData',
    instruct:
      '表单项数据格式化函数，格式化函数将在表达提交时执行，我们可以页面底部的 formatFormData 函数中查看 formatData() 调用',
    type: '(value: any) => any',
  },
  {
    key: 'visibleInTable',
    instruct: '是否在 table 中显示',
    type: 'boolean',
    default: 'true',
  },
];

const code = `
~~~jsx
function showTotal(total: number) {
  return '共 ' + total + ' 条数据';
}


function handleResponse(data: any) {
  const { list: pageList, total, pageSize, pageNum } = data;
  return { pageList, total, pageSize, pageNum };
}


function formatFormData(values: any, columns: TableColumnsType[]): SearchCondition {
  const formData = {} as { [propName: string]: any };

  for (let i = 0; i < columns.length; i++) {
    const { dataIndex, name = dataIndex, formatData } = columns[i];
    const value = values[name];
    // eslint-disable-next-line
    if (value == null) continue;

    // 通过 formatData() 将数据格式化，并做为最总发送给后端的查询内容
    if (typeof formatData === "function") {
      const fieldValue = formatData(value);
      Object.assign(formData, fieldValue);
    } else {
      formData[name] = value;
    }
  }
  return formData;
}

// ContentFormPage 组件内部对外暴露的句柄
useImperativeHandle(
  ref,
  () => ({
    // 强制更新页面数据
    forceUpdate(opts?: any, callback?: Function) {
      const query = { pageSize, pageNum, ...searchContent, ...opts };
      sendRequestPageList(query).finally(() => callback?.());
    },
  }),
  [pageSize, pageNum, searchContent]
);


/**
 * ContentFormPage 组件支持排序
 * 当 columns 中的某一项设置了 sorter 字段时，则该字段将支持【倒叙/正序】 查询。
 * 所有需要排序字段都集中在 searchContent.order 对象中，例如：
 * [{ field: 'time', direction: true  }] direction === true 则表示升序，false 则表示倒叙。
 * 如果某个字段不存在，则该字段不排序。
*/
const handleTableChange = useCallback((_: any, __: any, sorter: any) => {
  const orderList: OrderList = [];
  // sorter 可能是对象，也可能是数组。分开处理
  if (sorter instanceof Array) {
    for (let i = 0; i < sorter.length; i++) {
      const { field, order } = sorter[i];
      // 如果 order 字段不存在则说明没有排序
      // 正序-true、倒叙-false，
      if (order) orderList.push({ field, direction: order.includes("asc") });
    }
  } else {
    const { field, order } = sorter;
    // 如果 order 字段不存在则说明没有排序
    // 正序-true、倒叙-false，
    if (order) orderList.push({ field, direction: order.includes("asc") });
  }

  const newSearchCondition: SearchCondition = {
    ...searchContent,
    order: orderList,
  };
  if (orderList.length <= 0) delete newSearchCondition.order;

  setState({ searchContent: newSearchCondition });
}, [searchContent]);


~~~
`;
