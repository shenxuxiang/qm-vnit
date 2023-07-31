import React, { memo, useMemo, useCallback } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { ContentFormHead } from '@/lib';
import dayjs from 'dayjs';
import { Card } from 'antd';

function Example() {
  const queryList = useMemo(
    () => [
      {
        name: 'name',
        label: '查询名称',
        formType: 'input',
        watch: (...args: any[]) => {
          const [, form] = args;
          form.setFieldValue('time', null);
        },
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
        name: 'timeRange',
        label: '时间范围',
        formType: 'rangePicker',
        properties: {
          style: { width: '100%' },
        },
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
      <p style={{ margin: '0 0 20px' }}>案例一</p>
      <div style={{ padding: '20px', background: '#f8f8f8' }}>
        <ContentFormHead
          queryList={queryList}
          onSubmit={handleSubmit}
          initialValues={{
            name: 'hello world',
            type: '2',
            time: dayjs('2023-06-07', 'YYYY-MM-DD'),
            timeRange: [dayjs('2023-06-01', 'YYYY-MM-DD'), dayjs('2023-06-10', 'YYYY-MM-DD')],
          }}
        />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useMemo, useCallback } from 'react';
import { ContentFormHead } from 'qm-vnit';
import dayjs from 'dayjs';

function Example() {
  const queryList = useMemo(() => [
    {
      name: 'name',
      label: '查询名称',
      formType: 'input',
      watch: (...args: any[]) => {
        const [ , form ] = args;
        form.setFieldValue('time', null);
      }
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
      name: 'timeRange',
      label: '时间范围',
      formType: 'rangePicker',
      properties: {
        style: { width: '100%' }
      }
    },
  ], []);

  // 点击查询和重置按钮后都会触发
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f8f8f8' }}>
      <ContentFormHead
        queryList={queryList}
        onSubmit={handleSubmit}
        initialValues={{
          name: 'hello world',
          type: '2',
          time: dayjs('2023-06-07', 'YYYY-MM-DD'),
          timeRange: [ dayjs('2023-06-01', 'YYYY-MM-DD'), dayjs('2023-06-10', 'YYYY-MM-DD') ]
        }}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
