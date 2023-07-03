import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.array.push.js';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import React, { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Form, Select, Row, Col, Button, Cascader, DatePicker, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { throttle } from '../utils/index.js';
import './index.css';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
// 计算 <Row /> 容器下面一个 <Col/> 组件将设置多少 span
function computeColSpan() {
  var width = window.innerWidth || document.documentElement.clientWidth;
  if (width >= 1600) return colSpanConfig.xxl;
  if (width >= 1200) return colSpanConfig.xl;
  if (width >= 992) return colSpanConfig.lg;
  if (width >= 768) return colSpanConfig.md;
  return colSpanConfig.sm;
}
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
function ContentFormHead(props) {
  var onSubmit = props.onSubmit,
    onExport = props.onExport,
    queryList = props.queryList,
    initialValues = props.initialValues,
    propCols = props.cols,
    showExportButton = props.showExportButton,
    _props$defaultExpand = props.defaultExpand,
    defaultExpand = _props$defaultExpand === void 0 ? true : _props$defaultExpand,
    _props$okButtonText = props.okButtonText,
    okButtonText = _props$okButtonText === void 0 ? '查询' : _props$okButtonText,
    _props$showResetButto = props.showResetButton,
    showResetButton = _props$showResetButto === void 0 ? true : _props$showResetButto;
  var _useState = useState(propCols ? 24 / propCols : computeColSpan),
    _useState2 = _slicedToArray(_useState, 2),
    colSpan = _useState2[0],
    setColSpan = _useState2[1];
  var _useState3 = useState(defaultExpand),
    _useState4 = _slicedToArray(_useState3, 2),
    expand = _useState4[0],
    setExpand = _useState4[1];
  var _useForm = useForm(),
    _useForm2 = _slicedToArray(_useForm, 1),
    form = _useForm2[0];
  var containerRef = useRef();
  useEffect(function () {
    function resize() {
      var colSpan = propCols ? 24 / propCols : computeColSpan();
      setColSpan(function () {
        return colSpan;
      });
      if (expand) {
        var cols = 24 / colSpan;
        // 计算表单查询项一共是多少列。
        var length = _filterInstanceProperty(queryList).call(queryList, function (item) {
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
    var hanleResize = throttle(resize, 200);
    window.addEventListener('resize', hanleResize, false);
    return function () {
      window.removeEventListener('resize', hanleResize, false);
    };
  }, [queryList, expand, propCols]);
  // 计算【展开项】所在的 Col 组件的 offsetSpan 数
  var offsetSpan = useMemo(function () {
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
  var renderFormContent = useMemo(function () {
    var cols = 24 / colSpan;
    var context = [];
    var _loop = function _loop() {
      var _queryList$i = queryList[i],
        title = _queryList$i.title,
        options = _queryList$i.options,
        formType = _queryList$i.formType,
        dataIndex = _queryList$i.dataIndex,
        component = _queryList$i.component,
        properties = _queryList$i.properties,
        placeholder = _queryList$i.placeholder,
        _queryList$i$label = _queryList$i.label,
        label = _queryList$i$label === void 0 ? title : _queryList$i$label,
        _queryList$i$name = _queryList$i.name,
        name = _queryList$i$name === void 0 ? dataIndex : _queryList$i$name,
        _queryList$i$keyNameF = _queryList$i.keyNameForKey,
        keyNameForKey = _queryList$i$keyNameF === void 0 ? 'label' : _queryList$i$keyNameF,
        _queryList$i$keyNameF2 = _queryList$i.keyNameForValue,
        keyNameForValue = _queryList$i$keyNameF2 === void 0 ? 'value' : _queryList$i$keyNameF2;
      var contextItem = null;
      // 如果条件满足，则不渲染该项
      if (!component && !formType) return "continue";
      if (component) {
        contextItem = /*#__PURE__*/React.cloneElement(component, _objectSpread({}, properties));
      } else {
        switch (formType) {
          case 'input':
            contextItem = /*#__PURE__*/React.createElement(Input, _objectSpread(_objectSpread({
              allowClear: true
            }, properties), {}, {
              autoComplete: "off",
              placeholder: placeholder || "\u8BF7\u8F93\u5165\u8981\u67E5\u8BE2\u7684".concat(label)
            }));
            break;
          case 'select':
            contextItem = /*#__PURE__*/React.createElement(Select, _objectSpread({
              allowClear: true,
              placeholder: placeholder || "\u8BF7\u9009\u62E9\u60A8\u8981\u67E5\u8BE2\u7684".concat(label)
            }, properties), options === null || options === void 0 ? void 0 : _mapInstanceProperty(options).call(options, function (item) {
              return /*#__PURE__*/React.createElement(SelectOption, {
                key: item[keyNameForKey],
                value: item[keyNameForValue]
              }, item[keyNameForKey]);
            }));
            break;
          case 'rangePicker':
            contextItem = /*#__PURE__*/React.createElement(DatePicker.RangePicker, _objectSpread({
              format: "YYYY-MM-DD"
            }, properties));
            break;
          case 'datePicker':
            contextItem = /*#__PURE__*/React.createElement(DatePicker, _objectSpread({
              format: "YYYY-MM-DD",
              style: {
                width: '100%'
              }
            }, properties));
            break;
          case 'cascader':
            contextItem = /*#__PURE__*/React.createElement(Cascader, _objectSpread(_objectSpread({
              changeOnSelect: true
            }, properties), {}, {
              options: options,
              placeholder: placeholder || "\u8BF7\u9009\u62E9\u60A8\u8981\u67E5\u8BE2\u7684".concat(label)
            }));
            break;
        }
      }
      var spanProps = propCols ? {
        span: 24 / propCols
      } : colSpanConfig;
      context.push( /*#__PURE__*/React.createElement(Col, _objectSpread(_objectSpread({
        key: name
      }, spanProps), {}, {
        style: {
          display: i > cols - 2 && !expand ? 'none' : ''
        }
      }), /*#__PURE__*/React.createElement(FormItem, {
        label: label,
        name: name
      }, contextItem)));
    };
    for (var i = 0; i < queryList.length; i++) {
      var _ret = _loop();
      if (_ret === "continue") continue;
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);
  var handleFinish = useCallback(function (values) {
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(values);
  }, [onSubmit]);
  var handleReset = useCallback(function () {
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit({});
  }, []);
  var handleExport = useCallback(function () {
    onExport === null || onExport === void 0 ? void 0 : onExport(form.getFieldsValue());
  }, [onExport]);
  // 展开/收起
  var handleChangeExpand = useCallback(function () {
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
  var spanProps = useMemo(function () {
    return propCols ? {
      span: 24 / propCols
    } : colSpanConfig;
  }, [propCols]);
  return /*#__PURE__*/React.createElement("section", {
    className: "qm-content-form-head"
  }, /*#__PURE__*/React.createElement(Form, {
    form: form,
    onReset: handleReset,
    onFinish: handleFinish,
    name: "content-form-head",
    initialValues: initialValues
  }, /*#__PURE__*/React.createElement(Row, {
    className: "qm-content-form-head-row",
    ref: containerRef
  }, renderFormContent, /*#__PURE__*/React.createElement(Col, _objectSpread(_objectSpread({}, spanProps), {}, {
    offset: offsetSpan,
    className: "qm-content-form-head-button-group"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    htmlType: "submit"
  }, okButtonText), showResetButton && /*#__PURE__*/React.createElement(Button, {
    htmlType: "reset",
    style: {
      marginLeft: '8px'
    }
  }, "\u91CD\u7F6E"), showExportButton && /*#__PURE__*/React.createElement(Button, {
    style: {
      marginLeft: '8px'
    },
    onClick: handleExport
  }, "\u5BFC\u51FA"), queryList.length >= 24 / colSpan && /*#__PURE__*/React.createElement(Button, {
    type: "link",
    onClick: handleChangeExpand
  }, expand ? '收起' : '展开', /*#__PURE__*/React.createElement(DownOutlined, {
    className: "icon".concat(expand ? ' expand' : '')
  }))))));
}
var ContentFormHead$1 = /*#__PURE__*/memo(ContentFormHead);

export { ContentFormHead$1 as default };
