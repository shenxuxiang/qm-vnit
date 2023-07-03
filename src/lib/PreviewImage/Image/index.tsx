import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import imgURL from '../../assets/images/default.svg';
import intersectionImage from './intersection';

type IProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  [propName: string]: any;
};

function Image(props: IProps, ref: any) {
  const { src, alt, className, style, ...restProps } = props;
  const imageRef = useRef<any>();

  useEffect(() => {
    intersectionImage.observeImage(imageRef.current);
    return () => {
      intersectionImage.unobserveImage(imageRef.current);
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      instance: imageRef.current,
    }),
    [],
  );

  return (
    <img
      src={imgURL}
      style={style}
      {...restProps}
      ref={imageRef}
      data-src={src}
      alt={alt || '图片'}
      className={className}
    />
  );
}

export default forwardRef(Image);
