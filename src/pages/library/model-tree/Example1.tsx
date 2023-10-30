import React, { memo, useCallback, useMemo, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import type { TreeData } from '@/lib/ModelTree';
import type { Key } from 'react';
import { ModelTree } from '@/lib';

function Example() {
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
  const handleChange = useCallback((keys: Key[], allKeys: Key[]) => {
    console.log(keys, allKeys);
    setCheckedKeys(keys);
  }, []);

  function formatTreeData(sourceList: any[]): TreeData[] {
    return (
      sourceList?.map((item) => {
        const { id, parentId, name, children, ...props } = item;
        return {
          key: id,
          title: name,
          parentKey: parentId,
          children: children ? formatTreeData(children) : undefined,
          ...props,
        };
      }) ?? []
    );
  }

  return (
    <Template markdown={code} title="案例一">
      <ModelTree
        checkable
        treeData={treeData}
        onChange={handleChange}
        checkedKeys={checkedKeys}
        formatTreeData={formatTreeData}
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
  const handleChange = useCallback((keys: Key[], allKeys: Key[]) => {
    console.log(keys, allKeys);
    setCheckedKeys(keys);
  }, []);

  function formatTreeData(sourceList: any[]): TreeData[] {
    return (
      sourceList?.map((item) => {
        const { id, parentId, name, children, ...props } = item;
        return {
          key: id,
          title: name,
          parentKey: parentId,
          children: children ? formatTreeData(children) : undefined,
          ...props,
        };
      }) ?? []
    );
  }

  return (
    <Template markdown={code} title="案例一">
      <ModelTree
        checkable
        treeData={treeData}
        onChange={handleChange}
        checkedKeys={checkedKeys}
        formatTreeData={formatTreeData}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
