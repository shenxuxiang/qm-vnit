import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { ContentFormPage } from '@/lib';
import { Card, InputNumber } from 'antd';
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
        name: 'range',
        label: '范围查询',
        visibleInTable: false,
        component: <NumberRange />,
        formatData: (values: any) => {
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
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例三（支持自定义查询表单项）</p>
      <div style={{ padding: '0 0 20px', background: '#f8f8f8' }}>
        <ContentFormPage rowKey="id" hasSearchFunction columns={columns as any} requestDataSource={getTableList} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

function NumberRange(props: any) {
  const [start, setState] = useState<number | null>();
  const [end, setEnd] = useState<number | null>();
  const { onChange, value } = props;

  const isModified = useRef<any>(false);

  useEffect(() => {
    isModified.current = true;
    setState(() => value?.[0] ?? null);
    setEnd(() => value?.[1] ?? null);
  }, [value]);

  useEffect(() => {
    if (isModified.current) {
      isModified.current = false;
      return;
    }

    onChange?.([start, end]);
  }, [start, end]);

  const onChangeStart = (value: number | null) => {
    setState(value);
  };

  const onChangeEnd = (value: number | null) => {
    setEnd(value);
  };

  return (
    <>
      <InputNumber value={start} onChange={onChangeStart} max={end!} style={{ width: '40%' }} />
      <span style={{ display: 'inline-block', verticalAlign: '-3px', width: '20%', textAlign: 'center' }}>至</span>
      <InputNumber value={end} onChange={onChangeEnd} min={start!} style={{ width: '40%' }} />
    </>
  );
}

const code = `
~~~js
import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import { ContentFormPage } from 'qm-vnit';
import { InputNumber } from 'antd';
import { getTableList } from '@/models/index';

function Example() {
  const columns = useMemo(() => [
    {
      dataIndex: 'name',
      title: '用户姓名',
      formType: 'input',
    },
    {
      name: 'range',
      label: '范围查询',
      visibleInTable: false,
      component: <NumberRange />,
      formatData: (values: any) => {
        return { rangeStart: values[0], rangeEnd: values[1] }
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

function NumberRange(props: any) {
  const [ start, setState ] = useState<number | null>();
  const [ end, setEnd ] = useState<number | null>();
  const { onChange, value } = props;

  const isModified = useRef<any>(false);

  useEffect(() => {
    isModified.current = true;
    setState(() => value?.[0] ?? null);
    setEnd(() => value?.[1] ?? null);
  }, [value]);

  useEffect(() => {
    if (isModified.current) {
      isModified.current = false;
      return;
    }

    onChange?.([start, end]);
  }, [start, end]);

  const onChangeStart = (value: number | null) => {
    setState(value);
  }

  const onChangeEnd = (value: number | null) => {
    setEnd(value);
  }

  return (
    <>
      <InputNumber value={start} onChange={onChangeStart} max={end!} style={{ width: '40%' }}/>
      <span style={{ display: 'inline-block', verticalAlign: '-3px', width: '20%', textAlign: 'center' }}>至</span>
      <InputNumber value={end} onChange={onChangeEnd} min={start!} style={{ width: '40%' }}/>
    </>
  );
}
~~~
`;
