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
var _getTransformProperties = _interopRequireDefault(require("../utils/getTransformProperties.js"));
var _react = _interopRequireWildcard(require("react"));
var _defaultSvg = _interopRequireDefault(require("../assets/images/default.svg.js"));
var _index = require("../utils/index.js");
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
var _index2 = _interopRequireDefault(require("./Toolbar/index.js"));
var _index3 = _interopRequireDefault(require("./Loading/index.js"));
var _index4 = _interopRequireDefault(require("../Icon/index.js"));
var _index5 = _interopRequireDefault(require("./Slider/index.js"));
var _index6 = _interopRequireDefault(require("./Modal/index.js"));
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function initialState() {
  return {
    indictor: 0,
    spinning: false,
    isEndPage: false,
    isStartPage: false,
    imageURL: _defaultSvg.default
  };
}
/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表 { url: 表示普通像素的图像，hdUrl: 表示高清像素的图像 }
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 */
function SuperPreviewImage(props) {
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
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
  var imgRef = (0, _react.useRef)();
  var isMounted = (0, _react.useRef)(false);
  var originalLocation = (0, _react.useRef)(null);
  var originalMousePoint = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (open) {
      isMounted.current = true;
      document.documentElement.style.overflow = 'hidden';
      // 每当重新打开组件时，去除图片上的镜像、放大、缩小、旋转
      imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [open]);
  (0, _react.useEffect)(function () {
    var _imgRef$current, _imgRef$current$addEv;
    if (!open) return;
    // 放大
    var handleEnlarge = function handleEnlarge() {
      var _context, _context2;
      var _getTransformProperti = (0, _getTransformProperties.default)(imgRef.current),
        scaleX = _getTransformProperti.scaleX,
        scaleY = _getTransformProperti.scaleY,
        rotate = _getTransformProperti.rotate;
      imgRef.current.style.transform = (0, _concat.default)(_context = (0, _concat.default)(_context2 = "scale(".concat(scaleX * 1.5, ", ")).call(_context2, scaleY * 1.5, ") rotate(")).call(_context, rotate, "deg)");
    };
    // 缩小
    var handleScaleShrink = function handleScaleShrink() {
      var _context3, _context4;
      var _getTransformProperti2 = (0, _getTransformProperties.default)(imgRef.current),
        scaleX = _getTransformProperti2.scaleX,
        scaleY = _getTransformProperti2.scaleY,
        rotate = _getTransformProperti2.rotate;
      var x = scaleX / 1.5;
      var y = scaleY / 1.5;
      x = Math.abs(x) <= 1 ? Math.sign(x) : x;
      y = Math.abs(y) <= 1 ? Math.sign(y) : y;
      imgRef.current.style.transform = (0, _concat.default)(_context3 = (0, _concat.default)(_context4 = "scale(".concat(x, ", ")).call(_context4, y, ") rotate(")).call(_context3, rotate, "deg)");
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
    var handleMouseWheel = (0, _index.throttle)(onMouseWheel, 100);
    (_imgRef$current = imgRef.current) === null || _imgRef$current === void 0 || (_imgRef$current = _imgRef$current.parentNode) === null || _imgRef$current === void 0 || (_imgRef$current$addEv = _imgRef$current.addEventListener) === null || _imgRef$current$addEv === void 0 || _imgRef$current$addEv.call(_imgRef$current, 'mousewheel', handleMouseWheel);
    return function () {
      var _imgRef$current2, _imgRef$current2$remo;
      (_imgRef$current2 = imgRef.current) === null || _imgRef$current2 === void 0 || (_imgRef$current2 = _imgRef$current2.parentNode) === null || _imgRef$current2 === void 0 || (_imgRef$current2$remo = _imgRef$current2.removeEventListener) === null || _imgRef$current2$remo === void 0 || _imgRef$current2$remo.call(_imgRef$current2, 'mousewheel', handleMouseWheel);
    };
  }, [open]);
  (0, _react.useEffect)(function () {
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
  (0, _react.useEffect)(function () {
    if (!open) return;
    var _imgs$indictor = imgs[indictor],
      url = _imgs$indictor.url,
      hdUrl = _imgs$indictor.hdUrl;
    setState({
      spinning: true,
      imageURL: url
    });
    var image = new Image();
    image.onload = function () {
      return setState({
        spinning: false,
        imageURL: hdUrl
      });
    };
    image.src = hdUrl;
    return function () {
      image.onload = null;
    };
  }, [open, indictor, imgs]);
  var smallImgs = (0, _react.useMemo)(function () {
    return (0, _map.default)(imgs).call(imgs, function (item) {
      return item.url;
    });
  }, [imgs]);
  var handlePrevItem = function handlePrevItem() {
    if (indictor <= 0) return;
    imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    imgRef.current.parentNode.style.cssText = "transform: translate3d(0px, 0px, 0px )";
    setState(function (prev) {
      return {
        indictor: prev.indictor - 1
      };
    });
  };
  var handleNextItem = function handleNextItem() {
    if (indictor >= imgs.length - 1) return;
    imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    imgRef.current.parentNode.style.cssText = "transform: translate3d(0px, 0px, 0px )";
    setState(function (prev) {
      return {
        indictor: prev.indictor + 1
      };
    });
  };
  var handleChangeIndex = function handleChangeIndex(index) {
    if (indictor === index) return;
    imgRef.current.style.transform = "scale(1, 1) rotate(0deg)";
    imgRef.current.parentNode.style.cssText = "transform: translate3d(0px, 0px, 0px )";
    setState({
      indictor: index
    });
  };
  var onMouseDown = function onMouseDown(event) {
    event.preventDefault();
    var clientX = event.clientX,
      clientY = event.clientY;
    var targetElement = imgRef.current.parentNode;
    var _getTransformProperti3 = (0, _getTransformProperties.default)(targetElement),
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
    var _getViewportSize = (0, _index.getViewportSize)(),
      SW = _getViewportSize.width,
      SH = _getViewportSize.height;
    var _imgRef$current3 = imgRef.current,
      offsetWidth = _imgRef$current3.offsetWidth,
      offsetHeight = _imgRef$current3.offsetHeight;
    var _getTransformProperti4 = (0, _getTransformProperties.default)(imgRef.current),
      scaleX = _getTransformProperti4.scaleX,
      scaleY = _getTransformProperti4.scaleY;
    var width = offsetWidth * scaleX;
    var height = offsetHeight * scaleY;
    // 当图像的宽高小于屏幕可视区的宽高时，图像回到最初的位置。
    if (width <= SW || height <= SH) {
      element.style.cssText = "\n        transform: translate3d(0px, 0px, 0px);\n        transition: transform .3s ease\n      ";
    } else {
      var _context5;
      var restX = Math.floor((width - SW) / 2);
      var restY = Math.floor((height - SH) / 2);
      var _getTransformProperti5 = (0, _getTransformProperties.default)(element),
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
      element.style.cssText = (0, _concat.default)(_context5 = "\n        transform: translate3d(".concat(translateX, "px, ")).call(_context5, translateY, "px, 0px);\n        transition: transform .3s ease\n      ");
    }
  };
  var handleMouseMove = (0, _react.useMemo)(function () {
    return (0, _index.throttle)(mousemove, 50);
    function mousemove(event) {
      var _context6;
      if (!originalMousePoint.current || !originalLocation.current) return;
      var clientX = event.clientX,
        clientY = event.clientY;
      var distanceX = clientX - originalMousePoint.current.x;
      var distanceY = clientY - originalMousePoint.current.y;
      var element = imgRef.current.parentNode;
      element.style.cssText = (0, _concat.default)(_context6 = "\n        transform: translate3d(\n          ".concat(originalLocation.current.x + distanceX, "px,\n          ")).call(_context6, originalLocation.current.y + distanceY, "px,\n          0px\n        )");
    }
  }, []);
  function handleClose(event) {
    if (event.target === event.currentTarget) onClose(indictor);
  }
  // 初始化时，如果 open === false 则不渲染任何内容
  if (!open && !isMounted.current) return null;
  return /*#__PURE__*/_react.default.createElement(_index6.default, {
    open: open
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_index2.default, {
    onClose: handleClose,
    imgHandle: imgRef
  }), /*#__PURE__*/_react.default.createElement(_index3.default, {
    open: spinning
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: handlePrevItem,
    style: {
      display: imgs.length <= 1 ? 'none' : ''
    },
    className: "qm-preview-image-prev-button".concat(indictor === 0 ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "arrow-left-bold",
    style: {
      fontSize: 60
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-body-content",
    onMouseMove: handleMouseMove,
    onClick: handleClose
  }, /*#__PURE__*/_react.default.createElement("img", {
    ref: imgRef,
    alt: "\u9884\u89C8\u56FE\u7247",
    src: imageURL,
    key: imageURL,
    onMouseDown: onMouseDown,
    onMouseUp: handleMouseUp,
    "aria-label": "super-preview-image",
    className: "qm-preview-image-preview-img",
    style: {
      transform: 'scale(1, 1) rotate(0)'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleNextItem,
    style: {
      display: imgs.length <= 1 ? 'none' : ''
    },
    className: "qm-preview-image-next-button".concat(indictor >= imgs.length - 1 ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "arrow-right-bold",
    style: {
      fontSize: 60
    }
  }))), /*#__PURE__*/_react.default.createElement(_index5.default, {
    imgs: smallImgs,
    onChange: handleChangeIndex,
    indictor: indictor,
    pageSize: pageSize
  })));
}
var SuperPreviewImage$1 = exports.default = /*#__PURE__*/(0, _react.memo)(SuperPreviewImage);