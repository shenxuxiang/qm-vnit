import React, { memo } from 'react';
import './index.less';

type IconProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: any) => void;
  [propName: string]: any;
};

function Icon(props: IconProps) {
  const { name, className, style, onClick, ...others } = props;
  return (
    <i
      {...others}
      style={style}
      onClick={onClick}
      className={`qm-vnit-iconfont qm-vnit-icon-${name}${className ? ' ' + className : ''}`}
    />
  );
}

export default memo(Icon);
