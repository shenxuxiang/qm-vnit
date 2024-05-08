import React, { memo, useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Upload, message, Button } from 'antd';

type UploadFileProps = {
  action: string;
  accept?: string;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  value?: UploadFile[];
  uploadButtonText?: string;
  customRequest?: (options: any) => void;
  onPreview?: (file: UploadFile) => void;
  headers?: { [propName: string]: string };
  onChange?: (fileList: UploadFile[]) => void;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
};

/**
 * 图片上传组件
 * @param action           上传的路径
 * @param accept           指定上传的文件类型
 * @param headers          上传时携带的请求头
 * @param maxCount         最多可以上传多少个图片，0 表示不限制
 * @param multiple         是否支持多张图片上传
 * @param maxSize          限制图片的大小，0 表示不限制
 * @param value            可控，组件回显，也可用 Form 表单控件
 * @param onChange         可控，value 变化的回调函数，也可用 Form 表单控件
 * @param disabled         是否禁用该功能
 * @param uploadButtonText 上传按钮的文案
 * @param listType         上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
 * @param onPreview        预览功能
 * @param customRequest    通过覆盖默认的上传行为，可以自定义自己的上传实现
 */
function UploadFileComp(props: UploadFileProps) {
  const {
    value,
    action,
    headers,
    onChange,
    disabled,
    onPreview,
    maxSize = 0,
    accept = '*',
    maxCount = 0,
    customRequest,
    multiple = true,
    uploadButtonText,
    listType = 'text',
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 是否是内部更新的 fileList
  const _isInternalChange = useRef(false);
  const _fileAmount = useRef(0);

  useEffect(() => {
    if (value === undefined) {
      return;
    } else if (_isInternalChange.current) {
      _isInternalChange.current = false;
      return;
    } else {
      setFileList(() => value);
      _fileAmount.current = value.length;
    }
  }, [value]);

  /**
   * 图片上传事件
   * 每次触发时 field.fileList 将包含所有的集合。
   */
  const handleChangeFileList = useCallback(
    (field: any) => {
      let { fileList } = field;

      // 1048576 = 1024 * 1024 表示 1M 的大小
      if (maxSize) fileList = fileList.filter((file: File) => file?.size ?? 0 <= maxSize * 1048576);

      if (maxCount) fileList = fileList.slice(0, maxCount);

      _fileAmount.current = fileList.length;
      _isInternalChange.current = true;

      setFileList(() => fileList);
      onChange?.(fileList);
    },
    [fileList, maxSize, maxCount],
  );

  // 返回 false 表示不上传图片。
  const handleBeforeUpload = useCallback(
    (file: File) => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        message.warning(`上传图片大小不能超过${maxSize}M！`);
        return false;
      }

      if (maxCount && _fileAmount.current >= maxCount) {
        message.warning(`最多只能上传${maxCount}个文件！`);
        return false;
      }

      _fileAmount.current += 1;

      return true;
    },
    [maxSize, maxCount],
  );

  const renderUploadButton = useMemo(() => {
    return maxCount === 0 || fileList?.length < maxCount ? (
      listType === 'text' || listType === 'picture' ? (
        <Button icon={<UploadOutlined />} disabled={disabled}>
          {uploadButtonText || '上传附件'}
        </Button>
      ) : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>{uploadButtonText || '上传附件'}</div>
        </div>
      )
    ) : null;
  }, [maxCount, fileList, disabled, uploadButtonText, listType]);

  return (
    <Upload
      accept={accept}
      action={action}
      withCredentials
      headers={headers}
      disabled={disabled}
      multiple={multiple}
      // maxCount={maxCount}
      fileList={fileList}
      listType={listType}
      onPreview={onPreview}
      customRequest={customRequest}
      onChange={handleChangeFileList}
      beforeUpload={handleBeforeUpload}
    >
      {renderUploadButton}
    </Upload>
  );
}

export default memo(UploadFileComp);
