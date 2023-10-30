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
var _weakMap = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/weak-map"));
var IntersectionObserveImage = /*#__PURE__*/function () {
  function IntersectionObserveImage() {
    (0, _classCallCheck2.default)(this, IntersectionObserveImage);
    (0, _defineProperty2.default)(this, "nodeMap", new _weakMap.default());
  }
  (0, _createClass2.default)(IntersectionObserveImage, [{
    key: "intersectionCallback",
    value: function intersectionCallback(entries) {
      var _this = this;
      entries.forEach(function (item) {
        var target = item.target,
          intersectionRatio = item.intersectionRatio;
        if (intersectionRatio > 0) {
          if (_this.nodeMap.has(target)) {
            var imgURL = _this.nodeMap.get(target);
            target.src = imgURL;
            _this.removeElement(target);
          }
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.instance = new window.IntersectionObserver(this.intersectionCallback.bind(this));
    }
  }, {
    key: "addElement",
    value: function addElement(node, src) {
      if (!this.instance) this.init();
      this.instance.observe(node);
      this.nodeMap.set(node, src);
    }
  }, {
    key: "removeElement",
    value: function removeElement(node) {
      this.instance.unobserve(node);
      this.nodeMap.delete(node);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.instance.disconnect();
    }
  }]);
  return IntersectionObserveImage;
}();
var intersectionImage = new IntersectionObserveImage();
exports.default = intersectionImage;