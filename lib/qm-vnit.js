import './index.css';
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as React from "react";
import React__default, { createContext, useContext, useEffect, memo, useState, useRef, useMemo, useCallback, forwardRef, useImperativeHandle, useDeferredValue, useLayoutEffect } from "react";
import { Select, Cascader, DatePicker, Input, Col, Form, Row, Button, message, Card, Table, Pagination, Tree, Tooltip, Upload } from "antd";
import { createPortal } from "react-dom";
var IconContext = /* @__PURE__ */ createContext({});
const Context = IconContext;
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var classnames = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames2() {
      var classes2 = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes2.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames2.apply(null, arg);
            if (inner) {
              classes2.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
            classes2.push(arg.toString());
            continue;
          }
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes2.push(key);
            }
          }
        }
      }
      return classes2.join(" ");
    }
    if (module.exports) {
      classNames2.default = classNames2;
      module.exports = classNames2;
    } else {
      window.classNames = classNames2;
    }
  })();
})(classnames);
var classnamesExports = classnames.exports;
const classNames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = "100%";
  }
  var isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
  } else {
    n = n % max / parseFloat(String(max));
  }
  return n;
}
function isOnePointZero(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }
  return n;
}
function pad2(c) {
  return c.length === 1 ? "0" + c : String(c);
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * (6 * t);
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  if (s === 0) {
    g = l;
    b = l;
    r = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function toHsv(_ref) {
  var r = _ref.r, g = _ref.g, b = _ref.b;
  var hsv = rgbToHsv(r, g, b);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
}
function toHex(_ref2) {
  var r = _ref2.r, g = _ref2.g, b = _ref2.b;
  return "#".concat(rgbToHex(r, g, b, false));
}
function mix(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}
function getHue(hsv, i, light) {
  var hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}
function getValue(hsv, i, light) {
  var value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}
function generate$1(color) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var patterns = [];
  var pColor = inputToRGB(color);
  for (var i = lightColorCount; i > 0; i -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex(inputToRGB({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    }));
    patterns.push(colorString);
  }
  patterns.push(toHex(pColor));
  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = toHsv(pColor);
    var _colorString = toHex(inputToRGB({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: getValue(_hsv, _i)
    }));
    patterns.push(_colorString);
  }
  if (opts.theme === "dark") {
    return darkColorMap.map(function(_ref3) {
      var index2 = _ref3.index, opacity = _ref3.opacity;
      var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index2]), opacity * 100));
      return darkColorString;
    });
  }
  return patterns;
}
var presetPrimaryColors = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1677FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function(key) {
  presetPalettes[key] = generate$1(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5];
  presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
    theme: "dark",
    backgroundColor: "#141414"
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});
var warned = {};
var preWarningFns = [];
var preMessage = function preMessage2(fn) {
  preWarningFns.push(fn);
};
function warning$1(valid, message2) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "warning");
    }, message2);
    if (finalMessage) {
      console.error("Warning: ".concat(finalMessage));
    }
  }
}
function note(valid, message2) {
  if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
    var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : "", "note");
    }, message2);
    if (finalMessage) {
      console.warn("Note: ".concat(finalMessage));
    }
  }
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message2) {
  if (!valid && !warned[message2]) {
    method(false, message2);
    warned[message2] = true;
  }
}
function warningOnce(valid, message2) {
  call(warning$1, valid, message2);
}
function noteOnce(valid, message2) {
  call(note, valid, message2);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function contains(root, n) {
  if (!root) {
    return false;
  }
  if (root.contains) {
    return root.contains(n);
  }
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
var APPEND_ORDER = "data-rc-order";
var MARK_KEY = "rc-util-key";
var containerCache = /* @__PURE__ */ new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
  if (mark) {
    return mark.startsWith("data-") ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head2 = document.querySelector("head");
  return head2 || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function(node) {
    return node.tagName === "STYLE";
  });
}
function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom()) {
    return null;
  }
  var csp = option.csp, prepend = option.prepend;
  var styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
  if (csp !== null && csp !== void 0 && csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css;
  var container = getContainer(option);
  var firstChild = container.firstChild;
  if (prepend) {
    if (prepend === "queue") {
      var existStyle = findStyles(container).filter(function(node) {
        return ["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER));
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var container = getContainer(option);
  return findStyles(container).find(function(node) {
    return node.getAttribute(getMark(option)) === key;
  });
}
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS("", option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS(css, key) {
  var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var container = getContainer(option);
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
function warning(valid, message2) {
  warningOnce(valid, "[@ant-design/icons] ".concat(message2));
}
function isIconDefinition(target) {
  return _typeof(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && (_typeof(target.icon) === "object" || typeof target.icon === "function");
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(attrs).reduce(function(acc, key) {
    var val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /* @__PURE__ */ React__default.createElement(node.tag, _objectSpread2({
      key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index2) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index2));
    }));
  }
  return /* @__PURE__ */ React__default.createElement(node.tag, _objectSpread2(_objectSpread2({
    key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index2) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index2));
  }));
}
function getSecondaryColor(primaryColor) {
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles2() {
  var styleStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : iconStyles;
  var _useContext = useContext(Context), csp = _useContext.csp, prefixCls = _useContext.prefixCls;
  var mergedStyleStr = styleStr;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  useEffect(function() {
    updateCSS(mergedStyleStr, "@ant-design-icons", {
      prepend: true,
      csp
    });
  }, []);
};
var _excluded$1 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
var twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return _objectSpread2({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props) {
  var icon = props.icon, className = props.className, onClick = props.onClick, style = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = _objectWithoutProperties(props, _excluded$1);
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  useInsertStyles();
  warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!isIconDefinition(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === "function") {
    target = _objectSpread2(_objectSpread2({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return generate(target.icon, "svg-".concat(target.name), _objectSpread2({
    className,
    onClick,
    style,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, restProps));
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
const ReactIcon = IconBase;
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return ReactIcon.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = ReactIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
var _excluded = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
setTwoToneColor("#1890ff");
var Icon = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  var _classNames;
  var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = _objectWithoutProperties(props, _excluded);
  var _React$useContext = React.useContext(Context), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
  var classString = classNames(rootClassName, prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), _classNames), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0;
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return /* @__PURE__ */ React.createElement("span", _objectSpread2(_objectSpread2({
    role: "img",
    "aria-label": icon.name
  }, restProps), {}, {
    ref,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), /* @__PURE__ */ React.createElement(ReactIcon, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = "AntdIcon";
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
const AntdIcon = Icon;
var CloseOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" } }] }, "name": "close", "theme": "outlined" };
const CloseOutlinedSvg = CloseOutlined$2;
var CloseOutlined = function CloseOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: CloseOutlinedSvg
  }));
};
CloseOutlined.displayName = "CloseOutlined";
const CloseOutlined$1 = /* @__PURE__ */ React.forwardRef(CloseOutlined);
var DeleteOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" } }] }, "name": "delete", "theme": "outlined" };
const DeleteOutlinedSvg = DeleteOutlined$2;
var DeleteOutlined = function DeleteOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: DeleteOutlinedSvg
  }));
};
DeleteOutlined.displayName = "DeleteOutlined";
const DeleteOutlined$1 = /* @__PURE__ */ React.forwardRef(DeleteOutlined);
var DownOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" } }] }, "name": "down", "theme": "outlined" };
const DownOutlinedSvg = DownOutlined$2;
var DownOutlined = function DownOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: DownOutlinedSvg
  }));
};
DownOutlined.displayName = "DownOutlined";
const DownOutlined$1 = /* @__PURE__ */ React.forwardRef(DownOutlined);
var EyeOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" } }] }, "name": "eye", "theme": "outlined" };
const EyeOutlinedSvg = EyeOutlined$2;
var EyeOutlined = function EyeOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: EyeOutlinedSvg
  }));
};
EyeOutlined.displayName = "EyeOutlined";
const EyeOutlined$1 = /* @__PURE__ */ React.forwardRef(EyeOutlined);
var PictureOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 100-176 88 88 0 000 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" } }] }, "name": "picture", "theme": "outlined" };
const PictureOutlinedSvg = PictureOutlined$2;
var PictureOutlined = function PictureOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: PictureOutlinedSvg
  }));
};
PictureOutlined.displayName = "PictureOutlined";
const PictureOutlined$1 = /* @__PURE__ */ React.forwardRef(PictureOutlined);
var PlayCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M719.4 499.1l-296.1-215A15.9 15.9 0 00398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 000-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z" } }] }, "name": "play-circle", "theme": "outlined" };
const PlayCircleOutlinedSvg = PlayCircleOutlined$2;
var PlayCircleOutlined = function PlayCircleOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: PlayCircleOutlinedSvg
  }));
};
PlayCircleOutlined.displayName = "PlayCircleOutlined";
const PlayCircleOutlined$1 = /* @__PURE__ */ React.forwardRef(PlayCircleOutlined);
var PlusOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "defs", "attrs": {}, "children": [{ "tag": "style", "attrs": {} }] }, { "tag": "path", "attrs": { "d": "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" } }, { "tag": "path", "attrs": { "d": "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" } }] }, "name": "plus", "theme": "outlined" };
const PlusOutlinedSvg = PlusOutlined$2;
var PlusOutlined = function PlusOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: PlusOutlinedSvg
  }));
};
PlusOutlined.displayName = "PlusOutlined";
const PlusOutlined$1 = /* @__PURE__ */ React.forwardRef(PlusOutlined);
var UploadOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, "name": "upload", "theme": "outlined" };
const UploadOutlinedSvg = UploadOutlined$2;
var UploadOutlined = function UploadOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(AntdIcon, _objectSpread2(_objectSpread2({}, props), {}, {
    ref,
    icon: UploadOutlinedSvg
  }));
};
UploadOutlined.displayName = "UploadOutlined";
const UploadOutlined$1 = /* @__PURE__ */ React.forwardRef(UploadOutlined);
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}
function isArray(data) {
  return getType(data) === "array";
}
function downloadFile(fileName, data, extName2 = ".xlsx") {
  const blob = new Blob([data]);
  const eLink = document.createElement("a");
  eLink.download = /\.([a-zA-Z]+)$/i.test(fileName) ? fileName : fileName + extName2;
  eLink.style.display = "none";
  eLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eLink);
  eLink.click();
  URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}
function throttle(func, delay2, immediately = false) {
  let interval = null;
  return function(...args) {
    if (immediately) {
      if (interval)
        return;
      func(...args);
      interval = setTimeout(() => interval = null, delay2);
    } else {
      if (interval)
        return;
      interval = setTimeout(() => {
        func(...args);
        interval = null;
      }, delay2);
    }
  };
}
const index$8 = "";
function computeColSpan() {
  const width = window.innerWidth || document.documentElement.clientWidth;
  if (width >= 1600)
    return colSpanConfig.xxl;
  if (width >= 1200)
    return colSpanConfig.xl;
  if (width >= 992)
    return colSpanConfig.lg;
  if (width >= 768)
    return colSpanConfig.md;
  return colSpanConfig.sm;
}
const { useForm, Item: FormItem } = Form;
const SelectOption = Select.Option;
const colSpanConfig = {
  xxl: 6,
  xl: 8,
  lg: 8,
  md: 12,
  sm: 12,
  xs: 12
};
function ContentFormHead(props) {
  const {
    onSubmit,
    onExport,
    queryList,
    initialValues,
    cols: propCols,
    showExportButton,
    defaultExpand = true,
    okButtonText = "查询",
    showResetButton = true
  } = props;
  const [colSpan, setColSpan] = useState(propCols ? 24 / propCols : computeColSpan);
  const [expand, setExpand] = useState(defaultExpand);
  const [form] = useForm();
  const containerRef = useRef();
  useEffect(() => {
    function resize() {
      const colSpan2 = propCols ? 24 / propCols : computeColSpan();
      setColSpan(() => colSpan2);
      if (expand) {
        const cols = 24 / colSpan2;
        const length = queryList.filter((item) => item.component || item.formType).length;
        const rows = Math.ceil((length + 1) / cols);
        containerRef.current.style.height = expand ? `${rows * 64}px` : "64px";
      } else {
        containerRef.current.style.height = "64px";
      }
    }
    resize();
    if (propCols)
      return;
    const hanleResize = throttle(resize, 200);
    window.addEventListener("resize", hanleResize, false);
    return () => {
      window.removeEventListener("resize", hanleResize, false);
    };
  }, [queryList, expand, propCols]);
  const offsetSpan = useMemo(() => {
    const cols = 24 / colSpan;
    const { length } = queryList;
    if (length < cols)
      return (cols - length - 1) * colSpan;
    const reset = length % cols;
    const offset = (cols - 1 - reset) * colSpan;
    return expand ? offset : 0;
  }, [queryList, colSpan, expand]);
  const renderFormContent = useMemo(() => {
    const cols = 24 / colSpan;
    const context = [];
    for (let i = 0; i < queryList.length; i++) {
      const {
        title,
        options,
        formType,
        dataIndex,
        component,
        properties,
        placeholder,
        label = title,
        name = dataIndex,
        keyNameForKey = "label",
        keyNameForValue = "value"
      } = queryList[i];
      let contextItem = null;
      if (!component && !formType)
        continue;
      if (component) {
        contextItem = React__default.cloneElement(component, { ...properties });
      } else {
        switch (formType) {
          case "input":
            contextItem = /* @__PURE__ */ React__default.createElement(
              Input,
              {
                allowClear: true,
                ...properties,
                autoComplete: "off",
                placeholder: placeholder || `请输入要查询的${label}`
              }
            );
            break;
          case "select":
            contextItem = /* @__PURE__ */ React__default.createElement(Select, { allowClear: true, placeholder: placeholder || `请选择您要查询的${label}`, ...properties }, options == null ? void 0 : options.map((item) => /* @__PURE__ */ React__default.createElement(
              SelectOption,
              {
                key: item[keyNameForKey],
                value: item[keyNameForValue]
              },
              item[keyNameForKey]
            )));
            break;
          case "rangePicker":
            contextItem = /* @__PURE__ */ React__default.createElement(DatePicker.RangePicker, { format: "YYYY-MM-DD", ...properties });
            break;
          case "datePicker":
            contextItem = /* @__PURE__ */ React__default.createElement(DatePicker, { format: "YYYY-MM-DD", style: { width: "100%" }, ...properties });
            break;
          case "cascader":
            contextItem = /* @__PURE__ */ React__default.createElement(
              Cascader,
              {
                changeOnSelect: true,
                ...properties,
                options,
                placeholder: placeholder || `请选择您要查询的${label}`
              }
            );
            break;
        }
      }
      const spanProps2 = propCols ? { span: 24 / propCols } : colSpanConfig;
      context.push(
        /* @__PURE__ */ React__default.createElement(
          Col,
          {
            key: name,
            ...spanProps2,
            style: { display: i > cols - 2 && !expand ? "none" : "" }
          },
          /* @__PURE__ */ React__default.createElement(FormItem, { label, name }, contextItem)
        )
      );
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);
  const handleFinish = useCallback((values) => {
    onSubmit == null ? void 0 : onSubmit(values);
  }, [onSubmit]);
  const handleReset = useCallback(() => {
    onSubmit == null ? void 0 : onSubmit({});
  }, []);
  const handleExport = useCallback(() => {
    onExport == null ? void 0 : onExport(form.getFieldsValue());
  }, [onExport]);
  const handleChangeExpand = useCallback(() => {
    const newNewExpand = !expand;
    setExpand(newNewExpand);
    if (newNewExpand) {
      const cols = 24 / colSpan;
      const rows = Math.ceil((renderFormContent.length + 1) / cols);
      containerRef.current.style.height = newNewExpand ? `${rows * 64}px` : "64px";
    } else {
      containerRef.current.style.height = "64px";
    }
  }, [expand, colSpan, renderFormContent.length]);
  const spanProps = useMemo(() => propCols ? { span: 24 / propCols } : colSpanConfig, [propCols]);
  return /* @__PURE__ */ React__default.createElement("section", { className: "qm-content-form-head" }, /* @__PURE__ */ React__default.createElement(
    Form,
    {
      form,
      onReset: handleReset,
      onFinish: handleFinish,
      name: "content-form-head",
      initialValues
    },
    /* @__PURE__ */ React__default.createElement(Row, { className: "qm-content-form-head-row", ref: containerRef }, renderFormContent, /* @__PURE__ */ React__default.createElement(
      Col,
      {
        ...spanProps,
        offset: offsetSpan,
        className: "qm-content-form-head-button-group"
      },
      /* @__PURE__ */ React__default.createElement(Button, { type: "primary", htmlType: "submit" }, okButtonText),
      showResetButton && /* @__PURE__ */ React__default.createElement(Button, { htmlType: "reset", style: { marginLeft: "8px" } }, "重置"),
      showExportButton && /* @__PURE__ */ React__default.createElement(Button, { style: { marginLeft: "8px" }, onClick: handleExport }, "导出"),
      queryList.length >= 24 / colSpan && /* @__PURE__ */ React__default.createElement(Button, { type: "link", onClick: handleChangeExpand }, expand ? "收起" : "展开", /* @__PURE__ */ React__default.createElement(DownOutlined$1, { className: `icon${expand ? " expand" : ""}` }))
    ))
  ));
}
const ContentFormHead$1 = memo(ContentFormHead);
function reduce(state, action) {
  if (action === null)
    return state;
  return { ...state, ...action };
}
function useReducer(initialState2) {
  const [state, dispatchSetState] = useState(initialState2);
  function setState(action) {
    if (typeof action === "function") {
      dispatchSetState((prevState) => reduce(prevState, action(prevState)));
    } else {
      dispatchSetState((prevState) => reduce(prevState, action));
    }
  }
  return [state, setState];
}
const index$7 = "";
function initialState$2() {
  return {
    total: 0,
    pageNum: 1,
    pageList: [],
    pageSize: 10,
    loading: false,
    searchContent: {}
  };
}
function ContentFormPage(props, ref) {
  const [state, setState] = useReducer(initialState$2);
  const { total, pageNum, loading: loading2, pageSize, pageList, searchContent } = state;
  const {
    extra,
    rowKey,
    columns,
    bordered,
    tableTitle,
    dataExport,
    tableScroll,
    rowSelection,
    exportFileName,
    paginationSize,
    showResetButton,
    searchButtonText,
    requestDataSource,
    hasSearchFunction,
    onPaginationChange,
    paginationShowTotal = showTotal,
    customResponse = handleResponse
  } = props;
  const initialSearchCondition = useRef(null);
  const tableColumns = useMemo(() => {
    return columns.filter((column) => column.visibleInTable !== false);
  }, [columns]);
  const queryList = useMemo(() => {
    return columns.filter((column) => column.component || column.formType);
  }, [columns]);
  if (initialSearchCondition.current === null) {
    const initialValues = {};
    for (let i = 0; i < queryList.length; i++) {
      const { dataIndex, name, initialValue } = queryList[i];
      if (initialValue)
        initialValues[name || dataIndex] = initialValue;
    }
    initialSearchCondition.current = initialValues;
    setState({ searchContent: formatFormData(initialValues, queryList) });
  }
  const sendRequestPageList = useCallback(
    async (query) => {
      setState({ loading: true });
      try {
        const response = await requestDataSource(query);
        const { data, code } = response;
        if (code === 0) {
          setState({ ...customResponse(data) });
        }
      } finally {
        setState({ loading: false });
      }
    },
    []
  );
  useImperativeHandle(
    ref,
    () => ({
      // 强制更新页面数据
      forceUpdate(opts, callback) {
        const query = { pageSize, pageNum, ...searchContent, ...opts };
        sendRequestPageList(query).finally(() => callback == null ? void 0 : callback());
      }
    }),
    [pageSize, pageNum, searchContent]
  );
  useEffect(() => {
    sendRequestPageList({ pageSize, pageNum, ...searchContent });
  }, [pageSize, pageNum, searchContent]);
  useEffect(() => {
    onPaginationChange == null ? void 0 : onPaginationChange(pageNum, pageSize);
  }, [pageSize, pageNum]);
  const onPageSizeChange = useCallback((_, pageSize2) => {
    setState({ pageSize: pageSize2, pageNum: 1 });
  }, []);
  const onPageNumChange = useCallback((pageNum2) => {
    setState({ pageNum: pageNum2 });
  }, []);
  const handleSubmit = useCallback((values) => {
    const formData = formatFormData(values, queryList);
    setState({ searchContent: formData, pageNum: 1 });
  }, [queryList]);
  const handleExport = useCallback(
    async (values) => {
      const formData = formatFormData(values, queryList);
      try {
        const file = await dataExport({ pageNum, pageSize, ...formData });
        if (file.data.type === "application/json") {
          throw new Error("文件下载失败");
        } else {
          downloadFile(exportFileName || file.fileName, file.data);
        }
      } catch (error2) {
        message.warning("文件下载失败");
      }
    },
    [dataExport, exportFileName, queryList, pageNum, pageSize]
  );
  const handleTableChange = useCallback(
    (_, __, sorter) => {
      const orderList = [];
      if (sorter instanceof Array) {
        for (let i = 0; i < sorter.length; i++) {
          const { field, order } = sorter[i];
          if (order)
            orderList.push({ field, direction: order.includes("asc") });
        }
      } else {
        const { field, order } = sorter;
        if (order)
          orderList.push({ field, direction: order.includes("asc") });
      }
      const newSearchCondition = {
        ...searchContent,
        order: orderList
      };
      if (orderList.length <= 0)
        delete newSearchCondition.order;
      setState({ searchContent: newSearchCondition });
    },
    [searchContent]
  );
  return /* @__PURE__ */ React__default.createElement("div", { className: "qm-content-form-page" }, hasSearchFunction && /* @__PURE__ */ React__default.createElement(
    ContentFormHead$1,
    {
      queryList,
      onSubmit: handleSubmit,
      onExport: handleExport,
      okButtonText: searchButtonText,
      showResetButton,
      initialValues: initialSearchCondition.current
    }
  ), /* @__PURE__ */ React__default.createElement(Card, { bodyStyle: { padding: "0 24px" } }, /* @__PURE__ */ React__default.createElement("div", { className: "qm-content-form-page-table-head " }, /* @__PURE__ */ React__default.createElement("div", { className: "qm-content-form-page-table-head-title" }, tableTitle || "查询表格"), extra ? /* @__PURE__ */ React__default.createElement("div", null, extra) : null), /* @__PURE__ */ React__default.createElement(
    Table,
    {
      rowKey,
      loading: loading2,
      pagination: false,
      bordered,
      scroll: tableScroll,
      dataSource: pageList,
      columns: tableColumns,
      rowSelection,
      onChange: handleTableChange
    }
  ), total > 0 ? /* @__PURE__ */ React__default.createElement(
    Pagination,
    {
      total,
      current: pageNum,
      pageSize,
      size: paginationSize,
      showSizeChanger: true,
      onChange: onPageNumChange,
      showTotal: paginationShowTotal,
      onShowSizeChange: onPageSizeChange,
      className: "qm-content-form-page-pagination"
    }
  ) : null));
}
const index$6 = forwardRef(ContentFormPage);
function showTotal(total) {
  return `共 ${total} 条数据`;
}
function handleResponse(data) {
  const { list: pageList, total, pageSize, pageNum } = data;
  return { pageList, total, pageSize, pageNum };
}
function formatFormData(values, columns) {
  const formData = {};
  for (let i = 0; i < columns.length; i++) {
    const { dataIndex, name = dataIndex, formatData } = columns[i];
    const value = values[name];
    if (value == null)
      continue;
    if (typeof formatData === "function") {
      const fieldValue = formatData(value);
      Object.assign(formData, fieldValue);
    } else {
      formData[name] = value;
    }
  }
  return formData;
}
const index$5 = "";
function computePropTreeData(sourceList) {
  return (sourceList == null ? void 0 : sourceList.map((item) => {
    const { id, parentId, name, children, ...props } = item;
    return {
      key: id,
      title: name,
      parentKey: parentId,
      children: children ? computePropTreeData(children) : void 0,
      ...props
    };
  })) ?? [];
}
function filterTreeData(treeData, searchValue) {
  return treeData.map((item) => {
    const { title, key, parentKey, children, ...props } = item;
    let newTitle = title;
    if (title.indexOf(searchValue) >= 0) {
      newTitle = [];
      const ary = title.split(searchValue);
      const length = ary.length;
      for (let i = 0; i < length; i++) {
        ary[i] && newTitle.push(ary[i]);
        if (i < length - 1) {
          newTitle.push(/* @__PURE__ */ React__default.createElement("span", { className: "qm-model-tree-node-rich", key: i }, searchValue));
        }
      }
      newTitle = /* @__PURE__ */ React__default.createElement("span", null, newTitle);
    }
    if (children == null ? void 0 : children.length) {
      return {
        key,
        parentKey,
        title: newTitle,
        children: filterTreeData(children, searchValue),
        ...props
      };
    } else {
      return { title: newTitle, key, parentKey, ...props };
    }
  });
}
function getParentKey(key, data) {
  let idx = data.findIndex((item) => item.key === key);
  if (idx <= 0)
    return null;
  const parentKeys = [];
  let pk = data[idx].parentKey;
  while (idx--) {
    const k = data[idx].key;
    if (pk === k) {
      parentKeys.unshift(k);
      pk = data[idx].parentKey;
    }
  }
  return parentKeys;
}
function flatTreeData(tree) {
  const stack = isArray(tree) ? [...tree] : [tree];
  const result = [];
  while (stack.length) {
    const { key, parentKey, title, children } = stack.shift();
    result.push({ title, key, parentKey });
    if (!(children == null ? void 0 : children.length))
      continue;
    for (let i = 0; i < children.length; i++) {
      stack.unshift(children[i]);
    }
  }
  return result.sort((a, b) => Number(a.key) - Number(b.key));
}
function initialState$1() {
  return {
    // 过滤内容
    searchValue: "",
    // 选中的节点数组
    checkedKeys: [],
    // Tree 组件的展开项
    expandedKeys: [],
    // 扁平的 TreeData 数组
    flatArrayTreeData: []
  };
}
function ModelTree(props) {
  const [state, setState] = useReducer(initialState$1);
  const {
    searchValue,
    checkedKeys,
    expandedKeys,
    flatArrayTreeData
  } = state;
  const {
    onChange,
    checkable,
    filterOption = true,
    treeData: propTreeData,
    checkedKeys: propCheckedKeys,
    formatData = computePropTreeData
  } = props;
  const deferSearchValue = useDeferredValue(searchValue);
  const isInternalModifiedCheckedKeys = useRef(false);
  useEffect(() => {
    if (propCheckedKeys === void 0) {
      return;
    } else if (isInternalModifiedCheckedKeys.current) {
      isInternalModifiedCheckedKeys.current = false;
      return;
    } else {
      setState({ checkedKeys: propCheckedKeys });
    }
  }, [propCheckedKeys]);
  const treeData = useMemo(() => {
    const treeData2 = typeof formatData === "function" ? formatData(propTreeData) : propTreeData;
    setState({ flatArrayTreeData: flatTreeData(treeData2) });
    return treeData2;
  }, [propTreeData]);
  const computeTreeData = useMemo(() => {
    if (!deferSearchValue)
      return treeData;
    if (typeof filterOption === "function") {
      return filterOption(treeData, deferSearchValue);
    } else {
      return filterTreeData(treeData, deferSearchValue);
    }
  }, [treeData, deferSearchValue, filterOption]);
  useEffect(() => {
    if (!deferSearchValue)
      return;
    const newExpandedKeys = [];
    flatArrayTreeData.forEach((item) => {
      if (item.title.indexOf(deferSearchValue) > -1) {
        const parentkeys = getParentKey(item.key, flatArrayTreeData);
        parentkeys && newExpandedKeys.push(...parentkeys);
      }
    });
    setState({ expandedKeys: newExpandedKeys });
  }, [flatArrayTreeData, deferSearchValue]);
  const handleTreeCheck = useCallback((checkedKeys2) => {
    isInternalModifiedCheckedKeys.current = true;
    setState({ checkedKeys: checkedKeys2 });
    const allKeys = [];
    checkedKeys2.forEach((key) => {
      const keys = getParentKey(key, flatArrayTreeData);
      keys && allKeys.push(...keys);
    });
    onChange == null ? void 0 : onChange(checkedKeys2, [...new Set(allKeys.concat(checkedKeys2))]);
  }, [flatArrayTreeData]);
  const handleTreeExpand = useCallback((newExpandedKeys) => {
    setState({ expandedKeys: newExpandedKeys });
  }, []);
  const handleSearchChange = useCallback((event) => {
    setState({ searchValue: event.target.value.trim() });
  }, []);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, !!filterOption && /* @__PURE__ */ React__default.createElement(
    Input.Search,
    {
      style: { marginBottom: 8 },
      onChange: handleSearchChange,
      placeholder: "请输入关键字进行过滤"
    }
  ), /* @__PURE__ */ React__default.createElement("div", { className: "qm-model-tree" }, /* @__PURE__ */ React__default.createElement(
    Tree,
    {
      checkable,
      onCheck: handleTreeCheck,
      checkedKeys,
      treeData: computeTreeData,
      onExpand: handleTreeExpand,
      expandedKeys
    }
  )));
}
const index$4 = memo(ModelTree);
function createElement() {
  return document.createElement("div");
}
function ReactPortal(props) {
  const { className, children } = props;
  const [state] = useState(createElement);
  useEffect(() => {
    if (className)
      state.className = className;
    document.body.appendChild(state);
    return () => {
      document.body.removeChild(state);
    };
  }, []);
  return createPortal(children, state);
}
const Portal = memo(ReactPortal);
const modalMask = "_modalMask_1m428_1";
const open = "_open_1m428_12";
const modalContent = "_modalContent_1m428_16";
const hideAnimation = "_hideAnimation_1m428_30";
const showAnimation = "_showAnimation_1m428_34";
const classes$3 = {
  modalMask,
  open,
  modalContent,
  hideAnimation,
  showAnimation
};
function Modal(props) {
  const [visible, setVisible] = useState(false);
  const { open: open2, onClose, children, mask = true, maskClosable = true } = props;
  const maskRef = useRef();
  const contentRef = useRef();
  useEffect(() => {
    if (open2) {
      document.body.style.overflow = "none";
      maskRef.current.style.display = "";
      contentRef.current.style.display = "";
      setTimeout(() => setVisible(() => true), 20);
    } else {
      document.body.style.overflow = "";
      setVisible(() => false);
      setTimeout(() => {
        maskRef.current.style.display = "none";
        contentRef.current.style.display = "none";
      }, 300);
    }
  }, [open2]);
  const handleCloseModal = useCallback(() => {
    maskClosable && (onClose == null ? void 0 : onClose());
  }, [maskClosable]);
  return /* @__PURE__ */ React__default.createElement(Portal, null, mask && /* @__PURE__ */ React__default.createElement(
    "div",
    {
      ref: maskRef,
      onClick: handleCloseModal,
      style: { display: "none" },
      className: `${classes$3.modalMask}${visible ? " " + classes$3.open : ""}`
    }
  ), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      ref: contentRef,
      style: { display: "none" },
      className: `${classes$3.modalContent}${visible ? " " + classes$3.open : ""}`
    },
    children
  ));
}
const Modal$1 = memo(Modal);
const imgURL = "data:image/gif;base64,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";
class IntersectionImage {
  constructor() {
    __publicField(this, "intersection");
    __publicField(this, "observerCallback", (enters) => {
      const length = enters.length;
      for (let i = 0; i < length; i++) {
        const { target, intersectionRatio } = enters[i];
        if (intersectionRatio > 0) {
          this.unobserveImage(target);
          preloadImage(target);
        }
      }
    });
    __publicField(this, "observeImage", (element) => {
      if (Array.isArray(element)) {
        element.forEach((item) => item && this.intersection.observe(item));
      } else {
        element && this.intersection.observe(element);
      }
    });
    __publicField(this, "unobserveImage", (element) => {
      if (Array.isArray(element)) {
        element.forEach((item) => item && this.intersection.unobserve(item));
      } else {
        element && this.intersection.unobserve(element);
      }
    });
    this.intersection = new IntersectionObserver(this.observerCallback);
  }
  destroy() {
    this.intersection.disconnect();
  }
}
const intersectionImage = new IntersectionImage();
function preloadImage(element) {
  const src = element.getAttribute("data-src");
  const img = new Image();
  img.src = src;
  img.onload = function() {
    element.src = src;
  };
}
function Image$1(props, ref) {
  const { src, alt, className, style, ...restProps } = props;
  const imageRef = useRef();
  useEffect(() => {
    intersectionImage.observeImage(imageRef.current);
    return () => {
      intersectionImage.unobserveImage(imageRef.current);
    };
  }, []);
  useImperativeHandle(ref, () => ({
    instance: imageRef.current
  }), []);
  return /* @__PURE__ */ React__default.createElement(
    "img",
    {
      src: imgURL,
      style,
      ...restProps,
      ref: imageRef,
      "data-src": src,
      alt: alt || "图片",
      className
    }
  );
}
const Img = forwardRef(Image$1);
const aitSpin = "_aitSpin_muxh7_1";
const aitSpinDot = "_aitSpinDot_muxh7_7";
const dotAnimation = "_dotAnimation_muxh7_1";
const aitSpinDotItem = "_aitSpinDotItem_muxh7_16";
const dotItemAnimation = "_dotItemAnimation_muxh7_1";
const aitSpinBox = "_aitSpinBox_muxh7_46";
const aitSpinSpinning = "_aitSpinSpinning_muxh7_51";
const hide = "_hide_muxh7_61";
const aitSpinSpinningCenter = "_aitSpinSpinningCenter_muxh7_65";
const aitSpinContainer = "_aitSpinContainer_muxh7_71";
const aitSpinMask = "_aitSpinMask_muxh7_75";
const styles = {
  aitSpin,
  aitSpinDot,
  dotAnimation,
  aitSpinDotItem,
  dotItemAnimation,
  aitSpinBox,
  aitSpinSpinning,
  hide,
  aitSpinSpinningCenter,
  aitSpinContainer,
  aitSpinMask
};
function Spin(props) {
  const { children, delay, spinning } = props;
  const [isClosed, setCloseSpin] = useState(spinning);
  useLayoutEffect(() => {
    if (delay == null) {
      setCloseSpin(() => !spinning);
      return;
    }
    setTimeout(() => setCloseSpin(() => !spinning), delay);
  }, [spinning]);
  const renderDot = useMemo(
    () => /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpin }, /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinDot }, /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinDotItem }), /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinDotItem }), /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinDotItem }), /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinDotItem }))),
    []
  );
  if (children == null)
    return isClosed ? null : renderDot;
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinBox }, /* @__PURE__ */ React__default.createElement("div", { className: `${styles.aitSpinSpinning}${isClosed ? ` ${styles.hide}` : ""}` }, /* @__PURE__ */ React__default.createElement("div", { className: styles.aitSpinSpinningCenter }, renderDot)), /* @__PURE__ */ React__default.createElement("div", { className: `${styles.aitSpinContainer}${isClosed ? "" : ` ${styles.aitSpinMask}`}` }, children));
}
const Spin$1 = memo(Spin);
const head = "_head_jfoky_1";
const operationIcon = "_operationIcon_jfoky_13";
const rotate90 = "_rotate90_jfoky_26";
const body = "_body_jfoky_29";
const button = "_button_jfoky_34";
const buttonHover = "_buttonHover_jfoky_50";
const prevButton = "_prevButton_jfoky_55";
const disabled = "_disabled_jfoky_78";
const nextButton = "_nextButton_jfoky_83";
const bodyContent = "_bodyContent_jfoky_111";
const previewImg = "_previewImg_jfoky_118";
const foot = "_foot_jfoky_124";
const footButton = "_footButton_jfoky_133";
const footPrevButton = "_footPrevButton_jfoky_146";
const footNextButton = "_footNextButton_jfoky_170";
const footSlider = "_footSlider_jfoky_194";
const footSliderList = "_footSliderList_jfoky_202";
const footSliderListItem = "_footSliderListItem_jfoky_210";
const active = "_active_jfoky_232";
const classes$2 = {
  head,
  operationIcon,
  rotate90,
  body,
  button,
  buttonHover,
  prevButton,
  disabled,
  nextButton,
  bodyContent,
  previewImg,
  foot,
  footButton,
  footPrevButton,
  footNextButton,
  footSlider,
  footSliderList,
  footSliderListItem,
  active
};
const iconfont = "";
const ITEM_WIDTH = 120;
const REG_TRANSFORMX = /translateX\(([\-.0-9]*)px\)/;
const REG_SCALE = /scale\(([\-.0-9]*)\, ([\-.0-9]*)\)/;
const REG_ROTATEZ = /rotateZ\(([\-.0-9]*)deg\)/;
function getTransformProperties(element) {
  const style = element.style.transform;
  const scale = REG_SCALE.exec(style);
  const rotate = REG_ROTATEZ.exec(style);
  return { scaleX: Number((scale == null ? void 0 : scale[1]) ?? 1), scaleY: Number((scale == null ? void 0 : scale[2]) ?? 1), rotateZ: Number((rotate == null ? void 0 : rotate[1]) ?? 0) };
}
function initialState() {
  return {
    currentIndex: 0,
    isEndPage: false,
    isStartPage: false,
    imageURL: "",
    spinning: false
  };
}
function PreviewImage(props) {
  const [state, setState] = useReducer(initialState);
  const { currentIndex, isStartPage, isEndPage, imageURL, spinning } = state;
  const { onClose, open: open2, imgs, previewImgs = imgs, index: index2 = 0, hasPerformance = false, pageSize = 9 } = props;
  const imgRef = useRef();
  const sliderWrapperRef = useRef();
  const sliderRef = useRef();
  const totalSizeRef = useRef(0);
  const isMounted = useRef(false);
  const HDPictureListRef = useRef(imgs);
  const thumbnailListRef = useRef(previewImgs);
  useEffect(() => {
    totalSizeRef.current = imgs.length;
    HDPictureListRef.current = imgs;
    thumbnailListRef.current = previewImgs;
  }, [imgs, previewImgs]);
  useEffect(() => {
    if (open2) {
      isMounted.current = true;
      imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    }
  }, [open2]);
  useEffect(() => {
    if (open2) {
      let currentIndex2 = index2;
      if (index2 <= 0) {
        currentIndex2 = 0;
      } else if (index2 >= totalSizeRef.current) {
        currentIndex2 = totalSizeRef.current - 1;
      }
      sliderAnimation(currentIndex2, 0);
      setState({
        currentIndex: currentIndex2,
        isStartPage: currentIndex2 < Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
        isEndPage: currentIndex2 > totalSizeRef.current - 1 - Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize
      });
    }
  }, [open2, index2]);
  useEffect(() => {
    var _a, _b;
    const hd = HDPictureListRef.current[currentIndex];
    if (!hd)
      return;
    if ((_b = (_a = imgRef.current) == null ? void 0 : _a.src) == null ? void 0 : _b.endsWith(hd))
      return;
    if (!hasPerformance) {
      setState({ imageURL: hd });
      return;
    }
    setState({ spinning: true, imageURL: thumbnailListRef.current[currentIndex] });
    const img = new Image();
    img.src = hd;
    img.onload = () => setState({ spinning: false, imageURL: hd });
    return () => {
      if (img)
        img.onload = null;
    };
  }, [open2, currentIndex]);
  const sliderAnimation = (index22, duration = 300) => {
    if (!sliderRef.current || !sliderWrapperRef.current)
      return;
    if (totalSizeRef.current <= pageSize) {
      sliderRef.current.style.cssText = `transform: translateX(0px); transition: transform 0ms ease`;
      return;
    }
    const halfMaxSize = Math.ceil(pageSize / 2);
    let offsetX = 0;
    if (index22 + 1 <= halfMaxSize) {
      offsetX = 0;
    } else if (index22 + 1 > totalSizeRef.current - halfMaxSize) {
      offsetX = totalSizeRef.current * ITEM_WIDTH - sliderWrapperRef.current.clientWidth;
    } else {
      offsetX = index22 * ITEM_WIDTH - sliderWrapperRef.current.clientWidth / 2 + ITEM_WIDTH / 2;
    }
    const cssText = `transform: translateX(${offsetX * -1}px); transition: transform ${duration}ms ease`;
    sliderRef.current.style.cssText = cssText;
  };
  const handlePrevItem = () => {
    if (currentIndex <= 0)
      return;
    imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    setState((prev) => {
      let count = prev.currentIndex - 1;
      count = count >= 0 ? count : 0;
      sliderAnimation(count);
      return {
        currentIndex: count,
        isStartPage: count < Math.ceil(pageSize / 2),
        isEndPage: count > totalSizeRef.current - 1 - Math.ceil(pageSize / 2)
      };
    });
  };
  const handleNextItem = () => {
    if (currentIndex >= totalSizeRef.current - 1)
      return;
    imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    setState((prev) => {
      let count = prev.currentIndex + 1;
      count = count >= totalSizeRef.current ? totalSizeRef.current - 1 : count;
      sliderAnimation(count);
      return {
        currentIndex: count,
        isStartPage: count < Math.ceil(pageSize / 2),
        isEndPage: count > totalSizeRef.current - 1 - Math.ceil(pageSize / 2)
      };
    });
  };
  const handleChangeIndex = (index22) => {
    if (currentIndex === index22)
      return;
    imgRef.current.style.transform = `scale(1, 1) rotateZ(0deg)`;
    sliderAnimation(index22);
    setState({
      currentIndex: index22,
      isStartPage: index22 < Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize,
      isEndPage: index22 > totalSizeRef.current - 1 - Math.ceil(pageSize / 2) || totalSizeRef.current <= pageSize
    });
  };
  const handlePrevPage = () => {
    if (isStartPage)
      return;
    const transform = sliderRef.current.style.transform;
    const [, translateX = 0] = REG_TRANSFORMX.exec(transform) ?? [];
    let offsetX = Number(translateX) + pageSize * ITEM_WIDTH;
    if (offsetX >= 0) {
      offsetX = 0;
      setState({ isStartPage: true, isEndPage: false });
    } else {
      setState({ isStartPage: false, isEndPage: false });
    }
    const cssText = `transform: translateX(${offsetX}px); transition: transform .3s ease`;
    sliderRef.current.style.cssText = cssText;
  };
  const handleNextPage = () => {
    if (isEndPage)
      return;
    const transform = sliderRef.current.style.transform;
    const { clientWidth } = sliderWrapperRef.current;
    const maxOffsetX = totalSizeRef.current * ITEM_WIDTH - clientWidth;
    const [, translateX = 0] = REG_TRANSFORMX.exec(transform) ?? [];
    let offsetX = Number(translateX) - pageSize * ITEM_WIDTH;
    if (offsetX <= -maxOffsetX) {
      offsetX = -maxOffsetX;
      setState({ isEndPage: true, isStartPage: false });
    } else {
      setState({ isEndPage: false, isStartPage: false });
    }
    const cssText = `transform: translateX(${offsetX}px); transition: transform .3s ease`;
    sliderRef.current.style.cssText = cssText;
  };
  const handleMirrorY = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX}, ${scaleY * -1}) rotateZ(${rotateZ}deg)`;
  };
  const handleMirrorX = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX * -1}, ${scaleY}) rotateZ(${rotateZ}deg)`;
  };
  const handleRotateLeft = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX}, ${scaleY}) rotateZ(${rotateZ - 90}deg)`;
  };
  const handleRotateRight = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX}, ${scaleY}) rotateZ(${rotateZ + 90}deg)`;
  };
  const handleScalePlus = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    imgRef.current.style.transform = `scale(${scaleX * 1.5}, ${scaleY * 1.5}) rotateZ(${rotateZ}deg)`;
  };
  const handleScaleMinus = () => {
    const { scaleX, scaleY, rotateZ } = getTransformProperties(imgRef.current);
    let computedScaleX = scaleX / 1.5;
    let computedScaleY = scaleY / 1.5;
    computedScaleX = computedScaleX <= 1 ? 1 : computedScaleX;
    computedScaleY = computedScaleY <= 1 ? 1 : computedScaleY;
    imgRef.current.style.transform = `scale(${computedScaleX}, ${computedScaleY}) rotateZ(${rotateZ}deg)`;
  };
  if (!open2 && !isMounted.current)
    return null;
  return /* @__PURE__ */ React__default.createElement(Modal$1, { open: open2 }, /* @__PURE__ */ React__default.createElement("div", { style: { width: "100%", height: "100%" } }, /* @__PURE__ */ React__default.createElement("div", { className: classes$2.head }, /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-swap-outline ${classes$2.operationIcon} ${classes$2.rotate90}`, onClick: handleMirrorY }), /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-swap-outline ${classes$2.operationIcon}`, onClick: handleMirrorX }), /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-rotate-left ${classes$2.operationIcon}`, onClick: handleRotateLeft }), /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-rotate-right ${classes$2.operationIcon}`, onClick: handleRotateRight }), /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-minus-circle ${classes$2.operationIcon}`, onClick: handleScaleMinus }), /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-plus-circle ${classes$2.operationIcon}`, onClick: handleScalePlus }), /* @__PURE__ */ React__default.createElement("i", { className: `qm-iconfont qm-icon-close ${classes$2.operationIcon}`, onClick: onClose })), /* @__PURE__ */ React__default.createElement("div", { className: classes$2.body }, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      onClick: handlePrevItem,
      className: `${classes$2.prevButton}${currentIndex === 0 ? " " + classes$2.disabled : ""}`
    },
    /* @__PURE__ */ React__default.createElement("i", { className: "qm-iconfont qm-icon-arrow-left-bold", style: { fontSize: 60 } })
  ), /* @__PURE__ */ React__default.createElement(Spin$1, { spinning }, /* @__PURE__ */ React__default.createElement("div", { className: classes$2.bodyContent }, /* @__PURE__ */ React__default.createElement(
    "img",
    {
      ref: imgRef,
      alt: "预览图片",
      src: imageURL,
      className: classes$2.previewImg,
      style: { transform: "scale(1, 1) rotateZ(0)" }
    }
  ))), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      onClick: handleNextItem,
      className: `${classes$2.nextButton}${currentIndex >= totalSizeRef.current - 1 ? " " + classes$2.disabled : ""}`
    },
    /* @__PURE__ */ React__default.createElement("i", { className: "qm-iconfont qm-icon-arrow-right-bold", style: { fontSize: 60 } })
  )), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: classes$2.foot,
      style: {
        width: (previewImgs == null ? void 0 : previewImgs.length) * ITEM_WIDTH + 68,
        maxWidth: pageSize * ITEM_WIDTH + 68
      }
    },
    /* @__PURE__ */ React__default.createElement("div", { className: `${classes$2.footPrevButton}${isStartPage ? " " + classes$2.disabled : ""}`, onClick: handlePrevPage }, /* @__PURE__ */ React__default.createElement("i", { className: "qm-iconfont qm-icon-arrow-left-bold", style: { fontSize: 30 } })),
    /* @__PURE__ */ React__default.createElement(
      "div",
      {
        onClick: handleNextPage,
        className: `${classes$2.footNextButton}${isEndPage ? " " + classes$2.disabled : ""}`
      },
      /* @__PURE__ */ React__default.createElement("i", { className: "qm-iconfont qm-icon-arrow-right-bold", style: { fontSize: 30 } })
    ),
    /* @__PURE__ */ React__default.createElement("div", { className: classes$2.footSlider, ref: sliderWrapperRef }, /* @__PURE__ */ React__default.createElement("ul", { className: classes$2.footSliderList, ref: sliderRef }, previewImgs.map(
      (url, index22) => /* @__PURE__ */ React__default.createElement(
        "li",
        {
          key: `${url}~${index22}`,
          onClick: () => handleChangeIndex(index22),
          className: `${classes$2.footSliderListItem}${currentIndex === index22 ? " " + classes$2.active : ""}`
        },
        /* @__PURE__ */ React__default.createElement(Img, { src: url, alt: "pic" })
      )
    )))
  )));
}
const PreviewImage$1 = memo(PreviewImage);
const wrapper$1 = "_wrapper_14fr8_1";
const loading$1 = "_loading_14fr8_12";
const progress_bar$1 = "_progress_bar_14fr8_19";
const progress$1 = "_progress_14fr8_19";
const file_picture$1 = "_file_picture_14fr8_32";
const filename$1 = "_filename_14fr8_38";
const preview$1 = "_preview_14fr8_46";
const preview_icon$1 = "_preview_icon_14fr8_62";
const preview_audio_box = "_preview_audio_box_14fr8_72";
const show$1 = "_show_14fr8_87";
const error$1 = "_error_14fr8_91";
const closeIcon$1 = "_closeIcon_14fr8_101";
const classes$1 = {
  wrapper: wrapper$1,
  loading: loading$1,
  progress_bar: progress_bar$1,
  progress: progress$1,
  file_picture: file_picture$1,
  filename: filename$1,
  preview: preview$1,
  preview_icon: preview_icon$1,
  preview_audio_box,
  show: show$1,
  error: error$1,
  closeIcon: closeIcon$1
};
function Audio(props) {
  const [showPreviewModal, setPreviewModal] = useState(false);
  const { width, height, style, file, onDelete, disabled: disabled2 } = props;
  const previewAudioRef = useRef();
  const isFirstDisplayPreviewModal = useRef(true);
  const audioSrc = useMemo(() => {
    if (file == null ? void 0 : file.url) {
      return file.url;
    } else {
      const url = file == null ? void 0 : file.originFileObj;
      return url ? window.URL.createObjectURL(url) : "";
    }
  }, [file]);
  const type = useMemo(() => {
    var _a, _b;
    const index2 = ((_b = (_a = file == null ? void 0 : file.name) == null ? void 0 : _a.lastIndexOf) == null ? void 0 : _b.call(_a, ".")) ?? -1;
    if (~index2)
      return `audio/${file.name.slice(index2 + 1)}`;
    return "";
  }, [file.name]);
  const wrapperStyle = useMemo(() => {
    const newStyle = { ...style };
    if (width)
      newStyle.width = width;
    if (height)
      newStyle.height = height;
    return newStyle;
  }, [width, height, style]);
  const handlePreviewAudio = useCallback(() => {
    isFirstDisplayPreviewModal.current = false;
    document.documentElement.style.overflow = "hidden";
    setPreviewModal(() => true);
  }, []);
  const handleClosePreviewAudio = useCallback(() => {
    var _a;
    document.documentElement.style.overflow = "";
    setPreviewModal(false);
    (_a = previewAudioRef.current) == null ? void 0 : _a.pause();
  }, []);
  const handleDeleteFile = useCallback(() => {
    onDelete == null ? void 0 : onDelete(file);
  }, [onDelete, file]);
  if (file.status === "uploading") {
    return /* @__PURE__ */ React__default.createElement("div", { style: wrapperStyle, className: classes$1.wrapper }, /* @__PURE__ */ React__default.createElement("div", { className: classes$1.loading }, "文件上传中"), /* @__PURE__ */ React__default.createElement("div", { className: classes$1.progress_bar }, /* @__PURE__ */ React__default.createElement("span", { className: classes$1.progress, style: { width: `${file.percent}%` } })));
  } else if (file.status === "error") {
    return /* @__PURE__ */ React__default.createElement(Tooltip, { title: "上传错误" }, /* @__PURE__ */ React__default.createElement("div", { style: wrapperStyle, className: `${classes$1.wrapper} ${classes$1.error}` }, /* @__PURE__ */ React__default.createElement("div", { className: classes$1.file_picture }, /* @__PURE__ */ React__default.createElement(PictureOutlined$1, null)), /* @__PURE__ */ React__default.createElement("div", { className: classes$1.filename }, file.name), /* @__PURE__ */ React__default.createElement("div", { className: classes$1.preview }, /* @__PURE__ */ React__default.createElement(DeleteOutlined$1, { className: classes$1.preview_icon, onClick: handleDeleteFile }))));
  }
  return /* @__PURE__ */ React__default.createElement("div", { style: wrapperStyle, className: classes$1.wrapper }, /* @__PURE__ */ React__default.createElement("div", { className: classes$1.file_picture }, /* @__PURE__ */ React__default.createElement(PlayCircleOutlined$1, { disabled: disabled2 })), /* @__PURE__ */ React__default.createElement("div", { className: classes$1.filename }, file.name), /* @__PURE__ */ React__default.createElement("div", { className: classes$1.preview }, /* @__PURE__ */ React__default.createElement(EyeOutlined$1, { className: classes$1.preview_icon, onClick: handlePreviewAudio }), disabled2 ? null : /* @__PURE__ */ React__default.createElement(DeleteOutlined$1, { className: classes$1.preview_icon, onClick: handleDeleteFile })), isFirstDisplayPreviewModal.current && !showPreviewModal ? null : /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: `${classes$1.preview_audio_box}${showPreviewModal ? " " + classes$1.show : ""}`,
      onClick: handleClosePreviewAudio
    },
    /* @__PURE__ */ React__default.createElement("audio", { controls: true, autoPlay: true, preload: "auto", ref: previewAudioRef }, /* @__PURE__ */ React__default.createElement("source", { type, src: audioSrc })),
    /* @__PURE__ */ React__default.createElement("span", { className: classes$1.closeIcon }, /* @__PURE__ */ React__default.createElement(CloseOutlined$1, null))
  )));
}
const Audio$1 = memo(Audio);
function UploadVideo$1(props) {
  const { action, headers, maxCount = 0, maxSize = 0, value, onChange, multiple = true, disabled: disabled2, accept = "audio/*" } = props;
  const [fileList, setFileList] = useState([]);
  const isInternalModifiedFileList = useRef(false);
  useEffect(() => {
    if (isInternalModifiedFileList.current)
      onChange == null ? void 0 : onChange(fileList);
  }, [fileList]);
  useEffect(() => {
    if (value === void 0) {
      return;
    } else if (isInternalModifiedFileList.current) {
      isInternalModifiedFileList.current = false;
      return;
    } else {
      setFileList(() => value);
    }
  }, [value]);
  useCallback((file) => {
    return Promise.resolve(window.URL.createObjectURL(file));
  }, []);
  const handleChangeFileList = useCallback(
    (field) => {
      const { file } = field;
      if (maxSize > 0 && file.size > maxSize * 1024 * 1024)
        return;
      function setStateAction(prevFileList) {
        var _a;
        let newFileList = [...prevFileList];
        if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (index2 >= 0)
            newFileList.splice(index2, 1, file);
          return prevFileList;
        } else if (file.status === "uploading") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (~index2) {
            newFileList.splice(index2, 1, file);
          } else {
            newFileList.push(file);
          }
        } else if (file.status === "error") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          newFileList.splice(index2, 1, file);
        } else if (file.status === "done") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (((_a = file == null ? void 0 : file.response) == null ? void 0 : _a.code) !== 0) {
            newFileList.splice(index2, 1, { uid: file.uid, name: file.name, status: "error" });
          } else {
            newFileList.splice(index2, 1, file);
          }
        } else if (file.status === "removed") {
          newFileList = prevFileList.filter((item) => item.uid !== file.uid);
        }
        return newFileList;
      }
      isInternalModifiedFileList.current = true;
      setFileList(setStateAction);
    },
    [fileList, maxSize, maxCount]
  );
  const handleBeforeUploadForFileList = useCallback(
    (file) => {
      if (maxSize === 0)
        return true;
      if (file.size > maxSize * 1024 * 1024) {
        message.warning(`上传图片大小不能超过${maxSize}M`);
        return false;
      } else {
        return true;
      }
    },
    [maxSize]
  );
  const handleDeleteFile = useCallback((file) => {
    isInternalModifiedFileList.current = true;
    setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid));
  }, []);
  const itemRender = useCallback((_, file) => {
    return /* @__PURE__ */ React__default.createElement(Audio$1, { width: 100, height: 100, file, onDelete: handleDeleteFile, disabled: disabled2 });
  }, [handleDeleteFile, disabled2]);
  return /* @__PURE__ */ React__default.createElement(
    Upload,
    {
      action,
      withCredentials: true,
      accept,
      headers,
      disabled: disabled2,
      multiple,
      maxCount,
      fileList,
      listType: "picture-card",
      itemRender,
      onChange: handleChangeFileList,
      beforeUpload: handleBeforeUploadForFileList
    },
    maxCount === 0 || (fileList == null ? void 0 : fileList.length) < maxCount ? /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(PlusOutlined$1, { disabled: disabled2 }), /* @__PURE__ */ React__default.createElement("div", { style: { marginTop: 8 } }, "上传")) : null
  );
}
const index$3 = memo(UploadVideo$1);
function UploadImage$1(props) {
  const {
    value,
    action,
    headers,
    onChange,
    disabled: disabled2,
    onPreview,
    maxSize = 0,
    accept = "*",
    maxCount = 0,
    multiple = true,
    uploadButtonText,
    listType = "text"
  } = props;
  const [fileList, setFileList] = useState([]);
  const isInternalModifiedFileList = useRef(false);
  useEffect(() => {
    if (isInternalModifiedFileList.current)
      onChange == null ? void 0 : onChange(fileList);
  }, [fileList]);
  useEffect(() => {
    if (value === void 0) {
      return;
    } else if (isInternalModifiedFileList.current) {
      isInternalModifiedFileList.current = false;
      return;
    } else {
      setFileList(() => value);
    }
  }, [value]);
  const handleChangeFileList = useCallback(
    (field) => {
      const { file } = field;
      if (maxSize > 0 && file.size > maxSize * 1024 * 1024)
        return;
      function setStateAction(prevFileList) {
        var _a;
        let newFileList = [...prevFileList];
        if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (index2 >= 0)
            newFileList.splice(index2, 1, file);
          return prevFileList;
        } else if (file.status === "uploading") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (~index2) {
            newFileList.splice(index2, 1, file);
          } else {
            newFileList.push(file);
          }
        } else if (file.status === "error") {
          const { uid, name, status } = file;
          const index2 = newFileList.findIndex((item) => item.uid === uid);
          newFileList.splice(index2, 1, { uid, name, status });
        } else if (file.status === "done") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (((_a = file == null ? void 0 : file.response) == null ? void 0 : _a.code) !== 0) {
            newFileList.splice(index2, 1, { uid: file.uid, name: file.name, status: "error" });
          } else {
            newFileList.splice(index2, 1, file);
          }
        } else if (file.status === "removed") {
          newFileList = prevFileList.filter((item) => item.uid !== file.uid);
        }
        return newFileList;
      }
      isInternalModifiedFileList.current = true;
      setFileList(setStateAction);
    },
    [fileList, maxSize, maxCount]
  );
  const handleBeforeUploadForFileList = useCallback(
    (file) => {
      if (maxSize === 0)
        return true;
      if (file.size > maxSize * 1024 * 1024) {
        message.warning(`上传图片大小不能超过${maxSize}M`);
        return false;
      } else {
        return true;
      }
    },
    [maxSize]
  );
  const renderUploadButton = useMemo(() => {
    return maxCount === 0 || (fileList == null ? void 0 : fileList.length) < maxCount ? listType === "text" || listType === "picture" ? /* @__PURE__ */ React__default.createElement(Button, { icon: /* @__PURE__ */ React__default.createElement(UploadOutlined$1, null), disabled: disabled2 }, uploadButtonText || "上传附件") : /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(PlusOutlined$1, null), /* @__PURE__ */ React__default.createElement("div", { style: { marginTop: 8 } }, uploadButtonText || "上传附件")) : null;
  }, [maxCount, fileList, disabled2, uploadButtonText, listType]);
  return /* @__PURE__ */ React__default.createElement(
    Upload,
    {
      accept,
      action,
      withCredentials: true,
      headers,
      disabled: disabled2,
      multiple,
      maxCount,
      fileList,
      listType,
      onPreview,
      onChange: handleChangeFileList,
      beforeUpload: handleBeforeUploadForFileList
    },
    renderUploadButton
  );
}
const index$2 = memo(UploadImage$1);
function UploadImage(props) {
  const { action, headers, maxCount = 0, maxSize = 0, value, onChange, multiple = true, disabled: disabled2, accept = "image/*", onPreview } = props;
  const [fileList, setFileList] = useState([]);
  const [previewImageInfo, updatePreviewImageInfo] = useState({
    open: false,
    index: 0,
    imgs: []
  });
  const isInternalModifiedFileList = useRef(false);
  useEffect(() => {
    if (isInternalModifiedFileList.current) {
      onChange == null ? void 0 : onChange(fileList);
    }
  }, [fileList]);
  useEffect(() => {
    if (value === void 0) {
      return;
    } else if (isInternalModifiedFileList.current) {
      isInternalModifiedFileList.current = false;
      return;
    } else {
      setFileList(() => value);
    }
  }, [value]);
  const handlePreview = useCallback(
    (file) => {
      updatePreviewImageInfo({
        open: true,
        index: fileList.findIndex((item) => item.uid === file.uid),
        imgs: fileList.map((item) => {
          if (item.url) {
            return item.url;
          } else {
            return window.URL.createObjectURL(item.originFileObj);
          }
        }).filter(Boolean)
      });
    },
    [fileList]
  );
  const handleClosePreviewImage = useCallback(() => {
    updatePreviewImageInfo({
      ...previewImageInfo,
      open: false
    });
  }, [previewImageInfo]);
  const handleChangeFileList = useCallback(
    (field) => {
      const { file } = field;
      if (maxSize > 0 && file.size > maxSize * 1024 * 1024)
        return;
      function setStateAction(prevFileList) {
        var _a;
        let newFileList = [...prevFileList];
        if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (index2 >= 0)
            newFileList.splice(index2, 1, file);
          return prevFileList;
        } else if (file.status === "uploading") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (~index2) {
            newFileList.splice(index2, 1, file);
          } else {
            newFileList.push(file);
          }
        } else if (file.status === "error") {
          const { uid, name, status } = file;
          const index2 = newFileList.findIndex((item) => item.uid === uid);
          newFileList.splice(index2, 1, { uid, name, status });
        } else if (file.status === "done") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (((_a = file == null ? void 0 : file.response) == null ? void 0 : _a.code) !== 0) {
            newFileList.splice(index2, 1, { uid: file.uid, name: file.name, status: "error" });
          } else {
            newFileList.splice(index2, 1, file);
          }
        } else if (file.status === "removed") {
          newFileList = prevFileList.filter((item) => item.uid !== file.uid);
        }
        return newFileList;
      }
      isInternalModifiedFileList.current = true;
      setFileList(setStateAction);
    },
    [fileList, maxSize, maxCount]
  );
  const handleBeforeUploadForFileList = useCallback(
    (file) => {
      if (maxSize === 0)
        return true;
      if (file.size > maxSize * 1024 * 1024) {
        message.warning(`上传图片大小不能超过${maxSize}M`);
        return false;
      } else {
        return true;
      }
    },
    [maxSize]
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    Upload,
    {
      action,
      withCredentials: true,
      accept,
      headers,
      disabled: disabled2,
      multiple,
      maxCount,
      fileList,
      listType: "picture-card",
      onChange: handleChangeFileList,
      onPreview: onPreview || handlePreview,
      beforeUpload: handleBeforeUploadForFileList
    },
    maxCount === 0 || (fileList == null ? void 0 : fileList.length) < maxCount ? /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(PlusOutlined$1, { disabled: disabled2 }), /* @__PURE__ */ React__default.createElement("div", { style: { marginTop: 8 } }, "上传")) : null
  ), /* @__PURE__ */ React__default.createElement(PreviewImage$1, { hasPerformance: true, onClose: handleClosePreviewImage, ...previewImageInfo }));
}
const index$1 = memo(UploadImage);
const wrapper = "_wrapper_uj5gy_1";
const error = "_error_uj5gy_12";
const loading = "_loading_uj5gy_16";
const progress_bar = "_progress_bar_uj5gy_23";
const progress = "_progress_uj5gy_23";
const file_picture = "_file_picture_uj5gy_36";
const filename = "_filename_uj5gy_42";
const video = "_video_uj5gy_50";
const preview_video = "_preview_video_uj5gy_55";
const preview = "_preview_uj5gy_55";
const preview_icon = "_preview_icon_uj5gy_76";
const preview_box = "_preview_box_uj5gy_86";
const show = "_show_uj5gy_101";
const closeIcon = "_closeIcon_uj5gy_105";
const classes = {
  wrapper,
  error,
  loading,
  progress_bar,
  progress,
  file_picture,
  filename,
  video,
  preview_video,
  preview,
  preview_icon,
  preview_box,
  show,
  closeIcon
};
function Video(props) {
  const [showPreviewModal, setPreviewModal] = useState(false);
  const { width, height, style, file, onDelete, disabled: disabled2 } = props;
  const videoRef = useRef();
  const previewVideoRef = useRef();
  const isFirstDisplayPreviewModal = useRef(true);
  const previewVideoStyle = useRef({});
  const videoSrc = useMemo(() => {
    if (file == null ? void 0 : file.url) {
      return file.url;
    } else {
      const url = file == null ? void 0 : file.originFileObj;
      return url ? window.URL.createObjectURL(url) : "";
    }
  }, [file]);
  const type = useMemo(() => {
    var _a, _b;
    const index2 = ((_b = (_a = file == null ? void 0 : file.name) == null ? void 0 : _a.lastIndexOf) == null ? void 0 : _b.call(_a, ".")) ?? -1;
    if (~index2)
      return `video/${file.name.slice(index2 + 1)}`;
    return "";
  }, [file == null ? void 0 : file.name]);
  const wrapperStyle = useMemo(() => {
    const newStyle = { ...style };
    if (width)
      newStyle.width = width;
    if (height)
      newStyle.height = height;
    return newStyle;
  }, [width, height, style]);
  const handleVideoCanPlay = () => {
    const { videoWidth, videoHeight } = videoRef.current;
    let width2 = videoWidth;
    let height2 = videoHeight;
    if (videoHeight > 800) {
      width2 = videoWidth / videoHeight * 800;
      height2 = 800;
    }
    previewVideoStyle.current = { width: width2, height: height2 };
  };
  const handlePreviewVideo = useCallback(() => {
    isFirstDisplayPreviewModal.current = false;
    document.documentElement.style.overflow = "hidden";
    setPreviewModal(() => true);
  }, []);
  const handleClosePreviewVideo = useCallback(() => {
    var _a;
    document.documentElement.style.overflow = "";
    setPreviewModal(false);
    (_a = previewVideoRef.current) == null ? void 0 : _a.pause();
  }, []);
  const handleDeleteFile = useCallback(() => {
    onDelete == null ? void 0 : onDelete(file);
  }, [onDelete, file]);
  if (file.status === "uploading") {
    return /* @__PURE__ */ React__default.createElement("div", { style: wrapperStyle, className: classes.wrapper }, /* @__PURE__ */ React__default.createElement("div", { className: classes.loading }, "文件上传中"), /* @__PURE__ */ React__default.createElement("div", { className: classes.progress_bar }, /* @__PURE__ */ React__default.createElement("span", { className: classes.progress, style: { width: `${file.percent}%` } })));
  } else if (file.status === "error") {
    return /* @__PURE__ */ React__default.createElement(Tooltip, { title: "上传错误" }, /* @__PURE__ */ React__default.createElement("div", { style: wrapperStyle, className: `${classes.wrapper} ${classes.error}` }, /* @__PURE__ */ React__default.createElement("div", { className: classes.file_picture }, /* @__PURE__ */ React__default.createElement(PictureOutlined$1, null)), /* @__PURE__ */ React__default.createElement("div", { className: classes.filename }, file.name), /* @__PURE__ */ React__default.createElement("div", { className: classes.preview }, /* @__PURE__ */ React__default.createElement(DeleteOutlined$1, { className: classes.preview_icon, onClick: handleDeleteFile }))));
  }
  return /* @__PURE__ */ React__default.createElement("div", { style: wrapperStyle, className: classes.wrapper }, /* @__PURE__ */ React__default.createElement("video", { muted: true, preload: "auto", ref: videoRef, className: classes.video, onCanPlay: handleVideoCanPlay }, /* @__PURE__ */ React__default.createElement("source", { type, src: videoSrc })), /* @__PURE__ */ React__default.createElement("div", { className: classes.preview }, /* @__PURE__ */ React__default.createElement(EyeOutlined$1, { className: classes.preview_icon, onClick: handlePreviewVideo }), disabled2 ? null : /* @__PURE__ */ React__default.createElement(DeleteOutlined$1, { className: classes.preview_icon, onClick: handleDeleteFile })), isFirstDisplayPreviewModal.current && !showPreviewModal ? null : /* @__PURE__ */ React__default.createElement(Portal, null, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: `${classes.preview_box}${showPreviewModal ? " " + classes.show : ""}`,
      onClick: handleClosePreviewVideo
    },
    /* @__PURE__ */ React__default.createElement(
      "video",
      {
        muted: true,
        controls: true,
        autoPlay: true,
        preload: "auto",
        ref: previewVideoRef,
        className: classes.preview_video,
        style: previewVideoStyle.current
      },
      /* @__PURE__ */ React__default.createElement("source", { type, src: videoSrc })
    ),
    /* @__PURE__ */ React__default.createElement("span", { className: classes.closeIcon }, /* @__PURE__ */ React__default.createElement(CloseOutlined$1, null))
  )));
}
const Video$1 = memo(Video);
function UploadVideo(props) {
  const { action, headers, maxCount = 0, maxSize = 0, value, onChange, multiple = true, disabled: disabled2, accept = "video/*" } = props;
  const [fileList, setFileList] = useState([]);
  const isInternalModifiedFileList = useRef(false);
  useEffect(() => {
    if (isInternalModifiedFileList.current)
      onChange == null ? void 0 : onChange(fileList);
  }, [fileList]);
  useEffect(() => {
    if (value === void 0) {
      return;
    } else if (isInternalModifiedFileList.current) {
      isInternalModifiedFileList.current = false;
      return;
    } else {
      setFileList(() => value);
    }
  }, [value]);
  const handlePreview = useCallback((file) => {
    return Promise.resolve(window.URL.createObjectURL(file));
  }, []);
  const handleChangeFileList = useCallback(
    (field) => {
      const { file } = field;
      if (maxSize > 0 && file.size > maxSize * 1024 * 1024)
        return;
      function setStateAction(prevFileList) {
        var _a;
        let newFileList = [...prevFileList];
        if (maxCount > 0 && newFileList.length >= maxCount && file.percent === 0) {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (index2 >= 0)
            newFileList.splice(index2, 1, file);
          return prevFileList;
        } else if (file.status === "uploading") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (~index2) {
            newFileList.splice(index2, 1, file);
          } else {
            newFileList.push(file);
          }
        } else if (file.status === "error") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          newFileList.splice(index2, 1, file);
        } else if (file.status === "done") {
          const index2 = newFileList.findIndex((item) => item.uid === file.uid);
          if (((_a = file == null ? void 0 : file.response) == null ? void 0 : _a.code) !== 0) {
            newFileList.splice(index2, 1, { uid: file.uid, name: file.name, status: "error" });
          } else {
            newFileList.splice(index2, 1, file);
          }
        } else if (file.status === "removed") {
          newFileList = prevFileList.filter((item) => item.uid !== file.uid);
        }
        return newFileList;
      }
      isInternalModifiedFileList.current = true;
      setFileList(setStateAction);
    },
    [fileList, maxSize, maxCount]
  );
  const handleBeforeUploadForFileList = useCallback(
    (file) => {
      if (maxSize === 0)
        return true;
      if (file.size > maxSize * 1024 * 1024) {
        message.warning(`上传图片大小不能超过${maxSize}M`);
        return false;
      } else {
        return true;
      }
    },
    [maxSize]
  );
  const handleDeleteFile = useCallback((file) => {
    isInternalModifiedFileList.current = true;
    setFileList((prevFileList) => prevFileList.filter((item) => item.uid !== file.uid));
  }, []);
  const itemRender = useCallback((_, file) => {
    return /* @__PURE__ */ React__default.createElement(Video$1, { width: 100, height: 100, file, onDelete: handleDeleteFile, disabled: disabled2 });
  }, [handleDeleteFile, disabled2]);
  return /* @__PURE__ */ React__default.createElement(
    Upload,
    {
      action,
      withCredentials: true,
      accept,
      headers,
      disabled: disabled2,
      multiple,
      maxCount,
      fileList,
      listType: "picture-card",
      itemRender,
      previewFile: handlePreview,
      onChange: handleChangeFileList,
      beforeUpload: handleBeforeUploadForFileList
    },
    maxCount === 0 || (fileList == null ? void 0 : fileList.length) < maxCount ? /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(PlusOutlined$1, { disabled: disabled2 }), /* @__PURE__ */ React__default.createElement("div", { style: { marginTop: 8 } }, "上传")) : null
  );
}
const index = memo(UploadVideo);
export {
  ContentFormHead$1 as ContentFormHead,
  index$6 as ContentFormPage,
  index$4 as ModelTree,
  PreviewImage$1 as PreviewImage,
  index$3 as UploadAudio,
  index$2 as UploadFile,
  index$1 as UploadImage,
  index as UploadVideo
};
