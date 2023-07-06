import React, { memo, useCallback, useMemo, useState } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { ModelTree } from '@/lib';
import type { TreeData } from '@/lib/ModelTree';

function Example() {
  const [checkedKeys, setCheckedKeys] = useState(['1-1', '1-1-1', '1-1-1-2', '1-1-1-1']);
  const treeData = useMemo(
    () => [
      {
        sid: '1-1',
        title: '1-1',
        // 当前节点上不展示 checkbox，所以无法展示选中状态
        checkable: false,
        children: [
          {
            sid: '1-1-1',
            parentSid: '1-1',
            name: '1-1-1',
            checkable: false,
            children: [
              {
                sid: '1-1-1-1',
                parentSid: '1-1-1',
                name: '1-1-1-1',
              },
              {
                sid: '1-1-1-2',
                parentSid: '1-1-1',
                name: '1-1-1-2',
              },
            ],
          },
          {
            sid: '1-1-2',
            parentSid: '1-1',
            name: '1-1-2',
          },
          {
            sid: '1-1-3',
            parentSid: '1-1',
            name: '1-1-3',
          },
        ],
      },
      {
        sid: '1-2',
        name: '1-2',
        checkable: false,
        children: [
          {
            sid: '1-2-1',
            parentSid: '1-2',
            name: '1-2-1',
          },
          {
            sid: '1-2-2',
            parentSid: '1-2',
            name: '1-2-2',
            checkable: false,
            children: [
              {
                sid: '1-2-2-1',
                parentSid: '1-2-2',
                name: '1-2-2-1',
              },
              {
                sid: '1-2-2-2',
                parentSid: '1-2-2',
                name: '1-2-2-2',
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const handleChange = useCallback((checkedKeys: string[]) => {
    setCheckedKeys(checkedKeys);
  }, []);

  // 注意，当 treeData 不是 PropTreeData 数据类型时，我们需要定义一个函数来对数据格式处理。
  function formatData(sourceList: any[]): TreeData[] {
    return (
      sourceList?.map((item) => {
        const { sid, parentSid, name, children, ...props } = item;
        return {
          key: sid,
          title: name,
          parentKey: parentSid,
          children: children ? formatData(children) : undefined,
          ...props,
        };
      }) ?? []
    );
  }

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例二（组合节点不支持勾选）</p>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <ModelTree checkable treeData={treeData} onChange={handleChange} formatData={formatData} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback, useMemo, useState } from 'react';
import { ModelTree } from 'qm-vnit';
import type { TreeData } from 'qm-vnit/ModelTree';

function Example() {
  const [ checkedKeys, setCheckedKeys ] = useState(['1-1', '1-1-1', '1-1-1-2', '1-1-1-1']);
  const treeData = useMemo(() => [
    {
      sid: '1-1',
      title: '1-1',
      // 当前节点上不展示 checkbox，所以无法展示选中状态
      checkable: false,
      children: [
        {
          sid: '1-1-1',
          parentSid: '1-1',
          name: '1-1-1',
          checkable: false,
          children: [
            {
              sid: '1-1-1-1',
              parentSid: '1-1-1',
              name: '1-1-1-1',
            },
            {
              sid: '1-1-1-2',
              parentSid: '1-1-1',
              name: '1-1-1-2',
            },
          ]
        },
        {
          sid: '1-1-2',
          parentSid: '1-1',
          name: '1-1-2',
        },
        {
          sid: '1-1-3',
          parentSid: '1-1',
          name: '1-1-3',
        },
      ]
    },
    {
      sid: '1-2',
      name: '1-2',
      checkable: false,
      children: [
        {
          sid: '1-2-1',
          parentSid: '1-2',
          name: '1-2-1',
        },
        {
          sid: '1-2-2',
          parentSid: '1-2',
          name: '1-2-2',
          checkable: false,
          children: [
            {
              sid: '1-2-2-1',
              parentSid: '1-2-2',
              name: '1-2-2-1',
            },
            {
              sid: '1-2-2-2',
              parentSid: '1-2-2',
              name: '1-2-2-2',
            },
          ]
        },
      ]
    },
  ], []);

  const handleChange = useCallback((checkedKeys: string[]) => {
    setCheckedKeys(checkedKeys);
  }, []);

  // 注意，当 treeData 不是 PropTreeData 数据类型时，我们需要定义一个函数来对数据格式进行处理，并返回 TreeDate[] 类型的数据格式。
  // 该方法只在 treeData 发生变化时执行，不会在组件 re-render 时都执行，所以不需要担心性能问题。
  function formatData(sourceList: any[]): TreeData[] {
    return (
      sourceList?.map((item) => {
        const { sid, parentSid, name, children, ...props } = item;
        return {
          key: sid,
          title: name,
          parentKey: parentSid,
          children: children ? formatData(children) : undefined,
          ...props,
        };
      }) ?? []
    );
  }

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <ModelTree
        checkable
        treeData={treeData}
        onChange={handleChange}
        formatData={formatData}
        checkedKeys={checkedKeys}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
