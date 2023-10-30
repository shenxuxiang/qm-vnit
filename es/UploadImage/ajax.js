import 'core-js/modules/es.array.push.js';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.number.to-fixed.js';
import 'core-js/modules/es.object.keys.js';
import 'core-js/modules/es.error.cause.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultOptions = {
  timeout: 60000,
  withCredentials: true
};
var Ajax = /*#__PURE__*/function () {
  function Ajax() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Ajax);
    this.opts = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.headers = {};
    if (typeof this.opts.headers === 'function') {
      var headers = this.opts.headers();
      var keys = _Object$keys(headers);
      keys.forEach(function (key) {
        return _this.headers[key] = headers[key];
      });
    }
  }
  _createClass(Ajax, [{
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
      var keys = _Object$keys(this.headers);
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
          console.log(xhr.response);
          (_this2$handleError = _this2.handleError) === null || _this2$handleError === void 0 ? void 0 : _this2$handleError.call(_this2, {
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
  return Ajax;
}();

export { Ajax as default };
