"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _url = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/url"));
var _lastIndexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/last-index-of"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _react = _interopRequireWildcard(require("react"));
var _PictureOutlined = _interopRequireDefault(require("@ant-design/icons/PictureOutlined"));
var _DeleteOutlined = _interopRequireDefault(require("@ant-design/icons/DeleteOutlined"));
var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _portal = _interopRequireDefault(require("../../utils/portal.js"));
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
/**
 * 视频预览功能组件
 * @param { width }    video 容器的宽度
 * @param { height }   video 容器的高度
 * @param { style }    video 容器的样式
 * @param { file }     视频文件
 * @param { onDelete } 删除该视频的回调函数
 */
function Video(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    showPreviewModal = _useState2[0],
    setPreviewModal = _useState2[1];
  var width = props.width,
    height = props.height,
    style = props.style,
    file = props.file,
    onDelete = props.onDelete,
    disabled = props.disabled;
  // 视频元素
  var videoRef = (0, _react.useRef)();
  // 预览视频元素
  var previewVideoRef = (0, _react.useRef)();
  // 是否是第一次预览视频。我们根据该字段做了惰性加载
  var isFirstDisplayPreviewModal = (0, _react.useRef)(true);
  // 预览视频元素的样式，通过 video 的 oncanplay 事件提前计算出预览视频元素的样式。
  var previewVideoStyle = (0, _react.useRef)({});
  var videoSrc = (0, _react.useMemo)(function () {
    if (file !== null && file !== void 0 && file.url) {
      return file.url;
    } else {
      var url = file === null || file === void 0 ? void 0 : file.originFileObj;
      return url ? _url.default.createObjectURL(url) : '';
    }
  }, [file]);
  var type = (0, _react.useMemo)(function () {
    var _file$name$lastIndexO, _file$name, _file$name$lastIndexO2, _context;
    var index = (_file$name$lastIndexO = file === null || file === void 0 ? void 0 : (_file$name = file.name) === null || _file$name === void 0 ? void 0 : (_file$name$lastIndexO2 = (0, _lastIndexOf.default)(_file$name)) === null || _file$name$lastIndexO2 === void 0 ? void 0 : _file$name$lastIndexO2.call(_file$name, '.')) !== null && _file$name$lastIndexO !== void 0 ? _file$name$lastIndexO : -1;
    if (~index) return "video/".concat((0, _slice.default)(_context = file.name).call(_context, index + 1));
    return '';
  }, [file === null || file === void 0 ? void 0 : file.name]);
  var wrapperStyle = (0, _react.useMemo)(function () {
    var newStyle = _objectSpread({}, style);
    if (width) newStyle.width = width;
    if (height) newStyle.height = height;
    return newStyle;
  }, [width, height, style]);
  var handleVideoCanPlay = function handleVideoCanPlay() {
    var _videoRef$current = videoRef.current,
      videoWidth = _videoRef$current.videoWidth,
      videoHeight = _videoRef$current.videoHeight;
    var width = videoWidth;
    var height = videoHeight;
    // 如果视频高度大于 800，则根据视频原有比例进行缩小，否则按照原有尺寸展示。
    if (videoHeight > 800) {
      width = videoWidth / videoHeight * 800;
      height = 800;
    }
    previewVideoStyle.current = {
      width: width,
      height: height
    };
  };
  // 打开预览
  var handlePreviewVideo = (0, _react.useCallback)(function () {
    isFirstDisplayPreviewModal.current = false;
    document.documentElement.style.overflow = 'hidden';
    setPreviewModal(function () {
      return true;
    });
  }, []);
  // 关闭预览
  var handleClosePreviewVideo = (0, _react.useCallback)(function () {
    var _previewVideoRef$curr;
    document.documentElement.style.overflow = '';
    setPreviewModal(false);
    (_previewVideoRef$curr = previewVideoRef.current) === null || _previewVideoRef$curr === void 0 ? void 0 : _previewVideoRef$curr.pause();
  }, []);
  var handleDeleteFile = (0, _react.useCallback)(function () {
    onDelete === null || onDelete === void 0 ? void 0 : onDelete(file);
  }, [onDelete, file]);
  if (file.status === 'uploading') {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: wrapperStyle,
      className: "qm-vnit-uploadvideo-video-wrapper"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-uploadvideo-video-loading"
    }, "\u6587\u4EF6\u4E0A\u4F20\u4E2D"), /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-uploadvideo-video-progress-bar"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "qm-vnit-uploadvideo-video-progress",
      style: {
        width: "".concat(file.percent, "%")
      }
    })));
  } else if (file.status === 'error') {
    return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: "\u4E0A\u4F20\u9519\u8BEF"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: wrapperStyle,
      className: "qm-vnit-uploadvideo-video-wrapper qm-vnit-uploadvideo-video-error"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-uploadvideo-video-file-picture"
    }, /*#__PURE__*/_react.default.createElement(_PictureOutlined.default, null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-uploadvideo-video-filename"
    }, file.name), /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-uploadvideo-video-preview"
    }, /*#__PURE__*/_react.default.createElement(_DeleteOutlined.default, {
      className: "qm-vnit-uploadvideo-video-preview-icon",
      onClick: handleDeleteFile
    }))));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle,
    className: "qm-vnit-uploadvideo-video-wrapper"
  }, /*#__PURE__*/_react.default.createElement("video", {
    muted: true,
    preload: "auto",
    ref: videoRef,
    className: "qm-vnit-uploadvideo-video-player",
    onCanPlay: handleVideoCanPlay
  }, /*#__PURE__*/_react.default.createElement("source", {
    type: type,
    src: videoSrc
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-uploadvideo-video-preview"
  }, /*#__PURE__*/_react.default.createElement(_EyeOutlined.default, {
    className: "qm-vnit-uploadvideo-video-preview-icon",
    onClick: handlePreviewVideo
  }), disabled ? null : /*#__PURE__*/_react.default.createElement(_DeleteOutlined.default, {
    className: "qm-vnit-uploadvideo-video-preview-icon",
    onClick: handleDeleteFile
  })), isFirstDisplayPreviewModal.current && !showPreviewModal ? null : /*#__PURE__*/_react.default.createElement(_portal.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-uploadvideo-video-preview-box".concat(showPreviewModal ? ' qm-vnit-uploadvideo-video-show' : ''),
    onClick: handleClosePreviewVideo
  }, /*#__PURE__*/_react.default.createElement("video", {
    muted: true,
    controls: true,
    autoPlay: true,
    preload: "auto",
    ref: previewVideoRef,
    style: previewVideoStyle.current,
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    className: "qm-vnit-uploadvideo-video-preview-player"
  }, /*#__PURE__*/_react.default.createElement("source", {
    type: type,
    src: videoSrc
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "qm-vnit-uploadvideo-video-close-icon"
  }, /*#__PURE__*/_react.default.createElement(_CloseOutlined.default, null)))));
}
var Video$1 = /*#__PURE__*/(0, _react.memo)(Video);
exports.default = Video$1;