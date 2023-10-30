import React from 'react';
import './index.less';
type LoadingProps = {
    open: boolean;
    theme?: 'light' | 'dark' | string;
    size?: 'default' | 'large' | 'small';
};
declare function Loading(props: LoadingProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Loading>;
export default _default;
