import React from 'react';
import './index.less';
type NavigationBarProps = {
    activeKey?: string;
    navBarList: NavBarList;
    onChange?: (activeKey: any) => void;
    onDelete?: (sourceList: NavBarList) => void;
};
export type NavBarList = {
    key: string;
    label: string;
    [propName: string]: any;
}[];
declare function NavigationBar(props: NavigationBarProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof NavigationBar>;
export default _default;
