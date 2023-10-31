import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import imgURL from '@/lib/assets/images/default.svg';
import intersectionImage from './intersection';

type IProps = {
  src: string;
  alt?: string;
  className?: string;
  [propName: string]: any;
  style?: React.CSSProperties;
};

function Image(props: IProps, ref: any) {
  const { src, alt, className, style, ...restProps } = props;
  const imageRef = useRef<any>();

  useEffect(() => {
    intersectionImage.addElement(imageRef.current, src);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      instance: imageRef.current,
    }),
    [],
  );

  return <img {...restProps} src={imgURL} style={style} ref={imageRef} alt={alt || '图片'} className={className} />;
}

export default forwardRef(Image);
