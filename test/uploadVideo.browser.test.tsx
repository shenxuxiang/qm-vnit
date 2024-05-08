import React, { useCallback, useState, useEffect } from 'react';
import { test, expect, describe, vi } from 'vitest';
import UploadVideo from '../src/lib/UploadVideo';
import type { FileList } from '../src/lib/UploadVideo';
import userEvent from '@testing-library/user-event';
import { render, waitFor, cleanup } from '@testing-library/react';
import { delay } from '../src/utils';

function Example(props: any) {
  const { value, onError, action } = props;
  const [ fileList, setFileList ] = useState(value);

  useEffect(() => {
    if (typeof value === 'undefined') return;

    setFileList(() => value);
  }, [value]);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer ' };
  }, []);

  const onChange = useCallback((fileList: FileList) => {
    setFileList({ fileList });
    props.onChange(fileList);
  }, [props.onChange]);

  return (
    <UploadVideo
      value={fileList}
      headers={headers}
      onError={onError}
      onChange={onChange}
      action={action || "/test/upload/file"}
    />
  );
}

describe('Test <UploadVideo />', function() {
  test('Text <UploadVideo /> Initial, Preview', async function() {
    const user = userEvent.setup();
    const handleChangeMockFn = vi.fn((fileList: FileList) => fileList);
    const initialValue = [
      {
        uid: '1',
        name: 'huangshan.mp4',
        url: '/__vitest_test__/src/assets/huangshan.mp4',
        status: 'done',
      },
      {
        uid: '2',
        name: 'test-2.mp4',
        url: '/__vitest_test__/src/assets/test-2.mp4',
        status: 'done',
      },
    ];

    const { container, baseElement } = render(
      <Example
        value={initialValue}
        onChange={handleChangeMockFn}
      />
    )

    const box = container.querySelector('.qm-vnit-upload-image-list');
    expect(box?.firstElementChild).toBe(container.querySelector('.qm-vnit-upload-image-item'));
    expect(box?.lastElementChild).toBe(container.querySelector('.qm-vnit-upload-image-label'));

    // 模拟文件上传
    await user.upload(container?.querySelector('input')!, [new File(['2.mp4'], '2.mp4', {type: 'video/mp4'})]);

    let lastResult = handleChangeMockFn.mock.results[handleChangeMockFn.mock.results.length - 1].value;

    expect(lastResult).toHaveProperty('[2].percent', 0);
    expect(lastResult).toHaveProperty('[2].status', 'loading');
    expect(lastResult).toHaveProperty('[2].name', '2.mp4');

    await delay(2000, null);

    lastResult = handleChangeMockFn.mock.results[handleChangeMockFn.mock.results.length - 1].value;

    expect(lastResult).toHaveProperty('[2].percent', 100);
    expect(lastResult).toHaveProperty('[2].status', 'done');
    expect(lastResult).toHaveProperty('[2].name', '2.mp4');

    const previewIcons = container.querySelectorAll('.anticon-eye.qm-vnit-upload-image-item-preview-icon')!;

    // 预览第一个
    await user.click(previewIcons[0]);

    await waitFor(() => expect(baseElement.querySelector('.qm-vnit-upload-video-preview-content')).toBeInTheDocument());

    let video = baseElement.querySelector('.qm-vnit-upload-video-preview-content') as HTMLVideoElement;

    // 等待 video 资源完全加载
    await delay(2000, null);

    let videoScale = calculateVideoScale(video);

    expect(video.width).toBe(Math.trunc(videoScale.width));
    expect(video.height).toBe(Math.trunc(videoScale.height));

    // 关闭
    await user.click(baseElement.querySelector('.qm-vnit-icon-close.qm-vnit-upload-video-preview-close-icon')!);
    await delay(1000, null);
    expect(baseElement.querySelector('.qm-vnit-upload-video-preview-content')).toBeNull();


    // 预览第二个
    await user.click(previewIcons[1]);

    await waitFor(() => expect(baseElement.querySelector('.qm-vnit-upload-video-preview-content')).toBeInTheDocument());

    video = baseElement.querySelector('.qm-vnit-upload-video-preview-content') as HTMLVideoElement;

    // 等待 video 资源完全加载
    await delay(2000, null);

    videoScale = calculateVideoScale(video);

    expect(video.width).toBe(Math.trunc(videoScale.width));
    expect(video.height).toBe(Math.trunc(videoScale.height));

    cleanup();
  });

  test('Text <UploadVideo /> onError', async function() {
    const user = userEvent.setup();
    const handleErrorMockFn = vi.fn((error: Error) => error);
    const handleChangeMockFn = vi.fn((fileList: FileList) => fileList);

    const { container } = render(
      <Example
        onError={handleErrorMockFn}
        onChange={handleChangeMockFn}
        action="/test/error/upload/file"
      />
    )

    const box = container.querySelector('.qm-vnit-upload-image-list');
    expect(box?.firstElementChild).toBe(container.querySelector('.qm-vnit-upload-image-label'));
    expect(box?.lastElementChild).toBe(container.querySelector('.qm-vnit-upload-image-label'));

    // 模拟文件上传
    await user.upload(container?.querySelector('input')!, [new File(['2.mp4'], '2.mp4', {type: 'video/mp4'})]);

    await delay(1000, null);

    expect(handleErrorMockFn).toHaveBeenCalled();

    cleanup();
  });
});

/**
 * 计算 video 元素实际展示时的尺寸
 * @param video
 * @returns
 */
function calculateVideoScale(video: HTMLVideoElement) {
  const { videoWidth, videoHeight } = video;
  const ratio = videoWidth / videoHeight;
  const maxWidth = document.documentElement.clientWidth * 0.7;
  const maxHeight = document.documentElement.clientWidth * 0.8;

  let width;
  let height;

  if (ratio > maxWidth / maxHeight) {
    if (videoWidth > maxWidth) {
      width = maxWidth;
      height = width / ratio;
    } else {
      width = videoWidth;
      height = videoHeight;
    }
  } else {
    if (videoHeight > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    } else {
      width = videoWidth;
      height = videoHeight;
    }
  }

  return { width, height };
}
