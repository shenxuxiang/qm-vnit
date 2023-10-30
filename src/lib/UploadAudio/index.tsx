import React, { useRef, memo, useCallback } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import type { FileList } from '@/lib/UploadImage';
export type { FileList } from '@/lib/UploadImage';
import UploadImage from '@/lib/UploadImage';
import useReducer from '@/utils/useReducer';
import Portal from '@/utils/portal';
import Icon from '@/lib/Icon';
import './index.less';

type UploadVAudioProps = {
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
    audioURL: '',
    showPreview: false,
  };
}

function UploadVideo(props: UploadVAudioProps) {
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
    accept = 'audio/*',
  } = props;

  const [state, setState] = useReducer(initialState);
  const { audioURL, showPreview } = state;

  const audioPlayer = useRef<any>();
  const audioPreviewRef = useRef<any>();

  function handlePreviewFile(url: string) {
    audioPlayer.current.style.display = '';
    requestAnimationFrame(() => setState({ audioURL: url, showPreview: true }));
  }

  function handleClosePreview(event: any) {
    if (event.target === event.currentTarget) {
      audioPreviewRef.current!.pause();
      setState({ audioURL: '', showPreview: false });
      setTimeout(() => {
        audioPlayer.current.style.display = 'none';
      }, 300);
    }
  }

  const renderItem = useCallback(({ name }: any) => {
    return (
      <div className="qm-vnit-upload-audio-render-item">
        <PictureOutlined style={{ fontSize: 36, color: 'rgb(64, 169, 255)' }} />
        <p>{name}</p>
      </div>
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
          ref={audioPlayer}
          style={{ display: 'none' }}
          onClick={handleClosePreview}
          className={`qm-vnit-upload-audio-previewe${showPreview ? ' show' : ''}`}
        >
          {audioURL ? (
            <audio controls ref={audioPreviewRef} className="qm-vnit-upload-audio-preview-content">
              <source src={audioURL} />
            </audio>
          ) : null}
          <Icon name="close" onClick={handleClosePreview} className="qm-vnit-upload-audio-preview-close-icon" />
        </div>
      </Portal>
    </>
  );
}

export default memo(UploadVideo);
