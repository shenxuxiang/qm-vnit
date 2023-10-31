import React from 'react';
import type { Key } from 'react';
import './index.less';
export type TreeData = {
    key: Key;
    title: string;
    parentKey?: Key;
    children?: TreeData[];
    [propName: string]: any;
};
interface ModelTreeProps {
    treeData: any[];
    checkable?: boolean;
    checkedKeys?: Key[];
    expandedKeys?: Key[];
    showFilter?: boolean;
    onExpand?: (expandeKeys: Key[]) => void;
    onChange?: (checkedKeys: Key[], allKeys: Key[]) => void;
    formatTreeData?: ((treeData: any[]) => TreeData[]) | null;
}
declare const _default: React.ForwardRefExoticComponent<ModelTreeProps & React.RefAttributes<unknown>>;
export default _default;
