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

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
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
