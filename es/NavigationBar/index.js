import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.to-string.js';
import { CloseOutlined, EllipsisOutlined, AppstoreOutlined } from '@ant-design/icons';
import React, { memo, useRef, useEffect, useCallback, useMemo } from 'react';
import { debounce, elementMatches } from '../utils/index.js';
import useReducer from '../utils/useReducer.js';
import { Dropdown } from 'antd';
import './index.css';

function initialState() {
  return {
    hiddenNavBarList: [],
    showOthers: false,
    randomKey: ''
  };
}
function NavigationBar(props) {
  var activeKey = props.activeKey,
    onChange = props.onChange,
    onDelete = props.onDelete,
    navBarList = props.navBarList;
  var _useReducer = useReducer(initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    _useReducer2$ = _useReducer2[0],
    hiddenNavBarList = _useReducer2$.hiddenNavBarList,
    showOthers = _useReducer2$.showOthers,
    randomKey = _useReducer2$.randomKey,
    setState = _useReducer2[1];
  // 指针指示器
  var indicatorRef = useRef(0);
  // siliderBar 偏移量
  var translateXRef = useRef(0);
  // sliderBar 是否可以滑动
  var notSlideRef = useRef(true);
  // sliderBar 节点对象
  var sliderBarRef = useRef();
  // 工具栏容器节点，
  var toolBarBoxRef = useRef();
  // sliderBar 容器节点对象
  var sliderBarBoxRef = useRef();
  // 指针指示器节点对象
  var indicatorNodeRef = useRef();
  // props.navBarList 的复制，在组件内的各个 hook 中，消除对 props.navBarList 的依赖
  var navBarListRef = useRef([]);
  // 统计 sliderBar 中每一个元素的 { offsetWidth, offsetLeft }
  var clientRectsRef = useRef([]);
  /**
   * 监听 resize 事件，修改  randomKey；
   * 并在其他 useEffect 钩子依赖中添加 randomKey；
   * 从而每次 resize 事件触发后，都会重新渲染 NavigationBar；
   */
  useEffect(function () {
    var _sliderBarBoxRef$curr, _sliderBarBoxRef$curr2;
    function handleResize() {
      setState({
        randomKey: Math.random().toString(32)
      });
    }
    function handleWheel(event) {
      event.preventDefault();
    }
    var onResize = debounce(handleResize, 300);
    window.addEventListener('resize', onResize);
    (_sliderBarBoxRef$curr = sliderBarBoxRef.current) === null || _sliderBarBoxRef$curr === void 0 || (_sliderBarBoxRef$curr2 = _sliderBarBoxRef$curr.addEventListener) === null || _sliderBarBoxRef$curr2 === void 0 || _sliderBarBoxRef$curr2.call(_sliderBarBoxRef$curr, 'wheel', handleWheel, false);
    return function () {
      var _sliderBarBoxRef$curr3, _sliderBarBoxRef$curr4;
      window.removeEventListener('resize', onResize);
      (_sliderBarBoxRef$curr3 = sliderBarBoxRef.current) === null || _sliderBarBoxRef$curr3 === void 0 || (_sliderBarBoxRef$curr4 = _sliderBarBoxRef$curr3.removeEventListener) === null || _sliderBarBoxRef$curr4 === void 0 || _sliderBarBoxRef$curr4.call(_sliderBarBoxRef$curr3, 'wheel', handleWheel, false);
    };
  }, []);
  /**
   * 更新 notSlideRef；
   * 更新 navBarListRef；
   * 更新 clientRectsRef；
   * 更新 sliderBar 的偏移量；
   * 更新 indicatorNodeRef 样式;
   * 更新 sliderBarBox 类名（隐藏或展示容器左右两边的阴影）；
   */
  useEffect(function () {
    var clientRects = [];
    var sliderBarItems = sliderBarRef.current.children;
    for (var i = 0; i < sliderBarItems.length - 1; i++) {
      var _sliderBarItems$i = sliderBarItems[i],
        offsetWidth = _sliderBarItems$i.offsetWidth,
        offsetLeft = _sliderBarItems$i.offsetLeft;
      clientRects.push({
        offsetWidth: offsetWidth,
        offsetLeft: offsetLeft
      });
    }
    navBarListRef.current = navBarList;
    clientRectsRef.current = clientRects;
    var sliderBarWidth = computedSliderBarWidth();
    // const sliderBarBoxWidth = sliderBarBoxRef.current.offsetWidth;
    // 如果 sliderBar 容器长度大于 sliderBar 长度，则 sliderBar 不能滑动
    notSlideRef.current = sliderBarWidth <= sliderBarBoxRef.current.offsetWidth;
    /**
     * 如果 notSlideRef.current 为 true，则 sliderBar 不能滑动。
     * 此时，应该将 sliderBarBox 容器左右两边的 shadow 移除，并将 sliderBar 偏移量设置为 0。
     */
    if (notSlideRef.current) {
      translateXRef.current = 0;
      sliderBarRef.current.style.cssText = 'transform: translateX(0px);';
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-left-shadow');
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
      setState({
        showOthers: false
      });
      toolBarBoxRef.current.style.width = '80px';
    } else {
      setState({
        showOthers: true
      });
      toolBarBoxRef.current.style.width = '110px';
      var maxDistance = sliderBarWidth - sliderBarBoxRef.current.offsetWidth;
      // sliderBar 偏移量不能大于最大值，否则应该重新计算偏移量。
      if (translateXRef.current > maxDistance) {
        translateXRef.current = maxDistance;
        // 说明此时 sliderBar 已经滚动至最右边了，所以此时应该将 sliderBarBox 容器右边的 shadow 移除。
        sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
        sliderBarRef.current.style.cssText = "transform: translateX(".concat(-maxDistance, "px);");
      }
    }
    // 更新指针样式
    updateIndicator();
  }, [navBarList, randomKey]);
  // 每当 activeKey 变化时，都应该根据 activeKey 的值重新计算 sliderBar 的偏移量
  useEffect(function () {
    var _context, _clientRects$boundary, _clientRects$boundary2;
    var clientRects = clientRectsRef.current;
    // sliderBar 当前指针的位置（下标）
    var indicator = _findIndexInstanceProperty(_context = navBarListRef.current).call(_context, function (item) {
      return item.key === activeKey;
    }) || 0;
    indicatorRef.current = indicator;
    // 更新指针样式
    updateIndicator();
    /**
     * 如果 notSlideRef.current 为 true，则 sliderBar 不能滑动。
     * 此时，应该将 sliderBarBox 容器左右两边的 shadow 移除，并将 sliderBar 偏移量设置为 0。
     */
    if (notSlideRef.current) {
      translateXRef.current = 0;
      sliderBarRef.current.style.cssText = 'transform: translateX(0px);';
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-left-shadow');
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
      return;
    }
    var cssText = '';
    // 边界下标
    var boundaryIndex = -1;
    // sliderBar 的长度
    var sliderBarWidth = computedSliderBarWidth();
    // sliderBar 容器的长度
    var sliderBarBoxWidth = sliderBarBoxRef.current.offsetWidth;
    // sliderBar 最大偏移不能超过该值。
    var maxDistance = sliderBarWidth - sliderBarBoxWidth;
    for (var i = 0; i < clientRects.length; i++) {
      var _clientRects$i = clientRects[i],
        offsetWidth = _clientRects$i.offsetWidth,
        offsetLeft = _clientRects$i.offsetLeft;
      // 边界下标的计算方式：以 sliderBar 中第一个不可见（或部分不可见）的项开始计算，再往前倒 2 项就是边界下标。
      if (boundaryIndex < 0 && offsetLeft + offsetWidth >= sliderBarBoxWidth) boundaryIndex = i - 2;
    }
    // 边界偏移距离，sliderBar 的偏移量计算都根据该值进行计算。
    var boundaryDistance = (_clientRects$boundary = (_clientRects$boundary2 = clientRects[boundaryIndex]) === null || _clientRects$boundary2 === void 0 ? void 0 : _clientRects$boundary2.offsetLeft) !== null && _clientRects$boundary !== void 0 ? _clientRects$boundary : 0;
    /**
     * sliderBar 的偏移量根据边界下标的值进行计算;
     * props.indicator <= boundaryIndex，则偏移量为 0
     */
    if (indicator <= boundaryIndex) {
      translateXRef.current = 0;
      cssText = "transform: translateX(0);";
      sliderBarBoxRef.current.classList.add('qm-nav-bar-content-right-shadow');
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-left-shadow');
    } else {
      // sliderBar 的偏移量计算是根据 indicator 对应项的 offsetLeft - boundaryDistance；
      var distX = clientRects[indicator].offsetLeft - boundaryDistance;
      if (distX >= maxDistance) {
        distX = maxDistance;
        sliderBarBoxRef.current.classList.add('qm-nav-bar-content-left-shadow');
        sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
      } else {
        sliderBarBoxRef.current.classList.add('qm-nav-bar-content-left-shadow');
        sliderBarBoxRef.current.classList.add('qm-nav-bar-content-right-shadow');
      }
      translateXRef.current = distX;
      cssText = "transform: translateX(".concat(-distX, "px);");
    }
    sliderBarRef.current.style.cssText = cssText;
  }, [activeKey, randomKey]);
  // 点击 navBar
  var handleTabNavBar = function handleTabNavBar(event) {
    var currentTarget = event.currentTarget,
      target = event.target;
    var isDelete = false;
    var key = null;
    var indicator = null;
    while (target && target !== document && target !== currentTarget) {
      var _target, _target$getAttribute, _target2, _target3, _target3$getAttribute, _target4;
      if (elementMatches(target, '.qm-nav-bar-delete-icon')) isDelete = true;
      key = (_target = target) === null || _target === void 0 || (_target$getAttribute = (_target2 = _target).getAttribute) === null || _target$getAttribute === void 0 ? void 0 : _target$getAttribute.call(_target2, 'data-key');
      indicator = Number((_target3 = target) === null || _target3 === void 0 || (_target3$getAttribute = (_target4 = _target3).getAttribute) === null || _target3$getAttribute === void 0 ? void 0 : _target3$getAttribute.call(_target4, 'data-indicator'));
      if (key && indicator >= 0) break;
      target = target.parentNode;
    }
    if (typeof key !== 'string' || typeof indicator !== 'number') return;
    if (indicatorRef.current >= indicator) indicatorRef.current -= 1;
    if (isDelete) {
      var newNavBarList = _toConsumableArray(navBarList);
      _spliceInstanceProperty(newNavBarList).call(newNavBarList, indicator, 1);
      onDelete === null || onDelete === void 0 || onDelete(newNavBarList);
      // 如果删除项不是当前选中项，则不需要触发 onChange 事件
      if (activeKey === key) {
        if (indicator >= navBarList.length - 1) {
          var _navBarList;
          key = (_navBarList = navBarList[indicator - 1]) === null || _navBarList === void 0 ? void 0 : _navBarList.key;
        } else {
          var _navBarList2;
          key = (_navBarList2 = navBarList[indicator + 1]) === null || _navBarList2 === void 0 ? void 0 : _navBarList2.key;
        }
      } else {
        return;
      }
    }
    onChange === null || onChange === void 0 || onChange(key);
  };
  // 当鼠标移入 ... icon 时，将 sliderBar 中不可见的元素添加到 hiddenNavBarList 集合中。
  var handleMouseEnter = useCallback(function () {
    var translateX = translateXRef.current;
    var clientRects = clientRectsRef.current;
    var containerWidth = sliderBarBoxRef.current.offsetWidth;
    if (translateX === 0) {
      /**
       * translateX === 0 时，只需要将 offsetLeft + offsetWidth 大于等于 sliderBarBox 容器长度的元素刷选出来即可，
       * 这部分元素此时是不可见的，将这部分元素添加到 hiddenNavBarList。
       */
      var index = 0;
      for (var i = 0; i < clientRects.length; i++) {
        var _clientRects$i2 = clientRects[i],
          offsetLeft = _clientRects$i2.offsetLeft,
          offsetWidth = _clientRects$i2.offsetWidth;
        if (offsetLeft + offsetWidth >= containerWidth) {
          index = i;
          break;
        }
      }
      setState({
        hiddenNavBarList: _sliceInstanceProperty(navBarList).call(navBarList, index)
      });
    } else {
      /**
       * 当 translateX > 0 时，
       * 如果元素的 offsetLeft 小于 translateX，则说明该元素不可见（或至少是部分不可见）；
       * 另外，如果元素的 offsetLeft + offsetWidth 大于 containerWidth + translateX 则说明该元素不可见（或部分不可见）；
       * 将这两个部分的元素添加到 hiddenNavBarList。
       */
      var indexList = [];
      var _hiddenNavBarList = [];
      for (var _i = 0; _i < clientRects.length; _i++) {
        var _clientRects$_i = clientRects[_i],
          _offsetLeft = _clientRects$_i.offsetLeft,
          _offsetWidth = _clientRects$_i.offsetWidth;
        if (_offsetLeft < translateX) {
          indexList.push(_i);
        } else if (_offsetLeft + _offsetWidth > containerWidth + translateX) {
          indexList.push(_i);
        }
      }
      for (var j = 0; j < indexList.length; j++) {
        _hiddenNavBarList.push(navBarList[indexList[j]]);
      }
      setState({
        hiddenNavBarList: _hiddenNavBarList
      });
    }
  }, [navBarList]);
  // 鼠标滚动触发 sliderBar 滚动
  var handleMouseWheel = function handleMouseWheel(event) {
    event.preventDefault();
    if (notSlideRef.current) return;
    var step = 100;
    var deltaY = event.deltaY;
    var maxDistance = sliderBarRef.current.scrollWidth - sliderBarBoxRef.current.offsetWidth;
    var translateX = translateXRef.current;
    if (deltaY > 0) {
      // 此时 sliderBar 先左移动
      translateX += step;
    } else if (deltaY < 0) {
      // 此时 sliderBar 先右移动
      translateX -= step;
    }
    if (translateX <= 0) {
      translateX = 0;
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-left-shadow');
      sliderBarBoxRef.current.classList.add('qm-nav-bar-content-right-shadow');
    } else if (translateX > maxDistance) {
      translateX = maxDistance;
      sliderBarBoxRef.current.classList.add('qm-nav-bar-content-left-shadow');
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
    } else {
      sliderBarBoxRef.current.classList.add('qm-nav-bar-content-left-shadow');
      sliderBarBoxRef.current.classList.add('qm-nav-bar-content-right-shadow');
    }
    translateXRef.current = translateX;
    sliderBarRef.current.style.cssText = "transform: translateX(".concat(-translateX, "px);");
  };
  // 更新指针样式
  var updateIndicator = function updateIndicator() {
    var _clientRectsRef$curre, _context2;
    var indicator = indicatorRef.current;
    var _ref = (_clientRectsRef$curre = clientRectsRef.current[indicator]) !== null && _clientRectsRef$curre !== void 0 ? _clientRectsRef$curre : {},
      _ref$offsetLeft = _ref.offsetLeft,
      offsetLeft = _ref$offsetLeft === void 0 ? 0 : _ref$offsetLeft,
      _ref$offsetWidth = _ref.offsetWidth,
      offsetWidth = _ref$offsetWidth === void 0 ? 0 : _ref$offsetWidth;
    indicatorNodeRef.current.style.cssText = _concatInstanceProperty(_context2 = "width: ".concat(offsetWidth, "px; transform: translateX(")).call(_context2, offsetLeft, "px);");
  };
  // 计算 sliderBar 内容的总长度
  var computedSliderBarWidth = function computedSliderBarWidth() {
    var clientRects = clientRectsRef.current;
    var _ref2 = clientRects[clientRects.length - 1] || {},
      _ref2$offsetWidth = _ref2.offsetWidth,
      offsetWidth = _ref2$offsetWidth === void 0 ? 0 : _ref2$offsetWidth,
      _ref2$offsetLeft = _ref2.offsetLeft,
      offsetLeft = _ref2$offsetLeft === void 0 ? 0 : _ref2$offsetLeft;
    return offsetWidth + offsetLeft;
  };
  var appStoreDropdownMenu = useMemo(function () {
    var handleDeleteOther = function handleDeleteOther() {
      var newList = _filterInstanceProperty(navBarList).call(navBarList, function (item, index) {
        return index === 0 || item.key === activeKey;
      });
      onDelete === null || onDelete === void 0 || onDelete(newList);
      indicatorRef.current = newList.length > 1 ? 1 : 0;
    };
    var handleDeleteAll = function handleDeleteAll() {
      indicatorRef.current = 0;
      onChange === null || onChange === void 0 || onChange(navBarList[0].key);
      onDelete === null || onDelete === void 0 || onDelete(_sliceInstanceProperty(navBarList).call(navBarList, 0, 1));
    };
    return {
      items: [{
        key: '1',
        label: ( /*#__PURE__*/React.createElement("div", {
          style: {
            width: 60
          },
          onClick: handleDeleteOther
        }, "\u5173\u95ED\u5176\u4ED6"))
      }, {
        key: '2',
        label: ( /*#__PURE__*/React.createElement("div", {
          style: {
            width: 60
          },
          onClick: handleDeleteAll
        }, "\u5173\u95ED\u6240\u6709"))
      }]
    };
  }, [activeKey, navBarList, onDelete, onChange]);
  var otherDropdownMenu = useMemo(function () {
    var _navBarList$;
    var handleClick = function handleClick(event) {
      var key = event.currentTarget.getAttribute('data-key');
      onChange === null || onChange === void 0 || onChange(key);
    };
    var handleDelete = function handleDelete(event) {
      event.preventDefault();
      var index;
      var key = event.currentTarget.getAttribute('data-key');
      var newList = _filterInstanceProperty(navBarList).call(navBarList, function (item, idx) {
        if (item.key === key) {
          index = idx;
          return false;
        }
        return true;
      });
      if (indicatorRef.current > index) indicatorRef.current -= 1;
      onDelete === null || onDelete === void 0 || onDelete(newList);
    };
    var isDefaultKey = (_navBarList$ = navBarList[0]) === null || _navBarList$ === void 0 ? void 0 : _navBarList$.key;
    return {
      items: _mapInstanceProperty(hiddenNavBarList).call(hiddenNavBarList, function (item) {
        return {
          key: item.id,
          label: ( /*#__PURE__*/React.createElement("div", {
            className: "qm-nav-bar-dropdown-menu-item"
          }, /*#__PURE__*/React.createElement("div", {
            title: item.label,
            "data-key": item.key,
            onClick: handleClick,
            className: "qm-nav-bar-dropdown-menu-item-title"
          }, item.label), /*#__PURE__*/React.createElement(CloseOutlined, {
            "data-key": item.key,
            onClick: handleDelete,
            className: "qm-nav-bar-delete-icon",
            style: {
              display: item.key === isDefaultKey ? 'none' : ''
            }
          })))
        };
      })
    };
  }, [hiddenNavBarList, navBarList, onDelete, onChange]);
  return /*#__PURE__*/React.createElement("section", {
    className: "qm-nav-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-nav-bar-content",
    ref: sliderBarBoxRef,
    onWheel: handleMouseWheel
  }, /*#__PURE__*/React.createElement("ul", {
    className: "qm-nav-bar-content-list",
    onClick: handleTabNavBar,
    ref: sliderBarRef
  }, _mapInstanceProperty(navBarList).call(navBarList, function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: "qm-nav-bar-content-list-item".concat(activeKey === item.key ? ' active' : ''),
      key: item.key,
      "data-key": item.key,
      "data-indicator": index
    }, item.label, /*#__PURE__*/React.createElement(CloseOutlined, {
      className: "qm-nav-bar-delete-icon",
      style: {
        display: index === 0 ? 'none' : ''
      }
    }));
  }), /*#__PURE__*/React.createElement("li", {
    className: "qm-nav-bar-indicator",
    ref: indicatorNodeRef
  }))), /*#__PURE__*/React.createElement("div", {
    className: "qm-nav-bar-toolbar",
    ref: toolBarBoxRef
  }, /*#__PURE__*/React.createElement(Dropdown, {
    placement: "bottom",
    menu: otherDropdownMenu
  }, /*#__PURE__*/React.createElement(EllipsisOutlined, {
    onMouseEnter: handleMouseEnter,
    className: "qm-nav-bar-toolbar-other".concat(showOthers ? '' : ' hide')
  })), /*#__PURE__*/React.createElement(Dropdown, {
    placement: "bottom",
    menu: appStoreDropdownMenu
  }, /*#__PURE__*/React.createElement(AppstoreOutlined, {
    className: "qm-nav-bar-toolbar-appstore"
  }))));
}
var index = /*#__PURE__*/memo(NavigationBar);

export { index as default };
