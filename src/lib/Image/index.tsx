import React, { useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import imgURL from '@/lib/assets/images/default.svg';
import intersectionImage from './intersection';
import { parseStyle } from '@/utils';

type IProps = {
  src: string;
  alt?: string;
  lazy?: boolean;
  className?: string;
  [propName: string]: any;
  style?: string | React.CSSProperties;
};

function Image(props: IProps, ref: any) {
  const { src, alt, className, style, lazy = true, ...restProps } = props;
  const imageRef = useRef<any>();

  useEffect(() => {
    lazy && intersectionImage.addElement(imageRef.current, src);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      instance: imageRef.current,
    }),
    [],
  );

  const styleObj = useMemo(() => {
    if (typeof style === 'string') {
      return parseStyle(style);
    } else {
      return style;
    }
  }, [style]);

  return (
    <img
      {...restProps}
      ref={imageRef}
      style={styleObj}
      alt={alt || '图片'}
      className={className}
      src={lazy ? imgURL : src}
    />
  );
}

export default forwardRef(Image);
