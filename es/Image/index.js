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
import React, { forwardRef, useRef, useEffect, useImperativeHandle, useMemo } from 'react';
import defaultURL from '../assets/images/default.svg.js';
import intersectionImage from './intersection.js';
import { parseStyle } from '../utils/index.js';

var _excluded = ["src", "alt", "className", "style", "lazy"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function Image(props, ref) {
  var src = props.src,
    alt = props.alt,
    className = props.className,
    style = props.style,
    _props$lazy = props.lazy,
    lazy = _props$lazy === void 0 ? true : _props$lazy,
    restProps = _objectWithoutProperties(props, _excluded);
  var imageRef = useRef();
  useEffect(function () {
    lazy && intersectionImage.addElement(imageRef.current, src);
  }, []);
  useImperativeHandle(ref, function () {
    return {
      instance: imageRef.current
    };
  }, []);
  var styleObj = useMemo(function () {
    if (typeof style === 'string') {
      return parseStyle(style);
    } else {
      return style;
    }
  }, [style]);
  return /*#__PURE__*/React.createElement("img", _objectSpread(_objectSpread({}, restProps), {}, {
    ref: imageRef,
    style: styleObj,
    alt: alt || '图片',
    className: className,
    src: lazy ? defaultURL : src
  }));
}
var Img = /*#__PURE__*/forwardRef(Image);

export { Img as default };
