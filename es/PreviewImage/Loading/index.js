import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React, { memo, useState, useRef, useEffect, useMemo } from 'react';
import './index.css';

function Loading(props) {
  var _context;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var open = props.open,
    theme = props.theme,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size;
  var loadingRef = useRef();
  useEffect(function () {
    var interval = null;
    if (open) {
      loadingRef.current.style.display = '';
      interval = requestAnimationFrame(function () {
        return setVisible(function () {
          return true;
        });
      });
    } else {
      setVisible(function () {
        return false;
      });
      interval = window.setTimeout(function () {
        return loadingRef.current.style.display = 'none';
      }, 300);
    }
    return function () {
      if (interval) {
        clearTimeout(interval);
        cancelAnimationFrame(interval);
      }
    };
  }, [open]);
  var dotColor = useMemo(function () {
    switch (theme) {
      case 'light':
        return '#f2f2f2';
      case 'dark':
        return '#b3b3b3';
      default:
        return theme;
    }
  }, [theme]);
  return /*#__PURE__*/React.createElement("div", {
    ref: loadingRef,
    style: {
      display: 'none'
    },
    className: _concatInstanceProperty(_context = "qm-vnit-loading ".concat(size, " ")).call(_context, visible ? 'show' : 'hide')
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-loading-dot",
    style: {
      background: dotColor
    }
  }));
}
var Loading$1 = /*#__PURE__*/memo(Loading);

export { Loading$1 as default };
