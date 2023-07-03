"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _upload = _interopRequireDefault(require("antd/lib/upload"));
var _message2 = _interopRequireDefault(require("antd/lib/message"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _url = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/url"));
var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));
var _react = _interopRequireWildcard(require("react"));
var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));
var _index4 = _interopRequireDefault(require("../PreviewImage/index.js"));
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
function UploadImage(props) {
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
    accept = _props$accept === void 0 ? 'image/*' : _props$accept,
    onPreview = props.onPreview;
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    fileList = _useState2[0],
    setFileList = _useState2[1];
  var _useState3 = (0, _react.useState)({
      open: false,
      index: 0,
      imgs: []
    }),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    previewImageInfo = _useState4[0],
    updatePreviewImageInfo = _useState4[1];
  // 是否是内部更新的 fileList
  var isInternalModifiedFileList = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (isInternalModifiedFileList.current) {
      onChange === null || onChange === void 0 ? void 0 : onChange(fileList);
    }
  }, [fileList]);
  (0, _react.useEffect)(function () {
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
  var handlePreview = (0, _react.useCallback)(function (file) {
    var _context;
    updatePreviewImageInfo({
      open: true,
      index: (0, _findIndex.default)(fileList).call(fileList, function (item) {
        return item.uid === file.uid;
      }),
      imgs: (0, _filter.default)(_context = (0, _map.default)(fileList).call(fileList, function (item) {
        if (item.url) {
          return item.url;
        } else {
          return _url.default.createObjectURL(item.originFileObj);
        }
      })).call(_context, Boolean)
    });
  }, [fileList]);
  var handleClosePreviewImage = (0, _react.useCallback)(function () {
    updatePreviewImageInfo(_objectSpread(_objectSpread({}, previewImageInfo), {}, {
      open: false
    }));
  }, [previewImageInfo]);
  // 图片上传事件
  var handleChangeFileList = (0, _react.useCallback)(function (field) {
    var file = field.file;
    // maxSize === 0 表示不对文件大小进行限制。
    if (maxSize > 0 && file.size > maxSize * 1024 * 1024) return;
    function setStateAction(prevFileList) {
      var newFileList = (0, _toConsumableArray2.default)(prevFileList);
      // maxCount === 0 表示不限制上传的数量
      if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
        var index = (0, _findIndex.default)(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        if (index >= 0) (0, _splice.default)(newFileList).call(newFileList, index, 1, file);
        return prevFileList;
      } else if (file.status === 'uploading') {
        var _index = (0, _findIndex.default)(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        if (~_index) {
          (0, _splice.default)(newFileList).call(newFileList, _index, 1, file);
        } else {
          newFileList.push(file);
        }
      } else if (file.status === 'error') {
        var uid = file.uid,
          name = file.name,
          status = file.status;
        var _index2 = (0, _findIndex.default)(newFileList).call(newFileList, function (item) {
          return item.uid === uid;
        });
        (0, _splice.default)(newFileList).call(newFileList, _index2, 1, {
          uid: uid,
          name: name,
          status: status
        });
      } else if (file.status === 'done') {
        var _file$response;
        var _index3 = (0, _findIndex.default)(newFileList).call(newFileList, function (item) {
          return item.uid === file.uid;
        });
        if ((file === null || file === void 0 ? void 0 : (_file$response = file.response) === null || _file$response === void 0 ? void 0 : _file$response.code) !== 0) {
          (0, _splice.default)(newFileList).call(newFileList, _index3, 1, {
            uid: file.uid,
            name: file.name,
            status: 'error'
          });
        } else {
          (0, _splice.default)(newFileList).call(newFileList, _index3, 1, file);
        }
      } else if (file.status === 'removed') {
        newFileList = (0, _filter.default)(prevFileList).call(prevFileList, function (item) {
          return item.uid !== file.uid;
        });
      }
      return newFileList;
    }
    isInternalModifiedFileList.current = true;
    setFileList(setStateAction);
  }, [fileList, maxSize, maxCount]);
  // 返回 false 表示不上传图片。
  var handleBeforeUploadForFileList = (0, _react.useCallback)(function (file) {
    // 如果maxSize === 0 表示不对文件大小进行限制。
    if (maxSize === 0) return true;
    if (file.size > maxSize * 1024 * 1024) {
      _message2.default.warning("\u4E0A\u4F20\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7".concat(maxSize, "M"));
      return false;
    } else {
      return true;
    }
  }, [maxSize]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_upload.default, {
    action: action,
    withCredentials: true,
    accept: accept,
    headers: headers,
    disabled: disabled,
    multiple: multiple,
    maxCount: maxCount,
    fileList: fileList,
    listType: "picture-card",
    onChange: handleChangeFileList,
    onPreview: onPreview || handlePreview,
    beforeUpload: handleBeforeUploadForFileList
  }, maxCount === 0 || (fileList === null || fileList === void 0 ? void 0 : fileList.length) < maxCount ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_PlusOutlined.default, {
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 8
    }
  }, "\u4E0A\u4F20")) : null), /*#__PURE__*/_react.default.createElement(_index4.default, _objectSpread({
    hasPerformance: true,
    onClose: handleClosePreviewImage
  }, previewImageInfo)));
}
var index = /*#__PURE__*/(0, _react.memo)(UploadImage);
exports.default = index;