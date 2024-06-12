import React, {
  useMemo,
  useEffect,
  forwardRef,
  useCallback,
  useDeferredValue,
  useImperativeHandle,
  useTransition,
} from 'react';
import useReducer from '@/utils/useReducer';
import { isArray, objectIs } from '@/utils';
import { Input, Tree } from 'antd';
import type { Key } from 'react';
import './index.less';

export type TreeData = {
  key: Key;
  title: string;
  parentKey?: Key;
  children?: TreeData[];
  [propName: string]: any;
};

type FlatTreeData = Map<Key, Pick<TreeData, 'key' | 'title' | 'parentKey'>>;

interface ModelTreeProps {
  treeData: any[];
  checkable?: boolean;
  checkedKeys?: Key[];
  selectedKeys?: Key[];
  expandedKeys?: Key[];
  showFilter?: boolean;
  onExpand?: (expandeKeys: Key[]) => void;
  onCheck?: (checkedKeys: Key[], allKeys: Key[]) => void;
  onSelect?: (selectedKeys: Key[], allKeys: Key[]) => void;
  // 格式化数据，在数据需要进行转换时可以是使用
  formatTreeData?: ((treeData: any[]) => TreeData[]) | null;
  fieldNames?: {
    key: string;
    title: string;
    children: string;
    parentKey: string;
  };
  [propName: string]: any;
}

function initialState() {
  return {
    // 过滤内容
    searchValue: '',
    // 选中的节点数组
    checkedKeys: [] as React.Key[],
    selectedKeys: [] as React.Key[],
    // Tree 组件的展开项
    expandedKeys: [] as React.Key[],
    // 扁平的 TreeData 数组
    flatTreeData: new Map() as FlatTreeData,
  };
}

/**
 * 二次封装的 Tree 组件
 * @param treeData       组件的数据源，数据格式为：TreeData
 * @param onLine         是否展示连接线
 * @param multiple       支持点选多个节点（节点本身）
 * @param formatTreeData treeData 格式化函数，将 treeData 转化成 TreeData[] 格式
 * @param fieldNames     自定义节点 title、key、children、parentKey 的字段
 * @param checkedKeys    受控，被选中的子节点集合
 * @param selectedKeys   受控，被选中的子节点集合
 * @param checkable      是否展示复选框
 * @param onCheck        事件回调函数
 * @param onSelect       事件回调函数
 */
function ModelTree(props: ModelTreeProps, ref: any) {
  const [state, setState] = useReducer(initialState);
  const { searchValue, checkedKeys, expandedKeys, selectedKeys, flatTreeData } = state;

  const {
    onCheck,
    onSelect,
    onExpand,
    checkable,
    fieldNames,
    formatTreeData,
    showFilter = true,
    treeData: propTreeData,
    checkedKeys: propCheckedKeys,
    expandedKeys: propsExpandeKeys,
    selectedKeys: propsSelectedKeys,
    ...restProps
  } = props;

  const [, startTransition] = useTransition();
  const deferSearchValue = useDeferredValue(searchValue);

  useEffect(() => {
    if (propCheckedKeys === undefined) {
      return;
    } else {
      setState((prev) => {
        if (objectIs(prev.checkedKeys, propCheckedKeys)) {
          return null;
        } else {
          return { checkedKeys: propCheckedKeys };
        }
      });
    }
  }, [propCheckedKeys]);

  useEffect(() => {
    if (propsSelectedKeys === undefined) {
      return;
    } else {
      setState((prev) => {
        if (objectIs(prev.selectedKeys, propsSelectedKeys)) {
          return null;
        } else {
          return { selectedKeys: propsSelectedKeys };
        }
      });
    }
  }, [propsSelectedKeys]);

  useEffect(() => {
    if (propsExpandeKeys === undefined) {
      return;
    } else {
      setState((prev) => {
        if (objectIs(prev.expandedKeys, propsExpandeKeys)) {
          return null;
        } else {
          return { expandedKeys: propsExpandeKeys };
        }
      });
    }
  }, [propsExpandeKeys]);

  // 将 treeData 转换成 TreeData 格式
  const rawTreeData = useMemo(() => {
    let treeData = propTreeData;

    if (typeof formatTreeData === 'function') {
      treeData = formatTreeData(propTreeData);
    } else if (fieldNames) {
      treeData = computedTreeData(propTreeData, fieldNames);
    }

    startTransition(() => setState({ flatTreeData: computedFlatTreeData(treeData) }));
    return treeData as TreeData[];
  }, [propTreeData]);

  // 实时计算 Tree 组件的数据源
  const treeDataSource = useMemo(() => {
    return filterTreeData(rawTreeData, deferSearchValue);
  }, [rawTreeData, deferSearchValue]);

  useEffect(() => {
    if (!deferSearchValue) return;
    // 根据条件过滤出目标节点的父节点的 key。
    const newExpandedKeys: React.Key[] = [];
    flatTreeData.forEach((item) => {
      if (item.title.indexOf(deferSearchValue) > -1) {
        const parentkeys = getParentKeys(item.key, flatTreeData);
        parentkeys && newExpandedKeys.push(...parentkeys);
      }
    });

    setState({ expandedKeys: [...new Set(newExpandedKeys)] });
  }, [flatTreeData, deferSearchValue]);

  useImperativeHandle(
    ref,
    () => ({
      getParentKeys: (key: Key) => getParentKeys(key, flatTreeData),
      getAllParentKeys: () => {
        const keys: Key[] = [];
        if (checkable) {
          checkedKeys.forEach((key: Key) => keys.push(...getParentKeys(key, flatTreeData)));
        } else {
          selectedKeys.forEach((key: Key) => keys.push(...getParentKeys(key, flatTreeData)));
        }

        return [...new Set(keys)];
      },
    }),
    [checkedKeys, selectedKeys, flatTreeData, checkable],
  );

  // 点击 Tree 组件的复选框时触发
  const handleTreeCheck = useCallback(
    (checkedKeys: any) => {
      setState({ checkedKeys, selectedKeys: checkedKeys });

      const allKeys: Key[] = [];
      checkedKeys.forEach((key: Key) => allKeys.push(...getParentKeys(key, flatTreeData)));

      onCheck?.(checkedKeys, [...new Set(allKeys)]);
    },
    [flatTreeData],
  );

  const handleTreeSelect = useCallback(
    (selectedKeys: Key[]) => {
      setState({ selectedKeys });

      const allKeys: Key[] = [];
      selectedKeys.forEach((key: Key) => allKeys.push(...getParentKeys(key, flatTreeData)));

      onSelect?.(selectedKeys, [...new Set(allKeys)]);
    },
    [flatTreeData],
  );

  // 手动展开/折叠 Tree 组件。
  const handleTreeExpand = useCallback((newExpandedKeys: React.Key[]) => {
    setState({ expandedKeys: newExpandedKeys });
    onExpand?.(newExpandedKeys);
  }, []);

  const handleSearchChange = useCallback((event: any) => {
    setState({ searchValue: event.target.value.trim() });
  }, []);

  return (
    <>
      {showFilter ? (
        <Input.Search style={{ marginBottom: 8 }} onChange={handleSearchChange} placeholder="请输入关键字进行过滤" />
      ) : null}
      <div className="qm-model-tree">
        <Tree
          checkable={checkable}
          onCheck={handleTreeCheck}
          checkedKeys={checkedKeys}
          treeData={treeDataSource}
          selectedKeys={selectedKeys}
          onSelect={handleTreeSelect}
          onExpand={handleTreeExpand}
          expandedKeys={expandedKeys}
          {...restProps}
        />
      </div>
    </>
  );
}

export default forwardRef(ModelTree);

// 对匹配的文本进行着色
function computedTitle(title: string, filterText: string) {
  let newTitle: any = title;

  if (!filterText) {
    return newTitle;
  } else if (title.indexOf(filterText) >= 0) {
    newTitle = [];
    const ary = title.split(filterText);
    const length = ary.length;

    for (let i = 0; i < length; i++) {
      ary[i] && newTitle.push(ary[i]);
      if (i < length - 1) {
        // 相邻的两个元素之间才会添加
        newTitle.push(
          <span className="qm-model-tree-node-rich" key={i}>
            {filterText}
          </span>,
        );
      }
    }

    newTitle = <span>{newTitle}</span>;
  }

  return newTitle as React.ReactNode;
}

/**
 * 遍历所有节点，如果节点的 title 与 filterText 匹配，则将匹配的部分进行着色渲染
 * @param tree       Tree 组件的 treeData
 * @param filterText 查询条件
 */
function filterTreeData(tree: TreeData | TreeData[], filterText: string) {
  const root = [];
  const parentNodes = [];
  const stack = isArray(tree) ? [...tree] : [tree];

  /**
   * 使用深度优先遍历的方法进行遍历
   * 每次遍历节点时，都需要对 parentNodes 集合的最后一项 last 进行验证，是否为当前节点的 parentNode；
   * 如果 last 不是当前节点的 parentNode，那么就 pop() 掉 last，直到满足条件；
   * 这种情况一般出现在一条分支遍历结束后，并开始遍历其他分支的节点（例如：祖先节点是同一个节点，如图一中 B ==> C）时才会出现。
   * 找到当前节点的父节点，并将当前节点的副本添加到其父节点的 children 集合中的。
   */
  while (stack.length) {
    let currentParent = null;
    const { title, key, parentKey, renderItem, children = [], ...resetProps } = stack.shift()!;

    while (parentNodes.length) {
      const last = parentNodes.slice(-1)[0];
      if (last.key === parentKey) {
        currentParent = last;
        break;
      } else {
        parentNodes.pop();
      }
    }

    const item: TreeData = {
      ...resetProps,
      key,
      parentKey,
      title: computedTitle(title as string, filterText),
    };

    if (typeof renderItem === 'function') item.title = renderItem(item.title, item);

    // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
    if (currentParent) {
      if (!currentParent.children) currentParent.children = [];
      currentParent.children.push(item);
    } else {
      root.push(item);
    }

    let length = children.length;

    if (length > 0) parentNodes.push(item);

    while (length--) {
      stack.unshift(children[length]);
    }
  }

  return root;
}

/**
 * 根据当前节点的 key 找到所有的父级（祖先）节点（的 key）
 * @param key 当前节点的 key
 * @param data 所属有树节点的集合
 */
function getParentKeys(key: Key, flatTreeData: FlatTreeData) {
  const keys: Key[] = [];
  while (flatTreeData.has(key)) {
    keys.push(key);

    key = flatTreeData.get(key)!.parentKey!;
  }

  return keys;
}

/**
 * 将 TreeData 数据拉平为一维数组
 * @param tree treeData
 */
function computedFlatTreeData(tree: TreeData | TreeData[]): FlatTreeData {
  const stack: TreeData[] = isArray(tree) ? [...tree] : [tree];
  const result = new Map() as FlatTreeData;
  while (stack.length) {
    const { key, parentKey, title, children } = stack.shift()!;
    result.set(key, { title, key, parentKey });
    if (!children?.length) continue;
    for (let i = 0; i < children.length; i++) {
      stack.unshift(children[i]);
    }
  }
  return result;
}

function computedTreeData(tree: any, fieldNames: any) {
  const root = [];
  const parentNodes = [];
  const stack = isArray(tree) ? [...tree] : [tree];
  const { key: keyLabel, title: titleLabel, children: childrenLabel, parentKey: parentKeyLabel } = fieldNames;

  while (stack.length) {
    let currentParent = null;
    const item = stack.shift()!;

    while (parentNodes.length) {
      const last = parentNodes.slice(-1)[0];
      if (last.key === item[parentKeyLabel]) {
        currentParent = last;
        break;
      } else {
        parentNodes.pop();
      }
    }

    const node: TreeData = {
      ...item,
      key: item[keyLabel],
      title: item[titleLabel],
      parentKey: item[parentKeyLabel],
    };

    delete node[childrenLabel];

    // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
    if (currentParent) {
      if (!currentParent.children) currentParent.children = [];
      currentParent.children.push(node);
    } else {
      root.push(node);
    }

    const children = item[childrenLabel] || [];
    let length = children.length;

    if (length > 0) parentNodes.push(node);

    while (length--) {
      stack.unshift(children[length]);
    }
  }

  return root;
}
