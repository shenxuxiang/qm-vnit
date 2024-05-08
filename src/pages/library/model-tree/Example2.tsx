import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import { ModelTree } from '@/lib';
import type { Key } from 'react';

function Example() {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(['1-1-1-1']);
  const [expandeKeys] = useState<Key[]>(['1-1', '1-1-1']);
  const treeRef = useRef<any>();
  const treeData = useMemo(
    () => [
      {
        sid: '1-1',
        name: '1-1',
        children: [
          {
            sid: '1-1-1',
            parentSid: '1-1',
            name: '1-1-1',
            disabled: true,
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
                disabled: true,
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
        disabled: true,
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
            disabled: true,
            children: [
              {
                sid: '1-2-2-1',
                parentSid: '1-2-2',
                name: '1-2-2-1',
                disabled: true,
              },
              {
                sid: '1-2-2-2',
                parentSid: '1-2-2',
                name: '1-2-2-2',
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const handleChange = useCallback((selectedKeys: Key[], allKeys: Key[]) => {
    setSelectedKeys(selectedKeys);
    console.log(selectedKeys, allKeys);
    setTimeout(() => {
      // 可以通过组件实例对象获取所有的 Keys，你也可以使用 getParentKeys(checkedKey) 获取指定节点的所有父级节点
      console.log(treeRef.current.getAllParentKeys());
    }, 1000);
  }, []);

  return (
    <Template markdown={code} title="案例二">
      <ModelTree
        multiple
        ref={treeRef}
        treeData={treeData}
        onSelect={handleChange}
        expandedKeys={expandeKeys}
        selectedKeys={selectedKeys}
        fieldNames={{
          key: 'sid',
          title: 'name',
          children: 'children',
          parentKey: 'parentSid',
        }}
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
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(['1-1-1-1']);
  const [expandeKeys] = useState<Key[]>(['1-1', '1-1-1']);
  const treeRef = useRef<any>();
  const treeData = useMemo(
    () => [
      {
        sid: '1-1',
        name: '1-1',
        children: [
          {
            sid: '1-1-1',
            parentSid: '1-1',
            name: '1-1-1',
            disabled: true,
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
                disabled: true,
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
        disabled: true,
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
            disabled: true,
            children: [
              {
                sid: '1-2-2-1',
                parentSid: '1-2-2',
                name: '1-2-2-1',
                disabled: true,
              },
              {
                sid: '1-2-2-2',
                parentSid: '1-2-2',
                name: '1-2-2-2',
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const handleChange = useCallback((selectedKeys: Key[], allKeys: Key[]) => {
    setSelectedKeys(selectedKeys);
    console.log(selectedKeys, allKeys);
    setTimeout(() => {
      // 可以通过组件实例对象获取所有的 Keys，你也可以使用 getParentKeys(checkedKey) 获取指定节点的所有父级节点
      console.log(treeRef.current.getAllParentKeys());
    }, 1000);
  }, []);

  return (
    <Template markdown={code} title="案例二">
      <ModelTree
        multiple
        ref={treeRef}
        treeData={treeData}
        onSelect={handleChange}
        expandedKeys={expandeKeys}
        selectedKeys={selectedKeys}
        fieldNames={{
          key: 'sid',
          title: 'name',
          children: 'children',
          parentKey: 'parentSid',
        }}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
