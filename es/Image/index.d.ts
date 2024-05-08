import React from 'react';
type IProps = {
    src: string;
    alt?: string;
    lazy?: boolean;
    className?: string;
    [propName: string]: any;
    style?: string | React.CSSProperties;
};
declare const _default: React.ForwardRefExoticComponent<Omit<IProps, "ref"> & React.RefAttributes<unknown>>;
export default _default;
