import getTransformProperties from '@/utils/getTransformProperties';
import React, { memo, useEffect, useRef, useMemo } from 'react';
import defaultURL from '@/lib/assets/images/default.svg';
import { throttle, getViewportSize } from '@/utils';
import useReducer from '@/utils/useReducer';
import Toolbar from './Toolbar';
import Loading from './Loading';
import Icon from '@/lib/Icon';
import Slider from './Slider';
import Modal from './Modal';
import './index.less';

function initialState() {
  return {
    indictor: 0,
    spinning: false,
    isEndPage: false,
    isStartPage: false,
    imageURL: defaultURL,
  };
}
export type PreviewImageProps = {
  open: boolean;
  imgs: string[];
  index?: number;
  pageSize?: number;
  previewImgs?: string[];
  hasPerformance?: boolean;
  onClose: (indictor: number) => void;
};

/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 */
function PreviewImage(props: PreviewImageProps) {
  const [state, setState] = useReducer(initialState);
  const { indictor, imageURL, spinning } = state;
  const { onClose, open, imgs, index = 0, pageSize = 9 } = props;

  const imgRef = useRef<any>();
  const isMounted = useRef(false);
  const originalLocation = useRef<{ x: number; y: number } | null>(null);
  const originalMousePoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (open) {
      isMounted.current = true;
      document.documentElement.style.overflow = 'hidden';
      // 每当重新打开组件时，去除图片上的镜像、放大、缩小、旋转
      imgRef.current.style.transform = `scale(1, 1) rotate(0deg)`;
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // 放大
    const handleEnlarge = () => {
      const { scaleX, scaleY, rotate } = getTransformProperties(imgRef.current);
      imgRef.current.style.transform = `scale(${scaleX * 1.5}, ${scaleY * 1.5}) rotate(${rotate}deg)`;
    };

    // 缩小
    const handleScaleShrink = () => {
      const { scaleX, scaleY, rotate } = getTransformProperties(imgRef.current);
      let x = scaleX / 1.5;
      let y = scaleY / 1.5;
      x = Math.abs(x) <= 1 ? Math.sign(x) : x;
      y = Math.abs(y) <= 1 ? Math.sign(y) : y;

      imgRef.current.style.transform = `scale(${x}, ${y}) rotate(${rotate}deg)`;
    };

    const onMouseWheel = (event: any) => {
      const deltaY = event.deltaY;
      if (deltaY < 0) {
        handleEnlarge();
      } else if (deltaY > 0) {
        handleScaleShrink();
      }
      imgRef.current.parentNode.style.cssText = `transform: translate3D(0px, 0px, 0px);`;
    };

    const handleMouseWheel = throttle(onMouseWheel, 100);
    imgRef.current.parentNode.addEventListener('mousewheel', handleMouseWheel);

    return () => {
      imgRef.current.parentNode.removeEventListener('mousewheel', handleMouseWheel);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      let indictor = index;
      if (index <= 0) {
        indictor = 0;
      } else if (index >= imgs.length) {
        indictor = imgs.length - 1;
      }

      setState({ indictor });
    }
  }, [open, index, imgs]);

  // 注意这里我将 open 添加到依赖项，其目的是为了防止初始化时 imageURL 没有取到值时，在 open 变化时重新取值。
  useEffect(() => {
    if (!open) return;
    setState({ spinning: true, imageURL: defaultURL });
    const url = imgs[indictor];
    const image = new Image();
    image.onload = () => setState({ spinning: false, imageURL: url });
    image.src = url;
    return () => {
      image.onload = null;
    };
  }, [open, indictor, imgs]);

  const handlePrevItem = () => {
    if (indictor <= 0) return;
    imgRef.current.style.transform = `scale(1, 1) rotate(0deg)`;
    setState((prev) => ({ indictor: prev.indictor - 1 }));
  };

  const handleNextItem = () => {
    if (indictor >= imgs.length - 1) return;
    imgRef.current.style.transform = `scale(1, 1) rotate(0deg)`;
    setState((prev) => ({ indictor: prev.indictor + 1 }));
  };

  const handleChangeIndex = (index: number) => {
    if (indictor === index) return;
    imgRef.current.style.transform = `scale(1, 1) rotate(0deg)`;
    setState({ indictor: index });
  };

  const onMouseDown = (event: any) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    const targetElement = imgRef.current.parentNode;
    const { translateX, translateY } = getTransformProperties(targetElement);

    originalMousePoint.current = { x: clientX, y: clientY };
    originalLocation.current = { x: translateX, y: translateY };
  };

  // 当鼠标在屏幕上滑动时，图片跟随移动（前提是要先）
  const handleMouseUp = () => {
    originalMousePoint.current = null;
    originalLocation.current = null;
    const element = imgRef.current.parentNode;
    const { width: SW, height: SH } = getViewportSize();
    const { offsetWidth, offsetHeight } = imgRef.current;
    const { scaleX, scaleY } = getTransformProperties(imgRef.current);

    const width = offsetWidth * scaleX;
    const height = offsetHeight * scaleY;
    // 当图像的宽高小于屏幕可视区的宽高时，图像回到最初的位置。
    if (width <= SW || height <= SH) {
      element.style.cssText = `
        transform: translate3d(0px, 0px, 0px);
        transition: transform .3s ease
      `;
    } else {
      const restX = (width - SW) / 2;
      const restY = (height - SH) / 2;
      let { translateX, translateY } = getTransformProperties(element);
      if (translateX > restX) {
        translateX = restX;
      } else if (translateX < -restX) {
        translateX = -restX;
      }

      if (translateY > restY) {
        translateY = restY;
      } else if (translateY < -restY) {
        translateY = -restY;
      }

      element.style.cssText = `
        transform: translate3d(${translateX}px, ${translateY}px, 0px);
        transition: transform .3s ease
      `;
    }
  };

  const handleMouseMove = useMemo(() => {
    return throttle(mousemove, 50);

    function mousemove(event: any) {
      if (!originalMousePoint.current || !originalLocation.current) return;

      const { clientX, clientY } = event;
      const distanceX = clientX - originalMousePoint.current.x;
      const distanceY = clientY - originalMousePoint.current.y;
      const element = imgRef.current.parentNode;
      element.style.cssText = `
        transform: translate3d(
          ${originalLocation.current.x + distanceX}px,
          ${originalLocation.current.y + distanceY}px,
          0px
        )`;
    }
  }, []);

  function handleClose(event: any) {
    if (event.target === event.currentTarget) onClose(indictor);
  }

  // 初始化时，如果 open === false 则不渲染任何内容
  if (!open && !isMounted.current) return null;

  return (
    <Modal open={open}>
      <div style={{ width: '100%', height: '100%' }}>
        <Toolbar onClose={handleClose} imgHandle={imgRef} />
        <Loading open={spinning} />
        <div className="qm-preview-image-body">
          {/* 上一张 */}
          <div
            onClick={handlePrevItem}
            style={{ display: imgs.length <= 1 ? 'none' : '' }}
            className={`qm-preview-image-prev-button${indictor === 0 ? ' disabled' : ''}`}
          >
            <Icon name="arrow-left-bold" style={{ fontSize: 60 }} />
          </div>
          {/* 图片预览部分 */}
          <div className="qm-preview-image-body-content" onMouseMove={handleMouseMove} onClick={handleClose}>
            <img
              ref={imgRef}
              alt="预览图片"
              src={imageURL}
              key={imageURL}
              onMouseDown={onMouseDown}
              onMouseUp={handleMouseUp}
              className="qm-preview-image-preview-img"
              style={{ transform: 'scale(1, 1) rotate(0)' }}
            />
          </div>
          {/* 下一张 */}
          <div
            onClick={handleNextItem}
            style={{ display: imgs.length <= 1 ? 'none' : '' }}
            className={`qm-preview-image-next-button${indictor >= imgs.length - 1 ? ' disabled' : ''}`}
          >
            <Icon name="arrow-right-bold" style={{ fontSize: 60 }} />
          </div>
        </div>
        {/* 底部滑块 */}
        <Slider imgs={imgs} onChange={handleChangeIndex} indictor={indictor} pageSize={pageSize} />
      </div>
    </Modal>
  );
}

export default memo(PreviewImage);
