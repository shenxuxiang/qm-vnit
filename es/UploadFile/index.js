import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Button, Upload } from 'antd';

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
function UploadFileComp(props) {
  var value = props.value,
    action = props.action,
    headers = props.headers,
    onChange = props.onChange,
    disabled = props.disabled,
    onPreview = props.onPreview,
    _props$maxSize = props.maxSize,
    maxSize = _props$maxSize === void 0 ? 0 : _props$maxSize,
    _props$accept = props.accept,
    accept = _props$accept === void 0 ? '*' : _props$accept,
    _props$maxCount = props.maxCount,
    maxCount = _props$maxCount === void 0 ? 0 : _props$maxCount,
    customRequest = props.customRequest,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? true : _props$multiple,
    uploadButtonText = props.uploadButtonText,
    _props$listType = props.listType,
    listType = _props$listType === void 0 ? 'text' : _props$listType;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    fileList = _useState2[0],
    setFileList = _useState2[1];
  // 是否是内部更新的 fileList
  var _isInternalChange = useRef(false);
  var _fileAmount = useRef(0);
  useEffect(function () {
    if (value === undefined) {
      return;
    } else if (_isInternalChange.current) {
      _isInternalChange.current = false;
      return;
    } else {
      setFileList(function () {
        return value;
      });
      _fileAmount.current = value.length;
    }
  }, [value]);
  /**
   * 图片上传事件
   * 每次触发时 field.fileList 将包含所有的集合。
   */
  var handleChangeFileList = useCallback(function (field) {
    var fileList = field.fileList;
    // 1048576 = 1024 * 1024 表示 1M 的大小
    if (maxSize) fileList = _filterInstanceProperty(fileList).call(fileList, function (file) {
      var _file$size;
      return (_file$size = file === null || file === void 0 ? void 0 : file.size) !== null && _file$size !== void 0 ? _file$size : 0 <= maxSize * 1048576;
    });
    if (maxCount) fileList = _sliceInstanceProperty(fileList).call(fileList, 0, maxCount);
    _fileAmount.current = fileList.length;
    _isInternalChange.current = true;
    setFileList(function () {
      return fileList;
    });
    onChange === null || onChange === void 0 || onChange(fileList);
  }, [fileList, maxSize, maxCount]);
  // 返回 false 表示不上传图片。
  var handleBeforeUpload = useCallback(function (file) {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      message.warning("\u4E0A\u4F20\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7".concat(maxSize, "M\uFF01"));
      return false;
    }
    if (maxCount && _fileAmount.current >= maxCount) {
      message.warning("\u6700\u591A\u53EA\u80FD\u4E0A\u4F20".concat(maxCount, "\u4E2A\u6587\u4EF6\uFF01"));
      return false;
    }
    _fileAmount.current += 1;
    return true;
  }, [maxSize, maxCount]);
  var renderUploadButton = useMemo(function () {
    return maxCount === 0 || (fileList === null || fileList === void 0 ? void 0 : fileList.length) < maxCount ? listType === 'text' || listType === 'picture' ? ( /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(UploadOutlined, null),
      disabled: disabled
    }, uploadButtonText || '上传附件')) : ( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, uploadButtonText || '上传附件'))) : null;
  }, [maxCount, fileList, disabled, uploadButtonText, listType]);
  return /*#__PURE__*/React.createElement(Upload, {
    accept: accept,
    action: action,
    withCredentials: true,
    headers: headers,
    disabled: disabled,
    multiple: multiple,
    // maxCount={maxCount}
    fileList: fileList,
    listType: listType,
    onPreview: onPreview,
    customRequest: customRequest,
    onChange: handleChangeFileList,
    beforeUpload: handleBeforeUpload
  }, renderUploadButton);
}
var index = /*#__PURE__*/memo(UploadFileComp);

export { index as default };
