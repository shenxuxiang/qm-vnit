import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import Portal from '../../utils/portal.js';
import './index.css';

function Modal(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var open = props.open,
    onClose = props.onClose,
    children = props.children,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? true : _props$mask,
    _props$maskClosable = props.maskClosable,
    maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable;
  var maskRef = useRef();
  var contentRef = useRef();
  useEffect(function () {
    if (open) {
      document.body.style.overflow = 'none';
      maskRef.current.style.display = '';
      contentRef.current.style.display = '';
      setTimeout(function () {
        return setVisible(function () {
          return true;
        });
      }, 20);
    } else {
      document.body.style.overflow = '';
      setVisible(function () {
        return false;
      });
      setTimeout(function () {
        maskRef.current.style.display = 'none';
        contentRef.current.style.display = 'none';
      }, 300);
    }
  }, [open]);
  var handleCloseModal = useCallback(function () {
    maskClosable && (onClose === null || onClose === void 0 ? void 0 : onClose());
  }, [maskClosable]);
  return /*#__PURE__*/React.createElement(Portal, null, mask && /*#__PURE__*/React.createElement("div", {
    ref: maskRef,
    onClick: handleCloseModal,
    style: {
      display: 'none'
    },
    className: "qm-vnit-modal-mask".concat(visible ? ' open' : '')
  }), /*#__PURE__*/React.createElement("div", {
    ref: contentRef,
    style: {
      display: 'none'
    },
    className: "qm-vnit-modal-content".concat(visible ? ' open' : '')
  }, children));
}
var Modal$1 = /*#__PURE__*/memo(Modal);

export { Modal$1 as default };
