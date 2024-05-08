import React, { memo, useMemo } from 'react';
import { parseStyle } from '@/utils';
import '../assets/font/iconfont.css';

type IconProps = {
  name: string;
  className?: string;
  [propName: string]: any;
  onClick?: (event: any) => void;
  style?: string | React.CSSProperties;
};

function Icon(props: IconProps) {
  const { name, className, style, onClick, ...others } = props;

  const styleObj = useMemo(() => {
    if (typeof style === 'string') {
      return parseStyle(style);
    } else {
      return style;
    }
  }, [style]);

  return (
    <i
      {...others}
      style={styleObj}
      onClick={onClick}
      className={`qm-vnit-iconfont qm-vnit-icon-${name}${className ? ' ' + className : ''}`}
    />
  );
}

export default memo(Icon);
