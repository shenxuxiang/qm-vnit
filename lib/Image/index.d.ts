import React from 'react';
type IProps = {
    src: string;
    alt?: string;
    className?: string;
    [propName: string]: any;
    style?: React.CSSProperties;
};
declare const _default: React.ForwardRefExoticComponent<Omit<IProps, "ref"> & React.RefAttributes<unknown>>;
export default _default;
