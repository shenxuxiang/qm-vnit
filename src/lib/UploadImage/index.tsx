import React, { useRef, memo, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PreviewImage from '@/lib/PreviewImage';
import useReducer from '@/utils/useReducer';
import RenderItem from './RenderItem';
import Portal from '@/utils/portal';
import { message } from 'antd';
import './index.less';

export type FileList = {
  uid: string;
  name: string;
  url?: string;
  response?: any;
  percent?: number;
  rowSource?: File;
  status?: 'loading' | 'done' | 'error' | 'remove';
}[];

type UploadImageProps = {
  action: string;
  accept?: string;
  method?: string;
  value?: FileList;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onError?: (Error: any) => void;
  headers?: () => { [key: string]: any };
  onChange?: (fileList: FileList) => void;
  onPreview?: (url: string, rawResource?: File) => void;
  renderItem?: (values: { url: string; uid: string; name: string }) => React.ReactNode;
};

function initialState() {
  return {
    showPreviewImage: false,
    fileList: [] as FileList,
    previewImgs: [] as string[],
  };
}

function UploadImage(props: UploadImageProps) {
  const {
    value,
    action,
    method,
    maxSize,
    onError,
    headers,
    maxCount,
    multiple,
    disabled,
    children,
    onChange,
    onPreview,
    renderItem,
    accept = 'image/*',
  } = props;

  const [state, setState] = useReducer(initialState);
  const { fileList, previewImgs, showPreviewImage } = state;

  const _inputRef = useRef<any>();
  const _uploadButtonRef = useRef<any>();
  const _isInternalChange = useRef(false);

  useEffect(() => {
    if (typeof value === 'undefined') {
      return;
    } else if (_isInternalChange.current) {
      _isInternalChange.current = false;
      return;
    } else {
      setState({ fileList: value });
    }
  }, [value]);

  function handleFileChange(event: any) {
    let newFiles: File[] = Array.from(event.target.files);
    // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
    _inputRef.current.value = '';
    // 判断当前文件数量是否已经超出 maxCount
    if (maxCount && fileList.length >= maxCount) {
      message.warning(`最多只能上传${maxCount}个文件！`);
      return;
    }

    if (maxSize) {
      let length = newFiles.length;
      while (length--) {
        const file = newFiles[length];
        if (file.size > props.maxSize!) {
          newFiles.splice(length, 1);
          message.warning(file.name + '文件过大无法上传！');
        }
      }

      if (newFiles.length <= 0) return;
    }

    if (maxCount) {
      // 计算还可以添加文件的数量
      const rest = maxCount - fileList.length;
      rest < newFiles.length && message.warning(`最多只能上传${maxCount}个文件！`);
      newFiles = newFiles.slice(0, rest);
    }

    let newFileList: FileList = newFiles.map((file) => ({
      percent: 0,
      name: file.name,
      rawResource: file,
      status: 'loading' as FileList[number]['status'],
      uid: Math.random().toString(32).slice(2) + Date.now(),
    }));

    newFileList = fileList.concat(newFileList);

    _isInternalChange.current = true;
    setState({ fileList: newFileList });
    onChange?.(newFileList);

    if (!maxCount || newFileList.length < maxCount) {
      // 每次上传时，给上传按钮一个向右移动的动效。
      _uploadButtonRef.current!.classList.add('enter-from');
      requestAnimationFrame(() => _uploadButtonRef.current.classList.remove('enter-from'));
    }
  }

  // 图片上传成功
  function handleUploadSuccess(uid: string, res: any) {
    const newFileList = [...fileList];
    const target = newFileList.find((file) => file.uid === uid);
    if (target) {
      target.status = 'done';
      target.percent = 100;
      target.response = res;
      _isInternalChange.current = true;
      setState({ fileList: newFileList });
      onChange?.(newFileList);
    }
  }

  // 图片上传失败
  function handleUploadError(uid: string, error: any) {
    onError?.(error);
    const newFileList = [...fileList];
    const target = newFileList.find((file) => file.uid === uid);
    if (target) {
      target.status = 'error';
      _isInternalChange.current = true;
      setState({ fileList: newFileList });
      onChange?.(newFileList);
    }
  }

  // 移除
  function handleRemoveItem(uid: string) {
    const newFileList = fileList.filter((file) => file.uid !== uid);
    _isInternalChange.current = true;
    setState({ fileList: newFileList });
    onChange?.(newFileList);
  }

  function handlePreviewImage(url: string, rawResource?: File) {
    if (typeof onPreview === 'function') {
      onPreview(url, rawResource);
    } else {
      setState({ previewImgs: [url], showPreviewImage: true });
    }
  }

  return (
    <>
      <div className="qm-vnit-upload-image">
        <ul className="qm-vnit-upload-image-list">
          {fileList.map((file) => (
            <RenderItem
              {...file}
              key={file.uid}
              method={method}
              action={action}
              headers={headers}
              disabled={disabled}
              renderItem={renderItem}
              onRemove={handleRemoveItem}
              onError={handleUploadError}
              onPreview={handlePreviewImage}
              onSuccess={handleUploadSuccess}
            />
          ))}
          {!maxCount || fileList.length < maxCount ? (
            <li
              ref={_uploadButtonRef}
              onClick={() => _inputRef.current?.click()}
              className={`qm-vnit-upload-image-label${disabled ? ' disabled' : ''}`}
            >
              {children ? (
                children
              ) : (
                <div className="qm-vnit-upload-image-slot">
                  <PlusOutlined style={{ fontSize: 16, marginBottom: 10, color: 'rgba(0, 0, 0, 0.8)' }} />
                  <div>上传图片</div>
                </div>
              )}
              <input
                type="file"
                ref={_inputRef}
                accept={accept}
                disabled={disabled}
                multiple={multiple}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </li>
          ) : null}
        </ul>
      </div>
      {typeof onPreview !== 'function' ? (
        <Portal>
          <PreviewImage
            imgs={previewImgs}
            index={0}
            open={showPreviewImage}
            onClose={() => setState({ showPreviewImage: false })}
          />
        </Portal>
      ) : null}
    </>
  );
}

export default memo(UploadImage);
