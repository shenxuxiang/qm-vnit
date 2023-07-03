import React, { memo, useEffect, useRef } from 'react';
import Modal from './Modal';
import Img from './Image';
import Spin from './Spin';
import Icon from '@/lib/Icon';
import useReducer from '@/utils/useReducer';
import './index.less';

// 缩略图中每一个图片的宽度
const ITEM_WIDTH = 120;
const REG_TRANSFORMX = /translateX\(([\-.0-9]*)px\)/;
const REG_SCALE = /scale\(([\-.0-9]*)\, ([\-.0-9]*)\)/;
const REG_ROTATEZ = /rotateZ\(([\-.0-9]*)deg\)/;

// 获取目标元素的 Transform 样式
function getTransformProperties(element: HTMLElement) {
  const style = element.style.transform;
  const scale = REG_SCALE.exec(style);
  const rotate = REG_ROTATEZ.exec(style);
  return { scaleX: Number(scale?.[1] ?? 1), scaleY: Number(scale?.[2] ?? 1), rotateZ: Number(rotate?.[1] ?? 0) };
}

function initialState() {
  return {
    currentIndex: 0,
    isEndPage: false,
    isStartPage: false,
    imageURL: '',
    spinning: false,
  };
}
type IProps = {
  onClose: () => void;
  open: boolean;
  imgs: string[];
  index?: number;
  pageSize?: number;
  previewImgs?: string[];
  hasPerformance?: boolean;
};

/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 * @param { previewImgs }    缩略图展示列表
 * @param { hasPerformance } 是否启动IMG性能优化方案
 */
function PreviewImage(props: IProps) {
  const [state, setState] = useReducer(initialState);
  const { currentIndex, isStartPage, isEndPage, imageURL, spinning } = state;
  const { onClose, open, imgs, previewImgs = imgs, index = 0, hasPerformance = false, pageSize = 9 } = props;

  const imgRef = useRef<any>();
  // 滑块容器
  const sliderWrapperRef = useRef<any>();
  // 滑块
  const sliderRef = useRef<any>();
  const totalSizeRef = useRef(0);
  const isMounted = useRef(false);
  // 高清图
  const HDPictureListRef = useRef(imgs);
  // 缩略图
  const thumbnailListRef = useRef(previewImgs);

  useEffect(() => {
    totalSizeRef.current = imgs.length;
    HDPictureListRef.current = imgs;
    thumbnailListRef.current = previewImgs;
  }, [imgs, previewImgs]);

  useEffect(() => {
    if (open) {
      isMounted.current = true;
      // 每当重新打开组件时，去除图片上的镜像、放大、缩小、旋转
      imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      let currentIndex = index;
      if (index <= 0) {
        currentIndex = 0;
      } else if (index >= totalSizeRef.current) {
        currentIndex = totalSizeRef.current - 1;
      }
      sliderAnimation(currentIndex, 0);

      setState({
        currentIndex,
        isStartPage: currentIndex < Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
        isEndPage:
          currentIndex > totalSizeRef.current - 1 - Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
      });
    }
  }, [open, index]);

  // 注意这里我将 open 添加到依赖项，其目的是为了防止初始化时 imageURL 没有取到值时，在 open 变化时重新取值。
  useEffect(() => {
    const hd = HDPictureListRef.current[currentIndex];
    // 如果高清图不存在，则不执行后续的逻辑
    if (!hd) return;
    // 如果当前 IMG 节点上展示的图像就是目标图像，也同样不执行后续逻辑
    if (imgRef.current?.src?.endsWith(hd)) return;

    // 是否执行 IMG 优化，优化方案则是先加载缩略图，等高清图加载完成后再添加到 IMG 节点展示。
    // 否则就是直接展示高清图。
    if (!hasPerformance) {
      setState({ imageURL: hd });
      return;
    }

    setState({ spinning: true, imageURL: thumbnailListRef.current[currentIndex] });

    const img = new Image();
    img.src = hd;
    img.onload = () => setState({ spinning: false, imageURL: hd });

    return () => {
      if (img) img.onload = null;
    };
  }, [open, currentIndex]);

  // 动画效果
  const sliderAnimation = (index: number, duration = 300) => {
    if (!sliderRef.current || !sliderWrapperRef.current) return;

    if (totalSizeRef.current <= pageSize) {
      sliderRef.current.style.cssText = `transform: translateX(0px); transition: transform 0ms ease`;
      return;
    }

    const halfMaxSize = Math.ceil(pageSize / 2);
    let offsetX = 0;
    if (index + 1 <= halfMaxSize) {
      offsetX = 0;
    } else if (index + 1 > totalSizeRef.current - halfMaxSize) {
      offsetX = totalSizeRef.current * ITEM_WIDTH - sliderWrapperRef.current.clientWidth;
    } else {
      offsetX = index * ITEM_WIDTH - sliderWrapperRef.current.clientWidth / 2 + ITEM_WIDTH / 2;
    }

    const cssText = `transform: translateX(${offsetX * -1}px); transition: transform ${duration}ms ease`;
    sliderRef.current.style.cssText = cssText;
  };

  const handlePrevItem = () => {
    if (currentIndex <= 0) return;
    imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    setState((prev) => {
      let count = prev.currentIndex - 1;
      count = count >= 0 ? count : 0;
      sliderAnimation(count);
      return {
        currentIndex: count,
        isStartPage: count < Math.ceil(pageSize / 2),
        isEndPage: count > totalSizeRef.current - 1 - Math.ceil(pageSize / 2),
      };
    });
  };

  const handleNextItem = () => {
    if (currentIndex >= totalSizeRef.current - 1) return;
    imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    setState((prev) => {
      let count = prev.currentIndex + 1;
      count = count >= totalSizeRef.current ? totalSizeRef.current - 1 : count;
      sliderAnimation(count);
      return {
        currentIndex: count,
        isStartPage: count < Math.ceil(pageSize / 2),
        isEndPage: count > totalSizeRef.current - 1 - Math.ceil(pageSize / 2),
      };
    });
  };

  const handleChangeIndex = (index: number) => {
    if (currentIndex === index) return;
    imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    sliderAnimation(index);
    setState({
      currentIndex: index,
      isStartPage: index < Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
      isEndPage: index > totalSizeRef.current - 1 - Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
    });
  };
  // 上一页，向右滚动一屏
  const handlePrevPage = () => {
    if (isStartPage) return;

    const transform = sliderRef.current.style.transform;
    const [, translateX = 0] = REG_TRANSFORMX.exec(transform) ?? [];
    let offsetX = Number(translateX) + pageSize * ITEM_WIDTH;
    if (offsetX >= 0) {
      offsetX = 0;
      setState({ isStartPage: true, isEndPage: false });
    } else {
      setState({ isStartPage: false, isEndPage: false });
    }
    const cssText = `transform: translateX(${offsetX}px); transition: transform .3s ease`;
    sliderRef.current.style.cssText = cssText;
  };

  // 下一页，向左滚动一屏
  const handleNextPage = () => {
    if (isEndPage) return;

    const transform = sliderRef.current.style.transform;
    const { clientWidth } = sliderWrapperRef.current;
    const maxOffsetX = totalSizeRef.current * ITEM_WIDTH - clientWidth;
    const [, translateX = 0] = REG_TRANSFORMX.exec(transform) ?? [];
    let offsetX = Number(translateX) - pageSize * ITEM_WIDTH;
    if (offsetX <= -maxOffsetX) {
      offsetX = -maxOffsetX;
      setState({ isEndPage: true, isStartPage: false });
    } else {
      setState({ isEndPage: false, isStartPage: false });
    }
    const cssText = `transform: translateX(${offsetX}px); transition: transform .3s ease`;
    sliderRef.current.style.cssText = cssText;
  };

  // Y 轴镜像
  const handleMirrorY = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX}, ${scaleY * -1}) rotateZ(${rotateZ}deg)`;
  };

  // X 轴镜像
  const handleMirrorX = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX * -1}, ${scaleY}) rotateZ(${rotateZ}deg)`;
  };

  // 逆时针旋转90°
  const handleRotateLeft = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX}, ${scaleY}) rotateZ(${rotateZ - 90}deg)`;
  };

  // 顺时针旋转90°
  const handleRotateRight = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX}, ${scaleY}) rotateZ(${rotateZ + 90}deg)`;
  };

  // 放大
  const handleScalePlus = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX * 1.5}, ${scaleY * 1.5}) rotateZ(${rotateZ}deg)`;
  };

  // 缩小
  const handleScaleMinus = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    let computedScaleX = scaleX / 1.5;
    let computedScaleY = scaleY / 1.5;
    computedScaleX = computedScaleX <= 1 ? 1 : computedScaleX;
    computedScaleY = computedScaleY <= 1 ? 1 : computedScaleY;

    imgRef.current.style.transform = `scale(${computedScaleX}, ${computedScaleY}) rotateZ(${rotateZ}deg)`;
  };
  // 初始化时，如果 open === false 则不渲染任何内容
  if (!open && !isMounted.current) return null;

  return (
    <Modal open={open}>
      <div style={{ width: '100%', height: '100%' }}>
        <div className="qm-preview-image-head">
          {/* Y 轴镜像 */}
          <Icon name="swap-outline" onClick={handleMirrorY} className="qm-preview-image-operation-icon rotate90" />
          {/* X 轴镜像 */}
          <Icon name="swap-outline" onClick={handleMirrorX} className="qm-preview-image-operation-icon" />
          {/* 逆时针旋转 90deg */}
          <Icon name="rotate-left" onClick={handleRotateLeft} className="qm-preview-image-operation-icon" />
          {/* 顺时针旋转 90deg */}
          <Icon name="rotate-right" onClick={handleRotateRight} className="qm-preview-image-operation-icon" />
          {/* 缩小 */}
          <Icon name="minus-circle" onClick={handleScaleMinus} className="qm-preview-image-operation-icon" />
          {/* 放大 */}
          <Icon
            name="plus-circle"
            onClick={handleScalePlus}
            className="qm-iconfont qm-icon-plus-circle qm-preview-image-operation-icon"
          />
          {/* 关闭预览弹框 */}
          <Icon name="close" onClick={onClose} className="qm-iconfont qm-icon-close qm-preview-image-operation-icon" />
        </div>
        <div className="qm-preview-image-body">
          {/* 上一张 */}
          <div
            onClick={handlePrevItem}
            className={`qm-preview-image-prev-button${currentIndex === 0 ? ' disabled' : ''}`}
          >
            <Icon name="arrow-left-bold" style={{ fontSize: 60 }} />
          </div>
          <Spin spinning={spinning}>
            {/* 图片预览部分 */}
            <div className="qm-preview-image-body-content">
              <img
                ref={imgRef}
                alt="预览图片"
                src={imageURL}
                className="qm-preview-image-preview-img"
                style={{ transform: 'scale(1, 1) rotateZ(0)' }}
              />
            </div>
          </Spin>
          {/* 下一张 */}
          <div
            onClick={handleNextItem}
            className={`qm-preview-image-next-button${currentIndex >= totalSizeRef.current - 1 ? ' disabled' : ''}`}
          >
            <Icon name="arrow-right-bold" style={{ fontSize: 60 }} />
          </div>
        </div>
        {/* 底部滑块 */}
        <div
          className="qm-preview-image-foot"
          style={{
            width: previewImgs?.length * ITEM_WIDTH + 68,
            maxWidth: pageSize * ITEM_WIDTH + 68,
          }}
        >
          {/* 上一页 */}
          <div
            onClick={handlePrevPage}
            className={`qm-preview-image-foot-prev-button${isStartPage ? ' disabled' : ''}`}
          >
            <Icon name="arrow-left-bold" style={{ fontSize: 30 }} />
          </div>
          {/* 下一页 */}
          <div onClick={handleNextPage} className={`qm-preview-image-foot-next-button${isEndPage ? ' disabled' : ''}`}>
            <Icon name="arrow-right-bold" style={{ fontSize: 30 }} />
          </div>
          {/* 滑块 */}
          <div className="qm-preview-image-foot-slider" ref={sliderWrapperRef}>
            <ul className="qm-preview-image-foot-slider-list" ref={sliderRef}>
              {previewImgs.map((url: string, index: number) => (
                <li
                  key={`${url}~${index}`}
                  onClick={() => handleChangeIndex(index)}
                  className={`qm-preview-image-foot-slider-list-item${currentIndex === index ? ' active' : ''}`}
                >
                  <Img src={url} alt="pic" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default memo(PreviewImage);
