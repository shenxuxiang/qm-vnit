import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';

var IntersectionImage = /*#__PURE__*/function () {
  function IntersectionImage() {
    var _this = this;
    _classCallCheck(this, IntersectionImage);
    _defineProperty(this, "observerCallback", function (enters) {
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
    _defineProperty(this, "observeImage", function (element) {
      if (Array.isArray(element)) {
        element.forEach(function (item) {
          return item && _this.intersection.observe(item);
        });
      } else {
        element && _this.intersection.observe(element);
      }
    });
    _defineProperty(this, "unobserveImage", function (element) {
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
  _createClass(IntersectionImage, [{
    key: "destroy",
    value: function destroy() {
      this.intersection.disconnect();
    }
  }]);
  return IntersectionImage;
}();
var intersectionImage = new IntersectionImage();
function preloadImage(element) {
  var src = element.getAttribute('data-src');
  var img = new Image();
  img.src = src;
  img.onload = function () {
    element.src = src;
  };
}

export { intersectionImage as default };
