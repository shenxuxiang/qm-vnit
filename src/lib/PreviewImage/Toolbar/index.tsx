import getTransformProperties from '@/utils/getTransformProperties';
import React, { memo } from 'react';
import Icon from '@/lib/Icon';
import './index.less';

function Toolbar(props: any) {
  const { imgHandle, onClose } = props;

  // Y 轴镜像
  const handleMirrorY = () => {
    const { scaleX, scaleY, rotate } = getTransformProperties(imgHandle.current);
    imgHandle.current.style.transform = `scale(${scaleX}, ${scaleY * -1}) rotate(${rotate}deg)`;
  };

  // X 轴镜像
  const handleMirrorX = () => {
    const { scaleX, scaleY, rotate } = getTransformProperties(imgHandle.current);
    imgHandle.current.style.transform = `scale(${scaleX * -1}, ${scaleY}) rotate(${rotate}deg)`;
  };

  // 逆时针旋转90°
  const handleRotateLeft = () => {
    const { scaleX, scaleY, rotate } = getTransformProperties(imgHandle.current);
    imgHandle.current.style.transform = `scale(${scaleX}, ${scaleY}) rotate(${rotate - 90}deg)`;
  };

  // 顺时针旋转90°
  const handleRotateRight = () => {
    const { scaleX, scaleY, rotate } = getTransformProperties(imgHandle.current);
    imgHandle.current.style.transform = `scale(${scaleX}, ${scaleY}) rotate(${rotate + 90}deg)`;
  };

  // 放大
  const handleEnlarge = () => {
    const { scaleX, scaleY, rotate } = getTransformProperties(imgHandle.current);
    imgHandle.current.style.transform = `scale(${scaleX * 1.5}, ${scaleY * 1.5}) rotate(${rotate}deg)`;
  };

  // 缩小
  const handleScaleShrink = () => {
    const { scaleX, scaleY, rotate } = getTransformProperties(imgHandle.current);
    let x = scaleX / 1.5;
    let y = scaleY / 1.5;
    x = Math.abs(x) <= 1 ? Math.sign(x) : x;
    y = Math.abs(y) <= 1 ? Math.sign(y) : y;

    imgHandle.current.style.transform = `scale(${x}, ${y}) rotate(${rotate}deg)`;
  };

  return (
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
      <Icon name="minus-circle" onClick={handleScaleShrink} className="qm-preview-image-operation-icon" />
      {/* 放大 */}
      <Icon
        name="plus-circle"
        onClick={handleEnlarge}
        className="qm-iconfont qm-icon-plus-circle qm-preview-image-operation-icon"
      />
      {/* 关闭预览弹框 */}
      <Icon name="close" onClick={onClose} className="qm-iconfont qm-icon-close qm-preview-image-operation-icon" />
    </div>
  );
}

export default memo(Toolbar);
