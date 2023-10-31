import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import getTransformProperties from '../utils/getTransformProperties.js';
import React, { memo, useRef, useEffect, useMemo } from 'react';
import img from '../assets/images/default.svg.js';
import { throttle, getViewportSize } from '../utils/index.js';
import useReducer from '../utils/useReducer.js';
import Toolbar from './Toolbar/index.js';
import Loading from './Loading/index.js';
import Icon from '../Icon/index.js';
import Slider from './Slider/index.js';
import Modal from './Modal/index.js';
import './index.css';

function initialState() {
  return {
    indictor: 0,
    spinning: false,
    isEndPage: false,
    isStartPage: false,
    imageURL: img
  };
}
/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 */
function PreviewImage(props) {
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var indictor = state.indictor,
    imageURL = state.imageURL,
    spinning = state.spinning;
  var onClose = props.onClose,
    open = props.open,
    imgs = props.imgs,
    _props$index = props.index,
    index = _props$index === void 0 ? 0 : _props$index,
    _props$pageSize = props.pageSize,
    pageSize = _props$pageSize === void 0 ? 9 : _props$pageSize;
  var imgRef = useRef();
  var isMounted = useRef(false);
  var originalLocation = useRef(null);
  var originalMousePoint = useRef(null);
  useEffect(function () {
    if (open) {
      isMounted.current = true;
      document.documentElement.style.overflow = 'hidden';
      // 每当重新打开组件时，去除图片上的镜像、放大、缩小、旋转
      imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [open]);
  useEffect(function () {
    if (!open) return;
    // 放大
    var handleEnlarge = function handleEnlarge() {
      var _context, _context2;
      var _getTransformProperti = getTransformProperties(imgRef.current),
        scaleX = _getTransformProperti.scaleX,
        scaleY = _getTransformProperti.scaleY,
        rotate = _getTransformProperti.rotate;
      imgRef.current.style.transform = _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = "scale(".concat(scaleX * 1.5, ", ")).call(_context2, scaleY * 1.5, ") rotate(")).call(_context, rotate, "deg)");
    };
    // 缩小
    var handleScaleShrink = function handleScaleShrink() {
      var _context3, _context4;
      var _getTransformProperti2 = getTransformProperties(imgRef.current),
        scaleX = _getTransformProperti2.scaleX,
        scaleY = _getTransformProperti2.scaleY,
        rotate = _getTransformProperti2.rotate;
      var x = scaleX / 1.5;
      var y = scaleY / 1.5;
      x = Math.abs(x) <= 1 ? Math.sign(x) : x;
      y = Math.abs(y) <= 1 ? Math.sign(y) : y;
      imgRef.current.style.transform = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = "scale(".concat(x, ", ")).call(_context4, y, ") rotate(")).call(_context3, rotate, "deg)");
    };
    var onMouseWheel = function onMouseWheel(event) {
      var deltaY = event.deltaY;
      if (deltaY < 0) {
        handleEnlarge();
      } else if (deltaY > 0) {
        handleScaleShrink();
      }
      imgRef.current.parentNode.style.cssText = "transform: translate3D(0px, 0px, 0px);";
    };
    var handleMouseWheel = throttle(onMouseWheel, 100);
    imgRef.current.parentNode.addEventListener('mousewheel', handleMouseWheel);
    return function () {
      imgRef.current.parentNode.removeEventListener('mousewheel', handleMouseWheel);
    };
  }, [open]);
  useEffect(function () {
    if (open) {
      var _indictor = index;
      if (index <= 0) {
        _indictor = 0;
      } else if (index >= imgs.length) {
        _indictor = imgs.length - 1;
      }
      setState({
        indictor: _indictor
      });
    }
  }, [open, index, imgs]);
  // 注意这里我将 open 添加到依赖项，其目的是为了防止初始化时 imageURL 没有取到值时，在 open 变化时重新取值。
  useEffect(function () {
    if (!open) return;
    setState({
      spinning: true,
      imageURL: img
    });
    var url = imgs[indictor];
    var image = new Image();
    image.onload = function () {
      return setState({
        spinning: false,
        imageURL: url
      });
    };
    image.src = url;
    return function () {
      image.onload = null;
    };
  }, [open, indictor, imgs]);
  var handlePrevItem = function handlePrevItem() {
    if (indictor <= 0) return;
    imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    setState(function (prev) {
      return {
        indictor: prev.indictor - 1
      };
    });
  };
  var handleNextItem = function handleNextItem() {
    if (indictor >= imgs.length - 1) return;
    imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    setState(function (prev) {
      return {
        indictor: prev.indictor + 1
      };
    });
  };
  var handleChangeIndex = function handleChangeIndex(index) {
    if (indictor === index) return;
    imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    setState({
      indictor: index
    });
  };
  var onMouseDown = function onMouseDown(event) {
    event.preventDefault();
    var clientX = event.clientX,
      clientY = event.clientY;
    var targetElement = imgRef.current.parentNode;
    var _getTransformProperti3 = getTransformProperties(targetElement),
      translateX = _getTransformProperti3.translateX,
      translateY = _getTransformProperti3.translateY;
    originalMousePoint.current = {
      x: clientX,
      y: clientY
    };
    originalLocation.current = {
      x: translateX,
      y: translateY
    };
  };
  // 当鼠标在屏幕上滑动时，图片跟随移动（前提是要先）
  var handleMouseUp = function handleMouseUp() {
    originalMousePoint.current = null;
    originalLocation.current = null;
    var element = imgRef.current.parentNode;
    var _getViewportSize = getViewportSize(),
      SW = _getViewportSize.width,
      SH = _getViewportSize.height;
    var _imgRef$current = imgRef.current,
      offsetWidth = _imgRef$current.offsetWidth,
      offsetHeight = _imgRef$current.offsetHeight;
    var _getTransformProperti4 = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti4.scaleX,
      scaleY = _getTransformProperti4.scaleY;
    var width = offsetWidth * scaleX;
    var height = offsetHeight * scaleY;
    // 当图像的宽高小于屏幕可视区的宽高时，图像回到最初的位置。
    if (width <= SW || height <= SH) {
      element.style.cssText = "\n        transform: translate3d(0px, 0px, 0px);\n        transition: transform .3s ease\n      ";
    } else {
      var _context5;
      var restX = (width - SW) / 2;
      var restY = (height - SH) / 2;
      var _getTransformProperti5 = getTransformProperties(element),
        translateX = _getTransformProperti5.translateX,
        translateY = _getTransformProperti5.translateY;
      if (translateX > restX) {
        translateX = restX;
      } else if (translateX < -restX) {
        translateX = -restX;
      }
      if (translateY > restY) {
        translateY = restY;
      } else if (translateY < -restY) {
        translateY = -restY;
      }
      element.style.cssText = _concatInstanceProperty(_context5 = "\n        transform: translate3d(".concat(translateX, "px, ")).call(_context5, translateY, "px, 0px);\n        transition: transform .3s ease\n      ");
    }
  };
  var handleMouseMove = useMemo(function () {
    return throttle(mousemove, 50);
    function mousemove(event) {
      var _context6;
      if (!originalMousePoint.current || !originalLocation.current) return;
      var clientX = event.clientX,
        clientY = event.clientY;
      var distanceX = clientX - originalMousePoint.current.x;
      var distanceY = clientY - originalMousePoint.current.y;
      var element = imgRef.current.parentNode;
      element.style.cssText = _concatInstanceProperty(_context6 = "\n        transform: translate3d(\n          ".concat(originalLocation.current.x + distanceX, "px,\n          ")).call(_context6, originalLocation.current.y + distanceY, "px,\n          0px\n        )");
    }
  }, []);
  function handleClose(event) {
    if (event.target === event.currentTarget) onClose(indictor);
  }
  // 初始化时，如果 open === false 则不渲染任何内容
  if (!open && !isMounted.current) return null;
  return /*#__PURE__*/React.createElement(Modal, {
    open: open
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(Toolbar, {
    onClose: handleClose,
    imgHandle: imgRef
  }), /*#__PURE__*/React.createElement(Loading, {
    open: spinning
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-preview-image-body"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: handlePrevItem,
    style: {
      display: imgs.length <= 1 ? 'none' : ''
    },
    className: "qm-preview-image-prev-button".concat(indictor === 0 ? ' disabled' : '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left-bold",
    style: {
      fontSize: 60
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "qm-preview-image-body-content",
    onMouseMove: handleMouseMove,
    onClick: handleClose
  }, /*#__PURE__*/React.createElement("img", {
    ref: imgRef,
    alt: "\u9884\u89C8\u56FE\u7247",
    src: imageURL,
    key: imageURL,
    onMouseDown: onMouseDown,
    onMouseUp: handleMouseUp,
    className: "qm-preview-image-preview-img",
    style: {
      transform: 'scale(1, 1) rotate(0)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    onClick: handleNextItem,
    style: {
      display: imgs.length <= 1 ? 'none' : ''
    },
    className: "qm-preview-image-next-button".concat(indictor >= imgs.length - 1 ? ' disabled' : '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right-bold",
    style: {
      fontSize: 60
    }
  }))), /*#__PURE__*/React.createElement(Slider, {
    imgs: imgs,
    onChange: handleChangeIndex,
    indictor: indictor,
    pageSize: pageSize
  })));
}
var _default = /*#__PURE__*/memo(PreviewImage);

export { _default as default };
