"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
function ownKeys(e, r) {
  var t = (0, _keys.default)(e);
  if (_getOwnPropertySymbols.default) {
    var o = (0, _getOwnPropertySymbols.default)(e);
    r && (o = (0, _filter.default)(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor.default)(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty2.default)(e, r, t[r]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(e, (0, _getOwnPropertyDescriptors.default)(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, (0, _getOwnPropertyDescriptor.default)(t, r));
    });
  }
  return e;
}
var defaultOptions = {
  timeout: 60000,
  withCredentials: true
};
var Ajax = exports.default = /*#__PURE__*/function () {
  function Ajax() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Ajax);
    this.opts = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.headers = {};
    if (typeof this.opts.headers === 'function') {
      var headers = this.opts.headers();
      var keys = (0, _keys.default)(headers);
      keys.forEach(function (key) {
        return _this.headers[key] = headers[key];
      });
    }
  }
  return (0, _createClass2.default)(Ajax, [{
    key: "onProgress",
    value: function onProgress(callback) {
      this.handleProgress = callback;
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(callback) {
      this.handleSuccess = callback;
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      this.handleError = callback;
    }
  }, {
    key: "create",
    value: function create(url, method, query) {
      var _this2 = this;
      var xhr = new XMLHttpRequest();
      xhr.timeout = this.opts.timeout;
      xhr.withCredentials = this.opts.withCredentials;
      xhr.open(method, url);
      var keys = (0, _keys.default)(this.headers);
      keys.forEach(function (key) {
        return xhr.setRequestHeader(key, _this2.headers[key]);
      });
      this.handleProgress && xhr.upload.addEventListener('progress', function (event) {
        var lengthComputable = event.lengthComputable,
          loaded = event.loaded,
          total = event.total;
        if (lengthComputable) {
          _this2.handleProgress(Number((loaded / total).toFixed(2)));
        }
      });
      this.handleSuccess && xhr.addEventListener('load', function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          _this2.handleSuccess(JSON.parse(xhr.response));
        } else {
          var _this2$handleError;
          (_this2$handleError = _this2.handleError) === null || _this2$handleError === void 0 || _this2$handleError.call(_this2, {
            response: xhr.response,
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      });
      this.handleError && xhr.addEventListener('error', function () {
        _this2.handleError({
          status: xhr.status,
          statusText: xhr.statusText,
          response: JSON.parse(xhr.response)
        });
      });
      this.handleError && xhr.addEventListener('timeout', function () {
        _this2.handleError(new Error('请求超时！'));
      });
      xhr.send(query);
      return xhr;
    }
  }]);
}();