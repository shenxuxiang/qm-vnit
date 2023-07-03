import React from 'react';
import './index.less';
type IconProps = {
    name: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: any) => void;
    [propName: string]: any;
};
declare function Icon(props: IconProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Icon>;
export default _default;
