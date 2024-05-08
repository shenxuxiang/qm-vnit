import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/helpers/defineProperty';
import '@babel/runtime-corejs3/helpers/typeof';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.array.unshift.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.object.has-own.js';
import 'core-js/modules/es.object.keys.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.constructor.js';
import 'core-js/modules/es.regexp.dot-all.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.sticky.js';
import 'core-js/modules/es.regexp.test.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-names';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import '@babel/runtime-corejs3/core-js-stable/url';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/promise';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';

function getType(data) {
  var _context;
  return _sliceInstanceProperty(_context = Object.prototype.toString.call(data)).call(_context, 8, -1).toLowerCase();
}
function isArray(data) {
  return getType(data) === 'array';
}
/**
 * 判断两个值是否完全相等，可以比较 +0 !== -0，NaN === NaN
 * @param v1
 * @param v2
 * @returns
 */
function objectIs(v1, v2) {
  if (v1 === 0 && v2 === 0) {
    return 1 / v1 === 1 / v2;
  } else if (v1 !== v1) {
    return v2 !== v2;
  } else {
    return v1 === v2;
  }
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
  // 用来保存最新的参数，当 immediate 为 false 时有用。
  var latestArgs = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    latestArgs = args;
    if (immediately) {
      if (interval) return;
      func.apply(void 0, _toConsumableArray(latestArgs));
      interval = setTimeout(function () {
        return interval = null;
      }, delay);
    } else {
      if (interval) return;
      interval = setTimeout(function () {
        // 注意，如果这里使用 args，args 可能不是最新的事件触发时传递的参数，所以这里使用 latestArgs。
        func.apply(void 0, _toConsumableArray(latestArgs));
        interval = null;
      }, delay);
    }
  };
}
// 获取视口尺寸
function getViewportSize() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width: width,
    height: height
  };
}
/**
 * 将字符串样式格式化为 CSSProperties
 * @param style
 * @returns
 */
function parseStyle(style) {
  var _context5;
  if (!style) return;
  var arr = _filterInstanceProperty(_context5 = style.split(/[:;]/)).call(_context5, Boolean);
  var result = {};
  for (var i = 0; i < arr.length; i += 2) {
    var _context6, _context7;
    var key = _trimInstanceProperty(_context6 = arr[i]).call(_context6).replace(/(\-[a-z])/g, function (v1) {
      return _sliceInstanceProperty(v1).call(v1, -1).toUpperCase();
    });
    var value = _trimInstanceProperty(_context7 = arr[i + 1]).call(_context7);
    result[key] = value;
  }
  return result;
}

export { getType, getViewportSize, isArray, objectIs, parseStyle, throttle };
