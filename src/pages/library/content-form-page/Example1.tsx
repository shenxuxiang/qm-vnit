import React, { memo, useMemo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { ContentFormPage } from '@/lib';
import dayjs from 'dayjs';
import { Card } from 'antd';
import { getTableList } from '@/models/index';

function Example() {
  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        title: '用户姓名',
        formType: 'input',
      },
      {
        dataIndex: 'sex',
        title: '性别',
        // 如果你不希望该项出现在 table 中，可以将 visibleInTable 设置为 false
        visibleInTable: false,
      },
      {
        // 如果该表单项既没有设置 formType，也没有添加 component，那么他将不会显示在表单查询中。
        dataIndex: 'age',
        title: '年龄',
      },
      {
        dataIndex: 'country',
        title: '国籍',
        align: 'right',
        formType: 'select',
        options: [
          { label: 'China', value: 'china' },
          { label: 'Japan', value: 'japan' },
          { label: 'Canada', value: 'canada' },
        ],
        initialValue: 'china',
      },
      {
        dataIndex: 'time',
        title: '出生年月',
        align: 'right',
        // 指定该表单项中渲染的内容，如果 formType 无法满足你的需求，可以试试 component。
        formType: 'rangePicker',
        // 如果提供了数据格式化方法，那么他将在表单提交时进行运作，并将返回的值添加到表单查询的参数中。
        formatData: (values: any) => {
          return { start: values[0].format('YYYY-MM-DD'), end: values[1].format('YYYY-MM-DD') };
        },
        // 添加表单查询的初始值
        initialValue: [dayjs('1990-01-01', 'YYYY-MM-DD'), dayjs('1990-06-06', 'YYYY-MM-DD')],
      },
    ],
    [],
  );

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例一</p>
      <div style={{ padding: '0 0 20px', background: '#f8f8f8' }}>
        <ContentFormPage rowKey="id" hasSearchFunction columns={columns as any} requestDataSource={getTableList} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useMemo } from 'react';
import { ContentFormPage } from 'qm-vnit';
import dayjs from 'dayjs';
import { getTableList } from '@/models/index';

function Example() {
  const columns = useMemo(() => [
    {
      dataIndex: 'name',
      title: '用户姓名',
      formType: 'input',
    },
    {
      dataIndex: 'sex',
      title: '性别',
      // 如果你不希望该项出现在 table 中，可以将 visibleInTable 设置为 false
      visibleInTable: false,
    },
    {
      // 如果该表单项既没有设置 formType，也没有添加 component，那么他将不会显示在表单查询中。
      dataIndex: 'age',
      title: '年龄',
    },
    {
      dataIndex: 'country',
      title: '国籍',
      align: 'right',
      formType: 'select',
      options: [{ label: 'China', value: 'china' }, { label: 'Japan', value: 'japan' }, { label: 'Canada', value: 'canada' }],
      initialValue: 'china',
    },
    {
      dataIndex: 'time',
      title: '出生年月',
      align: 'right',
      // 指定该表单项中渲染的内容，如果 formType 无法满足你的需求，可以试试 component。
      formType: 'rangePicker',
      // 如果提供了数据格式化方法，那么他将在表单提交时进行运作，并将返回的值添加到表单查询的参数中。
      formatData: (values: any) => {
        return { start: values[0].format('YYYY-MM-DD'), end: values[1].format('YYYY-MM-DD') }
      },
      // 添加表单查询的初始值
      initialValue: [dayjs('1990-01-01', 'YYYY-MM-DD'), dayjs('1990-06-06', 'YYYY-MM-DD')],
    },
  ], []);

  return (
    <div style={{ padding: '0 0 20px', background: '#f8f8f8' }}>
      <ContentFormPage
        rowKey="id"
        hasSearchFunction
        columns={columns as any}
        requestDataSource={getTableList}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
