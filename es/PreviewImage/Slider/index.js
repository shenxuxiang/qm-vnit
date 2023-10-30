import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import getTransformProperties from '../../utils/getTransformProperties.js';
import React, { memo, useRef, useEffect } from 'react';
import useReducer from '../../utils/useReducer.js';
import Icon from '../../Icon/index.js';
import Img from '../../Image/index.js';
import './index.css';

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
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var isFirstPage = state.isFirstPage,
    isLastPage = state.isLastPage;
  var sliderRef = useRef();
  useEffect(function () {
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
      var cssText = _concatInstanceProperty(_context = "transform: translate3d(".concat(offsetX * -1, "px, 0px, 0px); transition: transform ")).call(_context, duration, "ms ease");
      sliderRef.current.style.cssText = cssText;
    }
  }, [indictor, imgs, pageSize]);
  useEffect(function () {
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
    var _getTransformProperti = getTransformProperties(sliderRef.current),
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
    var _getTransformProperti2 = getTransformProperties(sliderRef.current),
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
  return /*#__PURE__*/React.createElement("div", {
    className: "qm-preview-image-foot",
    style: {
      width: (imgs === null || imgs === void 0 ? void 0 : imgs.length) * ITEM_WIDTH + 68,
      maxWidth: pageSize * ITEM_WIDTH + 68
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: handlePrevPage,
    className: "qm-preview-image-foot-prev-button".concat(isFirstPage ? ' disabled' : '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left-bold",
    style: {
      fontSize: 30
    }
  })), /*#__PURE__*/React.createElement("div", {
    onClick: handleNextPage,
    className: "qm-preview-image-foot-next-button".concat(isLastPage ? ' disabled' : '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right-bold",
    style: {
      fontSize: 30
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "qm-preview-image-foot-slider"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "qm-preview-image-foot-slider-list",
    ref: sliderRef
  }, _mapInstanceProperty(imgs).call(imgs, function (url, index) {
    var _context2;
    return /*#__PURE__*/React.createElement("li", {
      key: _concatInstanceProperty(_context2 = "".concat(url, "~")).call(_context2, index),
      onClick: function onClick() {
        return onChange === null || onChange === void 0 ? void 0 : onChange(index);
      },
      className: "qm-preview-image-foot-slider-list-item".concat(indictor === index ? ' active' : '')
    }, /*#__PURE__*/React.createElement(Img, {
      src: url,
      alt: "pic"
    }));
  }))));
}
var Slider$1 = /*#__PURE__*/memo(Slider);

export { Slider$1 as default };
