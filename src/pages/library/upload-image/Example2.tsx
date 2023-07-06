import React, { memo, useCallback } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { UploadImage } from '@/lib';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例二（使用自带的图片预览）</p>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <UploadImage action="/upload/file" onChange={onChange} />
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

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <UploadImage
        action="/upload/file"
        onChange={onChange}
        // 使用自带的图片预览功能
        // onPreview={onPreview}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
