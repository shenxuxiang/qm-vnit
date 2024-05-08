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
    selectedKeys?: Key[];
    expandedKeys?: Key[];
    showFilter?: boolean;
    onExpand?: (expandeKeys: Key[]) => void;
    onCheck?: (checkedKeys: Key[], allKeys: Key[]) => void;
    onSelect?: (selectedKeys: Key[], allKeys: Key[]) => void;
    formatTreeData?: ((treeData: any[]) => TreeData[]) | null;
    fieldNames?: {
        key: string;
        title: string;
        children: string;
        parentKey: string;
    };
    [propName: string]: any;
}
declare const _default: React.ForwardRefExoticComponent<Omit<ModelTreeProps, "ref"> & React.RefAttributes<unknown>>;
export default _default;
