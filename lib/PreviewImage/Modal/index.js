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
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    if (open) {
      document.body.style.overflow = 'none';
      maskRef.current.style.display = '';
      contentRef.current.style.display = '';
      setTimeout(function () {
        return setVisible(function () {
          return true;
        });
      }, 20);
    } else {
      document.body.style.overflow = '';
      setVisible(function () {
        return false;
      });
      setTimeout(function () {
        maskRef.current.style.display = 'none';
        contentRef.current.style.display = 'none';
      }, 300);
    }
  }, [open]);
  var handleCloseModal = (0, _react.useCallback)(function () {
    maskClosable && (onClose === null || onClose === void 0 ? void 0 : onClose());
  }, [maskClosable]);
  return /*#__PURE__*/_react.default.createElement(_portal.default, null, mask && /*#__PURE__*/_react.default.createElement("div", {
    ref: maskRef,
    onClick: handleCloseModal,
    style: {
      display: 'none'
    },
    className: "qm-vnit-modal-mask".concat(visible ? ' open' : '')
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: contentRef,
    style: {
      display: 'none'
    },
    className: "qm-vnit-modal-content".concat(visible ? ' open' : '')
  }, children));
}
var Modal$1 = /*#__PURE__*/(0, _react.memo)(Modal);
exports.default = Modal$1;