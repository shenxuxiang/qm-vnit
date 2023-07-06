import React, { memo, useMemo, useCallback, useState } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { ContentFormHead } from '@/lib';
import { Button, Card } from 'antd';

function Page() {
  const [cols, setCols] = useState(2);
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

  // 导出功能
  const handleExport = useCallback((values: any) => {
    console.log(values);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例二（指定列数）</p>
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
      <div style={{ padding: '20px', background: '#f8f8f8' }}>
        <ContentFormHead
          cols={cols}
          showExportButton
          queryList={queryList}
          defaultExpand={false}
          onExport={handleExport}
          onSubmit={handleSubmit}
        />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Page);

const code = `
~~~js
import React, { memo, useMemo, useCallback, useState } from 'react';
import { ContentFormHead } from 'qm-vnit';
import { Button } from 'antd';

function Page() {
  const [ cols, setCols ] = useState(2);
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

  // 导出功能
  const handleExport = useCallback((values: any) => {
    console.log(values);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f8f8f8' }}>
      <Button.Group >
        <Button type={cols === 2 ? 'primary' : 'default'} onClick={() => setCols(2)}>2</Button>
        <Button type={cols === 3 ? 'primary' : 'default'} onClick={() => setCols(3)}>3</Button>
        <Button type={cols === 4 ? 'primary' : 'default'} onClick={() => setCols(4)}>4</Button>
      </Button.Group>
      <ContentFormHead
        // 如果指定了 rols 组件布局不再随着屏幕尺寸大小的变化而发生改变
        cols={cols}
        showExportButton
        queryList={queryList}
        defaultExpand={false}
        onExport={handleExport}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default memo(Page);


~~~
`;
