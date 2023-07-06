import React, { memo, useCallback, useMemo, useState } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { ModelTree } from '@/lib';

function Example() {
  const [checkedKeys, setCheckedKeys] = useState(['1-1-1-1']);
  const treeData = useMemo(
    () => [
      {
        id: '1-1',
        name: '1-1',
        children: [
          {
            id: '1-1-1',
            parentId: '1-1',
            name: '1-1-1',
            children: [
              {
                id: '1-1-1-1',
                parentId: '1-1-1',
                name: '1-1-1-1',
              },
              {
                id: '1-1-1-2',
                parentId: '1-1-1',
                name: '1-1-1-2',
              },
            ],
          },
          {
            id: '1-1-2',
            parentId: '1-1',
            name: '1-1-2',
          },
          {
            id: '1-1-3',
            parentId: '1-1',
            name: '1-1-3',
          },
        ],
      },
      {
        id: '1-2',
        name: '1-2',
        children: [
          {
            id: '1-2-1',
            parentId: '1-2',
            name: '1-2-1',
          },
          {
            id: '1-2-2',
            parentId: '1-2',
            name: '1-2-2',
            disableCheckbox: true,
            children: [
              {
                id: '1-2-2-1',
                parentId: '1-2-2',
                name: '1-2-2-1',
              },
              {
                id: '1-2-2-2',
                parentId: '1-2-2',
                name: '1-2-2-2',
              },
            ],
          },
        ],
      },
      {
        id: '1-3',
        name: '1-3',
      },
      {
        id: '1-4',
        name: '1-4',
      },
    ],
    [],
  );

  /**
   * @param keys 表示当前选中的节点的 key
   * @param allKeys 表示当前选中的节点的 key，以及包含它们的所有父级（祖先）节点的key。
   */
  const handleChange = useCallback((keys: string[], allKeys: string[]) => {
    console.log(keys, allKeys);
    setCheckedKeys(keys);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例一</p>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <ModelTree checkable treeData={treeData} onChange={handleChange} checkedKeys={checkedKeys} />
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

function Example() {
  const [ checkedKeys, setCheckedKeys ] = useState(['1-1-1-1']);
  const treeData = useMemo(() => [
    {
      id: '1-1',
      name: '1-1',
      children: [
        {
          id: '1-1-1',
          parentId: '1-1',
          name: '1-1-1',
          children: [
            {
              id: '1-1-1-1',
              parentId: '1-1-1',
              name: '1-1-1-1',
            },
            {
              id: '1-1-1-2',
              parentId: '1-1-1',
              name: '1-1-1-2',
            },
          ]
        },
        {
          id: '1-1-2',
          parentId: '1-1',
          name: '1-1-2',
        },
        {
          id: '1-1-3',
          parentId: '1-1',
          name: '1-1-3',
        },
      ]
    },
    {
      id: '1-2',
      name: '1-2',
      children: [
        {
          id: '1-2-1',
          parentId: '1-2',
          name: '1-2-1',
        },
        {
          id: '1-2-2',
          parentId: '1-2',
          name: '1-2-2',
          disableCheckbox: true,
          children: [
            {
              id: '1-2-2-1',
              parentId: '1-2-2',
              name: '1-2-2-1',
            },
            {
              id: '1-2-2-2',
              parentId: '1-2-2',
              name: '1-2-2-2',
            },
          ]
        },
      ]
    },
    {
      id: '1-3',
      name: '1-3',
    },
    {
      id: '1-4',
      name: '1-4',
    }
  ], []);

  /**
   * @param keys 表示当前选中的节点的 key
   * @param allKeys 表示当前选中的节点的 key，以及包含它们的所有父级（祖先）节点的key。
  */
  const handleChange = useCallback((keys: string[], allKeys: string[]) => {
    console.log(keys, allKeys);
    setCheckedKeys(keys);
  }, []);

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <ModelTree
        checkable
        treeData={treeData}
        onChange={handleChange}
        checkedKeys={checkedKeys}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
