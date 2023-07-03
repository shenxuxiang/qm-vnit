import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.array.unshift.js';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _sortInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/sort';
import _Set from '@babel/runtime-corejs3/core-js-stable/set';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import React, { memo, useDeferredValue, useRef, useEffect, useMemo, useCallback } from 'react';
import { isArray } from '../utils/index.js';
import useReducer from '../utils/useReducer.js';
import { Input, Tree } from 'antd';
import './index.css';

var _excluded = ["id", "parentId", "name", "children"],
  _excluded2 = ["title", "key", "parentKey", "children"];
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
function computePropTreeData(sourceList) {
  var _sourceList$map;
  return (_sourceList$map = sourceList === null || sourceList === void 0 ? void 0 : _mapInstanceProperty(sourceList).call(sourceList, function (item) {
    var id = item.id,
      parentId = item.parentId,
      name = item.name,
      children = item.children,
      props = _objectWithoutProperties(item, _excluded);
    return _objectSpread({
      key: id,
      title: name,
      parentKey: parentId,
      children: children ? computePropTreeData(children) : undefined
    }, props);
  })) !== null && _sourceList$map !== void 0 ? _sourceList$map : [];
}
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
 * @param data 所属有节点的集合，这是一个一维数组
 */
function getParentKey(key, data) {
  var idx = _findIndexInstanceProperty(data).call(data, function (item) {
    return item.key === key;
  });
  if (idx <= 0) return null;
  var parentKeys = [];
  var pk = data[idx].parentKey;
  while (idx--) {
    var k = data[idx].key;
    if (pk === k) {
      parentKeys.unshift(k);
      pk = data[idx].parentKey;
    }
  }
  return parentKeys;
}
/**
 * 将 TreeData 数据拉平为一维数组
 * @param tree treeData
 */
function flatTreeData(tree) {
  var stack = isArray(tree) ? _toConsumableArray(tree) : [tree];
  var result = [];
  while (stack.length) {
    var _stack$shift = stack.shift(),
      key = _stack$shift.key,
      parentKey = _stack$shift.parentKey,
      title = _stack$shift.title,
      children = _stack$shift.children;
    result.push({
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
  return _sortInstanceProperty(result).call(result, function (a, b) {
    return Number(a.key) - Number(b.key);
  });
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
    flatArrayTreeData: []
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
function ModelTree(props) {
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    setState = _useReducer2[1];
  var searchValue = state.searchValue,
    checkedKeys = state.checkedKeys,
    expandedKeys = state.expandedKeys,
    flatArrayTreeData = state.flatArrayTreeData;
  var onChange = props.onChange,
    checkable = props.checkable,
    _props$filterOption = props.filterOption,
    filterOption = _props$filterOption === void 0 ? true : _props$filterOption,
    propTreeData = props.treeData,
    propCheckedKeys = props.checkedKeys,
    _props$formatData = props.formatData,
    formatData = _props$formatData === void 0 ? computePropTreeData : _props$formatData;
  var deferSearchValue = useDeferredValue(searchValue);
  // 是否组件内容修改了 checkedKeys
  var isInternalModifiedCheckedKeys = useRef(false);
  useEffect(function () {
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
  var treeData = useMemo(function () {
    // 如果 formatData 不是一个函数，那表示 propTreeData 数据类型就是 TreeData[], 所以无需再进行格式化处理了。
    var treeData = typeof formatData === 'function' ? formatData(propTreeData) : propTreeData;
    setState({
      flatArrayTreeData: flatTreeData(treeData)
    });
    return treeData;
  }, [propTreeData]);
  // 实时计算 Tree 组件的数据源
  var computeTreeData = useMemo(function () {
    if (!deferSearchValue) return treeData;
    if (typeof filterOption === 'function') {
      return filterOption(treeData, deferSearchValue);
    } else {
      return filterTreeData(treeData, deferSearchValue);
    }
  }, [treeData, deferSearchValue, filterOption]);
  useEffect(function () {
    if (!deferSearchValue) return;
    // 根据条件过滤出目标节点的父节点的 key。
    var newExpandedKeys = [];
    flatArrayTreeData.forEach(function (item) {
      var _context;
      if (_indexOfInstanceProperty(_context = item.title).call(_context, deferSearchValue) > -1) {
        var parentkeys = getParentKey(item.key, flatArrayTreeData);
        parentkeys && newExpandedKeys.push.apply(newExpandedKeys, _toConsumableArray(parentkeys));
      }
    });
    // 无需去重，Tree 组件内部会进行处理
    setState({
      expandedKeys: newExpandedKeys
    });
  }, [flatArrayTreeData, deferSearchValue]);
  // 点击 Tree 组件的复选框时触发
  var handleTreeCheck = useCallback(function (checkedKeys) {
    isInternalModifiedCheckedKeys.current = true;
    setState({
      checkedKeys: checkedKeys
    });
    var allKeys = [];
    checkedKeys.forEach(function (key) {
      var keys = getParentKey(key, flatArrayTreeData);
      keys && allKeys.push.apply(allKeys, _toConsumableArray(keys));
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(checkedKeys, _toConsumableArray(new _Set(_concatInstanceProperty(allKeys).call(allKeys, checkedKeys))));
  }, [flatArrayTreeData]);
  // 手动展开/折叠 Tree 组件。
  var handleTreeExpand = useCallback(function (newExpandedKeys) {
    setState({
      expandedKeys: newExpandedKeys
    });
  }, []);
  var handleSearchChange = useCallback(function (event) {
    var _context2;
    setState({
      searchValue: _trimInstanceProperty(_context2 = event.target.value).call(_context2)
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !!filterOption && /*#__PURE__*/React.createElement(Input.Search, {
    style: {
      marginBottom: 8
    },
    onChange: handleSearchChange,
    placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u8FDB\u884C\u8FC7\u6EE4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "qm-model-tree"
  }, /*#__PURE__*/React.createElement(Tree, {
    checkable: checkable,
    onCheck: handleTreeCheck,
    checkedKeys: checkedKeys,
    treeData: computeTreeData,
    onExpand: handleTreeExpand,
    expandedKeys: expandedKeys
  })));
}
var index = /*#__PURE__*/memo(ModelTree);

export { index as default };
