import React, { memo, useCallback, useState } from 'react';
import Template from '@/components/ExampleTemplate';
import img1 from '@/assets/images/1.jpg';
import { UploadFile } from '@/lib';

function Example() {
  const [fileList, setFileList] = useState([{ uid: 111, name: '1.jpg', url: img1 }]);

  const onChange = useCallback((files: any) => {
    console.log(files);
    setFileList(files);
  }, []);

  const onPreview = useCallback((file: any) => {
    console.log(file);
    const url = file.url || window.URL.createObjectURL(file.originFileObj);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }, []);

  const header = { Authorization: 'Bearer cceeae0048ad4645be9fd7eb867e7f50' };

  return (
    <Template markdown={code} title="案例">
      <UploadFile
        maxCount={6}
        maxSize={0.5}
        headers={header}
        onChange={onChange}
        onPreview={onPreview}
        value={fileList as any}
        listType="picture-card"
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
import { UploadFile } from '@/lib';

function Example() {
  const [ fileList, setFileList ] = useState([ { uid: 111, name: '1.jpg', url: img1 } ]);

  const onChange = useCallback((files: any) => {
    setFileList(files);
  }, []);

  const onPreview = useCallback((file: any) => {
    console.log(file);
    const url = file.url || window.URL.createObjectURL(file.originFileObj);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }, []);

  const header = { Authorization: 'Bearer 5d55e30f-f574-4eb3-8eed-c5ad57129aa7' };

  return (
    <Template markdown={code} title="案例">
      <UploadFile
        maxCount={6}
        headers={header}
        onChange={onChange}
        onPreview={onPreview}
        value={fileList as any}
        listType="picture-card"
        action="/v1.0/file/upload"
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
