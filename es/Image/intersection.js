import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _WeakMap from '@babel/runtime-corejs3/core-js-stable/weak-map';

var IntersectionObserveImage = /*#__PURE__*/function () {
  function IntersectionObserveImage() {
    _classCallCheck(this, IntersectionObserveImage);
    _defineProperty(this, "nodeMap", new _WeakMap());
  }
  _createClass(IntersectionObserveImage, [{
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

export { intersectionImage as default };
