import Template from '@/components/ExampleTemplate';
import React, { memo, useCallback } from 'react';
import { UploadAudio } from '@/lib';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer 5d55e30f-f574-4eb3-8eed-c5ad57129aa7' };
  }, []);

  const handleError = useCallback((error: any) => {
    console.log(error);
  }, []);

  return (
    <Template markdown={code} title="案例一（默认上传音频格式的文件）">
      <UploadAudio
        accept=".mp4, .mp3"
        headers={headers}
        onChange={onChange}
        onError={handleError}
        action="/v1.0/upload/file"
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import Template from '@/components/ExampleTemplate';
import React, { memo, useCallback } from 'react';
import { UploadAudio } from '@/lib';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer 5d55e30f-f574-4eb3-8eed-c5ad57129aa7' };
  }, []);

  const handleError = useCallback((error: any) => {
    console.log(error);
  }, [])

  return (
    <Template markdown={code} title="案例一（默认上传音频格式的文件）">
      <UploadAudio
        accept=".mp4, .mp3"
        headers={headers}
        onChange={onChange}
        onError={handleError}
        action="/v1.0/upload/file"
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
