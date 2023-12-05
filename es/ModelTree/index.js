import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.array.unshift.js';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _Set from '@babel/runtime-corejs3/core-js-stable/set';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import React, { forwardRef, useDeferredValue, useEffect, useMemo, useImperativeHandle, useCallback } from 'react';
import useReducer from '../utils/useReducer.js';
import { Input, Tree } from 'antd';
import { objectIs, isArray } from '../utils/index.js';
import './index.css';

var _excluded = ["onChange", "onExpand", "checkable", "formatTreeData", "showFilter", "treeData", "checkedKeys", "expandedKeys", "selectedKeys"],
  _excluded2 = ["title", "key", "parentKey", "children", "renderDOM"];
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
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
    flatTreeData: new _Map()
  };
}
/**
 * 二次封装的 Tree 组件
 * @param treeData     组件的数据源，数据格式为：TreeData。
 * @param checkedKeys  受控，被选中的子节点集合。
 * @param checkable    是否展示复选框。
 * @param onChange     事件回调函数，当修改被选中的子节点时触发。
 */
function ModelTree(props, ref) {
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var searchValue = state.searchValue,
    checkedKeys = state.checkedKeys,
    expandedKeys = state.expandedKeys,
    selectedKeys = state.selectedKeys,
    flatTreeData = state.flatTreeData;
  var onChange = props.onChange,
    onExpand = props.onExpand,
    checkable = props.checkable,
    formatTreeData = props.formatTreeData,
    _props$showFilter = props.showFilter,
    showFilter = _props$showFilter === void 0 ? true : _props$showFilter,
    propTreeData = props.treeData,
    propCheckedKeys = props.checkedKeys,
    propsExpandeKeys = props.expandedKeys,
    propsSelectedKeys = props.selectedKeys,
    restProps = _objectWithoutProperties(props, _excluded);
  var deferSearchValue = useDeferredValue(searchValue);
  useEffect(function () {
    if (propCheckedKeys === undefined) {
      return;
    } else {
      setState(function (prev) {
        if (objectIs(prev.checkedKeys, propCheckedKeys)) {
          return null;
        } else {
          return {
            checkedKeys: propCheckedKeys
          };
        }
      });
    }
  }, [propCheckedKeys]);
  useEffect(function () {
    if (propsSelectedKeys === undefined) {
      return;
    } else {
      setState(function (prev) {
        if (objectIs(prev.selectedKeys, propsSelectedKeys)) {
          return null;
        } else {
          return {
            selectedKeys: propsSelectedKeys
          };
        }
      });
    }
  }, [propsSelectedKeys]);
  useEffect(function () {
    if (propsExpandeKeys === undefined) {
      return;
    } else {
      setState(function (prev) {
        if (objectIs(prev.expandedKeys, propsExpandeKeys)) {
          return null;
        } else {
          return {
            expandedKeys: propsExpandeKeys
          };
        }
      });
    }
  }, [propsExpandeKeys]);
  var treeData = useMemo(function () {
    // 如果 formatTreeData 不是一个函数，那表示 propTreeData 数据类型就是 TreeData[], 所以无需再进行格式化处理了。
    var treeData = typeof formatTreeData === 'function' ? formatTreeData(propTreeData) : propTreeData;
    setState({
      flatTreeData: computedFlatTreeData(treeData)
    });
    return treeData;
  }, [propTreeData]);
  // 实时计算 Tree 组件的数据源
  var computeTreeData = useMemo(function () {
    return filterTreeData(treeData, deferSearchValue);
  }, [treeData, deferSearchValue]);
  useEffect(function () {
    if (!deferSearchValue) return;
    // 根据条件过滤出目标节点的父节点的 key。
    var newExpandedKeys = [];
    flatTreeData.forEach(function (item) {
      var _context;
      if (_indexOfInstanceProperty(_context = item.title).call(_context, deferSearchValue) > -1) {
        var parentkeys = _getParentKeys(item.key, flatTreeData);
        parentkeys && newExpandedKeys.push.apply(newExpandedKeys, _toConsumableArray(parentkeys));
      }
    });
    // 无需去重，Tree 组件内部会进行处理
    setState({
      expandedKeys: newExpandedKeys
    });
  }, [flatTreeData, deferSearchValue]);
  useImperativeHandle(ref, function () {
    return {
      getParentKeys: function getParentKeys(key) {
        return _getParentKeys(key, flatTreeData);
      },
      getAllParentKeys: function getAllParentKeys() {
        var keys = [];
        if (checkable) {
          checkedKeys.forEach(function (key) {
            return keys.push.apply(keys, _toConsumableArray(_getParentKeys(key, flatTreeData)));
          });
        } else {
          selectedKeys.forEach(function (key) {
            return keys.push.apply(keys, _toConsumableArray(_getParentKeys(key, flatTreeData)));
          });
        }
        return _toConsumableArray(new _Set(keys));
      }
    };
  }, [checkedKeys, selectedKeys, flatTreeData, checkable]);
  // 点击 Tree 组件的复选框时触发
  var handleTreeCheck = useCallback(function (checkedKeys) {
    // isInternalModifiedCheckedKeys.current = true;
    setState({
      checkedKeys: checkedKeys
    });
    var allKeys = [];
    checkedKeys.forEach(function (key) {
      return allKeys.push.apply(allKeys, _toConsumableArray(_getParentKeys(key, flatTreeData)));
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(checkedKeys, _toConsumableArray(new _Set(allKeys)));
  }, [flatTreeData]);
  var handleTreeSelect = useCallback(function (selectedKeys) {
    // isInternalModifiedSelectedKeys.current = true;
    setState({
      selectedKeys: selectedKeys
    });
    var allKeys = [];
    selectedKeys.forEach(function (key) {
      return allKeys.push.apply(allKeys, _toConsumableArray(_getParentKeys(key, flatTreeData)));
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(selectedKeys, _toConsumableArray(new _Set(allKeys)));
  }, [flatTreeData]);
  // 手动展开/折叠 Tree 组件。
  var handleTreeExpand = useCallback(function (newExpandedKeys) {
    // isInternalModifiedExpandeKeys.current = false;
    setState({
      expandedKeys: newExpandedKeys
    });
    onExpand === null || onExpand === void 0 ? void 0 : onExpand(newExpandedKeys);
  }, []);
  var handleSearchChange = useCallback(function (event) {
    var _context2;
    setState({
      searchValue: _trimInstanceProperty(_context2 = event.target.value).call(_context2)
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showFilter ? /*#__PURE__*/React.createElement(Input.Search, {
    style: {
      marginBottom: 8
    },
    onChange: handleSearchChange,
    placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u8FDB\u884C\u8FC7\u6EE4"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "qm-model-tree"
  }, /*#__PURE__*/React.createElement(Tree, _objectSpread({
    checkable: checkable,
    onCheck: handleTreeCheck,
    checkedKeys: checkedKeys,
    treeData: computeTreeData,
    selectedKeys: selectedKeys,
    onSelect: handleTreeSelect,
    onExpand: handleTreeExpand,
    expandedKeys: expandedKeys
  }, restProps))));
}
var index = /*#__PURE__*/forwardRef(ModelTree);
/**
 * 过滤、筛选出目标节点，匹配的内容将被标注为红色
 * @param treeData    Tree 组件的 treeData
 * @param searchValue 查询条件
 */
function filterTreeData(treeData, searchValue) {
  return _mapInstanceProperty(treeData).call(treeData, function (item) {
    var title = item.title,
      key = item.key,
      parentKey = item.parentKey,
      children = item.children,
      renderDOM = item.renderDOM,
      props = _objectWithoutProperties(item, _excluded2);
    var newTitle = title;
    if (_indexOfInstanceProperty(title).call(title, searchValue) >= 0) {
      newTitle = [];
      var ary = title.split(searchValue);
      var length = ary.length;
      for (var i = 0; i < length; i++) {
        ary[i] && newTitle.push(ary[i]);
        if (i < length - 1) {
          // 相邻的两个元素之间才会添加
          newTitle.push( /*#__PURE__*/React.createElement("span", {
            className: "qm-model-tree-node-rich",
            key: i
          }, searchValue));
        }
      }
      newTitle = /*#__PURE__*/React.createElement("span", null, newTitle);
    }
    if (typeof renderDOM === 'function') newTitle = renderDOM(newTitle, item);
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
  var stack = isArray(tree) ? _toConsumableArray(tree) : [tree];
  var result = new _Map();
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
  return result;
}

export { index as default };
