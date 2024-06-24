import { CloseOutlined, AppstoreOutlined, EllipsisOutlined } from '@ant-design/icons';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { elementMatches, debounce } from '@/utils';
import useReducer from '@/utils/useReducer';
import { Dropdown } from 'antd';
import './index.less';

type NavigationBarProps = {
  activeKey?: string;
  navBarList: NavBarList;
  onChange?: (activeKey: any) => void;
  onDelete?: (sourceList: NavBarList) => void;
};

type ClientRects = {
  offsetWidth: number;
  offsetLeft: number;
}[];

export type NavBarList = {
  key: string;
  label: string;
  [propName: string]: any;
}[];

function initialState() {
  return {
    hiddenNavBarList: [] as NavBarList,
    showOthers: false,
    randomKey: '',
  };
}

function NavigationBar(props: NavigationBarProps) {
  const { activeKey, onChange, onDelete, navBarList } = props;
  const [{ hiddenNavBarList, showOthers, randomKey }, setState] = useReducer(initialState);

  // 指针指示器
  const indicatorRef = useRef(0);
  // siliderBar 偏移量
  const translateXRef = useRef(0);
  // sliderBar 是否可以滑动
  const notSlideRef = useRef(true);
  // sliderBar 节点对象
  const sliderBarRef = useRef<any>();
  // 工具栏容器节点，
  const toolBarBoxRef = useRef<any>();
  // sliderBar 容器节点对象
  const sliderBarBoxRef = useRef<any>();
  // 指针指示器节点对象
  const indicatorNodeRef = useRef<any>();
  // props.navBarList 的复制，在组件内的各个 hook 中，消除对 props.navBarList 的依赖
  const navBarListRef = useRef<NavBarList>([]);
  // 统计 sliderBar 中每一个元素的 { offsetWidth, offsetLeft }
  const clientRectsRef = useRef<ClientRects>([]);

  /**
   * 监听 resize 事件，修改  randomKey；
   * 并在其他 useEffect 钩子依赖中添加 randomKey；
   * 从而每次 resize 事件触发后，都会重新渲染 NavigationBar；
   */
  useEffect(() => {
    function handleResize() {
      setState({ randomKey: Math.random().toString(32) });
    }

    function handleWheel(event: any) {
      event.preventDefault();
    }

    const onResize = debounce(handleResize, 300);

    window.addEventListener('resize', onResize);
    sliderBarBoxRef.current?.addEventListener?.('wheel', handleWheel, false);
    return () => {
      window.removeEventListener('resize', onResize);
      sliderBarBoxRef.current?.removeEventListener?.('wheel', handleWheel, false);
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
  useEffect(() => {
    const clientRects: ClientRects = [];
    const sliderBarItems = sliderBarRef.current.children;

    for (let i = 0; i < sliderBarItems.length - 1; i++) {
      const { offsetWidth, offsetLeft } = sliderBarItems[i];
      clientRects.push({ offsetWidth, offsetLeft });
    }

    navBarListRef.current = navBarList;
    clientRectsRef.current = clientRects;
    const sliderBarWidth = computedSliderBarWidth();
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
      setState({ showOthers: false });
      toolBarBoxRef.current.style.width = '80px';
    } else {
      setState({ showOthers: true });
      toolBarBoxRef.current.style.width = '110px';

      const maxDistance = sliderBarWidth - sliderBarBoxRef.current.offsetWidth;

      // sliderBar 偏移量不能大于最大值，否则应该重新计算偏移量。
      if (translateXRef.current > maxDistance) {
        translateXRef.current = maxDistance;
        // 说明此时 sliderBar 已经滚动至最右边了，所以此时应该将 sliderBarBox 容器右边的 shadow 移除。
        sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
        sliderBarRef.current.style.cssText = `transform: translateX(${-maxDistance}px);`;
      }
    }

    // 更新指针样式
    updateIndicator();
  }, [navBarList, randomKey]);

  // 每当 activeKey 变化时，都应该根据 activeKey 的值重新计算 sliderBar 的偏移量
  useEffect(() => {
    const clientRects = clientRectsRef.current;
    // sliderBar 当前指针的位置（下标）
    const indicator = navBarListRef.current.findIndex((item) => item.key === activeKey) || 0;
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

    let cssText = '';
    // 边界下标
    let boundaryIndex = -1;
    // sliderBar 的长度
    const sliderBarWidth = computedSliderBarWidth();
    // sliderBar 容器的长度
    const sliderBarBoxWidth = sliderBarBoxRef.current.offsetWidth;
    // sliderBar 最大偏移不能超过该值。
    const maxDistance = sliderBarWidth - sliderBarBoxWidth;

    for (let i = 0; i < clientRects.length; i++) {
      const { offsetWidth, offsetLeft } = clientRects[i];
      // 边界下标的计算方式：以 sliderBar 中第一个不可见（或部分不可见）的项开始计算，再往前倒 2 项就是边界下标。
      if (boundaryIndex < 0 && offsetLeft + offsetWidth >= sliderBarBoxWidth) boundaryIndex = i - 2;
    }

    // 边界偏移距离，sliderBar 的偏移量计算都根据该值进行计算。
    const boundaryDistance = clientRects[boundaryIndex]?.offsetLeft ?? 0;

    /**
     * sliderBar 的偏移量根据边界下标的值进行计算;
     * props.indicator <= boundaryIndex，则偏移量为 0
     */
    if (indicator <= boundaryIndex) {
      translateXRef.current = 0;
      cssText = `transform: translateX(0);`;
      sliderBarBoxRef.current.classList.add('qm-nav-bar-content-right-shadow');
      sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-left-shadow');
    } else {
      // sliderBar 的偏移量计算是根据 indicator 对应项的 offsetLeft - boundaryDistance；
      let distX = clientRects[indicator].offsetLeft - boundaryDistance;

      if (distX >= maxDistance) {
        distX = maxDistance;
        sliderBarBoxRef.current.classList.add('qm-nav-bar-content-left-shadow');
        sliderBarBoxRef.current.classList.remove('qm-nav-bar-content-right-shadow');
      } else {
        sliderBarBoxRef.current.classList.add('qm-nav-bar-content-left-shadow');
        sliderBarBoxRef.current.classList.add('qm-nav-bar-content-right-shadow');
      }
      translateXRef.current = distX;
      cssText = `transform: translateX(${-distX}px);`;
    }

    sliderBarRef.current.style.cssText = cssText;
  }, [activeKey, randomKey]);

  // 点击 navBar
  const handleTabNavBar = (event: any) => {
    let { currentTarget, target } = event;
    let isDelete = false;
    let key: string | null = null;
    let indicator: number | null = null;

    while (target && target !== document && target !== currentTarget) {
      if (elementMatches(target, '.qm-nav-bar-delete-icon')) isDelete = true;
      key = target?.getAttribute?.('data-key');
      indicator = Number(target?.getAttribute?.('data-indicator'));
      if (key && indicator >= 0) break;
      target = target.parentNode;
    }

    if (typeof key !== 'string' || typeof indicator !== 'number') return;

    if (indicatorRef.current >= indicator) indicatorRef.current -= 1;

    if (isDelete) {
      const newNavBarList = [...navBarList];
      newNavBarList.splice(indicator, 1);
      onDelete?.(newNavBarList);

      // 如果删除项不是当前选中项，则不需要触发 onChange 事件
      if (activeKey === key) {
        if (indicator >= navBarList.length - 1) {
          key = navBarList[indicator - 1]?.key;
        } else {
          key = navBarList[indicator + 1]?.key;
        }
      } else {
        return;
      }
    }

    onChange?.(key);
  };

  // 当鼠标移入 ... icon 时，将 sliderBar 中不可见的元素添加到 hiddenNavBarList 集合中。
  const handleMouseEnter = useCallback(() => {
    const translateX = translateXRef.current;
    const clientRects = clientRectsRef.current;
    const containerWidth = sliderBarBoxRef.current.offsetWidth;
    if (translateX === 0) {
      /**
       * translateX === 0 时，只需要将 offsetLeft + offsetWidth 大于等于 sliderBarBox 容器长度的元素刷选出来即可，
       * 这部分元素此时是不可见的，将这部分元素添加到 hiddenNavBarList。
       */
      let index = 0;
      for (let i = 0; i < clientRects.length; i++) {
        const { offsetLeft, offsetWidth } = clientRects[i];
        if (offsetLeft + offsetWidth >= containerWidth) {
          index = i;
          break;
        }
      }

      setState({ hiddenNavBarList: navBarList.slice(index) });
    } else {
      /**
       * 当 translateX > 0 时，
       * 如果元素的 offsetLeft 小于 translateX，则说明该元素不可见（或至少是部分不可见）；
       * 另外，如果元素的 offsetLeft + offsetWidth 大于 containerWidth + translateX 则说明该元素不可见（或部分不可见）；
       * 将这两个部分的元素添加到 hiddenNavBarList。
       */
      const indexList: number[] = [];
      const hiddenNavBarList: NavBarList = [];

      for (let i = 0; i < clientRects.length; i++) {
        const { offsetLeft, offsetWidth } = clientRects[i];
        if (offsetLeft < translateX) {
          indexList.push(i);
        } else if (offsetLeft + offsetWidth > containerWidth + translateX) {
          indexList.push(i);
        }
      }

      for (let j = 0; j < indexList.length; j++) {
        hiddenNavBarList.push(navBarList[indexList[j]]);
      }

      setState({ hiddenNavBarList });
    }
  }, [navBarList]);

  // 鼠标滚动触发 sliderBar 滚动
  const handleMouseWheel = (event: any) => {
    event.preventDefault();
    if (notSlideRef.current) return;

    const step = 100;
    const { deltaY } = event;
    const maxDistance = sliderBarRef.current.scrollWidth - sliderBarBoxRef.current.offsetWidth;

    let translateX = translateXRef.current;
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
    sliderBarRef.current.style.cssText = `transform: translateX(${-translateX}px);`;
  };

  // 更新指针样式
  const updateIndicator = () => {
    const indicator = indicatorRef.current;
    const { offsetLeft = 0, offsetWidth = 0 } = clientRectsRef.current[indicator] ?? {};

    indicatorNodeRef.current.style.cssText = `width: ${offsetWidth}px; transform: translateX(${offsetLeft}px);`;
  };

  // 计算 sliderBar 内容的总长度
  const computedSliderBarWidth = () => {
    const clientRects = clientRectsRef.current;
    const { offsetWidth = 0, offsetLeft = 0 } = clientRects[clientRects.length - 1] || {};
    return offsetWidth + offsetLeft;
  };

  const appStoreDropdownMenu = useMemo(() => {
    const handleDeleteOther = () => {
      const newList = navBarList.filter((item, index) => index === 0 || item.key === activeKey);
      onDelete?.(newList);
      indicatorRef.current = newList.length > 1 ? 1 : 0;
    };

    const handleDeleteAll = () => {
      indicatorRef.current = 0;
      onChange?.(navBarList[0].key);
      onDelete?.(navBarList.slice(0, 1));
    };

    return {
      items: [
        {
          key: '1',
          label: (
            <div style={{ width: 60 }} onClick={handleDeleteOther}>
              关闭其他
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div style={{ width: 60 }} onClick={handleDeleteAll}>
              关闭所有
            </div>
          ),
        },
      ],
    };
  }, [activeKey, navBarList, onDelete, onChange]);

  const otherDropdownMenu = useMemo(() => {
    const handleClick = (event: any) => {
      const key = event.currentTarget.getAttribute('data-key');
      onChange?.(key);
    };

    const handleDelete = (event: any) => {
      event.preventDefault();
      let index!: number;
      const key = event.currentTarget.getAttribute('data-key');
      const newList = navBarList.filter((item, idx) => {
        if (item.key === key) {
          index = idx;
          return false;
        }

        return true;
      });

      if (indicatorRef.current > index) indicatorRef.current -= 1;

      onDelete?.(newList);
    };

    const isDefaultKey = navBarList[0]?.key;
    return {
      items: hiddenNavBarList.map((item) => {
        return {
          key: item.id,
          label: (
            <div className="qm-nav-bar-dropdown-menu-item">
              <div
                title={item.label}
                data-key={item.key}
                onClick={handleClick}
                className="qm-nav-bar-dropdown-menu-item-title"
              >
                {item.label}
              </div>
              <CloseOutlined
                data-key={item.key}
                onClick={handleDelete}
                className="qm-nav-bar-delete-icon"
                style={{ display: item.key === isDefaultKey ? 'none' : '' }}
              />
            </div>
          ),
        };
      }),
    };
  }, [hiddenNavBarList, navBarList, onDelete, onChange]);

  return (
    <section className="qm-nav-bar">
      <div className="qm-nav-bar-content" ref={sliderBarBoxRef} onWheel={handleMouseWheel}>
        <ul className="qm-nav-bar-content-list" onClick={handleTabNavBar} ref={sliderBarRef}>
          {navBarList.map((item, index) => (
            <li
              className={`qm-nav-bar-content-list-item${activeKey === item.key ? ' active' : ''}`}
              key={item.key}
              data-key={item.key}
              data-indicator={index}
            >
              {item.label}
              <CloseOutlined className="qm-nav-bar-delete-icon" style={{ display: index === 0 ? 'none' : '' }} />
            </li>
          ))}
          <li className="qm-nav-bar-indicator" ref={indicatorNodeRef} />
        </ul>
      </div>
      <div className="qm-nav-bar-toolbar" ref={toolBarBoxRef}>
        <Dropdown placement="bottom" menu={otherDropdownMenu}>
          {/* ... icon，鼠标移入后展示隐藏部分的 Nav 元素 */}
          <EllipsisOutlined
            onMouseEnter={handleMouseEnter}
            className={`qm-nav-bar-toolbar-other${showOthers ? '' : ' hide'}`}
          />
        </Dropdown>
        <Dropdown placement="bottom" menu={appStoreDropdownMenu}>
          <AppstoreOutlined className="qm-nav-bar-toolbar-appstore" />
        </Dropdown>
      </div>
    </section>
  );
}

export default memo(NavigationBar);
