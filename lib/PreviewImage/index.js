"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PreviewImage = _interopRequireDefault(require("./PreviewImage.js"));
var _SuperPreviewImage = _interopRequireDefault(require("./SuperPreviewImage.js"));
var PreviewImage = _PreviewImage.default;
exports.default = PreviewImage;
PreviewImage.SuperPreviewImage = _SuperPreviewImage.default;