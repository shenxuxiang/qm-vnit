import NavigationBar, { type NavBarList } from '@/lib/NavigationBar';
import { render, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import useReducer from '@/utils/useReducer';
import React, { useCallback } from 'react';
import { delay } from '@/utils';

function initialState() {
  return {
    navBarList: [
      { key: '11', label: '数据概览' },
      { key: '22', label: '用户详情' },
      { key: '33', label: '系统设置' },
      { key: '44', label: '角色管理' },
      { key: '55', label: '数据统计' },
      { key: '66', label: '权限设置' },
      { key: '77', label: '查看详情' },
    ] as NavBarList,
    navBarActiveKey: '11',
  };
}

function Example(props: any) {
  const [{ navBarList, navBarActiveKey }, setState] = useReducer(initialState);

  const handleClickNavBar = useCallback((activeKey: string) => {
    setState({ navBarActiveKey: activeKey });
    props?.onChange?.(activeKey);
  }, []);

  const handleDeleteNavBar = useCallback((navBarList: NavBarList) => {
    setState({ navBarList });
    props?.onDelete?.(navBarList);
  }, []);

  return (
    <div style={{ width: props?.width ?? 800 }}>
      <NavigationBar
        navBarList={navBarList}
        activeKey={navBarActiveKey}
        onChange={handleClickNavBar}
        onDelete={handleDeleteNavBar}
      />
    </div>
  );
}



describe('Text <NavigationBar />', function() {
  test('Text <NavigationBar /> Initial UI', async function() {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChangeMock = vi.fn((activeKey: string) => activeKey);
    const onDeleteMock = vi.fn((navBarList: NavBarList) => navBarList);

    const { container, queryByRole, getByRole, getByText, queryByText, findByText, rerender, debug } = render(
      <Example
        width={1200}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
      />
    );

    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass(
      'qm-nav-bar-content-right-shadow',
      'qm-nav-bar-content-left-shadow',
    );

    // 【...】icon 是否展示
    expect(queryByRole('img', { name: 'ellipsis' })).toBeNull();

    /**
     * 模拟窗口 resize
     * sliderBar 容器的宽度变小，此时容器右侧应该展示阴影，并无滑动。
     */
    rerender(
      <Example
        width={800}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
      />
    );
    window.dispatchEvent(new Event('resize'));

    await delay(1000, null);
    // 【...】icon 展示
    expect(getByRole('img', { name: 'ellipsis' })).toBeVisible();
    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass('qm-nav-bar-content-right-shadow');
    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass('qm-nav-bar-content-left-shadow');
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' });

    // 模拟 MouseWheel
    container.querySelector('.qm-nav-bar-content')?.dispatchEvent(new WheelEvent('wheel', {
      cancelable: true,
      composed: true,
      bubbles: true,
      deltaMode: 0,
      deltaY: 100,
      deltaX: 0,
    }));

    await delay(1000, null);
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -100, 0)' });
    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass(
      'qm-nav-bar-content-right-shadow',
      'qm-nav-bar-content-left-shadow',
    );

    /**
     * 模拟 MouseWheel
     * 滚动到导航栏的最右边
     * sliderBar 容器右边的阴影消失，左边的阴影展现
     */
    let count = 5;
    while (count--) {
      container.querySelector('.qm-nav-bar-content')?.dispatchEvent(new WheelEvent('wheel', {
        cancelable: true,
        composed: true,
        bubbles: true,
        deltaMode: 0,
        deltaY: 100,
        deltaX: 0,
      }));
    }

    await delay(1000, null);
    let sliderBarWidth = (container.querySelector('.qm-nav-bar-content-list') as HTMLElement).scrollWidth;
    let sliderBoxWidth = (container.querySelector('.qm-nav-bar-content') as HTMLElement).offsetWidth;

    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass('qm-nav-bar-content-left-shadow');
    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass('qm-nav-bar-content-right-shadow');
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({
      transform: `matrix(1, 0, 0, 1, -${sliderBarWidth - sliderBoxWidth}, 0)`
    });

    /**
     * 模拟 MouseWheel
     * 滚动到导航栏的最左边
     * sliderBar 容器左边的阴影消失，右边的阴影展现
     */
    count = 5;
    while (count--) {
      container.querySelector('.qm-nav-bar-content')?.dispatchEvent(new WheelEvent('wheel', {
        cancelable: true,
        composed: true,
        bubbles: true,
        deltaMode: 0,
        deltaY: -100,
        deltaX: 0,
      }));
    }
    await delay(1000, null);
    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass('qm-nav-bar-content-right-shadow');
    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass('qm-nav-bar-content-left-shadow');
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, 0, 0)' });

    /**
     * 查看 appstore Icon 的下拉框展示内容
     * 默认情况下，页面中应该没有渲染【关闭其他】、【关闭所有】
     * 当鼠标 hover appstore icon 时，页面开始渲染
     */
    expect(queryByText('关闭其他')).toBeNull();
    expect(queryByText('关闭所有')).toBeNull();

    await user.click(getByText('用户详情'));
    expect(onChangeMock).toHaveLastReturnedWith('22');

    await user.hover(getByRole('img', { name: 'appstore' }));
    await waitFor(() => findByText('关闭其他'));

    expect(getByText('关闭其他')).toBeInTheDocument();
    expect(getByText('关闭所有')).toBeInTheDocument();

    await user.click(getByText('关闭其他'));
    expect(onDeleteMock.mock.results[0].value).toEqual([
      { key: '11', label: '数据概览' },
      { key: '22', label: '用户详情' },
    ]);

    await user.click(getByText('关闭所有'));
    expect(onDeleteMock.mock.results[1].value).toEqual([
      { key: '11', label: '数据概览' },
    ]);
  });

  test('Text <Navigation /> Delete Item Bar', async function() {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChangeMock = vi.fn((activeKey: string) => activeKey);
    const onDeleteMock = vi.fn((navBarList: NavBarList) => navBarList);

    const { container, queryByRole, getByRole, getByText, getByTitle } = render(
      <Example
        width={800}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
      />
    );

    let sliderBarWidth = (container.querySelector('.qm-nav-bar-content-list') as HTMLElement).scrollWidth;
    let sliderBoxWidth = (container.querySelector('.qm-nav-bar-content') as HTMLElement).offsetWidth;

    await user.click(getByText('查看详情'));
    await delay(1000, null);

    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass('qm-nav-bar-content-left-shadow');
    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass('qm-nav-bar-content-right-shadow');
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({
      transform: `matrix(1, 0, 0, 1, -${sliderBarWidth - sliderBoxWidth}, 0)`
    });

    await user.hover(getByRole('img', { name: 'ellipsis' }));
    await delay(1000, null);

    expect(getByTitle('数据概览').parentNode?.querySelector('.qm-nav-bar-delete-icon')).not.toBeVisible();
    expect(getByTitle('用户详情').parentNode?.querySelector('.qm-nav-bar-delete-icon')).toBeVisible();

    await user.click(getByTitle('数据概览'));
    await delay(1000, null);

    expect(onChangeMock).toHaveLastReturnedWith('11');
    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass('qm-nav-bar-content-right-shadow');
    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass('qm-nav-bar-content-left-shadow');
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({ transform: `matrix(1, 0, 0, 1, 0, 0)` });

    await user.hover(getByRole('img', { name: 'ellipsis' }));
    await delay(1000, null);

    await user.click(getByTitle('查看详情'));
    await delay(1000, null);

    expect(onChangeMock).toHaveLastReturnedWith('77');
    expect(container.querySelector('.qm-nav-bar-content')).toHaveClass('qm-nav-bar-content-left-shadow');
    expect(container.querySelector('.qm-nav-bar-content')).not.toHaveClass('qm-nav-bar-content-right-shadow');
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({
      transform: `matrix(1, 0, 0, 1, -${sliderBarWidth - sliderBoxWidth}, 0)`
    });


    await user.hover(getByRole('img', { name: 'ellipsis' }));
    await delay(1000, null);

    // 删除【用户详情】
    await user.click(getByTitle('用户详情').parentNode?.querySelector('.qm-nav-bar-delete-icon')!);

    expect(onDeleteMock).toHaveLastReturnedWith([
      { key: '11', label: '数据概览' },
      // { key: '22', label: '用户详情' },
      { key: '33', label: '系统设置' },
      { key: '44', label: '角色管理' },
      { key: '55', label: '数据统计' },
      { key: '66', label: '权限设置' },
      { key: '77', label: '查看详情' },
    ]);

    await user.click(getByText('系统设置'));
    expect(onChangeMock).toHaveLastReturnedWith('33');
    await delay(1000, null);

    // 删除【系统设置】
    await user.click(getByText('系统设置')?.querySelector('.qm-nav-bar-delete-icon')!);
    expect(onDeleteMock).toHaveLastReturnedWith([
      { key: '11', label: '数据概览' },
      // { key: '22', label: '用户详情' },
      // { key: '33', label: '系统设置' },
      { key: '44', label: '角色管理' },
      { key: '55', label: '数据统计' },
      { key: '66', label: '权限设置' },
      { key: '77', label: '查看详情' },
    ]);
    expect(onChangeMock).toHaveLastReturnedWith('44');

    // 依次删除【角色管理】【数据统计】【权限设置】
    await user.click(getByText('角色管理')?.querySelector('.qm-nav-bar-delete-icon')!);
    await user.click(getByText('数据统计')?.querySelector('.qm-nav-bar-delete-icon')!);
    await user.click(getByText('权限设置')?.querySelector('.qm-nav-bar-delete-icon')!);
    expect(onChangeMock).toHaveLastReturnedWith('77');
    expect(onDeleteMock).toHaveLastReturnedWith([
      { key: '11', label: '数据概览' },
      // { key: '22', label: '用户详情' },
      // { key: '33', label: '系统设置' },
      // { key: '44', label: '角色管理' },
      // { key: '55', label: '数据统计' },
      // { key: '66', label: '权限设置' },
      { key: '77', label: '查看详情' },
    ]);
    await delay(1000, null);
    expect(container.querySelector('.qm-nav-bar-content-list')).toHaveStyle({ transform: `matrix(1, 0, 0, 1, 0, 0)` });
    expect(queryByRole('img', { name: 'ellipsis' })).toBeNull();
  });
});
