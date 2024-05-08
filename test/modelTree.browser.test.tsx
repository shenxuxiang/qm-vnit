import React, { useState, useCallback, forwardRef } from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, describe, expect, vi } from 'vitest';
import ModelTree from '../src/lib/ModelTree';
import { treeData } from './constants';
import { delay } from '../src/utils';

const Example = forwardRef(function (props: any, ref: any) {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(props.checkedKeys || []);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(props.selectedKeys || []);

  const onSelect = useCallback((keys: React.Key[], allKeys: React.Key[]) => {
    setSelectedKeys(keys);
    props.onSelect(keys, allKeys);
  }, []);

  const onCheck = useCallback((keys: React.Key[], allKeys: React.Key[]) => {
    setCheckedKeys(keys);
    props.onCheck(keys, allKeys);
  }, []);


  return (
    <ModelTree
      multiple
      ref={ref}
      onCheck={onCheck}
      treeData={treeData}
      onSelect={onSelect}
      showLine={props.showLine}
      onExpand={props.onExpand}
      checkedKeys={checkedKeys}
      selectedKeys={selectedKeys}
      checkable={props.checkable}
      expandedKeys={props.expandedKeys}
      formatTreeData={props.formatTreeData}
      fieldNames={{
        key: 'id',
        title: 'name',
        children: 'children',
        parentKey: 'parentId',
      }}
    />
  );
});

describe('Test <ModelTree />', function() {
  test('Test <ModelTree /> Checkable', async function() {
    const user = userEvent.setup();
    const handleRef = { current: null } as any;
    const handleExpandMockFn = vi.fn((expandedKeys: React.Key[]) => expandedKeys);
    const handleChangeMockFn = vi.fn((keys: React.Key[], allKeys: React.Key[]) => ({ keys, allKeys }));

    const { getByTitle, getByPlaceholderText, getAllByText } = render(
      <Example
        checkable
        ref={handleRef}
        checkedKeys={['1-1-1-1']}
        onCheck={handleChangeMockFn}
        onExpand={handleExpandMockFn}
        expandedKeys={['1-1', '1-1-1']}
      />
    );

    await delay(500, null);

    expect(getByTitle('1-1-1-1').parentNode).toHaveClass('ant-tree-treenode-checkbox-checked');

    // 勾选 1-1-1-2
    await user.click(getByTitle('1-1-1-2').parentNode!.querySelector('.ant-tree-checkbox')!);

    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-1-1-1', '1-1-1-2', '1-1-1'],
      ['1-1-1-1', '1-1-1', '1-1', '1-1-1-2'],
    );

    await delay(500, null);
    expect(handleRef.current.getParentKeys('1-1-1-1')).toEqual(['1-1-1-1', '1-1-1', '1-1']);
    expect(handleRef.current.getAllParentKeys()).toEqual(['1-1-1-1', '1-1-1', '1-1', '1-1-1-2']);


    // 判断 1-2 这个节点是折叠的
    expect(getByTitle('1-2').parentNode!.querySelector('.ant-tree-switcher')).toHaveClass('ant-tree-switcher_close');
    // 展开 1-2
    await user.click(getByTitle('1-2').parentNode!.querySelector('.ant-tree-switcher')!);
    await delay(300, null);

    // 判断 1-2-2 这个节点是折叠的
    expect(getByTitle('1-2-2').parentNode!.querySelector('.ant-tree-switcher')).toHaveClass('ant-tree-switcher_close');
    // 展开 1-2-2
    await user.click(getByTitle('1-2-2').parentNode!.querySelector('.ant-tree-switcher')!);
    await delay(300, null);


    // 判断 1-2-2 checkbox 是否 disabled
    expect(getByTitle('1-2-2').parentNode?.querySelector('.ant-tree-checkbox')).toHaveClass('ant-tree-checkbox-disabled');

    expect(handleExpandMockFn).toHaveBeenCalledTimes(2);
    expect(handleExpandMockFn).toHaveBeenLastCalledWith(['1-1', '1-1-1', '1-2', '1-2-2']);

    // 勾选 1-1
    await user.click(getByTitle('1-1').parentNode?.querySelector('.ant-tree-checkbox')!);
    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-1-1-1', '1-1-1-2', '1-1-1', '1-1', '1-1-2', '1-1-3'],
      ['1-1-1-1', '1-1-1', '1-1', '1-1-1-2', '1-1-2', '1-1-3'],
    );

    // 取消勾选 1-1
    await user.click(getByTitle('1-1').parentNode?.querySelector('.ant-tree-checkbox')!);
    // 勾选 1-2
    await user.click(getByTitle('1-2').parentNode?.querySelector('.ant-tree-checkbox')!);
    // 勾选 1-3
    await user.click(getByTitle('1-3').parentNode?.querySelector('.ant-tree-checkbox')!);
    // 勾选 1-4
    await user.click(getByTitle('1-4').parentNode?.querySelector('.ant-tree-checkbox')!);

    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-2', '1-2-1', '1-3', '1-4'],
      ['1-2', '1-2-1', '1-3', '1-4'],
    );

    // 判断 1-2-2 是展开的，并折叠
    expect(getByTitle('1-2-2').parentNode!.querySelector('.ant-tree-switcher')).toHaveClass('ant-tree-switcher_open');
    await user.click(getByTitle('1-2-2').parentNode!.querySelector('.ant-tree-switcher')!);

    // 判断 1-2 是展开的，并折叠
    expect(getByTitle('1-2').parentNode!.querySelector('.ant-tree-switcher')).toHaveClass('ant-tree-switcher_open');
    await user.click(getByTitle('1-2').parentNode!.querySelector('.ant-tree-switcher')!);


    const input = getByPlaceholderText('请输入关键字进行过滤')
    await user.click(input);

    await user.keyboard('1-2-2');

    const list = getAllByText('1-2-2', { exact: false, selector: 'span' });

    expect(list).toHaveLength(3);

    cleanup();
  });


  test('Test <ModelTree /> Selectable', async function() {
    const user = userEvent.setup();
    const handleRef = { current: null } as any;
    const handleExpandMockFn = vi.fn((expandedKeys: React.Key[]) => expandedKeys);
    const handleChangeMockFn = vi.fn((keys: React.Key[], allKeys: React.Key[]) => ({ keys, allKeys }));

    const { getByTitle, getByPlaceholderText, getAllByText } = render(
      <Example
        ref={handleRef}
        selectedKeys={['1-1-1-1']}
        onSelect={handleChangeMockFn}
        onExpand={handleExpandMockFn}
        expandedKeys={['1-1', '1-1-1']}
      />
    );

    await delay(500, null);

    expect(getByTitle('1-1-1-1').parentNode).toHaveClass('ant-tree-treenode-selected');

    // 选择 1-1-1-2
    await user.click(getByTitle('1-1-1-2'));

    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-1-1-1', '1-1-1-2'],
      ['1-1-1-1', '1-1-1', '1-1', '1-1-1-2'],
    );


    await delay(500, null);
    expect(handleRef.current.getParentKeys('1-1-1-1')).toEqual(['1-1-1-1', '1-1-1', '1-1']);
    expect(handleRef.current.getAllParentKeys()).toEqual(['1-1-1-1', '1-1-1', '1-1', '1-1-1-2']);


    // 判断 1-2 这个节点是折叠的
    expect(getByTitle('1-2').parentNode).toHaveClass('ant-tree-treenode-switcher-close');
    // 展开 1-2
    await user.click(getByTitle('1-2').parentNode!.querySelector('.ant-tree-switcher')!);
    await delay(300, null);

    // 判断 1-2-2 这个节点是折叠的
    expect(getByTitle('1-2-2').parentNode).toHaveClass('ant-tree-treenode-switcher-close');
    // 展开 1-2-2
    await user.click(getByTitle('1-2-2').parentNode!.querySelector('.ant-tree-switcher')!);
    await delay(300, null);


    // 判断 1-2-2 是否 disabled
    expect(getByTitle('1-2-2').parentNode).toHaveClass('ant-tree-treenode-disabled');

    expect(handleExpandMockFn).toHaveBeenCalledTimes(2);
    expect(handleExpandMockFn).toHaveBeenLastCalledWith(['1-1', '1-1-1', '1-2', '1-2-2']);

    // 选择 1-1
    await user.click(getByTitle('1-1'));
    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-1-1-1', '1-1-1-2', '1-1'],
      ['1-1-1-1', '1-1-1', '1-1', '1-1-1-2'],
    );


    // 取消勾选 1-1
    await user.click(getByTitle('1-1'));
    // 勾选 1-2
    await user.click(getByTitle('1-2'));
    // 勾选 1-3
    await user.click(getByTitle('1-3'));
    // 勾选 1-4
    await user.click(getByTitle('1-4'));

    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-1-1-1', '1-1-1-2', '1-2', '1-3', '1-4'],
      ['1-1-1-1', '1-1-1', '1-1', '1-1-1-2', '1-2', '1-3', '1-4'],
    );

    // 判断 1-2-2 是展开的，并折叠
    expect(getByTitle('1-2-2').parentNode).toHaveClass('ant-tree-treenode-switcher-open');
    await user.click(getByTitle('1-2-2').parentNode!.querySelector('.ant-tree-switcher')!);

    // 判断 1-2 是展开的，并折叠
    expect(getByTitle('1-2').parentNode).toHaveClass('ant-tree-treenode-switcher-open');
    await user.click(getByTitle('1-2').parentNode!.querySelector('.ant-tree-switcher')!);

    const input = getByPlaceholderText('请输入关键字进行过滤')
    await user.click(input);

    await user.keyboard('1-2-2');

    const list = getAllByText('1-2-2', { exact: false, selector: 'span' });

    expect(list).toHaveLength(3);

    cleanup();
  });



  test('Test <ModelTree /> FormatTreeData', async function() {
    const user = userEvent.setup();
    const handleChangeMockFn = vi.fn((keys: React.Key[], allKeys: React.Key[]) => ({ keys, allKeys }));
    const handleAddMockFn = vi.fn((event: any) => {
      event.stopPropagation();
      let target = event.target;
      let key = null;
      do {
        target = target.parentNode;
        key = target.getAttribute('data-key');
        if (key) break;
      } while (target.parentNode);

      return { type: 'add', key };
    });

    function formatTreeData (treeData: any[]): any {
      return treeData.map((item: any) => {
        return {
          key: item.id,
          title: item.name,
          renderItem: (context: React.ReactNode, record: any) => (
            <div
              data-key={record.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ flex: 1 }}>{context}</div>

              <span
                title="新增"
                className="qm-addition-button"
                onClick={handleAddMockFn}
                style={{ fontSize: 14, marginLeft: 20, color: '#1890ff' }}
              >新增</span>
            </div>
          ),
          parentKey: item.parentId,
          children: !item.children || item.children.length <= 0 ? undefined : formatTreeData(item.children),
        };
      });
    }

    const { getByText } = render(
      <Example
        showLine
        selectedKeys={['1-1-1-1']}
        onSelect={handleChangeMockFn}
        expandedKeys={['1-1', '1-1-1']}
        formatTreeData={formatTreeData}
      />
    );

    await delay(500, null);

    await user.click(getByText('1-1-1-2', { exact: true }));
    await user.click(getByText('1-1-1-2', { exact: true }).parentNode?.querySelector('.qm-addition-button')!);

    expect(handleChangeMockFn).toHaveBeenLastCalledWith(
      ['1-1-1-1', '1-1-1-2'],
      ['1-1-1-1', '1-1-1', '1-1', '1-1-1-2'],
    );

    expect(handleAddMockFn).toHaveBeenCalled();
    expect(handleAddMockFn).toHaveLastReturnedWith({ type: 'add', key: '1-1-1-2' });

    cleanup();
  });
});
