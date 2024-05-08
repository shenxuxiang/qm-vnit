"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _getTransformProperties = _interopRequireDefault(require("../../utils/getTransformProperties.js"));
var _react = _interopRequireWildcard(require("react"));
var _index = _interopRequireDefault(require("../../Icon/index.js"));
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Toolbar(props) {
  var imgHandle = props.imgHandle,
    onClose = props.onClose;
  // Y 轴镜像
  var handleMirrorY = function handleMirrorY() {
    var _context, _context2;
    var _getTransformProperti = (0, _getTransformProperties.default)(imgHandle.current),
      scaleX = _getTransformProperti.scaleX,
      scaleY = _getTransformProperti.scaleY,
      rotate = _getTransformProperti.rotate;
    imgHandle.current.style.transform = (0, _concat.default)(_context = (0, _concat.default)(_context2 = "scale(".concat(scaleX, ", ")).call(_context2, scaleY * -1, ") rotate(")).call(_context, rotate, "deg)");
  };
  // X 轴镜像
  var handleMirrorX = function handleMirrorX() {
    var _context3, _context4;
    var _getTransformProperti2 = (0, _getTransformProperties.default)(imgHandle.current),
      scaleX = _getTransformProperti2.scaleX,
      scaleY = _getTransformProperti2.scaleY,
      rotate = _getTransformProperti2.rotate;
    imgHandle.current.style.transform = (0, _concat.default)(_context3 = (0, _concat.default)(_context4 = "scale(".concat(scaleX * -1, ", ")).call(_context4, scaleY, ") rotate(")).call(_context3, rotate, "deg)");
  };
  // 逆时针旋转90°
  var handleRotateLeft = function handleRotateLeft() {
    var _context5, _context6;
    var _getTransformProperti3 = (0, _getTransformProperties.default)(imgHandle.current),
      scaleX = _getTransformProperti3.scaleX,
      scaleY = _getTransformProperti3.scaleY,
      rotate = _getTransformProperti3.rotate;
    imgHandle.current.style.transform = (0, _concat.default)(_context5 = (0, _concat.default)(_context6 = "scale(".concat(scaleX, ", ")).call(_context6, scaleY, ") rotate(")).call(_context5, rotate - 90, "deg)");
  };
  // 顺时针旋转90°
  var handleRotateRight = function handleRotateRight() {
    var _context7, _context8;
    var _getTransformProperti4 = (0, _getTransformProperties.default)(imgHandle.current),
      scaleX = _getTransformProperti4.scaleX,
      scaleY = _getTransformProperti4.scaleY,
      rotate = _getTransformProperti4.rotate;
    imgHandle.current.style.transform = (0, _concat.default)(_context7 = (0, _concat.default)(_context8 = "scale(".concat(scaleX, ", ")).call(_context8, scaleY, ") rotate(")).call(_context7, rotate + 90, "deg)");
  };
  // 放大
  var handleEnlarge = function handleEnlarge() {
    var _context9, _context10;
    var _getTransformProperti5 = (0, _getTransformProperties.default)(imgHandle.current),
      scaleX = _getTransformProperti5.scaleX,
      scaleY = _getTransformProperti5.scaleY,
      rotate = _getTransformProperti5.rotate;
    imgHandle.current.style.transform = (0, _concat.default)(_context9 = (0, _concat.default)(_context10 = "scale(".concat(scaleX * 1.5, ", ")).call(_context10, scaleY * 1.5, ") rotate(")).call(_context9, rotate, "deg)");
  };
  // 缩小
  var handleScaleShrink = function handleScaleShrink() {
    var _context11, _context12;
    var _getTransformProperti6 = (0, _getTransformProperties.default)(imgHandle.current),
      scaleX = _getTransformProperti6.scaleX,
      scaleY = _getTransformProperti6.scaleY,
      rotate = _getTransformProperti6.rotate;
    var x = scaleX / 1.5;
    var y = scaleY / 1.5;
    x = Math.abs(x) <= 1 ? Math.sign(x) : x;
    y = Math.abs(y) <= 1 ? Math.sign(y) : y;
    imgHandle.current.style.transform = (0, _concat.default)(_context11 = (0, _concat.default)(_context12 = "scale(".concat(x, ", ")).call(_context12, y, ") rotate(")).call(_context11, rotate, "deg)");
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-head"
  }, /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "swap-outline",
    onClick: handleMirrorY,
    className: "qm-preview-image-operation-icon rotate90"
  }), /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "swap-outline",
    onClick: handleMirrorX,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "rotate-left",
    onClick: handleRotateLeft,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "rotate-right",
    onClick: handleRotateRight,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "minus-circle",
    onClick: handleScaleShrink,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "plus-circle",
    onClick: handleEnlarge,
    className: "qm-iconfont qm-icon-plus-circle qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "close",
    onClick: onClose,
    className: "qm-iconfont qm-icon-close qm-preview-image-operation-icon"
  }));
}
var Toolbar$1 = exports.default = /*#__PURE__*/(0, _react.memo)(Toolbar);