import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import type { TreeData } from '@/lib/ModelTree';
import { ModelTree } from '@/lib';
import type { Key } from 'react';

function Example() {
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(['1-1', '1-1-1', '1-1-1-2', '1-1-1-1']);
  const [expandeKeys] = useState<Key[]>(['1-1', '1-1-1']);
  const treeRef = useRef<any>();
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

  const handleChange = useCallback((checkedKeys: Key[]) => {
    setCheckedKeys(checkedKeys);
    // 可以通过组件实例对象获取所有的 Keys，你也可以使用 getParentKeys(checkedKey) 获取指定节点的所有父级节点
    console.log(treeRef.current.getAllParentKeys());
  }, []);

  // 注意，当 treeData 不是 PropTreeData 数据类型时，我们需要定义一个函数来对数据格式处理。
  function formatTreeData(sourceList: any[]): TreeData[] {
    return (
      sourceList?.map((item) => {
        const { sid, parentSid, name, children, ...props } = item;
        return {
          key: sid,
          title: name,
          parentKey: parentSid,
          children: children ? formatTreeData(children) : undefined,
          ...props,
        };
      }) ?? []
    );
  }

  return (
    <Template markdown={code} title="案例二（组合节点不支持勾选，支持手动获取选中节点的父节点）">
      <ModelTree
        checkable
        ref={treeRef}
        treeData={treeData}
        onChange={handleChange}
        checkedKeys={checkedKeys}
        expandedKeys={expandeKeys}
        formatTreeData={formatTreeData}
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import type { TreeData } from '@/lib/ModelTree';
import { ModelTree } from '@/lib';
import type { Key } from 'react';

function Example() {
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(['1-1', '1-1-1', '1-1-1-2', '1-1-1-1']);
  const treeRef = useRef<any>();
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

  const handleChange = useCallback((checkedKeys: Key[]) => {
    setCheckedKeys(checkedKeys);
    // 可以通过组件实例对象获取所有的 Keys，你也可以使用 getParentKeys(checkedKey) 获取指定节点的所有父级节点
    console.log(treeRef.current.getAllParentKeys());
  }, []);

  // 注意，当 treeData 不是 PropTreeData 数据类型时，我们需要定义一个函数来对数据格式处理。
  function formatTreeData(sourceList: any[]): TreeData[] {
    return (
      sourceList?.map((item) => {
        const { sid, parentSid, name, children, ...props } = item;
        return {
          key: sid,
          title: name,
          parentKey: parentSid,
          children: children ? formatTreeData(children) : undefined,
          ...props,
        };
      }) ?? []
    );
  }

  return (
    <Template markdown={code} title="案例二（组合节点不支持勾选，支持手动获取选中节点的父节点）">
      <ModelTree
        checkable
        ref={treeRef}
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
