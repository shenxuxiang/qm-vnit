import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import React, { memo, useRef, useCallback } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import UploadImage from '../UploadImage/index.js';
import useReducer from '../utils/useReducer.js';
import Portal from '../utils/portal.js';
import Icon from '../Icon/index.js';
import './index.css';

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
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var audioURL = state.audioURL,
    showPreview = state.showPreview;
  var audioPlayer = useRef();
  var audioPreviewRef = useRef();
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
  var renderItem = useCallback(function (_ref) {
    var name = _ref.name;
    return /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-upload-audio-render-item"
    }, /*#__PURE__*/React.createElement(PictureOutlined, {
      style: {
        fontSize: 36,
        color: 'rgb(64, 169, 255)'
      }
    }), /*#__PURE__*/React.createElement("p", null, name));
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UploadImage, {
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
  }), /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement("div", {
    ref: audioPlayer,
    style: {
      display: 'none'
    },
    onClick: handleClosePreview,
    className: "qm-vnit-upload-audio-previewe".concat(showPreview ? ' show' : '')
  }, audioURL ? /*#__PURE__*/React.createElement("audio", {
    controls: true,
    ref: audioPreviewRef,
    className: "qm-vnit-upload-audio-preview-content"
  }, /*#__PURE__*/React.createElement("source", {
    src: audioURL
  })) : null, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    onClick: handleClosePreview,
    className: "qm-vnit-upload-audio-preview-close-icon"
  }))));
}
var index = /*#__PURE__*/memo(UploadVideo);

export { index as default };
