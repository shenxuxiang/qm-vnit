"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _PictureOutlined = _interopRequireDefault(require("@ant-design/icons/PictureOutlined"));
var _index = _interopRequireDefault(require("../UploadImage/index.js"));
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
var _portal = _interopRequireDefault(require("../utils/portal.js"));
var _index2 = _interopRequireDefault(require("../Icon/index.js"));
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function initialState() {
  return {
    audioURL: '',
    showPreview: false
  };
}
function UploadVideo(props) {
  var value = props.value,
    action = props.action,
    method = props.method,
    maxSize = props.maxSize,
    onError = props.onError,
    headers = props.headers,
    onChange = props.onChange,
    maxCount = props.maxCount,
    disabled = props.disabled,
    multiple = props.multiple,
    _props$accept = props.accept,
    accept = _props$accept === void 0 ? 'audio/*' : _props$accept;
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var audioURL = state.audioURL,
    showPreview = state.showPreview;
  var audioPlayer = (0, _react.useRef)();
  var audioPreviewRef = (0, _react.useRef)();
  function handlePreviewFile(url) {
    audioPlayer.current.style.display = '';
    requestAnimationFrame(function () {
      return setState({
        audioURL: url,
        showPreview: true
      });
    });
  }
  function handleClosePreview(event) {
    if (event.target === event.currentTarget) {
      audioPreviewRef.current.pause();
      setState({
        audioURL: '',
        showPreview: false
      });
      setTimeout(function () {
        audioPlayer.current.style.display = 'none';
      }, 300);
    }
  }
  var renderItem = (0, _react.useCallback)(function (_ref) {
    var name = _ref.name;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-upload-audio-render-item"
    }, /*#__PURE__*/_react.default.createElement(_PictureOutlined.default, {
      style: {
        fontSize: 36,
        color: 'rgb(64, 169, 255)'
      }
    }), /*#__PURE__*/_react.default.createElement("p", null, name));
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.default, {
    value: value,
    action: action,
    method: method,
    accept: accept,
    headers: headers,
    maxSize: maxSize,
    multiple: multiple,
    maxCount: maxCount,
    disabled: disabled,
    onError: onError,
    onChange: onChange,
    renderItem: renderItem,
    onPreview: handlePreviewFile
  }), /*#__PURE__*/_react.default.createElement(_portal.default, null, /*#__PURE__*/_react.default.createElement("div", {
    ref: audioPlayer,
    style: {
      display: 'none'
    },
    onClick: handleClosePreview,
    className: "qm-vnit-upload-audio-previewe".concat(showPreview ? ' show' : '')
  }, audioURL ? /*#__PURE__*/_react.default.createElement("audio", {
    controls: true,
    ref: audioPreviewRef,
    className: "qm-vnit-upload-audio-preview-content"
  }, /*#__PURE__*/_react.default.createElement("source", {
    src: audioURL
  })) : null, /*#__PURE__*/_react.default.createElement(_index2.default, {
    name: "close",
    onClick: handleClosePreview,
    className: "qm-vnit-upload-audio-preview-close-icon"
  }))));
}
var index = /*#__PURE__*/(0, _react.memo)(UploadVideo);
exports.default = index;