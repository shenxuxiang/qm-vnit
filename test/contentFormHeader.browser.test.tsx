import React from 'react';
import { delay } from '../src/utils';
import { columns } from './constants';
import { describe, test, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { cleanup, render } from '@testing-library/react';
import ContentFormHeader from '../src/lib/ContentFormHeader';

const initialValues = { name: 'shenxx' };

describe('Test <ContentFormHeader/> Submit And Reset Features', function() {
  test('Test <ContentFormHeader/>', async function() {
    const user = userEvent.setup();

    const handleReset = (values: any) => Promise.resolve(values);
    const handleSubmit = (values: any) => Promise.resolve(values);

    const handleResetMockFn = vi.fn(handleReset);
    const handleSubmitMockFn = vi.fn(handleSubmit);

    const { getByLabelText, getByText, getByTitle } = render(
      <ContentFormHeader
        queryList={columns}
        onReset={handleResetMockFn}
        onSubmit={handleSubmitMockFn}
        initialValues={initialValues}
      />
    );

    const name = getByLabelText('姓名');
    const nation = getByLabelText('国籍');
    const status = getByLabelText('状态');
    const birthTime = getByLabelText('出生日期');

    const resetBtn = getByText('重 置');
    const submitBtn = getByText('查 询');

    await user.click(name);
    await user.clear(name);
    // 输入姓名
    await user.keyboard('hello world');

    await user.click(birthTime);
    // 时间选择 2020
    await user.click(getByTitle('2020', { exact: true }));

    await user.click(nation);
    // 国籍选择中国
    await user.click(getByTitle('中国', { exact: true }));

    await user.click(status);
    // 状态选择在职
    await user.click(getByTitle('在职', { exact: true }));
    // 点击查询按钮
    await user.click(submitBtn);

    expect(handleSubmitMockFn).toHaveBeenCalled();
    expect(handleSubmitMockFn.mock.calls[0][0]).toEqual({
      name: 'hello world',
      birthTime: '2020',
      nation: 'china',
      status: '1',
    });

    // 点击重置按钮
    await user.click(resetBtn);
    expect(handleResetMockFn).toHaveBeenCalled();
    expect(handleResetMockFn.mock.calls[0][0]).toEqual(initialValues);

    cleanup();
  });

  test('Text <ContentFormHeader> Expand/Collapse Features', async function() {
    const user = userEvent.setup();

    const handleReset = (values: any) => Promise.resolve(values);
    const handleSubmit = (values: any) => Promise.resolve(values);

    const { container, queryByText, getByText } = render(
      <ContentFormHeader
        defaultExpand
        queryList={columns}
        onReset={handleReset}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    );

    /* 模拟 resize 事件，并将窗口大小调整为 1920 * 1080 */
    document.body.style.cssText = 'width: 1920px; height: 1080px;';
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    window.dispatchEvent(new Event('resize'));
    await delay(500, null);

    /* 展开时的样式 */
    expect(queryByText('收起')).not.toBeNull();
    expect(container.querySelector('.qm-content-form-head .ant-row')).toHaveStyle({ height: '128px' });
    expect((container.querySelector('.qm-content-form-head .ant-row') as HTMLElement).offsetHeight).toBe(128);


    /* 折叠时的样式 */
    await user.click(getByText('收起'));
    await delay(500, null);
    expect(queryByText('展开')).not.toBeNull();
    expect(container.querySelector('.qm-content-form-head .ant-row')).toHaveStyle({ height: '64px' });
    expect((container.querySelector('.qm-content-form-head .ant-row') as HTMLElement).offsetHeight).toBe(64);

    await user.click(getByText('展开'));
    await delay(500, null);

    /* 模拟 resize 事件，并将窗口大小调整为 800 * 1080 */
    document.body.style.cssText = 'width: 800px; height: 1080px;';
    window.innerWidth = 800;
    window.dispatchEvent(new Event('resize'));
    await delay(500, null);

    // 当可视窗口大小为 800 * 1080 时，一行只能展示两个 col，分三行展示。所以高度应该时 3 * 64 = 192
    expect((container.querySelector('.qm-content-form-head .ant-row') as HTMLElement).offsetHeight).toBe(192);

    await user.click(getByText('收起'));
    await delay(500, null);

    /* 当可视窗口大小为 800 * 1080 时，折叠时的样式 */
    expect(queryByText('展开')).not.toBeNull();
    expect(container.querySelector('.qm-content-form-head .ant-row')).toHaveStyle({ height: '64px' });
    expect((container.querySelector('.qm-content-form-head .ant-row') as HTMLElement).offsetHeight).toBe(64);

    cleanup();
  });


  test('Text <ContentFormHeader> Export Features', async function() {
    const user = userEvent.setup();

    const handleExport = (values: any) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(values), 1000);
      });
    };
    const handleSubmit = (values: any) => Promise.resolve(values);
    const handleReset = (values: any) => Promise.resolve(values);

    const handleExportMockFn = vi.fn(handleExport);

    const { getByText, getByLabelText, getByTitle, getByRole } = render(
      <ContentFormHeader
        cols={4}
        defaultExpand
        showExportButton
        queryList={columns}
        onReset={handleReset}
        onSubmit={handleSubmit}
        onExport={handleExportMockFn}
        initialValues={initialValues}
      />
    );

    const name = getByLabelText('姓名');
    const nation = getByLabelText('国籍');
    const status = getByLabelText('状态');
    const birthTime = getByLabelText('出生日期');

    const resetBtn = getByText('重 置');
    const exportBtn = getByText('导 出');

    await user.click(name);
    await user.clear(name);
    await user.keyboard('shenxuxiang');

    await user.click(nation);
    await user.click(getByTitle('中国'));

    await user.click(status);
    // 状态选择在职
    await user.click(getByTitle('在职', { exact: true }));

    await user.click(birthTime);
    // 时间选择 2020
    await user.click(getByTitle('2020', { exact: true }));

    // 点击导出按钮
    await user.click(exportBtn);

    expect(handleExportMockFn).toHaveBeenCalled();
    expect(handleExportMockFn).toHaveBeenNthCalledWith(1, {
      name: 'shenxuxiang',
      birthTime: '2020',
      nation: 'china',
      status: '1',
    });

    // 当用户触发导出功能时。是否展示 loading...（预期效果：应该展示，并在 1000ms 后隐藏）
    expect(getByText('导 出').parentNode as HTMLElement).toContainElement(getByRole('img', { name: 'loading' }));
    // 等待 1500ms
    await delay(1500, null);
    // 查看 loading... 是否已经隐藏
    expect((getByText('导 出').parentNode as HTMLElement).querySelector('.ant-btn-icon.ant-btn-loading-icon')).toBeNull();

    // 触发表单重置
    await user.click(resetBtn);
    // 再次触发导出功能
    await user.click(exportBtn);

    // 查看表单导出时的 query 参数是否符合预期
    expect(handleExportMockFn).toHaveBeenLastCalledWith(initialValues);

    cleanup();
  });
});
