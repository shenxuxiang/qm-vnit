import React, { memo, useMemo, useRef } from 'react';
import Template from '@/components/ExampleTemplate';
import { Button, Space, message } from 'antd';
import { ContentFormTable } from '@/lib';

// 模拟异步数据请求。
function queryTableList(query?: any) {
  // order 表示排序字段, order: [ {field: 'age', direction: true} ] direction-true 表示正序，false表示倒叙
  console.log(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {
              id: '111',
              name: 'Toms',
              sex: 'man',
              age: 33,
              country: 'china anhui',
              time: '1991-12-10',
            },
            {
              id: '222',
              name: 'Lingda',
              sex: 'woman',
              age: 22,
              country: 'Ottawa',
              time: '1991-09-10',
            },
            {
              id: '333',
              name: 'zhangsan',
              sex: 'man',
              age: 33,
              country: 'china shanghai',
              time: '1992-05-01',
            },
            {
              id: '444',
              name: 'xiaohong',
              sex: 'woman',
              age: 24,
              country: 'china fujian',
              time: '1990-02-23',
            },
          ],
          total: 40,
        },
      });
    }, 1000);
  });
}

function dataExport(query?: any) {
  console.log(query);
  // 导出方式用户可自己定义。
  return Promise.resolve();
}

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
    taleRef.current.forceUpdate(id);
  };

  return (
    <Template
      markdown={code}
      title="案例二（支持字段排序、表格数据导出，手动刷新）"
      bodyStyle={{ padding: '0 0 20px' }}
    >
      <ContentFormTable
        rowKey="id"
        ref={taleRef}
        showExportButton
        columns={columns}
        exportTableList={dataExport}
        queryTableList={queryTableList}
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import React, { memo, useMemo, useRef } from 'react';
import Template from '@/components/ExampleTemplate';
import { Button, Space, message } from 'antd';
import { ContentFormTable } from '@/lib';

// 模拟异步数据请求。
function getTableList(query?: any) {
  // order 表示排序字段, order: [ {field: 'age', direction: true} ] direction-true 表示正序，false表示倒叙
  console.log(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {
              id: '111',
              name: 'Toms',
              sex: 'man',
              age: 33,
              country: 'china anhui',
              time: '1991-12-10',
            },
            {
              id: '222',
              name: 'Lingda',
              sex: 'woman',
              age: 22,
              country: 'Ottawa',
              time: '1991-09-10',
            },
            {
              id: '333',
              name: 'zhangsan',
              sex: 'man',
              age: 33,
              country: 'china shanghai',
              time: '1992-05-01',
            },
            {
              id: '444',
              name: 'xiaohong',
              sex: 'woman',
              age: 24,
              country: 'china fujian',
              time: '1990-02-23',
            },
          ],
          total: 4,
        }
      });
    }, 1000);
  })
}

function dataExport(query?: any) {
  console.log(query);

  return new Promise((resolve) => {
    const text = 'hello world!';
    const uInt8Array = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      uInt8Array[i] = text.charCodeAt(i);
    }

    const blob = new Blob([uInt8Array], { type: 'text/plain' });

    // 导出文件的接口返回的数据格式
    resolve({ data: blob });
  });
}

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
    <Template markdown={code} title="案例二（支持字段排序、表格数据导出，手动刷新）" bodyStyle={{ padding: '0 0 20px' }}>
      <ContentFormTable
        rowKey="id"
        ref={taleRef}
        showExportButton
        columns={columns}
        exportTableList={dataExport}
        queryTableList={getTableList}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
