import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
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
 */
function UploadImage(props) {
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
  var isInternalModifiedFileList = useRef(false);
  useEffect(function () {
    if (isInternalModifiedFileList.current) onChange === null || onChange === void 0 ? void 0 : onChange(fileList);
  }, [fileList]);
  useEffect(function () {
    if (value === undefined) {
      return;
    } else if (isInternalModifiedFileList.current) {
      isInternalModifiedFileList.current = false;
      return;
    } else {
      setFileList(function () {
        return value;
      });
    }
  }, [value]);
  // 图片上传事件
  var handleChangeFileList = useCallback(function (field) {
    var file = field.file;
    // maxSize === 0 表示不对文件大小进行限制。
    if (maxSize > 0 && file.size > maxSize * 1024 * 1024) return;
    function setStateAction(prevFileList) {
      var newFileList = _toConsumableArray(prevFileList);
      // maxCount === 0 表示不限制上传的数量
      if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
        var index = _findIndexInstanceProperty(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        if (index >= 0) _spliceInstanceProperty(newFileList).call(newFileList, index, 1, file);
        return prevFileList;
      } else if (file.status === 'uploading') {
        var _index = _findIndexInstanceProperty(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        if (~_index) {
          _spliceInstanceProperty(newFileList).call(newFileList, _index, 1, file);
        } else {
          newFileList.push(file);
        }
      } else if (file.status === 'error') {
        var uid = file.uid,
          name = file.name,
          status = file.status;
        var _index2 = _findIndexInstanceProperty(newFileList).call(newFileList, function (item) {
          return item.uid === uid;
        });
        _spliceInstanceProperty(newFileList).call(newFileList, _index2, 1, {
          uid: uid,
          name: name,
          status: status
        });
      } else if (file.status === 'done') {
        var _file$response;
        var _index3 = _findIndexInstanceProperty(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        if ((file === null || file === void 0 ? void 0 : (_file$response = file.response) === null || _file$response === void 0 ? void 0 : _file$response.code) !== 0) {
          _spliceInstanceProperty(newFileList).call(newFileList, _index3, 1, {
            uid: file.uid,
            name: file.name,
            status: 'error'
          });
        } else {
          _spliceInstanceProperty(newFileList).call(newFileList, _index3, 1, file);
        }
      } else if (file.status === 'removed') {
        newFileList = _filterInstanceProperty(prevFileList).call(prevFileList, function (item) {
          return item.uid !== file.uid;
        });
      }
      return newFileList;
    }
    isInternalModifiedFileList.current = true;
    setFileList(setStateAction);
  }, [fileList, maxSize, maxCount]);
  // 返回 false 表示不上传图片。
  var handleBeforeUploadForFileList = useCallback(function (file) {
    // 如果maxSize === 0 表示不对文件大小进行限制。
    if (maxSize === 0) return true;
    if (file.size > maxSize * 1024 * 1024) {
      message.warning("\u4E0A\u4F20\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7".concat(maxSize, "M"));
      return false;
    } else {
      return true;
    }
  }, [maxSize]);
  var renderUploadButton = useMemo(function () {
    return maxCount === 0 || (fileList === null || fileList === void 0 ? void 0 : fileList.length) < maxCount ? listType === 'text' || listType === 'picture' ? /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(UploadOutlined, null),
      disabled: disabled
    }, uploadButtonText || '上传附件') : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, uploadButtonText || '上传附件')) : null;
  }, [maxCount, fileList, disabled, uploadButtonText, listType]);
  return /*#__PURE__*/React.createElement(Upload, {
    accept: accept,
    action: action,
    withCredentials: true,
    headers: headers,
    disabled: disabled,
    multiple: multiple,
    maxCount: maxCount,
    fileList: fileList,
    listType: listType,
    onPreview: onPreview,
    onChange: handleChangeFileList,
    beforeUpload: handleBeforeUploadForFileList
  }, renderUploadButton);
}
var index = /*#__PURE__*/memo(UploadImage);

export { index as default };
