import React from 'react';
import './index.less';
interface IProps {
    children?: React.ReactNode;
    delay?: number;
    spinning: boolean;
}
declare function Spin(props: IProps): React.JSX.Element | null;
declare const _default: React.MemoExoticComponent<typeof Spin>;
export default _default;
