"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var IntersectionImage = /*#__PURE__*/function () {
  function IntersectionImage() {
    var _this = this;
    (0, _classCallCheck2.default)(this, IntersectionImage);
    (0, _defineProperty2.default)(this, "observerCallback", function (enters) {
      var length = enters.length;
      for (var i = 0; i < length; i++) {
        var _enters$i = enters[i],
          target = _enters$i.target,
          intersectionRatio = _enters$i.intersectionRatio;
        if (intersectionRatio > 0) {
          _this.unobserveImage(target);
          preloadImage(target);
        }
      }
    });
    (0, _defineProperty2.default)(this, "observeImage", function (element) {
      if (Array.isArray(element)) {
        element.forEach(function (item) {
          return item && _this.intersection.observe(item);
        });
      } else {
        element && _this.intersection.observe(element);
      }
    });
    (0, _defineProperty2.default)(this, "unobserveImage", function (element) {
      if (Array.isArray(element)) {
        element.forEach(function (item) {
          return item && _this.intersection.unobserve(item);
        });
      } else {
        element && _this.intersection.unobserve(element);
      }
    });
    this.intersection = new IntersectionObserver(this.observerCallback);
  }
  (0, _createClass2.default)(IntersectionImage, [{
    key: "destroy",
    value: function destroy() {
      this.intersection.disconnect();
    }
  }]);
  return IntersectionImage;
}();
var intersectionImage = new IntersectionImage();
exports.default = intersectionImage;
function preloadImage(element) {
  var src = element.getAttribute('data-src');
  var img = new Image();
  img.src = src;
  img.onload = function () {
    element.src = src;
  };
}