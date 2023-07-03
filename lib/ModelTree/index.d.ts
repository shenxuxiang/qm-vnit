import React from 'react';
import './index.less';
export type TreeData = {
    key: string;
    parentKey?: string;
    title: string;
    children?: TreeData[];
    [propName: string]: any;
};
interface ModelTreeProps {
    checkable?: boolean;
    treeData: any[];
    checkedKeys?: string[];
    onChange?: (checkedKeys: string[], allKeys: string[]) => void;
    formatData?: ((treeData: any[]) => TreeData[]) | null;
    filterOption?: boolean | ((data: TreeData[], searchValue: string) => TreeData[]);
    defaultExpandedKeys?: string[];
}
/**
 * 二次封装的 Tree 组件
 * @param filterOption 表示是否支持条件过滤，默认 true。可以自定义过滤方法，默认使用 filterTreeData。
 * @param treeData     组件的数据源，数据格式为：TreeData。
 * @param checkedKeys  受控，被选中的子节点集合。
 * @param checkable    是否展示复选框。
 * @param onChange     事件回调函数，当修改被选中的子节点时触发。
 */
declare function ModelTree(props: ModelTreeProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ModelTree>;
export default _default;
