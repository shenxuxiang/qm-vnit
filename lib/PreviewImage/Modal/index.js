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
var _portal = _interopRequireDefault(require("../../utils/portal.js"));
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Modal(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var open = props.open,
    onClose = props.onClose,
    children = props.children,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? true : _props$mask,
    _props$maskClosable = props.maskClosable,
    maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable;
  var maskRef = (0, _react.useRef)();
  var contentRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var interval = null;
    if (open) {
      document.body.style.overflow = 'none';
      maskRef.current.style.display = '';
      contentRef.current.style.display = '';
      interval = requestAnimationFrame(function () {
        return setVisible(function () {
          return true;
        });
      });
    } else {
      document.body.style.overflow = '';
      setVisible(function () {
        return false;
      });
      interval = window.setTimeout(function () {
        maskRef.current.style.display = 'none';
        contentRef.current.style.display = 'none';
      }, 300);
    }
    return function () {
      if (interval) {
        clearTimeout(interval);
        cancelAnimationFrame(interval);
      }
    };
  }, [open]);
  var handleCloseModal = (0, _react.useCallback)(function () {
    maskClosable && (onClose === null || onClose === void 0 ? void 0 : onClose());
  }, [maskClosable]);
  return /*#__PURE__*/_react.default.createElement(_portal.default, null, mask && ( /*#__PURE__*/_react.default.createElement("div", {
    ref: maskRef,
    onClick: handleCloseModal,
    style: {
      display: 'none'
    },
    className: "qm-vnit-modal-mask".concat(visible ? ' open' : '')
  })), /*#__PURE__*/_react.default.createElement("div", {
    ref: contentRef,
    style: {
      display: 'none'
    },
    className: "qm-vnit-modal-content".concat(visible ? ' open' : '')
  }, children));
}
var Modal$1 = exports.default = /*#__PURE__*/(0, _react.memo)(Modal);