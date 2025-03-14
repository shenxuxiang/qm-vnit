import React from 'react';
import './index.less';
type IconProps = {
    name: string;
    className?: string;
    [propName: string]: any;
    onClick?: (event: any) => void;
    style?: string | React.CSSProperties;
};
declare function Icon(props: IconProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Icon>;
export default _default;
