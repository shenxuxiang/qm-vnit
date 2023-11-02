import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import { memo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function createElement() {
  return document.createElement('div');
}
function ReactPortal(props) {
  var className = props.className,
    children = props.children;
  var _useState = useState(createElement),
    _useState2 = _slicedToArray(_useState, 1),
    state = _useState2[0];
  useEffect(function () {
    if (className) state.className = className;
    document.body.appendChild(state);
    return function () {
      document.body.removeChild(state);
    };
  }, []);
  return /*#__PURE__*/createPortal(children, state);
}
var Portal = /*#__PURE__*/memo(ReactPortal);

export { Portal as default };
