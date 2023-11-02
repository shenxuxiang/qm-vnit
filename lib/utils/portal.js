"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = require("react");
var _reactDom = require("react-dom");
function createElement() {
  return document.createElement('div');
}
function ReactPortal(props) {
  var className = props.className,
    children = props.children;
  var _useState = (0, _react.useState)(createElement),
    _useState2 = (0, _slicedToArray2.default)(_useState, 1),
    state = _useState2[0];
  (0, _react.useEffect)(function () {
    if (className) state.className = className;
    document.body.appendChild(state);
    return function () {
      document.body.removeChild(state);
    };
  }, []);
  return /*#__PURE__*/(0, _reactDom.createPortal)(children, state);
}
var Portal = /*#__PURE__*/(0, _react.memo)(ReactPortal);
exports.default = Portal;