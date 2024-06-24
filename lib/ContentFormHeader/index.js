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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
var _react = _interopRequireWildcard(require("react"));
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var _index = require("../utils/index.js");
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor2(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
function ContentFormHeader(props, ref) {
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
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    loadingReset = _useState2[0],
    updateLoadingReset = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    loadingSubmit = _useState4[0],
    updateLoadingSubmit = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    loadingExport = _useState6[0],
    updateLoadingExport = _useState6[1];
  var _useForm = useForm(),
    _useForm2 = (0, _slicedToArray2.default)(_useForm, 1),
    form = _useForm2[0];
  var _useState7 = (0, _react.useState)(6),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    colSpan = _useState8[0],
    setColSpan = _useState8[1];
  var _useState9 = (0, _react.useState)(defaultExpand),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    expand = _useState10[0],
    setExpand = _useState10[1];
  var _useState11 = (0, _react.useState)(function () {
      var _context;
      return 'qm-vnit-form-' + (0, _slice.default)(_context = Math.random().toString(32)).call(_context, 2);
    }),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 1),
    formName = _useState12[0];
  var xRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  // 它是 expand 的 ref 形式（与 expand 保持同步），他将在第二个 useEffect hooks 中发挥作用；
  var expandRef = (0, _react.useRef)(defaultExpand);
  // 查询表单项的长度
  var queryFormItemLength = (0, _react.useRef)(queryList.length);
  (0, _react.useEffect)(function () {
    function resize() {
      var colSpan = propCols ? 24 / propCols : computeColSpan(xRef.current);
      setColSpan(function () {
        return colSpan;
      });
      if (expandRef.current) {
        var cols = 24 / colSpan;
        var length = queryFormItemLength.current;
        //  length + 1 是因为 【查询、重置、导出】这些功能按钮需要占一列。
        var rows = Math.ceil((length + 1) / cols);
        containerRef.current.style.height = expandRef.current ? "".concat(rows * 64, "px") : '64px';
      } else {
        containerRef.current.style.height = '64px';
      }
    }
    resize();
    if (propCols) return;
    // 如果没有设置 props.cols，则组件会根据 window resize 事件自动计算
    var hanleResize = (0, _index.throttle)(resize, 200);
    window.addEventListener('resize', hanleResize, false);
    return function () {
      window.removeEventListener('resize', hanleResize, false);
    };
  }, [propCols]);
  // 计算【展开项】所在的 Col 组件的 offsetSpan 数
  var offsetSpan = (0, _react.useMemo)(function () {
    // 一行可以盛放几个 Col 组件
    var cols = 24 / colSpan;
    var length = queryFormItemLength.current;
    if (length < cols) return (cols - length - 1) * colSpan;
    // 取模，表示最后一行会有几个 Col 组件
    var mode = length % cols;
    // 注意 cols - 1 是因为 【展开项】自身要占一列
    var offset = (cols - 1 - mode) * colSpan;
    return expand ? offset : 0;
  }, [colSpan, expand]);
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
      if (!component && !formType) return 1; // continue
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
      if (_loop()) continue;
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);
  var handleFinish = (0, _react.useCallback)(function (values) {
    updateLoadingSubmit(function () {
      return true;
    });
    var query = formatFormModel(queryList, values);
    onSubmit === null || onSubmit === void 0 || onSubmit(query).finally(function () {
      return updateLoadingSubmit(function () {
        return false;
      });
    });
  }, [onSubmit, queryList]);
  var handleReset = (0, _react.useCallback)(function () {
    updateLoadingReset(function () {
      return true;
    });
    var query = formatFormModel(queryList, initialValues);
    onReset === null || onReset === void 0 || onReset(query).finally(function () {
      return updateLoadingReset(function () {
        return false;
      });
    });
  }, [queryList]);
  var handleExport = (0, _react.useCallback)(function () {
    updateLoadingExport(function () {
      return true;
    });
    var query = formatFormModel(queryList, form.getFieldsValue());
    onExport === null || onExport === void 0 || onExport(query).finally(function () {
      return updateLoadingExport(function () {
        return false;
      });
    });
  }, [onExport, queryList]);
  // 展开/收起
  var handleChangeExpand = (0, _react.useCallback)(function () {
    var newNewExpand = !expand;
    expandRef.current = newNewExpand;
    setExpand(newNewExpand);
    if (newNewExpand) {
      var cols = 24 / colSpan;
      var rows = Math.ceil((queryFormItemLength.current + 1) / cols);
      containerRef.current.style.height = newNewExpand ? "".concat(rows * 64, "px") : '64px';
    } else {
      containerRef.current.style.height = '64px';
    }
  }, [expand, colSpan]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      form: form,
      getCurrentFormData: function getCurrentFormData() {
        return formatFormModel(queryList, form.getFieldsValue());
      }
    };
  }, [queryList]);
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
    htmlType: "submit",
    loading: loadingSubmit
  }, submitButtonText), showResetButton && ( /*#__PURE__*/_react.default.createElement(_button.default, {
    htmlType: "reset",
    style: {
      marginLeft: '8px'
    },
    loading: loadingReset
  }, "\u91CD\u7F6E")), showExportButton && ( /*#__PURE__*/_react.default.createElement(_button.default, {
    style: {
      marginLeft: '8px'
    },
    onClick: handleExport,
    loading: loadingExport
  }, "\u5BFC\u51FA")), extraNodes ? extraNodes : null, queryList.length >= 24 / colSpan && ( /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "link",
    onClick: handleChangeExpand
  }, expand ? '收起' : '展开', /*#__PURE__*/_react.default.createElement(_DownOutlined.default, {
    className: "qm-expand-icon".concat(expand ? ' expand' : '')
  })))))));
}
var ContentFormHead = exports.default = /*#__PURE__*/(0, _react.forwardRef)(ContentFormHeader);
// 格式化表单数据
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