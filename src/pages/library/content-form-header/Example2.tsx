import React, { memo, useMemo, useCallback, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormHeader } from '@/lib';
import { Button } from 'antd';
function Page() {
  const [cols, setCols] = useState(2);
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
        name: 'timeRange',
        title: '时间范围',
        formType: 'rangePicker',
        properties: {
          style: { width: '100%' },
        },
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
    return Promise.resolve();
  }, []);

  // 导出功能
  const handleExport = useCallback((values: any) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(values), 1000);
    });
  }, []);

  return (
    <Template markdown={code} title="案例二（指定布局列数，添加导出功能）">
      <Button.Group>
        <Button type={cols === 2 ? 'primary' : 'default'} onClick={() => setCols(2)}>
          2列
        </Button>
        <Button type={cols === 3 ? 'primary' : 'default'} onClick={() => setCols(3)}>
          3列
        </Button>
        <Button type={cols === 4 ? 'primary' : 'default'} onClick={() => setCols(4)}>
          4列
        </Button>
      </Button.Group>

      <ContentFormHeader
        cols={cols}
        showExportButton
        queryList={queryList}
        defaultExpand={false}
        onReset={handleSubmit}
        onExport={handleExport}
        onSubmit={handleSubmit}
      />
    </Template>
  );
}

export default memo(Page);

const code = `
~~~tsx
import React, { memo, useMemo, useCallback, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import { ContentFormHeader } from '@/lib';
import { Button } from 'antd';
function Page() {
  const [cols, setCols] = useState(2);
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
        name: 'timeRange',
        title: '时间范围',
        formType: 'rangePicker',
        properties: {
          style: { width: '100%' },
        },
        dataFormat: (value: any) => {
          return {
            startTime: value[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endTime: value[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
          }
        }
      },
    ],
    [],
  );

  // 点击查询和重置按钮后都会触发
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
    return Promise.resolve();
  }, []);

  // 导出功能
  const handleExport = useCallback((values: any) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(values), 1000);
    });
  }, []);

  return (
    <Template markdown={code} title="案例二（指定布局列数，添加导出功能）">
      <Button.Group>
        <Button type={cols === 2 ? 'primary' : 'default'} onClick={() => setCols(2)}>
          2列
        </Button>
        <Button type={cols === 3 ? 'primary' : 'default'} onClick={() => setCols(3)}>
          3列
        </Button>
        <Button type={cols === 4 ? 'primary' : 'default'} onClick={() => setCols(4)}>
          4列
        </Button>
      </Button.Group>

      <ContentFormHeader
        cols={cols}
        showExportButton
        queryList={queryList}
        defaultExpand={false}
        onReset={handleSubmit}
        onExport={handleExport}
        onSubmit={handleSubmit}
      />
    </Template>
  );
}

export default memo(Page);
~~~
`;
