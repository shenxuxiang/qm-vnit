import React, { useCallback, useState, useEffect } from 'react';
import { test, expect, describe, vi } from 'vitest';
import UploadAudio from '../src/lib/UploadAudio';
import type { FileList } from '../src/lib/UploadAudio';
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
    <UploadAudio
      value={fileList}
      headers={headers}
      onError={onError}
      onChange={onChange}
      action={action || "/test/upload/file"}
    />
  );
}

describe('Test <UploadAudio />', function() {
  test('Text <UploadAudio /> Initial, Preview', async function() {
    const user = userEvent.setup();
    const handleChangeMockFn = vi.fn((fileList: FileList) => fileList);
    const initialValue = [
      {
        uid: '1',
        name: '1.mp4',
        url: '1.mp3',
        status: 'done',
      },
    ];

    const { container, baseElement, getAllByRole } = render(
      <Example
        value={initialValue}
        onChange={handleChangeMockFn}
      />
    )

    const box = container.querySelector('.qm-vnit-upload-image-list');
    expect(box?.firstElementChild).toBe(container.querySelector('.qm-vnit-upload-image-item'));
    expect(box?.lastElementChild).toBe(container.querySelector('.qm-vnit-upload-image-label'));

    // 模拟文件上传
    await user.upload(container?.querySelector('input')!, [new File(['2.mp3'], '2.mp3', {type: 'audio/mp3'})]);

    let lastResult = handleChangeMockFn.mock.results[handleChangeMockFn.mock.results.length - 1].value;

    expect(lastResult).toHaveProperty('[1].percent', 0);
    expect(lastResult).toHaveProperty('[1].status', 'loading');
    expect(lastResult).toHaveProperty('[1].name', '2.mp3');

    await delay(2000, null);

    lastResult = handleChangeMockFn.mock.results[handleChangeMockFn.mock.results.length - 1].value;

    expect(lastResult).toHaveProperty('[1].percent', 100);
    expect(lastResult).toHaveProperty('[1].status', 'done');
    expect(lastResult).toHaveProperty('[1].name', '2.mp3');

    const previewIcons = container.querySelectorAll('.anticon-eye.qm-vnit-upload-image-item-preview-icon')!;

    // 预览第一个
    await user.click(previewIcons[0]);
    await waitFor(() => expect(baseElement.querySelector('.qm-vnit-upload-audio-preview-content')).toBeInTheDocument());
    // 等待 audio 资源完全加载
    await delay(2000, null);
    // 关闭
    await user.click(baseElement.querySelector('.qm-vnit-icon-close.qm-vnit-upload-audio-preview-close-icon')!);
    await delay(1000, null);
    expect(baseElement.querySelector('.qm-vnit-upload-audio-preview-content')).toBeNull();

    const list = container.querySelectorAll('.qm-vnit-upload-image-item');
    const renderAudioItems = container.querySelectorAll('.qm-vnit-upload-audio-render-item') as NodeListOf<HTMLElement>;
    expect(renderAudioItems).toHaveLength(2);

    expect(list[0]).toContainElement(renderAudioItems[0]);
    expect(list[1]).toContainElement(renderAudioItems[1]);

    cleanup();
  });
});
