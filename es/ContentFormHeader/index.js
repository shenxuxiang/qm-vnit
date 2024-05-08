import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.promise.finally.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import React, { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Form, Select, Row, Col, Button, Cascader, DatePicker, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { throttle } from '../utils/index.js';
import './index.css';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var useForm = Form.useForm,
  FormItem = Form.Item;
var SelectOption = Select.Option;
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
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loadingReset = _useState2[0],
    updateLoadingReset = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loadingSubmit = _useState4[0],
    updateLoadingSubmit = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loadingExport = _useState6[0],
    updateLoadingExport = _useState6[1];
  var _useForm = useForm(),
    _useForm2 = _slicedToArray(_useForm, 1),
    form = _useForm2[0];
  var _useState7 = useState(6),
    _useState8 = _slicedToArray(_useState7, 2),
    colSpan = _useState8[0],
    setColSpan = _useState8[1];
  var _useState9 = useState(defaultExpand),
    _useState10 = _slicedToArray(_useState9, 2),
    expand = _useState10[0],
    setExpand = _useState10[1];
  var _useState11 = useState(function () {
      var _context;
      return 'qm-vnit-form-' + _sliceInstanceProperty(_context = Math.random().toString(32)).call(_context, 2);
    }),
    _useState12 = _slicedToArray(_useState11, 1),
    formName = _useState12[0];
  var xRef = useRef();
  var containerRef = useRef();
  // 它是 expand 的 ref 形式（与 expand 保持同步），他将在第二个 useEffect hooks 中发挥作用；
  var expandRef = useRef(defaultExpand);
  // 查询表单项的长度
  var queryFormItemLength = useRef(queryList.length);
  useEffect(function () {
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
    var hanleResize = throttle(resize, 200);
    window.addEventListener('resize', hanleResize, false);
    return function () {
      window.removeEventListener('resize', hanleResize, false);
    };
  }, [propCols]);
  // 计算【展开项】所在的 Col 组件的 offsetSpan 数
  var offsetSpan = useMemo(function () {
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
  var renderFormContent = useMemo(function () {
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
        return watch.apply(void 0, _concatInstanceProperty(args).call(args, [form]));
      } : undefined;
      // 如果条件满足，则不渲染该项
      if (!component && !formType) return 1; // continue
      if (component) {
        contextItem = /*#__PURE__*/React.cloneElement(component, _objectSpread({
          onChange: handleWatch
        }, properties));
      } else {
        switch (formType) {
          case 'input':
            contextItem = /*#__PURE__*/React.createElement(Input, _objectSpread(_objectSpread({
              allowClear: true
            }, properties), {}, {
              autoComplete: "off",
              onChange: handleWatch,
              placeholder: placeholder || "\u8BF7\u8F93\u5165\u8981\u67E5\u8BE2\u7684".concat(title)
            }));
            break;
          case 'select':
            contextItem = /*#__PURE__*/React.createElement(Select, _objectSpread(_objectSpread({
              allowClear: true
            }, properties), {}, {
              onChange: handleWatch,
              placeholder: placeholder || "\u8BF7\u9009\u62E9\u60A8\u8981\u67E5\u8BE2\u7684".concat(title)
            }), options === null || options === void 0 ? void 0 : _mapInstanceProperty(options).call(options, function (item) {
              return /*#__PURE__*/React.createElement(SelectOption, {
                key: item[keyNameForKey],
                value: item[keyNameForValue]
              }, item[keyNameForKey]);
            }));
            break;
          case 'rangePicker':
            contextItem = /*#__PURE__*/React.createElement(DatePicker.RangePicker, _objectSpread(_objectSpread({}, properties), {}, {
              onChange: handleWatch,
              placeholder: placeholder
            }));
            break;
          case 'datePicker':
            contextItem = /*#__PURE__*/React.createElement(DatePicker, _objectSpread(_objectSpread({}, properties), {}, {
              onChange: handleWatch,
              placeholder: placeholder
            }));
            break;
          case 'cascader':
            contextItem = /*#__PURE__*/React.createElement(Cascader, _objectSpread(_objectSpread({
              changeOnSelect: true
            }, properties), {}, {
              options: options,
              onChange: handleWatch,
              placeholder: placeholder || "\u8BF7\u9009\u62E9\u60A8\u8981\u67E5\u8BE2\u7684".concat(title)
            }));
            break;
        }
      }
      context.push( /*#__PURE__*/React.createElement(Col, {
        key: name,
        span: colSpan,
        style: {
          display: i > cols - 2 && !expand ? 'none' : ''
        }
      }, /*#__PURE__*/React.createElement(FormItem, {
        label: title,
        name: name
      }, contextItem)));
    };
    for (var i = 0; i < queryList.length; i++) {
      if (_loop()) continue;
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);
  var handleFinish = useCallback(function (values) {
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
  var handleReset = useCallback(function () {
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
  var handleExport = useCallback(function () {
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
  var handleChangeExpand = useCallback(function () {
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
  return /*#__PURE__*/React.createElement("section", {
    className: "qm-content-form-head",
    ref: xRef
  }, /*#__PURE__*/React.createElement(Form, {
    form: form,
    name: formName,
    onReset: handleReset,
    onFinish: handleFinish,
    initialValues: initialValues
  }, /*#__PURE__*/React.createElement(Row, {
    className: "qm-content-form-head-row",
    ref: containerRef
  }, renderFormContent, /*#__PURE__*/React.createElement(Col, {
    span: colSpan,
    offset: offsetSpan,
    className: "qm-content-form-head-button-group"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    htmlType: "submit",
    loading: loadingSubmit
  }, submitButtonText), showResetButton && ( /*#__PURE__*/React.createElement(Button, {
    htmlType: "reset",
    style: {
      marginLeft: '8px'
    },
    loading: loadingReset
  }, "\u91CD\u7F6E")), showExportButton && ( /*#__PURE__*/React.createElement(Button, {
    style: {
      marginLeft: '8px'
    },
    onClick: handleExport,
    loading: loadingExport
  }, "\u5BFC\u51FA")), extraNodes ? extraNodes : null, queryList.length >= 24 / colSpan && ( /*#__PURE__*/React.createElement(Button, {
    type: "link",
    onClick: handleChangeExpand
  }, expand ? '收起' : '展开', /*#__PURE__*/React.createElement(DownOutlined, {
    className: "qm-expand-icon".concat(expand ? ' expand' : '')
  })))))));
}
var ContentFormHead = /*#__PURE__*/memo(ContentFormHeader);
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
      _Object$assign(query, dataFormat(value));
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

export { ContentFormHead as default };
