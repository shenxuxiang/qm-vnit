import React, { memo, useCallback } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { UploadImage } from '@/lib';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  const onPreview = useCallback((file: any) => {
    console.log(file);
    const url = window.URL.createObjectURL(file.originFileObj);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例一（自定义图片预览）</p>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <UploadImage action="/upload/file" onChange={onChange} onPreview={onPreview} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback } from 'react';
import { UploadImage } from 'qm-vnit';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  const onPreview = useCallback((file: any) => {console.log(file);
    const url = window.URL.createObjectURL(file.originFileObj);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <UploadImage action="/upload/file" onChange={onChange} onPreview={onPreview}/>
    </div>
  );
}

export default memo(Example);
~~~
`;
