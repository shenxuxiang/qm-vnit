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
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React, { memo } from 'react';
import './index.css';

var _excluded = ["name", "className", "style", "onClick"];
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
function Icon(props) {
  var _context;
  var name = props.name,
    className = props.className,
    style = props.style,
    onClick = props.onClick,
    others = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("i", _objectSpread(_objectSpread({}, others), {}, {
    style: style,
    onClick: onClick,
    className: _concatInstanceProperty(_context = "qm-vnit-iconfont qm-vnit-icon-".concat(name)).call(_context, className ? ' ' + className : '')
  }));
}
var Icon$1 = /*#__PURE__*/memo(Icon);

export { Icon$1 as default };
