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
require("core-js/modules/es.array.unshift.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));
var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _react = _interopRequireWildcard(require("react"));
var _useReducer3 = _interopRequireDefault(require("../utils/useReducer.js"));
var _index = require("../utils/index.js");
require("./index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor2; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor2(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _excluded = ["onCheck", "onSelect", "onExpand", "checkable", "fieldNames", "formatTreeData", "showFilter", "treeData", "checkedKeys", "expandedKeys", "selectedKeys"],
  _excluded2 = ["title", "key", "parentKey", "renderItem", "children"];
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
function initialState() {
  return {
    // 过滤内容
    searchValue: '',
    // 选中的节点数组
    checkedKeys: [],
    selectedKeys: [],
    // Tree 组件的展开项
    expandedKeys: [],
    // 扁平的 TreeData 数组
    flatTreeData: new _map.default()
  };
}
/**
 * 二次封装的 Tree 组件
 * @param treeData       组件的数据源，数据格式为：TreeData
 * @param onLine         是否展示连接线
 * @param multiple       支持点选多个节点（节点本身）
 * @param formatTreeData treeData 格式化函数，将 treeData 转化成 TreeData[] 格式
 * @param fieldNames     自定义节点 title、key、children、parentKey 的字段
 * @param checkedKeys    受控，被选中的子节点集合
 * @param selectedKeys   受控，被选中的子节点集合
 * @param checkable      是否展示复选框
 * @param onCheck        事件回调函数
 * @param onSelect       事件回调函数
 */
function ModelTree(props, ref) {
  var _useReducer = (0, _useReducer3.default)(initialState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var searchValue = state.searchValue,
    checkedKeys = state.checkedKeys,
    expandedKeys = state.expandedKeys,
    selectedKeys = state.selectedKeys,
    flatTreeData = state.flatTreeData;
  var onCheck = props.onCheck,
    onSelect = props.onSelect,
    onExpand = props.onExpand,
    checkable = props.checkable,
    fieldNames = props.fieldNames,
    formatTreeData = props.formatTreeData,
    _props$showFilter = props.showFilter,
    showFilter = _props$showFilter === void 0 ? true : _props$showFilter,
    propTreeData = props.treeData,
    propCheckedKeys = props.checkedKeys,
    propsExpandeKeys = props.expandedKeys,
    propsSelectedKeys = props.selectedKeys,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var deferSearchValue = (0, _react.useDeferredValue)(searchValue);
  (0, _react.useEffect)(function () {
    if (propCheckedKeys === undefined) {
      return;
    } else {
      setState(function (prev) {
        if ((0, _index.objectIs)(prev.checkedKeys, propCheckedKeys)) {
          return null;
        } else {
          return {
            checkedKeys: propCheckedKeys
          };
        }
      });
    }
  }, [propCheckedKeys]);
  (0, _react.useEffect)(function () {
    if (propsSelectedKeys === undefined) {
      return;
    } else {
      setState(function (prev) {
        if ((0, _index.objectIs)(prev.selectedKeys, propsSelectedKeys)) {
          return null;
        } else {
          return {
            selectedKeys: propsSelectedKeys
          };
        }
      });
    }
  }, [propsSelectedKeys]);
  (0, _react.useEffect)(function () {
    if (propsExpandeKeys === undefined) {
      return;
    } else {
      setState(function (prev) {
        if ((0, _index.objectIs)(prev.expandedKeys, propsExpandeKeys)) {
          return null;
        } else {
          return {
            expandedKeys: propsExpandeKeys
          };
        }
      });
    }
  }, [propsExpandeKeys]);
  // 将 treeData 转换成 TreeData 格式
  var rawTreeData = (0, _react.useMemo)(function () {
    var treeData = propTreeData;
    if (typeof formatTreeData === 'function') {
      treeData = formatTreeData(propTreeData);
    } else if (fieldNames) {
      treeData = computedTreeData(propTreeData, fieldNames);
    }
    setState({
      flatTreeData: computedFlatTreeData(treeData)
    });
    return treeData;
  }, [propTreeData]);
  // 实时计算 Tree 组件的数据源
  var treeDataSource = (0, _react.useMemo)(function () {
    return filterTreeData(rawTreeData, deferSearchValue);
  }, [rawTreeData, deferSearchValue]);
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
      expandedKeys: (0, _toConsumableArray2.default)(new _set.default(newExpandedKeys))
    });
  }, [flatTreeData, deferSearchValue]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getParentKeys: function getParentKeys(key) {
        return _getParentKeys(key, flatTreeData);
      },
      getAllParentKeys: function getAllParentKeys() {
        var keys = [];
        if (checkable) {
          checkedKeys.forEach(function (key) {
            return keys.push.apply(keys, (0, _toConsumableArray2.default)(_getParentKeys(key, flatTreeData)));
          });
        } else {
          selectedKeys.forEach(function (key) {
            return keys.push.apply(keys, (0, _toConsumableArray2.default)(_getParentKeys(key, flatTreeData)));
          });
        }
        return (0, _toConsumableArray2.default)(new _set.default(keys));
      }
    };
  }, [checkedKeys, selectedKeys, flatTreeData, checkable]);
  // 点击 Tree 组件的复选框时触发
  var handleTreeCheck = (0, _react.useCallback)(function (checkedKeys) {
    setState({
      checkedKeys: checkedKeys,
      selectedKeys: checkedKeys
    });
    var allKeys = [];
    checkedKeys.forEach(function (key) {
      return allKeys.push.apply(allKeys, (0, _toConsumableArray2.default)(_getParentKeys(key, flatTreeData)));
    });
    onCheck === null || onCheck === void 0 || onCheck(checkedKeys, (0, _toConsumableArray2.default)(new _set.default(allKeys)));
  }, [flatTreeData]);
  var handleTreeSelect = (0, _react.useCallback)(function (selectedKeys) {
    setState({
      selectedKeys: selectedKeys
    });
    var allKeys = [];
    selectedKeys.forEach(function (key) {
      return allKeys.push.apply(allKeys, (0, _toConsumableArray2.default)(_getParentKeys(key, flatTreeData)));
    });
    onSelect === null || onSelect === void 0 || onSelect(selectedKeys, (0, _toConsumableArray2.default)(new _set.default(allKeys)));
  }, [flatTreeData]);
  // 手动展开/折叠 Tree 组件。
  var handleTreeExpand = (0, _react.useCallback)(function (newExpandedKeys) {
    setState({
      expandedKeys: newExpandedKeys
    });
    onExpand === null || onExpand === void 0 || onExpand(newExpandedKeys);
  }, []);
  var handleSearchChange = (0, _react.useCallback)(function (event) {
    var _context2;
    setState({
      searchValue: (0, _trim.default)(_context2 = event.target.value).call(_context2)
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showFilter ? ( /*#__PURE__*/_react.default.createElement(_input.default.Search, {
    style: {
      marginBottom: 8
    },
    onChange: handleSearchChange,
    placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u8FDB\u884C\u8FC7\u6EE4"
  })) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "qm-model-tree"
  }, /*#__PURE__*/_react.default.createElement(_tree.default, _objectSpread({
    checkable: checkable,
    onCheck: handleTreeCheck,
    checkedKeys: checkedKeys,
    treeData: treeDataSource,
    selectedKeys: selectedKeys,
    onSelect: handleTreeSelect,
    onExpand: handleTreeExpand,
    expandedKeys: expandedKeys
  }, restProps))));
}
var index = exports.default = /*#__PURE__*/(0, _react.forwardRef)(ModelTree);
// 对匹配的文本进行着色
function computedTitle(title, filterText) {
  var newTitle = title;
  if (!filterText) {
    return newTitle;
  } else if ((0, _indexOf.default)(title).call(title, filterText) >= 0) {
    newTitle = [];
    var ary = title.split(filterText);
    var length = ary.length;
    for (var i = 0; i < length; i++) {
      ary[i] && newTitle.push(ary[i]);
      if (i < length - 1) {
        // 相邻的两个元素之间才会添加
        newTitle.push( /*#__PURE__*/_react.default.createElement("span", {
          className: "qm-model-tree-node-rich",
          key: i
        }, filterText));
      }
    }
    newTitle = /*#__PURE__*/_react.default.createElement("span", null, newTitle);
  }
  return newTitle;
}
/**
 * 遍历所有节点，如果节点的 title 与 filterText 匹配，则将匹配的部分进行着色渲染
 * @param tree       Tree 组件的 treeData
 * @param filterText 查询条件
 */
function filterTreeData(tree, filterText) {
  var root = [];
  var parentNodes = [];
  var stack = (0, _index.isArray)(tree) ? (0, _toConsumableArray2.default)(tree) : [tree];
  /**
   * 使用深度优先遍历的方法进行遍历
   * 每次遍历节点时，都需要对 parentNodes 集合的最后一项 last 进行验证，是否为当前节点的 parentNode；
   * 如果 last 不是当前节点的 parentNode，那么就 pop() 掉 last，直到满足条件；
   * 这种情况一般出现在一条分支遍历结束后，并开始遍历其他分支的节点（例如：祖先节点是同一个节点，如图一中 B ==> C）时才会出现。
   * 找到当前节点的父节点，并将当前节点的副本添加到其父节点的 children 集合中的。
   */
  while (stack.length) {
    var currentParent = null;
    var _stack$shift = stack.shift(),
      title = _stack$shift.title,
      key = _stack$shift.key,
      parentKey = _stack$shift.parentKey,
      renderItem = _stack$shift.renderItem,
      _stack$shift$children = _stack$shift.children,
      children = _stack$shift$children === void 0 ? [] : _stack$shift$children,
      resetProps = (0, _objectWithoutProperties2.default)(_stack$shift, _excluded2);
    while (parentNodes.length) {
      var last = (0, _slice.default)(parentNodes).call(parentNodes, -1)[0];
      if (last.key === parentKey) {
        currentParent = last;
        break;
      } else {
        parentNodes.pop();
      }
    }
    var item = _objectSpread(_objectSpread({}, resetProps), {}, {
      key: key,
      parentKey: parentKey,
      title: computedTitle(title, filterText)
    });
    if (typeof renderItem === 'function') item.title = renderItem(item.title, item);
    // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
    if (currentParent) {
      if (!currentParent.children) currentParent.children = [];
      currentParent.children.push(item);
    } else {
      root.push(item);
    }
    var length = children.length;
    if (length > 0) parentNodes.push(item);
    while (length--) {
      stack.unshift(children[length]);
    }
  }
  return root;
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
    var _stack$shift2 = stack.shift(),
      key = _stack$shift2.key,
      parentKey = _stack$shift2.parentKey,
      title = _stack$shift2.title,
      children = _stack$shift2.children;
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
  return result;
}
function computedTreeData(tree, fieldNames) {
  var root = [];
  var parentNodes = [];
  var stack = (0, _index.isArray)(tree) ? (0, _toConsumableArray2.default)(tree) : [tree];
  var keyLabel = fieldNames.key,
    titleLabel = fieldNames.title,
    childrenLabel = fieldNames.children,
    parentKeyLabel = fieldNames.parentKey;
  while (stack.length) {
    var currentParent = null;
    var item = stack.shift();
    while (parentNodes.length) {
      var last = (0, _slice.default)(parentNodes).call(parentNodes, -1)[0];
      if (last.key === item[parentKeyLabel]) {
        currentParent = last;
        break;
      } else {
        parentNodes.pop();
      }
    }
    var node = _objectSpread(_objectSpread({}, item), {}, {
      key: item[keyLabel],
      title: item[titleLabel],
      parentKey: item[parentKeyLabel]
    });
    delete node[childrenLabel];
    // 如果 currentParent 不存在，说明当前节点就是根节点，此时我们只要将节点添加到 root 集合中即可。
    if (currentParent) {
      if (!currentParent.children) currentParent.children = [];
      currentParent.children.push(node);
    } else {
      root.push(node);
    }
    var children = item[childrenLabel] || [];
    var length = children.length;
    if (length > 0) parentNodes.push(node);
    while (length--) {
      stack.unshift(children[length]);
    }
  }
  return root;
}