import React, { memo, useMemo, useRef } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { ContentFormPage } from '@/lib';
import { Card, Button, Space, message } from 'antd';
import { getTableList } from '@/models/index';

function Example() {
  const taleRef = useRef<any>();
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
      },
      {
        // 如果该表单项既没有设置 formType，也没有添加 component，那么他将不会显示在表单查询中。
        dataIndex: 'age',
        title: '年龄',
        sorter: true,
      },
      {
        dataIndex: 'country',
        title: '国籍',
        align: 'right',
      },
      {
        dataIndex: 'time',
        title: '出生年月',
        align: 'right',
      },
      {
        dataIndex: 'id',
        title: '操作',
        align: 'center',
        render: (id: string) => {
          return (
            <Space>
              <Button type="link">编辑</Button>
              <Button type="link" onClick={() => handleDelete(id)}>
                删除
              </Button>
            </Space>
          );
        },
      },
    ],
    [],
  );

  const handleDelete = (id: string) => {
    message.success('操作成功，页面正在刷新');
    // forceUpdate 将会强制更新数据，并且还可以携带参数，该参数将作为 requestDataSource 函数的参数
    // 页面底部会有详细的代码介绍 forceUpdate。
    taleRef.current.forceUpdate();
  };

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例二（支持字段排序）</p>
      <div style={{ padding: '0 0 20px', background: '#f8f8f8' }}>
        <ContentFormPage
          rowKey="id"
          ref={taleRef}
          showExportButton
          hasSearchFunction
          columns={columns as any}
          requestDataSource={getTableList}
        />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useMemo, useRef } from 'react';
import { ContentFormPage } from 'qm-vnit';
import { Card, Button, Space, message } from 'antd';
import { getTableList } from '@/models/index';

function Example() {
  const taleRef = useRef<any>();
  const columns = useMemo(() => [
    {
      dataIndex: 'name',
      title: '用户姓名',
      formType: 'input',
    },
    {
      dataIndex: 'sex',
      title: '性别',
    },
    {
      // 如果该表单项既没有设置 formType，也没有添加 component，那么他将不会显示在表单查询中。
      dataIndex: 'age',
      title: '年龄',
      sorter: true,
    },
    {
      dataIndex: 'country',
      title: '国籍',
      align: 'right',
    },
    {
      dataIndex: 'time',
      title: '出生年月',
      align: 'right',
    },
    {
      dataIndex: 'id',
      title: '操作',
      align: 'center',
      render: (id: string) => {
        return (
          <Space >
            <Button type="link">编辑</Button>
            <Button type="link" onClick={() => handleDelete(id)}>删除</Button>
          </Space>
        );
      }
    }
  ], []);

  const handleDelete = (id: string) => {
    message.success('操作成功，页面正在刷新');
    // forceUpdate 将会强制更新数据，并且还可以携带参数，该参数将作为 requestDataSource 函数的参数
    // 页面底部会有详细的代码介绍 forceUpdate。
    taleRef.current.forceUpdate();
  }

  return (
    <div style={{ padding: '0 0 20px', background: '#f8f8f8' }}>
      <ContentFormPage
        rowKey="id"
        ref={taleRef}
        showExportButton
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
