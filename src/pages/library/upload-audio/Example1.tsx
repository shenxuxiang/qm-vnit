import React, { memo, useCallback } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { UploadAudio } from '@/lib';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <UploadAudio action="/upload/file" onChange={onChange} accept="*" />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback } from 'react';
import { UploadAudio } from 'qm-vnit';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <UploadAudio action="/upload/file" onChange={onChange} accept="*" />
    </div>
  );
}

export default memo(Example);
~~~
`;
