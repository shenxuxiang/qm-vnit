import React, { memo, useMemo, useState, useRef, useCallback } from 'react';
import { Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined, CloseOutlined, PictureOutlined, PlayCircleOutlined } from '@ant-design/icons';
import Portal from '@/utils/portal';
import './index.less';

/**
 * 音频预览功能组件
 * @param { width }    audio 容器的宽度
 * @param { height }   audio 容器的高度
 * @param { style }    audio 容器的样式
 * @param { file }     音频文件
 * @param { onDelete } 删除该音频的回调函数
 */
function Audio(props: any) {
  const [showPreviewModal, setPreviewModal] = useState(false);
  const { width, height, style, file, onDelete, disabled } = props;

  // 预览音频元素
  const previewAudioRef = useRef<any>();
  // 是否是第一次预览音频。我们根据该字段做了惰性加载
  const isFirstDisplayPreviewModal = useRef(true);

  const audioSrc = useMemo(() => {
    if (file?.url) {
      return file.url;
    } else {
      const url = file?.originFileObj;
      return url ? window.URL.createObjectURL(url) : '';
    }
  }, [file]);

  const type = useMemo(() => {
    const index = file?.name?.lastIndexOf?.('.') ?? -1;
    if (~index) return `audio/${file.name.slice(index + 1)}`;
    return '';
  }, [file.name]);

  const wrapperStyle = useMemo(() => {
    const newStyle = { ...style };
    if (width) newStyle.width = width;
    if (height) newStyle.height = height;
    return newStyle;
  }, [width, height, style]);

  // 打开预览
  const handlePreviewAudio = useCallback(() => {
    isFirstDisplayPreviewModal.current = false;
    document.documentElement.style.overflow = 'hidden';
    setPreviewModal(() => true);
  }, []);

  // 关闭预览
  const handleClosePreviewAudio = useCallback(() => {
    document.documentElement.style.overflow = '';
    setPreviewModal(false);
    previewAudioRef.current?.pause();
  }, []);

  const handleDeleteFile = useCallback(() => {
    onDelete?.(file);
  }, [onDelete, file]);

  if (file.status === 'uploading') {
    return (
      <div style={wrapperStyle} className="qm-vnit-uploadaudio-audio-wrapper">
        <div className="qm-vnit-uploadaudio-audio-loading">文件上传中</div>
        <div className="qm-vnit-uploadaudio-audio-progress-bar">
          <span className="qm-vnit-uploadaudio-audio-progress" style={{ width: `${file.percent}%` }} />
        </div>
      </div>
    );
  } else if (file.status === 'error') {
    return (
      <Tooltip title="上传错误">
        <div style={wrapperStyle} className="qm-vnit-uploadaudio-audio-wrapper qm-vnit-uploadaudio-audio-error">
          <div className="qm-vnit-uploadaudio-audio-file-picture">
            <PictureOutlined />
          </div>
          <div className="qm-vnit-uploadaudio-audio-filename">{file.name}</div>
          <div className="qm-vnit-uploadaudio-audio-preview">
            <DeleteOutlined className="qm-vnit-uploadaudio-audio-preview-icon" onClick={handleDeleteFile} />
          </div>
        </div>
      </Tooltip>
    );
  }

  return (
    <div style={wrapperStyle} className="qm-vnit-uploadaudio-audio-wrapper">
      <div className="qm-vnit-uploadaudio-audio-file-picture">
        <PlayCircleOutlined disabled={disabled} />
      </div>
      <div className="qm-vnit-uploadaudio-audio-filename">{file.name}</div>
      <div className="qm-vnit-uploadaudio-audio-preview">
        <EyeOutlined className="qm-vnit-uploadaudio-audio-preview-icon" onClick={handlePreviewAudio} />
        {disabled ? null : (
          <DeleteOutlined className="qm-vnit-uploadaudio-audio-preview-icon" onClick={handleDeleteFile} />
        )}
      </div>
      {isFirstDisplayPreviewModal.current && !showPreviewModal ? null : (
        <Portal>
          <div
            className={`qm-vnit-uploadaudio-audio-preview-audio-box${showPreviewModal ? ' show' : ''}`}
            onClick={handleClosePreviewAudio}
          >
            <audio controls autoPlay preload="auto" ref={previewAudioRef}>
              <source type={type} src={audioSrc} />
            </audio>
            <span className="qm-vnit-uploadaudio-audio-close-icon">
              <CloseOutlined />
            </span>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default memo(Audio);
