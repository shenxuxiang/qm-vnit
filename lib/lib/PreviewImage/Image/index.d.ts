import React from 'react';
type IProps = {
    src: string;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
    [propName: string]: any;
};
declare const _default: React.ForwardRefExoticComponent<Omit<IProps, "ref"> & React.RefAttributes<unknown>>;
export default _default;
