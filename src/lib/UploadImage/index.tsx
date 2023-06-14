import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, message, UploadFile } from 'antd';
import PreviewImage from '@/lib/PreviewImage';

type UploadImageProps = {
  action: string;
  accept?: string;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  value?: UploadFile[];
  headers?: { [propName: string]: string };
  onChange?: (fileList: UploadFile[]) => void;
  onPreview?: (file: UploadFile) => void;
};

/**
 * 图片上传组件
 * @param action    上传的路径
 * @param accept    指定上传的文件类型
 * @param headers   上传时携带的请求头
 * @param maxCount  最多可以上传多少个图片，0 表示不限制
 * @param multiple  是否支持多张图片上传
 * @param maxSize   限制图片的大小，0 表示不限制
 * @param value     可控，组件回显，也可用 Form 表单控件
 * @param onChange  可控，value 变化的回调函数，也可用 Form 表单控件
 * @param onPreview 图片预览功能
 * @param disabled  是否禁用
 */
function UploadImage(props: UploadImageProps) {
  const {
    action,
    headers,
    maxCount = 0,
    maxSize = 0,
    value,
    onChange,
    multiple = true,
    disabled,
    accept = 'image/*',
    onPreview,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImageInfo, updatePreviewImageInfo] = useState({
    open: false,
    index: 0,
    imgs: [] as string[],
  });

  // 是否是内部更新的 fileList
  const isInternalModifiedFileList = useRef(false);

  useEffect(() => {
    if (isInternalModifiedFileList.current) {
      onChange?.(fileList);
    }
  }, [fileList]);

  useEffect(() => {
    if (value === undefined) {
      return;
    } else if (isInternalModifiedFileList.current) {
      isInternalModifiedFileList.current = false;
      return;
    } else {
      setFileList(() => value);
    }
  }, [value]);

  // 图片预览功能
  const handlePreview = useCallback(
    (file: any) => {
      updatePreviewImageInfo({
        open: true,
        index: fileList.findIndex((item: any) => item.uid === file.uid),
        imgs: fileList
          .map((item: any) => {
            if (item.url) {
              return item.url;
            } else {
              return window.URL.createObjectURL(item.originFileObj);
            }
          })
          .filter(Boolean),
      });
    },
    [fileList],
  );

  const handleClosePreviewImage = useCallback(() => {
    updatePreviewImageInfo({
      ...previewImageInfo,
      open: false,
    });
  }, [previewImageInfo]);

  // 图片上传事件
  const handleChangeFileList = useCallback(
    (field: any) => {
      const { file } = field;
      // maxSize === 0 表示不对文件大小进行限制。
      if (maxSize > 0 && file.size > maxSize * 1024 * 1024) return;
      function setStateAction(prevFileList: UploadFile[]) {
        let newFileList: any[] = [...prevFileList];

        // maxCount === 0 表示不限制上传的数量
        if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
          const index = newFileList.findIndex((item) => item.uid === file.uid);
          if (index >= 0) newFileList.splice(index, 1, file);
          return prevFileList;
        } else if (file.status === 'uploading') {
          const index = newFileList.findIndex((item) => item.uid === file.uid);
          if (~index) {
            newFileList.splice(index, 1, file);
          } else {
            newFileList.push(file);
          }
        } else if (file.status === 'error') {
          const { uid, name, status } = file;
          const index = newFileList.findIndex((item) => item.uid === uid);
          newFileList.splice(index, 1, { uid, name, status });
        } else if (file.status === 'done') {
          const index = newFileList.findIndex((item) => item.uid === file.uid);
          if (file?.response?.code !== 0) {
            newFileList.splice(index, 1, { uid: file.uid, name: file.name, status: 'error' });
          } else {
            newFileList.splice(index, 1, file);
          }
        } else if (file.status === 'removed') {
          newFileList = prevFileList.filter((item) => item.uid !== file.uid);
        }
        return newFileList;
      }

      isInternalModifiedFileList.current = true;
      setFileList(setStateAction);
    },
    [fileList, maxSize, maxCount],
  );

  // 返回 false 表示不上传图片。
  const handleBeforeUploadForFileList = useCallback(
    (file: File) => {
      // 如果maxSize === 0 表示不对文件大小进行限制。
      if (maxSize === 0) return true;

      if (file.size > maxSize * 1024 * 1024) {
        message.warning(`上传图片大小不能超过${maxSize}M`);
        return false;
      } else {
        return true;
      }
    },
    [maxSize],
  );

  return (
    <>
      <Upload
        action={action}
        withCredentials
        accept={accept}
        headers={headers}
        disabled={disabled}
        multiple={multiple}
        maxCount={maxCount}
        fileList={fileList}
        listType="picture-card"
        onChange={handleChangeFileList}
        onPreview={onPreview || handlePreview}
        beforeUpload={handleBeforeUploadForFileList}
      >
        {maxCount === 0 || fileList?.length < maxCount ? (
          <div>
            <PlusOutlined disabled={disabled} />
            <div style={{ marginTop: 8 }}>上传</div>
          </div>
        ) : null}
      </Upload>

      <PreviewImage hasPerformance onClose={handleClosePreviewImage} {...previewImageInfo} />
    </>
  );
}

export default memo(UploadImage);
