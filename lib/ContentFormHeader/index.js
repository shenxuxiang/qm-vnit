"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _button = _interopRequireDefault(require("antd/lib/button"));
var _row = _interopRequireDefault(require("antd/lib/row"));
var _col = _interopRequireDefault(require("antd/lib/col"));
var _cascader = _interopRequireDefault(require("antd/lib/cascader"));
var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));
var _input = _interopRequireDefault(require("antd/lib/input"));
var _select = _interopRequireDefault(require("antd/lib/select"));
var _form = _interopRequireDefault(require("antd/lib/form"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.regexp.to-string.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
var _react = _interopRequireWildcard(require("react"));
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var _index = require("../utils/index.js");
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor2(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) {
  var keys = (0, _keys.default)(object);
  if (_getOwnPropertySymbols.default) {
    var symbols = (0, _getOwnPropertySymbols.default)(object);
    enumerableOnly && (symbols = (0, _filter.default)(symbols).call(symbols, function (sym) {
      return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(target, (0, _getOwnPropertyDescriptors.default)(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, (0, _getOwnPropertyDescriptor.default)(source, key));
    });
  }
  return target;
}
var useForm = _form.default.useForm,
  FormItem = _form.default.Item;
var SelectOption = _select.default.Option;
var colSpanConfig = {
  xxl: 6,
  xl: 8,
  lg: 8,
  md: 12,
  sm: 12,
  xs: 12
};
function ContentFormHeader(props) {
  var onReset = props.onReset,
    onSubmit = props.onSubmit,
    onExport = props.onExport,
    queryList = props.queryList,
    extraNodes = props.extraNodes,
    initialValues = props.initialValues,
    propCols = props.cols,
    showExportButton = props.showExportButton,
    _props$defaultExpand = props.defaultExpand,
    defaultExpand = _props$defaultExpand === void 0 ? true : _props$defaultExpand,
    _props$showResetButto = props.showResetButton,
    showResetButton = _props$showResetButto === void 0 ? true : _props$showResetButto,
    _props$submitButtonTe = props.submitButtonText,
    submitButtonText = _props$submitButtonTe === void 0 ? '查询' : _props$submitButtonTe;
  var _useForm = useForm(),
    _useForm2 = (0, _slicedToArray2.default)(_useForm, 1),
    form = _useForm2[0];
  var _useState = (0, _react.useState)(6),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    colSpan = _useState2[0],
    setColSpan = _useState2[1];
  var _useState3 = (0, _react.useState)(defaultExpand),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    expand = _useState4[0],
    setExpand = _useState4[1];
  var _useState5 = (0, _react.useState)(function () {
      var _context;
      return 'qm-vnit-form-' + (0, _slice.default)(_context = Math.random().toString(32)).call(_context, 2);
    }),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 1),
    formName = _useState6[0];
  var xRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    function resize() {
      var colSpan = propCols ? 24 / propCols : computeColSpan(xRef.current);
      setColSpan(function () {
        return colSpan;
      });
      if (expand) {
        var cols = 24 / colSpan;
        // 计算表单查询项一共是多少列。
        var length = (0, _filter.default)(queryList).call(queryList, function (item) {
          return item.component || item.formType;
        }).length;
        //  length + 1 是因为 【查询、重置、导出】这些功能按钮需要占一列。
        var rows = Math.ceil((length + 1) / cols);
        containerRef.current.style.height = expand ? "".concat(rows * 64, "px") : '64px';
      } else {
        containerRef.current.style.height = '64px';
      }
    }
    resize();
    if (propCols) return;
    // 如果没有设置 props.cols，则组件会根据 pagesize 事件自动计算
    var hanleResize = (0, _index.throttle)(resize, 200);
    window.addEventListener('resize', hanleResize, false);
    return function () {
      window.removeEventListener('resize', hanleResize, false);
    };
  }, [queryList, expand, propCols]);
  // 计算【展开项】所在的 Col 组件的 offsetSpan 数
  var offsetSpan = (0, _react.useMemo)(function () {
    // 一行可以盛放几个 Col 组件
    var cols = 24 / colSpan;
    var length = queryList.length;
    if (length < cols) return (cols - length - 1) * colSpan;
    // 取模，表示最后一行会有几个 Col 组件
    var reset = length % cols;
    // 注意 cols - 1 是因为 【展开项】自身要占一列
    var offset = (cols - 1 - reset) * colSpan;
    return expand ? offset : 0;
  }, [queryList, colSpan, expand]);
  var renderFormContent = (0, _react.useMemo)(function () {
    var cols = 24 / colSpan;
    var context = [];
    var _loop = function _loop() {
      var _queryList$i = queryList[i],
        watch = _queryList$i.watch,
        title = _queryList$i.title,
        options = _queryList$i.options,
        formType = _queryList$i.formType,
        dataIndex = _queryList$i.dataIndex,
        component = _queryList$i.component,
        properties = _queryList$i.properties,
        placeholder = _queryList$i.placeholder,
        _queryList$i$name = _queryList$i.name,
        name = _queryList$i$name === void 0 ? dataIndex : _queryList$i$name,
        _queryList$i$keyNameF = _queryList$i.keyNameForKey,
        keyNameForKey = _queryList$i$keyNameF === void 0 ? 'label' : _queryList$i$keyNameF,
        _queryList$i$keyNameF2 = _queryList$i.keyNameForValue,
        keyNameForValue = _queryList$i$keyNameF2 === void 0 ? 'value' : _queryList$i$keyNameF2;
      var contextItem = null;
      // 表单项事件
      var handleWatch = typeof watch === 'function' ? function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return watch.apply(void 0, (0, _concat.default)(args).call(args, [form]));
      } : undefined;
      // 如果条件满足，则不渲染该项
      if (!component && !formType) return "continue";
      if (component) {
        contextItem = /*#__PURE__*/_react.default.cloneElement(component, _objectSpread({
          onChange: handleWatch
        }, properties));
      } else {
        switch (formType) {
          case 'input':
            contextItem = /*#__PURE__*/_react.default.createElement(_input.default, _objectSpread(_objectSpread({
              allowClear: true
            }, properties), {}, {
              autoComplete: "off",
              onChange: handleWatch,
              placeholder: placeholder || "\u8BF7\u8F93\u5165\u8981\u67E5\u8BE2\u7684".concat(title)
            }));
            break;
          case 'select':
            contextItem = /*#__PURE__*/_react.default.createElement(_select.default, _objectSpread(_objectSpread({
              allowClear: true
            }, properties), {}, {
              onChange: handleWatch,
              placeholder: placeholder || "\u8BF7\u9009\u62E9\u60A8\u8981\u67E5\u8BE2\u7684".concat(title)
            }), options === null || options === void 0 ? void 0 : (0, _map.default)(options).call(options, function (item) {
              return /*#__PURE__*/_react.default.createElement(SelectOption, {
                key: item[keyNameForKey],
                value: item[keyNameForValue]
              }, item[keyNameForKey]);
            }));
            break;
          case 'rangePicker':
            contextItem = /*#__PURE__*/_react.default.createElement(_datePicker.default.RangePicker, _objectSpread(_objectSpread({}, properties), {}, {
              onChange: handleWatch,
              placeholder: placeholder
            }));
            break;
          case 'datePicker':
            contextItem = /*#__PURE__*/_react.default.createElement(_datePicker.default, _objectSpread(_objectSpread({}, properties), {}, {
              onChange: handleWatch,
              placeholder: placeholder
            }));
            break;
          case 'cascader':
            contextItem = /*#__PURE__*/_react.default.createElement(_cascader.default, _objectSpread(_objectSpread({
              changeOnSelect: true
            }, properties), {}, {
              options: options,
              onChange: handleWatch,
              placeholder: placeholder || "\u8BF7\u9009\u62E9\u60A8\u8981\u67E5\u8BE2\u7684".concat(title)
            }));
            break;
        }
      }
      context.push( /*#__PURE__*/_react.default.createElement(_col.default, {
        key: name,
        span: colSpan,
        style: {
          display: i > cols - 2 && !expand ? 'none' : ''
        }
      }, /*#__PURE__*/_react.default.createElement(FormItem, {
        label: title,
        name: name
      }, contextItem)));
    };
    for (var i = 0; i < queryList.length; i++) {
      var _ret = _loop();
      if (_ret === "continue") continue;
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);
  var handleFinish = (0, _react.useCallback)(function (values) {
    var query = formatFormModel(queryList, values);
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(query);
  }, [onSubmit, queryList]);
  var handleReset = (0, _react.useCallback)(function () {
    var query = formatFormModel(queryList, initialValues);
    onReset === null || onReset === void 0 ? void 0 : onReset(query);
  }, [queryList]);
  var handleExport = (0, _react.useCallback)(function () {
    var query = formatFormModel(queryList, form.getFieldsValue());
    onExport === null || onExport === void 0 ? void 0 : onExport(query);
  }, [onExport, queryList]);
  // 展开/收起
  var handleChangeExpand = (0, _react.useCallback)(function () {
    var newNewExpand = !expand;
    setExpand(newNewExpand);
    if (newNewExpand) {
      var cols = 24 / colSpan;
      var rows = Math.ceil((renderFormContent.length + 1) / cols);
      containerRef.current.style.height = newNewExpand ? "".concat(rows * 64, "px") : '64px';
    } else {
      containerRef.current.style.height = '64px';
    }
  }, [expand, colSpan, renderFormContent.length]);
  return /*#__PURE__*/_react.default.createElement("section", {
    className: "qm-content-form-head",
    ref: xRef
  }, /*#__PURE__*/_react.default.createElement(_form.default, {
    form: form,
    name: formName,
    onReset: handleReset,
    onFinish: handleFinish,
    initialValues: initialValues
  }, /*#__PURE__*/_react.default.createElement(_row.default, {
    className: "qm-content-form-head-row",
    ref: containerRef
  }, renderFormContent, /*#__PURE__*/_react.default.createElement(_col.default, {
    span: colSpan,
    offset: offsetSpan,
    className: "qm-content-form-head-button-group"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "primary",
    htmlType: "submit"
  }, submitButtonText), showResetButton && /*#__PURE__*/_react.default.createElement(_button.default, {
    htmlType: "reset",
    style: {
      marginLeft: '8px'
    }
  }, "\u91CD\u7F6E"), showExportButton && /*#__PURE__*/_react.default.createElement(_button.default, {
    style: {
      marginLeft: '8px'
    },
    onClick: handleExport
  }, "\u5BFC\u51FA"), extraNodes ? extraNodes : null, queryList.length >= 24 / colSpan && /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "link",
    onClick: handleChangeExpand
  }, expand ? '收起' : '展开', /*#__PURE__*/_react.default.createElement(_DownOutlined.default, {
    className: "icon".concat(expand ? ' expand' : '')
  }))))));
}
var ContentFormHead = /*#__PURE__*/(0, _react.memo)(ContentFormHeader);
// 格式化表单数据
exports.default = ContentFormHead;
function formatFormModel(queryList) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = {};
  queryList.forEach(function (item) {
    var dataIndex = item.dataIndex,
      _item$name = item.name,
      name = _item$name === void 0 ? dataIndex : _item$name,
      dataFormat = item.dataFormat;
    var value = data[name];
    // eslint-disable-next-line
    if (value == null) return;
    if (typeof dataFormat === 'function') {
      (0, _assign.default)(query, dataFormat(value));
    } else {
      query[name] = value;
    }
  });
  return query;
}
// 计算 <Row /> 容器下面一个 <Col/> 组件将设置多少 span
function computeColSpan(element) {
  var width = element.offsetWidth;
  if (width >= 1600) return colSpanConfig.xxl;
  if (width >= 1200) return colSpanConfig.xl;
  if (width >= 992) return colSpanConfig.lg;
  if (width >= 768) return colSpanConfig.md;
  return colSpanConfig.sm;
}