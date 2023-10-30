import React, {
  forwardRef,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useDeferredValue,
  useImperativeHandle,
} from 'react';
import useReducer from '@/utils/useReducer';
import type { Key } from 'react';
import { isArray } from '@/utils';
import { Input, Tree } from 'antd';
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
  expandedKeys?: Key[];
  showFilter?: boolean;
  onExpand?: (expandeKeys: Key[]) => void;
  onChange?: (checkedKeys: Key[], allKeys: Key[]) => void;
  // 格式化数据，在数据需要进行转换时可以是使用
  formatTreeData?: ((treeData: any[]) => TreeData[]) | null;
}

function initialState() {
  return {
    // 过滤内容
    searchValue: '',
    // 选中的节点数组
    checkedKeys: [] as React.Key[],
    // Tree 组件的展开项
    expandedKeys: [] as React.Key[],
    // 扁平的 TreeData 数组
    flatTreeData: new Map() as FlatTreeData,
  };
}

/**
 * 二次封装的 Tree 组件
 * @param filterOption 表示是否支持条件过滤，默认 true。可以自定义过滤方法，默认使用 filterTreeData。
 * @param treeData     组件的数据源，数据格式为：TreeData。
 * @param checkedKeys  受控，被选中的子节点集合。
 * @param checkable    是否展示复选框。
 * @param onChange     事件回调函数，当修改被选中的子节点时触发。
 */
function ModelTree(props: ModelTreeProps, ref: any) {
  const [state, setState] = useReducer(initialState);
  const { searchValue, checkedKeys, expandedKeys, flatTreeData } = state;

  const {
    onChange,
    onExpand,
    checkable,
    formatTreeData,
    showFilter = true,
    treeData: propTreeData,
    checkedKeys: propCheckedKeys,
    expandedKeys: propsExpandeKeys,
  } = props;

  const deferSearchValue = useDeferredValue(searchValue);

  // 是否组件内容修改了 checkedKeys
  const isInternalModifiedCheckedKeys = useRef(false);
  const isInternalModifiedExpandeKeys = useRef(false);

  useEffect(() => {
    if (propCheckedKeys === undefined) {
      return;
    } else if (isInternalModifiedCheckedKeys.current) {
      isInternalModifiedCheckedKeys.current = false;
      return;
    } else {
      setState({ checkedKeys: propCheckedKeys });
    }
  }, [propCheckedKeys]);

  useEffect(() => {
    if (propsExpandeKeys === undefined) {
      return;
    } else if (isInternalModifiedExpandeKeys.current) {
      isInternalModifiedExpandeKeys.current = false;
      return;
    } else {
      setState({ expandedKeys: propsExpandeKeys });
    }
  }, [propsExpandeKeys]);

  const treeData = useMemo(() => {
    // 如果 formatTreeData 不是一个函数，那表示 propTreeData 数据类型就是 TreeData[], 所以无需再进行格式化处理了。
    const treeData = typeof formatTreeData === 'function' ? formatTreeData(propTreeData) : propTreeData;
    setState({ flatTreeData: computedFlatTreeData(treeData) });
    return treeData;
  }, [propTreeData]);

  // 实时计算 Tree 组件的数据源
  const computeTreeData = useMemo(() => {
    if (!deferSearchValue) return treeData;

    return filterTreeData(treeData, deferSearchValue);
  }, [treeData, deferSearchValue]);

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
    // 无需去重，Tree 组件内部会进行处理
    setState({ expandedKeys: newExpandedKeys });
  }, [flatTreeData, deferSearchValue]);

  useImperativeHandle(
    ref,
    () => ({
      getParentKeys: (key: Key) => getParentKeys(key, flatTreeData),
      getAllParentKeys: () => {
        const keys: Key[] = [];
        checkedKeys.forEach((key: Key) => keys.push(...getParentKeys(key, flatTreeData)));

        return [...new Set(keys)];
      },
    }),
    [checkedKeys, flatTreeData],
  );

  // 点击 Tree 组件的复选框时触发
  const handleTreeCheck = useCallback(
    (checkedKeys: any) => {
      isInternalModifiedCheckedKeys.current = true;
      setState({ checkedKeys });

      const allKeys: Key[] = [];
      checkedKeys.forEach((key: Key) => allKeys.push(...getParentKeys(key, flatTreeData)));

      onChange?.(checkedKeys, [...new Set(allKeys)]);
    },
    [flatTreeData],
  );

  // 手动展开/折叠 Tree 组件。
  const handleTreeExpand = useCallback((newExpandedKeys: React.Key[]) => {
    isInternalModifiedExpandeKeys.current = false;
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
          treeData={computeTreeData}
          onExpand={handleTreeExpand}
          expandedKeys={expandedKeys}
        />
      </div>
    </>
  );
}

export default forwardRef(ModelTree);

/**
 * 过滤、筛选出目标节点，匹配的内容将被标注为红色
 * @param treeData    Tree 组件的 treeData
 * @param searchValue 查询条件
 */
function filterTreeData(treeData: TreeData[], searchValue: string): TreeData[] {
  return treeData.map((item) => {
    const { title, key, parentKey, children, ...props } = item;

    let newTitle: any = title;

    if (title.indexOf(searchValue) >= 0) {
      newTitle = [];
      const ary = title.split(searchValue);
      const length = ary.length;

      for (let i = 0; i < length; i++) {
        ary[i] && newTitle.push(ary[i]);
        if (i < length - 1) {
          // 相邻的两个元素之间才会添加
          newTitle.push(
            <span className="qm-model-tree-node-rich" key={i}>
              {searchValue}
            </span>,
          );
        }
      }

      newTitle = <span>{newTitle}</span>;
    }

    if (children?.length) {
      return {
        key,
        parentKey,
        title: newTitle,
        children: filterTreeData(children, searchValue),
        ...props,
      };
    } else {
      return { title: newTitle, key, parentKey, ...props };
    }
  });
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
  // 排序
  return result;
}
