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
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _react = _interopRequireWildcard(require("react"));
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Loading(props) {
  var _context;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var open = props.open,
    theme = props.theme,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size;
  var loadingRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var interval = null;
    if (open) {
      loadingRef.current.style.display = '';
      interval = requestAnimationFrame(function () {
        return setVisible(function () {
          return true;
        });
      });
    } else {
      setVisible(function () {
        return false;
      });
      interval = window.setTimeout(function () {
        return loadingRef.current.style.display = 'none';
      }, 300);
    }
    return function () {
      if (interval) {
        clearTimeout(interval);
        cancelAnimationFrame(interval);
      }
    };
  }, [open]);
  var dotColor = (0, _react.useMemo)(function () {
    switch (theme) {
      case 'light':
        return '#f2f2f2';
      case 'dark':
        return '#b3b3b3';
      default:
        return theme;
    }
  }, [theme]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: loadingRef,
    style: {
      display: 'none'
    },
    className: (0, _concat.default)(_context = "qm-vnit-loading ".concat(size, " ")).call(_context, visible ? 'show' : 'hide')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }));
}
var Loading$1 = exports.default = /*#__PURE__*/(0, _react.memo)(Loading);