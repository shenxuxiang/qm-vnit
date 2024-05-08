import React, { memo, useCallback, useMemo, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import { ModelTree } from '@/lib';
import type { Key } from 'react';

function Example() {
  const [expandedKeys] = useState<Key[]>(['1-1', '1-1-1']);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(['1-1-1-1']);
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
            // 当前节点上不展示 checkbox，所以无法展示选中状态
            checkable: false,
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
            disabled: true,
            children: [
              {
                id: '1-2-2-1',
                parentId: '1-2-2',
                name: '1-2-2-1',
                disabled: true,
              },
              {
                id: '1-2-2-2',
                parentId: '1-2-2',
                name: '1-2-2-2',
                disabled: true,
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
  const handleChange = useCallback((keys: Key[], allKeys: Key[]) => {
    console.log(keys, allKeys);
    setCheckedKeys(keys);
  }, []);

  return (
    <Template markdown={code} title="案例一">
      <ModelTree
        multiple
        checkable
        treeData={treeData}
        onCheck={handleChange}
        checkedKeys={checkedKeys}
        expandedKeys={expandedKeys}
        fieldNames={{
          key: 'id',
          title: 'name',
          children: 'children',
          parentKey: 'parentId',
        }}
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback, useMemo, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import type { TreeData } from '@/lib/ModelTree';
import type { Key } from 'react';
import { ModelTree } from '@/lib';

function Example() {
  const [expandedKeys] = useState<Key[]>(['1-1', '1-1-1']);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(['1-1-1-1']);
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
            // 当前节点上不展示 checkbox，所以无法展示选中状态
            checkable: false,
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
            disabled: true,
            children: [
              {
                id: '1-2-2-1',
                parentId: '1-2-2',
                name: '1-2-2-1',
                disabled: true,
              },
              {
                id: '1-2-2-2',
                parentId: '1-2-2',
                name: '1-2-2-2',
                disabled: true,
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
  const handleChange = useCallback((keys: Key[], allKeys: Key[]) => {
    console.log(keys, allKeys);
    setCheckedKeys(keys);
  }, []);

  return (
    <Template markdown={code} title="案例一">
      <ModelTree
        multiple
        checkable
        treeData={treeData}
        onCheck={handleChange}
        checkedKeys={checkedKeys}
        expandedKeys={expandedKeys}
        fieldNames={{
          key: 'id',
          title: 'name',
          children: 'children',
          parentKey: 'parentId',
        }}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
