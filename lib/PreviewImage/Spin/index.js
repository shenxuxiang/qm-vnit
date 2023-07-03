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
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Spin(props) {
  var children = props.children,
    delay = props.delay,
    spinning = props.spinning;
  var _useState = (0, _react.useState)(spinning),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isClosed = _useState2[0],
    setCloseSpin = _useState2[1];
  (0, _react.useLayoutEffect)(function () {
    // eslint-disable-next-line
    if (delay == null) {
      setCloseSpin(function () {
        return !spinning;
      });
      return;
    }
    setTimeout(function () {
      return setCloseSpin(function () {
        return !spinning;
      });
    }, delay);
  }, [spinning]);
  var renderDot = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-ait-spin"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-ait-spin-dot"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    })));
  }, []);
  // eslint-disable-next-line
  if (children == null) return isClosed ? null : renderDot;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-ait-spin-box"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-ait-spin-spinning".concat(isClosed ? ' hide' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-ait-spin-spinning-center"
  }, renderDot)), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-ait-spin-container".concat(isClosed ? '' : ' qm-vnit-ait-spin-mask')
  }, children));
}
var Spin$1 = /*#__PURE__*/(0, _react.memo)(Spin);
exports.default = Spin$1;