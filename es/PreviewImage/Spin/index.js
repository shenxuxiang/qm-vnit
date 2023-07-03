import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import React, { memo, useState, useLayoutEffect, useMemo } from 'react';
import './index.css';

function Spin(props) {
  var children = props.children,
    delay = props.delay,
    spinning = props.spinning;
  var _useState = useState(spinning),
    _useState2 = _slicedToArray(_useState, 2),
    isClosed = _useState2[0],
    setCloseSpin = _useState2[1];
  useLayoutEffect(function () {
    // eslint-disable-next-line
    if (delay == null) {
      setCloseSpin(function () {
        return !spinning;
      });
      return;
    }
    setTimeout(function () {
      return setCloseSpin(function () {
        return !spinning;
      });
    }, delay);
  }, [spinning]);
  var renderDot = useMemo(function () {
    return /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-ait-spin"
    }, /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-ait-spin-dot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    }), /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    }), /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    }), /*#__PURE__*/React.createElement("div", {
      className: "qm-vnit-ait-spin-dot-item"
    })));
  }, []);
  // eslint-disable-next-line
  if (children == null) return isClosed ? null : renderDot;
  return /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-ait-spin-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-ait-spin-spinning".concat(isClosed ? ' hide' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-ait-spin-spinning-center"
  }, renderDot)), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-ait-spin-container".concat(isClosed ? '' : ' qm-vnit-ait-spin-mask')
  }, children));
}
var Spin$1 = /*#__PURE__*/memo(Spin);

export { Spin$1 as default };
