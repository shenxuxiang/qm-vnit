import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import getTransformProperties from '../../utils/getTransformProperties.js';
import React, { memo } from 'react';
import Icon from '../../Icon/index.js';
import './index.css';

function Toolbar(props) {
  var imgHandle = props.imgHandle,
    onClose = props.onClose;
  // Y 轴镜像
  var handleMirrorY = function handleMirrorY() {
    var _context, _context2;
    var _getTransformProperti = getTransformProperties(imgHandle.current),
      scaleX = _getTransformProperti.scaleX,
      scaleY = _getTransformProperti.scaleY,
      rotate = _getTransformProperti.rotate;
    imgHandle.current.style.transform = _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = "scale(".concat(scaleX, ", ")).call(_context2, scaleY * -1, ") rotate(")).call(_context, rotate, "deg)");
  };
  // X 轴镜像
  var handleMirrorX = function handleMirrorX() {
    var _context3, _context4;
    var _getTransformProperti2 = getTransformProperties(imgHandle.current),
      scaleX = _getTransformProperti2.scaleX,
      scaleY = _getTransformProperti2.scaleY,
      rotate = _getTransformProperti2.rotate;
    imgHandle.current.style.transform = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = "scale(".concat(scaleX * -1, ", ")).call(_context4, scaleY, ") rotate(")).call(_context3, rotate, "deg)");
  };
  // 逆时针旋转90°
  var handleRotateLeft = function handleRotateLeft() {
    var _context5, _context6;
    var _getTransformProperti3 = getTransformProperties(imgHandle.current),
      scaleX = _getTransformProperti3.scaleX,
      scaleY = _getTransformProperti3.scaleY,
      rotate = _getTransformProperti3.rotate;
    imgHandle.current.style.transform = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "scale(".concat(scaleX, ", ")).call(_context6, scaleY, ") rotate(")).call(_context5, rotate - 90, "deg)");
  };
  // 顺时针旋转90°
  var handleRotateRight = function handleRotateRight() {
    var _context7, _context8;
    var _getTransformProperti4 = getTransformProperties(imgHandle.current),
      scaleX = _getTransformProperti4.scaleX,
      scaleY = _getTransformProperti4.scaleY,
      rotate = _getTransformProperti4.rotate;
    imgHandle.current.style.transform = _concatInstanceProperty(_context7 = _concatInstanceProperty(_context8 = "scale(".concat(scaleX, ", ")).call(_context8, scaleY, ") rotate(")).call(_context7, rotate + 90, "deg)");
  };
  // 放大
  var handleEnlarge = function handleEnlarge() {
    var _context9, _context10;
    var _getTransformProperti5 = getTransformProperties(imgHandle.current),
      scaleX = _getTransformProperti5.scaleX,
      scaleY = _getTransformProperti5.scaleY,
      rotate = _getTransformProperti5.rotate;
    imgHandle.current.style.transform = _concatInstanceProperty(_context9 = _concatInstanceProperty(_context10 = "scale(".concat(scaleX * 1.5, ", ")).call(_context10, scaleY * 1.5, ") rotate(")).call(_context9, rotate, "deg)");
  };
  // 缩小
  var handleScaleShrink = function handleScaleShrink() {
    var _context11, _context12;
    var _getTransformProperti6 = getTransformProperties(imgHandle.current),
      scaleX = _getTransformProperti6.scaleX,
      scaleY = _getTransformProperti6.scaleY,
      rotate = _getTransformProperti6.rotate;
    var x = scaleX / 1.5;
    var y = scaleY / 1.5;
    x = Math.abs(x) <= 1 ? Math.sign(x) : x;
    y = Math.abs(y) <= 1 ? Math.sign(y) : y;
    imgHandle.current.style.transform = _concatInstanceProperty(_context11 = _concatInstanceProperty(_context12 = "scale(".concat(x, ", ")).call(_context12, y, ") rotate(")).call(_context11, rotate, "deg)");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "qm-preview-image-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "swap-outline",
    onClick: handleMirrorY,
    className: "qm-preview-image-operation-icon rotate90"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "swap-outline",
    onClick: handleMirrorX,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-left",
    onClick: handleRotateLeft,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-right",
    onClick: handleRotateRight,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "minus-circle",
    onClick: handleScaleShrink,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "plus-circle",
    onClick: handleEnlarge,
    className: "qm-iconfont qm-icon-plus-circle qm-preview-image-operation-icon"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    onClick: onClose,
    className: "qm-iconfont qm-icon-close qm-preview-image-operation-icon"
  }));
}
var Toolbar$1 = /*#__PURE__*/memo(Toolbar);

export { Toolbar$1 as default };