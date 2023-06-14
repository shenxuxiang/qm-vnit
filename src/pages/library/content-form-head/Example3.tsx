import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { ContentFormHead } from '@/lib';
import { Card, InputNumber } from 'antd';

function Page() {
  const queryList = useMemo(
    () => [
      {
        name: 'name',
        label: '查询名称',
        formType: 'input',
      },
      {
        name: 'time',
        label: '时间查询',
        formType: 'datePicker',
      },
      {
        name: 'type',
        label: '类型查询',
        formType: 'select',
        options: [
          { value: '1', label: 'AAA' },
          { value: '2', label: 'BBB' },
          { value: '3', label: 'CCC' },
        ],
      },
      {
        name: 'range',
        label: '范围查询',
        component: <NumberRange />,
      },
    ],
    [],
  );

  // 点击查询和重置按钮后都会触发
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <div style={{ padding: '20px', background: '#f8f8f8' }}>
        <ContentFormHead queryList={queryList} onSubmit={handleSubmit} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

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

export default memo(Page);

const code = `
~~~js
import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { ContentFormHead } from 'qm-vnit';
import { InputNumber } from 'antd';

function Page() {
  const queryList = useMemo(() => [
    {
      name: 'name',
      label: '查询名称',
      formType: 'input',
    },
    {
      name: 'time',
      label: '时间查询',
      formType: 'datePicker',
    },
    {
      name: 'type',
      label: '类型查询',
      formType: 'select',
      options: [{ value: '1', label: 'AAA' }, { value: '2', label: 'BBB' }, { value: '3', label: 'CCC' }],
    },
    {
      name: 'range',
      label: '范围查询',
      component: <NumberRange />,
    },
  ], []);

  // 点击查询和重置按钮后都会触发
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f8f8f8' }}>
      <ContentFormHead queryList={queryList} onSubmit={handleSubmit} />
    </div>
  );
}

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

export default memo(Page);
~~~
`;
