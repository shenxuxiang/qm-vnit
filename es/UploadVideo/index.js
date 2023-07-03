import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _URL from '@babel/runtime-corejs3/core-js-stable/url';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Video from './Video/index.js';

/**
 * 图片上传组件
 * @param action   上传的路径
 * @param accept   指定上传的文件类型
 * @param headers  上传时携带的请求头
 * @param maxCount 最多可以上传多少个图片，0 表示不限制
 * @param multiple 是否支持多张图片上传
 * @param maxSize  限制图片的大小，0 表示不限制
 * @param value    可控，组件回显，也可用 Form 表单控件
 * @param onChange 可控，value 变化的回调函数，也可用 Form 表单控件
 * @param disabled 是否禁用
 */
function UploadVideo(props) {
  var action = props.action,
    headers = props.headers,
    _props$maxCount = props.maxCount,
    maxCount = _props$maxCount === void 0 ? 0 : _props$maxCount,
    _props$maxSize = props.maxSize,
    maxSize = _props$maxSize === void 0 ? 0 : _props$maxSize,
    value = props.value,
    onChange = props.onChange,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? true : _props$multiple,
    disabled = props.disabled,
    _props$accept = props.accept,
    accept = _props$accept === void 0 ? 'video/*' : _props$accept;
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
  // 图片预览功能
  var handlePreview = useCallback(function (file) {
    return _Promise.resolve(_URL.createObjectURL(file));
  }, []);
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
        var _index2 = _findIndexInstanceProperty(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        _spliceInstanceProperty(newFileList).call(newFileList, _index2, 1, file);
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
  var handleDeleteFile = useCallback(function (file) {
    isInternalModifiedFileList.current = true;
    setFileList(function (prevFileList) {
      return _filterInstanceProperty(prevFileList).call(prevFileList, function (item) {
        return item.uid !== file.uid;
      });
    });
  }, []);
  // eslint-disable-next-line
  var itemRender = useCallback(function (_, file) {
    return /*#__PURE__*/React.createElement(Video, {
      width: 100,
      height: 100,
      file: file,
      onDelete: handleDeleteFile,
      disabled: disabled
    });
  }, [handleDeleteFile, disabled]);
  return /*#__PURE__*/React.createElement(Upload, {
    action: action,
    withCredentials: true,
    accept: accept,
    headers: headers,
    disabled: disabled,
    multiple: multiple,
    maxCount: maxCount,
    fileList: fileList,
    listType: "picture-card",
    itemRender: itemRender,
    previewFile: handlePreview,
    onChange: handleChangeFileList,
    beforeUpload: handleBeforeUploadForFileList
  }, maxCount === 0 || (fileList === null || fileList === void 0 ? void 0 : fileList.length) < maxCount ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlusOutlined, {
    disabled: disabled
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, "\u4E0A\u4F20")) : null);
}
var index = /*#__PURE__*/memo(UploadVideo);

export { index as default };
