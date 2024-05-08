import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormTable } from '@/lib';
import { InputNumber } from 'antd';

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

// 对接口返回的 response 进行处理，函数返回的内容要满足组件需要的数据类型。
function handleResponse(res: any) {
  return { tableList: res?.data?.list, total: res?.data?.total };
}

function Example() {
  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        title: '用户姓名',
        formType: 'input',
        initialValue: 'Tom',
      },
      {
        name: 'range',
        title: '范围查询',
        visibleInTable: false,
        component: <NumberRange />,
        dataFormat: (values: any) => {
          return { rangeStart: values[0], rangeEnd: values[1] };
        },
      },
      {
        // 如果该表单项既没有设置 formType，也没有添加 component，那么他将不会显示在表单查询中。
        dataIndex: 'sex',
        title: '性别',
      },
      {
        dataIndex: 'age',
        title: '年龄',
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
    ],
    [],
  );

  return (
    <Template markdown={code} title="案例三（支持自定义查询表单项，修改 response）" bodyStyle={{ padding: '0 0 20px' }}>
      <ContentFormTable rowKey="id" columns={columns} queryTableList={getTableList} customResponse={handleResponse} />
    </Template>
  );
}

export default memo(Example);

function NumberRange(props: any) {
  const [start, setState] = useState<number | null>();
  const [end, setEnd] = useState<number | null>();
  const { onChange, value } = props;

  const isModified = useRef<any>(false);

  useEffect(() => {
    if (isModified.current) {
      isModified.current = false;
      return;
    }

    setState(() => value?.[0] ?? null);
    setEnd(() => value?.[1] ?? null);
  }, [value]);

  const onChangeStart = (value: number | null) => {
    isModified.current = true;
    setState(value);
    onChange?.([value, end]);
  };

  const onChangeEnd = (value: number | null) => {
    isModified.current = true;
    setEnd(value);
    onChange?.([start, value]);
  };

  return (
    <>
      <InputNumber value={start} onChange={onChangeStart} max={end!} style={{ width: '40%' }} placeholder="最小值" />
      <span style={{ display: 'inline-block', verticalAlign: '-3px', width: '20%', textAlign: 'center' }}>至</span>
      <InputNumber value={end} onChange={onChangeEnd} min={start!} style={{ width: '40%' }} placeholder="最大值" />
    </>
  );
}

const code = `
~~~tsx
import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormTable } from '@/lib';
import { InputNumber } from 'antd';

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
        }
      });
    }, 1000);
  })
}

// 对接口返回的 response 进行处理，函数返回的内容要满足组件需要的数据类型。
function handleResponse(res: any) {
  return { tableList: res?.data?.list, total: res?.data?.total };
}

function Example() {
  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        title: '用户姓名',
        formType: 'input',
      },
      {
        name: 'range',
        title: '范围查询',
        visibleInTable: false,
        component: <NumberRange />,
        dataFormat: (values: any) => {
          return { rangeStart: values[0], rangeEnd: values[1] };
        },
      },
      {
        // 如果该表单项既没有设置 formType，也没有添加 component，那么他将不会显示在表单查询中。
        dataIndex: 'sex',
        title: '性别',
      },
      {
        dataIndex: 'age',
        title: '年龄',
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
    ],
    [],
  );

  return (
    <Template markdown={code} title="案例三（支持自定义查询表单项，修改 response）" bodyStyle={{ padding: '0 0 20px' }}>
      <ContentFormTable
        rowKey="id"
        columns={columns}
        queryTableList={getTableList}
        customResponse={handleResponse}
      />
    </Template>
  );
}

export default memo(Example);

function NumberRange(props: any) {
  const [start, setState] = useState<number | null>();
  const [end, setEnd] = useState<number | null>();
  const { onChange, value } = props;

  const isModified = useRef<any>(false);

  useEffect(() => {
    if (isModified.current) {
      isModified.current = false;
      return;
    }

    setState(() => value?.[0] ?? null);
    setEnd(() => value?.[1] ?? null);
  }, [value]);

  const onChangeStart = (value: number | null) => {
    isModified.current = true;
    setState(value);
    onChange?.([value, end]);
  };

  const onChangeEnd = (value: number | null) => {
    isModified.current = true;
    setEnd(value);
    onChange?.([start, value]);
  };

  return (
    <>
      <InputNumber value={start} onChange={onChangeStart} max={end!} style={{ width: '40%' }} placeholder="最小值"/>
      <span style={{ display: 'inline-block', verticalAlign: '-3px', width: '20%', textAlign: 'center' }}>至</span>
      <InputNumber value={end} onChange={onChangeEnd} min={start!} style={{ width: '40%' }} placeholder="最大值"/>
    </>
  );
}
~~~
`;
