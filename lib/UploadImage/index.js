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
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
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
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor2(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) {
  var t = (0, _keys.default)(e);
  if (_getOwnPropertySymbols.default) {
    var o = (0, _getOwnPropertySymbols.default)(e);
    r && (o = (0, _filter.default)(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor.default)(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty2.default)(e, r, t[r]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(e, (0, _getOwnPropertyDescriptors.default)(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, (0, _getOwnPropertyDescriptor.default)(t, r));
    });
  }
  return e;
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
    _useReducer2$ = _useReducer2[0],
    fileList = _useReducer2$.fileList,
    previewImgs = _useReducer2$.previewImgs,
    showPreviewImage = _useReducer2$.showPreviewImage,
    setState = _useReducer2[1];
  var _inputRef = (0, _react.useRef)();
  var _uploadButtonRef = (0, _react.useRef)();
  var _isInternalModified = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
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
    var newFiles = (0, _from.default)(event.target.files);
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
    var newFileList = (0, _toConsumableArray2.default)(fileList);
    var target = (0, _find.default)(newFileList).call(newFileList, function (file) {
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
    var newFileList = (0, _toConsumableArray2.default)(fileList);
    var target = (0, _find.default)(newFileList).call(newFileList, function (file) {
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
    var newFileList = (0, _filter.default)(fileList).call(fileList, function (file) {
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
  }), !maxCount || fileList.length < maxCount ? ( /*#__PURE__*/_react.default.createElement("li", {
    ref: _uploadButtonRef,
    onClick: function onClick() {
      var _inputRef$current;
      return (_inputRef$current = _inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
    },
    className: "qm-vnit-upload-image-label".concat(disabled ? ' disabled' : '')
  }, children ? children : ( /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-upload-image-slot"
  }, /*#__PURE__*/_react.default.createElement(_PlusOutlined.default, {
    style: {
      fontSize: 16,
      marginBottom: 10,
      color: 'rgba(0, 0, 0, 0.8)'
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, "\u4E0A\u4F20\u56FE\u7247"))), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    ref: _inputRef,
    accept: accept,
    disabled: disabled,
    multiple: multiple,
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }))) : null)), typeof onPreview !== 'function' ? ( /*#__PURE__*/_react.default.createElement(_portal.default, null, /*#__PURE__*/_react.default.createElement(_index.default, {
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
var UploadImage$1 = exports.default = /*#__PURE__*/(0, _react.memo)(UploadImage);