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
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _getTransformProperties = _interopRequireDefault(require("../../utils/getTransformProperties.js"));
var _react = _interopRequireWildcard(require("react"));
var _useReducer3 = _interopRequireDefault(require("../../utils/useReducer.js"));
var _index = _interopRequireDefault(require("../../Icon/index.js"));
var _index2 = _interopRequireDefault(require("../../Image/index.js"));
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function initialState() {
  return {
    isFirstPage: true,
    isLastPage: false
  };
}
// 缩略图中每一个图片的宽度
var ITEM_WIDTH = 120;
function Slider(props) {
  var imgs = props.imgs,
    indictor = props.indictor,
    onChange = props.onChange,
    pageSize = props.pageSize;
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var isFirstPage = state.isFirstPage,
    isLastPage = state.isLastPage;
  var sliderRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    sliderAnimation(indictor, 300);
    function sliderAnimation(index, duration) {
      var _context;
      if (!sliderRef.current) return;
      if ((imgs === null || imgs === void 0 ? void 0 : imgs.length) <= pageSize) {
        sliderRef.current.style.cssText = "transform: translate3d(0px, 0px, 0px); transition: transform 0ms ease";
        return;
      }
      var half = pageSize / 2;
      var offsetX = 0;
      if (index <= half) {
        offsetX = 0;
      } else if (index >= imgs.length - half) {
        offsetX = (imgs.length - pageSize) * ITEM_WIDTH;
      } else {
        offsetX = (index - half + 0.5) * ITEM_WIDTH;
      }
      var cssText = (0, _concat.default)(_context = "transform: translate3d(".concat(offsetX * -1, "px, 0px, 0px); transition: transform ")).call(_context, duration, "ms ease");
      sliderRef.current.style.cssText = cssText;
    }
  }, [indictor, imgs, pageSize]);
  (0, _react.useEffect)(function () {
    var isFirstPage = false;
    var isLastPage = false;
    if ((imgs === null || imgs === void 0 ? void 0 : imgs.length) <= pageSize) {
      isFirstPage = true;
      isLastPage = true;
    } else {
      if (indictor <= pageSize / 2) {
        isFirstPage = true;
        isLastPage = false;
      } else if (indictor >= (imgs === null || imgs === void 0 ? void 0 : imgs.length) - pageSize / 2) {
        isFirstPage = false;
        isLastPage = true;
      } else {
        isFirstPage = false;
        isLastPage = false;
      }
    }
    setState({
      isFirstPage: isFirstPage,
      isLastPage: isLastPage
    });
  }, [indictor, pageSize, imgs]);
  // 上一页，向右滚动一屏
  var handlePrevPage = function handlePrevPage() {
    if (isFirstPage) return;
    var _getTransformProperti = (0, _getTransformProperties.default)(sliderRef.current),
      translateX = _getTransformProperti.translateX;
    var offsetX = translateX + pageSize * ITEM_WIDTH;
    if (offsetX >= 0) {
      offsetX = 0;
      setState({
        isFirstPage: true,
        isLastPage: false
      });
    } else {
      setState({
        isFirstPage: false,
        isLastPage: false
      });
    }
    var cssText = "transform: translate3d(".concat(offsetX, "px, 0px, 0px); transition: transform .3s ease");
    sliderRef.current.style.cssText = cssText;
  };
  // 下一页，向左滚动一屏
  var handleNextPage = function handleNextPage() {
    if (isLastPage) return;
    var _getTransformProperti2 = (0, _getTransformProperties.default)(sliderRef.current),
      translateX = _getTransformProperti2.translateX;
    var maxOffsetX = (imgs.length - pageSize) * ITEM_WIDTH;
    var offsetX = translateX - pageSize * ITEM_WIDTH;
    console.log(translateX, offsetX, maxOffsetX);
    if (offsetX <= -maxOffsetX) {
      offsetX = -maxOffsetX;
      setState({
        isLastPage: true,
        isFirstPage: false
      });
    } else {
      setState({
        isLastPage: false,
        isFirstPage: false
      });
    }
    var cssText = "transform: translate3d(".concat(offsetX, "px, 0px, 0px); transition: transform .3s ease");
    sliderRef.current.style.cssText = cssText;
  };
  if (imgs.length <= 1) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-foot",
    style: {
      width: (imgs === null || imgs === void 0 ? void 0 : imgs.length) * ITEM_WIDTH + 68,
      maxWidth: pageSize * ITEM_WIDTH + 68
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: handlePrevPage,
    className: "qm-preview-image-foot-prev-button".concat(isFirstPage ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "arrow-left-bold",
    style: {
      fontSize: 30
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleNextPage,
    className: "qm-preview-image-foot-next-button".concat(isLastPage ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index.default, {
    name: "arrow-right-bold",
    style: {
      fontSize: 30
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-foot-slider"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "qm-preview-image-foot-slider-list",
    ref: sliderRef
  }, (0, _map.default)(imgs).call(imgs, function (url, index) {
    var _context2;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: (0, _concat.default)(_context2 = "".concat(url, "~")).call(_context2, index),
      onClick: function onClick() {
        return onChange === null || onChange === void 0 ? void 0 : onChange(index);
      },
      className: "qm-preview-image-foot-slider-list-item".concat(indictor === index ? ' active' : '')
    }, /*#__PURE__*/_react.default.createElement(_index2.default, {
      src: url,
      alt: "pic"
    }));
  }))));
}
var Slider$1 = /*#__PURE__*/(0, _react.memo)(Slider);
exports.default = Slider$1;