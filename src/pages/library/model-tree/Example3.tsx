import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Template from '@/components/ExampleTemplate';
import type { TreeData } from '@/lib/ModelTree';
import { ModelTree } from '@/lib';
import type { Key } from 'react';

function Example() {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  useEffect(() => {
    setSelectedKeys(() => ['1-1-1-1']);
    setExpandedKeys(() => ['1-1', '1-1-1']);
  }, []);

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
  const handleChangeSelectedKeys = useCallback((keys: Key[], allKeys: Key[]) => {
    console.log(keys, allKeys);
    setSelectedKeys(keys);
  }, []);

  const handleChangeExpandedKeys = useCallback((keys: Key[]) => {
    console.log(keys);
    setExpandedKeys(() => keys);
  }, []);

  const handleAdd = useCallback((event: any) => {
    event.stopPropagation();
    let target = event.target;
    let key = null;
    do {
      target = target.parentNode;
      key = target.getAttribute('data-key');
      if (key) break;
    } while (target.parentNode);

    console.log(key, target);
  }, []);

  const handleEdit = useCallback((event: any) => {
    event.stopPropagation();
    let target = event.target;
    let key = null;
    do {
      target = target.parentNode;
      key = target.getAttribute('data-key');
      if (key) break;
    } while (target.parentNode);

    console.log(key, target);
  }, []);

  const formatTreeData = useCallback(
    (treeData: any[]): TreeData[] => {
      return treeData.map((item: any) => {
        return {
          key: item.id,
          title: item.name,
          renderItem: (context: React.ReactNode, record: TreeData) => (
            <div
              data-key={record.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ flex: 1 }}>{context}</div>

              <PlusOutlined
                title="新增"
                onClick={handleAdd}
                className="data-manage-page-icon"
                style={{ fontSize: 14, marginLeft: 20, color: '#1890ff' }}
              />

              <EditOutlined
                title="编辑"
                onClick={handleEdit}
                className="data-manage-page-icon"
                style={{ fontSize: 14, marginLeft: 20, color: '#1890ff' }}
              />
            </div>
          ),
          parentKey: item.parentId,
          children: !item.children || item.children.length <= 0 ? undefined : formatTreeData(item.children),
        };
      });
    },
    [handleAdd, handleEdit],
  );

  return (
    <Template markdown={code} title="案例三">
      <ModelTree
        showLine
        multiple
        treeData={treeData}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        formatTreeData={formatTreeData}
        onSelect={handleChangeSelectedKeys}
        onExpand={handleChangeExpandedKeys}
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Template from '@/components/ExampleTemplate';
import type { TreeData } from '@/lib/ModelTree';
import { ModelTree } from '@/lib';
import { isEmpty } from '@/utils';
import type { Key } from 'react';

function Example() {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  useEffect(() => {
    setSelectedKeys(() => ['1-1-1-1']);
    setExpandedKeys(() => ['1-1', '1-1-1']);
  }, []);

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
  const handleChangeSelectedKeys = useCallback((keys: Key[], allKeys: Key[]) => {
    console.log(keys, allKeys);
    setSelectedKeys(keys);
  }, []);

  const handleChangeExpandedKeys = useCallback((keys: Key[]) => {
    console.log(keys);
    setExpandedKeys(() => keys);
  }, []);

  const handleAdd = useCallback((event: any) => {
    event.stopPropagation();
    let target = event.target;
    let key = null;
    do {
      target = target.parentNode;
      key = target.getAttribute('data-key');
      if (key) break;
    } while (target.parentNode);

    console.log(key, target);
  }, []);

  const handleEdit = useCallback((event: any) => {
    event.stopPropagation();
    let target = event.target;
    let key = null;
    do {
      target = target.parentNode;
      key = target.getAttribute('data-key');
      if (key) break;
    } while (target.parentNode);

    console.log(key, target);
  }, []);

  const formatTreeData = useCallback(
    (treeData: any[]): TreeData[] => {
      return treeData.map((item: any) => {
        return {
          key: item.id,
          title: item.name,
          renderItem: (context: React.ReactNode, record: TreeData) => (
            <div
              data-key={record.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ flex: 1 }}>{context}</div>

              <PlusOutlined
                title="新增"
                onClick={handleAdd}
                className="data-manage-page-icon"
                style={{ fontSize: 14, marginLeft: 20, color: '#1890ff' }}
              />

              <EditOutlined
                title="编辑"
                onClick={handleEdit}
                className="data-manage-page-icon"
                style={{ fontSize: 14, marginLeft: 20, color: '#1890ff' }}
              />
            </div>
          ),
          parentKey: item.parentId,
          children: !item.children || item.children.length <= 0 ? undefined : formatTreeData(item.children),
        };
      });
    },
    [handleAdd, handleEdit],
  );

  return (
    <Template markdown={code} title="案例三">
      <ModelTree
        showLine
        multiple
        treeData={treeData}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        formatTreeData={formatTreeData}
        onSelect={handleChangeSelectedKeys}
        onExpand={handleChangeExpandedKeys}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
