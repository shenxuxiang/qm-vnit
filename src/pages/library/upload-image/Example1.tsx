import React, { memo, useCallback, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import img1 from '@/assets/images/1.jpg';
import { UploadImage } from '@/lib';

function Example() {
  const [fileList, setFileList] = useState([{ uid: '111', name: '1.jpg', url: img1 }]);

  const onChange = useCallback((files: any) => {
    console.log(files);
    setFileList(() => fileList);
  }, []);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer 5d55e30f-f574-4eb3-8eed-c5ad57129aa7' };
  }, []);

  const handleError = useCallback((error: any) => {
    console.log(error);
  }, []);

  return (
    <Template markdown={code} title="案例一（自定义图片预览）">
      <UploadImage
        multiple
        maxCount={5}
        method="post"
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
import img1 from '@/assets/images/1.jpg';
import { UploadImage } from '@/lib';

function Example() {
  const [ fileList, setFileList ] = useState([ { uid: '111', name: '1.jpg', url: img1 } ]);

  const onChange = useCallback((files: any) => {
    console.log(files);
    setFileList(() => fileList);
  }, []);

  const headers = useCallback(() => {
    return { Authorization: 'Bearer 5d55e30f-f574-4eb3-8eed-c5ad57129aa7' };
  }, []);

  const handleError = useCallback((error: any) => {
    console.log(error);
  }, [])

  return (
    <Template markdown={code} title="案例一（自定义图片预览）">
      <UploadImage
        multiple
        maxCount={5}
        method="post"
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
