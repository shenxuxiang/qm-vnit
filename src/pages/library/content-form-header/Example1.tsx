import React, { memo, useMemo, useCallback } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormHeader } from '@/lib';
import dayjs from 'dayjs';

function Example() {
  const queryList = useMemo(
    () => [
      {
        name: 'name',
        title: '查询名称',
        formType: 'input',
        // 添加监听事件，当该表单项的值发生改变时触发，
        watch: (...args: any[]) => {
          // form 是表单的实例对象，你可以通过 getFieldValue, setFieldValue, resetFieldValue 方法获取或设置表单
          const [, form] = args;
          form.setFieldValue('time', null);
        },
      },
      {
        name: 'time',
        title: '时间查询',
        formType: 'datePicker',
        // 表单数据格式化，通过 dataFormat 方法将原始表达数据转换成接口需要的内容
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
        name: 'timeRange',
        title: '时间范围',
        formType: 'rangePicker',
        properties: {
          style: { width: '100%' },
        },
        placeholder: ['请选择开始时间', '请选择结束时间'],
        dataFormat: (value: any) => {
          return {
            startTime: value[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endTime: value[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
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

  return (
    <Template markdown={code} title="案例一">
      <ContentFormHeader
        queryList={queryList}
        onSubmit={handleSubmit}
        initialValues={{
          name: 'hello world',
          type: '2',
          time: dayjs('2023-06-07', 'YYYY-MM-DD'),
          timeRange: [dayjs('2023-06-01', 'YYYY-MM-DD'), dayjs('2023-06-10', 'YYYY-MM-DD')],
        }}
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import React, { memo, useMemo, useCallback } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormHeader } from '@/lib';
import dayjs from 'dayjs';

function Example() {
  const queryList = useMemo(
    () => [
      {
        name: 'name',
        title: '查询名称',
        formType: 'input',
        watch: (...args: any[]) => {
          const [, form] = args;
          form.setFieldValue('time', null);
        },
      },
      {
        name: 'time',
        title: '时间查询',
        formType: 'datePicker',
        // 表单数据格式化，通过 dataFormat 方法将原始表达数据转换成接口需要的内容
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
        name: 'timeRange',
        title: '时间范围',
        formType: 'rangePicker',
        properties: {
          style: { width: '100%' },
        },
        placeholder: ['请选择开始时间', '请选择结束时间'],
        dataFormat: (value: any) => {
          return {
            startTime: value[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endTime: value[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
          }
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
    <Template markdown={code} title="案例一">
      <ContentFormHeader
        queryList={queryList}
        onSubmit={handleSubmit}
        initialValues={{
          name: 'hello world',
          type: '2',
          time: dayjs('2023-06-07', 'YYYY-MM-DD'),
          timeRange: [dayjs('2023-06-01', 'YYYY-MM-DD'), dayjs('2023-06-10', 'YYYY-MM-DD')],
        }}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
