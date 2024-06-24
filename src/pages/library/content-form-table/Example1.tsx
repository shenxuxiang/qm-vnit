import React, { memo, useMemo, useCallback, useRef } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormTable } from '@/lib';
import { Button, message } from 'antd';
import dayjs from 'dayjs';

// 模拟异步数据请求。
function getTableList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {
              id: '111',
              name: 'Tom',
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
        },
      });
    }, 1000);
  });
}

function Example() {
  const tableRef = useRef<any>();
  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        title: '用户姓名',
        formType: 'input',
        watch: (...args: any[]) => {
          const [, form] = args;
          form.setFieldValue('country', '');
        },
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
        properties: {
          style: { width: '100%' },
        },
        // 如果提供了数据格式化方法，那么他将在表单提交时进行运作，并将返回的值添加到表单查询的参数中。
        dataFormat: (values: any) => {
          return { start: values[0].format('YYYY-MM-DD'), end: values[1].format('YYYY-MM-DD') };
        },
        // 添加表单查询的初始值
        initialValue: [dayjs('1990-01-01', 'YYYY-MM-DD'), dayjs('1990-06-06', 'YYYY-MM-DD')],
      },
    ],
    [],
  );

  const extraNodesInsertHeader = useMemo(() => {
    const getFormData = () => {
      console.log(tableRef.current.getQueryData(), tableRef.current.form);
    };
    return (
      <Button style={{ marginLeft: 8 }} onClick={getFormData}>
        自定义
      </Button>
    );
  }, []);

  const handleBefore = useCallback((query: any) => {
    // 此时可以对表单进行校验，返回 false 将终止请求。函数返回值将作为 request body。
    if (!query.country) {
      message.warning('国籍不能为空！');
      return false;
    }
    return query;
  }, []);

  return (
    <Template
      markdown={code}
      title="案例一（支持表单验证、可指定表单布局列数、可控制页面初始化是否加载表格数据）"
      bodyStyle={{ padding: '0 0 20px' }}
    >
      <ContentFormTable
        cols={2}
        bordered
        rowKey="id"
        ref={tableRef}
        immediate={false}
        columns={columns}
        defaultExpand={false}
        queryTableList={getTableList}
        beforeQueryAction={handleBefore}
        extraNodesInsertHeader={extraNodesInsertHeader}
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import React, { memo, useMemo, useCallback } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormTable } from '@/lib';
import { Button, message } from 'antd';
import dayjs from 'dayjs';

// 模拟异步数据请求。
function getTableList(query?: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {
              id: '111',
              name: 'Tom',
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

function Example() {
  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        title: '用户姓名',
        formType: 'input',
        watch: (...args: any[]) => {
          const [, form] = args;
          form.setFieldValue('country', '');
        },
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
        properties: {
          style: { width: '100%' },
        },
        // 如果提供了数据格式化方法，那么他将在表单提交时进行运作，并将返回的值添加到表单查询的参数中。
        dataFormat: (values: any) => {
          return { start: values[0].format('YYYY-MM-DD'), end: values[1].format('YYYY-MM-DD') };
        },
        // 添加表单查询的初始值
        initialValue: [dayjs('1990-01-01', 'YYYY-MM-DD'), dayjs('1990-06-06', 'YYYY-MM-DD')],
      },
    ],
    [],
  );

  const extraNodesInsertHeader = useMemo(() => {
    return <Button style={{ marginLeft: 8 }}>自定义</Button>;
  }, []);


  const handleBefore = useCallback((query: any) => {
    // 此时可以对表单进行校验，返回 false 将终止请求。函数返回值将作为 request body。
    if (!query.country) {
      message.warning('国籍不能为空！');
      return false;
    }
    return query;
  }, [])

  return (
    <Template markdown={code} title="案例一（支持表单验证，发送请求之前修改 request body，指定列数）"  bodyStyle={{ padding: '0 0 20px' }}>
      <ContentFormTable
        cols={2}
        bordered
        rowKey="id"
        immediate={false}
        columns={columns}
        defaultExpand={false}
        queryTableList={getTableList}
        beforeQueryAction={handleBefore}
        extraNodesInsertHeader={extraNodesInsertHeader}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
