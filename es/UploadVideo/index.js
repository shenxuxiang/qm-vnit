import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import React, { memo, useRef, useCallback } from 'react';
import UploadImage from '../UploadImage/index.js';
import useReducer from '../utils/useReducer.js';
import Portal from '../utils/portal.js';
import Icon from '../Icon/index.js';
import './index.css';

function initialState() {
  return {
    videoURL: '',
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
    accept = _props$accept === void 0 ? 'video/*' : _props$accept;
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var videoURL = state.videoURL,
    showPreview = state.showPreview;
  var videoRef = useRef();
  var videoPlayer = useRef();
  var videoPreviewRef = useRef();
  function handleCanPlay(event) {
    var video = event.target;
    var videoWidth = video.videoWidth,
      videoHeight = video.videoHeight;
    var ratio = videoWidth / videoHeight;
    var maxWidth = document.documentElement.clientWidth * 0.7;
    var maxHeight = document.documentElement.clientWidth * 0.8;
    var width;
    var height;
    if (ratio > maxWidth / maxHeight) {
      if (videoWidth > maxWidth) {
        width = maxWidth;
        height = width / ratio;
      } else {
        width = videoWidth;
        height = videoHeight;
      }
    } else {
      if (videoHeight > maxHeight) {
        height = maxHeight;
        width = height / ratio;
      } else {
        width = videoWidth;
        height = videoHeight;
      }
    }
    video.width = width;
    video.height = height;
  }
  function handlePreviewFile(url) {
    videoPlayer.current.style.display = '';
    requestAnimationFrame(function () {
      return setState({
        videoURL: url,
        showPreview: true
      });
    });
  }
  function handleClosePreview(event) {
    if (event.target === event.currentTarget) {
      videoPreviewRef.current.pause();
      setState({
        videoURL: '',
        showPreview: false
      });
      setTimeout(function () {
        videoPlayer.current.style.display = 'none';
      }, 300);
    }
  }
  var renderItem = useCallback(function (_ref) {
    var url = _ref.url;
    if (!url) return null;
    return /*#__PURE__*/React.createElement("video", {
      ref: videoRef,
      className: "qm-vnit-upload-video",
      muted: true,
      preload: "auto"
    }, /*#__PURE__*/React.createElement("source", {
      src: url
    }));
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
    ref: videoPlayer,
    style: {
      display: 'none'
    },
    onClick: handleClosePreview,
    className: "qm-vnit-upload-video-previewe".concat(showPreview ? ' show' : '')
  }, videoURL ? /*#__PURE__*/React.createElement("video", {
    controls: true,
    ref: videoPreviewRef,
    onCanPlay: handleCanPlay,
    className: "qm-vnit-upload-video-preview-content"
  }, /*#__PURE__*/React.createElement("source", {
    src: videoURL
  })) : null, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    onClick: handleClosePreview,
    className: "qm-vnit-upload-video-preview-close-icon"
  }))));
}
var index = /*#__PURE__*/memo(UploadVideo);

export { index as default };
