import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import React, { memo, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PreviewImage from '../PreviewImage/index.js';
import useReducer from '../utils/useReducer.js';
import RenderItem from './RenderItem/index.js';
import Portal from '../utils/portal.js';
import { message } from 'antd';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function initialState() {
  return {
    showPreviewImage: false,
    fileList: [],
    previewImgs: []
  };
}
function UploadImage(props) {
  var value = props.value,
    action = props.action,
    method = props.method,
    maxSize = props.maxSize,
    onError = props.onError,
    headers = props.headers,
    maxCount = props.maxCount,
    multiple = props.multiple,
    disabled = props.disabled,
    children = props.children,
    onChange = props.onChange,
    onPreview = props.onPreview,
    renderItem = props.renderItem,
    _props$accept = props.accept,
    accept = _props$accept === void 0 ? 'image/*' : _props$accept;
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    _useReducer2$ = _useReducer2[0],
    fileList = _useReducer2$.fileList,
    previewImgs = _useReducer2$.previewImgs,
    showPreviewImage = _useReducer2$.showPreviewImage,
    setState = _useReducer2[1];
  var _inputRef = useRef();
  var _uploadButtonRef = useRef();
  var _isInternalModified = useRef(false);
  useEffect(function () {
    if (typeof value === 'undefined') {
      return;
    } else if (_isInternalModified.current) {
      _isInternalModified.current = false;
      return;
    } else {
      setState({
        fileList: value
      });
    }
  }, [value]);
  function handleFileChange(event) {
    var newFiles = _Array$from(event.target.files);
    // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
    _inputRef.current.value = '';
    // // 判断当前文件数量是否已经超出 maxCount
    // if (maxCount && fileList.length >= maxCount) {
    //   message.warning(`最多只能上传${maxCount}个文件！`);
    //   return;
    // }
    if (maxSize) {
      var length = newFiles.length;
      while (length--) {
        var file = newFiles[length];
        if (file.size > props.maxSize) {
          _spliceInstanceProperty(newFiles).call(newFiles, length, 1);
          message.warning(file.name + '文件过大无法上传！');
        }
      }
      if (newFiles.length <= 0) return;
    }
    if (maxCount) {
      // 计算还可以添加文件的数量
      var rest = maxCount - fileList.length;
      rest < newFiles.length && message.warning("\u6700\u591A\u53EA\u80FD\u4E0A\u4F20".concat(maxCount, "\u4E2A\u6587\u4EF6\uFF01"));
      newFiles = _sliceInstanceProperty(newFiles).call(newFiles, 0, rest);
    }
    var newFileList = _mapInstanceProperty(newFiles).call(newFiles, function (file) {
      var _context;
      return {
        percent: 0,
        name: file.name,
        rawResource: file,
        status: 'loading',
        uid: _sliceInstanceProperty(_context = Math.random().toString(32)).call(_context, 2) + Date.now()
      };
    });
    newFileList = _concatInstanceProperty(fileList).call(fileList, newFileList);
    _isInternalModified.current = true;
    setState({
      fileList: newFileList
    });
    onChange === null || onChange === void 0 || onChange(newFileList);
    if (!maxCount || newFileList.length < maxCount) {
      // 每次上传时，给上传按钮一个向右移动的动效。
      _uploadButtonRef.current.classList.add('enter-from');
      requestAnimationFrame(function () {
        return _uploadButtonRef.current.classList.remove('enter-from');
      });
    }
  }
  // 图片上传成功
  function handleUploadSuccess(uid, res) {
    var newFileList = _toConsumableArray(fileList);
    var target = _findInstanceProperty(newFileList).call(newFileList, function (file) {
      return file.uid === uid;
    });
    if (target) {
      target.status = 'done';
      target.percent = 100;
      target.response = res;
      _isInternalModified.current = true;
      setState({
        fileList: newFileList
      });
      onChange === null || onChange === void 0 || onChange(newFileList);
    }
  }
  // 图片上传失败
  function handleUploadError(uid, error) {
    onError === null || onError === void 0 || onError(error);
    var newFileList = _toConsumableArray(fileList);
    var target = _findInstanceProperty(newFileList).call(newFileList, function (file) {
      return file.uid === uid;
    });
    if (target) {
      target.status = 'error';
      _isInternalModified.current = true;
      setState({
        fileList: newFileList
      });
      onChange === null || onChange === void 0 || onChange(newFileList);
    }
  }
  // 移除
  function handleRemoveItem(uid) {
    var newFileList = _filterInstanceProperty(fileList).call(fileList, function (file) {
      return file.uid !== uid;
    });
    _isInternalModified.current = true;
    setState({
      fileList: newFileList
    });
    onChange === null || onChange === void 0 || onChange(newFileList);
  }
  function handlePreviewImage(url, rawResource) {
    if (typeof onPreview === 'function') {
      onPreview(url, rawResource);
    } else {
      setState({
        previewImgs: [url],
        showPreviewImage: true
      });
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "qm-vnit-upload-image-list"
  }, _mapInstanceProperty(fileList).call(fileList, function (file) {
    return /*#__PURE__*/React.createElement(RenderItem, _objectSpread(_objectSpread({}, file), {}, {
      key: file.uid,
      method: method,
      action: action,
      headers: headers,
      disabled: disabled,
      renderItem: renderItem,
      onRemove: handleRemoveItem,
      onError: handleUploadError,
      onPreview: handlePreviewImage,
      onSuccess: handleUploadSuccess
    }));
  }), !maxCount || fileList.length < maxCount ? ( /*#__PURE__*/React.createElement("li", {
    ref: _uploadButtonRef,
    onClick: function onClick() {
      var _inputRef$current;
      return (_inputRef$current = _inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
    },
    className: "qm-vnit-upload-image-label".concat(disabled ? ' disabled' : '')
  }, children ? children : ( /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image-slot"
  }, /*#__PURE__*/React.createElement(PlusOutlined, {
    style: {
      fontSize: 16,
      marginBottom: 10,
      color: 'rgba(0, 0, 0, 0.8)'
    }
  }), /*#__PURE__*/React.createElement("div", null, "\u4E0A\u4F20\u56FE\u7247"))), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: _inputRef,
    accept: accept,
    disabled: disabled,
    multiple: multiple,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }))) : null)), typeof onPreview !== 'function' ? ( /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(PreviewImage, {
    imgs: previewImgs,
    index: 0,
    open: showPreviewImage,
    onClose: function onClose() {
      return setState({
        showPreviewImage: false
      });
    }
  }))) : null);
}
var UploadImage$1 = /*#__PURE__*/memo(UploadImage);

export { UploadImage$1 as default };
