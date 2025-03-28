"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pagination = _interopRequireDefault(require("antd/lib/pagination"));
var _table = _interopRequireDefault(require("antd/lib/table"));
var _card = _interopRequireDefault(require("antd/lib/card"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
var _react = _interopRequireWildcard(require("react"));
var _index = _interopRequireDefault(require("../ContentFormHeader/index.js"));
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
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
function ContentFormPage(props, ref) {
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var total = state.total,
    pageNum = state.pageNum,
    loading = state.loading,
    pageSize = state.pageSize,
    tableList = state.tableList;
  var cols = props.cols,
    extra = props.extra,
    rowKey = props.rowKey,
    columns = props.columns,
    bordered = props.bordered,
    tableSize = props.tableSize,
    tableTitle = props.tableTitle,
    tableScroll = props.tableScroll,
    rowSelection = props.rowSelection,
    paginationSize = props.paginationSize,
    queryTableList = props.queryTableList,
    exportTableList = props.exportTableList,
    showResetButton = props.showResetButton,
    _props$immediate = props.immediate,
    immediate = _props$immediate === void 0 ? true : _props$immediate,
    submitButtonText = props.submitButtonText,
    showExportButton = props.showExportButton,
    beforeQueryAction = props.beforeQueryAction,
    onPaginationChange = props.onPaginationChange,
    _props$defaultExpand = props.defaultExpand,
    defaultExpand = _props$defaultExpand === void 0 ? true : _props$defaultExpand,
    extraNodesInsertHeader = props.extraNodesInsertHeader,
    _props$showTotal = props.showTotal,
    showTotal = _props$showTotal === void 0 ? defaultShowTotal : _props$showTotal,
    _props$customResponse = props.customResponse,
    customResponse = _props$customResponse === void 0 ? handleResponse : _props$customResponse;
  var contentHeaderRef = (0, _react.useRef)();
  var searchContentRef = (0, _react.useRef)({});
  // immediate 表示是否在页面初始化的时候请求后台接口。默认 true
  var immediateRef = (0, _react.useRef)(immediate);
  // 表单查询条件（初始化的值）。Form 表单不会更新初始化值，所以我们使用 ref。
  var initialSearchCondition = (0, _react.useRef)(null);
  // Table 组件使用的 columns
  var tableColumns = (0, _react.useMemo)(function () {
    return (0, _filter.default)(columns).call(columns, function (column) {
      return column.visibleInTable !== false;
    });
  }, [columns]);
  // 条件查询使用的 columns
  var queryList = (0, _react.useMemo)(function () {
    return (0, _filter.default)(columns).call(columns, function (column) {
      return column.component || column.formType;
    });
  }, [columns]);
  // 在此处对查询搜索的内容进行初始化，注意这个方法应该只执行一次。
  if (initialSearchCondition.current === null) {
    var initialValues = {};
    for (var i = 0; i < queryList.length; i++) {
      var _queryList$i = queryList[i],
        dataIndex = _queryList$i.dataIndex,
        _queryList$i$name = _queryList$i.name,
        name = _queryList$i$name === void 0 ? dataIndex : _queryList$i$name,
        initialValue = _queryList$i.initialValue;
      if (initialValue) initialValues[name] = initialValue;
    }
    initialSearchCondition.current = initialValues;
    searchContentRef.current = formatFormModel(queryList, initialValues);
  }
  // 请求数据
  var sendRequestTableList = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(query) {
      var _beforeQueryAction;
      var action, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // 如果 action 返回 false， 则行为终止，否则将返回的内容作为 request body。
            action = (_beforeQueryAction = beforeQueryAction === null || beforeQueryAction === void 0 ? void 0 : beforeQueryAction(query)) !== null && _beforeQueryAction !== void 0 ? _beforeQueryAction : query;
            if (!(action === false)) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            setState({
              loading: true
            });
            _context.prev = 4;
            _context.next = 7;
            return queryTableList(action);
          case 7:
            response = _context.sent;
            setState(_objectSpread({}, customResponse(response)));
          case 9:
            _context.prev = 9;
            setState({
              loading: false
            });
            return _context.finish(9);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[4,, 9, 12]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), []);
  // 对组件外部暴露可调用的 API
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      // 强制更新页面数据
      forceUpdate: function forceUpdate(opts, callback) {
        var query = _objectSpread(_objectSpread({
          pageSize: pageSize,
          pageNum: pageNum
        }, searchContentRef.current), opts);
        sendRequestTableList(query).finally(function () {
          return callback === null || callback === void 0 ? void 0 : callback();
        });
      },
      getQueryData: function getQueryData() {
        return contentHeaderRef.current.getCurrentFormData();
      },
      form: contentHeaderRef.current.form
    };
  }, [pageSize, pageNum]);
  // 页面初始化。
  // 之后，每当 deps 变化都会触发 sendRequestTableList() 重新请求数据
  (0, _react.useEffect)(function () {
    // immediateRef 表示再页面初始化时是否请求数
    if (immediateRef.current === false) {
      immediateRef.current = true;
      return;
    }
    sendRequestTableList(_objectSpread({
      pageSize: pageSize,
      pageNum: pageNum
    }, searchContentRef.current));
  }, []);
  (0, _react.useEffect)(function () {
    onPaginationChange === null || onPaginationChange === void 0 || onPaginationChange(pageNum, pageSize);
  }, [pageSize, pageNum]);
  var onPageNumChange = (0, _react.useCallback)(function (pageNum, pageSize) {
    setState({
      pageSize: pageSize,
      pageNum: pageNum
    });
    sendRequestTableList(_objectSpread({
      pageSize: pageSize,
      pageNum: pageNum
    }, searchContentRef.current));
  }, []);
  // 点击查询按钮
  var handleSubmit = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(values) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            setState({
              pageNum: 1
            });
            searchContentRef.current = values;
            return _context2.abrupt("return", sendRequestTableList(_objectSpread({
              pageSize: pageSize,
              pageNum: 1
            }, values)));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [pageSize]);
  // 点击重置按钮
  var handleReset = (0, _react.useCallback)(function (values) {
    setState({
      pageNum: 1
    });
    searchContentRef.current = values;
    return sendRequestTableList(_objectSpread({
      pageSize: pageSize,
      pageNum: 1
    }, values));
  }, [pageSize]);
  // 导出数据
  var handleExport = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(query) {
      var _beforeQueryAction2;
      var action;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            // 如果 action 返回 false， 则行为终止，否则将返回的内容作为 request body。
            action = (_beforeQueryAction2 = beforeQueryAction === null || beforeQueryAction === void 0 ? void 0 : beforeQueryAction(query)) !== null && _beforeQueryAction2 !== void 0 ? _beforeQueryAction2 : query;
            if (!(action === false)) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return");
          case 3:
            _context3.next = 5;
            return exportTableList(_objectSpread({
              pageNum: pageNum,
              pageSize: pageSize
            }, action));
          case 5:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }(), [exportTableList, pageNum, pageSize]);
  // 当 columns 中的某一项设置了 sorter 时，可以设置【倒叙/正序】 查询。
  var handleTableChange = (0, _react.useCallback)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var sorter = args[2];
    var orderList = [];
    // sorter 可能是对象，也可能是数组。分开处理
    if (sorter instanceof Array) {
      for (var _i = 0; _i < sorter.length; _i++) {
        var _sorter$_i = sorter[_i],
          field = _sorter$_i.field,
          order = _sorter$_i.order;
        // 如果 order 字段不存在则说明没有排序
        // 正序-ascend、倒叙-descend，
        if (order) orderList.push({
          field: field,
          order: order
        });
      }
    } else {
      var _field = sorter.field,
        _order = sorter.order;
      // 如果 order 字段不存在则说明没有排序
      // 正序-ascend、倒叙-descend，
      if (_order) orderList.push({
        field: _field,
        order: _order
      });
    }
    var newSearchCondition = _objectSpread(_objectSpread({}, searchContentRef.current), {}, {
      order: orderList
    });
    if (orderList.length <= 0) delete newSearchCondition.order;
    searchContentRef.current = newSearchCondition;
    return sendRequestTableList(_objectSpread({
      pageSize: pageSize,
      pageNum: pageNum
    }, newSearchCondition));
  }, [pageSize, pageNum]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-content-form-page"
  }, (queryList === null || queryList === void 0 ? void 0 : queryList.length) > 0 && ( /*#__PURE__*/_react.default.createElement(_index.default, {
    cols: cols,
    queryList: queryList,
    onReset: handleReset,
    ref: contentHeaderRef,
    onSubmit: handleSubmit,
    onExport: handleExport,
    defaultExpand: defaultExpand,
    showResetButton: showResetButton,
    submitButtonText: submitButtonText,
    showExportButton: showExportButton,
    extraNodes: extraNodesInsertHeader,
    initialValues: initialSearchCondition.current
  })), /*#__PURE__*/_react.default.createElement(_card.default, {
    styles: {
      body: {
        padding: '0 24px'
      }
    },
    style: {
      marginTop: 16,
      border: '0px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-content-form-page-table-head"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-content-form-page-table-head-title"
  }, tableTitle || '查询表格'), extra ? /*#__PURE__*/_react.default.createElement("div", null, extra) : null), /*#__PURE__*/_react.default.createElement(_table.default, {
    rowKey: rowKey,
    size: tableSize,
    loading: loading,
    pagination: false,
    bordered: bordered,
    scroll: tableScroll,
    dataSource: tableList,
    columns: tableColumns,
    rowSelection: rowSelection,
    onChange: handleTableChange
  }), total > 0 ? ( /*#__PURE__*/_react.default.createElement(_pagination.default, {
    total: total,
    showSizeChanger: true,
    current: pageNum,
    pageSize: pageSize,
    size: paginationSize,
    showTotal: showTotal,
    onChange: onPageNumChange,
    className: "qm-content-form-page-pagination"
  })) : ( /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 0,
      height: 24
    }
  }))));
}
var index = exports.default = /*#__PURE__*/(0, _react.forwardRef)(ContentFormPage);
function initialState() {
  return {
    total: 0,
    pageNum: 1,
    tableList: [],
    pageSize: 10,
    loading: false,
    searchContent: {}
  };
}
function defaultShowTotal(total) {
  return "\u5171 ".concat(total, " \u6761\u6570\u636E");
}
function handleResponse(_ref4) {
  var data = _ref4.data;
  var tableList = data.list,
    total = data.total;
  return {
    tableList: tableList,
    total: total
  };
}
function formatFormModel(columns, values) {
  var query = {};
  for (var i = 0; i < columns.length; i++) {
    var _columns$i = columns[i],
      dataIndex = _columns$i.dataIndex,
      _columns$i$name = _columns$i.name,
      name = _columns$i$name === void 0 ? dataIndex : _columns$i$name,
      dataFormat = _columns$i.dataFormat;
    var value = values[name];
    // eslint-disable-next-line
    if (value == null) continue;
    if (typeof dataFormat === 'function') {
      (0, _assign.default)(query, dataFormat(value));
    } else {
      query[name] = value;
    }
  }
  return query;
}