"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor2 = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tree = _interopRequireDefault(require("antd/lib/tree"));
var _input = _interopRequireDefault(require("antd/lib/input"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.array.unshift.js");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));
var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));
var _map2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _react = _interopRequireWildcard(require("react"));
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
var _index = require("../utils/index.js");
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor2(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _excluded = ["title", "key", "parentKey", "children"];
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
function initialState() {
  return {
    // 过滤内容
    searchValue: '',
    // 选中的节点数组
    checkedKeys: [],
    // Tree 组件的展开项
    expandedKeys: [],
    // 扁平的 TreeData 数组
    flatTreeData: new _map.default()
  };
}
/**
 * 二次封装的 Tree 组件
 * @param filterOption 表示是否支持条件过滤，默认 true。可以自定义过滤方法，默认使用 filterTreeData。
 * @param treeData     组件的数据源，数据格式为：TreeData。
 * @param checkedKeys  受控，被选中的子节点集合。
 * @param checkable    是否展示复选框。
 * @param onChange     事件回调函数，当修改被选中的子节点时触发。
 */
function ModelTree(props, ref) {
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var searchValue = state.searchValue,
    checkedKeys = state.checkedKeys,
    expandedKeys = state.expandedKeys,
    flatTreeData = state.flatTreeData;
  var onChange = props.onChange,
    onExpand = props.onExpand,
    checkable = props.checkable,
    formatTreeData = props.formatTreeData,
    _props$showFilter = props.showFilter,
    showFilter = _props$showFilter === void 0 ? true : _props$showFilter,
    propTreeData = props.treeData,
    propCheckedKeys = props.checkedKeys,
    propsExpandeKeys = props.expandedKeys;
  var deferSearchValue = (0, _react.useDeferredValue)(searchValue);
  // 是否组件内容修改了 checkedKeys
  var isInternalModifiedCheckedKeys = (0, _react.useRef)(false);
  var isInternalModifiedExpandeKeys = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (propCheckedKeys === undefined) {
      return;
    } else if (isInternalModifiedCheckedKeys.current) {
      isInternalModifiedCheckedKeys.current = false;
      return;
    } else {
      setState({
        checkedKeys: propCheckedKeys
      });
    }
  }, [propCheckedKeys]);
  (0, _react.useEffect)(function () {
    if (propsExpandeKeys === undefined) {
      return;
    } else if (isInternalModifiedExpandeKeys.current) {
      isInternalModifiedExpandeKeys.current = false;
      return;
    } else {
      setState({
        expandedKeys: propsExpandeKeys
      });
    }
  }, [propsExpandeKeys]);
  var treeData = (0, _react.useMemo)(function () {
    // 如果 formatTreeData 不是一个函数，那表示 propTreeData 数据类型就是 TreeData[], 所以无需再进行格式化处理了。
    var treeData = typeof formatTreeData === 'function' ? formatTreeData(propTreeData) : propTreeData;
    setState({
      flatTreeData: computedFlatTreeData(treeData)
    });
    return treeData;
  }, [propTreeData]);
  // 实时计算 Tree 组件的数据源
  var computeTreeData = (0, _react.useMemo)(function () {
    if (!deferSearchValue) return treeData;
    return filterTreeData(treeData, deferSearchValue);
  }, [treeData, deferSearchValue]);
  (0, _react.useEffect)(function () {
    if (!deferSearchValue) return;
    // 根据条件过滤出目标节点的父节点的 key。
    var newExpandedKeys = [];
    flatTreeData.forEach(function (item) {
      var _context;
      if ((0, _indexOf.default)(_context = item.title).call(_context, deferSearchValue) > -1) {
        var parentkeys = _getParentKeys(item.key, flatTreeData);
        parentkeys && newExpandedKeys.push.apply(newExpandedKeys, (0, _toConsumableArray2.default)(parentkeys));
      }
    });
    // 无需去重，Tree 组件内部会进行处理
    setState({
      expandedKeys: newExpandedKeys
    });
  }, [flatTreeData, deferSearchValue]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getParentKeys: function getParentKeys(key) {
        return _getParentKeys(key, flatTreeData);
      },
      getAllParentKeys: function getAllParentKeys() {
        var keys = [];
        checkedKeys.forEach(function (key) {
          return keys.push.apply(keys, (0, _toConsumableArray2.default)(_getParentKeys(key, flatTreeData)));
        });
        return (0, _toConsumableArray2.default)(new _set.default(keys));
      }
    };
  }, [checkedKeys, flatTreeData]);
  // 点击 Tree 组件的复选框时触发
  var handleTreeCheck = (0, _react.useCallback)(function (checkedKeys) {
    isInternalModifiedCheckedKeys.current = true;
    setState({
      checkedKeys: checkedKeys
    });
    var allKeys = [];
    checkedKeys.forEach(function (key) {
      return allKeys.push.apply(allKeys, (0, _toConsumableArray2.default)(_getParentKeys(key, flatTreeData)));
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(checkedKeys, (0, _toConsumableArray2.default)(new _set.default(allKeys)));
  }, [flatTreeData]);
  // 手动展开/折叠 Tree 组件。
  var handleTreeExpand = (0, _react.useCallback)(function (newExpandedKeys) {
    isInternalModifiedExpandeKeys.current = false;
    setState({
      expandedKeys: newExpandedKeys
    });
    onExpand === null || onExpand === void 0 ? void 0 : onExpand(newExpandedKeys);
  }, []);
  var handleSearchChange = (0, _react.useCallback)(function (event) {
    var _context2;
    setState({
      searchValue: (0, _trim.default)(_context2 = event.target.value).call(_context2)
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showFilter ? /*#__PURE__*/_react.default.createElement(_input.default.Search, {
    style: {
      marginBottom: 8
    },
    onChange: handleSearchChange,
    placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u8FDB\u884C\u8FC7\u6EE4"
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-model-tree"
  }, /*#__PURE__*/_react.default.createElement(_tree.default, {
    checkable: checkable,
    onCheck: handleTreeCheck,
    checkedKeys: checkedKeys,
    treeData: computeTreeData,
    onExpand: handleTreeExpand,
    expandedKeys: expandedKeys
  })));
}
var index = /*#__PURE__*/(0, _react.forwardRef)(ModelTree);
/**
 * 过滤、筛选出目标节点，匹配的内容将被标注为红色
 * @param treeData    Tree 组件的 treeData
 * @param searchValue 查询条件
 */
exports.default = index;
function filterTreeData(treeData, searchValue) {
  return (0, _map2.default)(treeData).call(treeData, function (item) {
    var title = item.title,
      key = item.key,
      parentKey = item.parentKey,
      children = item.children,
      props = (0, _objectWithoutProperties2.default)(item, _excluded);
    var newTitle = title;
    if ((0, _indexOf.default)(title).call(title, searchValue) >= 0) {
      newTitle = [];
      var ary = title.split(searchValue);
      var length = ary.length;
      for (var i = 0; i < length; i++) {
        ary[i] && newTitle.push(ary[i]);
        if (i < length - 1) {
          // 相邻的两个元素之间才会添加
          newTitle.push( /*#__PURE__*/_react.default.createElement("span", {
            className: "qm-model-tree-node-rich",
            key: i
          }, searchValue));
        }
      }
      newTitle = /*#__PURE__*/_react.default.createElement("span", null, newTitle);
    }
    if (children !== null && children !== void 0 && children.length) {
      return _objectSpread({
        key: key,
        parentKey: parentKey,
        title: newTitle,
        children: filterTreeData(children, searchValue)
      }, props);
    } else {
      return _objectSpread({
        title: newTitle,
        key: key,
        parentKey: parentKey
      }, props);
    }
  });
}
/**
 * 根据当前节点的 key 找到所有的父级（祖先）节点（的 key）
 * @param key 当前节点的 key
 * @param data 所属有树节点的集合
 */
function _getParentKeys(key, flatTreeData) {
  var keys = [];
  while (flatTreeData.has(key)) {
    keys.push(key);
    key = flatTreeData.get(key).parentKey;
  }
  return keys;
}
/**
 * 将 TreeData 数据拉平为一维数组
 * @param tree treeData
 */
function computedFlatTreeData(tree) {
  var stack = (0, _index.isArray)(tree) ? (0, _toConsumableArray2.default)(tree) : [tree];
  var result = new _map.default();
  while (stack.length) {
    var _stack$shift = stack.shift(),
      key = _stack$shift.key,
      parentKey = _stack$shift.parentKey,
      title = _stack$shift.title,
      children = _stack$shift.children;
    result.set(key, {
      title: title,
      key: key,
      parentKey: parentKey
    });
    if (!(children !== null && children !== void 0 && children.length)) continue;
    for (var i = 0; i < children.length; i++) {
      stack.unshift(children[i]);
    }
  }
  // 排序
  return result;
}