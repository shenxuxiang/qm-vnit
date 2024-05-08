import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.number.to-fixed.js';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import { PictureOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import React, { memo, useState, useRef, useEffect } from 'react';
import Ajax from '../ajax.js';
import './index.css';

function RenderItem(props) {
  var uid = props.uid,
    url = props.url,
    name = props.name,
    action = props.action,
    onError = props.onError,
    headers = props.headers,
    disabled = props.disabled,
    onRemove = props.onRemove,
    onSuccess = props.onSuccess,
    onPreview = props.onPreview,
    renderItem = props.renderItem,
    rawResource = props.rawResource,
    _props$status = props.status,
    status = _props$status === void 0 ? 'done' : _props$status,
    _props$method = props.method,
    method = _props$method === void 0 ? 'POST' : _props$method;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    imgURL = _useState2[0],
    setImgURL = _useState2[1];
  var cvsRef = useRef();
  var ctxRef = useRef();
  var itemRef = useRef();
  var uploadInstance = useRef();
  // canvas 初始化
  useEffect(function () {
    var _itemRef$current;
    // 在元素刚刚挂载到 DOM 节点时，添加一个渐入式的动画。
    (_itemRef$current = itemRef.current) === null || _itemRef$current === void 0 || _itemRef$current.classList.add('enter-from');
    requestAnimationFrame(function () {
      var _itemRef$current2;
      return (_itemRef$current2 = itemRef.current) === null || _itemRef$current2 === void 0 ? void 0 : _itemRef$current2.classList.remove('enter-from');
    });
    if (url) {
      setImgURL(function () {
        return url;
      });
    } else if (rawResource) {
      // 预先添加了一个图片预加载的功能，在网络不太流畅时可以让图片尽早的展示出来。
      var reader = new FileReader();
      reader.readAsDataURL(rawResource);
      reader.onload = function () {
        return setImgURL(function () {
          return reader.result;
        });
      };
    }
    if (!url && status === 'loading') {
      initialCanvas();
      uploadFile();
    }
    return function () {
      // 销毁画布
      ctxRef.current = null;
      // 取消请求
      if (uploadInstance.current) uploadInstance.current.abort();
    };
  }, []);
  // 开始上传图片
  function uploadFile() {
    if (uid && status === 'loading' && rawResource) {
      var formData = new FormData();
      formData.append('file', rawResource);
      var upload = new Ajax({
        headers: headers
      });
      var isUploadStart = true;
      // 更新上传进度
      upload.onProgress(function (progress) {
        /**
         * 如果刚开始上传时，progress 就大于等于 1，说明网速足够快上传图片瞬间就完成了。此时使用动画自动完成进度条更新。
         * 否则只能通过 http response 的 onProgress 回调函数触发 updateProgressBar。
         */
        if (isUploadStart && progress >= 1) {
          progressBarAnimation();
        } else {
          updateProgressBar(progress);
        }
        isUploadStart = false;
      });
      // 上传成功
      upload.onSuccess( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(res) {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                uploadInstance.current = null;
                onSuccess === null || onSuccess === void 0 || onSuccess(uid, res);
                fadeInAnimation();
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      // 上传失败
      upload.onError(function (err) {
        onError === null || onError === void 0 || onError(uid, err);
        uploadInstance.current = null;
      });
      // 将 xhr 实例对象赋值给 uploadInstance，在组件卸载时如果请求还没有完成将会取消请求。
      uploadInstance.current = upload.create(action, method, formData);
    }
  }
  // canvas 画布初始化
  function initialCanvas() {
    cvsRef.current.width = 84;
    cvsRef.current.height = 84;
    var ctx = cvsRef.current.getContext('2d');
    ctxRef.current = ctx;
    ctx.save();
    ctx.translate(42, 42);
  }
  // 进度条自动更新动画
  function progressBarAnimation(callback) {
    var count = 1;
    (function loop() {
      if (count >= 100) return callback === null || callback === void 0 ? void 0 : callback();
      count += 3;
      count = Math.ceil(easeIn(count, count, 100 - count, 100));
      updateProgressBar(count / 100);
      requestAnimationFrame(loop);
    })();
  }
  // 更新进度条
  function updateProgressBar(progress) {
    if (!ctxRef.current) return;
    var ctx = ctxRef.current;
    ctx.clearRect(-42, -42, 84, 84);
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(-42, -42, 84, 84);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 1.5, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#1677ff';
    ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 2 * progress - 0.5 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'normal normal normal 14px arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillText((progress * 100).toFixed(0) + '%', 0, 0);
  }
  // 图片展示（渐入动画）
  function fadeInAnimation() {
    if (cvsRef.current) {
      cvsRef.current.style.display = 'none';
      // @ts-ignore
      cvsRef.current.parentNode.classList.toggle('fade-in');
      setTimeout(function () {
        var _cvsRef$current;
        if ((_cvsRef$current = cvsRef.current) !== null && _cvsRef$current !== void 0 && _cvsRef$current.parentNode) {
          // @ts-ignore
          cvsRef.current.parentNode.style.display = 'none';
        }
      }, 300);
    }
  }
  function handleRemove() {
    var _itemRef$current3;
    // 添加离开时的动画效果
    (_itemRef$current3 = itemRef.current) === null || _itemRef$current3 === void 0 || _itemRef$current3.classList.add('leave-from');
    requestAnimationFrame(function () {
      var _itemRef$current4, _itemRef$current5;
      (_itemRef$current4 = itemRef.current) === null || _itemRef$current4 === void 0 || _itemRef$current4.classList.remove('leave-from');
      (_itemRef$current5 = itemRef.current) === null || _itemRef$current5 === void 0 || _itemRef$current5.classList.add('leave-active');
    });
    setTimeout(function () {
      return onRemove === null || onRemove === void 0 ? void 0 : onRemove(uid);
    }, 300);
  }
  function handlePreview() {
    onPreview === null || onPreview === void 0 || onPreview(imgURL, rawResource);
  }
  return /*#__PURE__*/React.createElement("li", {
    ref: itemRef,
    className: "qm-vnit-upload-image-item".concat(status === 'error' ? ' error' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image-item-progress",
    style: {
      display: status === 'error' ? 'none' : ''
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: cvsRef,
    style: {
      width: 84,
      height: 84
    }
  })), status === 'error' ? ( /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image-item-error"
  }, /*#__PURE__*/React.createElement(PictureOutlined, {
    style: {
      fontSize: 36,
      color: '#ff4d4f'
    }
  }), /*#__PURE__*/React.createElement("p", null, name))) : null, status === 'done' ? ( /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image-item-preview"
  }, renderItem ? renderItem({
    url: imgURL,
    uid: uid,
    name: name
  }) : ( /*#__PURE__*/React.createElement("img", {
    src: imgURL,
    className: "qm-vnit-upload-image-item-preview-content"
  })))) : null, /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image-item-mask"
  }, /*#__PURE__*/React.createElement(DeleteOutlined, {
    onClick: handleRemove,
    style: {
      display: disabled ? 'none' : ''
    },
    className: "qm-vnit-upload-image-item-remove-icon"
  }), /*#__PURE__*/React.createElement(EyeOutlined, {
    style: {
      display: status === 'done' ? '' : 'none'
    },
    className: "qm-vnit-upload-image-item-preview-icon",
    onClick: handlePreview
  })), /*#__PURE__*/React.createElement("div", {
    className: "qm-vnit-upload-image-item-tips"
  }, "\u4E0A\u4F20\u5931\u8D25"));
}
var RenderItem$1 = /*#__PURE__*/memo(RenderItem);
/**
 * 动画效果函数
 * @params t { number } 动画已执行次数
 * @params b { number } 当前位置
 * @params c { number } 变化量 目标位置 - 当前位置
 * @params d { number } 动画共需要执行多少次
 * @return { number }
 * @author shenxuxiang
 */
var easeIn = function easeIn(t, b, c, d) {
  return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};

export { RenderItem$1 as default };
