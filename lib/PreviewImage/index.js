"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.number.constructor.js");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _endsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/ends-with"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _react = _interopRequireWildcard(require("react"));
var _index = _interopRequireDefault(require("./Modal/index.js"));
var _index2 = _interopRequireDefault(require("./Image/index.js"));
var _index3 = _interopRequireDefault(require("./Spin/index.js"));
var _index4 = _interopRequireDefault(require("../Icon/index.js"));
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// 缩略图中每一个图片的宽度
var ITEM_WIDTH = 120;
var REG_TRANSFORMX = /translateX\(([\-.0-9]*)px\)/;
var REG_SCALE = /scale\(([\-.0-9]*)\, ([\-.0-9]*)\)/;
var REG_ROTATEZ = /rotateZ\(([\-.0-9]*)deg\)/;
// 获取目标元素的 Transform 样式
function getTransformProperties(element) {
  var _scale$, _scale$2, _rotate$;
  var style = element.style.transform;
  var scale = REG_SCALE.exec(style);
  var rotate = REG_ROTATEZ.exec(style);
  return {
    scaleX: Number((_scale$ = scale === null || scale === void 0 ? void 0 : scale[1]) !== null && _scale$ !== void 0 ? _scale$ : 1),
    scaleY: Number((_scale$2 = scale === null || scale === void 0 ? void 0 : scale[2]) !== null && _scale$2 !== void 0 ? _scale$2 : 1),
    rotateZ: Number((_rotate$ = rotate === null || rotate === void 0 ? void 0 : rotate[1]) !== null && _rotate$ !== void 0 ? _rotate$ : 0)
  };
}
function initialState() {
  return {
    currentIndex: 0,
    isEndPage: false,
    isStartPage: false,
    imageURL: '',
    spinning: false
  };
}
/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 * @param { previewImgs }    缩略图展示列表
 * @param { hasPerformance } 是否启动IMG性能优化方案
 */
function PreviewImage(props) {
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var currentIndex = state.currentIndex,
    isStartPage = state.isStartPage,
    isEndPage = state.isEndPage,
    imageURL = state.imageURL,
    spinning = state.spinning;
  var onClose = props.onClose,
    open = props.open,
    imgs = props.imgs,
    _props$previewImgs = props.previewImgs,
    previewImgs = _props$previewImgs === void 0 ? imgs : _props$previewImgs,
    _props$index = props.index,
    index = _props$index === void 0 ? 0 : _props$index,
    _props$hasPerformance = props.hasPerformance,
    hasPerformance = _props$hasPerformance === void 0 ? false : _props$hasPerformance,
    _props$pageSize = props.pageSize,
    pageSize = _props$pageSize === void 0 ? 9 : _props$pageSize;
  var imgRef = (0, _react.useRef)();
  // 滑块容器
  var sliderWrapperRef = (0, _react.useRef)();
  // 滑块
  var sliderRef = (0, _react.useRef)();
  var totalSizeRef = (0, _react.useRef)(0);
  var isMounted = (0, _react.useRef)(false);
  // 高清图
  var HDPictureListRef = (0, _react.useRef)(imgs);
  // 缩略图
  var thumbnailListRef = (0, _react.useRef)(previewImgs);
  (0, _react.useEffect)(function () {
    totalSizeRef.current = imgs.length;
    HDPictureListRef.current = imgs;
    thumbnailListRef.current = previewImgs;
  }, [imgs, previewImgs]);
  (0, _react.useEffect)(function () {
    if (open) {
      isMounted.current = true;
      // 每当重新打开组件时，去除图片上的镜像、放大、缩小、旋转
      imgRef.current.style.transform = "scale(1, 1) rotateZ(0deg)";
    }
  }, [open]);
  (0, _react.useEffect)(function () {
    if (open) {
      var _currentIndex = index;
      if (index <= 0) {
        _currentIndex = 0;
      } else if (index >= totalSizeRef.current) {
        _currentIndex = totalSizeRef.current - 1;
      }
      sliderAnimation(_currentIndex, 0);
      setState({
        currentIndex: _currentIndex,
        isStartPage: _currentIndex < Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
        isEndPage: _currentIndex > totalSizeRef.current - 1 - Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize
      });
    }
  }, [open, index]);
  // 注意这里我将 open 添加到依赖项，其目的是为了防止初始化时 imageURL 没有取到值时，在 open 变化时重新取值。
  (0, _react.useEffect)(function () {
    var _imgRef$current, _imgRef$current$src;
    var hd = HDPictureListRef.current[currentIndex];
    // 如果高清图不存在，则不执行后续的逻辑
    if (!hd) return;
    // 如果当前 IMG 节点上展示的图像就是目标图像，也同样不执行后续逻辑
    if ((_imgRef$current = imgRef.current) !== null && _imgRef$current !== void 0 && (_imgRef$current$src = _imgRef$current.src) !== null && _imgRef$current$src !== void 0 && (0, _endsWith.default)(_imgRef$current$src).call(_imgRef$current$src, hd)) return;
    // 是否执行 IMG 优化，优化方案则是先加载缩略图，等高清图加载完成后再添加到 IMG 节点展示。
    // 否则就是直接展示高清图。
    if (!hasPerformance) {
      setState({
        imageURL: hd
      });
      return;
    }
    setState({
      spinning: true,
      imageURL: thumbnailListRef.current[currentIndex]
    });
    var img = new Image();
    img.src = hd;
    img.onload = function () {
      return setState({
        spinning: false,
        imageURL: hd
      });
    };
    return function () {
      if (img) img.onload = null;
    };
  }, [open, currentIndex]);
  // 动画效果
  var sliderAnimation = function sliderAnimation(index) {
    var _context;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    if (!sliderRef.current || !sliderWrapperRef.current) return;
    if (totalSizeRef.current <= pageSize) {
      sliderRef.current.style.cssText = "transform: translateX(0px); transition: transform 0ms ease";
      return;
    }
    var halfMaxSize = Math.ceil(pageSize / 2);
    var offsetX = 0;
    if (index + 1 <= halfMaxSize) {
      offsetX = 0;
    } else if (index + 1 > totalSizeRef.current - halfMaxSize) {
      offsetX = totalSizeRef.current * ITEM_WIDTH - sliderWrapperRef.current.clientWidth;
    } else {
      offsetX = index * ITEM_WIDTH - sliderWrapperRef.current.clientWidth / 2 + ITEM_WIDTH / 2;
    }
    var cssText = (0, _concat.default)(_context = "transform: translateX(".concat(offsetX * -1, "px); transition: transform ")).call(_context, duration, "ms ease");
    sliderRef.current.style.cssText = cssText;
  };
  var handlePrevItem = function handlePrevItem() {
    if (currentIndex <= 0) return;
    imgRef.current.style.transform = "scale(1, 1) rotateZ(0deg)";
    setState(function (prev) {
      var count = prev.currentIndex - 1;
      count = count >= 0 ? count : 0;
      sliderAnimation(count);
      return {
        currentIndex: count,
        isStartPage: count < Math.ceil(pageSize / 2),
        isEndPage: count > totalSizeRef.current - 1 - Math.ceil(pageSize / 2)
      };
    });
  };
  var handleNextItem = function handleNextItem() {
    if (currentIndex >= totalSizeRef.current - 1) return;
    imgRef.current.style.transform = "scale(1, 1) rotateZ(0deg)";
    setState(function (prev) {
      var count = prev.currentIndex + 1;
      count = count >= totalSizeRef.current ? totalSizeRef.current - 1 : count;
      sliderAnimation(count);
      return {
        currentIndex: count,
        isStartPage: count < Math.ceil(pageSize / 2),
        isEndPage: count > totalSizeRef.current - 1 - Math.ceil(pageSize / 2)
      };
    });
  };
  var handleChangeIndex = function handleChangeIndex(index) {
    if (currentIndex === index) return;
    imgRef.current.style.transform = "scale(1, 1) rotateZ(0deg)";
    sliderAnimation(index);
    setState({
      currentIndex: index,
      isStartPage: index < Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
      isEndPage: index > totalSizeRef.current - 1 - Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize
    });
  };
  // 上一页，向右滚动一屏
  var handlePrevPage = function handlePrevPage() {
    var _REG_TRANSFORMX$exec;
    if (isStartPage) return;
    var transform = sliderRef.current.style.transform;
    var _ref = (_REG_TRANSFORMX$exec = REG_TRANSFORMX.exec(transform)) !== null && _REG_TRANSFORMX$exec !== void 0 ? _REG_TRANSFORMX$exec : [],
      _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      _ref2$ = _ref2[1],
      translateX = _ref2$ === void 0 ? 0 : _ref2$;
    var offsetX = Number(translateX) + pageSize * ITEM_WIDTH;
    if (offsetX >= 0) {
      offsetX = 0;
      setState({
        isStartPage: true,
        isEndPage: false
      });
    } else {
      setState({
        isStartPage: false,
        isEndPage: false
      });
    }
    var cssText = "transform: translateX(".concat(offsetX, "px); transition: transform .3s ease");
    sliderRef.current.style.cssText = cssText;
  };
  // 下一页，向左滚动一屏
  var handleNextPage = function handleNextPage() {
    var _REG_TRANSFORMX$exec2;
    if (isEndPage) return;
    var transform = sliderRef.current.style.transform;
    var clientWidth = sliderWrapperRef.current.clientWidth;
    var maxOffsetX = totalSizeRef.current * ITEM_WIDTH - clientWidth;
    var _ref3 = (_REG_TRANSFORMX$exec2 = REG_TRANSFORMX.exec(transform)) !== null && _REG_TRANSFORMX$exec2 !== void 0 ? _REG_TRANSFORMX$exec2 : [],
      _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
      _ref4$ = _ref4[1],
      translateX = _ref4$ === void 0 ? 0 : _ref4$;
    var offsetX = Number(translateX) - pageSize * ITEM_WIDTH;
    if (offsetX <= -maxOffsetX) {
      offsetX = -maxOffsetX;
      setState({
        isEndPage: true,
        isStartPage: false
      });
    } else {
      setState({
        isEndPage: false,
        isStartPage: false
      });
    }
    var cssText = "transform: translateX(".concat(offsetX, "px); transition: transform .3s ease");
    sliderRef.current.style.cssText = cssText;
  };
  // Y 轴镜像
  var handleMirrorY = function handleMirrorY() {
    var _context2, _context3;
    var _getTransformProperti = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti.scaleX,
      scaleY = _getTransformProperti.scaleY,
      rotateZ = _getTransformProperti.rotateZ;
    imgRef.current.style.transform = (0, _concat.default)(_context2 = (0, _concat.default)(_context3 = "scale(".concat(scaleX, ", ")).call(_context3, scaleY * -1, ") rotateZ(")).call(_context2, rotateZ, "deg)");
  };
  // X 轴镜像
  var handleMirrorX = function handleMirrorX() {
    var _context4, _context5;
    var _getTransformProperti2 = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti2.scaleX,
      scaleY = _getTransformProperti2.scaleY,
      rotateZ = _getTransformProperti2.rotateZ;
    imgRef.current.style.transform = (0, _concat.default)(_context4 = (0, _concat.default)(_context5 = "scale(".concat(scaleX * -1, ", ")).call(_context5, scaleY, ") rotateZ(")).call(_context4, rotateZ, "deg)");
  };
  // 逆时针旋转90°
  var handleRotateLeft = function handleRotateLeft() {
    var _context6, _context7;
    var _getTransformProperti3 = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti3.scaleX,
      scaleY = _getTransformProperti3.scaleY,
      rotateZ = _getTransformProperti3.rotateZ;
    imgRef.current.style.transform = (0, _concat.default)(_context6 = (0, _concat.default)(_context7 = "scale(".concat(scaleX, ", ")).call(_context7, scaleY, ") rotateZ(")).call(_context6, rotateZ - 90, "deg)");
  };
  // 顺时针旋转90°
  var handleRotateRight = function handleRotateRight() {
    var _context8, _context9;
    var _getTransformProperti4 = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti4.scaleX,
      scaleY = _getTransformProperti4.scaleY,
      rotateZ = _getTransformProperti4.rotateZ;
    imgRef.current.style.transform = (0, _concat.default)(_context8 = (0, _concat.default)(_context9 = "scale(".concat(scaleX, ", ")).call(_context9, scaleY, ") rotateZ(")).call(_context8, rotateZ + 90, "deg)");
  };
  // 放大
  var handleScalePlus = function handleScalePlus() {
    var _context10, _context11;
    var _getTransformProperti5 = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti5.scaleX,
      scaleY = _getTransformProperti5.scaleY,
      rotateZ = _getTransformProperti5.rotateZ;
    imgRef.current.style.transform = (0, _concat.default)(_context10 = (0, _concat.default)(_context11 = "scale(".concat(scaleX * 1.5, ", ")).call(_context11, scaleY * 1.5, ") rotateZ(")).call(_context10, rotateZ, "deg)");
  };
  // 缩小
  var handleScaleMinus = function handleScaleMinus() {
    var _context12, _context13;
    var _getTransformProperti6 = getTransformProperties(imgRef.current),
      scaleX = _getTransformProperti6.scaleX,
      scaleY = _getTransformProperti6.scaleY,
      rotateZ = _getTransformProperti6.rotateZ;
    var computedScaleX = scaleX / 1.5;
    var computedScaleY = scaleY / 1.5;
    computedScaleX = computedScaleX <= 1 ? 1 : computedScaleX;
    computedScaleY = computedScaleY <= 1 ? 1 : computedScaleY;
    imgRef.current.style.transform = (0, _concat.default)(_context12 = (0, _concat.default)(_context13 = "scale(".concat(computedScaleX, ", ")).call(_context13, computedScaleY, ") rotateZ(")).call(_context12, rotateZ, "deg)");
  };
  // 初始化时，如果 open === false 则不渲染任何内容
  if (!open && !isMounted.current) return null;
  return /*#__PURE__*/_react.default.createElement(_index.default, {
    open: open
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-head"
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "swap-outline",
    onClick: handleMirrorY,
    className: "qm-preview-image-operation-icon rotate90"
  }), /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "swap-outline",
    onClick: handleMirrorX,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "rotate-left",
    onClick: handleRotateLeft,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "rotate-right",
    onClick: handleRotateRight,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "minus-circle",
    onClick: handleScaleMinus,
    className: "qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "plus-circle",
    onClick: handleScalePlus,
    className: "qm-iconfont qm-icon-plus-circle qm-preview-image-operation-icon"
  }), /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "close",
    onClick: onClose,
    className: "qm-iconfont qm-icon-close qm-preview-image-operation-icon"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: handlePrevItem,
    className: "qm-preview-image-prev-button".concat(currentIndex === 0 ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "arrow-left-bold",
    style: {
      fontSize: 60
    }
  })), /*#__PURE__*/_react.default.createElement(_index3.default, {
    spinning: spinning
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-body-content"
  }, /*#__PURE__*/_react.default.createElement("img", {
    ref: imgRef,
    alt: "\u9884\u89C8\u56FE\u7247",
    src: imageURL,
    className: "qm-preview-image-preview-img",
    style: {
      transform: 'scale(1, 1) rotateZ(0)'
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleNextItem,
    className: "qm-preview-image-next-button".concat(currentIndex >= totalSizeRef.current - 1 ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "arrow-right-bold",
    style: {
      fontSize: 60
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-foot",
    style: {
      width: (previewImgs === null || previewImgs === void 0 ? void 0 : previewImgs.length) * ITEM_WIDTH + 68,
      maxWidth: pageSize * ITEM_WIDTH + 68
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: handlePrevPage,
    className: "qm-preview-image-foot-prev-button".concat(isStartPage ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "arrow-left-bold",
    style: {
      fontSize: 30
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleNextPage,
    className: "qm-preview-image-foot-next-button".concat(isEndPage ? ' disabled' : '')
  }, /*#__PURE__*/_react.default.createElement(_index4.default, {
    name: "arrow-right-bold",
    style: {
      fontSize: 30
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-preview-image-foot-slider",
    ref: sliderWrapperRef
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "qm-preview-image-foot-slider-list",
    ref: sliderRef
  }, (0, _map.default)(previewImgs).call(previewImgs, function (url, index) {
    var _context14;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: (0, _concat.default)(_context14 = "".concat(url, "~")).call(_context14, index),
      onClick: function onClick() {
        return handleChangeIndex(index);
      },
      className: "qm-preview-image-foot-slider-list-item".concat(currentIndex === index ? ' active' : '')
    }, /*#__PURE__*/_react.default.createElement(_index2.default, {
      src: url,
      alt: "pic"
    }));
  }))))));
}
var PreviewImage$1 = /*#__PURE__*/(0, _react.memo)(PreviewImage);
exports.default = PreviewImage$1;