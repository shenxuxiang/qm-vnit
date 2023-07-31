import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.promise.finally.js';
import 'core-js/modules/es.error.cause.js';
import 'core-js/modules/es.array.push.js';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import React, { forwardRef, useRef, useMemo, useCallback, useImperativeHandle, useEffect } from 'react';
import { message, Card, Table, Pagination } from 'antd';
import ContentFormHead from '../ContentFormHead/index.js';
import useReducer from '../utils/useReducer.js';
import { downloadFile } from '../utils/index.js';
import './index.css';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
function initialState() {
  return {
    total: 0,
    pageNum: 1,
    pageList: [],
    pageSize: 10,
    loading: false,
    searchContent: {}
  };
}
function ContentFormPage(props, ref) {
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var total = state.total,
    pageNum = state.pageNum,
    loading = state.loading,
    pageSize = state.pageSize,
    pageList = state.pageList,
    searchContent = state.searchContent;
  var extra = props.extra,
    rowKey = props.rowKey,
    columns = props.columns,
    bordered = props.bordered,
    tableTitle = props.tableTitle,
    dataExport = props.dataExport,
    tableScroll = props.tableScroll,
    rowSelection = props.rowSelection,
    exportFileName = props.exportFileName,
    paginationSize = props.paginationSize,
    showResetButton = props.showResetButton,
    searchButtonText = props.searchButtonText,
    showExportButton = props.showExportButton,
    requestDataSource = props.requestDataSource,
    hasSearchFunction = props.hasSearchFunction,
    onPaginationChange = props.onPaginationChange,
    extraNodesInsertHeader = props.extraNodesInsertHeader,
    _props$paginationShow = props.paginationShowTotal,
    paginationShowTotal = _props$paginationShow === void 0 ? showTotal : _props$paginationShow,
    _props$customResponse = props.customResponse,
    customResponse = _props$customResponse === void 0 ? handleResponse : _props$customResponse;
  // 表单查询条件（初始化的值）。Form 表单不会更新初始化值，所以我们使用 ref。
  var initialSearchCondition = useRef(null);
  // Table 组件使用的 columns
  var tableColumns = useMemo(function () {
    return _filterInstanceProperty(columns).call(columns, function (column) {
      return column.visibleInTable !== false;
    });
  }, [columns]);
  // 条件查询使用的 columns
  var queryList = useMemo(function () {
    return _filterInstanceProperty(columns).call(columns, function (column) {
      return column.component || column.formType;
    });
  }, [columns]);
  // 在此处对查询搜索的内容进行初始化，注意这个方法应该只执行一次。
  if (initialSearchCondition.current === null) {
    var initialValues = {};
    for (var i = 0; i < queryList.length; i++) {
      var _queryList$i = queryList[i],
        dataIndex = _queryList$i.dataIndex,
        name = _queryList$i.name,
        initialValue = _queryList$i.initialValue;
      if (initialValue) initialValues[name || dataIndex] = initialValue;
    }
    initialSearchCondition.current = initialValues;
    setState({
      searchContent: formatFormData(initialValues, queryList)
    });
  }
  // 请求数据
  var sendRequestPageList = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(query) {
      var response, data, code;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setState({
              loading: true
            });
            _context.prev = 1;
            _context.next = 4;
            return requestDataSource(query);
          case 4:
            response = _context.sent;
            data = response.data, code = response.code;
            if (code === 0) {
              setState(_objectSpread({}, customResponse(data)));
            }
          case 7:
            _context.prev = 7;
            setState({
              loading: false
            });
            return _context.finish(7);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1,, 7, 10]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  // 对组件外部暴露可调用的 API
  useImperativeHandle(ref, function () {
    return {
      // 强制更新页面数据
      forceUpdate: function forceUpdate(opts, callback) {
        var query = _objectSpread(_objectSpread({
          pageSize: pageSize,
          pageNum: pageNum
        }, searchContent), opts);
        sendRequestPageList(query).finally(function () {
          return callback === null || callback === void 0 ? void 0 : callback();
        });
      }
    };
  }, [pageSize, pageNum, searchContent]);
  // 页面初始化。
  // 之后，每当 deps 变化都会触发 sendRequestPageList() 重新请求数据
  useEffect(function () {
    sendRequestPageList(_objectSpread({
      pageSize: pageSize,
      pageNum: pageNum
    }, searchContent));
  }, [pageSize, pageNum, searchContent]);
  useEffect(function () {
    onPaginationChange === null || onPaginationChange === void 0 ? void 0 : onPaginationChange(pageNum, pageSize);
  }, [pageSize, pageNum]);
  var onPageSizeChange = useCallback(function (_, pageSize) {
    setState({
      pageSize: pageSize,
      pageNum: 1
    });
  }, []);
  var onPageNumChange = useCallback(function (pageNum) {
    setState({
      pageNum: pageNum
    });
  }, []);
  // 点击查询按钮
  var handleSubmit = useCallback(function (values) {
    var formData = formatFormData(values, queryList);
    setState({
      searchContent: formData,
      pageNum: 1
    });
  }, [queryList]);
  // 导出数据
  var handleExport = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(values) {
      var formData, file;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            formData = formatFormData(values, queryList);
            _context2.prev = 1;
            _context2.next = 4;
            return dataExport(_objectSpread({
              pageNum: pageNum,
              pageSize: pageSize
            }, formData));
          case 4:
            file = _context2.sent;
            if (!(file.data.type === 'application/json')) {
              _context2.next = 9;
              break;
            }
            throw new Error('文件下载失败');
          case 9:
            downloadFile(exportFileName || file.fileName, file.data);
          case 10:
            _context2.next = 15;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            message.warning('文件下载失败');
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 12]]);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [dataExport, exportFileName, queryList, pageNum, pageSize]);
  // 当 columns 中的某一项设置了 sorter 时，可以设置【倒叙/正序】 查询。
  var handleTableChange = useCallback(function (_, __, sorter) {
    var orderList = [];
    // sorter 可能是对象，也可能是数组。分开处理
    if (sorter instanceof Array) {
      for (var _i = 0; _i < sorter.length; _i++) {
        var _sorter$_i = sorter[_i],
          field = _sorter$_i.field,
          order = _sorter$_i.order;
        // 如果 order 字段不存在则说明没有排序
        // 正序-true、倒叙-false，
        if (order) orderList.push({
          field: field,
          direction: _includesInstanceProperty(order).call(order, 'asc')
        });
      }
    } else {
      var _field = sorter.field,
        _order = sorter.order;
      // 如果 order 字段不存在则说明没有排序
      // 正序-true、倒叙-false，
      if (_order) orderList.push({
        field: _field,
        direction: _includesInstanceProperty(_order).call(_order, 'asc')
      });
    }
    var newSearchCondition = _objectSpread(_objectSpread({}, searchContent), {}, {
      order: orderList
    });
    if (orderList.length <= 0) delete newSearchCondition.order;
    setState({
      searchContent: newSearchCondition
    });
  }, [searchContent]);
  return /*#__PURE__*/React.createElement("div", {
    className: "qm-content-form-page"
  }, hasSearchFunction && /*#__PURE__*/React.createElement(ContentFormHead, {
    queryList: queryList,
    onSubmit: handleSubmit,
    onExport: handleExport,
    okButtonText: searchButtonText,
    showResetButton: showResetButton,
    showExportButton: showExportButton,
    extraNodes: extraNodesInsertHeader,
    initialValues: initialSearchCondition.current
  }), /*#__PURE__*/React.createElement(Card, {
    bodyStyle: {
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-content-form-page-table-head "
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-content-form-page-table-head-title"
  }, tableTitle || '查询表格'), extra ? /*#__PURE__*/React.createElement("div", null, extra) : null), /*#__PURE__*/React.createElement(Table, {
    rowKey: rowKey,
    loading: loading,
    pagination: false,
    bordered: bordered,
    scroll: tableScroll,
    dataSource: pageList,
    columns: tableColumns,
    rowSelection: rowSelection,
    onChange: handleTableChange
  }), total > 0 ? /*#__PURE__*/React.createElement(Pagination, {
    total: total,
    current: pageNum,
    pageSize: pageSize,
    size: paginationSize,
    showSizeChanger: true,
    onChange: onPageNumChange,
    showTotal: paginationShowTotal,
    onShowSizeChange: onPageSizeChange,
    className: "qm-content-form-page-pagination"
  }) : null));
}
var index = /*#__PURE__*/forwardRef(ContentFormPage);
function showTotal(total) {
  return "\u5171 ".concat(total, " \u6761\u6570\u636E");
}
function handleResponse(data) {
  var pageList = data.list,
    total = data.total,
    pageSize = data.pageSize,
    pageNum = data.pageNum;
  return {
    pageList: pageList,
    total: total,
    pageSize: pageSize,
    pageNum: pageNum
  };
}
function formatFormData(values, columns) {
  var formData = {};
  for (var i = 0; i < columns.length; i++) {
    var _columns$i = columns[i],
      dataIndex = _columns$i.dataIndex,
      _columns$i$name = _columns$i.name,
      name = _columns$i$name === void 0 ? dataIndex : _columns$i$name,
      formatData = _columns$i.formatData;
    var value = values[name];
    // eslint-disable-next-line
    if (value == null) continue;
    // 通过 formatData() 将数据格式化，并做为最总发送给后端的查询内容
    if (typeof formatData === 'function') {
      var fieldValue = formatData(value);
      _Object$assign(formData, fieldValue);
    } else {
      formData[name] = value;
    }
  }
  return formData;
}

export { index as default };
