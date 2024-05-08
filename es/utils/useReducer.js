import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import { useState } from 'react';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function reduce(state, action) {
  if (action === null) return state;
  return _objectSpread(_objectSpread({}, state), action);
}
function useReducer(initialState) {
  var _useState = useState(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    dispatchSetState = _useState2[1];
  function setState(action) {
    if (typeof action === 'function') {
      dispatchSetState(function (prevState) {
        return reduce(prevState, action(prevState));
      });
    } else {
      dispatchSetState(function (prevState) {
        return reduce(prevState, action);
      });
    }
  }
  return [state, setState];
}

export { useReducer as default };
