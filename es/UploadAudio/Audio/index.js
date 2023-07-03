import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _URL from '@babel/runtime-corejs3/core-js-stable/url';
import _lastIndexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import React, { memo, useState, useRef, useMemo, useCallback } from 'react';
import { Tooltip } from 'antd';
import { PictureOutlined, DeleteOutlined, PlayCircleOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import Portal from '../../utils/portal.js';
import './index.css';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 音频预览功能组件
 * @param { width }    audio 容器的宽度
 * @param { height }   audio 容器的高度
 * @param { style }    audio 容器的样式
 * @param { file }     音频文件
 * @param { onDelete } 删除该音频的回调函数
 */
function Audio(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showPreviewModal = _useState2[0],
    setPreviewModal = _useState2[1];
  var width = props.width,
    height = props.height,
    style = props.style,
    file = props.file,
    onDelete = props.onDelete,
    disabled = props.disabled;
  // 预览音频元素
  var previewAudioRef = useRef();
  // 是否是第一次预览音频。我们根据该字段做了惰性加载
  var isFirstDisplayPreviewModal = useRef(true);
  var audioSrc = useMemo(function () {
    if (file !== null && file !== void 0 && file.url) {
      return file.url;
    } else {
      var url = file === null || file === void 0 ? void 0 : file.originFileObj;
      return url ? _URL.createObjectURL(url) : '';
    }
  }, [file]);
  var type = useMemo(function () {
    var _file$name$lastIndexO, _file$name, _file$name$lastIndexO2, _context;
    var index = (_file$name$lastIndexO = file === null || file === void 0 ? void 0 : (_file$name = file.name) === null || _file$name === void 0 ? void 0 : (_file$name$lastIndexO2 = _lastIndexOfInstanceProperty(_file$name)) === null || _file$name$lastIndexO2 === void 0 ? void 0 : _file$name$lastIndexO2.call(_file$name, '.')) !== null && _file$name$lastIndexO !== void 0 ? _file$name$lastIndexO : -1;
    if (~index) return "audio/".concat(_sliceInstanceProperty(_context = file.name).call(_context, index + 1));
    return '';
  }, [file.name]);
  var wrapperStyle = useMemo(function () {
    var newStyle = _objectSpread({}, style);
    if (width) newStyle.width = width;
    if (height) newStyle.height = height;
    return newStyle;
  }, [width, height, style]);
  // 打开预览
  var handlePreviewAudio = useCallback(function () {
    isFirstDisplayPreviewModal.current = false;
    document.documentElement.style.overflow = 'hidden';
    setPreviewModal(function () {
      return true;
    });
  }, []);
  // 关闭预览
  var handleClosePreviewAudio = useCallback(function () {
    var _previewAudioRef$curr;
    document.documentElement.style.overflow = '';
    setPreviewModal(false);
    (_previewAudioRef$curr = previewAudioRef.current) === null || _previewAudioRef$curr === void 0 ? void 0 : _previewAudioRef$curr.pause();
  }, []);
  var handleDeleteFile = useCallback(function () {
    onDelete === null || onDelete === void 0 ? void 0 : onDelete(file);
  }, [onDelete, file]);
  if (file.status === 'uploading') {
    return /*#__PURE__*/React.createElement("div", {
      style: wrapperStyle,
      className: "qm-vnit-uploadaudio-audio-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-uploadaudio-audio-loading"
    }, "\u6587\u4EF6\u4E0A\u4F20\u4E2D"), /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-uploadaudio-audio-progress-bar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "qm-vnit-uploadaudio-audio-progress",
      style: {
        width: "".concat(file.percent, "%")
      }
    })));
  } else if (file.status === 'error') {
    return /*#__PURE__*/React.createElement(Tooltip, {
      title: "\u4E0A\u4F20\u9519\u8BEF"
    }, /*#__PURE__*/React.createElement("div", {
      style: wrapperStyle,
      className: "qm-vnit-uploadaudio-audio-wrapper qm-vnit-uploadaudio-audio-error"
    }, /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-uploadaudio-audio-file-picture"
    }, /*#__PURE__*/React.createElement(PictureOutlined, null)), /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-uploadaudio-audio-filename"
    }, file.name), /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-uploadaudio-audio-preview"
    }, /*#__PURE__*/React.createElement(DeleteOutlined, {
      className: "qm-vnit-uploadaudio-audio-preview-icon",
      onClick: handleDeleteFile
    }))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: wrapperStyle,
    className: "qm-vnit-uploadaudio-audio-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-uploadaudio-audio-file-picture"
  }, /*#__PURE__*/React.createElement(PlayCircleOutlined, {
    disabled: disabled
  })), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-uploadaudio-audio-filename"
  }, file.name), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-uploadaudio-audio-preview"
  }, /*#__PURE__*/React.createElement(EyeOutlined, {
    className: "qm-vnit-uploadaudio-audio-preview-icon",
    onClick: handlePreviewAudio
  }), disabled ? null : /*#__PURE__*/React.createElement(DeleteOutlined, {
    className: "qm-vnit-uploadaudio-audio-preview-icon",
    onClick: handleDeleteFile
  })), isFirstDisplayPreviewModal.current && !showPreviewModal ? null : /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-uploadaudio-audio-preview-audio-box".concat(showPreviewModal ? ' show' : ''),
    onClick: handleClosePreviewAudio
  }, /*#__PURE__*/React.createElement("audio", {
    controls: true,
    autoPlay: true,
    preload: "auto",
    ref: previewAudioRef
  }, /*#__PURE__*/React.createElement("source", {
    type: type,
    src: audioSrc
  })), /*#__PURE__*/React.createElement("span", {
    className: "qm-vnit-uploadaudio-audio-close-icon"
  }, /*#__PURE__*/React.createElement(CloseOutlined, null)))));
}
var Audio$1 = /*#__PURE__*/memo(Audio);

export { Audio$1 as default };
