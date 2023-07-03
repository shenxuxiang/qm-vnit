import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import img from '../../assets/images/default.svg.js';
import intersectionImage from './intersection.js';

var _excluded = ["src", "alt", "className", "style"];
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
function Image(props, ref) {
  var src = props.src,
    alt = props.alt,
    className = props.className,
    style = props.style,
    restProps = _objectWithoutProperties(props, _excluded);
  var imageRef = useRef();
  useEffect(function () {
    intersectionImage.observeImage(imageRef.current);
    return function () {
      intersectionImage.unobserveImage(imageRef.current);
    };
  }, []);
  useImperativeHandle(ref, function () {
    return {
      instance: imageRef.current
    };
  }, []);
  return /*#__PURE__*/React.createElement("img", _objectSpread(_objectSpread({
    src: img,
    style: style
  }, restProps), {}, {
    ref: imageRef,
    "data-src": src,
    alt: alt || '图片',
    className: className
  }));
}
var Img = /*#__PURE__*/forwardRef(Image);

export { Img as default };
