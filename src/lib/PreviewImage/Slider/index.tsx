import getTransformProperties from '@/utils/getTransformProperties';
import React, { memo, useEffect, useRef } from 'react';
import useReducer from '@/utils/useReducer';
import Icon from '@/lib/Icon';
import Img from '@/lib/Image';
import './index.less';

function initialState() {
  return {
    isFirstPage: true,
    isLastPage: false,
  };
}

// 缩略图中每一个图片的宽度
const ITEM_WIDTH = 120;

function Slider(props: any) {
  const sliderRef = useRef<any>();
  const { imgs, indictor, onChange, pageSize } = props;
  const [{ isFirstPage, isLastPage }, setState] = useReducer(initialState);

  useEffect(() => {
    sliderAnimation(indictor, 300);

    function sliderAnimation(index: number, duration: number) {
      if (!sliderRef.current) return;

      if (imgs?.length <= pageSize) {
        sliderRef.current.style.cssText = `transform: translate3d(0px, 0px, 0px); transition: transform 0ms ease`;
        return;
      }

      const half = pageSize / 2;
      let offsetX = 0;
      if (index <= half) {
        offsetX = 0;
      } else if (index >= imgs.length - half) {
        offsetX = (imgs.length - pageSize) * ITEM_WIDTH;
      } else {
        offsetX = (index - half + 0.5) * ITEM_WIDTH;
      }

      const cssText = `transform: translate3d(${offsetX * -1}px, 0px, 0px); transition: transform ${duration}ms ease`;
      sliderRef.current.style.cssText = cssText;
    }
  }, [indictor, imgs, pageSize]);

  useEffect(() => {
    let isFirstPage = false;
    let isLastPage = false;
    if (imgs?.length <= pageSize) {
      isFirstPage = true;
      isLastPage = true;
    } else {
      if (indictor <= pageSize / 2) {
        isFirstPage = true;
        isLastPage = false;
      } else if (indictor >= imgs?.length - pageSize / 2) {
        isFirstPage = false;
        isLastPage = true;
      } else {
        isFirstPage = false;
        isLastPage = false;
      }
    }
    setState({ isFirstPage, isLastPage });
  }, [indictor, pageSize, imgs]);

  // 上一页，向右滚动一屏
  const handlePrevPage = () => {
    if (isFirstPage) return;

    const { translateX } = getTransformProperties(sliderRef.current);
    let offsetX = translateX + pageSize * ITEM_WIDTH;
    if (offsetX >= 0) {
      offsetX = 0;
      setState({ isFirstPage: true, isLastPage: false });
    } else {
      setState({ isFirstPage: false, isLastPage: false });
    }
    const cssText = `transform: translate3d(${offsetX}px, 0px, 0px); transition: transform .3s ease`;
    sliderRef.current.style.cssText = cssText;
  };

  // 下一页，向左滚动一屏
  const handleNextPage = () => {
    if (isLastPage) return;

    const { translateX } = getTransformProperties(sliderRef.current);
    const maxOffsetX = (imgs.length - pageSize) * ITEM_WIDTH;
    let offsetX = translateX - pageSize * ITEM_WIDTH;

    if (offsetX <= -maxOffsetX) {
      offsetX = -maxOffsetX;
      setState({ isLastPage: true, isFirstPage: false });
    } else {
      setState({ isLastPage: false, isFirstPage: false });
    }
    const cssText = `transform: translate3d(${offsetX}px, 0px, 0px); transition: transform .3s ease`;
    sliderRef.current.style.cssText = cssText;
  };

  if (imgs.length <= 1) return null;

  return (
    <div
      className="qm-preview-image-foot"
      style={{
        width: imgs?.length * ITEM_WIDTH + 68,
        maxWidth: pageSize * ITEM_WIDTH + 68,
      }}
    >
      {/* 上一页 */}
      <div onClick={handlePrevPage} className={`qm-preview-image-foot-prev-button${isFirstPage ? ' disabled' : ''}`}>
        <Icon name="arrow-left-bold" style={{ fontSize: 30 }} />
      </div>
      {/* 下一页 */}
      <div onClick={handleNextPage} className={`qm-preview-image-foot-next-button${isLastPage ? ' disabled' : ''}`}>
        <Icon name="arrow-right-bold" style={{ fontSize: 30 }} />
      </div>
      {/* 滑块 */}
      <div className="qm-preview-image-foot-slider">
        <ul className="qm-preview-image-foot-slider-list" ref={sliderRef}>
          {imgs.map((url: string, index: number) => (
            <li
              key={`${url}~${index}`}
              onClick={() => onChange?.(index)}
              className={`qm-preview-image-foot-slider-list-item${indictor === index ? ' active' : ''}`}
            >
              <Img src={url} alt="pic" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(Slider);
