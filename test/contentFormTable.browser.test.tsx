/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { columns, columns2 } from './constants';
import axios from '../src/utils/axios';
import { describe, test, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ContentFormTable from '../src/lib/ContentFormTable';
import { render, waitFor, cleanup } from '@testing-library/react';

const queryTableList = async (query: any) => axios.post('/test/content-form-table/list', query);
const exportTableList = async (query: any) => axios.postBlob('/test/download/file', query);

describe('Test <ContentFormTable />', async function() {
  test('Test <ContentFormTable /> Initial、Next Page、Conditional Query、Reset', async function() {
    const user = userEvent.setup();
    const queryTableListMockFn = vi.fn(queryTableList);
    const exportTableListMockFn = vi.fn(exportTableList);

    const { container, getByText, queryByRole, getByTitle, getByLabelText, getByRole } = render(
      <ContentFormTable
        cols={4}
        rowKey="id"
        showExportButton
        columns={columns}
        queryTableList={queryTableListMockFn}
        exportTableList={exportTableListMockFn}
      />
    );

    /* 组件初始化状态，默认展示空数据 */
    expect(container.querySelector('.ant-empty')).toBeInTheDocument();
    // 查找表头 <th/>
    expect(queryByRole('columnheader', { name: '姓名' })).not.toBeNull();
    expect(queryByRole('columnheader', { name: '出生日期' })).not.toBeNull();
    expect(queryByRole('columnheader', { name: '国籍' })).not.toBeNull();
    expect(queryByRole('columnheader', { name: '状态' })).not.toBeNull();

    // 获取第一页的数据
    let resp = await queryTableListMockFn.mock.results[0].value;
    let tableListLength = resp.data.list.length;

    // 初始化之前，页面显示【暂无数据】,如果此节点不存在了，则说明数据加载成功。
    await waitFor(() => expect(container.querySelector('.ant-empty')).toBeNull());

    // table 数据的行数刚好等于返回的 list 的长度
    expect(container.querySelector('.ant-table-tbody')!.children).toHaveLength(tableListLength);
    // 此时翻页器第一页应该是高亮的。
    expect(container.querySelector('.ant-pagination-item-1')).toHaveClass('ant-pagination-item-active');



    /* 点击下一页, 获取第二页的数据 */
    const nextPageBtn = getByTitle('Next Page');
    await user.click(nextPageBtn);

    resp = await queryTableListMockFn.mock.results[1].value as any;
    tableListLength = resp.data.list.length;

    // 展示数据加载的 Loading...
    expect(container.querySelector('.ant-spin.ant-spin-spinning')).toBeInTheDocument();

    // 等待 Loading... 消失，说明数据已经加载完成。
    await waitFor(() => expect(container.querySelector('.ant-spin.ant-spin-spinning')).toBeNull());

    // 此时 table list 长度应该大于等于 1
    expect(tableListLength).toBeGreaterThanOrEqual(1);
    // table 数据的行数刚好等于返回的 list 的长度
    expect(container.querySelector('.ant-table-tbody')!.children).toHaveLength(tableListLength);
    // 此时翻页器第二页应该是高亮的。
    expect(container.querySelector('.ant-pagination-item.ant-pagination-item-2')).toHaveClass('ant-pagination-item-active');



    /* 按条件查询表格数据 */
    const inputName = getByLabelText('姓名', { selector: 'input' });

    await user.click(inputName);
    await user.clear(inputName);
    await user.keyboard('zhangwuji');

    await user.click(getByLabelText('出生日期', { selector: 'input' }));
    // 选择 birthTime 为 2020
    await user.click(getByTitle('2020'));
    // 点击查询功能
    await user.click(getByText('查 询'));

    // 传递的参数必须与预期的查询条件相同
    expect(queryTableListMockFn.mock.calls[2][0]).toEqual({
      pageNum: 1,
      pageSize: 10,
      birthTime: '2020',
      name: 'zhangwuji',
    });

    resp = await queryTableListMockFn.mock.results[2].value;
    tableListLength = resp.data.list.length;

    // 注意，这里应该只查询到一条有效数据
    expect(tableListLength).toBe(1);

    // 展示数据加载的 Loading...
    expect(container.querySelector('.ant-spin.ant-spin-spinning')).toBeInTheDocument();

    // 等待 Loading... 消失，说明数据已经加载完成。
    await waitFor(() => expect(container.querySelector('.ant-spin.ant-spin-spinning')).toBeNull());

    expect(container.querySelector('.ant-table-tbody')!.children).toHaveLength(tableListLength);
    expect(queryByRole('cell', { name: 'zhangwuji' })).not.toBeNull();



    /* 重置查询条件 */
    await user.click(getByText('重 置'));

    expect(queryTableListMockFn).toHaveBeenNthCalledWith(4, { pageSize: 10, pageNum: 1 });



    /* 导出功能 */
    await user.click(getByText('导 出'));

    expect(exportTableListMockFn).toHaveBeenNthCalledWith(1, { pageSize: 10, pageNum: 1 });

    await waitFor(() => exportTableListMockFn.mock.results[0].value);

    expect(exportTableListMockFn).toHaveNthReturnedWith(1, {
      fileName: '__default_file',
      data: new Blob(['hello world'], { type: 'text/plain' }),
    });


    /* 表单排序-按出生日期排序 */
    const birthTimeSortBtn = getByRole('columnheader', { name: '出生日期' });
    // 让其可以进行用户交互。默认不能交互
    birthTimeSortBtn.style.cssText = 'pointer-events: all';

    // 第一次触发，预期升序
    await user.click(birthTimeSortBtn);

    expect(queryTableListMockFn).toHaveBeenNthCalledWith(5, {
      order: [{field: "birthTime", order: "ascend"}],
      pageSize: 10,
      pageNum: 1,
    });

    // 第二次触发，预期降序
    await user.click(birthTimeSortBtn);

    expect(queryTableListMockFn).toHaveBeenNthCalledWith(6, {
      order: [{field: "birthTime", order: "descend"}],
      pageSize: 10,
      pageNum: 1,
    });

    // 第三次触发，预期不会出现排序及默认。
    await user.click(birthTimeSortBtn);

    expect(queryTableListMockFn).toHaveBeenNthCalledWith(7, { pageSize: 10, pageNum: 1 });

    cleanup();
  });

  test('Test <ContentFormTable /> Immediate、ForceUpdate Features', async function() {
    const user = userEvent.setup();
    const queryTableListMockFn = vi.fn(queryTableList);
    const exportTableListMockFn = vi.fn(exportTableList);

    const tableRef = { current: null } as any;

    const { getByText } = render(
        <ContentFormTable
          cols={4}
          rowKey="id"
          ref={tableRef}
          showExportButton
          immediate={false}
          columns={columns2}
          queryTableList={queryTableListMockFn}
          exportTableList={exportTableListMockFn}
        />
    );

    expect(queryTableListMockFn).not.toHaveBeenCalled();

    // 点击查询功能
    await user.click(getByText('查 询'));

    expect(queryTableListMockFn).toHaveBeenCalled();

    expect(queryTableListMockFn).toHaveBeenCalledWith({ pageSize: 10, pageNum: 1, name: 'xiaoming', birthTime: '1991' });

    tableRef.current.forceUpdate();

    expect(queryTableListMockFn).toHaveBeenCalledTimes(2);

    cleanup();
  });
})
