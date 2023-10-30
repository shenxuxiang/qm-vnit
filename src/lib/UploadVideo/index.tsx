import React, { useRef, memo, useCallback } from 'react';
import type { FileList } from '@/lib/UploadImage';
export type { FileList } from '@/lib/UploadImage';
import UploadImage from '@/lib/UploadImage';
import useReducer from '@/utils/useReducer';
import Portal from '@/utils/portal';
import Icon from '@/lib/Icon';
import './index.less';

type UploadVideoProps = {
  action: string;
  accept?: string;
  method?: string;
  value?: FileList;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  onError?: (error: any) => void;
  headers?: () => { [key: string]: any };
  onChange?: (fileList: FileList) => void;
};

function initialState() {
  return {
    videoURL: '',
    showPreview: false,
  };
}

function UploadVideo(props: UploadVideoProps) {
  const {
    value,
    action,
    method,
    maxSize,
    onError,
    headers,
    onChange,
    maxCount,
    disabled,
    multiple,
    accept = 'video/*',
  } = props;

  const [state, setState] = useReducer(initialState);
  const { videoURL, showPreview } = state;

  const videoRef = useRef<any>();
  const videoPlayer = useRef<any>();
  const videoPreviewRef = useRef<any>();

  function handleCanPlay(event: any) {
    const video = event.target;
    const { videoWidth, videoHeight } = video;
    const ratio = videoWidth / videoHeight;
    const maxWidth = document.documentElement.clientWidth * 0.7;
    const maxHeight = document.documentElement.clientWidth * 0.8;

    let width;
    let height;

    if (ratio > maxWidth / maxHeight) {
      if (videoWidth > maxWidth) {
        width = maxWidth;
        height = width / ratio;
      } else {
        width = videoWidth;
        height = videoHeight;
      }
    } else {
      if (videoHeight > maxHeight) {
        height = maxHeight;
        width = height / ratio;
      } else {
        width = videoWidth;
        height = videoHeight;
      }
    }

    video.width = width;
    video.height = height;
  }

  function handlePreviewFile(url: string) {
    videoPlayer.current.style.display = '';
    requestAnimationFrame(() => setState({ videoURL: url, showPreview: true }));
  }

  function handleClosePreview(event: any) {
    if (event.target === event.currentTarget) {
      videoPreviewRef.current!.pause();
      setState({ videoURL: '', showPreview: false });
      setTimeout(() => {
        videoPlayer.current.style.display = 'none';
      }, 300);
    }
  }

  const renderItem = useCallback(({ url }: any) => {
    if (!url) return null;

    return (
      <video ref={videoRef} className="qm-vnit-upload-video" muted preload="auto">
        <source src={url} />
      </video>
    );
  }, []);

  return (
    <>
      <UploadImage
        value={value}
        action={action}
        method={method}
        accept={accept}
        headers={headers}
        maxSize={maxSize}
        multiple={multiple}
        maxCount={maxCount}
        disabled={disabled}
        onError={onError}
        onChange={onChange}
        renderItem={renderItem}
        onPreview={handlePreviewFile}
      />
      <Portal>
        <div
          ref={videoPlayer}
          style={{ display: 'none' }}
          onClick={handleClosePreview}
          className={`qm-vnit-upload-video-previewe${showPreview ? ' show' : ''}`}
        >
          {videoURL ? (
            <video
              controls
              ref={videoPreviewRef}
              onCanPlay={handleCanPlay}
              className="qm-vnit-upload-video-preview-content"
            >
              <source src={videoURL} />
            </video>
          ) : null}
          <Icon name="close" onClick={handleClosePreview} className="qm-vnit-upload-video-preview-close-icon" />
        </div>
      </Portal>
    </>
  );
}

export default memo(UploadVideo);
