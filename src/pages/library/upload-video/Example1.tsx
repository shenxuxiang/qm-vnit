import React, { memo, useCallback, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import videoUrl from '@/assets/huangshan.mp4';
import { UploadVideo } from '@/lib';

function Example() {
  const [fileList, setFileList] = useState([{ uid: '111', name: '1.jpg', url: videoUrl }]);

  const onChange = useCallback((files: any) => {
    console.log(files);
    setFileList(() => files);
  }, []);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer 681105312e514cf6b085f3e75d39104d' };
  }, []);

  const handleError = useCallback((error: any) => {
    console.log(error);
  }, []);

  return (
    <Template markdown={code} title="案例一（默认上传视频格式的文件）">
      <UploadVideo
        value={fileList}
        headers={headers}
        onChange={onChange}
        onError={handleError}
        action="/v1.0/file/upload"
      />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import React, { memo, useCallback, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import videoUrl from '@/assets/huangshan.mp4';
import { UploadVideo } from '@/lib';

function Example() {
  const [ fileList, setFileList ] = useState([ { uid: '111', name: '1.jpg', url: videoUrl } ]);

  const onChange = useCallback((files: any) => {
    console.log(files);
    setFileList(() => files);
  }, []);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer 5d55e30f-f574-4eb3-8eed-c5ad57129aa7' };
  }, []);

  const handleError = useCallback((error: any) => {
    console.log(error);
  }, []);

  return (
    <Template markdown={code} title="案例一（默认上传视频格式的文件）">
      <UploadVideo
        value={fileList}
        headers={headers}
        onChange={onChange}
        onError={handleError}
        action="/v1.0/file/upload"
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
