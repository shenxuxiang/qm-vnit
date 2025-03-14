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
import React, { memo, useMemo } from 'react';
import { parseStyle } from '../utils/index.js';
import './index.css';

var _excluded = ["name", "className", "style", "onClick"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function Icon(props) {
  var _context;
  var name = props.name,
    className = props.className,
    style = props.style,
    onClick = props.onClick,
    others = _objectWithoutProperties(props, _excluded);
  var styleObj = useMemo(function () {
    if (typeof style === 'string') {
      return parseStyle(style);
    } else {
      return style;
    }
  }, [style]);
  return /*#__PURE__*/React.createElement("i", _objectSpread(_objectSpread({}, others), {}, {
    style: styleObj,
    onClick: onClick,
    className: _concatInstanceProperty(_context = "qm-vnit-iconfont qm-vnit-icon-".concat(name)).call(_context, className ? ' ' + className : '')
  }));
}
var Icon$1 = /*#__PURE__*/memo(Icon);

export { Icon$1 as default };
