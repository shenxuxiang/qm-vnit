"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message2 = _interopRequireDefault(require("antd/lib/message"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.regexp.to-string.js");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));
var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _react = _interopRequireWildcard(require("react"));
var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));
var _index = _interopRequireDefault(require("../PreviewImage/index.js"));
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
var _index2 = _interopRequireDefault(require("./RenderItem/index.js"));
var _portal = _interopRequireDefault(require("../utils/portal.js"));
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor2(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) {
  var keys = (0, _keys.default)(object);
  if (_getOwnPropertySymbols.default) {
    var symbols = (0, _getOwnPropertySymbols.default)(object);
    enumerableOnly && (symbols = (0, _filter.default)(symbols).call(symbols, function (sym) {
      return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(target, (0, _getOwnPropertyDescriptors.default)(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, (0, _getOwnPropertyDescriptor.default)(source, key));
    });
  }
  return target;
}
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
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var fileList = state.fileList,
    previewImgs = state.previewImgs,
    showPreviewImage = state.showPreviewImage;
  var _inputRef = (0, _react.useRef)();
  var _uploadButtonRef = (0, _react.useRef)();
  var _isInternalChange = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (typeof value === 'undefined') {
      return;
    } else if (_isInternalChange.current) {
      _isInternalChange.current = false;
      return;
    } else {
      setState({
        fileList: value
      });
    }
  }, [value]);
  function handleFileChange(event) {
    var newFiles = (0, _from.default)(event.target.files);
    // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
    _inputRef.current.value = '';
    // 判断当前文件数量是否已经超出 maxCount
    if (maxCount && fileList.length >= maxCount) {
      _message2.default.warning("\u6700\u591A\u53EA\u80FD\u4E0A\u4F20".concat(maxCount, "\u4E2A\u6587\u4EF6\uFF01"));
      return;
    }
    if (maxSize) {
      var length = newFiles.length;
      while (length--) {
        var file = newFiles[length];
        if (file.size > props.maxSize) {
          (0, _splice.default)(newFiles).call(newFiles, length, 1);
          _message2.default.warning(file.name + '文件过大无法上传！');
        }
      }
      if (newFiles.length <= 0) return;
    }
    if (maxCount) {
      // 计算还可以添加文件的数量
      var rest = maxCount - fileList.length;
      rest < newFiles.length && _message2.default.warning("\u6700\u591A\u53EA\u80FD\u4E0A\u4F20".concat(maxCount, "\u4E2A\u6587\u4EF6\uFF01"));
      newFiles = (0, _slice.default)(newFiles).call(newFiles, 0, rest);
    }
    var newFileList = (0, _map.default)(newFiles).call(newFiles, function (file) {
      var _context;
      return {
        percent: 0,
        name: file.name,
        rawResource: file,
        status: 'loading',
        uid: (0, _slice.default)(_context = Math.random().toString(32)).call(_context, 2) + Date.now()
      };
    });
    newFileList = (0, _concat.default)(fileList).call(fileList, newFileList);
    _isInternalChange.current = true;
    setState({
      fileList: newFileList
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(newFileList);
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
    var newFileList = (0, _toConsumableArray2.default)(fileList);
    var target = (0, _find.default)(newFileList).call(newFileList, function (file) {
      return file.uid === uid;
    });
    if (target) {
      target.status = 'done';
      target.percent = 100;
      target.response = res;
      _isInternalChange.current = true;
      setState({
        fileList: newFileList
      });
      onChange === null || onChange === void 0 ? void 0 : onChange(newFileList);
    }
  }
  // 图片上传失败
  function handleUploadError(uid, error) {
    onError === null || onError === void 0 ? void 0 : onError(error);
    var newFileList = (0, _toConsumableArray2.default)(fileList);
    var target = (0, _find.default)(newFileList).call(newFileList, function (file) {
      return file.uid === uid;
    });
    if (target) {
      target.status = 'error';
      _isInternalChange.current = true;
      setState({
        fileList: newFileList
      });
      onChange === null || onChange === void 0 ? void 0 : onChange(newFileList);
    }
  }
  // 移除
  function handleRemoveItem(uid) {
    var newFileList = (0, _filter.default)(fileList).call(fileList, function (file) {
      return file.uid !== uid;
    });
    _isInternalChange.current = true;
    setState({
      fileList: newFileList
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(newFileList);
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-upload-image"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "qm-vnit-upload-image-list"
  }, (0, _map.default)(fileList).call(fileList, function (file) {
    return /*#__PURE__*/_react.default.createElement(_index2.default, _objectSpread(_objectSpread({}, file), {}, {
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
  }), !maxCount || fileList.length < maxCount ? /*#__PURE__*/_react.default.createElement("li", {
    ref: _uploadButtonRef,
    onClick: function onClick() {
      var _inputRef$current;
      return (_inputRef$current = _inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
    },
    className: "qm-vnit-upload-image-label".concat(disabled ? ' disabled' : '')
  }, children ? children : /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-upload-image-slot"
  }, /*#__PURE__*/_react.default.createElement(_PlusOutlined.default, {
    style: {
      fontSize: 16,
      marginBottom: 10,
      color: 'rgba(0, 0, 0, 0.8)'
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, "\u4E0A\u4F20\u56FE\u7247")), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    ref: _inputRef,
    accept: accept,
    disabled: disabled,
    multiple: multiple,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  })) : null)), typeof onPreview !== 'function' ? /*#__PURE__*/_react.default.createElement(_portal.default, null, /*#__PURE__*/_react.default.createElement(_index.default, {
    imgs: previewImgs,
    index: 0,
    open: showPreviewImage,
    onClose: function onClose() {
      return setState({
        showPreviewImage: false
      });
    }
  })) : null);
}
var UploadImage$1 = /*#__PURE__*/(0, _react.memo)(UploadImage);
exports.default = UploadImage$1;