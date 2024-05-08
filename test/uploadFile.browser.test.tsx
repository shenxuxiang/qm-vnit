import { delay } from '../src/utils';
import UploadFile from '../src/lib/UploadFile';
import { expect, describe, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import React, { useState, useEffect, useCallback } from 'react';
import { render, waitFor, cleanup, fireEvent  } from '@testing-library/react';

function Example(props: any = {}) {
  const { value, maxCount, maxSize, multiple, action, onPreview, disabled, listType = 'picture-card' } = props;
  const [ fileList, setFileList ] = useState(value);

  useEffect(() => {
    if (typeof value === 'undefined') return;

    setFileList(() => value);
  }, [value]);

  const onChange = useCallback((fileList: any[]) => {
    setFileList({ fileList });
    props.onChange(fileList);
  }, []);

  return (
    <UploadFile
      value={fileList}
      maxSize={maxSize}
      multiple={multiple}
      maxCount={maxCount}
      onChange={onChange}
      disabled={disabled}
      listType={listType}
      onPreview={onPreview}
      action={action || "/test/upload/file"}
    />
  );
}

describe('Test <UploadFile>', function() {
  test('Test <UploadFile> listType, maxSize, maxCount', async function() {
    const user = userEvent.setup();
    const initialValue = [{ uid: '0', name: '0.jpg', url: '0.jpg' }];
    const onChangeMockFn = vi.fn((fileList: any[]) => fileList);
    const onPreviewMockFn = vi.fn((file: any) => file);
    const { container, getAllByRole, getByText, debug, rerender } = render(
      <Example
        multiple
        maxSize={0.00001}
        maxCount={4}
        value={initialValue}
        onChange={onChangeMockFn}
        onPreview={onPreviewMockFn}
      />
    );

    let box = container.querySelector('.ant-upload-list.ant-upload-list-picture-card')!;
    expect(box.children).toHaveLength(2);
    expect(box?.firstElementChild).toBe(container.querySelector('.ant-upload-list-item-container'));
    expect(box?.lastElementChild).toBe(container.querySelector('.ant-upload.ant-upload-select'));

    debug(container?.querySelector('input')!)

    // 模拟文件上传，注意对于 Andt 的 Upload 文件上传只能使用 fireEvent.change() 模拟，user.upload() 目前无效。
    fireEvent.change(container?.querySelector('input')!, {
      target: {
        files: [new File(['1.jpg'], '1.jpg', { type: 'image/jpg' })]
      }
    });

    await waitFor(() => expect(onChangeMockFn).toHaveBeenCalled(), { timeout: 2000 });

    let lastResult = onChangeMockFn.mock.results[onChangeMockFn.mock.results.length - 1].value;

    expect(lastResult).toHaveProperty('[1].percent', 0);
    expect(lastResult).toHaveProperty('[1].name', '1.jpg');
    expect(lastResult).toHaveProperty('[1].status', 'uploading');

    await delay(3000, null);

    lastResult = onChangeMockFn.mock.results[onChangeMockFn.mock.results.length - 1].value;
    expect(lastResult).toHaveProperty('[1].percent', 100);
    expect(lastResult).toHaveProperty('[1].name', '1.jpg');
    expect(lastResult).toHaveProperty('[1].status', 'done');

    // 模拟文件上传
    fireEvent.change(container?.querySelector('input')!, {
      target: {
        files: [
          new File(['2.jpg'], '2.jpg', {type: 'image/jpg'}),
          new File(['333333333333333.jpg'], '333333333333333.jpg', {type: 'image/jpg'}),
          new File(['4.jpg'], '4.jpg', {type: 'image/jpg'}),
          new File(['5.jpg'], '5.jpg', {type: 'image/jpg'}),
        ],
      },
    });

    await waitFor(() => expect(getByText('最多只能上传4个文件！')).toBeVisible());
    await waitFor(() => expect(getByText('上传图片大小不能超过0.00001M！')).toBeVisible());
    // 等待 4s 后，文件已全部上传完成。
    await delay(4000, null);

    // 检测数据
    lastResult = onChangeMockFn.mock.results[onChangeMockFn.mock.results.length - 1].value;

    // 当上传文件数量大于等于 maxCount 时，上传按钮将隐藏。
    expect(container.querySelector('.ant-upload.ant-upload-select')).not.toBeVisible();

    // 删除文件
    await user.click(getAllByRole('img', { name: 'delete' })[0]);
    await delay(1000, null);
    // 删除文件后，上传附件按钮将再次展示
    expect(container.querySelector('.ant-upload.ant-upload-select')).toBeVisible();

    // 删除文件
    await user.click(getAllByRole('img', { name: 'delete' })[0]);
    await delay(1000, null);

    // 删除文件
    await user.click(getAllByRole('img', { name: 'delete' })[0]);
    await delay(1000, null);

    // 删除文件
    await user.click(getAllByRole('img', { name: 'delete' })[0]);
    await delay(1000, null);

    // 删除所有文件后，检测数据是否应该是空
    expect(onChangeMockFn).toHaveLastReturnedWith([]);

    cleanup();
  });
});
