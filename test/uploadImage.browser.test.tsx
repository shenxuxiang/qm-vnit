import { delay } from '../src/utils';
import UploadImage from '../src/lib/UploadImage';
import { expect, describe, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import type { FileList } from '../src/lib/UploadImage';
import React, { useState, useEffect, useCallback } from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';

function Example(props: any = {}) {
  const { value, maxCount, maxSize, multiple, action, onPreview, disabled } = props;
  const [ fileList, setFileList ] = useState(value);

  useEffect(() => {
    if (typeof value === 'undefined') return;

    setFileList(() => value);
  }, [value]);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer  ' };
  }, []);

  const onChange = useCallback((fileList: FileList) => {
    setFileList({ fileList });
    props.onChange(fileList);
  }, [props.onChange]);

  return (
    <UploadImage
      method="post"
      value={fileList}
      maxSize={maxSize}
      headers={headers}
      multiple={multiple}
      maxCount={maxCount}
      onChange={onChange}
      onPreview={onPreview}
      disabled={disabled}
      action={action || "/test/upload/file"}
    />
  );
}

describe('Test <UploadImage>', function() {
  test('Test <UploadImage> Add、Remove、Multiple, MaxSize, maxCount', async function() {
    const user = userEvent.setup();
    const onChangeMockFn = vi.fn((fileList: FileList) => fileList);
    const { container, baseElement, queryByRole, getByRole, getByText } = render(
      <Example
        multiple
        maxSize={10}
        maxCount={3}
        onChange={onChangeMockFn}
      />
    );

    let box = container.querySelector('.qm-vnit-upload-image-list')!;
    let uploadButton = container.querySelector('.qm-vnit-upload-image-label')!;

    expect(box?.firstElementChild).toBe(uploadButton);
    expect(box?.lastElementChild).toBe(uploadButton);

    // 模拟文件上传
    await user.upload(container?.querySelector('input')!, [new File(['1.jpg'], '1.jpg', {type: 'image/jpg'})]);

    let lastResult = onChangeMockFn.mock.results[onChangeMockFn.mock.results.length - 1].value;
    expect(lastResult).toHaveProperty('[0].percent', 0);
    expect(lastResult).toHaveProperty('[0].name', '1.jpg');
    expect(lastResult).toHaveProperty('[0].status', 'loading');

    // 查看动画效果是否符合预期
    expect(container.querySelector('.qm-vnit-upload-image-label')).toHaveStyle({ transform: 'matrix(1, 0, 0, 1, -100, 0)' });
    await delay(3000, null);
    expect(container.querySelector('.qm-vnit-upload-image-label')).toHaveStyle({ transform: 'none' });

    lastResult = onChangeMockFn.mock.results[onChangeMockFn.mock.results.length - 1].value;
    expect(lastResult).toHaveProperty('[0].percent', 100);
    expect(lastResult).toHaveProperty('[0].name', '1.jpg');
    expect(lastResult).toHaveProperty('[0].status', 'done');

    const files = [
      new File(['1.jpg'], '2.jpg', {type: 'image/jpg'}),
      new File(['hello world.jpg'], '3.jpg', {type: 'image/jpg'}),
      new File(['1.jpg'], '4.jpg', {type: 'image/jpg'}),
      new File(['1.jpg'], '5.jpg', {type: 'image/jpg'}),
    ];

    await user.upload(container?.querySelector('input')!, files);

    await waitFor(() => expect(getByText('最多只能上传3个文件！')).toBeVisible());
    await waitFor(() => expect(getByText('3.jpg文件过大无法上传！')).toBeVisible());

    // 当上传文件数量大于等于 maxCount 时，上传按钮将隐藏。
    expect(container.querySelector('.qm-vnit-upload-image-label')).not.toBeInTheDocument();

    await delay(2000, null);
    // 预览图像
    const previewIcons = container.querySelectorAll('.anticon-eye.qm-vnit-upload-image-item-preview-icon');
    await user.click(previewIcons[0]);

    await waitFor(() => expect(getByRole('img', { name: 'preview-image' })).toBeVisible());

    await delay(1000, null);
    // 关闭预览
    await user.click(baseElement.querySelector('.qm-vnit-icon-close.qm-icon-close.qm-preview-image-operation-icon')!);

    await delay(1000, null);
    expect(queryByRole('img', { name: 'preview-image' })).toBeNull();


    // 删除操作
    await user.click(container.querySelector('.qm-vnit-upload-image-item-remove-icon')!);
    await delay(500, null);
    // 删除操作
    await user.click(container.querySelector('.qm-vnit-upload-image-item-remove-icon')!);
    await delay(500, null);
    // 删除操作
    await user.click(container.querySelector('.qm-vnit-upload-image-item-remove-icon')!);
    await delay(500, null);

    expect(onChangeMockFn).toHaveLastReturnedWith([]);

    cleanup();
  });

  test('Test <UploadImage> InitialValue, Upload Error', async function() {
    const user = userEvent.setup();
    const onChangeMockFn = vi.fn((fileList: FileList) => fileList);
    const initialValue = [{
      uid: '1',
      name: '1.jpg',
      url: '/qm-vnit/src/assets/images/1.jpg',
      status: 'done',
    }]
    const { container, queryByRole, getByRole } = render(
      <Example
        value={initialValue}
        onChange={onChangeMockFn}
        action="/test/error/upload/file"
      />
    );

    let box = container.querySelector('.qm-vnit-upload-image-list');
    expect(box?.firstElementChild).toBe(container.querySelector('.qm-vnit-upload-image-item'));
    expect(box?.lastElementChild).toBe(container.querySelector('.qm-vnit-upload-image-label'));

    expect(queryByRole('img', { name: 'preview-image' })).toBeNull();

    // 预览图像
    const previewIcons = container.querySelectorAll('.anticon-eye.qm-vnit-upload-image-item-preview-icon');
    await user.click(previewIcons[0]);
    await delay(500, null);

    expect(getByRole('img', { name: 'preview-image' })).toBeVisible();

    // 模拟文件上传
    await user.upload(container?.querySelector('input')!, new File(['2.jpg'], '2.jpg', {type: 'image/jpg'}));

    await delay(1000, null);

    box = container.querySelector('.qm-vnit-upload-image-list')!;
    expect(box.children[1]).toHaveClass('qm-vnit-upload-image-item error');
    expect(box.children[1]).toContainElement(container.querySelector('.qm-vnit-upload-image-item-error'));

    const lastResult = onChangeMockFn.mock.results[onChangeMockFn.mock.results.length - 1].value;

    expect(lastResult).toHaveLength(2);
    expect(lastResult).toHaveProperty('[0].status', 'done');
    expect(lastResult).toHaveProperty('[0].name', '1.jpg');
    expect(lastResult).toHaveProperty('[0].uid', '1');

    expect(lastResult).toHaveProperty('[1].status', 'error');
    expect(lastResult).toHaveProperty('[1].name', '2.jpg');
    cleanup();
  });

  test('Test <UploadImage> Custom PreviewImage', async function() {
    const user = userEvent.setup();
    const onChangeMockFn = vi.fn((fileList: FileList) => fileList);
    const onPreviewMockFn = vi.fn((url: string, rawResource?: File) => void 0);
    const initialValue = [{
      uid: '01',
      name: '1.jpg',
      url: '1.jpg',
      status: 'done',
      rawResource: new File(['1.jpg'], '1.jpg', { type: '1.jpg' }),
    }];
    const { container, rerender } = render(
      <Example
        value={initialValue}
        onChange={onChangeMockFn}
        onPreview={onPreviewMockFn}
        action="/test/upload/file"
      />
    );

    // 预览图像
    const previewIcons = container.querySelectorAll('.anticon-eye.qm-vnit-upload-image-item-preview-icon');
    await user.click(previewIcons[0]);
    await delay(1000, null);

    expect(onPreviewMockFn.mock.calls[0][0]).toBe('1.jpg');
    expect(onPreviewMockFn.mock.calls[0][1]).toEqual(new File(['1.jpg'], '1.jpg', { type: '1.jpg' }));

    rerender(
      <Example
        disabled
        value={initialValue}
        onChange={onChangeMockFn}
        onPreview={onPreviewMockFn}
        action="/test/upload/file"
      />
    );

    expect(container.querySelector('.qm-vnit-upload-image-label')?.querySelector('input')).toBeDisabled();
    cleanup();
  });
});
