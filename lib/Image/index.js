"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _defaultSvg = _interopRequireDefault(require("../assets/images/default.svg.js"));
var _intersection = _interopRequireDefault(require("./intersection.js"));
var _index = require("../utils/index.js");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor2(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _excluded = ["src", "alt", "className", "style", "lazy"];
function ownKeys(e, r) {
  var t = (0, _keys.default)(e);
  if (_getOwnPropertySymbols.default) {
    var o = (0, _getOwnPropertySymbols.default)(e);
    r && (o = (0, _filter.default)(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor.default)(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty2.default)(e, r, t[r]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(e, (0, _getOwnPropertyDescriptors.default)(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, (0, _getOwnPropertyDescriptor.default)(t, r));
    });
  }
  return e;
}
function Image(props, ref) {
  var src = props.src,
    alt = props.alt,
    className = props.className,
    style = props.style,
    _props$lazy = props.lazy,
    lazy = _props$lazy === void 0 ? true : _props$lazy,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var imageRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    lazy && _intersection.default.addElement(imageRef.current, src);
  }, []);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      instance: imageRef.current
    };
  }, []);
  var styleObj = (0, _react.useMemo)(function () {
    if (typeof style === 'string') {
      return (0, _index.parseStyle)(style);
    } else {
      return style;
    }
  }, [style]);
  return /*#__PURE__*/_react.default.createElement("img", _objectSpread(_objectSpread({}, restProps), {}, {
    ref: imageRef,
    style: styleObj,
    alt: alt || '图片',
    className: className,
    src: lazy ? _defaultSvg.default : src
  }));
}
var Img = exports.default = /*#__PURE__*/(0, _react.forwardRef)(Image);