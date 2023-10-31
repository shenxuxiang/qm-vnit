import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormHeader } from '@/lib';
import { InputNumber, Button } from 'antd';

function Page() {
  const queryList = useMemo(
    () => [
      {
        name: 'name',
        title: '查询名称',
        formType: 'input',
      },
      {
        name: 'time',
        title: '时间查询',
        formType: 'datePicker',
        dataFormat: (value: any) => {
          return { time: value.startOf('day').format('YYYY-MM-DD HH:mm:ss') };
        },
        properties: {
          style: { width: '100%' },
        },
      },
      {
        name: 'type',
        title: '类型查询',
        formType: 'select',
        options: [
          { value: '1', label: 'AAA' },
          { value: '2', label: 'BBB' },
          { value: '3', label: 'CCC' },
        ],
      },
      {
        name: 'range',
        title: '范围查询',
        // 通过 component 定义要渲染的表单项内容，
        component: <NumberRange />,
        dataFormat: (value: any) => {
          return {
            startNum: value[0],
            endNum: value[1],
          };
        },
      },
    ],
    [],
  );

  // 点击查询和重置按钮后都会触发
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  const extraNodes = useMemo(() => {
    return <Button style={{ marginLeft: '8px' }}>自定义</Button>;
  }, []);

  return (
    <Template markdown={code} title="案例三（支持自定义查询表单项）">
      <ContentFormHeader queryList={queryList} onSubmit={handleSubmit} extraNodes={extraNodes} />
    </Template>
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
      <InputNumber value={start} onChange={onChangeStart} max={end!} style={{ width: '40%' }} placeholder="最小值" />
      <span style={{ display: 'inline-block', verticalAlign: '-3px', width: '20%', textAlign: 'center' }}>至</span>
      <InputNumber value={end} onChange={onChangeEnd} min={start!} style={{ width: '40%' }} placeholder="最大值" />
    </>
  );
}

export default memo(Page);

const code = `
~~~tsx
import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormHeader } from '@/lib';
import { InputNumber, Button } from 'antd';

function Page() {
  const queryList = useMemo(
    () => [
      {
        name: 'name',
        title: '查询名称',
        formType: 'input',
      },
      {
        name: 'time',
        title: '时间查询',
        formType: 'datePicker',
        dataFormat: (value: any) => {
          return { time: value.startOf('day').format('YYYY-MM-DD HH:mm:ss') }
        },
        properties: {
          style: { width: '100%' },
        },
      },
      {
        name: 'type',
        title: '类型查询',
        formType: 'select',
        options: [
          { value: '1', label: 'AAA' },
          { value: '2', label: 'BBB' },
          { value: '3', label: 'CCC' },
        ],
      },
      {
        name: 'range',
        title: '范围查询',
        // 通过 component 定义要渲染的表单项内容，
        component: <NumberRange />,
        dataFormat: (value: any) => {
          return {
            startNum: value[0],
            endNum: value[1],
          }
        }
      },
    ],
    [],
  );

  // 点击查询和重置按钮后都会触发
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  const extraNodes = useMemo(() => {
    return <Button style={{ marginLeft: '8px' }}>自定义</Button>;
  }, []);

  return (
    <Template markdown={code} title="案例三（支持自定义查询表单项）">
      <ContentFormHeader
        queryList={queryList}
        onSubmit={handleSubmit}
        extraNodes={extraNodes}
      />
    </Template>
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
~~~
`;
