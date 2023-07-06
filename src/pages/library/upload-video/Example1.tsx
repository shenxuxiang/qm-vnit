import { Card } from 'antd';
import { UploadVideo } from '@/lib';
import React, { memo, useCallback } from 'react';
import MarkdownCode from '@/components/MarkdownCode';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例一（默认上传视频格式的文件）</p>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <UploadVideo action="/upload/file" onChange={onChange} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback } from 'react';
import { UploadVideo } from 'qm-vnit';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <UploadVideo action="/upload/file" onChange={onChange} />
    </div>
  );
}

export default memo(Example);
~~~
`;
