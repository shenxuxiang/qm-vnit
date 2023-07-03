import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.test.js';
import 'core-js/modules/es.object.has-own.js';
import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.object.keys.js';
import 'core-js/modules/es.number.to-fixed.js';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-names';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import _URL from '@babel/runtime-corejs3/core-js-stable/url';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/promise';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';

function getType(data) {
  var _context;
  return _sliceInstanceProperty(_context = Object.prototype.toString.call(data)).call(_context, 8, -1).toLowerCase();
}
function isArray(data) {
  return getType(data) === 'array';
}
/**
 * 下载文件
 * @param fileName 指定文件下载后的文件名
 * @param data     文件资源（blob）
 * @param extName  文件后缀
 */
function downloadFile(fileName, data) {
  var extName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.xlsx';
  var blob = new Blob([data]);
  var eLink = document.createElement('a');
  // <a/> 上的 download 属性用于重命名一个需要下载的文件
  eLink.download = /\.([a-zA-Z]+)$/i.test(fileName) ? fileName : fileName + extName;
  eLink.style.display = 'none';
  eLink.href = _URL.createObjectURL(blob);
  document.body.appendChild(eLink);
  eLink.click();
  // 释放 URL 对象
  _URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}
/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
function throttle(func, delay) {
  var immediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var interval = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (immediately) {
      if (interval) return;
      func.apply(void 0, args);
      interval = setTimeout(function () {
        return interval = null;
      }, delay);
    } else {
      if (interval) return;
      interval = setTimeout(function () {
        func.apply(void 0, args);
        interval = null;
      }, delay);
    }
  };
}

export { downloadFile, getType, isArray, throttle };
